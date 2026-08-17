'use client'

import {
  IconCheck,
  IconChevronDown,
  IconLoader2,
  IconLock,
  IconPhoto,
  IconSearch,
} from '@tabler/icons-react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { dashboardUrl, publicBaseUrl } from '@/app/config'
import { useToast } from '@/components/toast/ToastContext'
import { useUserProfile } from '@/components/ui/header/hooks/useUserProfile'
import { useAllIndustries } from '@/hooks/industries/useAllIndustries'
import {
  CommunityFeedApiError,
  getCommunityFeed,
  getCommunityFeedPreview,
  searchCommunityFeed,
  type CommunityFeedMeta,
  type CommunityFeedSearchMeta,
  type FeedItem,
} from '@/services/feed.service'
import { FeedCard, FeedSkeleton } from './MyFeedsTimeline'
import { useFeedSearchInsights } from './FeedSearchInsightsContext'
import RoleUpgradeCard from './RoleUpgradeCard'
import TopDocumentsCard from './TopDocumentsCard'
import RelatedDocumentsCard from './RelatedDocumentsCard'

type CommunityFeedTimelineProps = {
  locale: string
  keyword?: string
  industry?: number | null
  contentType?: 'post' | 'article' | null
}

type FeedMeta = CommunityFeedMeta | CommunityFeedSearchMeta

const copyByLocale = {
  en: {
    title: 'Community feed',
    loading: 'Loading community posts…',
    emptyTitle: 'No community posts yet',
    emptyDescription: 'Published posts from Insighta experts will appear here.',
    loadError: 'We couldn’t load the community feed.',
    tryAgain: 'Try again',
    loginTitle: 'Keep exploring the community',
    loginDescription: 'Log in to see your personalized feed and keep scrolling.',
    login: 'Log in to see more',
    signup: 'Create an account',
    loadingMore: 'Loading more posts…',
    endOfFeed: 'You’re all caught up.',
    sessionRefreshed: 'Your feed was refreshed because the previous session expired.',
    searchResults: 'Search results',
    searchFor: 'Matches for',
    allIndustries: 'All industries',
    allContent: 'All content',
    posts: 'Posts',
    articles: 'White Papers',
    searchFilters: 'Search filters…',
    noFilterMatches: 'No matching filters.',
    noMatchesTitle: 'No feed matches found',
    noMatchesDescription: 'Try a broader keyword or remove one of the filters.',
    noMoreMatches: 'You’ve reached the end of these results.',
    moreFromCommunity: 'More from the community',
    searchSessionRefreshed: 'Your search was refreshed because the previous session expired.',
    searchLoginDescription: 'Log in to search posts, White Papers, and expert insights.',
  },
  ar: {
    title: 'موجز المجتمع',
    loading: 'جارٍ تحميل منشورات المجتمع…',
    emptyTitle: 'لا توجد منشورات في المجتمع بعد',
    emptyDescription: 'ستظهر هنا المنشورات التي ينشرها خبراء إنسايتا.',
    loadError: 'تعذر تحميل موجز المجتمع.',
    tryAgain: 'حاول مرة أخرى',
    loginTitle: 'واصل استكشاف المجتمع',
    loginDescription: 'سجّل الدخول لعرض موجزك المخصص ومتابعة التصفح.',
    login: 'سجّل الدخول لعرض المزيد',
    signup: 'إنشاء حساب',
    loadingMore: 'جارٍ تحميل المزيد من المنشورات…',
    endOfFeed: 'لقد اطّلعت على جميع المنشورات.',
    sessionRefreshed: 'تم تحديث موجزك لانتهاء جلسة التصفح السابقة.',
    searchResults: 'نتائج البحث',
    searchFor: 'نتائج مطابقة لـ',
    allIndustries: 'كل القطاعات',
    allContent: 'كل المحتوى',
    posts: 'منشورات',
    articles: 'أوراق بيضاء',
    searchFilters: 'ابحث في عوامل التصفية…',
    noFilterMatches: 'لا توجد عوامل تصفية مطابقة.',
    noMatchesTitle: 'لم نجد نتائج في الموجز',
    noMatchesDescription: 'جرّب كلمة أوسع أو أزل أحد عوامل التصفية.',
    noMoreMatches: 'وصلت إلى نهاية هذه النتائج.',
    moreFromCommunity: 'المزيد من المجتمع',
    searchSessionRefreshed: 'تم تحديث البحث لانتهاء جلسة البحث السابقة.',
    searchLoginDescription: 'سجّل الدخول للبحث في المنشورات والأوراق البيضاء ورؤى الخبراء.',
  },
} as const

