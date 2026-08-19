'use client'

import { IconSearch, IconX } from '@tabler/icons-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function FeedMobileSearch({ locale }: { locale: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const activeKeyword = searchParams.get('keyword') ?? ''
  const [query, setQuery] = useState(activeKeyword)

  useEffect(() => {
    setQuery(activeKeyword)
  }, [activeKeyword])

  useEffect(() => {
    if (pathname !== `/${locale}`) return

    const keyword = query.trim()
    if (keyword === activeKeyword.trim()) return

    const timeoutId = window.setTimeout(() => {
      router.replace(keyword ? `/${locale}?keyword=${encodeURIComponent(keyword)}` : `/${locale}`, { scroll: false })
    }, 1000)

    return () => window.clearTimeout(timeoutId)
  }, [activeKeyword, locale, pathname, query, router])

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const keyword = query.trim()
    router.push(keyword ? `/${locale}?keyword=${encodeURIComponent(keyword)}` : `/${locale}`)
  }

  const clearSearch = () => {
    setQuery('')
    if (activeKeyword.trim()) router.push(`/${locale}`)
  }

  const hasQuery = query.trim().length > 0

  if (pathname !== `/${locale}`) return null

  return (
    <form onSubmit={submit} className="xl:hidden" role="search">
      <label className="sr-only" htmlFor={`feed-mobile-search-${locale}`}>
        {locale === 'ar' ? 'البحث في الموجز' : 'Search the feed'}
      </label>
      <div className="relative">
        <input
          id={`feed-mobile-search-${locale}`}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={locale === 'ar' ? 'ابحث في الموجز...' : 'Search ..'}
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
          className={`h-11 w-full rounded-lg border border-[#D7E1EE] bg-white px-4 text-[14px] text-[#1E293B] shadow-sm outline-none transition-colors placeholder:text-[#94A3B8] focus:border-[#2378E8] focus:ring-2 focus:ring-[#2378E8]/15 ${locale === 'ar' ? 'pl-20' : 'pr-20'}`}
        />
        {hasQuery && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label={locale === 'ar' ? 'مسح البحث' : 'Clear search'}
            className={`absolute top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-[#94A3B8] transition-colors hover:bg-[#F1F5F9] hover:text-[#475569] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] ${locale === 'ar' ? 'left-10' : 'right-10'}`}
          >
            <IconX aria-hidden className="h-[17px] w-[17px]" stroke={2} />
          </button>
        )}
        <button
          type="submit"
          aria-label={locale === 'ar' ? 'بحث' : 'Search'}
          className={`absolute top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-[#64748B] transition-colors hover:bg-[#EEF5FF] hover:text-[#2378E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] ${locale === 'ar' ? 'left-1.5' : 'right-1.5'}`}
        >
          <IconSearch aria-hidden className="h-[18px] w-[18px]" stroke={2} />
        </button>
      </div>
    </form>
  )
}
