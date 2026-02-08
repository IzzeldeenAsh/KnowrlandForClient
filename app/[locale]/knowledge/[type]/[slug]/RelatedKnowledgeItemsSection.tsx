'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { Avatar, Badge, Rating, Text } from '@mantine/core'
import { ArrowDownTrayIcon, FolderOpenIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { formatDistanceToNow } from 'date-fns'
import { arSA, enUS } from 'date-fns/locale'

/* Swiper v8 */
import Swiper, { Autoplay, EffectCoverflow } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'

import DataIcon from '@/components/icons/DataIcon'
import InsightIcon from '@/components/icons/InsightIcon'
import ManualIcon from '@/components/icons/ManualIcon'
import ReportIcon from '@/components/icons/ReportIcon'
import CourseIcon from '@/components/icons/CourseIcon'
import { isFirstWordArabic } from '@/app/utils/textUtils'

import cardStyles from '../../../topic/[id]/[slug]/knowledge-card.module.css'
import styles from './RelatedKnowledgeItemsSection.module.css'

export type RelatedKnowledgeItem = {
  slug: string
  type: string
  title: string
  description?: string | null
  total_price?: string
  published_at?: string
  insighter?: {
    uuid: string
    name: string
    profile_photo_url: string | null
    roles?: string[]
    company?: {
      uuid: string
      legal_name: string
      logo: string
    }
  }
  is_owner?: boolean
  review_summary?: { count?: number; average?: number }
  language?: string
  paid_status?: 'free' | 'partial_paid' | 'paid' | string
  total_downloads?: number
}

export type RelatedKnowledgeItems = Partial<
  Record<'industry' | 'topic' | 'product' | 'insighter', RelatedKnowledgeItem[]>
>

type RelatedItemsKey = 'industry' | 'topic' | 'product' | 'insighter'

type Props = {
  locale: string
  isRTL: boolean
  items: RelatedKnowledgeItems
  backgroundImageUrl?: string
  /** Current page insighter name (for single-category subtitle when only insighter list is available) */
  insighterName?: string
  /** Breadcrumb labels in order, e.g. [Home, Industry, Topic, ...] — used for industry/topic subtitle when only that list is available */
  breadcrumbLabels?: string[]
}

function stripHtml(html: string) {
  return (html || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function truncateWords(text: string, wordLimit: number = 22) {
  const t = (text || '').trim()
  if (!t) return ''
  const words = t.split(/\s+/)
  if (words.length <= wordLimit) return t
  return `${words.slice(0, wordLimit).join(' ')}...`
}

function formatPublishedDate(dateString: string, locale: string) {
  const date = new Date(dateString)
  const utcDate = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes())
  )
  const selectedLocale = locale === 'ar' ? arSA : enUS
  return formatDistanceToNow(utcDate, { addSuffix: true, locale: selectedLocale })
}

function getInitials(name: string) {
  if (!name) return ''
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

function TypeIcon({ type }: { type: string }) {
  const t = (type || '').toLowerCase()
  if (t === 'data') return <DataIcon width={20} height={20} />
  if (t === 'statistic') return <InsightIcon width={20} height={20} />
  if (t === 'manual') return <ManualIcon width={20} height={20} />
  if (t === 'report') return <ReportIcon width={20} height={20} />
  if (t === 'course') return <CourseIcon width={20} height={20} />
  return <InsightIcon width={20} height={20} />
}

/** Icons for filter box categories */
function CategoryFilterIcon({ categoryKey, isActive }: { categoryKey: RelatedItemsKey; isActive: boolean }) {
  const size = 24
  const iconClass = `w-6 h-6 shrink-0`
  switch (categoryKey) {
    case 'industry':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#F6C000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 21c1.147 -4.02 1.983 -8.027 2 -12h6c.017 3.973 .853 7.98 2 12" />
          <path d="M12.5 13h4.5c.025 2.612 .894 5.296 2 8" />
          <path d="M9 5a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1" />
          <path d="M3 21l19 0" />
        </svg>
      )
    case 'product':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" className={`${iconClass} text-blue-500`}>
        <g transform="matrix(0.99,0,0,0.99,0.32,0.3)" stroke="none" fill="currentColor">
          <path d="m49.5 34c-.82842712 0-1.5.67157288-1.5 1.5v13c0 .82842712.67157288 1.5 1.5 1.5s1.5-.67157288 1.5-1.5v-13c0-.82842712-.67157288-1.5-1.5-1.5zm-6 0c-.82842712 0-1.5.67157288-1.5 1.5v13c0 .82842712.67157288 1.5 1.5 1.5s1.5-.67157288 1.5-1.5v-13c0-.82842712-.67157288-1.5-1.5-1.5zm-6 0c-.82842712 0-1.5.67157288-1.5 1.5v13c0 .82842712.67157288 1.5 1.5 1.5s1.5-.67157288 1.5-1.5v-13c0-.82842712-.67157288-1.5-1.5-1.5zm-6 0c-.82842712 0-1.5.67157288-1.5 1.5v13c0 .82842712.67157288 1.5 1.5 1.5s1.5-.67157288 1.5-1.5v-13c0-.82842712-.67157288-1.5-1.5-1.5z" />
          <path d="m32 3c-.82842712 0-1.5.67157288-1.5 1.5v2.8007812c-1.2649826.52060382-2.2043206 1.6749789-2.4335938 3.0566406l-14.742188 16.642578h-6.8242188c-1.3590542 0-2.5 1.1409458-2.5 2.5v25c0 1.3590542 1.1409458 2.5 2.5 2.5h51c1.3590542 0 2.5-1.1409458 2.5-2.5v-25c0-1.3590542-1.1409361-2.5000073-2.5-2.5h-28c-.82842712 0-1.5.67157288-1.5 1.5s.67157288 1.5 1.5 1.5h27.5v24h-33v-24.5c0-1.3590542-1.1409458-2.5-2.5-2.5h-4.1679688l11.761719-13.279297c.73236176.78125202 1.7636799 1.2792969 2.90625 1.2792969 1.1727683 0 2.2019554-.53489178 2.9160156-1.359375l9.125 9.765625c.56539461.60477567 1.51386.63711965 2.1191406.0722656.60606614-.56559238.63843164-1.5155634.0722656-2.1210937l-10.396484-11.123047c-.26624623-1.3120561-1.1427571-2.4088386-2.3359375-2.9199219v-2.8144531c0-.82842712-.67157288-1.5-1.5-1.5zm-17 27h5c.554 0 1 .446 1 1v22c0 .554-.446 1-1 1h-5c-.554 0-1-.446-1-1v-22c0-.554.446-1 1-1z" />
        </g>
      </svg>
      )
    case 'topic':
      return <FolderOpenIcon color="#ff3f55" className={iconClass} />
    case 'insighter':
      return <UserCircleIcon color="#1bbb36" className={iconClass} />
    default:
      return null
  }
}

