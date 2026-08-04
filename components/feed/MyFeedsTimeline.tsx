'use client'

import { Menu, Modal } from '@mantine/core'
import {
  IconDots,
  IconEye,
  IconFileDescription,
  IconLoader2,
  IconPhoto,
  IconShare3,
  IconTrash,
  IconVideo,
} from '@tabler/icons-react'
import { formatDistanceToNow, isValid } from 'date-fns'
import { arSA, enUS } from 'date-fns/locale'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import '@mux/mux-player'
import CourseIcon from '@/components/icons/CourseIcon'
import DataIcon from '@/components/icons/DataIcon'
import InsightIcon from '@/components/icons/InsightIcon'
import ManualIcon from '@/components/icons/ManualIcon'
import ReportIcon from '@/components/icons/ReportIcon'
import { useToast } from '@/components/toast/ToastContext'
import { useUserProfile } from '@/components/ui/header/hooks/useUserProfile'
import {
  deleteFeedItem,
  getMyFeeds,
  type FeedItem,
  type FeedItemMedia,
} from '@/services/feed.service'

type MyFeedsTimelineProps = {
  locale: string
}

const copyByLocale = {
  en: {
    title: 'My Posts',
    count: (count: number) => `${count} ${count === 1 ? 'post' : 'posts'}`,
    loading: 'Loading your posts…',
    emptyTitle: 'No posts yet',
    emptyDescription: 'Your published posts and drafts will appear here.',
    loadError: 'We couldn’t load your posts.',
    tryAgain: 'Try again',
    loadMore: 'Load more',
    loadingMore: 'Loading…',
    views: 'views',
    shares: 'shares',
    viewInsight: 'View',
    openingInsight: 'Opening…',
    delete: 'Delete post',
    deleteTitle: 'Delete this post?',
    deleteDescription: 'This permanently removes the post and its uploaded media.',
    cancel: 'Cancel',
    deleting: 'Deleting…',
    deleted: 'Your post has been deleted.',
    deleteFailed: 'Unable to delete the post.',
    postActions: 'Post actions',
    imageAlt: 'Post image',
    attachment: 'Open attachment',
  },
  ar: {
    title: 'منشوراتي',
    count: (count: number) => `${count} منشور`,
    loading: 'جارٍ تحميل منشوراتك…',
    emptyTitle: 'لا توجد منشورات بعد',
    emptyDescription: 'ستظهر منشوراتك المنشورة ومسوداتك هنا.',
    loadError: 'تعذر تحميل منشوراتك.',
    tryAgain: 'حاول مرة أخرى',
    loadMore: 'تحميل المزيد',
    loadingMore: 'جارٍ التحميل…',
    views: 'مشاهدة',
    shares: 'مشاركة',
    viewInsight: 'عرض',
    openingInsight: 'جارٍ الفتح…',
    delete: 'حذف المنشور',
    deleteTitle: 'حذف هذا المنشور؟',
    deleteDescription: 'سيؤدي هذا إلى حذف المنشور والوسائط المرفوعة نهائياً.',
    cancel: 'إلغاء',
    deleting: 'جارٍ الحذف…',
    deleted: 'تم حذف منشورك.',
    deleteFailed: 'تعذر حذف المنشور.',
    postActions: 'إجراءات المنشور',
    imageAlt: 'صورة المنشور',
    attachment: 'فتح المرفق',
  },
} as const

function stripHtml(html: string): string {
  if (typeof window === 'undefined') {
    return html
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  }

  const doc = new DOMParser().parseFromString(html, 'text/html')
  return (doc.body.textContent ?? '').replace(/\s+/g, ' ').trim()
}

function formatPostDate(value: string | null, locale: string): string | null {
  if (!value) return null

  const date = new Date(value.includes('T') ? value : value.replace(' ', 'T'))
  if (!isValid(date)) return value

  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: locale === 'ar' ? arSA : enUS,
  })
}

