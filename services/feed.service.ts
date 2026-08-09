'use client'

import { getApiUrl } from '@/app/config'
import { getAuthToken } from '@/lib/authToken'

// ---------- Types ----------

export interface VideoUploadSession {
  provider: string
  provider_upload_id: string
  upload_url: string
  timeout?: number
  status?: string
}

export interface VideoInitResponse {
  uuid: string
  video_upload: VideoUploadSession
}

export interface VideoUploadStatus {
  is_ready: boolean
}

export interface FeedTag {
  id: number
  name: string
}

export interface FeedItemMedia {
  id: number
  provider: string | null
  media_type: 'image' | 'video' | 'attachment' | 'thumbnail'
  path: string | null
  url: string | null
  name: string | null
  mime_type: string | null
  size: number | null
  width: number | null
  height: number | null
  duration_seconds: number | null
  provider_upload_id: string | null
  provider_asset_id: string | null
  provider_processing_status: string | null
  provider_playback_id: string | null
  transcript_status: string | null
  transcript_text: string | null
  thumbnail_path: string | null
  thumbnail_url: string | null
  metadata: Record<string, unknown> | unknown[] | null
  sort_order: number
}

export interface FeedItemIndustry {
  id: number
  name: string
  slug: string
  weight: number
  image: string | null
}

export interface FeedItemRelatedInsight {
  id?: number
  type: 'statistic' | 'report' | 'manual' | 'data' | 'course'
  title: string
  slug: string
  description: string | null
  price?: number | string | null
}

export interface FeedItemStats {
  views_count: number
  opens_count: number
  saves_count: number
  shares_count: number
  watch_seconds_total: number
}

export interface FeedItemInsighter {
  uuid: string
  name: string
  profile_photo_url: string | null
  roles: string[]
  country: { id: number; name: string; flag: string } | null
  company: { uuid: string; legal_name?: string; name?: string } | null
}

export interface FeedItem {
  uuid: string
  content_type: 'post' | 'article'
  content_type_label: string
  media_type: 'image' | 'video' | 'attachment' | 'thumbnail' | null
  media_type_label: string | null
  title: string | null
  body: string | null
  excerpt: string | null
  status: 'init_video' | 'draft' | 'schedule' | 'processing' | 'published' | 'failed' | 'archived'
  status_label: string
  language: 'english' | 'arabic'
  published_at: string | null
  metadata: Record<string, unknown> | unknown[] | null
  insighter: FeedItemInsighter | null
  tags: FeedTag[]
  industry: FeedItemIndustry | null
  related_insights: FeedItemRelatedInsight[]
  media: FeedItemMedia[]
  stats: FeedItemStats
  created_at: string | null
  updated_at: string | null
}

export interface LibraryKnowledgeItem {
  id: number
  type: string
  title: string
  slug: string
  status: string
  published_at: string | null
}

export interface PaginatedMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface LibraryKnowledgePage {
  data: LibraryKnowledgeItem[]
  meta: PaginatedMeta
}

export interface FeedPage {
  data: FeedItem[]
  meta: PaginatedMeta
}

export interface PublishPostPayload {
  body: string
  industryId: number
  tags: number[]
  relatedInsights: number[]
}

export interface ImageMediaEntry {
  file: File
  sortOrder: number
}

export interface ImageTextPostPayload extends PublishPostPayload {
  media?: ImageMediaEntry[]
}

export interface ArticlePayload {
  title: string
  body: string
  industryId: number | null
  tags: number[]
  relatedInsights: number[]
  coverImage?: File | null
  removeCover?: boolean
}

// ---------- Helpers ----------

function authHeaders(locale: string): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Accept-Language': locale,
    'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
  }

  const token = getAuthToken()
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

async function parseErrorMessage(response: Response, fallback: string): Promise<never> {
  let message = fallback
  try {
    const body = await response.json()
    if (typeof body?.message === 'string' && body.message.trim() !== '') {
      message = body.message
    } else if (body?.errors && typeof body.errors === 'object') {
      const first = Object.values(body.errors as Record<string, string[]>).flat()[0]
      if (typeof first === 'string') message = first
    }
  } catch {
    // Non-JSON error body: keep fallback
  }
  throw new Error(message)
}