function GuestFeedGate({ locale, isSearching = false }: { locale: string; isSearching?: boolean }) {
  const copy = copyByLocale[locale === 'ar' ? 'ar' : 'en']
  const [returnUrl, setReturnUrl] = useState(`${publicBaseUrl}/${locale}`)

  useEffect(() => {
    setReturnUrl(window.location.href)
  }, [])

  const encodedReturnUrl = encodeURIComponent(returnUrl)

  return (
    <section className="overflow-hidden rounded-lg border border-[#CFE0F4] bg-white px-6 py-7 text-center sm:px-8 sm:py-8">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF3FF] text-[#2378E8]">
        <IconLock aria-hidden className="h-5 w-5" stroke={1.8} />
      </div>
      <h2 className="mt-4 text-[19px] font-bold tracking-[-0.02em] text-[#101724]">
        {copy.loginTitle}
      </h2>
      <p className="mx-auto mt-2 max-w-md text-[13px] leading-6 text-[#64748B]">
        {isSearching ? copy.searchLoginDescription : copy.loginDescription}
      </p>
      <div className="mx-auto mt-5 flex max-w-sm flex-col gap-2.5 sm:flex-row sm:justify-center">
        <Link
          href={`${dashboardUrl}/auth/login?returnUrl=${encodedReturnUrl}`}
          className="inline-flex min-h-10 items-center justify-center rounded-md bg-[#2378E8] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#1B64C5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2"
        >
          {copy.login}
        </Link>
        <Link
          href={`${dashboardUrl}/auth/sign-up?returnUrl=${encodedReturnUrl}`}
          className="inline-flex min-h-10 items-center justify-center rounded-md border border-[#B8CBE2] px-5 text-[13px] font-semibold text-[#36506F] transition-colors hover:bg-[#F5F8FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2"
        >
          {copy.signup}
        </Link>
      </div>
    </section>
  )
}

type SearchableFilterOption = {
  value: string
  label: string
}

function SearchableFilterDropdown({
  value,
  options,
  placeholder,
  searchPlaceholder,
  noMatchesLabel,
  isLoading = false,
  onChange,
}: {
  value: string
  options: SearchableFilterOption[]
  placeholder: string
  searchPlaceholder: string
  noMatchesLabel: string
  isLoading?: boolean
  onChange: (value: string) => void
}) {
  const [query, setQuery] = useState('')
  const selectedOption = options.find((option) => option.value === value)
  const normalizedQuery = query.trim().toLocaleLowerCase()
  const visibleOptions = normalizedQuery
    ? options.filter((option) => option.label.toLocaleLowerCase().includes(normalizedQuery))
    : options

  return (
    <Listbox
      value={value}
      onChange={(nextValue) => {
        onChange(nextValue)
        setQuery('')
      }}
    >
      <div className="relative min-w-0">
        <ListboxButton
          aria-label={placeholder}
          disabled={isLoading}
          className="flex min-h-9 w-full items-center gap-2 rounded-md border border-[#D7E1EE] bg-white px-2.5 text-start text-[12px] font-medium text-[#475569] outline-none transition-colors hover:border-[#B8CBE2] focus-visible:border-[#2378E8] focus-visible:ring-2 focus-visible:ring-[#2378E8]/15 disabled:cursor-wait disabled:opacity-60 sm:text-[13px]"
        >
          <span className="min-w-0 flex-1 truncate">{selectedOption?.label ?? placeholder}</span>
          <IconChevronDown aria-hidden className="h-4 w-4 shrink-0 text-[#64748B]" stroke={2} />
        </ListboxButton>
        <ListboxOptions className="absolute left-0 top-[calc(100%+6px)] z-50 w-full min-w-[12rem] rounded-md border border-[#D7E1EE] bg-white p-1.5 shadow-[0_12px_30px_rgba(27,56,93,0.16)] focus:outline-none">
          <div className="border-b border-[#E7EDF4] pb-1.5">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onClick={(event) => event.stopPropagation()}
              onKeyDown={(event) => event.stopPropagation()}
              placeholder={searchPlaceholder}
              className="h-8 w-full rounded border border-[#D7E1EE] bg-[#F8FAFC] px-2 text-[12px] text-[#334155] outline-none placeholder:text-[#94A3B8] focus:border-[#2378E8] focus:ring-2 focus:ring-[#2378E8]/15"
            />
          </div>
          <div className="max-h-52 overflow-y-auto pt-1.5">
            {isLoading ? (
              <div className="px-2 py-2 text-[12px] text-[#64748B]">…</div>
            ) : visibleOptions.length ? (
              visibleOptions.map((option) => (
                <ListboxOption
                  key={option.value || '__all'}
                  value={option.value}
                  className="flex cursor-pointer items-center gap-2 rounded px-2 py-2 text-[12px] text-[#475569] data-[focus]:bg-[#EDF4FD] data-[focus]:text-[#2378E8] sm:text-[13px]"
                >
                  <span className="min-w-0 flex-1 truncate">{option.label}</span>
                  {option.value === value && <IconCheck aria-hidden className="h-4 w-4 shrink-0 text-[#2378E8]" stroke={2.25} />}
                </ListboxOption>
              ))
            ) : (
              <div className="px-2 py-2 text-[12px] text-[#64748B]">{noMatchesLabel}</div>
            )}
          </div>
        </ListboxOptions>
      </div>
    </Listbox>
  )
}

