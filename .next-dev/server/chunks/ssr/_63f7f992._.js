module.exports = [
"[project]/hooks/useAuth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-ssr] (ecmascript)");
'use client';
;
;
function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const checkAuthStatus = ()=>{
            const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
            setIsLoggedIn(!!token);
            setIsLoading(false);
        };
        checkAuthStatus();
    }, []);
    const refreshAuthStatus = ()=>{
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
        setIsLoggedIn(!!token);
    };
    return {
        isLoggedIn,
        isLoading,
        token: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])(),
        refreshAuthStatus
    };
}
}),
"[project]/components/project/projectServicesState.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "activeProjectServiceUuid",
    ()=>activeProjectServiceUuid,
    "activeServiceResponse",
    ()=>activeServiceResponse,
    "beginProjectService",
    ()=>beginProjectService,
    "forgetProjectService",
    ()=>forgetProjectService,
    "markServiceComplete",
    ()=>markServiceComplete,
    "readProjectServices",
    ()=>readProjectServices,
    "registerProjectService",
    ()=>registerProjectService,
    "requireProjectServiceUuid",
    ()=>requireProjectServiceUuid,
    "selectProjectService",
    ()=>selectProjectService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
;
const key = (locale)=>`project:wizard:${locale}:services`;
function readProjectServices(locale) {
    if ("TURBOPACK compile-time truthy", 1) return [];
    //TURBOPACK unreachable
    ;
}
function activeProjectServiceUuid(locale) {
    if ("TURBOPACK compile-time truthy", 1) return '';
    //TURBOPACK unreachable
    ;
}
function requireProjectServiceUuid(locale) {
    const uuid = activeProjectServiceUuid(locale);
    if (!uuid) throw new Error(locale === 'ar' ? 'يرجى اختيار الخدمة أولاً.' : 'Please select a service first.');
    return uuid;
}
function selectProjectService(locale, uuid) {
    sessionStorage.setItem(`project:wizard:${locale}:activeService`, uuid);
}
function beginProjectService(locale) {
    selectProjectService(locale, '');
    const prefix = `project:wizard:${locale}:services:pending:`;
    Object.keys(sessionStorage).filter((k)=>k.startsWith(prefix)).forEach((k)=>sessionStorage.removeItem(k));
}
function registerProjectService(locale, service) {
    const oldPrefix = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["activeServiceStorageKey"])(locale, '');
    selectProjectService(locale, service.uuid);
    const newPrefix = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["activeServiceStorageKey"])(locale, '');
    if (oldPrefix !== newPrefix) {
        Object.keys(sessionStorage).filter((k)=>k.startsWith(oldPrefix)).forEach((k)=>{
            sessionStorage.setItem(newPrefix + k.slice(oldPrefix.length), sessionStorage.getItem(k));
            sessionStorage.removeItem(k);
        });
    }
    sessionStorage.setItem(key(locale), JSON.stringify([
        ...readProjectServices(locale).filter((s)=>s.uuid !== service.uuid),
        service
    ]));
    sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceLabelKey(locale), service.label);
}
function markServiceComplete(locale, complete) {
    const uuid = requireProjectServiceUuid(locale);
    sessionStorage.setItem(key(locale), JSON.stringify(readProjectServices(locale).map((s)=>s.uuid === uuid ? {
            ...s,
            complete
        } : s)));
}
function forgetProjectService(locale, uuid) {
    const remaining = readProjectServices(locale).filter((s)=>s.uuid !== uuid);
    sessionStorage.setItem(key(locale), JSON.stringify(remaining));
    const prefix = `project:wizard:${locale}:services:${uuid}:`;
    Object.keys(sessionStorage).filter((k)=>k.startsWith(prefix)).forEach((k)=>sessionStorage.removeItem(k));
    if (activeProjectServiceUuid(locale) === uuid) selectProjectService(locale, remaining[0]?.uuid || '');
}
function activeServiceResponse(input, locale) {
    const root = input;
    const services = root?.data?.project_services;
    if (!Array.isArray(services)) return input;
    return {
        data: services.find((s)=>s.uuid === activeProjectServiceUuid(locale)) || {}
    };
}
}),
"[project]/components/project/projectRequestUuid.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearStoredProjectRequestUuid",
    ()=>clearStoredProjectRequestUuid,
    "extractProjectRequestUuid",
    ()=>extractProjectRequestUuid,
    "readStoredProjectRequestUuid",
    ()=>readStoredProjectRequestUuid,
    "writeStoredProjectRequestUuid",
    ()=>writeStoredProjectRequestUuid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
