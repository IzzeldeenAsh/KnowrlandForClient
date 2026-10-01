'use client'

import { useState, type CSSProperties } from 'react'
import type { FeedItemMedia } from '@/services/feed.service'

// `sizes` hints matching the feed column: at xl the centre column of the
// 280px / 1fr / 300px grid inside max-w-7xl is ~590px; below xl it spans the
// viewport. Pass the one that matches where the image is laid out.
export const FEED_IMAGE_SIZES = {
  fullWidth: '(min-width: 1280px) 590px, 100vw',
  half: '(min-width: 1280px) 295px, 50vw',
  carousel: '(min-width: 1280px) 450px, (min-width: 640px) 76vw, 84vw',
  lightbox: '(min-width: 1522px) 1400px, 92vw',
} as const

export function buildVariantSrcSet(media: Pick<FeedItemMedia, 'variants'>): string | null {
  const variants = Object.values(media.variants ?? {})
    .filter((variant) => Boolean(variant?.url) && variant.width > 0)
    .sort((first, second) => first.width - second.width)

  if (variants.length === 0) return null

  return variants.map((variant) => `${variant.url} ${variant.width}w`).join(', ')
}

type FeedImageProps = {
  media: FeedItemMedia
  alt: string
  sizes: string
  className?: string
  style?: CSSProperties
  loading?: 'lazy' | 'eager'
}

// Renders the original upload until the backend's WebP variants are ready,
// then lets the browser pick one through srcset. The original stays the
// <img> fallback, and a failed variant request drops back to it.
export default function FeedImage({
  media,
  alt,
  sizes,
  className,
  style,
  loading = 'lazy',
}: FeedImageProps) {
  const srcSet = buildVariantSrcSet(media)
  // Keyed by srcset so fresh variants from a later refresh get another try.
  const [failedSrcSet, setFailedSrcSet] = useState<string | null>(null)
  const useVariants = srcSet !== null && srcSet !== failedSrcSet

  const img = (
    <img
      src={media.url ?? ''}
      alt={alt}
      width={media.width ?? undefined}
      height={media.height ?? undefined}
      loading={loading}
      decoding="async"
      className={className}
      style={style}
      onError={useVariants ? () => setFailedSrcSet(srcSet) : undefined}
    />
  )

  if (!useVariants) return img

  return (
    <picture className="contents">
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      {img}
    </picture>
  )
}
