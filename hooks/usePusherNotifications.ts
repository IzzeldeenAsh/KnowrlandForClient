'use client'
import { useEffect } from 'react'
import type { Channel } from 'pusher-js'
import { subscribePrivateUser, disconnectPusher } from '@/lib/pusher-client'

type Params = {
  userId?: number
  token?: string
  currentLocale?: string
  eventNames?: string[]
}

export function usePusherNotifications({ userId, token, currentLocale, eventNames = [] }: Params) {
  useEffect(() => {
    if (!userId || !token || !currentLocale) return

    const channel: Channel = subscribePrivateUser(userId, token, currentLocale)

    const unbinders: Array<() => void> = []
    for (const evt of eventNames) {
      const handler = (data: any) => console.log(`[Pusher] ${evt}`, data)
      channel.bind(evt, handler)
      unbinders.push(() => channel.unbind(evt, handler))
    }

    const globalHandler = (eventName: string, data: any) => {
      console.log(`[Pusher] ${eventName}`, data)
    }
    ;(channel as any).bind_global?.(globalHandler)

    const onVis = () => {
      if (document.hidden) disconnectPusher()
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      try {
        ;(channel as any).unbind_global?.(globalHandler)
        unbinders.forEach((u) => u())
        channel.unsubscribe?.()
      } catch {}
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [userId, token, currentLocale, eventNames])
}