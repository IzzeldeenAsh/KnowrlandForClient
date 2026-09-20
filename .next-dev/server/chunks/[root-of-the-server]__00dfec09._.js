module.exports = [
"[project]/.next-internal/server/app/social-image/[kind]/[identifier]/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:fs/promises [external] (node:fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs/promises", () => require("node:fs/promises"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/config.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Environment configuration
//
// All values come from NEXT_PUBLIC_* env vars, resolved at build time:
//   next dev              -> .env.development  (localhost + stage API + test keys)
//   npm run build:stage   -> .env.staging      (foresighta.co + test keys)
//   npm run build         -> .env.production   (insightabusiness.com + live keys)
//
// Fallbacks are production values so a build with missing env vars fails safe.
// Backend API (no trailing slash)
__turbopack_context__.s([
    "apiBaseUrl",
    ()=>apiBaseUrl,
    "appBaseUrl",
    ()=>appBaseUrl,
    "dashboardUrl",
    ()=>dashboardUrl,
    "getApiUrl",
    ()=>getApiUrl,
    "getAppUrl",
    ()=>getAppUrl,
    "getStripePublishableKey",
    ()=>getStripePublishableKey,
    "publicBaseUrl",
    ()=>publicBaseUrl
]);
const apiBaseUrl = ("TURBOPACK compile-time value", "https://api.foresighta.co") || 'https://api.insightabusiness.com';
const publicBaseUrl = ("TURBOPACK compile-time value", "http://localhost:3000") || 'https://insightabusiness.com';
const dashboardUrl = ("TURBOPACK compile-time value", "http://localhost:4200") || 'https://app.insightabusiness.com';
const appBaseUrl = publicBaseUrl;
const getApiUrl = (path)=>{
    return `${apiBaseUrl}${path}`;
};
const getAppUrl = (path)=>{
    return `${publicBaseUrl}${path}`;
};
const getStripePublishableKey = ()=>{
    return ("TURBOPACK compile-time value", "pk_test_51RpQiFL3mrWP7a0P1OYWGeFJWtgMwcWJtiEDLvn29CpYn5x8Ou77YViA1yoimlixKU5aUAeOeN5VTfoC4sMpvFVF00qq9a6BNm") || 'pk_live_51RvbpYRIE7WtDi9SLKPBxKTPyTkULT1e36AZMOcmtUomKgW99akiph2PVg5mmUcPtyAjvlXwP1wy70OFvooJLpQc00CNQYKb96';
};
}),
"[project]/lib/feed-social.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FALLBACK_THUMBNAIL_PATH",
    ()=>FALLBACK_THUMBNAIL_PATH,
    "SOCIAL_THUMBNAIL_SIZE",
    ()=>SOCIAL_THUMBNAIL_SIZE,
    "buildSocialDescription",
    ()=>buildSocialDescription,
    "buildSocialThumbnailUrl",
    ()=>buildSocialThumbnailUrl,
    "buildSocialTitle",
    ()=>buildSocialTitle,
    "loadFeedContent",
    ()=>loadFeedContent,
    "pickFeedImageSource",
    ()=>pickFeedImageSource,
    "stripHtml",
    ()=>stripHtml
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-route] (ecmascript)");
;
;
const SOCIAL_THUMBNAIL_SIZE = 500;
const FALLBACK_THUMBNAIL_PATH = '/images/og-thumbnail.jpg';
const endpointByKind = {
    post: '/api/platform/community/feed/posts',
    article: '/api/platform/community/feed/articles'
};
const loadFeedContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cache"])(async (kind, identifier, locale)=>{
    try {
        const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getApiUrl"])(`${endpointByKind[kind]}/${encodeURIComponent(identifier)}`), {
            headers: {
                Accept: 'application/json',
                'Accept-language': locale
            },
            next: {
                revalidate: 300
            }
        });
        if (!response.ok) return null;
        const payload = await response.json();
        return payload.data ?? null;
    } catch  {
        return null;
    }
});
function pickFeedImageSource(item) {
    const image = item.media.find((media)=>media.media_type === 'image' && media.url);
    if (image?.url) return image.url;
    const thumbnail = item.media.find((media)=>media.thumbnail_url)?.thumbnail_url ?? item.media.find((media)=>media.media_type === 'thumbnail' && media.url)?.url;
    return thumbnail ?? null;
}
function buildSocialThumbnailUrl(kind, identifier) {
    return `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicBaseUrl"]}/social-image/${kind}/${encodeURIComponent(identifier)}`;
}
function stripHtml(html) {
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}
function buildSocialDescription(item, isArabic) {
    const source = stripHtml(item.body ?? item.excerpt ?? '');
    if (source) return source.slice(0, 160);
    const authorName = item.insighter?.name;
    if (!authorName) {
        return isArabic ? 'منشور على انسايتا.' : 'A post shared on Insighta.';
    }
    return isArabic ? `منشور بواسطة ${authorName} على انسايتا.` : `A post shared by ${authorName} on Insighta.`;
}
function buildSocialTitle(item, authorName, isArabic) {
    const explicitTitle = item.title?.trim();
    if (explicitTitle) return explicitTitle;
    const bodyTitle = stripHtml(item.body ?? item.excerpt ?? '').slice(0, 90).trim();
    if (bodyTitle) return bodyTitle;
    return isArabic ? `منشور بواسطة ${authorName}` : `A post by ${authorName}`;
}
}),
"[project]/app/social-image/[kind]/[identifier]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feed$2d$social$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/feed-social.ts [app-route] (ecmascript)");
;
;
;
;
;
const runtime = 'nodejs';
/** Guard against pulling a huge upload into memory for a 500x500 crop. */ const MAX_SOURCE_BYTES = 25 * 1024 * 1024;
/** Crawlers give up quickly; fail over to the brand image instead of stalling. */ const FETCH_TIMEOUT_MS = 8000;
const CACHE_CONTROL = 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800';
function isFeedContentKind(value) {
    return value === 'post' || value === 'article';
}
async function fallbackResponse() {
    try {
        const file = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["readFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), 'public', __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feed$2d$social$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FALLBACK_THUMBNAIL_PATH"]));
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](new Uint8Array(file), {
            headers: {
                'Content-Type': 'image/jpeg',
                'Content-Length': String(file.byteLength),
                'Cache-Control': CACHE_CONTROL
            }
        });
    } catch  {
        // The static asset is served from the same origin, so a redirect only costs
        // the crawler one extra hop.
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].redirect(`${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicBaseUrl"]}${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feed$2d$social$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FALLBACK_THUMBNAIL_PATH"]}`, 302);
    }
}
async function renderThumbnail(sourceUrl) {
    const controller = new AbortController();
    const timer = setTimeout(()=>controller.abort(), FETCH_TIMEOUT_MS);
    try {
        const response = await fetch(sourceUrl, {
            signal: controller.signal,
            cache: 'no-store'
        });
        if (!response.ok) return null;
        const declaredLength = Number(response.headers.get('content-length') ?? 0);
        if (declaredLength > MAX_SOURCE_BYTES) return null;
        const bytes = Buffer.from(await response.arrayBuffer());
        if (bytes.byteLength > MAX_SOURCE_BYTES) return null;
        const sharp = (await __turbopack_context__.A("[externals]/sharp [external] (sharp, cjs, async loader)")).default;
        return await sharp(bytes, {
            failOn: 'none'
        })// Honour EXIF orientation before cropping, or phone photos crop sideways.
        .rotate().resize(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feed$2d$social$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SOCIAL_THUMBNAIL_SIZE"], __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feed$2d$social$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SOCIAL_THUMBNAIL_SIZE"], {
            fit: 'cover',
            position: 'attention'
        }).flatten({
            background: '#ffffff'
        }).jpeg({
            quality: 82,
            progressive: true,
            mozjpeg: true
        }).toBuffer();
    } catch  {
        return null;
    } finally{
        clearTimeout(timer);
    }
}
async function GET(_request, context) {
    const { kind, identifier } = await context.params;
    if (!isFeedContentKind(kind)) {
        return fallbackResponse();
    }
    // The source image is always resolved from our own API by identifier: the
    // route never proxies a caller-supplied URL.
    const item = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feed$2d$social$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadFeedContent"])(kind, identifier, 'en');
    const source = item ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feed$2d$social$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pickFeedImageSource"])(item) : null;
    if (!source) {
        return fallbackResponse();
    }
    const thumbnail = await renderThumbnail(source);
    if (!thumbnail) {
        return fallbackResponse();
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](new Uint8Array(thumbnail), {
        headers: {
            'Content-Type': 'image/jpeg',
            'Content-Length': String(thumbnail.byteLength),
            'Cache-Control': CACHE_CONTROL
        }
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__00dfec09._.js.map