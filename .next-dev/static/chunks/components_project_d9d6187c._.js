(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/project/ProjectViewportLock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectViewportLock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
function ProjectViewportLock() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProjectViewportLock.useEffect": ()=>{
            const originalHtmlOverflow = document.documentElement.style.overflow;
            const originalBodyOverflow = document.body.style.overflow;
            const originalBodyPaddingRight = document.body.style.paddingRight;
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
            if (scrollBarWidth > 0) {
                document.body.style.paddingRight = "".concat(scrollBarWidth, "px");
            }
            return ({
                "ProjectViewportLock.useEffect": ()=>{
                    document.documentElement.style.overflow = originalHtmlOverflow;
                    document.body.style.overflow = originalBodyOverflow;
                    document.body.style.paddingRight = originalBodyPaddingRight;
                }
            })["ProjectViewportLock.useEffect"];
        }
    }["ProjectViewportLock.useEffect"], []);
    return null;
}
_s(ProjectViewportLock, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = ProjectViewportLock;
var _c;
__turbopack_context__.k.register(_c, "ProjectViewportLock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/projectAddonsState.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-client] (ecmascript)");
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
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectAddonsKey(locale));
        if (!raw) return createDefaultProjectAddonsState();
        return sanitizeProjectAddonsState(JSON.parse(raw));
    } catch (e) {
        return createDefaultProjectAddonsState();
    }
}
function writeProjectAddonsState(locale, state) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectAddonsKey(locale), JSON.stringify(state));
    } catch (e) {
    // ignore
    }
}
function updateProjectAddonsState(locale, updater) {
    const current = readProjectAddonsState(locale);
    writeProjectAddonsState(locale, updater(current));
}
function readProjectScopeSnapshot(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectScopeSnapshotKey(locale));
        if (!raw) return [];
        return sanitizeScopeSnapshot(JSON.parse(raw));
    } catch (e) {
        return [];
    }
}
function writeProjectScopeSnapshot(locale, scopes) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectScopeSnapshotKey(locale), JSON.stringify(sanitizeScopeSnapshot(scopes)));
    } catch (e) {
    // ignore
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/specifiedInsighterProject.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-client] (ecmascript)");
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
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return normalizeSpecifiedInsighterUuid(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].specifiedInsighterUuidKey(locale)));
    } catch (e) {
        return '';
    }
}
function writeStoredSpecifiedInsighterUuid(locale, insighterUuid) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const normalizedInsighterUuid = normalizeSpecifiedInsighterUuid(insighterUuid);
    if (!normalizedInsighterUuid) return;
    try {
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].specifiedInsighterUuidKey(locale), normalizedInsighterUuid);
        window.dispatchEvent(new CustomEvent(specifiedInsighterDisplayUpdatedEvent));
    } catch (e) {
    // ignore storage access errors
    }
}
function readStoredSpecifiedInsighterRole(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return normalizeSpecifiedInsighterRole(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].specifiedInsighterRoleKey(locale)));
    } catch (e) {
        return 'insighter';
    }
}
function writeStoredSpecifiedInsighterRole(locale, role) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].specifiedInsighterRoleKey(locale), normalizeSpecifiedInsighterRole(role));
    } catch (e) {
    // ignore storage access errors
    }
}
function readStoredSpecifiedInsighterProfileUuid(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return normalizeSpecifiedInsighterUuid(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].specifiedInsighterProfileUuidKey(locale)));
    } catch (e) {
        return '';
    }
}
function writeStoredSpecifiedInsighterProfileUuid(locale, profileUuid) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const normalizedProfileUuid = normalizeSpecifiedInsighterUuid(profileUuid);
    if (!normalizedProfileUuid) return;
    try {
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].specifiedInsighterProfileUuidKey(locale), normalizedProfileUuid);
    } catch (e) {
    // ignore storage access errors
    }
}
function readStoredSpecifiedInsighterDisplay(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].specifiedInsighterDisplayKey(locale));
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        const role = normalizeSpecifiedInsighterRole(parsed.role);
        const uuid = normalizeSpecifiedInsighterUuid(parsed.uuid);
        const name = typeof parsed.name === 'string' ? parsed.name.trim() : '';
        const imageUrl = typeof parsed.imageUrl === 'string' && parsed.imageUrl.trim() ? parsed.imageUrl.trim() : null;
        if (!uuid || !name) return null;
        return {
            role,
            uuid,
            name,
            imageUrl
        };
    } catch (e) {
        return null;
    }
}
function writeStoredSpecifiedInsighterDisplay(locale, display) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const uuid = normalizeSpecifiedInsighterUuid(display.uuid);
    const name = display.name.trim();
    if (!uuid || !name) return;
    try {
        var _display_imageUrl;
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].specifiedInsighterDisplayKey(locale), JSON.stringify({
            role: normalizeSpecifiedInsighterRole(display.role),
            uuid,
            name,
            imageUrl: ((_display_imageUrl = display.imageUrl) === null || _display_imageUrl === void 0 ? void 0 : _display_imageUrl.trim()) || null
        }));
        window.dispatchEvent(new CustomEvent(specifiedInsighterDisplayUpdatedEvent));
    } catch (e) {
    // ignore storage access errors
    }
}
function clearStoredSpecifiedInsighterDisplay(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].specifiedInsighterDisplayKey(locale));
        window.dispatchEvent(new CustomEvent(specifiedInsighterDisplayUpdatedEvent));
    } catch (e) {
    // ignore storage access errors
    }
}
function clearStoredSpecifiedInsighterUuid(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].specifiedInsighterUuidKey(locale));
        window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].specifiedInsighterRoleKey(locale));
        window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].specifiedInsighterProfileUuidKey(locale));
        window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].specifiedInsighterDisplayKey(locale));
        window.dispatchEvent(new CustomEvent(specifiedInsighterDisplayUpdatedEvent));
    } catch (e) {
    // ignore storage access errors
    }
}
function isSpecifiedInsighterProject(locale) {
    return Boolean(readStoredSpecifiedInsighterUuid(locale));
}
function getSpecifiedInsighterLabel(locale) {
    return locale === 'ar' ? 'خبير محدد' : 'Specified Insighter';
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/projectWizardFlow.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deliverableStageStepSlugs",
    ()=>deliverableStageStepSlugs,
    "expandServiceComponentSlugs",
    ()=>expandServiceComponentSlugs,
    "getProjectWizardStepOrder",
    ()=>getProjectWizardStepOrder,
    "normalizeProjectWizardStepId",
    ()=>normalizeProjectWizardStepId,
    "normalizeServiceComponentSlug",
    ()=>normalizeServiceComponentSlug,
    "projectWizardStepIds",
    ()=>projectWizardStepIds,
    "readServiceComponentSlugs",
    ()=>readServiceComponentSlugs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectAddonsState.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/specifiedInsighterProject.ts [app-client] (ecmascript)");
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
const deliverableStageStepSlugs = [
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
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceComponentSlugsKey(locale));
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return expandServiceComponentSlugs(parsed.map((s)=>typeof s === 'string' ? s.trim() : '').filter(Boolean));
    } catch (e) {
        return [];
    }
}
function readPreferredInsighterType(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const value = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].preferredInsighterTypeKey(locale));
        if (value === 'Individual' || value === 'Company' || value === 'Either') {
            return value;
        }
    } catch (e) {
    // ignore
    }
    return null;
}
function selectedIndustryParentHasChildren(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterIndustryParentHasChildrenKey(locale)) === '1';
    } catch (e) {
        return false;
    }
}
function getProjectWizardStepOrder(locale) {
    const serviceComponentSlugs = readServiceComponentSlugs(locale);
    const preferredInsighterType = readPreferredInsighterType(locale);
    const skipKickoffMeeting = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readProjectAddonsState"])(locale).kickoffMeeting.skipped;
    const specifiedInsighterProject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSpecifiedInsighterProject"])(locale);
    const includeSubIndustryStep = selectedIndustryParentHasChildren(locale);
    const postOriginSteps = specifiedInsighterProject ? [] : preferredInsighterType === 'Individual' ? [
        projectWizardStepIds.insighterExperience
    ] : preferredInsighterType === 'Company' ? [
        projectWizardStepIds.companyTeamSize
    ] : [];
    const insighterPreferenceSteps = specifiedInsighterProject ? [] : [
        projectWizardStepIds.preferredInsighterType,
        projectWizardStepIds.insighterOrigin,
        ...postOriginSteps
    ];
    return [
        projectWizardStepIds.projectType,
        projectWizardStepIds.deliverablesLanguage,
        projectWizardStepIds.insighterIndustry,
        ...includeSubIndustryStep ? [
            projectWizardStepIds.insighterSubIndustry
        ] : [],
        projectWizardStepIds.service,
        projectWizardStepIds.projectScope,
        projectWizardStepIds.projectSubscopes,
        ...serviceComponentSlugs,
        projectWizardStepIds.projectStatus,
        projectWizardStepIds.whoAreYou,
        ...insighterPreferenceSteps,
        projectWizardStepIds.projectDeadline,
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/useProjectWizardNavigation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useProjectWizardNavigation",
    ()=>useProjectWizardNavigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectWizardFlow.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const reviewReturnParam = 'returnTo';
function useProjectWizardNavigation(locale) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ensureProjectWizardStorageForLocale"])(locale);
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const currentStep = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeProjectWizardStepId"])(String((params === null || params === void 0 ? void 0 : params.step) || ''));
    const isRTL = locale === 'ar';
    const isReviewEditMode = currentStep !== __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectReview && (searchParams === null || searchParams === void 0 ? void 0 : searchParams.get(reviewReturnParam)) === __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectReview;
    const [stepOrder, setStepOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useProjectWizardNavigation.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectWizardStepOrder"])(locale)
    }["useProjectWizardNavigation.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useProjectWizardNavigation.useEffect": ()=>{
            setStepOrder((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectWizardStepOrder"])(locale));
        }
    }["useProjectWizardNavigation.useEffect"], [
        currentStep,
        locale
    ]);
    const index = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useProjectWizardNavigation.useMemo[index]": ()=>stepOrder.indexOf(currentStep)
    }["useProjectWizardNavigation.useMemo[index]"], [
        currentStep,
        stepOrder
    ]);
    const prevStepId = index > 0 ? stepOrder[index - 1] : null;
    const nextStepId = index >= 0 && index < stepOrder.length - 1 ? stepOrder[index + 1] : null;
    const baseHrefFor = (stepId)=>"/".concat(locale, "/project/wizard/").concat(stepId);
    const reviewHref = baseHrefFor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectReview);
    const withReviewReturn = (href)=>"".concat(href).concat(href.includes('?') ? '&' : '?').concat(reviewReturnParam, "=").concat(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectReview);
    const hrefFor = (stepId)=>{
        const href = baseHrefFor(stepId);
        if (isReviewEditMode && stepId !== __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectReview) {
            return withReviewReturn(href);
        }
        return href;
    };
    const editHrefFor = (stepId)=>withReviewReturn(baseHrefFor(stepId));
    const backHref = isReviewEditMode ? reviewHref : prevStepId ? hrefFor(prevStepId) : "/".concat(locale, "/project");
    const nextHref = isReviewEditMode ? reviewHref : nextStepId ? hrefFor(nextStepId) : null;
    const continueLabel = isReviewEditMode ? isRTL ? 'العودة إلى الملخص' : 'Return to summary' : isRTL ? 'متابعة' : 'Continue';
    const goNext = ()=>{
        if (isReviewEditMode) {
            router.push(reviewHref);
            return;
        }
        const freshStepOrder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectWizardStepOrder"])(locale);
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
_s(useProjectWizardNavigation, "eTfvGgCcJ/JvzBvehHzf1dmFZDw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/SpecifiedInsighterBadge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SpecifiedInsighterBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/specifiedInsighterProject.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function getInitials(name) {
    return name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map((part)=>Array.from(part)[0] || '').join('').toUpperCase();
}
function SpecifiedInsighterBadge(param) {
    let { locale, className = '' } = param;
    _s();
    const [display, setDisplay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hasSpecifiedTarget, setHasSpecifiedTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SpecifiedInsighterBadge.useEffect": ()=>{
            const syncDisplay = {
                "SpecifiedInsighterBadge.useEffect.syncDisplay": ()=>{
                    setDisplay((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredSpecifiedInsighterDisplay"])(locale));
                    setHasSpecifiedTarget(Boolean((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredSpecifiedInsighterUuid"])(locale)));
                }
            }["SpecifiedInsighterBadge.useEffect.syncDisplay"];
            syncDisplay();
            window.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["specifiedInsighterDisplayUpdatedEvent"], syncDisplay);
            return ({
                "SpecifiedInsighterBadge.useEffect": ()=>{
                    window.removeEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["specifiedInsighterDisplayUpdatedEvent"], syncDisplay);
                }
            })["SpecifiedInsighterBadge.useEffect"];
        }
    }["SpecifiedInsighterBadge.useEffect"], [
        locale
    ]);
    if (!display && !hasSpecifiedTarget) return null;
    const label = locale === 'ar' ? 'الخدمة بواسطة' : 'Service by';
    const displayName = (display === null || display === void 0 ? void 0 : display.name) || '';
    const profileHref = display ? "/".concat(locale, "/profile/").concat(encodeURIComponent(display.uuid)).concat(display.role === 'insighter' ? '?entity=insighter' : '') : '';
    const Wrapper = profileHref ? 'a' : 'span';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Wrapper, {
        className: "inline-flex max-w-full items-center gap-2 rounded-full border border-blue-400 px-3 py-1 text-sm ".concat(profileHref ? 'transition-opacity hover:opacity-80' : '', " ").concat(className),
        href: profileHref || undefined,
        target: profileHref ? '_blank' : undefined,
        rel: profileHref ? 'noopener noreferrer' : undefined,
        title: displayName ? "".concat(label, ": ").concat(displayName) : label,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "shrink-0 text-[#3C83F6]",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/project/SpecifiedInsighterBadge.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            display ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-sky-100 text-[10px] font-bold text-sky-700 ring-1 ring-sky-200",
                children: display.imageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "min-w-0 truncate",
                children: displayName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_s(SpecifiedInsighterBadge, "vzk4lphdiTAcUgyDIqvpnuPbDSE=");
_c = SpecifiedInsighterBadge;
var _c;
__turbopack_context__.k.register(_c, "SpecifiedInsighterBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/projectLabels.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/ProjectSelectedTypeHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectSelectedTypeHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectLabels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectLabels.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$SpecifiedInsighterBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/SpecifiedInsighterBadge.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function ProjectSelectedTypeHeader(param) {
    let { locale, entered, projectTypeId, status } = param;
    _s();
    const isRTL = locale === 'ar';
    const typeLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectLabels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectTypeLabel"])(locale, projectTypeId);
    const [serviceLabel, setServiceLabel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProjectSelectedTypeHeader.useEffect": ()=>{
            try {
                const storedServiceLabel = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceLabelKey(locale));
                setServiceLabel((storedServiceLabel === null || storedServiceLabel === void 0 ? void 0 : storedServiceLabel.trim()) || null);
            } catch (e) {
                setServiceLabel(null);
            }
        }
    }["ProjectSelectedTypeHeader.useEffect"], [
        locale
    ]);
    if (!typeLabel) return null;
    const headerLabel = serviceLabel ? "".concat(typeLabel, " - ").concat(serviceLabel) : typeLabel;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "text-start transition-all duration-700 pb-3 ".concat(entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-1 flex w-full flex-wrap items-center justify-between gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex min-w-0 flex-wrap items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 bg-clip-text text-transparent rounded-full px-3 py-1 border border-blue-400",
                            children: headerLabel
                        }, void 0, false, {
                            fileName: "[project]/components/project/ProjectSelectedTypeHeader.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this),
                        status ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$SpecifiedInsighterBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
_s(ProjectSelectedTypeHeader, "ff/we4bvSOVuqP/k0LlmumVMEJM=");
_c = ProjectSelectedTypeHeader;
var _c;
__turbopack_context__.k.register(_c, "ProjectSelectedTypeHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/projectApiError.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProjectApiError",
    ()=>ProjectApiError,
    "assertProjectApiResponse",
    ()=>assertProjectApiResponse,
    "getProjectApiErrorMessage",
    ()=>getProjectApiErrorMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
;
class ProjectApiError extends Error {
    constructor(message, status = 0, hasServerMessage = false){
        super(message), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "status", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "hasServerMessage", void 0);
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
    } catch (e) {
        try {
            const text = (await response.clone().text()).trim();
            return text || null;
        } catch (e) {
            return null;
        }
    }
}
async function assertProjectApiResponse(response) {
    let fallbackMessage = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'Request failed.';
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/projectRequestUuid.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-client] (ecmascript)");
;
function normalizeProjectRequestUuid(value) {
    if (typeof value === 'string') return value.trim();
    if (typeof value === 'number' && Number.isFinite(value)) return String(value);
    return '';
}
function extractProjectRequestUuid(payload) {
    var _this, _this1, _this2;
    var _data;
    const data = (_data = (_this = payload) === null || _this === void 0 ? void 0 : _this.data) !== null && _data !== void 0 ? _data : payload;
    var _uuid;
    return normalizeProjectRequestUuid((_uuid = (_this1 = data) === null || _this1 === void 0 ? void 0 : _this1.uuid) !== null && _uuid !== void 0 ? _uuid : (_this2 = data) === null || _this2 === void 0 ? void 0 : _this2.id);
}
function readStoredProjectRequestUuid(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return normalizeProjectRequestUuid(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectUuidKey(locale))) || normalizeProjectRequestUuid(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].legacyProjectIdKey(locale)));
    } catch (e) {
        return '';
    }
}
function writeStoredProjectRequestUuid(locale, projectUuid) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const normalizedProjectUuid = normalizeProjectRequestUuid(projectUuid);
    if (!normalizedProjectUuid) return;
    try {
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectUuidKey(locale), normalizedProjectUuid);
        window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].legacyProjectIdKey(locale));
    } catch (e) {
    // ignore storage access errors
    }
}
function clearStoredProjectRequestUuid(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectUuidKey(locale));
        window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].legacyProjectIdKey(locale));
    } catch (e) {
    // ignore storage access errors
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/projectPropertiesSync.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildProjectPropertiesPayload",
    ()=>buildProjectPropertiesPayload,
    "syncProjectProperties",
    ()=>syncProjectProperties
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectRequestUuid.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/specifiedInsighterProject.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-client] (ecmascript)");
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
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return window.sessionStorage.getItem(key) || '';
    } catch (e) {
        return '';
    }
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
    const preferredInsighterType = mapPreferredInsighterType(readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].preferredInsighterTypeKey(locale)));
    const insighterOriginType = normalizeValue(readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterOriginTypeKey(locale)));
    const insighterOriginId = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterOriginIdKey(locale)).trim();
    const hasOrigin = Boolean(insighterOriginType && insighterOriginId);
    const basePayload = {
        phase: mapPhase(readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectStatusKey(locale))),
        business_type: mapBusinessType(readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].whoAreYouKey(locale))),
        deadline: readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].deadlineKey(locale)).trim()
    };
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSpecifiedInsighterProject"])(locale)) {
        return basePayload;
    }
    return {
        ...basePayload,
        insighter_preferred_type: preferredInsighterType,
        insighter_origin_id: hasOrigin ? insighterOriginId : '',
        insighter_origin_type: hasOrigin ? insighterOriginType : '',
        insighter_min_years_experience: preferredInsighterType === 'individual' ? readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterMinYearsExperienceKey(locale)).trim() : '',
        insighter_max_years_experience: preferredInsighterType === 'individual' ? readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterMaxYearsExperienceKey(locale)).trim() : '',
        company_min_team_size: preferredInsighterType === 'company' ? readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].companyMinTeamSizeKey(locale)).trim() : '',
        company_max_team_size: preferredInsighterType === 'company' ? readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].companyMaxTeamSizeKey(locale)).trim() : ''
    };
}
async function syncProjectProperties(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
    if (!token) throw new Error('no_token');
    const projectUuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredProjectRequestUuid"])(locale);
    if (!projectUuid) throw new Error('no_project_uuid');
    const payload = buildProjectPropertiesPayload(locale);
    const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/account/project/definition/properties/sync/".concat(projectUuid)), {
        method: 'POST',
        headers: {
            Authorization: "Bearer ".concat(token),
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': locale === 'ar' ? 'ar' : 'en',
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        body: JSON.stringify(payload)
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res, 'Failed to save project properties.');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/useProjectStepErrorToast.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useProjectStepErrorToast",
    ()=>useProjectStepErrorToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/toast/ToastContext.tsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function useProjectStepErrorToast(errorMessage, locale) {
    _s();
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const lastShownErrorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useProjectStepErrorToast.useEffect": ()=>{
            const normalizedError = String(errorMessage || '').trim();
            if (!normalizedError) {
                lastShownErrorRef.current = null;
                return;
            }
            if (lastShownErrorRef.current === normalizedError) return;
            toast.error(normalizedError, locale === 'ar' ? 'خطأ' : 'Error', 10000);
            lastShownErrorRef.current = normalizedError;
        }
    }["useProjectStepErrorToast.useEffect"], [
        errorMessage,
        locale,
        toast
    ]);
}
_s(useProjectStepErrorToast, "q6sTw0KA+i2QBMDiM5j3kzZNgog=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/projectDescriptionState.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-client] (ecmascript)");
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
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const description = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectDescriptionTextKey(locale)) || '';
        const filesRaw = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectDescriptionFilesMetaKey(locale));
        const files = filesRaw ? sanitizeFileMeta(JSON.parse(filesRaw)) : [];
        return sanitizeProjectDescriptionState({
            description,
            files
        });
    } catch (e) {
        return {
            description: '',
            files: []
        };
    }
}
function writeProjectDescriptionState(locale, state) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const sanitized = sanitizeProjectDescriptionState(state);
    try {
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectDescriptionTextKey(locale), sanitized.description);
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectDescriptionFilesMetaKey(locale), JSON.stringify(sanitized.files));
    } catch (e) {
    // ignore
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/projectDescriptionSync.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildProjectDescriptionFormData",
    ()=>buildProjectDescriptionFormData,
    "syncProjectDescription",
    ()=>syncProjectDescription
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectRequestUuid.ts [app-client] (ecmascript)");
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
        formData.append("files[".concat(index, "]"), file);
    });
    return formData;
}
async function syncProjectDescription(params) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
    if (!token) throw new Error('no_token');
    const projectUuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredProjectRequestUuid"])(params.locale);
    if (!projectUuid) throw new Error('no_project_uuid');
    const formData = buildProjectDescriptionFormData({
        description: params.description,
        files: params.files
    });
    const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/account/project/definition/description/sync/".concat(projectUuid)), {
        method: 'POST',
        headers: {
            Authorization: "Bearer ".concat(token),
            Accept: 'application/json',
            'Accept-Language': params.locale === 'ar' ? 'ar' : 'en',
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        body: formData
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res, 'Failed to save your description and attachments.');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/projectProposalMatchUuid.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-client] (ecmascript)");
;
function normalizeProposalMatchUuid(value) {
    if (typeof value === 'string') return value.trim();
    if (typeof value === 'number' && Number.isFinite(value)) return String(value);
    return '';
}
function extractProjectProposalMatchUuid(payload) {
    var _this, _this1, _this2, _this3;
    var _data;
    const data = (_data = (_this = payload) === null || _this === void 0 ? void 0 : _this.data) !== null && _data !== void 0 ? _data : payload;
    var _project_proposal_match_uuid, _ref;
    return normalizeProposalMatchUuid((_ref = (_project_proposal_match_uuid = (_this1 = data) === null || _this1 === void 0 ? void 0 : _this1.project_proposal_match_uuid) !== null && _project_proposal_match_uuid !== void 0 ? _project_proposal_match_uuid : (_this2 = data) === null || _this2 === void 0 ? void 0 : _this2.proposal_match_uuid) !== null && _ref !== void 0 ? _ref : (_this3 = data) === null || _this3 === void 0 ? void 0 : _this3.match_uuid);
}
function readStoredProposalMatchUuid(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return normalizeProposalMatchUuid(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].proposalMatchUuidKey(locale)));
    } catch (e) {
        return '';
    }
}
function writeStoredProposalMatchUuid(locale, proposalMatchUuid) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const normalizedProposalMatchUuid = normalizeProposalMatchUuid(proposalMatchUuid);
    if (!normalizedProposalMatchUuid) return;
    try {
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].proposalMatchUuidKey(locale), normalizedProposalMatchUuid);
    } catch (e) {
    // ignore storage access errors
    }
}
function clearStoredProposalMatchUuid(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].proposalMatchUuidKey(locale));
    } catch (e) {
    // ignore storage access errors
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/projectProposalSubmit.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalMatchUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectProposalMatchUuid.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/specifiedInsighterProject.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-client] (ecmascript)");
;
;
;
;
;
;
function readStorageValue(locale, key) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return window.sessionStorage.getItem(key) || '';
    } catch (e) {
        return '';
    }
}
function readStoredSelectedMatchIds(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].selectedMatchIdsKey(locale));
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed.map((value)=>typeof value === 'string' ? value.trim() : '').filter(Boolean);
    } catch (e) {
        return [];
    }
}
function writeStoredSelectedMatchIds(locale, matchIds) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const normalizedMatchIds = Array.from(new Set(matchIds.map((value)=>String(value || '').trim()).filter(Boolean)));
    try {
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].selectedMatchIdsKey(locale), JSON.stringify(normalizedMatchIds));
    } catch (e) {
    // ignore storage access errors
    }
}
function formatProposalDeadlineOffer(value) {
    const normalizedValue = String(value || '').trim();
    if (!normalizedValue) return '';
    const [year = '', month = '', day = ''] = normalizedValue.split('-');
    if (!year || !month || !day) return '';
    return "".concat(day, "-").concat(month, "-").concat(year, " 23:59:59");
}
async function submitProjectProposal(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
    if (!token) throw new Error('no_token');
    const proposalMatchUuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalMatchUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredProposalMatchUuid"])(locale);
    if (!proposalMatchUuid) throw new Error('no_match_request_uuid');
    const deadlineOffer = formatProposalDeadlineOffer(readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].deadlineOfferKey(locale)));
    const isSpecific = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSpecifiedInsighterProject"])(locale);
    const matches = isSpecific ? [] : readStoredSelectedMatchIds(locale);
    if (!isSpecific && matches.length === 0) throw new Error('no_matches');
    const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])(isSpecific ? "/api/account/project/proposal/submit-specific-match/".concat(proposalMatchUuid) : "/api/account/project/proposal/submit/".concat(proposalMatchUuid)), {
        method: 'POST',
        headers: {
            Authorization: "Bearer ".concat(token),
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
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res, 'Failed to submit project proposal.');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/serviceComponentsPayload.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "readServiceComponentPayloadValue",
    ()=>readServiceComponentPayloadValue,
    "readServiceComponentsPayload",
    ()=>readServiceComponentsPayload,
    "updateServiceComponentPayload",
    ()=>updateServiceComponentPayload,
    "writeServiceComponentsPayload",
    ()=>writeServiceComponentsPayload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-client] (ecmascript)");
