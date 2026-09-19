module.exports = [
"[project]/lib/auth-profile-cache.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/app/config.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/lib/authToken.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
function getTokenFromCookie(cookieName = 'token') {
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
        } catch  {
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
}),
"[project]/lib/cookieDomain.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
    const hostname = undefined;
}
function isSharedCookieHost() {
    return getCookieDomain() !== null;
}
function sharedCookieAttributes() {
    const domain = getCookieDomain();
    return domain ? [
        'SameSite=Lax',
        `Domain=${domain}`,
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
    return domain ? `Domain=${domain}; ` : '';
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
}),
"[project]/lib/auth-client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$profile$2d$cache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth-profile-cache.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cookieDomain$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/cookieDomain.ts [app-ssr] (ecmascript)");
;
;
;
;
class AuthError extends Error {
    status;
    fields;
    constructor(status, message, fields = {}){
        super(message), this.status = status, this.fields = fields;
    }
}
async function authRequest(path, locale, body, options = {}) {
    const token = options.authenticated === false ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiBaseUrl"]}/api/${path}`, {
        method: options.method || (body === undefined ? 'GET' : 'POST'),
        headers: {
            Accept: 'application/json',
            'Accept-Language': locale,
            ...body !== undefined ? {
                'Content-Type': 'application/json'
            } : {},
            ...token ? {
                Authorization: `Bearer ${token}`
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
    } catch  {
        payload = text;
    }
    if (!response.ok) throw new AuthError(response.status, payload?.message || (locale === 'ar' ? 'تعذر إكمال الطلب. حاول مجدداً.' : 'Unable to complete your request. Please try again.'), payload?.errors);
    return payload;
}
function writeAuthCookie(name, value, age = 3600) {
    document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${age}; ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cookieDomain$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sharedCookieAttributes"])().join('; ')}`;
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
    } catch  {}
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])() !== token) throw new Error('Cookies are required to sign in.');
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
        for (const domain of (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cookieDomain$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cookieDomainsToClear"])()){
            for (const path of [
                '/',
                '/en',
                '/ar'
            ])document.cookie = `${name}=; Path=${path}; Max-Age=0; ${domain ? `Domain=${domain};` : ''}`;
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
    } catch  {}
    pendingUser = null;
    Object.assign(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$profile$2d$cache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["globalProfileCache"], {
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
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
    if (token) pendingUser = {
        token,
        user,
        expires: Date.now() + 60000
    };
}
function takeLoginUser() {
    const data = pendingUser;
    pendingUser = null;
    return data && data.token === (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])() && data.expires > Date.now() ? data.user : null;
}
function authErrorMessage(error, locale, login = false) {
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
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$profile$2d$cache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["globalProfileCache"].user = {
        ...safe,
        id: Number(user.id),
        name: user.name || '',
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        profile_photo_url: user.profile_photo_url || null
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$profile$2d$cache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["globalProfileCache"].roles = Array.isArray(user.roles) ? user.roles : [];
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$profile$2d$cache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["globalProfileCache"].lastFetchTime = Date.now();
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$profile$2d$cache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["globalProfileCache"].sessionToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$profile$2d$cache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["globalProfileCache"].authFailedToken = null;
}
}),
"[project]/components/auth/pages/AuthForm.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth-client.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
const ClearError = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(()=>{});
const useClearFieldError = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ClearError);
const Errors = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])({});
function FieldError({ name }) {
    const errors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(Errors);
    return errors[name] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        id: `${name}-error`,
        className: "auth-field-error",
        role: "alert",
        children: errors[name]
    }, void 0, false, {
        fileName: "[project]/components/auth/pages/AuthForm.tsx",
        lineNumber: 9,
        columnNumber: 25
    }, this) : null;
}
function hasFieldErrors(error) {
    return error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthError"] && Object.keys(error.fields).length > 0;
}
function AuthForm({ locale, children, onSubmit, serverError }) {
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ar = locale === 'ar';
    function validate(form) {
        const result = {};
        for (const element of Array.from(form.elements)){
            if (!(element instanceof HTMLInputElement) || !element.name || element.disabled) continue;
            const value = element.type === 'password' || element.name.startsWith('password') ? element.value : element.value.trim();
            if (element.required && !value) result[element.name] = ar ? 'هذا الحقل مطلوب.' : 'This field is required.';
            else if (element.type === 'email' && value && element.validity.typeMismatch) result[element.name] = ar ? 'أدخل بريداً إلكترونياً صالحاً.' : 'Enter a valid email address.';
            else if (value && element.minLength > 0 && value.length < element.minLength) result[element.name] = ar ? `أدخل ${element.minLength} أحرف على الأقل.` : `Enter at least ${element.minLength} characters.`;
            if (element.name === 'country_id' && !value) result.country_id = ar ? 'اختر الدولة.' : 'Select your country.';
            if (element.name === 'code' && !/^\d{6}$/.test(value)) result.code = ar ? 'أدخل رمز التحقق المكوّن من 6 أرقام.' : 'Enter the 6-digit verification code.';
            if (element.name === 'password' && element.autocomplete === 'new-password' && value && (!/[A-Za-z]/.test(value) || !/\d/.test(value) || !/[^A-Za-z\d]/.test(value))) result.password = ar ? 'استخدم 8 أحرف على الأقل تتضمن حرفاً ورقماً ورمزاً.' : 'Use at least 8 characters including a letter, number and symbol.';
            if (element.name === 'password_confirmation' && value !== new FormData(form).get('password')) result.password_confirmation = ar ? 'كلمتا المرور غير متطابقتين.' : 'Passwords do not match.';
        }
        return result;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (serverError instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthError"]) setErrors(Object.fromEntries(Object.entries(serverError.fields).map(([key, messages])=>[
                key,
                messages[0]
            ])));
    }, [
        serverError
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        ref.current?.querySelectorAll('input[id]').forEach((input)=>{
            const name = input.dataset.field || input.name;
            input.setAttribute('aria-invalid', errors[name] ? 'true' : 'false');
            if (errors[name]) input.setAttribute('aria-describedby', `${name}-error`);
            else input.removeAttribute('aria-describedby');
        });
    }, [
        errors
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Errors.Provider, {
        value: errors,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ClearError.Provider, {
            value: (name)=>setErrors((old)=>({
                        ...old,
                        [name]: ''
                    })),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
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
                        event.preventDefault();
                        const name = Object.keys(next)[0];
                        event.currentTarget.querySelector(`#${name}`)?.focus();
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
}),
"[project]/lib/auth-policy.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
        if (angularPath) return `${angular}${path}${url.search}${url.hash}`;
        if (url.origin === angular) return null;
        return `${url.pathname}${url.search}${url.hash}`;
    } catch  {
        return null;
    }
}
function verificationUrl(value, apiOrigin) {
    try {
        const base = new URL(apiOrigin).origin;
        const url = new URL(value.startsWith('/') || /^https?:/.test(value) ? value : `/api/email/verify/${value}`, base);
        if (url.origin !== base || url.username || url.password || !url.pathname.startsWith('/api/email/verify/')) return null;
        return url.href;
    } catch  {
        return null;
    }
}
}),
"[project]/lib/authRedirect.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$policy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth-policy.ts [app-ssr] (ecmascript)");
;
;
const normalizeAngularPath = (path)=>path.replace(/^\/(en|ar)(?=\/|$)/, '') || '/';
const isAngularPath = (path)=>/^\/(app|admin-dashboard)\//.test(normalizeAngularPath(path));
const getAngularAppOrigin = (_returnUrl)=>new URL(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dashboardUrl"]).origin;
const isAngularRouteUrl = (value)=>{
    try {
        return isAngularPath(new URL(value, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publicBaseUrl"]).pathname);
    } catch  {
        return false;
    }
};
const getSafeReturnUrl = (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$policy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeReturnUrl"])(value, ("TURBOPACK compile-time truthy", 1) ? __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publicBaseUrl"] : "TURBOPACK unreachable", __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dashboardUrl"]);
const toAngularAppUrl = (value)=>getSafeReturnUrl(value) || `${getAngularAppOrigin()}/app/insighter-dashboard/my-dashboard`;
function authPageUrl(page, locale = 'en', returnUrl) {
    const language = locale === 'ar' ? 'ar' : 'en';
    const destination = getSafeReturnUrl(returnUrl);
    return `/${language}/${page}${destination ? `?returnUrl=${encodeURIComponent(destination)}` : ''}`;
}
}),
"[project]/components/auth/pages/AuthShell.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/pages/AuthForm.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authRedirect.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function AuthShell({ locale, title, subtitle, children, compact = false }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const search = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const otherLocale = locale === 'ar' ? 'en' : 'ar';
    const clean = new URLSearchParams(search.toString());
    clean.delete('token');
    clean.delete('access_token');
    const languageUrl = pathname.replace(/^\/(ar|en)/, `/${otherLocale}`) + (clean.size ? `?${clean}` : '');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: `auth-screen${compact ? ' auth-signup' : ''}`,
        dir: locale === 'ar' ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "auth-nav",
                "aria-label": locale === 'ar' ? 'التنقل' : 'Navigation',
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: `/${locale}`,
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "auth-card",
                "aria-labelledby": "auth-heading",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "auth-heading",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: `/${locale}`,
                                prefetch: false,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                id: "auth-heading",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/auth/pages/AuthShell.tsx",
                                lineNumber: 22,
                                columnNumber: 9
                            }, this),
                            subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
