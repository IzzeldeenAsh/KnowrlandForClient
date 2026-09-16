'use client'

import { IconMoodSmile } from '@tabler/icons-react'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const PANEL_WIDTH = 276

const EMOJI_GROUPS = [
  {
    key: 'smileys',
    tab: '😀',
    emojis: [
      '😀', '😃', '😄', '😁', '😊', '🙂', '😉', '😍',
      '🥰', '😘', '😎', '🤩', '🥳', '🤗', '🤔', '🤨',
      '😐', '😑', '🙄', '😏', '😌', '😔', '😢', '😭',
      '😤', '😠', '😳', '🥺', '😬', '😴', '🤯', '🙃',
    ],
  },
  {
    key: 'gestures',
    tab: '👍',
    emojis: [
      '👍', '👎', '👌', '✌️', '🤞', '🙏', '👏', '🙌',
      '💪', '👊', '✊', '🤙', '👋', '🫡', '🫶', '☝️',
      '👉', '👈', '👆', '👇', '✍️', '🤲', '🖐️', '🤝',
    ],
  },
  {
    key: 'business',
    tab: '💼',
    emojis: [
      '💼', '📈', '📉', '📊', '💰', '💵', '💳', '🏦',
      '🏢', '📅', '📌', '📎', '🗂️', '📁', '📄', '📝',
      '✏️', '🖊️', '📚', '📖', '🔍', '🔎', '💡', '⚙️',
      '🛠️', '🧠', '🎯', '🚀', '⏰', '⌛', '🔔', '🏆',
    ],
  },
  {
    key: 'symbols',
    tab: '✅',
    emojis: [
      '✅', '☑️', '❌', '❗', '❓', '⚠️', '🔥', '⭐',
      '🌟', '✨', '💯', '♻️', '🔗', '➡️', '⬅️', '⬆️',
      '⬇️', '🔴', '🟢', '🔵', '🟡', '⚫', '⚪', '🟣',
    ],
  },
  {
    key: 'world',
    tab: '🌍',
    emojis: [
      '🌍', '🌎', '🌏', '🗺️', '🏭', '🏗️', '🚗', '✈️',
      '🚢', '🛰️', '📡', '💻', '🖥️', '📱', '⌨️', '🔋',
      '💾', '☁️', '🌐', '🎉', '🎊', '🎁', '☕', '🌱',
    ],
  },
] as const

type EmojiPickerProps = {
  onSelect: (emoji: string) => void
  label: string
}

export default function EmojiPicker({ onSelect, label }: EmojiPickerProps) {
  const [opened, setOpened] = useState(false)
  const [group, setGroup] = useState<string>(EMOJI_GROUPS[0].key)
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)

  const activeGroup = EMOJI_GROUPS.find((entry) => entry.key === group) ?? EMOJI_GROUPS[0]

  const place = useCallback(() => {
    const trigger = triggerRef.current
    if (!trigger) return
    const rect = trigger.getBoundingClientRect()
    const isRtl = getComputedStyle(document.documentElement).direction === 'rtl'
    // Anchor the panel's inline-start edge to the trigger, then keep it on screen.
    const preferred = isRtl ? rect.right - PANEL_WIDTH : rect.left
    const left = Math.min(Math.max(8, preferred), window.innerWidth - PANEL_WIDTH - 8)
    setPosition({ top: rect.bottom + 6, left })
  }, [])

  useLayoutEffect(() => {
    if (!opened) return
    place()
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    return () => {
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
    }
  }, [opened, place])

  useEffect(() => {
    if (!opened) return

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node
      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return
      setOpened(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpened(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [opened])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpened((current) => !current)}
        aria-label={label}
        aria-expanded={opened}
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] ${
          opened
            ? 'bg-[#FFF3D6] text-[#C97800]'
            : 'text-[#E59A17] hover:bg-[#FFF7E6] hover:text-[#C97800]'
        }`}
      >
        <IconMoodSmile aria-hidden stroke={1.7} className="h-4 w-4" />
      </button>

      {opened && position && typeof document !== 'undefined'
        ? createPortal(
            <div
              ref={panelRef}
              role="dialog"
              aria-label={label}
              style={{ top: position.top, left: position.left, width: PANEL_WIDTH }}
              className="fixed z-[1000] rounded-lg border border-[#E5EAF2] bg-white p-2 shadow-[0_10px_30px_rgba(15,22,41,0.18)]"
            >
              <div className="mb-2 flex items-center gap-1 border-b border-[#EDF1F5] pb-2">
                {EMOJI_GROUPS.map((entry) => (
                  <button
                    key={entry.key}
                    type="button"
                    onClick={() => setGroup(entry.key)}
                    aria-pressed={entry.key === activeGroup.key}
                    className={`flex h-7 w-7 items-center justify-center rounded-md text-[15px] leading-none transition-colors ${
                      entry.key === activeGroup.key ? 'bg-[#EDF3FC]' : 'hover:bg-[#F3F6FB]'
                    }`}
                  >
                    <span aria-hidden>{entry.tab}</span>
                  </button>
                ))}
              </div>

              <div className="grid max-h-[180px] grid-cols-8 gap-0.5 overflow-y-auto">
                {activeGroup.emojis.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      onSelect(emoji)
                      setOpened(false)
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-[18px] leading-none transition-colors hover:bg-[#F3F6FB]"
                  >
                    <span aria-hidden>{emoji}</span>
                  </button>
                ))}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}