;
function readServiceComponentsPayload(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceComponentsPayloadKey(locale));
        if (!raw) return {
            components: {}
        };
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object') return {
            components: {}
        };
        const obj = parsed;
        if (!obj.components || typeof obj.components !== 'object') return {
            components: {}
        };
        return obj;
    } catch (e) {
        return {
            components: {}
        };
    }
}
function writeServiceComponentsPayload(locale, payload) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceComponentsPayloadKey(locale), JSON.stringify(payload));
    } catch (e) {
    // ignore
    }
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
    var _current_components;
    const current = readServiceComponentsPayload(locale);
    var _ref;
    return (_ref = (_current_components = current.components) === null || _current_components === void 0 ? void 0 : _current_components[slug]) !== null && _ref !== void 0 ? _ref : null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/projectAddonsSync.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildProjectAddonsFormData",
    ()=>buildProjectAddonsFormData,
    "syncProjectAddons",
    ()=>syncProjectAddons
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectAddonsState.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectRequestUuid.ts [app-client] (ecmascript)");
;
;
;
;
;
function appendText(formData, key, value) {
    formData.append(key, value);
}
function buildProjectAddonsFormData(locale) {
    const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readProjectAddonsState"])(locale);
    const formData = new FormData();
    if (state.kickoffMeeting.enabled) {
        appendText(formData, 'addons[kickoff-meeting][date]', '');
    }
    return formData;
}
async function syncProjectAddons(params) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
    if (!token) throw new Error('no_token');
    const projectUuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredProjectRequestUuid"])(params.locale);
    if (!projectUuid) throw new Error('no_project_uuid');
    const formData = buildProjectAddonsFormData(params.locale);
    const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/account/project/definition/addon/sync/".concat(projectUuid)), {
        method: 'POST',
        headers: {
            Authorization: "Bearer ".concat(token),
            Accept: 'application/json',
            'Accept-Language': params.locale === 'ar' ? 'ar' : 'en',
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        body: formData
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res, 'Failed to save project addons.');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/serviceComponentsSync.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "syncServiceComponents",
    ()=>syncServiceComponents
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectRequestUuid.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsPayload.ts [app-client] (ecmascript)");
;
;
;
;
;
async function syncServiceComponents(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
    if (!token) throw new Error('no_token');
    const projectUuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredProjectRequestUuid"])(locale);
    if (!projectUuid) throw new Error('no_project_uuid');
    const payload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readServiceComponentsPayload"])(locale);
    const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/account/project/definition/component/sync/".concat(projectUuid)), {
        method: 'POST',
        headers: {
            Authorization: "Bearer ".concat(token),
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': locale === 'ar' ? 'ar' : 'en',
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        body: JSON.stringify(payload)
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res, 'Failed to save service components.');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_project_d9d6187c._.js.map