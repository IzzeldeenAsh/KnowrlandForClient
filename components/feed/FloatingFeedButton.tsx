'use client'

import { IconHome2 } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type FloatingFeedButtonProps = {
  locale: string
}

export default function FloatingFeedButton({ locale }: FloatingFeedButtonProps) {
  const pathname = usePathname()
  const normalizedPathname = pathname.replace(/\/+$/, '') || '/'
  const feedPath = `/${locale}`

  if (normalizedPathname === feedPath) return null

  const isArabic = locale === 'ar'
  const label = isArabic ? 'العودة إلى الموجز' : 'Back to Feed'

  return (
    <Link
      href={feedPath}
      aria-label={label}
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
      className={`fixed bottom-[calc(var(--auth-banner-offset,0px)+1.5rem)] z-40 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#C8DAF1] bg-white/95 px-4 text-[13px] font-semibold text-[#2378E8] shadow-[0_10px_30px_rgba(24,73,126,0.18)] backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:border-[#2378E8] hover:bg-[#F4F8FE] hover:shadow-[0_14px_34px_rgba(24,73,126,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2 active:translate-y-0 ${
        isArabic ? 'left-5 sm:left-7' : 'right-5 sm:right-7'
      }`}
    >
      <IconHome2 aria-hidden className="h-[18px] w-[18px]" stroke={1.9} />
      <span>{label}</span>
    </Link>
  )
}
