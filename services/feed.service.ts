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
  tracks_count: number
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
  slug: string | null
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
  is_tracked?: boolean
  is_saved?: boolean
  created_at: string | null
  updated_at: string | null
}

export interface CommunityFeedTrackState {
  uuid: string
  is_tracked: boolean
  tracks_count: number
  applies_from_next_session: boolean
}

export interface CommunityFeedSaveState {
  uuid: string
  is_saved: boolean
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

export interface CommunityFeedMeta {
  snapshot_at: string
  ranking_version: string
  has_more: boolean
  next_cursor: string | null
  is_guest_preview?: boolean
  preview_limit?: number
  authentication_required_for_more?: boolean
  limit?: number
  candidate_count?: number
  feed_session_id?: string
}

export interface CommunityFeedPage {
  data: FeedItem[]
  meta: CommunityFeedMeta
}

export interface InsighterProfileFeedMeta {
  has_more: boolean
  next_cursor: string | null
  limit: number
}

export interface InsighterProfileFeedPage {
  data: FeedItem[]
  meta: InsighterProfileFeedMeta
}

export interface SavedCommunityFeedMeta {
  has_more: boolean
  next_cursor: string | null
  per_page: number
}

export interface SavedCommunityFeedPage {
  data: FeedItem[]
  meta: SavedCommunityFeedMeta
}

export interface CommunityFeedSearchInsight {
  searchable_id: number
  searchable_type: string
  title: string
  description: string | null
  review: number | null
  url: string
  type: string
  published_at: string
  insighter: FeedItemInsighter | null
  paid: boolean
  price: number
  is_read_later: boolean
  total_downloads: number
  cover_start: string | null
  cover_end: string | null
  language: 'english' | 'arabic'
}

export interface CommunityFeedSearchMeta {
  scope: 'all'
  language: 'english' | 'arabic'
  snapshot_at: string
  search_version: string
  insights_limit: number
  feed_limit: number
  has_more: boolean
  next_cursor: string | null
  feed_search_session_id: string | null
}

export interface CommunityFeedSearchPage {
  insights: CommunityFeedSearchInsight[]
  feed: FeedItem[]
  meta: CommunityFeedSearchMeta
}

export interface CommunityFeedSearchParams {
  keyword: string
  cursor?: string | null
  industry?: number | null
  contentType?: 'post' | 'article' | null
  limit?: number
}

export class CommunityFeedApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code: string | null = null,
    public readonly refreshRequired: boolean = false,
  ) {
    super(message)
    this.name = 'CommunityFeedApiError'
  }
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

function publicHeaders(locale: string): Record<string, string> {
  return {
    Accept: 'application/json',
    'Accept-Language': locale,
    'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
  }
}

