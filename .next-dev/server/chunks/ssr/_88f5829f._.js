module.exports = [
"[project]/services/feed.service.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommunityFeedApiError",
    ()=>CommunityFeedApiError,
    "checkVideoUploadStatus",
    ()=>checkVideoUploadStatus,
    "createSuggestTag",
    ()=>createSuggestTag,
    "deleteFeedItem",
    ()=>deleteFeedItem,
    "fetchIndustryTags",
    ()=>fetchIndustryTags,
    "fetchLibraryKnowledgeById",
    ()=>fetchLibraryKnowledgeById,
    "fetchPublishedLibraryKnowledge",
    ()=>fetchPublishedLibraryKnowledge,
    "getCommunityFeed",
    ()=>getCommunityFeed,
    "getCommunityFeedArticle",
    ()=>getCommunityFeedArticle,
    "getCommunityFeedPost",
    ()=>getCommunityFeedPost,
    "getCommunityFeedPreview",
    ()=>getCommunityFeedPreview,
    "getFeedDraft",
    ()=>getFeedDraft,
    "getFeedItem",
    ()=>getFeedItem,
    "getMyFeeds",
    ()=>getMyFeeds,
    "initVideoPost",
    ()=>initVideoPost,
    "publishArticle",
    ()=>publishArticle,
    "publishImageTextPost",
    ()=>publishImageTextPost,
    "publishVideoPost",
    ()=>publishVideoPost,
    "refreshVideoUpload",
    ()=>refreshVideoUpload,
    "saveArticleDraft",
    ()=>saveArticleDraft,
    "saveImageTextPostDraft",
    ()=>saveImageTextPostDraft,
    "saveVideoPostDraft",
    ()=>saveVideoPostDraft,
    "searchCommunityFeed",
    ()=>searchCommunityFeed,
    "uploadVideoToProvider",
    ()=>uploadVideoToProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-ssr] (ecmascript)");
