module.exports = [
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
"[project]/components/project/deliverables.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deliverableIssues",
    ()=>deliverableIssues,
    "deliveryMethodOptions",
    ()=>deliveryMethodOptions,
    "emptyDeliverable",
    ()=>emptyDeliverable,
    "validateDeliverables",
    ()=>validateDeliverables
]);
function deliveryMethodOptions(ar) {
    return [
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
}
function emptyDeliverable() {
    return {
        title: '',
        date: '',
        report_type: [],
        way: {
            selected: 'on_platform',
            address: ''
        }
    };
}
function deliverableIssues(item, start, deadline) {
    const issues = [];
    if (!item.title.trim()) issues.push('title');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(item.date)) issues.push('date_missing');
    else if (start && item.date < start) issues.push('date_before_start');
    else if (deadline && item.date > deadline) issues.push('date_after_deadline');
    if (!Array.isArray(item.report_type) || item.report_type.length === 0 || !item.report_type.every((t)=>[
            'pdf',
            'docx',
            'xlsx',
            'pptx'
        ].includes(t))) issues.push('formats');
    if (![
        'on_platform',
        'session',
        'physical_workshop'
    ].includes(item.way.selected)) issues.push('method');
    else if (item.way.selected === 'physical_workshop' && !item.way.address.trim()) issues.push('address');
    return issues;
}
function validateDeliverables(items, start, deadline) {
    return items.length > 0 && items.every((item)=>deliverableIssues(item, start, deadline).length === 0);
}
}),
"[project]/components/project/serviceComponentsPayload.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "projectComponentSlugs",
    ()=>projectComponentSlugs,
    "readProjectComponents",
    ()=>readProjectComponents,
    "readServiceComponentPayloadValue",
    ()=>readServiceComponentPayloadValue,
    "readServiceComponentsPayload",
    ()=>readServiceComponentsPayload,
    "updateServiceComponentPayload",
    ()=>updateServiceComponentPayload,
    "writeServiceComponentsPayload",
    ()=>writeServiceComponentsPayload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
