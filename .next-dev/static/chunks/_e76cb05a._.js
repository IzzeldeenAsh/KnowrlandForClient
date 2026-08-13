(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/lib/useCountries.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCountries",
    ()=>useCountries
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/index.react-client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
let countriesCache = {
    countries: [],
    lastFetchTime: 0,
    isLoading: false,
    pendingPromise: null
};
const CACHE_DURATION = 300000; // 5 minutes cache for countries (they don't change often)
function useCountries() {
    _s();
    const [countries, setCountries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(countriesCache.countries);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(countriesCache.isLoading);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const fetchCountriesWithRetry = async function() {
        let maxRetries = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 3;
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
        for(let attempt = 1; attempt <= maxRetries; attempt++){
            try {
                console.log("[useCountries] Attempt ".concat(attempt, "/").concat(maxRetries, " to fetch countries"));
                const headers = {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Accept-Language": locale,
                    "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone
                };
                if (token) {
                    headers['Authorization'] = "Bearer ".concat(token);
                }
                const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/common/setting/country/list"), {
                    headers
                });
                console.log("[useCountries] Countries fetch response", {
                    attempt,
                    status: response.status,
                    ok: response.ok,
                    statusText: response.statusText
                });
                if (!response.ok) {
                    // Handle specific status codes
                    if (response.status === 0) {
                        throw new Error('Network error or CORS issue. Please check your internet connection.');
                    }
                    if (attempt < maxRetries) {
                        const delay = Math.pow(2, attempt - 1) * 1000;
                        console.log("[useCountries] Request failed, retrying in ".concat(delay, "ms..."));
                        await new Promise((resolve)=>setTimeout(resolve, delay));
                        continue;
                    }
                    throw new Error("Failed to fetch countries: ".concat(response.status, " ").concat(response.statusText));
                }
                const data = await response.json();
                console.log("[useCountries] Successfully retrieved countries", {
                    count: data.data.length
                });
                countriesCache.countries = data.data;
                countriesCache.lastFetchTime = Date.now();
                return data.data;
            } catch (error) {
                console.error("[useCountries] Attempt ".concat(attempt, " failed:"), error);
                // Handle network errors and CORS issues specifically
                if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
                    console.error('[useCountries] Network error or CORS issue detected');
                    if (attempt === maxRetries) {
                        throw new Error('Network error: Unable to fetch countries. This may be due to CORS policy or network connectivity issues.');
                    }
                } else if (attempt === maxRetries) {
                    throw error;
                }
                const delay = Math.pow(2, attempt - 1) * 1000;
                await new Promise((resolve)=>setTimeout(resolve, delay));
            }
        }
        return [];
    };
    const fetchCountries = async function() {
        let forceRefresh = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
        const now = Date.now();
        if (!forceRefresh && countriesCache.countries.length > 0 && now - countriesCache.lastFetchTime < CACHE_DURATION) {
            console.log("[useCountries] Using cached countries data");
            return countriesCache.countries;
        }
        if (countriesCache.pendingPromise) {
            console.log("[useCountries] Using pending promise");
            return countriesCache.pendingPromise;
        }
        console.log("[useCountries] Starting new countries fetch");
        countriesCache.isLoading = true;
        countriesCache.pendingPromise = fetchCountriesWithRetry();
        try {
            const result = await countriesCache.pendingPromise;
            return result;
        } catch (error) {
            console.error("[useCountries] Error fetching countries:", error);
            throw error;
        } finally{
            countriesCache.isLoading = false;
            countriesCache.pendingPromise = null;
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCountries.useEffect": ()=>{
            const loadCountries = {
                "useCountries.useEffect.loadCountries": async ()=>{
                    // Skip loading if we're on sign-out related pages
                    if ("TURBOPACK compile-time truthy", 1) {
                        const pathname = window.location.pathname;
                        if (pathname.includes('/signout') || pathname.includes('/callback')) {
                            console.log('[useCountries] Skipping countries fetch on sign-out/callback page');
                            return;
                        }
                    }
                    // Check if we have a valid token before starting
                    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
                    if (!token) {
                        console.log('[useCountries] No token available, skipping countries fetch');
                        return;
                    }
                    setIsLoading(true);
                    setError(null);
                    try {
                        const fetchedCountries = await fetchCountries();
                        setCountries(fetchedCountries);
                    } catch (error) {
                        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch countries';
                        setError(errorMessage);
                        console.error('[useCountries] Error loading countries:', error);
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["useCountries.useEffect.loadCountries"];
            loadCountries();
        }
    }["useCountries.useEffect"], [
        locale
    ]);
    const getCountryById = (id)=>{
        return countries.find((country)=>country.id === id);
    };
    const getCountryByIso2 = (iso2)=>{
        return countries.find((country)=>country.iso2.toLowerCase() === iso2.toLowerCase());
    };
    const getCountryByIso3 = (iso3)=>{
        return countries.find((country)=>country.iso3.toLowerCase() === iso3.toLowerCase());
    };
    const getLocalizedCountryName = (country)=>{
        return country.names[locale] || country.name;
    };
    const getLocalizedNationality = (country)=>{
        return country.nationalities[locale] || country.nationality;
    };
    return {
        countries,
        isLoading,
        error,
        getCountryById,
        getCountryByIso2,
        getCountryByIso3,
        getLocalizedCountryName,
        getLocalizedNationality,
        refetch: ()=>fetchCountries(true)
    };
}
_s(useCountries, "oTA1Z8xhIHz37vBHGGZ+oOLHgdE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/authRedirect.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAngularAppOrigin",
    ()=>getAngularAppOrigin,
    "isAngularPath",
    ()=>isAngularPath,
    "isAngularRouteUrl",
    ()=>isAngularRouteUrl,
    "normalizeAngularPath",
    ()=>normalizeAngularPath,
    "toAngularAppUrl",
    ()=>toAngularAppUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const DEFAULT_LOCAL_ANGULAR_APP_URL = ("TURBOPACK compile-time value", "http://localhost:4200") || "".concat(("TURBOPACK compile-time value", "http://localhost:4200"));
const ANGULAR_ROUTE_PREFIXES = [
    "/app/",
    "/admin-dashboard/"
];
const LOCALHOST_HOSTNAMES = new Set([
    "localhost",
    "127.0.0.1"
]);
const isAbsoluteHttpUrl = (url)=>/^https?:\/\//i.test(url);
const isLocalhost = (hostname)=>LOCALHOST_HOSTNAMES.has(hostname);
const isKnownAngularOrigin = (url)=>url.hostname.startsWith("app.") || isLocalhost(url.hostname) && url.port !== "3000";
const extractKnownAngularOrigin = (url)=>{
    if (!url || !isAbsoluteHttpUrl(url)) {
        return null;
    }
    try {
        const parsed = new URL(url);
        return isKnownAngularOrigin(parsed) ? parsed.origin : null;
    } catch (e) {
        return null;
    }
};
const normalizeAngularPath = (path)=>{
    const withoutLocale = (path.replace(/^\/(en|ar)(?=\/|$)/, "") || "/").trim();
    return withoutLocale.startsWith("/") ? withoutLocale : "/".concat(withoutLocale);
};
const isAngularPath = (path)=>{
    const pathOnly = path.split("?")[0].split("#")[0];
    const normalized = normalizeAngularPath(pathOnly);
    return ANGULAR_ROUTE_PREFIXES.some((prefix)=>normalized.startsWith(prefix));
};
const isAngularRouteUrl = (url)=>{
    if (!url) {
        return false;
    }
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const parsed = new URL(url, window.location.origin);
        return isAngularPath(parsed.pathname);
    } catch (e) {
        return isAngularPath(url);
    }
};
const getAngularAppOrigin = (returnUrl)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const fromReturnUrl = extractKnownAngularOrigin(returnUrl);
    if (fromReturnUrl) {
        return fromReturnUrl;
    }
    const fromReferrer = extractKnownAngularOrigin(document.referrer);
    if (fromReferrer) {
        return fromReferrer;
    }
    const { protocol, hostname } = window.location;
    if (hostname.includes("foresighta.co")) {
        return "".concat(protocol, "//app.foresighta.co");
    }
    if (hostname.includes("insightabusiness.com")) {
        return "".concat(protocol, "//app.insightabusiness.com");
    }
    return DEFAULT_LOCAL_ANGULAR_APP_URL;
};
const toAngularAppUrl = (url)=>{
    if ("object" === "undefined" || !url) {
        return url;
    }
    const parsed = new URL(url, window.location.origin);
    parsed.pathname = normalizeAngularPath(parsed.pathname);
    if (isAbsoluteHttpUrl(url) && isKnownAngularOrigin(parsed)) {
        return parsed.toString();
    }
    return "".concat(getAngularAppOrigin(url)).concat(parsed.pathname).concat(parsed.search).concat(parsed.hash);
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
"[project]/app/[locale]/onboarding/onboarding.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "choice-in": "onboarding-module__G1ujJG__choice-in",
  "choiceSelected": "onboarding-module__G1ujJG__choiceSelected",
  "frame": "onboarding-module__G1ujJG__frame",
  "frame-in": "onboarding-module__G1ujJG__frame-in",
  "image-drift": "onboarding-module__G1ujJG__image-drift",
  "scrollArea": "onboarding-module__G1ujJG__scrollArea",
  "shell": "onboarding-module__G1ujJG__shell",
  "step-in": "onboarding-module__G1ujJG__step-in",
  "stepEnter": "onboarding-module__G1ujJG__stepEnter",
  "visualContent": "onboarding-module__G1ujJG__visualContent",
  "visualImage": "onboarding-module__G1ujJG__visualImage",
  "visualPanel": "onboarding-module__G1ujJG__visualPanel",
  "visualShade": "onboarding-module__G1ujJG__visualShade",
});
}),
"[project]/app/[locale]/onboarding/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OnboardingPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowLeft$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconArrowLeft.mjs [app-client] (ecmascript) <export default as IconArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowRight$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconArrowRight.mjs [app-client] (ecmascript) <export default as IconArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCheck.mjs [app-client] (ecmascript) <export default as IconCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconLoader2.mjs [app-client] (ecmascript) <export default as IconLoader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconSearch.mjs [app-client] (ecmascript) <export default as IconSearch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconWorld$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconWorld$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconWorld.mjs [app-client] (ecmascript) <export default as IconWorld>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/index.react-client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$useCountries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/useCountries.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$GlobalProfileProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/GlobalProfileProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authRedirect.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$ANSIGHTAAr$2d2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$images$2f$ANSIGHTAAr$2d2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/public/images/ANSIGHTAAr-.png.mjs { IMAGE => "[project]/public/images/ANSIGHTAAr-.png (static in ecmascript)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$Business$2d$white$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$images$2f$Business$2d$white$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/public/images/Business-white.png.mjs { IMAGE => "[project]/public/images/Business-white.png (static in ecmascript)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/onboarding.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/[locale]/onboarding/onboarding.module.css [app-client] (css module)");
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
;
const promptOrder = [
    'country',
    'community_feed_industries'
];
const designPreviewCountries = [
    [
        'Jordan',
        'الأردن',
        'JO',
        'JOR'
    ],
    [
        'United Arab Emirates',
        'الإمارات العربية المتحدة',
        'AE',
        'ARE'
    ],
    [
        'Saudi Arabia',
        'المملكة العربية السعودية',
        'SA',
        'SAU'
    ],
    [
        'Egypt',
        'مصر',
        'EG',
        'EGY'
    ],
    [
        'United Kingdom',
        'المملكة المتحدة',
        'GB',
        'GBR'
    ],
    [
        'United States',
        'الولايات المتحدة',
        'US',
        'USA'
    ],
    [
        'Germany',
        'ألمانيا',
        'DE',
        'DEU'
    ],
    [
        'Singapore',
        'سنغافورة',
        'SG',
        'SGP'
    ]
].map((param, index)=>{
    let [nameEn, nameAr, iso2, iso3] = param;
    return {
        id: index + 1,
        region_id: 1,
        iso2,
        iso3,
        international_code: '',
        flag: iso2.toLowerCase(),
        name: nameEn,
        names: {
            en: nameEn,
            ar: nameAr
        },
        nationality: '',
        nationalities: {
            en: '',
            ar: ''
        },
        status: 'active'
    };
});
const copyByLocale = {
    en: {
        required: 'Required',
        optional: 'Optional',
        countryTitle: 'Where are you based?',
        countryBody: 'This helps us tailor availability, currency, and regional experiences.',
        countrySearch: 'Search for your country',
        countryEmpty: 'No country matches that search.',
        countriesLoading: 'Loading countries…',
        countryRequired: 'Choose a country to continue.',
        next: 'Next',
        submit: 'Submit',
        saving: 'Saving…',
        industriesTitle: 'Which industries are you interested in?',
        industriesBody: 'Pick up to five industries to personalize the content you see. You can change them anytime.',
        industrySearch: 'Search industries',
        industriesLoading: 'Loading industries…',
        industriesEmpty: 'No industries match that search.',
        selected: 'selected',
        selectionHint: 'Choose between 1 and 5 industries.',
        maxIndustries: 'You can select up to five industries.',
        skip: 'Skip for now',
        retry: 'Try again',
        loading: 'Preparing your experience…',
        errorTitle: 'We could not load your setup',
        unknownError: 'Something went wrong. Please try again.'
    },
    ar: {
        required: 'مطلوب',
        optional: 'اختياري',
        countryTitle: 'أين تقيم؟',
        countryBody: 'يساعدنا ذلك في تخصيص التوفر والعملات والتجارب الإقليمية.',
        countrySearch: 'ابحث عن دولتك',
        countryEmpty: 'لا توجد دولة مطابقة لبحثك.',
        countriesLoading: 'جارٍ تحميل الدول…',
        countryRequired: 'اختر دولة للمتابعة.',
        next: 'التالي',
        submit: 'إرسال',
        saving: 'جارٍ الحفظ…',
        industriesTitle: 'ما المجالات التي تهتم بها؟',
        industriesBody: 'اختر حتى خمسة مجالات لتخصيص المحتوى الذي تراه. يمكنك تغييرها في أي وقت.',
        industrySearch: 'ابحث في المجالات',
        industriesLoading: 'جارٍ تحميل المجالات…',
        industriesEmpty: 'لا توجد مجالات مطابقة لبحثك.',
        selected: 'تم اختيارها',
        selectionHint: 'اختر من مجال واحد إلى خمسة مجالات.',
        maxIndustries: 'يمكنك اختيار خمسة مجالات كحد أقصى.',
        skip: 'تخطي الآن',
        retry: 'حاول مرة أخرى',
        loading: 'نجهّز تجربتك…',
        errorTitle: 'تعذر تحميل الإعداد',
        unknownError: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.'
    }
};
function countryEmoji(iso2) {
    if (!/^[a-z]{2}$/i.test(iso2)) return '🌐';
    return iso2.toUpperCase().split('').map((character)=>String.fromCodePoint(127397 + character.charCodeAt(0))).join('');
}
function collectLeafOptions(node) {
    var _node_children;
    const children = (_node_children = node.children) !== null && _node_children !== void 0 ? _node_children : [];
    if (children.length === 0) return [
        {
            id: node.key,
            label: node.label
        }
    ];
    return children.flatMap(collectLeafOptions);
}
function createIndustryGroups(tree) {
    return tree.map((node)=>({
            id: node.key,
            label: node.label,
            options: collectLeafOptions(node)
        }));
}
function sortVisiblePrompts(prompts) {
    return [
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVisibleSupportedPrompts"])(prompts)
    ].sort((first, second)=>promptOrder.indexOf(first.prompt_key) - promptOrder.indexOf(second.prompt_key));
}
function OnboardingPage() {
    _s();
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const isArabic = locale === 'ar';
    const copy = copyByLocale[isArabic ? 'ar' : 'en'];
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const isDesignPreview = ("TURBOPACK compile-time value", "development") === 'development' && searchParams.get('designPreview') === 'country';
    const { user, roles, refreshProfile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$GlobalProfileProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobalProfile"])();
    const { countries, isLoading: countriesLoading, error: countriesError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$useCountries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCountries"])();
    const availableCountries = isDesignPreview ? designPreviewCountries : countries;
    const [statuses, setStatuses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activePrompt, setActivePrompt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedCountry, setSelectedCountry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [countryQuery, setCountryQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [industryGroups, setIndustryGroups] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [industryQuery, setIndustryQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedIndustryIds, setSelectedIndustryIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [industriesLoading, setIndustriesLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [industriesError, setIndustriesError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pageError, setPageError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [fieldError, setFieldError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isFinishing, setIsFinishing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const redirectStartedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const visiblePrompts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "OnboardingPage.useMemo[visiblePrompts]": ()=>statuses ? sortVisiblePrompts(statuses) : []
    }["OnboardingPage.useMemo[visiblePrompts]"], [
        statuses
    ]);
    const currentStatus = visiblePrompts.find((prompt)=>prompt.prompt_key === activePrompt);
    const primaryActionLabel = visiblePrompts.length > 1 ? copy.next : copy.submit;
    const activeTitle = activePrompt === 'community_feed_industries' ? copy.industriesTitle : copy.countryTitle;
    const activeBody = activePrompt === 'community_feed_industries' ? copy.industriesBody : copy.countryBody;
    const activeRequirement = (currentStatus === null || currentStatus === void 0 ? void 0 : currentStatus.cannot_skip) ? copy.required : copy.optional;
    const navigateAfterOnboarding = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "OnboardingPage.useCallback[navigateAfterOnboarding]": ()=>{
            if (redirectStartedRef.current) return;
            redirectStartedRef.current = true;
            setIsFinishing(true);
            const requestedDestination = searchParams.get('redirect') || searchParams.get('returnUrl');
            var _requestedDestination_trim;
            const unsafeDestination = (_requestedDestination_trim = requestedDestination === null || requestedDestination === void 0 ? void 0 : requestedDestination.trim()) !== null && _requestedDestination_trim !== void 0 ? _requestedDestination_trim : '';
            const blockedDestination = /(^|\/)(auth|callback|onboarding|update-country)(\/|\?|$)/i.test(unsafeDestination);
            const destination = !unsafeDestination || blockedDestination ? null : unsafeDestination;
            if (destination) {
                try {
                    const parsed = new URL(destination, window.location.origin);
                    const allowedHost = parsed.hostname === window.location.hostname || parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1' || parsed.hostname.endsWith('.insightabusiness.com') || parsed.hostname.endsWith('.foresighta.co') || parsed.hostname === 'insightabusiness.com' || parsed.hostname === 'foresighta.co';
                    if (allowedHost && /^https?:$/.test(parsed.protocol)) {
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAngularRouteUrl"])(parsed.toString())) {
                            window.location.replace((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toAngularAppUrl"])(parsed.toString()));
                            return;
                        }
                        if (parsed.origin === window.location.origin) {
                            router.replace("".concat(parsed.pathname).concat(parsed.search).concat(parsed.hash));
                        } else {
                            window.location.replace(parsed.toString());
                        }
                        return;
                    }
                } catch (e) {
                // Continue to the role-based destination.
                }
            }
            if (roles.some({
                "OnboardingPage.useCallback[navigateAfterOnboarding]": (role)=>[
                        'insighter',
                        'company',
                        'company-insighter'
                    ].includes(role)
            }["OnboardingPage.useCallback[navigateAfterOnboarding]"])) {
                window.location.replace("".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAngularAppOrigin"])(), "/app/insighter-dashboard/my-dashboard"));
                return;
            }
            router.replace("/".concat(locale, "/home"));
        }
    }["OnboardingPage.useCallback[navigateAfterOnboarding]"], [
        locale,
        roles,
        router,
        searchParams
    ]);
    const applyStatuses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "OnboardingPage.useCallback[applyStatuses]": (nextStatuses)=>{
            const nextVisible = sortVisiblePrompts(nextStatuses);
            setStatuses(nextStatuses);
            if (nextVisible.length === 0) {
                navigateAfterOnboarding();
                return;
            }
            setActivePrompt({
                "OnboardingPage.useCallback[applyStatuses]": (current)=>{
                    const currentStillVisible = nextVisible.some({
                        "OnboardingPage.useCallback[applyStatuses].currentStillVisible": (prompt)=>prompt.prompt_key === current
                    }["OnboardingPage.useCallback[applyStatuses].currentStillVisible"]);
                    return currentStillVisible ? current : nextVisible[0].prompt_key;
                }
            }["OnboardingPage.useCallback[applyStatuses]"]);
        }
    }["OnboardingPage.useCallback[applyStatuses]"], [
        navigateAfterOnboarding
    ]);
    const loadStatuses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "OnboardingPage.useCallback[loadStatuses]": async ()=>{
            const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
            if (!token) {
                const returnUrl = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : window.location.href;
                window.location.replace("".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAngularAppOrigin"])(), "/auth/login?returnUrl=").concat(encodeURIComponent(returnUrl)));
                return;
            }
            setPageError(null);
            try {
                const nextStatuses = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchOnboardingPromptStatuses"])({
                    token,
                    locale
                });
                applyStatuses(nextStatuses);
            } catch (error) {
                setPageError(error instanceof Error ? error.message : copy.unknownError);
            }
        }
    }["OnboardingPage.useCallback[loadStatuses]"], [
        applyStatuses,
        copy.unknownError,
        locale
    ]);
    const loadIndustries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "OnboardingPage.useCallback[loadIndustries]": async ()=>{
            setIndustriesLoading(true);
            setIndustriesError(null);
            try {
                const tree = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchOnboardingIndustryTree"])(locale);
                setIndustryGroups(createIndustryGroups(tree));
            } catch (error) {
                setIndustriesError(error instanceof Error ? error.message : copy.unknownError);
            } finally{
                setIndustriesLoading(false);
            }
        }
    }["OnboardingPage.useCallback[loadIndustries]"], [
        copy.unknownError,
        locale
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OnboardingPage.useEffect": ()=>{
            if (isDesignPreview) {
                applyStatuses([
                    {
                        prompt_key: 'country',
                        status: 'pending',
                        cannot_skip: true,
                        should_show: true,
                        has_record: false,
                        completed_at: null,
                        skipped_at: null,
                        last_shown_at: null,
                        show_count: 0,
                        metadata: null
                    }
                ]);
                return;
            }
            void loadStatuses();
            void loadIndustries();
        }
    }["OnboardingPage.useEffect"], [
        applyStatuses,
        isDesignPreview,
        loadIndustries,
        loadStatuses
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OnboardingPage.useEffect": ()=>{
            if (!selectedCountry && (user === null || user === void 0 ? void 0 : user.country_id) && availableCountries.length > 0) {
                var _availableCountries_find;
                setSelectedCountry((_availableCountries_find = availableCountries.find({
                    "OnboardingPage.useEffect": (country)=>country.id === user.country_id
                }["OnboardingPage.useEffect"])) !== null && _availableCountries_find !== void 0 ? _availableCountries_find : null);
            }
        }
    }["OnboardingPage.useEffect"], [
        availableCountries,
        selectedCountry,
        user === null || user === void 0 ? void 0 : user.country_id
    ]);
    const filteredCountries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "OnboardingPage.useMemo[filteredCountries]": ()=>{
            const query = countryQuery.trim().toLocaleLowerCase(locale);
            return availableCountries.filter({
                "OnboardingPage.useMemo[filteredCountries]": (country)=>{
                    var _country_names, _country_names1;
                    if (!query) return true;
                    return [
                        (_country_names = country.names) === null || _country_names === void 0 ? void 0 : _country_names.en,
                        (_country_names1 = country.names) === null || _country_names1 === void 0 ? void 0 : _country_names1.ar,
                        country.iso2,
                        country.iso3
                    ].filter(Boolean).some({
                        "OnboardingPage.useMemo[filteredCountries]": (value)=>String(value).toLocaleLowerCase(locale).includes(query)
                    }["OnboardingPage.useMemo[filteredCountries]"]);
                }
            }["OnboardingPage.useMemo[filteredCountries]"]).sort({
                "OnboardingPage.useMemo[filteredCountries]": (first, second)=>{
                    var _first_names, _second_names;
                    return (((_first_names = first.names) === null || _first_names === void 0 ? void 0 : _first_names[isArabic ? 'ar' : 'en']) || first.name).localeCompare(((_second_names = second.names) === null || _second_names === void 0 ? void 0 : _second_names[isArabic ? 'ar' : 'en']) || second.name, locale);
                }
            }["OnboardingPage.useMemo[filteredCountries]"]);
        }
    }["OnboardingPage.useMemo[filteredCountries]"], [
        availableCountries,
        countryQuery,
        isArabic,
        locale
    ]);
    const filteredIndustryGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "OnboardingPage.useMemo[filteredIndustryGroups]": ()=>{
            const query = industryQuery.trim().toLocaleLowerCase(locale);
            if (!query) return industryGroups;
            return industryGroups.map({
                "OnboardingPage.useMemo[filteredIndustryGroups]": (group)=>({
                        ...group,
                        options: group.options.filter({
                            "OnboardingPage.useMemo[filteredIndustryGroups]": (option)=>option.label.toLocaleLowerCase(locale).includes(query) || group.label.toLocaleLowerCase(locale).includes(query)
                        }["OnboardingPage.useMemo[filteredIndustryGroups]"])
                    })
            }["OnboardingPage.useMemo[filteredIndustryGroups]"]).filter({
                "OnboardingPage.useMemo[filteredIndustryGroups]": (group)=>group.options.length > 0
            }["OnboardingPage.useMemo[filteredIndustryGroups]"]);
        }
    }["OnboardingPage.useMemo[filteredIndustryGroups]"], [
        industryGroups,
        industryQuery,
        locale
    ]);
    const handleCountrySubmit = async ()=>{
        if (!selectedCountry) {
            setFieldError(copy.countryRequired);
            return;
        }
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
        if (!token) return;
        setIsSubmitting(true);
        setFieldError(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateOnboardingCountry"])(selectedCountry.id, {
                token,
                locale
            });
            await refreshProfile(true);
            applyStatuses(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchOnboardingPromptStatuses"])({
                token,
                locale
            }));
        } catch (error) {
            setFieldError(error instanceof Error ? error.message : copy.unknownError);
        } finally{
            setIsSubmitting(false);
        }
    };
    const toggleIndustry = (industryId)=>{
        setFieldError(null);
        setSelectedIndustryIds((current)=>{
            if (current.includes(industryId)) return current.filter((id)=>id !== industryId);
            if (current.length >= 5) {
                setFieldError(copy.maxIndustries);
                return current;
            }
            return [
                ...current,
                industryId
            ];
        });
    };
    const handleIndustriesSubmit = async ()=>{
        if (selectedIndustryIds.length === 0) {
            setFieldError(copy.selectionHint);
            return;
        }
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
        if (!token) return;
        setIsSubmitting(true);
        setFieldError(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateFeedIndustryPreferences"])(selectedIndustryIds, {
                token,
                locale
            });
            applyStatuses(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchOnboardingPromptStatuses"])({
                token,
                locale
            }));
        } catch (error) {
            setFieldError(error instanceof Error ? error.message : copy.unknownError);
        } finally{
            setIsSubmitting(false);
        }
    };
    const handleSkip = async ()=>{
        if (!activePrompt || (currentStatus === null || currentStatus === void 0 ? void 0 : currentStatus.cannot_skip)) return;
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
        if (!token) return;
        setIsSubmitting(true);
        setFieldError(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["skipOnboardingPrompt"])(activePrompt, {
                token,
                locale
            });
            applyStatuses(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchOnboardingPromptStatuses"])({
                token,
                locale
            }));
        } catch (error) {
            setFieldError(error instanceof Error ? error.message : copy.unknownError);
        } finally{
            setIsSubmitting(false);
        }
    };
    const isInitialLoading = statuses === null && !pageError;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].shell, " flex min-h-screen items-center justify-center p-3 sm:p-5"),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].frame, " grid w-full overflow-hidden bg-white"),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                    className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].visualPanel, " relative overflow-hidden"),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: "/images/onboarding/insighta-onboarding-background.png",
                            alt: "",
                            fill: true,
                            sizes: "(max-width: 720px) 100vw, 400px",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].visualImage,
                            priority: true
                        }, void 0, false, {
                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                            lineNumber: 430,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].visualShade
                        }, void 0, false, {
                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                            lineNumber: 438,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: isArabic ? __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$ANSIGHTAAr$2d2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$images$2f$ANSIGHTAAr$2d2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"] : __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$Business$2d$white$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$images$2f$Business$2d$white$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                            width: 112,
                            height: 38,
                            alt: "Insighta",
                            className: "absolute start-5 top-5 z-10 h-auto w-[96px] sm:start-6 sm:top-6 sm:w-[108px]",
                            priority: true
                        }, void 0, false, {
                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                            lineNumber: 439,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].visualContent, " absolute z-10 flex flex-col text-white"),
                            children: !isInitialLoading && !isFinishing && !pageError && activePrompt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].stepEnter,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-white/80 backdrop-blur-sm",
                                        children: activeRequirement
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                        lineNumber: 450,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "mt-4 max-w-[330px] text-[29px] font-semibold leading-[1.06] tracking-[-0.04em] sm:text-[35px]",
                                        children: activeTitle
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                        lineNumber: 453,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-4 max-w-[305px] text-[11px] leading-[1.7] text-white/72 sm:text-xs",
                                        children: activeBody
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                        lineNumber: 456,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, activePrompt, true, {
                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                lineNumber: 449,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                            lineNumber: 447,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                    lineNumber: 429,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "flex min-h-0 flex-col bg-white",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex min-h-0 flex-1 flex-col px-5 py-5 sm:px-7 sm:py-7",
                        children: isInitialLoading || isFinishing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid flex-1 place-items-center",
                            role: "status",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center text-[#687784]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__["IconLoader2"], {
                                        className: "mx-auto animate-spin text-[#2979b8]",
                                        size: 22
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                        lineNumber: 469,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-xs",
                                        children: copy.loading
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                        lineNumber: 470,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                lineNumber: 468,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                            lineNumber: 467,
                            columnNumber: 13
                        }, this) : pageError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid flex-1 place-items-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-xs text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconWorld$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconWorld$3e$__["IconWorld"], {
                                        className: "mx-auto text-[#a14b38]",
                                        size: 25
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                        lineNumber: 476,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "mt-3 text-base font-semibold text-[#1d2b36]",
                                        children: copy.errorTitle
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                        lineNumber: 477,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-xs leading-5 text-[#687784]",
                                        children: pageError
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                        lineNumber: 478,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>void loadStatuses(),
                                        className: "mt-5 rounded-lg bg-[#153b5b] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0f304b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2979b8]",
                                        children: copy.retry
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                        lineNumber: 479,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                lineNumber: 475,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                            lineNumber: 474,
                            columnNumber: 13
                        }, this) : activePrompt === 'country' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].stepEnter, " flex min-h-0 flex-1 flex-col"),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex min-h-0 flex-1 flex-col",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "onboarding-country-search",
                                            className: "sr-only",
                                            children: copy.countrySearch
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 491,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative shrink-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__["IconSearch"], {
                                                    className: "pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-[#89959f]",
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 495,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "onboarding-country-search",
                                                    value: countryQuery,
                                                    onChange: (event)=>setCountryQuery(event.currentTarget.value),
                                                    placeholder: copy.countrySearch,
                                                    className: "h-10 w-full rounded-lg border border-[#d9dee3] bg-white ps-9 pe-3 text-xs text-[#25343f] outline-none transition placeholder:text-[#929ca5] focus:border-[#69a2ce] focus:ring-2 focus:ring-[#e4f0f8]"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 499,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 494,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].scrollArea, " mt-2 min-h-0 flex-1 overflow-y-auto rounded-lg border border-[#e1e5e9] p-1.5"),
                                            role: "listbox",
                                            "aria-label": copy.countrySearch,
                                            children: !isDesignPreview && countriesLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "py-8 text-center text-xs text-[#687784]",
                                                children: copy.countriesLoading
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                lineNumber: 514,
                                                columnNumber: 21
                                            }, this) : !isDesignPreview && countriesError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "py-8 text-center text-xs text-[#a14b38]",
                                                children: copy.unknownError
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                lineNumber: 516,
                                                columnNumber: 21
                                            }, this) : filteredCountries.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "py-8 text-center text-xs text-[#687784]",
                                                children: copy.countryEmpty
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                lineNumber: 518,
                                                columnNumber: 21
                                            }, this) : filteredCountries.map((country)=>{
                                                var _country_names;
                                                const isSelected = (selectedCountry === null || selectedCountry === void 0 ? void 0 : selectedCountry.id) === country.id;
                                                const label = ((_country_names = country.names) === null || _country_names === void 0 ? void 0 : _country_names[isArabic ? 'ar' : 'en']) || country.name;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    role: "option",
                                                    "aria-selected": isSelected,
                                                    onClick: ()=>{
                                                        setSelectedCountry(country);
                                                        setFieldError(null);
                                                    },
                                                    className: "flex min-h-9 w-full items-center gap-2.5 rounded-md px-2.5 text-start text-xs transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#69a2ce] ".concat(isSelected ? "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].choiceSelected, " bg-[#edf5fa] font-semibold text-[#185f94]") : 'text-[#344550] hover:bg-[#f5f7f8]'),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-base",
                                                            "aria-hidden": "true",
                                                            children: countryEmoji(country.iso2)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                            lineNumber: 539,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "min-w-0 flex-1 truncate",
                                                            children: label
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                            lineNumber: 540,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[9px] font-medium uppercase text-[#98a2aa]",
                                                            children: country.iso2
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                            lineNumber: 541,
                                                            columnNumber: 27
                                                        }, this),
                                                        isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                                                            size: 14,
                                                            stroke: 2.3
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                            lineNumber: 542,
                                                            columnNumber: 42
                                                        }, this)
                                                    ]
                                                }, country.id, true, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 524,
                                                    columnNumber: 25
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 508,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                    lineNumber: 490,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 flex shrink-0 items-center justify-between gap-4 border-t border-[#e7eaed] pt-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "min-h-4 text-[11px] text-[#a14b38]",
                                            role: "alert",
                                            children: fieldError
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 551,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>void handleCountrySubmit(),
                                            disabled: isSubmitting,
                                            className: "inline-flex min-w-[112px] items-center justify-center gap-2 rounded-lg bg-[#153b5b] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#0f304b] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2979b8]",
                                            children: [
                                                isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__["IconLoader2"], {
                                                    className: "animate-spin",
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 558,
                                                    columnNumber: 35
                                                }, this) : null,
                                                isSubmitting ? copy.saving : primaryActionLabel,
                                                !isSubmitting && (isArabic ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowLeft$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowLeft$3e$__["IconArrowLeft"], {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 560,
                                                    columnNumber: 49
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowRight$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowRight$3e$__["IconArrowRight"], {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 560,
                                                    columnNumber: 79
                                                }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 552,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                    lineNumber: 550,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, "country", true, {
                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                            lineNumber: 489,
                            columnNumber: 13
                        }, this) : activePrompt === 'community_feed_industries' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].stepEnter, " flex min-h-0 flex-1 flex-col"),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex min-h-0 flex-1 flex-col",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex shrink-0 items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__["IconSearch"], {
                                                            className: "pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-[#89959f]",
                                                            size: 16
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                            lineNumber: 569,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            value: industryQuery,
                                                            onChange: (event)=>setIndustryQuery(event.currentTarget.value),
                                                            placeholder: copy.industrySearch,
                                                            "aria-label": copy.industrySearch,
                                                            className: "h-10 w-full rounded-lg border border-[#d9dee3] bg-white ps-9 pe-3 text-xs text-[#25343f] outline-none transition placeholder:text-[#929ca5] focus:border-[#69a2ce] focus:ring-2 focus:ring-[#e4f0f8]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                            lineNumber: 573,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 568,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "whitespace-nowrap text-[11px] font-medium text-[#5f6d78]",
                                                    children: [
                                                        selectedIndustryIds.length,
                                                        "/5 ",
                                                        copy.selected
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 581,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 567,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].scrollArea, " mt-3 min-h-0 flex-1 overflow-y-auto pe-1"),
                                            children: industriesLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "py-8 text-center text-xs text-[#687784]",
                                                children: copy.industriesLoading
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                lineNumber: 588,
                                                columnNumber: 21
                                            }, this) : industriesError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "py-8 text-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-[#a14b38]",
                                                        children: industriesError
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                        lineNumber: 591,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>void loadIndustries(),
                                                        className: "mt-2 text-[11px] font-semibold text-[#2979b8]",
                                                        children: copy.retry
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                        lineNumber: 592,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                lineNumber: 590,
                                                columnNumber: 21
                                            }, this) : filteredIndustryGroups.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "py-8 text-center text-xs text-[#687784]",
                                                children: copy.industriesEmpty
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                lineNumber: 597,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4 pb-1",
                                                children: filteredIndustryGroups.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                                        "aria-labelledby": "industry-".concat(group.id),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                id: "industry-".concat(group.id),
                                                                className: "mb-2 text-[11px] font-semibold text-[#3c78a5]",
                                                                children: group.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                                lineNumber: 602,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-wrap gap-1.5",
                                                                children: group.options.map((industry)=>{
                                                                    const selected = selectedIndustryIds.includes(industry.id);
                                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        "aria-pressed": selected,
                                                                        onClick: ()=>toggleIndustry(industry.id),
                                                                        className: "inline-flex min-h-8 items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[11px] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#2979b8] ".concat(selected ? "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].choiceSelected, " border-[#69a2ce] bg-[#edf5fa] font-semibold text-[#185f94]") : 'border-[#dfe4e8] bg-white text-[#40515c] hover:border-[#b9c8d3] hover:bg-[#f7f8f9]'),
                                                                        children: [
                                                                            selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                                                                                size: 12,
                                                                                stroke: 2.4
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                                                lineNumber: 620,
                                                                                columnNumber: 48
                                                                            }, this),
                                                                            industry.label
                                                                        ]
                                                                    }, industry.id, true, {
                                                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                                        lineNumber: 609,
                                                                        columnNumber: 33
                                                                    }, this);
                                                                })
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                                lineNumber: 605,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, group.id, true, {
                                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                        lineNumber: 601,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                lineNumber: 599,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 586,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                    lineNumber: 566,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 flex shrink-0 items-center justify-between gap-3 border-t border-[#e7eaed] pt-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>void handleSkip(),
                                                    disabled: isSubmitting || (currentStatus === null || currentStatus === void 0 ? void 0 : currentStatus.cannot_skip),
                                                    className: "rounded-md px-2 py-2 text-[11px] font-medium text-[#667580] hover:bg-[#f1f3f5] hover:text-[#263b49] disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#69a2ce]",
                                                    children: copy.skip
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 635,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-0.5 min-h-4 truncate text-[10px] text-[#a14b38]",
                                                    role: "alert",
                                                    children: fieldError
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 643,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 634,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>void handleIndustriesSubmit(),
                                            disabled: isSubmitting,
                                            className: "inline-flex min-w-[148px] items-center justify-center gap-2 rounded-lg bg-[#153b5b] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#0f304b] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2979b8]",
                                            children: [
                                                isSubmitting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__["IconLoader2"], {
                                                    className: "animate-spin",
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 651,
                                                    columnNumber: 36
                                                }, this),
                                                isSubmitting ? copy.saving : primaryActionLabel,
                                                !isSubmitting && (isArabic ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowLeft$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowLeft$3e$__["IconArrowLeft"], {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 653,
                                                    columnNumber: 49
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowRight$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowRight$3e$__["IconArrowRight"], {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 653,
                                                    columnNumber: 79
                                                }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 645,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                    lineNumber: 633,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, "industries", true, {
                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                            lineNumber: 565,
                            columnNumber: 13
                        }, this) : null
                    }, void 0, false, {
                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                        lineNumber: 465,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                    lineNumber: 464,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/[locale]/onboarding/page.tsx",
            lineNumber: 428,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/[locale]/onboarding/page.tsx",
        lineNumber: 427,
        columnNumber: 5
    }, this);
}
_s(OnboardingPage, "PS93b5MFYEH/LCoDkMOaXrw7SWg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$GlobalProfileProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobalProfile"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$useCountries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCountries"]
    ];
});
_c = OnboardingPage;
var _c;
__turbopack_context__.k.register(_c, "OnboardingPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_e76cb05a._.js.map