'use client';
;
;
class CommunityFeedApiError extends Error {
    status;
    code;
    refreshRequired;
    constructor(message, status, code = null, refreshRequired = false){
        super(message), this.status = status, this.code = code, this.refreshRequired = refreshRequired;
        this.name = 'CommunityFeedApiError';
    }
}
// ---------- Helpers ----------
function publicHeaders(locale) {
    return {
        Accept: 'application/json',
        'Accept-Language': locale,
        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
    };
}
function authHeaders(locale) {
    const headers = publicHeaders(locale);
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    return headers;
}
async function parseErrorMessage(response, fallback) {
    let message = fallback;
    try {
        const body = await response.json();
        if (typeof body?.message === 'string' && body.message.trim() !== '') {
            message = body.message;
        } else if (body?.errors && typeof body.errors === 'object') {
            const first = Object.values(body.errors).flat()[0];
            if (typeof first === 'string') message = first;
        }
    } catch  {
    // Non-JSON error body: keep fallback
    }
    throw new Error(message);
}
async function initVideoPost(locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/insighter/feed/post/video/init'), {
        method: 'POST',
        headers: authHeaders(locale)
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to initialize the video upload.');
    }
    return response.json();
}
async function refreshVideoUpload(uuid, locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/insighter/feed/post/video/refresh-upload/${uuid}`), {
        method: 'POST',
        headers: authHeaders(locale)
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to refresh the video upload.');
    }
    return response.json();
}
async function checkVideoUploadStatus(uuid, locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/insighter/feed/post/video/check-status/${uuid}`), {
        headers: authHeaders(locale),
        cache: 'no-store'
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to check the video processing status.');
    }
    const body = await response.json();
    return body.is_ready === true;
}
function uploadVideoToProvider(uploadUrl, file, onProgress) {
    const xhr = new XMLHttpRequest();
    const promise = new Promise((resolve, reject)=>{
        xhr.upload.addEventListener('progress', (event)=>{
            if (event.lengthComputable) {
                onProgress(Math.round(event.loaded / event.total * 100));
            }
        });
        xhr.addEventListener('load', ()=>{
            if (xhr.status >= 200 && xhr.status < 300) {
                onProgress(100);
                resolve();
            } else {
                reject(new Error(`Video upload failed (${xhr.status}).`));
            }
        });
        xhr.addEventListener('error', ()=>reject(new Error('Video upload failed.')));
        xhr.addEventListener('abort', ()=>reject(new DOMException('Upload cancelled', 'AbortError')));
        xhr.open('PUT', uploadUrl);
        xhr.send(file);
    });
    return {
        promise,
        abort: ()=>xhr.abort()
    };
}
async function getFeedItem(uuid, locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/insighter/feed/${uuid}`), {
        headers: authHeaders(locale),
        cache: 'no-store'
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to load the post.');
    }
    const body = await response.json();
    return body.data;
}
async function getCommunityFeedArticle(slug, locale, signal) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/platform/community/feed/articles/${encodeURIComponent(slug)}`), {
        headers: publicHeaders(locale),
        cache: 'no-store',
        signal
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to load the article.');
    }
    const body = await response.json();
    return body.data;
}
async function getCommunityFeedPost(uuid, locale, signal) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/platform/community/feed/posts/${encodeURIComponent(uuid)}`), {
        headers: publicHeaders(locale),
        cache: 'no-store',
        signal
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to load the post.');
    }
    const body = await response.json();
    return body.data;
}
async function getFeedDraft(locale, signal) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/insighter/feed/draft'), {
        headers: authHeaders(locale),
        cache: 'no-store',
        signal
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to load your saved draft.');
    }
    const body = await response.json();
    return body.data ?? null;
}
async function getMyFeeds(page, locale, signal) {
    const params = new URLSearchParams({
        page: String(page),
        per_page: '10'
    });
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/insighter/feed?${params}`), {
        headers: authHeaders(locale),
        cache: 'no-store',
        signal
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to load your posts.');
    }
    const body = await response.json();
    return {
        data: body.data ?? [],
        meta: body.meta ?? {
            current_page: page,
            last_page: page,
            per_page: 10,
            total: body.data?.length ?? 0
        }
    };
}
async function requestCommunityFeed(path, locale, signal) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(path), {
        headers: authHeaders(locale),
        cache: 'no-store',
        signal
    });
    if (!response.ok) {
        let message = 'Unable to load the community feed.';
        let code = null;
        let refreshRequired = false;
        try {
            const body = await response.json();
            if (typeof body?.message === 'string' && body.message.trim() !== '') {
                message = body.message;
            }
            if (typeof body?.code === 'string') code = body.code;
            refreshRequired = body?.refresh_required === true;
        } catch  {
        // Keep the fallback for non-JSON error responses.
        }
        throw new CommunityFeedApiError(message, response.status, code, refreshRequired);
    }
    const body = await response.json();
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
            feed_session_id: body.meta?.feed_session_id
        }
    };
}
async function getCommunityFeedPreview(locale, signal) {
    return requestCommunityFeed('/api/platform/community/feed/preview', locale, signal);
}
async function getCommunityFeed(locale, cursor, signal) {
    const params = new URLSearchParams({
        limit: '10'
    });
    if (cursor) params.set('cursor', cursor);
    return requestCommunityFeed(`/api/platform/community/feed?${params.toString()}`, locale, signal);
}
async function searchCommunityFeed(locale, search, signal) {
    const params = new URLSearchParams({
        keyword: search.keyword.trim(),
        accuracy: 'any',
        limit: String(search.limit ?? 10)
    });
    if (search.cursor) params.set('cursor', search.cursor);
    if (search.industry) params.set('industry', String(search.industry));
    if (search.contentType) params.set('content_type', search.contentType);
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/platform/community/feed/search?${params.toString()}`), {
        headers: authHeaders(locale),
        cache: 'no-store',
        signal
    });
    if (!response.ok) {
        let message = 'Unable to search the community feed.';
        let code = null;
        let refreshRequired = false;
        try {
            const body = await response.json();
            if (typeof body?.message === 'string' && body.message.trim() !== '') {
                message = body.message;
            }
            if (typeof body?.code === 'string') code = body.code;
            refreshRequired = body?.refresh_required === true;
        } catch  {
        // Keep the fallback for non-JSON error responses.
        }
        throw new CommunityFeedApiError(message, response.status, code, refreshRequired);
    }
    const body = await response.json();
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
            feed_search_session_id: body.meta?.feed_search_session_id ?? null
        }
    };
}
async function deleteFeedItem(uuid, locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/insighter/feed/${uuid}`), {
        method: 'DELETE',
        headers: authHeaders(locale)
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to delete the post.');
    }
}
async function publishVideoPost(uuid, payload, locale) {
    return saveVideoPost(uuid, payload, 'published', locale);
}
async function saveVideoPostDraft(uuid, payload, locale) {
    return saveVideoPost(uuid, payload, 'draft', locale);
}
async function saveVideoPost(uuid, payload, status, locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/insighter/feed/post/video/properties/${uuid}`), {
        method: 'PUT',
        headers: {
            ...authHeaders(locale),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            body: payload.body,
            status,
            industry_id: payload.industryId,
            tags: payload.tags,
            related_insights: payload.relatedInsights
        })
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to publish the post.');
    }
}
async function publishImageTextPost(payload, locale, uuid) {
    return saveImageTextPost(payload, 'published', locale, uuid);
}
async function saveImageTextPostDraft(payload, locale, uuid) {
    return saveImageTextPost(payload, 'draft', locale, uuid);
}
async function saveImageTextPost(payload, status, locale, uuid) {
    const jsonPayload = {
        body: payload.body,
        industry_id: payload.industryId,
        status,
        tags: payload.tags,
        related_insights: payload.relatedInsights
    };
    if (uuid) {
        // Send metadata as JSON first so empty tag/insight arrays are preserved.
        // When images are replaced, keep the item as a draft until that upload
        // succeeds, then apply the requested final status with the media request.
        const metadataResponse = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/insighter/feed/post/image-text/${uuid}`), {
            method: 'PUT',
            headers: {
                ...authHeaders(locale),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...jsonPayload,
                status: payload.media?.length ? 'draft' : status
            })
        });
        if (!metadataResponse.ok) {
            await parseErrorMessage(metadataResponse, 'Unable to update the post.');
        }
        if (!payload.media?.length) return uuid;
    }
    const formData = new FormData();
    formData.append('body', payload.body);
    formData.append('industry_id', String(payload.industryId));
    formData.append('status', status);
    if (!uuid) {
        payload.tags.forEach((tagId, index)=>formData.append(`tags[${index}]`, String(tagId)));
        payload.relatedInsights.forEach((knowledgeId, index)=>formData.append(`related_insights[${index}]`, String(knowledgeId)));
    }
    payload.media?.forEach((entry, index)=>{
        formData.append(`media[${index}][image]`, entry.file);
        formData.append(`media[${index}][sort_order]`, String(entry.sortOrder));
    });
    if (uuid) formData.append('_method', 'PUT');
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(uuid ? `/api/insighter/feed/post/image-text/${uuid}` : '/api/insighter/feed/post/image-text'), {
        method: 'POST',
        headers: authHeaders(locale),
        body: formData
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to publish the post.');
    }
    if (uuid) return uuid;
    const body = await response.json();
    return body.data?.uuid;
}
async function publishArticle(payload, locale, uuid) {
    return saveArticle(payload, 'published', locale, uuid);
}
async function saveArticleDraft(payload, locale, uuid) {
    return saveArticle(payload, 'draft', locale, uuid);
}
async function saveArticle(payload, status, locale, uuid) {
    const jsonPayload = {
        title: payload.title,
        body: payload.body,
        industry_id: payload.industryId,
        status,
        tags: payload.tags,
        related_insights: payload.relatedInsights,
        remove_cover: payload.removeCover === true
    };
    if (uuid) {
        const uploadCoverBeforePublishing = status === 'published' && !!payload.coverImage;
        const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/insighter/feed/article/${uuid}`), {
            method: 'PUT',
            headers: {
                ...authHeaders(locale),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...jsonPayload,
                status: uploadCoverBeforePublishing ? 'draft' : status
            })
        });
        if (!response.ok) {
            await parseErrorMessage(response, status === 'draft' ? 'Unable to save the article draft.' : 'Unable to publish the article.');
        }
        if (payload.coverImage) {
            const coverFormData = new FormData();
            coverFormData.append('_method', 'PUT');
            coverFormData.append('cover_image', payload.coverImage);
            const coverResponse = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/insighter/feed/article/${uuid}`), {
                method: 'POST',
                headers: authHeaders(locale),
                body: coverFormData
            });
            if (!coverResponse.ok) {
                await parseErrorMessage(coverResponse, 'Unable to upload the article cover image.');
            }
        }
        if (uploadCoverBeforePublishing) {
            const publishResponse = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/insighter/feed/article/${uuid}`), {
                method: 'PUT',
                headers: {
                    ...authHeaders(locale),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: 'published'
                })
            });
            if (!publishResponse.ok) {
                await parseErrorMessage(publishResponse, 'Unable to publish the article.');
            }
        }
        return uuid;
    }
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('body', payload.body);
    formData.append('status', status);
    if (payload.industryId !== null) {
        formData.append('industry_id', String(payload.industryId));
    }
    payload.tags.forEach((tagId, index)=>formData.append(`tags[${index}]`, String(tagId)));
    payload.relatedInsights.forEach((knowledgeId, index)=>formData.append(`related_insights[${index}]`, String(knowledgeId)));
    if (payload.coverImage) {
        formData.append('cover_image', payload.coverImage);
    }
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/insighter/feed/article'), {
        method: 'POST',
        headers: authHeaders(locale),
        body: formData
    });
    if (!response.ok) {
        await parseErrorMessage(response, status === 'draft' ? 'Unable to save the article draft.' : 'Unable to publish the article.');
    }
    const body = await response.json();
    return body.data?.uuid;
}
async function fetchIndustryTags(industryId, locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/common/setting/tag/industry/${industryId}`), {
        headers: authHeaders(locale)
    });
    if (!response.ok) return [];
    const body = await response.json();
    return (body.data ?? []).map((tag)=>({
            id: tag.id,
            name: tag.name
        }));
}
async function createSuggestTag(industryId, name, locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/insighter/tag/suggest'), {
        method: 'POST',
        headers: {
            ...authHeaders(locale),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            industry_id: industryId,
            name: {
                en: name,
                ar: name
            }
        })
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to add the tag.');
    }
    const body = await response.json();
    return {
        id: body.data.tag_id,
        name
    };
}
async function fetchPublishedLibraryKnowledge(page, locale) {
    const params = new URLSearchParams({
        page: String(page),
        status: 'published'
    });
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/insighter/library/knowledge?${params}`), {
        headers: authHeaders(locale)
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to load your library.');
    }
    const body = await response.json();
    return {
        data: (body.data ?? []).map((item)=>({
                id: item.id,
                type: item.type,
                title: item.title,
                slug: item.slug,
                status: item.status,
                published_at: item.published_at
            })),
        meta: body.meta ?? {
            current_page: page,
            last_page: page,
            per_page: 10,
            total: 0
        }
    };
}
async function fetchLibraryKnowledgeById(id, locale, maxPages = 5) {
    for(let page = 1; page <= maxPages; page += 1){
        const result = await fetchPublishedLibraryKnowledge(page, locale);
        const match = result.data.find((item)=>item.id === id);
        if (match) return match;
        if (page >= result.meta.last_page) break;
    }
    return null;
}
}),
"[project]/components/feed/article/ArticleReader.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "articleAside": "ArticleReader-module__lP8bda__articleAside",
  "articleBody": "ArticleReader-module__lP8bda__articleBody",
  "articleLayout": "ArticleReader-module__lP8bda__articleLayout",
  "articleMain": "ArticleReader-module__lP8bda__articleMain",
  "authorAvatar": "ArticleReader-module__lP8bda__authorAvatar",
  "authorBlock": "ArticleReader-module__lP8bda__authorBlock",
  "authorRow": "ArticleReader-module__lP8bda__authorRow",
  "backLink": "ArticleReader-module__lP8bda__backLink",
  "contentShell": "ArticleReader-module__lP8bda__contentShell",
  "hero": "ArticleReader-module__lP8bda__hero",
  "heroActions": "ArticleReader-module__lP8bda__heroActions",
  "heroAuthor": "ArticleReader-module__lP8bda__heroAuthor",
  "heroAuthorText": "ArticleReader-module__lP8bda__heroAuthorText",
  "heroContent": "ArticleReader-module__lP8bda__heroContent",
  "heroIndustry": "ArticleReader-module__lP8bda__heroIndustry",
  "heroInner": "ArticleReader-module__lP8bda__heroInner",
  "heroMetaItem": "ArticleReader-module__lP8bda__heroMetaItem",
  "heroMetaLabel": "ArticleReader-module__lP8bda__heroMetaLabel",
  "heroMetaRow": "ArticleReader-module__lP8bda__heroMetaRow",
  "heroReveal": "ArticleReader-module__lP8bda__heroReveal",
  "heroShade": "ArticleReader-module__lP8bda__heroShade",
  "heroTitleRow": "ArticleReader-module__lP8bda__heroTitleRow",
  "heroWithImage": "ArticleReader-module__lP8bda__heroWithImage",
  "heroWithoutImage": "ArticleReader-module__lP8bda__heroWithoutImage",
  "industryLink": "ArticleReader-module__lP8bda__industryLink",
  "metaBlock": "ArticleReader-module__lP8bda__metaBlock",
  "metaDate": "ArticleReader-module__lP8bda__metaDate",
  "metaLabel": "ArticleReader-module__lP8bda__metaLabel",
  "metaValue": "ArticleReader-module__lP8bda__metaValue",
  "page": "ArticleReader-module__lP8bda__page",
  "pulse": "ArticleReader-module__lP8bda__pulse",
  "relatedCard": "ArticleReader-module__lP8bda__relatedCard",
  "relatedDetails": "ArticleReader-module__lP8bda__relatedDetails",
  "relatedFooter": "ArticleReader-module__lP8bda__relatedFooter",
  "relatedHeading": "ArticleReader-module__lP8bda__relatedHeading",
  "relatedSection": "ArticleReader-module__lP8bda__relatedSection",
  "relatedType": "ArticleReader-module__lP8bda__relatedType",
  "relatedVisual": "ArticleReader-module__lP8bda__relatedVisual",
  "relatedVisualContent": "ArticleReader-module__lP8bda__relatedVisualContent",
  "shareButton": "ArticleReader-module__lP8bda__shareButton",
  "shareStatus": "ArticleReader-module__lP8bda__shareStatus",
  "skeleton": "ArticleReader-module__lP8bda__skeleton",
  "skeletonContent": "ArticleReader-module__lP8bda__skeletonContent",
  "skeletonHero": "ArticleReader-module__lP8bda__skeletonHero",
  "skeletonInner": "ArticleReader-module__lP8bda__skeletonInner",
  "skeletonLines": "ArticleReader-module__lP8bda__skeletonLines",
  "skeletonSide": "ArticleReader-module__lP8bda__skeletonSide",
  "skeletonTitle": "ArticleReader-module__lP8bda__skeletonTitle",
  "skeletonTitleShort": "ArticleReader-module__lP8bda__skeletonTitleShort",
  "spin": "ArticleReader-module__lP8bda__spin",
  "spinner": "ArticleReader-module__lP8bda__spinner",
  "tags": "ArticleReader-module__lP8bda__tags",
  "viewLink": "ArticleReader-module__lP8bda__viewLink",
});
}),
"[project]/components/feed/article/ArticleReader.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ArticleReader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowLeft$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconArrowLeft.mjs [app-ssr] (ecmascript) <export default as IconArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowRight$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconArrowRight.mjs [app-ssr] (ecmascript) <export default as IconArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArticle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArticle$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconArticle.mjs [app-ssr] (ecmascript) <export default as IconArticle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuildingSkyscraper$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuildingSkyscraper$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBuildingSkyscraper.mjs [app-ssr] (ecmascript) <export default as IconBuildingSkyscraper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCheck.mjs [app-ssr] (ecmascript) <export default as IconCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconClock$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconClock$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconClock.mjs [app-ssr] (ecmascript) <export default as IconClock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileDescription$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileDescription$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconFileDescription.mjs [app-ssr] (ecmascript) <export default as IconFileDescription>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconLoader2.mjs [app-ssr] (ecmascript) <export default as IconLoader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconShare3$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconShare3$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconShare3.mjs [app-ssr] (ecmascript) <export default as IconShare3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Badge$2f$Badge$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Badge/Badge.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$ar$2d$SA$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/locale/ar-SA.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$en$2d$US$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/locale/en-US.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/feed.service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/feed/article/ArticleReader.module.css [app-ssr] (css module)");
'use client';
;
;
;
;
;
;
;
;
;
const copyByLocale = {
    en: {
        article: 'Article',
        back: 'Back to Feed',
        loading: 'Loading article…',
        loadFailed: 'We couldn’t load this article.',
        notArticle: 'This content is not an article.',
        tryAgain: 'Try again',
        minuteRead: 'min read',
        published: 'Published',
        viewInsight: 'View',
        openingInsight: 'Opening…',
        coverAlt: 'Article cover',
        feed: 'Feed',
        by: 'Written by',
        relatedInsight: 'Related insight',
        share: 'Share article',
        shareCopied: 'Link copied'
    },
    ar: {
        article: 'مقال',
        back: 'العودة إلى الموجز',
        loading: 'جارٍ تحميل المقال…',
        loadFailed: 'تعذر تحميل هذا المقال.',
        notArticle: 'هذا المحتوى ليس مقالاً.',
        tryAgain: 'حاول مرة أخرى',
        minuteRead: 'دقيقة قراءة',
        published: 'نُشر',
        viewInsight: 'عرض',
        openingInsight: 'جارٍ الفتح…',
        coverAlt: 'غلاف المقال',
        feed: 'الموجز',
        by: 'بقلم',
        relatedInsight: 'معرفة ذات صلة',
        share: 'مشاركة المقال',
        shareCopied: 'تم نسخ الرابط'
    }
};
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
    'a'
]);
function plainText(html) {
    if (typeof document === 'undefined') return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const container = document.createElement('div');
    container.innerHTML = html;
    return (container.textContent ?? '').replace(/\s+/g, ' ').trim();
}
function getInsightPrice(price, freeLabel) {
    const normalizedPrice = String(price ?? '').trim();
    if (!normalizedPrice) return null;
    const numericPrice = Number(normalizedPrice);
    if (!Number.isNaN(numericPrice)) {
        return {
            label: numericPrice === 0 ? freeLabel : `$${numericPrice.toLocaleString('en-US', {
                maximumFractionDigits: 2
            })}`,
            isFree: numericPrice === 0
        };
    }
    return {
        label: normalizedPrice,
        isFree: false
    };
}
function sanitizeRichText(html) {
    if (typeof document === 'undefined') return '';
    const parsed = new DOMParser().parseFromString(html, 'text/html');
    parsed.body.querySelectorAll('script, style, iframe, object, embed, form, input, button').forEach((node)=>node.remove());
    Array.from(parsed.body.querySelectorAll('*')).forEach((element)=>{
        const tagName = element.tagName.toLowerCase();
        if (!allowedTags.has(tagName)) {
            element.replaceWith(...Array.from(element.childNodes));
            return;
        }
        const href = tagName === 'a' ? element.getAttribute('href') ?? '' : '';
        Array.from(element.attributes).forEach((attribute)=>element.removeAttribute(attribute.name));
        if (tagName === 'a') {
            if (/^(https?:|mailto:)/i.test(href)) {
                element.setAttribute('href', href);
                element.setAttribute('target', '_blank');
                element.setAttribute('rel', 'noopener noreferrer');
            }
        }
    });
    return parsed.body.innerHTML;
}
function formatArticleDate(value, locale) {
    if (!value) return null;
    const date = new Date(value.includes('T') ? value : value.replace(' ', 'T'));
    if (Number.isNaN(date.getTime())) return value;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(date, 'PPP', {
        locale: locale === 'ar' ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$ar$2d$SA$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["arSA"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$en$2d$US$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enUS"]
    });
}
function ArticleSkeleton({ label }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "aria-label": label,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].skeleton,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].skeletonHero,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].skeletonInner,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].skeletonTitle
                        }, void 0, false, {
                            fileName: "[project]/components/feed/article/ArticleReader.tsx",
                            lineNumber: 157,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].skeletonTitleShort
                        }, void 0, false, {
                            fileName: "[project]/components/feed/article/ArticleReader.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/feed/article/ArticleReader.tsx",
                    lineNumber: 156,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].skeletonContent,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].skeletonSide
                    }, void 0, false, {
                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].skeletonLines,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                lineNumber: 164,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                lineNumber: 166,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                lineNumber: 167,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/article/ArticleReader.tsx",
        lineNumber: 154,
        columnNumber: 5
    }, this);
}
function ArticleReader({ locale, identifier, isPublic }) {
    const isArabic = locale === 'ar';
    const copy = copyByLocale[isArabic ? 'ar' : 'en'];
    const BackIcon = isArabic ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowRight$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowRight$3e$__["IconArrowRight"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowLeft$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowLeft$3e$__["IconArrowLeft"];
    const [item, setItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [reloadKey, setReloadKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [openingInsight, setOpeningInsight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [shareCopied, setShareCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let active = true;
        setIsLoading(true);
        setError(null);
        const loadArticle = isPublic ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCommunityFeedArticle"])(identifier, locale) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFeedItem"])(identifier, locale);
        loadArticle.then((result)=>{
            if (!active) return;
            if (result.content_type !== 'article') {
                setError(copy.notArticle);
                return;
            }
            setItem(result);
        }).catch((loadError)=>{
            if (active) setError(loadError instanceof Error ? loadError.message : copy.loadFailed);
        }).finally(()=>{
            if (active) setIsLoading(false);
        });
        return ()=>{
            active = false;
        };
    }, [
        copy.loadFailed,
        copy.notArticle,
        identifier,
        isPublic,
        locale,
        reloadKey
    ]);
    const sanitizedBody = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>sanitizeRichText(item?.body ?? ''), [
        item?.body
    ]);
    const readingMinutes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const words = plainText(item?.body ?? '').split(/\s+/).filter(Boolean).length;
        return Math.max(1, Math.ceil(words / 220));
    }, [
        item?.body
    ]);
    if (isLoading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ArticleSkeleton, {
        label: copy.loading
    }, void 0, false, {
        fileName: "[project]/components/feed/article/ArticleReader.tsx",
        lineNumber: 221,
        columnNumber: 25
    }, this);
    if (error || !item) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "flex min-h-[calc(100vh-var(--app-header-height,88px))] items-center justify-center bg-[#F2F5F8] px-4 py-16",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-lg rounded-2xl border border-[#D9E2EC] bg-white p-8 text-center shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArticle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArticle$3e$__["IconArticle"], {
                        "aria-hidden": true,
                        className: "mx-auto h-11 w-11 text-[#8293A9]",
                        stroke: 1.4
                    }, void 0, false, {
                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                        lineNumber: 227,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "mt-5 text-2xl font-bold text-[#142033]",
                        children: error ?? copy.loadFailed
                    }, void 0, false, {
                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                        lineNumber: 228,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-7 flex flex-wrap justify-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: `/${locale}`,
                                className: "inline-flex min-h-11 items-center rounded-full border border-[#CBD7E5] px-5 text-sm font-semibold text-[#4B5E77] hover:bg-[#F5F8FB]",
                                children: copy.back
                            }, void 0, false, {
                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                lineNumber: 230,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setReloadKey((current)=>current + 1),
                                className: "min-h-11 rounded-full bg-[#2378E8] px-5 text-sm font-semibold text-white hover:bg-[#1769C2]",
                                children: copy.tryAgain
                            }, void 0, false, {
                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                lineNumber: 233,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                        lineNumber: 229,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                lineNumber: 226,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/feed/article/ArticleReader.tsx",
            lineNumber: 225,
            columnNumber: 7
        }, this);
    }
    const cover = item.media.find((media)=>media.media_type === 'image' && media.url);
    const publishedDate = formatArticleDate(item.published_at ?? item.created_at, locale);
    const insighter = item.insighter;
    const initials = insighter?.name.split(' ').filter(Boolean).slice(0, 2).map((part)=>part[0]).join('').toUpperCase() || 'I';
    const handleShare = async ()=>{
        const shareData = {
            title: item.title ?? copy.article,
            url: window.location.href
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
                return;
            }
            await navigator.clipboard.writeText(shareData.url);
            setShareCopied(true);
            window.setTimeout(()=>setShareCopied(false), 1800);
        } catch (shareError) {
            if (shareError instanceof DOMException && shareError.name === 'AbortError') return;
            setShareCopied(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        dir: isArabic ? 'rtl' : 'ltr',
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].page,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].hero} ${cover?.url ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroWithImage : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroWithoutImage}`,
                style: cover?.url ? {
                    backgroundImage: `url(${cover.url})`
                } : undefined,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroShade
                    }, void 0, false, {
                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                        lineNumber: 277,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroInner,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroTitleRow,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroContent,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            dir: "auto",
                                            children: item.title
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                            lineNumber: 281,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                        lineNumber: 280,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroActions,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: handleShare,
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].shareButton,
                                                "aria-label": copy.share,
                                                children: shareCopied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                                                    "aria-hidden": true
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                    lineNumber: 285,
                                                    columnNumber: 32
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconShare3$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconShare3$3e$__["IconShare3"], {
                                                    "aria-hidden": true
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                    lineNumber: 285,
                                                    columnNumber: 60
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                lineNumber: 284,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].shareStatus,
                                                "aria-live": "polite",
                                                children: shareCopied ? copy.shareCopied : copy.share
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                lineNumber: 287,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                        lineNumber: 283,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                lineNumber: 279,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroMetaRow,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroMetaItem,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArticle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArticle$3e$__["IconArticle"], {
                                                "aria-hidden": true
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                lineNumber: 293,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroMetaLabel,
                                                children: copy.article
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                lineNumber: 294,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                        lineNumber: 292,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroMetaItem,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconClock$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconClock$3e$__["IconClock"], {
                                                "aria-hidden": true
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                lineNumber: 298,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: [
                                                    readingMinutes,
                                                    " ",
                                                    copy.minuteRead
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                lineNumber: 299,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                        lineNumber: 297,
                                        columnNumber: 13
                                    }, this),
                                    publishedDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroMetaItem,
                                        dateTime: item.published_at ?? item.created_at ?? undefined,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroMetaLabel,
                                                children: copy.published
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                lineNumber: 304,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: publishedDate
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                lineNumber: 305,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                        lineNumber: 303,
                                        columnNumber: 15
                                    }, this),
                                    insighter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroMetaItem} ${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroAuthor}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].authorAvatar,
                                                children: insighter.profile_photo_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: insighter.profile_photo_url,
                                                    alt: insighter.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                    lineNumber: 312,
                                                    columnNumber: 50
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: initials
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                    lineNumber: 312,
                                                    columnNumber: 115
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                lineNumber: 311,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroAuthorText,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroMetaLabel,
                                                        children: copy.by
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                        lineNumber: 315,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: insighter.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                        lineNumber: 316,
                                                        columnNumber: 19
                                                    }, this),
                                                    insighter.company && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                        children: insighter.company.legal_name ?? insighter.company.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                        lineNumber: 317,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                lineNumber: 314,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                        lineNumber: 310,
                                        columnNumber: 15
                                    }, this),
                                    item.industry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/${locale}/sub-industry/${item.industry.id}/${item.industry.slug}`,
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroMetaItem} ${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroIndustry}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuildingSkyscraper$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuildingSkyscraper$3e$__["IconBuildingSkyscraper"], {
                                                "aria-hidden": true
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                lineNumber: 324,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: item.industry.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                lineNumber: 325,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                        lineNumber: 323,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                lineNumber: 291,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                        lineNumber: 278,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                lineNumber: 273,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].contentShell,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: `/${locale}`,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].backLink,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BackIcon, {
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                lineNumber: 334,
                                columnNumber: 11
                            }, this),
                            copy.back
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                        lineNumber: 333,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].articleLayout,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].articleMain,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    dir: "auto",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].articleBody,
                                    dangerouslySetInnerHTML: {
                                        __html: sanitizedBody
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                    lineNumber: 340,
                                    columnNumber: 13
                                }, this),
                                item.related_insights.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "-mx-6 mt-12 divide-y divide-[#E7EDF5] overflow-hidden rounded-xl border border-[#E7EDF5] sm:-mx-10 lg:-mx-12",
                                    children: item.related_insights.map((insight)=>{
                                        const insightKey = `${insight.type}-${insight.slug}`;
                                        const insightPrice = getInsightPrice(insight.price, locale === 'ar' ? 'مجاني' : 'Free');
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "group flex flex-col overflow-hidden bg-white transition-colors duration-300 hover:bg-[#F8FAFD] sm:flex-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: `/${locale}/knowledge/${insight.type}/${insight.slug}`,
                                                    target: "_blank",
                                                    rel: "noreferrer",
                                                    "aria-label": `${copy.viewInsight}: ${insight.title}`,
                                                    className: "flex min-h-[155px] w-full min-w-0 flex-col bg-[#071426] bg-[url('/images/test2.png')] bg-cover bg-center px-4 py-4 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#67B5F6] sm:w-[36%] sm:max-w-[280px] sm:flex-none",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileDescription$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileDescription$3e$__["IconFileDescription"], {
                                                                        "aria-hidden": true,
                                                                        className: "h-4 w-4 text-[#67B5F6]"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                                        lineNumber: 362,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "rounded-full bg-[#0B315D]/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.05em] text-[#67B5F6] backdrop-blur-sm",
                                                                        children: insight.type
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                                        lineNumber: 363,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                                lineNumber: 361,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                dir: "auto",
                                                                className: "mt-4 line-clamp-3 text-start text-[15px] font-semibold leading-6 text-white transition-colors group-hover:text-[#A8D5FF] sm:text-[16px]",
                                                                children: insight.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                                lineNumber: 367,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                        lineNumber: 360,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                    lineNumber: 353,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex min-h-[130px] min-w-0 flex-1 flex-col justify-center bg-white px-4 py-4 sm:min-h-[155px] sm:px-5",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "min-w-0",
                                                        children: [
                                                            insight.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                dir: "auto",
                                                                className: "line-clamp-3 text-[13px] leading-[1.2rem] text-[#667894] sm:text-[14px]",
                                                                children: plainText(insight.description)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                                lineNumber: 376,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-3 flex items-center justify-between gap-3",
                                                                dir: locale === 'ar' ? 'rtl' : 'ltr',
                                                                children: [
                                                                    insightPrice ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Badge$2f$Badge$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        color: insightPrice.isFree ? 'green' : 'yellow',
                                                                        variant: "light",
                                                                        className: "shrink-0 font-semibold",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            dir: insightPrice.isFree ? 'auto' : 'ltr',
                                                                            lang: insightPrice.isFree ? undefined : 'en',
                                                                            children: insightPrice.label
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                                            lineNumber: 383,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                                        lineNumber: 382,
                                                                        columnNumber: 31
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                                        lineNumber: 385,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                        href: `/${locale}/knowledge/${insight.type}/${insight.slug}`,
                                                                        target: "_blank",
                                                                        rel: "noreferrer",
                                                                        "aria-busy": openingInsight === insightKey,
                                                                        onClick: ()=>{
                                                                            setOpeningInsight(insightKey);
                                                                            window.setTimeout(()=>{
                                                                                setOpeningInsight((current)=>current === insightKey ? null : current);
                                                                            }, 1800);
                                                                        },
                                                                        className: "inline-flex min-h-9 items-center justify-center rounded-full border border-[#2378E8] px-4 text-center text-[13px] font-medium text-[#2378E8] transition-colors hover:bg-[#F2F7FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2",
                                                                        children: openingInsight === insightKey ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__["IconLoader2"], {
                                                                                    "aria-hidden": true,
                                                                                    className: "me-1.5 h-4 w-4 animate-spin",
                                                                                    stroke: 2
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                                                    lineNumber: 401,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    "aria-live": "polite",
                                                                                    children: copy.openingInsight
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                                                    lineNumber: 402,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true) : copy.viewInsight
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                                        lineNumber: 386,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                                lineNumber: 380,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                        lineNumber: 374,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                    lineNumber: 373,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, insightKey, true, {
                                            fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                            lineNumber: 349,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                    lineNumber: 343,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/article/ArticleReader.tsx",
                            lineNumber: 339,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                        lineNumber: 338,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                lineNumber: 332,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/article/ArticleReader.tsx",
        lineNumber: 272,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_88f5829f._.js.map