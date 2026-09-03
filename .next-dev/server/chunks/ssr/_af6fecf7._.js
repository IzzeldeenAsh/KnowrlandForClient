module.exports = [
"[project]/app/lib/useCountries.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCountries",
    ()=>useCountries
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/index.react-client.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-ssr] (ecmascript)");
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
    const [countries, setCountries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(countriesCache.countries);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(countriesCache.isLoading);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLocale"])();
    const fetchCountriesWithRetry = async (maxRetries = 3)=>{
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
        for(let attempt = 1; attempt <= maxRetries; attempt++){
            try {
                console.log(`[useCountries] Attempt ${attempt}/${maxRetries} to fetch countries`);
                const headers = {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Accept-Language": locale,
                    "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone
                };
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }
                const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/common/setting/country/list"), {
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
                        console.log(`[useCountries] Request failed, retrying in ${delay}ms...`);
                        await new Promise((resolve)=>setTimeout(resolve, delay));
                        continue;
                    }
                    throw new Error(`Failed to fetch countries: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                console.log("[useCountries] Successfully retrieved countries", {
                    count: data.data.length
                });
                countriesCache.countries = data.data;
                countriesCache.lastFetchTime = Date.now();
                return data.data;
            } catch (error) {
                console.error(`[useCountries] Attempt ${attempt} failed:`, error);
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
    const fetchCountries = async (forceRefresh = false)=>{
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadCountries = async ()=>{
            // Skip loading if we're on sign-out related pages
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            // Check if we have a valid token before starting
            const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
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
        };
        loadCountries();
    }, [
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
}),
"[project]/lib/authRedirect.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
;
// Env-driven, with the production dashboard as a fail-safe fallback. The old
// `process.env.X || \`${process.env.X}\`` form fell back to the string
// "undefined" whenever the env var was missing.
const DEFAULT_LOCAL_ANGULAR_APP_URL = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dashboardUrl"];
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
    } catch  {
        return null;
    }
};
const normalizeAngularPath = (path)=>{
    const withoutLocale = (path.replace(/^\/(en|ar)(?=\/|$)/, "") || "/").trim();
    return withoutLocale.startsWith("/") ? withoutLocale : `/${withoutLocale}`;
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
    if ("TURBOPACK compile-time truthy", 1) {
        return isAngularPath(url);
    }
    //TURBOPACK unreachable
    ;
};
const getAngularAppOrigin = (returnUrl)=>{
    if ("TURBOPACK compile-time truthy", 1) {
        return DEFAULT_LOCAL_ANGULAR_APP_URL;
    }
    //TURBOPACK unreachable
    ;
    const fromReturnUrl = undefined;
    const fromReferrer = undefined;
    const protocol = undefined, hostname = undefined;
};
const toAngularAppUrl = (url)=>{
    if ("TURBOPACK compile-time truthy", 1) {
        return url;
    }
    //TURBOPACK unreachable
    ;
    const parsed = undefined;
};
}),
"[project]/services/onboarding.service.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
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
        const baseUrl = ("TURBOPACK compile-time truthy", 1) ? 'http://localhost' : "TURBOPACK unreachable";
        const parsed = new URL(url, baseUrl);
        parsed.searchParams.set(INSIGHTER_SETUP_QUERY_KEY, '1');
        return /^https?:\/\//i.test(url) ? parsed.toString() : `${parsed.pathname}${parsed.search}${parsed.hash}`;
    } catch  {
        return url;
    }
}
const INSIGHTER_PROMPT_ROLES = [
    'insighter',
    'company',
    'company-insighter'
];
const onboardingHeaders = ({ token, locale })=>({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': locale,
        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
    });
