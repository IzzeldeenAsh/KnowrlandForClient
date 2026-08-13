module.exports = [
"[project]/hooks/industries/useAllIndustries.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAllIndustries",
    ()=>useAllIndustries
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
'use client';
;
;
function useAllIndustries(options = {}) {
    const { locale = 'en', topSubIndustry = 10 } = options;
    const [industries, setIndustries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchIndustries = async ()=>{
            try {
                setIsLoading(true);
                setError(null);
                const apiUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/platform/industries');
                const res = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'Accept-Language': locale,
                        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
                    },
                    body: JSON.stringify({
                        top_sub_industry: topSubIndustry
                    })
                });
                if (!res.ok) {
                    throw new Error(`Failed to fetch industries: ${res.status}`);
                }
                const json = await res.json();
                setIndustries(json.data || []);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Failed to fetch industries';
                console.error('Error fetching industries:', errorMessage);
                setError(errorMessage);
                setIndustries([]);
            } finally{
                setIsLoading(false);
            }
        };
        fetchIndustries();
    }, [
        locale,
        topSubIndustry
    ]);
    return {
        industries,
        isLoading,
        error
    };
}
}),
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
        await parseErrorMessage(response, 'Unable to load the White Paper.');
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
            await parseErrorMessage(response, status === 'draft' ? 'Unable to save the White Paper draft.' : 'Unable to publish the White Paper.');
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
                await parseErrorMessage(coverResponse, 'Unable to upload the White Paper cover image.');
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
                await parseErrorMessage(publishResponse, 'Unable to publish the White Paper.');
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
        await parseErrorMessage(response, status === 'draft' ? 'Unable to save the White Paper draft.' : 'Unable to publish the White Paper.');
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
"[project]/components/icons/CourseIcon.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CourseIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function CourseIcon({ width = 50, height = 50 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: width,
        height: height,
        viewBox: "0 0 39 36",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M31.9898 26.8163C31.9898 24.1788 29.8518 22.0408 27.2143 22.0408C24.5767 22.0408 22.4388 24.1788 22.4388 26.8163C22.4388 28.1696 23.0037 29.3885 23.9081 30.2576V36L27.2143 33.7959L30.5204 36V30.2576C31.4248 29.3885 31.9898 28.1696 31.9898 26.8163Z",
                fill: "#0abb87"
            }, void 0, false, {
                fileName: "[project]/components/icons/CourseIcon.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M37.1327 0H1.86734C1.05624 0 0.397949 0.657551 0.397949 1.46939V30.8572C0.397949 31.6683 1.05624 32.3265 1.86734 32.3265H20.9694V31.3443C20.0143 30.0372 19.5 28.4694 19.5 26.8163C19.5 22.5625 22.9604 19.102 27.2143 19.102C31.4682 19.102 34.9286 22.5625 34.9286 26.8163C34.9286 28.4701 34.4143 30.038 33.4592 31.345V32.3265H37.1327C37.9438 32.3265 38.6021 31.6683 38.6021 30.8572V1.46939C38.6021 0.657551 37.9438 0 37.1327 0ZM20.9694 13.2245H8.47959V10.2857H20.9694V13.2245ZM30.5204 7.34694H8.47959V4.40816H30.5204V7.34694Z",
                fill: "#0abb87"
            }, void 0, false, {
                fileName: "[project]/components/icons/CourseIcon.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M31.9898 26.8163C31.9898 24.1788 29.8518 22.0408 27.2143 22.0408C24.5767 22.0408 22.4388 24.1788 22.4388 26.8163C22.4388 28.1696 23.0037 29.3885 23.9081 30.2576V36L27.2143 33.7959L30.5204 36V30.2576C31.4248 29.3885 31.9898 28.1696 31.9898 26.8163Z",
                fill: "#0abb87"
            }, void 0, false, {
                fileName: "[project]/components/icons/CourseIcon.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M37.1327 0H1.86734C1.05624 0 0.397949 0.657551 0.397949 1.46939V30.8572C0.397949 31.6683 1.05624 32.3265 1.86734 32.3265H20.9694V31.3443C20.0143 30.0372 19.5 28.4694 19.5 26.8163C19.5 22.5625 22.9604 19.102 27.2143 19.102C31.4682 19.102 34.9286 22.5625 34.9286 26.8163C34.9286 28.4701 34.4143 30.038 33.4592 31.345V32.3265H37.1327C37.9438 32.3265 38.6021 31.6683 38.6021 30.8572V1.46939C38.6021 0.657551 37.9438 0 37.1327 0ZM20.9694 13.2245H8.47959V10.2857H20.9694V13.2245ZM30.5204 7.34694H8.47959V4.40816H30.5204V7.34694Z",
                fill: "#0abb87"
            }, void 0, false, {
                fileName: "[project]/components/icons/CourseIcon.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/icons/CourseIcon.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/icons/DataIcon.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DataIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function DataIcon({ width = 27, height = 29 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: width,
        height: height,
        viewBox: "0 0 32 34",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M4.06815 1.98373C6.86364 0.704566 10.5851 0 14.5464 0C18.5077 0 22.2293 0.704566 25.0243 1.98373C27.6099 3.16777 29.0933 4.73367 29.0933 6.28348C29.0933 7.8333 27.6099 9.39967 25.0243 10.5831C22.2297 11.8623 18.5078 12.5669 14.5464 12.5669C10.585 12.5669 6.86364 11.8623 4.06815 10.5831C1.48292 9.39967 0 7.8332 0 6.28348C0 4.73376 1.48292 3.16777 4.06815 1.98373ZM3.49489 11.8359C1.99713 11.1499 0.821516 10.3442 0 9.45442V13.4496C0 15.004 1.47967 16.5723 4.05982 17.7531C6.84871 19.029 10.5734 19.7326 14.5464 19.7326C18.5194 19.7326 22.2436 19.029 25.0331 17.7531C27.6131 16.5723 29.0933 15.004 29.0933 13.4496V9.45442C28.2718 10.3445 27.0961 11.1499 25.5984 11.8359C22.627 13.1949 18.7023 13.9444 14.5469 13.9444C10.3914 13.9444 6.46628 13.1954 3.49489 11.8359ZM14.5464 21.1102C21.1116 21.1102 26.6302 19.2908 29.0933 16.6207V20.1383C29.0933 21.6918 27.6136 23.261 25.0336 24.4417C22.2436 25.7181 18.5194 26.4217 14.5464 26.4217C10.5734 26.4217 6.84871 25.7181 4.05982 24.4417C1.47967 23.261 0 21.6918 0 20.1383V16.6207C2.46273 19.2908 7.98116 21.1102 14.5464 21.1102ZM0 27.3041C0 28.858 1.47967 30.4272 4.05982 31.608C6.84871 32.8844 10.5734 33.5875 14.5464 33.5875C18.5194 33.5875 22.2436 32.8844 25.0331 31.608C27.6131 30.4272 29.0933 28.858 29.0933 27.3041V23.3093C26.6302 25.9799 21.1116 27.7994 14.5464 27.7994C7.98116 27.7994 2.46273 25.9799 0 23.3093V27.3041ZM13.8573 1.69825C13.8572 1.78877 13.875 1.87843 13.9096 1.96208C13.9441 2.04573 13.9949 2.12174 14.0589 2.18575C14.1229 2.24975 14.1989 2.3005 14.2826 2.33509C14.3662 2.36968 14.4559 2.38743 14.5464 2.38731C16.6531 2.38731 20.6874 2.617 24.0394 4.15055C24.2047 4.2217 24.3913 4.22534 24.5593 4.16067C24.7273 4.096 24.8633 3.96817 24.9383 3.80451C25.0132 3.64085 25.0211 3.45436 24.9604 3.28493C24.8996 3.11551 24.7749 2.97659 24.613 2.89789C21.0224 1.25486 16.7654 1.00976 14.5464 1.00976C14.4559 1.00961 14.3662 1.02733 14.2825 1.06191C14.1989 1.09648 14.1228 1.14723 14.0588 1.21125C13.9948 1.27526 13.9441 1.35129 13.9095 1.43495C13.8749 1.51862 13.8572 1.60772 13.8573 1.69825Z",
                fill: "url(#paint0_linear_121_8)"
            }, void 0, false, {
                fileName: "[project]/components/icons/DataIcon.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                filter: "url(#filter0_bi_121_8)",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M16.8721 33.7442C14.1813 33.7442 12 31.5629 12 28.8721C12 26.1813 14.1813 24 16.8721 24L26.1734 24C28.8642 24 31.0455 26.1813 31.0455 28.8721C31.0455 31.5629 28.8642 33.7442 26.1734 33.7442L16.8721 33.7442Z",
                    fill: "#BCE4F1",
                    fillOpacity: "0.5"
                }, void 0, false, {
                    fileName: "[project]/components/icons/DataIcon.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/icons/DataIcon.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "16.9863",
                cy: "28.8721",
                r: "1.77167",
                transform: "rotate(-90 16.9863 28.8721)",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/DataIcon.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "21.8583",
                cy: "28.8721",
                r: "1.77167",
                transform: "rotate(-90 21.8583 28.8721)",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/DataIcon.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "26.7305",
                cy: "28.8721",
                r: "1.77167",
                transform: "rotate(-90 26.7305 28.8721)",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/DataIcon.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                        id: "filter0_bi_121_8",
                        x: "10.1861",
                        y: "22.1861",
                        width: "22.6732",
                        height: "13.3719",
                        filterUnits: "userSpaceOnUse",
                        colorInterpolationFilters: "sRGB",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feFlood", {
                                floodOpacity: "0",
                                result: "BackgroundImageFix"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                in: "BackgroundImageFix",
                                stdDeviation: "0.906928"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
                                in2: "SourceAlpha",
                                operator: "in",
                                result: "effect1_backgroundBlur_121_8"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feBlend", {
                                mode: "normal",
                                in: "SourceGraphic",
                                in2: "effect1_backgroundBlur_121_8",
                                result: "shape"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 64,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feColorMatrix", {
                                in: "SourceAlpha",
                                type: "matrix",
                                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                                result: "hardAlpha"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feOffset", {
                                dx: "0.0906928",
                                dy: "0.0453464"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                stdDeviation: "0.226732"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
                                in2: "hardAlpha",
                                operator: "arithmetic",
                                k2: "-1",
                                k3: "1"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 73,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feColorMatrix", {
                                type: "matrix",
                                values: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feBlend", {
                                mode: "normal",
                                in2: "shape",
                                result: "effect2_innerShadow_121_8"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/icons/DataIcon.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                        id: "paint0_linear_121_8",
                        x1: "1.97243",
                        y1: "10.247",
                        x2: "27.9188",
                        y2: "8.1066",
                        gradientUnits: "userSpaceOnUse",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                stopColor: "#0B5CD6"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "1",
                                stopColor: "#0085FF"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/icons/DataIcon.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/icons/DataIcon.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/icons/DataIcon.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/icons/InsightIcon.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InsightIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function InsightIcon({ width = 50, height = 50 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: width,
        height: height,
        viewBox: "0 0 50 50",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M33.7292 4.16669H16.2708C8.68749 4.16669 4.16666 8.68752 4.16666 16.2709V33.7084C4.16666 41.3125 8.68749 45.8334 16.2708 45.8334H33.7083C41.2917 45.8334 45.8125 41.3125 45.8125 33.7292V16.2709C45.8333 8.68752 41.3125 4.16669 33.7292 4.16669Z",
                fill: "#8a1538"
            }, void 0, false, {
                fileName: "[project]/components/icons/InsightIcon.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M26.2283 18.4529V33.6341C26.2283 34.7935 25.2862 35.7355 24.1268 35.7355C22.9493 35.7355 22.0073 34.7935 22.0073 33.6341V18.4529C22.0073 17.2935 22.9493 16.3514 24.1268 16.3514C25.2862 16.3514 26.2283 17.2935 26.2283 18.4529Z",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/InsightIcon.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M34 15.451V33.1577C34 34.51 33.0297 35.6087 31.8354 35.6087C30.6225 35.6087 29.6522 34.51 29.6522 33.1577V15.451C29.6522 14.0987 30.6225 13 31.8354 13C33.0297 13 34 14.0987 34 15.451Z",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/InsightIcon.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M18.221 27.7283V33.6341C18.221 34.7935 17.279 35.7355 16.1014 35.7355C14.942 35.7355 14 34.7935 14 33.6341V27.7283C14 26.5689 14.942 25.6268 16.1014 25.6268C17.279 25.6268 18.221 26.5689 18.221 27.7283Z",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/InsightIcon.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                    id: "paint0_linear_125_119",
                    x1: "24.9896",
                    y1: "4.16669",
                    x2: "24.9896",
                    y2: "45.8334",
                    gradientUnits: "userSpaceOnUse",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            stopColor: "#066FE8"
                        }, void 0, false, {
                            fileName: "[project]/components/icons/InsightIcon.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "1",
                            stopColor: "#027DF8"
                        }, void 0, false, {
                            fileName: "[project]/components/icons/InsightIcon.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/icons/InsightIcon.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/icons/InsightIcon.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/icons/InsightIcon.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/icons/ManualIcon.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ManualIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function ManualIcon({ width = 50, height = 50 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: width,
        height: height,
        viewBox: "0 0 50 50",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M42.7083 14.5834V31.25H13.2292C9.95832 31.25 7.29166 33.9167 7.29166 37.1875V14.5834C7.29166 6.25002 9.37499 4.16669 17.7083 4.16669H32.2917C40.625 4.16669 42.7083 6.25002 42.7083 14.5834Z",
                fill: "#ff9f43"
            }, void 0, false, {
                fileName: "[project]/components/icons/ManualIcon.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M42.7083 31.25V38.5417C42.7083 42.5625 39.4375 45.8333 35.4167 45.8333H14.5833C10.5625 45.8333 7.29166 42.5625 7.29166 38.5417V37.1875C7.29166 33.9167 9.95832 31.25 13.2292 31.25H42.7083Z",
                fill: "#d36a04"
            }, void 0, false, {
                fileName: "[project]/components/icons/ManualIcon.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M33.3333 16.1458H16.6667C15.8125 16.1458 15.1042 15.4375 15.1042 14.5833C15.1042 13.7291 15.8125 13.0208 16.6667 13.0208H33.3333C34.1875 13.0208 34.8958 13.7291 34.8958 14.5833C34.8958 15.4375 34.1875 16.1458 33.3333 16.1458Z",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/ManualIcon.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M27.0833 23.4375H16.6667C15.8125 23.4375 15.1042 22.7292 15.1042 21.875C15.1042 21.0208 15.8125 20.3125 16.6667 20.3125H27.0833C27.9375 20.3125 28.6458 21.0208 28.6458 21.875C28.6458 22.7292 27.9375 23.4375 27.0833 23.4375Z",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/ManualIcon.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                    id: "paint0_linear_125_176",
                    x1: "25",
                    y1: "4.16669",
                    x2: "25",
                    y2: "37.1875",
                    gradientUnits: "userSpaceOnUse",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            stopColor: "#066FE8"
                        }, void 0, false, {
                            fileName: "[project]/components/icons/ManualIcon.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "1",
                            stopColor: "#027DF8"
                        }, void 0, false, {
                            fileName: "[project]/components/icons/ManualIcon.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/icons/ManualIcon.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/icons/ManualIcon.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/icons/ManualIcon.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/icons/ReportIcon.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ReportIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function ReportIcon({ width = 50, height = 50 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: width,
        height: height,
        viewBox: "0 0 50 50",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                opacity: "0.4",
                d: "M45.125 21.75L43.0833 30.4583C41.3333 37.9792 37.875 41.0208 31.375 40.3958C30.3333 40.3125 29.2083 40.125 28 39.8333L24.5 39C15.8125 36.9375 13.125 32.6458 15.1667 23.9375L17.2083 15.2083C17.625 13.4375 18.125 11.8958 18.75 10.625C21.1875 5.58333 25.3333 4.22916 32.2917 5.875L35.7708 6.6875C44.5 8.72916 47.1667 13.0417 45.125 21.75Z",
                fill: "#699DDE"
            }, void 0, false, {
                fileName: "[project]/components/icons/ReportIcon.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M31.375 40.3958C30.0833 41.2708 28.4583 42 26.4792 42.6458L23.1875 43.7292C14.9167 46.3958 10.5625 44.1667 7.87501 35.8958L5.20834 27.6667C2.54168 19.3958 4.75001 15.0208 13.0208 12.3542L16.3125 11.2708C17.1667 11 17.9792 10.7708 18.75 10.625C18.125 11.8958 17.625 13.4375 17.2083 15.2083L15.1667 23.9375C13.125 32.6458 15.8125 36.9375 24.5 39L28 39.8333C29.2083 40.125 30.3333 40.3125 31.375 40.3958Z",
                fill: "url(#paint0_linear_125_52)"
            }, void 0, false, {
                fileName: "[project]/components/icons/ReportIcon.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M36.4375 21.8959C36.3125 21.8959 36.1875 21.875 36.0416 21.8542L25.9375 19.2917C25.1041 19.0834 24.6041 18.2292 24.8125 17.3959C25.0208 16.5625 25.875 16.0625 26.7083 16.2709L36.8125 18.8334C37.6458 19.0417 38.1458 19.8959 37.9375 20.7292C37.7708 21.4167 37.125 21.8959 36.4375 21.8959Z",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/ReportIcon.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M30.3333 28.9375C30.2083 28.9375 30.0833 28.9167 29.9375 28.8959L23.875 27.3542C23.0417 27.1459 22.5417 26.2917 22.75 25.4584C22.9583 24.625 23.8125 24.125 24.6458 24.3334L30.7083 25.875C31.5417 26.0834 32.0417 26.9375 31.8333 27.7709C31.6667 28.4792 31.0417 28.9375 30.3333 28.9375Z",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/ReportIcon.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                    id: "paint0_linear_125_52",
                    x1: "17.7562",
                    y1: "10.625",
                    x2: "17.7562",
                    y2: "44.7964",
                    gradientUnits: "userSpaceOnUse",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            stopColor: "#0B5CD6"
                        }, void 0, false, {
                            fileName: "[project]/components/icons/ReportIcon.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "1",
                            stopColor: "#3599FE"
                        }, void 0, false, {
                            fileName: "[project]/components/icons/ReportIcon.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/icons/ReportIcon.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/icons/ReportIcon.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/icons/ReportIcon.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/feed/FeedShare.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconShare3$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconShare3$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconShare3.mjs [app-ssr] (ecmascript) <export default as IconShare3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const FeedShare = ({ shareUrl, shareTitle, authorName, authorPhotoUrl, locale, shareKind = 'post', triggerClassName, hideTriggerLabel = false })=>{
    const isRTL = locale === 'ar';
    const isWhitePaper = shareKind === 'white-paper';
    const [shareModalOpened, setShareModalOpened] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [customShareMessage, setCustomShareMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [linkCopied, setLinkCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const shareTextareaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (shareModalOpened) {
            shareTextareaRef.current?.focus();
        }
    }, [
        shareModalOpened
    ]);
    const t = {
        share: isRTL ? 'مشاركة' : 'Share',
        sharePost: isWhitePaper ? isRTL ? 'مشاركة الورقة البيضاء' : 'Share White Paper' : isRTL ? 'مشاركة المنشور' : 'Share Post',
        customShareMessage: isRTL ? 'أضف رسالة شخصية' : 'Add a Personal Message',
        shareMessageHint: isRTL ? 'أضف ملاحظة أو رسالة لتخصيص المشاركة...' : 'Add a note or message to personalize your share...',
        characterCount: isRTL ? 'عدد الأحرف' : 'Character Count',
        copyLink: isRTL ? 'نسخ الرابط' : 'Copy Link',
        linkCopied: isRTL ? 'تم نسخ الرابط!' : 'Link Copied!',
        checkOutPost: isWhitePaper ? isRTL ? 'اطّلع على هذه الورقة البيضاء على انسايتا: ' : 'Check out this white paper on Insighta: ' : isRTL ? 'اطّلع على هذا المنشور على انسايتا: ' : 'Check out this post on Insighta: ',
        sharedBy: isWhitePaper ? isRTL ? 'ورقة بيضاء بواسطة' : 'White Paper by' : isRTL ? 'منشور بواسطة' : 'Post by',
        close: isRTL ? 'إغلاق' : 'Close'
    };
    const authorInitials = authorName.split(' ').filter(Boolean).slice(0, 2).map((part)=>part[0]).join('').toUpperCase();
    const handleShare = ()=>{
        setCustomShareMessage(`${t.checkOutPost}${shareTitle || authorName}`);
        setShareModalOpened(true);
    };
    const shareToSocial = (platform)=>{
        const url = encodeURIComponent(shareUrl);
        const message = encodeURIComponent(customShareMessage);
        const title = encodeURIComponent(shareTitle || authorName);
        let socialUrl = '';
        switch(platform){
            case 'facebook':
                socialUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${message}`;
                break;
            case 'twitter':
                socialUrl = `https://twitter.com/intent/tweet?text=${message}&url=${url}`;
                break;
            case 'linkedin':
                socialUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${message}`;
                break;
            case 'whatsapp':
                socialUrl = `https://api.whatsapp.com/send?text=${message}%20${url}`;
                break;
        }
        if (socialUrl) {
            window.open(socialUrl, '_blank', 'width=600,height=400');
            setShareModalOpened(false);
        }
    };
    const handleCopyLink = async ()=>{
        try {
            await navigator.clipboard.writeText(shareUrl);
            setLinkCopied(true);
            setTimeout(()=>setLinkCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy link:', error);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: handleShare,
                "aria-label": t.share,
                className: triggerClassName ?? 'inline-flex flex-1 items-center justify-center gap-2 rounded-md px-2 py-2.5 text-[14px] font-medium text-[#5A6B85] transition-colors hover:bg-[#F5F8FC] hover:text-[#101724] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8]',
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconShare3$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconShare3$3e$__["IconShare3"], {
                        "aria-hidden": true,
                        className: "h-[18px] w-[18px] text-[#E0398A]",
                        stroke: 1.8
                    }, void 0, false, {
                        fileName: "[project]/components/feed/FeedShare.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    !hideTriggerLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: t.share
                    }, void 0, false, {
                        fileName: "[project]/components/feed/FeedShare.tsx",
                        lineNumber: 129,
                        columnNumber: 31
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/FeedShare.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            shareModalOpened && typeof document !== 'undefined' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4",
                onClick: ()=>setShareModalOpened(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-md rounded-lg bg-white p-6 dark:bg-slate-800",
                    onClick: (event)=>event.stopPropagation(),
                    dir: isRTL ? 'rtl' : 'ltr',
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 flex items-center justify-between border-b border-gray-200 pb-4 dark:border-slate-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-bold text-gray-900 dark:text-white",
                                    children: t.sharePost
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/FeedShare.tsx",
                                    lineNumber: 144,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setShareModalOpened(false),
                                    "aria-label": t.close,
                                    className: "text-2xl leading-none text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/FeedShare.tsx",
                                    lineNumber: 145,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/FeedShare.tsx",
                            lineNumber: 143,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 rounded-lg bg-gray-50 p-4 dark:bg-slate-700",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-600",
                                        children: authorPhotoUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: authorPhotoUrl,
                                            alt: authorName,
                                            className: "h-full w-full object-cover object-top"
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/FeedShare.tsx",
                                            lineNumber: 160,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex h-full w-full items-center justify-center bg-blue-500 text-sm font-semibold text-white",
                                            children: authorInitials || 'I'
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/FeedShare.tsx",
                                            lineNumber: 166,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/FeedShare.tsx",
                                        lineNumber: 158,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "truncate font-semibold text-gray-900 dark:text-white",
                                                children: shareTitle || authorName
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/FeedShare.tsx",
                                                lineNumber: 172,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "truncate text-sm text-gray-500 dark:text-gray-400",
                                                children: [
                                                    t.sharedBy,
                                                    " ",
                                                    authorName
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/feed/FeedShare.tsx",
                                                lineNumber: 175,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/FeedShare.tsx",
                                        lineNumber: 171,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/FeedShare.tsx",
                                lineNumber: 157,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/feed/FeedShare.tsx",
                            lineNumber: 156,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300",
                                    children: t.customShareMessage
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/FeedShare.tsx",
                                    lineNumber: 184,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    ref: shareTextareaRef,
                                    className: "w-full resize-none rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white",
                                    rows: 3,
                                    value: customShareMessage,
                                    onChange: (event)=>setCustomShareMessage(event.target.value),
                                    placeholder: t.shareMessageHint
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/FeedShare.tsx",
                                    lineNumber: 187,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/FeedShare.tsx",
                            lineNumber: 183,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                className: "text-gray-500 dark:text-gray-400",
                                children: [
                                    t.characterCount,
                                    ": ",
                                    customShareMessage.length
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/FeedShare.tsx",
                                lineNumber: 198,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/feed/FeedShare.tsx",
                            lineNumber: 197,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6 flex justify-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "flex h-12 w-12 items-center justify-center rounded-full bg-[#2196F3] text-white transition-colors hover:bg-blue-700",
                                    onClick: ()=>shareToSocial('facebook'),
                                    title: "Share on Facebook",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "19",
                                        height: "19",
                                        viewBox: "0 0 19 19",
                                        fill: "none",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M19 9.5576C19 4.27831 14.7476 0 9.5 0C4.25244 0 0 4.27712 0 9.5576C0 14.3275 3.47344 18.2816 8.01562 18.9988V12.3195H5.60263V9.5564H8.01562V7.45109C8.01562 5.05605 9.4335 3.73328 11.6042 3.73328C12.6433 3.73328 13.7311 3.91968 13.7311 3.91968V6.2708H12.5329C11.3525 6.2708 10.9844 7.00818 10.9844 7.76338V9.5576H13.6194L13.1979 12.3207H10.9844V19C15.5266 18.2816 19 14.3275 19 9.5576Z",
                                            fill: "white"
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/FeedShare.tsx",
                                            lineNumber: 212,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/FeedShare.tsx",
                                        lineNumber: 211,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/FeedShare.tsx",
                                    lineNumber: 205,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-gray-800",
                                    onClick: ()=>shareToSocial('twitter'),
                                    title: "Share on X",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "19",
                                        height: "19",
                                        viewBox: "0 0 19 19",
                                        fill: "none",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M14.0248 3.65625H16.1725L11.4815 9.03014L17 16.3438H12.6801L9.29422 11.9092L5.4246 16.3438H3.27379L8.29031 10.5947L3 3.65625H7.42938L10.4867 7.70954L14.0248 3.65625ZM13.2703 15.0567H14.4598L6.7814 4.8762H5.50369L13.2703 15.0567Z",
                                            fill: "white"
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/FeedShare.tsx",
                                            lineNumber: 223,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/FeedShare.tsx",
                                        lineNumber: 222,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/FeedShare.tsx",
                                    lineNumber: 216,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "flex h-12 w-12 items-center justify-center rounded-full bg-[#0077b5] text-white transition-colors hover:bg-blue-800",
                                    onClick: ()=>shareToSocial('linkedin'),
                                    title: "Share on LinkedIn",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "19",
                                        height: "19",
                                        viewBox: "0 0 19 19",
                                        fill: "none",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                clipPath: "url(#feedshare_clip)",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M17.48 0H1.6233C0.756425 0 0 0.62344 0 1.47963V17.3719C0 18.2329 0.756425 19 1.6233 19H17.4752C18.3469 19 19 18.2281 19 17.3719V1.47963C19.0036 0.62344 18.3457 0 17.48 0ZM5.88881 15.8377H3.16705V7.37436H5.88881V15.8377ZM4.62175 6.08829H4.60274C3.73112 6.08829 3.16705 5.43994 3.16705 4.62769C3.16705 3.80119 3.74656 3.16825 4.63719 3.16825C5.52781 3.16825 6.07286 3.79644 6.09186 4.62769C6.09186 5.43994 5.52781 6.08829 4.62175 6.08829ZM15.8365 15.8377H13.1147V11.21C13.1147 10.1009 12.7181 9.34442 11.7337 9.34442C10.9808 9.34442 10.5355 9.85387 10.3384 10.3491C10.2647 10.5272 10.2446 10.7694 10.2446 11.0176V15.8377H7.5228V7.37436H10.2446V8.55237C10.6412 7.98831 11.2599 7.17606 12.6991 7.17606C14.4863 7.17606 15.8377 8.35407 15.8377 10.8929L15.8365 15.8377Z",
                                                    fill: "white"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/FeedShare.tsx",
                                                    lineNumber: 235,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/FeedShare.tsx",
                                                lineNumber: 234,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("clipPath", {
                                                    id: "feedshare_clip",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                        width: "19",
                                                        height: "19",
                                                        fill: "white"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/FeedShare.tsx",
                                                        lineNumber: 239,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/FeedShare.tsx",
                                                    lineNumber: 238,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/FeedShare.tsx",
                                                lineNumber: 237,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/FeedShare.tsx",
                                        lineNumber: 233,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/FeedShare.tsx",
                                    lineNumber: 227,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white transition-colors hover:bg-green-600",
                                    onClick: ()=>shareToSocial('whatsapp'),
                                    title: "Share on WhatsApp",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "19",
                                        height: "19",
                                        viewBox: "0 0 19 19",
                                        fill: "none",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M16.1537 2.76093C14.3773 0.979684 12.0108 0 9.49584 0C4.3056 0 0.0807459 4.22394 0.0807459 9.41569C0.0807459 11.0734 0.512968 12.6944 1.33585 14.1229L0 19L4.99193 17.689C6.36578 18.4395 7.91419 18.8338 9.49109 18.8338H9.49584C14.6825 18.8338 19 14.6098 19 9.41806C18.9988 6.90412 17.9301 4.54218 16.1537 2.76093ZM9.49584 17.2484C8.08755 17.2484 6.71014 16.8708 5.50966 16.1583L5.22586 15.9885L2.26561 16.7651L3.05406 13.8771L2.86763 13.5803C2.08275 12.3334 1.67189 10.8953 1.67189 9.41569C1.67189 5.10269 5.18311 1.59125 9.50059 1.59125C11.5917 1.59125 13.5545 2.40588 15.0304 3.8855C16.5064 5.36513 17.4136 7.32925 17.41 9.42044C17.4088 13.737 13.8086 17.2484 9.49584 17.2484ZM13.7872 11.3869C13.5545 11.2682 12.3967 10.6994 12.1794 10.6234C11.9633 10.5426 11.8066 10.5046 11.6498 10.7421C11.4931 10.9796 11.0431 11.5057 10.9029 11.6672C10.7676 11.8239 10.6275 11.8453 10.3935 11.7266C9.01137 11.0354 8.10299 10.4928 7.19224 8.92763C6.95 8.51201 7.43447 8.54169 7.88332 7.64276C7.95932 7.48601 7.92131 7.35062 7.86194 7.23187C7.80257 7.11312 7.33235 5.95532 7.13642 5.48507C6.94525 5.02669 6.75051 5.09081 6.60683 5.0825C6.47147 5.07419 6.31473 5.07418 6.1568 5.07418C5.99887 5.07418 5.74595 5.13356 5.52865 5.36631C5.31254 5.60381 4.70577 6.17263 4.70577 7.33044C4.70577 8.48825 5.55002 9.60807 5.66402 9.76482C5.78276 9.92157 7.32167 12.2966 9.68464 13.319C11.1772 13.9638 11.7626 14.0184 12.5095 13.908C12.9631 13.8403 13.9 13.3392 14.0959 12.7882C14.2907 12.2372 14.2907 11.7658 14.2313 11.6684C14.1779 11.5603 14.0199 11.5009 13.7872 11.3869Z",
                                            fill: "white"
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/FeedShare.tsx",
                                            lineNumber: 252,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/FeedShare.tsx",
                                        lineNumber: 251,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/FeedShare.tsx",
                                    lineNumber: 245,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/FeedShare.tsx",
                            lineNumber: 204,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleCopyLink,
                            className: `w-full rounded-lg px-4 py-2 font-medium transition-colors ${linkCopied ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600'}`,
                            children: linkCopied ? t.linkCopied : t.copyLink
                        }, void 0, false, {
                            fileName: "[project]/components/feed/FeedShare.tsx",
                            lineNumber: 258,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/feed/FeedShare.tsx",
                    lineNumber: 137,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/feed/FeedShare.tsx",
                lineNumber: 133,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)), document.body)
        ]
    }, void 0, true);
};
const __TURBOPACK__default__export__ = FeedShare;
}),
"[project]/components/feed/RoleUpgradeCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RoleUpgradeCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowRight$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconArrowRight.mjs [app-ssr] (ecmascript) <export default as IconArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconGift$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconGift$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconGift.mjs [app-ssr] (ecmascript) <export default as IconGift>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/header/hooks/useUserProfile.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
const copyByLocale = {
    en: {
        insighter: {
            eyebrow: 'Upgrade for free',
            title: 'Grow as a company',
            benefits: [
                'Create a trusted company profile',
                'Add and manage your team with centralized publishing control',
                'Strengthen your digital presence and promote your services'
            ],
            action: 'Upgrade to Company'
        },
        client: {
            eyebrow: 'Share your expertise',
            title: 'Become an Insighter',
            benefits: [
                'Create posts that showcase your expertise',
                'Publish insights and original knowledge',
                'Share your expertise and promote your services'
            ],
            action: 'Become an Insighter'
        }
    },
    ar: {
        insighter: {
            eyebrow: 'الترقية مجانًا',
            title: 'نمِّ حضورك كشركة',
            benefits: [
                'أنشئ ملفًا موثوقًا لشركتك',
                'أضف فريقك وأدره مع التحكم المركزي بالنشر',
                'عزّز حضورك الرقمي وروّج لخدماتك'
            ],
            action: 'الترقية إلى شركة'
        },
        client: {
            eyebrow: 'شارك خبرتك',
            title: 'كن خبيراً',
            benefits: [
                'إنشاء منشورات تُبرز خبرتك',
                'نشر الرؤى والمعرفة الأصيلة',
                'مشاركة خبرتك والترويج لخدماتك'
            ],
            action: 'كن خبيراً'
        }
    }
};
function RoleUpgradeCard({ locale, className }) {
    const isArabic = locale === 'ar';
    const { user, roles, isAuthResolved } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserProfile"])();
    if (!isAuthResolved || !user) return null;
    const hasCompanyRole = roles.some((role)=>[
            'company',
            'company-insighter'
        ].includes(role));
    const isInsighterOnly = roles.includes('insighter') && !hasCompanyRole;
    const isClientOnly = roles.includes('client') && !roles.some((role)=>[
            'insighter',
            'company',
            'company-insighter'
        ].includes(role));
    if (!isInsighterOnly && !isClientOnly) return null;
    const variant = isInsighterOnly ? 'insighter' : 'client';
    const copy = copyByLocale[isArabic ? 'ar' : 'en'][variant];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-labelledby": `role-upgrade-${variant}-title`,
        className: `relative isolate overflow-hidden rounded-lg border p-5 ${isInsighterOnly ? 'border-[#B8DBE4] bg-[#E9F8F3] bg-cover bg-center' : 'border-[#BFD8F7] bg-gradient-to-br from-[#EAF3FF] via-white to-[#E7FAF8]'}${className ? ` ${className}` : ''}`,
        style: isInsighterOnly ? {
            backgroundImage: "url('https://res.cloudinary.com/dsiku9ipv/image/upload/v1785500121/3440_gzhz0h.jpg')"
        } : undefined,
        children: [
            !isInsighterOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "aria-hidden": true,
                        className: "absolute -end-9 -top-10 -z-10 h-28 w-28 rounded-full bg-[#56D3D8]/20 blur-sm"
                    }, void 0, false, {
                        fileName: "[project]/components/feed/RoleUpgradeCard.tsx",
                        lineNumber: 101,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "aria-hidden": true,
                        className: "absolute -bottom-12 -start-8 -z-10 h-28 w-28 rounded-full bg-[#2378E8]/10"
                    }, void 0, false, {
                        fileName: "[project]/components/feed/RoleUpgradeCard.tsx",
                        lineNumber: 105,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between gap-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] backdrop-blur-sm ${isInsighterOnly ? 'border-white/70 bg-white/55 text-[#245578]' : 'border-[#BCD7F6] bg-white/75 text-[#1D67BC]'}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconGift$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconGift$3e$__["IconGift"], {
                            "aria-hidden": true,
                            className: "h-3.5 w-3.5",
                            stroke: 1.9
                        }, void 0, false, {
                            fileName: "[project]/components/feed/RoleUpgradeCard.tsx",
                            lineNumber: 118,
                            columnNumber: 13
                        }, this),
                        copy.eyebrow
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/feed/RoleUpgradeCard.tsx",
                    lineNumber: 113,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/feed/RoleUpgradeCard.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                id: `role-upgrade-${variant}-title`,
                className: `mt-5 text-[19px] font-semibold leading-6 tracking-[-0.02em] ${isInsighterOnly ? 'text-[#123653]' : 'text-[#10233F]'}`,
                children: copy.title
            }, void 0, false, {
                fileName: "[project]/components/feed/RoleUpgradeCard.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: `mt-3 list-disc space-y-1.5 ps-4 text-[13px] leading-5 ${isInsighterOnly ? 'text-[#47677D]' : 'text-[#566A86]'}`,
                children: copy.benefits?.map((benefit)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: benefit
                    }, benefit, false, {
                        fileName: "[project]/components/feed/RoleUpgradeCard.tsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/feed/RoleUpgradeCard.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: `mt-5 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md px-4 text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${isInsighterOnly ? 'bg-[#176FD1] text-white hover:bg-[#105EBA] focus-visible:ring-[#176FD1]' : 'bg-[#176FD1] text-white hover:bg-[#105EBA] focus-visible:ring-[#176FD1]'}`,
                children: [
                    copy.action,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowRight$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowRight$3e$__["IconArrowRight"], {
                        "aria-hidden": true,
                        className: `h-4 w-4 ${isArabic ? 'rotate-180' : ''}`,
                        stroke: 1.9
                    }, void 0, false, {
                        fileName: "[project]/components/feed/RoleUpgradeCard.tsx",
                        lineNumber: 150,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/RoleUpgradeCard.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/RoleUpgradeCard.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
}),
"[project]/hooks/knowledgs/usePopularKnowledge.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePopularKnowledge",
    ()=>usePopularKnowledge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/index.react-client.js [app-ssr] (ecmascript)");
'use client';
;
;
const POPULAR_URL = `${("TURBOPACK compile-time value", "https://api.foresighta.co")}/api/platform/industries/knowledge/popular`;
// Dedupe + cache per locale (prevents double GET in production if mounted twice)
const popularCache = new Map();
const popularInFlight = new Map();
function normalizeLocale(locale) {
    return locale === 'ar' ? 'ar' : 'en';
}
async function fetchPopularKnowledge(locale) {
    const res = await fetch(POPULAR_URL, {
        headers: {
            Accept: 'application/json',
            'Accept-Language': locale,
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
        }
    });
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const json = await res.json();
    return json.data.slice(0, 5);
}
function usePopularKnowledge() {
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const locale = normalizeLocale((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLocale"])());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        // Serve from cache immediately when possible
        const cached = popularCache.get(locale);
        if (cached) {
            setData(cached);
            setIsLoading(false);
            setError(null);
            return;
        }
        setIsLoading(true);
        setError(null);
        const existing = popularInFlight.get(locale);
        const p = existing ?? fetchPopularKnowledge(locale);
        if (!existing) popularInFlight.set(locale, p);
        p.then((items)=>{
            popularCache.set(locale, items);
            popularInFlight.delete(locale);
            if (!cancelled) {
                setData(items);
                setIsLoading(false);
            }
        }).catch((err)=>{
            popularInFlight.delete(locale);
            if (!cancelled) {
                setError(err);
                setIsLoading(false);
            }
        });
        return ()=>{
            cancelled = true;
        };
    }, [
        locale
    ]);
    return {
        data,
        isLoading,
        error
    };
}
}),
"[project]/components/feed/DocumentsListCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DocumentsListCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconExternalLink$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconExternalLink.mjs [app-ssr] (ecmascript) <export default as IconExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$CourseIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/CourseIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$DataIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/DataIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$InsightIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/InsightIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$ManualIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/ManualIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$ReportIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/ReportIcon.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
function getTypeIcon(type) {
    const iconProps = {
        width: 20,
        height: 20
    };
    switch(type.toLowerCase()){
        case 'report':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$ReportIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/components/feed/DocumentsListCard.tsx",
                lineNumber: 37,
                columnNumber: 14
            }, this);
        case 'manual':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$ManualIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/components/feed/DocumentsListCard.tsx",
                lineNumber: 39,
                columnNumber: 14
            }, this);
        case 'data':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$DataIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/components/feed/DocumentsListCard.tsx",
                lineNumber: 41,
                columnNumber: 14
            }, this);
        case 'course':
        case 'article':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$CourseIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/components/feed/DocumentsListCard.tsx",
                lineNumber: 44,
                columnNumber: 14
            }, this);
        case 'statistic':
        case 'insight':
        default:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$InsightIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/components/feed/DocumentsListCard.tsx",
                lineNumber: 48,
                columnNumber: 14
            }, this);
    }
}
function getTypeLabel(type, isRTL) {
    const labels = {
        report: {
            en: 'Report',
            ar: 'تقرير'
        },
        manual: {
            en: 'Manual',
            ar: 'دليل'
        },
        statistic: {
            en: 'Statistic',
            ar: 'إحصائية'
        },
        insight: {
            en: 'Insight',
            ar: 'رؤية'
        },
        data: {
            en: 'Data',
            ar: 'بيانات'
        },
        article: {
            en: 'White Paper',
            ar: 'ورقة بيضاء'
        },
        course: {
            en: 'Course',
            ar: 'دورة'
        }
    };
    const label = labels[type.toLowerCase()];
    return label ? isRTL ? label.ar : label.en : type;
}
function LoadingList() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
        className: "mt-3 space-y-1",
        "aria-hidden": "true",
        children: Array.from({
            length: 3
        }).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                className: "flex items-center gap-3 rounded-lg px-2 py-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "h-9 w-9 shrink-0 animate-pulse rounded-lg bg-slate-100"
                    }, void 0, false, {
                        fileName: "[project]/components/feed/DocumentsListCard.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "min-w-0 flex-1 space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block h-2.5 w-16 animate-pulse rounded bg-slate-100"
                            }, void 0, false, {
                                fileName: "[project]/components/feed/DocumentsListCard.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block h-3 w-full animate-pulse rounded bg-slate-100"
                            }, void 0, false, {
                                fileName: "[project]/components/feed/DocumentsListCard.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/DocumentsListCard.tsx",
                        lineNumber: 73,
                        columnNumber: 11
                    }, this)
                ]
            }, index, true, {
                fileName: "[project]/components/feed/DocumentsListCard.tsx",
                lineNumber: 71,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/feed/DocumentsListCard.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
function DocumentsListCard({ locale, title, documents, isLoading, emptyText, unavailableText = emptyText, hasError = false, openInNewTabLabel, className }) {
    const isRTL = locale === 'ar';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `rounded-lg border border-slate-200 bg-white p-5${className ? ` ${className}` : ''}`,
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-sm font-bold text-slate-900",
                children: title
            }, void 0, false, {
                fileName: "[project]/components/feed/DocumentsListCard.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LoadingList, {}, void 0, false, {
                fileName: "[project]/components/feed/DocumentsListCard.tsx",
                lineNumber: 101,
                columnNumber: 9
            }, this) : hasError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-4 text-xs leading-5 text-slate-500",
                role: "status",
                children: unavailableText
            }, void 0, false, {
                fileName: "[project]/components/feed/DocumentsListCard.tsx",
                lineNumber: 103,
                columnNumber: 9
            }, this) : documents.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-4 text-xs leading-5 text-slate-500",
                role: "status",
                children: emptyText
            }, void 0, false, {
                fileName: "[project]/components/feed/DocumentsListCard.tsx",
                lineNumber: 107,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "mt-3 divide-y divide-slate-200",
                children: documents.map((item)=>{
                    const typeLabel = getTypeLabel(item.type, isRTL);
                    const isTitleRTL = item.language === 'arabic';
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: item.href,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            dir: isTitleRTL ? 'rtl' : 'ltr',
                            "aria-label": `${item.title} — ${openInNewTabLabel}`,
                            className: "group flex items-center gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 ring-1 ring-inset ring-slate-100 transition-colors group-hover:bg-white",
                                    children: getTypeIcon(item.type)
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/DocumentsListCard.tsx",
                                    lineNumber: 126,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `min-w-0 flex-1 ${isTitleRTL ? 'text-right' : 'text-left'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "block text-[10px] font-bold uppercase tracking-[0.08em] text-slate-400",
                                            children: typeLabel
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/DocumentsListCard.tsx",
                                            lineNumber: 131,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mt-0.5 line-clamp-2 block max-h-[2.9em] overflow-hidden break-words text-[13px] font-semibold leading-[1.45] text-slate-800 transition-colors group-hover:text-blue-600",
                                            dir: isTitleRTL ? 'rtl' : 'ltr',
                                            children: item.title
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/DocumentsListCard.tsx",
                                            lineNumber: 134,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/feed/DocumentsListCard.tsx",
                                    lineNumber: 130,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconExternalLink$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconExternalLink$3e$__["IconExternalLink"], {
                                    "aria-hidden": "true",
                                    className: "h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-blue-500",
                                    stroke: 1.8
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/DocumentsListCard.tsx",
                                    lineNumber: 142,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/DocumentsListCard.tsx",
                            lineNumber: 118,
                            columnNumber: 17
                        }, this)
                    }, item.id, false, {
                        fileName: "[project]/components/feed/DocumentsListCard.tsx",
                        lineNumber: 117,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/feed/DocumentsListCard.tsx",
                lineNumber: 111,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/DocumentsListCard.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/feed/TopDocumentsCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TopDocumentsCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$knowledgs$2f$usePopularKnowledge$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/knowledgs/usePopularKnowledge.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$DocumentsListCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/DocumentsListCard.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
const VISIBLE_DOCUMENTS = 3;
function TopDocumentsCard({ locale, className }) {
    const isRTL = locale === 'ar';
    const { data, isLoading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$knowledgs$2f$usePopularKnowledge$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePopularKnowledge"])();
    const copy = isRTL ? {
        title: 'أفضل المستندات',
        unavailable: 'المستندات غير متاحة حالياً.',
        empty: 'لا توجد مستندات منشورة حالياً.',
        openInNewTab: 'فتح في علامة تبويب جديدة'
    } : {
        title: 'Top documents',
        unavailable: 'Documents are unavailable right now.',
        empty: 'No documents have been published yet.',
        openInNewTab: 'Open in a new tab'
    };
    const documents = data.slice(0, VISIBLE_DOCUMENTS).map((item)=>({
            id: `${item.type}-${item.slug}`,
            href: `/${locale}/knowledge/${item.type}/${item.slug}`,
            type: item.type,
            title: item.title,
            language: item.language
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$DocumentsListCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        locale: locale,
        title: copy.title,
        documents: documents,
        isLoading: isLoading,
        hasError: Boolean(error),
        emptyText: copy.empty,
        unavailableText: copy.unavailable,
        openInNewTabLabel: copy.openInNewTab,
        className: className
    }, void 0, false, {
        fileName: "[project]/components/feed/TopDocumentsCard.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/specifiedInsighterProject.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearStoredSpecifiedInsighterDisplay",
    ()=>clearStoredSpecifiedInsighterDisplay,
    "clearStoredSpecifiedInsighterUuid",
    ()=>clearStoredSpecifiedInsighterUuid,
    "getSpecifiedInsighterLabel",
    ()=>getSpecifiedInsighterLabel,
    "isSpecifiedInsighterProject",
    ()=>isSpecifiedInsighterProject,
    "normalizeSpecifiedInsighterRole",
    ()=>normalizeSpecifiedInsighterRole,
    "readStoredSpecifiedInsighterDisplay",
    ()=>readStoredSpecifiedInsighterDisplay,
    "readStoredSpecifiedInsighterProfileUuid",
    ()=>readStoredSpecifiedInsighterProfileUuid,
    "readStoredSpecifiedInsighterRole",
    ()=>readStoredSpecifiedInsighterRole,
    "readStoredSpecifiedInsighterUuid",
    ()=>readStoredSpecifiedInsighterUuid,
    "specifiedInsighterDisplayUpdatedEvent",
    ()=>specifiedInsighterDisplayUpdatedEvent,
    "specifiedInsighterProfileUuidQueryParam",
    ()=>specifiedInsighterProfileUuidQueryParam,
    "specifiedInsighterQueryParam",
    ()=>specifiedInsighterQueryParam,
    "specifiedInsighterRoleQueryParam",
    ()=>specifiedInsighterRoleQueryParam,
    "writeStoredSpecifiedInsighterDisplay",
    ()=>writeStoredSpecifiedInsighterDisplay,
    "writeStoredSpecifiedInsighterProfileUuid",
    ()=>writeStoredSpecifiedInsighterProfileUuid,
    "writeStoredSpecifiedInsighterRole",
    ()=>writeStoredSpecifiedInsighterRole,
    "writeStoredSpecifiedInsighterUuid",
    ()=>writeStoredSpecifiedInsighterUuid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
;
const specifiedInsighterQueryParam = 'specified_insighter';
const specifiedInsighterRoleQueryParam = 'specified_insighter_role';
const specifiedInsighterProfileUuidQueryParam = 'specified_insighter_profile_uuid';
const specifiedInsighterDisplayUpdatedEvent = 'specified-insighter-display-updated';
function normalizeSpecifiedInsighterUuid(value) {
    if (typeof value === 'string') return value.trim();
    if (typeof value === 'number' && Number.isFinite(value)) return String(value);
    return '';
}
function normalizeSpecifiedInsighterRole(value) {
    return value === 'company' ? 'company' : 'insighter';
}
function readStoredSpecifiedInsighterUuid(locale) {
    if ("TURBOPACK compile-time truthy", 1) return '';
    //TURBOPACK unreachable
    ;
}
function writeStoredSpecifiedInsighterUuid(locale, insighterUuid) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    const normalizedInsighterUuid = undefined;
}
function readStoredSpecifiedInsighterRole(locale) {
    if ("TURBOPACK compile-time truthy", 1) return 'insighter';
    //TURBOPACK unreachable
    ;
}
function writeStoredSpecifiedInsighterRole(locale, role) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function readStoredSpecifiedInsighterProfileUuid(locale) {
    if ("TURBOPACK compile-time truthy", 1) return '';
    //TURBOPACK unreachable
    ;
}
function writeStoredSpecifiedInsighterProfileUuid(locale, profileUuid) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    const normalizedProfileUuid = undefined;
}
function readStoredSpecifiedInsighterDisplay(locale) {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
}
function writeStoredSpecifiedInsighterDisplay(locale, display) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    const uuid = undefined;
    const name = undefined;
}
function clearStoredSpecifiedInsighterDisplay(locale) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function clearStoredSpecifiedInsighterUuid(locale) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function isSpecifiedInsighterProject(locale) {
    return Boolean(readStoredSpecifiedInsighterUuid(locale));
}
function getSpecifiedInsighterLabel(locale) {
    return locale === 'ar' ? 'خبير محدد' : 'Specified Insighter';
}
}),
"[project]/app/utils/textUtils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Checks if the first word in a text string is Arabic
 * Arabic characters are in the Unicode range U+0600 to U+06FF
 * @param text - The text string to check
 * @returns true if the first word contains Arabic characters, false otherwise
 */ __turbopack_context__.s([
    "isFirstWordArabic",
    ()=>isFirstWordArabic
]);
function isFirstWordArabic(text) {
    if (!text || typeof text !== 'string') {
        return false;
    }
    // Trim whitespace and get the first word
    const trimmedText = text.trim();
    if (!trimmedText) {
        return false;
    }
    // Extract the first word (split by whitespace and take the first non-empty part)
    const firstWord = trimmedText.split(/\s+/)[0];
    if (!firstWord) {
        return false;
    }
    // Remove punctuation and special characters from the beginning/end of the word
    // Using character classes compatible with ES5 (no Unicode property escapes)
    // Matches any character that is NOT a letter (English or Arabic), number, or Arabic character
    const cleanedWord = firstWord.replace(/^[^a-zA-Z0-9\u0600-\u06FF]+|[^a-zA-Z0-9\u0600-\u06FF]+$/g, '');
    if (!cleanedWord) {
        return false;
    }
    // Check if the word contains Arabic characters (Unicode range U+0600 to U+06FF)
    // This includes Arabic letters, numbers, and diacritics
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(cleanedWord);
}
}),
"[project]/components/feed/MyFeedsTimeline.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FeedCard",
    ()=>FeedCard,
    "FeedSkeleton",
    ()=>FeedSkeleton,
    "default",
    ()=>MyFeedsTimeline
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Badge$2f$Badge$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Badge/Badge.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Menu$2f$Menu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Menu/Menu.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Modal/Modal.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArticle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArticle$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconArticle.mjs [app-ssr] (ecmascript) <export default as IconArticle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBriefcase$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBriefcase$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBriefcase.mjs [app-ssr] (ecmascript) <export default as IconBriefcase>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronLeft$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconChevronLeft.mjs [app-ssr] (ecmascript) <export default as IconChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronRight$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconChevronRight.mjs [app-ssr] (ecmascript) <export default as IconChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDots$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDots$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconDots.mjs [app-ssr] (ecmascript) <export default as IconDots>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileDescription$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileDescription$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconFileDescription.mjs [app-ssr] (ecmascript) <export default as IconFileDescription>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconLoader2.mjs [app-ssr] (ecmascript) <export default as IconLoader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPhoto$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPhoto$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconPhoto.mjs [app-ssr] (ecmascript) <export default as IconPhoto>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTrash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTrash$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconTrash.mjs [app-ssr] (ecmascript) <export default as IconTrash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconUsers$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconUsers$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconUsers.mjs [app-ssr] (ecmascript) <export default as IconUsers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconVideo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconVideo$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconVideo.mjs [app-ssr] (ecmascript) <export default as IconVideo>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconX.mjs [app-ssr] (ecmascript) <export default as IconX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/formatDistanceToNow.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isValid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/isValid.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$ar$2d$SA$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/locale/ar-SA.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$en$2d$US$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/locale/en-US.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mux$2f$mux$2d$player$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@mux/mux-player/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$CourseIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/CourseIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$DataIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/DataIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$InsightIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/InsightIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$ManualIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/ManualIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$ReportIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/ReportIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$FeedShare$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/FeedShare.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$RoleUpgradeCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/RoleUpgradeCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$TopDocumentsCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/TopDocumentsCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/toast/ToastContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/header/hooks/useUserProfile.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/specifiedInsighterProject.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$textUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/textUtils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/feed.service.ts [app-ssr] (ecmascript)");
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
;
;
;
;
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
        title: 'My Posts',
        count: (count)=>`${count} ${count === 1 ? 'post' : 'posts'}`,
        loading: 'Loading your posts…',
        emptyTitle: 'No posts yet',
        emptyDescription: 'Your published posts and drafts will appear here.',
        loadError: 'We couldn’t load your posts.',
        tryAgain: 'Try again',
        loadMore: 'Load more',
        loadingMore: 'Loading…',
        views: 'views',
        shares: 'shares',
        viewInsight: 'View',
        openingInsight: 'Opening…',
        delete: 'Delete post',
        deleteTitle: 'Delete this post?',
        deleteDescription: 'This permanently removes the post and its uploaded media.',
        cancel: 'Cancel',
        deleting: 'Deleting…',
        deleted: 'Your post has been deleted.',
        deleteFailed: 'Unable to delete the post.',
        postActions: 'Post actions',
        imageAlt: 'Post image',
        articleCoverAlt: 'White Paper cover',
        article: 'White Paper',
        attachment: 'Open attachment',
        openImage: 'Open image',
        imageCount: (current, total)=>`Image ${current} of ${total}`,
        previousImage: 'Previous image',
        nextImage: 'Next image',
        closeImagePreview: 'Close image preview',
        meet: 'Meet',
        requestService: 'Request Service'
    },
    ar: {
        title: 'منشوراتي',
        count: (count)=>`${count} منشور`,
        loading: 'جارٍ تحميل منشوراتك…',
        emptyTitle: 'لا توجد منشورات بعد',
        emptyDescription: 'ستظهر منشوراتك المنشورة ومسوداتك هنا.',
        loadError: 'تعذر تحميل منشوراتك.',
        tryAgain: 'حاول مرة أخرى',
        loadMore: 'تحميل المزيد',
        loadingMore: 'جارٍ التحميل…',
        views: 'مشاهدة',
        shares: 'مشاركة',
        viewInsight: 'عرض',
        openingInsight: 'جارٍ الفتح…',
        delete: 'حذف المنشور',
        deleteTitle: 'حذف هذا المنشور؟',
        deleteDescription: 'سيؤدي هذا إلى حذف المنشور والوسائط المرفوعة نهائياً.',
        cancel: 'إلغاء',
        deleting: 'جارٍ الحذف…',
        deleted: 'تم حذف منشورك.',
        deleteFailed: 'تعذر حذف المنشور.',
        postActions: 'إجراءات المنشور',
        imageAlt: 'صورة المنشور',
        articleCoverAlt: 'غلاف الورقة البيضاء',
        article: 'ورقة بيضاء',
        attachment: 'فتح المرفق',
        openImage: 'فتح الصورة',
        imageCount: (current, total)=>`الصورة ${current} من ${total}`,
        previousImage: 'الصورة السابقة',
        nextImage: 'الصورة التالية',
        closeImagePreview: 'إغلاق معاينة الصورة',
        meet: 'اجتماع',
        requestService: 'طلب خدمة'
    }
};
function stripHtml(html) {
    if ("TURBOPACK compile-time truthy", 1) {
        return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    }
    //TURBOPACK unreachable
    ;
    const doc = undefined;
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
function formatPostDate(value, locale) {
    if (!value) return null;
    const date = new Date(value.includes('T') ? value : value.replace(' ', 'T'));
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isValid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValid"])(date)) return value;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDistanceToNow"])(date, {
        addSuffix: true,
        locale: locale === 'ar' ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$ar$2d$SA$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["arSA"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$en$2d$US$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enUS"]
    });
}
function FeedSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        "aria-hidden": true,
        children: [
            0,
            1
        ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-pulse rounded-lg border border-[#DCE4EF] bg-white p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-4 w-40 rounded bg-slate-100"
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 168,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-8 w-8 rounded bg-slate-100"
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 169,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 167,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 h-4 w-full rounded bg-slate-100"
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 171,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 h-4 w-3/4 rounded bg-slate-100"
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 172,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 aspect-[16/6] rounded-md bg-slate-100"
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 173,
                        columnNumber: 11
                    }, this)
                ]
            }, item, true, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 166,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
        lineNumber: 164,
        columnNumber: 5
    }, this);
}
function ImageGallery({ media, imageAlt, locale, flushBottom = false }) {
    const isSingleImage = media.length === 1;
    const isTwoImageLayout = media.length === 2;
    const hasInlineCarousel = media.length > 2;
    const isArabic = locale === 'ar';
    const copy = copyByLocale[isArabic ? 'ar' : 'en'];
    const [activeImageIndex, setActiveImageIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [carouselIndex, setCarouselIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const carouselRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const carouselFrameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const activeMedia = activeImageIndex === null ? null : media[activeImageIndex];
    const isCarousel = media.length > 1;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setCarouselIndex(0);
        return ()=>{
            if (carouselFrameRef.current !== null) {
                window.cancelAnimationFrame(carouselFrameRef.current);
            }
        };
    }, [
        media.length
    ]);
    const goToCarouselImage = (nextIndex)=>{
        const boundedIndex = Math.max(0, Math.min(nextIndex, media.length - 1));
        const slide = carouselRef.current?.querySelector(`[data-feed-image-index="${boundedIndex}"]`);
        slide?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
        setCarouselIndex(boundedIndex);
    };
    const updateCarouselIndex = ()=>{
        if (carouselFrameRef.current !== null) return;
        carouselFrameRef.current = window.requestAnimationFrame(()=>{
            carouselFrameRef.current = null;
            const carousel = carouselRef.current;
            if (!carousel) return;
            const carouselCenter = carousel.getBoundingClientRect().left + carousel.clientWidth / 2;
            let closestIndex = 0;
            let closestDistance = Number.POSITIVE_INFINITY;
            carousel.querySelectorAll('[data-feed-image-index]').forEach((slide)=>{
                const bounds = slide.getBoundingClientRect();
                const distance = Math.abs(bounds.left + bounds.width / 2 - carouselCenter);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = Number(slide.dataset.feedImageIndex ?? 0);
                }
            });
            setCarouselIndex(closestIndex);
        });
    };
    const showPreviousImage = ()=>{
        setActiveImageIndex((current)=>current === null ? 0 : (current - 1 + media.length) % media.length);
    };
    const showNextImage = ()=>{
        setActiveImageIndex((current)=>current === null ? 0 : (current + 1) % media.length);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            isSingleImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `-mx-5 mt-5 overflow-hidden border-y border-[#E0E7F0] bg-[#F6F9FD] sm:-mx-6 ${flushBottom ? '-mb-5 rounded-b-lg sm:-mb-6' : ''}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>setActiveImageIndex(0),
                    "aria-label": copy.openImage,
                    className: "relative flex w-full cursor-zoom-in items-center justify-center overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2378E8]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: media[0].url ?? '',
                        alt: media[0].name || imageAlt,
                        loading: "lazy",
                        className: "block h-auto max-w-full object-contain",
                        style: {
                            maxHeight: 'min(650px, 70dvh)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 275,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                    lineNumber: 269,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 264,
                columnNumber: 9
            }, this),
            isTwoImageLayout && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `-mx-5 mt-5 grid grid-cols-2 gap-1.5 overflow-hidden border-y border-[#E0E7F0] bg-white sm:-mx-6 ${flushBottom ? '-mb-5 rounded-b-lg sm:-mb-6' : ''}`,
                dir: isArabic ? 'rtl' : 'ltr',
                children: media.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setActiveImageIndex(index),
                        "aria-label": `${copy.openImage}: ${copy.imageCount(index + 1, media.length)}`,
                        className: "relative aspect-square cursor-zoom-in overflow-hidden rounded-md bg-[#101724] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2378E8]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: item.url ?? '',
                            alt: item.name || imageAlt,
                            loading: "lazy",
                            className: "h-full w-full object-contain"
                        }, void 0, false, {
                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                            lineNumber: 301,
                            columnNumber: 15
                        }, this)
                    }, item.id, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 294,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 287,
                columnNumber: 9
            }, this),
            hasInlineCarousel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `relative -mx-5 mt-5 overflow-hidden border-y border-[#D9E2ED] bg-[#E9EEF5] py-1.5 sm:-mx-6 ${flushBottom ? '-mb-5 rounded-b-lg sm:-mb-6' : ''}`,
                dir: isArabic ? 'rtl' : 'ltr',
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: carouselRef,
                        role: "region",
                        "aria-label": copy.imageCount(carouselIndex + 1, media.length),
                        tabIndex: 0,
                        onScroll: updateCarouselIndex,
                        onKeyDown: (event)=>{
                            if (event.key === 'ArrowLeft') {
                                event.preventDefault();
                                goToCarouselImage(carouselIndex + (isArabic ? 1 : -1));
                            }
                            if (event.key === 'ArrowRight') {
                                event.preventDefault();
                                goToCarouselImage(carouselIndex + (isArabic ? -1 : 1));
                            }
                        },
                        className: "flex snap-x snap-mandatory gap-1.5 overflow-x-auto pe-[8%] ps-0 [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2378E8] [&::-webkit-scrollbar]:hidden sm:pe-[12%]",
                        children: media.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "data-feed-image-index": index,
                                onClick: ()=>setActiveImageIndex(index),
                                "aria-label": `${copy.openImage}: ${copy.imageCount(index + 1, media.length)}`,
                                className: "relative aspect-[4/3] w-[84%] shrink-0 snap-center cursor-zoom-in overflow-hidden rounded-md bg-[#101724] shadow-sm focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white sm:w-[76%]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: item.url ?? '',
                                    alt: item.name || imageAlt,
                                    loading: "lazy",
                                    className: "h-full w-full object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                    lineNumber: 346,
                                    columnNumber: 17
                                }, this)
                            }, item.id, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 338,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 319,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "pointer-events-none absolute end-3 top-3 rounded-md bg-[#101724]/80 px-2 py-1 text-xs font-semibold tabular-nums text-white shadow-sm backdrop-blur-sm",
                        "aria-live": "polite",
                        children: [
                            carouselIndex + 1,
                            "/",
                            media.length
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 356,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>goToCarouselImage(carouselIndex - 1),
                        disabled: carouselIndex === 0,
                        "aria-label": copy.previousImage,
                        className: "absolute start-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#253247] shadow-md transition hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] disabled:pointer-events-none disabled:opacity-0 sm:flex",
                        children: isArabic ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronRight$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronRight$3e$__["IconChevronRight"], {
                            "aria-hidden": true,
                            className: "h-5 w-5"
                        }, void 0, false, {
                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                            lineNumber: 370,
                            columnNumber: 25
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronLeft$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronLeft$3e$__["IconChevronLeft"], {
                            "aria-hidden": true,
                            className: "h-5 w-5"
                        }, void 0, false, {
                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                            lineNumber: 370,
                            columnNumber: 80
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 363,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>goToCarouselImage(carouselIndex + 1),
                        disabled: carouselIndex === media.length - 1,
                        "aria-label": copy.nextImage,
                        className: "absolute end-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#253247] shadow-md transition hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] disabled:pointer-events-none disabled:opacity-0 sm:flex",
                        children: isArabic ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronLeft$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronLeft$3e$__["IconChevronLeft"], {
                            "aria-hidden": true,
                            className: "h-5 w-5"
                        }, void 0, false, {
                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                            lineNumber: 379,
                            columnNumber: 25
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronRight$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronRight$3e$__["IconChevronRight"], {
                            "aria-hidden": true,
                            className: "h-5 w-5"
                        }, void 0, false, {
                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                            lineNumber: 379,
                            columnNumber: 79
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 372,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 313,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Modal"], {
                opened: activeMedia !== null,
                onClose: ()=>setActiveImageIndex(null),
                centered: true,
                size: "xl",
                padding: 0,
                yOffset: 24,
                withCloseButton: false,
                overlayProps: {
                    backgroundOpacity: 0.72,
                    blur: 3
                },
                classNames: {
                    content: 'overflow-hidden bg-[#101724]',
                    body: 'p-0'
                },
                styles: {
                    content: {
                        overflowY: 'hidden'
                    }
                },
                children: activeMedia && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative flex min-h-[220px] items-center justify-center bg-[#101724]",
                    dir: isArabic ? 'rtl' : 'ltr',
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setActiveImageIndex(null),
                            "aria-label": copy.closeImagePreview,
                            className: "absolute end-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#101724] shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#101724]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__["IconX"], {
                                "aria-hidden": true,
                                className: "h-5 w-5",
                                stroke: 2.2
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 407,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                            lineNumber: 401,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: activeMedia.url ?? '',
                            alt: activeMedia.name || imageAlt,
                            className: "block max-w-[92vw] object-contain",
                            style: {
                                maxHeight: 'calc(100dvh - 48px)'
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                            lineNumber: 409,
                            columnNumber: 13
                        }, this),
                        isCarousel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: showPreviousImage,
                                    "aria-label": copy.previousImage,
                                    className: "absolute start-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white shadow-lg transition-colors hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:start-5",
                                    children: isArabic ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronRight$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronRight$3e$__["IconChevronRight"], {
                                        "aria-hidden": true,
                                        className: "h-6 w-6"
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                        lineNumber: 424,
                                        columnNumber: 31
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronLeft$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronLeft$3e$__["IconChevronLeft"], {
                                        "aria-hidden": true,
                                        className: "h-6 w-6"
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                        lineNumber: 424,
                                        columnNumber: 86
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                    lineNumber: 418,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: showNextImage,
                                    "aria-label": copy.nextImage,
                                    className: "absolute end-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white shadow-lg transition-colors hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:end-5",
                                    children: isArabic ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronLeft$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronLeft$3e$__["IconChevronLeft"], {
                                        "aria-hidden": true,
                                        className: "h-6 w-6"
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                        lineNumber: 432,
                                        columnNumber: 31
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronRight$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronRight$3e$__["IconChevronRight"], {
                                        "aria-hidden": true,
                                        className: "h-6 w-6"
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                        lineNumber: 432,
                                        columnNumber: 85
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                    lineNumber: 426,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white",
                                    dir: "auto",
                                    children: copy.imageCount((activeImageIndex ?? 0) + 1, media.length)
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                    lineNumber: 434,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                    lineNumber: 400,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 384,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
function VideoPlayer({ media, title, flushBottom = false }) {
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [shouldPreload, setShouldPreload] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isInViewport, setIsInViewport] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const container = containerRef.current;
        if (!container || !media.provider_playback_id) return;
        // Mount and buffer roughly one screen before the card becomes visible.
        // Keeping this window bounded avoids loading every video in a long feed.
        const preloadObserver = new IntersectionObserver(([entry])=>setShouldPreload(entry.isIntersecting), {
            rootMargin: '100% 0px'
        });
        const playbackObserver = new IntersectionObserver(([entry])=>setIsInViewport(entry.isIntersecting), {
            threshold: 0.01
        });
        preloadObserver.observe(container);
        playbackObserver.observe(container);
        return ()=>{
            preloadObserver.disconnect();
            playbackObserver.disconnect();
        };
    }, [
        media.provider_playback_id
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const player = containerRef.current?.querySelector('mux-player');
        if (!player) return;
        if (isInViewport) {
            void player.play().catch(()=>{
            // Autoplay can still be blocked by browser or device policy.
            });
        } else {
            player.pause();
        }
    }, [
        isInViewport,
        shouldPreload
    ]);
    if (media.provider_playback_id) {
        // Reserve the box at the video's real aspect ratio so it doesn't collapse
        // to a tiny height before Mux loads metadata (avoids the layout shift where
        // the player snaps to full size on scroll/playback). Falls back to 16/9.
        const aspectRatio = media.width && media.height ? `${media.width} / ${media.height}` : '16 / 9';
        // Portrait videos are bound by height (the maxHeight cap) so the width is
        // derived and the box stays narrow; landscape videos fill the card width.
        const isPortrait = !!(media.width && media.height && media.height > media.width);
        return(// Full-width black band that letterboxes and centers the video box.
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `-mx-5 mt-5 flex justify-center overflow-hidden bg-black sm:-mx-6 ${flushBottom ? '-mb-5 rounded-b-lg sm:-mb-6' : ''}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                style: {
                    aspectRatio,
                    maxHeight: 'min(650px, 70dvh)',
                    ...isPortrait ? {
                        height: 'min(650px, 70dvh)',
                        width: 'auto',
                        maxWidth: '100%'
                    } : {
                        width: '100%'
                    }
                },
                children: shouldPreload && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mux-player", {
                    "playback-id": media.provider_playback_id,
                    "stream-type": "on-demand",
                    "metadata-video-title": title,
                    "accent-color": "#2378E8",
                    "disable-tracking": "",
                    preload: "auto",
                    "max-resolution": "720p",
                    muted: true,
                    loop: true,
                    playsinline: true,
                    style: {
                        width: '100%',
                        height: '100%',
                        display: 'block'
                    }
                }, void 0, false, {
                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                    lineNumber: 517,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 506,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
            lineNumber: 503,
            columnNumber: 7
        }, this));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-5 flex aspect-video items-center justify-center rounded-md bg-[#101724] text-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconVideo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconVideo$3e$__["IconVideo"], {
            "aria-hidden": true,
            className: "h-9 w-9",
            stroke: 1.5
        }, void 0, false, {
            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
            lineNumber: 538,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
        lineNumber: 537,
        columnNumber: 5
    }, this);
}
function ArticlePreview({ item, cover, locale, isPublic, flushBottom = false }) {
    const isArabic = locale === 'ar';
    const copy = copyByLocale[isArabic ? 'ar' : 'en'];
    const articleText = stripHtml(item.excerpt || item.body || '');
    const isArticleTitleArabic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$textUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isFirstWordArabic"])(item.title ?? '');
    const isArticleTextArabic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$textUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isFirstWordArabic"])(articleText);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: isPublic && item.slug ? `/${locale}/article/${item.slug}` : `/${locale}/article/${item.uuid}?source=my-feeds`,
        "aria-label": `${copy.article}: ${item.title ?? articleText}`,
        className: `group -mx-5 mt-5 block overflow-hidden border-y border-[#DCE4ED] bg-[#F3F6F8] transition-colors hover:bg-[#EDF2F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2378E8] sm:-mx-6 ${flushBottom ? '-mb-5 rounded-b-lg sm:-mb-6' : ''}`,
        children: [
            cover?.url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative aspect-[1.91/1] w-full overflow-hidden bg-[#E8EDF2]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: cover.url,
                    alt: cover.name || item.title || copy.articleCoverAlt,
                    loading: "lazy",
                    className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
                }, void 0, false, {
                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                    lineNumber: 576,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 575,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex aspect-[1.91/1] w-full items-center justify-center bg-[linear-gradient(135deg,#EAF1F8_0%,#DCE8F4_100%)] text-[#6C829E]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArticle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArticle$3e$__["IconArticle"], {
                    "aria-hidden": true,
                    className: "h-12 w-12",
                    stroke: 1.3
                }, void 0, false, {
                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                    lineNumber: 585,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 584,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-5 py-4 sm:px-6 sm:py-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#5D7089]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArticle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArticle$3e$__["IconArticle"], {
                                "aria-hidden": true,
                                className: "h-4 w-4 text-[#2378E8]",
                                stroke: 1.8
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 591,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: copy.article
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 592,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 590,
                        columnNumber: 9
                    }, this),
                    item.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        dir: isArticleTitleArabic ? 'rtl' : 'ltr',
                        className: `mt-2.5 text-[20px] font-bold leading-7 tracking-[-0.025em] text-[#101724] sm:text-[22px] sm:leading-8 ${isArticleTitleArabic ? 'text-right' : 'text-left'}`,
                        children: item.title
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 596,
                        columnNumber: 11
                    }, this),
                    articleText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        dir: isArticleTextArabic ? 'rtl' : 'ltr',
                        className: `mt-1.5 line-clamp-2 text-[14px] leading-6 text-[#56677E] sm:text-[15px] ${isArticleTextArabic ? 'text-right' : 'text-left'}`,
                        children: articleText
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 605,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 589,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
        lineNumber: 563,
        columnNumber: 5
    }, this);
}
function RelatedInsightIcon({ type }) {
    switch(type){
        case 'report':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$ReportIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                width: 16,
                height: 16
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 620,
                columnNumber: 14
            }, this);
        case 'manual':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$ManualIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                width: 16,
                height: 16
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 622,
                columnNumber: 14
            }, this);
        case 'statistic':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$InsightIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                width: 16,
                height: 16
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 624,
                columnNumber: 14
            }, this);
        case 'data':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$DataIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                width: 16,
                height: 16
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 626,
                columnNumber: 14
            }, this);
        case 'course':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$CourseIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                width: 16,
                height: 16
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 628,
                columnNumber: 14
            }, this);
        default:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$InsightIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                width: 16,
                height: 16
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 630,
                columnNumber: 14
            }, this);
    }
}
function FeedCard({ item, locale, onDelete, articleAccess = 'owner' }) {
    const isArabic = locale === 'ar';
    const copy = copyByLocale[isArabic ? 'ar' : 'en'];
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserProfile"])();
    const [openingInsight, setOpeningInsight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const date = formatPostDate(item.published_at ?? item.created_at, locale);
    const isArticle = item.content_type === 'article';
    const isPostTitleArabic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$textUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isFirstWordArabic"])(item.title ?? '');
    const isPostBodyArabic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$textUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isFirstWordArabic"])(item.body ?? '');
    const imageMedia = item.media.filter((media)=>media.media_type === 'image' && media.url);
    const articleCover = isArticle ? imageMedia[0] : undefined;
    const videoMedia = item.media.find((media)=>media.media_type === 'video');
    const attachments = item.media.filter((media)=>media.media_type === 'attachment' && media.url);
    const hasPostMedia = Boolean(videoMedia) || imageMedia.length > 0;
    const showEngagementActions = articleAccess === 'community' && Boolean(item.insighter);
    const isMediaLast = attachments.length === 0 && item.related_insights.length === 0 && !showEngagementActions;
    const statusTone = item.status === 'published' ? 'bg-[#EAF8F1] text-[#168A55]' : item.status === 'failed' ? 'bg-[#FFF0EE] text-[#B53B32]' : 'bg-[#FFF5E5] text-[#A96710]';
    const insighter = item.insighter;
    const initials = insighter ? insighter.name.split(' ').filter(Boolean).slice(0, 2).map((part)=>part[0]).join('').toUpperCase() : '';
    // Community-feed engagement actions (Meet / Request Service / Share) are only
    // meaningful when viewing someone else's published post in the public feed.
    // `showEngagementActions` is derived above (near the media flags).
    const isOwnPost = Boolean(user?.uuid && insighter && user.uuid === insighter.uuid);
    const meetHref = insighter ? `/${locale}/profile/${insighter.uuid}?entity=insighter&tab=meet` : '';
    const requestServiceHref = insighter ? `/${locale}/project/wizard/project-type?${new URLSearchParams({
        fresh: '1',
        [__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["specifiedInsighterQueryParam"]]: insighter.uuid,
        [__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["specifiedInsighterRoleQueryParam"]]: 'insighter',
        [__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["specifiedInsighterProfileUuidQueryParam"]]: insighter.uuid
    }).toString()}` : '';
    const shareUrl = isArticle ? `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publicBaseUrl"]}/${locale}/article/${item.slug ?? item.uuid}` : `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publicBaseUrl"]}/${locale}/post/${item.uuid}`;
    const shareTitle = item.title?.trim() || stripHtml(item.body ?? '').slice(0, 120) || insighter?.name || '';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "relative overflow-visible rounded-lg border border-[#D9E3EF] bg-white px-5 py-5 sm:px-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex min-h-9 items-start justify-between gap-2 sm:gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0",
                        children: insighter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#E7F0FE]",
                                    children: insighter.profile_photo_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: insighter.profile_photo_url,
                                        alt: insighter.name,
                                        className: "h-full w-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                        lineNumber: 708,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex h-full w-full items-center justify-center text-[13px] font-bold text-[#2378E8]",
                                        children: initials || 'I'
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                        lineNumber: 714,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                    lineNumber: 706,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/${locale}/profile/${insighter.uuid}?entity=insighter`,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "block truncate text-[14px] font-semibold text-[#101724] transition-colors hover:text-[#2378E8] hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-1",
                                            children: insighter.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                            lineNumber: 720,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-nowrap items-center gap-x-1.5 text-[12.5px] text-[#7A8BA4]",
                                            children: [
                                                item.industry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: `/${locale}/sub-industry/${item.industry.id}/${item.industry.slug}`,
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    className: "min-w-0 truncate font-medium text-[#2378E8] hover:underline",
                                                    children: item.industry.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                    lineNumber: 730,
                                                    columnNumber: 21
                                                }, this),
                                                date && item.industry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    "aria-hidden": true,
                                                    className: "shrink-0",
                                                    children: "·"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                    lineNumber: 739,
                                                    columnNumber: 45
                                                }, this),
                                                date && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                                                    dateTime: item.published_at ?? item.created_at ?? undefined,
                                                    className: "shrink-0 whitespace-nowrap",
                                                    children: date
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                    lineNumber: 741,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                            lineNumber: 728,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                    lineNumber: 719,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                            lineNumber: 705,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 703,
                        columnNumber: 9
                    }, this),
                    onDelete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex shrink-0 items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusTone}`,
                                children: item.status_label
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 756,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Menu$2f$Menu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Menu"], {
                                shadow: "md",
                                width: 170,
                                position: isArabic ? 'bottom-start' : 'bottom-end',
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Menu$2f$Menu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Menu"].Target, {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            "aria-label": copy.postActions,
                                            className: "flex h-9 w-9 items-center justify-center rounded-full text-[#8FA0B7] transition-colors hover:bg-[#F1F5FA] hover:text-[#253247] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDots$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDots$3e$__["IconDots"], {
                                                "aria-hidden": true,
                                                className: "h-5 w-5",
                                                stroke: 2.2
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                lineNumber: 767,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                            lineNumber: 762,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                        lineNumber: 761,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Menu$2f$Menu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Menu"].Dropdown, {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Menu$2f$Menu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Menu"].Item, {
                                            color: "red",
                                            leftSection: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTrash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTrash$3e$__["IconTrash"], {
                                                "aria-hidden": true,
                                                className: "h-4 w-4",
                                                stroke: 1.8
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                lineNumber: 773,
                                                columnNumber: 32
                                            }, void 0),
                                            onClick: ()=>onDelete(item),
                                            children: copy.delete
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                            lineNumber: 771,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                        lineNumber: 770,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 760,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 755,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 702,
                columnNumber: 7
            }, this),
            !isArticle && item.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                dir: isPostTitleArabic ? 'rtl' : 'ltr',
                className: `mt-4 text-[19px] font-bold leading-7 tracking-[-0.02em] text-[#101724] ${isPostTitleArabic ? 'text-right' : 'text-left'}`,
                children: item.title
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 785,
                columnNumber: 9
            }, this),
            !isArticle && item.body && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                dir: isPostBodyArabic ? 'rtl' : 'ltr',
                className: `${item.title ? 'mt-2' : 'mt-4'} whitespace-pre-wrap text-[13px] leading-[1.2rem] text-[#1C2433] sm:text-[16px] sm:leading-7 ${isPostBodyArabic ? 'text-right' : 'text-left'}`,
                children: item.body
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 794,
                columnNumber: 9
            }, this),
            isArticle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ArticlePreview, {
                item: item,
                cover: articleCover,
                locale: locale,
                isPublic: articleAccess === 'community',
                flushBottom: isMediaLast
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 803,
                columnNumber: 9
            }, this),
            !isArticle && videoMedia && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VideoPlayer, {
                media: videoMedia,
                title: item.title ?? item.body ?? 'Video',
                flushBottom: isMediaLast
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 812,
                columnNumber: 36
            }, this),
            !isArticle && imageMedia.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageGallery, {
                media: imageMedia,
                imageAlt: copy.imageAlt,
                locale: locale,
                flushBottom: isMediaLast
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 813,
                columnNumber: 47
            }, this),
            attachments.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 space-y-2",
                children: attachments.map((attachment)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: attachment.url ?? '#',
                        target: "_blank",
                        rel: "noreferrer",
                        className: "flex items-center gap-3 rounded-md border border-[#DDE6F1] bg-[#F8FAFD] px-4 py-3 text-[13px] font-medium text-[#2378E8] transition-colors hover:bg-[#F1F6FD]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileDescription$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileDescription$3e$__["IconFileDescription"], {
                                "aria-hidden": true,
                                className: "h-5 w-5",
                                stroke: 1.7
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 825,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "min-w-0 flex-1 truncate",
                                children: attachment.name ?? copy.attachment
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 826,
                                columnNumber: 15
                            }, this)
                        ]
                    }, attachment.id, true, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 818,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 816,
                columnNumber: 9
            }, this),
            item.related_insights.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `-mx-5 ${hasPostMedia ? 'mt-0' : 'mt-5'} divide-y divide-[#E7EDF5] overflow-hidden border-t border-[#E7EDF5] sm:-mx-6 ${showEngagementActions ? 'border-b' : '-mb-5 rounded-b-lg sm:-mb-6'}`,
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RelatedInsightIcon, {
                                                    type: insight.type
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                    lineNumber: 854,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "rounded-full bg-[#0B315D]/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.05em] text-[#67B5F6] backdrop-blur-sm",
                                                    children: insight.type
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                    lineNumber: 855,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                            lineNumber: 853,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            dir: "auto",
                                            className: "mt-4 line-clamp-3 text-start text-[15px] font-semibold leading-6 text-white transition-colors group-hover:text-[#A8D5FF] sm:text-[16px]",
                                            children: insight.title
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                            lineNumber: 859,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                    lineNumber: 852,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 845,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex min-h-[130px] min-w-0 flex-1 flex-col justify-center bg-white px-4 py-4 sm:min-h-[155px] sm:px-5",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0",
                                    children: [
                                        insight.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            dir: "auto",
                                            className: "line-clamp-3 text-[13px] leading-[1.2rem] text-[#667894] sm:text-[14px]",
                                            children: stripHtml(insight.description)
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                            lineNumber: 871,
                                            columnNumber: 21
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
                                                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                        lineNumber: 881,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                    lineNumber: 880,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                    lineNumber: 883,
                                                    columnNumber: 25
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
                                                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                                lineNumber: 899,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                "aria-live": "polite",
                                                                children: copy.openingInsight
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                                lineNumber: 900,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true) : copy.viewInsight
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                    lineNumber: 884,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                            lineNumber: 878,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                    lineNumber: 869,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 868,
                                columnNumber: 15
                            }, this)
                        ]
                    }, `${insight.type}-${insight.slug}`, true, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 841,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 833,
                columnNumber: 9
            }, this),
            showEngagementActions && insighter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex items-center justify-around border-t border-[#EEF2F7] pt-2",
                dir: isArabic ? 'rtl' : 'ltr',
                children: [
                    !isOwnPost && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: meetHref,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "inline-flex flex-1 items-center justify-center gap-2 rounded-md px-2 py-2.5 text-[14px] font-medium text-[#5A6B85] transition-colors hover:bg-[#F5F8FC] hover:text-[#101724] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconUsers$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconUsers$3e$__["IconUsers"], {
                                "aria-hidden": true,
                                className: "h-[18px] w-[18px] text-[#2378E8]",
                                stroke: 1.8
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 927,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: copy.meet
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 928,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 921,
                        columnNumber: 13
                    }, this),
                    !isOwnPost && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: requestServiceHref,
                        className: "inline-flex flex-1 items-center justify-center gap-2 rounded-md px-2 py-2.5 text-[14px] font-medium text-[#5A6B85] transition-colors hover:bg-[#F5F8FC] hover:text-[#101724] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBriefcase$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBriefcase$3e$__["IconBriefcase"], {
                                "aria-hidden": true,
                                className: "h-[18px] w-[18px] text-[#16A34A]",
                                stroke: 1.8
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 937,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: copy.requestService
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 938,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 933,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$FeedShare$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        shareUrl: shareUrl,
                        shareTitle: shareTitle,
                        authorName: insighter.name,
                        authorPhotoUrl: insighter.profile_photo_url,
                        locale: locale,
                        shareKind: isArticle ? 'white-paper' : 'post'
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 942,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 916,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
        lineNumber: 701,
        columnNumber: 5
    }, this);
}
function MyFeedsTimeline({ locale }) {
    const isArabic = locale === 'ar';
    const copy = copyByLocale[isArabic ? 'ar' : 'en'];
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const { user, roles, isAuthResolved } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserProfile"])();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [lastPage, setLastPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [total, setTotal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isLoadingMore, setIsLoadingMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loadError, setLoadError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deleteCandidate, setDeleteCandidate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isDeleting, setIsDeleting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const canViewOwnFeeds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>roles.some((role)=>[
                'insighter',
                'company',
                'company-insighter'
            ].includes(role)), [
        roles
    ]);
    const loadFirstPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (signal)=>{
        setIsLoading(true);
        setLoadError(false);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMyFeeds"])(1, locale, signal);
            setItems(result.data);
            setPage(result.meta.current_page);
            setLastPage(result.meta.last_page);
            setTotal(result.meta.total);
        } catch (error) {
            if (error instanceof DOMException && error.name === 'AbortError') return;
            setLoadError(true);
        } finally{
            if (!signal?.aborted) setIsLoading(false);
        }
    }, [
        locale
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isAuthResolved || !user || !canViewOwnFeeds) {
            if (isAuthResolved) setIsLoading(false);
            return;
        }
        const controller = new AbortController();
        void loadFirstPage(controller.signal);
        return ()=>controller.abort();
    }, [
        canViewOwnFeeds,
        isAuthResolved,
        loadFirstPage,
        user
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const refresh = ()=>void loadFirstPage();
        window.addEventListener('feed:published', refresh);
        return ()=>window.removeEventListener('feed:published', refresh);
    }, [
        loadFirstPage
    ]);
    const loadMore = async ()=>{
        if (isLoadingMore || page >= lastPage) return;
        setIsLoadingMore(true);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMyFeeds"])(page + 1, locale);
            setItems((previous)=>{
                const existing = new Set(previous.map((item)=>item.uuid));
                return [
                    ...previous,
                    ...result.data.filter((item)=>!existing.has(item.uuid))
                ];
            });
            setPage(result.meta.current_page);
            setLastPage(result.meta.last_page);
            setTotal(result.meta.total);
        } catch  {
            toast.error(copy.loadError);
        } finally{
            setIsLoadingMore(false);
        }
    };
    const confirmDelete = async ()=>{
        if (!deleteCandidate || isDeleting) return;
        setIsDeleting(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteFeedItem"])(deleteCandidate.uuid, locale);
            setItems((previous)=>previous.filter((item)=>item.uuid !== deleteCandidate.uuid));
            setTotal((previous)=>Math.max(0, previous - 1));
            setDeleteCandidate(null);
            toast.success(copy.deleted);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : copy.deleteFailed);
        } finally{
            setIsDeleting(false);
        }
    };
    if (!isAuthResolved || isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            "aria-label": copy.loading,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FeedSkeleton, {}, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 1054,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
            lineNumber: 1053,
            columnNumber: 7
        }, this);
    }
    if (loadError) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "rounded-lg border border-[#DCE4EF] bg-white px-6 py-12 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-[18px] font-bold text-[#101724]",
                    children: copy.loadError
                }, void 0, false, {
                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                    lineNumber: 1062,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>void loadFirstPage(),
                    className: "mt-4 min-h-10 rounded-md bg-[#2378E8] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#1B64C5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2",
                    children: copy.tryAgain
                }, void 0, false, {
                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                    lineNumber: 1063,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
            lineNumber: 1061,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-labelledby": "my-feeds-title",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 flex items-end justify-between gap-4 px-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        id: "my-feeds-title",
                        className: "text-[20px] font-semibold tracking-[-0.02em] text-[#101724]",
                        children: copy.title
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1077,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[12px] text-[#7A8BA4]",
                        children: copy.count(total)
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1080,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 1076,
                columnNumber: 7
            }, this),
            items.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-lg border border-[#DCE4EF] bg-white px-6 py-14 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EDF4FD] text-[#2378E8]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPhoto$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPhoto$3e$__["IconPhoto"], {
                            "aria-hidden": true,
                            className: "h-5 w-5",
                            stroke: 1.7
                        }, void 0, false, {
                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                            lineNumber: 1086,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1085,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mt-4 text-[18px] font-bold text-[#101724]",
                        children: copy.emptyTitle
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1088,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mx-auto mt-2 max-w-sm text-[13px] leading-6 text-[#64748B]",
                        children: copy.emptyDescription
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1089,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 1084,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: items.map((item, index)=>{
                    // Right-column widgets are hidden below xl, so weave them between
                    // posts (LinkedIn-style) on mobile/tablet. Positions clamp to the
                    // last post so short feeds still surface them.
                    const upgradeIndex = Math.min(1, items.length - 1);
                    const documentsIndex = Math.min(3, items.length - 1);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FeedCard, {
                                item: item,
                                locale: locale,
                                onDelete: setDeleteCandidate
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 1104,
                                columnNumber: 17
                            }, this),
                            index === upgradeIndex && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$RoleUpgradeCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                locale: locale,
                                className: "xl:hidden"
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 1106,
                                columnNumber: 19
                            }, this),
                            index === documentsIndex && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$TopDocumentsCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                locale: locale,
                                className: "xl:hidden"
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 1109,
                                columnNumber: 19
                            }, this)
                        ]
                    }, item.uuid, true, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1103,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 1094,
                columnNumber: 9
            }, this),
            page < lastPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>void loadMore(),
                disabled: isLoadingMore,
                className: "mt-4 flex min-h-11 w-full items-center justify-center rounded-lg border border-[#C8D8EB] bg-white px-4 text-[13px] font-semibold text-[#2378E8] transition-colors hover:bg-[#F5F9FE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] disabled:cursor-wait disabled:opacity-60",
                children: isLoadingMore ? copy.loadingMore : copy.loadMore
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 1118,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Modal"], {
                opened: deleteCandidate !== null,
                onClose: ()=>{
                    if (!isDeleting) setDeleteCandidate(null);
                },
                centered: true,
                size: "sm",
                radius: 8,
                title: copy.deleteTitle,
                closeOnClickOutside: !isDeleting,
                closeOnEscape: !isDeleting,
                styles: {
                    title: {
                        color: '#101724',
                        fontWeight: 700,
                        fontSize: 18
                    },
                    content: {
                        border: '1px solid #DCE4EF',
                        boxShadow: 'none'
                    }
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[13px] leading-6 text-[#64748B]",
                        children: copy.deleteDescription
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1144,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 flex justify-end gap-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setDeleteCandidate(null),
                                disabled: isDeleting,
                                className: "min-h-10 rounded-md border border-[#CAD6E5] px-4 text-[13px] font-semibold text-[#536680] transition-colors hover:bg-[#F5F8FC] disabled:opacity-50",
                                children: copy.cancel
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 1146,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>void confirmDelete(),
                                disabled: isDeleting,
                                className: "min-h-10 rounded-md bg-[#D6453D] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#B93831] disabled:cursor-wait disabled:opacity-60",
                                children: isDeleting ? copy.deleting : copy.delete
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 1154,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1145,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 1128,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
        lineNumber: 1075,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/feed/FeedSearchInsightsContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FeedSearchInsightsProvider",
    ()=>FeedSearchInsightsProvider,
    "useFeedSearchInsights",
    ()=>useFeedSearchInsights
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const FeedSearchInsightsContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function FeedSearchInsightsProvider({ children }) {
    const [insights, setInsights] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            insights,
            isLoading,
            setInsights,
            setIsLoading
        }), [
        insights,
        isLoading
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FeedSearchInsightsContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/feed/FeedSearchInsightsContext.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
function useFeedSearchInsights() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(FeedSearchInsightsContext);
    if (!context) {
        throw new Error('useFeedSearchInsights must be used within FeedSearchInsightsProvider.');
    }
    return context;
}
}),
"[project]/components/feed/RelatedDocumentsCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RelatedDocumentsCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$DocumentsListCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/DocumentsListCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$FeedSearchInsightsContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/FeedSearchInsightsContext.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
function RelatedDocumentsCard({ locale, className }) {
    const isRTL = locale === 'ar';
    const { insights, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$FeedSearchInsightsContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFeedSearchInsights"])();
    const copy = isRTL ? {
        title: 'مستندات ذات صلة',
        empty: 'لا توجد مستندات مرتبطة بهذا البحث.',
        openInNewTab: 'فتح في علامة تبويب جديدة'
    } : {
        title: 'Related documents',
        empty: 'No documents are related to this search.',
        openInNewTab: 'Open in a new tab'
    };
    const documents = insights.slice(0, 5).map((insight)=>({
            id: `${insight.type}-${insight.searchable_id}`,
            href: insight.url.startsWith('/') ? `/${locale}${insight.url}` : insight.url,
            type: insight.type,
            title: insight.title,
            language: insight.language
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$DocumentsListCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        locale: locale,
        title: copy.title,
        documents: documents,
        isLoading: isLoading,
        emptyText: copy.empty,
        openInNewTabLabel: copy.openInNewTab,
        className: className
    }, void 0, false, {
        fileName: "[project]/components/feed/RelatedDocumentsCard.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/feed/CommunityFeedTimeline.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CommunityFeedTimeline
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconLoader2.mjs [app-ssr] (ecmascript) <export default as IconLoader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLock$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLock$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconLock.mjs [app-ssr] (ecmascript) <export default as IconLock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPhoto$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPhoto$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconPhoto.mjs [app-ssr] (ecmascript) <export default as IconPhoto>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconSearch.mjs [app-ssr] (ecmascript) <export default as IconSearch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/toast/ToastContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/header/hooks/useUserProfile.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$industries$2f$useAllIndustries$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/industries/useAllIndustries.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/feed.service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$MyFeedsTimeline$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/MyFeedsTimeline.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$FeedSearchInsightsContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/FeedSearchInsightsContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$RoleUpgradeCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/RoleUpgradeCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$TopDocumentsCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/TopDocumentsCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$RelatedDocumentsCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/RelatedDocumentsCard.tsx [app-ssr] (ecmascript)");
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
;
;
;
;
;
;
;
const copyByLocale = {
    en: {
        title: 'Community feed',
        loading: 'Loading community posts…',
        emptyTitle: 'No community posts yet',
        emptyDescription: 'Published posts from Insighta experts will appear here.',
        loadError: 'We couldn’t load the community feed.',
        tryAgain: 'Try again',
        loginTitle: 'Keep exploring the community',
        loginDescription: 'Log in to see your personalized feed and keep scrolling.',
        login: 'Log in to see more',
        signup: 'Create an account',
        loadingMore: 'Loading more posts…',
        endOfFeed: 'You’re all caught up.',
        sessionRefreshed: 'Your feed was refreshed because the previous session expired.',
        searchResults: 'Search results',
        searchFor: 'Matches for',
        allIndustries: 'All industries',
        allContent: 'All content',
        posts: 'Posts',
        articles: 'White Papers',
        noMatchesTitle: 'No feed matches found',
        noMatchesDescription: 'Try a broader keyword or remove one of the filters.',
        noMoreMatches: 'You’ve reached the end of these results.',
        moreFromCommunity: 'More from the community',
        searchSessionRefreshed: 'Your search was refreshed because the previous session expired.',
        searchLoginDescription: 'Log in to search posts, White Papers, and expert insights.'
    },
    ar: {
        title: 'موجز المجتمع',
        loading: 'جارٍ تحميل منشورات المجتمع…',
        emptyTitle: 'لا توجد منشورات في المجتمع بعد',
        emptyDescription: 'ستظهر هنا المنشورات التي ينشرها خبراء إنسايتا.',
        loadError: 'تعذر تحميل موجز المجتمع.',
        tryAgain: 'حاول مرة أخرى',
        loginTitle: 'واصل استكشاف المجتمع',
        loginDescription: 'سجّل الدخول لعرض موجزك المخصص ومتابعة التصفح.',
        login: 'سجّل الدخول لعرض المزيد',
        signup: 'إنشاء حساب',
        loadingMore: 'جارٍ تحميل المزيد من المنشورات…',
        endOfFeed: 'لقد اطّلعت على جميع المنشورات.',
        sessionRefreshed: 'تم تحديث موجزك لانتهاء جلسة التصفح السابقة.',
        searchResults: 'نتائج البحث',
        searchFor: 'نتائج مطابقة لـ',
        allIndustries: 'كل القطاعات',
        allContent: 'كل المحتوى',
        posts: 'منشورات',
        articles: 'أوراق بيضاء',
        noMatchesTitle: 'لم نجد نتائج في الموجز',
        noMatchesDescription: 'جرّب كلمة أوسع أو أزل أحد عوامل التصفية.',
        noMoreMatches: 'وصلت إلى نهاية هذه النتائج.',
        moreFromCommunity: 'المزيد من المجتمع',
        searchSessionRefreshed: 'تم تحديث البحث لانتهاء جلسة البحث السابقة.',
        searchLoginDescription: 'سجّل الدخول للبحث في المنشورات والأوراق البيضاء ورؤى الخبراء.'
    }
};
function GuestFeedGate({ locale, isSearching = false }) {
    const copy = copyByLocale[locale === 'ar' ? 'ar' : 'en'];
    const [returnUrl, setReturnUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(`${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publicBaseUrl"]}/${locale}`);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setReturnUrl(window.location.href);
    }, []);
    const encodedReturnUrl = encodeURIComponent(returnUrl);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "overflow-hidden rounded-lg border border-[#CFE0F4] bg-white px-6 py-7 text-center sm:px-8 sm:py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF3FF] text-[#2378E8]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLock$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLock$3e$__["IconLock"], {
                    "aria-hidden": true,
                    className: "h-5 w-5",
                    stroke: 1.8
                }, void 0, false, {
                    fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "mt-4 text-[19px] font-bold tracking-[-0.02em] text-[#101724]",
                children: copy.loginTitle
            }, void 0, false, {
                fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mx-auto mt-2 max-w-md text-[13px] leading-6 text-[#64748B]",
                children: isSearching ? copy.searchLoginDescription : copy.loginDescription
            }, void 0, false, {
                fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto mt-5 flex max-w-sm flex-col gap-2.5 sm:flex-row sm:justify-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dashboardUrl"]}/auth/login?returnUrl=${encodedReturnUrl}`,
                        className: "inline-flex min-h-10 items-center justify-center rounded-md bg-[#2378E8] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#1B64C5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2",
                        children: copy.login
                    }, void 0, false, {
                        fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dashboardUrl"]}/auth/sign-up?returnUrl=${encodedReturnUrl}`,
                        className: "inline-flex min-h-10 items-center justify-center rounded-md border border-[#B8CBE2] px-5 text-[13px] font-semibold text-[#36506F] transition-colors hover:bg-[#F5F8FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2",
                        children: copy.signup
                    }, void 0, false, {
                        fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
function FeedSearchHeader({ locale, keyword, industry, contentType }) {
    const isRTL = locale === 'ar';
    const copy = copyByLocale[isRTL ? 'ar' : 'en'];
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { industries, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$industries$2f$useAllIndustries$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAllIndustries"])({
        locale,
        topSubIndustry: 0
    });
    const updateFilters = (nextIndustry, nextContentType)=>{
        const params = new URLSearchParams({
            keyword
        });
        if (nextIndustry) params.set('industry', String(nextIndustry));
        if (nextContentType) params.set('content_type', nextContentType);
        router.replace(`/${locale}?${params.toString()}`, {
            scroll: false
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-2.5 px-4 py-1 sm:px-6 xl:px-1 md:flex md:items-end md:justify-between md:gap-4 md:space-y-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#64748B]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__["IconSearch"], {
                                "aria-hidden": true,
                                className: "h-3.5 w-3.5 text-[#2378E8]",
                                stroke: 2
                            }, void 0, false, {
                                fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                                lineNumber: 160,
                                columnNumber: 11
                            }, this),
                            copy.searchResults
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "mt-1 text-[15px] font-semibold tracking-[-0.015em] text-[#334155] sm:text-base",
                        children: [
                            copy.searchFor,
                            ' ',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("bdi", {
                                className: "font-semibold text-[#2378E8]",
                                children: [
                                    "“",
                                    keyword,
                                    "”"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                lineNumber: 158,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-2.5 md:w-80 md:shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: industry ?? '',
                        disabled: isLoading,
                        onChange: (event)=>updateFilters(event.target.value ? Number(event.target.value) : null, contentType ?? null),
                        "aria-label": copy.allIndustries,
                        className: "min-h-9 w-full rounded-md border border-[#D7E1EE] bg-white px-2.5 text-[12px] font-medium text-[#475569] outline-none transition-colors focus:border-[#2378E8] focus:ring-2 focus:ring-[#2378E8]/15 disabled:cursor-wait disabled:opacity-60 sm:text-[13px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: copy.allIndustries
                            }, void 0, false, {
                                fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                                lineNumber: 177,
                                columnNumber: 11
                            }, this),
                            industries.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: item.id,
                                    children: item.name
                                }, item.id, false, {
                                    fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                                    lineNumber: 179,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                        lineNumber: 170,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: contentType ?? '',
                        onChange: (event)=>updateFilters(industry ?? null, event.target.value || null),
                        "aria-label": copy.allContent,
                        className: "min-h-9 w-full rounded-md border border-[#D7E1EE] bg-white px-2.5 text-[12px] font-medium text-[#475569] outline-none transition-colors focus:border-[#2378E8] focus:ring-2 focus:ring-[#2378E8]/15 sm:text-[13px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: copy.allContent
                            }, void 0, false, {
                                fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                                lineNumber: 190,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "post",
                                children: copy.posts
                            }, void 0, false, {
                                fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                                lineNumber: 191,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "article",
                                children: copy.articles
                            }, void 0, false, {
                                fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                                lineNumber: 192,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
        lineNumber: 157,
        columnNumber: 5
    }, this);
}
function CommunityFeedTimeline({ locale, keyword = '', industry = null, contentType = null }) {
    const copy = copyByLocale[locale === 'ar' ? 'ar' : 'en'];
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const { user, isAuthResolved } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserProfile"])();
    const isAuthenticated = user !== null;
    const normalizedKeyword = keyword.trim();
    const isSearching = normalizedKeyword.length > 0;
    const { setInsights: setRelatedDocuments, setIsLoading: setRelatedDocumentsLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$FeedSearchInsightsContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFeedSearchInsights"])();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [meta, setMeta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // When a search runs out of matches we keep the timeline alive by streaming
    // in the regular community feed (social-media style). These track that phase.
    const [overflowMeta, setOverflowMeta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [overflowStartIndex, setOverflowStartIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isLoadingMore, setIsLoadingMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loadError, setLoadError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const loadingMoreRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const sentinelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const loadFirstPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (signal)=>{
        setIsLoading(true);
        setLoadError(false);
        setItems([]);
        setMeta(null);
        setOverflowMeta(null);
        setOverflowStartIndex(null);
        setRelatedDocuments([]);
        setRelatedDocumentsLoading(isSearching);
        if (isSearching && !isAuthenticated) {
            setIsLoading(false);
            setRelatedDocumentsLoading(false);
            return;
        }
        try {
            if (isSearching) {
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["searchCommunityFeed"])(locale, {
                    keyword: normalizedKeyword,
                    industry,
                    contentType,
                    limit: 10
                }, signal);
                setItems(result.feed);
                setRelatedDocuments(result.insights.slice(0, 5));
                setMeta(result.meta);
            } else {
                const result = isAuthenticated ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCommunityFeed"])(locale, null, signal) : await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCommunityFeedPreview"])(locale, signal);
                setItems(result.data);
                setMeta(result.meta);
            }
        } catch (error) {
            if (error instanceof DOMException && error.name === 'AbortError') return;
            setLoadError(true);
        } finally{
            if (!signal?.aborted) {
                setIsLoading(false);
                setRelatedDocumentsLoading(false);
            }
        }
    }, [
        contentType,
        industry,
        isAuthenticated,
        isSearching,
        locale,
        normalizedKeyword,
        setRelatedDocuments,
        setRelatedDocumentsLoading
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isAuthResolved) return;
        const controller = new AbortController();
        void loadFirstPage(controller.signal);
        return ()=>controller.abort();
    }, [
        isAuthResolved,
        loadFirstPage
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isAuthenticated) return;
        const refresh = ()=>void loadFirstPage();
        window.addEventListener('feed:published', refresh);
        return ()=>window.removeEventListener('feed:published', refresh);
    }, [
        isAuthenticated,
        loadFirstPage
    ]);
    // Search results are finite; the community feed is what keeps the page
    // scrolling. `overflowActive` means we've exhausted the matches and are now
    // appending the regular feed underneath them.
    const overflowActive = overflowStartIndex !== null;
    const searchHasMore = Boolean(meta?.has_more && meta?.next_cursor);
    const hasMore = isSearching ? overflowActive ? Boolean(overflowMeta?.has_more && overflowMeta?.next_cursor) : // the community feed (skip overflow entirely on a zero-result search)
    searchHasMore || items.length > 0 : Boolean(meta?.has_more && meta?.next_cursor);
    const appendItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((incoming)=>{
        setItems((previous)=>{
            const existingUuids = new Set(previous.map((item)=>item.uuid));
            return [
                ...previous,
                ...incoming.filter((item)=>!existingUuids.has(item.uuid))
            ];
        });
    }, []);
    const loadMore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!isAuthenticated || loadingMoreRef.current) return;
        loadingMoreRef.current = true;
        setIsLoadingMore(true);
        try {
            if (isSearching && !searchHasMore) {
                // Matches are exhausted — stream in the regular community feed.
                const cursor = overflowActive ? overflowMeta?.next_cursor ?? null : null;
                if (overflowActive && !cursor) return;
                const next = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCommunityFeed"])(locale, cursor);
                setItems((previous)=>{
                    if (overflowStartIndex === null) setOverflowStartIndex(previous.length);
                    const existingUuids = new Set(previous.map((item)=>item.uuid));
                    return [
                        ...previous,
                        ...next.data.filter((item)=>!existingUuids.has(item.uuid))
                    ];
                });
                setOverflowMeta(next.meta);
                return;
            }
            const nextItems = isSearching ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["searchCommunityFeed"])(locale, {
                keyword: normalizedKeyword,
                cursor: meta.next_cursor,
                industry,
                contentType,
                limit: 10
            }) : await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCommunityFeed"])(locale, meta.next_cursor);
            const incomingItems = 'feed' in nextItems ? nextItems.feed : nextItems.data;
            appendItems(incomingItems);
            setMeta(nextItems.meta);
        } catch (error) {
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CommunityFeedApiError"] && error.refreshRequired) {
                toast.info(isSearching ? copy.searchSessionRefreshed : copy.sessionRefreshed, '');
                await loadFirstPage();
            } else {
                toast.error(error instanceof Error ? error.message : copy.loadError);
            }
        } finally{
            loadingMoreRef.current = false;
            setIsLoadingMore(false);
        }
    }, [
        appendItems,
        contentType,
        copy.loadError,
        copy.searchSessionRefreshed,
        copy.sessionRefreshed,
        industry,
        isAuthenticated,
        isSearching,
        loadFirstPage,
        locale,
        meta,
        normalizedKeyword,
        overflowActive,
        overflowMeta,
        overflowStartIndex,
        searchHasMore,
        toast
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const sentinel = sentinelRef.current;
        if (!sentinel || !isAuthenticated || !hasMore) return;
        const observer = new IntersectionObserver((entries)=>{
            if (entries[0]?.isIntersecting) void loadMore();
        }, {
            rootMargin: '600px 0px'
        });
        observer.observe(sentinel);
        return ()=>observer.disconnect();
    }, [
        hasMore,
        isAuthenticated,
        loadMore
    ]);
    const searchHeader = isSearching ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FeedSearchHeader, {
        locale: locale,
        keyword: normalizedKeyword,
        industry: industry,
        contentType: contentType
    }, void 0, false, {
        fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
        lineNumber: 381,
        columnNumber: 5
    }, this) : null;
    if (!isAuthResolved || isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: [
                searchHeader,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    "aria-label": copy.loading,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$MyFeedsTimeline$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FeedSkeleton"], {}, void 0, false, {
                        fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                        lineNumber: 394,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                    lineNumber: 393,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
            lineNumber: 391,
            columnNumber: 7
        }, this);
    }
    if (isSearching && !isAuthenticated) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: [
                searchHeader,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GuestFeedGate, {
                    locale: locale,
                    isSearching: true
                }, void 0, false, {
                    fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                    lineNumber: 404,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
            lineNumber: 402,
            columnNumber: 7
        }, this);
    }
    if (loadError) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: [
                searchHeader,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "rounded-lg border border-[#DCE4EF] bg-white px-6 py-12 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-[18px] font-bold text-[#101724]",
                            children: copy.loadError
                        }, void 0, false, {
                            fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                            lineNumber: 414,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>void loadFirstPage(),
                            className: "mt-4 min-h-10 rounded-md bg-[#2378E8] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#1B64C5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2",
                            children: copy.tryAgain
                        }, void 0, false, {
                            fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                            lineNumber: 415,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                    lineNumber: 413,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
            lineNumber: 411,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            searchHeader,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                "aria-label": copy.title,
                children: [
                    items.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-lg border border-[#DCE4EF] bg-white px-6 py-14 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EDF4FD] text-[#2378E8]",
                                children: isSearching ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__["IconSearch"], {
                                    "aria-hidden": true,
                                    className: "h-5 w-5",
                                    stroke: 1.7
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                                    lineNumber: 437,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPhoto$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPhoto$3e$__["IconPhoto"], {
                                    "aria-hidden": true,
                                    className: "h-5 w-5",
                                    stroke: 1.7
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                                    lineNumber: 439,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                                lineNumber: 435,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-4 text-[18px] font-bold text-[#101724]",
                                children: isSearching ? copy.noMatchesTitle : copy.emptyTitle
                            }, void 0, false, {
                                fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                                lineNumber: 442,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mx-auto mt-2 max-w-sm text-[13px] leading-6 text-[#64748B]",
                                children: isSearching ? copy.noMatchesDescription : copy.emptyDescription
                            }, void 0, false, {
                                fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                                lineNumber: 445,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                        lineNumber: 434,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: items.map((item, index)=>{
                            // The right-column widgets are hidden below xl, so weave them
                            // between posts (LinkedIn-style) on mobile/tablet. Positions clamp
                            // to the last post so short feeds still surface them.
                            const upgradeIndex = Math.min(1, items.length - 1);
                            const documentsIndex = Math.min(3, items.length - 1);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    index === overflowStartIndex && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 py-1",
                                        role: "separator",
                                        "aria-label": copy.moreFromCommunity,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "h-px flex-1 bg-[#E2E8F0]"
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                                                lineNumber: 462,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A99B1]",
                                                children: copy.moreFromCommunity
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                                                lineNumber: 463,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "h-px flex-1 bg-[#E2E8F0]"
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                                                lineNumber: 466,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                                        lineNumber: 461,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$MyFeedsTimeline$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FeedCard"], {
                                        item: item,
                                        locale: locale,
                                        articleAccess: "community"
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                                        lineNumber: 469,
                                        columnNumber: 19
                                    }, this),
                                    index === upgradeIndex && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$RoleUpgradeCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        locale: locale,
                                        className: "xl:hidden"
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                                        lineNumber: 471,
                                        columnNumber: 21
                                    }, this),
                                    index === documentsIndex && (isSearching ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$RelatedDocumentsCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        locale: locale,
                                        className: "xl:hidden"
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                                        lineNumber: 475,
                                        columnNumber: 23
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$TopDocumentsCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        locale: locale,
                                        className: "xl:hidden"
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                                        lineNumber: 477,
                                        columnNumber: 23
                                    }, this))
                                ]
                            }, item.uuid, true, {
                                fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                                lineNumber: 459,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                        lineNumber: 450,
                        columnNumber: 11
                    }, this),
                    !isAuthenticated && !isSearching && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GuestFeedGate, {
                            locale: locale
                        }, void 0, false, {
                            fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                            lineNumber: 487,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                        lineNumber: 486,
                        columnNumber: 11
                    }, this),
                    isAuthenticated && hasMore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: sentinelRef,
                        className: "flex min-h-20 items-center justify-center",
                        "aria-live": "polite",
                        children: isLoadingMore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "inline-flex items-center gap-2 text-[13px] text-[#64748B]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__["IconLoader2"], {
                                    "aria-hidden": true,
                                    className: "h-4 w-4 animate-spin",
                                    stroke: 2
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                                    lineNumber: 495,
                                    columnNumber: 17
                                }, this),
                                copy.loadingMore
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                            lineNumber: 494,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                        lineNumber: 492,
                        columnNumber: 11
                    }, this),
                    isAuthenticated && items.length > 0 && !hasMore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "py-6 text-center text-[12px] text-[#8A99B1]",
                        children: isSearching && !overflowActive ? copy.noMoreMatches : copy.endOfFeed
                    }, void 0, false, {
                        fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                        lineNumber: 503,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
                lineNumber: 431,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/CommunityFeedTimeline.tsx",
        lineNumber: 428,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/feed/FeedMobileSearch.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FeedMobileSearch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconSearch.mjs [app-ssr] (ecmascript) <export default as IconSearch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconX.mjs [app-ssr] (ecmascript) <export default as IconX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function FeedMobileSearch({ locale }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const activeKeyword = searchParams.get('keyword') ?? '';
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(activeKeyword);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setQuery(activeKeyword);
    }, [
        activeKeyword
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (pathname !== `/${locale}`) return;
        const keyword = query.trim();
        if (keyword === activeKeyword.trim()) return;
        const timeoutId = window.setTimeout(()=>{
            router.replace(keyword ? `/${locale}?keyword=${encodeURIComponent(keyword)}` : `/${locale}`, {
                scroll: false
            });
        }, 1000);
        return ()=>window.clearTimeout(timeoutId);
    }, [
        activeKeyword,
        locale,
        pathname,
        query,
        router
    ]);
    const submit = (event)=>{
        event.preventDefault();
        const keyword = query.trim();
        router.push(keyword ? `/${locale}?keyword=${encodeURIComponent(keyword)}` : `/${locale}`);
    };
    const clearSearch = ()=>{
        setQuery('');
        if (activeKeyword.trim()) router.push(`/${locale}`);
    };
    const hasQuery = query.trim().length > 0;
    if (pathname !== `/${locale}`) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: submit,
        className: "px-4 sm:px-6 xl:hidden",
        role: "search",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "sr-only",
                htmlFor: `feed-mobile-search-${locale}`,
                children: locale === 'ar' ? 'البحث في الموجز' : 'Search the feed'
            }, void 0, false, {
                fileName: "[project]/components/feed/FeedMobileSearch.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: `feed-mobile-search-${locale}`,
                        type: "search",
                        value: query,
                        onChange: (event)=>setQuery(event.target.value),
                        placeholder: locale === 'ar' ? 'ابحث في الموجز...' : 'Search the feed...',
                        dir: locale === 'ar' ? 'rtl' : 'ltr',
                        className: `h-11 w-full rounded-lg border border-[#D7E1EE] bg-white px-4 text-[14px] text-[#1E293B] shadow-sm outline-none transition-colors placeholder:text-[#94A3B8] focus:border-[#2378E8] focus:ring-2 focus:ring-[#2378E8]/15 ${locale === 'ar' ? 'pl-20' : 'pr-20'}`
                    }, void 0, false, {
                        fileName: "[project]/components/feed/FeedMobileSearch.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    hasQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: clearSearch,
                        "aria-label": locale === 'ar' ? 'مسح البحث' : 'Clear search',
                        className: `absolute top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-[#94A3B8] transition-colors hover:bg-[#F1F5F9] hover:text-[#475569] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] ${locale === 'ar' ? 'left-10' : 'right-10'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__["IconX"], {
                            "aria-hidden": true,
                            className: "h-[17px] w-[17px]",
                            stroke: 2
                        }, void 0, false, {
                            fileName: "[project]/components/feed/FeedMobileSearch.tsx",
                            lineNumber: 68,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/feed/FeedMobileSearch.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        "aria-label": locale === 'ar' ? 'بحث' : 'Search',
                        className: `absolute top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-[#64748B] transition-colors hover:bg-[#EEF5FF] hover:text-[#2378E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] ${locale === 'ar' ? 'left-1.5' : 'right-1.5'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__["IconSearch"], {
                            "aria-hidden": true,
                            className: "h-[18px] w-[18px]",
                            stroke: 2
                        }, void 0, false, {
                            fileName: "[project]/components/feed/FeedMobileSearch.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/feed/FeedMobileSearch.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/FeedMobileSearch.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/FeedMobileSearch.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/feed/post/BecomeInsighterCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BecomeInsighterCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Modal/Modal.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowUpRight$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowUpRight$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconArrowUpRight.mjs [app-ssr] (ecmascript) <export default as IconArrowUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBriefcase$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBriefcase$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBriefcase.mjs [app-ssr] (ecmascript) <export default as IconBriefcase>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileDescription$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileDescription$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconFileDescription.mjs [app-ssr] (ecmascript) <export default as IconFileDescription>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPencil$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPencil$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconPencil.mjs [app-ssr] (ecmascript) <export default as IconPencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconShare$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconShare$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconShare.mjs [app-ssr] (ecmascript) <export default as IconShare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTrendingUp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconTrendingUp.mjs [app-ssr] (ecmascript) <export default as IconTrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconX.mjs [app-ssr] (ecmascript) <export default as IconX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const copyByLocale = {
    en: {
        close: 'Close Become an Insighter card',
        eyebrow: 'Turn expertise into influence',
        title: 'Become an Insighter',
        description: 'Join the experts shaping better business decisions. Your knowledge deserves a place to travel.',
        benefitsTitle: 'As an Insighter, you can',
        benefits: [
            {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPencil$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPencil$3e$__["IconPencil"],
                text: 'Create posts that showcase your expertise'
            },
            {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileDescription$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileDescription$3e$__["IconFileDescription"],
                text: 'Publish insights, white papers, and original knowledge'
            },
            {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconShare$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconShare$3e$__["IconShare"],
                text: 'Share your expertise with a professional community'
            },
            {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBriefcase$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBriefcase$3e$__["IconBriefcase"],
                text: 'Showcase your services and connect with new clients'
            }
        ],
        action: 'Become an Insighter',
        note: 'Build your professional presence on Insighta'
    },
    ar: {
        close: 'إغلاق بطاقة الانضمام كخبير',
        eyebrow: 'حوّل خبرتك إلى تأثير',
        title: 'كن خبيراً',
        description: 'انضم إلى الخبراء الذين يصنعون قرارات أعمال أفضل. معرفتك تستحق أن تصل أبعد.',
        benefitsTitle: 'بصفتك خبيراً، يمكنك',
        benefits: [
            {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPencil$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPencil$3e$__["IconPencil"],
                text: 'إنشاء منشورات تُبرز خبرتك'
            },
            {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileDescription$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileDescription$3e$__["IconFileDescription"],
                text: 'نشر الرؤى والأوراق البيضاء والمعرفة الأصيلة'
            },
            {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconShare$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconShare$3e$__["IconShare"],
                text: 'مشاركة خبرتك مع مجتمع مهني'
            },
            {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBriefcase$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBriefcase$3e$__["IconBriefcase"],
                text: 'عرض خدماتك والتواصل مع عملاء جدد'
            }
        ],
        action: 'كن خبيراً',
        note: 'ابنِ حضورك المهني على إنسايتا'
    }
};
function BecomeInsighterCard({ locale, opened, onClose }) {
    const isArabic = locale === 'ar';
    const copy = copyByLocale[isArabic ? 'ar' : 'en'];
    const upgradeUrl = `${("TURBOPACK compile-time value", "http://localhost:4200")}/app/insighter-register/vertical`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Modal"], {
        opened: opened,
        onClose: onClose,
        centered: true,
        size: 540,
        radius: 18,
        zIndex: 400,
        withCloseButton: false,
        padding: 0,
        "aria-labelledby": "become-insighter-title",
        overlayProps: {
            backgroundOpacity: 0.58,
            blur: 6
        },
        styles: {
            content: {
                overflow: 'hidden',
                border: '1px solid rgba(170, 204, 240, 0.9)',
                boxShadow: '0 30px 80px rgba(10, 42, 82, 0.28)'
            },
            body: {
                padding: 0
            }
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
            dir: isArabic ? 'rtl' : 'ltr',
            className: "relative isolate overflow-hidden bg-white",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative overflow-hidden bg-[#0D3767] px-6 pb-7 pt-6 text-white sm:px-8 sm:pb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            "aria-hidden": true,
                            className: "absolute -end-12 -top-20 h-52 w-52 rounded-full bg-[#39D3C8]/25 blur-2xl"
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/BecomeInsighterCard.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            "aria-hidden": true,
                            className: "absolute -bottom-24 -start-10 h-52 w-52 rounded-full bg-[#2E8FF0]/35 blur-3xl"
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/BecomeInsighterCard.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            "aria-hidden": true,
                            className: "absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:18px_18px]"
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/BecomeInsighterCard.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            "aria-label": copy.close,
                            onClick: onClose,
                            className: "absolute end-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:rotate-6 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__["IconX"], {
                                "aria-hidden": true,
                                className: "h-5 w-5",
                                stroke: 1.8
                            }, void 0, false, {
                                fileName: "[project]/components/feed/post/BecomeInsighterCard.tsx",
                                lineNumber: 102,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/BecomeInsighterCard.tsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative pe-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex items-center gap-1.5 rounded-full border border-[#72E5DD]/35 bg-[#42CFC5]/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#A9F2ED]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTrendingUp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTrendingUp$3e$__["IconTrendingUp"], {
                                            "aria-hidden": true,
                                            className: "h-3.5 w-3.5",
                                            stroke: 2
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/post/BecomeInsighterCard.tsx",
                                            lineNumber: 107,
                                            columnNumber: 15
                                        }, this),
                                        copy.eyebrow
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/feed/post/BecomeInsighterCard.tsx",
                                    lineNumber: 106,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            id: "become-insighter-title",
                                            className: "text-[26px] font-bold leading-tight tracking-[-0.035em] sm:text-[30px]",
                                            children: copy.title
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/post/BecomeInsighterCard.tsx",
                                            lineNumber: 112,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 max-w-md text-[13.5px] leading-6 text-[#D7E8FA] sm:text-[14px]",
                                            children: copy.description
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/post/BecomeInsighterCard.tsx",
                                            lineNumber: 115,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/feed/post/BecomeInsighterCard.tsx",
                                    lineNumber: 111,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/post/BecomeInsighterCard.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/feed/post/BecomeInsighterCard.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-6 pb-6 pt-5 sm:px-8 sm:pb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-[12px] font-bold uppercase tracking-[0.12em] text-[#6A7890]",
                            children: copy.benefitsTitle
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/BecomeInsighterCard.tsx",
                            lineNumber: 123,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "mt-3 grid gap-2.5",
                            children: copy.benefits.map(({ icon: BenefitIcon, text })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "group flex items-center gap-3 rounded-xl border border-[#E1EAF4] bg-[#F8FBFE] px-3.5 py-3 text-[13.5px] font-medium leading-5 text-[#273B57] transition-colors hover:border-[#BBD8F3] hover:bg-[#F2F8FE]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#1878D4] shadow-[0_3px_10px_rgba(25,91,160,0.10)] ring-1 ring-[#DCE9F5] transition-transform group-hover:-translate-y-0.5",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BenefitIcon, {
                                                "aria-hidden": true,
                                                className: "h-[17px] w-[17px]",
                                                stroke: 1.9
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/post/BecomeInsighterCard.tsx",
                                                lineNumber: 133,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/post/BecomeInsighterCard.tsx",
                                            lineNumber: 132,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: text
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/post/BecomeInsighterCard.tsx",
                                            lineNumber: 135,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, text, true, {
                                    fileName: "[project]/components/feed/post/BecomeInsighterCard.tsx",
                                    lineNumber: 128,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/BecomeInsighterCard.tsx",
                            lineNumber: 126,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: upgradeUrl,
                            className: "mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1675D1] px-5 text-[14px] font-bold text-white shadow-[0_10px_24px_rgba(22,117,209,0.24)] transition hover:-translate-y-0.5 hover:bg-[#0F65B8] hover:shadow-[0_14px_28px_rgba(22,117,209,0.30)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1675D1] focus-visible:ring-offset-2",
                            children: [
                                copy.action,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowUpRight$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowUpRight$3e$__["IconArrowUpRight"], {
                                    "aria-hidden": true,
                                    className: `h-[18px] w-[18px] ${isArabic ? '-scale-x-100' : ''}`,
                                    stroke: 2
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/BecomeInsighterCard.tsx",
                                    lineNumber: 145,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/post/BecomeInsighterCard.tsx",
                            lineNumber: 140,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 text-center text-[11.5px] font-medium text-[#8290A5]",
                            children: copy.note
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/BecomeInsighterCard.tsx",
                            lineNumber: 151,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/feed/post/BecomeInsighterCard.tsx",
                    lineNumber: 122,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/feed/post/BecomeInsighterCard.tsx",
            lineNumber: 81,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/feed/post/BecomeInsighterCard.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/feed/post/IndustrySelectModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "collectLeafGroups",
    ()=>collectLeafGroups,
    "default",
    ()=>IndustrySelectModal,
    "fetchIndustryTree",
    ()=>fetchIndustryTree
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Modal/Modal.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const copyByLocale = {
    en: {
        title: 'Select industry',
        search: 'Search industries…',
        loading: 'Loading industries…',
        empty: 'No industries match your search.',
        error: 'Could not load industries.',
        retry: 'Try again',
        close: 'Close industry selection'
    },
    ar: {
        title: 'اختر المجال',
        search: 'ابحث في المجالات…',
        loading: 'جارٍ تحميل المجالات…',
        empty: 'لا توجد مجالات مطابقة لبحثك.',
        error: 'تعذر تحميل المجالات.',
        retry: 'حاول مرة أخرى',
        close: 'إغلاق اختيار المجال'
    }
};
// Module-level cache: the industry tree rarely changes within a session
const industriesCache = {};
// De-dupe concurrent callers (e.g. IndustryField + IndustrySelectModal open at once)
const pendingFetches = {};
// A stalled connection never rejects on its own, so without a timeout the
// caller's loading state can hang forever. Bound every attempt so it always
// settles and the UI can fall back to a retryable error state.
const FETCH_TIMEOUT_MS = 12000;
async function fetchIndustryTree(locale) {
    if (industriesCache[locale]) return industriesCache[locale];
    if (pendingFetches[locale]) return pendingFetches[locale];
    const controller = new AbortController();
    const timeoutId = setTimeout(()=>controller.abort(), FETCH_TIMEOUT_MS);
    const request = fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/common/setting/industry/tree'), {
        signal: controller.signal,
        headers: {
            Accept: 'application/json',
            'Accept-Language': locale,
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
        }
    }).then(async (response)=>{
        if (!response.ok) throw new Error('Failed to fetch industries');
        const data = await response.json();
        industriesCache[locale] = data ?? [];
        return industriesCache[locale];
    }).finally(()=>{
        clearTimeout(timeoutId);
        delete pendingFetches[locale];
    });
    pendingFetches[locale] = request;
    return request;
}
// Single-select radio indicator shown at the start of every selectable row.
function RadioDot({ checked }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        "aria-hidden": true,
        className: `me-2.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-colors ${checked ? 'border-[#1D74E0]' : 'border-[#C2CEDE]'}`,
        children: checked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "h-2 w-2 rounded-full bg-[#1D74E0]"
        }, void 0, false, {
            fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
            lineNumber: 97,
            columnNumber: 18
        }, this) : null
    }, void 0, false, {
        fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, this);
}
function collectLeafGroups(nodes) {
    const groups = [];
    const collectLeaves = (node)=>node.children.length === 0 ? [
            node
        ] : node.children.flatMap(collectLeaves);
    // The parent (top-level node) is itself selectable, so it is not injected as a
    // child here. A parent with no descendants simply yields an empty child list
    // and is picked via its own header row.
    for (const parent of nodes){
        const children = parent.children.flatMap(collectLeaves);
        groups.push({
            parentKey: parent.key,
            parentLabel: parent.label,
            children
        });
    }
    return groups;
}
function IndustrySelectModal({ locale, opened, selectedId, onClose, onSelect }) {
    const copy = copyByLocale[locale === 'ar' ? 'ar' : 'en'];
    const [groups, setGroups] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasError, setHasError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [retryToken, setRetryToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!opened) return;
        let cancelled = false;
        setSearchTerm('');
        setIsLoading(true);
        setHasError(false);
        fetchIndustryTree(locale).then((tree)=>{
            if (!cancelled) setGroups(collectLeafGroups(tree));
        }).catch(()=>{
            if (!cancelled) {
                setGroups([]);
                setHasError(true);
            }
        }).finally(()=>{
            if (!cancelled) setIsLoading(false);
        });
        return ()=>{
            cancelled = true;
        };
    }, [
        opened,
        locale,
        retryToken
    ]);
    const filteredGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const query = searchTerm.trim().toLowerCase();
        if (query === '') return groups;
        return groups.map((group)=>{
            // When the parent itself matches, keep all its children so the whole
            // group stays pickable; otherwise narrow to the matching children.
            if (group.parentLabel.toLowerCase().includes(query)) return group;
            return {
                ...group,
                children: group.children.filter((child)=>child.label.toLowerCase().includes(query))
            };
        }).filter((group)=>group.parentLabel.toLowerCase().includes(query) || group.children.length > 0);
    }, [
        groups,
        searchTerm
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Modal"], {
        opened: opened,
        onClose: onClose,
        title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[16px] font-bold text-[#0B1220]",
            children: copy.title
        }, void 0, false, {
            fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
            lineNumber: 185,
            columnNumber: 14
        }, void 0),
        size: "md",
        radius: 8,
        centered: true,
        zIndex: 310,
        closeButtonProps: {
            'aria-label': copy.close,
            className: 'focus-visible:!outline-[1px] focus-visible:!outline-offset-1 focus-visible:!outline-[#B7D2F4]'
        },
        styles: {
            content: {
                boxShadow: 'none',
                border: '1px solid #DCE4EF'
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "industry-search",
                        className: "sr-only",
                        children: copy.search
                    }, void 0, false, {
                        fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                        lineNumber: 200,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "industry-search",
                        name: "industry-search",
                        type: "text",
                        value: searchTerm,
                        onChange: (event)=>setSearchTerm(event.currentTarget.value),
                        placeholder: copy.search,
                        className: "h-10 w-full rounded-md border border-[#D6E0EC] bg-white px-3 text-[13.5px] text-[#1C2433] transition-colors placeholder:text-[#94A3B8] focus-visible:border-[#8FB9EA] focus-visible:outline-none"
                    }, void 0, false, {
                        fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                        lineNumber: 203,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-[420px] overscroll-contain overflow-y-auto pe-1",
                "aria-busy": isLoading,
                children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    role: "status",
                    className: "py-8 text-center text-[13px] text-[#64748B]",
                    children: copy.loading
                }, void 0, false, {
                    fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                    lineNumber: 216,
                    columnNumber: 11
                }, this) : hasError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center gap-3 py-8 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[13px] text-[#94A3B8]",
                            children: copy.error
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                            lineNumber: 221,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setRetryToken((previous)=>previous + 1),
                            className: "rounded-md border border-[#D6E0EC] px-4 py-1.5 text-[13px] font-medium text-[#1D74E0] transition-colors hover:bg-[#F3F6FB] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]",
                            children: copy.retry
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                            lineNumber: 222,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                    lineNumber: 220,
                    columnNumber: 11
                }, this) : filteredGroups.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "py-8 text-center text-[13px] text-[#94A3B8]",
                    children: copy.empty
                }, void 0, false, {
                    fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                    lineNumber: 231,
                    columnNumber: 11
                }, this) : filteredGroups.map((group)=>{
                    const isParentSelected = group.parentKey === selectedId;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        "aria-labelledby": `industry-group-${group.parentKey}`,
                        className: "mb-4 overflow-hidden rounded-md border border-[#E1E8F1] bg-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                id: `industry-group-${group.parentKey}`,
                                className: "m-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    "aria-pressed": isParentSelected,
                                    onClick: ()=>onSelect({
                                            id: group.parentKey,
                                            name: group.parentLabel
                                        }),
                                    className: `flex w-full items-center px-3 py-2.5 text-start text-[12px] font-bold transition-colors focus-visible:outline-[1px] focus-visible:outline-offset-[-1px] focus-visible:outline-[#B7D2F4] ${group.children.length > 0 ? 'border-b' : ''} ${isParentSelected ? 'border-[#CBE0F8] bg-[#EAF3FE] text-[#1D5FAD]' : 'border-[#DCE6F2] bg-[#F3F7FC] text-[#2168B5] hover:bg-[#EAF1FA]'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioDot, {
                                            checked: isParentSelected
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                                            lineNumber: 254,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "min-w-0 truncate",
                                            children: group.parentLabel
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                                            lineNumber: 255,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                                    lineNumber: 242,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                                lineNumber: 241,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                children: group.children.map((child)=>{
                                    const isSelected = child.key === selectedId;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "border-b border-[#E8EDF4] last:border-b-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            "aria-pressed": isSelected,
                                            onClick: ()=>onSelect({
                                                    id: child.key,
                                                    name: child.label,
                                                    parentName: group.parentLabel
                                                }),
                                            className: `flex min-h-12 w-full items-center px-3 py-2.5 text-start text-[13.5px] transition-colors focus-visible:outline-[1px] focus-visible:outline-offset-[-1px] focus-visible:outline-[#B7D2F4] ${isSelected ? 'bg-[#EAF3FE] font-semibold text-[#1D5FAD]' : 'text-[#1C2433] hover:bg-[#F8FAFD]'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioDot, {
                                                    checked: isSelected
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                                                    lineNumber: 275,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "min-w-0 truncate",
                                                    children: child.label
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                                                    lineNumber: 276,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                                            lineNumber: 263,
                                            columnNumber: 23
                                        }, this)
                                    }, child.key, false, {
                                        fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                                        lineNumber: 262,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                                lineNumber: 258,
                                columnNumber: 15
                            }, this)
                        ]
                    }, group.parentKey, true, {
                        fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                        lineNumber: 236,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                lineNumber: 214,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
        lineNumber: 182,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/feed/post/IndustryField.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>IndustryField
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronDown$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconChevronDown.mjs [app-ssr] (ecmascript) <export default as IconChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconHash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconHash$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconHash.mjs [app-ssr] (ecmascript) <export default as IconHash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$IndustrySelectModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/post/IndustrySelectModal.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const copyByLocale = {
    en: {
        label: 'Industry',
        placeholder: 'Select an industry'
    },
    ar: {
        label: 'المجال',
        placeholder: 'اختر المجال'
    }
};
function IndustryField({ locale, value, invalid, errorId, buttonRef, onSelect, onBlur }) {
    const copy = copyByLocale[locale === 'ar' ? 'ar' : 'en'];
    const [modalOpened, setModalOpened] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: "feed-post-industry-field",
                className: "mb-1.5 block text-[13px] font-semibold text-[#0B1220]",
                children: copy.label
            }, void 0, false, {
                fileName: "[project]/components/feed/post/IndustryField.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                id: "feed-post-industry-field",
                ref: buttonRef,
                type: "button",
                onClick: ()=>setModalOpened(true),
                onBlur: ()=>{
                    if (!modalOpened) onBlur?.();
                },
                "aria-haspopup": "dialog",
                "aria-expanded": modalOpened,
                "aria-invalid": invalid || undefined,
                "aria-describedby": invalid ? errorId : undefined,
                className: `flex min-h-11 w-full items-center gap-2 rounded-md border bg-white px-3 py-2 text-[14px] transition-colors focus-visible:outline-none ${invalid ? 'border-[#C23B32] bg-[#FFF8F7]' : 'border-[#D6E0EC] focus-visible:border-[#8FB9EA]'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconHash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconHash$3e$__["IconHash"], {
                        "aria-hidden": true,
                        className: "h-4 w-4 shrink-0 text-[#1D74E0]",
                        stroke: 2
                    }, void 0, false, {
                        fileName: "[project]/components/feed/post/IndustryField.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `min-w-0 flex-1 truncate text-start ${value ? 'font-medium text-[#1C2433]' : 'text-[#94A3B8]'}`,
                        children: value?.name ?? copy.placeholder
                    }, void 0, false, {
                        fileName: "[project]/components/feed/post/IndustryField.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronDown$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronDown$3e$__["IconChevronDown"], {
                        "aria-hidden": true,
                        className: "h-4 w-4 shrink-0 text-[#5A6B84]",
                        stroke: 2
                    }, void 0, false, {
                        fileName: "[project]/components/feed/post/IndustryField.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/post/IndustryField.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$IndustrySelectModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                locale: locale,
                opened: modalOpened,
                selectedId: value?.id ?? null,
                onClose: ()=>{
                    setModalOpened(false);
                    onBlur?.();
                },
                onSelect: (option)=>{
                    onSelect(option);
                    setModalOpened(false);
                }
            }, void 0, false, {
                fileName: "[project]/components/feed/post/IndustryField.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/post/IndustryField.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/feed/post/KnowledgeLibraryDrawer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>KnowledgeLibraryDrawer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Drawer$2f$Drawer$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Drawer/Drawer.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/feed.service.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
// A post can attach at most this many knowledge items from the library.
const MAX_LIBRARY_ATTACHMENTS = 3;
const copyByLocale = {
    en: {
        title: 'Share from your library',
        subtitle: `Attach up to ${MAX_LIBRARY_ATTACHMENTS} published knowledge items to your post.`,
        loading: 'Loading your library…',
        empty: 'No published knowledge in your library yet.',
        emptyTitle: 'Start building your library',
        emptyBody: 'Publish documents, reports, or data to your library, then attach them to your posts. Save a draft and continue to publishing whenever you are ready.',
        emptyCta: 'Save and start publish',
        loadMore: 'Load more',
        attach: 'Attach',
        selectedCount: (count)=>`${count} of ${MAX_LIBRARY_ATTACHMENTS} selected`,
        limitReached: `You can attach up to ${MAX_LIBRARY_ATTACHMENTS} items. Unselect one to choose another.`,
        error: 'Unable to load your library.',
        close: 'Close library drawer'
    },
    ar: {
        title: 'شارك من مكتبتك',
        subtitle: `أرفق حتى ${MAX_LIBRARY_ATTACHMENTS} عناصر معرفة منشورة بمنشورك.`,
        loading: 'جارٍ تحميل مكتبتك…',
        empty: 'لا توجد معرفة منشورة في مكتبتك بعد.',
        emptyTitle: 'ابدأ ببناء مكتبتك',
        emptyBody: 'انشر المستندات أو التقارير أو البيانات في مكتبتك، ثم أرفقها بمنشوراتك. احفظ مسودة وتابع النشر متى كنت جاهزًا.',
        emptyCta: 'احفظ وابدأ النشر',
        loadMore: 'تحميل المزيد',
        attach: 'إرفاق',
        selectedCount: (count)=>`${count} من ${MAX_LIBRARY_ATTACHMENTS} محدد`,
        limitReached: `يمكنك إرفاق حتى ${MAX_LIBRARY_ATTACHMENTS} عناصر. ألغِ تحديد أحدها لاختيار غيره.`,
        error: 'تعذر تحميل مكتبتك.',
        close: 'إغلاق مكتبة المستندات'
    }
};
function KnowledgeLibraryDrawer({ locale, opened, selected, onClose, onConfirm, onPublishNew }) {
    const isArabic = locale === 'ar';
    const copy = copyByLocale[isArabic ? 'ar' : 'en'];
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [lastPage, setLastPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loadError, setLoadError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pendingSelection, setPendingSelection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Map());
    const loadPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (pageToLoad, append)=>{
        setIsLoading(true);
        setLoadError(false);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchPublishedLibraryKnowledge"])(pageToLoad, locale);
            setItems((previous)=>append ? [
                    ...previous,
                    ...result.data
                ] : result.data);
            setPage(result.meta.current_page);
            setLastPage(result.meta.last_page);
        } catch  {
            setLoadError(true);
        } finally{
            setIsLoading(false);
        }
    }, [
        locale
    ]);
    // Reset to the parent's confirmed selection each time the drawer opens
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!opened) return;
        setPendingSelection(new Map(selected.map((item)=>[
                item.id,
                item
            ])));
        loadPage(1, false);
    }, [
        opened,
        selected,
        loadPage
    ]);
    const toggleItem = (item)=>{
        setPendingSelection((previous)=>{
            // Deselecting is always allowed; adding is capped at the max.
            if (!previous.has(item.id) && previous.size >= MAX_LIBRARY_ATTACHMENTS) {
                return previous;
            }
            const next = new Map(previous);
            if (next.has(item.id)) {
                next.delete(item.id);
            } else {
                next.set(item.id, item);
            }
            return next;
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Drawer$2f$Drawer$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Drawer"], {
        opened: opened,
        onClose: onClose,
        position: isArabic ? 'left' : 'right',
        size: 420,
        zIndex: 310,
        closeButtonProps: {
            'aria-label': copy.close,
            className: 'focus-visible:!outline-[1px] focus-visible:!outline-offset-1 focus-visible:!outline-[#B7D2F4]'
        },
        styles: {
            content: {
                boxShadow: 'none',
                borderInlineStart: '1px solid #DCE4EF'
            },
            header: {
                borderBottom: '1px solid #E5EAF2'
            }
        },
        title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "block text-[16px] font-bold text-[#0B1220]",
                    children: copy.title
                }, void 0, false, {
                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                    lineNumber: 143,
                    columnNumber: 11
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "mt-0.5 block text-[12.5px] font-normal text-[#5A6B84]",
                    children: copy.subtitle
                }, void 0, false, {
                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                    lineNumber: 144,
                    columnNumber: 11
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
            lineNumber: 142,
            columnNumber: 9
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-[calc(100vh-120px)] flex-col",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overscroll-contain overflow-y-auto pe-1",
                    "aria-busy": isLoading,
                    children: [
                        loadError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "py-8 text-center text-[13px] text-[#94A3B8]",
                            children: copy.error
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                            lineNumber: 156,
                            columnNumber: 13
                        }, this) : items.length === 0 && !isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center px-6 py-12 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LibraryEmptyIllustration, {
                                    className: "h-28 w-28",
                                    "aria-hidden": true
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                    lineNumber: 159,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "mt-5 text-[15.5px] font-bold text-[#0B1220]",
                                    children: copy.emptyTitle
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                    lineNumber: 160,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 max-w-[19rem] text-[13px] leading-6 text-[#5A6B84]",
                                    children: copy.emptyBody
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                    lineNumber: 163,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onPublishNew,
                                    className: "mt-5 inline-flex min-h-10 items-center rounded-md bg-[#1D74E0] px-5 py-2 text-[13.5px] font-medium text-white transition-colors hover:bg-[#155CB8] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]",
                                    children: copy.emptyCta
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                    lineNumber: 166,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                            lineNumber: 158,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "space-y-3",
                            children: items.map((item)=>{
                                const isChecked = pendingSelection.has(item.id);
                                const isDisabled = !isChecked && pendingSelection.size >= MAX_LIBRARY_ATTACHMENTS;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: `relative flex min-h-[116px] items-end overflow-hidden rounded-md border bg-[#061326] p-4 transition-colors focus-within:border-[#8FB9EA] ${isChecked ? 'border-[#5EA5FF]' : 'border-[#18304F] hover:border-[#315C8E]'} ${isDisabled ? 'cursor-not-allowed opacity-45' : 'cursor-pointer'}`,
                                        style: {
                                            backgroundImage: 'url("https://foresighta.co/images/test2.png")',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: isChecked,
                                                disabled: isDisabled,
                                                onChange: ()=>toggleItem(item),
                                                className: "absolute end-3 top-3 h-5 w-5 shrink-0 accent-[#2378E8] disabled:cursor-not-allowed"
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                                lineNumber: 195,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "min-w-0 flex-1 pe-7",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "mb-2 inline-flex rounded bg-[#0B2545] px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#74C0FF]",
                                                        children: item.type
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                                        lineNumber: 203,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block line-clamp-2 text-[15px] font-semibold leading-6 text-white",
                                                        children: item.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                                        lineNumber: 206,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "mt-1 block text-[11.5px] text-[#AAC5E5]",
                                                        children: item.published_at ? item.published_at.slice(0, 10) : ''
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                                        lineNumber: 209,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                                lineNumber: 202,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                        lineNumber: 182,
                                        columnNumber: 21
                                    }, this)
                                }, item.id, false, {
                                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                    lineNumber: 181,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                            lineNumber: 175,
                            columnNumber: 13
                        }, this),
                        isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            role: "status",
                            className: "py-4 text-center text-[13px] text-[#64748B]",
                            children: copy.loading
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                            lineNumber: 221,
                            columnNumber: 13
                        }, this),
                        !isLoading && !loadError && page < lastPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>loadPage(page + 1, true),
                            className: "mt-3 min-h-10 w-full rounded border border-[#C9DCF6] py-2 text-[13px] font-medium text-[#1D74E0] transition-colors hover:bg-[#F3F6FB] focus-visible:border-[#8FB9EA] focus-visible:outline-none",
                            children: copy.loadMore
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                            lineNumber: 227,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                    lineNumber: 151,
                    columnNumber: 9
                }, this),
                items.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between border-t border-[#DCE4EF] bg-white pt-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "min-w-0 pe-3 text-[12.5px] text-[#5A6B84]",
                            children: pendingSelection.size >= MAX_LIBRARY_ATTACHMENTS ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium text-[#B26A00]",
                                children: copy.limitReached
                            }, void 0, false, {
                                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                lineNumber: 242,
                                columnNumber: 17
                            }, this) : copy.selectedCount(pendingSelection.size)
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                            lineNumber: 240,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>onConfirm(Array.from(pendingSelection.values())),
                            className: "min-h-10 rounded-md bg-[#1D74E0] px-5 py-2 text-[13.5px] font-medium text-white transition-colors hover:bg-[#155CB8] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]",
                            children: copy.attach
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                            lineNumber: 247,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                    lineNumber: 239,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
            lineNumber: 150,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
        lineNumber: 121,
        columnNumber: 5
    }, this);
}
// Stacked-documents illustration for the empty library state. Self-contained
// SVG so it stays crisp at any size and follows the feed's blue palette.
function LibraryEmptyIllustration({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 96 96",
        fill: "none",
        className: className,
        role: "img",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "48",
                cy: "48",
                r: "48",
                fill: "#EAF2FD"
            }, void 0, false, {
                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                lineNumber: 275,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "28",
                y: "24",
                width: "34",
                height: "44",
                rx: "4",
                fill: "#C9DEF9",
                transform: "rotate(-8 45 46)"
            }, void 0, false, {
                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                lineNumber: 277,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "34",
                y: "26",
                width: "34",
                height: "44",
                rx: "4",
                fill: "#fff",
                stroke: "#B7D2F4"
            }, void 0, false, {
                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                lineNumber: 287,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "40",
                y: "34",
                width: "22",
                height: "3.5",
                rx: "1.75",
                fill: "#DCE7F6"
            }, void 0, false, {
                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                lineNumber: 288,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "40",
                y: "42",
                width: "22",
                height: "3.5",
                rx: "1.75",
                fill: "#DCE7F6"
            }, void 0, false, {
                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                lineNumber: 289,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "40",
                y: "50",
                width: "14",
                height: "3.5",
                rx: "1.75",
                fill: "#DCE7F6"
            }, void 0, false, {
                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                lineNumber: 290,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "66",
                cy: "64",
                r: "12",
                fill: "#1D74E0"
            }, void 0, false, {
                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                lineNumber: 292,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M66 59v10M61 64h10",
                stroke: "#fff",
                strokeWidth: "2.5",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                lineNumber: 293,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
        lineNumber: 268,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/feed/post/PostModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PostModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Modal/Modal.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Progress$2f$Progress$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Progress/Progress.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronLeft$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconChevronLeft.mjs [app-ssr] (ecmascript) <export default as IconChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronRight$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconChevronRight.mjs [app-ssr] (ecmascript) <export default as IconChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCircleCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCircleCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCircleCheck.mjs [app-ssr] (ecmascript) <export default as IconCircleCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileDescription$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileDescription$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconFileDescription.mjs [app-ssr] (ecmascript) <export default as IconFileDescription>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFolderOpen$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFolderOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconFolderOpen.mjs [app-ssr] (ecmascript) <export default as IconFolderOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconLoader2.mjs [app-ssr] (ecmascript) <export default as IconLoader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPhoto$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPhoto$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconPhoto.mjs [app-ssr] (ecmascript) <export default as IconPhoto>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconPlus.mjs [app-ssr] (ecmascript) <export default as IconPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTrash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTrash$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconTrash.mjs [app-ssr] (ecmascript) <export default as IconTrash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconVideo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconVideo$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconVideo.mjs [app-ssr] (ecmascript) <export default as IconVideo>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconX.mjs [app-ssr] (ecmascript) <export default as IconX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
// Registers the <mux-player> custom element; self-hosted via npm (no CSP
// script-src change needed, unlike the CDN <script> embed Mux's docs default to).
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mux$2f$mux$2d$player$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@mux/mux-player/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/toast/ToastContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/header/hooks/useUserProfile.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/feed.service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$IndustryField$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/post/IndustryField.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$KnowledgeLibraryDrawer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/post/KnowledgeLibraryDrawer.tsx [app-ssr] (ecmascript)");
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
;
;
const MAX_IMAGES = 20;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_VIDEO_SECONDS = 10 * 60;
const PROCESSING_POLL_MS = 3000;
const PROCESSING_TIMEOUT_MS = 2 * 60 * 1000;
const copyByLocale = {
    en: {
        titlePost: 'Create a post',
        titleVideo: 'Create a video post',
        close: 'Close post composer',
        selectIndustry: 'Select industry',
        step1Label: 'Step 1 of 2 · Write your post',
        step2Label: 'Step 2 of 2 · Categorize',
        next: 'Next',
        back: 'Back',
        description: 'Post description',
        bodyPlaceholder: 'Share your insights...',
        uploadTitle: 'Upload your video',
        uploadHint: 'MP4 or MOV, up to 10 minutes. The video must finish uploading before you can write a description.',
        selectVideo: 'Select video',
        uploading: 'Uploading…',
        uploadedProcessing: 'Upload finished — preparing your video',
        processingHint: 'This usually takes under a minute. You can write your description now and publish once it finishes.',
        stalled: 'Still preparing your video',
        stalledHint: 'Your video reached us safely, but it is taking longer than expected to finish preparing. Check again, or come back to this draft later.',
        checkAgain: 'Check again',
        uploadComplete: 'Upload complete',
        cancel: 'Cancel',
        remove: 'Remove',
        addTags: 'Add Tags',
        tagsCount: (count)=>`Tags · ${count}`,
        suggestedTags: 'Suggested tags',
        optionalBadge: 'Optional',
        tagsHint: 'Tags are optional — they help the right experts find your insight.',
        noTags: 'No tags available for this industry yet.',
        addTagPlaceholder: 'Initiate a new tag…',
        addTag: 'Add',
        addTagHint: 'Type a tag and press Enter, or tap a chip below to select it.',
        addTagError: 'Unable to add the tag.',
        shareFromLibrary: 'Share from Insighta library',
        publish: 'Post',
        publishing: 'Publishing…',
        saveDraft: 'Save draft',
        savingDraft: 'Saving…',
        draftSaved: 'Your draft has been saved.',
        draftSaveFailed: 'Unable to save your draft.',
        draftSavedRedirecting: 'Draft saved. Taking you to publishing…',
        newKnowledgeAttached: 'Your new knowledge item has been attached.',
        newKnowledgeMissing: 'We could not find the item you just published. Try adding it from your library.',
        discardDraft: 'Discard draft',
        discardTitle: 'Discard this draft?',
        discardDescription: 'This permanently removes the draft and its uploaded media.',
        keepEditing: 'Keep editing',
        discarding: 'Discarding…',
        draftDiscarded: 'Your draft has been discarded.',
        draftDiscardFailed: 'Unable to discard your draft.',
        savedVideo: 'Saved video',
        publishedToast: 'Your post has been published.',
        videoTooLong: 'The video must be 10 minutes or shorter.',
        videoWrongType: 'Only MP4 or MOV videos are supported.',
        imageTooLarge: (name)=>`"${name}" is larger than 5MB and was skipped.`,
        tooManyImages: `You can attach up to ${MAX_IMAGES} images.`,
        replacingSavedImages: 'New images will replace the images saved in this draft.',
        videoUploadFailed: 'Video upload failed. Please try again.',
        industryFirst: 'Select an industry first',
        industryRequired: 'Select an industry.',
        videoRequired: 'Select and finish uploading a video.',
        videoStillProcessing: 'Your video is still being prepared — you can publish as soon as it is ready.',
        bodyRequired: 'Write a description for your post.'
    },
    ar: {
        titlePost: 'إنشاء منشور',
        titleVideo: 'إنشاء منشور فيديو',
        close: 'إغلاق محرر المنشور',
        selectIndustry: 'اختر المجال',
        step1Label: 'الخطوة 1 من 2 · اكتب منشورك',
        step2Label: 'الخطوة 2 من 2 · التصنيف',
        next: 'التالي',
        back: 'رجوع',
        description: 'وصف المنشور',
        bodyPlaceholder: 'شارك معرفة أو رؤية أو فكرة مفيدة',
        uploadTitle: 'ارفع الفيديو',
        uploadHint: 'MP4 أو MOV، بحد أقصى 10 دقائق. يجب اكتمال رفع الفيديو قبل كتابة الوصف.',
        selectVideo: 'اختر فيديو',
        uploading: 'جارٍ الرفع…',
        uploadedProcessing: 'انتهى الرفع — جارٍ تجهيز الفيديو',
        processingHint: 'يستغرق ذلك عادةً أقل من دقيقة. يمكنك كتابة الوصف الآن والنشر بعد اكتمال التجهيز.',
        stalled: 'ما زال تجهيز الفيديو جارياً',
        stalledHint: 'وصل الفيديو إلينا بنجاح، لكن تجهيزه يستغرق وقتاً أطول من المتوقع. تحقق مرة أخرى، أو عد إلى هذه المسودة لاحقاً.',
        checkAgain: 'تحقق مرة أخرى',
        uploadComplete: 'اكتمل الرفع',
        cancel: 'إلغاء',
        remove: 'إزالة',
        addTags: 'إضافة وسوم',
        tagsCount: (count)=>`وسوم · ${count}`,
        suggestedTags: 'وسوم مقترحة',
        optionalBadge: 'اختياري',
        tagsHint: 'الوسوم اختيارية — تساعد الخبراء المناسبين في العثور على رؤيتك.',
        noTags: 'لا توجد وسوم متاحة لهذا المجال بعد.',
        addTagPlaceholder: 'أضف وسمًا جديدًا…',
        addTag: 'إضافة',
        addTagHint: 'اكتب وسمًا واضغط Enter، أو اضغط على وسم بالأسفل لتحديده.',
        addTagError: 'تعذر إضافة الوسم.',
        shareFromLibrary: 'مشاركة من المكتبة',
        publish: 'نشر',
        publishing: 'جارٍ النشر…',
        saveDraft: 'حفظ كمسودة',
        savingDraft: 'جارٍ الحفظ…',
        draftSaved: 'تم حفظ المسودة.',
        draftSaveFailed: 'تعذر حفظ المسودة.',
        draftSavedRedirecting: 'تم حفظ المسودة. سيتم نقلك إلى النشر…',
        newKnowledgeAttached: 'تم إرفاق عنصر المعرفة الجديد.',
        newKnowledgeMissing: 'تعذر العثور على العنصر الذي نشرته للتو. حاول إضافته من مكتبتك.',
        discardDraft: 'حذف المسودة',
        discardTitle: 'حذف هذه المسودة؟',
        discardDescription: 'سيؤدي هذا إلى حذف المسودة والوسائط المرفوعة نهائياً.',
        keepEditing: 'متابعة التعديل',
        discarding: 'جارٍ الحذف…',
        draftDiscarded: 'تم حذف المسودة.',
        draftDiscardFailed: 'تعذر حذف المسودة.',
        savedVideo: 'فيديو محفوظ',
        publishedToast: 'تم نشر منشورك.',
        videoTooLong: 'يجب ألا تتجاوز مدة الفيديو 10 دقائق.',
        videoWrongType: 'يدعم النظام فيديوهات MP4 أو MOV فقط.',
        imageTooLarge: (name)=>`تم تخطي "${name}" لأن حجمه أكبر من 5 ميجابايت.`,
        tooManyImages: `يمكنك إرفاق حتى ${MAX_IMAGES} صورة.`,
        replacingSavedImages: 'ستحل الصور الجديدة محل الصور المحفوظة في هذه المسودة.',
        videoUploadFailed: 'فشل رفع الفيديو. حاول مرة أخرى.',
        industryFirst: 'اختر المجال أولاً',
        industryRequired: 'اختر مجالاً.',
        videoRequired: 'اختر فيديو وانتظر حتى يكتمل رفعه.',
        videoStillProcessing: 'ما زال الفيديو قيد التجهيز — يمكنك النشر بمجرد أن يصبح جاهزاً.',
        bodyRequired: 'اكتب وصفاً للمنشور.'
    }
};
function getVideoDurationSeconds(file) {
    return new Promise((resolve, reject)=>{
        const element = document.createElement('video');
        const objectUrl = URL.createObjectURL(file);
        element.preload = 'metadata';
        element.onloadedmetadata = ()=>{
            URL.revokeObjectURL(objectUrl);
            resolve(element.duration);
        };
        element.onerror = ()=>{
            URL.revokeObjectURL(objectUrl);
            reject(new Error('Unable to read video metadata'));
        };
        element.src = objectUrl;
    });
}
function isSupportedVideoFile(file) {
    if ([
        'video/mp4',
        'video/quicktime'
    ].includes(file.type)) return true;
    return /\.(mp4|mov)$/i.test(file.name);
}
function PostModal({ locale, mode, opened, draft, onClose, onDraftSaved, onDraftDiscarded, onPublished, autoAttachKnowledgeId, onAutoAttachHandled }) {
    const isArabic = locale === 'ar';
    const copy = copyByLocale[isArabic ? 'ar' : 'en'];
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserProfile"])();
    // --- Post content state ---
    // Two-step flow: 1 = write the post, 2 = categorize (industry + tags)
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [body, setBody] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [industry, setIndustry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedTags, setSelectedTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [relatedInsights, setRelatedInsights] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [images, setImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isPublishing, setIsPublishing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSavingDraft, setIsSavingDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDiscardingDraft, setIsDiscardingDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [discardConfirmOpened, setDiscardConfirmOpened] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [touchedFields, setTouchedFields] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        industry: false,
        video: false,
        body: false
    });
    const [dirtyFields, setDirtyFields] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        industry: false,
        video: false,
        body: false
    });
    // --- Sub-panel state ---
    const [libraryDrawerOpened, setLibraryDrawerOpened] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [industryTags, setIndustryTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoadingTags, setIsLoadingTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newTagName, setNewTagName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [isAddingTag, setIsAddingTag] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // --- Video state ---
    const [videoPhase, setVideoPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('none');
    const [videoFileName, setVideoFileName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [uploadPercent, setUploadPercent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    // Only available once Mux's webhook has fired (video.asset.ready) and the
    // backend has persisted it — see MuxWebhookService::mergeMuxAssetData.
    const [videoPlaybackId, setVideoPlaybackId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const videoUuidRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const abortUploadRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pollTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const videoInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const imageInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const industryButtonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const videoSelectButtonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const videoFieldRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const bodyInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hasVideo = videoPhase !== 'none';
    const hasImages = images.length > 0;
    const isVideoFlow = mode === 'video' || hasVideo;
    // The description stays editable while the provider finishes preparing the
    // video, so the wait is never dead time.
    const isAwaitingProcessing = videoPhase === 'processing' || videoPhase === 'stalled';
    const bodyLocked = isVideoFlow && !isAwaitingProcessing && videoPhase !== 'ready';
    const industryInvalid = touchedFields.industry && industry === null;
    const videoInvalid = touchedFields.video && isVideoFlow && videoPhase !== 'ready';
    // Distinguish "no video yet" from "video uploaded, provider still working":
    // only the first is something the user can act on.
    const videoErrorMessage = isAwaitingProcessing ? copy.videoStillProcessing : copy.videoRequired;
    const bodyInvalid = touchedFields.body && body.trim() === '';
    const initials = user ? `${user.first_name?.[0] ?? ''}${user.last_name?.[0] ?? ''}`.toUpperCase() || 'I' : 'I';
    const fullName = user ? `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim() || user.name : '';
    const stopPolling = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (pollTimerRef.current !== null) {
            clearTimeout(pollTimerRef.current);
            pollTimerRef.current = null;
        }
    }, []);
    const resetAll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        abortUploadRef.current?.();
        abortUploadRef.current = null;
        stopPolling();
        setStep(1);
        setBody('');
        setIndustry(null);
        setSelectedTags([]);
        setNewTagName('');
        setRelatedInsights([]);
        setImages((previous)=>{
            previous.forEach((image)=>{
                if (image.previewUrl.startsWith('blob:')) URL.revokeObjectURL(image.previewUrl);
            });
            return [];
        });
        setVideoPhase('none');
        setVideoFileName('');
        setUploadPercent(0);
        setVideoPlaybackId(null);
        videoUuidRef.current = null;
        setIsPublishing(false);
        setIsSavingDraft(false);
        setIsDiscardingDraft(false);
        setDiscardConfirmOpened(false);
        setTouchedFields({
            industry: false,
            video: false,
            body: false
        });
        setDirtyFields({
            industry: false,
            video: false,
            body: false
        });
    }, [
        stopPolling
    ]);
    // Full cleanup when the modal closes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!opened) resetAll();
    }, [
        opened,
        resetAll
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>()=>stopPolling(), [
        stopPolling
    ]);
    // React does not expose the native file-input `cancel` event. Listen for it
    // directly so validation is shown only when the chooser is dismissed.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const input = videoInputRef.current;
        if (!input) return;
        const markVideoSelectionCancelled = ()=>{
            setTouchedFields((previous)=>({
                    ...previous,
                    video: true
                }));
        };
        input.addEventListener('cancel', markVideoSelectionCancelled);
        return ()=>input.removeEventListener('cancel', markVideoSelectionCancelled);
    }, [
        opened
    ]);
    // --- Video handling ---
    const pollProcessingStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((immediate = false)=>{
        const uuid = videoUuidRef.current;
        if (!uuid) return;
        stopPolling();
        const deadline = Date.now() + PROCESSING_TIMEOUT_MS;
        const check = async ()=>{
            try {
                const isReady = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["checkVideoUploadStatus"])(uuid, locale);
                if (isReady) {
                    // Readiness comes from the dedicated status endpoint. The feed
                    // request is only needed to populate the optional Mux preview.
                    try {
                        const feedItem = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFeedItem"])(uuid, locale);
                        setVideoPlaybackId(feedItem.media?.[0]?.provider_playback_id ?? null);
                    } catch  {
                        setVideoPlaybackId(null);
                    }
                    setVideoPhase('ready');
                    return;
                }
            } catch  {
            // Transient polling failure: fall through and retry until the deadline
            }
            if (Date.now() >= deadline) {
                setVideoPhase('stalled');
                return;
            }
            pollTimerRef.current = setTimeout(check, PROCESSING_POLL_MS);
        };
        if (immediate) {
            void check();
            return;
        }
        pollTimerRef.current = setTimeout(check, PROCESSING_POLL_MS);
    }, [
        locale,
        stopPolling
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!opened || !draft) return;
        resetAll();
        setBody(draft.body ?? '');
        setIndustry(draft.industry ? {
            id: draft.industry.id,
            name: draft.industry.name
        } : null);
        setSelectedTags(draft.tags);
        setRelatedInsights(draft.related_insights.flatMap((item)=>typeof item.id === 'number' ? [
                {
                    id: item.id,
                    type: item.type,
                    title: item.title,
                    slug: item.slug,
                    status: 'published',
                    published_at: null
                }
            ] : []));
        setImages(draft.media.filter((item)=>item.media_type === 'image' && item.url).map((item)=>({
                file: null,
                name: item.name ?? copy.description,
                previewUrl: item.url
            })));
        if (draft.media_type === 'video') {
            const media = draft.media.find((item)=>item.media_type === 'video');
            videoUuidRef.current = draft.uuid;
            setVideoFileName(media?.name ?? copy.savedVideo);
            setVideoPlaybackId(media?.provider_playback_id ?? null);
            if (media?.provider_processing_status === 'ready') {
                setVideoPhase('ready');
            } else if (media) {
                setVideoPhase('processing');
                pollProcessingStatus(true);
            } else {
                setVideoPhase('error');
            }
        }
    }, [
        copy.description,
        copy.savedVideo,
        draft,
        opened,
        pollProcessingStatus,
        resetAll
    ]);
    const recheckProcessingStatus = ()=>{
        setVideoPhase('processing');
        pollProcessingStatus(true);
    };
    const startVideoUpload = async (file)=>{
        setDirtyFields((previous)=>({
                ...previous,
                video: true
            }));
        setTouchedFields((previous)=>({
                ...previous,
                video: false
            }));
        if (!isSupportedVideoFile(file)) {
            toast.error(copy.videoWrongType);
            return;
        }
        try {
            const duration = await getVideoDurationSeconds(file);
            if (duration > MAX_VIDEO_SECONDS) {
                toast.error(copy.videoTooLong);
                return;
            }
        } catch  {
        // If metadata can't be read locally, let the provider validate it
        }
        setVideoPhase('initializing');
        setVideoFileName(file.name);
        setUploadPercent(0);
        try {
            // First upload initializes the draft; replacements refresh the upload session
            const session = videoUuidRef.current ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["refreshVideoUpload"])(videoUuidRef.current, locale) : await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initVideoPost"])(locale);
            videoUuidRef.current = session.uuid;
            setVideoPhase('uploading');
            const { promise, abort } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uploadVideoToProvider"])(session.video_upload.upload_url, file, setUploadPercent);
            abortUploadRef.current = abort;
            await promise;
            abortUploadRef.current = null;
            setVideoPhase('processing');
            pollProcessingStatus();
        } catch (error) {
            abortUploadRef.current = null;
            if (error instanceof DOMException && error.name === 'AbortError') {
                setVideoPhase('none');
                return;
            }
            setVideoPhase('error');
            setTouchedFields((previous)=>({
                    ...previous,
                    video: true
                }));
            toast.error(error instanceof Error ? error.message : copy.videoUploadFailed);
        }
    };
    const cancelOrRemoveVideo = ()=>{
        abortUploadRef.current?.();
        abortUploadRef.current = null;
        stopPolling();
        // Keep the uuid: the next selected file goes through refresh-upload
        setVideoPhase('none');
        setVideoFileName('');
        setUploadPercent(0);
        setVideoPlaybackId(null);
        setTouchedFields((previous)=>({
                ...previous,
                video: true
            }));
    };
    // --- Image handling ---
    const addImages = (files)=>{
        if (!files || files.length === 0) return;
        const accepted = [];
        let remaining = MAX_IMAGES - images.length;
        for (const file of Array.from(files)){
            if (remaining <= 0) {
                toast.warning(copy.tooManyImages);
                break;
            }
            if (file.size > MAX_IMAGE_BYTES) {
                toast.warning(copy.imageTooLarge(file.name));
                continue;
            }
            accepted.push({
                file,
                name: file.name,
                previewUrl: URL.createObjectURL(file)
            });
            remaining -= 1;
        }
        if (accepted.length > 0) {
            setImages((previous)=>{
                const hasSavedImages = previous.some((image)=>image.file === null);
                if (hasSavedImages) {
                    toast.warning(copy.replacingSavedImages);
                    return accepted;
                }
                return [
                    ...previous,
                    ...accepted
                ];
            });
        }
    };
    const removeImage = (index)=>{
        setImages((previous)=>{
            if (previous[index].previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previous[index].previewUrl);
            }
            return previous.filter((_, i)=>i !== index);
        });
    };
    const moveImage = (index, direction)=>{
        setImages((previous)=>{
            const target = index + direction;
            if (target < 0 || target >= previous.length) return previous;
            const next = [
                ...previous
            ];
            [next[index], next[target]] = [
                next[target],
                next[index]
            ];
            return next;
        });
    };
    // --- Tags ---
    const toggleTag = (tag)=>{
        setSelectedTags((previous)=>previous.some((selected)=>selected.id === tag.id) ? previous.filter((selected)=>selected.id !== tag.id) : [
                ...previous,
                tag
            ]);
    };
    // "Add Tag" flow (mirrors Angular add-knowledge step 4): if the typed name
    // already exists in the industry's tags, just select it; otherwise create a
    // custom tag via the API and select it.
    const addNewTag = async ()=>{
        const name = newTagName.trim();
        if (!name || !industry || isAddingTag) return;
        const normalized = name.toLowerCase();
        const existing = industryTags.find((tag)=>tag.name.trim().toLowerCase() === normalized);
        if (existing) {
            if (!selectedTags.some((tag)=>tag.id === existing.id)) toggleTag(existing);
            setNewTagName('');
            return;
        }
        setIsAddingTag(true);
        try {
            const created = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSuggestTag"])(industry.id, name, locale);
            setIndustryTags((previous)=>[
                    created,
                    ...previous
                ]);
            setSelectedTags((previous)=>[
                    ...previous,
                    created
                ]);
            setNewTagName('');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : copy.addTagError);
        } finally{
            setIsAddingTag(false);
        }
    };
    const handleIndustrySelect = (option)=>{
        if (option.id !== industry?.id) {
            // Tags belong to an industry: reset them on change
            setSelectedTags([]);
            setIndustryTags([]);
            setNewTagName('');
        }
        setIndustry(option);
        setTouchedFields((previous)=>({
                ...previous,
                industry: true
            }));
        setDirtyFields((previous)=>({
                ...previous,
                industry: true
            }));
    };
    // Load suggested tags once an industry is chosen on step 2. Tags reset to []
    // on industry change (see handleIndustrySelect), which retriggers this fetch.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (step !== 2 || !industry || industryTags.length > 0) return;
        let cancelled = false;
        setIsLoadingTags(true);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchIndustryTags"])(industry.id, locale).then((tags)=>{
            if (!cancelled) setIndustryTags(tags);
        }).catch(()=>{
            if (!cancelled) setIndustryTags([]);
        }).finally(()=>{
            if (!cancelled) setIsLoadingTags(false);
        });
        return ()=>{
            cancelled = true;
        };
    }, [
        step,
        industry,
        industryTags.length,
        locale
    ]);
    // --- Step navigation ---
    // The compose step (step 1) owns the body and media; it must be valid before
    // the author can move on to categorizing the post.
    const focusStep1Field = (missingVideo)=>{
        window.requestAnimationFrame(()=>{
            if (missingVideo) {
                ;
                (videoSelectButtonRef.current ?? videoFieldRef.current)?.focus();
            } else {
                bodyInputRef.current?.focus();
            }
        });
    };
    const handleNext = ()=>{
        if (isPublishing || isSavingDraft || isDiscardingDraft) return;
        const missingVideo = isVideoFlow && videoPhase !== 'ready';
        const missingBody = body.trim() === '';
        setTouchedFields((previous)=>({
                ...previous,
                video: isVideoFlow,
                body: true
            }));
        setDirtyFields((previous)=>({
                ...previous,
                video: isVideoFlow,
                body: true
            }));
        if (missingVideo || missingBody) {
            focusStep1Field(missingVideo);
            return;
        }
        setStep(2);
    };
    // --- Publish ---
    const handlePublish = async ()=>{
        if (isPublishing || isSavingDraft || isDiscardingDraft) return;
        const missingIndustry = industry === null;
        const missingVideo = isVideoFlow && videoPhase !== 'ready';
        const missingBody = body.trim() === '';
        setTouchedFields({
            industry: true,
            video: isVideoFlow,
            body: true
        });
        setDirtyFields({
            industry: true,
            video: isVideoFlow,
            body: true
        });
        if (missingIndustry || missingVideo || missingBody || !industry) {
            // Body/media live on step 1; industry lives on step 2. Send the author to
            // the step that holds the first missing field.
            if (missingBody || missingVideo) {
                setStep(1);
                focusStep1Field(missingVideo);
            } else {
                setStep(2);
                window.requestAnimationFrame(()=>industryButtonRef.current?.focus());
            }
            return;
        }
        setIsPublishing(true);
        try {
            const payload = {
                body: body.trim(),
                industryId: industry.id,
                tags: selectedTags.map((tag)=>tag.id),
                relatedInsights: relatedInsights.map((item)=>item.id)
            };
            if (isVideoFlow && videoUuidRef.current) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publishVideoPost"])(videoUuidRef.current, payload, locale);
            } else {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publishImageTextPost"])({
                    ...payload,
                    media: images.flatMap((image, index)=>image.file ? [
                            {
                                file: image.file,
                                sortOrder: index
                            }
                        ] : [])
                }, locale, draft?.media_type === 'video' ? undefined : draft?.uuid);
            }
            toast.success(copy.publishedToast);
            onPublished();
            onClose();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : copy.videoUploadFailed);
        } finally{
            setIsPublishing(false);
        }
    };
    // Validate the required fields and persist the draft. Returns the saved draft,
    // or null if validation failed / the save errored (callers decide what to do
    // next: close the modal, or redirect to publishing). Shared by "Save draft"
    // and the "Save and start publish" empty-state CTA.
    const persistDraft = async ()=>{
        if (isPublishing || isSavingDraft || isDiscardingDraft) return null;
        const missingIndustry = industry === null;
        const missingVideo = isVideoFlow && videoUuidRef.current === null;
        const missingBody = body.trim() === '';
        setTouchedFields({
            industry: true,
            video: isVideoFlow,
            body: true
        });
        setDirtyFields({
            industry: true,
            video: isVideoFlow,
            body: true
        });
        if (missingIndustry || missingVideo || missingBody || !industry) {
            if (missingBody || missingVideo) {
                setStep(1);
                focusStep1Field(missingVideo);
            } else {
                setStep(2);
                window.requestAnimationFrame(()=>industryButtonRef.current?.focus());
            }
            return null;
        }
        setIsSavingDraft(true);
        try {
            const payload = {
                body: body.trim(),
                industryId: industry.id,
                tags: selectedTags.map((tag)=>tag.id),
                relatedInsights: relatedInsights.map((item)=>item.id)
            };
            if (isVideoFlow && videoUuidRef.current) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveVideoPostDraft"])(videoUuidRef.current, payload, locale);
            } else {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveImageTextPostDraft"])({
                    ...payload,
                    media: images.flatMap((image, index)=>image.file ? [
                            {
                                file: image.file,
                                sortOrder: index
                            }
                        ] : [])
                }, locale, draft?.media_type === 'video' ? undefined : draft?.uuid);
            }
            const savedDraft = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFeedDraft"])(locale);
            if (!savedDraft) throw new Error(copy.draftSaveFailed);
            return savedDraft;
        } catch (error) {
            toast.error(error instanceof Error ? error.message : copy.draftSaveFailed);
            return null;
        } finally{
            setIsSavingDraft(false);
        }
    };
    const handleSaveDraft = async ()=>{
        const savedDraft = await persistDraft();
        if (!savedDraft) return;
        toast.success(copy.draftSaved);
        onDraftSaved(savedDraft);
    };
    // Empty-library CTA: save the post as a draft, then send the user to the
    // knowledge stepper. The stepper redirects back to this feed with
    // ?attach_knowledge=<id> so we can reopen the composer and attach the new
    // item automatically (handled in FeedComposer + the auto-attach effect below).
    const handlePublishNewKnowledge = async ()=>{
        const savedDraft = await persistDraft();
        if (!savedDraft) return;
        onDraftSaved(savedDraft);
        toast.success(copy.draftSavedRedirecting);
        // Come back to exactly the page the composer lives on; the stepper appends
        // the published knowledge id to this URL.
        const returnUrl = `${window.location.origin}${window.location.pathname}`;
        const stepperUrl = `${("TURBOPACK compile-time value", "http://localhost:4200")}/app/add-knowledge/stepper` + `?return_url=${encodeURIComponent(returnUrl)}`;
        window.location.href = stepperUrl;
    };
    // On return from publishing a new knowledge item, fetch it and attach it to the
    // post automatically. Guarded by a ref so it runs once per id even before the
    // parent clears it.
    const autoAttachedIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!opened || !autoAttachKnowledgeId) return;
        if (autoAttachedIdRef.current === autoAttachKnowledgeId) return;
        autoAttachedIdRef.current = autoAttachKnowledgeId;
        let cancelled = false;
        void (async ()=>{
            try {
                const item = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchLibraryKnowledgeById"])(autoAttachKnowledgeId, locale);
                if (cancelled) return;
                if (item) {
                    setRelatedInsights((previous)=>previous.some((entry)=>entry.id === item.id) || previous.length >= 3 ? previous : [
                            ...previous,
                            item
                        ]);
                    toast.success(copy.newKnowledgeAttached);
                } else {
                    toast.error(copy.newKnowledgeMissing);
                }
            } catch  {
                if (!cancelled) toast.error(copy.newKnowledgeMissing);
            } finally{
                if (!cancelled) onAutoAttachHandled?.();
            }
        })();
        return ()=>{
            cancelled = true;
        };
    }, [
        opened,
        autoAttachKnowledgeId,
        locale,
        copy,
        toast,
        onAutoAttachHandled
    ]);
    const handleDiscardDraft = async ()=>{
        if (!draft || isPublishing || isSavingDraft || isDiscardingDraft) return;
        setIsDiscardingDraft(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteFeedItem"])(draft.uuid, locale);
            toast.success(copy.draftDiscarded);
            setDiscardConfirmOpened(false);
            onDraftDiscarded();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : copy.draftDiscardFailed);
        } finally{
            setIsDiscardingDraft(false);
        }
    };
    const footerIconClass = 'flex h-9 w-9 items-center justify-center rounded-md text-[#5A6B84] transition-colors hover:bg-[#F3F6FB] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]';
    const title = isVideoFlow ? copy.titleVideo : copy.titlePost;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Modal"], {
                opened: opened,
                onClose: onClose,
                size: 640,
                radius: 8,
                centered: true,
                zIndex: 300,
                withCloseButton: false,
                "aria-labelledby": "feed-post-dialog-title",
                styles: {
                    content: {
                        boxShadow: 'none',
                        border: '1px solid #DCE4EF'
                    },
                    body: {
                        position: 'relative'
                    }
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "feed-post-dialog-title",
                        className: "sr-only",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/feed/post/PostModal.tsx",
                        lineNumber: 937,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-label": copy.close,
                        onClick: onClose,
                        className: "absolute end-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-md text-[#5A6472] transition-colors hover:bg-[#F3F6FB] hover:text-[#0B1220] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__["IconX"], {
                            "aria-hidden": true,
                            className: "h-5 w-5",
                            stroke: 1.8
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/PostModal.tsx",
                            lineNumber: 946,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/feed/post/PostModal.tsx",
                        lineNumber: 940,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        noValidate: true,
                        onSubmit: (event)=>{
                            event.preventDefault();
                            void handlePublish();
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 pe-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E0ECFB] text-[13px] font-bold text-[#1D74E0]",
                                        children: user?.profile_photo_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            src: user.profile_photo_url,
                                            alt: fullName,
                                            width: 44,
                                            height: 44,
                                            unoptimized: true,
                                            className: "h-full w-full object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/post/PostModal.tsx",
                                            lineNumber: 960,
                                            columnNumber: 17
                                        }, this) : initials
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 958,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0 flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "truncate text-[15px] font-bold text-[#0B1220]",
                                                children: fullName
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 973,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-0.5 truncate text-[12.5px] font-medium text-[#5A6B84]",
                                                children: step === 1 ? copy.step1Label : copy.step2Label
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 974,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 972,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                lineNumber: 957,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: step === 1 ? undefined : 'hidden',
                                children: [
                                    !bodyLocked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "feed-post-body",
                                                className: "sr-only",
                                                children: copy.description
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 985,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                ref: bodyInputRef,
                                                id: "feed-post-body",
                                                name: "body",
                                                required: true,
                                                value: body,
                                                onChange: (event)=>{
                                                    setBody(event.currentTarget.value);
                                                    setDirtyFields((previous)=>({
                                                            ...previous,
                                                            body: true
                                                        }));
                                                },
                                                onBlur: ()=>setTouchedFields((previous)=>({
                                                            ...previous,
                                                            body: true
                                                        })),
                                                onKeyDown: (event)=>{
                                                    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
                                                        event.preventDefault();
                                                        event.currentTarget.form?.requestSubmit();
                                                    }
                                                },
                                                "aria-invalid": bodyInvalid || undefined,
                                                "aria-describedby": bodyInvalid ? 'feed-post-body-error' : undefined,
                                                "data-dirty": dirtyFields.body || undefined,
                                                placeholder: copy.bodyPlaceholder,
                                                rows: isVideoFlow ? 5 : 7,
                                                className: `w-full resize-none rounded-md border bg-white px-3 py-2.5 text-[15px] leading-relaxed text-[#1C2433] placeholder:text-[#94A3B8] focus-visible:outline-none ${bodyInvalid ? 'border-[#C23B32]' : 'border-[#E5EAF2] focus-visible:border-[#8FB9EA]'}`
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 988,
                                                columnNumber: 13
                                            }, this),
                                            bodyInvalid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                id: "feed-post-body-error",
                                                className: "mt-1.5 text-[12px] font-medium text-[#A9322B]",
                                                children: copy.bodyRequired
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 1017,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 984,
                                        columnNumber: 11
                                    }, this),
                                    isVideoFlow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: videoFieldRef,
                                        tabIndex: -1,
                                        "aria-invalid": videoInvalid || undefined,
                                        "aria-describedby": videoInvalid ? 'feed-post-video-error' : undefined,
                                        "data-dirty": dirtyFields.video || undefined,
                                        className: "mt-4 focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]",
                                        children: [
                                            videoPhase === 'none' || videoPhase === 'error' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col items-center rounded-md border border-dashed border-[#C9DCF6] bg-[#F8FAFD] px-6 py-10 text-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex h-14 w-14 items-center justify-center rounded-md bg-[#EDF3FC]",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconVideo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconVideo$3e$__["IconVideo"], {
                                                            "aria-hidden": true,
                                                            stroke: 1.6,
                                                            className: "h-6 w-6 text-[#1D74E0]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/feed/post/PostModal.tsx",
                                                            lineNumber: 1037,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1036,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "mt-4 text-[17px] font-bold text-[#0B1220]",
                                                        children: copy.uploadTitle
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1039,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mx-auto mt-2 max-w-sm text-[13.5px] leading-6 text-[#64748B]",
                                                        children: copy.uploadHint
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1040,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        ref: videoSelectButtonRef,
                                                        type: "button",
                                                        onClick: ()=>videoInputRef.current?.click(),
                                                        "aria-invalid": videoInvalid || undefined,
                                                        "aria-describedby": videoInvalid ? 'feed-post-video-error' : undefined,
                                                        "data-dirty": dirtyFields.video || undefined,
                                                        className: "mt-5 min-h-10 rounded-md bg-[#1D74E0] px-6 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#155CB8] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]",
                                                        children: copy.selectVideo
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1043,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 1035,
                                                columnNumber: 15
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-md border border-[#E5EAF2] p-4",
                                                children: [
                                                    videoPhase === 'ready' && videoPlaybackId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mb-3 flex max-h-[480px] justify-center overflow-hidden rounded-md bg-black",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mux-player", {
                                                            "playback-id": videoPlaybackId,
                                                            "stream-type": "on-demand",
                                                            "metadata-video-title": videoFileName,
                                                            "accent-color": "#1D74E0",
                                                            "disable-tracking": "",
                                                            style: {
                                                                width: '100%',
                                                                maxHeight: '480px',
                                                                display: 'block'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/feed/post/PostModal.tsx",
                                                            lineNumber: 1059,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1058,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-4",
                                                        children: [
                                                            !(videoPhase === 'ready' && videoPlaybackId) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex h-12 w-16 shrink-0 items-center justify-center rounded-md bg-[#0B1220]",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconVideo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconVideo$3e$__["IconVideo"], {
                                                                    "aria-hidden": true,
                                                                    stroke: 1.6,
                                                                    className: "h-5 w-5 text-white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                    lineNumber: 1072,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1071,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "min-w-0 flex-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "truncate text-[14.5px] font-semibold text-[#0B1220]",
                                                                        children: videoFileName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                        lineNumber: 1076,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        role: "status",
                                                                        "aria-live": "polite",
                                                                        className: "mt-0.5 flex items-center gap-1.5 text-[13px] text-[#5A6B84]",
                                                                        children: videoPhase === 'ready' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCircleCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCircleCheck$3e$__["IconCircleCheck"], {
                                                                                    "aria-hidden": true,
                                                                                    stroke: 1.8,
                                                                                    className: "h-4 w-4 text-[#1BC653]"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                                    lineNumber: 1086,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                copy.uploadComplete
                                                                            ]
                                                                        }, void 0, true) : videoPhase === 'processing' ? copy.uploadedProcessing : videoPhase === 'stalled' ? copy.stalled : `${copy.uploading} ${uploadPercent}%`
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                        lineNumber: 1079,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1075,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: cancelOrRemoveVideo,
                                                                className: "min-h-10 shrink-0 px-1 text-[14px] font-medium text-[#5A6B84] transition-colors hover:text-[#0B1220] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]",
                                                                children: videoPhase === 'uploading' || videoPhase === 'initializing' ? copy.cancel : copy.remove
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1098,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1069,
                                                        columnNumber: 17
                                                    }, this),
                                                    (videoPhase === 'uploading' || videoPhase === 'initializing') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Progress$2f$Progress$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Progress"], {
                                                        value: uploadPercent,
                                                        size: 6,
                                                        radius: "xl",
                                                        color: "#1D74E0",
                                                        className: "mt-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1109,
                                                        columnNumber: 19
                                                    }, this),
                                                    videoPhase === 'processing' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Progress$2f$Progress$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Progress"], {
                                                                value: 100,
                                                                size: 6,
                                                                radius: "xl",
                                                                color: "#1D74E0",
                                                                striped: true,
                                                                animated: true,
                                                                className: "mt-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1113,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-2.5 text-[12.5px] leading-5 text-[#64748B]",
                                                                children: copy.processingHint
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1114,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true),
                                                    videoPhase === 'stalled' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-3 rounded-md border border-[#F0DCA8] bg-[#FEFAF0] p-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[12.5px] leading-5 text-[#7A5B14]",
                                                                children: copy.stalledHint
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1121,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: recheckProcessingStatus,
                                                                className: "mt-2.5 min-h-10 rounded-md border border-[#C9DCF6] px-4 text-[13px] font-medium text-[#1D74E0] transition-colors hover:bg-[#F3F6FB] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]",
                                                                children: copy.checkAgain
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1122,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1120,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 1056,
                                                columnNumber: 15
                                            }, this),
                                            videoInvalid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                id: "feed-post-video-error",
                                                className: "mt-2 text-[12px] font-medium text-[#A9322B]",
                                                children: videoErrorMessage
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 1134,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 1026,
                                        columnNumber: 11
                                    }, this),
                                    hasImages && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4",
                                        children: images.map((image, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "group relative aspect-square overflow-hidden rounded-md border border-[#E5EAF2]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        src: image.previewUrl,
                                                        alt: image.name,
                                                        fill: true,
                                                        unoptimized: true,
                                                        className: "object-cover"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1149,
                                                        columnNumber: 17
                                                    }, this),
                                                    image.file && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute inset-0 hidden items-center justify-center gap-1 bg-black/45 group-hover:flex",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                "aria-label": "Move earlier",
                                                                onClick: ()=>moveImage(index, -1),
                                                                disabled: index === 0,
                                                                className: "flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-[#0B1220] disabled:opacity-40",
                                                                children: isArabic ? '→' : '←'
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1158,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                "aria-label": "Remove image",
                                                                onClick: ()=>removeImage(index),
                                                                className: "flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-[#E8513E]",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__["IconX"], {
                                                                    "aria-hidden": true,
                                                                    className: "h-4 w-4",
                                                                    stroke: 2
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                    lineNumber: 1173,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1167,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                "aria-label": "Move later",
                                                                onClick: ()=>moveImage(index, 1),
                                                                disabled: index === images.length - 1,
                                                                className: "flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-[#0B1220] disabled:opacity-40",
                                                                children: isArabic ? '←' : '→'
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1175,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1157,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "absolute bottom-1 start-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white",
                                                        children: index + 1
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1186,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, image.previewUrl, true, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 1145,
                                                columnNumber: 15
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 1143,
                                        columnNumber: 11
                                    }, this),
                                    relatedInsights.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 space-y-2",
                                        children: relatedInsights.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 rounded-md border border-[#E5EAF2] bg-[#FAFCFE] px-3.5 py-2.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#EDF3FC]",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileDescription$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileDescription$3e$__["IconFileDescription"], {
                                                            "aria-hidden": true,
                                                            stroke: 1.6,
                                                            className: "h-4 w-4 text-[#1D74E0]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/feed/post/PostModal.tsx",
                                                            lineNumber: 1203,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1202,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "min-w-0 flex-1 truncate text-[13px] font-medium text-[#0B1220]",
                                                        children: item.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1205,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        "aria-label": copy.remove,
                                                        onClick: ()=>setRelatedInsights((previous)=>previous.filter((i)=>i.id !== item.id)),
                                                        className: "shrink-0 text-[#94A3B8] transition-colors hover:text-[#0B1220]",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__["IconX"], {
                                                            "aria-hidden": true,
                                                            className: "h-4 w-4",
                                                            stroke: 1.8
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/feed/post/PostModal.tsx",
                                                            lineNumber: 1216,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1208,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, item.id, true, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 1198,
                                                columnNumber: 15
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 1196,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                lineNumber: 981,
                                columnNumber: 9
                            }, this),
                            step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$IndustryField$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        locale: locale,
                                        value: industry,
                                        invalid: industryInvalid,
                                        errorId: "feed-post-industry-error",
                                        buttonRef: industryButtonRef,
                                        onSelect: handleIndustrySelect,
                                        onBlur: ()=>setTouchedFields((previous)=>({
                                                    ...previous,
                                                    industry: true
                                                }))
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 1228,
                                        columnNumber: 13
                                    }, this),
                                    industryInvalid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        id: "feed-post-industry-error",
                                        className: "mt-1.5 text-[12px] font-medium text-[#A9322B]",
                                        children: copy.industryRequired
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 1240,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                lineNumber: 1227,
                                columnNumber: 11
                            }, this),
                            step === 2 && industry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    selectedTags.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 flex flex-wrap gap-2",
                                        children: selectedTags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>toggleTag(tag),
                                                className: "inline-flex items-center gap-1.5 rounded-full bg-[#EDF3FC] px-3 py-1.5 text-[13px] font-medium text-[#1D74E0] transition-colors hover:bg-[#E0ECFB]",
                                                children: [
                                                    "#",
                                                    tag.name,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__["IconX"], {
                                                        "aria-hidden": true,
                                                        className: "h-3.5 w-3.5",
                                                        stroke: 2
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1260,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, tag.id, true, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 1253,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 1251,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 rounded-md border border-[#E5EAF2] bg-[#FAFCFE] p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[11.5px] font-semibold uppercase tracking-wide text-[#5A6B84]",
                                                        children: copy.suggestedTags
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1268,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-flex items-center rounded-full bg-[#FF8A3D] px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-white",
                                                        children: copy.optionalBadge
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1271,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 1267,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 flex gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: newTagName,
                                                        onChange: (event)=>setNewTagName(event.currentTarget.value),
                                                        onKeyDown: (event)=>{
                                                            if (event.key === 'Enter') {
                                                                event.preventDefault();
                                                                addNewTag();
                                                            }
                                                        },
                                                        placeholder: copy.addTagPlaceholder,
                                                        className: "h-10 min-w-0 flex-1 rounded-md border border-[#D6E0EC] bg-white px-3 text-[13.5px] text-[#1C2433] transition-colors placeholder:text-[#94A3B8] focus-visible:border-[#8FB9EA] focus-visible:outline-none"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1278,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: addNewTag,
                                                        disabled: !newTagName.trim() || isAddingTag,
                                                        className: "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-md bg-[#1D74E0] px-4 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#1A67C8] disabled:opacity-50",
                                                        children: [
                                                            isAddingTag ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__["IconLoader2"], {
                                                                "aria-hidden": true,
                                                                className: "h-4 w-4 animate-spin",
                                                                stroke: 2
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1298,
                                                                columnNumber: 21
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlus$3e$__["IconPlus"], {
                                                                "aria-hidden": true,
                                                                className: "h-4 w-4",
                                                                stroke: 2.2
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1300,
                                                                columnNumber: 21
                                                            }, this),
                                                            copy.addTag
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1291,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 1277,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-[12px] text-[#94A3B8]",
                                                children: copy.addTagHint
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 1305,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 flex max-h-48 flex-wrap gap-2 overflow-y-auto",
                                                children: isLoadingTags ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[13px] text-[#94A3B8]",
                                                    children: "…"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/post/PostModal.tsx",
                                                    lineNumber: 1309,
                                                    columnNumber: 17
                                                }, this) : industryTags.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[13px] text-[#94A3B8]",
                                                    children: copy.noTags
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/post/PostModal.tsx",
                                                    lineNumber: 1311,
                                                    columnNumber: 17
                                                }, this) : industryTags.map((tag)=>{
                                                    const isSelected = selectedTags.some((selected)=>selected.id === tag.id);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>toggleTag(tag),
                                                        className: `rounded-full border px-3.5 py-1.5 text-[13.5px] transition-colors ${isSelected ? 'border-[#1D74E0] font-medium text-[#1D74E0]' : 'border-[#E5EAF2] bg-white text-[#5A6B84] hover:border-[#C9DCF6]'}`,
                                                        children: [
                                                            "#",
                                                            tag.name
                                                        ]
                                                    }, tag.id, true, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1316,
                                                        columnNumber: 21
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 1307,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-3 text-[12.5px] text-[#94A3B8]",
                                                children: copy.tagsHint
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 1332,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 1266,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#EDF1F7] pt-3.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex min-w-0 items-center gap-1",
                                        children: [
                                            draft && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setDiscardConfirmOpened(true),
                                                disabled: isPublishing || isSavingDraft || isDiscardingDraft,
                                                className: "me-1 inline-flex min-h-9 items-center gap-1.5 rounded-md px-2 text-[13px] font-medium text-[#B53B32] transition-colors hover:bg-[#FFF3F1] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#E9A39C] disabled:opacity-50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTrash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTrash$3e$__["IconTrash"], {
                                                        "aria-hidden": true,
                                                        className: "h-4 w-4",
                                                        stroke: 1.8
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1347,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "hidden sm:inline",
                                                        children: copy.discardDraft
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1348,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 1341,
                                                columnNumber: 15
                                            }, this),
                                            step === 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    !isVideoFlow && !hasVideo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        "aria-label": "Add images",
                                                        onClick: ()=>imageInputRef.current?.click(),
                                                        className: footerIconClass,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPhoto$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPhoto$3e$__["IconPhoto"], {
                                                            "aria-hidden": true,
                                                            stroke: 1.7,
                                                            className: "h-5 w-5 text-[#1EAB5A]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/feed/post/PostModal.tsx",
                                                            lineNumber: 1360,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1354,
                                                        columnNumber: 19
                                                    }, this),
                                                    mode === 'post' && !hasImages && !hasVideo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        "aria-label": "Add video",
                                                        onClick: ()=>videoInputRef.current?.click(),
                                                        className: footerIconClass,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconVideo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconVideo$3e$__["IconVideo"], {
                                                            "aria-hidden": true,
                                                            stroke: 1.7,
                                                            className: "h-5 w-5 text-[#E8513E]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/feed/post/PostModal.tsx",
                                                            lineNumber: 1370,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1364,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setLibraryDrawerOpened(true),
                                                        className: `flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-[14px] font-medium transition-colors focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] ${relatedInsights.length > 0 ? 'bg-[#EDF3FC] text-[#1D74E0]' : 'text-[#5A6B84] hover:bg-[#F3F6FB]'}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFolderOpen$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFolderOpen$3e$__["IconFolderOpen"], {
                                                                "aria-hidden": true,
                                                                stroke: 1.7,
                                                                className: "h-4.5 w-4.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1382,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "hidden sm:inline",
                                                                children: copy.shareFromLibrary
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1383,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1373,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setStep(1),
                                                disabled: isPublishing || isSavingDraft || isDiscardingDraft,
                                                className: "inline-flex min-h-10 items-center gap-1.5 rounded-md px-3 text-[14px] font-medium text-[#5A6B84] transition-colors hover:bg-[#F3F6FB] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] disabled:opacity-50",
                                                children: [
                                                    isArabic ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronRight$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronRight$3e$__["IconChevronRight"], {
                                                        "aria-hidden": true,
                                                        className: "h-4 w-4",
                                                        stroke: 2
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1394,
                                                        columnNumber: 19
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronLeft$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronLeft$3e$__["IconChevronLeft"], {
                                                        "aria-hidden": true,
                                                        className: "h-4 w-4",
                                                        stroke: 2
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1396,
                                                        columnNumber: 19
                                                    }, this),
                                                    copy.back
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 1387,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 1339,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: step === 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: handleNext,
                                            disabled: isPublishing || isSavingDraft || isDiscardingDraft,
                                            className: "min-h-10 rounded-md bg-[#1D74E0] px-6 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#155CB8] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] disabled:cursor-not-allowed disabled:bg-[#93B9E8]",
                                            children: copy.next
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/post/PostModal.tsx",
                                            lineNumber: 1405,
                                            columnNumber: 15
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>void handleSaveDraft(),
                                                    disabled: isPublishing || isSavingDraft || isDiscardingDraft,
                                                    "aria-busy": isSavingDraft,
                                                    className: "inline-flex min-h-10 items-center justify-center rounded-md border border-[#C9DCF6] bg-white px-4 py-2.5 text-[14px] font-medium text-[#1D74E0] transition-colors hover:bg-[#F2F7FF] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] disabled:cursor-wait disabled:opacity-55",
                                                    children: [
                                                        isSavingDraft && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__["IconLoader2"], {
                                                            "aria-hidden": true,
                                                            className: "me-1.5 h-4 w-4 animate-spin",
                                                            stroke: 2
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/feed/post/PostModal.tsx",
                                                            lineNumber: 1423,
                                                            columnNumber: 21
                                                        }, this),
                                                        isSavingDraft ? copy.savingDraft : copy.saveDraft
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/feed/post/PostModal.tsx",
                                                    lineNumber: 1415,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "submit",
                                                    disabled: isPublishing || isSavingDraft || isDiscardingDraft,
                                                    "aria-busy": isPublishing,
                                                    className: "min-h-10 rounded-md bg-[#1D74E0] px-6 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#155CB8] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] disabled:cursor-wait disabled:bg-[#93B9E8]",
                                                    children: isPublishing ? copy.publishing : copy.publish
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/post/PostModal.tsx",
                                                    lineNumber: 1427,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 1403,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                lineNumber: 1338,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: videoInputRef,
                                type: "file",
                                "aria-label": copy.selectVideo,
                                accept: "video/mp4,video/quicktime,.mp4,.mov",
                                className: "hidden",
                                onChange: (event)=>{
                                    const file = event.currentTarget.files?.[0];
                                    event.currentTarget.value = '';
                                    if (file) startVideoUpload(file);
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                lineNumber: 1441,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: imageInputRef,
                                type: "file",
                                "aria-label": isArabic ? 'إضافة صور' : 'Add images',
                                accept: "image/*",
                                multiple: true,
                                className: "hidden",
                                onChange: (event)=>{
                                    addImages(event.currentTarget.files);
                                    event.currentTarget.value = '';
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                lineNumber: 1453,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/post/PostModal.tsx",
                        lineNumber: 949,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/post/PostModal.tsx",
                lineNumber: 923,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Modal"], {
                opened: discardConfirmOpened,
                onClose: ()=>{
                    if (!isDiscardingDraft) setDiscardConfirmOpened(false);
                },
                title: copy.discardTitle,
                centered: true,
                size: "sm",
                radius: 8,
                zIndex: 500,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[14px] leading-6 text-[#5D6D89]",
                        children: copy.discardDescription
                    }, void 0, false, {
                        fileName: "[project]/components/feed/post/PostModal.tsx",
                        lineNumber: 1479,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 flex justify-end gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setDiscardConfirmOpened(false),
                                disabled: isDiscardingDraft,
                                className: "min-h-10 rounded-md border border-[#DCE4EF] px-4 text-[14px] font-medium text-[#5D6D89] transition-colors hover:bg-[#F7F9FC] disabled:opacity-50",
                                children: copy.keepEditing
                            }, void 0, false, {
                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                lineNumber: 1481,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>void handleDiscardDraft(),
                                disabled: isDiscardingDraft,
                                className: "inline-flex min-h-10 items-center rounded-md bg-[#C23B32] px-4 text-[14px] font-medium text-white transition-colors hover:bg-[#A9322B] disabled:cursor-wait disabled:opacity-60",
                                children: [
                                    isDiscardingDraft && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__["IconLoader2"], {
                                        "aria-hidden": true,
                                        className: "me-1.5 h-4 w-4 animate-spin",
                                        stroke: 2
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 1496,
                                        columnNumber: 15
                                    }, this),
                                    isDiscardingDraft ? copy.discarding : copy.discardDraft
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                lineNumber: 1489,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/post/PostModal.tsx",
                        lineNumber: 1480,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/post/PostModal.tsx",
                lineNumber: 1468,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$KnowledgeLibraryDrawer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                locale: locale,
                opened: libraryDrawerOpened,
                selected: relatedInsights,
                onClose: ()=>setLibraryDrawerOpened(false),
                onConfirm: (items)=>{
                    setRelatedInsights(items);
                    setLibraryDrawerOpened(false);
                },
                onPublishNew: ()=>{
                    setLibraryDrawerOpened(false);
                    void handlePublishNewKnowledge();
                }
            }, void 0, false, {
                fileName: "[project]/components/feed/post/PostModal.tsx",
                lineNumber: 1503,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/components/feed/post/FeedComposer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FeedComposer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileDescription$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileDescription$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconFileDescription.mjs [app-ssr] (ecmascript) <export default as IconFileDescription>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPhoto$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPhoto$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconPhoto.mjs [app-ssr] (ecmascript) <export default as IconPhoto>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconVideo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconVideo$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconVideo.mjs [app-ssr] (ecmascript) <export default as IconVideo>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/toast/ToastContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/header/hooks/useUserProfile.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/feed.service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$BecomeInsighterCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/post/BecomeInsighterCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$PostModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/post/PostModal.tsx [app-ssr] (ecmascript)");
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
        placeholder: 'Share your insights...',
        video: 'Video',
        image: 'Image',
        article: 'White Paper',
        checkingDraft: 'Checking your draft…'
    },
    ar: {
        placeholder: 'شارك رؤاك...',
        video: 'فيديو',
        image: 'صورة',
        article: 'ورقة بيضاء',
        checkingDraft: 'جارٍ التحقق من المسودة…'
    }
};
function FeedComposer({ locale }) {
    const copy = copyByLocale[locale === 'ar' ? 'ar' : 'en'];
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const { user, roles, isAuthResolved } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserProfile"])();
    const [modalMode, setModalMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [draft, setDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isCheckingDraft, setIsCheckingDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [autoAttachKnowledgeId, setAutoAttachKnowledgeId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isUpgradeCardOpen, setIsUpgradeCardOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // The feed post endpoints are gated to insighter/company roles server-side
    // (routes/api/insighter.php: role:insighter|company-insighter). Guests and
    // plain clients can't publish, so their composer opens the role-upgrade card
    // without touching a gated endpoint.
    const canPost = !!user && roles.some((role)=>[
            'insighter',
            'company',
            'company-insighter'
        ].includes(role));
    const isClientOnly = !!user && roles.includes('client') && !roles.some((role)=>[
            'insighter',
            'company',
            'company-insighter'
        ].includes(role));
    const refreshDraft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (signal)=>{
        if (!canPost) {
            setDraft(null);
            return null;
        }
        try {
            const currentDraft = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFeedDraft"])(locale, signal);
            setDraft(currentDraft);
            return currentDraft;
        } catch (error) {
            if (error instanceof DOMException && error.name === 'AbortError') return null;
            throw error;
        }
    }, [
        canPost,
        locale
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isAuthResolved || !canPost) return;
        const controller = new AbortController();
        void refreshDraft(controller.signal).catch(()=>undefined);
        return ()=>controller.abort();
    }, [
        canPost,
        isAuthResolved,
        refreshDraft
    ]);
    // Returning from the knowledge stepper: the dashboard redirects back with
    // ?attach_knowledge=<id>. Reopen the composer on the saved draft and let
    // PostModal attach the freshly published item automatically.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isAuthResolved || !canPost) return;
        const params = new URLSearchParams(window.location.search);
        const raw = params.get('attach_knowledge');
        if (!raw) return;
        // Strip the param first so a refresh can't re-trigger the flow.
        params.delete('attach_knowledge');
        const query = params.toString();
        router.replace(`${window.location.pathname}${query ? `?${query}` : ''}`, {
            scroll: false
        });
        const id = Number(raw);
        if (!Number.isInteger(id) || id <= 0) return;
        void (async ()=>{
            const currentDraft = await refreshDraft().catch(()=>null);
            setAutoAttachKnowledgeId(id);
            setModalMode(currentDraft?.media_type === 'video' ? 'video' : 'post');
        })();
    }, [
        isAuthResolved,
        canPost,
        refreshDraft,
        router
    ]);
    const openComposer = async (requestedMode)=>{
        if (isClientOnly) {
            setIsUpgradeCardOpen(true);
            return;
        }
        if (isCheckingDraft) return;
        setIsCheckingDraft(true);
        try {
            const currentDraft = await refreshDraft();
            if (currentDraft?.content_type === 'article' || !currentDraft && requestedMode === 'article') {
                router.push(`/${locale}/article/write`);
                return;
            }
            setModalMode(currentDraft ? currentDraft.media_type === 'video' ? 'video' : 'post' : requestedMode);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : copy.checkingDraft);
        } finally{
            setIsCheckingDraft(false);
        }
    };
    const initials = user ? `${user.first_name?.[0] ?? ''}${user.last_name?.[0] ?? ''}`.toUpperCase() || 'I' : 'I';
    if (!isAuthResolved) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "px-4 sm:px-6 xl:px-0",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-[128px] animate-pulse rounded-lg border border-[#DCE4EF] bg-[#F8FAFD]"
            }, void 0, false, {
                fileName: "[project]/components/feed/post/FeedComposer.tsx",
                lineNumber: 136,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/feed/post/FeedComposer.tsx",
            lineNumber: 135,
            columnNumber: 7
        }, this);
    }
    if (!canPost && !isClientOnly) {
        return null;
    }
    const composerActions = [
        {
            label: copy.video,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconVideo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconVideo$3e$__["IconVideo"],
            color: '#E8513E',
            onClick: ()=>void openComposer('video')
        },
        {
            label: copy.image,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPhoto$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPhoto$3e$__["IconPhoto"],
            color: '#1EAB5A',
            onClick: ()=>void openComposer('post')
        },
        {
            label: copy.article,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileDescription$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileDescription$3e$__["IconFileDescription"],
            color: '#8B5CF6',
            onClick: ()=>void openComposer('article')
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 sm:px-6 xl:px-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-hidden rounded-lg border border-[#DCE4EF] bg-white",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex min-h-[68px] items-center gap-4 px-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#E7F0FD]",
                                    children: user?.profile_photo_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: user.profile_photo_url,
                                        alt: initials,
                                        className: "h-full w-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/post/FeedComposer.tsx",
                                        lineNumber: 173,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex h-full w-full items-center justify-center text-[13px] font-bold text-[#2378E8]",
                                        children: initials
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/post/FeedComposer.tsx",
                                        lineNumber: 179,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/FeedComposer.tsx",
                                    lineNumber: 171,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>void openComposer('post'),
                                    disabled: isCheckingDraft,
                                    className: "min-w-0 flex-1 py-3 text-start text-[14px] font-normal text-[#8A99B1] transition-colors hover:text-[#667791] focus-visible:outline-[1px] focus-visible:outline-offset-[-1px] focus-visible:outline-[#B7D2F4]",
                                    children: copy.placeholder
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/FeedComposer.tsx",
                                    lineNumber: 184,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/post/FeedComposer.tsx",
                            lineNumber: 170,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid min-h-[60px] grid-cols-3 border-t border-[#E4EAF2] px-2",
                            children: composerActions.map(({ label, icon: ActionIcon, color, onClick })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onClick,
                                    disabled: !onClick,
                                    className: "flex min-w-0 items-center justify-center gap-2 px-2 text-[14px] font-normal text-[#5D6D89] transition-colors hover:bg-[#F7F9FC] focus-visible:outline-[1px] focus-visible:outline-offset-[-1px] focus-visible:outline-[#B7D2F4] disabled:cursor-default disabled:hover:bg-transparent",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ActionIcon, {
                                            "aria-hidden": true,
                                            className: "h-5 w-5 shrink-0",
                                            stroke: 1.9,
                                            style: {
                                                color
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/post/FeedComposer.tsx",
                                            lineNumber: 202,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "truncate",
                                            children: label
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/post/FeedComposer.tsx",
                                            lineNumber: 203,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, label, true, {
                                    fileName: "[project]/components/feed/post/FeedComposer.tsx",
                                    lineNumber: 195,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/FeedComposer.tsx",
                            lineNumber: 193,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/feed/post/FeedComposer.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/feed/post/FeedComposer.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$PostModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                locale: locale,
                mode: modalMode ?? 'post',
                opened: modalMode !== null,
                draft: draft,
                autoAttachKnowledgeId: autoAttachKnowledgeId,
                onAutoAttachHandled: ()=>setAutoAttachKnowledgeId(null),
                onClose: ()=>{
                    setModalMode(null);
                    setAutoAttachKnowledgeId(null);
                },
                onDraftSaved: (savedDraft)=>{
                    setDraft(savedDraft);
                    setModalMode(null);
                },
                onDraftDiscarded: ()=>{
                    setDraft(null);
                    setModalMode(null);
                    window.dispatchEvent(new Event('feed:published'));
                },
                onPublished: ()=>{
                    setDraft(null);
                    window.dispatchEvent(new Event('feed:published'));
                }
            }, void 0, false, {
                fileName: "[project]/components/feed/post/FeedComposer.tsx",
                lineNumber: 210,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$BecomeInsighterCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                locale: locale,
                opened: isUpgradeCardOpen,
                onClose: ()=>setIsUpgradeCardOpen(false)
            }, void 0, false, {
                fileName: "[project]/components/feed/post/FeedComposer.tsx",
                lineNumber: 236,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=_9c551864._.js.map