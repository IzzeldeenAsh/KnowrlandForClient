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
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
;
// Env-driven, with the production dashboard as a fail-safe fallback. The old
// `process.env.X || \`${process.env.X}\`` form fell back to the string
// "undefined" whenever the env var was missing.
const DEFAULT_LOCAL_ANGULAR_APP_URL = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dashboardUrl"];
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
    "INSIGHTER_PROMPT_ROLES",
    ()=>INSIGHTER_PROMPT_ROLES,
    "INSIGHTER_SETUP_QUERY_KEY",
    ()=>INSIGHTER_SETUP_QUERY_KEY,
    "SUPPORTED_INSIGHTER_PROMPTS",
    ()=>SUPPORTED_INSIGHTER_PROMPTS,
    "SUPPORTED_ONBOARDING_PROMPTS",
    ()=>SUPPORTED_ONBOARDING_PROMPTS,
    "fetchInsighterPromptStatuses",
    ()=>fetchInsighterPromptStatuses,
    "fetchOnboardingIndustryTree",
    ()=>fetchOnboardingIndustryTree,
    "fetchOnboardingPromptStatuses",
    ()=>fetchOnboardingPromptStatuses,
    "getVisibleInsighterPrompts",
    ()=>getVisibleInsighterPrompts,
    "getVisibleSupportedPrompts",
    ()=>getVisibleSupportedPrompts,
    "hasInsighterPromptRole",
    ()=>hasInsighterPromptRole,
    "isSupportedInsighterPrompt",
    ()=>isSupportedInsighterPrompt,
    "isSupportedOnboardingPrompt",
    ()=>isSupportedOnboardingPrompt,
    "skipInsighterPrompt",
    ()=>skipInsighterPrompt,
    "skipOnboardingPrompt",
    ()=>skipOnboardingPrompt,
    "updateFeedIndustryPreferences",
    ()=>updateFeedIndustryPreferences,
    "updateOnboardingCountry",
    ()=>updateOnboardingCountry,
    "updateWhatsappNumber",
    ()=>updateWhatsappNumber,
    "withInsighterSetupMarker",
    ()=>withInsighterSetupMarker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