function getSingleCategorySubtitle(
  key: RelatedItemsKey,
  isRTL: boolean,
  insighterName?: string,
  breadcrumbLabels?: string[]
): string {
  const industryName = breadcrumbLabels?.[1]?.trim() || ''
  const topicName = breadcrumbLabels?.[2]?.trim() || (breadcrumbLabels && breadcrumbLabels.length > 2 ? breadcrumbLabels[breadcrumbLabels.length - 2]?.trim() : '') || ''
  switch (key) {
    case 'insighter':
      return isRTL
        ? `اكتشف المزيد من الرؤى المنشورة بواسطة ${insighterName || 'نفس الإنسايتر'}.`
        : `Discover more insights published by ${insighterName || 'this insighter'}.`
    case 'industry':
      return isRTL
        ? industryName ? `اكتشف المزيد في "${industryName}".` : 'محتوى من نفس الصناعة.'
        : industryName ? `Discover more in "${industryName}".` : 'From the same industry.'
    case 'topic':
      return isRTL
        ? topicName ? `اكتشف المزيد عن موضوع "${topicName}".` : 'محتوى من مواضيع قريبة.'
        : topicName ? `Discover more on "${topicName}".` : 'From same topic.'
    case 'product':
      return isRTL ? 'المنتج' : 'Product'
    default:
      return isRTL ? 'محتوى ذو صلة' : 'Related content.'
  }
}

