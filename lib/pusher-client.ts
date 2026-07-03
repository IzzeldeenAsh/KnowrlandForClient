'use client'
import Pusher, { Channel } from 'pusher-js'

let pusher: Pusher | null = null
let lastChannelName: string | null = null
let lastToken: string | null = null
let lastLocale: string | null = null
let didBindDebugHandlers = false
const channelsWithEventLogging = new Set<string>()

type PusherOpts = {
  key: string
  cluster: string
  authEndpoint: string
}

function getRuntimeEnv(name: string): string | undefined {
  if (typeof window === 'undefined') return undefined
  return (window as any).__env?.[name]
}

function firstNonEmpty(...values: Array<string | undefined>): string {
  return values.map((value) => value?.trim()).find(Boolean) ?? ''
}

function isInternalEvent(eventName: string): boolean {
  return eventName.startsWith('pusher:') || eventName.startsWith('pusher_internal:')
}

function logReceivedEvent(channelName: string, eventName: string, data: any) {
  if (isInternalEvent(eventName)) return
  console.log('[Pusher] Event received', {
    channelName,
    eventName,
    payload: data,
  })
}

function getConfig(): PusherOpts {
  const key = firstNonEmpty(
    getRuntimeEnv('PUSHER_KEY'),
    process.env.NEXT_PUBLIC_PUSHER_KEY,
    '41745ad5e299f4af9e36'
  )
  const cluster = firstNonEmpty(
    getRuntimeEnv('PUSHER_CLUSTER'),
    process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    'eu'
  )
  const authEndpoint = firstNonEmpty(
    getRuntimeEnv('PUSHER_AUTH_ENDPOINT'),
    process.env.NEXT_PUBLIC_PUSHER_AUTH_ENDPOINT,
    `${process.env.NEXT_PUBLIC_API_URL}/broadcasting/auth`
  )
  if (!key || !authEndpoint) {
    console.error('[Pusher] Missing env: NEXT_PUBLIC_PUSHER_KEY or NEXT_PUBLIC_PUSHER_AUTH_ENDPOINT')
  }
  return { key, cluster, authEndpoint }
}

export function getPusher(token: string, currentLocale: string): Pusher {
  if (pusher) {
    // If auth context changed, we must recreate the client to avoid auth mismatch on private channels.
    if (lastToken !== token || lastLocale !== currentLocale) {
      console.warn('[Pusher] Auth context changed; reconnecting Pusher client', {
        locale: { from: lastLocale, to: currentLocale },
        tokenChanged: lastToken ? lastToken !== token : true,
      })
      disconnectPusher()
    } else {
      return pusher
    }
  }
  const cfg = getConfig()

  lastToken = token
  lastLocale = currentLocale

  pusher = new Pusher(cfg.key, {
    cluster: cfg.cluster,
    forceTLS: true,                      // ensure wss
    enabledTransports: ['ws', 'wss'],    // avoid noisy xhr fallbacks in dev
    // If your network blocks websockets, comment the line above to allow xhr fallbacks
    authEndpoint: cfg.authEndpoint,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Accept-Language': currentLocale,
      },
    },
    // logToConsole: true, // enable only while debugging
  })

  if (!didBindDebugHandlers) {
    didBindDebugHandlers = true
    // console.log('[Pusher] Initializing client', {
    //   cluster: cfg.cluster,
    //   authEndpoint: cfg.authEndpoint,
    //   keySuffix: cfg.key.slice(-6),
    //   locale: currentLocale,
    //   tokenPrefix: token ? `${token.slice(0, 10)}…` : '(empty)',
    // })

    pusher.connection.bind('state_change', (states: any) => {
      //   console.log('[Pusher] Connection state_change', states)
    })
    pusher.connection.bind('connecting', () => {
      //   console.log('[Pusher] Connection connecting')
    })
    pusher.connection.bind('connected', () => {
      //   console.log('[Pusher] Connection connected', {
      //   socketId: (pusher as any)?.connection?.socket_id,
      // })
    })
    pusher.connection.bind('disconnected', () => {
      //  console.log('[Pusher] Connection disconnected')
    })
    pusher.connection.bind('unavailable', () => {
      //  console.warn('[Pusher] Connection unavailable')
    })
    pusher.connection.bind('failed', () => {
      // console.error('[Pusher] Connection failed')
    })
    pusher.connection.bind('error', (err: any) => {
      console.error('[Pusher] Connection error', err)
      if (err?.error?.data?.code === 4100) {
        console.warn('[Pusher] Connection limit reached (4100)')
      }
    })

    // Event payload logging is bound per channel in subscribePrivateUser.
  }

  return pusher
}