function authHeaders(locale: string): Record<string, string> {
  const headers = publicHeaders(locale)

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

export async function getCommunityFeedArticle(
  slug: string,
  locale: string,
  signal?: AbortSignal,
): Promise<FeedItem> {
  const response = await fetch(
    getApiUrl(`/api/platform/community/feed/articles/${encodeURIComponent(slug)}`),
    {
      headers: authHeaders(locale),
      cache: 'no-store',
      signal,
    },
  )

  if (!response.ok) {
    await parseErrorMessage(response, 'Unable to load the White Paper.')
  }

  const body = await response.json()
  return body.data
}

export async function getCommunityFeedPost(
  slug: string,
  locale: string,
  signal?: AbortSignal,
): Promise<FeedItem> {
  const response = await fetch(
    getApiUrl(`/api/platform/community/feed/posts/${encodeURIComponent(slug)}`),
    {
      headers: authHeaders(locale),
      cache: 'no-store',
      signal,
    },
  )

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

async function requestCommunityFeed(
  path: string,
  locale: string,
  signal?: AbortSignal,
): Promise<CommunityFeedPage> {
  const response = await fetch(getApiUrl(path), {
    headers: authHeaders(locale),
    cache: 'no-store',
    signal,
  })

  if (!response.ok) {
    let message = 'Unable to load the community feed.'
    let code: string | null = null
    let refreshRequired = false

    try {
      const body = await response.json()
      if (typeof body?.message === 'string' && body.message.trim() !== '') {
        message = body.message
      }
      if (typeof body?.code === 'string') code = body.code
      refreshRequired = body?.refresh_required === true
    } catch {
      // Keep the fallback for non-JSON error responses.
    }

    throw new CommunityFeedApiError(message, response.status, code, refreshRequired)
  }

  const body = await response.json()
  return {
    data: body.data ?? [],
    meta: {
      snapshot_at: body.meta?.snapshot_at ?? '',
      ranking_version: body.meta?.ranking_version ?? '',
      has_more: body.meta?.has_more === true,
      next_cursor: body.meta?.next_cursor ?? null,
      is_guest_preview: body.meta?.is_guest_preview,
      preview_limit: body.meta?.preview_limit,
      authentication_required_for_more: body.meta?.authentication_required_for_more,
      limit: body.meta?.limit,
      candidate_count: body.meta?.candidate_count,
      feed_session_id: body.meta?.feed_session_id,
    },
  }
}

export async function getCommunityFeedPreview(
  locale: string,
  signal?: AbortSignal,
): Promise<CommunityFeedPage> {
  return requestCommunityFeed('/api/platform/community/feed/preview', locale, signal)
}

export async function getCommunityFeed(
  locale: string,
  cursor?: string | null,
  signal?: AbortSignal,
): Promise<CommunityFeedPage> {
  const params = new URLSearchParams({ limit: '10' })
  if (cursor) params.set('cursor', cursor)

  return requestCommunityFeed(
    `/api/platform/community/feed?${params.toString()}`,
    locale,
    signal,
  )
}

export async function getInsighterProfileFeed(
  uuid: string,
  locale: string,
  cursor?: string | null,
  signal?: AbortSignal,
): Promise<InsighterProfileFeedPage> {
  const params = new URLSearchParams({ limit: '10' })
  if (cursor) params.set('cursor', cursor)

  const response = await fetch(
    getApiUrl(
      `/api/platform/insighter/profile/${encodeURIComponent(uuid)}/feed?${params.toString()}`,
    ),
    {
      headers: authHeaders(locale),
      cache: 'no-store',
      signal,
    },
  )

  if (!response.ok) {
    await parseErrorMessage(response, 'Unable to load this insighter’s posts.')
  }

  const body = await response.json()

  return {
    data: body.data ?? [],
    meta: {
      has_more: Boolean(body.meta?.next_cursor),
      next_cursor: body.meta?.next_cursor ?? null,
      limit: body.meta?.per_page ?? 10,
    },
  }
}

export async function getSavedCommunityFeed(
  locale: string,
  cursor?: string | null,
  signal?: AbortSignal,
): Promise<SavedCommunityFeedPage> {
  const params = new URLSearchParams({ limit: '10' })
  if (cursor) params.set('cursor', cursor)

  const response = await fetch(
    getApiUrl(`/api/platform/community/feed/saved?${params.toString()}`),
    {
      headers: authHeaders(locale),
      cache: 'no-store',
      signal,
    },
  )

  if (!response.ok) {
    await parseErrorMessage(response, 'Unable to load your saved posts.')
  }

  const body = await response.json()
  const nextCursor = body.meta?.next_cursor ?? null

  return {
    data: body.data ?? [],
    meta: {
      has_more: Boolean(nextCursor),
      next_cursor: nextCursor,
      per_page: body.meta?.per_page ?? 10,
    },
  }
}

export async function setCommunityFeedItemTracked(
  uuid: string,
  isTracked: boolean,
  locale: string,
): Promise<CommunityFeedTrackState> {
  const response = await fetch(
    getApiUrl(`/api/platform/community/feed/track/${encodeURIComponent(uuid)}`),
    {
      method: isTracked ? 'PUT' : 'DELETE',
      headers: authHeaders(locale),
    },
  )

  if (!response.ok) {
    await parseErrorMessage(
      response,
      isTracked ? 'Unable to track this post.' : 'Unable to untrack this post.',
    )
  }

  const body = await response.json()
  return body.data
}

export async function setCommunityFeedItemSaved(
  uuid: string,
  isSaved: boolean,
  locale: string,
): Promise<CommunityFeedSaveState> {
  const response = await fetch(
    getApiUrl(`/api/platform/community/feed/save/${encodeURIComponent(uuid)}`),
    {
      method: isSaved ? 'PUT' : 'DELETE',
      headers: authHeaders(locale),
    },
  )

  if (!response.ok) {
    await parseErrorMessage(
      response,
      isSaved ? 'Unable to save this post.' : 'Unable to remove this post from saved posts.',
    )
  }

  const body = await response.json()
  return body.data
}

export async function searchCommunityFeed(
  locale: string,
  search: CommunityFeedSearchParams,
  signal?: AbortSignal,
): Promise<CommunityFeedSearchPage> {
  const params = new URLSearchParams({
    keyword: search.keyword.trim(),
    accuracy: 'any',
    limit: String(search.limit ?? 10),
  })

  if (search.cursor) params.set('cursor', search.cursor)
  if (search.industry) params.set('industry', String(search.industry))
  if (search.contentType) params.set('content_type', search.contentType)

  const response = await fetch(
    getApiUrl(`/api/platform/community/feed/search?${params.toString()}`),
    {
      headers: authHeaders(locale),
      cache: 'no-store',
      signal,
    },
  )

  if (!response.ok) {
    let message = 'Unable to search the community feed.'
    let code: string | null = null
    let refreshRequired = false

    try {
      const body = await response.json()
      if (typeof body?.message === 'string' && body.message.trim() !== '') {
        message = body.message
      }
      if (typeof body?.code === 'string') code = body.code
      refreshRequired = body?.refresh_required === true
    } catch {
      // Keep the fallback for non-JSON error responses.
    }

    throw new CommunityFeedApiError(message, response.status, code, refreshRequired)
  }

  const body = await response.json()

  return {
    insights: body.data?.insights ?? [],
    feed: body.data?.feed ?? [],
    meta: {
      scope: 'all',
      language: body.meta?.language === 'arabic' ? 'arabic' : 'english',
      snapshot_at: body.meta?.snapshot_at ?? '',
      search_version: body.meta?.search_version ?? '',
      insights_limit: body.meta?.insights_limit ?? 0,
      feed_limit: body.meta?.feed_limit ?? search.limit ?? 10,
      has_more: body.meta?.has_more === true,
      next_cursor: body.meta?.next_cursor ?? null,
      feed_search_session_id: body.meta?.feed_search_session_id ?? null,
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
        status === 'draft' ? 'Unable to save the White Paper draft.' : 'Unable to publish the White Paper.',
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
        await parseErrorMessage(coverResponse, 'Unable to upload the White Paper cover image.')
      }
    }

    if (uploadCoverBeforePublishing) {
      const publishResponse = await fetch(getApiUrl(`/api/insighter/feed/article/${uuid}`), {
        method: 'PUT',
        headers: { ...authHeaders(locale), 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'published' }),
      })

      if (!publishResponse.ok) {
        await parseErrorMessage(publishResponse, 'Unable to publish the White Paper.')
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
      status === 'draft' ? 'Unable to save the White Paper draft.' : 'Unable to publish the White Paper.',
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

// Create a custom tag under an industry (mirrors the Angular add-knowledge
// step-4 "Add Tag" flow) and return it so the caller can select it right away.
export async function createSuggestTag(
  industryId: number,
  name: string,
  locale: string,
): Promise<FeedTag> {
  const response = await fetch(getApiUrl('/api/insighter/tag/suggest'), {
    method: 'POST',
    headers: { ...authHeaders(locale), 'Content-Type': 'application/json' },
    body: JSON.stringify({ industry_id: industryId, name: { en: name, ar: name } }),
  })

  if (!response.ok) {
    await parseErrorMessage(response, 'Unable to add the tag.')
  }

  const body = await response.json()
  return { id: body.data.tag_id, name }
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

// Locate a single published library item by id. There is no by-id endpoint, so
// we walk the paginated library (newest first) until we find it. Used when the
// user returns from publishing a new knowledge item to auto-attach it. Capped so
// a stale/removed id can't page forever.
export async function fetchLibraryKnowledgeById(
  id: number,
  locale: string,
  maxPages = 5,
): Promise<LibraryKnowledgeItem | null> {
  for (let page = 1; page <= maxPages; page += 1) {
    const result = await fetchPublishedLibraryKnowledge(page, locale)
    const match = result.data.find((item) => item.id === id)
    if (match) return match
    if (page >= result.meta.last_page) break
  }
  return null
}
