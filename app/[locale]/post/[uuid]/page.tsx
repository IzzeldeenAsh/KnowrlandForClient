import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { publicBaseUrl } from '@/app/config'
import FeedMobileSearch from '@/components/feed/FeedMobileSearch'
import FeedSidebar from '@/components/feed/FeedSidebar'
import { FeedCard } from '@/components/feed/MyFeedsTimeline'
import MatchedRelatedDocumentsCard from '@/components/feed/MatchedRelatedDocumentsCard'
import RoleUpgradeCard from '@/components/feed/RoleUpgradeCard'
import {
  SOCIAL_THUMBNAIL_SIZE,
  buildSocialDescription,
  buildSocialThumbnailUrl,
  buildSocialTitle,
  loadFeedContent,
} from '@/lib/feed-social'

type PostPageProps = {
  params: Promise<{ locale: string; uuid: string }>
}

const loadPost = (slug: string, locale: string) => loadFeedContent('post', slug, locale)

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { locale, uuid } = await params
  const isArabic = locale === 'ar'
  const post = await loadPost(uuid, locale)

  if (!post) {
    return {
      title: isArabic ? 'المنشور غير موجود' : 'Post not found',
      robots: { index: false, follow: false },
    }
  }

  const authorName = post.insighter?.name ?? 'Insighta'
  const title = buildSocialTitle(post, authorName, isArabic)
  const description = buildSocialDescription(post, isArabic)
  const identifier = post.slug ?? post.uuid
  const url = `${publicBaseUrl}/${locale}/post/${identifier}`
  const socialImage = buildSocialThumbnailUrl('post', identifier)

  return {
    metadataBase: new URL(publicBaseUrl),
    title,
    description,
    authors: [{ name: authorName }],
    creator: authorName,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
    alternates: {
      canonical: url,
      languages: {
        en: `${publicBaseUrl}/en/post/${identifier}`,
        ar: `${publicBaseUrl}/ar/post/${identifier}`,
        'x-default': `${publicBaseUrl}/en/post/${identifier}`,
      },
    },
    openGraph: {
      type: 'article',
      locale: isArabic ? 'ar_SA' : 'en_US',
      url,
      siteName: 'Insighta',
      title,
      description,
      images: [
        {
          url: socialImage,
          width: SOCIAL_THUMBNAIL_SIZE,
          height: SOCIAL_THUMBNAIL_SIZE,
          type: 'image/jpeg',
          alt: title,
        },
      ],
      authors: [authorName],
      ...(post.published_at ? { publishedTime: post.published_at } : {}),
    },
    twitter: {
      // `summary` keeps the square thumbnail small next to the text instead of
      // stretching a feed image across the whole card.
      card: 'summary',
      site: '@INSIGHTA',
      title,
      description,
      images: [socialImage],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { locale, uuid } = await params
  const isArabic = locale === 'ar'
  const post = await loadPost(uuid, locale)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#EEF2FA] text-slate-900" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="mx-auto w-full max-w-7xl px-0 py-6 sm:px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[280px_minmax(0,1fr)_300px]">
          {/* Keep the post detail within the same navigation context as the feed. */}
          <aside className="hidden xl:block">
            <div className="no-scrollbar sticky top-[calc(var(--app-header-height,88px)+24px)] max-h-[calc(100vh-var(--app-header-height,88px)-48px)] overflow-y-auto pe-1">
              <FeedSidebar locale={locale} />
            </div>
          </aside>

          <section data-feed-posts-column className="min-w-0">
            <FeedMobileSearch locale={locale} />

            <div className="mt-4 flex min-h-[60px] items-center gap-3 rounded-lg border border-[#D9E3EF] bg-white px-4 sm:px-5">
                <Link
                  href={`/${locale}`}
                  aria-label={isArabic ? 'العودة إلى الموجز' : 'Back to feed'}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#36506F] transition-colors hover:bg-[#EEF5FE] hover:text-[#2378E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`h-5 w-5 ${isArabic ? 'rotate-180' : ''}`}
                  >
                    <path d="M19 12H5" />
                    <path d="m12 19-7-7 7-7" />
                  </svg>
                </Link>
                <div className="min-w-0">
                  <h1 className="text-[17px] font-bold tracking-[-0.02em] text-[#101724]">
                    {isArabic ? 'العودة إلى الخط الزمني للموجز' : 'Back to Feed timeline'}
                  </h1>
                </div>
            </div>
            <div className="mt-4">
              <FeedCard item={post} locale={locale} articleAccess="community" />
            </div>
            <MatchedRelatedDocumentsCard
              locale={locale}
              insights={post.matched_related_insights}
              className="mt-4 xl:hidden"
            />
          </section>

          {/* Match the feed's contextual right rail instead of leaving the detail view isolated. */}
          <aside className="hidden xl:block">
            <div className="no-scrollbar sticky top-[calc(var(--app-header-height,88px)+24px)] max-h-[calc(100vh-var(--app-header-height,88px)-48px)] space-y-4 overflow-y-auto pe-1">
              <RoleUpgradeCard locale={locale} />
              <MatchedRelatedDocumentsCard locale={locale} insights={post.matched_related_insights} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