// ---------- Video post ----------

export async function initVideoPost(locale: string): Promise<VideoInitResponse> {
  const response = await fetch(getApiUrl('/api/insighter/feed/post/video/init'), {
    method: 'POST',
    headers: authHeaders(locale),
  })

  if (!response.ok) {
    await parseErrorMessage(response, 'Unable to initialize the video upload.')
  }

  return response.json()
}

export async function refreshVideoUpload(uuid: string, locale: string): Promise<VideoInitResponse> {
  const response = await fetch(getApiUrl(`/api/insighter/feed/post/video/refresh-upload/${uuid}`), {
    method: 'POST',
    headers: authHeaders(locale),
  })

  if (!response.ok) {
    await parseErrorMessage(response, 'Unable to refresh the video upload.')
  }

  return response.json()
}

export async function checkVideoUploadStatus(uuid: string, locale: string): Promise<boolean> {
  const response = await fetch(
    getApiUrl(`/api/insighter/feed/post/video/check-status/${uuid}`),
    {
      headers: authHeaders(locale),
      cache: 'no-store',
    },
  )

  if (!response.ok) {
    await parseErrorMessage(response, 'Unable to check the video processing status.')
  }

  const body: VideoUploadStatus = await response.json()
  return body.is_ready === true
}

/**
 * Upload the raw video file to the provider (Mux direct upload) via PUT,
 * reporting progress. Returns an abort function alongside the promise.
 */
export function uploadVideoToProvider(
  uploadUrl: string,
  file: File,
  onProgress: (percent: number) => void,
): { promise: Promise<void>; abort: () => void } {
  const xhr = new XMLHttpRequest()

  const promise = new Promise<void>((resolve, reject) => {
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100))
      }
    })
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress(100)
        resolve()
      } else {
        reject(new Error(`Video upload failed (${xhr.status}).`))
      }
    })
    xhr.addEventListener('error', () => reject(new Error('Video upload failed.')))
    xhr.addEventListener('abort', () => reject(new DOMException('Upload cancelled', 'AbortError')))

    xhr.open('PUT', uploadUrl)
    xhr.send(file)
  })

  return { promise, abort: () => xhr.abort() }
}

export async function getFeedItem(uuid: string, locale: string): Promise<FeedItem> {
  const response = await fetch(getApiUrl(`/api/insighter/feed/${uuid}`), {
    headers: authHeaders(locale),
    cache: 'no-store',
  })

  if (!response.ok) {
    await parseErrorMessage(response, 'Unable to load the post.')
  }

  const body = await response.json()
  return body.data
}

export async function getFeedDraft(locale: string, signal?: AbortSignal): Promise<FeedItem | null> {
  const response = await fetch(getApiUrl('/api/insighter/feed/draft'), {
    headers: authHeaders(locale),
    cache: 'no-store',
    signal,
  })

  if (!response.ok) {
    await parseErrorMessage(response, 'Unable to load your saved draft.')
  }

  const body = await response.json()
  return body.data ?? null
}

export async function getMyFeeds(
  page: number,
  locale: string,
  signal?: AbortSignal,
): Promise<FeedPage> {
  const params = new URLSearchParams({
    page: String(page),
    per_page: '10',
  })
  const response = await fetch(getApiUrl(`/api/insighter/feed?${params}`), {
    headers: authHeaders(locale),
    cache: 'no-store',
    signal,
  })

  if (!response.ok) {
    await parseErrorMessage(response, 'Unable to load your posts.')
  }

  const body = await response.json()
  return {
    data: body.data ?? [],
    meta: body.meta ?? {
      current_page: page,
      last_page: page,
      per_page: 10,
      total: body.data?.length ?? 0,
    },
  }
}

export async function deleteFeedItem(uuid: string, locale: string): Promise<void> {
  const response = await fetch(getApiUrl(`/api/insighter/feed/${uuid}`), {
    method: 'DELETE',
    headers: authHeaders(locale),
  })

  if (!response.ok) {
    await parseErrorMessage(response, 'Unable to delete the post.')
  }
}

