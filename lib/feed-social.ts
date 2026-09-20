import { cache } from 'react'
import { getApiUrl, publicBaseUrl } from '@/app/config'
import type { FeedItem } from '@/services/feed.service'

export type FeedContentKind = 'post' | 'article'

/**
 * Social cards render small when the preview image stays under each platform's
 * large-card threshold (Facebook 600px wide, LinkedIn 1200px wide, X `summary`),
 * so every feed thumbnail is generated as a 500x500 square.
 */
export const SOCIAL_THUMBNAIL_SIZE = 500

/** Square brand image used when a post has no usable media of its own. */
export const FALLBACK_THUMBNAIL_PATH = '/images/og-thumbnail.jpg'

const endpointByKind: Record<FeedContentKind, string> = {
  post: '/api/platform/community/feed/posts',
  article: '/api/platform/community/feed/articles',
}

/**
 * Deduplicated between generateMetadata, the page render and the thumbnail
 * route, so a crawler hit costs at most one upstream call.
 */
export const loadFeedContent = cache(
  async (kind: FeedContentKind, identifier: string, locale: string): Promise<FeedItem | null> => {
    try {
      const response = await fetch(
        getApiUrl(`${endpointByKind[kind]}/${encodeURIComponent(identifier)}`),
        {
          headers: {
            Accept: 'application/json',
            'Accept-language': locale,
          },
          next: { revalidate: 300 },
        },
      )

      if (!response.ok) return null

      const payload = await response.json()
      return payload.data ?? null
    } catch {
      return null
    }
  },
)

/** The original, full-resolution media a thumbnail should be generated from. */
export function pickFeedImageSource(item: FeedItem): string | null {
  const image = item.media.find((media) => media.media_type === 'image' && media.url)
  if (image?.url) return image.url

  const thumbnail =
    item.media.find((media) => media.thumbnail_url)?.thumbnail_url ??
    item.media.find((media) => media.media_type === 'thumbnail' && media.url)?.url

  return thumbnail ?? null
}

/**
 * Crawlers must never be pointed at the raw upload: feed images are 2048px PNGs
 * of several MB, which X drops outright (5MB card limit) and which Facebook and
 * LinkedIn frequently time out on. This route re-encodes them to a small JPEG.
 */
export function buildSocialThumbnailUrl(kind: FeedContentKind, identifier: string): string {
  return `${publicBaseUrl}/social-image/${kind}/${encodeURIComponent(identifier)}`
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function buildSocialDescription(item: FeedItem, isArabic: boolean): string {
  const source = stripHtml(item.body ?? item.excerpt ?? '')
  if (source) return source.slice(0, 160)

  const authorName = item.insighter?.name
  if (!authorName) {
    return isArabic ? 'منشور على انسايتا.' : 'A post shared on Insighta.'
  }

  return isArabic
    ? `منشور بواسطة ${authorName} على انسايتا.`
    : `A post shared by ${authorName} on Insighta.`
}

export function buildSocialTitle(item: FeedItem, authorName: string, isArabic: boolean): string {
  const explicitTitle = item.title?.trim()
  if (explicitTitle) return explicitTitle

  const bodyTitle = stripHtml(item.body ?? item.excerpt ?? '').slice(0, 90).trim()
  if (bodyTitle) return bodyTitle

  return isArabic ? `منشور بواسطة ${authorName}` : `A post by ${authorName}`
}
