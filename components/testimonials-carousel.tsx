'use client'

import { useEffect, useState } from 'react'
import Particles from './particles'
import Highlighter, { HighlighterItem } from './highlighter'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import { Text, Badge, Avatar, Rating } from '@mantine/core'
import DataIcon from '@/components/icons/DataIcon'
import InsightIcon from '@/components/icons/InsightIcon'
import ManualIcon from '@/components/icons/ManualIcon'
import ReportIcon from '@/components/icons/ReportIcon'
import CourseIcon from '@/components/icons/CourseIcon'
import { formatDistanceToNow } from 'date-fns'
import cardStyles from '@/app/[locale]/topic/[id]/[slug]/knowledge-card.module.css'
import { arSA, enUS } from 'date-fns/locale'
import { usePopularKnowledge, PopularKnowledgeItem } from '@/hooks/knowledgs/usePopularKnowledge'

/* ــــــــ Swiper v11+ ــــــــ */
import Swiper, { Autoplay, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import Link from 'next/link'

function getInitials(name: string) {
  if (!name) return ''
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
}

function formatPublishedDate(dateString: string, locale: string = 'en') {
  const date = new Date(dateString)
  const utcDate = new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes()
  ))
  const selectedLocale = locale === 'ar' ? arSA : enUS
  return formatDistanceToNow(utcDate, {
    addSuffix: true,
    locale: selectedLocale,
  })
}

function truncateDescription(
  description: string,
  wordLimit: number = 20
): string {
  if (!description) return ""
  const plainText = description.replace(/<[^>]*>/g, "")
  const words = plainText.split(/\s+/)
  if (words.length <= wordLimit) return plainText
  return words.slice(0, wordLimit).join(" ") + "..."
}

export default function TestimonialsCarousel() {
  const t = useTranslations('Testimonials')
  const [swiperReady, setSwiperReady] = useState(false)
  const locale = useLocale()
  const { data: knowledgeData, isLoading } = usePopularKnowledge()
  const isRTL = locale === 'ar'

  useEffect(() => {
    /* تمرير الموديولات عبر الخاصيّة modules */
    new Swiper('.Knoldg-carousel', {
      modules: [Navigation, Autoplay],

      breakpoints: {
        320:  { slidesPerView: 1 },
        640:  { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },

      loop: true,               // دوران لا نهائي
      spaceBetween: 24,
      grabCursor: true,

      navigation: {
        nextEl: '.carousel-next',
        prevEl: '.carousel-prev',
      },

      autoplay: {
        delay: 3000,            // ٣ ثوانٍ بين كل انزلاق
        disableOnInteraction: false,
      },
    })

    setSwiperReady(true)
  }, [knowledgeData])

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">

          {/* ===== السلايدر ===== */}
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="relative before:absolute before:inset-0 before:-translate-x-full before:z-20 before:bg-gradient-to-l before:from-transparent before:to-slate-900 before:to-20% after:absolute after:inset-0 after:translate-x-full after:z-20 after:bg-gradient-to-r after:from-transparent after:to-slate-900 after:to-20%">
              <div className="Knoldg-carousel swiper group">
                <Highlighter className="swiper-wrapper" refresh={swiperReady}>
                  {knowledgeData.map((item: PopularKnowledgeItem, index: number) => (
                    <HighlighterItem key={`${item.type}-${item.slug}-${index}`} className="swiper-slide h-auto group/slide">
                      <KnowledgeCard item={item} locale={locale} isRTL={isRTL} />
                    </HighlighterItem>
                  ))}
                </Highlighter>
              </div>
            </div>
          )}

          {/* الأسهم */}
          <div className="flex mt-8 justify-end">
            <Arrow dir="prev" label={t('navigation.previous')} />
            <Arrow dir="next" label={t('navigation.next')} />
          </div>

        </div>
      </div>
    </section>
  )
}

/* ========== بطاقة المعرفة داخل السلايدر ========== */
type KnowledgeCardProps = {
  item: PopularKnowledgeItem
  locale: string
  isRTL: boolean
}

