'use client'

import { IconSearch, IconX } from '@tabler/icons-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FEED_REFRESH_REQUESTED_EVENT } from './feedEvents'
import FeedSearchScopeToggle, { getFeedSearchPlaceholder, getInsightsSearchHref } from './FeedSearchScopeToggle'

export default function FeedMobileSearch({ locale }: { locale: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const activeKeyword = searchParams.get('keyword') ?? ''
  const [query, setQuery] = useState(activeKeyword)
  // When on, the query goes to the Insights (documents) search instead of the feed.
  const [searchInsights, setSearchInsights] = useState(false)

  useEffect(() => {
    setQuery(activeKeyword)
  }, [activeKeyword])

  useEffect(() => {
    if (pathname !== `/${locale}` || searchInsights) return

    const keyword = query.trim()
    if (keyword === activeKeyword.trim()) return

    const timeoutId = window.setTimeout(() => {
      router.replace(keyword ? `/${locale}?keyword=${encodeURIComponent(keyword)}` : `/${locale}`, { scroll: false })
    }, 1000)

    return () => window.clearTimeout(timeoutId)
  }, [activeKeyword, locale, pathname, query, router, searchInsights])

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const keyword = query.trim()
    if (searchInsights) {
      router.push(getInsightsSearchHref(locale, keyword))
      return
    }
    // The keyword is live-applied while typing, so re-submitting it re-runs the search.
    if (keyword === activeKeyword.trim()) {
      window.dispatchEvent(new Event(FEED_REFRESH_REQUESTED_EVENT))
      return
    }
    router.push(keyword ? `/${locale}?keyword=${encodeURIComponent(keyword)}` : `/${locale}`)
  }

  const clearSearch = () => {
    setQuery('')
    if (activeKeyword.trim()) router.push(`/${locale}`)
  }

  const hasQuery = query.trim().length > 0
  const isRTL = locale === 'ar'

  if (pathname !== `/${locale}`) return null

  return (
    <form onSubmit={submit} className="xl:hidden" role="search">
      <label className="sr-only" htmlFor={`feed-mobile-search-${locale}`}>
        {isRTL ? 'البحث في الموجز أو المستندات' : 'Search in Feed or Insights'}
      </label>
      <div className="relative">
        <input
          id={`feed-mobile-search-${locale}`}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={getFeedSearchPlaceholder(locale)}
          dir={isRTL ? 'rtl' : 'ltr'}
          className={`h-11 w-full rounded-lg border border-[#D7E1EE] bg-white text-[14px] text-[#1E293B] shadow-sm outline-none transition-colors placeholder:text-[#94A3B8] focus:border-[#2378E8] focus:ring-2 focus:ring-[#2378E8]/15 [&::-webkit-search-cancel-button]:appearance-none ${isRTL ? 'pr-10 pl-44' : 'pl-10 pr-40'}`}
        />
        <button
          type="submit"
          aria-label={isRTL ? 'بحث' : 'Search'}
          className={`absolute top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-[#64748B] transition-colors hover:bg-[#EEF5FF] hover:text-[#2378E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] ${isRTL ? 'right-1.5' : 'left-1.5'}`}
        >
          <IconSearch aria-hidden className="h-[18px] w-[18px]" stroke={2} />
        </button>
        <div className={`absolute top-1/2 flex -translate-y-1/2 items-center gap-1 ${isRTL ? 'left-2' : 'right-2'}`}>
          {hasQuery && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label={isRTL ? 'مسح البحث' : 'Clear search'}
              className="flex h-8 w-8 items-center justify-center rounded-md text-[#94A3B8] transition-colors hover:bg-[#F1F5F9] hover:text-[#475569] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8]"
            >
              <IconX aria-hidden className="h-[17px] w-[17px]" stroke={2} />
            </button>
          )}
          <FeedSearchScopeToggle locale={locale} active={searchInsights} onChange={setSearchInsights} />
        </div>
      </div>
    </form>
  )
}