function PasswordInput({ label, locale, name = 'password', newPassword = false, hideLabel = false }) {
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: "auth-field",
        htmlFor: name,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: hideLabel ? 'auth-sr-only' : undefined,
                children: label
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/AuthShell.tsx",
                lineNumber: 29,
                columnNumber: 55
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "auth-password",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "auth-reveal",
                        "aria-pressed": visible,
                        "aria-label": locale === 'ar' ? visible ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور' : visible ? 'Hide password' : 'Show password',
                        onClick: ()=>setVisible(!visible),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "20",
                            height: "20",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "1.6",
                            "aria-hidden": "true",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                                }, void 0, false, {
                                    fileName: "[project]/components/auth/pages/AuthShell.tsx",
                                    lineNumber: 32,
                                    columnNumber: 126
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "12",
                                    cy: "12",
                                    r: "3"
                                }, void 0, false, {
                                    fileName: "[project]/components/auth/pages/AuthShell.tsx",
                                    lineNumber: 32,
                                    columnNumber: 186
                                }, this),
                                visible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldError"], {
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
function AuthNotice({ error, message }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "aria-live": "polite",
        "aria-atomic": "true",
        children: [
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "auth-error",
                role: "alert",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/AuthShell.tsx",
                lineNumber: 36,
                columnNumber: 63
            }, this),
            message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