function KnowledgeCard({ item, locale, isRTL }: KnowledgeCardProps) {
  // Parse and format the price
  const priceString = item.total_price?.toString().trim() ?? ""
  const numericPrice = parseFloat(priceString)
  const isValidPrice = !isNaN(numericPrice) && priceString !== ""
  const isFree = isValidPrice && numericPrice === 0

  const formattedPrice = isValidPrice
    ? `$${numericPrice.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      })}`
    : (isRTL ? "مدفوع" : "PAID")

  const typeTranslations: Record<string, string> = {
    report: isRTL ? "تقرير" : "Reports",
    manual: isRTL ? "دليل" : "Manuals",
    statistic: isRTL ? "إحصائيات" : "Statistics",
    data: isRTL ? "بيانات" : "Data",
    article: isRTL ? "مجالات" : "Articles",
    course: isRTL ? "دورة تدريبية" : "Course",
  }

  const translations = {
    posted: isRTL ? "نُشر" : "Posted",
    free: isRTL ? "مجاني" : "Free",
    insighter: isRTL ? "إنسايتر" : "Insighter",
    company: isRTL ? "شركة" : "Company",
    paid: isRTL ? "مدفوع" : "Paid",
    by: isRTL ? "من قبل" : "By"
  }

  return (
    <div className="relative h-full bg-slate-900 rounded-[inherit] z-20 overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <Particles className="absolute inset-0 -z-10 opacity-0 group-[.swiper-slide-active]/slide:opacity-100 group-hover/slide:opacity-100 transition-opacity duration-500 ease-in-out" quantity={3} />
      <div className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/3 aspect-square" aria-hidden="true">
        <div className="absolute inset-0 translate-z-0 rounded-full bg-slate-800 group-[.swiper-slide-active]/slide:bg-blue-500 transition-colors duration-500 ease-in-out blur-[60px]" />
      </div>

      <Link href={`/${locale}/knowledge/${item.type}/${item.slug}`} className="block h-full">
        <div className="flex flex-col h-full min-h-[200px]">
          {/* Dark section with type and title */}
          <div
            className="p-6 flex flex-col justify-between min-h-[200px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                'linear-gradient(to bottom right, rgba(30,41,59,0.35), rgba(15,23,42,0.6)), url("https://res.cloudinary.com/dsiku9ipv/image/upload/v1766389693/Image_shared-item_cards-preview_image_component__image_2_1_tfd8ig.webp")',
              
            }}
          >
            <div>
              <div className="flex items-center mb-3">
                {item.type === "report" && <ReportIcon width={20} height={20} />}
                {item.type === "manual" && <ManualIcon width={20} height={20} />}
                {item.type === "statistic" && <InsightIcon width={20} height={20} />}
                {item.type === "data" && <DataIcon width={20} height={20} />}
                {item.type === "article" && <CourseIcon width={20} height={20} />}
                {item.type === "course" && <CourseIcon width={20} height={20} />}

                <Badge className="capitalize mx-2 bg-blue-500 text-white" variant="filled">
                  {typeTranslations[item.type.toLowerCase()] || item.type}
                </Badge>
              </div>

              <Text
                fw={700}
                className="text-white mb-3"
                lineClamp={3}
                size='lg'
                style={{ textAlign: item.language?.toLowerCase() === 'arabic' ? 'right' : 'left' }}
              >
                {item.title}
              </Text>
            </div>

            <div>
              {item.review_summary && item.review_summary.count >= 1 && item.review_summary.average > 0 && (
                <div className="flex items-center gap-1">
                  <Rating value={item.review_summary.average} fractions={2} readOnly size="sm" />
                  <Text size="xs" fw={500} className="mx-1 text-sky-400">{item.review_summary.average.toFixed(1)}</Text>
                  <Text size="xs" className="mx-1 text-slate-400">({item.review_summary.count})</Text>
                </div>
              )}
            </div>
          </div>

          {/* White section with insighter info and price */}
          <div className="bg-white p-4 flex flex-col justify-between h-full min-h-[100px]">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center flex-1 min-w-0 gap-2">
                <div className="relative flex-shrink-0">
                  <div className="object-cover object-top">
                    <Avatar
                      src={(item.insighter.roles.includes("company") || item.insighter.roles.includes("company-insighter")) && item.insighter.company?.logo
                        ? item.insighter.company.logo
                        : item.insighter.profile_photo_url}
                      radius="xl"
                      alt={item.insighter.name}
                      size="md"
                      className={`${cardStyles.avatar} avatar-top-position`}
                    >
                      {!((item.insighter.roles.includes("company") || item.insighter.roles.includes("company-insighter")) && item.insighter.company?.logo) &&
                        !item.insighter.profile_photo_url &&
                        getInitials(item.insighter.name)}
                    </Avatar>
                  </div>

                  {item.insighter.roles.includes("company-insighter") && item.insighter.profile_photo_url && (
                    <Avatar
                      src={item.insighter.profile_photo_url}
                      radius="xl"
                      size="sm"
                      className="absolute bottom-0 right-0 translate-x-1/3 rounded-full translate-y-1/3 z-10 avatar-top-position"
                      alt={item.insighter.name}
                      style={{
                        boxShadow: "0 0 0 2px white",
                        position: "absolute",
                      }}
                    />
                  )}

                  {item.insighter.roles.includes("company") && item.insighter.profile_photo_url && (
                    <Avatar
                      src={item.insighter.profile_photo_url}
                      radius="xl"
                      size="sm"
                      className="absolute bottom-0 right-0 translate-x-1/3 rounded-full translate-y-1/3 z-10 avatar-top-position"
                      alt={item.insighter.name}
                      style={{
                        boxShadow: "0 0 0 2px white",
                        position: "absolute",
                      }}
                    />
                  )}
                </div>

                <div className="mx-2 min-w-0 flex-1">
                  <Text fw={600} size="xs" className="capitalize text-gray-900 truncate">
                    {item.insighter.roles.includes("company") || item.insighter.roles.includes("company-insighter")
                      ? item.insighter.company?.legal_name || translations.company
                      : item.insighter.name.toLowerCase()}
                  </Text>
                  <Text c="dimmed" size="xs" className="truncate">
                    {item.insighter.roles.includes("insighter") && translations.insighter}
                    {(item.insighter.roles.includes("company") || item.insighter.roles.includes("company-insighter")) &&
                      `${translations.by} ${item.insighter.name.toLowerCase()}`}
                  </Text>
                </div>
              </div>

              <div className="flex-shrink-0">
                {isValidPrice && (
                  <Badge
                    color={isFree ? "green" : "yellow"}
                    variant="light"
                    size="sm"
                  >
                    {isFree ? translations.free : translations.paid}
                  </Badge>
                )}
              </div>
            </div>

            <div className="mt-auto pt-3 border-t border-gray-100">
              <Text c="dimmed" size="xs">
                {translations.posted} {formatPublishedDate(item.published_at, locale)}
              </Text>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

/* ========== زر السهم ========== */
type ArrowProps = { dir: 'prev' | 'next'; label: string }
function Arrow({ dir, label }: ArrowProps) {
  const isPrev = dir === 'prev'
  return (
    <button className={`carousel-${dir} relative z-20 w-12 h-12 flex items-center justify-center group`}>
      <span className="sr-only">{label}</span>
      {isPrev ? (
        <svg className="w-4 h-4 fill-slate-500 group-hover:fill-blue-500 transition" viewBox="0 0 16 16">
          <path d="M6.7 14.7l1.4-1.4L3.8 9H16V7H3.8l4.3-4.3-1.4-1.4L0 8z" />
        </svg>
      ) : (
        <svg className="w-4 h-4 fill-slate-500 group-hover:fill-blue-500 transition" viewBox="0 0 16 16">
          <path d="M9.3 14.7l-1.4-1.4L12.2 9H0V7h12.2L7.9 2.7l1.4-1.4L16 8z" />
        </svg>
      )}
    </button>
  )
}
