'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  readStoredSpecifiedInsighterDisplay,
  readStoredSpecifiedInsighterUuid,
  specifiedInsighterDisplayUpdatedEvent,
  type SpecifiedInsighterDisplay,
} from './specifiedInsighterProject'
import type { WizardLocale } from './wizardStorage'

type Props = {
  locale: WizardLocale
  className?: string
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => Array.from(part)[0] || '')
    .join('')
    .toUpperCase()
}

export default function SpecifiedInsighterBadge({ locale, className = '' }: Props) {
  const [display, setDisplay] = useState<SpecifiedInsighterDisplay | null>(null)
  const [hasSpecifiedTarget, setHasSpecifiedTarget] = useState(false)

  useEffect(() => {
    const syncDisplay = () => {
      setDisplay(readStoredSpecifiedInsighterDisplay(locale))
      setHasSpecifiedTarget(Boolean(readStoredSpecifiedInsighterUuid(locale)))
    }

    syncDisplay()
    window.addEventListener(specifiedInsighterDisplayUpdatedEvent, syncDisplay)

    return () => {
      window.removeEventListener(specifiedInsighterDisplayUpdatedEvent, syncDisplay)
    }
  }, [locale])

  if (!display && !hasSpecifiedTarget) return null

  const label = locale === 'ar' ? 'الخدمة بواسطة' : 'Service by'
  const displayName = display?.name || ''
  const profileHref = display
    ? `/${locale}/profile/${encodeURIComponent(display.uuid)}${
        display.role === 'insighter' ? '?entity=insighter' : ''
      }`
    : ''
  const Wrapper = profileHref ? 'a' : 'span'

  return (
    <Wrapper
      className={`inline-flex max-w-full items-center gap-2 rounded-full border border-blue-400 px-3 py-1 text-sm ${profileHref ? 'transition-opacity hover:opacity-80' : ''} ${className}`}
      href={profileHref || undefined}
      target={profileHref ? '_blank' : undefined}
      rel={profileHref ? 'noopener noreferrer' : undefined}
      title={displayName ? `${label}: ${displayName}` : label}
    >
      <span className="shrink-0 text-[#3C83F6]">{label}</span>
      {display ? (
        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-sky-100 text-[10px] font-bold text-sky-700 ring-1 ring-sky-200">
          {display.imageUrl ? (
            <Image
              src={display.imageUrl}
              alt={display.name}
              width={24}
              height={24}
              unoptimized
              className="h-full w-full object-cover"
            />
          ) : (
            getInitials(display.name)
          )}
        </span>
      ) : null}
      <span className="min-w-0 truncate">
        {displayName ? (
          <span className="bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 bg-clip-text text-transparent">
            {displayName}
          </span>
        ) : null}
      </span>
    </Wrapper>
  )
}