export function subscribePrivateUser(userId: number, token: string, currentLocale: string): Channel {
  const client = getPusher(token, currentLocale)
  const channelName = `private-user.${userId}`
  if (lastChannelName && lastChannelName !== channelName) {
    // console.log('[Pusher] Unsubscribing previous channel', { from: lastChannelName, to: channelName })
    client.unsubscribe(lastChannelName)
  }
  lastChannelName = channelName

  const state = (client as any)?.connection?.state
  if (state === 'disconnected' || state === 'failed') {
    console.warn('[Pusher] Client not connected; calling connect()', { state })
    client.connect()
  }

  //console.log('[Pusher] Subscribing', { channelName })
  const channel = client.subscribe(channelName)
  if (!channelsWithEventLogging.has(channelName) && typeof (channel as any).bind_global === 'function') {
    channelsWithEventLogging.add(channelName)
    ;(channel as any).bind_global((eventName: string, data: any) => {
      logReceivedEvent(channelName, eventName, data)
    })
  }

  channel.bind('pusher:subscription_succeeded', () => {
    // console.log('[Pusher] Subscription succeeded', { channelName })
  })
  channel.bind('pusher:subscription_error', (status: any) => {
    //  console.error('[Pusher] Subscription error', { channelName, status })
  })

  const events = [
    'account.activated',
    'account.deactivated',
    'account.stripe.restricted',
    'knowledge.accepted',
    'knowledge.declined',
    'order.insight',
    'knowledge.answer_question',
    'knowledge.ask_question',
    'meeting.client_meeting_insighter_approved',
    'meeting.client_meeting_insighter_postponed',
    'meeting.client_meeting_reminder',
    'meeting.client_meeting_new',
    'meeting.client_meeting_reschedule',
    'meeting.insighter_meeting_approved',
    'meeting.insighter_meeting_reminder',
    'meeting.insighter_meeting_client_new',
    'meeting.insighter_meeting_client_reschedule',
    'project.client.started',
    'project.insighter.offer.technical-decision',
    'project.insighter.offer.not-selected',
    'project.insighter.cancelled',
    'requests.action',
    'requests'
  ]
  events.forEach((evt) => {
    channel.bind(evt, (data: any) => {
      // eslint-disable-next-line no-console
      //   console.log('[Pusher] Channel event', { channelName, evt, data })
    })
  })
  return channel
}

export function unsubscribePrivateUser(userId: number) {
  const channelName = `private-user.${userId}`
  if (pusher) {
    try {
      pusher.unsubscribe(channelName)
      if (lastChannelName === channelName) lastChannelName = null
      channelsWithEventLogging.delete(channelName)
    } catch (e) {
      console.warn('[Pusher] Unsubscribe warning', e)
    }
  }
}

export function bindGlobal(handler: (eventName: string, data: any) => void) {
  if (pusher && typeof (pusher as any).bind_global === 'function') {
    ; (pusher as any).bind_global(handler)
  }
}

export function unbindGlobal(handler: (eventName: string, data: any) => void) {
  if (pusher && typeof (pusher as any).unbind_global === 'function') {
    ; (pusher as any).unbind_global(handler)
  }
}

export function disconnectPusher() {
  if (pusher) {
    //  console.log('[Pusher] Disconnecting client', { lastChannelName })
    pusher.disconnect()
    pusher = null
    lastChannelName = null
    lastToken = null
    lastLocale = null
    didBindDebugHandlers = false
    channelsWithEventLogging.clear()
  }
}
