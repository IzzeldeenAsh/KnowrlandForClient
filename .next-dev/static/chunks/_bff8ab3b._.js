(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/pending-verification.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Keep an email-link code in this tab only while the user signs in, never in a return URL.
__turbopack_context__.s([
    "clearPendingVerification",
    ()=>clearPendingVerification,
    "readPendingVerification",
    ()=>readPendingVerification,
    "savePendingVerification",
    ()=>savePendingVerification
]);
const key = 'pending-email-verification';
function savePendingVerification(code) {
    if (!/^\d{6}$/.test(code)) return;
    try {
        sessionStorage.setItem(key, JSON.stringify({
            code,
            expires: Date.now() + 3600000
        }));
    } catch (e) {}
}
function readPendingVerification() {
    try {
        const value = JSON.parse(sessionStorage.getItem(key) || 'null');
        if (value && /^\d{6}$/.test(value.code) && value.expires > Date.now()) return value.code;
        sessionStorage.removeItem(key);
    } catch (e) {}
    return '';
}
function clearPendingVerification() {
    try {
        sessionStorage.removeItem(key);
    } catch (e) {}
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/auth-profile-cache.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "globalProfileCache",
    ()=>globalProfileCache
]);
const globalProfileCache = {
    user: null,
    roles: [],
    lastFetchTime: 0,
    isLoading: false,
    pendingPromise: null,
    authFailedToken: null,
    sessionToken: null
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const apiBaseUrl = ("TURBOPACK compile-time value", "https://api.foresighta.co") || 'https://api.insightabusiness.com';
const publicBaseUrl = ("TURBOPACK compile-time value", "http://localhost:3000") || 'https://insightabusiness.com';
const dashboardUrl = ("TURBOPACK compile-time value", "http://localhost:4200") || 'https://app.insightabusiness.com';
const appBaseUrl = publicBaseUrl;
const getApiUrl = (path)=>{
    return "".concat(apiBaseUrl).concat(path);
};
const getAppUrl = (path)=>{
    return "".concat(publicBaseUrl).concat(path);
};
const getStripePublishableKey = ()=>{
    return ("TURBOPACK compile-time value", "pk_test_51RpQiFL3mrWP7a0P1OYWGeFJWtgMwcWJtiEDLvn29CpYn5x8Ou77YViA1yoimlixKU5aUAeOeN5VTfoC4sMpvFVF00qq9a6BNm") || 'pk_live_51RvbpYRIE7WtDi9SLKPBxKTPyTkULT1e36AZMOcmtUomKgW99akiph2PVg5mmUcPtyAjvlXwP1wy70OFvooJLpQc00CNQYKb96';
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/authToken.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Shared auth token helpers.
 *
 * The shared cookie is the single source of truth across both frontends.
 * This file is intentionally NOT a "use client" module so it can be imported
 * from either client or server code safely (guards prevent accessing browser APIs).
 */ __turbopack_context__.s([
    "getAuthToken",
    ()=>getAuthToken,
    "getTokenFromCookie",
    ()=>getTokenFromCookie
]);
function getTokenFromCookie() {
    let cookieName = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 'token';
    if (typeof document === 'undefined') return null;
    // document.cookie is a single string: "a=1; b=2; token=...".
    const cookies = document.cookie ? document.cookie.split(';') : [];
    for (const rawCookie of cookies){
        const cookie = rawCookie.trim();
        if (!cookie) continue;
        const eqIndex = cookie.indexOf('=');
        if (eqIndex === -1) continue;
        const name = cookie.slice(0, eqIndex).trim();
        if (name !== cookieName) continue;
        const value = cookie.slice(eqIndex + 1);
        try {
            return decodeURIComponent(value);
        } catch (e) {
            return value;
        }
    }
    return null;
}
function getAuthToken() {
    // A missing shared cookie means logged out. Never resurrect a stale token
    // from origin-local storage after logging out of the other frontend.
    return getTokenFromCookie('token');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/cookieDomain.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Cookie-domain helpers shared by all auth/session flows.
 *
 * Auth cookies are shared with the Angular dashboard across subdomains, so the
 * Domain attribute must match the environment the app is actually running on:
 *   production: *.insightabusiness.com -> .insightabusiness.com
 *   staging:    *.foresighta.co        -> .foresighta.co
 *   local dev:  localhost              -> no Domain attribute (host-only cookie;
 *               localhost:3000 and localhost:4200 share it via the host)
 */ __turbopack_context__.s([
    "cookieDomainFragment",
    ()=>cookieDomainFragment,
    "cookieDomainsToClear",
    ()=>cookieDomainsToClear,
    "getCookieDomain",
    ()=>getCookieDomain,
    "isSharedCookieHost",
    ()=>isSharedCookieHost,
    "sharedCookieAttributes",
    ()=>sharedCookieAttributes
]);
function getCookieDomain() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const hostname = window.location.hostname;
    if (hostname === 'insightabusiness.com' || hostname.endsWith('.insightabusiness.com')) return '.insightabusiness.com';
    if (hostname === 'foresighta.co' || hostname.endsWith('.foresighta.co')) return '.foresighta.co';
    return null;
}
function isSharedCookieHost() {
    return getCookieDomain() !== null;
}
function sharedCookieAttributes() {
    const domain = getCookieDomain();
    return domain ? [
        'SameSite=Lax',
        "Domain=".concat(domain),
        'Secure'
    ] : [
        'SameSite=Lax',
        ...typeof location !== 'undefined' && location.protocol === 'https:' ? [
            'Secure'
        ] : []
    ];
}
function cookieDomainFragment() {
    const domain = getCookieDomain();
    return domain ? "Domain=".concat(domain, "; ") : '';
}
function cookieDomainsToClear() {
    const domain = getCookieDomain();
    return domain ? [
        undefined,
        domain
    ] : [
        undefined
    ];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/auth-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthError",
    ()=>AuthError,
    "authErrorMessage",
    ()=>authErrorMessage,
    "authRequest",
    ()=>authRequest,
    "clearSession",
    ()=>clearSession,
    "rememberLoginUser",
    ()=>rememberLoginUser,
    "seedProfile",
    ()=>seedProfile,
    "storeSession",
    ()=>storeSession,
    "takeLoginUser",
    ()=>takeLoginUser,
    "writeAuthCookie",
    ()=>writeAuthCookie
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$profile$2d$cache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth-profile-cache.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cookieDomain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/cookieDomain.ts [app-client] (ecmascript)");
;
;
;
;
;
class AuthError extends Error {
    constructor(status, message, fields = {}){
        super(message), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "status", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "fields", void 0), this.status = status, this.fields = fields;
    }
}
async function authRequest(path, locale, body) {
    let options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    const token = options.authenticated === false ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
    const response = await fetch("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiBaseUrl"], "/api/").concat(path), {
        method: options.method || (body === undefined ? 'GET' : 'POST'),
        headers: {
            Accept: 'application/json',
            'Accept-Language': locale,
            ...body !== undefined ? {
                'Content-Type': 'application/json'
            } : {},
            ...token ? {
                Authorization: "Bearer ".concat(token)
            } : {}
        },
        body: body === undefined ? undefined : JSON.stringify(body),
        cache: 'no-store',
        signal: options.signal || AbortSignal.timeout(20000)
    });
    const text = await response.text();
    let payload;
    try {
        payload = JSON.parse(text);
    } catch (e) {
        payload = text;
    }
    if (!response.ok) throw new AuthError(response.status, (payload === null || payload === void 0 ? void 0 : payload.message) || (locale === 'ar' ? 'تعذر إكمال الطلب. حاول مجدداً.' : 'Unable to complete your request. Please try again.'), payload === null || payload === void 0 ? void 0 : payload.errors);
    return payload;
}
function writeAuthCookie(name, value) {
    let age = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 3600;
    document.cookie = "".concat(name, "=").concat(encodeURIComponent(value), "; Path=/; Max-Age=").concat(age, "; ").concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cookieDomain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sharedCookieAttributes"])().join('; '));
}
function storeSession(token) {
    if (!token || /[\s;]/.test(token)) throw new Error('Invalid session');
    writeAuthCookie('token', token, 7 * 86400);
    try {
        for (const key of [
            'token',
            'authToken',
            'foresighta-creds'
        ])localStorage.removeItem(key);
    } catch (e) {}
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])() !== token) throw new Error('Cookies are required to sign in.');
}
function clearSession() {
    for (const name of [
        'token',
        'auth_token',
        'auth_user',
        'auth_return_url',
        'signUpReturnUrl',
        'is_social_signup'
    ]){
        for (const domain of (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cookieDomain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cookieDomainsToClear"])()){
            for (const path of [
                '/',
                '/en',
                '/ar'
            ])document.cookie = "".concat(name, "=; Path=").concat(path, "; Max-Age=0; ").concat(domain ? "Domain=".concat(domain, ";") : '');
        }
    }
    try {
        for (const key of [
            'token',
            'user',
            'authToken',
            'currentUser',
            'foresighta-creds'
        ])localStorage.removeItem(key);
    } catch (e) {}
    pendingUser = null;
    Object.assign(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$profile$2d$cache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globalProfileCache"], {
        user: null,
        roles: [],
        lastFetchTime: 0,
        authFailedToken: null,
        sessionToken: null
    });
}
// A single-use in-memory handoff avoids another /profile request and never
// persists a bearer token or trusts user data as an authorization boundary.
let pendingUser = null;
function rememberLoginUser(user) {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
    if (token) pendingUser = {
        token,
        user,
        expires: Date.now() + 60000
    };
}
function takeLoginUser() {
    const data = pendingUser;
    pendingUser = null;
    return data && data.token === (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])() && data.expires > Date.now() ? data.user : null;
}
function authErrorMessage(error, locale) {
    let login = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    if (error instanceof AuthError) {
        if (error.status === 429) return locale === 'ar' ? 'محاولات كثيرة. انتظر قليلاً ثم حاول مجدداً.' : 'Too many attempts. Please wait and try again.';
        if (login && [
            401,
            422
        ].includes(error.status)) return locale === 'ar' ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' : 'The email or password is incorrect.';
        return Object.values(error.fields || {}).flat()[0] || error.message;
    }
    return locale === 'ar' ? 'تعذر الاتصال. تحقق من اتصالك وحاول مجدداً.' : 'Unable to connect. Check your connection and try again.';
}
function seedProfile(user) {
    const { token: _token, ...safe } = user;
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$profile$2d$cache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globalProfileCache"].user = {
        ...safe,
        id: Number(user.id),
        name: user.name || '',
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        profile_photo_url: user.profile_photo_url || null
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$profile$2d$cache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globalProfileCache"].roles = Array.isArray(user.roles) ? user.roles : [];
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$profile$2d$cache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globalProfileCache"].lastFetchTime = Date.now();
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$profile$2d$cache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globalProfileCache"].sessionToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$profile$2d$cache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globalProfileCache"].authFailedToken = null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/auth/pages/AuthForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldError",
    ()=>FieldError,
    "default",
    ()=>AuthForm,
    "hasFieldErrors",
    ()=>hasFieldErrors,
    "useClearFieldError",
    ()=>useClearFieldError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth-client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
