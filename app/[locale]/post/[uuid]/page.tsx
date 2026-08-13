import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { publicBaseUrl } from '@/app/config'
import { FeedCard } from '@/components/feed/MyFeedsTimeline'
import { getCommunityFeedPost, type FeedItem } from '@/services/feed.service'

type PostPageProps = {
  params: Promise<{ locale: string; uuid: string }>
}

// Deduplicate the fetch between generateMetadata and the page render.
const loadPost = cache(async (uuid: string, locale: string): Promise<FeedItem | null> => {
  try {
    return await getCommunityFeedPost(uuid, locale)
  } catch {
    return null
  }
})

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function buildDescription(post: FeedItem): string {
  const source = stripHtml(post.body ?? post.excerpt ?? '')
  if (source) return source.slice(0, 200)
  return post.insighter
    ? `A post shared by ${post.insighter.name} on Insighta.`
    : 'A post shared on Insighta.'
}

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
  const title =
    post.title?.trim() ||
    (isArabic ? `منشور بواسطة ${authorName}` : `A post by ${authorName}`)
  const description = buildDescription(post)
  const url = `${publicBaseUrl}/${locale}/post/${post.uuid}`

  const firstImage = post.media.find((media) => media.media_type === 'image' && media.url)?.url
  const ogImage = firstImage ?? `${publicBaseUrl}/images/og-image.jpg`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      locale: isArabic ? 'ar_SA' : 'en_US',
      url,
      siteName: 'Insighta',
      title,
      description,
      images: [{ url: ogImage, alt: title }],
      ...(post.published_at ? { publishedTime: post.published_at } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
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
    <main className="min-h-screen bg-[#F5F8FC] py-6 sm:py-10" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="mx-auto w-full max-w-2xl px-4">
        <div className="mb-4">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#2378E8] transition-colors hover:text-[#1B64C5]"
          >
            {isArabic ? '→ العودة إلى الموجز' : '← Back to feed'}
          </Link>
        </div>

        <FeedCard item={post} locale={locale} articleAccess="community" />
      </div>
    </main>
  )
}
