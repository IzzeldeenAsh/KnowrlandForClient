'use client'

import { useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent } from 'react'

export type TimelinePoint = {
  id: string
  value: number
  /** Short text shown in the bubble above (or below) the handle. */
  label: string
  /** Accessible name for the handle. */
  ariaLabel: string
  /** Text read out by screen readers for the current value. */
  valueText?: string
  tone?: 'primary' | 'accent' | 'muted'
  draggable?: boolean
  /** Lowest value this handle may take (defaults to the slider minimum). */
  min?: number
}

type TimelineSliderProps = {
  min: number
  max: number
  points: TimelinePoint[]
  onChange?: (id: string, value: number) => void
  /** Called once a drag or key press finishes — good moment to grow the range. */
  onCommit?: (id: string, value: number) => void
  /** Value up to which the track is drawn as "filled". */
  fillTo?: number
  startLabel: string
  endLabel: string
  tickEvery?: number
  isRTL?: boolean
}

const toneClasses: Record<NonNullable<TimelinePoint['tone']>, string> = {
  primary: 'bg-[#1C7CBB] ring-[#1C7CBB]/25 text-white',
  accent: 'bg-amber-500 ring-amber-500/25 text-white',
  muted: 'bg-slate-400 ring-slate-400/25 text-white',
}