export default function RelatedKnowledgeItemsSection({
  locale,
  isRTL,
  items,
  backgroundImageUrl = 'https://res.cloudinary.com/dsiku9ipv/image/upload/v1770277460/photo-1707209856575-a80b9dff5524_rkowxg.png',
  insighterName,
  breadcrumbLabels,
}: Props) {
  const reactId = useId()
  const uid = useMemo(() => reactId.replace(/[:]/g, ''), [reactId])

  const available = useMemo(() => {
    const industry = Array.isArray(items?.industry) ? items.industry : []
    const topic = Array.isArray(items?.topic) ? items.topic : []
    const product = Array.isArray(items?.product) ? items.product : []
    const insighter = Array.isArray(items?.insighter) ? items.insighter : []

    const t = {
      industry: {
        key: 'industry' as const,
        list: industry,
        title: isRTL ? 'الصناعة' : 'Industry',
        desc: isRTL ? 'محتوى من نفس الصناعة' : 'From the same industry',
      },
      topic: {
        key: 'topic' as const,
        list: topic,
        title: isRTL ? 'الموضوع' : 'Topic',
        desc: isRTL ? 'محتوى من مواضيع قريبة' : 'From nearby topics',
      },
      product: {
        key: 'product' as const,
        list: product,
        title: isRTL ? 'المنتج' : 'Product',
        desc: isRTL ? 'محتوى مرتبط بالمنتج' : 'Related to the product',
      },
      insighter: {
        key: 'insighter' as const,
        list: insighter,
        title: isRTL ? 'الإنسايتر' : 'Insighter',
        desc: isRTL ? 'محتوى من نفس الإنسايتر' : 'From the same insighter',
      },
    }

    const order: Array<keyof typeof t> = ['industry', 'topic', 'product', 'insighter']
    return order.map((k) => t[k]).filter((x) => (x.list?.length ?? 0) > 0)
  }, [items, isRTL])

  const [activeKey, setActiveKey] = useState<RelatedItemsKey>((available[0]?.key ?? 'industry') as RelatedItemsKey)

  useEffect(() => {
    if (!available.length) return
    const stillExists = available.some((x) => x.key === activeKey)
    if (!stillExists) setActiveKey(available[0].key)
  }, [available, activeKey])

  const active = useMemo(() => available.find((x) => x.key === activeKey) ?? available[0], [available, activeKey])
  const activeItems = active?.list ?? []

  const carouselClass = `Knoldg-related-items-carousel-${uid}`
  const nextClass = `related-items-next-${uid}`
  const prevClass = `related-items-prev-${uid}`

  const swiperRef = useRef<Swiper | null>(null)

  useEffect(() => {
    if (!activeItems || activeItems.length === 0) return

    swiperRef.current?.destroy(true, true)
    const swiper = new Swiper(`.${carouselClass}`, {
      modules: [EffectCoverflow, Autoplay],
      effect: 'coverflow',
      centeredSlides: true,
      slidesPerView: 'auto',
      spaceBetween: 22,
      grabCursor: true,
      speed: 650,
      // Keep carousel interactive even when slides "fit" (Swiper would otherwise lock and block slideNext/slidePrev)
      watchOverflow: false,
      // Enable infinite loop when there are enough slides to avoid Swiper loop glitches
      loop: activeItems.length >= 3,
      loopAdditionalSlides: 4,
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 160,
        modifier: 1.35,
        slideShadows: false,
      },
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
    })
    // If Swiper decides it is "locked", slideNext/slidePrev become no-ops.
    // We keep it interactive for the coverflow carousel use-case.
    swiper.allowSlideNext = true
    swiper.allowSlidePrev = true
    swiper.update()
    swiperRef.current = swiper

    return () => {
      swiperRef.current?.destroy(true, true)
      swiperRef.current = null
    }
  }, [activeItems, carouselClass, nextClass, prevClass])

  const [revealOn, setRevealOn] = useState(false)
  useEffect(() => {
    setRevealOn(false)
    const raf = requestAnimationFrame(() => setRevealOn(true))
    return () => cancelAnimationFrame(raf)
  }, [activeKey])

  const singleCategoryMode = available.length === 1
  const subtitle =
    singleCategoryMode
      ? getSingleCategorySubtitle(available[0].key, isRTL, insighterName, breadcrumbLabels)
      : (isRTL ? 'اختر القسم لاستكشاف المحتوى المشابه.' : 'Pick a section to explore similar content.')

  const copy = {
    title: isRTL ? 'مواضيع ذات صلة' : 'Related items',
    subtitle,
    previous: isRTL ? 'السابق' : 'Previous',
    next: isRTL ? 'التالي' : 'Next',
    posted: isRTL ? 'نُشر' : 'Posted',
    free: isRTL ? 'مجاني' : 'Free',
    partial: isRTL ? 'مدفوع جزئي' : 'Partial paid',
    freeDocs: isRTL ? "مستندات مجانية" : "Free docs",
    downloads: isRTL ? 'تحميل' : 'Downloads',
    download: isRTL ? 'تحميل' : 'Download',
  }

  if (!available.length) return null

  return (
    <section  className="relative overflow-hidden mt-10 sm:mt-14 w-full bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url("${backgroundImageUrl}")`,
    }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="text-center">
          <h2
            className={`text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text ${
              isRTL ? 'bg-gradient-to-l from-blue-400 to-teal-500' : 'bg-gradient-to-r from-blue-500 to-teal-400'
            } leading-[2]`}
          >
            {copy.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-3xl mx-auto">{copy.subtitle}</p>
        </div>

        {/* Filter boxes — hidden when only one category is available */}
        {!singleCategoryMode && (
        <div
          className={`mt-7 sm:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          {available.map((c) => {
            const isActive = c.key === activeKey
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => setActiveKey(c.key)}
                className={[
                  'text-start rounded-lg border   px-4 py-4 sm:px-5 sm:py-5 transition shrink-0',
                  'w-full min-w-[140px] max-w-[280px] sm:w-auto sm:min-w-[220px] sm:max-w-[260px]',
                  isActive ? 'border-blue-300  bg-white/80' : 'border-gray-200 hover:border-gray-300 bg-white/40',
                ].join(' ')}
              >
                <div className="flex items-start justify-between gap-3">
                  <CategoryFilterIcon categoryKey={c.key} isActive={isActive} />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-gray-900 truncate">{c.title}</div>
                    <div className="mt-1 text-xs text-gray-500 truncate">{c.desc}</div>
                  </div>
                  <span
                    className={[
                      'shrink-0 inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-bold',
                      isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600',
                    ].join(' ')}
                    aria-label={`${c.title} count`}
                  >
                    {c.list.length}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
        )}

        {/* Slider */}
        <div
          className={[
            'mt-8 sm:mt-10 transition-all duration-500',
            revealOn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
          ].join(' ')}
        >
          <div className={`flex items-center gap-3 sm:gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              className={`${prevClass} flex-shrink-0 z-30 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center group rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition`}
              aria-label={copy.previous}
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <svg className="w-4 h-4 fill-cyan-500 group-hover:fill-slate-900 transition" viewBox="0 0 16 16">
                <path d="M6.7 14.7l1.4-1.4L3.8 9H16V7H3.8l4.3-4.3-1.4-1.4L0 8z" />
              </svg>
            </button>

            <div className="relative flex-1 min-w-0">
              <div className={`${styles.relatedItemsCarousel} ${carouselClass} swiper`}>
                <div className="swiper-wrapper">
                  {activeItems.map((item, index) => {
                    const normalizedPrice = String(item.total_price ?? '').trim()
                    const numericPrice = Number(normalizedPrice)
                    const isNumericPrice = normalizedPrice !== '' && !Number.isNaN(numericPrice)
                    const formattedPrice = isNumericPrice
                      ? `$${numericPrice.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
                      : normalizedPrice

                    const paidStatus = typeof item.paid_status === 'string' ? item.paid_status : undefined
                    const isFree = paidStatus === 'free' || (!paidStatus && isNumericPrice && numericPrice === 0)
                    const isPartial = paidStatus === 'partial_paid'
                    const isPaid = paidStatus === 'paid' || (!paidStatus && normalizedPrice !== '' && numericPrice > 0)

                    const desc = truncateWords(stripHtml(String(item.description ?? '')), 26)
                    const ratingCount = Number(item.review_summary?.count ?? 0)
                    const ratingAvg = Number(item.review_summary?.average ?? 0)

                    const showDownloads = typeof item.total_downloads === 'number' && item.total_downloads > 0
                    const showReview = ratingCount >= 1 && ratingAvg > 0
                    const showBottomMeta = showDownloads || showReview

                    return (
                      <div
                        key={`${activeKey}-${item.type}-${item.slug}-${index}`}
                        className="swiper-slide !w-[300px] sm:!w-[340px] md:!w-[380px] h-auto"
                      >
                        <div className="slideInner h-full rounded-md overflow-hidden border border-gray-200 bg-white">
                          <Link href={`/${locale}/knowledge/${item.type}/${item.slug}`} className="block h-full">
                            <div
                              className={`${cardStyles.darkSection} ${
                                showBottomMeta ? cardStyles.darkSectionWithBottomMeta : ''
                              } relative`}
                            >
                              <div>
                                <div className="flex items-center mb-3">
                                  <TypeIcon type={item.type} />
                                  <Badge c="#67b5f6" w="fit-content" className="capitalize ml-2" variant="light">
                                    {item.type}
                                  </Badge>
                                </div>

                                <Text
                                  style={{ wordBreak: 'break-word' }}
                                  fw={800}
                                  className={`${cardStyles.title} ${
                                    isFirstWordArabic(item.title) ? 'text-right' : 'text-left'
                                  }`}
                                  pt={4}
                                  lineClamp={2}
                                  dir={isFirstWordArabic(item.title) ? 'rtl' : 'ltr'}
                                >
                                  {item.title}
                                </Text>
                              </div>

                              {showBottomMeta && (
                                <div
                                  className={[
                                    cardStyles.bottomMetaRow,
                                    isRTL ? cardStyles.bottomMetaRowRtl : '',
                                    showReview && showDownloads ? cardStyles.bottomMetaRowBoth : cardStyles.bottomMetaRowSingle,
                                  ].join(' ')}
                                >
                                  {showDownloads && (
                                    <div className={cardStyles.bottomMetaItem}>
                                      <span className="flex items-center justify-center w-6 h-6 bg-white bg-opacity-20 rounded-full">
                                        <ArrowDownTrayIcon className="w-3 h-3 text-white" />
                                      </span>
                                      <Text size="xs" className="text-white font-medium">
                                        {item.total_downloads!.toLocaleString()} {copy.downloads}
                                      </Text>
                                    </div>
                                  )}

                                  {showReview && (
                                    <div className={cardStyles.bottomMetaItem}>
                                      <Rating value={ratingAvg} fractions={2} readOnly size="sm" />
                                      <Text size="xs" fw={500} className="text-sky-500" style={{ whiteSpace: 'nowrap' }}>
                                        {ratingAvg.toFixed(1)}
                                      </Text>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>

                            <div className={cardStyles.whiteSection + ' flex flex-col h-full'}>
                              {/* Insighter */}
                              <div className="flex items-center justify-between pb-4">
                                {item.insighter?.name ? (
                                  <Link
                                    href={`/${locale}/profile/${item.insighter.uuid}?entity=insighter`}
                                    className="flex items-center min-w-0 hover:opacity-95 transition"
                                  >
                                    <div className="relative">
                                      <Avatar
                                        src={item.insighter.profile_photo_url}
                                        radius="xl"
                                        alt={item.insighter.name}
                                        size="md"
                                        className={`${cardStyles.avatar} avatar-top-position`}
                                      >
                                        {!item.insighter.profile_photo_url && getInitials(item.insighter.name)}
                                      </Avatar>
                                    </div>
                                    <div className="ms-3 min-w-0">
                                      <Text fw={700} size="sm" className="capitalize truncate">
                                        {item.insighter.name.toLowerCase()}
                                      </Text>
                                      <Text c="dimmed" size="xs" className="capitalize truncate">
                                        {isRTL ? 'إنسايتر' : 'Insighter'}
                                      </Text>
                                    </div>
                                  </Link>
                                ) : (
                                  <div />
                                )}

                                {/* Pricing badge */}
                                <div className="flex items-center gap-2">
                                  {isPartial && (
                                   <div className="flex items-center gap-2">
                                       <Text size="xs" c="dimmed" className="whitespace-nowrap">
                           {copy.freeDocs} +
                        </Text>
                                     <Badge color="yellow" variant="light" className={cardStyles.priceBadge} style={{ fontWeight: 700 }}>
                                      <span dir="ltr" lang="en">
                                        {formattedPrice} 
                                      </span> 
                                    </Badge>
                                 
                                   </div>
                                  )}
                                  {isFree && !isPartial && (
                                    <Badge color="green" variant="light" className={cardStyles.priceBadge} style={{ fontWeight: 700 }}>
                                      {copy.free}
                                    </Badge>
                                  )}
                                  {isPaid && normalizedPrice !== '' && (
                                    <Badge color="yellow" variant="light" className={cardStyles.priceBadge}>
                                      <span dir="ltr" lang="en">
                                        {formattedPrice}
                                      </span>
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              {/* Description */}
                              {/* {desc && (
                                <Text size="sm" className="text-slate-700" lineClamp={3}>
                                  {desc}
                                </Text>
                              )} */}

                              {/* Published */}
                              {item.published_at && (
                                <div className="mt-4 pt-3 border-t border-slate-100">
                                  <Text c="dimmed" size="xs">
                                    {copy.posted} {formatPublishedDate(item.published_at, locale)}
                                  </Text>
                                </div>
                              )}
                            </div>
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <button
              className={`${nextClass} flex-shrink-0 z-30 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center group rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition`}
              aria-label={copy.next}
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <svg className="w-4 h-4 fill-cyan-500 group-hover:fill-slate-900 transition" viewBox="0 0 16 16">
                <path d="M9.3 14.7l-1.4-1.4L12.2 9H0V7h12.2L7.9 2.7l1.4-1.4L16 8z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

