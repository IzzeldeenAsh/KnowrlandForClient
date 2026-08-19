(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/public/images/stripes-dark.svg (static in ecmascript)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/stripes-dark.7b571818.svg");}),
"[project]/public/images/stripes-dark.svg.mjs { IMAGE => \"[project]/public/images/stripes-dark.svg (static in ecmascript)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$stripes$2d$dark$2e$svg__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/public/images/stripes-dark.svg (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$stripes$2d$dark$2e$svg__$28$static__in__ecmascript$29$__["default"],
    width: 736,
    height: 300,
    blurWidth: 0,
    blurHeight: 0
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/services/onboarding.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SUPPORTED_ONBOARDING_PROMPTS",
    ()=>SUPPORTED_ONBOARDING_PROMPTS,
    "fetchOnboardingIndustryTree",
    ()=>fetchOnboardingIndustryTree,
    "fetchOnboardingPromptStatuses",
    ()=>fetchOnboardingPromptStatuses,
    "getVisibleSupportedPrompts",
    ()=>getVisibleSupportedPrompts,
    "isSupportedOnboardingPrompt",
    ()=>isSupportedOnboardingPrompt,
    "skipOnboardingPrompt",
    ()=>skipOnboardingPrompt,
    "updateFeedIndustryPreferences",
    ()=>updateFeedIndustryPreferences,
    "updateOnboardingCountry",
    ()=>updateOnboardingCountry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
;
const SUPPORTED_ONBOARDING_PROMPTS = [
    'country',
    'community_feed_industries'
];
const onboardingHeaders = (param)=>{
    let { token, locale } = param;
    return {
        Authorization: "Bearer ".concat(token),
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': locale,
        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
    };
};
async function getErrorMessage(response, fallback) {
    const payload = await response.json().catch(()=>null);
    const validationMessages = (payload === null || payload === void 0 ? void 0 : payload.errors) ? Object.values(payload.errors).flat().filter((message)=>typeof message === 'string') : [];
    return validationMessages[0] || (payload === null || payload === void 0 ? void 0 : payload.message) || fallback;
}
function isSupportedOnboardingPrompt(promptKey) {
    return SUPPORTED_ONBOARDING_PROMPTS.includes(promptKey);
}
function getVisibleSupportedPrompts(prompts) {
    return prompts.filter((prompt)=>prompt.should_show && isSupportedOnboardingPrompt(prompt.prompt_key));
}
async function fetchOnboardingPromptStatuses(options) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/account/profile/onboarding/prompts/status'), {
        method: 'POST',
        headers: onboardingHeaders(options),
        cache: 'no-store'
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, 'Unable to check your onboarding status.'));
    }
    const payload = await response.json();
    return Array.isArray(payload === null || payload === void 0 ? void 0 : payload.data) ? payload.data : [];
}
async function updateOnboardingCountry(countryId, options) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/account/profile/country'), {
        method: 'POST',
        headers: onboardingHeaders(options),
        body: JSON.stringify({
            country_id: countryId
        })
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, 'Unable to save your country.'));
    }
}
async function updateFeedIndustryPreferences(industryIds, options) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/account/profile/feed/industry-preferences'), {
        method: 'POST',
        headers: onboardingHeaders(options),
        body: JSON.stringify({
            industry_ids: industryIds
        })
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, 'Unable to save your industries.'));
    }
}
async function skipOnboardingPrompt(promptKey, options) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/account/profile/onboarding/prompts/skip'), {
        method: 'POST',
        headers: onboardingHeaders(options),
        body: JSON.stringify({
            prompt_key: promptKey
        })
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, 'Unable to skip this step.'));
    }
}
async function fetchOnboardingIndustryTree(locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/common/setting/industry/tree'), {
        headers: {
            Accept: 'application/json',
            'Accept-Language': locale,
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
        }
    });
    if (!response.ok) {
        throw new Error('Unable to load industries.');
    }
    const payload = await response.json();
    return Array.isArray(payload) ? payload : [];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
"[project]/hooks/useAuth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function useAuth() {
    _s();
    const [isLoggedIn, setIsLoggedIn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAuth.useEffect": ()=>{
            const checkAuthStatus = {
                "useAuth.useEffect.checkAuthStatus": ()=>{
                    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
                    setIsLoggedIn(!!token);
                    setIsLoading(false);
                }
            }["useAuth.useEffect.checkAuthStatus"];
            checkAuthStatus();
        }
    }["useAuth.useEffect"], []);
    const refreshAuthStatus = ()=>{
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
        setIsLoggedIn(!!token);
    };
    return {
        isLoggedIn,
        isLoading,
        token: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])(),
        refreshAuthStatus
    };
}
_s(useAuth, "SiOCXgNumxE/IMcj0wlupJIS2jg=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/knowledgs/usePopularKnowledge.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePopularKnowledge",
    ()=>usePopularKnowledge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/index.react-client.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const POPULAR_URL = "".concat(("TURBOPACK compile-time value", "https://api.foresighta.co"), "/api/platform/industries/knowledge/popular");
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
    _s();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const locale = normalizeLocale((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePopularKnowledge.useEffect": ()=>{
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
            const p = existing !== null && existing !== void 0 ? existing : fetchPopularKnowledge(locale);
            if (!existing) popularInFlight.set(locale, p);
            p.then({
                "usePopularKnowledge.useEffect": (items)=>{
                    popularCache.set(locale, items);
                    popularInFlight.delete(locale);
                    if (!cancelled) {
                        setData(items);
                        setIsLoading(false);
                    }
                }
            }["usePopularKnowledge.useEffect"]).catch({
                "usePopularKnowledge.useEffect": (err)=>{
                    popularInFlight.delete(locale);
                    if (!cancelled) {
                        setError(err);
                        setIsLoading(false);
                    }
                }
            }["usePopularKnowledge.useEffect"]);
            return ({
                "usePopularKnowledge.useEffect": ()=>{
                    cancelled = true;
                }
            })["usePopularKnowledge.useEffect"];
        }
    }["usePopularKnowledge.useEffect"], [
        locale
    ]);
    return {
        data,
        isLoading,
        error
    };
}
_s(usePopularKnowledge, "9sitU7I7nXSfdW4OUJYLSKhLI0s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_cdca753d._.js.map