import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { NextResponse } from 'next/server'
import { publicBaseUrl } from '@/app/config'
import {
  FALLBACK_THUMBNAIL_PATH,
  SOCIAL_THUMBNAIL_SIZE,
  loadFeedContent,
  pickFeedImageSource,
  type FeedContentKind,
} from '@/lib/feed-social'

// sharp is a native module, so this route can never run on the edge runtime.
export const runtime = 'nodejs'

/** Guard against pulling a huge upload into memory for a 500x500 crop. */
const MAX_SOURCE_BYTES = 25 * 1024 * 1024
/** Crawlers give up quickly; fail over to the brand image instead of stalling. */
const FETCH_TIMEOUT_MS = 8000
const CACHE_CONTROL = 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800'

type RouteContext = {
  params: Promise<{ kind: string; identifier: string }>
}

function isFeedContentKind(value: string): value is FeedContentKind {
  return value === 'post' || value === 'article'
}

async function fallbackResponse(): Promise<NextResponse> {
  try {
    const file = await readFile(path.join(process.cwd(), 'public', FALLBACK_THUMBNAIL_PATH))
    return new NextResponse(new Uint8Array(file), {
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Length': String(file.byteLength),
        'Cache-Control': CACHE_CONTROL,
      },
    })
  } catch {
    // The static asset is served from the same origin, so a redirect only costs
    // the crawler one extra hop.
    return NextResponse.redirect(`${publicBaseUrl}${FALLBACK_THUMBNAIL_PATH}`, 302)
  }
}

async function renderThumbnail(sourceUrl: string): Promise<Buffer | null> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

  try {
    const response = await fetch(sourceUrl, { signal: controller.signal, cache: 'no-store' })
    if (!response.ok) return null

    const declaredLength = Number(response.headers.get('content-length') ?? 0)
    if (declaredLength > MAX_SOURCE_BYTES) return null

    const bytes = Buffer.from(await response.arrayBuffer())
    if (bytes.byteLength > MAX_SOURCE_BYTES) return null

    const sharp = (await import('sharp')).default

    return await sharp(bytes, { failOn: 'none' })
      // Honour EXIF orientation before cropping, or phone photos crop sideways.
      .rotate()
      .resize(SOCIAL_THUMBNAIL_SIZE, SOCIAL_THUMBNAIL_SIZE, {
        fit: 'cover',
        position: 'attention',
      })
      .flatten({ background: '#ffffff' })
      .jpeg({ quality: 82, progressive: true, mozjpeg: true })
      .toBuffer()
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

export async function GET(_request: Request, context: RouteContext) {
  const { kind, identifier } = await context.params

  if (!isFeedContentKind(kind)) {
    return fallbackResponse()
  }

  // The source image is always resolved from our own API by identifier: the
  // route never proxies a caller-supplied URL.
  const item = await loadFeedContent(kind, identifier, 'en')
  const source = item ? pickFeedImageSource(item) : null
  if (!source) {
    return fallbackResponse()
  }

  const thumbnail = await renderThumbnail(source)
  if (!thumbnail) {
    return fallbackResponse()
  }

  return new NextResponse(new Uint8Array(thumbnail), {
    headers: {
      'Content-Type': 'image/jpeg',
      'Content-Length': String(thumbnail.byteLength),
      'Cache-Control': CACHE_CONTROL,
    },
  })
}