;
function normalizeProjectRequestUuid(value) {
    if (typeof value === 'string') return value.trim();
    if (typeof value === 'number' && Number.isFinite(value)) return String(value);
    return '';
}
function extractProjectRequestUuid(payload) {
    const data = payload?.data ?? payload;
    return normalizeProjectRequestUuid(data?.uuid ?? data?.id);
}
function readStoredProjectRequestUuid(locale) {
    if ("TURBOPACK compile-time truthy", 1) return '';
    //TURBOPACK unreachable
    ;
}
function writeStoredProjectRequestUuid(locale, projectUuid) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    const normalizedProjectUuid = undefined;
}
function clearStoredProjectRequestUuid(locale) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
}),
"[project]/components/project/specifiedInsighterProject.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearStoredSpecifiedInsighterDisplay",
    ()=>clearStoredSpecifiedInsighterDisplay,
    "clearStoredSpecifiedInsighterUuid",
    ()=>clearStoredSpecifiedInsighterUuid,
    "getSpecifiedInsighterLabel",
    ()=>getSpecifiedInsighterLabel,
    "isSpecifiedInsighterProject",
    ()=>isSpecifiedInsighterProject,
    "normalizeSpecifiedInsighterRole",
    ()=>normalizeSpecifiedInsighterRole,
    "readStoredSpecifiedInsighterDisplay",
    ()=>readStoredSpecifiedInsighterDisplay,
    "readStoredSpecifiedInsighterProfileUuid",
    ()=>readStoredSpecifiedInsighterProfileUuid,
    "readStoredSpecifiedInsighterRole",
    ()=>readStoredSpecifiedInsighterRole,
    "readStoredSpecifiedInsighterUuid",
    ()=>readStoredSpecifiedInsighterUuid,
    "specifiedInsighterDisplayUpdatedEvent",
    ()=>specifiedInsighterDisplayUpdatedEvent,
    "specifiedInsighterProfileUuidQueryParam",
    ()=>specifiedInsighterProfileUuidQueryParam,
    "specifiedInsighterQueryParam",
    ()=>specifiedInsighterQueryParam,
    "specifiedInsighterRoleQueryParam",
    ()=>specifiedInsighterRoleQueryParam,
    "writeStoredSpecifiedInsighterDisplay",
    ()=>writeStoredSpecifiedInsighterDisplay,
    "writeStoredSpecifiedInsighterProfileUuid",
    ()=>writeStoredSpecifiedInsighterProfileUuid,
    "writeStoredSpecifiedInsighterRole",
    ()=>writeStoredSpecifiedInsighterRole,
    "writeStoredSpecifiedInsighterUuid",
    ()=>writeStoredSpecifiedInsighterUuid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
