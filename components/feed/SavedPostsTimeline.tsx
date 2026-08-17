'use client'

import { IconBookmark, IconLoader2 } from '@tabler/icons-react'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { dashboardUrl, publicBaseUrl } from '@/app/config'
import { useToast } from '@/components/toast/ToastContext'
import { useUserProfile } from '@/components/ui/header/hooks/useUserProfile'
import {
  getSavedCommunityFeed,
  type FeedItem,
  type SavedCommunityFeedMeta,
} from '@/services/feed.service'
import { FeedCard, FeedSkeleton } from './MyFeedsTimeline'

type SavedPostsTimelineProps = {
  locale: string
}

const copyByLocale = {
  en: {
    title: 'Saved Posts',
    description: 'A private collection of posts and White Papers you want to revisit.',
    loading: 'Loading your saved posts…',
    loadError: 'We couldn’t load your saved posts.',
    tryAgain: 'Try again',
    emptyTitle: 'Save ideas worth returning to',
    emptyDescription: 'Use the bookmark on any community post or White Paper and it will appear here.',
    explore: 'Explore the community feed',
    loadMore: 'Load more saved posts',
    loadingMore: 'Loading more…',
    loginTitle: 'Log in to see your saved posts',
    loginDescription: 'Your saved collection is private and available on every device when you’re signed in.',
    login: 'Log in',
  },
  ar: {
    title: 'المنشورات المحفوظة',
    description: 'مجموعتك الخاصة من المنشورات والأوراق البيضاء التي تود العودة إليها.',
    loading: 'جارٍ تحميل منشوراتك المحفوظة…',
    loadError: 'تعذر تحميل منشوراتك المحفوظة.',
    tryAgain: 'حاول مرة أخرى',
    emptyTitle: 'احفظ الأفكار التي تستحق العودة إليها',
    emptyDescription: 'استخدم علامة الحفظ على أي منشور أو ورقة بيضاء في المجتمع لتظهر هنا.',
    explore: 'استكشف موجز المجتمع',
    loadMore: 'تحميل المزيد من المنشورات المحفوظة',
    loadingMore: 'جارٍ تحميل المزيد…',
    loginTitle: 'سجّل الدخول لعرض منشوراتك المحفوظة',
    loginDescription: 'مجموعتك المحفوظة خاصة ومتاحة على جميع أجهزتك عند تسجيل الدخول.',
    login: 'تسجيل الدخول',
  },
} as const

export default function SavedPostsTimeline({ locale }: SavedPostsTimelineProps) {
  const copy = copyByLocale[locale === 'ar' ? 'ar' : 'en']
  const toast = useToast()
  const { user, isAuthResolved } = useUserProfile()
  const [items, setItems] = useState<FeedItem[]>([])
  const [meta, setMeta] = useState<SavedCommunityFeedMeta | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [loadError, setLoadError] = useState(false)

  const loadFirstPage = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true)
    setLoadError(false)

    try {
      const result = await getSavedCommunityFeed(locale, null, signal)
      setItems(result.data)
      setMeta(result.meta)
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      setLoadError(true)
    } finally {
      if (!signal?.aborted) setIsLoading(false)
    }
  }, [locale])

  useEffect(() => {
    if (!isAuthResolved || !user) {
      if (isAuthResolved) setIsLoading(false)
      return
    }

    const controller = new AbortController()
    void loadFirstPage(controller.signal)
    return () => controller.abort()
  }, [isAuthResolved, loadFirstPage, user])

  const loadMore = async () => {
    if (isLoadingMore || !meta?.next_cursor) return

    setIsLoadingMore(true)
    try {
      const result = await getSavedCommunityFeed(locale, meta.next_cursor)
      setItems((previous) => {
        const existing = new Set(previous.map((item) => item.uuid))
        return [...previous, ...result.data.filter((item) => !existing.has(item.uuid))]
      })
      setMeta(result.meta)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : copy.loadError)
    } finally {
      setIsLoadingMore(false)
    }
  }

  if (!isAuthResolved || isLoading) {
    return (
      <section aria-label={copy.loading}>
        <FeedSkeleton />
      </section>
    )
  }

  if (!user) {
    const returnUrl = encodeURIComponent(`${publicBaseUrl}/${locale}?view=saved-posts`)

    return (
      <section className="rounded-lg border border-[#D6E2F0] bg-white px-6 py-14 text-center sm:px-10">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF3FF] text-[#2378E8]">
          <IconBookmark aria-hidden className="h-5 w-5" stroke={1.8} />
        </div>
        <h1 className="mt-4 text-[19px] font-bold text-[#101724]">{copy.loginTitle}</h1>
        <p className="mx-auto mt-2 max-w-md text-[13px] leading-6 text-[#64748B]">{copy.loginDescription}</p>
        <Link
          href={`${dashboardUrl}/auth/login?returnUrl=${returnUrl}`}
          className="mt-5 inline-flex min-h-10 items-center justify-center rounded-md bg-[#2378E8] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#1B64C5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2"
        >
          {copy.login}
        </Link>
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
    <section aria-labelledby="saved-posts-title">
      <header className="mb-4 rounded-lg border border-[#D7E2EF] bg-white px-5 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF3FF] text-[#2378E8]">
            <IconBookmark aria-hidden className="h-5 w-5" fill="currentColor" stroke={2} />
          </div>
          <div className="min-w-0">
            <h1 id="saved-posts-title" className="text-[20px] font-semibold tracking-[-0.02em] text-[#101724]">
              {copy.title}
            </h1>
            <p className="mt-0.5 text-[12.5px] leading-5 text-[#697B94]">{copy.description}</p>
          </div>
        </div>
      </header>

      {items.length === 0 ? (
        <div className="relative overflow-hidden rounded-lg border border-[#D7E2EF] bg-white px-6 py-16 text-center">
          <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2378E8] via-[#36B7C8] to-[#F3B84B]" />
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#CFE0F4] bg-[#F3F8FF] text-[#2378E8] shadow-[0_8px_24px_rgba(35,120,232,0.12)]">
            <IconBookmark aria-hidden className="h-6 w-6" stroke={1.7} />
          </div>
          <h2 className="mt-5 text-[19px] font-bold tracking-[-0.02em] text-[#101724]">{copy.emptyTitle}</h2>
          <p className="mx-auto mt-2 max-w-md text-[13px] leading-6 text-[#64748B]">{copy.emptyDescription}</p>
          <Link
            href={`/${locale}`}
            className="mt-6 inline-flex min-h-10 items-center justify-center rounded-md border border-[#B9CCE3] bg-white px-5 text-[13px] font-semibold text-[#2378E8] transition-colors hover:bg-[#F3F8FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2"
          >
            {copy.explore}
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <FeedCard
              key={item.uuid}
              item={item}
              locale={locale}
              articleAccess="community"
              onSaveChange={(changedItem, isSaved) => {
                if (!isSaved) {
                  setItems((previous) => previous.filter((entry) => entry.uuid !== changedItem.uuid))
                }
              }}
            />
          ))}
        </div>
      )}

      {meta?.has_more && (
        <button
          type="button"
          onClick={() => void loadMore()}
          disabled={isLoadingMore}
          className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#C8D8EB] bg-white px-4 text-[13px] font-semibold text-[#2378E8] transition-colors hover:bg-[#F5F9FE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] disabled:cursor-wait disabled:opacity-60"
        >
          {isLoadingMore && <IconLoader2 aria-hidden className="h-4 w-4 animate-spin" stroke={2} />}
          {isLoadingMore ? copy.loadingMore : copy.loadMore}
        </button>
      )}
    </section>
  )
}