async function getErrorMessage(response, fallback) {
    const payload = await response.json().catch(()=>null);
    const validationMessages = payload?.errors ? Object.values(payload.errors).flat().filter((message)=>typeof message === 'string') : [];
    return validationMessages[0] || payload?.message || fallback;
}
function isSupportedInsighterPrompt(promptKey) {
    return SUPPORTED_INSIGHTER_PROMPTS.includes(promptKey);
}
function getVisibleInsighterPrompts(prompts) {
    return prompts.filter((prompt)=>prompt.should_show && isSupportedInsighterPrompt(prompt.prompt_key));
}
function hasInsighterPromptRole(roles) {
    return (roles ?? []).some((role)=>INSIGHTER_PROMPT_ROLES.includes(role));
}
async function fetchInsighterPromptStatuses(options) {
    try {
        const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/insighter/onboarding/prompts/status'), {
            method: 'POST',
            headers: onboardingHeaders(options),
            cache: 'no-store'
        });
        if (!response.ok) return [];
        const payload = await response.json();
        return Array.isArray(payload?.data) ? payload.data : [];
    } catch  {
        return [];
    }
}
async function skipInsighterPrompt(promptKey, options) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/insighter/onboarding/prompts/skip'), {
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
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/account/profile/onboarding/prompts/status'), {
        method: 'POST',
        headers: onboardingHeaders(options),
        cache: 'no-store'
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, 'Unable to check your onboarding status.'));
    }
    const payload = await response.json();
    return Array.isArray(payload?.data) ? payload.data : [];
}
async function updateOnboardingCountry(countryId, options) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/account/profile/country'), {
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
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/account/profile/feed/industry-preferences'), {
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
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/account/profile/notification/channel'), {
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
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/account/profile/onboarding/prompts/skip'), {
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
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/common/setting/industry/tree'), {
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
}),
"[project]/components/onboarding/insighterSetupCover.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "art": "insighterSetupCover-module__MQErDa__art",
  "avatar": "insighterSetupCover-module__MQErDa__avatar",
  "backdrop": "insighterSetupCover-module__MQErDa__backdrop",
  "blob": "insighterSetupCover-module__MQErDa__blob",
  "blobOne": "insighterSetupCover-module__MQErDa__blobOne",
  "blobTwo": "insighterSetupCover-module__MQErDa__blobTwo",
  "close": "insighterSetupCover-module__MQErDa__close",
  "cover": "insighterSetupCover-module__MQErDa__cover",
  "cover-enter": "insighterSetupCover-module__MQErDa__cover-enter",
  "cta": "insighterSetupCover-module__MQErDa__cta",
  "displayName": "insighterSetupCover-module__MQErDa__displayName",
  "geo": "insighterSetupCover-module__MQErDa__geo",
  "lede": "insighterSetupCover-module__MQErDa__lede",
  "list": "insighterSetupCover-module__MQErDa__list",
  "name": "insighterSetupCover-module__MQErDa__name",
  "panel": "insighterSetupCover-module__MQErDa__panel",
  "profile": "insighterSetupCover-module__MQErDa__profile",
  "request": "insighterSetupCover-module__MQErDa__request",
  "requestWrap": "insighterSetupCover-module__MQErDa__requestWrap",
  "skip": "insighterSetupCover-module__MQErDa__skip",
  "tick": "insighterSetupCover-module__MQErDa__tick",
  "title": "insighterSetupCover-module__MQErDa__title",
  "verified": "insighterSetupCover-module__MQErDa__verified",
});
}),
"[project]/components/onboarding/InsighterSetupCover.tsx [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INSIGHTER_STAGE_ORDER",
    ()=>INSIGHTER_STAGE_ORDER,
    "INSIGHTER_STAGE_PATH",
    ()=>INSIGHTER_STAGE_PATH,
    "INSIGHTER_STAGE_PROMPT",
    ()=>INSIGHTER_STAGE_PROMPT,
    "default",
    ()=>InsighterSetupCover
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$onboarding$2f$insighterSetupCover$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/onboarding/insighterSetupCover.module.css [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/onboarding.service.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
const INSIGHTER_STAGE_ORDER = [
    'meeting',
    'project'
];
const INSIGHTER_STAGE_PROMPT = {
    meeting: 'session_availability',
    project: 'project_settings'
};
const INSIGHTER_STAGE_PATH = {
    meeting: '/app/insighter-dashboard/account-settings/consulting-schedule',
    project: '/app/insighter-dashboard/account-settings/project-settings'
};
const MEETING_ART = 'https://res.cloudinary.com/dsiku9ipv/image/upload/v1788187470/Meeting_qfjlo4.png';
function displayName(profile) {
    if (!profile) return '';
    const full = `${profile.first_name ?? ''} ${profile.last_name ?? ''}`.trim();
    return full || profile.name || '';
}
function initials(profile) {
    if (!profile) return 'I';
    const fromNames = `${profile.first_name?.[0] ?? ''}${profile.last_name?.[0] ?? ''}`.trim();
    return (fromNames || profile.name?.[0] || 'I').toUpperCase();
}
function countryName(profile, locale) {
    const country = profile?.country;
    if (!country) return '';
    if (typeof country === 'string') return country;
    return country.names?.[locale] || country.name || '';
}
const TickIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 3,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M4 12.5 9.5 18 20 7"
        }, void 0, false, {
            fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
            lineNumber: 72,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
        lineNumber: 71,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const BriefcaseIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.9,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7m-10 0h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Zm0 4h14"
        }, void 0, false, {
            fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
            lineNumber: 78,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
        lineNumber: 77,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
function InsighterSetupCover({ stage, locale, profile, onPrimary, onSkip, isSkipping }) {
    const isArabic = locale === 'ar';
    const copy = isArabic ? {
        close: 'إغلاق',
        skip: 'تخطي الآن',
        meeting: {
            title: 'قابل عملاءك',
            lede: 'حدّد ساعات الاستشارة. يحجز العملاء تلك الأوقات فقط ويدفعون سعرك مقدماً.',
            points: [
                'اختر أيام عملك وأضِف الفترات الزمنية لكل يوم.',
                'سعّر كل فترة، مع سعر منفصل للجلسات الحضورية.',
                'قابل أونلاين أو حضورياً أو كليهما — واحفظ عنوانك مرة واحدة.'
            ],
            cta: 'حدّد أوقات توفري',
            art: 'اختيار التاريخ والوقت لحجز جلسة'
        },
        project: {
            title: 'استقبل طلبات العملاء',
            lede: 'فعّل طلبات الخدمة ليظهر زر «اطلب خدمة» في ملفك العام.',
            points: [
                'حدّد الخدمات التي تقدّمها.',
                'إعدادات تتعلق بطبيعة الخدمات التي تقدّمها.',
                'سيتم ترشيحك كمرشّح لطلبات خدمات العملاء.'
            ],
            cta: 'إعداد خدماتي',
            requestService: 'اطلب خدمة'
        }
    } : {
        close: 'Close',
        skip: 'Skip for now',
        meeting: {
            title: 'Meet With Clients',
            lede: 'Set the hours you consult in. Clients book only those slots, and pay your rate up front.',
            points: [
                'Pick the days you work and add time slots to each one.',
                'Price every slot, with a separate rate for in-person sessions.',
                'Meet online, on site, or both — and save your address once.'
            ],
            cta: 'Set My Availability',
            art: 'Choosing a date and time slot to book a session'
        },
        project: {
            title: "Recieve Client's Requests",
            lede: 'Switch on service requests and a Request Service button appears on your public profile.',
            points: [
                'Define the services you provide.',
                'Settings related to the nature of the services you provide.',
                "You'll be suggested as a candidate for clients' service requests."
            ],
            cta: 'Set Up My Services',
            requestService: 'Request Service'
        }
    };
    const stageCopy = stage === 'meeting' ? copy.meeting : copy.project;
    const photoUrl = profile?.profile_photo_url;
    const geo = countryName(profile, locale);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$onboarding$2f$insighterSetupCover$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].backdrop,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$onboarding$2f$insighterSetupCover$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cover,
            role: "dialog",
            "aria-modal": "true",
            dir: isArabic ? 'rtl' : 'ltr',
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$onboarding$2f$insighterSetupCover$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].close,
                    onClick: onSkip,
                    disabled: isSkipping,
                    "aria-label": copy.close,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: 2.2,
                        strokeLinecap: "round",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M6 6l12 12M18 6L6 18"
                        }, void 0, false, {
                            fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                            lineNumber: 161,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                        lineNumber: 160,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                    lineNumber: 159,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$onboarding$2f$insighterSetupCover$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].panel,
                    children: stage === 'meeting' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$onboarding$2f$insighterSetupCover$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blob} ${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$onboarding$2f$insighterSetupCover$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blobOne}`,
                                "aria-hidden": "true"
                            }, void 0, false, {
                                fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                                lineNumber: 168,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$onboarding$2f$insighterSetupCover$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blob} ${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$onboarding$2f$insighterSetupCover$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blobTwo}`,
                                "aria-hidden": "true"
                            }, void 0, false, {
                                fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                                lineNumber: 169,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$onboarding$2f$insighterSetupCover$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].art,
                                src: MEETING_ART,
                                alt: copy.meeting.art
                            }, void 0, false, {
                                fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                                lineNumber: 171,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$onboarding$2f$insighterSetupCover$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].profile,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$onboarding$2f$insighterSetupCover$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].avatar,
                                children: photoUrl ? // eslint-disable-next-line @next/next/no-img-element
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: photoUrl,
                                    alt: ""
                                }, void 0, false, {
                                    fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                                    lineNumber: 178,
                                    columnNumber: 19
                                }, this) : initials(profile)
                            }, void 0, false, {
                                fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                                lineNumber: 175,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$onboarding$2f$insighterSetupCover$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].name,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$onboarding$2f$insighterSetupCover$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].displayName,
                                        children: displayName(profile)
                                    }, void 0, false, {
                                        fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                                        lineNumber: 184,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$onboarding$2f$insighterSetupCover$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].verified,
                                        viewBox: "0 0 24 24",
                                        fill: "#2378E8",
                                        "aria-hidden": "true",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M12 1.6l2.6 2 3.2-.3 1 3.1 2.7 1.8-1.2 3 1.2 3-2.7 1.8-1 3.1-3.2-.3-2.6 2-2.6-2-3.2.3-1-3.1L3.5 15l1.2-3-1.2-3 2.7-1.8 1-3.1 3.2.3z"
                                            }, void 0, false, {
                                                fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                                                lineNumber: 186,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M8.4 12.2l2.4 2.4 4.5-4.9",
                                                fill: "none",
                                                stroke: "#fff",
                                                strokeWidth: 1.9,
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round"
                                            }, void 0, false, {
                                                fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                                                lineNumber: 187,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                                        lineNumber: 185,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                                lineNumber: 183,
                                columnNumber: 15
                            }, this),
                            geo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$onboarding$2f$insighterSetupCover$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].geo,
                                children: geo
                            }, void 0, false, {
                                fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                                lineNumber: 190,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$onboarding$2f$insighterSetupCover$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].requestWrap,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$onboarding$2f$insighterSetupCover$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].request,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BriefcaseIcon, {}, void 0, false, {
                                            fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                                            lineNumber: 193,
                                            columnNumber: 19
                                        }, this),
                                        copy.project.requestService
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                                    lineNumber: 192,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                                lineNumber: 191,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                        lineNumber: 174,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                    lineNumber: 165,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$onboarding$2f$insighterSetupCover$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].title,
                    children: stageCopy.title
                }, void 0, false, {
                    fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                    lineNumber: 201,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$onboarding$2f$insighterSetupCover$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].lede,
                    children: stageCopy.lede
                }, void 0, false, {
                    fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                    lineNumber: 202,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$onboarding$2f$insighterSetupCover$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].list,
                    children: stageCopy.points.map((point)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$onboarding$2f$insighterSetupCover$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tick,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TickIcon, {}, void 0, false, {
                                        fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                                        lineNumber: 207,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                                    lineNumber: 206,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: point
                                }, void 0, false, {
                                    fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                                    lineNumber: 209,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, point, true, {
                            fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                            lineNumber: 205,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                    lineNumber: 203,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$onboarding$2f$insighterSetupCover$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cta,
                    onClick: onPrimary,
                    children: [
                        stage === 'meeting' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: 2,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            "aria-hidden": "true",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M8 3v3m8-3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                            }, void 0, false, {
                                fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                                lineNumber: 217,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                            lineNumber: 216,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BriefcaseIcon, {}, void 0, false, {
                            fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                            lineNumber: 220,
                            columnNumber: 13
                        }, this),
                        stageCopy.cta
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                    lineNumber: 214,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$onboarding$2f$insighterSetupCover$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].skip,
                    onClick: onSkip,
                    disabled: isSkipping,
                    children: copy.skip
                }, void 0, false, {
                    fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
                    lineNumber: 224,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
            lineNumber: 158,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/onboarding/InsighterSetupCover.tsx",
        lineNumber: 157,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/[locale]/onboarding/onboarding.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

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
"[project]/app/[locale]/onboarding/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OnboardingPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowLeft$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconArrowLeft.mjs [app-ssr] (ecmascript) <export default as IconArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowRight$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconArrowRight.mjs [app-ssr] (ecmascript) <export default as IconArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBrandWhatsapp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBrandWhatsapp$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBrandWhatsapp.mjs [app-ssr] (ecmascript) <export default as IconBrandWhatsapp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCheck.mjs [app-ssr] (ecmascript) <export default as IconCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconLoader2.mjs [app-ssr] (ecmascript) <export default as IconLoader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconSearch.mjs [app-ssr] (ecmascript) <export default as IconSearch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconWorld$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconWorld$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconWorld.mjs [app-ssr] (ecmascript) <export default as IconWorld>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/index.react-client.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$useCountries$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/useCountries.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$GlobalProfileProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/GlobalProfileProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authRedirect.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$ANSIGHTAAr$2d2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$images$2f$ANSIGHTAAr$2d2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/public/images/ANSIGHTAAr-.png.mjs { IMAGE => "[project]/public/images/ANSIGHTAAr-.png (static in ecmascript)" } [app-ssr] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$Business$2d$white$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$images$2f$Business$2d$white$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/public/images/Business-white.png.mjs { IMAGE => "[project]/public/images/Business-white.png (static in ecmascript)" } [app-ssr] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/onboarding.service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$onboarding$2f$InsighterSetupCover$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/onboarding/InsighterSetupCover.tsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/[locale]/onboarding/onboarding.module.css [app-ssr] (css module)");
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
const promptOrder = [
    'country',
    'community_feed_industries',
    'whatsapp'
];
function onlyDigits(value) {
    return (value ?? '').replace(/\D/g, '');
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
].map(([nameEn, nameAr, iso2, iso3, internationalCode], index)=>({
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
    }));
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
    const children = node.children ?? [];
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
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getVisibleSupportedPrompts"])(prompts)
    ].sort((first, second)=>promptOrder.indexOf(first.prompt_key) - promptOrder.indexOf(second.prompt_key));
}
function OnboardingPage() {
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLocale"])();
    const isArabic = locale === 'ar';
    const copy = copyByLocale[isArabic ? 'ar' : 'en'];
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const designPreviewKey = ("TURBOPACK compile-time truthy", 1) ? searchParams.get('designPreview') : "TURBOPACK unreachable";
    const isDesignPreview = designPreviewKey === 'country' || designPreviewKey === 'whatsapp';
    const { user, roles, refreshProfile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$GlobalProfileProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGlobalProfile"])();
    const { countries, isLoading: countriesLoading, error: countriesError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$useCountries$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCountries"])();
    const availableCountries = isDesignPreview ? designPreviewCountries : countries;
    const [statuses, setStatuses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activePrompt, setActivePrompt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedCountry, setSelectedCountry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [countryQuery, setCountryQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [industryGroups, setIndustryGroups] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [industryQuery, setIndustryQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedIndustryIds, setSelectedIndustryIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [whatsappCountry, setWhatsappCountry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [whatsappCountryQuery, setWhatsappCountryQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [whatsappNumber, setWhatsappNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [industriesLoading, setIndustriesLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [industriesError, setIndustriesError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pageError, setPageError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [fieldError, setFieldError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isFinishing, setIsFinishing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const redirectStartedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const insighterSetupCheckedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const visiblePrompts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>statuses ? sortVisiblePrompts(statuses) : [], [
        statuses
    ]);
    const currentStatus = visiblePrompts.find((prompt)=>prompt.prompt_key === activePrompt);
    const primaryActionLabel = visiblePrompts.length > 1 ? copy.next : copy.submit;
    const activeTitle = activePrompt === 'community_feed_industries' ? copy.industriesTitle : activePrompt === 'whatsapp' ? copy.whatsappTitle : copy.countryTitle;
    const activeBody = activePrompt === 'community_feed_industries' ? copy.industriesBody : activePrompt === 'whatsapp' ? copy.whatsappBody : copy.countryBody;
    const activeRequirement = currentStatus?.cannot_skip ? copy.required : copy.optional;
    const whatsappDialCode = onlyDigits(whatsappCountry?.international_code);
    const whatsappPhoneMask = PHONE_MASKS[whatsappDialCode] || PHONE_MASKS.default;
    const whatsappMaskedNumber = formatWithMask(whatsappNumber, whatsappPhoneMask);
    /**
   * The Insighter setup covers are shown at the destination, not here — this
   * only decides whether the destination URL should carry the marker that asks
   * for them. Checked at most once per visit.
   */ const resolveInsighterSetupMarker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (insighterSetupCheckedRef.current) return false;
        insighterSetupCheckedRef.current = true;
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
        if (!token || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasInsighterPromptRole"])(roles)) return false;
        const prompts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchInsighterPromptStatuses"])({
            token,
            locale
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getVisibleInsighterPrompts"])(prompts).length > 0;
    }, [
        locale,
        roles
    ]);
    const navigateAfterOnboarding = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (redirectStartedRef.current) return;
        redirectStartedRef.current = true;
        setIsFinishing(true);
        void (async ()=>{
            // Decided before the redirect so the marker can ride along on the
            // destination URL — the covers are rendered wherever the user lands, not
            // stacked on top of this page.
            const wantsSetupCovers = await resolveInsighterSetupMarker();
            /** Adds the marker to whichever URL we end up sending the user to. */ const withMarker = (url)=>{
                if (!wantsSetupCovers) return url;
                try {
                    const parsed = new URL(url, window.location.origin);
                    parsed.searchParams.set(__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INSIGHTER_SETUP_QUERY_KEY"], '1');
                    return url.startsWith('http') ? parsed.toString() : `${parsed.pathname}${parsed.search}${parsed.hash}`;
                } catch  {
                    return url;
                }
            };
            const requestedDestination = searchParams.get('redirect') || searchParams.get('returnUrl');
            const unsafeDestination = requestedDestination?.trim() ?? '';
            const blockedDestination = /(^|\/)(auth|callback|onboarding|update-country)(\/|\?|$)/i.test(unsafeDestination);
            const destination = !unsafeDestination || blockedDestination ? null : unsafeDestination;
            if (destination) {
                try {
                    const parsed = new URL(destination, window.location.origin);
                    const allowedHost = parsed.hostname === window.location.hostname || parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1' || parsed.hostname.endsWith('.insightabusiness.com') || parsed.hostname.endsWith('.foresighta.co') || parsed.hostname === 'insightabusiness.com' || parsed.hostname === 'foresighta.co';
                    if (allowedHost && /^https?:$/.test(parsed.protocol)) {
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAngularRouteUrl"])(parsed.toString())) {
                            window.location.replace(withMarker((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toAngularAppUrl"])(parsed.toString())));
                            return;
                        }
                        if (parsed.origin === window.location.origin) {
                            router.replace(withMarker(`${parsed.pathname}${parsed.search}${parsed.hash}`));
                        } else {
                            window.location.replace(withMarker(parsed.toString()));
                        }
                        return;
                    }
                } catch  {
                // Continue to the role-based destination.
                }
            }
            if (roles.some((role)=>[
                    'insighter',
                    'company',
                    'company-insighter'
                ].includes(role))) {
                window.location.replace(withMarker(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAngularAppOrigin"])()}/app/insighter-dashboard/my-dashboard`));
                return;
            }
            router.replace(withMarker(`/${locale}`));
        })();
    }, [
        locale,
        resolveInsighterSetupMarker,
        roles,
        router,
        searchParams
    ]);
    const applyStatuses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((nextStatuses)=>{
        const nextVisible = sortVisiblePrompts(nextStatuses);
        setStatuses(nextStatuses);
        if (nextVisible.length === 0) {
            navigateAfterOnboarding();
            return;
        }
        setActivePrompt((current)=>{
            const currentStillVisible = nextVisible.some((prompt)=>prompt.prompt_key === current);
            return currentStillVisible ? current : nextVisible[0].prompt_key;
        });
    }, [
        navigateAfterOnboarding
    ]);
    const loadStatuses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
        if (!token) {
            const returnUrl = ("TURBOPACK compile-time truthy", 1) ? '' : "TURBOPACK unreachable";
            window.location.replace(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAngularAppOrigin"])()}/auth/login?returnUrl=${encodeURIComponent(returnUrl)}`);
            return;
        }
        setPageError(null);
        try {
            const nextStatuses = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchOnboardingPromptStatuses"])({
                token,
                locale
            });
            applyStatuses(nextStatuses);
        } catch (error) {
            setPageError(error instanceof Error ? error.message : copy.unknownError);
        }
    }, [
        applyStatuses,
        copy.unknownError,
        locale
    ]);
    const loadIndustries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        setIndustriesLoading(true);
        setIndustriesError(null);
        try {
            const tree = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchOnboardingIndustryTree"])(locale);
            setIndustryGroups(createIndustryGroups(tree));
        } catch (error) {
            setIndustriesError(error instanceof Error ? error.message : copy.unknownError);
        } finally{
            setIndustriesLoading(false);
        }
    }, [
        copy.unknownError,
        locale
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
    }, [
        applyStatuses,
        designPreviewKey,
        isDesignPreview,
        loadIndustries,
        loadStatuses
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!selectedCountry && user?.country_id && availableCountries.length > 0) {
            setSelectedCountry(availableCountries.find((country)=>country.id === user.country_id) ?? null);
        }
    }, [
        availableCountries,
        selectedCountry,
        user?.country_id
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (whatsappCountry || availableCountries.length === 0) return;
        const fromProfile = user?.country_id ? availableCountries.find((country)=>country.id === user.country_id) : undefined;
        setWhatsappCountry(fromProfile ?? (isDesignPreview ? availableCountries[0] : null));
    }, [
        availableCountries,
        isDesignPreview,
        user?.country_id,
        whatsappCountry
    ]);
    const filteredCountries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const query = countryQuery.trim().toLocaleLowerCase(locale);
        return availableCountries.filter((country)=>{
            if (!query) return true;
            return [
                country.names?.en,
                country.names?.ar,
                country.iso2,
                country.iso3
            ].filter(Boolean).some((value)=>String(value).toLocaleLowerCase(locale).includes(query));
        }).sort((first, second)=>(first.names?.[isArabic ? 'ar' : 'en'] || first.name).localeCompare(second.names?.[isArabic ? 'ar' : 'en'] || second.name, locale));
    }, [
        availableCountries,
        countryQuery,
        isArabic,
        locale
    ]);
    const filteredIndustryGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const query = industryQuery.trim().toLocaleLowerCase(locale);
        if (!query) return industryGroups;
        return industryGroups.map((group)=>({
                ...group,
                options: group.options.filter((option)=>option.label.toLocaleLowerCase(locale).includes(query) || group.label.toLocaleLowerCase(locale).includes(query))
            })).filter((group)=>group.options.length > 0);
    }, [
        industryGroups,
        industryQuery,
        locale
    ]);
    const filteredWhatsappCountries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const query = whatsappCountryQuery.trim().toLocaleLowerCase(locale);
        return availableCountries.filter((country)=>{
            if (!query) return true;
            return [
                country.names?.en,
                country.names?.ar,
                country.iso2,
                country.iso3,
                country.international_code
            ].filter(Boolean).some((value)=>String(value).toLocaleLowerCase(locale).includes(query));
        }).sort((first, second)=>(first.names?.[isArabic ? 'ar' : 'en'] || first.name).localeCompare(second.names?.[isArabic ? 'ar' : 'en'] || second.name, locale));
    }, [
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
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
        if (!token) return;
        setIsSubmitting(true);
        setFieldError(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateOnboardingCountry"])(selectedCountry.id, {
                token,
                locale
            });
            await refreshProfile(true);
            applyStatuses(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchOnboardingPromptStatuses"])({
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
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
        if (!token) return;
        setIsSubmitting(true);
        setFieldError(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateFeedIndustryPreferences"])(selectedIndustryIds, {
                token,
                locale
            });
            applyStatuses(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchOnboardingPromptStatuses"])({
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
        const dialCode = onlyDigits(whatsappCountry?.international_code);
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
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
        if (!token) return;
        setIsSubmitting(true);
        setFieldError(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateWhatsappNumber"])({
                whatsappCountryCode: dialCode,
                whatsappNumber: number
            }, {
                token,
                locale
            });
            applyStatuses(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchOnboardingPromptStatuses"])({
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
        if (!activePrompt || currentStatus?.cannot_skip) return;
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
        if (!token) return;
        setIsSubmitting(true);
        setFieldError(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["skipOnboardingPrompt"])(activePrompt, {
                token,
                locale
            });
            applyStatuses(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchOnboardingPromptStatuses"])({
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].shell} flex min-h-screen items-center justify-center p-3 sm:p-5`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].frame} grid w-full overflow-hidden bg-white`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].visualPanel} relative overflow-hidden`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            src: "/images/onboarding/insighta-onboarding-background.png",
                            alt: "",
                            fill: true,
                            sizes: "(max-width: 720px) 100vw, 400px",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].visualImage,
                            priority: true
                        }, void 0, false, {
                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                            lineNumber: 617,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].visualShade
                        }, void 0, false, {
                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                            lineNumber: 625,
                            columnNumber: 11
                        }, this),
                        activePrompt === 'whatsapp' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].whatsappShade
                        }, void 0, false, {
                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                            lineNumber: 626,
                            columnNumber: 43
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            src: isArabic ? __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$ANSIGHTAAr$2d2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$images$2f$ANSIGHTAAr$2d2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"] : __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$Business$2d$white$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$images$2f$Business$2d$white$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                            width: 112,
                            height: 38,
                            alt: "Insighta",
                            className: "absolute start-5 top-5 z-10 h-auto w-[96px] sm:start-6 sm:top-6 sm:w-[108px]",
                            priority: true
                        }, void 0, false, {
                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                            lineNumber: 627,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].visualContent} absolute z-10 flex flex-col text-white`,
                            children: !isInitialLoading && !isFinishing && !pageError && activePrompt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].stepEnter,
                                children: [
                                    activePrompt === 'whatsapp' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-lg shadow-[#0b3b28]/40 ring-1 ring-white/25",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBrandWhatsapp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBrandWhatsapp$3e$__["IconBrandWhatsapp"], {
                                            size: 28,
                                            stroke: 2
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 640,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                        lineNumber: 639,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-white/80 backdrop-blur-sm",
                                        children: activeRequirement
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                        lineNumber: 643,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "mt-4 max-w-[330px] text-[29px] font-semibold leading-[1.06] tracking-[-0.04em] sm:text-[35px]",
                                        children: activeTitle
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                        lineNumber: 646,
                                        columnNumber: 17
                                    }, this),
                                    activePrompt !== 'whatsapp' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-4 max-w-[305px] text-[11px] leading-[1.7] text-white/72 sm:text-xs",
                                        children: activeBody
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                        lineNumber: 650,
                                        columnNumber: 19
                                    }, this),
                                    activePrompt === 'whatsapp' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "mt-5 flex max-w-[320px] flex-col gap-3",
                                        children: copy.whatsappBenefits.map((benefit)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex items-center gap-2.5 text-xs leading-[1.5] text-white/95 sm:text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#25D366]/25",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                                                            size: 11,
                                                            stroke: 3,
                                                            className: "text-[#25D366]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                            lineNumber: 659,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                        lineNumber: 658,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: benefit
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                        lineNumber: 661,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, benefit, true, {
                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                lineNumber: 657,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                        lineNumber: 655,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, activePrompt, true, {
                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                lineNumber: 637,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                            lineNumber: 635,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                    lineNumber: 616,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "flex min-h-0 flex-col bg-white",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex min-h-0 flex-1 flex-col px-5 py-5 sm:px-7 sm:py-7",
                        children: isInitialLoading || isFinishing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid flex-1 place-items-center",
                            role: "status",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center text-[#687784]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__["IconLoader2"], {
                                        className: "mx-auto animate-spin text-[#2979b8]",
                                        size: 22
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                        lineNumber: 676,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-xs",
                                        children: copy.loading
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                        lineNumber: 677,
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
                        }, this) : pageError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid flex-1 place-items-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-xs text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconWorld$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconWorld$3e$__["IconWorld"], {
                                        className: "mx-auto text-[#a14b38]",
                                        size: 25
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                        lineNumber: 683,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "mt-3 text-base font-semibold text-[#1d2b36]",
                                        children: copy.errorTitle
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                        lineNumber: 684,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-xs leading-5 text-[#687784]",
                                        children: pageError
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                        lineNumber: 685,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>void loadStatuses(),
                                        className: "mt-5 rounded-lg bg-[#153b5b] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0f304b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2979b8]",
                                        children: copy.retry
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                        lineNumber: 686,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                lineNumber: 682,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                            lineNumber: 681,
                            columnNumber: 13
                        }, this) : activePrompt === 'country' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].stepEnter} flex min-h-0 flex-1 flex-col`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex min-h-0 flex-1 flex-col",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "onboarding-country-search",
                                            className: "sr-only",
                                            children: copy.countrySearch
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 698,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative shrink-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__["IconSearch"], {
                                                    className: "pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-[#89959f]",
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 702,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "onboarding-country-search",
                                                    value: countryQuery,
                                                    onChange: (event)=>setCountryQuery(event.currentTarget.value),
                                                    placeholder: copy.countrySearch,
                                                    className: "h-10 w-full rounded-lg border border-[#d9dee3] bg-white ps-9 pe-3 text-xs text-[#25343f] outline-none transition placeholder:text-[#929ca5] focus:border-[#69a2ce] focus:ring-2 focus:ring-[#e4f0f8]"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 706,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 701,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].scrollArea} mt-2 min-h-0 flex-1 overflow-y-auto rounded-lg border border-[#e1e5e9] p-1.5`,
                                            role: "listbox",
                                            "aria-label": copy.countrySearch,
                                            children: !isDesignPreview && countriesLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "py-8 text-center text-xs text-[#687784]",
                                                children: copy.countriesLoading
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                lineNumber: 721,
                                                columnNumber: 21
                                            }, this) : !isDesignPreview && countriesError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "py-8 text-center text-xs text-[#a14b38]",
                                                children: copy.unknownError
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                lineNumber: 723,
                                                columnNumber: 21
                                            }, this) : filteredCountries.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "py-8 text-center text-xs text-[#687784]",
                                                children: copy.countryEmpty
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                lineNumber: 725,
                                                columnNumber: 21
                                            }, this) : filteredCountries.map((country)=>{
                                                const isSelected = selectedCountry?.id === country.id;
                                                const label = country.names?.[isArabic ? 'ar' : 'en'] || country.name;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    role: "option",
                                                    "aria-selected": isSelected,
                                                    onClick: ()=>{
                                                        setSelectedCountry(country);
                                                        setFieldError(null);
                                                    },
                                                    className: `flex min-h-9 w-full items-center gap-2.5 rounded-md px-2.5 text-start text-xs transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#69a2ce] ${isSelected ? `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].choiceSelected} bg-[#edf5fa] font-semibold text-[#185f94]` : 'text-[#344550] hover:bg-[#f5f7f8]'}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-base",
                                                            "aria-hidden": "true",
                                                            children: countryEmoji(country.iso2)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                            lineNumber: 746,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "min-w-0 flex-1 truncate",
                                                            children: label
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                            lineNumber: 747,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[9px] font-medium uppercase text-[#98a2aa]",
                                                            children: country.iso2
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                            lineNumber: 748,
                                                            columnNumber: 27
                                                        }, this),
                                                        isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                                                            size: 14,
                                                            stroke: 2.3
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                            lineNumber: 749,
                                                            columnNumber: 42
                                                        }, this)
                                                    ]
                                                }, country.id, true, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 731,
                                                    columnNumber: 25
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 715,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                    lineNumber: 697,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 flex shrink-0 items-center justify-between gap-4 border-t border-[#e7eaed] pt-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "min-h-4 text-[11px] text-[#a14b38]",
                                            role: "alert",
                                            children: fieldError
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 758,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>void handleCountrySubmit(),
                                            disabled: isSubmitting,
                                            className: "inline-flex min-w-[112px] items-center justify-center gap-2 rounded-lg bg-[#153b5b] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#0f304b] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2979b8]",
                                            children: [
                                                isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__["IconLoader2"], {
                                                    className: "animate-spin",
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 765,
                                                    columnNumber: 35
                                                }, this) : null,
                                                isSubmitting ? copy.saving : primaryActionLabel,
                                                !isSubmitting && (isArabic ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowLeft$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowLeft$3e$__["IconArrowLeft"], {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 767,
                                                    columnNumber: 49
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowRight$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowRight$3e$__["IconArrowRight"], {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 767,
                                                    columnNumber: 79
                                                }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 759,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                    lineNumber: 757,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, "country", true, {
                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                            lineNumber: 696,
                            columnNumber: 13
                        }, this) : activePrompt === 'community_feed_industries' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].stepEnter} flex min-h-0 flex-1 flex-col`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex min-h-0 flex-1 flex-col",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex shrink-0 items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__["IconSearch"], {
                                                            className: "pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-[#89959f]",
                                                            size: 16
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                            lineNumber: 776,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            value: industryQuery,
                                                            onChange: (event)=>setIndustryQuery(event.currentTarget.value),
                                                            placeholder: copy.industrySearch,
                                                            "aria-label": copy.industrySearch,
                                                            className: "h-10 w-full rounded-lg border border-[#d9dee3] bg-white ps-9 pe-3 text-xs text-[#25343f] outline-none transition placeholder:text-[#929ca5] focus:border-[#69a2ce] focus:ring-2 focus:ring-[#e4f0f8]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                            lineNumber: 780,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 775,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "whitespace-nowrap text-[11px] font-medium text-[#5f6d78]",
                                                    children: [
                                                        selectedIndustryIds.length,
                                                        "/5 ",
                                                        copy.selected
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 788,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 774,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].scrollArea} mt-3 min-h-0 flex-1 overflow-y-auto pe-1`,
                                            children: industriesLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "py-8 text-center text-xs text-[#687784]",
                                                children: copy.industriesLoading
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                lineNumber: 795,
                                                columnNumber: 21
                                            }, this) : industriesError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "py-8 text-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-[#a14b38]",
                                                        children: industriesError
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                        lineNumber: 798,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>void loadIndustries(),
                                                        className: "mt-2 text-[11px] font-semibold text-[#2979b8]",
                                                        children: copy.retry
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                        lineNumber: 799,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                lineNumber: 797,
                                                columnNumber: 21
                                            }, this) : filteredIndustryGroups.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "py-8 text-center text-xs text-[#687784]",
                                                children: copy.industriesEmpty
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                lineNumber: 804,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4 pb-1",
                                                children: filteredIndustryGroups.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                                        "aria-labelledby": `industry-${group.id}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                id: `industry-${group.id}`,
                                                                className: "mb-2 text-[11px] font-semibold text-[#3c78a5]",
                                                                children: group.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                                lineNumber: 809,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-wrap gap-1.5",
                                                                children: group.options.map((industry)=>{
                                                                    const selected = selectedIndustryIds.includes(industry.id);
                                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        "aria-pressed": selected,
                                                                        onClick: ()=>toggleIndustry(industry.id),
                                                                        className: `inline-flex min-h-8 items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[11px] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#2979b8] ${selected ? `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].choiceSelected} border-[#69a2ce] bg-[#edf5fa] font-semibold text-[#185f94]` : 'border-[#dfe4e8] bg-white text-[#40515c] hover:border-[#b9c8d3] hover:bg-[#f7f8f9]'}`,
                                                                        children: [
                                                                            selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                                                                                size: 12,
                                                                                stroke: 2.4
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                                                lineNumber: 827,
                                                                                columnNumber: 48
                                                                            }, this),
                                                                            industry.label
                                                                        ]
                                                                    }, industry.id, true, {
                                                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                                        lineNumber: 816,
                                                                        columnNumber: 33
                                                                    }, this);
                                                                })
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                                lineNumber: 812,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, group.id, true, {
                                                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                        lineNumber: 808,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                lineNumber: 806,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 793,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                    lineNumber: 773,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 flex shrink-0 items-center justify-between gap-3 border-t border-[#e7eaed] pt-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>void handleSkip(),
                                                    disabled: isSubmitting || currentStatus?.cannot_skip,
                                                    className: "rounded-md px-2 py-2 text-[11px] font-medium text-[#667580] hover:bg-[#f1f3f5] hover:text-[#263b49] disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#69a2ce]",
                                                    children: copy.skip
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 842,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-0.5 min-h-4 truncate text-[10px] text-[#a14b38]",
                                                    role: "alert",
                                                    children: fieldError
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 850,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 841,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>void handleIndustriesSubmit(),
                                            disabled: isSubmitting,
                                            className: "inline-flex min-w-[148px] items-center justify-center gap-2 rounded-lg bg-[#153b5b] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#0f304b] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2979b8]",
                                            children: [
                                                isSubmitting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__["IconLoader2"], {
                                                    className: "animate-spin",
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 858,
                                                    columnNumber: 36
                                                }, this),
                                                isSubmitting ? copy.saving : primaryActionLabel,
                                                !isSubmitting && (isArabic ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowLeft$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowLeft$3e$__["IconArrowLeft"], {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 860,
                                                    columnNumber: 49
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowRight$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowRight$3e$__["IconArrowRight"], {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 860,
                                                    columnNumber: 79
                                                }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 852,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                    lineNumber: 840,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, "industries", true, {
                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                            lineNumber: 772,
                            columnNumber: 13
                        }, this) : activePrompt === 'whatsapp' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].stepEnter} flex min-h-0 flex-1 flex-col`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex min-h-0 flex-1 flex-col",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "onboarding-whatsapp-number",
                                            className: "mb-1.5 block shrink-0 text-[11px] font-medium text-[#40515c]",
                                            children: copy.whatsappNumberLabel
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 867,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex shrink-0 items-stretch overflow-hidden rounded-lg border border-[#d9dee3] bg-white transition focus-within:border-[#57c489] focus-within:ring-2 focus-within:ring-[#dcf5e7]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    dir: "ltr",
                                                    className: "flex items-center gap-1.5 border-e border-[#e1e5e9] bg-[#effaf3] px-3 text-xs font-semibold text-[#0f7a43]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBrandWhatsapp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBrandWhatsapp$3e$__["IconBrandWhatsapp"], {
                                                            size: 16,
                                                            className: "text-[#25D366]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                            lineNumber: 878,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            "aria-hidden": "true",
                                                            children: whatsappCountry ? countryEmoji(whatsappCountry.iso2) : '🌐'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                            lineNumber: 879,
                                                            columnNumber: 21
                                                        }, this),
                                                        "+",
                                                        whatsappDialCode || '—'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 874,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                                    lineNumber: 882,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 873,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative mt-3 shrink-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__["IconSearch"], {
                                                    className: "pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-[#89959f]",
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 899,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    value: whatsappCountryQuery,
                                                    onChange: (event)=>setWhatsappCountryQuery(event.currentTarget.value),
                                                    placeholder: copy.whatsappCountrySearch,
                                                    "aria-label": copy.whatsappCountrySearch,
                                                    className: "h-10 w-full rounded-lg border border-[#d9dee3] bg-white ps-9 pe-3 text-xs text-[#25343f] outline-none transition placeholder:text-[#929ca5] focus:border-[#57c489] focus:ring-2 focus:ring-[#dcf5e7]"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 903,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 898,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].scrollArea} mt-2 min-h-0 flex-1 overflow-y-auto rounded-lg border border-[#e1e5e9] p-1.5`,
                                            role: "listbox",
                                            "aria-label": copy.whatsappCountrySearch,
                                            children: !isDesignPreview && countriesLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "py-8 text-center text-xs text-[#687784]",
                                                children: copy.countriesLoading
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                lineNumber: 918,
                                                columnNumber: 21
                                            }, this) : !isDesignPreview && countriesError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "py-8 text-center text-xs text-[#a14b38]",
                                                children: copy.unknownError
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                lineNumber: 920,
                                                columnNumber: 21
                                            }, this) : filteredWhatsappCountries.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "py-8 text-center text-xs text-[#687784]",
                                                children: copy.whatsappCountryEmpty
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                lineNumber: 922,
                                                columnNumber: 21
                                            }, this) : filteredWhatsappCountries.map((country)=>{
                                                const isSelected = whatsappCountry?.id === country.id;
                                                const label = country.names?.[isArabic ? 'ar' : 'en'] || country.name;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    role: "option",
                                                    "aria-selected": isSelected,
                                                    onClick: ()=>{
                                                        setWhatsappCountry(country);
                                                        setFieldError(null);
                                                    },
                                                    className: `flex min-h-9 w-full items-center gap-2.5 rounded-md px-2.5 text-start text-xs transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#57c489] ${isSelected ? `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$onboarding$2f$onboarding$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].choiceSelected} bg-[#e7f8ef] font-semibold text-[#0f7a43]` : 'text-[#344550] hover:bg-[#f2faf5]'}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-base",
                                                            "aria-hidden": "true",
                                                            children: countryEmoji(country.iso2)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                            lineNumber: 943,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "min-w-0 flex-1 truncate",
                                                            children: label
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                            lineNumber: 944,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            dir: "ltr",
                                                            className: "text-[10px] font-semibold text-[#3f8f63]",
                                                            children: [
                                                                "+",
                                                                onlyDigits(country.international_code)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                            lineNumber: 945,
                                                            columnNumber: 27
                                                        }, this),
                                                        isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                                                            size: 14,
                                                            stroke: 2.3
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                            lineNumber: 948,
                                                            columnNumber: 42
                                                        }, this)
                                                    ]
                                                }, country.id, true, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 928,
                                                    columnNumber: 25
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 912,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                    lineNumber: 866,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 flex shrink-0 items-center justify-between gap-3 border-t border-[#e7eaed] pt-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>void handleSkip(),
                                                    disabled: isSubmitting || currentStatus?.cannot_skip,
                                                    className: "rounded-md px-2 py-2 text-[11px] font-medium text-[#667580] hover:bg-[#f1f3f5] hover:text-[#263b49] disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#57c489]",
                                                    children: copy.skip
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 958,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-0.5 min-h-4 truncate text-[10px] text-[#a14b38]",
                                                    role: "alert",
                                                    children: fieldError
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 966,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 957,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>void handleWhatsappSubmit(),
                                            disabled: isSubmitting,
                                            className: "inline-flex min-w-[148px] items-center justify-center gap-2 rounded-lg bg-[#0f7a43] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#0b5f34] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]",
                                            children: [
                                                isSubmitting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__["IconLoader2"], {
                                                    className: "animate-spin",
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 974,
                                                    columnNumber: 36
                                                }, this),
                                                isSubmitting ? copy.saving : copy.whatsappSave,
                                                !isSubmitting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBrandWhatsapp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBrandWhatsapp$3e$__["IconBrandWhatsapp"], {
                                                    size: 15
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                                    lineNumber: 976,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                            lineNumber: 968,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                                    lineNumber: 956,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, "whatsapp", true, {
                            fileName: "[project]/app/[locale]/onboarding/page.tsx",
                            lineNumber: 865,
                            columnNumber: 13
                        }, this) : null
                    }, void 0, false, {
                        fileName: "[project]/app/[locale]/onboarding/page.tsx",
                        lineNumber: 672,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/[locale]/onboarding/page.tsx",
                    lineNumber: 671,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/[locale]/onboarding/page.tsx",
            lineNumber: 615,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/[locale]/onboarding/page.tsx",
        lineNumber: 614,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_af6fecf7._.js.map