function FeedSearchHeader({
  locale,
  keyword,
  industry,
  contentType,
}: Required<Pick<CommunityFeedTimelineProps, 'locale' | 'keyword'>> &
  Pick<CommunityFeedTimelineProps, 'industry' | 'contentType'>) {
  const isRTL = locale === 'ar'
  const copy = copyByLocale[isRTL ? 'ar' : 'en']
  const router = useRouter()
  const { industries, isLoading } = useAllIndustries({ locale, topSubIndustry: 0 })

  const updateFilters = (nextIndustry: number | null, nextContentType: 'post' | 'article' | null) => {
    const params = new URLSearchParams({ keyword })
    if (nextIndustry) params.set('industry', String(nextIndustry))
    if (nextContentType) params.set('content_type', nextContentType)
    router.replace(`/${locale}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="space-y-2.5 px-4 py-1 sm:px-6 xl:px-1 md:flex md:items-end md:justify-between md:gap-4 md:space-y-0">
      <div className="min-w-0">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#64748B]">
          <IconSearch aria-hidden className="h-3.5 w-3.5 text-[#2378E8]" stroke={2} />
          {copy.searchResults}
        </span>
        <h1 className="mt-1 text-[15px] font-semibold tracking-[-0.015em] text-[#334155] sm:text-base">
          {copy.searchFor}{' '}
          <bdi className="font-semibold text-[#2378E8]">“{keyword}”</bdi>
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-2.5 md:w-80 md:shrink-0">
        <SearchableFilterDropdown
          value={industry ? String(industry) : ''}
          options={[
            { value: '', label: copy.allIndustries },
            ...industries.map((item) => ({ value: String(item.id), label: item.name })),
          ]}
          placeholder={copy.allIndustries}
          searchPlaceholder={copy.searchFilters}
          noMatchesLabel={copy.noFilterMatches}
          isLoading={isLoading}
          onChange={(nextValue) => updateFilters(nextValue ? Number(nextValue) : null, contentType ?? null)}
        />
        <SearchableFilterDropdown
          value={contentType ?? ''}
          options={[
            { value: '', label: copy.allContent },
            { value: 'post', label: copy.posts },
            { value: 'article', label: copy.articles },
          ]}
          placeholder={copy.allContent}
          searchPlaceholder={copy.searchFilters}
          noMatchesLabel={copy.noFilterMatches}
          onChange={(nextValue) => updateFilters(industry ?? null, (nextValue || null) as 'post' | 'article' | null)}
        />
      </div>
    </div>
  )
}

export default function CommunityFeedTimeline({
  locale,
  keyword = '',
  industry = null,
  contentType = null,
}: CommunityFeedTimelineProps) {
  const copy = copyByLocale[locale === 'ar' ? 'ar' : 'en']
  const toast = useToast()
  const { user, isAuthResolved } = useUserProfile()
  const isAuthenticated = user !== null
  const normalizedKeyword = keyword.trim()
  const isSearching = normalizedKeyword.length > 0
  const {
    setInsights: setRelatedDocuments,
    setIsLoading: setRelatedDocumentsLoading,
  } = useFeedSearchInsights()
  const [items, setItems] = useState<FeedItem[]>([])
  const [meta, setMeta] = useState<FeedMeta | null>(null)
  // When a search runs out of matches we keep the timeline alive by streaming
  // in the regular community feed (social-media style). These track that phase.
  const [overflowMeta, setOverflowMeta] = useState<CommunityFeedMeta | null>(null)
  const [overflowStartIndex, setOverflowStartIndex] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const loadingMoreRef = useRef(false)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const loadFirstPage = useCallback(
    async (signal?: AbortSignal) => {
      setIsLoading(true)
      setLoadError(false)
      setItems([])
      setMeta(null)
      setOverflowMeta(null)
      setOverflowStartIndex(null)

      setRelatedDocuments([])
      setRelatedDocumentsLoading(isSearching)

      if (isSearching && !isAuthenticated) {
        setIsLoading(false)
        setRelatedDocumentsLoading(false)
        return
      }

      try {
        if (isSearching) {
          const result = await searchCommunityFeed(
            locale,
            {
              keyword: normalizedKeyword,
              industry,
              contentType,
              limit: 10,
            },
            signal,
          )
          setItems(result.feed)
          setRelatedDocuments(result.insights.slice(0, 5))
          setMeta(result.meta)
        } else {
          const result = isAuthenticated
            ? await getCommunityFeed(locale, null, signal)
            : await getCommunityFeedPreview(locale, signal)

          setItems(result.data)
          setMeta(result.meta)
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setLoadError(true)
      } finally {
        if (!signal?.aborted) {
          setIsLoading(false)
          setRelatedDocumentsLoading(false)
        }
      }
    },
    [contentType, industry, isAuthenticated, isSearching, locale, normalizedKeyword, setRelatedDocuments, setRelatedDocumentsLoading],
  )

  useEffect(() => {
    if (!isAuthResolved) return

    const controller = new AbortController()
    void loadFirstPage(controller.signal)
    return () => controller.abort()
  }, [isAuthResolved, loadFirstPage])

  useEffect(() => {
    if (!isAuthenticated) return

    const refresh = () => void loadFirstPage()
    window.addEventListener('feed:published', refresh)
    return () => window.removeEventListener('feed:published', refresh)
  }, [isAuthenticated, loadFirstPage])

  // Search results are finite; the community feed is what keeps the page
  // scrolling. `overflowActive` means we've exhausted the matches and are now
  // appending the regular feed underneath them.
  const overflowActive = overflowStartIndex !== null
  const searchHasMore = Boolean(meta?.has_more && meta?.next_cursor)
  const hasMore = isSearching
    ? overflowActive
      ? Boolean(overflowMeta?.has_more && overflowMeta?.next_cursor)
      : // more matches to page through, or matches exist to overflow past into
        // the community feed (skip overflow entirely on a zero-result search)
        searchHasMore || items.length > 0
    : Boolean(meta?.has_more && meta?.next_cursor)

  const appendItems = useCallback((incoming: FeedItem[]) => {
    setItems((previous) => {
      const existingUuids = new Set(previous.map((item) => item.uuid))
      return [...previous, ...incoming.filter((item) => !existingUuids.has(item.uuid))]
    })
  }, [])

  const loadMore = useCallback(async () => {
    if (!isAuthenticated || loadingMoreRef.current) return

    loadingMoreRef.current = true
    setIsLoadingMore(true)

    try {
      if (isSearching && !searchHasMore) {
        // Matches are exhausted — stream in the regular community feed.
        const cursor = overflowActive ? overflowMeta?.next_cursor ?? null : null
        if (overflowActive && !cursor) return

        const next = await getCommunityFeed(locale, cursor)
        setItems((previous) => {
          if (overflowStartIndex === null) setOverflowStartIndex(previous.length)
          const existingUuids = new Set(previous.map((item) => item.uuid))
          return [...previous, ...next.data.filter((item) => !existingUuids.has(item.uuid))]
        })
        setOverflowMeta(next.meta)
        return
      }

      const nextItems = isSearching
        ? await searchCommunityFeed(locale, {
            keyword: normalizedKeyword,
            cursor: meta!.next_cursor,
            industry,
            contentType,
            limit: 10,
          })
        : await getCommunityFeed(locale, meta!.next_cursor)

      const incomingItems = 'feed' in nextItems ? nextItems.feed : nextItems.data
      appendItems(incomingItems)
      setMeta(nextItems.meta)
    } catch (error) {
      if (error instanceof CommunityFeedApiError && error.refreshRequired) {
        toast.info(isSearching ? copy.searchSessionRefreshed : copy.sessionRefreshed, '')
        await loadFirstPage()
      } else {
        toast.error(error instanceof Error ? error.message : copy.loadError)
      }
    } finally {
      loadingMoreRef.current = false
      setIsLoadingMore(false)
    }
  }, [appendItems, contentType, copy.loadError, copy.searchSessionRefreshed, copy.sessionRefreshed, industry, isAuthenticated, isSearching, loadFirstPage, locale, meta, normalizedKeyword, overflowActive, overflowMeta, overflowStartIndex, searchHasMore, toast])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !isAuthenticated || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) void loadMore()
      },
      { rootMargin: '600px 0px' },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, isAuthenticated, loadMore])

  const searchHeader = isSearching ? (
    <FeedSearchHeader
      locale={locale}
      keyword={normalizedKeyword}
      industry={industry}
      contentType={contentType}
    />
  ) : null

  if (!isAuthResolved || isLoading) {
    return (
      <div className="space-y-4">
        {searchHeader}
        <section aria-label={copy.loading}>
          <FeedSkeleton />
        </section>
      </div>
    )
  }

  if (isSearching && !isAuthenticated) {
    return (
      <div className="space-y-4">
        {searchHeader}
        <GuestFeedGate locale={locale} isSearching />
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="space-y-4">
        {searchHeader}
        <section className="rounded-lg border border-[#DCE4EF] bg-white px-6 py-12 text-center">
          <h1 className="text-[18px] font-bold text-[#101724]">{copy.loadError}</h1>
          <button
            type="button"
            onClick={() => void loadFirstPage()}
            className="mt-4 min-h-10 rounded-md bg-[#2378E8] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#1B64C5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2"
          >
            {copy.tryAgain}
          </button>
        </section>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {searchHeader}

      <section aria-label={copy.title}>

        {items.length === 0 ? (
          <div className="rounded-lg border border-[#DCE4EF] bg-white px-6 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EDF4FD] text-[#2378E8]">
              {isSearching ? (
                <IconSearch aria-hidden className="h-5 w-5" stroke={1.7} />
              ) : (
                <IconPhoto aria-hidden className="h-5 w-5" stroke={1.7} />
              )}
            </div>
            <h2 className="mt-4 text-[18px] font-bold text-[#101724]">
              {isSearching ? copy.noMatchesTitle : copy.emptyTitle}
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-[13px] leading-6 text-[#64748B]">
              {isSearching ? copy.noMatchesDescription : copy.emptyDescription}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item, index) => {
              // The right-column widgets are hidden below xl, so weave them
              // between posts (LinkedIn-style) on mobile/tablet. Positions clamp
              // to the last post so short feeds still surface them.
              const upgradeIndex = Math.min(1, items.length - 1)
              const documentsIndex = Math.min(3, items.length - 1)

              return (
                <Fragment key={item.uuid}>
                  {index === overflowStartIndex && (
                    <div className="flex items-center gap-3 py-1" role="separator" aria-label={copy.moreFromCommunity}>
                      <span className="h-px flex-1 bg-[#E2E8F0]" />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A99B1]">
                        {copy.moreFromCommunity}
                      </span>
                      <span className="h-px flex-1 bg-[#E2E8F0]" />
                    </div>
                  )}
                  <FeedCard item={item} locale={locale} articleAccess="community" />
                  {index === upgradeIndex && (
                    <RoleUpgradeCard locale={locale} className="xl:hidden" />
                  )}
                  {index === documentsIndex &&
                    (isSearching ? (
                      <RelatedDocumentsCard locale={locale} className="xl:hidden" />
                    ) : (
                      <TopDocumentsCard locale={locale} className="xl:hidden" />
                    ))}
                </Fragment>
              )
            })}
          </div>
        )}

        {!isAuthenticated && !isSearching && (
          <div className="mt-4">
            <GuestFeedGate locale={locale} />
          </div>
        )}

        {isAuthenticated && hasMore && (
          <div ref={sentinelRef} className="flex min-h-20 items-center justify-center" aria-live="polite">
            {isLoadingMore && (
              <span className="inline-flex items-center gap-2 text-[13px] text-[#64748B]">
                <IconLoader2 aria-hidden className="h-4 w-4 animate-spin" stroke={2} />
                {copy.loadingMore}
              </span>
            )}
          </div>
        )}

        {isAuthenticated && items.length > 0 && !hasMore && (
          <p className="py-6 text-center text-[12px] text-[#8A99B1]">
            {isSearching && !overflowActive ? copy.noMoreMatches : copy.endOfFeed}
          </p>
        )}
      </section>
    </div>
  )
}
