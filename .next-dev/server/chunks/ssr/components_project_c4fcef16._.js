module.exports = [
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
"[project]/components/project/projectDefinitionMode.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "readDefinitionMode",
    ()=>readDefinitionMode,
    "storeDefinitionMode",
    ()=>storeDefinitionMode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
;
function readDefinitionMode(locale) {
    if ("TURBOPACK compile-time truthy", 1) return 'simple';
    //TURBOPACK unreachable
    ;
}
function storeDefinitionMode(locale, mode) {
    window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].definitionModeKey(locale), mode);
}
}),
"[project]/components/project/projectApiError.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProjectApiError",
    ()=>ProjectApiError,
    "assertProjectApiResponse",
    ()=>assertProjectApiResponse,
    "getProjectApiErrorMessage",
    ()=>getProjectApiErrorMessage
]);
class ProjectApiError extends Error {
    status;
    hasServerMessage;
    constructor(message, status = 0, hasServerMessage = false){
        super(message);
        this.name = 'ProjectApiError';
        this.status = status;
        this.hasServerMessage = hasServerMessage;
    }
}
function normalizeErrorMessages(input) {
    if (!input) return [];
    if (typeof input === 'string') {
        const value = input.trim();
        return value ? [
            value
        ] : [];
    }
    if (Array.isArray(input)) {
        return input.flatMap((item)=>normalizeErrorMessages(item));
    }
    if (typeof input !== 'object') return [];
    const raw = input;
    const messages = [];
    if (typeof raw.message === 'string' && raw.message.trim()) {
        messages.push(raw.message.trim());
    }
    if (raw.errors && typeof raw.errors === 'object') {
        Object.values(raw.errors).forEach((value)=>{
            messages.push(...normalizeErrorMessages(value));
        });
    }
    return Array.from(new Set(messages));
}
async function readProjectApiErrorMessage(response) {
    try {
        const payload = await response.clone().json();
        const messages = normalizeErrorMessages(payload);
        return messages.length > 0 ? messages.join('\n') : null;
    } catch  {
        try {
            const text = (await response.clone().text()).trim();
            return text || null;
        } catch  {
            return null;
        }
    }
}
async function assertProjectApiResponse(response, fallbackMessage = 'Request failed.') {
    if (response.ok) return response;
    const message = await readProjectApiErrorMessage(response);
    throw new ProjectApiError(message || fallbackMessage, response.status, Boolean(message));
}
function getProjectApiErrorMessage(error, fallbackMessage) {
    if (error instanceof ProjectApiError) {
        return error.hasServerMessage && error.message.trim() ? error.message.trim() : fallbackMessage;
    }
    if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
        const message = error.message.trim();
        if (message) return message;
    }
    return fallbackMessage;
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
"[project]/components/project/projectSchedule.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "URGENT_MAX_DURATION_DAYS",
    ()=>URGENT_MAX_DURATION_DAYS,
    "addDaysToIsoDate",
    ()=>addDaysToIsoDate,
    "diffIsoDays",
    ()=>diffIsoDays,
    "formatIsoDate",
    ()=>formatIsoDate,
    "isUrgentProjectType",
    ()=>isUrgentProjectType,
    "normalizeProjectType",
    ()=>normalizeProjectType,
    "parseIsoDate",
    ()=>parseIsoDate,
    "readProjectSchedule",
    ()=>readProjectSchedule,
    "toLocalIsoDate",
    ()=>toLocalIsoDate,
    "todayIsoDate",
    ()=>todayIsoDate,
    "writeProjectSchedule",
    ()=>writeProjectSchedule
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
;
function toLocalIsoDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
function parseIsoDate(value) {
    const [year, month, day] = String(value || '').slice(0, 10).split('-').map((part)=>Number(part));
    if (!year || !month || !day) return null;
    return new Date(year, month - 1, day);
}
function todayIsoDate() {
    return toLocalIsoDate(new Date());
}
function addDaysToIsoDate(value, days) {
    const date = parseIsoDate(value);
    if (!date) return '';
    date.setDate(date.getDate() + days);
    return toLocalIsoDate(date);
}
function diffIsoDays(from, to) {
    const a = parseIsoDate(from);
    const b = parseIsoDate(to);
    if (!a || !b) return 0;
    return Math.round((b.getTime() - a.getTime()) / 86_400_000);
}
function formatIsoDate(value, locale, options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
}) {
    const date = parseIsoDate(value);
    if (!date) return value;
    try {
        return new Intl.DateTimeFormat(locale === 'ar' ? 'ar' : 'en', options).format(date);
    } catch  {
        return value;
    }
}
function normalizeProjectType(value) {
    if (!value) return null;
    if (value === 'urgent' || value === 'urgent_request') return 'urgent_request';
    return value;
}
function isUrgentProjectType(value) {
    return normalizeProjectType(value) === 'urgent_request';
}
const URGENT_MAX_DURATION_DAYS = 1;
function readProjectSchedule(locale) {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
}
function writeProjectSchedule(locale, schedule) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
}),
"[project]/components/project/projectAddonsState.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createDefaultProjectAddonsState",
    ()=>createDefaultProjectAddonsState,
    "readProjectAddonsState",
    ()=>readProjectAddonsState,
    "readProjectScopeSnapshot",
    ()=>readProjectScopeSnapshot,
    "updateProjectAddonsState",
    ()=>updateProjectAddonsState,
    "writeProjectAddonsState",
    ()=>writeProjectAddonsState,
    "writeProjectScopeSnapshot",
    ()=>writeProjectScopeSnapshot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
