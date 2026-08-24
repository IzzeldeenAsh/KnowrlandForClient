'use client'

import { IconListDetails, IconX } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

type FloatingFeedButtonProps = {
  locale: string
}

type Position = { x: number; y: number }

const STORAGE_KEY = 'floating-feed-button-position'
const VIEWPORT_MARGIN = 12
const DRAG_THRESHOLD = 5

export default function FloatingFeedButton({ locale }: FloatingFeedButtonProps) {
  const pathname = usePathname()
  const buttonRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{
    pointerId: number
    startX: number
    startY: number
    originX: number
    originY: number
  } | null>(null)
  const draggedRef = useRef(false)
  const [position, setPosition] = useState<Position | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const normalizedPathname = pathname.replace(/\/+$/, '') || '/'
  const feedPath = `/${locale}`
  const isFeedPage = normalizedPathname === feedPath
  const isPostDetailPage = normalizedPathname.startsWith(`${feedPath}/post/`)

  const isArabic = locale === 'ar'
  const label = isArabic ? 'العودة إلى الموجز' : 'Back to Feed'
  const dragLabel = isArabic
    ? 'اسحب لتغيير موضع زر العودة إلى الموجز'
    : 'Drag to reposition the Back to Feed button'

  const clampPosition = useCallback((next: Position): Position => {
    const button = buttonRef.current
    if (!button) return next

    return {
      x: Math.min(
        Math.max(next.x, VIEWPORT_MARGIN),
        Math.max(VIEWPORT_MARGIN, window.innerWidth - button.offsetWidth - VIEWPORT_MARGIN),
      ),
      y: Math.min(
        Math.max(next.y, VIEWPORT_MARGIN),
        Math.max(VIEWPORT_MARGIN, window.innerHeight - button.offsetHeight - VIEWPORT_MARGIN),
      ),
    }
  }, [])

  useEffect(() => {
    const savedPosition = window.localStorage.getItem(STORAGE_KEY)
    if (!savedPosition) return

    try {
      const parsed = JSON.parse(savedPosition) as Position
      if (Number.isFinite(parsed.x) && Number.isFinite(parsed.y)) {
        setPosition(clampPosition(parsed))
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }, [clampPosition])

  useEffect(() => {
    const keepInsideViewport = () => {
      setPosition((current) => (current ? clampPosition(current) : current))
    }

    window.addEventListener('resize', keepInsideViewport)
    return () => window.removeEventListener('resize', keepInsideViewport)
  }, [clampPosition])

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return

    const rect = event.currentTarget.getBoundingClientRect()
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: rect.left,
      originY: rect.top,
    }
    draggedRef.current = false
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return

    const deltaX = event.clientX - drag.startX
    const deltaY = event.clientY - drag.startY
    if (!draggedRef.current && Math.hypot(deltaX, deltaY) < DRAG_THRESHOLD) return

    draggedRef.current = true
    setIsDragging(true)
    setPosition(clampPosition({ x: drag.originX + deltaX, y: drag.originY + deltaY }))
    event.preventDefault()
  }

  const finishDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return

    dragRef.current = null
    setIsDragging(false)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    if (draggedRef.current) {
      const rect = event.currentTarget.getBoundingClientRect()
      const finalPosition = clampPosition({ x: rect.left, y: rect.top })
      setPosition(finalPosition)
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(finalPosition))
    }
  }

  const positionStyle: CSSProperties = position
    ? { left: position.x, top: position.y, right: 'auto', bottom: 'auto' }
    : {}

  // The feed itself (including My Posts and Saved Posts) already provides its
  // navigation. On a post detail page this control competes with the floating
  // menu button, particularly on mobile.
  if (isFeedPage || isPostDetailPage || isDismissed) return null

  return (
    <div
      ref={buttonRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
      style={positionStyle}
      className={`fixed bottom-[calc(var(--auth-banner-offset,0px)+1.5rem)] z-40 touch-none select-none ${
        isDragging
          ? 'cursor-grabbing scale-[1.02] shadow-xl transition-none'
          : 'cursor-grab'
      } ${
        isArabic ? 'left-5 sm:left-7' : 'right-5 sm:right-7'
      }`}
    >
      <Link
        href={feedPath}
        draggable={false}
        aria-label={label}
        title={dragLabel}
        onDragStart={(event) => event.preventDefault()}
        onClick={(event) => {
          if (draggedRef.current) {
            event.preventDefault()
            draggedRef.current = false
          }
        }}
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
        className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#FFB37A] bg-gradient-to-r from-[#FF8A3D] to-[#FF6B35] px-5 text-[13px] font-semibold text-white backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2 active:translate-y-0 active:scale-100"
      >
        <IconListDetails aria-hidden className="h-[18px] w-[18px]" stroke={2.1} />
        <span>{label}</span>
      </Link>
      <button
        type="button"
        aria-label={isArabic ? 'إخفاء زر العودة إلى الموجز' : 'Hide Back to Feed button'}
        title={isArabic ? 'إخفاء' : 'Hide'}
        onPointerDown={(event) => event.stopPropagation()}
        onClick={() => setIsDismissed(true)}
        className={`absolute -top-2 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 shadow-md transition hover:scale-110 hover:border-slate-400 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-1 ${
          isArabic ? '-left-2' : '-right-2'
        }`}
      >
        <IconX aria-hidden className="h-3.5 w-3.5" stroke={2.4} />
      </button>
    </div>
  )
}
