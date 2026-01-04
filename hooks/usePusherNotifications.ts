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

export function usePusherNotificaitons({ userId, token, currentLocale, eventNames = [] }: Params) {
  useEffect(() => {
    const hasEnv =
      !!process.env.NEXT_PUBLIC_PUSHER_KEY &&
      !!process.env.NEXT_PUBLIC_PUSHER_AUTH_ENDPOINT

    if (!hasEnv || !userId || !token || !currentLocale) {
      if (!hasEnv) console.warn('[Pusher] Skipping: env vars missing')
      return
    }

    const channel: Channel = subscribePrivateUser(userId, token, currentLocale)

    const unbinders: Array<() => void> = []
    for (const evt of eventNames) {
      const handler = (data: any) => console.log(`[Pusher] ${evt}`, data)
      channel.bind(evt, handler)
      unbinders.push(() => channel.unbind(evt, handler))
    }
    const globalHandler = (eventName: string, data: any) => {
      console.log('[Pusher][GLOBAL EVENT]', eventName, data)
    }
// 👇 هذا المهم
;(channel as any).bind_global(globalHandler)  

    return () => {
      try {
        ;(channel as any).unbind_global?.(globalHandler)
        unbinders.forEach((u) => u())
        channel.unsubscribe?.()
      } catch {}
    }
  }, [userId, token, currentLocale, eventNames])
}