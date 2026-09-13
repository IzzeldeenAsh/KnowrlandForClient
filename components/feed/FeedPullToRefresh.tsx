'use client'

import { IconArrowDown, IconRefresh } from '@tabler/icons-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  FEED_REFRESH_COMPLETED_EVENT,
  FEED_REFRESH_REQUESTED_EVENT,
} from './feedEvents'

const PULL_THRESHOLD = 56
const MAX_PULL_DISTANCE = 88

type FeedPullToRefreshProps = {
  locale: string
}

export default function FeedPullToRefresh({ locale }: FeedPullToRefreshProps) {
  const isArabic = locale === 'ar'
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const startXRef = useRef(0)
  const startYRef = useRef(0)
  const pullDistanceRef = useRef(0)
  const isTrackingRef = useRef(false)
  const isRefreshingRef = useRef(false)

  const updatePullDistance = useCallback((distance: number) => {
    pullDistanceRef.current = distance
    setPullDistance(distance)
  }, [])

  const finishRefresh = useCallback(() => {
    isRefreshingRef.current = false
    setIsRefreshing(false)
    updatePullDistance(0)
  }, [updatePullDistance])

  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      if (isRefreshingRef.current || event.touches.length !== 1 || window.scrollY > 0) return

      startXRef.current = event.touches[0].clientX
      startYRef.current = event.touches[0].clientY
      isTrackingRef.current = true
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (!isTrackingRef.current || event.touches.length !== 1) return

      if (window.scrollY > 0) {
        isTrackingRef.current = false
        updatePullDistance(0)
        return
      }

      const horizontalDistance = Math.abs(event.touches[0].clientX - startXRef.current)
      const verticalDistance = event.touches[0].clientY - startYRef.current

      if (verticalDistance <= 0 || horizontalDistance > verticalDistance) {
        updatePullDistance(0)
        return
      }

      // Once the gesture is clearly a downward pull, keep the browser from
      // performing a full-page refresh. Only the posts timeline is refreshed.
      if (verticalDistance > 8) event.preventDefault()

      updatePullDistance(Math.min(MAX_PULL_DISTANCE, verticalDistance * 0.55))
    }

    const handleTouchEnd = () => {
      if (!isTrackingRef.current) return
      isTrackingRef.current = false

      if (pullDistanceRef.current >= PULL_THRESHOLD) {
        isRefreshingRef.current = true
        setIsRefreshing(true)
        updatePullDistance(PULL_THRESHOLD)
        window.dispatchEvent(new Event(FEED_REFRESH_REQUESTED_EVENT))
        return
      }

      updatePullDistance(0)
    }

    const handleTouchCancel = () => {
      isTrackingRef.current = false
      if (!isRefreshingRef.current) updatePullDistance(0)
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('touchcancel', handleTouchCancel, { passive: true })
    window.addEventListener(FEED_REFRESH_COMPLETED_EVENT, finishRefresh)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('touchcancel', handleTouchCancel)
      window.removeEventListener(FEED_REFRESH_COMPLETED_EVENT, finishRefresh)
    }
  }, [finishRefresh, updatePullDistance])

  const isReady = pullDistance >= PULL_THRESHOLD
  const statusText = isRefreshing
    ? (isArabic ? 'جارٍ تحديث المنشورات' : 'Refreshing posts')
    : isReady
      ? (isArabic ? 'اترك للتحديث' : 'Release to refresh')
      : (isArabic ? 'اسحب للتحديث' : 'Pull to refresh')

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed left-1/2 z-20 flex items-center gap-2 rounded-full border border-[#8FC7FF]/80 bg-[#F4F9FF]/95 px-3 py-2 text-xs font-semibold text-[#1D5FAF] shadow-[0_8px_28px_rgba(35,120,232,0.2)] backdrop-blur transition-[opacity,transform] duration-200 lg:hidden"
      style={{
        opacity: pullDistance > 8 || isRefreshing ? 1 : 0,
        top: 'calc(var(--app-header-height, 64px) + 8px)',
        transform: `translate(-50%, ${Math.max(-52, pullDistance - 52)}px)`,
      }}
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#67B5F6] to-[#2378E8] text-white">
        {isRefreshing ? (
          <IconRefresh aria-hidden size={15} className="animate-spin" />
        ) : (
          <IconArrowDown
            aria-hidden
            size={15}
            className={`transition-transform duration-200 ${isReady ? 'rotate-180' : ''}`}
          />
        )}
      </span>
      <span>{statusText}</span>
    </div>
  )
}