const bubbleClasses: Record<NonNullable<TimelinePoint['tone']>, string> = {
  primary: 'border-[#1C7CBB]/30 bg-white text-[#1C7CBB]',
  accent: 'border-amber-300 bg-amber-50 text-amber-800',
  muted: 'border-slate-200 bg-white text-slate-600',
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export default function TimelineSlider({
  min,
  max,
  points,
  onChange,
  onCommit,
  fillTo,
  startLabel,
  endLabel,
  tickEvery,
  isRTL = false,
}: TimelineSliderProps) {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const span = Math.max(1, max - min)

  const percentFor = (value: number) => ((clamp(value, min, max) - min) / span) * 100
  const sideStyle = (value: number) =>
    isRTL ? { right: `${percentFor(value)}%` } : { left: `${percentFor(value)}%` }

  // Bubbles near either end grow inward so they stay inside the card.
  const bubbleAnchor = (value: number) => {
    const percent = percentFor(value)
    if (percent < 15) return isRTL ? 'right-0' : 'left-0'
    if (percent > 85) return isRTL ? 'left-0' : 'right-0'
    return 'left-1/2 -translate-x-1/2'
  }

  const valueFromClientX = (clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect()
    if (!rect || rect.width === 0) return min
    const ratio = isRTL ? (rect.right - clientX) / rect.width : (clientX - rect.left) / rect.width
    return Math.round(min + clamp(ratio, 0, 1) * span)
  }

  const moveTo = (point: TimelinePoint, value: number) => {
    const next = clamp(value, point.min ?? min, max)
    if (next !== point.value) onChange?.(point.id, next)
    return next
  }

  const onPointerDown = (event: PointerEvent<HTMLButtonElement>, point: TimelinePoint) => {
    if (!point.draggable) return
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    event.currentTarget.focus()
    setDraggingId(point.id)
  }

  const onPointerMove = (event: PointerEvent<HTMLButtonElement>, point: TimelinePoint) => {
    if (draggingId !== point.id) return
    moveTo(point, valueFromClientX(event.clientX))
  }

  const onPointerUp = (event: PointerEvent<HTMLButtonElement>, point: TimelinePoint) => {
    if (draggingId !== point.id) return
    setDraggingId(null)
    const value = moveTo(point, valueFromClientX(event.clientX))
    onCommit?.(point.id, value)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, point: TimelinePoint) => {
    if (!point.draggable) return
    const forward = isRTL ? 'ArrowLeft' : 'ArrowRight'
    const backward = isRTL ? 'ArrowRight' : 'ArrowLeft'
    const steps: Record<string, number> = {
      [forward]: 1,
      ArrowUp: 1,
      [backward]: -1,
      ArrowDown: -1,
      PageUp: 7,
      PageDown: -7,
    }

    let next: number | null = null
    if (event.key in steps) next = point.value + steps[event.key]
    if (event.key === 'Home') next = point.min ?? min
    if (event.key === 'End') next = max
    if (next === null) return

    event.preventDefault()
    const value = moveTo(point, next)
    onCommit?.(point.id, value)
  }

  // Track clicks move the nearest draggable handle there.
  const onTrackPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return
    const value = valueFromClientX(event.clientX)
    const nearest = points
      .filter((point) => point.draggable)
      .sort((a, b) => Math.abs(a.value - value) - Math.abs(b.value - value))[0]
    if (!nearest) return
    const next = moveTo(nearest, value)
    onCommit?.(nearest.id, next)
  }

  const ticks: number[] = []
  if (tickEvery && tickEvery > 0) {
    for (let value = min + tickEvery; value < max; value += tickEvery) ticks.push(value)
  }

  // Alternate bubbles above/below so neighbouring handles stay readable.
  const ordered = [...points].sort((a, b) => a.value - b.value)
  const placeBelow = new Set(
    ordered.filter((_, index) => index % 2 === 1).map((point) => point.id)
  )

  return (
    <div className="select-none px-3 pb-1 pt-12" dir={isRTL ? 'rtl' : 'ltr'}>
      <div
        ref={trackRef}
        onPointerDown={onTrackPointerDown}
        className="relative h-2 cursor-pointer rounded-full bg-slate-200"
      >
        {fillTo !== undefined ? (
          <div
            className="pointer-events-none absolute inset-y-0 rounded-full bg-[#1C7CBB]/70"
            style={isRTL ? { right: 0, width: `${percentFor(fillTo)}%` } : { left: 0, width: `${percentFor(fillTo)}%` }}
          />
        ) : null}

        {ticks.map((value) => (
          <span
            key={value}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 h-3 w-px -translate-y-1/2 bg-slate-300"
            style={sideStyle(value)}
          />
        ))}

        {points.map((point) => {
          const tone = point.tone ?? 'primary'
          const below = placeBelow.has(point.id)
          const isDragging = draggingId === point.id

          return (
            <div
              key={point.id}
              className="absolute top-1/2"
              style={{ ...sideStyle(point.value), zIndex: isDragging ? 3 : 2 }}
            >
              <div className={`relative -translate-y-1/2 ${isRTL ? 'translate-x-1/2' : '-translate-x-1/2'}`}>
                <span
                  className={`pointer-events-none absolute ${bubbleAnchor(point.value)} whitespace-nowrap rounded-md border px-2 py-0.5 text-[11px] font-bold shadow-sm ${bubbleClasses[tone]} ${below ? 'top-7' : 'bottom-7'}`}
                >
                  {point.label}
                </span>
                <button
                  type="button"
                  role="slider"
                  aria-label={point.ariaLabel}
                  aria-valuemin={point.min ?? min}
                  aria-valuemax={max}
                  aria-valuenow={point.value}
                  aria-valuetext={point.valueText}
                  aria-disabled={!point.draggable}
                  tabIndex={point.draggable ? 0 : -1}
                  onPointerDown={(event) => onPointerDown(event, point)}
                  onPointerMove={(event) => onPointerMove(event, point)}
                  onPointerUp={(event) => onPointerUp(event, point)}
                  onPointerCancel={() => setDraggingId(null)}
                  onKeyDown={(event) => onKeyDown(event, point)}
                  className={`relative block h-5 w-5 touch-none rounded-full border-2 border-white ring-4 transition-transform focus:outline-none focus-visible:ring-8 ${toneClasses[tone]} ${point.draggable ? (isDragging ? 'scale-125 cursor-grabbing' : 'cursor-grab hover:scale-110') : 'cursor-default'}`}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-12 flex items-center justify-between text-[11px] font-semibold text-slate-500">
        <span>{startLabel}</span>
        <span>{endLabel}</span>
      </div>
    </div>
  )
}