const ClearError = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(_c = ()=>{});
_c1 = ClearError;
const useClearFieldError = ()=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ClearError);
};
_s(useClearFieldError, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
const Errors = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({});
function FieldError(param) {
    let { name } = param;
    _s1();
    const errors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(Errors);
    return errors[name] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        id: "".concat(name, "-error"),
        className: "auth-field-error",
        role: "alert",
        children: errors[name]
    }, void 0, false, {
        fileName: "[project]/components/auth/pages/AuthForm.tsx",
        lineNumber: 9,
        columnNumber: 25
    }, this) : null;
}
_s1(FieldError, "sg7ncGFUb44a0cVInaZ4WfPImYY=");
_c2 = FieldError;
function hasFieldErrors(error) {
    return error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthError"] && Object.keys(error.fields).length > 0;
}
function AuthForm(param) {
    let { locale, children, onSubmit, serverError } = param;
    _s2();
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ar = locale === 'ar';
    function validate(form) {
        const result = {};
        for (const element of Array.from(form.elements)){
            if (!(element instanceof HTMLInputElement) || !element.name || element.disabled) continue;
            const value = element.type === 'password' || element.name.startsWith('password') ? element.value : element.value.trim();
            if (element.required && !value) result[element.name] = ar ? 'هذا الحقل مطلوب.' : 'This field is required.';
            else if (element.type === 'email' && value && element.validity.typeMismatch) result[element.name] = ar ? 'أدخل بريداً إلكترونياً صالحاً.' : 'Enter a valid email address.';
            else if (value && element.minLength > 0 && value.length < element.minLength) result[element.name] = ar ? "أدخل ".concat(element.minLength, " أحرف على الأقل.") : "Enter at least ".concat(element.minLength, " characters.");
            if (element.name === 'country_id' && !value) result.country_id = ar ? 'اختر الدولة.' : 'Select your country.';
            if (element.name === 'code' && !/^\d{6}$/.test(value)) result.code = ar ? 'أدخل رمز التحقق المكوّن من 6 أرقام.' : 'Enter the 6-digit verification code.';
            if (element.name === 'password' && element.autocomplete === 'new-password' && value && (!/[A-Za-z]/.test(value) || !/\d/.test(value) || !/[^A-Za-z\d]/.test(value))) result.password = ar ? 'استخدم 8 أحرف على الأقل تتضمن حرفاً ورقماً ورمزاً.' : 'Use at least 8 characters including a letter, number and symbol.';
            if (element.name === 'password_confirmation' && value !== new FormData(form).get('password')) result.password_confirmation = ar ? 'كلمتا المرور غير متطابقتين.' : 'Passwords do not match.';
        }
        return result;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthForm.useEffect": ()=>{
            if (serverError instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthError"]) setErrors(Object.fromEntries(Object.entries(serverError.fields).map({
                "AuthForm.useEffect": (param)=>{
                    let [key, messages] = param;
                    return [
                        key,
                        messages[0]
                    ];
                }
            }["AuthForm.useEffect"])));
        }
    }["AuthForm.useEffect"], [
        serverError
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthForm.useEffect": ()=>{
            var _ref_current;
            (_ref_current = ref.current) === null || _ref_current === void 0 ? void 0 : _ref_current.querySelectorAll('input[id]').forEach({
                "AuthForm.useEffect": (input)=>{
                    const name = input.dataset.field || input.name;
                    input.setAttribute('aria-invalid', errors[name] ? 'true' : 'false');
                    if (errors[name]) input.setAttribute('aria-describedby', "".concat(name, "-error"));
                    else input.removeAttribute('aria-describedby');
                }
            }["AuthForm.useEffect"]);
        }
    }["AuthForm.useEffect"], [
        errors
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Errors.Provider, {
        value: errors,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ClearError.Provider, {
            value: (name)=>setErrors((old)=>({
                        ...old,
                        [name]: ''
                    })),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                ref: ref,
                noValidate: true,
                className: "auth-form",
                onBlur: (event)=>{
                    const input = event.target;
                    if (!(input instanceof HTMLInputElement)) return;
                    const name = input.dataset.field || input.name;
                    if (!name || !ref.current || input.type === 'hidden' || name === 'code' && event.currentTarget.contains(event.relatedTarget)) return;
                    const next = validate(ref.current);
                    setErrors((old)=>({
                            ...old,
                            [name]: next[name] || ''
                        }));
                },
                onChange: (event)=>{
                    if (event.target.dataset.field) return;
                    if (ref.current) {
                        const next = validate(ref.current);
                        setErrors((old)=>Object.fromEntries(Object.keys(old).map((key)=>[
                                    key,
                                    next[key] || ''
                                ])));
                    }
                },
                onSubmit: (event)=>{
                    const next = validate(event.currentTarget);
                    setErrors(next);
                    if (Object.keys(next).length) {
                        var _event_currentTarget_querySelector;
                        event.preventDefault();
                        const name = Object.keys(next)[0];
                        (_event_currentTarget_querySelector = event.currentTarget.querySelector("#".concat(name))) === null || _event_currentTarget_querySelector === void 0 ? void 0 : _event_currentTarget_querySelector.focus();
                        return;
                    }
                    onSubmit(event);
                },
                children: children
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/AuthForm.tsx",
                lineNumber: 40,
                columnNumber: 122
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/auth/pages/AuthForm.tsx",
            lineNumber: 40,
            columnNumber: 42
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/auth/pages/AuthForm.tsx",
        lineNumber: 40,
        columnNumber: 10
    }, this);
}
_s2(AuthForm, "cZ4DqkSLRgLjGzvZhpsInbzvWow=");
_c3 = AuthForm;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "ClearError$createContext");
__turbopack_context__.k.register(_c1, "ClearError");
__turbopack_context__.k.register(_c2, "FieldError");
__turbopack_context__.k.register(_c3, "AuthForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/auth/pages/CodeInput.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CodeInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/pages/AuthForm.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const digits = (value)=>value.replace(/[٠-٩۰-۹]/g, (digit)=>String(digit.charCodeAt(0) - (digit <= '٩' ? 1632 : 1776))).replace(/\D/g, '');
function CodeInput(param) {
    let { locale, initialCode = '' } = param;
    _s();
    const clearError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClearFieldError"])();
    const [values, setValues] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(Array.from({
        length: 6
    }, {
        "CodeInput.useState": (_, i)=>/^\d{6}$/.test(initialCode) ? initialCode[i] : ''
    }["CodeInput.useState"]));
    const refs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    function fill(value, index) {
        var _refs_current_Math_min;
        clearError('code');
        const text = digits(value);
        const start = text.length >= 6 ? 0 : index;
        setValues((old)=>{
            const next = [
                ...old
            ];
            if (!text) next[index] = '';
            else text.slice(0, 6 - start).split('').forEach((digit, offset)=>next[start + offset] = digit);
            return next;
        });
        if (text) (_refs_current_Math_min = refs.current[Math.min(start + text.length, 5)]) === null || _refs_current_Math_min === void 0 ? void 0 : _refs_current_Math_min.focus();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "auth-field",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                id: "code-label",
                children: locale === 'ar' ? 'رمز التحقق' : 'Verification code'
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/CodeInput.tsx",
                lineNumber: 15,
                columnNumber: 38
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "auth-code",
                dir: "ltr",
                role: "group",
                "aria-labelledby": "code-label",
                children: values.map((value, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: (node)=>{
                            refs.current[index] = node;
                        },
                        id: index ? "code-".concat(index) : 'code',
                        "data-field": "code",
                        "aria-label": locale === 'ar' ? "الرقم ".concat(index + 1, " من 6") : "Digit ".concat(index + 1, " of 6"),
                        inputMode: "numeric",
                        autoComplete: index === 0 ? 'one-time-code' : 'off',
                        value: value,
                        onFocus: (event)=>event.target.select(),
                        onChange: (event)=>fill(event.target.value, index),
                        onPaste: (event)=>{
                            event.preventDefault();
                            fill(event.clipboardData.getData('text'), index);
                        },
                        onKeyDown: (event)=>{
                            if (event.key === 'Backspace' && !value && index > 0) {
                                var _refs_current_;
                                event.preventDefault();
                                setValues((old)=>old.map((digit, i)=>i === index - 1 ? '' : digit));
                                (_refs_current_ = refs.current[index - 1]) === null || _refs_current_ === void 0 ? void 0 : _refs_current_.focus();
                            }
                            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                                var _refs_current_Math_max;
                                event.preventDefault();
                                (_refs_current_Math_max = refs.current[Math.max(0, Math.min(5, index + (event.key === 'ArrowLeft' ? -1 : 1)))]) === null || _refs_current_Math_max === void 0 ? void 0 : _refs_current_Math_max.focus();
                            }
                        }
                    }, index, false, {
                        fileName: "[project]/components/auth/pages/CodeInput.tsx",
                        lineNumber: 17,
                        columnNumber: 37
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/CodeInput.tsx",
                lineNumber: 16,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "hidden",
                name: "code",
                value: values.join('')
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/CodeInput.tsx",
                lineNumber: 21,
                columnNumber: 11
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldError"], {
                name: "code"
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/CodeInput.tsx",
                lineNumber: 21,
                columnNumber: 69
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/auth/pages/CodeInput.tsx",
        lineNumber: 15,
        columnNumber: 10
    }, this);
}
_s(CodeInput, "hZqwXzzD3uaMErRtlSZOLgeZQ9A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClearFieldError"]
    ];
});
_c = CodeInput;
var _c;
__turbopack_context__.k.register(_c, "CodeInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/auth-policy.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Pure URL policy shared by auth entry points and tested without browser state. */ __turbopack_context__.s([
    "safeReturnUrl",
    ()=>safeReturnUrl,
    "verificationUrl",
    ()=>verificationUrl
]);
function safeReturnUrl(value, siteOrigin, angularOrigin) {
    if (!value || value !== value.trim() || /[\\\u0000-\u001f\u007f]/.test(value)) return null;
    try {
        const site = new URL(siteOrigin).origin;
        const angular = new URL(angularOrigin).origin;
        const url = new URL(value, site);
        if (![
            'http:',
            'https:'
        ].includes(url.protocol) || url.username || url.password) return null;
        if (url.origin !== site && url.origin !== angular) return null;
        const decodedPath = decodeURIComponent(url.pathname);
        if (/[\\\u0000-\u001f\u007f]/.test(decodedPath) || decodedPath.startsWith('//')) return null;
        const path = url.pathname.replace(/^\/(en|ar)(?=\/|$)/, '') || '/';
        // Never loop back into an auth entry point or carry a credential forward.
        if (/^\/(auth(?:\/|$)|signin(?:\/|$)|signup(?:\/|$)|callback(?:\/|$)|signout(?:\/|$)|reset-password(?:\/|$)|verify-email(?:\/|$))/.test(path)) return null;
        for (const key of [
            'token',
            'access_token',
            'auth_token'
        ])url.searchParams.delete(key);
        const angularPath = path.startsWith('/app/') || path.startsWith('/admin-dashboard/');
        if (angularPath) return "".concat(angular).concat(path).concat(url.search).concat(url.hash);
        if (url.origin === angular) return null;
        return "".concat(url.pathname).concat(url.search).concat(url.hash);
    } catch (e) {
        return null;
    }
}
function verificationUrl(value, apiOrigin) {
    try {
        const base = new URL(apiOrigin).origin;
        const url = new URL(value.startsWith('/') || /^https?:/.test(value) ? value : "/api/email/verify/".concat(value), base);
        if (url.origin !== base || url.username || url.password || !url.pathname.startsWith('/api/email/verify/')) return null;
        return url.href;
    } catch (e) {
        return null;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/authRedirect.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authPageUrl",
    ()=>authPageUrl,
    "getAngularAppOrigin",
    ()=>getAngularAppOrigin,
    "getSafeReturnUrl",
    ()=>getSafeReturnUrl,
    "isAngularPath",
    ()=>isAngularPath,
    "isAngularRouteUrl",
    ()=>isAngularRouteUrl,
    "normalizeAngularPath",
    ()=>normalizeAngularPath,
    "toAngularAppUrl",
    ()=>toAngularAppUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$policy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth-policy.ts [app-client] (ecmascript)");
;
;
const normalizeAngularPath = (path)=>path.replace(/^\/(en|ar)(?=\/|$)/, '') || '/';
const isAngularPath = (path)=>/^\/(app|admin-dashboard)\//.test(normalizeAngularPath(path));
const getAngularAppOrigin = (_returnUrl)=>new URL(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dashboardUrl"]).origin;
const isAngularRouteUrl = (value)=>{
    try {
        return isAngularPath(new URL(value, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publicBaseUrl"]).pathname);
    } catch (e) {
        return false;
    }
};
const getSafeReturnUrl = (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$policy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeReturnUrl"])(value, ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : window.location.origin, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dashboardUrl"]);
const toAngularAppUrl = (value)=>getSafeReturnUrl(value) || "".concat(getAngularAppOrigin(), "/app/insighter-dashboard/my-dashboard");
function authPageUrl(page) {
    let locale = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'en', returnUrl = arguments.length > 2 ? arguments[2] : void 0;
    const language = locale === 'ar' ? 'ar' : 'en';
    const destination = getSafeReturnUrl(returnUrl);
    return "/".concat(language, "/").concat(page).concat(destination ? "?returnUrl=".concat(encodeURIComponent(destination)) : '');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/auth/pages/AuthShell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthFooter",
    ()=>AuthFooter,
    "AuthNotice",
    ()=>AuthNotice,
    "AuthShell",
    ()=>AuthShell,
    "PasswordInput",
    ()=>PasswordInput,
    "SubmitButton",
    ()=>SubmitButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/pages/AuthForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authRedirect.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function AuthShell(param) {
    let { locale, title, subtitle, children } = param;
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const search = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const otherLocale = locale === 'ar' ? 'en' : 'ar';
    const clean = new URLSearchParams(search.toString());
    clean.delete('token');
    clean.delete('access_token');
    const languageUrl = pathname.replace(/^\/(ar|en)/, "/".concat(otherLocale)) + (clean.size ? "?".concat(clean) : '');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "auth-screen",
        dir: locale === 'ar' ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "auth-nav",
                "aria-label": locale === 'ar' ? 'التنقل' : 'Navigation',
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/".concat(locale),
                        prefetch: false,
                        children: [
                            "← ",
                            locale === 'ar' ? 'رجوع' : 'Back'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/auth/pages/AuthShell.tsx",
                        lineNumber: 17,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: languageUrl,
                        prefetch: false,
                        hrefLang: otherLocale,
                        children: locale === 'ar' ? 'English' : 'العربية'
                    }, void 0, false, {
                        fileName: "[project]/components/auth/pages/AuthShell.tsx",
                        lineNumber: 18,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/auth/pages/AuthShell.tsx",
                lineNumber: 16,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "auth-card",
                "aria-labelledby": "auth-heading",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "auth-heading",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/".concat(locale),
                                prefetch: false,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/images/auth/logo.svg",
                                    width: "60",
                                    height: "60",
                                    alt: "Insighta"
                                }, void 0, false, {
                                    fileName: "[project]/components/auth/pages/AuthShell.tsx",
                                    lineNumber: 21,
                                    columnNumber: 83
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/auth/pages/AuthShell.tsx",
                                lineNumber: 21,
                                columnNumber: 40
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                id: "auth-heading",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/auth/pages/AuthShell.tsx",
                                lineNumber: 22,
                                columnNumber: 9
                            }, this),
                            subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: subtitle
                            }, void 0, false, {
                                fileName: "[project]/components/auth/pages/AuthShell.tsx",
                                lineNumber: 22,
                                columnNumber: 56
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/auth/pages/AuthShell.tsx",
                        lineNumber: 21,
                        columnNumber: 7
                    }, this),
                    children
                ]
            }, void 0, true, {
                fileName: "[project]/components/auth/pages/AuthShell.tsx",
                lineNumber: 20,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/auth/pages/AuthShell.tsx",
        lineNumber: 15,
        columnNumber: 10
    }, this);
}
_s(AuthShell, "YS5teDfk2gwmBHqC1aAr0t/3E50=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = AuthShell;
function PasswordInput(param) {
    let { label, locale, name = 'password', newPassword = false } = param;
    _s1();
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: "auth-field",
        htmlFor: name,
        children: [
            label,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "auth-password",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: name,
                        name: name,
                        type: visible ? 'text' : 'password',
                        required: true,
                        minLength: 8,
                        autoComplete: newPassword ? 'new-password' : 'current-password',
                        dir: "ltr"
                    }, void 0, false, {
                        fileName: "[project]/components/auth/pages/AuthShell.tsx",
                        lineNumber: 30,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "auth-reveal",
                        "aria-pressed": visible,
                        "aria-label": locale === 'ar' ? visible ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور' : visible ? 'Hide password' : 'Show password',
                        onClick: ()=>setVisible(!visible),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "20",
                            height: "20",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "1.6",
                            "aria-hidden": "true",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                                }, void 0, false, {
                                    fileName: "[project]/components/auth/pages/AuthShell.tsx",
                                    lineNumber: 32,
                                    columnNumber: 126
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "12",
                                    cy: "12",
                                    r: "3"
                                }, void 0, false, {
                                    fileName: "[project]/components/auth/pages/AuthShell.tsx",
                                    lineNumber: 32,
                                    columnNumber: 186
                                }, this),
                                visible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "m3 3 18 18"
                                }, void 0, false, {
                                    fileName: "[project]/components/auth/pages/AuthShell.tsx",
                                    lineNumber: 32,
                                    columnNumber: 229
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/auth/pages/AuthShell.tsx",
                            lineNumber: 32,
                            columnNumber: 7
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/auth/pages/AuthShell.tsx",
                        lineNumber: 31,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/auth/pages/AuthShell.tsx",
                lineNumber: 29,
                columnNumber: 62
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldError"], {
                name: name
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/AuthShell.tsx",
                lineNumber: 33,
                columnNumber: 21
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/auth/pages/AuthShell.tsx",
        lineNumber: 29,
        columnNumber: 10
    }, this);
}
_s1(PasswordInput, "OGsIWlGlwYpVUqIrDReJ1GWx7rw=");
_c1 = PasswordInput;
function AuthNotice(param) {
    let { error, message } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "aria-live": "polite",
        "aria-atomic": "true",
        children: [
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "auth-error",
                role: "alert",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/AuthShell.tsx",
                lineNumber: 36,
                columnNumber: 63
            }, this),
            message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "auth-success",
                role: "status",
                children: message
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/AuthShell.tsx",
                lineNumber: 36,
                columnNumber: 126
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/auth/pages/AuthShell.tsx",
        lineNumber: 36,
        columnNumber: 10
    }, this);
}
_c2 = AuthNotice;
function SubmitButton(param) {
    let { busy, children, locale } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: "auth-primary",
        type: "submit",
        disabled: busy,
        "aria-busy": busy,
        children: busy ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "auth-spinner"
                }, void 0, false, {
                    fileName: "[project]/components/auth/pages/AuthShell.tsx",
                    lineNumber: 39,
                    columnNumber: 100
                }, this),
                locale === 'ar' ? 'يرجى الانتظار…' : 'Please wait…'
            ]
        }, void 0, true) : children
    }, void 0, false, {
        fileName: "[project]/components/auth/pages/AuthShell.tsx",
        lineNumber: 39,
        columnNumber: 10
    }, this);
}
_c3 = SubmitButton;
function AuthFooter(param) {
    let { locale, signup = false, returnUrl } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "auth-footer",
        children: [
            locale === 'ar' ? signup ? 'لديك حساب بالفعل؟ ' : 'ليس لديك حساب؟ ' : signup ? 'Already have an account? ' : 'Need an account? ',
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                prefetch: false,
                href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authPageUrl"])(signup ? 'signin' : 'signup', locale, returnUrl),
                children: locale === 'ar' ? signup ? 'تسجيل الدخول' : 'إنشاء حساب' : signup ? 'Sign in' : 'Sign up'
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/AuthShell.tsx",
                lineNumber: 43,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/auth/pages/AuthShell.tsx",
        lineNumber: 42,
        columnNumber: 10
    }, this);
}
_c4 = AuthFooter;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "AuthShell");
__turbopack_context__.k.register(_c1, "PasswordInput");
__turbopack_context__.k.register(_c2, "AuthNotice");
__turbopack_context__.k.register(_c3, "SubmitButton");
__turbopack_context__.k.register(_c4, "AuthFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/auth/pages/VerifyEmail.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VerifyEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pending$2d$verification$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pending-verification.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$CodeInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/pages/CodeInput.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/pages/AuthForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$policy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth-policy.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authRedirect.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/pages/AuthShell.tsx [app-client] (ecmascript)");
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
function VerifyEmail(param) {
    let { locale } = param;
    _s();
    const ar = locale === 'ar';
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const search = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const returnUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSafeReturnUrl"])(search.get('returnUrl'));
    const email = search.get('email') || '';
    const [initialCode, setInitialCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const signedUrl = search.get('url');
    const cooldownKey = "email-verification-sent:".concat(email.toLowerCase());
    const [serverError, setServerError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sending, setSending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [cooldown, setCooldown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const initialized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    function finish() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pending$2d$verification$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearPendingVerification"])();
        router.replace((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])() ? "/".concat(locale, "/callback").concat(returnUrl ? "?returnUrl=".concat(encodeURIComponent(returnUrl)) : '') : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authPageUrl"])('signin', locale, returnUrl));
    }
    async function resend() {
        if (sending || cooldown > 0) return;
        setSending(true);
        setError('');
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authRequest"])('account/email/resend', locale, {});
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pending$2d$verification$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearPendingVerification"])();
            setInitialCode('');
            setCooldown(60);
            try {
                sessionStorage.setItem(cooldownKey, String(Date.now()));
            } catch (e) {}
            setMessage(ar ? 'تم إرسال رمز التحقق.' : 'A verification code has been sent.');
        } catch (e) {
            setServerError(e);
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasFieldErrors"])(e) ? '' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authErrorMessage"])(e, locale));
        } finally{
            setSending(false);
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VerifyEmail.useEffect": ()=>{
            if (!cooldown) return;
            const id = setTimeout({
                "VerifyEmail.useEffect.id": ()=>setCooldown({
                        "VerifyEmail.useEffect.id": (v)=>v - 1
                    }["VerifyEmail.useEffect.id"])
            }["VerifyEmail.useEffect.id"], 1000);
            return ({
                "VerifyEmail.useEffect": ()=>clearTimeout(id)
            })["VerifyEmail.useEffect"];
        }
    }["VerifyEmail.useEffect"], [
        cooldown
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VerifyEmail.useEffect": ()=>{
            if (initialized.current) return;
            initialized.current = true;
            const incomingCode = search.get('code') || '';
            if (/^\d{6}$/.test(incomingCode)) (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pending$2d$verification$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["savePendingVerification"])(incomingCode);
            const pendingCode = /^\d{6}$/.test(incomingCode) ? incomingCode : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pending$2d$verification$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readPendingVerification"])();
            setInitialCode(pendingCode);
            if (search.has('code')) {
                const clean = new URL(window.location.href);
                clean.searchParams.delete('code');
                window.history.replaceState(null, '', clean.pathname + clean.search);
            }
            if (signedUrl) {
                const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$policy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verificationUrl"])(signedUrl, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiBaseUrl"]);
                if (!url) {
                    setError(ar ? 'رابط التحقق غير صالح.' : 'Invalid verification link.');
                    return;
                }
                setBusy(true);
                const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
                fetch(url, {
                    headers: {
                        Accept: 'application/json',
                        'Accept-Language': locale,
                        ...token ? {
                            Authorization: "Bearer ".concat(token)
                        } : {}
                    },
                    cache: 'no-store',
                    signal: AbortSignal.timeout(20000)
                }).then({
                    "VerifyEmail.useEffect": async (r)=>{
                        if (!r.ok) throw new Error('Verification failed');
                        finish();
                    }
                }["VerifyEmail.useEffect"]).catch({
                    "VerifyEmail.useEffect": ()=>{
                        setError(ar ? 'الرابط غير صالح أو انتهت صلاحيته. اطلب رمزاً جديداً.' : 'The link is invalid or expired. Request a new code.');
                        setBusy(false);
                    }
                }["VerifyEmail.useEffect"]);
            } else if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])()) router.replace((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authPageUrl"])('signin', locale, returnUrl) + (returnUrl ? '&' : '?') + 'verifyEmail=1');
            else {
                let previous = 0;
                try {
                    previous = Number(sessionStorage.getItem(cooldownKey)) || 0;
                } catch (e) {}
                const remaining = Math.max(0, Math.ceil((60000 - (Date.now() - previous)) / 1000));
                if (remaining) setCooldown(remaining);
                else if (search.get('sent')) {
                    setCooldown(60);
                    try {
                        sessionStorage.setItem(cooldownKey, String(Date.now()));
                    } catch (e) {}
                } else if (search.get('resend') && !pendingCode) void resend();
            }
        }
    }["VerifyEmail.useEffect"], []);
    async function submit(e) {
        e.preventDefault();
        if (busy) return;
        const code = String(new FormData(e.currentTarget).get('code'));
        setBusy(true);
        setError('');
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authRequest"])('account/email/verify', locale, {
                code: Number(code)
            });
            finish();
        } catch (e) {
            setServerError(e);
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasFieldErrors"])(e) ? '' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authErrorMessage"])(e, locale));
            setBusy(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthShell"], {
        locale: locale,
        title: ar ? 'تحقق من بريدك الإلكتروني' : 'Verify your email',
        subtitle: email ? ar ? "أدخل الرمز المرسل إلى ".concat(email) : "Enter the code sent to ".concat(email) : ar ? 'أدخل رمز التحقق لإكمال تسجيل الدخول.' : 'Enter your verification code to continue.',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthNotice"], {
                error: error,
                message: message
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/VerifyEmail.tsx",
                lineNumber: 66,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                locale: locale,
                serverError: serverError,
                onSubmit: submit,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                    disabled: busy,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$CodeInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            locale: locale,
                            initialCode: initialCode
                        }, initialCode, false, {
                            fileName: "[project]/components/auth/pages/VerifyEmail.tsx",
                            lineNumber: 67,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubmitButton"], {
                            locale: locale,
                            busy: busy,
                            children: ar ? 'تأكيد البريد' : 'Verify email'
                        }, void 0, false, {
                            fileName: "[project]/components/auth/pages/VerifyEmail.tsx",
                            lineNumber: 68,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "auth-link",
                            disabled: sending || cooldown > 0,
                            onClick: ()=>void resend(),
                            children: cooldown ? "".concat(ar ? 'إعادة الإرسال بعد' : 'Resend in', " ").concat(cooldown, "s") : ar ? 'إعادة إرسال الرمز' : 'Resend code'
                        }, void 0, false, {
                            fileName: "[project]/components/auth/pages/VerifyEmail.tsx",
                            lineNumber: 69,
                            columnNumber: 7
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/auth/pages/VerifyEmail.tsx",
                    lineNumber: 66,
                    columnNumber: 120
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/VerifyEmail.tsx",
                lineNumber: 66,
                columnNumber: 50
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "auth-footer",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    prefetch: false,
                    href: "/".concat(locale, "/signout?returnUrl=").concat(encodeURIComponent("/".concat(locale))),
                    children: ar ? 'استخدام حساب آخر' : 'Use a different account'
                }, void 0, false, {
                    fileName: "[project]/components/auth/pages/VerifyEmail.tsx",
                    lineNumber: 70,
                    columnNumber: 54
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/VerifyEmail.tsx",
                lineNumber: 70,
                columnNumber: 27
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/auth/pages/VerifyEmail.tsx",
        lineNumber: 65,
        columnNumber: 10
    }, this);
}
_s(VerifyEmail, "80l+QMasrWCIu+CJ+rzl3E1Xx0U=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = VerifyEmail;
var _c;
__turbopack_context__.k.register(_c, "VerifyEmail");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/node_modules/next/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_define_property
]);
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
;
}),
]);

//# sourceMappingURL=_bff8ab3b._.js.map