;
function createDefaultProjectAddonsState() {
    return {
        kickoffMeeting: {
            enabled: null,
            skipped: false
        }
    };
}
function sanitizeScopeSnapshot(input) {
    if (!Array.isArray(input)) return [];
    return input.map((item)=>{
        const raw = item;
        const name = String(raw.name || '').trim();
        const subscopes = Array.isArray(raw.subscopes) ? raw.subscopes.map((sub)=>String(sub || '').trim()).filter(Boolean) : [];
        if (!name) return null;
        return {
            name,
            subscopes
        };
    }).filter((item)=>Boolean(item));
}
function sanitizeProjectAddonsState(input) {
    const defaults = createDefaultProjectAddonsState();
    const raw = input && typeof input === 'object' ? input : {};
    return {
        kickoffMeeting: {
            enabled: raw.kickoffMeeting && typeof raw.kickoffMeeting === 'object' ? typeof raw.kickoffMeeting.enabled === 'boolean' ? Boolean(raw.kickoffMeeting.enabled) : defaults.kickoffMeeting.enabled : defaults.kickoffMeeting.enabled,
            skipped: raw.kickoffMeeting && typeof raw.kickoffMeeting === 'object' ? typeof raw.kickoffMeeting.skipped === 'boolean' ? Boolean(raw.kickoffMeeting.skipped) : defaults.kickoffMeeting.skipped : defaults.kickoffMeeting.skipped
        }
    };
}
function readProjectAddonsState(locale) {
    if ("TURBOPACK compile-time truthy", 1) return createDefaultProjectAddonsState();
    //TURBOPACK unreachable
    ;
}
function writeProjectAddonsState(locale, state) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function updateProjectAddonsState(locale, updater) {
    const current = readProjectAddonsState(locale);
    writeProjectAddonsState(locale, updater(current));
}
function readProjectScopeSnapshot(locale) {
    if ("TURBOPACK compile-time truthy", 1) return [];
    //TURBOPACK unreachable
    ;
}
function writeProjectScopeSnapshot(locale, scopes) {
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
"[project]/components/project/projectServiceUuid.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearStoredProjectServiceUuid",
    ()=>clearStoredProjectServiceUuid,
    "ensureProjectServiceUuid",
    ()=>ensureProjectServiceUuid,
    "extractProjectServiceUuid",
    ()=>extractProjectServiceUuid,
    "pickProjectServiceFromProject",
    ()=>pickProjectServiceFromProject,
    "readStoredProjectServiceUuid",
    ()=>readStoredProjectServiceUuid,
    "writeStoredProjectServiceUuid",
    ()=>writeStoredProjectServiceUuid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectRequestUuid.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
;
;
;
;
;
// A project owns one or more project services; service-level definition
// endpoints (scope, components, AI intake) are addressed by the project
// service, not by the project.
function normalizeProjectServiceUuid(value) {
    if (typeof value === 'string') return value.trim();
    if (typeof value === 'number' && Number.isFinite(value)) return String(value);
    return '';
}
function firstProjectService(list) {
    if (!Array.isArray(list) || list.length === 0) return null;
    const sorted = [
        ...list
    ].sort((a, b)=>Number(a?.position ?? 0) - Number(b?.position ?? 0));
    return sorted[0] ?? null;
}
function extractProjectServiceUuid(payload) {
    const data = payload?.data ?? payload;
    const service = firstProjectService(data?.project_services);
    return normalizeProjectServiceUuid(service?.uuid ?? service?.id);
}
function pickProjectServiceFromProject(payload, projectServiceUuid) {
    const data = payload?.data ?? payload;
    const list = data?.project_services;
    if (!Array.isArray(list) || list.length === 0) return null;
    const match = list.find((item)=>normalizeProjectServiceUuid(item?.uuid) === projectServiceUuid || normalizeProjectServiceUuid(item?.id) === projectServiceUuid);
    return match ?? firstProjectService(list);
}
function readStoredProjectServiceUuid(locale) {
    if ("TURBOPACK compile-time truthy", 1) return '';
    //TURBOPACK unreachable
    ;
}
function writeStoredProjectServiceUuid(locale, uuid) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    const normalized = undefined;
}
function clearStoredProjectServiceUuid(locale) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
async function ensureProjectServiceUuid(locale) {
    const stored = readStoredProjectServiceUuid(locale);
    if (stored) return stored;
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
    if (!token) throw new Error('no_token');
    const projectUuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredProjectRequestUuid"])(locale);
    if (!projectUuid) throw new Error('no_project_uuid');
    const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/account/project/show/${projectUuid}`), {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Accept-Language': locale === 'ar' ? 'ar' : 'en',
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        cache: 'no-store'
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res, 'Failed to load the project.');
    const uuid = extractProjectServiceUuid(await res.json());
    if (!uuid) throw new Error('no_project_service_uuid');
    writeStoredProjectServiceUuid(locale, uuid);
    return uuid;
}
}),
"[project]/components/project/projectWizardFlow.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clientComponentIsVisible",
    ()=>clientComponentIsVisible,
    "deliverableStageStepSlugs",
    ()=>deliverableStageStepSlugs,
    "expandServiceComponentSlugs",
    ()=>expandServiceComponentSlugs,
    "getProjectWizardStepOrder",
    ()=>getProjectWizardStepOrder,
    "isAiIntakeReady",
    ()=>isAiIntakeReady,
    "isLeavingComponentSteps",
    ()=>isLeavingComponentSteps,
    "isServiceAddPending",
    ()=>isServiceAddPending,
    "isServiceFlowActive",
    ()=>isServiceFlowActive,
    "legacyDeliverableStepSlugs",
    ()=>legacyDeliverableStepSlugs,
    "markAiIntakeReady",
    ()=>markAiIntakeReady,
    "normalizeProjectWizardStepId",
    ()=>normalizeProjectWizardStepId,
    "normalizeServiceComponentSlug",
    ()=>normalizeServiceComponentSlug,
    "projectWizardStepIds",
    ()=>projectWizardStepIds,
    "readProjectLevelStepSlugs",
    ()=>readProjectLevelStepSlugs,
    "readProjectServiceStepSlugs",
    ()=>readProjectServiceStepSlugs,
    "readServiceComponentSlugs",
    ()=>readServiceComponentSlugs,
    "readServiceFlowReturnStepId",
    ()=>readServiceFlowReturnStepId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectDefinitionMode.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectAddonsState.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/specifiedInsighterProject.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectServiceUuid.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const projectWizardStepIds = {
    projectType: 'project-type',
    definitionMode: 'definition-mode',
    componentSetup: 'component-setup',
    aiIntake: 'ai-intake',
    deliverablesLanguage: 'deliverables-language',
    insighterIndustry: 'insighter-industry',
    insighterSubIndustry: 'insighter-sub-industry',
    service: 'service',
    projectScope: 'project-scope',
    projectSubscopes: 'project-subscopes',
    projectStatus: 'project-status',
    whoAreYou: 'who-are-you',
    preferredInsighterType: 'preferred-insighter-type',
    insighterOrigin: 'insighter-origin',
    insighterExperience: 'insighter-experience',
    companyTeamSize: 'company-team-size',
    servicesSummary: 'services-summary',
    projectDescription: 'project-description',
    deadlineOffer: 'deadline-offer',
    projectSchedule: 'project-schedule',
    addonsIntro: 'addons-intro',
    kickoffMeeting: 'kickoff-meeting',
    projectReview: 'project-review',
    projectMatches: 'project-matches',
    projectSubmissionSuccess: 'submission-success'
};
const deliverableStageStepSlugs = [
    'deliverables-plan'
];
const legacyDeliverableStepSlugs = [
    'deliverables-format',
    'deliverable-first-draft-date',
    'deliverable-first-draft-type',
    'deliverable-first-draft-way',
    'deliverable-final-version-date',
    'deliverable-final-version-type',
    'deliverable-final-version-way'
];
const deliverableComponentSlugs = new Set([
    'deliverable-stage',
    'deliverable-type-first-draft',
    'deliverable-type-final-version',
    ...deliverableStageStepSlugs,
    ...legacyDeliverableStepSlugs
]);
function normalizeServiceComponentSlug(value) {
    const normalized = String(value || '').trim().toLowerCase().replace(/[_\s]+/g, '-').replace(/[^a-z0-9-]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    const aliases = {
        'deliverables-stage': 'deliverable-stage',
        'deliverable-stages': 'deliverable-stage',
        'deliverables-type-first-draft': 'deliverable-type-first-draft',
        'deliverable-types-first-draft': 'deliverable-type-first-draft',
        'deliverables-type-final-version': 'deliverable-type-final-version',
        'deliverable-types-final-version': 'deliverable-type-final-version',
        'data-source-expected': 'data-sources-expected',
        'expected-data-sources': 'data-sources-expected'
    };
    return aliases[normalized] || normalized;
}
function isDeliverableComponentSlug(slug) {
    if (deliverableComponentSlugs.has(slug)) return true;
    const hasDeliverableMarker = slug.includes('deliverable') || slug.includes('delivery') || slug.includes('first-draft') || slug.includes('final-version');
    if (!hasDeliverableMarker) return false;
    return slug.includes('stage') || slug.includes('date') || slug.includes('type') || slug.includes('report') || slug.includes('way') || slug.includes('draft') || slug.includes('final');
}
function clientComponentIsVisible(locale, slug) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readDefinitionMode"])(locale) === 'advanced' || !isDeliverableComponentSlug(normalizeServiceComponentSlug(slug));
}
function expandServiceComponentSlugs(slugs) {
    const expanded = [];
    let addedDeliverableSteps = false;
    for (const rawSlug of slugs){
        const slug = normalizeServiceComponentSlug(rawSlug);
        if (!slug) continue;
        if (isDeliverableComponentSlug(slug)) {
            if (!addedDeliverableSteps) {
                expanded.push(...deliverableStageStepSlugs);
                addedDeliverableSteps = true;
            }
            continue;
        }
        expanded.push(slug);
    }
    return expanded.filter((slug, index, arr)=>arr.indexOf(slug) === index);
}
function normalizeProjectWizardStepId(step) {
    if (!step) return projectWizardStepIds.projectType;
    const trimmed = String(step).trim();
    if (trimmed === '1') return projectWizardStepIds.projectType;
    if (trimmed === '2') return projectWizardStepIds.deliverablesLanguage;
    if (trimmed === '3') return projectWizardStepIds.service;
    if (trimmed === '5') return projectWizardStepIds.projectStatus;
    if (trimmed === '6') return 'target-market';
    if (trimmed === '7') return projectWizardStepIds.service;
    return trimmed;
}
function readSlugList(key, locale) {
    if ("TURBOPACK compile-time truthy", 1) return [];
    //TURBOPACK unreachable
    ;
}
function readProjectServiceStepSlugs(locale) {
    return readSlugList(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceComponentSlugsKey(locale), locale);
}
function readProjectLevelStepSlugs(locale) {
    const serviceSteps = new Set(readProjectServiceStepSlugs(locale));
    return readSlugList(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectComponentSlugsKey(locale), locale).filter((slug)=>!serviceSteps.has(slug));
}
function isLeavingComponentSteps(locale, nextStepId, isReviewEditMode) {
    return isReviewEditMode || !nextStepId || !readServiceComponentSlugs(locale).includes(nextStepId);
}
function readServiceComponentSlugs(locale) {
    return expandServiceComponentSlugs([
        ...readProjectServiceStepSlugs(locale),
        ...readSlugList(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectComponentSlugsKey(locale), locale)
    ]);
}
function isServiceFlowActive(locale) {
    if ("TURBOPACK compile-time truthy", 1) return false;
    //TURBOPACK unreachable
    ;
}
function isServiceAddPending(locale) {
    if ("TURBOPACK compile-time truthy", 1) return false;
    //TURBOPACK unreachable
    ;
}
function readServiceFlowReturnStepId(locale) {
    if ("TURBOPACK compile-time truthy", 1) return projectWizardStepIds.servicesSummary;
    //TURBOPACK unreachable
    ;
}
function readPreferredInsighterType(locale) {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
}
function selectedIndustryParentHasChildren(locale) {
    if ("TURBOPACK compile-time truthy", 1) return false;
    //TURBOPACK unreachable
    ;
}
function isAiIntakeReady(locale) {
    if ("TURBOPACK compile-time truthy", 1) return false;
    //TURBOPACK unreachable
    ;
}
function markAiIntakeReady(locale) {
    try {
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].aiIntakeReadyKey(locale), (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredProjectServiceUuid"])(locale));
    } catch  {
    // ignore
    }
}
function getProjectWizardStepOrder(locale) {
    const advanced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readDefinitionMode"])(locale) === 'advanced';
    const scopeDeferred = "undefined" !== 'undefined' && window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceScopeDeferredKey(locale)) === '1';
    const other = "undefined" !== 'undefined' && window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceIsOtherKey(locale)) === '1';
    const requirementSteps = advanced ? [
        projectWizardStepIds.projectScope,
        ...("TURBOPACK compile-time truthy", 1) ? [
            projectWizardStepIds.projectSubscopes
        ] : "TURBOPACK unreachable",
        projectWizardStepIds.componentSetup
    ] : [
        ...other && !isAiIntakeReady(locale) ? "TURBOPACK unreachable" : [],
        projectWizardStepIds.componentSetup
    ];
    if (isServiceFlowActive(locale)) {
        const returnStepId = readServiceFlowReturnStepId(locale);
        return [
            ...isServiceAddPending(locale) ? [
                projectWizardStepIds.service
            ] : [],
            ...requirementSteps,
            ...readProjectServiceStepSlugs(locale),
            // Project-level steps follow the services step in the main flow. A service added from the
            // review returns straight there, so ask any project-level requirement it introduced here.
            ...returnStepId === projectWizardStepIds.projectReview ? readProjectLevelStepSlugs(locale) : [],
            returnStepId
        ];
    }
    const preferredInsighterType = readPreferredInsighterType(locale);
    const skipKickoffMeeting = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readProjectAddonsState"])(locale).kickoffMeeting.skipped;
    const specifiedInsighterProject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSpecifiedInsighterProject"])(locale);
    const includeSubIndustryStep = selectedIndustryParentHasChildren(locale);
    const postOriginSteps = specifiedInsighterProject ? [] : preferredInsighterType === 'Individual' ? [
        projectWizardStepIds.insighterExperience
    ] : preferredInsighterType === 'Company' ? [
        projectWizardStepIds.companyTeamSize
    ] : [];
    const insighterPreferenceSteps = specifiedInsighterProject ? [] : [
        projectWizardStepIds.preferredInsighterType,
        // "Any" means worldwide, so the origin question is skipped.
        ...preferredInsighterType === 'Either' ? [] : [
            projectWizardStepIds.insighterOrigin
        ],
        ...postOriginSteps
    ];
    return [
        projectWizardStepIds.projectType,
        projectWizardStepIds.deliverablesLanguage,
        projectWizardStepIds.insighterIndustry,
        ...includeSubIndustryStep ? [
            projectWizardStepIds.insighterSubIndustry
        ] : [],
        // Project questions first…
        projectWizardStepIds.projectStatus,
        projectWizardStepIds.whoAreYou,
        ...insighterPreferenceSteps,
        projectWizardStepIds.projectSchedule,
        // Choose a service, then decide who defines the details before creating the project.
        projectWizardStepIds.service,
        projectWizardStepIds.definitionMode,
        ...requirementSteps,
        ...readProjectServiceStepSlugs(locale),
        // Specific-insighter projects can bundle more services before moving on.
        ...specifiedInsighterProject ? [
            projectWizardStepIds.servicesSummary
        ] : [],
        // Project-level requirements are asked once, after all services.
        ...readProjectLevelStepSlugs(locale),
        // …then description and add-ons, the summary, and insighter selection.
        projectWizardStepIds.projectDescription,
        projectWizardStepIds.addonsIntro,
        ...skipKickoffMeeting ? [] : [
            projectWizardStepIds.kickoffMeeting
        ],
        projectWizardStepIds.projectReview,
        ...specifiedInsighterProject ? [] : [
            projectWizardStepIds.projectMatches
        ],
        projectWizardStepIds.deadlineOffer
    ];
}
}),
"[project]/components/project/projectComponentsCatalog.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchProjectLevelComponentSlugs",
    ()=>fetchProjectLevelComponentSlugs,
    "fetchProjectServiceComponentSlugs",
    ()=>fetchProjectServiceComponentSlugs,
    "readComponentCatalog",
    ()=>readComponentCatalog,
    "readProjectComponentSlugs",
    ()=>readProjectComponentSlugs,
    "storeComponentSlugs",
    ()=>storeComponentSlugs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectDefinitionMode.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectWizardFlow.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
;
;
;
;
;
// Components come in two ownership levels:
// - project service level (e.g. deliverable-stage): synced per project service
//   via component/sync/{project}/{project_service}
// - project level (e.g. target-market, data-sources-expected): sent with the
//   project properties sync under `components`
function headers(locale, token) {
    return {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Accept-Language': locale === 'ar' ? 'ar' : 'en',
        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
    };
}
function readComponentCatalog(locale) {
    if ("TURBOPACK compile-time truthy", 1) return [];
    //TURBOPACK unreachable
    ;
}
async function fetchComponentSlugs(url, locale, token, ownershipLevel, signal) {
    const res = await fetch(url, {
        method: 'GET',
        headers: headers(locale, token),
        cache: 'no-store',
        signal
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res, 'Failed to load service components.');
    const json = await res.json();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readDefinitionMode"])(locale);
    const items = (json.data || []).filter((item)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clientComponentIsVisible"])(locale, item.slug || item.name) && (!item.definition_mode_visibility || item.definition_mode_visibility === 'both' || item.definition_mode_visibility === mode)).map((item)=>({
            ...item,
            ownership_level: ownershipLevel
        }));
    window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].componentCatalogKey(locale), JSON.stringify([
        ...readComponentCatalog(locale).filter((item)=>item.ownership_level !== ownershipLevel && (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clientComponentIsVisible"])(locale, item.slug || item.name)),
        ...items
    ]));
    return items.map((item)=>item.slug || item.name).filter((slug)=>Boolean(slug && slug.trim()));
}
async function fetchProjectServiceComponentSlugs(params) {
    const url = params.isOther ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/account/project/definition/service-prompt/component/${params.projectUuid}/${params.projectServiceUuid}`) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/common/setting/service/component/${params.serviceId}?definition_mode=${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readDefinitionMode"])(params.locale)}`);
    return fetchComponentSlugs(url, params.locale, params.token, 'project_service', params.signal);
}
async function fetchProjectLevelComponentSlugs(params) {
    return fetchComponentSlugs((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/account/project/definition/component/${params.projectUuid}`), params.locale, params.token, 'project', params.signal);
}
function storeComponentSlugs(locale, params) {
    const serviceSteps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["expandServiceComponentSlugs"])(params.projectServiceSlugs).filter((slug)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clientComponentIsVisible"])(locale, slug));
    const projectSlugs = params.projectSlugs.filter((slug)=>!params.projectServiceSlugs.includes(slug) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clientComponentIsVisible"])(locale, slug));
    try {
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceComponentSlugsKey(locale), JSON.stringify(serviceSteps));
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectComponentSlugsKey(locale), JSON.stringify(projectSlugs));
    } catch  {
    // ignore
    }
}
function readProjectComponentSlugs(locale) {
    if ("TURBOPACK compile-time truthy", 1) return [];
    //TURBOPACK unreachable
    ;
}
}),
"[project]/components/project/serviceComponentsPayload.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "readServiceComponentPayloadValue",
    ()=>readServiceComponentPayloadValue,
    "readServiceComponentsPayload",
    ()=>readServiceComponentsPayload,
    "resetServiceComponentsPayload",
    ()=>resetServiceComponentsPayload,
    "updateServiceComponentPayload",
    ()=>updateServiceComponentPayload,
    "writeServiceComponentsPayload",
    ()=>writeServiceComponentsPayload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectComponentsCatalog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectComponentsCatalog.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
;
;
function readServiceComponentsPayload(locale) {
    if ("TURBOPACK compile-time truthy", 1) return {
        components: {}
    };
    //TURBOPACK unreachable
    ;
}
function writeServiceComponentsPayload(locale, payload) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function resetServiceComponentsPayload(locale, preserveProjectAnswers = true) {
    const projectSlugs = new Set(preserveProjectAnswers ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectComponentsCatalog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readProjectComponentSlugs"])(locale) : []);
    const { components } = readServiceComponentsPayload(locale);
    writeServiceComponentsPayload(locale, {
        components: Object.fromEntries(Object.entries(components || {}).filter(([slug])=>projectSlugs.has(slug)))
    });
}
function updateServiceComponentPayload(locale, slug, value) {
    const current = readServiceComponentsPayload(locale);
    writeServiceComponentsPayload(locale, {
        components: {
            ...current.components || {},
            [slug]: value
        }
    });
}
function readServiceComponentPayloadValue(locale, slug) {
    const current = readServiceComponentsPayload(locale);
    return current.components?.[slug] ?? null;
}
}),
"[project]/components/project/serviceComponentsSync.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "readProjectLevelComponents",
    ()=>readProjectLevelComponents,
    "syncServiceComponents",
    ()=>syncServiceComponents
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectComponentsCatalog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectComponentsCatalog.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectWizardFlow.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectRequestUuid.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectServiceUuid.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsPayload.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
function readProjectLevelComponents(locale) {
    const projectSlugs = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectComponentsCatalog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readProjectComponentSlugs"])(locale));
    const { components } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readServiceComponentsPayload"])(locale);
    return Object.fromEntries(Object.entries(components || {}).filter(([slug])=>projectSlugs.has(slug)));
}
function readProjectServiceComponents(locale) {
    const projectSlugs = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectComponentsCatalog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readProjectComponentSlugs"])(locale));
    const { components } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readServiceComponentsPayload"])(locale);
    return Object.fromEntries(Object.entries(components || {}).filter(([slug])=>!projectSlugs.has(slug) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["expandServiceComponentSlugs"])([
            slug
        ]).some((step)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readProjectServiceStepSlugs"])(locale).includes(step))));
}
async function syncServiceComponents(locale) {
    if ("TURBOPACK compile-time truthy", 1) throw new Error('client_only');
    // Do not sync a service whose entire component set is delegated. Sending an
    // empty payload can trigger older catalogs' client deliverable validation.
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readProjectServiceStepSlugs"])(locale).length === 0) return;
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
    if (!token) throw new Error('no_token');
    const projectUuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredProjectRequestUuid"])(locale);
    if (!projectUuid) throw new Error('no_project_uuid');
    const projectServiceUuid = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ensureProjectServiceUuid"])(locale);
    const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/account/project/definition/component/sync/${projectUuid}/${projectServiceUuid}`), {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': locale === 'ar' ? 'ar' : 'en',
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        body: JSON.stringify({
            components: readProjectServiceComponents(locale)
        })
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res, 'Failed to save service components.');
}
}),
"[project]/components/project/projectPropertiesSync.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildProjectPropertiesPayload",
    ()=>buildProjectPropertiesPayload,
    "syncProjectProperties",
    ()=>syncProjectProperties,
    "syncProjectPropertiesIfReady",
    ()=>syncProjectPropertiesIfReady
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectRequestUuid.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectSchedule.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsSync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsSync.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/specifiedInsighterProject.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
function normalizeValue(value) {
    return String(value || '').trim().toLowerCase();
}
function readStorageValue(locale, key) {
    if ("TURBOPACK compile-time truthy", 1) return '';
    //TURBOPACK unreachable
    ;
}
function mapPhase(value) {
    const normalized = normalizeValue(value);
    if (normalized === 'idea stage' || normalized === 'idea' || normalized === 'مرحلة الفكرة') {
        return 'idea stage';
    }
    if (normalized === 'expansion' || normalized === 'التوسع') {
        return 'expansion';
    }
    if (normalized === 'implementation' || normalized === 'التنفيذ') {
        return 'implementation';
    }
    return normalized;
}
function mapBusinessType(value) {
    const normalized = normalizeValue(value);
    if (normalized === 'entrepreneur' || normalized === 'رائد أعمال') return 'entrepreneur';
    if (normalized === 'startup' || normalized === 'شركة ناشئة') return 'startup';
    if (normalized === 'sme' || normalized === 'شركة صغيرة/متوسطة') return 'sme';
    if (normalized === 'company' || normalized === 'شركة') return 'company';
    if (normalized === 'organization' || normalized === 'منظمة') return 'organization';
    if (normalized === 'government' || normalized === 'حكومة') return 'government';
    return normalized;
}
function mapPreferredInsighterType(value) {
    const normalized = normalizeValue(value);
    if (normalized === 'individual' || normalized === 'فرد') return 'individual';
    if (normalized === 'company' || normalized === 'شركة') return 'company';
    if (normalized === 'either' || normalized === 'أيهما' || normalized === 'كلاهما' || normalized === 'لا مانع') {
        return 'either';
    }
    return '';
}
function scheduleFields(locale) {
    const schedule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readProjectSchedule"])(locale);
    if (!schedule) return {};
    return {
        planned_start_date: schedule.plannedStartDate,
        duration_days: schedule.durationDays
    };
}
function buildProjectPropertiesPayload(locale) {
    const preferredInsighterType = mapPreferredInsighterType(readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].preferredInsighterTypeKey(locale)));
    const insighterOriginType = normalizeValue(readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterOriginTypeKey(locale)));
    const insighterOriginId = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterOriginIdKey(locale)).trim();
    const hasOrigin = Boolean(insighterOriginType && insighterOriginId);
    const basePayload = {
        phase: mapPhase(readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectStatusKey(locale))),
        business_type: mapBusinessType(readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].whoAreYouKey(locale))),
        ...scheduleFields(locale),
        components: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsSync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readProjectLevelComponents"])(locale)
    };
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSpecifiedInsighterProject"])(locale)) {
        return basePayload;
    }
    return {
        ...basePayload,
        insighter_preferred_type: preferredInsighterType,
        insighter_origin_id: hasOrigin ? insighterOriginId : '',
        insighter_origin_type: hasOrigin ? insighterOriginType : '',
        insighter_min_years_experience: preferredInsighterType === 'individual' ? readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterMinYearsExperienceKey(locale)).trim() : '',
        insighter_max_years_experience: preferredInsighterType === 'individual' ? readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterMaxYearsExperienceKey(locale)).trim() : '',
        company_min_team_size: preferredInsighterType === 'company' ? readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].companyMinTeamSizeKey(locale)).trim() : '',
        company_max_team_size: preferredInsighterType === 'company' ? readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].companyMaxTeamSizeKey(locale)).trim() : ''
    };
}
async function syncProjectPropertiesIfReady(locale) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredProjectRequestUuid"])(locale)) return false;
    await syncProjectProperties(locale);
    return true;
}
async function syncProjectProperties(locale) {
    if ("TURBOPACK compile-time truthy", 1) throw new Error('client_only');
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
    if (!token) throw new Error('no_token');
    const projectUuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredProjectRequestUuid"])(locale);
    if (!projectUuid) throw new Error('no_project_uuid');
    const payload = buildProjectPropertiesPayload(locale);
    const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/account/project/definition/properties/sync/${projectUuid}`), {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': locale === 'ar' ? 'ar' : 'en',
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        body: JSON.stringify(payload)
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res, 'Failed to save project properties.');
}
}),
"[project]/components/project/projectServiceSessions.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "activateServiceSession",
    ()=>activateServiceSession,
    "beginServiceAdd",
    ()=>beginServiceAdd,
    "finishServiceFlow",
    ()=>finishServiceFlow,
    "forgetServiceSession",
    ()=>forgetServiceSession,
    "latestSavedSessionDeliverableDay",
    ()=>latestSavedSessionDeliverableDay,
    "promoteServiceToPrimary",
    ()=>promoteServiceToPrimary,
    "readPrimaryProjectServiceUuid",
    ()=>readPrimaryProjectServiceUuid,
    "readServiceFlow",
    ()=>readServiceFlow,
    "saveActiveServiceSession",
    ()=>saveActiveServiceSession,
    "serviceSessionSeed",
    ()=>serviceSessionSeed,
    "startServiceFlow",
    ()=>startServiceFlow,
    "writePrimaryProjectServiceUuid",
    ()=>writePrimaryProjectServiceUuid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectComponentsCatalog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectComponentsCatalog.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectServiceUuid.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsPayload.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
;
;
;
;
function scopedKeys(locale) {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceIdsKey(locale),
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceLabelKey(locale),
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].servicePromptKey(locale),
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceIsOtherKey(locale),
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceScopeParentIdsKey(locale),
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceScopeChildIdsByParentKey(locale),
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceScopeHasChildrenKey(locale),
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceScopeDeferredKey(locale),
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceManualScopesKey(locale),
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceManualSubscopesByScopeKey(locale),
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceAiSuggestedScopesKey(locale),
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectScopeSnapshotKey(locale),
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceComponentSlugsKey(locale)
    ];
}
function readJson(key) {
    try {
        const raw = window.sessionStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
    } catch  {
        return null;
    }
}
function splitComponents(locale) {
    const projectSlugs = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectComponentsCatalog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readProjectComponentSlugs"])(locale));
    const { components } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readServiceComponentsPayload"])(locale);
    const projectLevel = {};
    const serviceLevel = {};
    for (const [slug, value] of Object.entries(components || {})){
        if (projectSlugs.has(slug)) projectLevel[slug] = value;
        else serviceLevel[slug] = value;
    }
    return {
        projectLevel,
        serviceLevel
    };
}
function saveActiveServiceSession(locale) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    const uuid = undefined;
    const values = undefined;
    const key = undefined;
    const session = undefined;
}
function activateServiceSession(locale, projectServiceUuid, seed = {}) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    const saved = undefined;
    const projectLevel = undefined;
}
function readPrimaryProjectServiceUuid(locale) {
    if ("TURBOPACK compile-time truthy", 1) return '';
    //TURBOPACK unreachable
    ;
}
function writePrimaryProjectServiceUuid(locale, uuid) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function readServiceFlow(locale) {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
    const flow = undefined;
}
function startServiceFlow(locale, flow, seed = {}) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function beginServiceAdd(locale, returnStepId) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function serviceSessionSeed(locale, service) {
    return {
        [__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceIdsKey(locale)]: JSON.stringify(service.serviceId),
        [__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceIsOtherKey(locale)]: service.isOther ? '1' : '0',
        ...service.isOther ? {} : {
            [__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceLabelKey(locale)]: service.name
        },
        ...service.prompt ? {
            [__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].servicePromptKey(locale)]: service.prompt
        } : {}
    };
}
function finishServiceFlow(locale) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    const primary = undefined;
}
function promoteServiceToPrimary(locale, removedUuid, nextUuid, seed = {}) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function forgetServiceSession(locale, projectServiceUuid) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function latestSavedSessionDeliverableDay(locale) {
    if ("TURBOPACK compile-time truthy", 1) return 0;
    //TURBOPACK unreachable
    ;
    const prefix = undefined;
    const active = undefined;
    let latest;
}
}),
"[project]/components/project/projectDeliverables.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELIVERABLE_STAGE_SLUG",
    ()=>DELIVERABLE_STAGE_SLUG,
    "DUE_UNITS",
    ()=>DUE_UNITS,
    "DUE_UNIT_DAYS",
    ()=>DUE_UNIT_DAYS,
    "MAX_DELIVERABLES",
    ()=>MAX_DELIVERABLES,
    "createDeliverable",
    ()=>createDeliverable,
    "dayLabel",
    ()=>dayLabel,
    "defaultDeliverableTitle",
    ()=>defaultDeliverableTitle,
    "deliverableWayLabel",
    ()=>deliverableWayLabel,
    "dueLabel",
    ()=>dueLabel,
    "dueUnitHint",
    ()=>dueUnitHint,
    "dueUnitLabel",
    ()=>dueUnitLabel,
    "durationLabel",
    ()=>durationLabel,
    "inferDueUnit",
    ()=>inferDueUnit,
    "latestDeliverableDay",
    ()=>latestDeliverableDay,
    "readDeliverables",
    ()=>readDeliverables,
    "writeDeliverables",
    ()=>writeDeliverables
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectSchedule.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsPayload.ts [app-ssr] (ecmascript)");
;
;
const DELIVERABLE_STAGE_SLUG = 'deliverable-stage';
const MAX_DELIVERABLES = 10;
const WAYS = [
    'on_platform',
    'session',
    'physical_workshop'
];
function toWay(value) {
    return WAYS.includes(value) ? value : 'on_platform';
}
function toPeriodDays(value) {
    const days = Math.round(Number(value));
    return Number.isFinite(days) && days >= 0 ? days : 0;
}
function toReportTypes(value) {
    if (!Array.isArray(value)) return [
        'pdf'
    ];
    const types = value.map((item)=>String(item || '').trim().toLowerCase()).filter(Boolean);
    return types.length > 0 ? Array.from(new Set(types)) : [
        'pdf'
    ];
}
function defaultDeliverableTitle(locale, index) {
    if (locale === 'ar') {
        if (index === 0) return 'المسودة الأولى';
        if (index === 1) return 'النسخة النهائية';
        return `المخرج ${index + 1}`;
    }
    if (index === 0) return 'First draft';
    if (index === 1) return 'Final version';
    return `Deliverable ${index + 1}`;
}
function createDeliverable() {
    return {
        title: '',
        period_days: null,
        report_type: [],
        way: {
            selected: null,
            address: null
        }
    };
}
function normalizeDeliverable(value, locale, index) {
    const raw = value && typeof value === 'object' ? value : {};
    const way = raw.way && typeof raw.way === 'object' ? raw.way : {};
    const selected = toWay(way.selected);
    return {
        title: String(raw.title || '').trim() || defaultDeliverableTitle(locale, index),
        period_days: toPeriodDays(raw.period_days),
        report_type: toReportTypes(raw.report_type),
        way: {
            selected,
            address: selected === 'physical_workshop' ? String(way.address || '') : null
        }
    };
}
/** Converts the pre-phase-2 `{ first_draft, final_version }` shape (absolute dates). */ function fromLegacyStages(raw, locale) {
    const stages = [
        raw.first_draft,
        raw.final_version
    ];
    const today = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["todayIsoDate"])();
    return stages.map((stage, index)=>{
        if (!stage || typeof stage !== 'object') return null;
        const legacyWay = stage.way || {};
        const selected = Number(legacyWay.physical_workshop?.selected) > 0 ? 'physical_workshop' : Number(legacyWay.session?.selected) > 0 ? 'session' : 'on_platform';
        return {
            title: defaultDeliverableTitle(locale, index),
            period_days: stage.date ? Math.max(0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["diffIsoDays"])(today, String(stage.date))) : 0,
            report_type: toReportTypes(stage.report_type),
            way: {
                selected,
                address: selected === 'physical_workshop' ? String(legacyWay.physical_workshop?.address || '') : null
            }
        };
    }).filter((item)=>Boolean(item));
}
function readDeliverables(locale) {
    const raw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readServiceComponentPayloadValue"])(locale, DELIVERABLE_STAGE_SLUG);
    if (raw && Array.isArray(raw.deliverables) && raw.deliverables.length > 0) {
        return raw.deliverables.map((item, index)=>normalizeDeliverable(item, locale, index));
    }
    if (raw && (raw.first_draft || raw.final_version)) {
        const legacy = fromLegacyStages(raw, locale);
        if (legacy.length > 0) return legacy;
    }
    return [];
}
function writeDeliverables(locale, deliverables) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateServiceComponentPayload"])(locale, DELIVERABLE_STAGE_SLUG, {
        deliverables: deliverables.map((item, index)=>normalizeDeliverable(item, locale, index))
    });
}
function latestDeliverableDay(deliverables) {
    return deliverables.reduce((max, item)=>Math.max(max, item.period_days), 0);
}
function deliverableWayLabel(locale, way) {
    const labels = {
        on_platform: {
            en: 'On platform',
            ar: 'على المنصة'
        },
        session: {
            en: 'Online session',
            ar: 'جلسة أونلاين'
        },
        physical_workshop: {
            en: 'In-person workshop',
            ar: 'ورشة حضورية'
        }
    };
    const label = labels[way];
    if (!label) return way;
    return locale === 'ar' ? label.ar : label.en;
}
function dayLabel(locale, days) {
    if (locale === 'ar') {
        if (days === 0) return 'يوم البدء';
        if (days === 1) return 'بعد يوم';
        if (days === 2) return 'بعد يومين';
        return days <= 10 ? `بعد ${days} أيام` : `بعد ${days} يومًا`;
    }
    if (days === 0) return 'Start day';
    return days === 1 ? '1 Day' : `${days} Days`;
}
const DUE_UNITS = [
    'days',
    'weeks',
    'months'
];
const DUE_UNIT_DAYS = {
    days: 1,
    weeks: 7,
    months: 30
};
function inferDueUnit(days) {
    if (days !== null && days > 0 && days % DUE_UNIT_DAYS.months === 0) return 'months';
    if (days !== null && days > 0 && days % DUE_UNIT_DAYS.weeks === 0) return 'weeks';
    return 'days';
}
function dueUnitLabel(locale, unit) {
    const labels = {
        days: [
            'Days',
            'أيام'
        ],
        weeks: [
            'Weeks',
            'أسابيع'
        ],
        months: [
            'Months',
            'أشهر'
        ]
    }[unit];
    return locale === 'ar' ? labels[1] : labels[0];
}
function dueUnitHint(locale, unit) {
    if (locale === 'ar') return ({
        days: 'يوم بعد البدء',
        weeks: 'أسبوع بعد البدء',
        months: 'شهر بعد البدء'
    })[unit];
    return `${unit} after start`;
}
function dueLabel(locale, days, unit) {
    const size = DUE_UNIT_DAYS[unit];
    if (unit === 'days' || days === 0 || days % size !== 0) return dayLabel(locale, days);
    const count = days / size;
    if (locale === 'ar') {
        const [one, two, few, many] = unit === 'weeks' ? [
            'أسبوع',
            'أسبوعين',
            'أسابيع',
            'أسبوعًا'
        ] : [
            'شهر',
            'شهرين',
            'أشهر',
            'شهرًا'
        ];
        if (count === 1) return `بعد ${one}`;
        if (count === 2) return `بعد ${two}`;
        return count <= 10 ? `بعد ${count} ${few}` : `بعد ${count} ${many}`;
    }
    if (unit === 'weeks') return count === 1 ? '1 Week' : `${count} Weeks`;
    return count === 1 ? '1 Month' : `${count} Months`;
}
function durationLabel(locale, days) {
    if (locale === 'ar') {
        if (days === 0) return 'نفس اليوم';
        if (days === 1) return 'يوم واحد';
        if (days === 2) return 'يومان';
        return days <= 10 ? `${days} أيام` : `${days} يومًا`;
    }
    return days === 1 ? '1 Day' : `${days} Days`;
}
}),
"[project]/components/project/questions/service-components/deliverableReportTypes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getReportTypeOptions",
    ()=>getReportTypeOptions,
    "normalizeReportTypes",
    ()=>normalizeReportTypes
]);
const ALLOWED_REPORT_TYPES = [
    'pdf',
    'docx',
    'xlsx',
    'pptx'
];
const REPORT_TYPE_ICONS = {
    pdf: 'https://res.cloudinary.com/dsiku9ipv/image/upload/v1781525110/pdf_136522_urotaw.png',
    docx: 'https://res.cloudinary.com/dsiku9ipv/image/upload/v1781104177/Microsoft_Office_Word__2025_present_1_sywxfd.png',
    xlsx: 'https://res.cloudinary.com/dsiku9ipv/image/upload/v1781104176/Microsoft_Office_Excel__2025_present_1_scjtip.png',
    pptx: 'https://res.cloudinary.com/dsiku9ipv/image/upload/v1781104175/Microsoft_Office_PowerPoint__2025_present_1_ofrkfx.png'
};
function getReportTypeOptions(_locale) {
    const isRTL = _locale === 'ar';
    return [
        {
            value: 'pdf',
            label: isRTL ? 'ملف PDF' : 'PDF Report',
            iconSrc: REPORT_TYPE_ICONS.pdf
        },
        {
            value: 'docx',
            label: isRTL ? 'مستند Word' : 'Word Document',
            iconSrc: REPORT_TYPE_ICONS.docx
        },
        {
            value: 'xlsx',
            label: isRTL ? 'جدول Excel' : 'Excel Sheet',
            iconSrc: REPORT_TYPE_ICONS.xlsx
        },
        {
            value: 'pptx',
            label: isRTL ? 'عرض Power Point' : 'Power Point',
            iconSrc: REPORT_TYPE_ICONS.pptx
        }
    ];
}
function normalizeReportTypes(value) {
    const allowed = new Set(ALLOWED_REPORT_TYPES);
    const sanitize = (items)=>items.map((item)=>String(item || '').trim().toLowerCase()).filter((item)=>Boolean(item) && allowed.has(item)).filter((item, index, arr)=>arr.indexOf(item) === index);
    if (Array.isArray(value)) return sanitize(value);
    if (typeof value === 'string') {
        const trimmed = value.trim();
        if (!trimmed) return [];
        try {
            const parsed = JSON.parse(trimmed);
            if (Array.isArray(parsed)) return sanitize(parsed);
            if (typeof parsed === 'string') return sanitize([
                parsed
            ]);
        } catch  {
            return sanitize([
                trimmed
            ]);
        }
    }
    return [];
}
}),
"[project]/components/project/questions/ProjectServicesReview.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DeliverablesReviewTable",
    ()=>DeliverablesReviewTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectDeliverables.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectSchedule.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$service$2d$components$2f$deliverableReportTypes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/service-components/deliverableReportTypes.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function DeliverablesReviewTable({ locale, deliverables, plannedStartDate }) {
    const ar = locale === 'ar';
    const formats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$service$2d$components$2f$deliverableReportTypes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getReportTypeOptions"])(ar ? 'ar' : 'en');
    const methods = [
        {
            value: 'on_platform',
            label: ar ? 'على المنصة' : 'On the platform',
            bg: '#E5F5EE',
            fg: '#0E7A4E'
        },
        {
            value: 'session',
            label: ar ? 'جلسة' : 'Session',
            bg: '#E6F1FA',
            fg: '#1C6FA8'
        },
        {
            value: 'physical_workshop',
            label: ar ? 'ورشة حضورية' : 'In-person workshop',
            bg: '#FDF1E3',
            fg: '#A85A0C'
        }
    ];
    const methodFor = (item)=>methods.find((m)=>m.value === item.way?.selected) || methods[0];
    const dueDate = (item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "block",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dayLabel"])(locale, item.period_days)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                    lineNumber: 40,
                    columnNumber: 7
                }, this),
                plannedStartDate ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "mt-1 block text-xs text-slate-500",
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatIsoDate"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addDaysToIsoDate"])(plannedStartDate, item.period_days), locale)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                    lineNumber: 41,
                    columnNumber: 27
                }, this) : null
            ]
        }, void 0, true, {
            fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
            lineNumber: 39,
            columnNumber: 5
        }, this);
    const hasWorkshop = deliverables.some((item)=>item.way?.selected === 'physical_workshop');
    const cell = 'border-b border-e border-[#D0D4E4]';
    const th = `${cell} h-10 px-3 text-center text-[13px] font-medium text-[#676879]`;
    const formatIcons = (item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-wrap justify-center gap-1.5",
            children: formats.filter((format)=>item.report_type?.includes(format.value)).map((format)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    title: format.label,
                    className: "flex h-7 items-center gap-1.5 rounded-md border border-[#C3C6D4] bg-white px-2 text-[12px] font-medium text-[#323338]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: format.iconSrc,
                            alt: "",
                            className: "h-4 w-4 object-contain"
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                            lineNumber: 61,
                            columnNumber: 13
                        }, this),
                        format.value.toUpperCase()
                    ]
                }, format.value, true, {
                    fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                    lineNumber: 56,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
            lineNumber: 52,
            columnNumber: 5
        }, this);
    const methodPill = (item)=>{
        const method = methodFor(item);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            style: {
                backgroundColor: method.bg,
                color: method.fg
            },
            className: "inline-flex rounded-full px-3 py-1 text-[13px] font-medium",
            children: method.label
        }, void 0, false, {
            fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
            lineNumber: 70,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden overflow-x-auto rounded-lg border border-[#D0D4E4] bg-white lg:block",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full min-w-[760px] table-fixed border-separate border-spacing-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("colgroup", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("col", {}, void 0, false, {
                                    fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("col", {
                                    className: "w-[130px]"
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("col", {
                                    className: "w-[230px]"
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                    lineNumber: 86,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("col", {
                                    className: "w-[170px]"
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                    lineNumber: 87,
                                    columnNumber: 13
                                }, this),
                                hasWorkshop ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("col", {
                                    className: "w-[180px]"
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                    lineNumber: 88,
                                    columnNumber: 28
                                }, this) : null
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: `${th} ps-5 text-start`,
                                        children: ar ? 'المخرج' : 'Deliverable'
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                        lineNumber: 92,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: th,
                                        children: ar ? 'موعد التسليم' : 'Due date'
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                        lineNumber: 93,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: th,
                                        children: ar ? 'صيغ الملفات' : 'File formats'
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                        lineNumber: 94,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: `${th} ${hasWorkshop ? '' : 'border-e-0'}`,
                                        children: ar ? 'طريقة التسليم' : 'Delivery method'
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                        lineNumber: 95,
                                        columnNumber: 15
                                    }, this),
                                    hasWorkshop ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: `${th} border-e-0`,
                                        children: ar ? 'عنوان الورشة' : 'Workshop address'
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                        lineNumber: 99,
                                        columnNumber: 17
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                lineNumber: 91,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: deliverables.map((item, index)=>{
                                const last = index === deliverables.length - 1 ? 'border-b-0' : '';
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: `${cell} ${last} border-s-[6px] border-s-[#1C7CBB] px-4 py-2.5 text-sm font-medium text-[#323338]`,
                                            children: item.title
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                            lineNumber: 108,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: `${cell} ${last} px-3 text-center text-sm text-[#323338]`,
                                            children: dueDate(item)
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                            lineNumber: 111,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: `${cell} ${last} px-2 py-2`,
                                            children: formatIcons(item)
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                            lineNumber: 114,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: `${cell} ${last} ${hasWorkshop ? '' : 'border-e-0'} px-2 text-center`,
                                            children: methodPill(item)
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                            lineNumber: 115,
                                            columnNumber: 19
                                        }, this),
                                        hasWorkshop ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: `${cell} ${last} border-e-0 px-3 text-sm text-[#323338]`,
                                            children: item.way?.selected === 'physical_workshop' ? item.way.address : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "block text-center text-[#C3C6D4]",
                                                children: "—"
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                                lineNumber: 123,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                            lineNumber: 119,
                                            columnNumber: 21
                                        }, this) : null
                                    ]
                                }, index, true, {
                                    fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                    lineNumber: 107,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-3 md:grid-cols-2 lg:hidden",
                children: deliverables.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-hidden rounded-lg border border-[#D0D4E4] border-s-[6px] border-s-[#1C7CBB] bg-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-b border-[#D0D4E4] bg-[#FAFAFB] px-3.5 py-2.5 text-sm font-semibold text-[#323338]",
                                children: item.title
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                lineNumber: 140,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                className: "space-y-2.5 px-3.5 py-3 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                className: "text-xs font-semibold text-slate-500",
                                                children: ar ? 'موعد التسليم' : 'Due date'
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                                lineNumber: 145,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                className: "text-[#323338]",
                                                children: dueDate(item)
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                                lineNumber: 146,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                        lineNumber: 144,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                className: "text-xs font-semibold text-slate-500",
                                                children: ar ? 'طريقة التسليم' : 'Delivery method'
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                                lineNumber: 149,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                children: methodPill(item)
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                                lineNumber: 150,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                        lineNumber: 148,
                                        columnNumber: 15
                                    }, this),
                                    item.way?.selected === 'physical_workshop' && item.way.address ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start justify-between gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                className: "text-xs font-semibold text-slate-500",
                                                children: ar ? 'عنوان الورشة' : 'Workshop address'
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                                lineNumber: 154,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                className: "text-end text-[#323338]",
                                                children: item.way.address
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                                lineNumber: 155,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                        lineNumber: 153,
                                        columnNumber: 17
                                    }, this) : null,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                className: "mb-1.5 text-xs font-semibold text-slate-500",
                                                children: ar ? 'صيغ الملفات' : 'File formats'
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                                lineNumber: 159,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                className: "[&>div]:justify-start",
                                                children: formatIcons(item)
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                                lineNumber: 160,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                        lineNumber: 158,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                                lineNumber: 143,
                                columnNumber: 13
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectServicesReview.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/components/project/projectLabels.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "projectTypeLabel",
    ()=>projectTypeLabel
]);
function projectTypeLabel(locale, projectTypeId) {
    const isArabic = locale === 'ar';
    if (!projectTypeId) return null;
    const normalized = projectTypeId === 'framework' ? 'frame_work_agreement' : projectTypeId === 'urgent' ? 'urgent_request' : projectTypeId;
    const map = {
        ad_hoc: {
            en: 'Ad hoc',
            ar: 'Ad hoc'
        },
        frame_work_agreement: {
            en: 'Framework agreement',
            ar: 'Framework agreement'
        },
        urgent_request: {
            en: 'Urgent request',
            ar: 'Urgent request'
        }
    };
    const label = map[normalized];
    if (!label) return projectTypeId;
    return isArabic ? label.ar : label.en;
}
}),
"[project]/components/project/projectDescriptionState.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fileMetaFromFile",
    ()=>fileMetaFromFile,
    "mergeProjectDescriptionFiles",
    ()=>mergeProjectDescriptionFiles,
    "readProjectDescriptionState",
    ()=>readProjectDescriptionState,
    "writeProjectDescriptionState",
    ()=>writeProjectDescriptionState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
