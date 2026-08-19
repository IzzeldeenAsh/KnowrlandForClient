'use client'

import {
  IconArrowLeft,
  IconArrowRight,
  IconArticle,
  IconBuildingSkyscraper,
  IconClock,
  IconLoader2,
} from '@tabler/icons-react'
import { Badge } from '@mantine/core'
import { format } from 'date-fns'
import { arSA, enUS } from 'date-fns/locale'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { publicBaseUrl } from '@/app/config'
import FeedSaveButton from '@/components/feed/FeedSaveButton'
import FeedShare from '@/components/feed/FeedShare'
import KnowledgeTypeIcon from '@/components/icons/KnowledgeTypeIcon'
import {
  getCommunityFeedArticle,
  getFeedItem,
  type FeedItem,
  type FeedItemRelatedInsight,
} from '@/services/feed.service'
import styles from './ArticleReader.module.css'

type ArticleReaderProps = {
  locale: string
  identifier: string
  isPublic: boolean
}

const copyByLocale = {
  en: {
    back: 'Back to Feed',
    loading: 'Loading White Paper…',
    loadFailed: 'We couldn’t load this White Paper.',
    notArticle: 'This content is not a White Paper.',
    tryAgain: 'Try again',
    minuteRead: 'min read',
    readTime: 'Read time',
    published: 'Published',
    publisher: 'Publisher',
    viewInsight: 'View',
    openingInsight: 'Opening…',
  },
  ar: {
    back: 'العودة إلى الموجز',
    loading: 'جارٍ تحميل الورقة البيضاء…',
    loadFailed: 'تعذر تحميل هذه الورقة البيضاء.',
    notArticle: 'هذا المحتوى ليس ورقة بيضاء.',
    tryAgain: 'حاول مرة أخرى',
    minuteRead: 'دقيقة قراءة',
    readTime: 'مدة القراءة',
    published: 'نُشر',
    publisher: 'الناشر',
    viewInsight: 'عرض',
    openingInsight: 'جارٍ الفتح…',
  },
} as const

function truncateLabel(value: string, maxLength = 38): string {
  if (value.length <= maxLength) return value
  return `${value.slice(0, maxLength).trimEnd()}…`
}

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
    <div aria-label={label} className={styles.skeleton}>
      <div className={styles.skeletonHero}>
        <div className={styles.skeletonInner}>
          <div className={styles.skeletonTitle} />
          <div className={styles.skeletonTitleShort} />
        </div>
      </div>
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonSide} />
        <div className={styles.skeletonLines}>
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </div>
  )
}

export default function ArticleReader({ locale, identifier, isPublic }: ArticleReaderProps) {
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

    const loadArticle = isPublic
      ? getCommunityFeedArticle(identifier, locale)
      : getFeedItem(identifier, locale)

    loadArticle
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
  }, [copy.loadFailed, copy.notArticle, identifier, isPublic, locale, reloadKey])

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
            <Link href={`/${locale}`} className="inline-flex min-h-11 items-center rounded-full border border-[#CBD7E5] px-5 text-sm font-semibold text-[#4B5E77] hover:bg-[#F5F8FB]">
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

  const shareUrl = `${publicBaseUrl}/${locale}/article/${item.slug ?? identifier}`

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} className={styles.page}>
      <header
        className={`${styles.hero} ${cover?.url ? styles.heroWithImage : styles.heroWithoutImage}`}
        style={cover?.url ? { backgroundImage: `url(${cover.url})` } : undefined}
      >
        <div className={styles.heroShade} />
        <div className={styles.heroInner}>
          <div className={styles.heroTitleRow}>
            <div className={styles.heroContent}>
              {item.industry && (
                <Link
                  href={`/${locale}/sub-industry/${item.industry.id}/${item.industry.slug}`}
                  className={styles.heroIndustryEyebrow}
                  title={item.industry.name}
                >
                  <IconBuildingSkyscraper aria-hidden />
                  <span>{truncateLabel(item.industry.name)}</span>
                </Link>
              )}
              <h1 dir="auto">{item.title}</h1>
            </div>
            <div className={styles.heroActions}>
              {isPublic && (
                <FeedSaveButton
                  uuid={item.uuid}
                  identifier={item.slug ?? identifier}
                  contentType="article"
                  initialIsSaved={item.is_saved}
                  locale={locale}
                  tone="hero"
                  className={styles.heroActionButton}
                />
              )}
              <FeedShare
                shareUrl={shareUrl}
                shareTitle={item.title ?? ''}
                authorName={insighter?.name ?? 'Insighta'}
                authorPhotoUrl={insighter?.profile_photo_url}
                locale={locale}
                shareKind="white-paper"
                triggerClassName={styles.shareButton}
                hideTriggerLabel
              />
            </div>
          </div>

          <div className={styles.heroMetaRow}>
            {insighter && (
              <div className={`${styles.heroMetaItem} ${styles.heroAuthor}`}>
                <Link
                  href={`/${locale}/profile/${insighter.uuid}?entity=insighter`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.heroAuthorLink}
                >
                  <div className={styles.authorAvatar}>
                    {insighter.profile_photo_url ? <img src={insighter.profile_photo_url} alt={insighter.name} /> : <span>{initials}</span>}
                  </div>
                  <div className={styles.heroAuthorText}>
                    <span className={styles.heroMetaLabel}>{copy.publisher}</span>
                    <strong>{insighter.name}</strong>
                    {insighter.company && <small>{insighter.company.legal_name ?? insighter.company.name}</small>}
                  </div>
                </Link>
              </div>
            )}

            {publishedDate && (
              <time className={`${styles.heroMetaItem} ${styles.heroPublished}`} dateTime={item.published_at ?? item.created_at ?? undefined}>
                <span className={styles.heroMetaLabel}>{copy.published}</span>
                <strong>{publishedDate}</strong>
              </time>
            )}

            <div className={`${styles.heroMetaItem} ${styles.heroReadTime}`}>
              <span className={styles.heroReadTimeLabel}>
                <IconClock aria-hidden />
                <span className={styles.heroMetaLabel}>{copy.readTime}</span>
              </span>
              <strong>{readingMinutes} {copy.minuteRead}</strong>
            </div>
          </div>
        </div>
      </header>

      <main className={styles.contentShell}>
        <Link href={`/${locale}`} className={styles.backLink}>
          <BackIcon aria-hidden />
          {copy.back}
        </Link>

        <article className={styles.articleLayout}>
          <div className={styles.articleMain}>
            <div dir="auto" className={styles.articleBody} dangerouslySetInnerHTML={{ __html: sanitizedBody }} />

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
                            <KnowledgeTypeIcon type={insight.type} size={16} />
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
          </div>
        </article>
      </main>
    </div>
  )
}
