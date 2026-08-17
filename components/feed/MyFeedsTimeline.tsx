'use client'

import { Badge, Menu, Modal, Tooltip } from '@mantine/core'
import {
  IconArticle,
  IconBriefcase,
  IconChevronLeft,
  IconChevronRight,
  IconDots,
  IconFileDescription,
  IconLoader2,
  IconPhoto,
  IconPlayerPlayFilled,
  IconRadar,
  IconTrash,
  IconUsers,
  IconVideo,
  IconX,
} from '@tabler/icons-react'
import { formatDistanceToNow, isValid } from 'date-fns'
import { arSA, enUS } from 'date-fns/locale'
import Link from 'next/link'
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import '@mux/mux-player'
import CourseIcon from '@/components/icons/CourseIcon'
import DataIcon from '@/components/icons/DataIcon'
import InsightIcon from '@/components/icons/InsightIcon'
import ManualIcon from '@/components/icons/ManualIcon'
import ReportIcon from '@/components/icons/ReportIcon'
import { dashboardUrl, publicBaseUrl } from '@/app/config'
import FeedShare from '@/components/feed/FeedShare'
import FeedSaveButton from '@/components/feed/FeedSaveButton'
import RoleUpgradeCard from '@/components/feed/RoleUpgradeCard'
import TopDocumentsCard from '@/components/feed/TopDocumentsCard'
import { useToast } from '@/components/toast/ToastContext'
import { useUserProfile } from '@/components/ui/header/hooks/useUserProfile'
import {
  specifiedInsighterProfileUuidQueryParam,
  specifiedInsighterQueryParam,
  specifiedInsighterRoleQueryParam,
} from '@/components/project/specifiedInsighterProject'
import { isFirstWordArabic } from '@/app/utils/textUtils'
import {
  deleteFeedItem,
  getMyFeeds,
  setCommunityFeedItemTracked,
  type FeedItem,
  type FeedItemMedia,
  type FeedItemRelatedInsight,
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
    articleCoverAlt: 'White Paper cover',
    article: 'White Paper',
    attachment: 'Open attachment',
    openImage: 'Open image',
    imageCount: (current: number, total: number) => `Image ${current} of ${total}`,
    previousImage: 'Previous image',
    nextImage: 'Next image',
    closeImagePreview: 'Close image preview',
    playVideo: 'Tap to play',
    meet: 'Meet',
    requestService: 'Service',
    track: 'Track',
    untrack: 'Untrack',
    tracking: 'Updating…',
    trackFailed: 'Unable to update tracking for this post.',
    trackTooltip: 'Track this post to see more content like it in your feed.',
    untrackTooltip: 'Untrack this post to stop seeing more content like it in your feed.',
    ownPostTracking: 'You cannot track your own post.',
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
    articleCoverAlt: 'غلاف الورقة البيضاء',
    article: 'ورقة بيضاء',
    attachment: 'فتح المرفق',
    openImage: 'فتح الصورة',
    imageCount: (current: number, total: number) => `الصورة ${current} من ${total}`,
    previousImage: 'الصورة السابقة',
    nextImage: 'الصورة التالية',
    closeImagePreview: 'إغلاق معاينة الصورة',
    playVideo: 'اضغط للتشغيل',
    meet: 'اجتماع',
    requestService: 'خدمة',
    track: 'تتبّع',
    untrack: 'إلغاء التتبّع',
    tracking: 'جارٍ التحديث…',
    trackFailed: 'تعذر تحديث تتبّع هذا المنشور.',
    trackTooltip: 'تتبّع هذا المنشور لرؤية المزيد من المحتوى المشابه له في موجزك.',
    untrackTooltip: 'ألغِ تتبّع هذا المنشور للتوقف عن رؤية المزيد من المحتوى المشابه له في موجزك.',
    ownPostTracking: 'لا يمكنك تتبّع منشورك الخاص.',
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

function getInsightPrice(price: FeedItemRelatedInsight['price'], freeLabel: string) {
  const normalizedPrice = String(price ?? '').trim()
  if (!normalizedPrice) return null

  const numericPrice = Number(normalizedPrice)
  if (!Number.isNaN(numericPrice)) {
    return {
      label: numericPrice === 0 ? freeLabel : `$${numericPrice.toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
      isFree: numericPrice === 0,
    }
  }

  return { label: normalizedPrice, isFree: false }
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

export function FeedSkeleton() {
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
  locale,
  flushBottom = false,
}: {
  media: FeedItemMedia[]
  imageAlt: string
  locale: string
  flushBottom?: boolean
}) {
  const isSingleImage = media.length === 1
  const isTwoImageLayout = media.length === 2
  const hasInlineCarousel = media.length > 2
  const isArabic = locale === 'ar'
  const copy = copyByLocale[isArabic ? 'ar' : 'en']
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const carouselFrameRef = useRef<number | null>(null)
  const activeMedia = activeImageIndex === null ? null : media[activeImageIndex]
  const isCarousel = media.length > 1

  useEffect(() => {
    setCarouselIndex(0)

    return () => {
      if (carouselFrameRef.current !== null) {
        window.cancelAnimationFrame(carouselFrameRef.current)
      }
    }
  }, [media.length])

  const goToCarouselImage = (nextIndex: number) => {
    const boundedIndex = Math.max(0, Math.min(nextIndex, media.length - 1))
    const slide = carouselRef.current?.querySelector<HTMLElement>(
      `[data-feed-image-index="${boundedIndex}"]`,
    )

    slide?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    setCarouselIndex(boundedIndex)
  }

  const updateCarouselIndex = () => {
    if (carouselFrameRef.current !== null) return

    carouselFrameRef.current = window.requestAnimationFrame(() => {
      carouselFrameRef.current = null
      const carousel = carouselRef.current
      if (!carousel) return

      const carouselCenter = carousel.getBoundingClientRect().left + carousel.clientWidth / 2
      let closestIndex = 0
      let closestDistance = Number.POSITIVE_INFINITY

      carousel.querySelectorAll<HTMLElement>('[data-feed-image-index]').forEach((slide) => {
        const bounds = slide.getBoundingClientRect()
        const distance = Math.abs(bounds.left + bounds.width / 2 - carouselCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = Number(slide.dataset.feedImageIndex ?? 0)
        }
      })

      setCarouselIndex(closestIndex)
    })
  }

  const showPreviousImage = () => {
    setActiveImageIndex((current) =>
      current === null ? 0 : (current - 1 + media.length) % media.length,
    )
  }

  const showNextImage = () => {
    setActiveImageIndex((current) =>
      current === null ? 0 : (current + 1) % media.length,
    )
  }

  return (
    <>
      {isSingleImage && (
        <div
          className={`-mx-5 mt-5 overflow-hidden border-b border-[#E0E7F0] bg-[#F6F9FD] sm:-mx-6 ${
            flushBottom ? '-mb-5 rounded-b-lg sm:-mb-6' : ''
          }`}
        >
          <button
            type="button"
            onClick={() => setActiveImageIndex(0)}
            aria-label={copy.openImage}
            className="relative flex w-full cursor-zoom-in items-center justify-center overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2378E8]"
          >
            <img
              src={media[0].url ?? ''}
              alt={media[0].name || imageAlt}
              loading="lazy"
              className="block h-auto max-w-full object-contain"
              style={{ maxHeight: 'min(650px, 70dvh)' }}
            />
          </button>
        </div>
      )}

      {isTwoImageLayout && (
        <div
          className={`-mx-5 mt-5 grid grid-cols-2 items-stretch gap-1.5 overflow-hidden border-b border-[#E0E7F0] bg-white sm:-mx-6 ${
            flushBottom ? '-mb-5 rounded-b-lg sm:-mb-6' : ''
          }`}
          dir={isArabic ? 'rtl' : 'ltr'}
        >
          {media.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveImageIndex(index)}
              aria-label={`${copy.openImage}: ${copy.imageCount(index + 1, media.length)}`}
              className="relative flex h-[240px] cursor-zoom-in items-center justify-center overflow-hidden rounded-md bg-[#101724] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2378E8] sm:h-[300px]"
            >
              <img
                src={item.url ?? ''}
                alt={item.name || imageAlt}
                loading="lazy"
                className="feed-media-contain block h-full w-full object-contain"
              />
            </button>
          ))}
        </div>
      )}

      {hasInlineCarousel && (
        <div
          className={`relative -mx-5 mt-5 overflow-hidden border-b border-[#D9E2ED] bg-[#E9EEF5] py-1.5 sm:-mx-6 ${
            flushBottom ? '-mb-5 rounded-b-lg sm:-mb-6' : ''
          }`}
          dir={isArabic ? 'rtl' : 'ltr'}
        >
          <div
            ref={carouselRef}
            role="region"
            aria-label={copy.imageCount(carouselIndex + 1, media.length)}
            tabIndex={0}
            onScroll={updateCarouselIndex}
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft') {
                event.preventDefault()
                goToCarouselImage(carouselIndex + (isArabic ? 1 : -1))
              }
              if (event.key === 'ArrowRight') {
                event.preventDefault()
                goToCarouselImage(carouselIndex + (isArabic ? -1 : 1))
              }
            }}
            className="flex snap-x snap-mandatory items-start gap-1.5 overflow-x-auto pe-[8%] ps-0 [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2378E8] [&::-webkit-scrollbar]:hidden sm:pe-[12%]"
          >
            {media.map((item, index) => (
              <button
                key={item.id}
                type="button"
                data-feed-image-index={index}
                onClick={() => setActiveImageIndex(index)}
                aria-label={`${copy.openImage}: ${copy.imageCount(index + 1, media.length)}`}
                className="relative flex h-[280px] w-[84%] shrink-0 snap-center items-center justify-center cursor-zoom-in overflow-hidden rounded-md bg-[#101724] shadow-sm focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white sm:h-[340px] sm:w-[76%]"
              >
                <img
                  src={item.url ?? ''}
                  alt={item.name || imageAlt}
                  loading="lazy"
                  className="feed-media-contain block h-full w-full object-contain"
                />
              </button>
            ))}
          </div>

          <span
            className="pointer-events-none absolute end-3 top-3 rounded-md bg-[#101724]/80 px-2 py-1 text-xs font-semibold tabular-nums text-white shadow-sm backdrop-blur-sm"
            aria-live="polite"
          >
            {carouselIndex + 1}/{media.length}
          </span>

          <button
            type="button"
            onClick={() => goToCarouselImage(carouselIndex - 1)}
            disabled={carouselIndex === 0}
            aria-label={copy.previousImage}
            className="absolute start-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#253247] shadow-md transition hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] disabled:pointer-events-none disabled:opacity-0 sm:flex"
          >
            {isArabic ? <IconChevronRight aria-hidden className="h-5 w-5" /> : <IconChevronLeft aria-hidden className="h-5 w-5" />}
          </button>
          <button
            type="button"
            onClick={() => goToCarouselImage(carouselIndex + 1)}
            disabled={carouselIndex === media.length - 1}
            aria-label={copy.nextImage}
            className="absolute end-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#253247] shadow-md transition hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] disabled:pointer-events-none disabled:opacity-0 sm:flex"
          >
            {isArabic ? <IconChevronLeft aria-hidden className="h-5 w-5" /> : <IconChevronRight aria-hidden className="h-5 w-5" />}
          </button>
        </div>
      )}

      <Modal
        opened={activeMedia !== null}
        onClose={() => setActiveImageIndex(null)}
        centered
        size="xl"
        padding={0}
        yOffset={24}
        withCloseButton={false}
        overlayProps={{ backgroundOpacity: 0.72, blur: 3 }}
        classNames={{
          content: 'overflow-hidden bg-[#101724]',
          body: 'p-0',
        }}
        styles={{ content: { overflowY: 'hidden' } }}
      >
        {activeMedia && (
          <div className="relative flex min-h-[220px] items-center justify-center bg-[#101724]" dir={isArabic ? 'rtl' : 'ltr'}>
            <button
              type="button"
              onClick={() => setActiveImageIndex(null)}
              aria-label={copy.closeImagePreview}
              className="absolute end-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#101724] shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#101724]"
            >
              <IconX aria-hidden className="h-5 w-5" stroke={2.2} />
            </button>
            <img
              src={activeMedia.url ?? ''}
              alt={activeMedia.name || imageAlt}
              className="block max-w-[92vw] object-contain"
              style={{ maxHeight: 'calc(100dvh - 48px)' }}
            />

            {isCarousel && (
              <>
                <button
                  type="button"
                  onClick={showPreviousImage}
                  aria-label={copy.previousImage}
                  className="absolute start-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white shadow-lg transition-colors hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:start-5"
                >
                  {isArabic ? <IconChevronRight aria-hidden className="h-6 w-6" /> : <IconChevronLeft aria-hidden className="h-6 w-6" />}
                </button>
                <button
                  type="button"
                  onClick={showNextImage}
                  aria-label={copy.nextImage}
                  className="absolute end-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white shadow-lg transition-colors hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:end-5"
                >
                  {isArabic ? <IconChevronLeft aria-hidden className="h-6 w-6" /> : <IconChevronRight aria-hidden className="h-6 w-6" />}
                </button>
                <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white" dir="auto">
                  {copy.imageCount((activeImageIndex ?? 0) + 1, media.length)}
                </p>
              </>
            )}
          </div>
        )}
      </Modal>
    </>
  )
}

type MuxPlayerElement = HTMLElement & {
  muted: boolean
  play: () => Promise<void>
  pause: () => void
}

// iPads and iPhones have a small fixed pool of hardware video decoders, and
// WebKit fails streams with MEDIA_ERR_DECODE when a feed keeps several of them
// busy. Allow only one feed video to play at a time: claiming playback pauses
// whichever video currently holds it.
// Pick the HLS engine per browser engine, not per platform. Apple WebKit
// (Safari, plus every WebKit-based iOS browser — navigator.vendor is "Apple
// Computer, Inc." there) plays HLS natively and reliably, while its MSE path
// (ManagedMediaSource) throws decode errors. Chromium (vendor "Google Inc."),
// including Blink-based Chrome on iPadOS and Android, claims native HLS
// support but its demuxer fails on Mux streams with
// DEMUXER_ERROR_COULD_NOT_PARSE — it needs hls.js/MSE, as does Firefox.
function preferredHlsPlayback(): 'native' | 'mse' {
  if (typeof navigator === 'undefined') return 'mse'
  return navigator.vendor?.includes('Apple') ? 'native' : 'mse'
}

let pauseActiveFeedVideo: (() => void) | null = null

function claimFeedPlayback(pause: () => void) {
  if (pauseActiveFeedVideo && pauseActiveFeedVideo !== pause) pauseActiveFeedVideo()
  pauseActiveFeedVideo = pause
}

function releaseFeedPlayback(pause: () => void) {
  if (pauseActiveFeedVideo === pause) pauseActiveFeedVideo = null
}

function VideoPlayer({
  media,
  title,
  playLabel,
  flushBottom = false,
}: {
  media: FeedItemMedia
  title: string
  playLabel: string
  flushBottom?: boolean
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [shouldPreload, setShouldPreload] = useState(false)
  const [isInViewport, setIsInViewport] = useState(false)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)
  // Bumped to remount the player after a decode failure (see the error effect).
  const [playerEpoch, setPlayerEpoch] = useState(0)
  const decodeRetriesRef = useRef(0)
  const fatalErrorRef = useRef(false)
  // When HLS playback is impossible in this browser (e.g. Blink-based Chrome
  // on iPadOS fails both natively and via MSE), fall back to the progressive
  // MP4 static rendition that Mux generates alongside the stream.
  const [useMp4Fallback, setUseMp4Fallback] = useState(false)

  const pauseSelf = useCallback(() => {
    const player = containerRef.current?.querySelector('mux-player, video') as MuxPlayerElement | null
    player?.pause()
  }, [])

  const playMuted = useCallback(async () => {
    const player = containerRef.current?.querySelector('mux-player, video') as MuxPlayerElement | null
    if (!player) return

    // WebKit requires the underlying media property to be muted before play().
    player.muted = true
    claimFeedPlayback(pauseSelf)

    try {
      await player.play()
      setAutoplayBlocked(false)
    } catch (error) {
      setAutoplayBlocked(true)
      console.warn('Mux autoplay was blocked by the browser.', error)
    }
  }, [pauseSelf])

  useEffect(() => {
    const container = containerRef.current
    if (!container || !media.provider_playback_id) return

    setAutoplayBlocked(false)

    // Mount roughly half a screen before the card becomes visible. Keeping
    // this window tight bounds how many media elements exist at once, which
    // matters on iOS/iPadOS where decoder resources are scarce.
    const preloadObserver = new IntersectionObserver(
      ([entry]) => setShouldPreload(entry.isIntersecting),
      { rootMargin: '50% 0px' },
    )
    // Require the card to be mostly visible before it counts as "in viewport"
    // so barely-visible videos at the screen edges don't compete for playback.
    const playbackObserver = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { threshold: 0.5 },
    )

    preloadObserver.observe(container)
    playbackObserver.observe(container)

    return () => {
      preloadObserver.disconnect()
      playbackObserver.disconnect()
    }
  }, [media.provider_playback_id])

  useEffect(() => {
    const player = containerRef.current?.querySelector('mux-player') as MuxPlayerElement | null

    if (!player) return

    if (isInViewport) {
      void playMuted()
    } else {
      player.pause()
      releaseFeedPlayback(pauseSelf)
      setAutoplayBlocked(false)
    }
  }, [isInViewport, playMuted, pauseSelf, shouldPreload, playerEpoch, useMp4Fallback])

  // Release the shared playback slot when the card unmounts entirely.
  useEffect(() => () => releaseFeedPlayback(pauseSelf), [pauseSelf])

  useEffect(() => {
    if (!shouldPreload || useMp4Fallback) return

    const player = containerRef.current?.querySelector('mux-player') as MuxPlayerElement | null
    if (!player) return

    fatalErrorRef.current = false

    const handleError = (event: Event) => {
      fatalErrorRef.current = true
      const code = (event as CustomEvent<{ code?: number } | undefined>).detail?.code
      // MEDIA_ERR_DECODE (3): decoder pools on tablets are small and a stream
      // can fail transiently while several players exist. Remounting recovers.
      if (code === MediaError.MEDIA_ERR_DECODE && decodeRetriesRef.current < 2) {
        decodeRetriesRef.current += 1
        setPlayerEpoch((epoch) => epoch + 1)
      } else {
        // Retries exhausted or a non-decode fatal error: HLS won't play in
        // this browser. Switch to the progressive MP4 rendition.
        setUseMp4Fallback(true)
        fatalErrorRef.current = false
      }
    }

    player.addEventListener('error', handleError)
    return () => player.removeEventListener('error', handleError)
  }, [shouldPreload, playerEpoch, useMp4Fallback])

  if (media.provider_playback_id) {
    // Reserve the box at the video's real aspect ratio so it doesn't collapse
    // to a tiny height before Mux loads metadata (avoids the layout shift where
    // the player snaps to full size on scroll/playback). Falls back to 16/9.
    const aspectRatio =
      media.width && media.height ? `${media.width} / ${media.height}` : '16 / 9'
    // Portrait videos are bound by height (the maxHeight cap) so the width is
    // derived and the box stays narrow; landscape videos fill the card width.
    const isPortrait = !!(media.width && media.height && media.height > media.width)

    return (
      // Full-width black band that letterboxes and centers the video box.
      <div
        className={`-mx-5 mt-5 flex justify-center overflow-hidden bg-black sm:-mx-6 ${flushBottom ? '-mb-5 rounded-b-lg sm:-mb-6' : ''}`}
      >
        <div
          ref={containerRef}
          className="relative"
          style={{
            aspectRatio,
            maxHeight: 'min(650px, 70dvh)',
            ...(isPortrait
              ? { height: 'min(650px, 70dvh)', width: 'auto', maxWidth: '100%' }
              : { width: '100%' }),
          }}
        >
          {shouldPreload && useMp4Fallback && (
            <video
              key={`mp4-${playerEpoch}`}
              src={`https://stream.mux.com/${media.provider_playback_id}/highest.mp4`}
              autoPlay={isInViewport}
              muted
              loop
              playsInline
              controls
              preload={isInViewport ? 'auto' : 'metadata'}
              onError={() => {
                // MP4 rendition missing or also unplayable — surface the
                // overlay; tapping it restarts the HLS player from scratch.
                fatalErrorRef.current = true
                setAutoplayBlocked(true)
              }}
              style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }}
            />
          )}
          {shouldPreload && !useMp4Fallback && (
            <mux-player
              key={playerEpoch}
              playback-id={media.provider_playback_id}
              stream-type="on-demand"
              metadata-video-title={title}
              accent-color="#2378E8"
              disable-tracking=""
              autoplay={isInViewport ? 'muted' : false}
              prefer-playback={preferredHlsPlayback()}
              preload={isInViewport ? 'auto' : 'metadata'}
              max-resolution="720p"
              muted
              loop
              playsinline
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
          )}
          {autoplayBlocked && isInViewport && (
            <button
              type="button"
              onClick={() => {
                if (fatalErrorRef.current) {
                  // play() on failed media just rejects again; remount the
                  // player from scratch and let the playback effect restart it.
                  fatalErrorRef.current = false
                  decodeRetriesRef.current = 0
                  setUseMp4Fallback(false)
                  setAutoplayBlocked(false)
                  setPlayerEpoch((epoch) => epoch + 1)
                } else {
                  void playMuted()
                }
              }}
              aria-label={playLabel}
              className="absolute inset-0 z-10 flex items-center justify-center bg-black/25 text-white transition-colors hover:bg-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-black/75 px-5 py-3 text-sm font-semibold shadow-xl backdrop-blur-sm">
                <IconPlayerPlayFilled aria-hidden className="h-5 w-5" />
                {playLabel}
              </span>
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="mt-5 flex aspect-video items-center justify-center rounded-md bg-[#101724] text-white">
      <IconVideo aria-hidden className="h-9 w-9" stroke={1.5} />
    </div>
  )
}