;
const projectComponentSlugs = [
    'target-market',
    'data-sources-expected'
];
function readProjectComponents(locale) {
    if ("TURBOPACK compile-time truthy", 1) return {};
    //TURBOPACK unreachable
    ;
}
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
function updateServiceComponentPayload(locale, slug, value) {
    if (projectComponentSlugs.includes(slug)) {
        sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectComponentsKey(locale), JSON.stringify({
            ...readProjectComponents(locale),
            [slug]: value
        }));
        return;
    }
    const current = readServiceComponentsPayload(locale);
    writeServiceComponentsPayload(locale, {
        components: {
            ...current.components || {},
            [slug]: value
        }
    });
}
function readServiceComponentPayloadValue(locale, slug) {
    if (projectComponentSlugs.includes(slug)) return readProjectComponents(locale)[slug] ?? null;
    const current = readServiceComponentsPayload(locale);
    return current.components?.[slug] ?? null;
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
"[project]/components/project/serviceComponentsSync.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "syncServiceComponents",
    ()=>syncServiceComponents
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServicesState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectServicesState.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectRequestUuid.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsPayload.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
async function syncServiceComponents(locale) {
    if ("TURBOPACK compile-time truthy", 1) throw new Error('client_only');
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
    if (!token) throw new Error('no_token');
    const projectUuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredProjectRequestUuid"])(locale);
    if (!projectUuid) throw new Error('no_project_uuid');
    const payload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readServiceComponentsPayload"])(locale);
    const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/account/project/definition/component/sync/${projectUuid}/${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServicesState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["requireProjectServiceUuid"])(locale)}`), {
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
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res, 'Failed to save service components.');
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
"[project]/components/project/projectWizardFlow.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deliverableStageStepSlugs",
    ()=>deliverableStageStepSlugs,
    "expandServiceComponentSlugs",
    ()=>expandServiceComponentSlugs,
    "getNextProjectWizardStepId",
    ()=>getNextProjectWizardStepId,
    "getProjectWizardStepOrder",
    ()=>getProjectWizardStepOrder,
    "normalizeProjectWizardStepId",
    ()=>normalizeProjectWizardStepId,
    "normalizeServiceComponentSlug",
    ()=>normalizeServiceComponentSlug,
    "passThroughStepIds",
    ()=>passThroughStepIds,
    "preServiceProjectComponentSlugs",
    ()=>preServiceProjectComponentSlugs,
    "projectWizardStepIds",
    ()=>projectWizardStepIds,
    "readServiceComponentSlugs",
    ()=>readServiceComponentSlugs,
    "serviceAddonsHidden",
    ()=>serviceAddonsHidden
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectAddonsState.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/specifiedInsighterProject.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsPayload.ts [app-ssr] (ecmascript)");
;
;
;
;
const projectWizardStepIds = {
    projectType: 'project-type',
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
    projectDescription: 'project-description',
    deadlineOffer: 'deadline-offer',
    projectDeadline: 'project-deadline',
    addonsIntro: 'addons-intro',
    kickoffMeeting: 'kickoff-meeting',
    projectReview: 'project-review',
    projectMatches: 'project-matches',
    projectSubmissionSuccess: 'submission-success'
};
const preServiceProjectComponentSlugs = [
    'target-market',
    'data-sources-expected'
];
const serviceAddonsHidden = true;
const passThroughStepIds = new Set([
    'project-context',
    ...("TURBOPACK compile-time truthy", 1) ? [
        'service-addons'
    ] : "TURBOPACK unreachable"
]);
const deliverableStageStepSlugs = [
    'deliverables'
];
const deliverableComponentSlugs = new Set([
    'deliverable-stage',
    'deliverable-type-first-draft',
    'deliverable-type-final-version',
    ...deliverableStageStepSlugs
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
function readServiceComponentSlugs(locale) {
    if ("TURBOPACK compile-time truthy", 1) return [];
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
function getProjectWizardStepOrder(locale) {
    const serviceComponentSlugs = readServiceComponentSlugs(locale);
    const preferredInsighterType = readPreferredInsighterType(locale);
    const skipKickoffMeeting = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readProjectAddonsState"])(locale).kickoffMeeting.skipped;
    const specifiedInsighterProject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSpecifiedInsighterProject"])(locale);
    const includeSubIndustryStep = selectedIndustryParentHasChildren(locale);
    const postOriginSteps = specifiedInsighterProject ? [] : preferredInsighterType === 'Individual' ? [
        projectWizardStepIds.insighterExperience
    ] : preferredInsighterType === 'Company' ? [
        projectWizardStepIds.companyTeamSize
    ] : [];
    // "Any" insighter type means a worldwide origin, so the origin step is skipped.
    const insighterPreferenceSteps = specifiedInsighterProject ? [] : [
        projectWizardStepIds.preferredInsighterType,
        ...preferredInsighterType === 'Either' ? [] : [
            projectWizardStepIds.insighterOrigin
        ],
        ...postOriginSteps
    ];
    const stored = (name)=>("TURBOPACK compile-time truthy", 1) ? null : "TURBOPACK unreachable";
    const projectSlugs = JSON.parse(stored('projectComponentSlugs') || '[]');
    const isAskedElsewhere = (slug)=>preServiceProjectComponentSlugs.includes(slug) || projectSlugs.includes(slug);
    const isOther = "undefined" !== 'undefined' && sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceIsOtherKey(locale)) === '1';
    return [
        projectWizardStepIds.projectType,
        projectWizardStepIds.deliverablesLanguage,
        projectWizardStepIds.insighterIndustry,
        ...includeSubIndustryStep ? [
            projectWizardStepIds.insighterSubIndustry
        ] : [],
        projectWizardStepIds.projectStatus,
        projectWizardStepIds.whoAreYou,
        ...insighterPreferenceSteps,
        'planned-start-date',
        projectWizardStepIds.projectDeadline,
        ...preServiceProjectComponentSlugs,
        projectWizardStepIds.service,
        ...("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : [],
        projectWizardStepIds.projectScope,
        projectWizardStepIds.projectSubscopes,
        ...serviceComponentSlugs.filter((slug)=>!isAskedElsewhere(slug)),
        'project-context',
        ...projectSlugs.filter((slug)=>!preServiceProjectComponentSlugs.includes(slug)),
        'service-addons',
        // Only specified-insighter projects can hold more than one service.
        ...specifiedInsighterProject ? [
            'services-summary'
        ] : [],
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
function getNextProjectWizardStepId(locale, currentStep) {
    const stepOrder = getProjectWizardStepOrder(locale);
    const index = stepOrder.indexOf(currentStep);
    if (index < 0) return null;
    const answers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readProjectComponents"])(locale);
    return stepOrder.slice(index + 1).find((step)=>!(step in answers)) || null;
}
}),
"[project]/components/project/useProjectWizardNavigation.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useProjectWizardNavigation",
    ()=>useProjectWizardNavigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServicesState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectServicesState.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/specifiedInsighterProject.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectWizardFlow.ts [app-ssr] (ecmascript)");
'use client';
;
;
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
    const prevStepId = index > 0 ? stepOrder.slice(0, index).reverse().find((step)=>!__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["passThroughStepIds"].has(step)) || null : null;
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
    const backHref = currentStep === 'service' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSpecifiedInsighterProject"])(locale) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServicesState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readProjectServices"])(locale).length > 0 ? baseHrefFor('services-summary') : isReviewEditMode ? reviewHref : prevStepId ? hrefFor(prevStepId) : `/${locale}/project`;
    const nextHref = isReviewEditMode ? reviewHref : nextStepId ? hrefFor(nextStepId) : null;
    const continueLabel = isReviewEditMode ? isRTL ? 'العودة إلى الملخص' : 'Return to summary' : isRTL ? 'متابعة' : 'Continue';
    const goNext = ()=>{
        if (isReviewEditMode) {
            router.push(reviewHref);
            return;
        }
        const freshNextStepId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNextProjectWizardStepId"])(locale, currentStep);
        if (!freshNextStepId) return;
        setStepOrder((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectWizardStepOrder"])(locale));
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
"[project]/components/project/projectDefinitionApi.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "definitionRequest",
    ()=>definitionRequest,
    "loadDefinitionAddons",
    ()=>loadDefinitionAddons,
    "projectDefinitionIds",
    ()=>projectDefinitionIds
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectRequestUuid.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServicesState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectServicesState.ts [app-ssr] (ecmascript)");
;
;
;
;
;
async function definitionRequest(locale, path, method = 'GET', body) {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
    if (!token) throw new Error(locale === 'ar' ? 'يرجى تسجيل الدخول.' : 'Please sign in to continue.');
    const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/account/project/definition/${path}`), {
        method,
        cache: 'no-store',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Accept-Language': locale === 'ar' ? 'ar' : 'en',
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            ...body === undefined || body instanceof FormData ? {} : {
                'Content-Type': 'application/json'
            }
        },
        ...body === undefined ? {} : {
            body: body instanceof FormData ? body : JSON.stringify(body)
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res, 'Unable to save the project request.');
    if (res.status === 204) return undefined;
    const text = await res.text();
    return text ? JSON.parse(text) : undefined;
}
function projectDefinitionIds(locale, service = false) {
    const project = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredProjectRequestUuid"])(locale);
    if (!project) throw new Error(locale === 'ar' ? 'يرجى اختيار الخدمة أولاً.' : 'Please select a service first.');
    return service ? `${project}/${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServicesState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["requireProjectServiceUuid"])(locale)}` : project;
}
async function loadDefinitionAddons(locale, service = false) {
    const ids = projectDefinitionIds(locale, service);
    const lists = await Promise.all([
        'during',
        'after'
    ].map((phase)=>definitionRequest(locale, `addon/${phase}/${ids}`)));
    return Array.from(new Map(lists.flatMap((r)=>r.data || []).map((item)=>[
            item.slug,
            item
        ])).values());
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
"[project]/components/project/SpecifiedInsighterBadge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SpecifiedInsighterBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/specifiedInsighterProject.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function getInitials(name) {
    return name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map((part)=>Array.from(part)[0] || '').join('').toUpperCase();
}
function SpecifiedInsighterBadge({ locale, className = '' }) {
    const [display, setDisplay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hasSpecifiedTarget, setHasSpecifiedTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const syncDisplay = ()=>{
            setDisplay((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredSpecifiedInsighterDisplay"])(locale));
            setHasSpecifiedTarget(Boolean((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredSpecifiedInsighterUuid"])(locale)));
        };
        syncDisplay();
        window.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["specifiedInsighterDisplayUpdatedEvent"], syncDisplay);
        return ()=>{
            window.removeEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["specifiedInsighterDisplayUpdatedEvent"], syncDisplay);
        };
    }, [
        locale
    ]);
    if (!display && !hasSpecifiedTarget) return null;
    const label = locale === 'ar' ? 'الخدمة بواسطة' : 'Service by';
    const displayName = display?.name || '';
    const profileHref = display ? `/${locale}/profile/${encodeURIComponent(display.uuid)}${display.role === 'insighter' ? '?entity=insighter' : ''}` : '';
    const Wrapper = profileHref ? 'a' : 'span';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Wrapper, {
        className: `inline-flex max-w-full items-center gap-2 rounded-full border border-blue-400 px-3 py-1 text-sm ${profileHref ? 'transition-opacity hover:opacity-80' : ''} ${className}`,
        href: profileHref || undefined,
        target: profileHref ? '_blank' : undefined,
        rel: profileHref ? 'noopener noreferrer' : undefined,
        title: displayName ? `${label}: ${displayName}` : label,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "shrink-0 text-[#3C83F6]",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/project/SpecifiedInsighterBadge.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            display ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-sky-100 text-[10px] font-bold text-sky-700 ring-1 ring-sky-200",
                children: display.imageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    src: display.imageUrl,
                    alt: display.name,
                    width: 24,
                    height: 24,
                    unoptimized: true,
                    className: "h-full w-full object-cover"
                }, void 0, false, {
                    fileName: "[project]/components/project/SpecifiedInsighterBadge.tsx",
                    lineNumber: 70,
                    columnNumber: 13
                }, this) : getInitials(display.name)
            }, void 0, false, {
                fileName: "[project]/components/project/SpecifiedInsighterBadge.tsx",
                lineNumber: 68,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "min-w-0 truncate",
                children: displayName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 bg-clip-text text-transparent",
                    children: displayName
                }, void 0, false, {
                    fileName: "[project]/components/project/SpecifiedInsighterBadge.tsx",
                    lineNumber: 85,
                    columnNumber: 11
                }, this) : null
            }, void 0, false, {
                fileName: "[project]/components/project/SpecifiedInsighterBadge.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/SpecifiedInsighterBadge.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/ProjectSelectedTypeHeader.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectSelectedTypeHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectLabels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectLabels.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$SpecifiedInsighterBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/SpecifiedInsighterBadge.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function ProjectSelectedTypeHeader({ locale, entered, projectTypeId, status }) {
    const isRTL = locale === 'ar';
    const typeLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectLabels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectTypeLabel"])(locale, projectTypeId);
    const [serviceLabel, setServiceLabel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            const storedServiceLabel = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceLabelKey(locale));
            setServiceLabel(storedServiceLabel?.trim() || null);
        } catch  {
            setServiceLabel(null);
        }
    }, [
        locale
    ]);
    if (!typeLabel) return null;
    const headerLabel = serviceLabel ? `${typeLabel} - ${serviceLabel}` : typeLabel;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `text-start transition-all duration-700 pb-3 ${entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-1 flex w-full flex-wrap items-center justify-between gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex min-w-0 flex-wrap items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 bg-clip-text text-transparent rounded-full px-3 py-1 border border-blue-400",
                            children: headerLabel
                        }, void 0, false, {
                            fileName: "[project]/components/project/ProjectSelectedTypeHeader.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this),
                        status ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs font-semibold text-slate-600 rounded-full px-3 py-1 border border-slate-400",
                            children: status
                        }, void 0, false, {
                            fileName: "[project]/components/project/ProjectSelectedTypeHeader.tsx",
                            lineNumber: 55,
                            columnNumber: 21
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/project/ProjectSelectedTypeHeader.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$SpecifiedInsighterBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    locale: locale,
                    className: "max-w-full sm:max-w-[45%]"
                }, void 0, false, {
                    fileName: "[project]/components/project/ProjectSelectedTypeHeader.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/project/ProjectSelectedTypeHeader.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/project/ProjectSelectedTypeHeader.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
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
"[project]/components/project/projectPropertiesSync.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildProjectPropertiesPayload",
    ()=>buildProjectPropertiesPayload,
    "syncProjectProperties",
    ()=>syncProjectProperties
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsPayload.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectRequestUuid.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/specifiedInsighterProject.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
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
function buildProjectPropertiesPayload(locale) {
    const preferredInsighterType = mapPreferredInsighterType(readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].preferredInsighterTypeKey(locale)));
    const insighterOriginType = normalizeValue(readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterOriginTypeKey(locale)));
    const insighterOriginId = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterOriginIdKey(locale)).trim();
    const hasOrigin = Boolean(insighterOriginType && insighterOriginId);
    const basePayload = {
        planned_start_date: readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].plannedStartDateKey(locale)).trim() || null,
        components: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readProjectComponents"])(locale),
        phase: mapPhase(readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectStatusKey(locale))),
        business_type: mapBusinessType(readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].whoAreYouKey(locale))),
        deadline: readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].deadlineKey(locale)).trim()
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
"[project]/components/project/projectDescriptionSync.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildProjectDescriptionFormData",
    ()=>buildProjectDescriptionFormData,
    "syncProjectDescription",
    ()=>syncProjectDescription
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectRequestUuid.ts [app-ssr] (ecmascript)");
;
;
;
;
function appendText(formData, key, value) {
    formData.append(key, value);
}
function buildProjectDescriptionFormData(params) {
    const formData = new FormData();
    appendText(formData, 'description', params.description);
    params.files.forEach((file, index)=>{
        formData.append(`files[${index}]`, file);
    });
    return formData;
}
async function syncProjectDescription(params) {
    if ("TURBOPACK compile-time truthy", 1) throw new Error('client_only');
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
    if (!token) throw new Error('no_token');
    const projectUuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredProjectRequestUuid"])(params.locale);
    if (!projectUuid) throw new Error('no_project_uuid');
    const formData = buildProjectDescriptionFormData({
        description: params.description,
        files: params.files
    });
    const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/account/project/definition/description/sync/${projectUuid}`), {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Accept-Language': params.locale === 'ar' ? 'ar' : 'en',
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        body: formData
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res, 'Failed to save your description and attachments.');
}
}),
"[project]/components/project/projectProposalMatchUuid.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearStoredProposalMatchUuid",
    ()=>clearStoredProposalMatchUuid,
    "extractProjectProposalMatchUuid",
    ()=>extractProjectProposalMatchUuid,
    "readStoredProposalMatchUuid",
    ()=>readStoredProposalMatchUuid,
    "writeStoredProposalMatchUuid",
    ()=>writeStoredProposalMatchUuid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
