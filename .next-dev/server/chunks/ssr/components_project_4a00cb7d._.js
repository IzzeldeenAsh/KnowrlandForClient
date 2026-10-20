module.exports = [
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
"[project]/components/project/projectWizardFlow.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deliverableStageStepSlugs",
    ()=>deliverableStageStepSlugs,
    "expandServiceComponentSlugs",
    ()=>expandServiceComponentSlugs,
    "getProjectWizardStepOrder",
    ()=>getProjectWizardStepOrder,
    "isLeavingComponentSteps",
    ()=>isLeavingComponentSteps,
    "isPreServiceProjectComponentSlug",
    ()=>isPreServiceProjectComponentSlug,
    "isServiceAddPending",
    ()=>isServiceAddPending,
    "isServiceFlowActive",
    ()=>isServiceFlowActive,
    "legacyDeliverableStepSlugs",
    ()=>legacyDeliverableStepSlugs,
    "normalizeProjectWizardStepId",
    ()=>normalizeProjectWizardStepId,
    "normalizeServiceComponentSlug",
    ()=>normalizeServiceComponentSlug,
    "preServiceProjectComponentSlugs",
    ()=>preServiceProjectComponentSlugs,
    "projectWizardStepIds",
    ()=>projectWizardStepIds,
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
const preServiceProjectComponentSlugs = [
    'target-market',
    'data-sources-expected'
];
function isPreServiceProjectComponentSlug(slug) {
    return preServiceProjectComponentSlugs.includes(slug);
}
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
function readSlugList(key) {
    if ("TURBOPACK compile-time truthy", 1) return [];
    //TURBOPACK unreachable
    ;
}
function readProjectServiceStepSlugs(locale) {
    return readSlugList(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceComponentSlugsKey(locale));
}
function isLeavingComponentSteps(locale, nextStepId, isReviewEditMode) {
    return isReviewEditMode || !nextStepId || !readServiceComponentSlugs(locale).includes(nextStepId);
}
function readServiceComponentSlugs(locale) {
    return expandServiceComponentSlugs([
        ...readProjectServiceStepSlugs(locale),
        ...readSlugList(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectComponentSlugsKey(locale))
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
function getProjectWizardStepOrder(locale) {
    const advanced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readDefinitionMode"])(locale) === 'advanced';
    const other = "undefined" !== 'undefined' && window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceIsOtherKey(locale)) === '1';
    const requirementSteps = advanced ? [
        projectWizardStepIds.projectScope,
        projectWizardStepIds.projectSubscopes
    ] : [
        ...("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : [],
        projectWizardStepIds.componentSetup
    ];
    // Adding/editing an additional service: only that service's steps.
    if (isServiceFlowActive(locale)) {
        return [
            ...isServiceAddPending(locale) ? [
                projectWizardStepIds.service
            ] : [],
            ...requirementSteps,
            ...readProjectServiceStepSlugs(locale),
            readServiceFlowReturnStepId(locale)
        ];
    }
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
        projectWizardStepIds.definitionMode,
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
        // …then the service and its questions (the project is created at the service step)…
        projectWizardStepIds.service,
        ...requirementSteps,
        ...serviceComponentSlugs,
        // Specific-insighter projects can bundle more services before moving on.
        ...specifiedInsighterProject ? [
            projectWizardStepIds.servicesSummary
        ] : [],
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
async function fetchComponentSlugs(url, locale, token) {
    const res = await fetch(url, {
        method: 'GET',
        headers: headers(locale, token),
        cache: 'no-store'
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res, 'Failed to load service components.');
    const json = await res.json();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readDefinitionMode"])(locale);
    const items = (json.data || []).filter((item)=>!item.definition_mode_visibility || item.definition_mode_visibility === 'both' || item.definition_mode_visibility === mode);
    const incoming = new Set(items.map((item)=>item.id));
    window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].componentCatalogKey(locale), JSON.stringify([
        ...readComponentCatalog(locale).filter((item)=>!incoming.has(item.id)),
        ...items
    ]));
    return items.map((item)=>item.slug || item.name).filter((slug)=>Boolean(slug && slug.trim()));
}
async function fetchProjectServiceComponentSlugs(params) {
    const url = params.isOther ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/account/project/definition/service-prompt/component/${params.projectUuid}/${params.projectServiceUuid}`) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/common/setting/service/component/${params.serviceId}?definition_mode=${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readDefinitionMode"])(params.locale)}`);
    return fetchComponentSlugs(url, params.locale, params.token);
}
async function fetchProjectLevelComponentSlugs(params) {
    return fetchComponentSlugs((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/account/project/definition/component/${params.projectUuid}`), params.locale, params.token);
}
function storeComponentSlugs(locale, params) {
    const serviceSteps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["expandServiceComponentSlugs"])(params.projectServiceSlugs);
    const projectSlugs = params.projectSlugs.filter((slug)=>!params.projectServiceSlugs.includes(slug));
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectWizardFlow.ts [app-ssr] (ecmascript)");
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
function resetServiceComponentsPayload(locale) {
    const { components } = readServiceComponentsPayload(locale);
    writeServiceComponentsPayload(locale, {
        components: Object.fromEntries(Object.entries(components || {}).filter(([slug])=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isPreServiceProjectComponentSlug"])(slug)))
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
    return Object.fromEntries(Object.entries(components || {}).filter(([slug])=>!projectSlugs.has(slug) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isPreServiceProjectComponentSlug"])(slug) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["expandServiceComponentSlugs"])([
            slug
        ]).some((step)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readProjectServiceStepSlugs"])(locale).includes(step))));
}
async function syncServiceComponents(locale) {
    if ("TURBOPACK compile-time truthy", 1) throw new Error('client_only');
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
    const prevStepId = index > 0 ? stepOrder[index - 1] : null;
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
"[project]/components/project/ComponentQuestionFrame.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ComponentQuestionFrame
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectDefinitionMode.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectComponentsCatalog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectComponentsCatalog.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectWizardFlow.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsPayload.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsSync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsSync.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectPropertiesSync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectPropertiesSync.ts [app-ssr] (ecmascript)");
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
function ComponentQuestionFrame({ locale, step, children }) {
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale), router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false), [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false), [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectComponentsCatalog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readComponentCatalog"])(locale).filter((item)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["expandServiceComponentSlugs"])([
            item.slug
        ]).includes(step));
    const optional = items.length > 0 && items.every((item)=>item.fillable_by_insighter || item.is_required === false);
    const deferred = items.some((item)=>item.fillable_by_insighter);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const order = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectWizardStepOrder"])(locale);
        if (!order.includes(step)) {
            router.replace(`/${locale}/project/wizard/${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readDefinitionMode"])(locale) === 'simple' ? 'component-setup' : 'service'}`);
            return;
        }
        setReady(true);
    }, [
        locale,
        step,
        router
    ]);
    async function skip() {
        setBusy(true);
        try {
            const payload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readServiceComponentsPayload"])(locale);
            items.forEach((item)=>{
                delete payload.components[item.slug];
                if (item.slug === 'target-market') [
                    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketModeKey(locale),
                    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketCountryIdsKey(locale),
                    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketRegionIdsKey(locale),
                    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketEconomicBlocIdsKey(locale)
                ].forEach((key)=>window.sessionStorage.removeItem(key));
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeServiceComponentsPayload"])(locale, payload);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsSync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syncServiceComponents"])(locale);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectPropertiesSync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syncProjectProperties"])(locale);
            nav.goNext();
        } catch  {
            setError(locale === 'ar' ? 'تعذر حفظ التغييرات.' : 'Could not save changes.');
        } finally{
            setBusy(false);
        }
    }
    if (!ready) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            optional && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-5xl mx-auto mb-4 rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm",
                dir: locale === 'ar' ? 'rtl' : 'ltr',
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: deferred ? locale === 'ar' ? 'يمكن للإنسايتر إكمال هذا المتطلب ضمن عرضه.' : 'An Insighter can complete this requirement in their offer.' : locale === 'ar' ? 'هذا المتطلب اختياري.' : 'This requirement is optional.'
                    }, void 0, false, {
                        fileName: "[project]/components/project/ComponentQuestionFrame.tsx",
                        lineNumber: 39,
                        columnNumber: 4
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mt-2 font-semibold text-[#1C7CBB] underline",
                        disabled: busy,
                        onClick: ()=>void skip(),
                        children: deferred ? locale === 'ar' ? 'اتركه للإنسايتر' : 'Let the Insighter define this' : locale === 'ar' ? 'تخطي' : 'Skip'
                    }, void 0, false, {
                        fileName: "[project]/components/project/ComponentQuestionFrame.tsx",
                        lineNumber: 40,
                        columnNumber: 4
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        role: "alert",
                        className: "text-rose-700 mt-2",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/components/project/ComponentQuestionFrame.tsx",
                        lineNumber: 41,
                        columnNumber: 14
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/ComponentQuestionFrame.tsx",
                lineNumber: 38,
                columnNumber: 24
            }, this),
            children
        ]
    }, void 0, true);
}
}),
"[project]/components/project/projectDeliverables.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELIVERABLE_STAGE_SLUG",
    ()=>DELIVERABLE_STAGE_SLUG,
    "MAX_DELIVERABLES",
    ()=>MAX_DELIVERABLES,
    "createDeliverable",
    ()=>createDeliverable,
    "dayLabel",
    ()=>dayLabel,
    "defaultDeliverableTitle",
    ()=>defaultDeliverableTitle,
    "defaultDeliverables",
    ()=>defaultDeliverables,
    "deliverableWayLabel",
    ()=>deliverableWayLabel,
    "durationLabel",
    ()=>durationLabel,
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
function createDeliverable(_locale, _index, periodDays) {
    return {
        title: '',
        period_days: periodDays,
        report_type: [
            'pdf'
        ],
        way: {
            selected: 'on_platform',
            address: null
        }
    };
}
function defaultDeliverables(locale, projectType) {
    return [
        createDeliverable(locale, 0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isUrgentProjectType"])(projectType) ? 1 : 30)
    ];
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
function readDeliverables(locale, projectType) {
    const raw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readServiceComponentPayloadValue"])(locale, DELIVERABLE_STAGE_SLUG);
    if (raw && Array.isArray(raw.deliverables) && raw.deliverables.length > 0) {
        return raw.deliverables.map((item, index)=>normalizeDeliverable(item, locale, index));
    }
    if (raw && (raw.first_draft || raw.final_version)) {
        const legacy = fromLegacyStages(raw, locale);
        if (legacy.length > 0) return legacy;
    }
    return defaultDeliverables(locale, projectType);
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
"[project]/components/project/projectServiceRows.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** A project service as the wizard lists it, parsed from `project/show`'s `project_services`. */ __turbopack_context__.s([
    "toProjectServiceRows",
    ()=>toProjectServiceRows
]);
function toProjectServiceRows(projectServices) {
    if (!Array.isArray(projectServices)) return [];
    return projectServices.map((item)=>{
        const service = item?.service ?? {};
        const deliverables = (Array.isArray(item?.components) ? item.components : []).flatMap((block)=>block?.['deliverable-stage']?.deliverables ?? []).map((d)=>({
                title: String(d?.title || ''),
                period_days: Number(d?.period_days) || 0
            }));
        return {
            uuid: String(item?.uuid || ''),
            position: Number(item?.position) || 0,
            name: String(item?.title || service?.name || ''),
            serviceId: Number.isFinite(Number(service?.id)) ? Number(service.id) : null,
            isOther: String(service?.slug || '') === 'other',
            slug: String(service?.slug || ''),
            prompt: String(item?.prompt_ai || ''),
            scopeNames: (Array.isArray(item?.scopes) ? item.scopes : []).map((scope)=>String(scope?.scope || '')).filter(Boolean),
            subscopeCount: (Array.isArray(item?.scopes) ? item.scopes : []).reduce((sum, scope)=>sum + (Array.isArray(scope?.children) ? scope.children.length : 0), 0),
            deliverables
        };
    }).filter((row)=>row.uuid).sort((a, b)=>a.position - b.position);
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
"[project]/components/project/ProjectServicesRail.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectServicesRailLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCheck.mjs [app-ssr] (ecmascript) <export default as IconCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLayoutGridAdd$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLayoutGridAdd$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconLayoutGridAdd.mjs [app-ssr] (ecmascript) <export default as IconLayoutGridAdd>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectDefinitionMode.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectDeliverables.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectRequestUuid.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceRows$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectServiceRows.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectServiceUuid.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectWizardFlow.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceMeta$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceMeta.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/specifiedInsighterProject.ts [app-ssr] (ecmascript)");
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
// Specific-insighter projects can bundle several services. While the client
// works on a service, this rail shows each project service as a card: the
// one in progress, the finished ones, and placeholders hinting that more can
// be added. It is an indicator only; services are added and edited from the
// services step.
/** Progress through a service's steps; the services step has no service in progress. */ const SERVICE_STAGES = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].service]: 0,
    [__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectScope]: 1,
    [__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectSubscopes]: 2,
    'deliverables-plan': 3
};
const STAGE_COUNT = 4;
const MIN_CARDS = 3;
// Last fetched services per project, so the rail paints at once on the next step.
const rowsCache = new Map();
async function fetchProjectServiceRows(locale, projectUuid) {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
    if (!token) return null;
    const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/account/project/show/${projectUuid}`), {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Accept-Language': locale === 'ar' ? 'ar' : 'en',
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        cache: 'no-store'
    });
    if (!res.ok) return null;
    const json = await res.json();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceRows$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toProjectServiceRows"])(json?.data?.project_services);
}
function readActiveServiceLabel(locale) {
    try {
        return window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceLabelKey(locale)) || '';
    } catch  {
        return '';
    }
}
function summaryFor(locale, row) {
    const isRTL = locale === 'ar';
    const scopes = row.scopeNames.length;
    const deliverables = row.deliverables.length;
    const firstDue = deliverables ? Math.min(...row.deliverables.map((d)=>d.period_days)) : null;
    const parts = [
        scopes ? isRTL ? `${scopes} نطاقات` : `${scopes} ${scopes === 1 ? 'scope' : 'scopes'}` : '',
        deliverables ? isRTL ? `${deliverables} مخرجات` : `${deliverables} ${deliverables === 1 ? 'deliverable' : 'deliverables'}` : '',
        firstDue !== null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dayLabel"])(locale, firstDue) : ''
    ].filter(Boolean);
    return parts.join(' · ');
}
function buildCards(locale, step, rows) {
    const isRTL = locale === 'ar';
    const stage = SERVICE_STAGES[step];
    const inService = stage !== undefined;
    // While another service is being picked, the stored service is still the main one.
    const pendingAdd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isServiceAddPending"])(locale);
    const activeUuid = inService && !pendingAdd ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredProjectServiceUuid"])(locale) : '';
    const cards = rows.map((row, index)=>row.uuid === activeUuid ? {
            kind: 'current',
            number: index + 1,
            name: row.name,
            slug: row.slug,
            isOther: row.isOther,
            stage
        } : {
            kind: 'done',
            number: index + 1,
            name: row.name,
            slug: row.slug,
            isOther: row.isOther,
            complete: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readDefinitionMode"])(locale) === 'simple' || row.scopeNames.length > 0 && row.deliverables.length > 0,
            summary: summaryFor(locale, row)
        });
    // No project service yet (the service is still being chosen).
    if (inService && !cards.some((card)=>card.kind === 'current')) {
        cards.push({
            kind: 'current',
            number: cards.length + 1,
            name: pendingAdd ? '' : readActiveServiceLabel(locale),
            slug: '',
            isOther: false,
            stage
        });
    }
    const current = cards.find((card)=>card.kind === 'current');
    const firstPlaceholder = cards.length + 1;
    const total = Math.max(MIN_CARDS, firstPlaceholder);
    for(let number = firstPlaceholder; number <= total; number += 1){
        const first = number === firstPlaceholder;
        cards.push({
            kind: 'placeholder',
            number,
            hint: first && current ? isRTL ? `اختيارية · أضفها بعد الخدمة ${current.number}` : `Optional · add it after service ${current.number}` : isRTL ? 'اختيارية' : 'Optional'
        });
    }
    return cards;
}
function useServicesRail(locale, step) {
    const [enabled, setEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [insighterName, setInsighterName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [cards, setCards] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSpecifiedInsighterProject"])(locale)) return;
        setEnabled(true);
        setInsighterName((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredSpecifiedInsighterDisplay"])(locale)?.name || '');
        const projectUuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredProjectRequestUuid"])(locale);
        setCards(buildCards(locale, step, projectUuid ? rowsCache.get(projectUuid) ?? [] : []));
        if (!projectUuid) return;
        let cancelled = false;
        fetchProjectServiceRows(locale, projectUuid).then((rows)=>{
            if (cancelled || !rows) return;
            rowsCache.set(projectUuid, rows);
            setCards(buildCards(locale, step, rows));
        }).catch(()=>{
        // The rail is an indicator; keep what it shows.
        });
        return ()=>{
            cancelled = true;
        };
    }, [
        locale,
        step
    ]);
    return {
        enabled,
        insighterName,
        cards
    };
}
function ServiceIconTile({ card, size }) {
    const meta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceMeta$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serviceMetaForSlug"])(card.isOther ? 'other' : card.slug);
    const Icon = meta.Icon;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex shrink-0 items-center justify-center ${size === 'md' ? 'h-10 w-10 rounded-xl' : 'h-8 w-8 rounded-[10px]'} ${meta.iconClass}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
            size: size === 'md' ? 20 : 16,
            stroke: 1.8
        }, void 0, false, {
            fileName: "[project]/components/project/ProjectServicesRail.tsx",
            lineNumber: 190,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/project/ProjectServicesRail.tsx",
        lineNumber: 185,
        columnNumber: 5
    }, this);
}
function StageBar({ stage, compact = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `grid grid-cols-4 ${compact ? 'gap-1' : 'gap-1.5'}`,
        "aria-hidden": "true",
        children: Array.from({
            length: STAGE_COUNT
        }, (_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `block rounded-full ${compact ? 'h-[3px]' : 'h-1'} ${index < stage ? 'bg-[#1C7CBB]' : index === stage ? `bg-[#1C7CBB] ${compact ? 'ring-2' : 'ring-[3px]'} ring-sky-100` : 'bg-slate-200'}`
            }, index, false, {
                fileName: "[project]/components/project/ProjectServicesRail.tsx",
                lineNumber: 199,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/project/ProjectServicesRail.tsx",
        lineNumber: 197,
        columnNumber: 5
    }, this);
}
function stageText(locale, stage) {
    const labels = locale === 'ar' ? [
        'اختيار الخدمة',
        'اختيار النطاقات',
        'اختيار النطاقات الفرعية',
        'تخطيط المخرجات'
    ] : [
        'Picking the service',
        'Choosing scopes',
        'Choosing sub-scopes',
        'Planning deliverables'
    ];
    return locale === 'ar' ? `الخطوة ${stage + 1} من ${STAGE_COUNT} · ${labels[stage]}` : `Step ${stage + 1} of ${STAGE_COUNT} · ${labels[stage]}`;
}
function RailCardView({ locale, card }) {
    const isRTL = locale === 'ar';
    if (card.kind === 'current') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            "aria-current": "step",
            className: "flex flex-col gap-3.5 rounded-2xl border-[1.5px] border-[#1C7CBB] bg-white p-4 shadow-[0_10px_28px_-16px_rgba(28,124,187,0.55)]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        card.name ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ServiceIconTile, {
                            card: card,
                            size: "md"
                        }, void 0, false, {
                            fileName: "[project]/components/project/ProjectServicesRail.tsx",
                            lineNumber: 235,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-[1.5px] border-dashed border-[#1C7CBB] bg-sky-50 text-[#1C7CBB]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLayoutGridAdd$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLayoutGridAdd$3e$__["IconLayoutGridAdd"], {
                                size: 20,
                                stroke: 1.8
                            }, void 0, false, {
                                fileName: "[project]/components/project/ProjectServicesRail.tsx",
                                lineNumber: 238,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/project/ProjectServicesRail.tsx",
                            lineNumber: 237,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex min-w-0 flex-col gap-0.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[11px] font-semibold uppercase tracking-wide text-[#1C7CBB]",
                                    children: isRTL ? `الخدمة ${card.number} · قيد الإعداد` : `Service ${card.number} · In progress`
                                }, void 0, false, {
                                    fileName: "[project]/components/project/ProjectServicesRail.tsx",
                                    lineNumber: 242,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "truncate text-[15px] font-semibold text-slate-900",
                                    children: card.name || (isRTL ? 'اختر خدمة' : 'Choose a service')
                                }, void 0, false, {
                                    fileName: "[project]/components/project/ProjectServicesRail.tsx",
                                    lineNumber: 245,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/project/ProjectServicesRail.tsx",
                            lineNumber: 241,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/project/ProjectServicesRail.tsx",
                    lineNumber: 233,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StageBar, {
                    stage: card.stage
                }, void 0, false, {
                    fileName: "[project]/components/project/ProjectServicesRail.tsx",
                    lineNumber: 250,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xs text-slate-600",
                    children: stageText(locale, card.stage)
                }, void 0, false, {
                    fileName: "[project]/components/project/ProjectServicesRail.tsx",
                    lineNumber: 251,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/project/ProjectServicesRail.tsx",
            lineNumber: 229,
            columnNumber: 7
        }, this);
    }
    if (card.kind === 'done') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            className: "flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3.5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] ${card.complete ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`,
                    children: card.complete ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                        size: 16,
                        stroke: 2.5
                    }, void 0, false, {
                        fileName: "[project]/components/project/ProjectServicesRail.tsx",
                        lineNumber: 265,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[13px] font-semibold",
                        children: card.number
                    }, void 0, false, {
                        fileName: "[project]/components/project/ProjectServicesRail.tsx",
                        lineNumber: 267,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/ProjectServicesRail.tsx",
                    lineNumber: 259,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex min-w-0 flex-col gap-0.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "truncate text-sm font-semibold text-slate-900",
                            children: card.name
                        }, void 0, false, {
                            fileName: "[project]/components/project/ProjectServicesRail.tsx",
                            lineNumber: 271,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `text-xs font-semibold ${card.complete ? 'text-emerald-700' : 'text-amber-700'}`,
                            children: card.complete ? isRTL ? 'مكتملة' : 'Complete' : isRTL ? 'تحتاج إلى إكمال' : 'Needs completion'
                        }, void 0, false, {
                            fileName: "[project]/components/project/ProjectServicesRail.tsx",
                            lineNumber: 272,
                            columnNumber: 11
                        }, this),
                        card.summary ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs text-slate-500",
                            children: card.summary
                        }, void 0, false, {
                            fileName: "[project]/components/project/ProjectServicesRail.tsx",
                            lineNumber: 283,
                            columnNumber: 27
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/project/ProjectServicesRail.tsx",
                    lineNumber: 270,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/project/ProjectServicesRail.tsx",
            lineNumber: 258,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        className: "flex items-center gap-3 rounded-2xl border-[1.5px] border-dashed border-slate-300 bg-white/50 p-3.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border-[1.5px] border-dashed border-slate-400 text-[13px] font-semibold text-slate-600",
                children: card.number
            }, void 0, false, {
                fileName: "[project]/components/project/ProjectServicesRail.tsx",
                lineNumber: 291,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex min-w-0 flex-col gap-0.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-semibold text-slate-700",
                        children: isRTL ? `الخدمة ${card.number}` : `Service ${card.number}`
                    }, void 0, false, {
                        fileName: "[project]/components/project/ProjectServicesRail.tsx",
                        lineNumber: 295,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-slate-500",
                        children: card.hint
                    }, void 0, false, {
                        fileName: "[project]/components/project/ProjectServicesRail.tsx",
                        lineNumber: 298,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/ProjectServicesRail.tsx",
                lineNumber: 294,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/ProjectServicesRail.tsx",
        lineNumber: 290,
        columnNumber: 5
    }, this);
}
function CompactCardView({ locale, card }) {
    const isRTL = locale === 'ar';
    if (card.kind === 'current') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            "aria-current": "step",
            className: "flex min-w-0 flex-col gap-2 rounded-[14px] border-[1.5px] border-[#1C7CBB] bg-white px-3 py-2.5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[10px] font-semibold uppercase tracking-wide text-[#1C7CBB]",
                    children: isRTL ? `الخدمة ${card.number}` : `Service ${card.number}`
                }, void 0, false, {
                    fileName: "[project]/components/project/ProjectServicesRail.tsx",
                    lineNumber: 313,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "truncate text-[13px] font-semibold text-slate-900",
                    children: card.name || (isRTL ? 'اختر خدمة' : 'Choose a service')
                }, void 0, false, {
                    fileName: "[project]/components/project/ProjectServicesRail.tsx",
                    lineNumber: 316,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StageBar, {
                    stage: card.stage,
                    compact: true
                }, void 0, false, {
                    fileName: "[project]/components/project/ProjectServicesRail.tsx",
                    lineNumber: 319,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/project/ProjectServicesRail.tsx",
            lineNumber: 309,
            columnNumber: 7
        }, this);
    }
    if (card.kind === 'done') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            className: "flex min-w-0 flex-col justify-center gap-1 rounded-[14px] border border-slate-200 bg-white px-2.5 py-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `inline-flex h-5 w-5 items-center justify-center rounded-md ${card.complete ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`,
                    children: card.complete ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                        size: 12,
                        stroke: 2.5
                    }, void 0, false, {
                        fileName: "[project]/components/project/ProjectServicesRail.tsx",
                        lineNumber: 332,
                        columnNumber: 28
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[11px] font-semibold",
                        children: card.number
                    }, void 0, false, {
                        fileName: "[project]/components/project/ProjectServicesRail.tsx",
                        lineNumber: 332,
                        columnNumber: 67
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/ProjectServicesRail.tsx",
                    lineNumber: 327,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "truncate text-[11px] font-semibold text-slate-700",
                    children: card.name
                }, void 0, false, {
                    fileName: "[project]/components/project/ProjectServicesRail.tsx",
                    lineNumber: 334,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/project/ProjectServicesRail.tsx",
            lineNumber: 326,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        className: "flex min-w-0 flex-col justify-center gap-1 rounded-[14px] border-[1.5px] border-dashed border-slate-300 bg-white/50 px-2.5 py-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[13px] font-semibold text-slate-700",
                children: card.number
            }, void 0, false, {
                fileName: "[project]/components/project/ProjectServicesRail.tsx",
                lineNumber: 341,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[11px] text-slate-500",
                children: isRTL ? 'اختيارية' : 'Optional'
            }, void 0, false, {
                fileName: "[project]/components/project/ProjectServicesRail.tsx",
                lineNumber: 342,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/ProjectServicesRail.tsx",
        lineNumber: 340,
        columnNumber: 5
    }, this);
}
function ProjectServicesRailLayout({ locale, step, children }) {
    const isRTL = locale === 'ar';
    const { enabled, insighterName, cards } = useServicesRail(locale, step);
    if (!enabled) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
    const label = isRTL ? 'خدمات المشروع' : 'Project services';
    const compactColumns = cards.map((card)=>card.kind === 'current' ? 'minmax(0,2fr)' : 'minmax(0,1fr)').join(' ');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mx-auto flex w-full max-w-[1440px] items-start gap-8 xl:gap-12",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                "aria-label": label,
                className: "sticky top-0 hidden w-[280px] shrink-0 pt-2 sm:pt-4 lg:block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-1 px-1 pb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-semibold uppercase tracking-[0.08em] text-slate-600",
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/components/project/ProjectServicesRail.tsx",
                                lineNumber: 375,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[13px] leading-snug text-slate-500",
                                children: insighterName ? isRTL ? `اجمع خدمات ${insighterName} في مشروع واحد.` : `Bundle services from ${insighterName} in one project.` : isRTL ? 'اجمع عدة خدمات في مشروع واحد.' : 'Bundle several services in one project.'
                            }, void 0, false, {
                                fileName: "[project]/components/project/ProjectServicesRail.tsx",
                                lineNumber: 376,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/ProjectServicesRail.tsx",
                        lineNumber: 374,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                        className: "flex flex-col gap-3",
                        children: cards.map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RailCardView, {
                                locale: locale,
                                card: card
                            }, `${card.kind}-${card.number}`, false, {
                                fileName: "[project]/components/project/ProjectServicesRail.tsx",
                                lineNumber: 388,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/project/ProjectServicesRail.tsx",
                        lineNumber: 386,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/ProjectServicesRail.tsx",
                lineNumber: 373,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-w-0 flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                        "aria-label": label,
                        className: "mb-4 mt-2 grid gap-2 lg:hidden",
                        style: {
                            gridTemplateColumns: compactColumns
                        },
                        children: cards.map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CompactCardView, {
                                locale: locale,
                                card: card
                            }, `${card.kind}-${card.number}`, false, {
                                fileName: "[project]/components/project/ProjectServicesRail.tsx",
                                lineNumber: 400,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/project/ProjectServicesRail.tsx",
                        lineNumber: 394,
                        columnNumber: 9
                    }, this),
                    children
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/ProjectServicesRail.tsx",
                lineNumber: 393,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/ProjectServicesRail.tsx",
        lineNumber: 372,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectWizardFlow.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectServiceUuid.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsPayload.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
;
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
        if (projectSlugs.has(slug) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isPreServiceProjectComponentSlug"])(slug)) projectLevel[slug] = value;
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
"[project]/components/project/backendLimits.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// The backend sizes string() columns to VARCHAR(191) (Schema::defaultStringLength in
// AppServiceProvider) and does not length-check them, so longer text fails on insert.
__turbopack_context__.s([
    "BACKEND_STRING_MAX",
    ()=>BACKEND_STRING_MAX
]);
const BACKEND_STRING_MAX = 191;
}),
];

//# sourceMappingURL=components_project_4a00cb7d._.js.map