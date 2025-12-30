'use client'
import Pusher, { Channel } from 'pusher-js'

let pusher: Pusher | null = null
let lastChannelName: string | null = null

type PusherOpts = {
  key: string
  cluster: string
  authEndpoint: string
}

function getConfig(): PusherOpts {
  const key = process.env.NEXT_PUBLIC_PUSHER_KEY
  const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'eu'
  const authEndpoint = process.env.NEXT_PUBLIC_PUSHER_AUTH_ENDPOINT
  if (!key || !authEndpoint) {
    console.error('[Pusher] Missing env: NEXT_PUBLIC_PUSHER_KEY or NEXT_PUBLIC_PUSHER_AUTH_ENDPOINT')
  }
  return { key: key!, cluster, authEndpoint: authEndpoint! }
}

export function getPusher(token: string, currentLocale: string): Pusher {
  if (pusher) return pusher
  const cfg = getConfig()

  // Helpful debug (sanitized)

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

  pusher.connection.bind('state_change', (states: any) => {
  })
  pusher.connection.bind('connected', () => {
  })
  pusher.connection.bind('failed', () => {
    console.error('[Pusher] Connection failed')
  })
  pusher.connection.bind('error', (err: any) => {
    if (err?.error?.data?.code === 4100) {
      console.warn('[Pusher] Connection limit reached')
    }
  })

  return pusher
}

export function subscribePrivateUser(userId: number, token: string, currentLocale: string): Channel {
  const client = getPusher(token, currentLocale)
  const channelName = `private-user.${userId}`
  lastChannelName = channelName
  return client.subscribe(channelName)
}

export function unsubscribePrivateUser(userId: number) {
  const channelName = `private-user.${userId}`
  if (pusher) {
    try {
      pusher.unsubscribe(channelName)
      if (lastChannelName === channelName) lastChannelName = null
    } catch (e) {
      console.warn('[Pusher] Unsubscribe warning', e)
    }
  }
}

export function bindGlobal(handler: (eventName: string, data: any) => void) {
  if (pusher && (pusher as any).bind_global) {
    ;(pusher as any).bind_global(handler)
  }
}

export function unbindGlobal(handler: (eventName: string, data: any) => void) {
  if (pusher && (pusher as any).unbind_global) {
    ;(pusher as any).unbind_global(handler)
  }
}

export function disconnectPusher() {
  if (pusher) {
    pusher.disconnect()
    pusher = null
  }
}