function SubmitButton({ busy, children, locale }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: "auth-primary",
        type: "submit",
        disabled: busy,
        "aria-busy": busy,
        children: busy ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
function AuthFooter({ locale, signup = false, returnUrl }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "auth-footer",
        children: [
            locale === 'ar' ? signup ? 'لديك حساب بالفعل؟ ' : 'ليس لديك حساب؟ ' : signup ? 'Already have an account? ' : 'Need an account? ',
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                prefetch: false,
                href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authPageUrl"])(signup ? 'signin' : 'signup', locale, returnUrl),
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
}),
"[project]/components/auth/pages/CountryInput.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CountryInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/pages/AuthForm.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
function CountryInput({ countries, locale, hideLabel = false }) {
    const clearError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useClearFieldError"])();
    const ar = locale === 'ar';
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])();
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const filtered = countries.filter((country)=>country.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
    function choose(country) {
        clearError('country_id');
        setSelected(country);
        setQuery('');
        setOpen(false);
    }
    const flag = (country)=>country.flag ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: `/images/flags/${country.flag}.svg`,
            width: "24",
            height: "18",
            alt: "",
            loading: "lazy"
        }, void 0, false, {
            fileName: "[project]/components/auth/pages/CountryInput.tsx",
            lineNumber: 10,
            columnNumber: 53
        }, this) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `auth-field auth-country${hideLabel ? ' auth-country-compact' : ''}`,
        onBlur: (event)=>{
            if (!event.currentTarget.contains(event.relatedTarget)) {
                setOpen(false);
                setQuery('');
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: hideLabel ? 'auth-sr-only' : undefined,
                htmlFor: "country_id",
                children: ar ? 'الدولة' : 'Country'
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/CountryInput.tsx",
                lineNumber: 12,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "auth-country-control",
                children: [
                    selected && !open && flag(selected),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "country_id",
                        "data-field": "country_id",
                        role: "combobox",
                        "aria-autocomplete": "list",
                        "aria-expanded": open,
                        "aria-controls": "country-options",
                        "aria-activedescendant": open && filtered[active] ? `country-option-${filtered[active].id}` : undefined,
                        autoComplete: "off",
                        disabled: !countries.length,
                        value: open ? query : selected?.name || '',
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
                                event.preventDefault();
                                setOpen(true);
                                const next = Math.max(0, Math.min(filtered.length - 1, active + (event.key === 'ArrowDown' ? 1 : -1)));
                                setActive(next);
                                document.getElementById(`country-option-${filtered[next]?.id}`)?.scrollIntoView({
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "hidden",
                name: "country_id",
                value: selected?.id || ''
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/CountryInput.tsx",
                lineNumber: 18,
                columnNumber: 5
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                id: "country-options",
                role: "listbox",
                "aria-label": ar ? 'الدول' : 'Countries',
                children: [
                    filtered.map((country, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            id: `country-option-${country.id}`,
                            role: "option",
                            "aria-selected": selected?.id === country.id,
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
                    !filtered.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldError"], {
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
}),
"[project]/components/auth/pages/SocialButtons.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SocialButtons
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth-client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authRedirect.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/pages/AuthShell.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function SocialButtons({ locale, returnUrl, beforeStart }) {
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    async function signIn(provider) {
        if (busy) return;
        setBusy(true);
        setError('');
        try {
            if (beforeStart && !await beforeStart()) return;
            const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSafeReturnUrl"])(returnUrl);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeAuthCookie"])('auth_return_url', target || '', target ? 3600 : 0);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeAuthCookie"])('preferred_language', locale, 365 * 86400);
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authRequest"])(`auth/provider/${provider}`, locale, undefined, {
                authenticated: false
            });
            const url = new URL(typeof response === 'string' ? response : response?.url || response?.data);
            const hosts = provider === 'google' ? [
                'accounts.google.com'
            ] : [
                'www.linkedin.com',
                'linkedin.com'
            ];
            if (url.protocol !== 'https:' || !hosts.includes(url.hostname)) throw new Error('Invalid provider URL');
            window.location.assign(url.href);
        } catch (e) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authErrorMessage"])(e, locale));
        } finally{
            setBusy(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthNotice"], {
                error: error
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/SocialButtons.tsx",
                lineNumber: 26,
                columnNumber: 12
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "auth-social",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        disabled: busy,
                        onClick: ()=>void signIn('google'),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        disabled: busy,
                        onClick: ()=>void signIn('linkedin-openid'),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
}),
"[project]/components/auth/pages/SignUp.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SignUp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/pages/AuthForm.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth-client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authRedirect.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/pages/AuthShell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$CountryInput$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/pages/CountryInput.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$SocialButtons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/pages/SocialButtons.tsx [app-ssr] (ecmascript)");
;
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
const Agreement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/components/auth/pages/Agreement.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
function SignUp({ locale }) {
    const ar = locale === 'ar';
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const search = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const returnUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSafeReturnUrl"])(search.get('returnUrl') || search.get('redirect_uri'));
    const [serverError, setServerError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])();
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [countries, setCountries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [countriesError, setCountriesError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [retry, setRetry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [accepted, setAccepted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [agreement, setAgreement] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const resolveAgreement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const controller = new AbortController();
        setCountriesError(false);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authRequest"])('common/setting/country/list', locale, undefined, {
            signal: controller.signal,
            authenticated: false
        }).then((res)=>{
            const list = res.data || res;
            if (!Array.isArray(list)) throw new Error('Invalid countries');
            setCountries(list);
        }).catch(()=>{
            if (!controller.signal.aborted) setCountriesError(true);
        });
        return ()=>controller.abort();
    }, [
        locale,
        retry
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>()=>resolveAgreement.current?.(false), []);
    function completeAgreement(value) {
        setAgreement(false);
        setAccepted(value);
        resolveAgreement.current?.(value);
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
            const { data } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authRequest"])('auth/register', locale, {
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storeSession"])(data.token);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeAuthCookie"])('preferred_language', locale, 365 * 86400);
            router.replace((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authPageUrl"])('verify-email', locale, returnUrl) + `${returnUrl ? '&' : '?'}email=${encodeURIComponent(data.email || String(form.get('email')))}&sent=1`);
        } catch (e) {
            setServerError(e);
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasFieldErrors"])(e) ? '' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authErrorMessage"])(e, locale));
            setBusy(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthShell"], {
        compact: true,
        locale: locale,
        title: ar ? 'إنشاء حساب في إنسايتا' : 'Create your Insighta account',
        subtitle: ar ? 'ابدأ رحلتك مع المعرفة والخبراء' : 'Start your journey with insights and experts',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$SocialButtons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                locale: locale,
                returnUrl: returnUrl,
                beforeStart: beforeSocial
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/SignUp.tsx",
                lineNumber: 44,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthNotice"], {
                error: error
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/SignUp.tsx",
                lineNumber: 44,
                columnNumber: 86
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                locale: locale,
                serverError: serverError,
                onSubmit: submit,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                    disabled: busy,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "auth-row",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "auth-field",
                                    htmlFor: "first_name",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "auth-sr-only",
                                            children: ar ? 'الاسم الأول' : 'First name'
                                        }, void 0, false, {
                                            fileName: "[project]/components/auth/pages/SignUp.tsx",
                                            lineNumber: 46,
                                            columnNumber: 84
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldError"], {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "auth-field",
                                    htmlFor: "last_name",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "auth-sr-only",
                                            children: ar ? 'اسم العائلة' : 'Last name'
                                        }, void 0, false, {
                                            fileName: "[project]/components/auth/pages/SignUp.tsx",
                                            lineNumber: 46,
                                            columnNumber: 400
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldError"], {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "auth-field",
                            htmlFor: "email",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "auth-sr-only",
                                    children: ar ? 'البريد الإلكتروني' : 'Email'
                                }, void 0, false, {
                                    fileName: "[project]/components/auth/pages/SignUp.tsx",
                                    lineNumber: 47,
                                    columnNumber: 53
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldError"], {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PasswordInput"], {
                            locale: locale,
                            label: ar ? 'كلمة المرور' : 'Password',
                            newPassword: true,
                            hideLabel: true
                        }, void 0, false, {
                            fileName: "[project]/components/auth/pages/SignUp.tsx",
                            lineNumber: 48,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "auth-hint",
                            children: ar ? '8 أحرف على الأقل تتضمن حرفاً ورقماً ورمزاً.' : 'At least 8 characters including a letter, number and symbol.'
                        }, void 0, false, {
                            fileName: "[project]/components/auth/pages/SignUp.tsx",
                            lineNumber: 49,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$CountryInput$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            hideLabel: true,
                            countries: countries,
                            locale: locale
                        }, void 0, false, {
                            fileName: "[project]/components/auth/pages/SignUp.tsx",
                            lineNumber: 50,
                            columnNumber: 7
                        }, this),
                        countriesError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "auth-error",
                            role: "alert",
                            children: [
                                ar ? 'تعذر تحميل الدول. ' : 'Unable to load countries. ',
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "auth-check",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "terms",
                                    type: "checkbox",
                                    checked: accepted,
                                    onChange: (e)=>e.target.checked ? setAgreement(true) : setAccepted(false)
                                }, void 0, false, {
                                    fileName: "[project]/components/auth/pages/SignUp.tsx",
                                    lineNumber: 52,
                                    columnNumber: 35
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "terms",
                                    children: [
                                        ar ? 'أوافق على ' : 'I agree to the ',
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SubmitButton"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$pages$2f$AuthShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthFooter"], {
                locale: locale,
                signup: true,
                returnUrl: returnUrl
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/SignUp.tsx",
                lineNumber: 54,
                columnNumber: 27
            }, this),
            agreement && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Agreement, {
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
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/shared/lib/lazy-dynamic/dynamic-bailout-to-csr.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
const _bailouttocsr = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js [app-ssr] (ecmascript)");
function BailoutToCSR(param) {
    let { reason, children } = param;
    if ("TURBOPACK compile-time truthy", 1) {
        throw Object.defineProperty(new _bailouttocsr.BailoutToCSRError(reason), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    return children;
} //# sourceMappingURL=dynamic-bailout-to-csr.js.map
}),
"[project]/node_modules/next/dist/shared/lib/encode-uri-path.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
"[project]/node_modules/next/dist/shared/lib/lazy-dynamic/preload-chunks.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
const _reactdom = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
const _encodeuripath = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/encode-uri-path.js [app-ssr] (ecmascript)");
function PreloadChunks(param) {
    let { moduleIds } = param;
    // Early return in client compilation and only load requestStore on server side
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
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
"[project]/node_modules/next/dist/shared/lib/lazy-dynamic/loadable.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
const _react = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
const _dynamicbailouttocsr = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/lazy-dynamic/dynamic-bailout-to-csr.js [app-ssr] (ecmascript)");
const _preloadchunks = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/lazy-dynamic/preload-chunks.js [app-ssr] (ecmascript)");
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
                ("TURBOPACK compile-time truthy", 1) ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_preloadchunks.PreloadChunks, {
                    moduleIds: opts.modules
                }) : "TURBOPACK unreachable",
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
"[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
const _interop_require_default = __turbopack_context__.r("[project]/node_modules/next/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-ssr] (ecmascript)");
const _loadable = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/lazy-dynamic/loadable.js [app-ssr] (ecmascript)"));
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
];

//# sourceMappingURL=_943e9d09._.js.map