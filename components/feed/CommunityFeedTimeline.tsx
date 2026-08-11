'use client'

import { IconLock, IconLoader2, IconPhoto } from '@tabler/icons-react'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { dashboardUrl, publicBaseUrl } from '@/app/config'
import { useToast } from '@/components/toast/ToastContext'
import { useUserProfile } from '@/components/ui/header/hooks/useUserProfile'
import {
  CommunityFeedApiError,
  getCommunityFeed,
  getCommunityFeedPreview,
  type CommunityFeedMeta,
  type FeedItem,
} from '@/services/feed.service'
import { FeedCard, FeedSkeleton } from './MyFeedsTimeline'

type CommunityFeedTimelineProps = {
  locale: string
}

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
  },
} as const

function GuestFeedGate({ locale }: { locale: string }) {
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
        {copy.loginDescription}
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

export default function CommunityFeedTimeline({ locale }: CommunityFeedTimelineProps) {
  const copy = copyByLocale[locale === 'ar' ? 'ar' : 'en']
  const toast = useToast()
  const { user, isAuthResolved } = useUserProfile()
  const isAuthenticated = user !== null
  const [items, setItems] = useState<FeedItem[]>([])
  const [meta, setMeta] = useState<CommunityFeedMeta | null>(null)
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

      try {
        const result = isAuthenticated
          ? await getCommunityFeed(locale, null, signal)
          : await getCommunityFeedPreview(locale, signal)

        setItems(result.data)
        setMeta(result.meta)
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setLoadError(true)
      } finally {
        if (!signal?.aborted) setIsLoading(false)
      }
    },
    [isAuthenticated, locale],
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

  const loadMore = useCallback(async () => {
    if (
      !isAuthenticated ||
      loadingMoreRef.current ||
      !meta?.has_more ||
      !meta.next_cursor
    ) {
      return
    }

    loadingMoreRef.current = true
    setIsLoadingMore(true)

    try {
      const result = await getCommunityFeed(locale, meta.next_cursor)
      setItems((previous) => {
        const existingUuids = new Set(previous.map((item) => item.uuid))
        return [...previous, ...result.data.filter((item) => !existingUuids.has(item.uuid))]
      })
      setMeta(result.meta)
    } catch (error) {
      if (error instanceof CommunityFeedApiError && error.refreshRequired) {
        toast.info(copy.sessionRefreshed, '')
        await loadFirstPage()
      } else {
        toast.error(error instanceof Error ? error.message : copy.loadError)
      }
    } finally {
      loadingMoreRef.current = false
      setIsLoadingMore(false)
    }
  }, [copy.loadError, copy.sessionRefreshed, isAuthenticated, loadFirstPage, locale, meta, toast])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !isAuthenticated || !meta?.has_more) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) void loadMore()
      },
      { rootMargin: '600px 0px' },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [isAuthenticated, loadMore, meta?.has_more])

  if (!isAuthResolved || isLoading) {
    return (
      <section aria-label={copy.loading}>
        <FeedSkeleton />
      </section>
    )
  }

  if (loadError) {
    return (
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
    )
  }

  return (
    <section aria-label={copy.title}>
      {items.length === 0 ? (
        <div className="rounded-lg border border-[#DCE4EF] bg-white px-6 py-14 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EDF4FD] text-[#2378E8]">
            <IconPhoto aria-hidden className="h-5 w-5" stroke={1.7} />
          </div>
          <h2 className="mt-4 text-[18px] font-bold text-[#101724]">{copy.emptyTitle}</h2>
          <p className="mx-auto mt-2 max-w-sm text-[13px] leading-6 text-[#64748B]">
            {copy.emptyDescription}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <FeedCard
              key={item.uuid}
              item={item}
              locale={locale}
              articleAccess="community"
            />
          ))}
        </div>
      )}

      {!isAuthenticated && (
        <div className="mt-4">
          <GuestFeedGate locale={locale} />
        </div>
      )}

      {isAuthenticated && meta?.has_more && (
        <div ref={sentinelRef} className="flex min-h-20 items-center justify-center" aria-live="polite">
          {isLoadingMore && (
            <span className="inline-flex items-center gap-2 text-[13px] text-[#64748B]">
              <IconLoader2 aria-hidden className="h-4 w-4 animate-spin" stroke={2} />
              {copy.loadingMore}
            </span>
          )}
        </div>
      )}

      {isAuthenticated && items.length > 0 && meta && !meta.has_more && (
        <p className="py-6 text-center text-[12px] text-[#8A99B1]">{copy.endOfFeed}</p>
      )}
    </section>
  )
}