function FeedSkeleton() {
  return (
    <div className="space-y-4" aria-hidden>
      {[0, 1].map((item) => (
        <div key={item} className="animate-pulse rounded-lg border border-[#DCE4EF] bg-white p-5">
          <div className="flex justify-between">
            <div className="h-4 w-40 rounded bg-slate-100" />
            <div className="h-8 w-8 rounded bg-slate-100" />
          </div>
          <div className="mt-6 h-4 w-full rounded bg-slate-100" />
          <div className="mt-3 h-4 w-3/4 rounded bg-slate-100" />
          <div className="mt-5 aspect-[16/6] rounded-md bg-slate-100" />
        </div>
      ))}
    </div>
  )
}

function ImageGallery({
  media,
  imageAlt,
}: {
  media: FeedItemMedia[]
  imageAlt: string
}) {
  const visibleMedia = media.slice(0, 4)
  const isSingleImage = visibleMedia.length === 1

  return (
    <div
      className={`mt-5 grid overflow-hidden rounded-md border border-[#E0E7F0] bg-[#F6F9FD] ${
        isSingleImage ? 'grid-cols-1' : 'grid-cols-2'
      }`}
    >
      {visibleMedia.map((item, index) => (
        <div
          key={item.id}
          className={`relative flex items-center justify-center overflow-hidden ${
            visibleMedia.length === 3 && index === 0 ? 'row-span-2' : ''
          } ${index > 0 ? 'border-s border-[#E0E7F0]' : ''} ${
            index > 1 ? 'border-t border-[#E0E7F0]' : ''
          }`}
        >
          <img
            src={item.url ?? ''}
            alt={item.name || imageAlt}
            loading="lazy"
            className="block h-auto max-w-full object-contain"
            style={{ maxHeight: isSingleImage ? 520 : 360 }}
          />
          {index === 3 && media.length > 4 && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#101724]/65 text-xl font-bold text-white">
              +{media.length - 4}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function VideoPlayer({ media, title }: { media: FeedItemMedia; title: string }) {
  if (media.provider_playback_id) {
    return (
      <div className="mt-5 flex max-h-[720px] justify-center overflow-hidden rounded-md bg-black">
        <mux-player
          playback-id={media.provider_playback_id}
          stream-type="on-demand"
          metadata-video-title={title}
          accent-color="#2378E8"
          disable-tracking=""
          autoplay="muted"
          muted
          loop
          playsinline
          style={{ width: '100%', maxHeight: '720px', display: 'block' }}
        />
      </div>
    )
  }

  return (
    <div className="mt-5 flex aspect-video items-center justify-center rounded-md bg-[#101724] text-white">
      <IconVideo aria-hidden className="h-9 w-9" stroke={1.5} />
    </div>
  )
}

function RelatedInsightIcon({ type }: { type: string }) {
  switch (type) {
    case 'report':
      return <ReportIcon width={16} height={16} />
    case 'manual':
      return <ManualIcon width={16} height={16} />
    case 'statistic':
      return <InsightIcon width={16} height={16} />
    case 'data':
      return <DataIcon width={16} height={16} />
    case 'course':
      return <CourseIcon width={16} height={16} />
    default:
      return <InsightIcon width={16} height={16} />
  }
}

function FeedCard({
  item,
  locale,
  onDelete,
}: {
  item: FeedItem
  locale: string
  onDelete: (item: FeedItem) => void
}) {
  const isArabic = locale === 'ar'
  const copy = copyByLocale[isArabic ? 'ar' : 'en']
  const [openingInsight, setOpeningInsight] = useState<string | null>(null)
  const date = formatPostDate(item.published_at ?? item.created_at, locale)
  const imageMedia = item.media.filter((media) => media.media_type === 'image' && media.url)
  const videoMedia = item.media.find((media) => media.media_type === 'video')
  const attachments = item.media.filter(
    (media) => media.media_type === 'attachment' && media.url,
  )
  const statusTone =
    item.status === 'published'
      ? 'bg-[#EAF8F1] text-[#168A55]'
      : item.status === 'failed'
        ? 'bg-[#FFF0EE] text-[#B53B32]'
        : 'bg-[#FFF5E5] text-[#A96710]'
  const insighter = item.insighter
  const initials = insighter
    ? insighter.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase()
    : ''

  return (
    <article className="relative overflow-visible rounded-lg border border-[#D9E3EF] bg-white px-5 py-5 sm:px-6">
      <div className="flex min-h-9 items-start justify-between gap-4">
        <div className="min-w-0">
          {insighter && (
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#E7F0FE]">
                {insighter.profile_photo_url ? (
                  <img
                    src={insighter.profile_photo_url}
                    alt={insighter.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[13px] font-bold text-[#2378E8]">
                    {initials || 'I'}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate text-[14px] font-semibold text-[#101724]">{insighter.name}</p>
                <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[12.5px] text-[#7A8BA4]">
                  {item.industry && (
                    <Link
                      href={`/${locale}/sub-industry/${item.industry.id}/${item.industry.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#2378E8] hover:underline"
                    >
                      {item.industry.name}
                    </Link>
                  )}
                  {date && item.industry && <span aria-hidden>·</span>}
                  {date && (
                    <time dateTime={item.published_at ?? item.created_at ?? undefined}>{date}</time>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusTone}`}>
            {item.status_label}
          </span>

          <Menu shadow="md" width={170} position={isArabic ? 'bottom-start' : 'bottom-end'}>
            <Menu.Target>
              <button
                type="button"
                aria-label={copy.postActions}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#8FA0B7] transition-colors hover:bg-[#F1F5FA] hover:text-[#253247] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8]"
              >
                <IconDots aria-hidden className="h-5 w-5" stroke={2.2} />
              </button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                color="red"
                leftSection={<IconTrash aria-hidden className="h-4 w-4" stroke={1.8} />}
                onClick={() => onDelete(item)}
              >
                {copy.delete}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>

      {item.title && (
        <h2 className="mt-4 text-[19px] font-bold leading-7 tracking-[-0.02em] text-[#101724]">
          {item.title}
        </h2>
      )}

      {item.body && (
        <p className={`${item.title ? 'mt-2' : 'mt-4'} whitespace-pre-wrap text-[16px] leading-7 text-[#1C2433]`}>
          {item.body}
        </p>
      )}

      {item.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag.id}
              className="rounded-full bg-[#F0F5FC] px-2.5 py-1 text-[11px] font-medium text-[#536680]"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      )}

      {videoMedia && <VideoPlayer media={videoMedia} title={item.title ?? item.body ?? 'Video'} />}
      {imageMedia.length > 0 && <ImageGallery media={imageMedia} imageAlt={copy.imageAlt} />}

      {attachments.length > 0 && (
        <div className="mt-5 space-y-2">
          {attachments.map((attachment) => (
            <a
              key={attachment.id}
              href={attachment.url ?? '#'}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-md border border-[#DDE6F1] bg-[#F8FAFD] px-4 py-3 text-[13px] font-medium text-[#2378E8] transition-colors hover:bg-[#F1F6FD]"
            >
              <IconFileDescription aria-hidden className="h-5 w-5" stroke={1.7} />
              <span className="min-w-0 flex-1 truncate">{attachment.name ?? copy.attachment}</span>
            </a>
          ))}
        </div>
      )}

      {item.related_insights.length > 0 && (
        <div className="mt-5 space-y-3">
          {item.related_insights.map((insight) => (
            <div
              key={`${insight.type}-${insight.slug}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-[#D8E3F0] bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#2378E8]/60 hover:shadow-[0_5px_14px_rgba(35,120,232,0.12)] sm:flex-row"
            >
              <Link
                href={`/${locale}/knowledge/${insight.type}/${insight.slug}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`${copy.viewInsight}: ${insight.title}`}
                className="flex min-h-[155px] w-full min-w-0 flex-col bg-[#071426] bg-[url('/images/test2.png')] bg-cover bg-center px-4 py-4 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#67B5F6] sm:w-[36%] sm:max-w-[280px] sm:flex-none"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <RelatedInsightIcon type={insight.type} />
                    <span className="rounded-full bg-[#0B315D]/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.05em] text-[#67B5F6] backdrop-blur-sm">
                      {insight.type}
                    </span>
                  </div>
                  <h3
                    dir="auto"
                    className="mt-4 line-clamp-3 text-start text-[15px] font-semibold leading-6 text-white transition-colors group-hover:text-[#A8D5FF] sm:text-[16px]"
                  >
                    {insight.title}
                  </h3>
                </div>
              </Link>

              <div className="flex min-h-[130px] min-w-0 flex-1 flex-col justify-center bg-white px-4 py-4 sm:min-h-[155px] sm:px-5">
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#2378E8]">
                    Insight
                  </div>
                  {insight.description && (
                    <p
                      dir="auto"
                      className="mt-2 line-clamp-2 text-[13px] leading-5 text-[#667894] sm:text-[14px]"
                    >
                      {stripHtml(insight.description)}
                    </p>
                  )}
                  <Link
                    href={`/${locale}/knowledge/${insight.type}/${insight.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-busy={openingInsight === `${insight.type}-${insight.slug}`}
                    onClick={() => {
                      const insightKey = `${insight.type}-${insight.slug}`
                      setOpeningInsight(insightKey)
                      window.setTimeout(() => {
                        setOpeningInsight((current) => (current === insightKey ? null : current))
                      }, 1800)
                    }}
                    className="mt-3 inline-flex min-h-9 items-center justify-center rounded-full border border-[#2378E8] px-4 text-center text-[13px] font-medium text-[#2378E8] transition-colors hover:bg-[#F2F7FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2"
                  >
                    {openingInsight === `${insight.type}-${insight.slug}` ? (
                      <>
                        <IconLoader2 aria-hidden className="me-1.5 h-4 w-4 animate-spin" stroke={2} />
                        <span aria-live="polite">{copy.openingInsight}</span>
                      </>
                    ) : (
                      copy.viewInsight
                    )}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 flex items-center gap-5 border-t border-[#E7EDF5] pt-4 text-[13px] text-[#8292A9]">
        <span className="inline-flex items-center gap-1.5">
          <IconEye aria-hidden className="h-4 w-4" stroke={1.7} />
          {item.stats.views_count.toLocaleString()} {copy.views}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <IconShare3 aria-hidden className="h-4 w-4" stroke={1.7} />
          {item.stats.shares_count.toLocaleString()} {copy.shares}
        </span>
      </div>
    </article>
  )
}

export default function MyFeedsTimeline({ locale }: MyFeedsTimelineProps) {
  const isArabic = locale === 'ar'
  const copy = copyByLocale[isArabic ? 'ar' : 'en']
  const toast = useToast()
  const { user, roles, isAuthResolved } = useUserProfile()
  const [items, setItems] = useState<FeedItem[]>([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [deleteCandidate, setDeleteCandidate] = useState<FeedItem | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const canViewOwnFeeds = useMemo(
    () =>
      roles.some((role) => ['insighter', 'company', 'company-insighter'].includes(role)),
    [roles],
  )

  const loadFirstPage = useCallback(
    async (signal?: AbortSignal) => {
      setIsLoading(true)
      setLoadError(false)
      try {
        const result = await getMyFeeds(1, locale, signal)
        setItems(result.data)
        setPage(result.meta.current_page)
        setLastPage(result.meta.last_page)
        setTotal(result.meta.total)
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setLoadError(true)
      } finally {
        if (!signal?.aborted) setIsLoading(false)
      }
    },
    [locale],
  )

  useEffect(() => {
    if (!isAuthResolved || !user || !canViewOwnFeeds) {
      if (isAuthResolved) setIsLoading(false)
      return
    }

    const controller = new AbortController()
    void loadFirstPage(controller.signal)
    return () => controller.abort()
  }, [canViewOwnFeeds, isAuthResolved, loadFirstPage, user])

  useEffect(() => {
    const refresh = () => void loadFirstPage()
    window.addEventListener('feed:published', refresh)
    return () => window.removeEventListener('feed:published', refresh)
  }, [loadFirstPage])

  const loadMore = async () => {
    if (isLoadingMore || page >= lastPage) return

    setIsLoadingMore(true)
    try {
      const result = await getMyFeeds(page + 1, locale)
      setItems((previous) => {
        const existing = new Set(previous.map((item) => item.uuid))
        return [...previous, ...result.data.filter((item) => !existing.has(item.uuid))]
      })
      setPage(result.meta.current_page)
      setLastPage(result.meta.last_page)
      setTotal(result.meta.total)
    } catch {
      toast.error(copy.loadError)
    } finally {
      setIsLoadingMore(false)
    }
  }

  const confirmDelete = async () => {
    if (!deleteCandidate || isDeleting) return

    setIsDeleting(true)
    try {
      await deleteFeedItem(deleteCandidate.uuid, locale)
      setItems((previous) => previous.filter((item) => item.uuid !== deleteCandidate.uuid))
      setTotal((previous) => Math.max(0, previous - 1))
      setDeleteCandidate(null)
      toast.success(copy.deleted)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : copy.deleteFailed)
    } finally {
      setIsDeleting(false)
    }
  }

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
    <section aria-labelledby="my-feeds-title">
      <div className="mb-3 flex items-end justify-between gap-4 px-1">
        <h1 id="my-feeds-title" className="text-[20px] font-semibold tracking-[-0.02em] text-[#101724]">
          {copy.title}
        </h1>
        <span className="text-[12px] text-[#7A8BA4]">{copy.count(total)}</span>
      </div>

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
              onDelete={setDeleteCandidate}
            />
          ))}
        </div>
      )}

      {page < lastPage && (
        <button
          type="button"
          onClick={() => void loadMore()}
          disabled={isLoadingMore}
          className="mt-4 flex min-h-11 w-full items-center justify-center rounded-lg border border-[#C8D8EB] bg-white px-4 text-[13px] font-semibold text-[#2378E8] transition-colors hover:bg-[#F5F9FE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] disabled:cursor-wait disabled:opacity-60"
        >
          {isLoadingMore ? copy.loadingMore : copy.loadMore}
        </button>
      )}

      <Modal
        opened={deleteCandidate !== null}
        onClose={() => {
          if (!isDeleting) setDeleteCandidate(null)
        }}
        centered
        size="sm"
        radius={8}
        title={copy.deleteTitle}
        closeOnClickOutside={!isDeleting}
        closeOnEscape={!isDeleting}
        styles={{
          title: { color: '#101724', fontWeight: 700, fontSize: 18 },
          content: { border: '1px solid #DCE4EF', boxShadow: 'none' },
        }}
      >
        <p className="text-[13px] leading-6 text-[#64748B]">{copy.deleteDescription}</p>
        <div className="mt-6 flex justify-end gap-2.5">
          <button
            type="button"
            onClick={() => setDeleteCandidate(null)}
            disabled={isDeleting}
            className="min-h-10 rounded-md border border-[#CAD6E5] px-4 text-[13px] font-semibold text-[#536680] transition-colors hover:bg-[#F5F8FC] disabled:opacity-50"
          >
            {copy.cancel}
          </button>
          <button
            type="button"
            onClick={() => void confirmDelete()}
            disabled={isDeleting}
            className="min-h-10 rounded-md bg-[#D6453D] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#B93831] disabled:cursor-wait disabled:opacity-60"
          >
            {isDeleting ? copy.deleting : copy.delete}
          </button>
        </div>
      </Modal>
    </section>
  )
}
