'use client'
import Pusher, { Channel } from 'pusher-js'

let pusher: Pusher | null = null

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
  console.log('[Pusher] init', { cluster: cfg.cluster, authEndpoint: cfg.authEndpoint.replace(/([^/])[^/]+$/, '$1…') })

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
    console.log('[Pusher] state', states)
  })
  pusher.connection.bind('connected', () => {
    console.log('[Pusher] Connected')
  })
  pusher.connection.bind('failed', () => {
    console.error('[Pusher] Connection failed')
  })
  pusher.connection.bind('error', (err: any) => {
    console.error('[Pusher] Error', err)
    if (err?.error?.data?.code === 4100) {
      console.warn('[Pusher] Connection limit reached')
    }
  })

  return pusher
}

export function subscribePrivateUser(userId: number, token: string, currentLocale: string): Channel {
  const client = getPusher(token, currentLocale)
  const channelName = `private-user.${userId}`
  return client.subscribe(channelName)
}

export function disconnectPusher() {
  if (pusher) {
    pusher.disconnect()
    pusher = null
    console.log('[Pusher] Disconnected')
  }
}