;
const SUPPORTED_ONBOARDING_PROMPTS = [
    'country',
    'community_feed_industries',
    'whatsapp'
];
const SUPPORTED_INSIGHTER_PROMPTS = [
    'session_availability',
    'project_settings'
];
const INSIGHTER_SETUP_QUERY_KEY = 'insighterSetup';
function withInsighterSetupMarker(url) {
    try {
        const baseUrl = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : window.location.origin;
        const parsed = new URL(url, baseUrl);
        parsed.searchParams.set(INSIGHTER_SETUP_QUERY_KEY, '1');
        return /^https?:\/\//i.test(url) ? parsed.toString() : "".concat(parsed.pathname).concat(parsed.search).concat(parsed.hash);
    } catch (e) {
        return url;
    }
}
const INSIGHTER_PROMPT_ROLES = [
    'insighter',
    'company',
    'company-insighter'
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
function isSupportedInsighterPrompt(promptKey) {
    return SUPPORTED_INSIGHTER_PROMPTS.includes(promptKey);
}
function getVisibleInsighterPrompts(prompts) {
    return prompts.filter((prompt)=>prompt.should_show && isSupportedInsighterPrompt(prompt.prompt_key));
}
function hasInsighterPromptRole(roles) {
    return (roles !== null && roles !== void 0 ? roles : []).some((role)=>INSIGHTER_PROMPT_ROLES.includes(role));
}
async function fetchInsighterPromptStatuses(options) {
    try {
        const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/insighter/onboarding/prompts/status'), {
            method: 'POST',
            headers: onboardingHeaders(options),
            cache: 'no-store'
        });
        if (!response.ok) return [];
        const payload = await response.json();
        return Array.isArray(payload === null || payload === void 0 ? void 0 : payload.data) ? payload.data : [];
    } catch (e) {
        return [];
    }
}
async function skipInsighterPrompt(promptKey, options) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/insighter/onboarding/prompts/skip'), {
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
async function updateWhatsappNumber(payload, options) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/account/profile/notification/channel'), {
        method: 'POST',
        headers: onboardingHeaders(options),
        body: JSON.stringify({
            whatsapp_status: 'active',
            whatsapp_country_code: payload.whatsappCountryCode,
            whatsapp_number: payload.whatsappNumber
        })
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, 'Unable to save your WhatsApp number.'));
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
  "whatsappShade": "onboarding-module__G1ujJG__whatsappShade",
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBrandWhatsapp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBrandWhatsapp$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBrandWhatsapp.mjs [app-client] (ecmascript) <export default as IconBrandWhatsapp>");
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
    'community_feed_industries',
    'whatsapp'
];
function onlyDigits(value) {
    return (value !== null && value !== void 0 ? value : '').replace(/\D/g, '');
}
// Same per-country digit grouping used by the phone mask in
// /app/insighter-dashboard/account-settings/notification-settings.
const PHONE_MASKS = {
    default: '000-000-0000',
    '1': '000-000-0000',
    '44': '0000-000000',
    '966': '0-0000-0000',
    '971': '0-0000-0000',
    '20': '00-0000-0000',
    '962': '0-0000-0000',
    '961': '0-0000-0000',
    '33': '00-00-00-00-00',
    '49': '0000-0000000',
    '39': '000-0000000'
};
function formatWithMask(digits, mask) {
    let formatted = '';
    let digitIndex = 0;
    for(let i = 0; i < mask.length && digitIndex < digits.length; i++){
        if (mask[i] === '0') {
            formatted += digits[digitIndex];
            digitIndex++;
        } else {
            formatted += mask[i];
        }
    }
    return formatted;
}
const designPreviewCountries = [
    [
        'Jordan',
        'الأردن',
        'JO',
        'JOR',
        '962'
    ],
    [
        'United Arab Emirates',
        'الإمارات العربية المتحدة',
        'AE',
        'ARE',
        '971'
    ],
    [
        'Saudi Arabia',
        'المملكة العربية السعودية',
        'SA',
        'SAU',
        '966'
    ],
    [
        'Egypt',
        'مصر',
        'EG',
        'EGY',
        '20'
    ],
    [
        'United Kingdom',
        'المملكة المتحدة',
        'GB',
        'GBR',
        '44'
    ],
    [
        'United States',
        'الولايات المتحدة',
        'US',
        'USA',
        '1'
    ],
    [
        'Germany',
        'ألمانيا',
        'DE',
        'DEU',
        '49'
    ],
    [
        'Singapore',
        'سنغافورة',
        'SG',
        'SGP',
        '65'
    ]
].map((param, index)=>{
    let [nameEn, nameAr, iso2, iso3, internationalCode] = param;
    return {
        id: index + 1,
        region_id: 1,
        iso2,
        iso3,
        international_code: internationalCode,
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
        unknownError: 'Something went wrong. Please try again.',
        whatsappTitle: 'Stay connected on WhatsApp',
        whatsappBody: 'Add your WhatsApp number to get important updates, alerts, and support right where you already chat.',
        whatsappBenefits: [
            'Receive related insights tailored to your interests.',
            'Instant session booking confirmations and details.',
            'Session reminders so you never miss a meeting.',
            'Service request updates with clear status tracking.',
            'Other important updates based on your activity.'
        ],
        whatsappNumberLabel: 'WhatsApp number',
        whatsappNumberPlaceholder: 'Phone number',
        whatsappCountrySearch: 'Search country code',
        whatsappCountryEmpty: 'No country matches that search.',
        whatsappNumberRequired: 'Enter your WhatsApp number to continue.',
        whatsappNumberInvalid: 'Enter a valid WhatsApp number (6–14 digits).',
        whatsappCodeRequired: 'Choose a country code.',
        whatsappSave: 'Save number'
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
        unknownError: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
        whatsappTitle: 'ابقَ على تواصل عبر واتساب',
        whatsappBody: 'أضِف رقم واتساب الخاص بك لتصلك التحديثات والتنبيهات المهمة والدعم في المكان الذي تتحدث فيه بالفعل.',
        whatsappBenefits: [
            'تلقّي رؤى ذات صلة مخصّصة لاهتماماتك.',
            'تأكيدات فورية لحجز الجلسات مع كل التفاصيل.',
            'تذكيرات بالجلسات حتى لا يفوتك أي اجتماع.',
            'تحديثات لطلبات الخدمة مع تتبّع واضح للحالة.',
            'تحديثات مهمة أخرى بحسب نشاطك.'
        ],
        whatsappNumberLabel: 'رقم واتساب',
        whatsappNumberPlaceholder: 'رقم الهاتف',
        whatsappCountrySearch: 'ابحث عن رمز الدولة',
        whatsappCountryEmpty: 'لا توجد دولة مطابقة لبحثك.',
        whatsappNumberRequired: 'أدخل رقم واتساب للمتابعة.',
        whatsappNumberInvalid: 'أدخل رقم واتساب صالحًا (من ٦ إلى ١٤ رقمًا).',
        whatsappCodeRequired: 'اختر رمز الدولة.',
        whatsappSave: 'حفظ الرقم'
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
    const designPreviewKey = ("TURBOPACK compile-time truthy", 1) ? searchParams.get('designPreview') : "TURBOPACK unreachable";
    const isDesignPreview = designPreviewKey === 'country' || designPreviewKey === 'whatsapp';
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
    const [whatsappCountry, setWhatsappCountry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [whatsappCountryQuery, setWhatsappCountryQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [whatsappNumber, setWhatsappNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [industriesLoading, setIndustriesLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [industriesError, setIndustriesError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pageError, setPageError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [fieldError, setFieldError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isFinishing, setIsFinishing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const redirectStartedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const insighterSetupCheckedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const visiblePrompts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "OnboardingPage.useMemo[visiblePrompts]": ()=>statuses ? sortVisiblePrompts(statuses) : []
    }["OnboardingPage.useMemo[visiblePrompts]"], [
        statuses
    ]);
    const currentStatus = visiblePrompts.find((prompt)=>prompt.prompt_key === activePrompt);
    const primaryActionLabel = visiblePrompts.length > 1 ? copy.next : copy.submit;
    const activeTitle = activePrompt === 'community_feed_industries' ? copy.industriesTitle : activePrompt === 'whatsapp' ? copy.whatsappTitle : copy.countryTitle;
    const activeBody = activePrompt === 'community_feed_industries' ? copy.industriesBody : activePrompt === 'whatsapp' ? copy.whatsappBody : copy.countryBody;
    const activeRequirement = (currentStatus === null || currentStatus === void 0 ? void 0 : currentStatus.cannot_skip) ? copy.required : copy.optional;
    const whatsappDialCode = onlyDigits(whatsappCountry === null || whatsappCountry === void 0 ? void 0 : whatsappCountry.international_code);
    const whatsappPhoneMask = PHONE_MASKS[whatsappDialCode] || PHONE_MASKS.default;
    const whatsappMaskedNumber = formatWithMask(whatsappNumber, whatsappPhoneMask);
    /**
   * The Insighter setup covers are shown at the destination, not here — this
   * only decides whether the destination URL should carry the marker that asks
   * for them. Checked at most once per visit.
   */ const resolveInsighterSetupMarker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "OnboardingPage.useCallback[resolveInsighterSetupMarker]": async ()=>{
            if (insighterSetupCheckedRef.current) return false;
            insighterSetupCheckedRef.current = true;
            const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
            if (!token || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasInsighterPromptRole"])(roles)) return false;
            const prompts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchInsighterPromptStatuses"])({
                token,
                locale
            });
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVisibleInsighterPrompts"])(prompts).length > 0;
        }
    }["OnboardingPage.useCallback[resolveInsighterSetupMarker]"], [
        locale,
        roles
    ]);
    const navigateAfterOnboarding = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "OnboardingPage.useCallback[navigateAfterOnboarding]": ()=>{
            if (redirectStartedRef.current) return;
            redirectStartedRef.current = true;
            setIsFinishing(true);
            void ({
                "OnboardingPage.useCallback[navigateAfterOnboarding]": async ()=>{
                    // Decided before the redirect so the marker can ride along on the
                    // destination URL — the covers are rendered wherever the user lands, not
                    // stacked on top of this page.
                    const wantsSetupCovers = await resolveInsighterSetupMarker();
                    /** Adds the marker to whichever URL we end up sending the user to. */ const withMarker = {
                        "OnboardingPage.useCallback[navigateAfterOnboarding].withMarker": (url)=>{
                            return wantsSetupCovers ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withInsighterSetupMarker"])(url) : url;
                        }
                    }["OnboardingPage.useCallback[navigateAfterOnboarding].withMarker"];
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
                                    window.location.replace(withMarker((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toAngularAppUrl"])(parsed.toString())));
                                    return;
                                }
                                if (parsed.origin === window.location.origin) {
                                    router.replace(withMarker("".concat(parsed.pathname).concat(parsed.search).concat(parsed.hash)));
                                } else {
                                    window.location.replace(withMarker(parsed.toString()));
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
                        window.location.replace(withMarker("".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAngularAppOrigin"])(), "/app/insighter-dashboard/my-dashboard")));
                        return;
                    }
                    router.replace(withMarker("/".concat(locale)));
                }
            })["OnboardingPage.useCallback[navigateAfterOnboarding]"]();
        }
    }["OnboardingPage.useCallback[navigateAfterOnboarding]"], [
        locale,
        resolveInsighterSetupMarker,
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
                        prompt_key: designPreviewKey === 'whatsapp' ? 'whatsapp' : 'country',
                        status: 'pending',
                        cannot_skip: designPreviewKey !== 'whatsapp',
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
        designPreviewKey,
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OnboardingPage.useEffect": ()=>{
            if (whatsappCountry || availableCountries.length === 0) return;
            const fromProfile = (user === null || user === void 0 ? void 0 : user.country_id) ? availableCountries.find({
                "OnboardingPage.useEffect": (country)=>country.id === user.country_id
            }["OnboardingPage.useEffect"]) : undefined;
            setWhatsappCountry(fromProfile !== null && fromProfile !== void 0 ? fromProfile : isDesignPreview ? availableCountries[0] : null);
        }
    }["OnboardingPage.useEffect"], [
        availableCountries,
        isDesignPreview,
        user === null || user === void 0 ? void 0 : user.country_id,
        whatsappCountry
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
    const filteredWhatsappCountries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "OnboardingPage.useMemo[filteredWhatsappCountries]": ()=>{
            const query = whatsappCountryQuery.trim().toLocaleLowerCase(locale);
            return availableCountries.filter({
                "OnboardingPage.useMemo[filteredWhatsappCountries]": (country)=>{
                    var _country_names, _country_names1;
                    if (!query) return true;
                    return [
                        (_country_names = country.names) === null || _country_names === void 0 ? void 0 : _country_names.en,
                        (_country_names1 = country.names) === null || _country_names1 === void 0 ? void 0 : _country_names1.ar,
                        country.iso2,
                        country.iso3,
                        country.international_code
                    ].filter(Boolean).some({
                        "OnboardingPage.useMemo[filteredWhatsappCountries]": (value)=>String(value).toLocaleLowerCase(locale).includes(query)
                    }["OnboardingPage.useMemo[filteredWhatsappCountries]"]);
                }
            }["OnboardingPage.useMemo[filteredWhatsappCountries]"]).sort({
                "OnboardingPage.useMemo[filteredWhatsappCountries]": (first, second)=>{
                    var _first_names, _second_names;
                    return (((_first_names = first.names) === null || _first_names === void 0 ? void 0 : _first_names[isArabic ? 'ar' : 'en']) || first.name).localeCompare(((_second_names = second.names) === null || _second_names === void 0 ? void 0 : _second_names[isArabic ? 'ar' : 'en']) || second.name, locale);
                }
            }["OnboardingPage.useMemo[filteredWhatsappCountries]"]);
        }
    }["OnboardingPage.useMemo[filteredWhatsappCountries]"], [
        availableCountries,
        isArabic,
        locale,
        whatsappCountryQuery
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
    const handleWhatsappSubmit = async ()=>{
        const dialCode = onlyDigits(whatsappCountry === null || whatsappCountry === void 0 ? void 0 : whatsappCountry.international_code);
        const number = onlyDigits(whatsappNumber);
        if (!dialCode) {
            setFieldError(copy.whatsappCodeRequired);
            return;
        }
        if (!number) {
            setFieldError(copy.whatsappNumberRequired);
            return;
        }
        if (!/^[0-9]{6,14}$/.test(number)) {
            setFieldError(copy.whatsappNumberInvalid);
            return;
        }
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
        if (!token) return;
        setIsSubmitting(true);
        setFieldError(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateWhatsappNumber"])({
                whatsappCountryCode: dialCode,
                whatsappNumber: number
            }, {
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
                            lineNumber: 610,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].visualShade
                        }, void 0, false, {
                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                            lineNumber: 618,
                            columnNumber: 11
                        }, this),
                        activePrompt === 'whatsapp' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].whatsappShade
                        }, void 0, false, {
                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                            lineNumber: 619,
                            columnNumber: 43
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
                            lineNumber: 620,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].visualContent, " absolute z-10 flex flex-col text-white"),
                            children: !isInitialLoading && !isFinishing && !pageError && activePrompt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].stepEnter,
                                children: [
                                    activePrompt === 'whatsapp' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-lg shadow-[#0b3b28]/40 ring-1 ring-white/25",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBrandWhatsapp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBrandWhatsapp$3e$__["IconBrandWhatsapp"], {
                                            size: 28,
                                            stroke: 2
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 633,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                        lineNumber: 632,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-white/80 backdrop-blur-sm",
                                        children: activeRequirement
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                        lineNumber: 636,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "mt-4 max-w-[330px] text-[29px] font-semibold leading-[1.06] tracking-[-0.04em] sm:text-[35px]",
                                        children: activeTitle
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                        lineNumber: 639,
                                        columnNumber: 17
                                    }, this),
                                    activePrompt !== 'whatsapp' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-4 max-w-[305px] text-[11px] leading-[1.7] text-white/72 sm:text-xs",
                                        children: activeBody
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                        lineNumber: 643,
                                        columnNumber: 19
                                    }, this),
                                    activePrompt === 'whatsapp' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "mt-5 flex max-w-[320px] flex-col gap-3",
                                        children: copy.whatsappBenefits.map((benefit)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex items-center gap-2.5 text-xs leading-[1.5] text-white/95 sm:text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#25D366]/25",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                                                            size: 11,
                                                            stroke: 3,
                                                            className: "text-[#25D366]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                            lineNumber: 652,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                        lineNumber: 651,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: benefit
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                        lineNumber: 654,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, benefit, true, {
                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                lineNumber: 650,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                        lineNumber: 648,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, activePrompt, true, {
                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                lineNumber: 630,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                            lineNumber: 628,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                    lineNumber: 609,
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
                                        lineNumber: 669,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-xs",
                                        children: copy.loading
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                        lineNumber: 670,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                lineNumber: 668,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                            lineNumber: 667,
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
                                        lineNumber: 676,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "mt-3 text-base font-semibold text-[#1d2b36]",
                                        children: copy.errorTitle
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                        lineNumber: 677,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-xs leading-5 text-[#687784]",
                                        children: pageError
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                        lineNumber: 678,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>void loadStatuses(),
                                        className: "mt-5 rounded-lg bg-[#153b5b] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0f304b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2979b8]",
                                        children: copy.retry
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                        lineNumber: 679,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                lineNumber: 675,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                            lineNumber: 674,
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
                                            lineNumber: 691,
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
                                                    lineNumber: 695,
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
                                                    lineNumber: 699,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 694,
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
                                                lineNumber: 714,
                                                columnNumber: 21
                                            }, this) : !isDesignPreview && countriesError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "py-8 text-center text-xs text-[#a14b38]",
                                                children: copy.unknownError
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                lineNumber: 716,
                                                columnNumber: 21
                                            }, this) : filteredCountries.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "py-8 text-center text-xs text-[#687784]",
                                                children: copy.countryEmpty
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                lineNumber: 718,
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
                                                            lineNumber: 739,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "min-w-0 flex-1 truncate",
                                                            children: label
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                            lineNumber: 740,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[9px] font-medium uppercase text-[#98a2aa]",
                                                            children: country.iso2
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                            lineNumber: 741,
                                                            columnNumber: 27
                                                        }, this),
                                                        isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                                                            size: 14,
                                                            stroke: 2.3
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                            lineNumber: 742,
                                                            columnNumber: 42
                                                        }, this)
                                                    ]
                                                }, country.id, true, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 724,
                                                    columnNumber: 25
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 708,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                    lineNumber: 690,
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
                                            lineNumber: 751,
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
                                                    lineNumber: 758,
                                                    columnNumber: 35
                                                }, this) : null,
                                                isSubmitting ? copy.saving : primaryActionLabel,
                                                !isSubmitting && (isArabic ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowLeft$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowLeft$3e$__["IconArrowLeft"], {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 760,
                                                    columnNumber: 49
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowRight$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowRight$3e$__["IconArrowRight"], {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 760,
                                                    columnNumber: 79
                                                }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 752,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                    lineNumber: 750,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, "country", true, {
                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                            lineNumber: 689,
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
                                                            lineNumber: 769,
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
                                                            lineNumber: 773,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 768,
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
                                                    lineNumber: 781,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 767,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].scrollArea, " mt-3 min-h-0 flex-1 overflow-y-auto pe-1"),
                                            children: industriesLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "py-8 text-center text-xs text-[#687784]",
                                                children: copy.industriesLoading
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                lineNumber: 788,
                                                columnNumber: 21
                                            }, this) : industriesError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "py-8 text-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-[#a14b38]",
                                                        children: industriesError
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                        lineNumber: 791,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>void loadIndustries(),
                                                        className: "mt-2 text-[11px] font-semibold text-[#2979b8]",
                                                        children: copy.retry
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                        lineNumber: 792,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                lineNumber: 790,
                                                columnNumber: 21
                                            }, this) : filteredIndustryGroups.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "py-8 text-center text-xs text-[#687784]",
                                                children: copy.industriesEmpty
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                lineNumber: 797,
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
                                                                lineNumber: 802,
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
                                                                                lineNumber: 820,
                                                                                columnNumber: 48
                                                                            }, this),
                                                                            industry.label
                                                                        ]
                                                                    }, industry.id, true, {
                                                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                                        lineNumber: 809,
                                                                        columnNumber: 33
                                                                    }, this);
                                                                })
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                                lineNumber: 805,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, group.id, true, {
                                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                        lineNumber: 801,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                lineNumber: 799,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 786,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                    lineNumber: 766,
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
                                                    lineNumber: 835,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-0.5 min-h-4 truncate text-[10px] text-[#a14b38]",
                                                    role: "alert",
                                                    children: fieldError
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 843,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 834,
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
                                                    lineNumber: 851,
                                                    columnNumber: 36
                                                }, this),
                                                isSubmitting ? copy.saving : primaryActionLabel,
                                                !isSubmitting && (isArabic ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowLeft$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowLeft$3e$__["IconArrowLeft"], {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 853,
                                                    columnNumber: 49
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowRight$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowRight$3e$__["IconArrowRight"], {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 853,
                                                    columnNumber: 79
                                                }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 845,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                    lineNumber: 833,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, "industries", true, {
                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                            lineNumber: 765,
                            columnNumber: 13
                        }, this) : activePrompt === 'whatsapp' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].stepEnter, " flex min-h-0 flex-1 flex-col"),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex min-h-0 flex-1 flex-col",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "onboarding-whatsapp-number",
                                            className: "mb-1.5 block shrink-0 text-[11px] font-medium text-[#40515c]",
                                            children: copy.whatsappNumberLabel
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 860,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex shrink-0 items-stretch overflow-hidden rounded-lg border border-[#d9dee3] bg-white transition focus-within:border-[#57c489] focus-within:ring-2 focus-within:ring-[#dcf5e7]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    dir: "ltr",
                                                    className: "flex items-center gap-1.5 border-e border-[#e1e5e9] bg-[#effaf3] px-3 text-xs font-semibold text-[#0f7a43]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBrandWhatsapp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBrandWhatsapp$3e$__["IconBrandWhatsapp"], {
                                                            size: 16,
                                                            className: "text-[#25D366]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                            lineNumber: 871,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            "aria-hidden": "true",
                                                            children: whatsappCountry ? countryEmoji(whatsappCountry.iso2) : '🌐'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                            lineNumber: 872,
                                                            columnNumber: 21
                                                        }, this),
                                                        "+",
                                                        whatsappDialCode || '—'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 867,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "onboarding-whatsapp-number",
                                                    dir: "ltr",
                                                    inputMode: "numeric",
                                                    autoComplete: "tel-national",
                                                    value: whatsappMaskedNumber,
                                                    onChange: (event)=>{
                                                        const maxDigits = whatsappPhoneMask.split('').filter((char)=>char === '0').length;
                                                        setWhatsappNumber(onlyDigits(event.currentTarget.value).slice(0, maxDigits));
                                                        setFieldError(null);
                                                    },
                                                    placeholder: copy.whatsappNumberPlaceholder,
                                                    className: "h-11 flex-1 border-0 bg-transparent px-3 text-xs text-[#25343f] outline-none placeholder:text-[#929ca5] focus:border-0 focus:outline-none focus:ring-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 875,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 866,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative mt-3 shrink-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__["IconSearch"], {
                                                    className: "pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-[#89959f]",
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 892,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    value: whatsappCountryQuery,
                                                    onChange: (event)=>setWhatsappCountryQuery(event.currentTarget.value),
                                                    placeholder: copy.whatsappCountrySearch,
                                                    "aria-label": copy.whatsappCountrySearch,
                                                    className: "h-10 w-full rounded-lg border border-[#d9dee3] bg-white ps-9 pe-3 text-xs text-[#25343f] outline-none transition placeholder:text-[#929ca5] focus:border-[#57c489] focus:ring-2 focus:ring-[#dcf5e7]"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 896,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 891,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].scrollArea, " mt-2 min-h-0 flex-1 overflow-y-auto rounded-lg border border-[#e1e5e9] p-1.5"),
                                            role: "listbox",
                                            "aria-label": copy.whatsappCountrySearch,
                                            children: !isDesignPreview && countriesLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "py-8 text-center text-xs text-[#687784]",
                                                children: copy.countriesLoading
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                lineNumber: 911,
                                                columnNumber: 21
                                            }, this) : !isDesignPreview && countriesError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "py-8 text-center text-xs text-[#a14b38]",
                                                children: copy.unknownError
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                lineNumber: 913,
                                                columnNumber: 21
                                            }, this) : filteredWhatsappCountries.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "py-8 text-center text-xs text-[#687784]",
                                                children: copy.whatsappCountryEmpty
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                lineNumber: 915,
                                                columnNumber: 21
                                            }, this) : filteredWhatsappCountries.map((country)=>{
                                                var _country_names;
                                                const isSelected = (whatsappCountry === null || whatsappCountry === void 0 ? void 0 : whatsappCountry.id) === country.id;
                                                const label = ((_country_names = country.names) === null || _country_names === void 0 ? void 0 : _country_names[isArabic ? 'ar' : 'en']) || country.name;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    role: "option",
                                                    "aria-selected": isSelected,
                                                    onClick: ()=>{
                                                        setWhatsappCountry(country);
                                                        setFieldError(null);
                                                    },
                                                    className: "flex min-h-9 w-full items-center gap-2.5 rounded-md px-2.5 text-start text-xs transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#57c489] ".concat(isSelected ? "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].choiceSelected, " bg-[#e7f8ef] font-semibold text-[#0f7a43]") : 'text-[#344550] hover:bg-[#f2faf5]'),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-base",
                                                            "aria-hidden": "true",
                                                            children: countryEmoji(country.iso2)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                            lineNumber: 936,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "min-w-0 flex-1 truncate",
                                                            children: label
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                            lineNumber: 937,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            dir: "ltr",
                                                            className: "text-[10px] font-semibold text-[#3f8f63]",
                                                            children: [
                                                                "+",
                                                                onlyDigits(country.international_code)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                            lineNumber: 938,
                                                            columnNumber: 27
                                                        }, this),
                                                        isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                                                            size: 14,
                                                            stroke: 2.3
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                            lineNumber: 941,
                                                            columnNumber: 42
                                                        }, this)
                                                    ]
                                                }, country.id, true, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 921,
                                                    columnNumber: 25
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 905,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                    lineNumber: 859,
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
                                                    className: "rounded-md px-2 py-2 text-[11px] font-medium text-[#667580] hover:bg-[#f1f3f5] hover:text-[#263b49] disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#57c489]",
                                                    children: copy.skip
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 951,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-0.5 min-h-4 truncate text-[10px] text-[#a14b38]",
                                                    role: "alert",
                                                    children: fieldError
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 959,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 950,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>void handleWhatsappSubmit(),
                                            disabled: isSubmitting,
                                            className: "inline-flex min-w-[148px] items-center justify-center gap-2 rounded-lg bg-[#0f7a43] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#0b5f34] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]",
                                            children: [
                                                isSubmitting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__["IconLoader2"], {
                                                    className: "animate-spin",
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 967,
                                                    columnNumber: 36
                                                }, this),
                                                isSubmitting ? copy.saving : copy.whatsappSave,
                                                !isSubmitting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBrandWhatsapp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBrandWhatsapp$3e$__["IconBrandWhatsapp"], {
                                                    size: 15
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 969,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 961,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                    lineNumber: 949,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, "whatsapp", true, {
                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                            lineNumber: 858,
                            columnNumber: 13
                        }, this) : null
                    }, void 0, false, {
                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                        lineNumber: 665,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                    lineNumber: 664,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/[locale]/onboarding/page.tsx",
            lineNumber: 608,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/[locale]/onboarding/page.tsx",
        lineNumber: 607,
        columnNumber: 5
    }, this);
}
_s(OnboardingPage, "ZIjcoKByIEkQlG/Q74K1N0MPxc8=", false, function() {
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