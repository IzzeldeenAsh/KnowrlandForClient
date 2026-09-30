'use client'

import { IconBook } from '@tabler/icons-react'

/** Advanced documents search on the home route, prefilled with the keyword. */
export function getInsightsSearchHref(locale: string, keyword: string) {
  const params = new URLSearchParams()
  const trimmed = keyword.trim()
  if (trimmed) params.set('keyword', trimmed)
  params.set('search_type', 'knowledge')
  return `/${locale}/home?${params.toString()}`
}

export function getFeedSearchPlaceholder(locale: string) {
  return locale === 'ar' ? 'ابحث في الموجز أو المستندات...' : 'Search in Feed or Insights'
}

type FeedSearchScopeToggleProps = {
  locale: string
  active: boolean
  onChange: (active: boolean) => void
}

/** Pill at the end of the feed search that routes the query to Insights instead of the feed. */
export default function FeedSearchScopeToggle({ locale, active, onChange }: FeedSearchScopeToggleProps) {
  const isRTL = locale === 'ar'
  const label = isRTL ? 'حسب المستندات' : 'By Insights'

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onChange(!active)}
      title={
        active
          ? isRTL ? 'البحث في المستندات مفعّل' : 'Searching Insights'
          : isRTL ? 'ابحث في المستندات بدلاً من الموجز' : 'Search Insights instead of the feed'
      }
      className={`inline-flex h-7 shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-2.5 text-[12px] font-semibold leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] ${active
        ? 'border-[#2378E8] bg-[#2378E8] text-white hover:bg-[#1D6AD0]'
        : 'border-[#D7E1EE] bg-[#F8FAFC] text-[#475569] hover:border-[#2378E8]/40 hover:bg-[#EEF5FF] hover:text-[#2378E8]'
        }`}
    >
      <IconBook aria-hidden size={14} stroke={2} />
      {label}
    </button>
  )
}