export async function publishVideoPost(
  uuid: string,
  payload: PublishPostPayload,
  locale: string,
): Promise<void> {
  return saveVideoPost(uuid, payload, 'published', locale)
}

export async function saveVideoPostDraft(
  uuid: string,
  payload: PublishPostPayload,
  locale: string,
): Promise<void> {
  return saveVideoPost(uuid, payload, 'draft', locale)
}

async function saveVideoPost(
  uuid: string,
  payload: PublishPostPayload,
  status: 'draft' | 'published',
  locale: string,
): Promise<void> {
  const response = await fetch(getApiUrl(`/api/insighter/feed/post/video/properties/${uuid}`), {
    method: 'PUT',
    headers: { ...authHeaders(locale), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      body: payload.body,
      status,
      industry_id: payload.industryId,
      tags: payload.tags,
      related_insights: payload.relatedInsights,
    }),
  })

  if (!response.ok) {
    await parseErrorMessage(response, 'Unable to publish the post.')
  }
}

// ---------- Image / text post ----------

export async function publishImageTextPost(
  payload: ImageTextPostPayload,
  locale: string,
  uuid?: string,
): Promise<string> {
  return saveImageTextPost(payload, 'published', locale, uuid)
}

export async function saveImageTextPostDraft(
  payload: ImageTextPostPayload,
  locale: string,
  uuid?: string,
): Promise<string> {
  return saveImageTextPost(payload, 'draft', locale, uuid)
}

async function saveImageTextPost(
  payload: ImageTextPostPayload,
  status: 'draft' | 'published',
  locale: string,
  uuid?: string,
): Promise<string> {
  const jsonPayload = {
    body: payload.body,
    industry_id: payload.industryId,
    status,
    tags: payload.tags,
    related_insights: payload.relatedInsights,
  }

  if (uuid) {
    // Send metadata as JSON first so empty tag/insight arrays are preserved.
    // When images are replaced, keep the item as a draft until that upload
    // succeeds, then apply the requested final status with the media request.
    const metadataResponse = await fetch(
      getApiUrl(`/api/insighter/feed/post/image-text/${uuid}`),
      {
        method: 'PUT',
        headers: { ...authHeaders(locale), 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...jsonPayload,
          status: payload.media?.length ? 'draft' : status,
        }),
      },
    )

    if (!metadataResponse.ok) {
      await parseErrorMessage(metadataResponse, 'Unable to update the post.')
    }

    if (!payload.media?.length) return uuid
  }

  const formData = new FormData()
  formData.append('body', payload.body)
  formData.append('industry_id', String(payload.industryId))
  formData.append('status', status)
  if (!uuid) {
    payload.tags.forEach((tagId, index) => formData.append(`tags[${index}]`, String(tagId)))
    payload.relatedInsights.forEach((knowledgeId, index) =>
      formData.append(`related_insights[${index}]`, String(knowledgeId)),
    )
  }
  payload.media?.forEach((entry, index) => {
    formData.append(`media[${index}][image]`, entry.file)
    formData.append(`media[${index}][sort_order]`, String(entry.sortOrder))
  })
  if (uuid) formData.append('_method', 'PUT')

  const response = await fetch(
    getApiUrl(uuid ? `/api/insighter/feed/post/image-text/${uuid}` : '/api/insighter/feed/post/image-text'),
    {
      method: 'POST',
      headers: authHeaders(locale),
      body: formData,
    },
  )

  if (!response.ok) {
    await parseErrorMessage(response, 'Unable to publish the post.')
  }

  if (uuid) return uuid

  const body = await response.json()
  return body.data?.uuid
}

// ---------- Article ----------

export async function publishArticle(
  payload: ArticlePayload,
  locale: string,
  uuid?: string,
): Promise<string> {
  return saveArticle(payload, 'published', locale, uuid)
}

export async function saveArticleDraft(
  payload: ArticlePayload,
  locale: string,
  uuid?: string,
): Promise<string> {
  return saveArticle(payload, 'draft', locale, uuid)
}

