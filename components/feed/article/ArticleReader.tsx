'use client'

import {
  IconArrowLeft,
  IconArrowRight,
  IconArticle,
  IconBuildingSkyscraper,
  IconClock,
  IconFileDescription,
  IconLoader2,
} from '@tabler/icons-react'
import { Badge } from '@mantine/core'
import { format } from 'date-fns'
import { arSA, enUS } from 'date-fns/locale'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { getFeedItem, type FeedItem, type FeedItemRelatedInsight } from '@/services/feed.service'
import styles from './ArticleReader.module.css'

type ArticleReaderProps = {
  locale: string
  uuid: string
}

const copyByLocale = {
  en: {
    article: 'Article',
    back: 'Back to my posts',
    loading: 'Loading article…',
    loadFailed: 'We couldn’t load this article.',
    notArticle: 'This content is not an article.',
    tryAgain: 'Try again',
    minuteRead: 'min read',
    published: 'Published',
    viewInsight: 'View',
    openingInsight: 'Opening…',
    coverAlt: 'Article cover',
  },
  ar: {
    article: 'مقال',
    back: 'العودة إلى منشوراتي',
    loading: 'جارٍ تحميل المقال…',
    loadFailed: 'تعذر تحميل هذا المقال.',
    notArticle: 'هذا المحتوى ليس مقالاً.',
    tryAgain: 'حاول مرة أخرى',
    minuteRead: 'دقيقة قراءة',
    published: 'نُشر',
    viewInsight: 'عرض',
    openingInsight: 'جارٍ الفتح…',
    coverAlt: 'غلاف المقال',
  },
} as const

const allowedTags = new Set([
  'p',
  'br',
  'h1',
  'h2',
  'h3',
  'h4',
  'strong',
  'b',
  'em',
  'i',
  'u',
  's',
  'ul',
  'ol',
  'li',
  'blockquote',
  'pre',
  'code',
  'hr',
  'a',
])