;
function sanitizeFileMeta(input) {
    if (!Array.isArray(input)) return [];
    return input.map((item)=>{
        const raw = item;
        const name = String(raw.name || '').trim();
        const size = Number(raw.size);
        const type = String(raw.type || '').trim();
        if (!name) return null;
        return {
            name,
            size: Number.isFinite(size) && size >= 0 ? size : 0,
            type
        };
    }).filter((item)=>Boolean(item));
}
function sanitizeProjectDescriptionState(input) {
    const raw = input && typeof input === 'object' ? input : {};
    return {
        description: String(raw.description || '').trim(),
        files: sanitizeFileMeta(raw.files)
    };
}
function fileMetaFromFile(file) {
    return {
        name: file.name,
        size: Number.isFinite(file.size) ? file.size : 0,
        type: file.type || ''
    };
}
function mergeProjectDescriptionFiles(current, next) {
    const merged = [
        ...current
    ];
    next.forEach((file)=>{
        const exists = merged.some((item)=>item.name === file.name && item.size === file.size && item.type === file.type);
        if (!exists) merged.push(file);
    });
    return merged;
}
function readProjectDescriptionState(locale) {
    if ("TURBOPACK compile-time truthy", 1) {
        return {
            description: '',
            files: []
        };
    }
    //TURBOPACK unreachable
    ;
}
function writeProjectDescriptionState(locale, state) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    const sanitized = undefined;
}
}),
"[project]/components/project/useProjectStepErrorToast.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useProjectStepErrorToast",
    ()=>useProjectStepErrorToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/toast/ToastContext.tsx [app-ssr] (ecmascript)");
