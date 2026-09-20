import type { Metadata } from 'next'
import { publicBaseUrl } from '@/app/config'
import ArticleReader from '@/components/feed/article/ArticleReader'
import {
  SOCIAL_THUMBNAIL_SIZE,
  buildSocialDescription,
  buildSocialThumbnailUrl,
  buildSocialTitle,
  loadFeedContent,
} from '@/lib/feed-social'

type ArticlePageProps = {
  params: Promise<{ locale: string; uuid: string }>
  searchParams: Promise<{ source?: string }>
}

// The reader itself is client-rendered, so without this a shared White Paper
// link fell back to the generic site card with no title, excerpt or image.
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { locale, uuid } = await params
  const isArabic = locale === 'ar'
  const article = await loadFeedContent('article', uuid, locale)

  if (!article) {
    return {
      title: isArabic ? 'ورقة بيضاء - انسايتا' : 'White Paper - Insighta Business',
      description: isArabic
        ? 'اقرأ ورقة بيضاء نشرها خبير في انسايتا.'
        : 'Read a White Paper published by an Insighta expert.',
    }
  }

  const authorName = article.insighter?.name ?? 'Insighta'
  const title = buildSocialTitle(article, authorName, isArabic)
  const description = buildSocialDescription(article, isArabic)
  const identifier = article.slug ?? article.uuid
  const url = `${publicBaseUrl}/${locale}/article/${identifier}`
  const socialImage = buildSocialThumbnailUrl('article', identifier)

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
        en: `${publicBaseUrl}/en/article/${identifier}`,
        ar: `${publicBaseUrl}/ar/article/${identifier}`,
        'x-default': `${publicBaseUrl}/en/article/${identifier}`,
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
      ...(article.published_at ? { publishedTime: article.published_at } : {}),
    },
    twitter: {
      card: 'summary',
      site: '@INSIGHTA',
      title,
      description,
      images: [socialImage],
    },
  }
}

export default async function ArticlePage({ params, searchParams }: ArticlePageProps) {
  const { locale, uuid } = await params
  const { source } = await searchParams

  return <ArticleReader locale={locale} identifier={uuid} isPublic={source !== 'my-feeds'} />
}
