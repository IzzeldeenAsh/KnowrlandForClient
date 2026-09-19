(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
    let { locale, title, subtitle, children, compact = false } = param;
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const search = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const otherLocale = locale === 'ar' ? 'en' : 'ar';
    const clean = new URLSearchParams(search.toString());
    clean.delete('token');
    clean.delete('access_token');
    const languageUrl = pathname.replace(/^\/(ar|en)/, "/".concat(otherLocale)) + (clean.size ? "?".concat(clean) : '');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "auth-screen".concat(compact ? ' auth-signup' : ''),
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
    let { label, locale, name = 'password', newPassword = false, hideLabel = false } = param;
    _s1();
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: "auth-field",
        htmlFor: name,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: hideLabel ? 'auth-sr-only' : undefined,
                children: label
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/AuthShell.tsx",
                lineNumber: 29,
                columnNumber: 55
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "auth-password",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        placeholder: hideLabel ? label : undefined,
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
                columnNumber: 126
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
"[project]/components/auth/pages/CountryInput.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CountryInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/pages/AuthForm.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function CountryInput(param) {
    let { countries, locale, hideLabel = false } = param;
    _s();
    const clearError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClearFieldError"])();
    const ar = locale === 'ar';
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const filtered = countries.filter((country)=>country.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
    function choose(country) {
        clearError('country_id');
        setSelected(country);
        setQuery('');
        setOpen(false);
    }
    const flag = (country)=>country.flag ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: "/images/flags/".concat(country.flag, ".svg"),
            width: "24",
            height: "18",
            alt: "",
            loading: "lazy"
        }, void 0, false, {
            fileName: "[project]/components/auth/pages/CountryInput.tsx",
            lineNumber: 10,
            columnNumber: 53
        }, this) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "auth-field auth-country".concat(hideLabel ? ' auth-country-compact' : ''),
        onBlur: (event)=>{
            if (!event.currentTarget.contains(event.relatedTarget)) {
                setOpen(false);
                setQuery('');
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: hideLabel ? 'auth-sr-only' : undefined,
                htmlFor: "country_id",
                children: ar ? 'الدولة' : 'Country'
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/CountryInput.tsx",
                lineNumber: 12,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "auth-country-control",
                children: [
                    selected && !open && flag(selected),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "country_id",
                        "data-field": "country_id",
                        role: "combobox",
                        "aria-autocomplete": "list",
                        "aria-expanded": open,
                        "aria-controls": "country-options",
                        "aria-activedescendant": open && filtered[active] ? "country-option-".concat(filtered[active].id) : undefined,
                        autoComplete: "off",
                        disabled: !countries.length,
                        value: open ? query : (selected === null || selected === void 0 ? void 0 : selected.name) || '',
                        placeholder: countries.length ? ar ? 'ابحث عن الدولة' : 'Search countries' : ar ? 'جارٍ تحميل الدول…' : 'Loading countries…',
                        onFocus: ()=>{
                            setOpen(true);
                            setActive(0);
                        },
                        onClick: ()=>setOpen(true),
                        onChange: (event)=>{
                            setQuery(event.target.value);
                            setActive(0);
                            setOpen(true);
                        },
                        onKeyDown: (event)=>{
                            if (event.key === 'Escape') {
                                setOpen(false);
                                setQuery('');
                            }
                            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                                var _document_getElementById, _filtered_next;
                                event.preventDefault();
                                setOpen(true);
                                const next = Math.max(0, Math.min(filtered.length - 1, active + (event.key === 'ArrowDown' ? 1 : -1)));
                                setActive(next);
                                (_document_getElementById = document.getElementById("country-option-".concat((_filtered_next = filtered[next]) === null || _filtered_next === void 0 ? void 0 : _filtered_next.id))) === null || _document_getElementById === void 0 ? void 0 : _document_getElementById.scrollIntoView({
                                    block: 'nearest'
                                });
                            }
                            if (event.key === 'Enter' && open) {
                                event.preventDefault();
                                if (filtered[active]) choose(filtered[active]);
                            }
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/auth/pages/CountryInput.tsx",
                        lineNumber: 13,
                        columnNumber: 80
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/auth/pages/CountryInput.tsx",
                lineNumber: 13,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "hidden",
                name: "country_id",
                value: (selected === null || selected === void 0 ? void 0 : selected.id) || ''
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/CountryInput.tsx",
                lineNumber: 18,
                columnNumber: 5
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                id: "country-options",
                role: "listbox",
                "aria-label": ar ? 'الدول' : 'Countries',
                children: [
                    filtered.map((country, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            id: "country-option-".concat(country.id),
                            role: "option",
                            "aria-selected": (selected === null || selected === void 0 ? void 0 : selected.id) === country.id,
                            className: active === index ? 'active' : '',
                            onMouseDown: (event)=>event.preventDefault(),
                            onClick: ()=>choose(country),
                            children: [
                                flag(country),
                                country.name
                            ]
                        }, country.id, true, {
                            fileName: "[project]/components/auth/pages/CountryInput.tsx",
                            lineNumber: 19,
                            columnNumber: 128
                        }, this)),
                    !filtered.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        role: "presentation",
                        children: ar ? 'لا توجد نتائج' : 'No countries found'
                    }, void 0, false, {
                        fileName: "[project]/components/auth/pages/CountryInput.tsx",
                        lineNumber: 19,
                        columnNumber: 423
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/auth/pages/CountryInput.tsx",
                lineNumber: 19,
                columnNumber: 14
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldError"], {
                name: "country_id"
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/CountryInput.tsx",
                lineNumber: 20,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/auth/pages/CountryInput.tsx",
        lineNumber: 11,
        columnNumber: 10
    }, this);
}
_s(CountryInput, "ke5vBBknsKEE9oC+znvxDzFbO5w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClearFieldError"]
    ];
});
_c = CountryInput;
var _c;
__turbopack_context__.k.register(_c, "CountryInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/auth/pages/SocialButtons.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SocialButtons
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
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
function SocialButtons(param) {
    let { locale, returnUrl, beforeStart } = param;
    _s();
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    async function signIn(provider) {
        if (busy) return;
        setBusy(true);
        setError('');
        try {
            if (beforeStart && !await beforeStart()) return;
            const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSafeReturnUrl"])(returnUrl);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeAuthCookie"])('auth_return_url', target || '', target ? 3600 : 0);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeAuthCookie"])('preferred_language', locale, 365 * 86400);
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authRequest"])("auth/provider/".concat(provider), locale, undefined, {
                authenticated: false
            });
            const url = new URL(typeof response === 'string' ? response : (response === null || response === void 0 ? void 0 : response.url) || (response === null || response === void 0 ? void 0 : response.data));
            const hosts = provider === 'google' ? [
                'accounts.google.com'
            ] : [
                'www.linkedin.com',
                'linkedin.com'
            ];
            if (url.protocol !== 'https:' || !hosts.includes(url.hostname)) throw new Error('Invalid provider URL');
            window.location.assign(url.href);
        } catch (e) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authErrorMessage"])(e, locale));
        } finally{
            setBusy(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthNotice"], {
                error: error
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/SocialButtons.tsx",
                lineNumber: 26,
                columnNumber: 12
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "auth-social",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        disabled: busy,
                        onClick: ()=>void signIn('google'),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/images/auth/google.svg",
                                alt: "",
                                width: "16",
                                height: "16"
                            }, void 0, false, {
                                fileName: "[project]/components/auth/pages/SocialButtons.tsx",
                                lineNumber: 27,
                                columnNumber: 81
                            }, this),
                            locale === 'ar' ? 'الدخول عبر Google' : 'Use Google'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/auth/pages/SocialButtons.tsx",
                        lineNumber: 27,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        disabled: busy,
                        onClick: ()=>void signIn('linkedin-openid'),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/images/auth/linkedin.svg",
                                alt: "",
                                width: "16",
                                height: "16"
                            }, void 0, false, {
                                fileName: "[project]/components/auth/pages/SocialButtons.tsx",
                                lineNumber: 28,
                                columnNumber: 90
                            }, this),
                            locale === 'ar' ? 'الدخول عبر LinkedIn' : 'Use LinkedIn'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/auth/pages/SocialButtons.tsx",
                        lineNumber: 28,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/auth/pages/SocialButtons.tsx",
                lineNumber: 26,
                columnNumber: 39
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "auth-divider",
                children: locale === 'ar' ? 'أو بالبريد الإلكتروني' : 'Or with email'
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/SocialButtons.tsx",
                lineNumber: 29,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(SocialButtons, "ISsFonmrYwldzAnUT3Mp3BoNZSY=");
