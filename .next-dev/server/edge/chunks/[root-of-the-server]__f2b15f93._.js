(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__f2b15f93._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "default",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$middleware$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/middleware.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
;
const intlMiddleware = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$middleware$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])({
    locales: [
        'en',
        'ar'
    ],
    defaultLocale: 'en',
    localeDetection: true,
    localePrefix: 'always'
});
const legacyPages = {
    login: 'signin',
    'sign-up': 'signup',
    registration: 'signup',
    register: 'signup',
    'password-reset': 'reset-password',
    'verify-login-email': 'verify-email',
    'email-reconfirm': 'verify-email',
    'verify-email': 'verify-email',
    logout: 'signout',
    callback: 'callback'
};
function middleware(request) {
    const { pathname } = request.nextUrl;
    const locale = pathname.match(/^\/(en|ar)(?:\/|$)/)?.[1] || (request.cookies.get('preferred_language')?.value === 'ar' ? 'ar' : 'en');
    const callback = pathname.match(/^\/(?:(en|ar)\/)?(?:auth\/)?callback(?:\/([^/]+))?\/?$/);
    if (callback) {
        const token = request.nextUrl.searchParams.get('token') || callback[2];
        if (token) {
            const target = new URL(`/${locale}/callback`, request.url);
            const returnUrl = request.nextUrl.searchParams.get('returnUrl');
            if (returnUrl) target.searchParams.set('returnUrl', returnUrl);
            const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(target, 303);
            // Legacy backend callback compatibility. Angular still requires a readable
            // bearer cookie, so HttpOnly needs a coordinated API/session migration.
            if (/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(token) && token.length < 12000) {
                const host = request.nextUrl.hostname;
                const domain = [
                    'insightabusiness.com',
                    'foresighta.co'
                ].find((d)=>host === d || host.endsWith(`.${d}`));
                response.cookies.set('token', token, {
                    path: '/',
                    maxAge: 7 * 86400,
                    sameSite: 'lax',
                    secure: request.nextUrl.protocol === 'https:',
                    ...domain ? {
                        domain: `.${domain}`
                    } : {}
                });
            }
            response.headers.set('Cache-Control', 'no-store');
            response.headers.set('Referrer-Policy', 'no-referrer');
            return response;
        }
    }
    const legacy = pathname.match(/^\/(?:(en|ar)\/)?auth\/([^/]+)\/?$/);
    if (legacy && legacyPages[legacy[2]]) {
        const target = new URL(`/${locale}/${legacyPages[legacy[2]]}`, request.url);
        target.search = request.nextUrl.search;
        target.searchParams.delete('token');
        target.searchParams.delete('roles');
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(target, 307);
    }
    if (pathname.startsWith('/_next') || pathname.startsWith('/api') || /\.[a-z0-9]+$/i.test(pathname)) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    if (request.nextUrl.hostname.startsWith('www.')) {
        const target = request.nextUrl.clone();
        target.hostname = target.hostname.slice(4);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(target, 308);
    }
    const hasLocale = /^\/(en|ar)(?:\/|$)/.test(pathname);
    if (!hasLocale && request.cookies.has('preferred_language')) {
        const target = request.nextUrl.clone();
        target.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(target);
    }
    return intlMiddleware(request);
}
const config = {
    matcher: [
        '/',
        '/(ar|en)/:path*',
        '/auth/:path*',
        '/callback/:path*',
        '/signin',
        '/signup',
        '/reset-password',
        '/verify-email',
        '/signout'
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__f2b15f93._.js.map