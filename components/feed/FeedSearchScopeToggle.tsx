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
      className={`inline-flex h-6 shrink-0 items-center gap-1 whitespace-nowrap rounded-full border bg-[#EEF5FF] px-2 text-[11px] font-normal leading-none transition-colors hover:border-[#2378E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8]/30 ${active
        ? 'border-[#2378E8] text-[#2378E8]'
        : 'border-[#D7E1EE] text-[#64748B]'
        }`}
    >
      <IconBook aria-hidden size={12} stroke={1.5} />
      {label}
    </button>
  )
}