_c = SocialButtons;
var _c;
__turbopack_context__.k.register(_c, "SocialButtons");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/auth/pages/SignUp.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SignUp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/pages/AuthForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authRedirect.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/pages/AuthShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$CountryInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/pages/CountryInput.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$SocialButtons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/pages/SocialButtons.tsx [app-client] (ecmascript)");
;
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
const Agreement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/components/auth/pages/Agreement.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/components/auth/pages/Agreement.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c = Agreement;
function SignUp(param) {
    let { locale } = param;
    _s();
    const ar = locale === 'ar';
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const search = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const returnUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSafeReturnUrl"])(search.get('returnUrl') || search.get('redirect_uri'));
    const [serverError, setServerError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [countries, setCountries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [countriesError, setCountriesError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [retry, setRetry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [accepted, setAccepted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [agreement, setAgreement] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const resolveAgreement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SignUp.useEffect": ()=>{
            const controller = new AbortController();
            setCountriesError(false);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authRequest"])('common/setting/country/list', locale, undefined, {
                signal: controller.signal,
                authenticated: false
            }).then({
                "SignUp.useEffect": (res)=>{
                    const list = res.data || res;
                    if (!Array.isArray(list)) throw new Error('Invalid countries');
                    setCountries(list);
                }
            }["SignUp.useEffect"]).catch({
                "SignUp.useEffect": ()=>{
                    if (!controller.signal.aborted) setCountriesError(true);
                }
            }["SignUp.useEffect"]);
            return ({
                "SignUp.useEffect": ()=>controller.abort()
            })["SignUp.useEffect"];
        }
    }["SignUp.useEffect"], [
        locale,
        retry
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SignUp.useEffect": ()=>({
                "SignUp.useEffect": ()=>{
                    var _resolveAgreement_current;
                    return (_resolveAgreement_current = resolveAgreement.current) === null || _resolveAgreement_current === void 0 ? void 0 : _resolveAgreement_current.call(resolveAgreement, false);
                }
            })["SignUp.useEffect"]
    }["SignUp.useEffect"], []);
    function completeAgreement(value) {
        var _resolveAgreement_current;
        setAgreement(false);
        setAccepted(value);
        (_resolveAgreement_current = resolveAgreement.current) === null || _resolveAgreement_current === void 0 ? void 0 : _resolveAgreement_current.call(resolveAgreement, value);
        resolveAgreement.current = null;
    }
    function beforeSocial() {
        if (accepted) return Promise.resolve(true);
        setAgreement(true);
        return new Promise((resolve)=>{
            resolveAgreement.current = resolve;
        });
    }
    async function submit(event) {
        event.preventDefault();
        if (busy) return;
        if (!countries.length) {
            setError(ar ? 'يرجى تحميل قائمة الدول أولاً.' : 'Please load the country list first.');
            return;
        }
        if (!accepted) {
            setAgreement(true);
            return;
        }
        const form = new FormData(event.currentTarget);
        const password = String(form.get('password'));
        if (!/[A-Za-z]/.test(password) || !/\d/.test(password) || !/[^A-Za-z\d]/.test(password)) {
            setError(ar ? 'استخدم 8 أحرف على الأقل تتضمن حرفاً ورقماً ورمزاً.' : 'Use at least 8 characters including a letter, number and symbol.');
            return;
        }
        setBusy(true);
        setError('');
        try {
            const { data } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authRequest"])('auth/register', locale, {
                first_name: String(form.get('first_name')).trim(),
                last_name: String(form.get('last_name')).trim(),
                email: String(form.get('email')).trim(),
                password,
                password_confirmation: password,
                country_id: Number(form.get('country_id')),
                client_agreement: true
            }, {
                authenticated: false
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storeSession"])(data.token);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeAuthCookie"])('preferred_language', locale, 365 * 86400);
            router.replace((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authPageUrl"])('verify-email', locale, returnUrl) + "".concat(returnUrl ? '&' : '?', "email=").concat(encodeURIComponent(data.email || String(form.get('email'))), "&sent=1"));
        } catch (e) {
            setServerError(e);
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasFieldErrors"])(e) ? '' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authErrorMessage"])(e, locale));
            setBusy(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthShell"], {
        compact: true,
        locale: locale,
        title: ar ? 'إنشاء حساب في إنسايتا' : 'Create your Insighta account',
        subtitle: ar ? 'ابدأ رحلتك مع المعرفة والخبراء' : 'Start your journey with insights and experts',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$SocialButtons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                locale: locale,
                returnUrl: returnUrl,
                beforeStart: beforeSocial
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/SignUp.tsx",
                lineNumber: 44,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthNotice"], {
                error: error
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/SignUp.tsx",
                lineNumber: 44,
                columnNumber: 86
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                locale: locale,
                serverError: serverError,
                onSubmit: submit,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                    disabled: busy,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "auth-row",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "auth-field",
                                    htmlFor: "first_name",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "auth-sr-only",
                                            children: ar ? 'الاسم الأول' : 'First name'
                                        }, void 0, false, {
                                            fileName: "[project]/components/auth/pages/SignUp.tsx",
                                            lineNumber: 46,
                                            columnNumber: 84
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            placeholder: ar ? 'الاسم الأول' : 'First name',
                                            id: "first_name",
                                            name: "first_name",
                                            required: true,
                                            minLength: 2,
                                            maxLength: 50,
                                            autoComplete: "given-name"
                                        }, void 0, false, {
                                            fileName: "[project]/components/auth/pages/SignUp.tsx",
                                            lineNumber: 46,
                                            columnNumber: 157
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldError"], {
                                            name: "first_name"
                                        }, void 0, false, {
                                            fileName: "[project]/components/auth/pages/SignUp.tsx",
                                            lineNumber: 46,
                                            columnNumber: 311
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/auth/pages/SignUp.tsx",
                                    lineNumber: 46,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "auth-field",
                                    htmlFor: "last_name",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "auth-sr-only",
                                            children: ar ? 'اسم العائلة' : 'Last name'
                                        }, void 0, false, {
                                            fileName: "[project]/components/auth/pages/SignUp.tsx",
                                            lineNumber: 46,
                                            columnNumber: 400
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            placeholder: ar ? 'اسم العائلة' : 'Last name',
                                            id: "last_name",
                                            name: "last_name",
                                            required: true,
                                            minLength: 2,
                                            maxLength: 50,
                                            autoComplete: "family-name"
                                        }, void 0, false, {
                                            fileName: "[project]/components/auth/pages/SignUp.tsx",
                                            lineNumber: 46,
                                            columnNumber: 472
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldError"], {
                                            name: "last_name"
                                        }, void 0, false, {
                                            fileName: "[project]/components/auth/pages/SignUp.tsx",
                                            lineNumber: 46,
                                            columnNumber: 624
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/auth/pages/SignUp.tsx",
                                    lineNumber: 46,
                                    columnNumber: 350
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/auth/pages/SignUp.tsx",
                            lineNumber: 46,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "auth-field",
                            htmlFor: "email",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "auth-sr-only",
                                    children: ar ? 'البريد الإلكتروني' : 'Email'
                                }, void 0, false, {
                                    fileName: "[project]/components/auth/pages/SignUp.tsx",
                                    lineNumber: 47,
                                    columnNumber: 53
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    placeholder: ar ? 'البريد الإلكتروني' : 'Email',
                                    id: "email",
                                    name: "email",
                                    type: "email",
                                    required: true,
                                    maxLength: 191,
                                    autoComplete: "email",
                                    dir: "ltr"
                                }, void 0, false, {
                                    fileName: "[project]/components/auth/pages/SignUp.tsx",
                                    lineNumber: 47,
                                    columnNumber: 127
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldError"], {
                                    name: "email"
                                }, void 0, false, {
                                    fileName: "[project]/components/auth/pages/SignUp.tsx",
                                    lineNumber: 47,
                                    columnNumber: 277
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/auth/pages/SignUp.tsx",
                            lineNumber: 47,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PasswordInput"], {
                            locale: locale,
                            label: ar ? 'كلمة المرور' : 'Password',
                            newPassword: true,
                            hideLabel: true
                        }, void 0, false, {
                            fileName: "[project]/components/auth/pages/SignUp.tsx",
                            lineNumber: 48,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "auth-hint",
                            children: ar ? '8 أحرف على الأقل تتضمن حرفاً ورقماً ورمزاً.' : 'At least 8 characters including a letter, number and symbol.'
                        }, void 0, false, {
                            fileName: "[project]/components/auth/pages/SignUp.tsx",
                            lineNumber: 49,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$CountryInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            hideLabel: true,
                            countries: countries,
                            locale: locale
                        }, void 0, false, {
                            fileName: "[project]/components/auth/pages/SignUp.tsx",
                            lineNumber: 50,
                            columnNumber: 7
                        }, this),
                        countriesError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "auth-error",
                            role: "alert",
                            children: [
                                ar ? 'تعذر تحميل الدول. ' : 'Unable to load countries. ',
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "auth-link",
                                    onClick: ()=>setRetry((x)=>x + 1),
                                    children: ar ? 'إعادة المحاولة' : 'Retry'
                                }, void 0, false, {
                                    fileName: "[project]/components/auth/pages/SignUp.tsx",
                                    lineNumber: 51,
                                    columnNumber: 123
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/auth/pages/SignUp.tsx",
                            lineNumber: 51,
                            columnNumber: 26
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "auth-check",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "terms",
                                    type: "checkbox",
                                    checked: accepted,
                                    onChange: (e)=>e.target.checked ? setAgreement(true) : setAccepted(false)
                                }, void 0, false, {
                                    fileName: "[project]/components/auth/pages/SignUp.tsx",
                                    lineNumber: 52,
                                    columnNumber: 35
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "terms",
                                    children: [
                                        ar ? 'أوافق على ' : 'I agree to the ',
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "auth-link",
                                            onClick: ()=>setAgreement(true),
                                            children: ar ? 'اتفاقية الاستخدام' : 'terms of service'
                                        }, void 0, false, {
                                            fileName: "[project]/components/auth/pages/SignUp.tsx",
                                            lineNumber: 52,
                                            columnNumber: 226
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/auth/pages/SignUp.tsx",
                                    lineNumber: 52,
                                    columnNumber: 164
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/auth/pages/SignUp.tsx",
                            lineNumber: 52,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubmitButton"], {
                            locale: locale,
                            busy: busy,
                            children: ar ? 'إنشاء حساب' : 'Create account'
                        }, void 0, false, {
                            fileName: "[project]/components/auth/pages/SignUp.tsx",
                            lineNumber: 53,
                            columnNumber: 7
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/auth/pages/SignUp.tsx",
                    lineNumber: 45,
                    columnNumber: 75
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/SignUp.tsx",
                lineNumber: 45,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthFooter"], {
                locale: locale,
                signup: true,
                returnUrl: returnUrl
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/SignUp.tsx",
                lineNumber: 54,
                columnNumber: 27
            }, this),
            agreement && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Agreement, {
                locale: locale,
                onAccept: ()=>completeAgreement(true),
                onCancel: ()=>completeAgreement(false)
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/SignUp.tsx",
                lineNumber: 55,
                columnNumber: 19
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/auth/pages/SignUp.tsx",
        lineNumber: 43,
        columnNumber: 10
    }, this);
}
_s(SignUp, "FdjuTRxcBXSYuOL3p9Fv61C8V9g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c1 = SignUp;
var _c, _c1;
__turbopack_context__.k.register(_c, "Agreement");
__turbopack_context__.k.register(_c1, "SignUp");
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
"[project]/node_modules/next/dist/shared/lib/lazy-dynamic/dynamic-bailout-to-csr.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BailoutToCSR", {
    enumerable: true,
    get: function() {
        return BailoutToCSR;
    }
});
const _bailouttocsr = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js [app-client] (ecmascript)");
function BailoutToCSR(param) {
    let { reason, children } = param;
    if (typeof window === 'undefined') {
        throw Object.defineProperty(new _bailouttocsr.BailoutToCSRError(reason), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    return children;
} //# sourceMappingURL=dynamic-bailout-to-csr.js.map
}),
"[project]/node_modules/next/dist/shared/lib/encode-uri-path.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "encodeURIPath", {
    enumerable: true,
    get: function() {
        return encodeURIPath;
    }
});
function encodeURIPath(file) {
    return file.split('/').map((p)=>encodeURIComponent(p)).join('/');
} //# sourceMappingURL=encode-uri-path.js.map
}),
"[project]/node_modules/next/dist/shared/lib/lazy-dynamic/preload-chunks.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PreloadChunks", {
    enumerable: true,
    get: function() {
        return PreloadChunks;
    }
});
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _reactdom = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
const _workasyncstorageexternal = __turbopack_context__.r("[project]/node_modules/next/dist/server/app-render/work-async-storage.external.js [app-client] (ecmascript)");
const _encodeuripath = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/encode-uri-path.js [app-client] (ecmascript)");
function PreloadChunks(param) {
    let { moduleIds } = param;
    // Early return in client compilation and only load requestStore on server side
    if (typeof window !== 'undefined') {
        return null;
    }
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    if (workStore === undefined) {
        return null;
    }
    const allFiles = [];
    // Search the current dynamic call unique key id in react loadable manifest,
    // and find the corresponding CSS files to preload
    if (workStore.reactLoadableManifest && moduleIds) {
        const manifest = workStore.reactLoadableManifest;
        for (const key of moduleIds){
            if (!manifest[key]) continue;
            const chunks = manifest[key].files;
            allFiles.push(...chunks);
        }
    }
    if (allFiles.length === 0) {
        return null;
    }
    const dplId = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : '';
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: allFiles.map((chunk)=>{
            const href = workStore.assetPrefix + "/_next/" + (0, _encodeuripath.encodeURIPath)(chunk) + dplId;
            const isCss = chunk.endsWith('.css');
            // If it's stylesheet we use `precedence` o help hoist with React Float.
            // For stylesheets we actually need to render the CSS because nothing else is going to do it so it needs to be part of the component tree.
            // The `preload` for stylesheet is not optional.
            if (isCss) {
                return /*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                    // @ts-ignore
                    precedence: "dynamic",
                    href: href,
                    rel: "stylesheet",
                    as: "style"
                }, chunk);
            } else {
                // If it's script we use ReactDOM.preload to preload the resources
                (0, _reactdom.preload)(href, {
                    as: 'script',
                    fetchPriority: 'low'
                });
                return null;
            }
        })
    });
} //# sourceMappingURL=preload-chunks.js.map
}),
"[project]/node_modules/next/dist/shared/lib/lazy-dynamic/loadable.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
const _dynamicbailouttocsr = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/lazy-dynamic/dynamic-bailout-to-csr.js [app-client] (ecmascript)");
const _preloadchunks = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/lazy-dynamic/preload-chunks.js [app-client] (ecmascript)");
// Normalize loader to return the module as form { default: Component } for `React.lazy`.
// Also for backward compatible since next/dynamic allows to resolve a component directly with loader
// Client component reference proxy need to be converted to a module.
function convertModule(mod) {
    // Check "default" prop before accessing it, as it could be client reference proxy that could break it reference.
    // Cases:
    // mod: { default: Component }
    // mod: Component
    // mod: { default: proxy(Component) }
    // mod: proxy(Component)
    const hasDefault = mod && 'default' in mod;
    return {
        default: hasDefault ? mod.default : mod
    };
}
const defaultOptions = {
    loader: ()=>Promise.resolve(convertModule(()=>null)),
    loading: null,
    ssr: true
};
function Loadable(options) {
    const opts = {
        ...defaultOptions,
        ...options
    };
    const Lazy = /*#__PURE__*/ (0, _react.lazy)(()=>opts.loader().then(convertModule));
    const Loading = opts.loading;
    function LoadableComponent(props) {
        const fallbackElement = Loading ? /*#__PURE__*/ (0, _jsxruntime.jsx)(Loading, {
            isLoading: true,
            pastDelay: true,
            error: null
        }) : null;
        // If it's non-SSR or provided a loading component, wrap it in a suspense boundary
        const hasSuspenseBoundary = !opts.ssr || !!opts.loading;
        const Wrap = hasSuspenseBoundary ? _react.Suspense : _react.Fragment;
        const wrapProps = hasSuspenseBoundary ? {
            fallback: fallbackElement
        } : {};
        const children = opts.ssr ? /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
            children: [
                typeof window === 'undefined' ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_preloadchunks.PreloadChunks, {
                    moduleIds: opts.modules
                }) : null,
                /*#__PURE__*/ (0, _jsxruntime.jsx)(Lazy, {
                    ...props
                })
            ]
        }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_dynamicbailouttocsr.BailoutToCSR, {
            reason: "next/dynamic",
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(Lazy, {
                ...props
            })
        });
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(Wrap, {
            ...wrapProps,
            children: children
        });
    }
    LoadableComponent.displayName = 'LoadableComponent';
    return LoadableComponent;
}
const _default = Loadable; //# sourceMappingURL=loadable.js.map
}),
"[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return dynamic;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/node_modules/next/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _loadable = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/lazy-dynamic/loadable.js [app-client] (ecmascript)"));
function dynamic(dynamicOptions, options) {
    var _mergedOptions_loadableGenerated;
    const loadableOptions = {};
    if (typeof dynamicOptions === 'function') {
        loadableOptions.loader = dynamicOptions;
    }
    const mergedOptions = {
        ...loadableOptions,
        ...options
    };
    return (0, _loadable.default)({
        ...mergedOptions,
        modules: (_mergedOptions_loadableGenerated = mergedOptions.loadableGenerated) == null ? void 0 : _mergedOptions_loadableGenerated.modules
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-dynamic.js.map
}),
]);

//# sourceMappingURL=_ea835bc2._.js.map