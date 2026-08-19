(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/services/feed.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    "getInsighterProfileFeed",
    ()=>getInsighterProfileFeed,
    "getMyFeeds",
    ()=>getMyFeeds,
    "getSavedCommunityFeed",
    ()=>getSavedCommunityFeed,
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
    "setCommunityFeedItemSaved",
    ()=>setCommunityFeedItemSaved,
    "setCommunityFeedItemTracked",
    ()=>setCommunityFeedItemTracked,
    "uploadVideoToProvider",
    ()=>uploadVideoToProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
'use client';
;
;
;
class CommunityFeedApiError extends Error {
    constructor(message, status, code = null, refreshRequired = false){
        super(message), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "status", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "code", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "refreshRequired", void 0), this.status = status, this.code = code, this.refreshRequired = refreshRequired;
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
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
    if (token) {
        headers.Authorization = "Bearer ".concat(token);
    }
    return headers;
}
async function parseErrorMessage(response, fallback) {
    let message = fallback;
    try {
        const body = await response.json();
        if (typeof (body === null || body === void 0 ? void 0 : body.message) === 'string' && body.message.trim() !== '') {
            message = body.message;
        } else if ((body === null || body === void 0 ? void 0 : body.errors) && typeof body.errors === 'object') {
            const first = Object.values(body.errors).flat()[0];
            if (typeof first === 'string') message = first;
        }
    } catch (e) {
    // Non-JSON error body: keep fallback
    }
    throw new Error(message);
}
async function initVideoPost(locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/insighter/feed/post/video/init'), {
        method: 'POST',
        headers: authHeaders(locale)
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to initialize the video upload.');
    }
    return response.json();
}
async function refreshVideoUpload(uuid, locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/insighter/feed/post/video/refresh-upload/".concat(uuid)), {
        method: 'POST',
        headers: authHeaders(locale)
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to refresh the video upload.');
    }
    return response.json();
}
async function checkVideoUploadStatus(uuid, locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/insighter/feed/post/video/check-status/".concat(uuid)), {
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
                reject(new Error("Video upload failed (".concat(xhr.status, ").")));
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
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/insighter/feed/".concat(uuid)), {
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
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/platform/community/feed/articles/".concat(encodeURIComponent(slug))), {
        headers: authHeaders(locale),
        cache: 'no-store',
        signal
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to load the White Paper.');
    }
    const body = await response.json();
    return body.data;
}
async function getCommunityFeedPost(slug, locale, signal) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/platform/community/feed/posts/".concat(encodeURIComponent(slug))), {
        headers: authHeaders(locale),
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
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/insighter/feed/draft'), {
        headers: authHeaders(locale),
        cache: 'no-store',
        signal
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to load your saved draft.');
    }
    const body = await response.json();
    var _body_data;
    return (_body_data = body.data) !== null && _body_data !== void 0 ? _body_data : null;
}
async function getMyFeeds(page, locale, signal) {
    var _body_data;
    const params = new URLSearchParams({
        page: String(page),
        per_page: '10'
    });
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/insighter/feed?".concat(params)), {
        headers: authHeaders(locale),
        cache: 'no-store',
        signal
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to load your posts.');
    }
    const body = await response.json();
    var _body_data1, _body_data_length, _body_meta;
    return {
        data: (_body_data1 = body.data) !== null && _body_data1 !== void 0 ? _body_data1 : [],
        meta: (_body_meta = body.meta) !== null && _body_meta !== void 0 ? _body_meta : {
            current_page: page,
            last_page: page,
            per_page: 10,
            total: (_body_data_length = (_body_data = body.data) === null || _body_data === void 0 ? void 0 : _body_data.length) !== null && _body_data_length !== void 0 ? _body_data_length : 0
        }
    };
}
async function requestCommunityFeed(path, locale, signal) {
    var _body_meta, _body_meta1, _body_meta2, _body_meta3, _body_meta4, _body_meta5, _body_meta6, _body_meta7, _body_meta8, _body_meta9;
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])(path), {
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
            if (typeof (body === null || body === void 0 ? void 0 : body.message) === 'string' && body.message.trim() !== '') {
                message = body.message;
            }
            if (typeof (body === null || body === void 0 ? void 0 : body.code) === 'string') code = body.code;
            refreshRequired = (body === null || body === void 0 ? void 0 : body.refresh_required) === true;
        } catch (e) {
        // Keep the fallback for non-JSON error responses.
        }
        throw new CommunityFeedApiError(message, response.status, code, refreshRequired);
    }
    const body = await response.json();
    var _body_data, _body_meta_snapshot_at, _body_meta_ranking_version, _body_meta_next_cursor;
    return {
        data: (_body_data = body.data) !== null && _body_data !== void 0 ? _body_data : [],
        meta: {
            snapshot_at: (_body_meta_snapshot_at = (_body_meta = body.meta) === null || _body_meta === void 0 ? void 0 : _body_meta.snapshot_at) !== null && _body_meta_snapshot_at !== void 0 ? _body_meta_snapshot_at : '',
            ranking_version: (_body_meta_ranking_version = (_body_meta1 = body.meta) === null || _body_meta1 === void 0 ? void 0 : _body_meta1.ranking_version) !== null && _body_meta_ranking_version !== void 0 ? _body_meta_ranking_version : '',
            has_more: ((_body_meta2 = body.meta) === null || _body_meta2 === void 0 ? void 0 : _body_meta2.has_more) === true,
            next_cursor: (_body_meta_next_cursor = (_body_meta3 = body.meta) === null || _body_meta3 === void 0 ? void 0 : _body_meta3.next_cursor) !== null && _body_meta_next_cursor !== void 0 ? _body_meta_next_cursor : null,
            is_guest_preview: (_body_meta4 = body.meta) === null || _body_meta4 === void 0 ? void 0 : _body_meta4.is_guest_preview,
            preview_limit: (_body_meta5 = body.meta) === null || _body_meta5 === void 0 ? void 0 : _body_meta5.preview_limit,
            authentication_required_for_more: (_body_meta6 = body.meta) === null || _body_meta6 === void 0 ? void 0 : _body_meta6.authentication_required_for_more,
            limit: (_body_meta7 = body.meta) === null || _body_meta7 === void 0 ? void 0 : _body_meta7.limit,
            candidate_count: (_body_meta8 = body.meta) === null || _body_meta8 === void 0 ? void 0 : _body_meta8.candidate_count,
            feed_session_id: (_body_meta9 = body.meta) === null || _body_meta9 === void 0 ? void 0 : _body_meta9.feed_session_id
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
    return requestCommunityFeed("/api/platform/community/feed?".concat(params.toString()), locale, signal);
}
async function getInsighterProfileFeed(uuid, locale, cursor, signal) {
    var _body_meta, _body_meta1, _body_meta2;
    const params = new URLSearchParams({
        limit: '10'
    });
    if (cursor) params.set('cursor', cursor);
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/platform/insighter/profile/".concat(encodeURIComponent(uuid), "/feed?").concat(params.toString())), {
        headers: authHeaders(locale),
        cache: 'no-store',
        signal
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to load this insighter’s posts.');
    }
    const body = await response.json();
    var _body_data, _body_meta_next_cursor, _body_meta_per_page;
    return {
        data: (_body_data = body.data) !== null && _body_data !== void 0 ? _body_data : [],
        meta: {
            has_more: Boolean((_body_meta = body.meta) === null || _body_meta === void 0 ? void 0 : _body_meta.next_cursor),
            next_cursor: (_body_meta_next_cursor = (_body_meta1 = body.meta) === null || _body_meta1 === void 0 ? void 0 : _body_meta1.next_cursor) !== null && _body_meta_next_cursor !== void 0 ? _body_meta_next_cursor : null,
            limit: (_body_meta_per_page = (_body_meta2 = body.meta) === null || _body_meta2 === void 0 ? void 0 : _body_meta2.per_page) !== null && _body_meta_per_page !== void 0 ? _body_meta_per_page : 10
        }
    };
}
async function getSavedCommunityFeed(locale, cursor, signal) {
    var _body_meta, _body_meta1;
    const params = new URLSearchParams({
        limit: '10'
    });
    if (cursor) params.set('cursor', cursor);
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/platform/community/feed/saved?".concat(params.toString())), {
        headers: authHeaders(locale),
        cache: 'no-store',
        signal
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to load your saved posts.');
    }
    const body = await response.json();
    var _body_meta_next_cursor;
    const nextCursor = (_body_meta_next_cursor = (_body_meta = body.meta) === null || _body_meta === void 0 ? void 0 : _body_meta.next_cursor) !== null && _body_meta_next_cursor !== void 0 ? _body_meta_next_cursor : null;
    var _body_data, _body_meta_per_page;
    return {
        data: (_body_data = body.data) !== null && _body_data !== void 0 ? _body_data : [],
        meta: {
            has_more: Boolean(nextCursor),
            next_cursor: nextCursor,
            per_page: (_body_meta_per_page = (_body_meta1 = body.meta) === null || _body_meta1 === void 0 ? void 0 : _body_meta1.per_page) !== null && _body_meta_per_page !== void 0 ? _body_meta_per_page : 10
        }
    };
}
async function setCommunityFeedItemTracked(uuid, isTracked, locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/platform/community/feed/track/".concat(encodeURIComponent(uuid))), {
        method: isTracked ? 'PUT' : 'DELETE',
        headers: authHeaders(locale)
    });
    if (!response.ok) {
        await parseErrorMessage(response, isTracked ? 'Unable to track this post.' : 'Unable to untrack this post.');
    }
    const body = await response.json();
    return body.data;
}
async function setCommunityFeedItemSaved(uuid, isSaved, locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/platform/community/feed/save/".concat(encodeURIComponent(uuid))), {
        method: isSaved ? 'PUT' : 'DELETE',
        headers: authHeaders(locale)
    });
    if (!response.ok) {
        await parseErrorMessage(response, isSaved ? 'Unable to save this post.' : 'Unable to remove this post from saved posts.');
    }
    const body = await response.json();
    return body.data;
}
async function searchCommunityFeed(locale, search, signal) {
    var _body_data, _body_data1, _body_meta, _body_meta1, _body_meta2, _body_meta3, _body_meta4, _body_meta5, _body_meta6, _body_meta7;
    var _search_limit;
    const params = new URLSearchParams({
        keyword: search.keyword.trim(),
        accuracy: 'any',
        limit: String((_search_limit = search.limit) !== null && _search_limit !== void 0 ? _search_limit : 10)
    });
    if (search.cursor) params.set('cursor', search.cursor);
    if (search.industry) params.set('industry', String(search.industry));
    if (search.contentType) params.set('content_type', search.contentType);
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/platform/community/feed/search?".concat(params.toString())), {
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
            if (typeof (body === null || body === void 0 ? void 0 : body.message) === 'string' && body.message.trim() !== '') {
                message = body.message;
            }
            if (typeof (body === null || body === void 0 ? void 0 : body.code) === 'string') code = body.code;
            refreshRequired = (body === null || body === void 0 ? void 0 : body.refresh_required) === true;
        } catch (e) {
        // Keep the fallback for non-JSON error responses.
        }
        throw new CommunityFeedApiError(message, response.status, code, refreshRequired);
    }
    const body = await response.json();
    var _body_data_insights, _body_data_feed, _body_meta_snapshot_at, _body_meta_search_version, _body_meta_insights_limit, _body_meta_feed_limit, _ref, _body_meta_next_cursor, _body_meta_feed_search_session_id;
    return {
        insights: (_body_data_insights = (_body_data = body.data) === null || _body_data === void 0 ? void 0 : _body_data.insights) !== null && _body_data_insights !== void 0 ? _body_data_insights : [],
        feed: (_body_data_feed = (_body_data1 = body.data) === null || _body_data1 === void 0 ? void 0 : _body_data1.feed) !== null && _body_data_feed !== void 0 ? _body_data_feed : [],
        meta: {
            scope: 'all',
            language: ((_body_meta = body.meta) === null || _body_meta === void 0 ? void 0 : _body_meta.language) === 'arabic' ? 'arabic' : 'english',
            snapshot_at: (_body_meta_snapshot_at = (_body_meta1 = body.meta) === null || _body_meta1 === void 0 ? void 0 : _body_meta1.snapshot_at) !== null && _body_meta_snapshot_at !== void 0 ? _body_meta_snapshot_at : '',
            search_version: (_body_meta_search_version = (_body_meta2 = body.meta) === null || _body_meta2 === void 0 ? void 0 : _body_meta2.search_version) !== null && _body_meta_search_version !== void 0 ? _body_meta_search_version : '',
            insights_limit: (_body_meta_insights_limit = (_body_meta3 = body.meta) === null || _body_meta3 === void 0 ? void 0 : _body_meta3.insights_limit) !== null && _body_meta_insights_limit !== void 0 ? _body_meta_insights_limit : 0,
            feed_limit: (_ref = (_body_meta_feed_limit = (_body_meta4 = body.meta) === null || _body_meta4 === void 0 ? void 0 : _body_meta4.feed_limit) !== null && _body_meta_feed_limit !== void 0 ? _body_meta_feed_limit : search.limit) !== null && _ref !== void 0 ? _ref : 10,
            has_more: ((_body_meta5 = body.meta) === null || _body_meta5 === void 0 ? void 0 : _body_meta5.has_more) === true,
            next_cursor: (_body_meta_next_cursor = (_body_meta6 = body.meta) === null || _body_meta6 === void 0 ? void 0 : _body_meta6.next_cursor) !== null && _body_meta_next_cursor !== void 0 ? _body_meta_next_cursor : null,
            feed_search_session_id: (_body_meta_feed_search_session_id = (_body_meta7 = body.meta) === null || _body_meta7 === void 0 ? void 0 : _body_meta7.feed_search_session_id) !== null && _body_meta_feed_search_session_id !== void 0 ? _body_meta_feed_search_session_id : null
        }
    };
}
async function deleteFeedItem(uuid, locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/insighter/feed/".concat(uuid)), {
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
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/insighter/feed/post/video/properties/".concat(uuid)), {
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
    var _payload_media, _body_data;
    const jsonPayload = {
        body: payload.body,
        industry_id: payload.industryId,
        status,
        tags: payload.tags,
        related_insights: payload.relatedInsights
    };
    if (uuid) {
        var _payload_media1, _payload_media2;
        // Send metadata as JSON first so empty tag/insight arrays are preserved.
        // When images are replaced, keep the item as a draft until that upload
        // succeeds, then apply the requested final status with the media request.
        const metadataResponse = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/insighter/feed/post/image-text/".concat(uuid)), {
            method: 'PUT',
            headers: {
                ...authHeaders(locale),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...jsonPayload,
                status: ((_payload_media1 = payload.media) === null || _payload_media1 === void 0 ? void 0 : _payload_media1.length) ? 'draft' : status
            })
        });
        if (!metadataResponse.ok) {
            await parseErrorMessage(metadataResponse, 'Unable to update the post.');
        }
        if (!((_payload_media2 = payload.media) === null || _payload_media2 === void 0 ? void 0 : _payload_media2.length)) return uuid;
    }
    const formData = new FormData();
    formData.append('body', payload.body);
    formData.append('industry_id', String(payload.industryId));
    formData.append('status', status);
    if (!uuid) {
        payload.tags.forEach((tagId, index)=>formData.append("tags[".concat(index, "]"), String(tagId)));
        payload.relatedInsights.forEach((knowledgeId, index)=>formData.append("related_insights[".concat(index, "]"), String(knowledgeId)));
    }
    (_payload_media = payload.media) === null || _payload_media === void 0 ? void 0 : _payload_media.forEach((entry, index)=>{
        formData.append("media[".concat(index, "][image]"), entry.file);
        formData.append("media[".concat(index, "][sort_order]"), String(entry.sortOrder));
    });
    if (uuid) formData.append('_method', 'PUT');
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])(uuid ? "/api/insighter/feed/post/image-text/".concat(uuid) : '/api/insighter/feed/post/image-text'), {
        method: 'POST',
        headers: authHeaders(locale),
        body: formData
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to publish the post.');
    }
    if (uuid) return uuid;
    const body = await response.json();
    return (_body_data = body.data) === null || _body_data === void 0 ? void 0 : _body_data.uuid;
}
async function publishArticle(payload, locale, uuid) {
    return saveArticle(payload, 'published', locale, uuid);
}
async function saveArticleDraft(payload, locale, uuid) {
    return saveArticle(payload, 'draft', locale, uuid);
}
async function saveArticle(payload, status, locale, uuid) {
    var _body_data;
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
        const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/insighter/feed/article/".concat(uuid)), {
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
            const coverResponse = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/insighter/feed/article/".concat(uuid)), {
                method: 'POST',
                headers: authHeaders(locale),
                body: coverFormData
            });
            if (!coverResponse.ok) {
                await parseErrorMessage(coverResponse, 'Unable to upload the White Paper cover image.');
            }
        }
        if (uploadCoverBeforePublishing) {
            const publishResponse = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/insighter/feed/article/".concat(uuid)), {
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
    payload.tags.forEach((tagId, index)=>formData.append("tags[".concat(index, "]"), String(tagId)));
    payload.relatedInsights.forEach((knowledgeId, index)=>formData.append("related_insights[".concat(index, "]"), String(knowledgeId)));
    if (payload.coverImage) {
        formData.append('cover_image', payload.coverImage);
    }
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/insighter/feed/article'), {
        method: 'POST',
        headers: authHeaders(locale),
        body: formData
    });
    if (!response.ok) {
        await parseErrorMessage(response, status === 'draft' ? 'Unable to save the White Paper draft.' : 'Unable to publish the White Paper.');
    }
    const body = await response.json();
    return (_body_data = body.data) === null || _body_data === void 0 ? void 0 : _body_data.uuid;
}
async function fetchIndustryTags(industryId, locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/common/setting/tag/industry/".concat(industryId)), {
        headers: authHeaders(locale)
    });
    if (!response.ok) return [];
    const body = await response.json();
    var _body_data;
    return ((_body_data = body.data) !== null && _body_data !== void 0 ? _body_data : []).map((tag)=>({
            id: tag.id,
            name: tag.name
        }));
}
async function createSuggestTag(industryId, name, locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/insighter/tag/suggest'), {
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
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/insighter/library/knowledge?".concat(params)), {
        headers: authHeaders(locale)
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to load your library.');
    }
    const body = await response.json();
    var _body_data, _body_meta;
    return {
        data: ((_body_data = body.data) !== null && _body_data !== void 0 ? _body_data : []).map((item)=>({
                id: item.id,
                type: item.type,
                title: item.title,
                slug: item.slug,
                status: item.status,
                published_at: item.published_at
            })),
        meta: (_body_meta = body.meta) !== null && _body_meta !== void 0 ? _body_meta : {
            current_page: page,
            last_page: page,
            per_page: 10,
            total: 0
        }
    };
}
async function fetchLibraryKnowledgeById(id, locale) {
    let maxPages = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 5;
    for(let page = 1; page <= maxPages; page += 1){
        const result = await fetchPublishedLibraryKnowledge(page, locale);
        const match = result.data.find((item)=>item.id === id);
        if (match) return match;
        if (page >= result.meta.last_page) break;
    }
    return null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/feed/FeedSaveButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FeedSaveButton,
    "feedSaveChangedEvent",
    ()=>feedSaveChangedEvent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Tooltip$2f$Tooltip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Tooltip/Tooltip.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBookmark$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBookmark$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBookmark.mjs [app-client] (ecmascript) <export default as IconBookmark>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconLoader2.mjs [app-client] (ecmascript) <export default as IconLoader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/toast/ToastContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/header/hooks/useUserProfile.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/feed.service.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
const feedSaveChangedEvent = 'feed:save-changed';
const copyByLocale = {
    en: {
        save: 'Save post',
        unsave: 'Remove from saved posts',
        saveAction: 'Save',
        savedAction: 'Saved',
        updating: 'Updating saved post…',
        saved: 'Post saved.',
        removed: 'Post removed from saved posts.',
        failed: 'Unable to update your saved posts.'
    },
    ar: {
        save: 'حفظ المنشور',
        unsave: 'إزالة من المنشورات المحفوظة',
        saveAction: 'حفظ',
        savedAction: 'محفوظ',
        updating: 'جارٍ تحديث المنشورات المحفوظة…',
        saved: 'تم حفظ المنشور.',
        removed: 'تمت إزالة المنشور من المحفوظات.',
        failed: 'تعذر تحديث المنشورات المحفوظة.'
    }
};
function FeedSaveButton(param) {
    let { uuid, identifier, contentType, initialIsSaved, locale, tone = 'card', layout = 'icon', className, onChange } = param;
    _s();
    const copy = copyByLocale[locale === 'ar' ? 'ar' : 'en'];
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const { user, isAuthResolved } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserProfile"])();
    const [isSaved, setIsSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialIsSaved === true);
    const [isUpdating, setIsUpdating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FeedSaveButton.useEffect": ()=>{
            if (typeof initialIsSaved === 'boolean') setIsSaved(initialIsSaved);
        }
    }["FeedSaveButton.useEffect"], [
        initialIsSaved,
        uuid
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FeedSaveButton.useEffect": ()=>{
            const syncSavedState = {
                "FeedSaveButton.useEffect.syncSavedState": (event)=>{
                    const detail = event.detail;
                    if ((detail === null || detail === void 0 ? void 0 : detail.uuid) === uuid) setIsSaved(detail.isSaved);
                }
            }["FeedSaveButton.useEffect.syncSavedState"];
            window.addEventListener(feedSaveChangedEvent, syncSavedState);
            return ({
                "FeedSaveButton.useEffect": ()=>window.removeEventListener(feedSaveChangedEvent, syncSavedState)
            })["FeedSaveButton.useEffect"];
        }
    }["FeedSaveButton.useEffect"], [
        uuid
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FeedSaveButton.useEffect": ()=>{
            if (!isAuthResolved || !user || typeof initialIsSaved === 'boolean' || !identifier) return;
            const controller = new AbortController();
            const request = contentType === 'article' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCommunityFeedArticle"])(identifier, locale, controller.signal) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCommunityFeedPost"])(identifier, locale, controller.signal);
            request.then({
                "FeedSaveButton.useEffect": (item)=>setIsSaved(item.is_saved === true)
            }["FeedSaveButton.useEffect"]).catch({
                "FeedSaveButton.useEffect": (error)=>{
                    if (!(error instanceof DOMException && error.name === 'AbortError')) {
                    // The button remains usable even if its initial state cannot be refreshed.
                    }
                }
            }["FeedSaveButton.useEffect"]);
            return ({
                "FeedSaveButton.useEffect": ()=>controller.abort()
            })["FeedSaveButton.useEffect"];
        }
    }["FeedSaveButton.useEffect"], [
        contentType,
        identifier,
        initialIsSaved,
        isAuthResolved,
        locale,
        user,
        uuid
    ]);
    const updateSavedState = async ()=>{
        if (isUpdating) return;
        if (!user) {
            const returnUrl = encodeURIComponent(window.location.href);
            window.location.assign("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dashboardUrl"], "/auth/login?returnUrl=").concat(returnUrl));
            return;
        }
        const nextIsSaved = !isSaved;
        setIsUpdating(true);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setCommunityFeedItemSaved"])(uuid, nextIsSaved, locale);
            setIsSaved(result.is_saved);
            onChange === null || onChange === void 0 ? void 0 : onChange(result.is_saved);
            window.dispatchEvent(new CustomEvent(feedSaveChangedEvent, {
                detail: {
                    uuid,
                    isSaved: result.is_saved
                }
            }));
            toast.success(result.is_saved ? copy.saved : copy.removed);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : copy.failed);
        } finally{
            setIsUpdating(false);
        }
    };
    const label = isUpdating ? copy.updating : isSaved ? copy.unsave : copy.save;
    const toneClasses = tone === 'hero' ? isSaved ? 'border-white/50 bg-white text-[#155FBB] shadow-sm hover:bg-[#F3F8FF]' : 'border-white/35 bg-[#071426]/35 text-white backdrop-blur-sm hover:bg-[#071426]/55' : isSaved ? 'border-[#BBD5F5] bg-[#EAF3FF] text-[#2378E8] hover:bg-[#DDEBFD]' : 'border-transparent bg-[#F2F7FF] text-[#5B6F8A] hover:bg-[#E6F0FD] hover:text-[#2378E8]';
    const buttonClasses = layout === 'action' ? "inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-md px-2 py-2.5 text-[14px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] disabled:cursor-wait disabled:opacity-65 ".concat(isSaved ? 'bg-[#EDF4FD] text-[#2378E8] hover:bg-[#E2EEFC]' : 'text-[#5A6B85] hover:bg-[#F5F8FC] hover:text-[#101724]') : "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-65 ".concat(toneClasses);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Tooltip$2f$Tooltip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
        label: label,
        position: "bottom",
        openDelay: 300,
        withArrow: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: ()=>void updateSavedState(),
            disabled: isUpdating,
            "aria-label": label,
            "aria-pressed": isSaved,
            className: "".concat(buttonClasses, " ").concat(className !== null && className !== void 0 ? className : ''),
            children: [
                isUpdating ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__["IconLoader2"], {
                    "aria-hidden": true,
                    className: "h-[18px] w-[18px] animate-spin",
                    stroke: 2
                }, void 0, false, {
                    fileName: "[project]/components/feed/FeedSaveButton.tsx",
                    lineNumber: 156,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBookmark$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBookmark$3e$__["IconBookmark"], {
                    "aria-hidden": true,
                    className: "h-[18px] w-[18px] text-[#C77D10]",
                    stroke: isSaved ? 2 : 1.8,
                    fill: isSaved ? 'currentColor' : 'none'
                }, void 0, false, {
                    fileName: "[project]/components/feed/FeedSaveButton.tsx",
                    lineNumber: 158,
                    columnNumber: 11
                }, this),
                layout === 'action' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: isSaved ? copy.savedAction : copy.saveAction
                }, void 0, false, {
                    fileName: "[project]/components/feed/FeedSaveButton.tsx",
                    lineNumber: 166,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/feed/FeedSaveButton.tsx",
            lineNumber: 147,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/feed/FeedSaveButton.tsx",
        lineNumber: 146,
        columnNumber: 5
    }, this);
}
_s(FeedSaveButton, "b2iTE7LVj+uQW6fJDppZUA7vQ1Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserProfile"]
    ];
});
_c = FeedSaveButton;
var _c;
__turbopack_context__.k.register(_c, "FeedSaveButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/feed/FeedShare.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconShare3$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconShare3$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconShare3.mjs [app-client] (ecmascript) <export default as IconShare3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const FeedShare = (param)=>{
    let { shareUrl, shareTitle, authorName, authorPhotoUrl, locale, shareKind = 'post', triggerClassName, hideTriggerLabel = false } = param;
    _s();
    const isRTL = locale === 'ar';
    const isWhitePaper = shareKind === 'white-paper';
    const [shareModalOpened, setShareModalOpened] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [customShareMessage, setCustomShareMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [linkCopied, setLinkCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const shareTextareaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FeedShare.useEffect": ()=>{
            if (shareModalOpened) {
                var _shareTextareaRef_current;
                (_shareTextareaRef_current = shareTextareaRef.current) === null || _shareTextareaRef_current === void 0 ? void 0 : _shareTextareaRef_current.focus();
            }
        }
    }["FeedShare.useEffect"], [
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
        setCustomShareMessage("".concat(t.checkOutPost).concat(shareTitle || authorName));
        setShareModalOpened(true);
    };
    const shareToSocial = (platform)=>{
        const url = encodeURIComponent(shareUrl);
        const message = encodeURIComponent(customShareMessage);
        const title = encodeURIComponent(shareTitle || authorName);
        let socialUrl = '';
        switch(platform){
            case 'facebook':
                socialUrl = "https://www.facebook.com/sharer/sharer.php?u=".concat(url, "&quote=").concat(message);
                break;
            case 'twitter':
                socialUrl = "https://twitter.com/intent/tweet?text=".concat(message, "&url=").concat(url);
                break;
            case 'linkedin':
                socialUrl = "https://www.linkedin.com/sharing/share-offsite/?url=".concat(url, "&title=").concat(title, "&summary=").concat(message);
                break;
            case 'whatsapp':
                socialUrl = "https://api.whatsapp.com/send?text=".concat(message, "%20").concat(url);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: handleShare,
                "aria-label": t.share,
                className: triggerClassName !== null && triggerClassName !== void 0 ? triggerClassName : 'inline-flex flex-1 items-center justify-center gap-2 rounded-md px-2 py-2.5 text-[14px] font-medium text-[#5A6B85] transition-colors hover:bg-[#F5F8FC] hover:text-[#101724] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8]',
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconShare3$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconShare3$3e$__["IconShare3"], {
                        "aria-hidden": true,
                        className: "h-[18px] w-[18px] text-[#E0398A]",
                        stroke: 1.8
                    }, void 0, false, {
                        fileName: "[project]/components/feed/FeedShare.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    !hideTriggerLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            shareModalOpened && typeof document !== 'undefined' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4",
                onClick: ()=>setShareModalOpened(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-md rounded-lg bg-white p-6 dark:bg-slate-800",
                    onClick: (event)=>event.stopPropagation(),
                    dir: isRTL ? 'rtl' : 'ltr',
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 flex items-center justify-between border-b border-gray-200 pb-4 dark:border-slate-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-bold text-gray-900 dark:text-white",
                                    children: t.sharePost
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/FeedShare.tsx",
                                    lineNumber: 144,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 rounded-lg bg-gray-50 p-4 dark:bg-slate-700",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-600",
                                        children: authorPhotoUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: authorPhotoUrl,
                                            alt: authorName,
                                            className: "h-full w-full object-cover object-top"
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/FeedShare.tsx",
                                            lineNumber: 160,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "truncate font-semibold text-gray-900 dark:text-white",
                                                children: shareTitle || authorName
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/FeedShare.tsx",
                                                lineNumber: 172,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300",
                                    children: t.customShareMessage
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/FeedShare.tsx",
                                    lineNumber: 184,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6 flex justify-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "flex h-12 w-12 items-center justify-center rounded-full bg-[#2196F3] text-white transition-colors hover:bg-blue-700",
                                    onClick: ()=>shareToSocial('facebook'),
                                    title: "Share on Facebook",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "19",
                                        height: "19",
                                        viewBox: "0 0 19 19",
                                        fill: "none",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-gray-800",
                                    onClick: ()=>shareToSocial('twitter'),
                                    title: "Share on X",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "19",
                                        height: "19",
                                        viewBox: "0 0 19 19",
                                        fill: "none",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "flex h-12 w-12 items-center justify-center rounded-full bg-[#0077b5] text-white transition-colors hover:bg-blue-800",
                                    onClick: ()=>shareToSocial('linkedin'),
                                    title: "Share on LinkedIn",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "19",
                                        height: "19",
                                        viewBox: "0 0 19 19",
                                        fill: "none",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                clipPath: "url(#feedshare_clip)",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("clipPath", {
                                                    id: "feedshare_clip",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white transition-colors hover:bg-green-600",
                                    onClick: ()=>shareToSocial('whatsapp'),
                                    title: "Share on WhatsApp",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "19",
                                        height: "19",
                                        viewBox: "0 0 19 19",
                                        fill: "none",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleCopyLink,
                            className: "w-full rounded-lg px-4 py-2 font-medium transition-colors ".concat(linkCopied ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600'),
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
_s(FeedShare, "2Tue5SYcaLReRS9occKXdLH2bBk=");
_c = FeedShare;
const __TURBOPACK__default__export__ = FeedShare;
var _c;
__turbopack_context__.k.register(_c, "FeedShare");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/icons/CourseIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CourseIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function CourseIcon(param) {
    let { width = 50, height = 50 } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: width,
        height: height,
        viewBox: "0 0 39 36",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M31.9898 26.8163C31.9898 24.1788 29.8518 22.0408 27.2143 22.0408C24.5767 22.0408 22.4388 24.1788 22.4388 26.8163C22.4388 28.1696 23.0037 29.3885 23.9081 30.2576V36L27.2143 33.7959L30.5204 36V30.2576C31.4248 29.3885 31.9898 28.1696 31.9898 26.8163Z",
                fill: "#0abb87"
            }, void 0, false, {
                fileName: "[project]/components/icons/CourseIcon.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M37.1327 0H1.86734C1.05624 0 0.397949 0.657551 0.397949 1.46939V30.8572C0.397949 31.6683 1.05624 32.3265 1.86734 32.3265H20.9694V31.3443C20.0143 30.0372 19.5 28.4694 19.5 26.8163C19.5 22.5625 22.9604 19.102 27.2143 19.102C31.4682 19.102 34.9286 22.5625 34.9286 26.8163C34.9286 28.4701 34.4143 30.038 33.4592 31.345V32.3265H37.1327C37.9438 32.3265 38.6021 31.6683 38.6021 30.8572V1.46939C38.6021 0.657551 37.9438 0 37.1327 0ZM20.9694 13.2245H8.47959V10.2857H20.9694V13.2245ZM30.5204 7.34694H8.47959V4.40816H30.5204V7.34694Z",
                fill: "#0abb87"
            }, void 0, false, {
                fileName: "[project]/components/icons/CourseIcon.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/icons/CourseIcon.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = CourseIcon;
var _c;
__turbopack_context__.k.register(_c, "CourseIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/icons/DataIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DataIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
function DataIcon(param) {
    let { width = 27, height = 29 } = param;
    _s();
    const filterId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])().replace(/:/g, '');
    const gradientId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])().replace(/:/g, '');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: width,
        height: height,
        viewBox: "0 0 32 34",
        fill: "none",
        overflow: "visible",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M4.06815 1.98373C6.86364 0.704566 10.5851 0 14.5464 0C18.5077 0 22.2293 0.704566 25.0243 1.98373C27.6099 3.16777 29.0933 4.73367 29.0933 6.28348C29.0933 7.8333 27.6099 9.39967 25.0243 10.5831C22.2297 11.8623 18.5078 12.5669 14.5464 12.5669C10.585 12.5669 6.86364 11.8623 4.06815 10.5831C1.48292 9.39967 0 7.8332 0 6.28348C0 4.73376 1.48292 3.16777 4.06815 1.98373ZM3.49489 11.8359C1.99713 11.1499 0.821516 10.3442 0 9.45442V13.4496C0 15.004 1.47967 16.5723 4.05982 17.7531C6.84871 19.029 10.5734 19.7326 14.5464 19.7326C18.5194 19.7326 22.2436 19.029 25.0331 17.7531C27.6131 16.5723 29.0933 15.004 29.0933 13.4496V9.45442C28.2718 10.3445 27.0961 11.1499 25.5984 11.8359C22.627 13.1949 18.7023 13.9444 14.5469 13.9444C10.3914 13.9444 6.46628 13.1954 3.49489 11.8359ZM14.5464 21.1102C21.1116 21.1102 26.6302 19.2908 29.0933 16.6207V20.1383C29.0933 21.6918 27.6136 23.261 25.0336 24.4417C22.2436 25.7181 18.5194 26.4217 14.5464 26.4217C10.5734 26.4217 6.84871 25.7181 4.05982 24.4417C1.47967 23.261 0 21.6918 0 20.1383V16.6207C2.46273 19.2908 7.98116 21.1102 14.5464 21.1102ZM0 27.3041C0 28.858 1.47967 30.4272 4.05982 31.608C6.84871 32.8844 10.5734 33.5875 14.5464 33.5875C18.5194 33.5875 22.2436 32.8844 25.0331 31.608C27.6131 30.4272 29.0933 28.858 29.0933 27.3041V23.3093C26.6302 25.9799 21.1116 27.7994 14.5464 27.7994C7.98116 27.7994 2.46273 25.9799 0 23.3093V27.3041ZM13.8573 1.69825C13.8572 1.78877 13.875 1.87843 13.9096 1.96208C13.9441 2.04573 13.9949 2.12174 14.0589 2.18575C14.1229 2.24975 14.1989 2.3005 14.2826 2.33509C14.3662 2.36968 14.4559 2.38743 14.5464 2.38731C16.6531 2.38731 20.6874 2.617 24.0394 4.15055C24.2047 4.2217 24.3913 4.22534 24.5593 4.16067C24.7273 4.096 24.8633 3.96817 24.9383 3.80451C25.0132 3.64085 25.0211 3.45436 24.9604 3.28493C24.8996 3.11551 24.7749 2.97659 24.613 2.89789C21.0224 1.25486 16.7654 1.00976 14.5464 1.00976C14.4559 1.00961 14.3662 1.02733 14.2825 1.06191C14.1989 1.09648 14.1228 1.14723 14.0588 1.21125C13.9948 1.27526 13.9441 1.35129 13.9095 1.43495C13.8749 1.51862 13.8572 1.60772 13.8573 1.69825Z",
                fill: "url(#".concat(gradientId, ")")
            }, void 0, false, {
                fileName: "[project]/components/icons/DataIcon.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                filter: "url(#".concat(filterId, ")"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M16.8721 33.7442C14.1813 33.7442 12 31.5629 12 28.8721C12 26.1813 14.1813 24 16.8721 24L26.1734 24C28.8642 24 31.0455 26.1813 31.0455 28.8721C31.0455 31.5629 28.8642 33.7442 26.1734 33.7442L16.8721 33.7442Z",
                    fill: "#BCE4F1",
                    fillOpacity: "0.5"
                }, void 0, false, {
                    fileName: "[project]/components/icons/DataIcon.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/icons/DataIcon.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "16.9863",
                cy: "28.8721",
                r: "1.77167",
                transform: "rotate(-90 16.9863 28.8721)",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/DataIcon.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "21.8583",
                cy: "28.8721",
                r: "1.77167",
                transform: "rotate(-90 21.8583 28.8721)",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/DataIcon.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "26.7305",
                cy: "28.8721",
                r: "1.77167",
                transform: "rotate(-90 26.7305 28.8721)",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/DataIcon.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                        id: filterId,
                        x: "10.1861",
                        y: "22.1861",
                        width: "22.6732",
                        height: "13.3719",
                        filterUnits: "userSpaceOnUse",
                        colorInterpolationFilters: "sRGB",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feFlood", {
                                floodOpacity: "0",
                                result: "BackgroundImageFix"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                in: "BackgroundImageFix",
                                stdDeviation: "0.906928"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
                                in2: "SourceAlpha",
                                operator: "in",
                                result: "effect1_backgroundBlur_121_8"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feBlend", {
                                mode: "normal",
                                in: "SourceGraphic",
                                in2: "effect1_backgroundBlur_121_8",
                                result: "shape"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feColorMatrix", {
                                in: "SourceAlpha",
                                type: "matrix",
                                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                                result: "hardAlpha"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feOffset", {
                                dx: "0.0906928",
                                dy: "0.0453464"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                stdDeviation: "0.226732"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
                                in2: "hardAlpha",
                                operator: "arithmetic",
                                k2: "-1",
                                k3: "1"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feColorMatrix", {
                                type: "matrix",
                                values: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feBlend", {
                                mode: "normal",
                                in2: "shape",
                                result: "effect2_innerShadow_121_8"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/icons/DataIcon.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                        id: gradientId,
                        x1: "1.97243",
                        y1: "10.247",
                        x2: "27.9188",
                        y2: "8.1066",
                        gradientUnits: "userSpaceOnUse",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                stopColor: "#0B5CD6"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "1",
                                stopColor: "#0085FF"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/icons/DataIcon.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/icons/DataIcon.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/icons/DataIcon.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_s(DataIcon, "kUXtcVnozRctYd6RLkZnOrTY/c4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"]
    ];
});
_c = DataIcon;
var _c;
__turbopack_context__.k.register(_c, "DataIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/icons/InsightIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InsightIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function InsightIcon(param) {
    let { width = 50, height = 50 } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: width,
        height: height,
        viewBox: "0 0 50 50",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M33.7292 4.16669H16.2708C8.68749 4.16669 4.16666 8.68752 4.16666 16.2709V33.7084C4.16666 41.3125 8.68749 45.8334 16.2708 45.8334H33.7083C41.2917 45.8334 45.8125 41.3125 45.8125 33.7292V16.2709C45.8333 8.68752 41.3125 4.16669 33.7292 4.16669Z",
                fill: "#8a1538"
            }, void 0, false, {
                fileName: "[project]/components/icons/InsightIcon.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M26.2283 18.4529V33.6341C26.2283 34.7935 25.2862 35.7355 24.1268 35.7355C22.9493 35.7355 22.0073 34.7935 22.0073 33.6341V18.4529C22.0073 17.2935 22.9493 16.3514 24.1268 16.3514C25.2862 16.3514 26.2283 17.2935 26.2283 18.4529Z",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/InsightIcon.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M34 15.451V33.1577C34 34.51 33.0297 35.6087 31.8354 35.6087C30.6225 35.6087 29.6522 34.51 29.6522 33.1577V15.451C29.6522 14.0987 30.6225 13 31.8354 13C33.0297 13 34 14.0987 34 15.451Z",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/InsightIcon.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M18.221 27.7283V33.6341C18.221 34.7935 17.279 35.7355 16.1014 35.7355C14.942 35.7355 14 34.7935 14 33.6341V27.7283C14 26.5689 14.942 25.6268 16.1014 25.6268C17.279 25.6268 18.221 26.5689 18.221 27.7283Z",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/InsightIcon.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/icons/InsightIcon.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = InsightIcon;
var _c;
__turbopack_context__.k.register(_c, "InsightIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/icons/ManualIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ManualIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function ManualIcon(param) {
    let { width = 50, height = 50 } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: width,
        height: height,
        viewBox: "0 0 50 50",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M42.7083 14.5834V31.25H13.2292C9.95832 31.25 7.29166 33.9167 7.29166 37.1875V14.5834C7.29166 6.25002 9.37499 4.16669 17.7083 4.16669H32.2917C40.625 4.16669 42.7083 6.25002 42.7083 14.5834Z",
                fill: "#ff9f43"
            }, void 0, false, {
                fileName: "[project]/components/icons/ManualIcon.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M42.7083 31.25V38.5417C42.7083 42.5625 39.4375 45.8333 35.4167 45.8333H14.5833C10.5625 45.8333 7.29166 42.5625 7.29166 38.5417V37.1875C7.29166 33.9167 9.95832 31.25 13.2292 31.25H42.7083Z",
                fill: "#d36a04"
            }, void 0, false, {
                fileName: "[project]/components/icons/ManualIcon.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M33.3333 16.1458H16.6667C15.8125 16.1458 15.1042 15.4375 15.1042 14.5833C15.1042 13.7291 15.8125 13.0208 16.6667 13.0208H33.3333C34.1875 13.0208 34.8958 13.7291 34.8958 14.5833C34.8958 15.4375 34.1875 16.1458 33.3333 16.1458Z",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/ManualIcon.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M27.0833 23.4375H16.6667C15.8125 23.4375 15.1042 22.7292 15.1042 21.875C15.1042 21.0208 15.8125 20.3125 16.6667 20.3125H27.0833C27.9375 20.3125 28.6458 21.0208 28.6458 21.875C28.6458 22.7292 27.9375 23.4375 27.0833 23.4375Z",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/ManualIcon.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/icons/ManualIcon.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = ManualIcon;
var _c;
__turbopack_context__.k.register(_c, "ManualIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/icons/ReportIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ReportIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
function ReportIcon(param) {
    let { width = 50, height = 50 } = param;
    _s();
    const gradientId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])().replace(/:/g, '');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: width,
        height: height,
        viewBox: "0 0 50 50",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                opacity: "0.4",
                d: "M45.125 21.75L43.0833 30.4583C41.3333 37.9792 37.875 41.0208 31.375 40.3958C30.3333 40.3125 29.2083 40.125 28 39.8333L24.5 39C15.8125 36.9375 13.125 32.6458 15.1667 23.9375L17.2083 15.2083C17.625 13.4375 18.125 11.8958 18.75 10.625C21.1875 5.58333 25.3333 4.22916 32.2917 5.875L35.7708 6.6875C44.5 8.72916 47.1667 13.0417 45.125 21.75Z",
                fill: "#699DDE"
            }, void 0, false, {
                fileName: "[project]/components/icons/ReportIcon.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M31.375 40.3958C30.0833 41.2708 28.4583 42 26.4792 42.6458L23.1875 43.7292C14.9167 46.3958 10.5625 44.1667 7.87501 35.8958L5.20834 27.6667C2.54168 19.3958 4.75001 15.0208 13.0208 12.3542L16.3125 11.2708C17.1667 11 17.9792 10.7708 18.75 10.625C18.125 11.8958 17.625 13.4375 17.2083 15.2083L15.1667 23.9375C13.125 32.6458 15.8125 36.9375 24.5 39L28 39.8333C29.2083 40.125 30.3333 40.3125 31.375 40.3958Z",
                fill: "url(#".concat(gradientId, ")")
            }, void 0, false, {
                fileName: "[project]/components/icons/ReportIcon.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M36.4375 21.8959C36.3125 21.8959 36.1875 21.875 36.0416 21.8542L25.9375 19.2917C25.1041 19.0834 24.6041 18.2292 24.8125 17.3959C25.0208 16.5625 25.875 16.0625 26.7083 16.2709L36.8125 18.8334C37.6458 19.0417 38.1458 19.8959 37.9375 20.7292C37.7708 21.4167 37.125 21.8959 36.4375 21.8959Z",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/ReportIcon.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M30.3333 28.9375C30.2083 28.9375 30.0833 28.9167 29.9375 28.8959L23.875 27.3542C23.0417 27.1459 22.5417 26.2917 22.75 25.4584C22.9583 24.625 23.8125 24.125 24.6458 24.3334L30.7083 25.875C31.5417 26.0834 32.0417 26.9375 31.8333 27.7709C31.6667 28.4792 31.0417 28.9375 30.3333 28.9375Z",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/ReportIcon.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                    id: gradientId,
                    x1: "17.7562",
                    y1: "10.625",
                    x2: "17.7562",
                    y2: "44.7964",
                    gradientUnits: "userSpaceOnUse",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            stopColor: "#0B5CD6"
                        }, void 0, false, {
                            fileName: "[project]/components/icons/ReportIcon.tsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "1",
                            stopColor: "#3599FE"
                        }, void 0, false, {
                            fileName: "[project]/components/icons/ReportIcon.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/icons/ReportIcon.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/icons/ReportIcon.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/icons/ReportIcon.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_s(ReportIcon, "xfMyHNFebGjSN1/YPqrD8z5EdLc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"]
    ];
});
_c = ReportIcon;
var _c;
__turbopack_context__.k.register(_c, "ReportIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/icons/KnowledgeTypeIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>KnowledgeTypeIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$CourseIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/CourseIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$DataIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/DataIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$InsightIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/InsightIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$ManualIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/ManualIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$ReportIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/ReportIcon.tsx [app-client] (ecmascript)");
;
;
;
;
;
;
function normalizeKnowledgeType(type) {
    return type.trim().toLowerCase().replace(/[\s_]+/g, '-');
}
function KnowledgeTypeIcon(param) {
    let { type, size = 20, className } = param;
    const iconProps = {
        width: size,
        height: size
    };
    let icon;
    switch(normalizeKnowledgeType(type)){
        case 'report':
            icon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$ReportIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/components/icons/KnowledgeTypeIcon.tsx",
                lineNumber: 24,
                columnNumber: 14
            }, this);
            break;
        case 'manual':
            icon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$ManualIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/components/icons/KnowledgeTypeIcon.tsx",
                lineNumber: 27,
                columnNumber: 14
            }, this);
            break;
        case 'data':
            icon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$DataIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/components/icons/KnowledgeTypeIcon.tsx",
                lineNumber: 30,
                columnNumber: 14
            }, this);
            break;
        case 'course':
        case 'article':
        case 'white-paper':
            icon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$CourseIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/components/icons/KnowledgeTypeIcon.tsx",
                lineNumber: 35,
                columnNumber: 14
            }, this);
            break;
        case 'statistic':
        case 'statistics':
        case 'insight':
        default:
            icon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$InsightIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/components/icons/KnowledgeTypeIcon.tsx",
                lineNumber: 41,
                columnNumber: 14
            }, this);
            break;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        "aria-hidden": "true",
        className: "inline-flex shrink-0 items-center justify-center leading-none".concat(className ? " ".concat(className) : ''),
        style: {
            width: size,
            height: size
        },
        children: icon
    }, void 0, false, {
        fileName: "[project]/components/icons/KnowledgeTypeIcon.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_c = KnowledgeTypeIcon;
var _c;
__turbopack_context__.k.register(_c, "KnowledgeTypeIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/feed/article/ArticleReader.module.css [app-client] (css module)", ((__turbopack_context__) => {

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
  "heroActionButton": "ArticleReader-module__lP8bda__heroActionButton",
  "heroActions": "ArticleReader-module__lP8bda__heroActions",
  "heroAuthor": "ArticleReader-module__lP8bda__heroAuthor",
  "heroAuthorLink": "ArticleReader-module__lP8bda__heroAuthorLink",
  "heroAuthorText": "ArticleReader-module__lP8bda__heroAuthorText",
  "heroContent": "ArticleReader-module__lP8bda__heroContent",
  "heroIndustryEyebrow": "ArticleReader-module__lP8bda__heroIndustryEyebrow",
  "heroInner": "ArticleReader-module__lP8bda__heroInner",
  "heroMetaItem": "ArticleReader-module__lP8bda__heroMetaItem",
  "heroMetaLabel": "ArticleReader-module__lP8bda__heroMetaLabel",
  "heroMetaRow": "ArticleReader-module__lP8bda__heroMetaRow",
  "heroPublished": "ArticleReader-module__lP8bda__heroPublished",
  "heroReadTime": "ArticleReader-module__lP8bda__heroReadTime",
  "heroReadTimeLabel": "ArticleReader-module__lP8bda__heroReadTimeLabel",
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
"[project]/components/feed/article/ArticleReader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ArticleReader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowLeft$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconArrowLeft.mjs [app-client] (ecmascript) <export default as IconArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowRight$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconArrowRight.mjs [app-client] (ecmascript) <export default as IconArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArticle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArticle$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconArticle.mjs [app-client] (ecmascript) <export default as IconArticle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuildingSkyscraper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuildingSkyscraper$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBuildingSkyscraper.mjs [app-client] (ecmascript) <export default as IconBuildingSkyscraper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconClock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconClock$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconClock.mjs [app-client] (ecmascript) <export default as IconClock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconLoader2.mjs [app-client] (ecmascript) <export default as IconLoader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Badge$2f$Badge$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Badge/Badge.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$ar$2d$SA$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/locale/ar-SA.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$en$2d$US$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/locale/en-US.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$FeedSaveButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/FeedSaveButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$FeedShare$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/FeedShare.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$KnowledgeTypeIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/KnowledgeTypeIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/feed.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/feed/article/ArticleReader.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
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
const copyByLocale = {
    en: {
        back: 'Back to Feed',
        loading: 'Loading White Paper…',
        loadFailed: 'We couldn’t load this White Paper.',
        notArticle: 'This content is not a White Paper.',
        tryAgain: 'Try again',
        minuteRead: 'min read',
        readTime: 'Read time',
        published: 'Published',
        publisher: 'Publisher',
        viewInsight: 'View',
        openingInsight: 'Opening…'
    },
    ar: {
        back: 'العودة إلى الموجز',
        loading: 'جارٍ تحميل الورقة البيضاء…',
        loadFailed: 'تعذر تحميل هذه الورقة البيضاء.',
        notArticle: 'هذا المحتوى ليس ورقة بيضاء.',
        tryAgain: 'حاول مرة أخرى',
        minuteRead: 'دقيقة قراءة',
        readTime: 'مدة القراءة',
        published: 'نُشر',
        publisher: 'الناشر',
        viewInsight: 'عرض',
        openingInsight: 'جارٍ الفتح…'
    }
};
function truncateLabel(value) {
    let maxLength = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 38;
    if (value.length <= maxLength) return value;
    return "".concat(value.slice(0, maxLength).trimEnd(), "…");
}
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
    var _container_textContent;
    return ((_container_textContent = container.textContent) !== null && _container_textContent !== void 0 ? _container_textContent : '').replace(/\s+/g, ' ').trim();
}
function getInsightPrice(price, freeLabel) {
    const normalizedPrice = String(price !== null && price !== void 0 ? price : '').trim();
    if (!normalizedPrice) return null;
    const numericPrice = Number(normalizedPrice);
    if (!Number.isNaN(numericPrice)) {
        return {
            label: numericPrice === 0 ? freeLabel : "$".concat(numericPrice.toLocaleString('en-US', {
                maximumFractionDigits: 2
            })),
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
        var _element_getAttribute;
        const href = tagName === 'a' ? (_element_getAttribute = element.getAttribute('href')) !== null && _element_getAttribute !== void 0 ? _element_getAttribute : '' : '';
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(date, 'PPP', {
        locale: locale === 'ar' ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$ar$2d$SA$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arSA"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$en$2d$US$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enUS"]
    });
}
function ArticleSkeleton(param) {
    let { label } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "aria-label": label,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].skeleton,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].skeletonHero,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].skeletonInner,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].skeletonTitle
                        }, void 0, false, {
                            fileName: "[project]/components/feed/article/ArticleReader.tsx",
                            lineNumber: 153,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].skeletonTitleShort
                        }, void 0, false, {
                            fileName: "[project]/components/feed/article/ArticleReader.tsx",
                            lineNumber: 154,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/feed/article/ArticleReader.tsx",
                    lineNumber: 152,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].skeletonContent,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].skeletonSide
                    }, void 0, false, {
                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].skeletonLines,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                lineNumber: 160,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                lineNumber: 161,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                lineNumber: 162,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                lineNumber: 163,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/article/ArticleReader.tsx",
        lineNumber: 150,
        columnNumber: 5
    }, this);
}
_c = ArticleSkeleton;
function ArticleReader(param) {
    let { locale, identifier, isPublic } = param;
    _s();
    const isArabic = locale === 'ar';
    const copy = copyByLocale[isArabic ? 'ar' : 'en'];
    const BackIcon = isArabic ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowRight$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowRight$3e$__["IconArrowRight"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowLeft$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowLeft$3e$__["IconArrowLeft"];
    const [item, setItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [reloadKey, setReloadKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [openingInsight, setOpeningInsight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ArticleReader.useEffect": ()=>{
            let active = true;
            setIsLoading(true);
            setError(null);
            const loadArticle = isPublic ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCommunityFeedArticle"])(identifier, locale) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFeedItem"])(identifier, locale);
            loadArticle.then({
                "ArticleReader.useEffect": (result)=>{
                    if (!active) return;
                    if (result.content_type !== 'article') {
                        setError(copy.notArticle);
                        return;
                    }
                    setItem(result);
                }
            }["ArticleReader.useEffect"]).catch({
                "ArticleReader.useEffect": (loadError)=>{
                    if (active) setError(loadError instanceof Error ? loadError.message : copy.loadFailed);
                }
            }["ArticleReader.useEffect"]).finally({
                "ArticleReader.useEffect": ()=>{
                    if (active) setIsLoading(false);
                }
            }["ArticleReader.useEffect"]);
            return ({
                "ArticleReader.useEffect": ()=>{
                    active = false;
                }
            })["ArticleReader.useEffect"];
        }
    }["ArticleReader.useEffect"], [
        copy.loadFailed,
        copy.notArticle,
        identifier,
        isPublic,
        locale,
        reloadKey
    ]);
    const sanitizedBody = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ArticleReader.useMemo[sanitizedBody]": ()=>{
            var _item_body;
            return sanitizeRichText((_item_body = item === null || item === void 0 ? void 0 : item.body) !== null && _item_body !== void 0 ? _item_body : '');
        }
    }["ArticleReader.useMemo[sanitizedBody]"], [
        item === null || item === void 0 ? void 0 : item.body
    ]);
    const readingMinutes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ArticleReader.useMemo[readingMinutes]": ()=>{
            var _item_body;
            const words = plainText((_item_body = item === null || item === void 0 ? void 0 : item.body) !== null && _item_body !== void 0 ? _item_body : '').split(/\s+/).filter(Boolean).length;
            return Math.max(1, Math.ceil(words / 220));
        }
    }["ArticleReader.useMemo[readingMinutes]"], [
        item === null || item === void 0 ? void 0 : item.body
    ]);
    if (isLoading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ArticleSkeleton, {
        label: copy.loading
    }, void 0, false, {
        fileName: "[project]/components/feed/article/ArticleReader.tsx",
        lineNumber: 216,
        columnNumber: 25
    }, this);
    if (error || !item) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "flex min-h-[calc(100vh-var(--app-header-height,88px))] items-center justify-center bg-[#F2F5F8] px-4 py-16",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-lg rounded-2xl border border-[#D9E2EC] bg-white p-8 text-center shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArticle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArticle$3e$__["IconArticle"], {
                        "aria-hidden": true,
                        className: "mx-auto h-11 w-11 text-[#8293A9]",
                        stroke: 1.4
                    }, void 0, false, {
                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                        lineNumber: 222,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "mt-5 text-2xl font-bold text-[#142033]",
                        children: error !== null && error !== void 0 ? error : copy.loadFailed
                    }, void 0, false, {
                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                        lineNumber: 223,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-7 flex flex-wrap justify-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/".concat(locale),
                                className: "inline-flex min-h-11 items-center rounded-full border border-[#CBD7E5] px-5 text-sm font-semibold text-[#4B5E77] hover:bg-[#F5F8FB]",
                                children: copy.back
                            }, void 0, false, {
                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                lineNumber: 225,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setReloadKey((current)=>current + 1),
                                className: "min-h-11 rounded-full bg-[#2378E8] px-5 text-sm font-semibold text-white hover:bg-[#1769C2]",
                                children: copy.tryAgain
                            }, void 0, false, {
                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                lineNumber: 228,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                        lineNumber: 224,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                lineNumber: 221,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/feed/article/ArticleReader.tsx",
            lineNumber: 220,
            columnNumber: 7
        }, this);
    }
    const cover = item.media.find((media)=>media.media_type === 'image' && media.url);
    var _item_published_at;
    const publishedDate = formatArticleDate((_item_published_at = item.published_at) !== null && _item_published_at !== void 0 ? _item_published_at : item.created_at, locale);
    const insighter = item.insighter;
    const initials = (insighter === null || insighter === void 0 ? void 0 : insighter.name.split(' ').filter(Boolean).slice(0, 2).map((part)=>part[0]).join('').toUpperCase()) || 'I';
    var _item_slug;
    const shareUrl = "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publicBaseUrl"], "/").concat(locale, "/article/").concat((_item_slug = item.slug) !== null && _item_slug !== void 0 ? _item_slug : identifier);
    var _item_slug1, _item_title, _insighter_name, _insighter_company_legal_name, _item_published_at1, _ref;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        dir: isArabic ? 'rtl' : 'ltr',
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].page,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hero, " ").concat((cover === null || cover === void 0 ? void 0 : cover.url) ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroWithImage : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroWithoutImage),
                style: (cover === null || cover === void 0 ? void 0 : cover.url) ? {
                    backgroundImage: "url(".concat(cover.url, ")")
                } : undefined,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroShade
                    }, void 0, false, {
                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                        lineNumber: 256,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroInner,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroTitleRow,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroContent,
                                        children: [
                                            item.industry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/".concat(locale, "/sub-industry/").concat(item.industry.id, "/").concat(item.industry.slug),
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroIndustryEyebrow,
                                                title: item.industry.name,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuildingSkyscraper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuildingSkyscraper$3e$__["IconBuildingSkyscraper"], {
                                                        "aria-hidden": true
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                        lineNumber: 266,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: truncateLabel(item.industry.name)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                        lineNumber: 267,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                lineNumber: 261,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                dir: "auto",
                                                children: item.title
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                lineNumber: 270,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                        lineNumber: 259,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroActions,
                                        children: [
                                            isPublic && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$FeedSaveButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                uuid: item.uuid,
                                                identifier: (_item_slug1 = item.slug) !== null && _item_slug1 !== void 0 ? _item_slug1 : identifier,
                                                contentType: "article",
                                                initialIsSaved: item.is_saved,
                                                locale: locale,
                                                tone: "hero",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroActionButton
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                lineNumber: 274,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$FeedShare$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                shareUrl: shareUrl,
                                                shareTitle: (_item_title = item.title) !== null && _item_title !== void 0 ? _item_title : '',
                                                authorName: (_insighter_name = insighter === null || insighter === void 0 ? void 0 : insighter.name) !== null && _insighter_name !== void 0 ? _insighter_name : 'Insighta',
                                                authorPhotoUrl: insighter === null || insighter === void 0 ? void 0 : insighter.profile_photo_url,
                                                locale: locale,
                                                shareKind: "white-paper",
                                                triggerClassName: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].shareButton,
                                                hideTriggerLabel: true
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                lineNumber: 284,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                        lineNumber: 272,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                lineNumber: 258,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroMetaRow,
                                children: [
                                    insighter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroMetaItem, " ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroAuthor),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/".concat(locale, "/profile/").concat(insighter.uuid, "?entity=insighter"),
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroAuthorLink,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].authorAvatar,
                                                    children: insighter.profile_photo_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: insighter.profile_photo_url,
                                                        alt: insighter.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                        lineNumber: 307,
                                                        columnNumber: 52
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: initials
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                        lineNumber: 307,
                                                        columnNumber: 117
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                    lineNumber: 306,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroAuthorText,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroMetaLabel,
                                                            children: copy.publisher
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                            lineNumber: 310,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: insighter.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                            lineNumber: 311,
                                                            columnNumber: 21
                                                        }, this),
                                                        insighter.company && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                            children: (_insighter_company_legal_name = insighter.company.legal_name) !== null && _insighter_company_legal_name !== void 0 ? _insighter_company_legal_name : insighter.company.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                            lineNumber: 312,
                                                            columnNumber: 43
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                    lineNumber: 309,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                            lineNumber: 300,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                        lineNumber: 299,
                                        columnNumber: 15
                                    }, this),
                                    publishedDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroMetaItem, " ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroPublished),
                                        dateTime: (_ref = (_item_published_at1 = item.published_at) !== null && _item_published_at1 !== void 0 ? _item_published_at1 : item.created_at) !== null && _ref !== void 0 ? _ref : undefined,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroMetaLabel,
                                                children: copy.published
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                lineNumber: 320,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: publishedDate
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                lineNumber: 321,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                        lineNumber: 319,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroMetaItem, " ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroReadTime),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroReadTimeLabel,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconClock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconClock$3e$__["IconClock"], {
                                                        "aria-hidden": true
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                        lineNumber: 327,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroMetaLabel,
                                                        children: copy.readTime
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                        lineNumber: 328,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                lineNumber: 326,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: [
                                                    readingMinutes,
                                                    " ",
                                                    copy.minuteRead
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                lineNumber: 330,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                        lineNumber: 325,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                lineNumber: 297,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                        lineNumber: 257,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                lineNumber: 252,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].contentShell,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/".concat(locale),
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backLink,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BackIcon, {
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                lineNumber: 338,
                                columnNumber: 11
                            }, this),
                            copy.back
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                        lineNumber: 337,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].articleLayout,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].articleMain,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    dir: "auto",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleReader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].articleBody,
                                    dangerouslySetInnerHTML: {
                                        __html: sanitizedBody
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                    lineNumber: 344,
                                    columnNumber: 13
                                }, this),
                                item.related_insights.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "-mx-6 mt-12 divide-y divide-[#E7EDF5] overflow-hidden rounded-xl border border-[#E7EDF5] sm:-mx-10 lg:-mx-12",
                                    children: item.related_insights.map((insight)=>{
                                        const insightKey = "".concat(insight.type, "-").concat(insight.slug);
                                        const insightPrice = getInsightPrice(insight.price, locale === 'ar' ? 'مجاني' : 'Free');
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "group flex flex-col overflow-hidden bg-white transition-colors duration-300 hover:bg-[#F8FAFD] sm:flex-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/".concat(locale, "/knowledge/").concat(insight.type, "/").concat(insight.slug),
                                                    target: "_blank",
                                                    rel: "noreferrer",
                                                    "aria-label": "".concat(copy.viewInsight, ": ").concat(insight.title),
                                                    className: "flex min-h-[155px] w-full min-w-0 flex-col bg-[#071426] bg-[url('/images/test2.png')] bg-cover bg-center px-4 py-4 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#67B5F6] sm:w-[36%] sm:max-w-[280px] sm:flex-none",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$KnowledgeTypeIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                        type: insight.type,
                                                                        size: 16
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                                        lineNumber: 366,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "rounded-full bg-[#0B315D]/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.05em] text-[#67B5F6] backdrop-blur-sm",
                                                                        children: insight.type
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                                        lineNumber: 367,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                                lineNumber: 365,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                dir: "auto",
                                                                className: "mt-4 line-clamp-3 text-start text-[15px] font-semibold leading-6 text-white transition-colors group-hover:text-[#A8D5FF] sm:text-[16px]",
                                                                children: insight.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                                lineNumber: 371,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                        lineNumber: 364,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                    lineNumber: 357,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex min-h-[130px] min-w-0 flex-1 flex-col justify-center bg-white px-4 py-4 sm:min-h-[155px] sm:px-5",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "min-w-0",
                                                        children: [
                                                            insight.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                dir: "auto",
                                                                className: "line-clamp-3 text-[13px] leading-[1.2rem] text-[#667894] sm:text-[14px]",
                                                                children: plainText(insight.description)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                                lineNumber: 380,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-3 flex items-center justify-between gap-3",
                                                                dir: locale === 'ar' ? 'rtl' : 'ltr',
                                                                children: [
                                                                    insightPrice ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Badge$2f$Badge$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        color: insightPrice.isFree ? 'green' : 'yellow',
                                                                        variant: "light",
                                                                        className: "shrink-0 font-semibold",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            dir: insightPrice.isFree ? 'auto' : 'ltr',
                                                                            lang: insightPrice.isFree ? undefined : 'en',
                                                                            children: insightPrice.label
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                                            lineNumber: 387,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                                        lineNumber: 386,
                                                                        columnNumber: 31
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                                        lineNumber: 389,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                        href: "/".concat(locale, "/knowledge/").concat(insight.type, "/").concat(insight.slug),
                                                                        target: "_blank",
                                                                        rel: "noreferrer",
                                                                        "aria-busy": openingInsight === insightKey,
                                                                        onClick: ()=>{
                                                                            setOpeningInsight(insightKey);
                                                                            window.setTimeout(()=>{
                                                                                setOpeningInsight((current)=>current === insightKey ? null : current);
                                                                            }, 1800);
                                                                        },
                                                                        className: "inline-flex min-h-7 items-center justify-center rounded-full border border-[#2378E8] px-2 py-0.5 text-center text-[13px] font-medium text-[#2378E8] transition-colors hover:bg-[#F2F7FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2",
                                                                        children: openingInsight === insightKey ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__["IconLoader2"], {
                                                                                    "aria-hidden": true,
                                                                                    className: "me-1.5 h-4 w-4 animate-spin",
                                                                                    stroke: 2
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                                                    lineNumber: 405,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    "aria-live": "polite",
                                                                                    children: copy.openingInsight
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                                                    lineNumber: 406,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true) : copy.viewInsight
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                                        lineNumber: 390,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                                lineNumber: 384,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                        lineNumber: 378,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                                    lineNumber: 377,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, insightKey, true, {
                                            fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                            lineNumber: 353,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/article/ArticleReader.tsx",
                                    lineNumber: 347,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/article/ArticleReader.tsx",
                            lineNumber: 343,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/feed/article/ArticleReader.tsx",
                        lineNumber: 342,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/article/ArticleReader.tsx",
                lineNumber: 336,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/article/ArticleReader.tsx",
        lineNumber: 251,
        columnNumber: 5
    }, this);
}
_s(ArticleReader, "Drt0CNkxhqPZ9S1XQCnNT4QRbFk=");
_c1 = ArticleReader;
var _c, _c1;
__turbopack_context__.k.register(_c, "ArticleSkeleton");
__turbopack_context__.k.register(_c1, "ArticleReader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_f44a16b6._.js.map