'use client';
;
;
function useProjectStepErrorToast(errorMessage, locale) {
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const lastShownErrorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const normalizedError = String(errorMessage || '').trim();
        if (!normalizedError) {
            lastShownErrorRef.current = null;
            return;
        }
        if (lastShownErrorRef.current === normalizedError) return;
        toast.error(normalizedError, locale === 'ar' ? 'خطأ' : 'Error', 10000);
        lastShownErrorRef.current = normalizedError;
    }, [
        errorMessage,
        locale,
        toast
    ]);
}
}),
"[project]/components/project/useProjectWizardNavigation.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useProjectWizardNavigation",
    ()=>useProjectWizardNavigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectWizardFlow.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const reviewReturnParam = 'returnTo';
function useProjectWizardNavigation(locale) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ensureProjectWizardStorageForLocale"])(locale);
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const currentStep = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeProjectWizardStepId"])(String(params?.step || ''));
    const isRTL = locale === 'ar';
    const isReviewEditMode = currentStep !== __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectReview && searchParams?.get(reviewReturnParam) === __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectReview;
    const [stepOrder, setStepOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectWizardStepOrder"])(locale));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setStepOrder((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectWizardStepOrder"])(locale));
    }, [
        currentStep,
        locale
    ]);
    const index = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>stepOrder.indexOf(currentStep), [
        currentStep,
        stepOrder
    ]);
    // Catalog loading is a routing step, so Back returns to the last question.
    const prevStepId = index > 0 ? stepOrder.slice(0, index).reverse().find((step)=>step !== __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].componentSetup) ?? null : null;
    const nextStepId = index >= 0 && index < stepOrder.length - 1 ? stepOrder[index + 1] : null;
    const baseHrefFor = (stepId)=>`/${locale}/project/wizard/${stepId}`;
    const reviewHref = baseHrefFor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectReview);
    const withReviewReturn = (href)=>`${href}${href.includes('?') ? '&' : '?'}${reviewReturnParam}=${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectReview}`;
    const hrefFor = (stepId)=>{
        const href = baseHrefFor(stepId);
        if (isReviewEditMode && stepId !== __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectReview) {
            return withReviewReturn(href);
        }
        return href;
    };
    const editHrefFor = (stepId)=>withReviewReturn(baseHrefFor(stepId));
    const inServiceFlow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isServiceFlowActive"])(locale);
    const backHref = isReviewEditMode ? reviewHref : prevStepId ? hrefFor(prevStepId) : inServiceFlow ? baseHrefFor((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readServiceFlowReturnStepId"])(locale)) : `/${locale}/project`;
    const nextHref = isReviewEditMode ? reviewHref : nextStepId ? hrefFor(nextStepId) : null;
    const continueLabel = isReviewEditMode ? isRTL ? 'العودة إلى الملخص' : 'Return to summary' : isRTL ? 'متابعة' : 'Continue';
    const goNext = ()=>{
        if (isReviewEditMode) {
            router.push(reviewHref);
            return;
        }
        const freshStepOrder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectWizardStepOrder"])(locale);
        const freshIndex = freshStepOrder.indexOf(currentStep);
        const freshNextStepId = freshIndex >= 0 && freshIndex < freshStepOrder.length - 1 ? freshStepOrder[freshIndex + 1] : null;
        if (!freshNextStepId) return;
        setStepOrder(freshStepOrder);
        router.push(hrefFor(freshNextStepId));
    };
    const goBack = ()=>{
        router.push(backHref);
    };
    return {
        currentStep,
        isReviewEditMode,
        stepOrder,
        prevStepId,
        nextStepId,
        backHref,
        nextHref,
        continueLabel,
        goNext,
        goBack,
        hrefFor,
        editHrefFor
    };
}
}),
"[project]/components/project/questions/ProjectReviewStep.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SectionBlock",
    ()=>SectionBlock,
    "default",
    ()=>ProjectReviewStep
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectDefinitionMode.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$BriefcaseIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BriefcaseIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/solid/esm/BriefcaseIcon.js [app-ssr] (ecmascript) <export default as BriefcaseIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$ClipboardDocumentListIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardDocumentListIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/solid/esm/ClipboardDocumentListIcon.js [app-ssr] (ecmascript) <export default as ClipboardDocumentListIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$DocumentTextIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentTextIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/solid/esm/DocumentTextIcon.js [app-ssr] (ecmascript) <export default as DocumentTextIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$GlobeAltIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GlobeAltIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/solid/esm/GlobeAltIcon.js [app-ssr] (ecmascript) <export default as GlobeAltIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectPropertiesSync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectPropertiesSync.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectRequestUuid.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/specifiedInsighterProject.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceSessions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectServiceSessions.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ProjectServicesReview$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/ProjectServicesReview.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectAddonsState.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectDeliverables.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectSchedule.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectServiceUuid.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectLabels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectLabels.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDescriptionState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectDescriptionState.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsPayload.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectWizardFlow.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectStepErrorToast.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectWizardNavigation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
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
const sectionIcons = [
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$ClipboardDocumentListIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardDocumentListIcon$3e$__["ClipboardDocumentListIcon"],
        className: 'bg-sky-50 text-sky-500'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$BriefcaseIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BriefcaseIcon$3e$__["BriefcaseIcon"],
        className: 'bg-amber-50 text-amber-500'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$DocumentTextIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentTextIcon$3e$__["DocumentTextIcon"],
        className: 'bg-emerald-50 text-emerald-500'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$GlobeAltIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GlobeAltIcon$3e$__["GlobeAltIcon"],
        className: 'bg-violet-50 text-violet-500'
    }
];
const fileTypeIconMap = {
    pdf: '/file-icons/pdf.svg',
    doc: '/file-icons/doc.svg',
    docx: '/file-icons/docx.svg',
    xls: '/file-icons/xls.svg',
    xlsx: '/file-icons/xlsx.svg',
    ppt: '/file-icons/ppt.svg',
    pptx: '/file-icons/pptx.svg',
    csv: '/file-icons/csv.svg',
    txt: '/file-icons/txt.svg',
    zip: '/file-icons/zip.svg',
    rar: '/file-icons/zip.svg',
    jpg: '/file-icons/jpg.svg',
    jpeg: '/file-icons/jpg.svg',
    mp3: '/file-icons/mp3.svg',
    mp4: '/file-icons/mp4.svg',
    pub: '/file-icons/pub.svg'
};
function readStorageValue(locale, key) {
    if ("TURBOPACK compile-time truthy", 1) return '';
    //TURBOPACK unreachable
    ;
}
function safeParseNumberArray(value) {
    if (!value) return [];
    try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) return [];
        return parsed.map((item)=>Number(item)).filter((item)=>Number.isFinite(item));
    } catch  {
        return [];
    }
}
function parseStringArray(value) {
    if (!value) return [];
    try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) return [];
        return parsed.map((item)=>String(item || '').trim()).filter(Boolean);
    } catch  {
        return [
            String(value || '').trim()
        ].filter(Boolean);
    }
}
function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
    const units = [
        'B',
        'KB',
        'MB',
        'GB'
    ];
    let value = bytes;
    let unitIndex = 0;
    while(value >= 1024 && unitIndex < units.length - 1){
        value /= 1024;
        unitIndex += 1;
    }
    return `${value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}
function formatRange(min, max, locale) {
    if (min && max) return locale === 'ar' ? `${min} إلى ${max}` : `${min} to ${max}`;
    if (min) return locale === 'ar' ? `من ${min}` : `From ${min}`;
    if (max) return locale === 'ar' ? `حتى ${max}` : `Up to ${max}`;
    return locale === 'ar' ? 'غير محدد' : 'Not specified';
}
function normalizeValue(value) {
    return String(value || '').trim().toLowerCase();
}
function stringifyValue(value) {
    if (value === null || value === undefined) return '';
    return String(value).trim();
}
function humanizeSlug(slug) {
    return slug.split('-').map((part)=>part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}
function getDisplayName(locale, value) {
    const localizedName = value.names || (value.name && typeof value.name === 'object' ? value.name : null);
    const plainName = typeof value.name === 'string' ? value.name : '';
    if (locale === 'ar') {
        return localizedName?.ar || plainName || localizedName?.en || '';
    }
    return localizedName?.en || plainName || localizedName?.ar || '';
}
function getFileIconByExtension(extension) {
    return fileTypeIconMap[normalizeValue(extension)] || fileTypeIconMap.txt;
}
function formatProjectPhase(locale, value) {
    const normalized = normalizeValue(value);
    if (normalized === 'idea stage' || normalized === 'idea' || normalized === 'idea_stage' || normalized === 'مرحلة الفكرة') {
        return locale === 'ar' ? 'مرحلة الفكرة' : 'Idea stage';
    }
    if (normalized === 'expansion' || normalized === 'التوسع') {
        return locale === 'ar' ? 'التوسع' : 'Expansion';
    }
    if (normalized === 'implementation' || normalized === 'التنفيذ') {
        return locale === 'ar' ? 'التنفيذ' : 'Implementation';
    }
    return stringifyValue(value);
}
function formatBusinessType(locale, value) {
    const normalized = normalizeValue(value);
    const labels = {
        entrepreneur: {
            en: 'Entrepreneur',
            ar: 'رائد أعمال'
        },
        'رائد أعمال': {
            en: 'Entrepreneur',
            ar: 'رائد أعمال'
        },
        startup: {
            en: 'Startup',
            ar: 'شركة ناشئة'
        },
        'شركة ناشئة': {
            en: 'Startup',
            ar: 'شركة ناشئة'
        },
        sme: {
            en: 'SME',
            ar: 'شركة صغيرة/متوسطة'
        },
        'شركة صغيرة/متوسطة': {
            en: 'SME',
            ar: 'شركة صغيرة/متوسطة'
        },
        company: {
            en: 'Company',
            ar: 'شركة'
        },
        'شركة': {
            en: 'Company',
            ar: 'شركة'
        },
        organization: {
            en: 'Organization',
            ar: 'منظمة'
        },
        'منظمة': {
            en: 'Organization',
            ar: 'منظمة'
        },
        government: {
            en: 'Government',
            ar: 'حكومة'
        },
        'حكومة': {
            en: 'Government',
            ar: 'حكومة'
        }
    };
    const match = labels[normalized];
    if (!match) return stringifyValue(value);
    return locale === 'ar' ? match.ar : match.en;
}
function formatPreferredInsighterType(locale, value) {
    const normalized = normalizeValue(value);
    if (normalized === 'individual' || normalized === 'فرد') {
        return locale === 'ar' ? 'فرد' : 'Individual';
    }
    if (normalized === 'company' || normalized === 'شركة') {
        return locale === 'ar' ? 'شركة' : 'Company';
    }
    if (normalized === 'either' || normalized === 'any' || normalized === 'كلاهما' || normalized === 'أيهما' || normalized === 'لا مانع') {
        return locale === 'ar' ? 'كلاهما' : 'Any';
    }
    return stringifyValue(value);
}
function normalizeProjectComponents(components) {
    if (!Array.isArray(components)) return {
        components: {}
    };
    return {
        components: components.reduce((acc, item)=>{
            if (!item || typeof item !== 'object') return acc;
            for (const [slug, value] of Object.entries(item)){
                acc[slug] = value;
            }
            return acc;
        }, {})
    };
}
function getTargetMarketLabels(locale, value) {
    if (!value || typeof value !== 'object') return [];
    const raw = value;
    const objects = Array.isArray(raw.objects) ? raw.objects : [];
    return objects.map((item)=>{
        if (!item || typeof item !== 'object') return stringifyValue(item);
        return getDisplayName(locale, item);
    }).filter(Boolean);
}
function getReportTypes(value) {
    if (Array.isArray(value)) {
        return value.map((item)=>stringifyValue(item).toLowerCase()).filter(Boolean);
    }
    const singleValue = stringifyValue(value).toLowerCase();
    return singleValue ? [
        singleValue
    ] : [];
}
function getDataSourceValues(locale, value) {
    const fallback = [
        locale === 'ar' ? 'لا يهم' : "Doesn't matter"
    ];
    const normalizedValue = normalizeValue(value);
    if (normalizedValue === 'primary_and_secondary_data' || normalizedValue === 'both' || normalizedValue === 'primary_secondary') {
        return [
            locale === 'ar' ? 'بيانات أولية وثانوية' : 'Primary and secondary data'
        ];
    }
    if (normalizedValue === 'primary_data') {
        return [
            locale === 'ar' ? 'بيانات أولية' : 'Primary data'
        ];
    }
    if (normalizedValue === 'secondary_data') {
        return [
            locale === 'ar' ? 'بيانات ثانوية' : 'Secondary data'
        ];
    }
    if (!value || typeof value !== 'object') return fallback;
    const raw = value;
    const primary = raw.primary_data && typeof raw.primary_data === 'object' ? Number(raw.primary_data.required) : 0;
    const secondary = raw.secondary_data && typeof raw.secondary_data === 'object' ? Number(raw.secondary_data.required) : 0;
    if (primary > 0 && secondary > 0) {
        return [
            locale === 'ar' ? 'بيانات أولية وثانوية' : 'Primary and secondary data'
        ];
    }
    if (primary > 0) {
        return [
            locale === 'ar' ? 'بيانات أولية' : 'Primary data'
        ];
    }
    if (secondary > 0) {
        return [
            locale === 'ar' ? 'بيانات ثانوية' : 'Secondary data'
        ];
    }
    return fallback;
}
async function fetchList(path, locale) {
    const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(path), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Accept-Language': locale === 'ar' ? 'ar' : 'en'
        },
        cache: 'no-store'
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res);
    const json = await res.json();
    return json.data || [];
}
async function fetchProjectRequest(locale, projectUuid) {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
    if (!token) return null;
    const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/account/project/show/${projectUuid}`), {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Accept-Language': locale === 'ar' ? 'ar' : 'en'
        },
        cache: 'no-store'
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res);
    const json = await res.json();
    if (json.data?.definition_mode === 'simple' || json.data?.definition_mode === 'advanced') (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storeDefinitionMode"])(locale, json.data.definition_mode);
    return json.data || null;
}
function isOtherService(service) {
    if (!service) return false;
    const slug = String(service.slug || '').trim().toLowerCase();
    const name = String(service.name || '').trim().toLowerCase();
    const otherWord = /\bothers?\b/i;
    if (slug === 'other' || slug === 'others') return true;
    if (otherWord.test(slug)) return true;
    if (name === 'other' || name === 'others') return true;
    if (otherWord.test(name)) return true;
    if (name.includes('أخرى') || name.includes('اخرى')) return true;
    return false;
}
function getComponentTitle(locale, slug) {
    const map = {
        'deliverable-stage': {
            en: 'Deliverable stage',
            ar: 'مرحلة المخرجات'
        },
        'deliverable-type-first-draft': {
            en: 'Deliverable type (first draft)',
            ar: 'نوع المخرجات (المسودة الأولى)'
        },
        'deliverable-type-final-version': {
            en: 'Deliverable type (final version)',
            ar: 'نوع المخرجات (النسخة النهائية)'
        },
        'data-sources-expected': {
            en: 'Expected data sources',
            ar: 'مصادر البيانات المتوقعة'
        }
    };
    const label = map[slug];
    if (!label) return humanizeSlug(slug);
    return locale === 'ar' ? label.ar : label.en;
}
function getDeliverableWayLabel(locale, value) {
    const labels = {
        on_platform: {
            en: 'On platform',
            ar: 'على المنصة'
        },
        session: {
            en: 'Session',
            ar: 'جلسة'
        },
        physical_workshop: {
            en: 'Physical workshop',
            ar: 'ورشة حضورية'
        }
    };
    const match = labels[value];
    if (!match) return stringifyValue(value);
    return locale === 'ar' ? match.ar : match.en;
}
function resolveDeliverableWay(value) {
    const raw = value && typeof value === 'object' ? value : {};
    const way = raw.way && typeof raw.way === 'object' ? raw.way : {};
    const selected = stringifyValue(way.selected);
    if (selected) {
        return {
            key: selected,
            address: stringifyValue(way.address)
        };
    }
    const onPlatform = way.on_platform && typeof way.on_platform === 'object' ? Number(way.on_platform.selected) : 0;
    const session = way.session && typeof way.session === 'object' ? Number(way.session.selected) : 0;
    const workshop = way.physical_workshop && typeof way.physical_workshop === 'object' ? way.physical_workshop : {};
    if (Number(workshop.selected) > 0) {
        return {
            key: 'physical_workshop',
            address: String(workshop.address || '').trim()
        };
    }
    if (session > 0) return {
        key: 'session',
        address: ''
    };
    if (onPlatform > 0) return {
        key: 'on_platform',
        address: ''
    };
    return {
        key: 'on_platform',
        address: ''
    };
}
function buildServiceComponentSections(params) {
    const { locale, slugs, payload, plannedStartDate } = params;
    return slugs.filter((slug)=>slug !== 'target-market').map((slug)=>{
        const payloadValue = payload.components?.[slug];
        if (slug === 'deliverable-stage') {
            const raw = payloadValue && typeof payloadValue === 'object' ? payloadValue : {};
            const deliverables = Array.isArray(raw.deliverables) ? raw.deliverables : [];
            const notSpecified = locale === 'ar' ? 'غير محدد' : 'Not specified';
            if (deliverables.length === 0) return null;
            return {
                title: getComponentTitle(locale, slug),
                rows: deliverables.map((deliverable)=>{
                    const way = resolveDeliverableWay(deliverable);
                    const reportTypes = getReportTypes(deliverable.report_type);
                    const periodDays = Math.max(0, Math.round(Number(deliverable.period_days) || 0));
                    const when = plannedStartDate ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dayLabel"])(locale, periodDays)} · ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatIsoDate"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addDaysToIsoDate"])(plannedStartDate, periodDays), locale)}` : (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dayLabel"])(locale, periodDays);
                    return {
                        label: `${String(deliverable.title || '').trim() || notSpecified} — ${when}`,
                        value: [
                            getDeliverableWayLabel(locale, way.key),
                            ...way.address ? [
                                `${locale === 'ar' ? 'العنوان' : 'Address'}: ${way.address}`
                            ] : []
                        ],
                        fileTypes: reportTypes,
                        editStepId: 'deliverables-plan'
                    };
                })
            };
        }
        if (slug === 'data-sources-expected') {
            return {
                title: getComponentTitle(locale, slug),
                rows: [
                    {
                        label: locale === 'ar' ? 'الاختيار' : 'Selection',
                        value: getDataSourceValues(locale, payloadValue),
                        editStepId: 'data-sources-expected'
                    }
                ]
            };
        }
        const rawAnswer = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceComponentAnswerKey(locale, slug));
        const payloadValues = Array.isArray(payloadValue) ? payloadValue.map((item)=>stringifyValue(item)).filter(Boolean) : payloadValue !== null && payloadValue !== undefined && typeof payloadValue !== 'object' ? [
            stringifyValue(payloadValue)
        ].filter(Boolean) : [];
        const values = (payloadValues.length > 0 ? payloadValues : parseStringArray(rawAnswer)).map((item)=>slug.includes('deliverable-type') ? item.toUpperCase() : item);
        if (values.length === 0) return null;
        return {
            title: getComponentTitle(locale, slug),
            rows: [
                {
                    label: locale === 'ar' ? 'الإجابة' : 'Answer',
                    value: values,
                    editStepId: slug
                }
            ]
        };
    }).filter((section)=>Boolean(section));
}
function SectionBlock({ locale, plannedStartDate, title, rows, emptyText, toneIndex, isRTL, editLabel, editHrefFor }) {
    const sectionIcon = sectionIcons[toneIndex % sectionIcons.length];
    const Icon = sectionIcon.icon;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "border-t border-slate-200 pt-6 first:border-t-0 first:pt-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex h-9 w-9 items-center justify-center rounded-full ${sectionIcon.className}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                className: "h-[18px] w-[18px]",
                                strokeWidth: 1.35
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                lineNumber: 700,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                            lineNumber: 697,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-base font-semibold text-slate-900 sm:text-lg",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                lineNumber: 703,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                            lineNumber: 702,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                    lineNumber: 696,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                lineNumber: 695,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2 xl:grid-cols-3",
                children: rows.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: `min-w-0 ${rows.length === 1 || row.full ? 'sm:col-span-2 xl:col-span-3' : row.wide ? 'sm:col-span-2 xl:col-span-2' : ''}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-2 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs font-semibold text-slate-500",
                                        children: row.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 721,
                                        columnNumber: 15
                                    }, this),
                                    row.badge ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700",
                                        children: row.badge
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 723,
                                        columnNumber: 17
                                    }, this) : null,
                                    row.editStepId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: editHrefFor(row.editStepId),
                                        onClick: row.onEdit,
                                        title: `${editLabel}: ${row.label}`,
                                        "aria-label": `${editLabel}: ${row.label}`,
                                        className: "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "17",
                                            height: "17",
                                            viewBox: "0 0 17 17",
                                            fill: "none",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                "fill-rule": "evenodd",
                                                "clip-rule": "evenodd",
                                                d: "M9.83073 2.62588C10.6606 1.79601 12.0061 1.79601 12.8359 2.62588L14.3741 4.16408C15.204 4.99394 15.204 6.33941 14.3741 7.16928L6.87587 14.6675C6.74303 14.8004 6.56286 14.875 6.375 14.875H2.83333C2.44213 14.875 2.125 14.5579 2.125 14.1667V10.625C2.125 10.4371 2.19963 10.257 2.33247 10.1241L9.83073 2.62588ZM11.8342 3.62761C11.5576 3.35099 11.1091 3.35099 10.8325 3.62761L10.2101 4.25001L12.75 6.78994L13.3724 6.16754C13.649 5.89092 13.649 5.44243 13.3724 5.16581L11.8342 3.62761ZM11.7483 7.79168L9.20833 5.25174L3.54167 10.9184V13.4583H6.0816L11.7483 7.79168Z",
                                                fill: "#00A028"
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                lineNumber: 736,
                                                columnNumber: 1
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                            lineNumber: 735,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 728,
                                        columnNumber: 17
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                lineNumber: 720,
                                columnNumber: 13
                            }, this),
                            row.value.length > 0 || (row.fileTypes?.length ?? 0) > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    row.variant === 'requirement-summary' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        dir: "auto",
                                        className: "whitespace-pre-line break-words text-sm leading-6 text-slate-800",
                                        children: row.value[0]
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 746,
                                        columnNumber: 19
                                    }, this) : row.variant === 'deliverables-table' && row.deliverables ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ProjectServicesReview$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DeliverablesReviewTable"], {
                                        locale: locale || 'en',
                                        deliverables: row.deliverables,
                                        plannedStartDate: plannedStartDate
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 748,
                                        columnNumber: 19
                                    }, this) : row.variant === 'scope-table' && row.scopeGroups?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overflow-hidden rounded-xl border border-slate-200",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                            className: "w-full border-collapse text-sm",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                children: row.scopeGroups.map((group, groupIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    scope: "colgroup",
                                                                    className: `bg-white px-4 py-3 font-semibold text-slate-900 ${isRTL ? 'text-right' : 'text-left'} ${groupIndex > 0 ? 'border-t border-slate-200' : ''}`,
                                                                    children: group.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                                    lineNumber: 756,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                                lineNumber: 755,
                                                                columnNumber: 29
                                                            }, this),
                                                            group.subscopes.length > 0 ? group.subscopes.map((sub, subIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                    className: "border-t border-slate-200",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: `px-4 py-2.5 align-top leading-6 text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`,
                                                                        children: sub
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                                        lineNumber: 773,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                }, `${row.label}-${groupIndex}-${subIndex}`, false, {
                                                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                                    lineNumber: 769,
                                                                    columnNumber: 33
                                                                }, this)) : null
                                                        ]
                                                    }, `${row.label}-${groupIndex}`, true, {
                                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                        lineNumber: 754,
                                                        columnNumber: 27
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                lineNumber: 752,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                            lineNumber: 751,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 750,
                                        columnNumber: 19
                                    }, this) : row.value.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-2",
                                        children: row.variant === 'chips' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-start gap-3 text-sm leading-6 text-slate-800",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                    lineNumber: 792,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-2",
                                                    children: row.value.map((item, itemIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700",
                                                            children: item
                                                        }, `${row.label}-${itemIndex}-${item}`, false, {
                                                            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                            lineNumber: 795,
                                                            columnNumber: 29
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                    lineNumber: 793,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                            lineNumber: 791,
                                            columnNumber: 23
                                        }, this) : row.value.map((item, itemIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex items-start gap-3 text-sm leading-6 text-slate-800",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                        lineNumber: 810,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: item
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                        lineNumber: 811,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, `${row.label}-${itemIndex}-${item}`, true, {
                                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                lineNumber: 806,
                                                columnNumber: 25
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 789,
                                        columnNumber: 19
                                    }, this) : null,
                                    row.fileTypes && row.fileTypes.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            row.value.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-2 text-xs font-semibold text-slate-500",
                                                children: isRTL ? 'الصيغ' : 'Formats'
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                lineNumber: 821,
                                                columnNumber: 23
                                            }, this) : null,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "space-y-2",
                                                children: row.fileTypes.map((fileType, itemIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: "flex items-center gap-3 text-sm leading-6 text-slate-800",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "h-1.5 w-1.5 shrink-0 rounded-full bg-sky-600"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                                lineNumber: 831,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                src: getFileIconByExtension(fileType),
                                                                alt: fileType.toUpperCase(),
                                                                width: 18,
                                                                height: 18,
                                                                className: "h-[23px] w-[18px]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                                lineNumber: 832,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: fileType.toUpperCase()
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                                lineNumber: 839,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, `${row.label}-file-${itemIndex}-${fileType}`, true, {
                                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                        lineNumber: 827,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                lineNumber: 825,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 819,
                                        columnNumber: 19
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                lineNumber: 744,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-slate-400",
                                children: emptyText
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                lineNumber: 847,
                                columnNumber: 15
                            }, this)
                        ]
                    }, row.label, true, {
                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                        lineNumber: 710,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                lineNumber: 708,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
        lineNumber: 694,
        columnNumber: 5
    }, this);
}
function ProjectReviewStep({ locale }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const isRTL = locale === 'ar';
    const [review, setReview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSpecifiedInsighter, setIsSpecifiedInsighter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [specifiedInsighterDisplayName, setSpecifiedInsighterDisplayName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"])(error, locale);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        const load = async ()=>{
            setError(null);
            // Back from adding/editing an additional service: restore the main service's answers.
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isServiceFlowActive"])(locale)) (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceSessions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["finishServiceFlow"])(locale);
            const specificProject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSpecifiedInsighterProject"])(locale);
            setIsSpecifiedInsighter(specificProject);
            setSpecifiedInsighterDisplayName(specificProject ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredSpecifiedInsighterDisplay"])(locale)?.name || '' : '');
            const projectUuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredProjectRequestUuid"])(locale);
            const rawProjectType = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale));
            const deliverablesLanguage = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].deliverablesLanguageKey(locale));
            const insighterIndustryLabel = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterIndustryLabelKey(locale));
            const storedServiceLabel = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceLabelKey(locale));
            const servicePrompt = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].servicePromptKey(locale));
            const projectStatus = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectStatusKey(locale));
            const whoAreYou = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].whoAreYouKey(locale));
            const preferredInsighterType = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].preferredInsighterTypeKey(locale));
            const originType = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterOriginTypeKey(locale));
            const originId = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterOriginIdKey(locale));
            const targetMode = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketModeKey(locale));
            const storedSchedule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readProjectSchedule"])(locale);
            const countryIds = safeParseNumberArray(readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketCountryIdsKey(locale)));
            const regionIds = safeParseNumberArray(readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketRegionIdsKey(locale)));
            const blocIds = safeParseNumberArray(readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketEconomicBlocIdsKey(locale)));
            const needsCountries = originType === 'country' || targetMode === 'country';
            const needsRegions = originType === 'region' || targetMode === 'worldwide' || targetMode === 'regions';
            const needsBlocs = targetMode === 'economic';
            let requestData = null;
            let countries = [];
            let regions = [];
            let blocs = [];
            const [requestResult, countriesResult, regionsResult, blocsResult] = await Promise.allSettled([
                projectUuid ? fetchProjectRequest(locale, projectUuid) : Promise.resolve(null),
                needsCountries ? fetchList('/api/common/setting/country/list', locale) : Promise.resolve([]),
                needsRegions ? fetchList('/api/common/setting/region/list', locale) : Promise.resolve([]),
                needsBlocs ? fetchList('/api/common/setting/economic-bloc/list', locale) : Promise.resolve([])
            ]);
            if (requestResult.status === 'fulfilled') {
                requestData = requestResult.value;
            }
            if (countriesResult.status === 'fulfilled') {
                countries = countriesResult.value;
            }
            if (regionsResult.status === 'fulfilled') {
                regions = regionsResult.value;
            }
            if (blocsResult.status === 'fulfilled') {
                blocs = blocsResult.value;
            }
            const firstRejectedResult = [
                requestResult,
                countriesResult,
                regionsResult,
                blocsResult
            ].find((result)=>result.status === 'rejected');
            if (firstRejectedResult && !cancelled) {
                if (!cancelled) {
                    setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(firstRejectedResult.reason, isRTL ? 'تعذر تحميل تفاصيل المراجعة.' : 'Failed to load review details.'));
                }
            }
            const service = requestData?.service || null;
            const serviceName = storedServiceLabel || service?.name || (isRTL ? 'غير محدد' : 'Not specified');
            const projectTitle = String(requestData?.title || '').trim();
            const headerTitle = projectTitle || (isRTL ? 'ملخص المشروع' : 'Project Summary');
            const storedOriginLabel = originType === 'country' ? countries.find((item)=>String(item.id) === originId) ? getDisplayName(locale, countries.find((item)=>String(item.id) === originId)) : originId : originType === 'region' ? getDisplayName(locale, regions.find((item)=>String(item.id) === originId) || {}) || originId : '';
            const originLabel = storedOriginLabel || (requestData?.insighter_origin ? getDisplayName(locale, requestData.insighter_origin) : isRTL ? 'كل العالم' : 'Worldwide');
            const targetMarket = targetMode === 'country' ? countryIds.map((id)=>{
                const match = countries.find((item)=>item.id === id);
                return match ? getDisplayName(locale, match) : `#${id}`;
            }) : targetMode === 'economic' ? blocIds.map((id)=>{
                const match = blocs.find((item)=>item.id === id);
                return match ? getDisplayName(locale, match) : `#${id}`;
            }) : targetMode === 'worldwide' ? [
                locale === 'ar' ? 'عالميًا' : 'Worldwide'
            ] : regionIds.map((id)=>getDisplayName(locale, regions.find((item)=>item.id === id) || {}) || `#${id}`);
            const descriptionState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDescriptionState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readProjectDescriptionState"])(locale);
            const addonsState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readProjectAddonsState"])(locale);
            const scopeSnapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readProjectScopeSnapshot"])(locale);
            const storedServiceComponentsPayload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readServiceComponentsPayload"])(locale);
            const activeProjectService = requestData ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pickProjectServiceFromProject"])(requestData, (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredProjectServiceUuid"])(locale)) : null;
            const apiServiceComponentsPayload = normalizeProjectComponents([
                ...requestData?.components || [],
                ...activeProjectService?.components || []
            ]);
            const plannedStartDate = storedSchedule?.plannedStartDate || stringifyValue(requestData?.planned_start_date).slice(0, 10);
            const durationDays = storedSchedule?.durationDays ?? (requestData?.duration_days === null || requestData?.duration_days === undefined ? null : Number(requestData.duration_days));
            const serviceComponentsPayload = {
                components: {
                    ...apiServiceComponentsPayload.components || {},
                    ...storedServiceComponentsPayload.components || {}
                }
            };
            const applicableComponentSteps = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readServiceComponentSlugs"])(locale));
            const serviceComponentSlugs = Array.from(new Set([
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readServiceComponentSlugs"])(locale),
                ...Object.keys(serviceComponentsPayload.components || {})
            ])).filter((slug)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["expandServiceComponentSlugs"])([
                    slug
                ]).some((step)=>applicableComponentSteps.has(step)));
            const apiTargetMarket = getTargetMarketLabels(locale, serviceComponentsPayload.components?.['target-market']);
            const serviceComponentSections = buildServiceComponentSections({
                locale,
                slugs: serviceComponentSlugs,
                payload: serviceComponentsPayload,
                plannedStartDate
            });
            const projectTypeValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectLabels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectTypeLabel"])(locale, rawProjectType || stringifyValue(requestData?.type) || null);
            const projectStatusValue = formatProjectPhase(locale, projectStatus || stringifyValue(requestData?.phase));
            const businessTypeValue = formatBusinessType(locale, whoAreYou || stringifyValue(requestData?.business_type));
            const preferredInsighterTypeValue = formatPreferredInsighterType(locale, preferredInsighterType || stringifyValue(requestData?.insighter_preferred_type));
            const insighterMinYearsExperience = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterMinYearsExperienceKey(locale)) || stringifyValue(requestData?.insighter_min_years_experience);
            const insighterMaxYearsExperience = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterMaxYearsExperienceKey(locale)) || stringifyValue(requestData?.insighter_max_years_experience);
            const companyMinTeamSize = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].companyMinTeamSizeKey(locale)) || stringifyValue(requestData?.company_min_team_size);
            const companyMaxTeamSize = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].companyMaxTeamSizeKey(locale)) || stringifyValue(requestData?.company_max_team_size);
            const nextReview = {
                title: headerTitle,
                projectType: projectTypeValue || (isRTL ? 'غير محدد' : 'Not specified'),
                deliverablesLanguage: deliverablesLanguage || (isRTL ? 'غير محدد' : 'Not specified'),
                insighterIndustry: insighterIndustryLabel || (isRTL ? 'غير محدد' : 'Not specified'),
                service: serviceName,
                projectStatus: projectStatusValue || (isRTL ? 'غير محدد' : 'Not specified'),
                whoAreYou: businessTypeValue || (isRTL ? 'غير محدد' : 'Not specified'),
                preferredInsighterType: preferredInsighterTypeValue || (isRTL ? 'غير محدد' : 'Not specified'),
                anyInsighterType: (preferredInsighterType || stringifyValue(requestData?.insighter_preferred_type)) === 'Either',
                origin: originLabel,
                experienceRange: formatRange(insighterMinYearsExperience, insighterMaxYearsExperience, locale),
                teamSizeRange: formatRange(companyMinTeamSize, companyMaxTeamSize, locale),
                hasTargetMarket: applicableComponentSteps.has('target-market'),
                targetMarket: targetMarket.length > 0 ? targetMarket : apiTargetMarket.length > 0 ? apiTargetMarket : [
                    isRTL ? 'غير محدد' : 'Not specified'
                ],
                plannedStartDate,
                durationDays,
                servicePrompt: servicePrompt.trim() || stringifyValue(requestData?.service_prompt),
                description: descriptionState.description || stringifyValue(requestData?.description),
                descriptionFiles: descriptionState.files,
                scopeSnapshot,
                kickoffMeeting: addonsState.kickoffMeeting.enabled,
                serviceComponentSections,
                projectServices: requestData?.project_services || []
            };
            if (!cancelled) setReview(nextReview);
        };
        void load();
        return ()=>{
            cancelled = true;
        };
    }, [
        isRTL,
        locale
    ]);
    const emptyText = isRTL ? 'غير محدد' : 'Not specified';
    const editLabel = isRTL ? 'تعديل' : 'Edit';
    const overviewRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!review) return [];
        return [
            {
                label: isRTL ? 'تحديد النطاق والمخرجات' : 'Scope and deliverables',
                value: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readDefinitionMode"])(locale) === 'simple' ? isRTL ? 'يقترحها الخبير' : 'Expert to propose' : isRTL ? 'أحدد التفاصيل بنفسي' : 'Define details myself'
                ]
            },
            {
                label: isRTL ? 'نوع المشروع' : 'Project type',
                value: [
                    review.projectType
                ],
                editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectType
            },
            {
                label: isRTL ? 'لغة المخرجات' : 'Deliverables language',
                value: [
                    review.deliverablesLanguage
                ],
                editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].deliverablesLanguage
            },
            {
                label: isRTL ? 'الصناعة' : 'Industry',
                value: [
                    review.insighterIndustry
                ],
                editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].insighterIndustry
            },
            {
                label: isRTL ? 'الخدمة' : 'Service',
                value: [
                    review.service
                ],
                editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].service
            },
            ...isSpecifiedInsighter ? [
                {
                    label: isRTL ? 'نوع المطابقة' : 'Matching mode',
                    value: [
                        specifiedInsighterDisplayName ? `${isRTL ? 'الخدمة بواسطة' : 'Service by'} ${specifiedInsighterDisplayName}` : isRTL ? 'الخدمة بواسطة' : 'Service by'
                    ]
                }
            ] : [],
            {
                label: isRTL ? 'مرحلة المشروع' : 'Project status',
                value: [
                    review.projectStatus
                ],
                editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectStatus
            },
            {
                label: isRTL ? 'نوع العميل' : 'Business profile',
                value: [
                    review.whoAreYou
                ],
                editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].whoAreYou
            },
            {
                label: isRTL ? 'البدء المخطط' : 'Planned start',
                value: review.plannedStartDate ? [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatIsoDate"])(review.plannedStartDate, locale)
                ] : [],
                editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectSchedule
            },
            {
                label: isRTL ? 'المدة' : 'Duration',
                value: review.durationDays === null ? [] : [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["durationLabel"])(locale, review.durationDays),
                    ...review.plannedStartDate ? [
                        `${isRTL ? 'الإغلاق المخطط' : 'Planned close'}: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatIsoDate"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addDaysToIsoDate"])(review.plannedStartDate, review.durationDays), locale)}`
                    ] : []
                ],
                editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectSchedule
            }
        ];
    }, [
        isRTL,
        isSpecifiedInsighter,
        locale,
        review,
        specifiedInsighterDisplayName
    ]);
    const serviceSections = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!review) return [];
        return [
            ...review.projectServices
        ].sort((a, b)=>(a.position || 0) - (b.position || 0)).map((service, index)=>{
            const name = service.title || service.service?.name || '';
            const requirementSummary = service.ai_intake?.requirement_summary?.trim();
            const components = Object.assign({}, ...service.components || []);
            const stage = components['deliverable-stage'];
            const deliverables = stage?.deliverables || [];
            const scopeGroups = (service.scopes || []).map((scope)=>({
                    name: scope.scope,
                    subscopes: (scope.children || []).map((child)=>child.scope)
                }));
            const select = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceSessions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["startServiceFlow"])(locale, {
                    mode: 'edit',
                    projectServiceUuid: service.uuid,
                    returnStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectReview
                }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceSessions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serviceSessionSeed"])(locale, {
                    serviceId: service.service?.id ?? null,
                    name,
                    isOther: service.service?.slug === 'other',
                    prompt: service.prompt_ai
                }));
            const rows = [
                ...requirementSummary ? [
                    {
                        label: isRTL ? 'ملخص المتطلبات' : 'Requirement Summary',
                        value: [
                            requirementSummary
                        ],
                        variant: 'requirement-summary',
                        full: true
                    }
                ] : service.prompt_ai ? [
                    {
                        label: isRTL ? 'وصف الخدمة' : 'Service description',
                        value: [
                            service.prompt_ai
                        ],
                        full: true
                    }
                ] : [],
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readDefinitionMode"])(locale) === 'advanced' ? [
                    {
                        label: isRTL ? 'النطاقات والنطاقات الفرعية' : 'Scopes and sub-scopes',
                        value: scopeGroups.length ? scopeGroups.map((group)=>group.name) : [
                            isRTL ? 'سيحدده الخبير ضمن العرض' : 'To be proposed by the expert in their offer'
                        ],
                        variant: 'scope-table',
                        scopeGroups,
                        full: true,
                        editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectScope,
                        onEdit: select
                    }
                ] : [
                    {
                        label: isRTL ? 'نطاق الخدمة' : 'Service scope',
                        value: [
                            isRTL ? 'سيحدده الإنسايتر ضمن العرض' : 'To be proposed by the Insighter in their offer'
                        ],
                        full: true
                    }
                ],
                ...deliverables.length ? [
                    {
                        label: isRTL ? 'المخرجات' : 'Deliverables',
                        value: deliverables.map((item)=>item.title),
                        variant: 'deliverables-table',
                        deliverables,
                        full: true,
                        editStepId: 'deliverables-plan',
                        onEdit: select
                    }
                ] : [],
                ...(service.addons || []).length ? [
                    {
                        label: isRTL ? 'إضافات الخدمة' : 'Service add-ons',
                        value: (service.addons || []).flatMap((addon)=>Object.keys(addon)).map(humanizeSlug),
                        variant: 'chips'
                    }
                ] : []
            ];
            return {
                title: `${isRTL ? 'الخدمة' : 'Service'} ${index + 1}: ${name}`,
                rows,
                uuid: service.uuid
            };
        });
    }, [
        isRTL,
        locale,
        review
    ]);
    const scopeRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!review) return [];
        return [
            {
                label: isRTL ? 'النطاق' : 'Scope',
                variant: 'scope-table',
                scopeGroups: review.scopeSnapshot.map((scope)=>({
                        name: scope.name,
                        subscopes: scope.subscopes
                    })),
                value: review.scopeSnapshot.flatMap((scope)=>scope.subscopes.length > 0 ? scope.subscopes.map((subscope)=>`${scope.name}: ${subscope}`) : [
                        scope.name
                    ]),
                editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectSubscopes,
                wide: true
            },
            ...review.servicePrompt ? [
                {
                    label: isRTL ? 'ملاحظة الخدمة' : 'Service note',
                    value: [
                        review.servicePrompt
                    ],
                    editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].service
                }
            ] : []
        ];
    }, [
        isRTL,
        review
    ]);
    const contextRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!review) return [];
        return [
            {
                label: isRTL ? 'الوصف الإضافي' : 'Additional description',
                value: review.description ? [
                    review.description
                ] : [],
                editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectDescription,
                wide: true
            },
            {
                label: isRTL ? 'الملفات المرفقة' : 'Attachments',
                value: review.descriptionFiles.map((file)=>`${file.name} (${formatBytes(file.size)})`),
                editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectDescription
            }
        ];
    }, [
        isRTL,
        review
    ]);
    const preferenceRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!review) return [];
        return [
            ...review.hasTargetMarket ? [
                {
                    label: isRTL ? 'السوق المستهدف' : 'Target market',
                    value: review.targetMarket,
                    variant: 'chips',
                    editStepId: 'target-market'
                }
            ] : [],
            ...isSpecifiedInsighter ? [] : [
                {
                    label: isRTL ? 'نوع الخبير المفضل' : 'Preferred insighter type',
                    value: [
                        review.preferredInsighterType
                    ],
                    editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].preferredInsighterType
                },
                {
                    label: isRTL ? 'الأصل المفضل' : 'Preferred origin',
                    value: [
                        review.origin
                    ],
                    // "Any" insighter type is always worldwide.
                    editStepId: review.anyInsighterType ? undefined : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].insighterOrigin
                },
                {
                    label: isRTL ? 'سنوات الخبرة' : 'Experience range',
                    value: review.experienceRange === emptyText ? [] : [
                        review.experienceRange
                    ],
                    editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].insighterExperience
                },
                {
                    label: isRTL ? 'حجم فريق الشركة' : 'Company team size',
                    value: review.teamSizeRange === emptyText ? [] : [
                        review.teamSizeRange
                    ],
                    editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].companyTeamSize
                }
            ],
            {
                label: isRTL ? 'اجتماع الانطلاقة' : 'Kickoff meeting',
                value: [
                    review.kickoffMeeting ? isRTL ? 'مطلوب' : 'Requested' : isRTL ? 'غير مطلوب' : 'Not requested'
                ],
                editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].kickoffMeeting
            }
        ];
    }, [
        emptyText,
        isRTL,
        isSpecifiedInsighter,
        review
    ]);
    const reviewContinueLabel = isSpecifiedInsighter ? nav.continueLabel : isRTL ? 'اعثر على الخبراء' : 'Find your Experts';
    const onContinue = async ()=>{
        if (submitting) return;
        setSubmitting(true);
        setError(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectPropertiesSync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syncProjectProperties"])(locale);
            router.push(nav.nextHref || `/${locale}/project`);
        } catch (err) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر حفظ التعديلات قبل المتابعة.' : 'Failed to save edits before continuing.'));
        } finally{
            setSubmitting(false);
        }
    };
    if (!review) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-6xl mx-auto min-h-full flex flex-col",
            dir: isRTL ? 'rtl' : 'ltr',
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-auto rounded-md px-4 py-8 sm:px-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-[980px] rounded-[32px] border border-slate-200 bg-white px-8 py-16",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center text-base text-slate-600",
                        children: isRTL ? 'جاري إعداد ملخص المشروع...' : 'Preparing project summary...'
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                        lineNumber: 1411,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                    lineNumber: 1410,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                lineNumber: 1409,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
            lineNumber: 1408,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-6xl mx-auto min-h-full flex flex-col",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-auto rounded-md px-4 pb-32 pt-8 sm:px-6 sm:pb-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-[980px] overflow-hidden rounded-[36px] border border-slate-200 bg-white",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-start justify-between gap-6 border-b border-slate-200 pb-8",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0 flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex h-20 w-20 items-center justify-center rounded-[20px]",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        src: "https://res.cloudinary.com/dsiku9ipv/image/upload/v1777619443/smallLogo_3_wnmkra.png",
                                                        alt: "Foresighta",
                                                        width: 34,
                                                        height: 34,
                                                        className: "h-auto w-auto"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                        lineNumber: 1432,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                    lineNumber: 1431,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "min-w-0",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                        className: "mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl",
                                                        children: review.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                        lineNumber: 1442,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                    lineNumber: 1441,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                            lineNumber: 1430,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-5 flex flex-wrap gap-2.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700",
                                                    children: review.projectType
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                    lineNumber: 1449,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700",
                                                    children: review.service
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                    lineNumber: 1452,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700",
                                                    children: review.deliverablesLanguage
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                    lineNumber: 1455,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                            lineNumber: 1448,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                    lineNumber: 1429,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                lineNumber: 1428,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-8 space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionBlock, {
                                        title: isRTL ? 'نظرة عامة' : 'Overview',
                                        rows: overviewRows,
                                        emptyText: emptyText,
                                        toneIndex: 0,
                                        isRTL: isRTL,
                                        editLabel: editLabel,
                                        editHrefFor: nav.editHrefFor
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 1463,
                                        columnNumber: 15
                                    }, this),
                                    serviceSections.length ? serviceSections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionBlock, {
                                            locale: locale,
                                            plannedStartDate: review.plannedStartDate,
                                            title: section.title,
                                            rows: section.rows,
                                            emptyText: emptyText,
                                            toneIndex: 1,
                                            isRTL: isRTL,
                                            editLabel: editLabel,
                                            editHrefFor: nav.editHrefFor
                                        }, section.uuid, false, {
                                            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                            lineNumber: 1474,
                                            columnNumber: 17
                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionBlock, {
                                        title: isRTL ? 'النطاق والمخرجات' : 'Scope and deliverables',
                                        rows: scopeRows,
                                        emptyText: emptyText,
                                        toneIndex: 1,
                                        isRTL: isRTL,
                                        editLabel: editLabel,
                                        editHrefFor: nav.editHrefFor
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 1478,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionBlock, {
                                        title: isSpecifiedInsighter ? isRTL ? 'تفضيلات المشروع' : 'Project preferences' : isRTL ? 'السوق وتفضيلات الخبير' : 'Market and expert preferences',
                                        rows: preferenceRows,
                                        emptyText: emptyText,
                                        toneIndex: 2,
                                        isRTL: isRTL,
                                        editLabel: editLabel,
                                        editHrefFor: nav.editHrefFor
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 1483,
                                        columnNumber: 15
                                    }, this),
                                    review.serviceComponentSections.filter((section)=>!serviceSections.length || section.title !== getComponentTitle(locale, 'deliverable-stage')).map((section, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionBlock, {
                                            title: section.title,
                                            rows: section.rows,
                                            emptyText: emptyText,
                                            toneIndex: index + 3,
                                            isRTL: isRTL,
                                            editLabel: editLabel,
                                            editHrefFor: nav.editHrefFor
                                        }, section.title, false, {
                                            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                            lineNumber: 1502,
                                            columnNumber: 17
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionBlock, {
                                        title: isRTL ? 'تفاصيل إضافية' : 'Additional details',
                                        rows: contextRows,
                                        emptyText: emptyText,
                                        toneIndex: review.serviceComponentSections.length + 3,
                                        isRTL: isRTL,
                                        editLabel: editLabel,
                                        editHrefFor: nav.editHrefFor
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 1514,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                lineNumber: 1462,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                        lineNumber: 1427,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                    lineNumber: 1426,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                lineNumber: 1425,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: nav.backHref,
                                className: "btn-sm rounded-full border border-slate-200 bg-white px-6 py-2 text-slate-700 hover:bg-slate-50",
                                children: isRTL ? 'رجوع' : 'Back'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                lineNumber: 1531,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>void onContinue(),
                                disabled: submitting,
                                className: `btn-sm rounded-full px-6 py-2 ${submitting ? 'cursor-not-allowed bg-slate-200 text-slate-500' : 'bg-[#1C7CBB] text-white hover:bg-opacity-90'}`,
                                children: submitting ? isRTL ? 'جاري الحفظ...' : 'Saving...' : reviewContinueLabel
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                lineNumber: 1538,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                        lineNumber: 1530,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                    lineNumber: 1529,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                lineNumber: 1528,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
        lineNumber: 1421,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/edit/agreementEdit.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "agreementLocked",
    ()=>agreementLocked,
    "buildEditContext",
    ()=>buildEditContext,
    "buildEditState",
    ()=>buildEditState,
    "buildPatch",
    ()=>buildPatch,
    "changedKeys",
    ()=>changedKeys,
    "clearDraft",
    ()=>clearDraft,
    "deadlineOfferLocked",
    ()=>deadlineOfferLocked,
    "editReviewHref",
    ()=>editReviewHref,
    "editStepHref",
    ()=>editStepHref,
    "fetchClientProject",
    ()=>fetchClientProject,
    "hasEditableContent",
    ()=>hasEditableContent,
    "latestEditDeliverableDay",
    ()=>latestEditDeliverableDay,
    "localDeadlineDate",
    ()=>localDeadlineDate,
    "minEditDeadline",
    ()=>minEditDeadline,
    "minEditStartDate",
    ()=>minEditStartDate,
    "orderDeliverables",
    ()=>orderDeliverables,
    "projectFingerprint",
    ()=>projectFingerprint,
    "readDraft",
    ()=>readDraft,
    "saveClientAgreement",
    ()=>saveClientAgreement,
    "updateDraft",
    ()=>updateDraft,
    "writeDraft",
    ()=>writeDraft
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectSchedule.ts [app-ssr] (ecmascript)");
;
;
;
;
const EDITABLE_SLUGS = [
    'target-market',
    'data-sources-expected'
];
function headers(locale) {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
    return {
        ...token ? {
            Authorization: `Bearer ${token}`
        } : {},
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': locale === 'ar' ? 'ar' : 'en',
        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
    };
}
async function fetchClientProject(locale, projectUuid) {
    const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/account/project/show/${encodeURIComponent(projectUuid)}`), {
        headers: headers(locale),
        cache: 'no-store'
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res, locale === 'ar' ? 'تعذر تحميل المشروع.' : 'Could not load the project.');
    const json = await res.json();
    return json?.data ?? json;
}
async function saveClientAgreement(locale, projectUuid, patch) {
    const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/account/project/agreement/client-requirements/${encodeURIComponent(projectUuid)}`), {
        // POST with Laravel's method override: a real PATCH fails the CORS preflight.
        method: 'POST',
        headers: headers(locale),
        body: JSON.stringify({
            ...patch,
            _method: 'PATCH'
        })
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res, locale === 'ar' ? 'تعذر حفظ التعديلات.' : 'Could not save your changes.');
    const json = await res.json();
    return json?.data ?? json;
}
const signed = (v)=>!!v && v !== '0' && v !== 'false';
function agreementLocked(project) {
    const contract = project?.contract;
    return signed(contract?.user_sign_at) || signed(contract?.insighter_sign_at) || [
        'payment',
        'in_progress',
        'in_review',
        'closed',
        'cancelled',
        'completed'
    ].includes(project?.status || '') || !!project?.contract_uuid && !contract;
}
function deadlineOfferLocked(project) {
    const invited = Array.isArray(project?.invited) ? project.invited : [];
    return agreementLocked(project) || !!project?.offer?.uuid || project?.status === 'contracting' || invited.some((match)=>match?.offer?.status === 'awarded');
}
function localDeadlineDate(value) {
    const raw = String(value ?? '').trim();
    return /^\d{4}-\d{2}-\d{2}/.test(raw) ? raw.slice(0, 10) : null;
}
function scheduleOf(project) {
    const start = String(project?.planned_start_date ?? '').slice(0, 10);
    const duration = Number(project?.duration_days);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(start) || project?.duration_days === null || project?.duration_days === '' || !Number.isInteger(duration) || duration < 0) return null;
    return {
        plannedStartDate: start,
        durationDays: duration
    };
}
const ownedByClient = (row)=>row?.filled_by_role === 'client';
/** Unknown or mixed ownership stays read-only, including an empty group. */ function ownsGroup(rows) {
    return rows.length > 0 && rows.every(ownedByClient);
}
function scopeRows(service) {
    const scopes = Array.isArray(service?.scopes) ? service.scopes : [];
    return scopes.reduce((all, row)=>all.concat(row, row?.children ?? row?.subscopes ?? []), []);
}
function rawDeliverables(service) {
    const blocks = Array.isArray(service?.components) ? service.components : [];
    return blocks.reduce((all, block)=>all.concat(block?.['deliverable-stage']?.deliverables ?? []), []);
}
function toScope(row) {
    return {
        ...row?.id ? {
            id: Number(row.id)
        } : {},
        scope: String(row?.scope ?? ''),
        description: row?.description ?? null,
        subscopes: (row?.children ?? row?.subscopes ?? []).map(toScope)
    };
}
const WAYS = [
    'on_platform',
    'session',
    'physical_workshop'
];
function toDeliverable(row) {
    const selected = row?.way?.selected;
    return {
        ...row?.id ? {
            id: Number(row.id)
        } : {},
        title: String(row?.title ?? ''),
        period_days: Math.max(0, Number(row?.period_days) || 0),
        report_type: Array.isArray(row?.report_type) ? row.report_type.map((t)=>String(t).toLowerCase()) : [],
        way: {
            selected: WAYS.includes(selected) ? selected : null,
            address: row?.way?.address ?? null
        }
    };
}
function orderDeliverables(items) {
    return items.map((item, index)=>({
            item,
            index
        })).sort((a, b)=>a.item.period_days - b.item.period_days || a.index - b.index).map(({ item })=>item);
}
function nameOf(value) {
    if (!value) return '';
    if (typeof value.name === 'string') return value.name;
    return String(value.name?.en ?? value.names?.en ?? value.title ?? '');
}
function toComponent(block, level, projectServiceId) {
    const slug = block?.component_slug;
    const id = Number(block?.id);
    if (!EDITABLE_SLUGS.includes(slug) || !(id > 0)) return null;
    const raw = block[slug];
    if (slug === 'target-market') {
        const objects = Array.isArray(raw?.objects) ? raw.objects : [];
        const type = [
            'country',
            'region',
            'economic'
        ].includes(raw?.type) ? raw.type : 'country';
        return {
            id,
            level,
            projectServiceId,
            slug,
            name: block.component_name || slug,
            value: {
                type,
                ids: objects.map((row)=>Number(row?.id)).filter((rowId)=>rowId > 0).sort((x, y)=>x - y)
            },
            labels: objects.map(nameOf).filter(Boolean)
        };
    }
    return {
        id,
        level,
        projectServiceId,
        slug,
        name: block.component_name || slug,
        value: typeof raw === 'string' ? raw : ''
    };
}
function buildEditState(project) {
    const services = Array.isArray(project?.project_services) ? [
        ...project.project_services
    ] : [];
    services.sort((a, b)=>(Number(a?.position) || 0) - (Number(b?.position) || 0));
    const serviceBlockIds = new Set(services.reduce((all, s)=>all.concat((s?.components ?? []).map((b)=>Number(b?.id)).filter(Boolean)), []));
    const projectComponents = (Array.isArray(project?.components) ? project.components : []).filter((block)=>!serviceBlockIds.has(Number(block?.id)) && ownedByClient(block)).map((block)=>toComponent(block, 'project', null));
    const serviceComponents = services.reduce((all, s)=>all.concat((s?.components ?? []).filter(ownedByClient).map((block)=>toComponent(block, 'service', Number(s.id) || null))), []);
    return {
        // Urgent requests are fixed to start today and finish within a day.
        schedule: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isUrgentProjectType"])(project?.type ?? null) ? null : scheduleOf(project),
        deadlineOffer: deadlineOfferLocked(project) ? null : localDeadlineDate(project?.last_proposal_deadline),
        components: [
            ...projectComponents,
            ...serviceComponents
        ].filter((c)=>!!c),
        services: services.filter((s)=>Number(s?.id) > 0).map((s)=>({
                id: Number(s.id),
                uuid: String(s.uuid ?? ''),
                serviceId: s?.service?.id ? Number(s.service.id) : null,
                title: String(s.title || s.service?.name || ''),
                editScopes: ownsGroup(scopeRows(s)),
                editDeliverables: ownsGroup(rawDeliverables(s)),
                scopes: (s.scopes ?? []).map(toScope),
                deliverables: orderDeliverables(rawDeliverables(s).map(toDeliverable))
            }))
    };
}
function hasEditableContent(state) {
    return !!state.schedule || !!state.deadlineOffer || state.components.length > 0 || state.services.some((s)=>s.editScopes || s.editDeliverables);
}
function latestEditDeliverableDay(state) {
    return state.services.reduce((max, s)=>s.deliverables.reduce((m, d)=>Math.max(m, d.period_days), max), 0);
}
function minEditStartDate(original) {
    const today = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["todayIsoDate"])();
    return original.plannedStartDate > today ? original.plannedStartDate : today;
}
function minEditDeadline(original) {
    const today = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["todayIsoDate"])();
    return original > today ? original : today;
}
function buildEditContext(project) {
    const installments = [
        ...project?.offer?.installments ?? [],
        ...project?.order?.installments ?? [],
        ...(project?.invited ?? []).reduce((all, m)=>all.concat(m?.offer?.installments ?? []), [])
    ];
    const linked = installments.map((row)=>Number(row?.project_service_deliverable_id ?? (row?.project_proposal_offer_deliverable_id ? null : row?.deliverable?.id))).filter((id)=>id > 0);
    const duration = project?.duration_days;
    return {
        title: String(project?.title ?? ''),
        type: project?.type ? String(project.type) : null,
        plannedStartDate: project?.planned_start_date ? String(project.planned_start_date).slice(0, 10) : null,
        durationDays: duration === null || duration === undefined || duration === '' ? null : Number(duration),
        linkedDeliverableIds: Array.from(new Set(linked))
    };
}
function projectFingerprint(project) {
    return JSON.stringify([
        project?.project_services,
        project?.components,
        project?.contract,
        project?.order,
        project?.status,
        project?.planned_start_date,
        project?.duration_days,
        project?.last_proposal_deadline,
        project?.offer?.uuid
    ]);
}
const same = (a, b)=>JSON.stringify(a) === JSON.stringify(b);
function buildPatch(draft) {
    const patch = {};
    draft.current.services.forEach((service)=>{
        const before = draft.original.services.find((s)=>s.id === service.id);
        if (!before) return;
        if (service.editScopes && !same(service.scopes, before.scopes)) (patch.scopes ??= []).push({
            project_service_id: service.id,
            items: service.scopes
        });
        if (service.editDeliverables && !same(service.deliverables, before.deliverables)) (patch.deliverables ??= []).push({
            project_service_id: service.id,
            items: service.deliverables
        });
    });
    draft.current.components.forEach((component)=>{
        const before = draft.original.components.find((c)=>c.id === component.id);
        if (!before || same(component.value, before.value)) return;
        const list = component.level === 'project' ? patch.project_components ??= [] : patch.service_components ??= [];
        list.push({
            id: component.id,
            value: component.value
        });
    });
    const { schedule, deadlineOffer } = draft.current;
    const before = draft.original;
    // Only changed properties are sent; the backend treats a repeated value as unchanged.
    if (schedule && before.schedule) {
        if (schedule.plannedStartDate !== before.schedule.plannedStartDate) patch.planned_start_date = schedule.plannedStartDate;
        if (schedule.durationDays !== before.schedule.durationDays) patch.duration_days = schedule.durationDays;
    }
    if (deadlineOffer && before.deadlineOffer && deadlineOffer !== before.deadlineOffer) patch.deadline_offer = `${deadlineOffer} 23:59:59`;
    return patch;
}
function changedKeys(draft) {
    const keys = new Set();
    draft.current.services.forEach((service)=>{
        const before = draft.original.services.find((s)=>s.id === service.id);
        if (!before) return;
        if (!same(service.scopes, before.scopes)) keys.add(`scopes:${service.id}`);
        if (!same(service.deliverables, before.deliverables)) keys.add(`deliverables:${service.id}`);
    });
    draft.current.components.forEach((component)=>{
        const before = draft.original.components.find((c)=>c.id === component.id);
        if (before && !same(component.value, before.value)) keys.add(`component:${component.id}`);
    });
    if (!same(draft.current.schedule, draft.original.schedule)) keys.add('schedule');
    if (draft.current.deadlineOffer !== draft.original.deadlineOffer) keys.add('deadline');
    return keys;
}
// The draft lives in sessionStorage so it survives moving between the review and
// the section pages, and is dropped after saving or when the agreement changes.
const draftKey = (projectUuid)=>`projectAgreementEdit:${projectUuid}`;
function readDraft(projectUuid) {
    try {
        const raw = window.sessionStorage.getItem(draftKey(projectUuid));
        const draft = raw ? JSON.parse(raw) : null;
        return draft?.projectUuid === projectUuid ? draft : null;
    } catch  {
        return null;
    }
}
function writeDraft(draft) {
    try {
        window.sessionStorage.setItem(draftKey(draft.projectUuid), JSON.stringify(draft));
    } catch  {
    // ignore
    }
}
function clearDraft(projectUuid) {
    try {
        window.sessionStorage.removeItem(draftKey(projectUuid));
    } catch  {
    // ignore
    }
}
function updateDraft(projectUuid, change) {
    const draft = readDraft(projectUuid);
    if (!draft) return null;
    const next = {
        ...draft,
        current: change(draft.current)
    };
    writeDraft(next);
    return next;
}
function editReviewHref(locale, projectUuid) {
    return `/${locale}/project/edit/${projectUuid}`;
}
function editStepHref(locale, projectUuid, step, params) {
    const query = new URLSearchParams(Object.entries(params).map(([k, v])=>[
            k,
            String(v)
        ])).toString();
    return `/${locale}/project/edit/${projectUuid}/${step}${query ? `?${query}` : ''}`;
}
}),
"[project]/components/project/edit/ProjectEditReview.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectEditReview,
    "projectDashboardHref",
    ()=>projectDashboardHref
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ProjectReviewStep$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/ProjectReviewStep.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectLabels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectLabels.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectDeliverables.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectSchedule.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectStepErrorToast.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/edit/agreementEdit.ts [app-ssr] (ecmascript)");
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
const DATA_SOURCE_LABELS = {
    primary_data: [
        'Primary data',
        'بيانات أولية'
    ],
    secondary_data: [
        'Secondary data',
        'بيانات ثانوية'
    ],
    both: [
        'Both',
        'كلاهما'
    ],
    does_not_matter: [
        "Doesn't matter",
        'لا يهم'
    ]
};
function projectDashboardHref(projectUuid) {
    return `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dashboardUrl"]}/app/insighter-dashboard/projects-created/${projectUuid}`;
}
function ProjectEditReview({ locale, projectUuid }) {
    const isRTL = locale === 'ar';
    const t = (en, ar)=>isRTL ? ar : en;
    const [draft, setDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [locked, setLocked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loadError, setLoadError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [notice, setNotice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [stale, setStale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"])(error, locale);
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (reset = false)=>{
        setLoadError(null);
        setDraft(null);
        try {
            const project = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchClientProject"])(locale, projectUuid);
            const fingerprint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectFingerprint"])(project);
            const existing = reset ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readDraft"])(projectUuid);
            let next;
            if (existing && existing.fingerprint === fingerprint) {
                next = existing;
            } else {
                if (existing && (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["changedKeys"])(existing).size > 0) setNotice(t('The agreement changed since you started editing, so your unsaved changes were cleared.', 'تغيّر الاتفاق منذ بدأت التعديل، لذلك أُزيلت تغييراتك غير المحفوظة.'));
                const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildEditState"])(project);
                next = {
                    projectUuid,
                    fingerprint,
                    note: '',
                    context: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildEditContext"])(project),
                    original: state,
                    current: JSON.parse(JSON.stringify(state))
                };
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeDraft"])(next);
            setLocked((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["agreementLocked"])(project));
            setStale(false);
            setDraft(next);
        } catch (err) {
            setLoadError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, t('Could not load the project.', 'تعذر تحميل المشروع.')));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        locale,
        projectUuid
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        void load();
    }, [
        load
    ]);
    const changed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>draft ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["changedKeys"])(draft) : new Set(), [
        draft
    ]);
    const editedBadge = t('Edited', 'معدّل');
    const setDraftAndStore = (next)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeDraft"])(next);
        setDraft(next);
    };
    const componentRow = (component)=>{
        const isMarket = component.slug === 'target-market';
        const value = isMarket ? component.labels?.length ? component.labels : [] : DATA_SOURCE_LABELS[String(component.value)] ? [
            t(...DATA_SOURCE_LABELS[String(component.value)])
        ] : [];
        return {
            label: isMarket ? t('Target market', 'السوق المستهدف') : t('Expected data sources', 'مصادر البيانات المتوقعة'),
            value,
            variant: isMarket ? 'chips' : 'default',
            editStepId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["editStepHref"])(locale, projectUuid, isMarket ? 'target-market' : 'data-sources', {
                component: component.id
            }),
            badge: changed.has(`component:${component.id}`) ? editedBadge : undefined
        };
    };
    const sections = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!draft) return [];
        const { components, services, schedule, deadlineOffer } = draft.current;
        const result = [];
        const timelineRows = [];
        if (schedule) {
            const scheduleHref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["editStepHref"])(locale, projectUuid, 'schedule', {});
            const scheduleBadge = changed.has('schedule') ? editedBadge : undefined;
            timelineRows.push({
                label: t('Planned start', 'البدء المخطط'),
                value: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatIsoDate"])(schedule.plannedStartDate, locale)
                ],
                editStepId: scheduleHref,
                badge: scheduleBadge
            }, {
                label: t('Duration', 'المدة'),
                value: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["durationLabel"])(locale, schedule.durationDays),
                    `${t('Planned close', 'الإغلاق المخطط')}: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatIsoDate"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addDaysToIsoDate"])(schedule.plannedStartDate, schedule.durationDays), locale)}`
                ],
                editStepId: scheduleHref,
                badge: scheduleBadge
            });
        }
        if (deadlineOffer) timelineRows.push({
            label: t('Offer deadline', 'موعد انتهاء العرض'),
            value: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatIsoDate"])(deadlineOffer, locale)
            ],
            editStepId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["editStepHref"])(locale, projectUuid, 'offer-deadline', {}),
            badge: changed.has('deadline') ? editedBadge : undefined
        });
        if (timelineRows.length) result.push({
            key: 'timeline',
            title: t('Project timeline', 'الجدول الزمني للمشروع'),
            rows: timelineRows
        });
        const projectRows = components.filter((c)=>c.level === 'project').map(componentRow);
        if (projectRows.length) result.push({
            key: 'project',
            title: t('Project requirements', 'متطلبات المشروع'),
            rows: projectRows
        });
        services.forEach((service, index)=>{
            const rows = [];
            if (service.editScopes) rows.push({
                label: t('Scopes and sub-scopes', 'النطاقات والنطاقات الفرعية'),
                value: service.scopes.map((scope)=>scope.scope),
                variant: 'scope-table',
                scopeGroups: service.scopes.map((scope)=>({
                        name: scope.scope,
                        subscopes: scope.subscopes.map((child)=>child.scope)
                    })),
                full: true,
                editStepId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["editStepHref"])(locale, projectUuid, 'scopes', {
                    service: service.id
                }),
                badge: changed.has(`scopes:${service.id}`) ? editedBadge : undefined
            });
            if (service.editDeliverables) rows.push({
                label: t('Deliverables', 'المخرجات'),
                value: service.deliverables.map((item)=>item.title),
                variant: 'deliverables-table',
                deliverables: service.deliverables,
                full: true,
                editStepId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["editStepHref"])(locale, projectUuid, 'deliverables', {
                    service: service.id
                }),
                badge: changed.has(`deliverables:${service.id}`) ? editedBadge : undefined
            });
            rows.push(...components.filter((c)=>c.level === 'service' && c.projectServiceId === service.id).map(componentRow));
            if (rows.length) result.push({
                key: `service-${service.id}`,
                title: `${t('Service', 'الخدمة')} ${index + 1}: ${service.title}`,
                rows
            });
        });
        return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        draft,
        changed,
        isRTL
    ]);
    const dirty = changed.size > 0;
    const backToProject = projectDashboardHref(projectUuid);
    const discard = ()=>{
        if (dirty && !window.confirm(t('Discard your unsaved changes?', 'تجاهل التغييرات غير المحفوظة؟'))) return;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearDraft"])(projectUuid);
        window.location.assign(backToProject);
    };
    const save = async ()=>{
        if (!draft || saving || !dirty) return;
        setSaving(true);
        setError(null);
        try {
            const latest = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchClientProject"])(locale, projectUuid);
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectFingerprint"])(latest) !== draft.fingerprint || (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["agreementLocked"])(latest)) {
                setStale(true);
                setError(t('The agreement changed while you were editing. Reload it to see the latest details.', 'تغيّر الاتفاق أثناء التعديل. أعد تحميله لعرض أحدث التفاصيل.'));
                return;
            }
            const note = draft.note.trim();
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveClientAgreement"])(locale, projectUuid, {
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildPatch"])(draft),
                ...note ? {
                    user_note: note
                } : {}
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearDraft"])(projectUuid);
            window.location.assign(`${backToProject}?tab=revisions`);
        } catch (err) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, t('Could not save your changes.', 'تعذر حفظ التعديلات.')));
        } finally{
            setSaving(false);
        }
    };
    const shell = (content)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-6xl mx-auto min-h-full flex flex-col",
            dir: isRTL ? 'rtl' : 'ltr',
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-auto rounded-md px-4 py-8 sm:px-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-[980px] rounded-[32px] border border-slate-200 bg-white px-8 py-16 text-center",
                    children: content
                }, void 0, false, {
                    fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                    lineNumber: 206,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                lineNumber: 205,
                columnNumber: 7
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
            lineNumber: 204,
            columnNumber: 5
        }, this);
    if (loadError) return shell(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-base text-slate-700",
                children: loadError
            }, void 0, false, {
                fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                lineNumber: 213,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>void load(),
                className: "btn-sm mt-4 rounded-full bg-[#1C7CBB] px-6 py-2 text-white",
                children: t('Retry', 'إعادة المحاولة')
            }, void 0, false, {
                fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                lineNumber: 214,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true));
    if (!draft) return shell(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "text-base text-slate-600",
        children: t('Preparing project summary...', 'جاري إعداد ملخص المشروع...')
    }, void 0, false, {
        fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
        lineNumber: 217,
        columnNumber: 28
    }, this));
    if (locked || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasEditableContent"])(draft.original)) return shell(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-base font-semibold text-slate-800",
                children: locked ? t('This agreement is locked after the first signature.', 'هذا الاتفاق مقفل بعد أول توقيع.') : t('There is nothing you can edit in this project.', 'لا توجد عناصر يمكنك تعديلها في هذا المشروع.')
            }, void 0, false, {
                fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                lineNumber: 220,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: backToProject,
                className: "btn-sm mt-4 inline-flex rounded-full border border-slate-200 bg-white px-6 py-2 text-slate-700 hover:bg-slate-50",
                children: t('Back to project', 'العودة إلى المشروع')
            }, void 0, false, {
                fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                lineNumber: 223,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true));
    const typeLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectLabels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectTypeLabel"])(locale, draft.context.type);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-6xl mx-auto min-h-full flex flex-col",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-auto rounded-md px-4 pb-32 pt-8 sm:px-6 sm:pb-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-[980px] overflow-hidden rounded-[36px] border border-slate-200 bg-white",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-start justify-between gap-6 border-b border-slate-200 pb-8",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0 flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex h-20 w-20 items-center justify-center rounded-[20px]",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        src: "https://res.cloudinary.com/dsiku9ipv/image/upload/v1777619443/smallLogo_3_wnmkra.png",
                                                        alt: "Foresighta",
                                                        width: 34,
                                                        height: 34,
                                                        className: "h-auto w-auto"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                                                        lineNumber: 238,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "min-w-0",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                        className: "mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl",
                                                        children: draft.context.title || t('Project Summary', 'ملخص المشروع')
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                                                        lineNumber: 241,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                                                    lineNumber: 240,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                                            lineNumber: 236,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-5 flex flex-wrap gap-2.5",
                                            children: [
                                                typeLabel ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700",
                                                    children: typeLabel
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                                                    lineNumber: 245,
                                                    columnNumber: 32
                                                }, this) : null,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700",
                                                    children: t('Editing agreement', 'تعديل الاتفاق')
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                                                    lineNumber: 246,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                                            lineNumber: 244,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-4 text-sm text-slate-600",
                                            children: t('Only the details you can change are shown. Save to send all changes as one revision; the Insighters on this project will be notified.', 'تظهر هنا التفاصيل التي يمكنك تعديلها فقط. احفظ لإرسال كل التغييرات كمراجعة واحدة، وسيتم إشعار الخبراء في هذا المشروع.')
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                                            lineNumber: 248,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                                    lineNumber: 235,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                                lineNumber: 234,
                                columnNumber: 13
                            }, this),
                            notice ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800",
                                children: notice
                            }, void 0, false, {
                                fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                                lineNumber: 254,
                                columnNumber: 23
                            }, this) : null,
                            stale ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800",
                                children: [
                                    t('The agreement changed while you were editing.', 'تغيّر الاتفاق أثناء التعديل.'),
                                    ' ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "font-semibold underline",
                                        onClick: ()=>void load(true),
                                        children: t('Reload the latest details', 'إعادة تحميل أحدث التفاصيل')
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                                        lineNumber: 258,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                                lineNumber: 256,
                                columnNumber: 15
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-8 space-y-6",
                                children: [
                                    sections.map((section, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ProjectReviewStep$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionBlock"], {
                                            locale: locale,
                                            plannedStartDate: draft.current.schedule?.plannedStartDate || draft.context.plannedStartDate || undefined,
                                            title: section.title,
                                            rows: section.rows,
                                            emptyText: t('Not specified', 'غير محدد'),
                                            toneIndex: index,
                                            isRTL: isRTL,
                                            editLabel: t('Edit', 'تعديل'),
                                            editHrefFor: (href)=>href
                                        }, section.key, false, {
                                            fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                                            lineNumber: 264,
                                            columnNumber: 17
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        className: "border-t border-slate-200 pt-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "agreement-edit-note",
                                                className: "text-xs font-semibold text-slate-500",
                                                children: t('Note for the Insighter (optional)', 'ملاحظة للخبير (اختياري)')
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                                                lineNumber: 279,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                id: "agreement-edit-note",
                                                value: draft.note,
                                                maxLength: 1000,
                                                rows: 3,
                                                onChange: (e)=>setDraftAndStore({
                                                        ...draft,
                                                        note: e.target.value
                                                    }),
                                                placeholder: t('Explain why these changes help the project…', 'وضّح سبب هذه التغييرات…'),
                                                className: "mt-2 w-full rounded-[12px] border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                                                lineNumber: 282,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-1 text-end text-xs text-slate-400",
                                                children: [
                                                    draft.note.length,
                                                    " / 1000"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                                                lineNumber: 291,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                                        lineNumber: 278,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                                lineNumber: 262,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                        lineNumber: 233,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                    lineNumber: 232,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                lineNumber: 231,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: discard,
                                disabled: saving,
                                className: "btn-sm rounded-full border border-slate-200 bg-white px-6 py-2 text-slate-700 hover:bg-slate-50",
                                children: dirty ? t('Discard changes', 'تجاهل التغييرات') : t('Back to project', 'العودة إلى المشروع')
                            }, void 0, false, {
                                fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                                lineNumber: 301,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden text-sm text-slate-500 sm:inline",
                                        children: dirty ? t('Unsaved changes', 'تغييرات غير محفوظة') : t('No changes yet', 'لا توجد تغييرات بعد')
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                                        lineNumber: 305,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>void save(),
                                        disabled: saving || !dirty || stale,
                                        className: `btn-sm rounded-full px-6 py-2 ${saving || !dirty || stale ? 'cursor-not-allowed bg-slate-200 text-slate-500' : 'bg-[#1C7CBB] text-white hover:bg-opacity-90'}`,
                                        children: saving ? t('Saving...', 'جاري الحفظ...') : t('Save changes', 'حفظ التعديلات')
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                                        lineNumber: 308,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                                lineNumber: 304,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                        lineNumber: 300,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                    lineNumber: 299,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
                lineNumber: 298,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/edit/ProjectEditReview.tsx",
        lineNumber: 230,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=components_project_c4fcef16._.js.map