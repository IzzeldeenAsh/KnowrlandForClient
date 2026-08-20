'use client'

import { IconArrowUp } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

type FloatingBackToTopButtonProps = {
  locale: string
}

export default function FloatingBackToTopButton({ locale }: FloatingBackToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > 320)

    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    return () => window.removeEventListener('scroll', updateVisibility)
  }, [])

  if (!isVisible) return null

  const isArabic = locale === 'ar'
  const label = isArabic ? 'العودة إلى أعلى الصفحة' : 'Back to top'

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={label}
      title={label}
      className={`fixed bottom-[calc(var(--auth-banner-offset,0px)+max(1rem,env(safe-area-inset-bottom)))] z-[1001] inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#82B9FF]/55 bg-[#BFE5FF]/25 text-[#2378E8] shadow-lg shadow-blue-950/15 backdrop-blur-[1px] transition duration-200 hover:-translate-y-0.5 hover:scale-105 hover:border-[#82B9FF]/75 hover:bg-[#BFE5FF]/35 hover:text-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2 active:translate-y-0 active:scale-95 motion-reduce:transition-none ${
        isArabic ? 'right-4' : 'left-4'
      }`}
    >
      <IconArrowUp aria-hidden className="h-[22px] w-[22px]" stroke={2.2} />
    </button>
  )
}