async function saveArticle(
  payload: ArticlePayload,
  status: 'draft' | 'published',
  locale: string,
  uuid?: string,
): Promise<string> {
  const jsonPayload = {
    title: payload.title,
    body: payload.body,
    industry_id: payload.industryId,
    status,
    tags: payload.tags,
    related_insights: payload.relatedInsights,
    remove_cover: payload.removeCover === true,
  }

  if (uuid) {
    const uploadCoverBeforePublishing = status === 'published' && !!payload.coverImage
    const response = await fetch(getApiUrl(`/api/insighter/feed/article/${uuid}`), {
      method: 'PUT',
      headers: { ...authHeaders(locale), 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...jsonPayload,
        status: uploadCoverBeforePublishing ? 'draft' : status,
      }),
    })

    if (!response.ok) {
      await parseErrorMessage(
        response,
        status === 'draft' ? 'Unable to save the article draft.' : 'Unable to publish the article.',
      )
    }

    if (payload.coverImage) {
      const coverFormData = new FormData()
      coverFormData.append('_method', 'PUT')
      coverFormData.append('cover_image', payload.coverImage)

      const coverResponse = await fetch(getApiUrl(`/api/insighter/feed/article/${uuid}`), {
        method: 'POST',
        headers: authHeaders(locale),
        body: coverFormData,
      })

      if (!coverResponse.ok) {
        await parseErrorMessage(coverResponse, 'Unable to upload the article cover image.')
      }
    }

    if (uploadCoverBeforePublishing) {
      const publishResponse = await fetch(getApiUrl(`/api/insighter/feed/article/${uuid}`), {
        method: 'PUT',
        headers: { ...authHeaders(locale), 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'published' }),
      })

      if (!publishResponse.ok) {
        await parseErrorMessage(publishResponse, 'Unable to publish the article.')
      }
    }

    return uuid
  }

  const formData = new FormData()
  formData.append('title', payload.title)
  formData.append('body', payload.body)
  formData.append('status', status)
  if (payload.industryId !== null) {
    formData.append('industry_id', String(payload.industryId))
  }
  payload.tags.forEach((tagId, index) => formData.append(`tags[${index}]`, String(tagId)))
  payload.relatedInsights.forEach((knowledgeId, index) =>
    formData.append(`related_insights[${index}]`, String(knowledgeId)),
  )
  if (payload.coverImage) {
    formData.append('cover_image', payload.coverImage)
  }

  const response = await fetch(getApiUrl('/api/insighter/feed/article'), {
    method: 'POST',
    headers: authHeaders(locale),
    body: formData,
  })

  if (!response.ok) {
    await parseErrorMessage(
      response,
      status === 'draft' ? 'Unable to save the article draft.' : 'Unable to publish the article.',
    )
  }

  const body = await response.json()
  return body.data?.uuid
}

// ---------- Metadata ----------

export async function fetchIndustryTags(industryId: number, locale: string): Promise<FeedTag[]> {
  const response = await fetch(getApiUrl(`/api/common/setting/tag/industry/${industryId}`), {
    headers: authHeaders(locale),
  })

  if (!response.ok) return []

  const body = await response.json()
  return (body.data ?? []).map((tag: FeedTag) => ({ id: tag.id, name: tag.name }))
}

export async function fetchPublishedLibraryKnowledge(
  page: number,
  locale: string,
): Promise<LibraryKnowledgePage> {
  const params = new URLSearchParams({ page: String(page), status: 'published' })
  const response = await fetch(getApiUrl(`/api/insighter/library/knowledge?${params}`), {
    headers: authHeaders(locale),
  })

  if (!response.ok) {
    await parseErrorMessage(response, 'Unable to load your library.')
  }

  const body = await response.json()
  return {
    data: (body.data ?? []).map((item: LibraryKnowledgeItem) => ({
      id: item.id,
      type: item.type,
      title: item.title,
      slug: item.slug,
      status: item.status,
      published_at: item.published_at,
    })),
    meta: body.meta ?? { current_page: page, last_page: page, per_page: 10, total: 0 },
  }
}
