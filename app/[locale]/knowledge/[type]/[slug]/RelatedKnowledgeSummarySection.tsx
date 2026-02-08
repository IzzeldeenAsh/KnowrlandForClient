'use client'

import { useEffect, useId, useMemo } from 'react'
import Link from 'next/link'
import { Badge, Rating, Text } from '@mantine/core'
import { formatDistanceToNow } from 'date-fns'
import { arSA, enUS } from 'date-fns/locale'

/* Swiper v11+ */
import Swiper, { Autoplay, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'

import DataIcon from '@/components/icons/DataIcon'
import InsightIcon from '@/components/icons/InsightIcon'
import ManualIcon from '@/components/icons/ManualIcon'
import ReportIcon from '@/components/icons/ReportIcon'
import CourseIcon from '@/components/icons/CourseIcon'
import { isFirstWordArabic } from '@/app/utils/textUtils'

import styles from './RelatedKnowledgeSummarySection.module.css'

export type RelatedKnowledgeSummaryItem = {
  slug: string
  type: string
  title: string
  description?: string
  total_price?: string
  published_at?: string
  language?: string
  paid_status?: 'free' | 'partial_paid' | 'paid' | string
  review_summary?: { count?: number; average?: number }
  total_downloads?: number
}

type Props = {
  locale: string
  isRTL: boolean
  items: RelatedKnowledgeSummaryItem[]
  backgroundImageUrl?: string
}

function stripHtml(html: string) {
  return (html || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function truncateWords(text: string, wordLimit: number = 26) {
  const t = (text || '').trim()
  if (!t) return ''
  const words = t.split(/\s+/)
  if (words.length <= wordLimit) return t
  return `${words.slice(0, wordLimit).join(' ')}...`
}

function formatPublishedDate(dateString: string, locale: string) {
  const date = new Date(dateString)
  const utcDate = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes()
    )
  )
  const selectedLocale = locale === 'ar' ? arSA : enUS
  return formatDistanceToNow(utcDate, { addSuffix: true, locale: selectedLocale })
}

function TypeIcon({ type }: { type: string }) {
  const t = (type || '').toLowerCase()
  if (t === 'data') return <DataIcon width={18} height={18} />
  if (t === 'statistic') return <InsightIcon width={18} height={18} />
  if (t === 'manual') return <ManualIcon width={18} height={18} />
  if (t === 'report') return <ReportIcon width={18} height={18} />
  if (t === 'course') return <CourseIcon width={18} height={18} />
  return <InsightIcon width={18} height={18} />
}

export default function RelatedKnowledgeSummarySection({
  locale,
  isRTL,
  items,
  backgroundImageUrl = 'https://res.cloudinary.com/dsiku9ipv/image/upload/v1770277460/photo-1707209856575-a80b9dff5524_rkowxg.png',
}: Props) {
  const reactId = useId()
  const uid = useMemo(() => reactId.replace(/[:]/g, ''), [reactId])

  const carouselClass = `Knoldg-related-summary-carousel-${uid}`
  const nextClass = `related-summary-next-${uid}`
  const prevClass = `related-summary-prev-${uid}`

  useEffect(() => {
    if (!items || items.length === 0) return

    const swiper = new Swiper(`.${carouselClass}`, {
      modules: [Navigation, Autoplay],
      breakpoints: {
        320: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
      loop: items.length > 3,
      spaceBetween: 24,
      grabCursor: true,
      navigation: {
        nextEl: `.${nextClass}`,
        prevEl: `.${prevClass}`,
      },
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
    })

    return () => {
      swiper.destroy(true, true)
    }
  }, [items, carouselClass, nextClass, prevClass])

  const copy = {
    title: isRTL ? 'استكشف كنوز المعرفة المشابهة' : 'Discover More Insights Gems',
    subtitle: isRTL
      ? 'اكتشف محتوى مشابهًا قد يهمك—من نفس الصناعة أو المواضيع القريبة.'
      : 'Explore similar content you might like—based on nearby industries and topics.',
    posted: isRTL ? 'نُشر' : 'Posted',
    free: isRTL ? 'مجاني' : 'Free',
    paid: isRTL ? 'مدفوع' : 'Paid',
    partial: isRTL ? 'مدفوع جزئي' : 'Partial paid',
    previous: isRTL ? 'السابق' : 'Previous',
    next: isRTL ? 'التالي' : 'Next',
  }

  return (
    <section
      className="relative overflow-hidden mt-10 sm:mt-14 w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url("${backgroundImageUrl}")`,
      }}
    >
      {/* Glow blurred bulbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top bulb */}
        <div
          className={`absolute -top-28 ${isRTL ? '-right-28' : '-left-28'} h-[340px] w-[340px] rounded-full blur-3xl opacity-10 bg-cyan-400 `}
        />
        {/* Middle bulb */}
        <div
          className={`absolute top-[28%] ${isRTL ? '-left-40' : '-right-40'} h-[460px] w-[460px] rounded-full blur-3xl opacity-15 bg-blue-500`}
        />
        {/* Bottom bulb */}
        <div
          className={`absolute -bottom-32 ${isRTL ? '-right-40' : '-left-40'} h-[520px] w-[520px] rounded-full blur-3xl opacity-10 bg-teal-400`}
        />

        {/* Soft vignette to blend glows */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white/20" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="text-center">
          <h2
            className={`text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text ${
              isRTL
                ? 'bg-gradient-to-l from-blue-400 to-teal-500'
                : 'bg-gradient-to-r from-blue-500 to-teal-400'
            } mb-4 leading-[2]`}
          >
            {copy.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-3xl mx-auto">{copy.subtitle}</p>
        </div>

        <div className={`mt-10 flex items-center gap-3 sm:gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Side arrows (outside cards) */}
          <button
            className={`${prevClass} flex-shrink-0 z-30 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center group rounded-full border border-white/40 bg-sky-500/20 hover:bg-sky-500/30 transition backdrop-blur-md`}
          >
            <span className="sr-only">{copy.previous}</span>
            <svg className="w-4 h-4 fill-cyan-500 group-hover:fill-slate-900 transition" viewBox="0 0 16 16">
              <path d="M6.7 14.7l1.4-1.4L3.8 9H16V7H3.8l4.3-4.3-1.4-1.4L0 8z" />
            </svg>
          </button>

          <div className="relative flex-1 min-w-0">
            <div className={`${styles.summaryCarousel} ${carouselClass} swiper group`}>
            <div className="swiper-wrapper">
              {items.map((item, index) => {
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

                const desc = truncateWords(stripHtml(item.description || ''), 30)
                const ratingCount = Number(item.review_summary?.count ?? 0)
                const ratingAvg = Number(item.review_summary?.average ?? 0)

                return (
                  <div key={`${item.type}-${item.slug}-${index}`} className="swiper-slide h-auto">
                    <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-slate-200 bg-white">
                      <Link
                        href={`/${locale}/knowledge/${item.type}/${item.slug}`}
                        className="flex flex-col h-full"
                      >
                        <div
                          className="shrink-0 p-6 min-h-[190px] bg-cover bg-center bg-no-repeat"
                          style={{
                            backgroundImage:
                              'linear-gradient(to right bottom, rgba(30, 41, 59, 0.35), rgba(15, 23, 42, 0.6)), url("https://res.cloudinary.com/dsiku9ipv/image/upload/v1766389693/Image_shared-item_cards-preview_image_component__image_2_1_tfd8ig.webp")',
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <TypeIcon type={item.type} />
                            <Badge className="capitalize bg-blue-500 text-white" variant="filled">
                              {item.type}
                            </Badge>
                          </div>

                          <Text
                            style={{wordBreak:'break-word', paddingTop: '20px'}}
                            fw={700}
                            c="white"
                            size="lg"
                            className={` ${isFirstWordArabic(item.title) ? 'text-right' : 'text-left'}`}
                            lineClamp={3}
                            dir={isFirstWordArabic(item.title) ? 'rtl' : 'ltr'}
                          >
                            {item.title}
                          </Text>

                          {ratingCount >= 1 && ratingAvg > 0 && (
                            <div className="flex items-center gap-1 mt-4">
                              <Rating value={ratingAvg} fractions={2} readOnly size="sm" />
                              <Text size="xs" fw={600} className="mx-1 text-sky-300">
                                {ratingAvg.toFixed(1)}
                              </Text>
                              <Text size="xs" className="mx-1 text-slate-200">
                                ({ratingCount})
                              </Text>
                            </div>
                          )}
                        </div>

                        <div className="p-5 flex flex-col flex-1 min-h-[180px]">
                          {desc && (
                            <Text size="sm" className={`text-slate-700 ${isFirstWordArabic(desc) ? 'text-right' : 'text-left'}`} lineClamp={3}>
                              {desc}
                            </Text>
                          )}

                          <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              {item.published_at ? (
                                <Text c="dimmed" size="xs" className="truncate">
                                  {copy.posted} {formatPublishedDate(item.published_at, locale)}
                                </Text>
                              ) : (
                                <span />
                              )}
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {isPartial && (
                                <Badge color="yellow" variant="light" size="sm" style={{ fontWeight: 600 }}>
                                  {copy.partial}
                                </Badge>
                              )}
                              {isFree && !isPartial && (
                                <Badge color="green" variant="light" size="sm" style={{ fontWeight: 600 }}>
                                  {copy.free}
                                </Badge>
                              )}
                              {isPaid && normalizedPrice !== '' && (
                                <Badge color="yellow" variant="light" size="sm" style={{ fontWeight: 700 }}>
                                  <span dir="ltr" lang="en">
                                    {formattedPrice}
                                  </span>
                                </Badge>
                              )}
                              {!isFree && !isPaid && normalizedPrice === '' && (
                                <Badge color="gray" variant="light" size="sm">
                                  {copy.paid}
                                </Badge>
                              )}
                            </div>
                          </div>
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
            className={`${nextClass} flex-shrink-0 z-30 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center group rounded-full border border-white/40 bg-sky-500/20 hover:bg-sky-500/30 transition backdrop-blur-md`}
          >
            <span className="sr-only">{copy.next}</span>
            <svg className="w-4 h-4 fill-cyan-500 group-hover:fill-slate-900 transition" viewBox="0 0 16 16">
              <path d="M9.3 14.7l-1.4-1.4L12.2 9H0V7h12.2L7.9 2.7l1.4-1.4L16 8z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

