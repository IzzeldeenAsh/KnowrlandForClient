'use client'

import { IconListDetails } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

type FloatingFeedButtonProps = {
  locale: string
}

export default function FloatingFeedButton({ locale }: FloatingFeedButtonProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const normalizedPathname = pathname.replace(/\/+$/, '') || '/'
  const feedPath = `/${locale}`
  const isOnCommunityFeed =
    normalizedPathname === feedPath && searchParams.get('view') !== 'my-feeds'

  if (isOnCommunityFeed) return null

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
      className={`fixed bottom-[calc(var(--auth-banner-offset,0px)+1.5rem)] z-40 inline-flex min-h-12 items-center gap-2 rounded-full border border-[#FFB37A] bg-gradient-to-r from-[#FF8A3D] to-[#FF6B35] px-5 text-[13px] font-semibold text-white backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2 active:translate-y-0 active:scale-100 ${
        isArabic ? 'left-5 sm:left-7' : 'right-5 sm:right-7'
      }`}
    >
      <IconListDetails aria-hidden className="h-[18px] w-[18px]" stroke={2.1} />
      <span>{label}</span>
    </Link>
  )
}
