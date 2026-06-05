'use client'
import { useEffect } from 'react'
import type { Channel } from 'pusher-js'
import { subscribePrivateUser } from '@/lib/pusher-client'

type Params = {
  userId?: number
  token?: string
  currentLocale?: string
  eventNames?: string[]
}

export function usePusherNotificaitons({ userId, token, currentLocale }: Params) {
  useEffect(() => {
    if (!userId || !token || !currentLocale) {
      return
    }

    const channel: Channel = subscribePrivateUser(userId, token, currentLocale)

    return () => {
      try {
        channel.unsubscribe?.()
      } catch {}
    }
  }, [userId, token, currentLocale])
}
