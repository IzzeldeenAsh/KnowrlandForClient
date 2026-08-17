'use client'

import { IconLoader2, IconPhoto } from '@tabler/icons-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FeedCard, FeedSkeleton } from '@/components/feed/MyFeedsTimeline'
import {
  getInsighterProfileFeed,
  type FeedItem,
  type InsighterProfileFeedMeta,
} from '@/services/feed.service'

type PostsTabProps = {
  uuid: string
  locale: string
}

const copyByLocale = {
  en: {
    loading: 'Loading posts…',
    emptyTitle: 'No posts yet',
    emptyDescription: 'Published posts and White Papers from this insighter will appear here.',
    loadError: 'We couldn’t load this insighter’s posts.',
    tryAgain: 'Try again',
    loadingMore: 'Loading more posts…',
    endOfFeed: 'You’re all caught up.',
  },
  ar: {
    loading: 'جارٍ تحميل المنشورات…',
    emptyTitle: 'لا توجد منشورات بعد',
    emptyDescription: 'ستظهر هنا منشورات وأوراق هذا الخبير المنشورة.',
    loadError: 'تعذر تحميل منشورات هذا الخبير.',
    tryAgain: 'حاول مرة أخرى',
    loadingMore: 'جارٍ تحميل المزيد من المنشورات…',
    endOfFeed: 'لقد اطّلعت على جميع المنشورات.',
  },
} as const

export default function PostsTab({ uuid, locale }: PostsTabProps) {
  const copy = copyByLocale[locale === 'ar' ? 'ar' : 'en']
  const [items, setItems] = useState<FeedItem[]>([])
  const [meta, setMeta] = useState<InsighterProfileFeedMeta | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const loadingMoreRef = useRef(false)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const loadFirstPage = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true)
    setLoadError(false)

    try {
      const result = await getInsighterProfileFeed(uuid, locale, null, signal)
      setItems(result.data)
      setMeta(result.meta)
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      setLoadError(true)
    } finally {
      if (!signal?.aborted) setIsLoading(false)
    }
  }, [locale, uuid])

  useEffect(() => {
    const controller = new AbortController()
    void loadFirstPage(controller.signal)
    return () => controller.abort()
  }, [loadFirstPage])

  const loadMore = useCallback(async () => {
    const cursor = meta?.next_cursor
    if (!cursor || loadingMoreRef.current) return

    loadingMoreRef.current = true
    setIsLoadingMore(true)

    try {
      const result = await getInsighterProfileFeed(uuid, locale, cursor)
      setItems((previous) => {
        const existingUuids = new Set(previous.map((item) => item.uuid))
        return [...previous, ...result.data.filter((item) => !existingUuids.has(item.uuid))]
      })
      setMeta(result.meta)
    } catch {
      setLoadError(true)
    } finally {
      loadingMoreRef.current = false
      setIsLoadingMore(false)
    }
  }, [locale, meta?.next_cursor, uuid])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !meta?.has_more) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) void loadMore()
      },
      { rootMargin: '600px 0px' },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [loadMore, meta?.has_more])

  return (
    <div className="bg-[#F3F6FA] px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-[680px]">
        {isLoading ? (
          <section aria-label={copy.loading}>
            <FeedSkeleton />
          </section>
        ) : loadError && items.length === 0 ? (
          <section className="rounded-lg border border-[#DCE4EF] bg-white px-6 py-12 text-center">
            <h2 className="text-[18px] font-bold text-[#101724]">{copy.loadError}</h2>
            <button
              type="button"
              onClick={() => void loadFirstPage()}
              className="mt-4 min-h-10 rounded-md bg-[#2378E8] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#1B64C5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2"
            >
              {copy.tryAgain}
            </button>
          </section>
        ) : items.length === 0 ? (
          <section className="rounded-lg border border-[#DCE4EF] bg-white px-6 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EDF4FD] text-[#2378E8]">
              <IconPhoto aria-hidden className="h-5 w-5" stroke={1.7} />
            </div>
            <h2 className="mt-4 text-[18px] font-bold text-[#101724]">{copy.emptyTitle}</h2>
            <p className="mx-auto mt-2 max-w-sm text-[13px] leading-6 text-[#64748B]">
              {copy.emptyDescription}
            </p>
          </section>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <FeedCard key={item.uuid} item={item} locale={locale} articleAccess="community" />
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div ref={sentinelRef} className="flex min-h-14 items-center justify-center pt-4" aria-live="polite">
            {isLoadingMore ? (
              <span className="inline-flex items-center gap-2 text-[13px] font-medium text-[#64748B]">
                <IconLoader2 aria-hidden className="h-4 w-4 animate-spin" stroke={2} />
                {copy.loadingMore}
              </span>
            ) : !meta?.has_more ? (
              <span className="text-[12px] text-[#8A9AAF]">{copy.endOfFeed}</span>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}