;
const specifiedInsighterQueryParam = 'specified_insighter';
const specifiedInsighterRoleQueryParam = 'specified_insighter_role';
const specifiedInsighterProfileUuidQueryParam = 'specified_insighter_profile_uuid';
const specifiedInsighterDisplayUpdatedEvent = 'specified-insighter-display-updated';
function normalizeSpecifiedInsighterUuid(value) {
    if (typeof value === 'string') return value.trim();
    if (typeof value === 'number' && Number.isFinite(value)) return String(value);
    return '';
}
function normalizeSpecifiedInsighterRole(value) {
    return value === 'company' ? 'company' : 'insighter';
}
function readStoredSpecifiedInsighterUuid(locale) {
    if ("TURBOPACK compile-time truthy", 1) return '';
    //TURBOPACK unreachable
    ;
}
function writeStoredSpecifiedInsighterUuid(locale, insighterUuid) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    const normalizedInsighterUuid = undefined;
}
function readStoredSpecifiedInsighterRole(locale) {
    if ("TURBOPACK compile-time truthy", 1) return 'insighter';
    //TURBOPACK unreachable
    ;
}
function writeStoredSpecifiedInsighterRole(locale, role) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function readStoredSpecifiedInsighterProfileUuid(locale) {
    if ("TURBOPACK compile-time truthy", 1) return '';
    //TURBOPACK unreachable
    ;
}
function writeStoredSpecifiedInsighterProfileUuid(locale, profileUuid) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    const normalizedProfileUuid = undefined;
}
function readStoredSpecifiedInsighterDisplay(locale) {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
}
function writeStoredSpecifiedInsighterDisplay(locale, display) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    const uuid = undefined;
    const name = undefined;
}
function clearStoredSpecifiedInsighterDisplay(locale) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function clearStoredSpecifiedInsighterUuid(locale) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function isSpecifiedInsighterProject(locale) {
    return Boolean(readStoredSpecifiedInsighterUuid(locale));
}
function getSpecifiedInsighterLabel(locale) {
    return locale === 'ar' ? 'خبير محدد' : 'Specified Insighter';
}
}),
"[project]/components/project/ProjectWizardReady.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectWizardReady
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServicesState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectServicesState.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectRequestUuid.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/specifiedInsighterProject.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function ProjectWizardReady({ children }) {
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const search = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setReady(true);
    }, []);
    if (!ready) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "status",
        "aria-label": "Loading",
        className: "mx-auto mt-16 h-8 w-8 animate-spin rounded-full border-2 border-sky-200 border-t-sky-700"
    }, void 0, false, {
        fileName: "[project]/components/project/ProjectWizardReady.tsx",
        lineNumber: 23,
        columnNumber: 7
    }, this);
    const locale = params.locale || 'en';
    const legacyDraft = !!(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredProjectRequestUuid"])(locale) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServicesState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readProjectServices"])(locale).length;
    const lockedBasics = !!(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredProjectRequestUuid"])(locale) && [
        'project-type',
        'deliverables-language',
        'insighter-industry',
        'insighter-sub-industry'
    ].includes(params.step || '');
    if (search.get('fresh') !== '1' && (legacyDraft || lockedBasics)) {
        const ar = locale === 'ar';
        const expert = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredSpecifiedInsighterUuid"])(locale);
        const href = `/${locale}/project/wizard/project-type?fresh=1${expert ? `&specified_insighter=${encodeURIComponent(expert)}` : ''}`;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8",
            dir: ar ? 'rtl' : 'ltr',
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-2xl font-semibold",
                    children: legacyDraft ? ar ? 'تم تحديث نموذج طلب المشروع' : 'The project request form has been updated' : ar ? 'تم حفظ إعدادات المشروع' : 'Your project settings have been saved'
                }, void 0, false, {
                    fileName: "[project]/components/project/ProjectWizardReady.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-4 text-slate-600",
                    children: legacyDraft ? ar ? 'تستخدم هذه المسودة النموذج السابق. ابدأ طلباً جديداً لتحديد الخدمات والمخرجات بالنموذج المحدث.' : 'This draft uses the previous format. Start a new request to define services and deliverables with the updated form.' : ar ? 'يتم تثبيت نوع المشروع ولغته وصناعته عند اختيار الخدمة الأولى. لتغييرها، ابدأ طلباً جديداً.' : 'Project type, language, and industry are set when the first service is created. Start a new request to change these settings.'
                }, void 0, false, {
                    fileName: "[project]/components/project/ProjectWizardReady.tsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, this),
                !legacyDraft && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    className: "mt-6 me-4 inline-block text-sky-700",
                    href: `/${locale}/project/wizard/services-summary`,
                    children: ar ? 'العودة إلى الخدمات' : 'Back to services'
                }, void 0, false, {
                    fileName: "[project]/components/project/ProjectWizardReady.tsx",
                    lineNumber: 69,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    className: "mt-6 inline-block rounded-full bg-sky-700 px-5 py-3 text-white",
                    href: href,
                    children: ar ? 'بدء طلب جديد' : 'Start a new request'
                }, void 0, false, {
                    fileName: "[project]/components/project/ProjectWizardReady.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/project/ProjectWizardReady.tsx",
            lineNumber: 46,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
}),
"[project]/components/project/animatedWizardBackground.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "base": "animatedWizardBackground-module__uLJEoq__base",
  "blob": "animatedWizardBackground-module__uLJEoq__blob",
  "blobFour": "animatedWizardBackground-module__uLJEoq__blobFour",
  "blobOne": "animatedWizardBackground-module__uLJEoq__blobOne",
  "blobThree": "animatedWizardBackground-module__uLJEoq__blobThree",
  "blobTwo": "animatedWizardBackground-module__uLJEoq__blobTwo",
  "centerFade": "animatedWizardBackground-module__uLJEoq__centerFade",
  "root": "animatedWizardBackground-module__uLJEoq__root",
  "wash": "animatedWizardBackground-module__uLJEoq__wash",
  "washMove": "animatedWizardBackground-module__uLJEoq__washMove",
  "washMoveTwo": "animatedWizardBackground-module__uLJEoq__washMoveTwo",
  "washTwo": "animatedWizardBackground-module__uLJEoq__washTwo",
});
}),
"[project]/components/project/AnimatedWizardBackground.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AnimatedWizardBackground
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$animatedWizardBackground$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/project/animatedWizardBackground.module.css [app-ssr] (css module)");
;
;
function AnimatedWizardBackground() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "aria-hidden": true,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$animatedWizardBackground$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].root,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$animatedWizardBackground$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].base
            }, void 0, false, {
                fileName: "[project]/components/project/AnimatedWizardBackground.tsx",
                lineNumber: 6,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$animatedWizardBackground$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].wash
            }, void 0, false, {
                fileName: "[project]/components/project/AnimatedWizardBackground.tsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$animatedWizardBackground$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].washTwo
            }, void 0, false, {
                fileName: "[project]/components/project/AnimatedWizardBackground.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$animatedWizardBackground$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blob} ${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$animatedWizardBackground$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blobOne}`
            }, void 0, false, {
                fileName: "[project]/components/project/AnimatedWizardBackground.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$animatedWizardBackground$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blob} ${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$animatedWizardBackground$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blobTwo}`
            }, void 0, false, {
                fileName: "[project]/components/project/AnimatedWizardBackground.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$animatedWizardBackground$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blob} ${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$animatedWizardBackground$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blobThree}`
            }, void 0, false, {
                fileName: "[project]/components/project/AnimatedWizardBackground.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$animatedWizardBackground$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blob} ${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$animatedWizardBackground$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blobFour}`
            }, void 0, false, {
                fileName: "[project]/components/project/AnimatedWizardBackground.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$animatedWizardBackground$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].centerFade
            }, void 0, false, {
                fileName: "[project]/components/project/AnimatedWizardBackground.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/AnimatedWizardBackground.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/ProjectViewportLock.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectViewportLock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
function ProjectViewportLock() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const originalHtmlOverflow = document.documentElement.style.overflow;
        const originalBodyOverflow = document.body.style.overflow;
        const originalBodyPaddingRight = document.body.style.paddingRight;
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        if (scrollBarWidth > 0) {
            document.body.style.paddingRight = `${scrollBarWidth}px`;
        }
        return ()=>{
            document.documentElement.style.overflow = originalHtmlOverflow;
            document.body.style.overflow = originalBodyOverflow;
            document.body.style.paddingRight = originalBodyPaddingRight;
        };
    }, []);
    return null;
}
}),
"[project]/components/project/ProjectWizardShell.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectWizardShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectWizardReady$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/ProjectWizardReady.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$AnimatedWizardBackground$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/AnimatedWizardBackground.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectViewportLock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/ProjectViewportLock.tsx [app-ssr] (ecmascript)");
;
;
;
;
function ProjectWizardShell({ children, align = 'center' }) {
    const containerClassName = align === 'top' ? 'w-full h-full box-border overflow-y-auto overscroll-contain pb-[calc(env(safe-area-inset-bottom)+7rem)]' : 'w-full h-full box-border overflow-y-auto overscroll-contain flex justify-center';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "fixed inset-0 overflow-hidden bg-white z-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectViewportLock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/components/project/ProjectWizardShell.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$AnimatedWizardBackground$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/components/project/ProjectWizardShell.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute left-0 right-0 bottom-0 z-10 flex box-border px-4 sm:px-6 lg:px-8 overflow-hidden ${align === 'top' ? 'items-start justify-start pt-8' : 'items-center justify-center py-10'}`,
                style: {
                    top: 'var(--app-header-height, 0px)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: containerClassName,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectWizardReady$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/components/project/ProjectWizardShell.tsx",
                        lineNumber: 32,
                        columnNumber: 45
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/ProjectWizardShell.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/ProjectWizardShell.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/ProjectWizardShell.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/ProjectIntro.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectIntro
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useAuth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectWizardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/ProjectWizardShell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function ProjectIntro({ locale }) {
    const isRTL = locale === 'ar';
    const { isLoggedIn, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearProjectWizardStorage"])(locale);
    }, [
        locale
    ]);
    const copy = isRTL ? {
        title: 'اطلب خدمة',
        eyebrow: 'اطلب خدمة مخصصة',
        line1: 'ابدأ مشروعك مع خبراء متخصصين',
        line2: 'لتمكين عملك من النجاح',
        cta: 'ابدأ'
    } : {
        title: 'Request Service',
        eyebrow: 'Request a Custom Service',
        line1: 'Start your project with subject matter experts',
        line2: 'that lead your business to success',
        cta: 'Start'
    };
    const returnUrl = encodeURIComponent(`${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publicBaseUrl"]}/${locale}/project`);
    const loginUrl = `/${locale}/signin?returnUrl=${returnUrl}`;
    const shouldShowLoginCta = !isLoading && !isLoggedIn;
    const ctaHref = shouldShowLoginCta ? loginUrl : `/${locale}/project/wizard/project-type?fresh=1`;
    const ctaLabel = shouldShowLoginCta ? 'Login to Start' : copy.cta;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectWizardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        align: "center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-20 max-w-2xl pt-12 pb-[100px] text-center sm:pt-16 sm:pb-[300px] lg:pt-32 lg:pb-[360px]",
                dir: isRTL ? 'rtl' : 'ltr',
                lang: isRTL ? 'ar' : 'en',
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 bg-clip-text text-transparent",
                        style: {
                            lineHeight: 1.5
                        },
                        children: copy.title
                    }, void 0, false, {
                        fileName: "[project]/components/project/ProjectIntro.tsx",
                        lineNumber: 95,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 text-lg sm:text-xl font-semibold mb-2 bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 bg-clip-text text-transparent",
                        children: copy.eyebrow
                    }, void 0, false, {
                        fileName: "[project]/components/project/ProjectIntro.tsx",
                        lineNumber: 99,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg sm:text-xl text-slate-700 leading-relaxed",
                        children: [
                            copy.line1,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/components/project/ProjectIntro.tsx",
                                lineNumber: 105,
                                columnNumber: 13
                            }, this),
                            copy.line2
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/ProjectIntro.tsx",
                        lineNumber: 103,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-10 flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: ctaHref,
                            className: "btn text-white bg-[#1C7CBB] hover:bg-opacity-90 active:bg-opacity-100 px-7 py-3 rounded-full shadow-[0_18px_50px_rgba(28,124,187,0.35)]",
                            children: ctaLabel
                        }, void 0, false, {
                            fileName: "[project]/components/project/ProjectIntro.tsx",
                            lineNumber: 109,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/project/ProjectIntro.tsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/ProjectIntro.tsx",
                lineNumber: 90,
                columnNumber: 9
            }, this)
        }, void 0, false)
    }, void 0, false, {
        fileName: "[project]/components/project/ProjectIntro.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_63f7f992._.js.map