function plainText(html: string): string {
  if (typeof document === 'undefined') return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  const container = document.createElement('div')
  container.innerHTML = html
  return (container.textContent ?? '').replace(/\s+/g, ' ').trim()
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

function sanitizeRichText(html: string): string {
  if (typeof document === 'undefined') return ''

  const parsed = new DOMParser().parseFromString(html, 'text/html')
  parsed.body.querySelectorAll('script, style, iframe, object, embed, form, input, button').forEach((node) => node.remove())

  Array.from(parsed.body.querySelectorAll('*')).forEach((element) => {
    const tagName = element.tagName.toLowerCase()
    if (!allowedTags.has(tagName)) {
      element.replaceWith(...Array.from(element.childNodes))
      return
    }

    const href = tagName === 'a' ? element.getAttribute('href') ?? '' : ''
    Array.from(element.attributes).forEach((attribute) => element.removeAttribute(attribute.name))

    if (tagName === 'a') {
      if (/^(https?:|mailto:)/i.test(href)) {
        element.setAttribute('href', href)
        element.setAttribute('target', '_blank')
        element.setAttribute('rel', 'noopener noreferrer')
      }
    }
  })

  return parsed.body.innerHTML
}

function formatArticleDate(value: string | null, locale: string): string | null {
  if (!value) return null
  const date = new Date(value.includes('T') ? value : value.replace(' ', 'T'))
  if (Number.isNaN(date.getTime())) return value
  return format(date, 'PPP', { locale: locale === 'ar' ? arSA : enUS })
}

function ArticleSkeleton({ label }: { label: string }) {
  return (
    <div aria-label={label} className="mx-auto max-w-[1040px] animate-pulse px-4 py-8 lg:px-8">
      <div className="h-5 w-36 rounded bg-slate-200" />
      <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="aspect-[2.25/1] bg-slate-200" />
        <div className="mx-auto max-w-[790px] px-6 py-10 sm:px-10">
          <div className="h-4 w-40 rounded bg-slate-200" />
          <div className="mt-5 h-10 w-full rounded bg-slate-200" />
          <div className="mt-3 h-10 w-4/5 rounded bg-slate-200" />
          <div className="mt-10 h-px bg-slate-200" />
          <div className="mt-8 space-y-3">
            <div className="h-4 rounded bg-slate-100" />
            <div className="h-4 rounded bg-slate-100" />
            <div className="h-4 w-3/4 rounded bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ArticleReader({ locale, uuid }: ArticleReaderProps) {
  const isArabic = locale === 'ar'
  const copy = copyByLocale[isArabic ? 'ar' : 'en']
  const BackIcon = isArabic ? IconArrowRight : IconArrowLeft
  const [item, setItem] = useState<FeedItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [openingInsight, setOpeningInsight] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    setIsLoading(true)
    setError(null)

    getFeedItem(uuid, locale)
      .then((result) => {
        if (!active) return
        if (result.content_type !== 'article') {
          setError(copy.notArticle)
          return
        }
        setItem(result)
      })
      .catch((loadError) => {
        if (active) setError(loadError instanceof Error ? loadError.message : copy.loadFailed)
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })

    return () => {
      active = false
    }
  }, [copy.loadFailed, copy.notArticle, locale, reloadKey, uuid])

  const sanitizedBody = useMemo(() => sanitizeRichText(item?.body ?? ''), [item?.body])
  const readingMinutes = useMemo(() => {
    const words = plainText(item?.body ?? '').split(/\s+/).filter(Boolean).length
    return Math.max(1, Math.ceil(words / 220))
  }, [item?.body])

  if (isLoading) return <ArticleSkeleton label={copy.loading} />

  if (error || !item) {
    return (
      <main className="flex min-h-[calc(100vh-var(--app-header-height,88px))] items-center justify-center bg-[#F2F5F8] px-4 py-16">
        <div className="w-full max-w-lg rounded-2xl border border-[#D9E2EC] bg-white p-8 text-center shadow-sm">
          <IconArticle aria-hidden className="mx-auto h-11 w-11 text-[#8293A9]" stroke={1.4} />
          <h1 className="mt-5 text-2xl font-bold text-[#142033]">{error ?? copy.loadFailed}</h1>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href={`/${locale}?view=my-feeds`} className="inline-flex min-h-11 items-center rounded-full border border-[#CBD7E5] px-5 text-sm font-semibold text-[#4B5E77] hover:bg-[#F5F8FB]">
              {copy.back}
            </Link>
            <button type="button" onClick={() => setReloadKey((current) => current + 1)} className="min-h-11 rounded-full bg-[#2378E8] px-5 text-sm font-semibold text-white hover:bg-[#1769C2]">
              {copy.tryAgain}
            </button>
          </div>
        </div>
      </main>
    )
  }

  const cover = item.media.find((media) => media.media_type === 'image' && media.url)
  const publishedDate = formatArticleDate(item.published_at ?? item.created_at, locale)
  const insighter = item.insighter
  const initials = insighter?.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || 'I'

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} className="min-h-[calc(100vh-var(--app-header-height,88px))] bg-[#F2F5F8] text-[#142033]">
      <main className="mx-auto max-w-[1040px] px-4 py-7 sm:py-10 lg:px-8 lg:py-12">
        <Link href={`/${locale}?view=my-feeds`} className="inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-sm font-semibold text-[#53677F] transition-colors hover:bg-white hover:text-[#2378E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8]">
          <BackIcon aria-hidden className="h-4 w-4" stroke={2} />
          {copy.back}
        </Link>

        <article className="mt-4 overflow-hidden rounded-2xl border border-[#D8E1EB] bg-white shadow-[0_22px_60px_rgba(31,48,70,0.08)] sm:mt-6">
          {cover?.url ? (
            <div className="h-[clamp(150px,25vw,260px)] overflow-hidden bg-[#E5EBF1]">
              <img src={cover.url} alt={cover.name || item.title || copy.coverAlt} className="h-full w-full object-cover" />
            </div>
          ) : (
            <div className="flex h-[clamp(190px,34vw,340px)] items-center justify-center bg-[linear-gradient(135deg,#EAF1F8_0%,#DCE8F4_100%)] text-[#7890AB]">
              <IconArticle aria-hidden className="h-16 w-16" stroke={1.2} />
            </div>
          )}

          <div className="mx-auto max-w-[790px] px-6 py-8 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 text-[12px] font-semibold text-[#65778D]">
              <span className="inline-flex items-center gap-1.5 uppercase tracking-[0.1em] text-[#2378E8]"><IconArticle aria-hidden className="h-4 w-4" />{copy.article}</span>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1.5"><IconClock aria-hidden className="h-4 w-4" />{readingMinutes} {copy.minuteRead}</span>
              {publishedDate && <><span aria-hidden>·</span><time dateTime={item.published_at ?? item.created_at ?? undefined}>{copy.published} {publishedDate}</time></>}
            </div>

            <h1 dir="auto" className="mt-5 text-start text-[clamp(2rem,5vw,3.7rem)] font-bold leading-[1.12] tracking-[-0.035em] text-[#101827]">
              {item.title}
            </h1>

            {(insighter || item.industry) && (
              <div className="mt-8 flex flex-wrap items-center gap-4 border-y border-[#E4EAF0] py-5">
                {insighter && (
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#E7F0FE]">
                      {insighter.profile_photo_url ? <img src={insighter.profile_photo_url} alt={insighter.name} className="h-full w-full object-cover" /> : <span className="flex h-full items-center justify-center text-sm font-bold text-[#2378E8]">{initials}</span>}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[#1D2A3D]">{insighter.name}</p>
                      {insighter.company && <p className="truncate text-xs text-[#718298]">{insighter.company.legal_name ?? insighter.company.name}</p>}
                    </div>
                  </div>
                )}
                {item.industry && (
                  <Link href={`/${locale}/sub-industry/${item.industry.id}/${item.industry.slug}`} className="inline-flex items-center gap-2 rounded-full bg-[#EDF4FC] px-3 py-2 text-xs font-semibold text-[#2378E8] hover:bg-[#E1EDFA]">
                    <IconBuildingSkyscraper aria-hidden className="h-4 w-4" />{item.industry.name}
                  </Link>
                )}
              </div>
            )}

            {item.tags.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-2">
                {item.tags.map((tag) => <span key={tag.id} className="rounded-full bg-[#F0F4F8] px-3 py-1.5 text-xs font-semibold text-[#556A84]">#{tag.name}</span>)}
              </div>
            )}

            <div dir="auto" className={`${styles.articleBody} mt-9`} dangerouslySetInnerHTML={{ __html: sanitizedBody }} />

            {item.related_insights.length > 0 && (
              <div className="-mx-6 mt-12 divide-y divide-[#E7EDF5] overflow-hidden rounded-xl border border-[#E7EDF5] sm:-mx-10 lg:-mx-12">
                {item.related_insights.map((insight) => {
                  const insightKey = `${insight.type}-${insight.slug}`
                  const insightPrice = getInsightPrice(insight.price, locale === 'ar' ? 'مجاني' : 'Free')

                  return (
                    <div
                      key={insightKey}
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
                            <IconFileDescription aria-hidden className="h-4 w-4 text-[#67B5F6]" />
                            <span className="rounded-full bg-[#0B315D]/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.05em] text-[#67B5F6] backdrop-blur-sm">
                              {insight.type}
                            </span>
                          </div>
                          <h2 dir="auto" className="mt-4 line-clamp-3 text-start text-[15px] font-semibold leading-6 text-white transition-colors group-hover:text-[#A8D5FF] sm:text-[16px]">
                            {insight.title}
                          </h2>
                        </div>
                      </Link>

                      <div className="flex min-h-[130px] min-w-0 flex-1 flex-col justify-center bg-white px-4 py-4 sm:min-h-[155px] sm:px-5">
                        <div className="min-w-0">
                          {insight.description && (
                            <p dir="auto" className="line-clamp-3 text-[13px] leading-[1.2rem] text-[#667894] sm:text-[14px]">
                              {plainText(insight.description)}
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
                            className="inline-flex min-h-9 items-center justify-center rounded-full border border-[#2378E8] px-4 text-center text-[13px] font-medium text-[#2378E8] transition-colors hover:bg-[#F2F7FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2"
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
          </div>
        </article>
      </main>
    </div>
  )
}