function ArticlePreview({
  item,
  cover,
  locale,
  isPublic,
  flushBottom = false,
}: {
  item: FeedItem
  cover?: FeedItemMedia
  locale: string
  isPublic: boolean
  flushBottom?: boolean
}) {
  const isArabic = locale === 'ar'
  const copy = copyByLocale[isArabic ? 'ar' : 'en']
  const articleText = stripHtml(item.excerpt || item.body || '')
  const isArticleTitleArabic = isFirstWordArabic(item.title ?? '')
  const isArticleTextArabic = isFirstWordArabic(articleText)

  return (
    <Link
      href={
        isPublic && item.slug
          ? `/${locale}/article/${item.slug}`
          : `/${locale}/article/${item.uuid}?source=my-feeds`
      }
      aria-label={`${copy.article}: ${item.title ?? articleText}`}
      className={`group -mx-5 mt-5 block overflow-hidden border-y border-[#DCE4ED] bg-[#F3F6F8] transition-colors hover:bg-[#EDF2F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2378E8] sm:-mx-6 ${
        flushBottom ? '-mb-5 rounded-b-lg sm:-mb-6' : ''
      }`}
    >
      {cover?.url ? (
        <div className="relative aspect-[1.91/1] w-full overflow-hidden bg-[#E8EDF2]">
          <img
            src={cover.url}
            alt={cover.name || item.title || copy.articleCoverAlt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
          />
        </div>
      ) : (
        <div className="flex aspect-[1.91/1] w-full items-center justify-center bg-[linear-gradient(135deg,#EAF1F8_0%,#DCE8F4_100%)] text-[#6C829E]">
          <IconArticle aria-hidden className="h-12 w-12" stroke={1.3} />
        </div>
      )}

      <div className="px-5 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#5D7089]">
          <IconArticle aria-hidden className="h-4 w-4 text-[#2378E8]" stroke={1.8} />
          <span>{copy.article}</span>
        </div>

        {item.title && (
          <h2
            dir={isArticleTitleArabic ? 'rtl' : 'ltr'}
            className={`mt-2.5 text-[20px] font-bold leading-7 tracking-[-0.025em] text-[#101724] sm:text-[22px] sm:leading-8 ${isArticleTitleArabic ? 'text-right' : 'text-left'}`}
          >
            {item.title}
          </h2>
        )}

        {articleText && (
          <p
            dir={isArticleTextArabic ? 'rtl' : 'ltr'}
            className={`mt-1.5 line-clamp-2 text-[14px] leading-6 text-[#56677E] sm:text-[15px] ${isArticleTextArabic ? 'text-right' : 'text-left'}`}
          >
            {articleText}
          </p>
        )}
      </div>
    </Link>
  )
}

function RelatedInsightIcon({ type }: { type: string }) {
  switch (type.trim().toLowerCase()) {
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

export function FeedCard({
  item,
  locale,
  onDelete,
  onSaveChange,
  articleAccess = 'owner',
}: {
  item: FeedItem
  locale: string
  onDelete?: (item: FeedItem) => void
  onSaveChange?: (item: FeedItem, isSaved: boolean) => void
  articleAccess?: 'community' | 'owner'
}) {
  const isArabic = locale === 'ar'
  const copy = copyByLocale[isArabic ? 'ar' : 'en']
  const toast = useToast()
  const { user } = useUserProfile()
  const [openingInsight, setOpeningInsight] = useState<string | null>(null)
  const [isTracked, setIsTracked] = useState(item.is_tracked === true)
  const [isUpdatingTrack, setIsUpdatingTrack] = useState(false)
  const date = formatPostDate(item.published_at ?? item.created_at, locale)
  const isArticle = item.content_type === 'article'
  const isPostTitleArabic = isFirstWordArabic(item.title ?? '')
  const isPostBodyArabic = isFirstWordArabic(item.body ?? '')
  const imageMedia = item.media.filter((media) => media.media_type === 'image' && media.url)
  const articleCover = isArticle ? imageMedia[0] : undefined
  const videoMedia = item.media.find((media) => media.media_type === 'video')
  const attachments = item.media.filter(
    (media) => media.media_type === 'attachment' && media.url,
  )
  const hasPostMedia = Boolean(videoMedia) || imageMedia.length > 0
  const showEngagementActions = articleAccess === 'community' && Boolean(item.insighter)
  const isMediaLast =
    attachments.length === 0 && item.related_insights.length === 0 && !showEngagementActions
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

  // Community-feed engagement actions (Meet / Request Service / Share) are only
  // meaningful when viewing someone else's published post in the public feed.
  // `showEngagementActions` is derived above (near the media flags).
  const isOwnPost = Boolean(user?.uuid && insighter && user.uuid === insighter.uuid)
  const meetHref = insighter
    ? `/${locale}/profile/${insighter.uuid}?entity=insighter&tab=meet`
    : ''
  const requestServiceHref = insighter
    ? `/${locale}/project/wizard/project-type?${new URLSearchParams({
        fresh: '1',
        [specifiedInsighterQueryParam]: insighter.uuid,
        [specifiedInsighterRoleQueryParam]: 'insighter',
        [specifiedInsighterProfileUuidQueryParam]: insighter.uuid,
      }).toString()}`
    : ''
  const shareUrl = isArticle
    ? `${publicBaseUrl}/${locale}/article/${item.slug ?? item.uuid}`
    : `${publicBaseUrl}/${locale}/post/${item.slug ?? item.uuid}`
  const shareTitle = item.title?.trim() || stripHtml(item.body ?? '').slice(0, 120) || insighter?.name || ''

  useEffect(() => {
    setIsTracked(item.is_tracked === true)
  }, [item.is_tracked, item.uuid])

  const updateTracking = async () => {
    if (isUpdatingTrack || isOwnPost) return

    if (!user) {
      const returnUrl = encodeURIComponent(window.location.href)
      window.location.assign(`${dashboardUrl}/auth/login?returnUrl=${returnUrl}`)
      return
    }

    setIsUpdatingTrack(true)
    try {
      const result = await setCommunityFeedItemTracked(item.uuid, !isTracked, locale)
      setIsTracked(result.is_tracked)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : copy.trackFailed)
    } finally {
      setIsUpdatingTrack(false)
    }
  }

  return (
    <article className="relative overflow-visible rounded-lg border border-[#D9E3EF] bg-white px-5 py-5 sm:px-6">
      <div className="flex min-h-9 items-start justify-between gap-2 sm:gap-4">
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
                <Link
                  href={`/${locale}/profile/${insighter.uuid}?entity=insighter`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block truncate text-[14px] font-semibold text-[#101724] transition-colors hover:text-[#2378E8] hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-1"
                >
                  {insighter.name}
                </Link>
                <div className="flex flex-nowrap items-center gap-x-1.5 text-[12.5px] text-[#7A8BA4]">
                  {item.industry && (
                    <Link
                      href={`/${locale}/sub-industry/${item.industry.id}/${item.industry.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-w-0 truncate font-medium text-[#2378E8] hover:underline"
                    >
                      {item.industry.name}
                    </Link>
                  )}
                  {date && item.industry && <span aria-hidden className="shrink-0">·</span>}
                  {date && (
                    <time
                      dateTime={item.published_at ?? item.created_at ?? undefined}
                      className="shrink-0 whitespace-nowrap"
                    >
                      {date}
                    </time>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {(onDelete || articleAccess === 'community') && (
          <div className="flex shrink-0 items-center gap-2">
            {articleAccess === 'community' && (
              <Tooltip
                label={isOwnPost ? copy.ownPostTracking : isTracked ? copy.untrackTooltip : copy.trackTooltip}
                position="bottom"
                openDelay={300}
                withArrow
              >
                <span className="inline-flex">
                  <button
                    type="button"
                    onClick={() => void updateTracking()}
                    disabled={isUpdatingTrack || isOwnPost}
                    aria-pressed={isTracked}
                    aria-label={isUpdatingTrack ? copy.tracking : isTracked ? copy.untrack : copy.track}
                    className={`inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full px-3 text-[12px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-55 ${
                      isTracked
                        ? 'bg-[#2378E8] text-white hover:bg-[#1B64C5]'
                        : 'bg-[#F2F7FF] text-[#36506F] hover:bg-[#E6F0FD] hover:text-[#2378E8]'
                    }`}
                  >
                    {isUpdatingTrack ? (
                      <IconLoader2 aria-hidden className="h-4 w-4 animate-spin" stroke={2} />
                    ) : (
                      <IconRadar aria-hidden className="h-4 w-4" stroke={1.9} />
                    )}
                    <span>{isTracked ? copy.untrack : copy.track}</span>
                  </button>
                </span>
              </Tooltip>
            )}

            {onDelete && (
              <span className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusTone}`}>
                {item.status_label}
              </span>
            )}

            {onDelete && (
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
            )}
          </div>
        )}
      </div>

      {!isArticle && item.title && (
        <h2
          dir={isPostTitleArabic ? 'rtl' : 'ltr'}
          className={`mt-4 text-[19px] font-bold leading-7 tracking-[-0.02em] text-[#101724] ${isPostTitleArabic ? 'text-right' : 'text-left'}`}
        >
          {item.title}
        </h2>
      )}

      {!isArticle && item.body && (
        <p
          dir={isPostBodyArabic ? 'rtl' : 'ltr'}
          className={`${item.title ? 'mt-2' : 'mt-4'} whitespace-pre-wrap text-[13px] leading-[1.2rem] text-[#1C2433] sm:text-[16px] sm:leading-7 ${isPostBodyArabic ? 'text-right' : 'text-left'}`}
        >
          {item.body}
        </p>
      )}

      {isArticle && (
        <ArticlePreview
          item={item}
          cover={articleCover}
          locale={locale}
          isPublic={articleAccess === 'community'}
          flushBottom={isMediaLast}
        />
      )}

      {!isArticle && videoMedia && (
        <VideoPlayer
          media={videoMedia}
          title={item.title ?? item.body ?? 'Video'}
          playLabel={copy.playVideo}
          flushBottom={isMediaLast}
        />
      )}
      {!isArticle && imageMedia.length > 0 && <ImageGallery media={imageMedia} imageAlt={copy.imageAlt} locale={locale} flushBottom={isMediaLast} />}

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
        <div className={`-mx-5 ${hasPostMedia ? 'mt-0' : 'mt-5'} divide-y divide-[#E7EDF5] overflow-hidden border-t border-[#E7EDF5] sm:-mx-6 ${
          showEngagementActions ? 'border-b' : '-mb-5 rounded-b-lg sm:-mb-6'
        }`}>
          {item.related_insights.map((insight) => {
            const insightKey = `${insight.type}-${insight.slug}`
            const insightPrice = getInsightPrice(insight.price, locale === 'ar' ? 'مجاني' : 'Free')

            return (
            <div
              key={`${insight.type}-${insight.slug}`}
              className="group flex flex-col overflow-hidden bg-white transition-colors duration-300 hover:bg-[#F8FAFD] sm:flex-row"
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
                  {insight.description && (
                    <p
                      dir="auto"
                      className="line-clamp-3 text-[13px] leading-[1.2rem] text-[#667894] sm:text-[14px]"
                    >
                      {stripHtml(insight.description)}
                    </p>
                  )}
                  <div className="mt-3 flex items-center justify-between gap-3" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                    {insightPrice ? (
                      <Badge color={insightPrice.isFree ? 'green' : 'yellow'} variant="light" className="shrink-0 font-semibold">
                        <span dir={insightPrice.isFree ? 'auto' : 'ltr'} lang={insightPrice.isFree ? undefined : 'en'}>{insightPrice.label}</span>
                      </Badge>
                    ) : <span />}
                  <Link
                    href={`/${locale}/knowledge/${insight.type}/${insight.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-busy={openingInsight === insightKey}
                    onClick={() => {
                      setOpeningInsight(insightKey)
                      window.setTimeout(() => {
                        setOpeningInsight((current) => (current === insightKey ? null : current))
                      }, 1800)
                    }}
                    className="inline-flex min-h-7 items-center justify-center rounded-full border border-[#2378E8] px-2 py-0.5 text-center text-[13px] font-medium text-[#2378E8] transition-colors hover:bg-[#F2F7FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2"
                  >
                    {openingInsight === insightKey ? (
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
            </div>
            )
          })}
        </div>
      )}

      {showEngagementActions && insighter && (
        <div
          className="mt-4 flex items-center justify-around pt-2"
          dir={isArabic ? 'rtl' : 'ltr'}
        >
          {!isOwnPost && (
            <Link
              href={meetHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-md px-2 py-2.5 text-[14px] font-medium text-[#5A6B85] transition-colors hover:bg-[#F5F8FC] hover:text-[#101724] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8]"
            >
              <IconUsers aria-hidden className="h-[18px] w-[18px] text-[#2378E8]" stroke={1.8} />
              <span>{copy.meet}</span>
            </Link>
          )}

          {!isOwnPost && (
            <Link
              href={requestServiceHref}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-md px-2 py-2.5 text-[14px] font-medium text-[#5A6B85] transition-colors hover:bg-[#F5F8FC] hover:text-[#101724] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8]"
            >
              <IconBriefcase aria-hidden className="h-[18px] w-[18px] text-[#16A34A]" stroke={1.8} />
              <span>{copy.requestService}</span>
            </Link>
          )}

          <FeedSaveButton
            uuid={item.uuid}
            identifier={item.slug ?? item.uuid}
            contentType={item.content_type}
            initialIsSaved={item.is_saved}
            locale={locale}
            layout="action"
            onChange={(isSaved) => onSaveChange?.(item, isSaved)}
          />

          <FeedShare
            shareUrl={shareUrl}
            shareTitle={shareTitle}
            authorName={insighter.name}
            authorPhotoUrl={insighter.profile_photo_url}
            locale={locale}
            shareKind={isArticle ? 'white-paper' : 'post'}
          />
        </div>
      )}
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
          {items.map((item, index) => {
            // Right-column widgets are hidden below xl, so weave them between
            // posts (LinkedIn-style) on mobile/tablet. Positions clamp to the
            // last post so short feeds still surface them.
            const upgradeIndex = Math.min(1, items.length - 1)
            const documentsIndex = Math.min(3, items.length - 1)

            return (
              <Fragment key={item.uuid}>
                <FeedCard item={item} locale={locale} onDelete={setDeleteCandidate} />
                {index === upgradeIndex && (
                  <RoleUpgradeCard locale={locale} className="xl:hidden" />
                )}
                {index === documentsIndex && (
                  <TopDocumentsCard locale={locale} className="xl:hidden" />
                )}
              </Fragment>
            )
          })}
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