;
function normalizeProposalMatchUuid(value) {
    if (typeof value === 'string') return value.trim();
    if (typeof value === 'number' && Number.isFinite(value)) return String(value);
    return '';
}
function extractProjectProposalMatchUuid(payload) {
    const data = payload?.data ?? payload;
    return normalizeProposalMatchUuid(data?.project_proposal_match_uuid ?? data?.proposal_match_uuid ?? data?.match_uuid);
}
function readStoredProposalMatchUuid(locale) {
    if ("TURBOPACK compile-time truthy", 1) return '';
    //TURBOPACK unreachable
    ;
}
function writeStoredProposalMatchUuid(locale, proposalMatchUuid) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    const normalizedProposalMatchUuid = undefined;
}
function clearStoredProposalMatchUuid(locale) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
}),
"[project]/components/project/projectProposalSubmit.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatProposalDeadlineOffer",
    ()=>formatProposalDeadlineOffer,
    "readStoredSelectedMatchIds",
    ()=>readStoredSelectedMatchIds,
    "submitProjectProposal",
    ()=>submitProjectProposal,
    "writeStoredSelectedMatchIds",
    ()=>writeStoredSelectedMatchIds
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalMatchUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectProposalMatchUuid.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/specifiedInsighterProject.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
function readStorageValue(locale, key) {
    if ("TURBOPACK compile-time truthy", 1) return '';
    //TURBOPACK unreachable
    ;
}
function readStoredSelectedMatchIds(locale) {
    if ("TURBOPACK compile-time truthy", 1) return [];
    //TURBOPACK unreachable
    ;
}
function writeStoredSelectedMatchIds(locale, matchIds) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    const normalizedMatchIds = undefined;
}
function formatProposalDeadlineOffer(value) {
    const normalizedValue = String(value || '').trim();
    if (!normalizedValue) return '';
    const [year = '', month = '', day = ''] = normalizedValue.split('-');
    if (!year || !month || !day) return '';
    return `${day}-${month}-${year} 23:59:59`;
}
async function submitProjectProposal(locale) {
    if ("TURBOPACK compile-time truthy", 1) throw new Error('client_only');
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
    if (!token) throw new Error('no_token');
    const proposalMatchUuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalMatchUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredProposalMatchUuid"])(locale);
    if (!proposalMatchUuid) throw new Error('no_match_request_uuid');
    const deadlineOffer = formatProposalDeadlineOffer(readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].deadlineOfferKey(locale)));
    const isSpecific = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSpecifiedInsighterProject"])(locale);
    const matches = isSpecific ? [] : readStoredSelectedMatchIds(locale);
    if (!isSpecific && matches.length === 0) throw new Error('no_matches');
    const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(isSpecific ? `/api/account/project/proposal/submit-specific-match/${proposalMatchUuid}` : `/api/account/project/proposal/submit/${proposalMatchUuid}`), {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': locale === 'ar' ? 'ar' : 'en',
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        body: JSON.stringify(isSpecific ? {
            deadline_offer: deadlineOffer
        } : {
            deadline_offer: deadlineOffer,
            matches
        })
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res, 'Failed to submit project proposal.');
}
}),
"[project]/components/project/projectAddonsSync.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildProjectAddonsFormData",
    ()=>buildProjectAddonsFormData,
    "syncProjectAddons",
    ()=>syncProjectAddons
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectAddonsState.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectRequestUuid.ts [app-ssr] (ecmascript)");
;
;
;
;
;
function appendText(formData, key, value) {
    formData.append(key, value);
}
function buildProjectAddonsFormData(locale) {
    const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readProjectAddonsState"])(locale);
    const formData = new FormData();
    if (state.kickoffMeeting.enabled) {
        appendText(formData, 'addons[kickoff-meeting][date]', '');
    }
    return formData;
}
async function syncProjectAddons(params) {
    if ("TURBOPACK compile-time truthy", 1) throw new Error('client_only');
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
    if (!token) throw new Error('no_token');
    const projectUuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredProjectRequestUuid"])(params.locale);
    if (!projectUuid) throw new Error('no_project_uuid');
    const formData = buildProjectAddonsFormData(params.locale);
    const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/account/project/definition/addon/sync/${projectUuid}`), {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Accept-Language': params.locale === 'ar' ? 'ar' : 'en',
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        body: formData
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res, 'Failed to save project addons.');
}
}),
"[project]/components/project/serviceMeta.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "serviceMetaForSlug",
    ()=>serviceMetaForSlug
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChartBar$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChartBar$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconChartBar.mjs [app-ssr] (ecmascript) <export default as IconChartBar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChartArrowsVertical$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChartArrowsVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconChartArrowsVertical.mjs [app-ssr] (ecmascript) <export default as IconChartArrowsVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconClipboardText$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconClipboardText$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconClipboardText.mjs [app-ssr] (ecmascript) <export default as IconClipboardText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDeviceDesktopAnalytics$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDeviceDesktopAnalytics$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconDeviceDesktopAnalytics.mjs [app-ssr] (ecmascript) <export default as IconDeviceDesktopAnalytics>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuildingBank$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuildingBank$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBuildingBank.mjs [app-ssr] (ecmascript) <export default as IconBuildingBank>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTargetArrow$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTargetArrow$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconTargetArrow.mjs [app-ssr] (ecmascript) <export default as IconTargetArrow>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCoins$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCoins$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCoins.mjs [app-ssr] (ecmascript) <export default as IconCoins>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconShieldCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconShieldCheck.mjs [app-ssr] (ecmascript) <export default as IconShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconReportAnalytics$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconReportAnalytics$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconReportAnalytics.mjs [app-ssr] (ecmascript) <export default as IconReportAnalytics>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileSearch$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileSearch$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconFileSearch.mjs [app-ssr] (ecmascript) <export default as IconFileSearch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBulb$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBulb$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBulb.mjs [app-ssr] (ecmascript) <export default as IconBulb>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileDollar$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileDollar$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconFileDollar.mjs [app-ssr] (ecmascript) <export default as IconFileDollar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSparkles$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconSparkles.mjs [app-ssr] (ecmascript) <export default as IconSparkles>");
;
// Hardcoded presentation metadata per service slug. Icons are placeholders to be
// swapped for custom illustrations later.
const SERVICE_META = {
    'market-research': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChartBar$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChartBar$3e$__["IconChartBar"],
        iconClass: 'bg-blue-50 text-blue-600',
        description: {
            en: 'Understand market size, demand, and competition.',
            ar: 'افهم حجم السوق والطلب والمنافسة.'
        }
    },
    'pre-feasibility-study': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileSearch$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileSearch$3e$__["IconFileSearch"],
        iconClass: 'bg-lime-50 text-lime-600',
        description: {
            en: 'Quickly assess whether your idea is worth developing.',
            ar: 'قيّم بسرعة ما إذا كانت فكرتك جديرة بالتطوير.'
        }
    },
    'feasibility-study': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChartArrowsVertical$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChartArrowsVertical$3e$__["IconChartArrowsVertical"],
        iconClass: 'bg-amber-50 text-amber-600',
        description: {
            en: 'Assess viability, profitability, and next steps.',
            ar: 'قيّم الجدوى والربحية والخطوات التالية.'
        }
    },
    'business-plan': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconClipboardText$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconClipboardText$3e$__["IconClipboardText"],
        iconClass: 'bg-emerald-50 text-emerald-600',
        description: {
            en: 'Build a roadmap for strategy and operations.',
            ar: 'ابنِ خارطة طريق للاستراتيجية والعمليات.'
        }
    },
    'digital-transformation': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDeviceDesktopAnalytics$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDeviceDesktopAnalytics$3e$__["IconDeviceDesktopAnalytics"],
        iconClass: 'bg-violet-50 text-violet-600',
        description: {
            en: 'Modernize processes and technology to scale.',
            ar: 'حدّث العمليات والتقنيات للتوسع.'
        }
    },
    'company-valuation': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuildingBank$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuildingBank$3e$__["IconBuildingBank"],
        iconClass: 'bg-cyan-50 text-cyan-600',
        description: {
            en: "Determine your company's fair value.",
            ar: 'حدّد القيمة العادلة لشركتك.'
        }
    },
    'go-to-market-strategy': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTargetArrow$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTargetArrow$3e$__["IconTargetArrow"],
        iconClass: 'bg-rose-50 text-rose-600',
        description: {
            en: 'Plan launch, positioning, and customer growth.',
            ar: 'خطّط للإطلاق والتموضع ونمو العملاء.'
        }
    },
    'fundraising-strategy': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCoins$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCoins$3e$__["IconCoins"],
        iconClass: 'bg-teal-50 text-teal-600',
        description: {
            en: 'Prepare to raise capital and attract investors.',
            ar: 'استعد لجمع التمويل وجذب المستثمرين.'
        }
    },
    'policies-procedures-governance': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconShieldCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconShieldCheck$3e$__["IconShieldCheck"],
        iconClass: 'bg-indigo-50 text-indigo-600',
        description: {
            en: 'Set governance, policies, and compliance.',
            ar: 'ضع الحوكمة والسياسات والامتثال.'
        }
    },
    'brief-feasibility-study': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileSearch$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileSearch$3e$__["IconFileSearch"],
        iconClass: 'bg-lime-50 text-lime-600',
        description: {
            en: 'Quick check on whether your idea holds up.',
            ar: 'فحص سريع لمدى جدوى فكرتك.'
        }
    },
    'opportunity-evaluation': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBulb$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBulb$3e$__["IconBulb"],
        iconClass: 'bg-orange-50 text-orange-600',
        description: {
            en: 'Weigh the potential of a business opportunity.',
            ar: 'قيّم إمكانات الفرصة التجارية.'
        }
    },
    'funding-application': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileDollar$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileDollar$3e$__["IconFileDollar"],
        iconClass: 'bg-fuchsia-50 text-fuchsia-600',
        description: {
            en: 'Prepare and package your funding application.',
            ar: 'جهّز وأعدّ طلب التمويل الخاص بك.'
        }
    }
};
const OTHER_SERVICE_META = {
    Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSparkles$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSparkles$3e$__["IconSparkles"],
    iconClass: 'bg-sky-50 text-sky-600',
    description: {
        en: 'A custom service defined from your own description.',
        ar: 'خدمة مخصصة مبنية على وصفك.'
    }
};
const FALLBACK_SERVICE_META = {
    Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconReportAnalytics$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconReportAnalytics$3e$__["IconReportAnalytics"],
    iconClass: 'bg-slate-100 text-slate-600',
    description: {
        en: 'Advisory tailored to your business needs.',
        ar: 'استشارة مصممة لاحتياجات عملك.'
    }
};
function serviceMetaForSlug(slug) {
    const key = (slug || '').trim().toLowerCase();
    if (key === 'other' || key === 'others') return OTHER_SERVICE_META;
    return SERVICE_META[key] || FALLBACK_SERVICE_META;
}
}),
];

//# sourceMappingURL=components_project_6c9fd4b9._.js.map