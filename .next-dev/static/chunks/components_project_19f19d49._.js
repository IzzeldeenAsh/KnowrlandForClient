(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/project/projectDefinitionMode.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "readDefinitionMode",
    ()=>readDefinitionMode,
    "storeDefinitionMode",
    ()=>storeDefinitionMode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-client] (ecmascript)");
;
function readDefinitionMode(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const saved = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].definitionModeKey(locale));
        if (saved === 'simple' || saved === 'advanced') return saved;
        // Existing project drafts used the full definition flow.
        return window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectUuidKey(locale)) ? 'advanced' : 'simple';
    } catch (e) {
        return 'simple';
    }
}
function storeDefinitionMode(locale, mode) {
    window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].definitionModeKey(locale), mode);
}
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
"[project]/components/project/projectServiceUuid.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectRequestUuid.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-client] (ecmascript)");
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
    ].sort((a, b)=>{
        var _a_position, _b_position;
        return Number((_a_position = a === null || a === void 0 ? void 0 : a.position) !== null && _a_position !== void 0 ? _a_position : 0) - Number((_b_position = b === null || b === void 0 ? void 0 : b.position) !== null && _b_position !== void 0 ? _b_position : 0);
    });
    var _sorted_;
    return (_sorted_ = sorted[0]) !== null && _sorted_ !== void 0 ? _sorted_ : null;
}
function extractProjectServiceUuid(payload) {
    var _this, _this1;
    var _data;
    const data = (_data = (_this = payload) === null || _this === void 0 ? void 0 : _this.data) !== null && _data !== void 0 ? _data : payload;
    const service = firstProjectService((_this1 = data) === null || _this1 === void 0 ? void 0 : _this1.project_services);
    var _service_uuid;
    return normalizeProjectServiceUuid((_service_uuid = service === null || service === void 0 ? void 0 : service.uuid) !== null && _service_uuid !== void 0 ? _service_uuid : service === null || service === void 0 ? void 0 : service.id);
}
function pickProjectServiceFromProject(payload, projectServiceUuid) {
    var _this, _this1;
    var _data;
    const data = (_data = (_this = payload) === null || _this === void 0 ? void 0 : _this.data) !== null && _data !== void 0 ? _data : payload;
    const list = (_this1 = data) === null || _this1 === void 0 ? void 0 : _this1.project_services;
    if (!Array.isArray(list) || list.length === 0) return null;
    const match = list.find((item)=>normalizeProjectServiceUuid(item === null || item === void 0 ? void 0 : item.uuid) === projectServiceUuid || normalizeProjectServiceUuid(item === null || item === void 0 ? void 0 : item.id) === projectServiceUuid);
    return match !== null && match !== void 0 ? match : firstProjectService(list);
}
function readStoredProjectServiceUuid(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return normalizeProjectServiceUuid(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectServiceUuidKey(locale)));
    } catch (e) {
        return '';
    }
}
function writeStoredProjectServiceUuid(locale, uuid) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const normalized = normalizeProjectServiceUuid(uuid);
    if (!normalized) return;
    try {
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectServiceUuidKey(locale), normalized);
    } catch (e) {
    // ignore storage access errors
    }
}
function clearStoredProjectServiceUuid(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectServiceUuidKey(locale));
    } catch (e) {
    // ignore storage access errors
    }
}
async function ensureProjectServiceUuid(locale) {
    const stored = readStoredProjectServiceUuid(locale);
    if (stored) return stored;
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
    if (!token) throw new Error('no_token');
    const projectUuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredProjectRequestUuid"])(locale);
    if (!projectUuid) throw new Error('no_project_uuid');
    const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/account/project/show/".concat(projectUuid)), {
        method: 'GET',
        headers: {
            Authorization: "Bearer ".concat(token),
            Accept: 'application/json',
            'Accept-Language': locale === 'ar' ? 'ar' : 'en',
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        cache: 'no-store'
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res, 'Failed to load the project.');
    const uuid = extractProjectServiceUuid(await res.json());
    if (!uuid) throw new Error('no_project_service_uuid');
    writeStoredProjectServiceUuid(locale, uuid);
    return uuid;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/projectWizardFlow.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectDefinitionMode.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectAddonsState.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/specifiedInsighterProject.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectServiceUuid.ts [app-client] (ecmascript)");
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readDefinitionMode"])(locale) === 'advanced' || !isDeliverableComponentSlug(normalizeServiceComponentSlug(slug));
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
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = window.sessionStorage.getItem(key);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return expandServiceComponentSlugs(parsed.map((s)=>typeof s === 'string' ? s.trim() : '').filter(Boolean)).filter((slug)=>clientComponentIsVisible(locale, slug));
    } catch (e) {
        return [];
    }
}
function readProjectServiceStepSlugs(locale) {
    return readSlugList(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceComponentSlugsKey(locale), locale);
}
function readProjectLevelStepSlugs(locale) {
    const serviceSteps = new Set(readProjectServiceStepSlugs(locale));
    return readSlugList(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectComponentSlugsKey(locale), locale).filter((slug)=>!serviceSteps.has(slug));
}
function isLeavingComponentSteps(locale, nextStepId, isReviewEditMode) {
    return isReviewEditMode || !nextStepId || !readServiceComponentSlugs(locale).includes(nextStepId);
}
function readServiceComponentSlugs(locale) {
    return expandServiceComponentSlugs([
        ...readProjectServiceStepSlugs(locale),
        ...readSlugList(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectComponentSlugsKey(locale), locale)
    ]);
}
function isServiceFlowActive(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return Boolean(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceFlowKey(locale)));
    } catch (e) {
        return false;
    }
}
function isServiceAddPending(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceFlowKey(locale));
        const flow = raw ? JSON.parse(raw) : null;
        return Boolean(flow) && !(flow === null || flow === void 0 ? void 0 : flow.projectServiceUuid);
    } catch (e) {
        return false;
    }
}
function readServiceFlowReturnStepId(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceFlowKey(locale));
        const flow = raw ? JSON.parse(raw) : null;
        return (flow === null || flow === void 0 ? void 0 : flow.returnStepId) === projectWizardStepIds.projectReview ? projectWizardStepIds.projectReview : projectWizardStepIds.servicesSummary;
    } catch (e) {
        return projectWizardStepIds.servicesSummary;
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
function isAiIntakeReady(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const uuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredProjectServiceUuid"])(locale);
        return Boolean(uuid) && window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].aiIntakeReadyKey(locale)) === uuid;
    } catch (e) {
        return false;
    }
}
function markAiIntakeReady(locale) {
    try {
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].aiIntakeReadyKey(locale), (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredProjectServiceUuid"])(locale));
    } catch (e) {
    // ignore
    }
}
function getProjectWizardStepOrder(locale) {
    const advanced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readDefinitionMode"])(locale) === 'advanced';
    const scopeDeferred = "object" !== 'undefined' && window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceScopeDeferredKey(locale)) === '1';
    const other = "object" !== 'undefined' && window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceIsOtherKey(locale)) === '1';
    const requirementSteps = advanced ? [
        projectWizardStepIds.projectScope,
        ...!scopeDeferred ? [
            projectWizardStepIds.projectSubscopes
        ] : [],
        projectWizardStepIds.componentSetup
    ] : [
        ...other && !isAiIntakeReady(locale) ? [
            projectWizardStepIds.aiIntake
        ] : [],
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/projectComponentsCatalog.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectDefinitionMode.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectWizardFlow.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-client] (ecmascript)");
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
        Authorization: "Bearer ".concat(token),
        Accept: 'application/json',
        'Accept-Language': locale === 'ar' ? 'ar' : 'en',
        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
    };
}
function readComponentCatalog(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const items = JSON.parse(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].componentCatalogKey(locale)) || '[]');
        return Array.isArray(items) ? items : [];
    } catch (e) {
        return [];
    }
}
async function fetchComponentSlugs(url, locale, token, ownershipLevel, signal) {
    const res = await fetch(url, {
        method: 'GET',
        headers: headers(locale, token),
        cache: 'no-store',
        signal
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res, 'Failed to load service components.');
    const json = await res.json();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readDefinitionMode"])(locale);
    const items = (json.data || []).filter((item)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clientComponentIsVisible"])(locale, item.slug || item.name) && (!item.definition_mode_visibility || item.definition_mode_visibility === 'both' || item.definition_mode_visibility === mode)).map((item)=>({
            ...item,
            ownership_level: ownershipLevel
        }));
    window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].componentCatalogKey(locale), JSON.stringify([
        ...readComponentCatalog(locale).filter((item)=>item.ownership_level !== ownershipLevel && (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clientComponentIsVisible"])(locale, item.slug || item.name)),
        ...items
    ]));
    return items.map((item)=>item.slug || item.name).filter((slug)=>Boolean(slug && slug.trim()));
}
async function fetchProjectServiceComponentSlugs(params) {
    const url = params.isOther ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/account/project/definition/service-prompt/component/".concat(params.projectUuid, "/").concat(params.projectServiceUuid)) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/common/setting/service/component/".concat(params.serviceId, "?definition_mode=").concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readDefinitionMode"])(params.locale)));
    return fetchComponentSlugs(url, params.locale, params.token, 'project_service', params.signal);
}
async function fetchProjectLevelComponentSlugs(params) {
    return fetchComponentSlugs((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/account/project/definition/component/".concat(params.projectUuid)), params.locale, params.token, 'project', params.signal);
}
function storeComponentSlugs(locale, params) {
    const serviceSteps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandServiceComponentSlugs"])(params.projectServiceSlugs).filter((slug)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clientComponentIsVisible"])(locale, slug));
    const projectSlugs = params.projectSlugs.filter((slug)=>!params.projectServiceSlugs.includes(slug) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clientComponentIsVisible"])(locale, slug));
    try {
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceComponentSlugsKey(locale), JSON.stringify(serviceSteps));
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectComponentSlugsKey(locale), JSON.stringify(projectSlugs));
    } catch (e) {
    // ignore
    }
}
function readProjectComponentSlugs(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectComponentSlugsKey(locale));
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed.filter((slug)=>typeof slug === 'string' && Boolean(slug) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clientComponentIsVisible"])(locale, slug)) : [];
    } catch (e) {
        return [];
    }
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
    "resetServiceComponentsPayload",
    ()=>resetServiceComponentsPayload,
    "updateServiceComponentPayload",
    ()=>updateServiceComponentPayload,
    "writeServiceComponentsPayload",
    ()=>writeServiceComponentsPayload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectComponentsCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectComponentsCatalog.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-client] (ecmascript)");
;
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
function resetServiceComponentsPayload(locale) {
    let preserveProjectAnswers = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    const projectSlugs = new Set(preserveProjectAnswers ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectComponentsCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readProjectComponentSlugs"])(locale) : []);
    const { components } = readServiceComponentsPayload(locale);
    writeServiceComponentsPayload(locale, {
        components: Object.fromEntries(Object.entries(components || {}).filter((param)=>{
            let [slug] = param;
            return projectSlugs.has(slug);
        }))
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
    var _current_components;
    const current = readServiceComponentsPayload(locale);
    var _ref;
    return (_ref = (_current_components = current.components) === null || _current_components === void 0 ? void 0 : _current_components[slug]) !== null && _ref !== void 0 ? _ref : null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/serviceComponentsSync.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "readProjectLevelComponents",
    ()=>readProjectLevelComponents,
    "syncServiceComponents",
    ()=>syncServiceComponents
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectComponentsCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectComponentsCatalog.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectWizardFlow.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectRequestUuid.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectServiceUuid.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsPayload.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
function readProjectLevelComponents(locale) {
    const projectSlugs = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectComponentsCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readProjectComponentSlugs"])(locale));
    const { components } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readServiceComponentsPayload"])(locale);
    return Object.fromEntries(Object.entries(components || {}).filter((param)=>{
        let [slug] = param;
        return projectSlugs.has(slug);
    }));
}
function readProjectServiceComponents(locale) {
    const projectSlugs = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectComponentsCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readProjectComponentSlugs"])(locale));
    const { components } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readServiceComponentsPayload"])(locale);
    return Object.fromEntries(Object.entries(components || {}).filter((param)=>{
        let [slug] = param;
        return !projectSlugs.has(slug) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandServiceComponentSlugs"])([
            slug
        ]).some((step)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readProjectServiceStepSlugs"])(locale).includes(step));
    }));
}
async function syncServiceComponents(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // Do not sync a service whose entire component set is delegated. Sending an
    // empty payload can trigger older catalogs' client deliverable validation.
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readProjectServiceStepSlugs"])(locale).length === 0) return;
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
    if (!token) throw new Error('no_token');
    const projectUuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredProjectRequestUuid"])(locale);
    if (!projectUuid) throw new Error('no_project_uuid');
    const projectServiceUuid = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ensureProjectServiceUuid"])(locale);
    const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/account/project/definition/component/sync/".concat(projectUuid, "/").concat(projectServiceUuid)), {
        method: 'POST',
        headers: {
            Authorization: "Bearer ".concat(token),
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': locale === 'ar' ? 'ar' : 'en',
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        body: JSON.stringify({
            components: readProjectServiceComponents(locale)
        })
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res, 'Failed to save service components.');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/projectSchedule.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-client] (ecmascript)");
;
function toLocalIsoDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return "".concat(year, "-").concat(month, "-").concat(day);
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
function formatIsoDate(value, locale) {
    let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    const date = parseIsoDate(value);
    if (!date) return value;
    try {
        return new Intl.DateTimeFormat(locale === 'ar' ? 'ar' : 'en', options).format(date);
    } catch (e) {
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
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const plannedStartDate = (window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].plannedStartDateKey(locale)) || '').trim();
        const rawDuration = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].durationDaysKey(locale));
        const durationDays = Number(rawDuration);
        if (!parseIsoDate(plannedStartDate) || rawDuration === null) return null;
        if (!Number.isInteger(durationDays) || durationDays < 0) return null;
        return {
            plannedStartDate,
            durationDays
        };
    } catch (e) {
        return null;
    }
}
function writeProjectSchedule(locale, schedule) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].plannedStartDateKey(locale), schedule.plannedStartDate);
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].durationDaysKey(locale), String(Math.max(0, Math.round(schedule.durationDays))));
    } catch (e) {
    // ignore
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
    ()=>syncProjectProperties,
    "syncProjectPropertiesIfReady",
    ()=>syncProjectPropertiesIfReady
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectRequestUuid.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectSchedule.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsSync.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/specifiedInsighterProject.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-client] (ecmascript)");
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
function scheduleFields(locale) {
    const schedule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readProjectSchedule"])(locale);
    if (!schedule) return {};
    return {
        planned_start_date: schedule.plannedStartDate,
        duration_days: schedule.durationDays
    };
}
function buildProjectPropertiesPayload(locale) {
    const preferredInsighterType = mapPreferredInsighterType(readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].preferredInsighterTypeKey(locale)));
    const insighterOriginType = normalizeValue(readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterOriginTypeKey(locale)));
    const insighterOriginId = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterOriginIdKey(locale)).trim();
    const hasOrigin = Boolean(insighterOriginType && insighterOriginId);
    const basePayload = {
        phase: mapPhase(readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectStatusKey(locale))),
        business_type: mapBusinessType(readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].whoAreYouKey(locale))),
        ...scheduleFields(locale),
        components: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readProjectLevelComponents"])(locale)
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
async function syncProjectPropertiesIfReady(locale) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredProjectRequestUuid"])(locale)) return false;
    await syncProjectProperties(locale);
    return true;
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
    var _stepOrder_slice_reverse_find;
    // Catalog loading is a routing step, so Back returns to the last question.
    const prevStepId = index > 0 ? (_stepOrder_slice_reverse_find = stepOrder.slice(0, index).reverse().find((step)=>step !== __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].componentSetup)) !== null && _stepOrder_slice_reverse_find !== void 0 ? _stepOrder_slice_reverse_find : null : null;
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
    const inServiceFlow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isServiceFlowActive"])(locale);
    const backHref = isReviewEditMode ? reviewHref : prevStepId ? hrefFor(prevStepId) : inServiceFlow ? baseHrefFor((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readServiceFlowReturnStepId"])(locale)) : "/".concat(locale, "/project");
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
"[project]/components/project/ComponentQuestionFrame.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ComponentQuestionFrame
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectDefinitionMode.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectRequestUuid.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectComponentsCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectComponentsCatalog.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectWizardFlow.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsPayload.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsSync.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectPropertiesSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectPropertiesSync.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectWizardNavigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-client] (ecmascript)");
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
// Advanced mode: the client must define scope and deliverables, so these steps cannot be left to the Insighter.
const ADVANCED_REQUIRED_STEPS = new Set([
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectScope,
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectSubscopes,
    ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deliverableStageStepSlugs"]
]);
function ComponentQuestionFrame(param) {
    let { locale, step, children } = param;
    _s();
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale), router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectComponentsCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readComponentCatalog"])(locale).filter((item)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandServiceComponentSlugs"])([
            item.slug
        ]).includes(step));
    const optional = items.length > 0 && items.every((item)=>item.is_required === false);
    const deferred = items.some((item)=>item.fillable_by_insighter) && !((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readDefinitionMode"])(locale) === 'advanced' && ADVANCED_REQUIRED_STEPS.has(step));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ComponentQuestionFrame.useEffect": ()=>{
            const order = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectWizardStepOrder"])(locale);
            if (!order.includes(step)) {
                router.replace("/".concat(locale, "/project/wizard/").concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredProjectRequestUuid"])(locale) ? 'component-setup' : 'service'));
                return;
            }
            setReady(true);
        }
    }["ComponentQuestionFrame.useEffect"], [
        locale,
        step,
        router
    ]);
    async function skip() {
        setBusy(true);
        try {
            const payload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readServiceComponentsPayload"])(locale);
            items.forEach((item)=>{
                delete payload.components[item.slug];
                if (item.slug === 'target-market') [
                    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketModeKey(locale),
                    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketCountryIdsKey(locale),
                    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketRegionIdsKey(locale),
                    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketEconomicBlocIdsKey(locale)
                ].forEach((key)=>window.sessionStorage.removeItem(key));
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeServiceComponentsPayload"])(locale, payload);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["syncServiceComponents"])(locale);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectPropertiesSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["syncProjectProperties"])(locale);
            nav.goNext();
        } catch (e) {
            setError(locale === 'ar' ? 'تعذر حفظ التغييرات.' : 'Could not save changes.');
        } finally{
            setBusy(false);
        }
    }
    if (!ready || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectWizardStepOrder"])(locale).includes(step)) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            optional && deferred && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-5xl mx-auto mb-4 rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm",
                dir: locale === 'ar' ? 'rtl' : 'ltr',
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: locale === 'ar' ? 'يمكن للإنسايتر إكمال هذا المتطلب ضمن عرضه.' : 'An Insighter can complete this requirement in their offer.'
                    }, void 0, false, {
                        fileName: "[project]/components/project/ComponentQuestionFrame.tsx",
                        lineNumber: 42,
                        columnNumber: 4
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mt-2 font-semibold text-[#1C7CBB] underline",
                        disabled: busy,
                        onClick: ()=>void skip(),
                        children: locale === 'ar' ? 'اتركه للإنسايتر' : 'Let the Insighter define this'
                    }, void 0, false, {
                        fileName: "[project]/components/project/ComponentQuestionFrame.tsx",
                        lineNumber: 43,
                        columnNumber: 4
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        role: "alert",
                        className: "text-rose-700 mt-2",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/components/project/ComponentQuestionFrame.tsx",
                        lineNumber: 44,
                        columnNumber: 14
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/ComponentQuestionFrame.tsx",
                lineNumber: 41,
                columnNumber: 36
            }, this),
            children
        ]
    }, void 0, true);
}
_s(ComponentQuestionFrame, "WH6SrFCqI0xJKtLBLUiaN6NR2WY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ComponentQuestionFrame;
var _c;
__turbopack_context__.k.register(_c, "ComponentQuestionFrame");
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
"[project]/components/project/projectServiceSessions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectComponentsCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectComponentsCatalog.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectServiceUuid.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsPayload.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-client] (ecmascript)");
;
;
;
;
function scopedKeys(locale) {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceIdsKey(locale),
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceLabelKey(locale),
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].servicePromptKey(locale),
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceIsOtherKey(locale),
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceScopeParentIdsKey(locale),
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceScopeChildIdsByParentKey(locale),
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceScopeHasChildrenKey(locale),
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceScopeDeferredKey(locale),
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceManualScopesKey(locale),
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceManualSubscopesByScopeKey(locale),
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceAiSuggestedScopesKey(locale),
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectScopeSnapshotKey(locale),
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceComponentSlugsKey(locale)
    ];
}
function readJson(key) {
    try {
        const raw = window.sessionStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
    } catch (e) {
        return null;
    }
}
function splitComponents(locale) {
    const projectSlugs = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectComponentsCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readProjectComponentSlugs"])(locale));
    const { components } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readServiceComponentsPayload"])(locale);
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
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const uuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredProjectServiceUuid"])(locale);
    if (!uuid) return;
    const values = {};
    for (const key of scopedKeys(locale)){
        const value = window.sessionStorage.getItem(key);
        if (value !== null) values[key] = value;
    }
    const session = {
        values,
        components: splitComponents(locale).serviceLevel,
        componentCatalog: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectComponentsCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readComponentCatalog"])(locale).filter((item)=>item.ownership_level === 'project_service')
    };
    try {
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceSessionKey(locale, uuid), JSON.stringify(session));
    } catch (e) {
    // ignore
    }
}
function activateServiceSession(locale, projectServiceUuid) {
    let seed = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    saveActiveServiceSession(locale);
    const saved = readJson(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceSessionKey(locale, projectServiceUuid));
    const { projectLevel } = splitComponents(locale);
    try {
        for (const key of scopedKeys(locale))window.sessionStorage.removeItem(key);
        var _saved_values;
        const values = (_saved_values = saved === null || saved === void 0 ? void 0 : saved.values) !== null && _saved_values !== void 0 ? _saved_values : seed;
        for (const [key, value] of Object.entries(values))window.sessionStorage.setItem(key, value);
        var _saved_componentCatalog;
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].componentCatalogKey(locale), JSON.stringify([
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectComponentsCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readComponentCatalog"])(locale).filter((item)=>item.ownership_level === 'project'),
            ...(_saved_componentCatalog = saved === null || saved === void 0 ? void 0 : saved.componentCatalog) !== null && _saved_componentCatalog !== void 0 ? _saved_componentCatalog : []
        ]));
    } catch (e) {
    // ignore
    }
    var _saved_components;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeServiceComponentsPayload"])(locale, {
        components: {
            ...(_saved_components = saved === null || saved === void 0 ? void 0 : saved.components) !== null && _saved_components !== void 0 ? _saved_components : {},
            ...projectLevel
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeStoredProjectServiceUuid"])(locale, projectServiceUuid);
}
function readPrimaryProjectServiceUuid(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].primaryProjectServiceUuidKey(locale)) || '';
    } catch (e) {
        return '';
    }
}
function writePrimaryProjectServiceUuid(locale, uuid) {
    if ("object" === 'undefined' || !uuid) return;
    try {
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].primaryProjectServiceUuidKey(locale), uuid);
    } catch (e) {
    // ignore
    }
}
function readServiceFlow(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const flow = readJson(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceFlowKey(locale));
    return (flow === null || flow === void 0 ? void 0 : flow.projectServiceUuid) ? flow : null;
}
function startServiceFlow(locale, flow) {
    let seed = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (!readPrimaryProjectServiceUuid(locale)) {
        writePrimaryProjectServiceUuid(locale, (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredProjectServiceUuid"])(locale));
    }
    activateServiceSession(locale, flow.projectServiceUuid, seed);
    try {
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceFlowKey(locale), JSON.stringify(flow));
    } catch (e) {
    // ignore
    }
}
function beginServiceAdd(locale, returnStepId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (!readPrimaryProjectServiceUuid(locale)) {
        writePrimaryProjectServiceUuid(locale, (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredProjectServiceUuid"])(locale));
    }
    try {
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceFlowKey(locale), JSON.stringify({
            mode: 'add',
            projectServiceUuid: '',
            returnStepId
        }));
    } catch (e) {
    // ignore
    }
}
function serviceSessionSeed(locale, service) {
    return {
        [__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceIdsKey(locale)]: JSON.stringify(service.serviceId),
        [__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceIsOtherKey(locale)]: service.isOther ? '1' : '0',
        ...service.isOther ? {} : {
            [__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceLabelKey(locale)]: service.name
        },
        ...service.prompt ? {
            [__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].servicePromptKey(locale)]: service.prompt
        } : {}
    };
}
function finishServiceFlow(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceFlowKey(locale));
    } catch (e) {
    // ignore
    }
    const primary = readPrimaryProjectServiceUuid(locale);
    if (primary && primary !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredProjectServiceUuid"])(locale)) {
        activateServiceSession(locale, primary);
    }
}
function promoteServiceToPrimary(locale, removedUuid, nextUuid) {
    let seed = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    activateServiceSession(locale, nextUuid, seed);
    forgetServiceSession(locale, removedUuid);
    writePrimaryProjectServiceUuid(locale, nextUuid);
}
function forgetServiceSession(locale, projectServiceUuid) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceSessionKey(locale, projectServiceUuid));
    } catch (e) {
    // ignore
    }
}
function latestSavedSessionDeliverableDay(locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const prefix = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceSessionKey(locale, '');
    const active = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredProjectServiceUuid"])(locale);
    let latest = 0;
    try {
        for(let index = 0; index < window.sessionStorage.length; index += 1){
            var _this, _session_components;
            const key = window.sessionStorage.key(index);
            if (!(key === null || key === void 0 ? void 0 : key.startsWith(prefix)) || key === prefix + active) continue;
            const session = readJson(key);
            const deliverables = (_this = session === null || session === void 0 ? void 0 : (_session_components = session.components) === null || _session_components === void 0 ? void 0 : _session_components['deliverable-stage']) === null || _this === void 0 ? void 0 : _this.deliverables;
            if (!Array.isArray(deliverables)) continue;
            for (const item of deliverables){
                latest = Math.max(latest, Math.round(Number(item === null || item === void 0 ? void 0 : item.period_days)) || 0);
            }
        }
    } catch (e) {
        return latest;
    }
    return latest;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/initiateProjectDraft.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initiateProjectDraft",
    ()=>initiateProjectDraft
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectRequestUuid.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalMatchUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectProposalMatchUuid.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectServiceUuid.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceSessions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectServiceSessions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/specifiedInsighterProject.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectDefinitionMode.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsPayload.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-client] (ecmascript)");
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
function parseStoredId(value) {
    if (!value) return null;
    try {
        const parsed = JSON.parse(value);
        const number = Number(Array.isArray(parsed) ? parsed[0] : parsed);
        return Number.isFinite(number) && number > 0 ? number : null;
    } catch (e) {
        return null;
    }
}
function toApiLanguage(value, locale) {
    const language = (value || '').toLowerCase();
    if (language.includes('arab')) return 'arabic';
    if (language.includes('english')) return 'english';
    return locale === 'ar' ? 'arabic' : 'english';
}
function toApiProjectType(value) {
    if (value === 'frame_work_agreement' || value === 'framework') return 'frame_work_agreement';
    if (value === 'urgent_request' || value === 'urgent') return 'urgent_request';
    return 'ad_hoc';
}
async function initiateProjectDraft(locale, mode) {
    var _data, _this;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredProjectRequestUuid"])(locale)) return;
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
    if (!token) throw new Error(locale === 'ar' ? 'يرجى تسجيل الدخول للمتابعة.' : 'Please sign in to continue.');
    const serviceId = parseStoredId(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceIdsKey(locale)));
    if (!serviceId) throw new Error(locale === 'ar' ? 'اختر الخدمة أولًا.' : 'Choose a service first.');
    const isOtherSelected = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceIsOtherKey(locale)) === '1';
    const servicePrompt = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].servicePromptKey(locale)) || '';
    if (isOtherSelected && !servicePrompt.trim()) throw new Error(locale === 'ar' ? 'اكتب وصفًا للخدمة أولًا.' : 'Describe the service first.');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storeDefinitionMode"])(locale, mode);
    const headers = {
        Authorization: "Bearer ".concat(token),
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': locale === 'ar' ? 'ar' : 'en',
        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    const prompt = isOtherSelected ? servicePrompt.trim() : '';
    const apiServiceId = serviceId;
    const insighterIndustryId = parseStoredId(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterIndustryIdKey(locale)));
    const specifiedInsighterUuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredSpecifiedInsighterUuid"])(locale);
    const initiatePath = specifiedInsighterUuid ? "/api/account/project/definition/initiate-specific/".concat(encodeURIComponent(specifiedInsighterUuid)) : '/api/account/project/definition/initiate';
    const initRes = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])(initiatePath), {
        method: 'POST',
        headers,
        body: JSON.stringify({
            language: toApiLanguage(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].deliverablesLanguageKey(locale)), locale),
            type: toApiProjectType(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale))),
            definition_mode: mode,
            service_id: apiServiceId,
            ...insighterIndustryId != null ? {
                insighter_industry_id: insighterIndustryId
            } : {},
            service_prompt: prompt,
            prompt_ai: prompt
        })
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(initRes, 'Failed to create the project.');
    const initJson = await initRes.json();
    const returnedMode = (_this = initJson) === null || _this === void 0 ? void 0 : (_data = _this.data) === null || _data === void 0 ? void 0 : _data.definition_mode;
    if (returnedMode === 'simple' || returnedMode === 'advanced') (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storeDefinitionMode"])(locale, returnedMode);
    const projectUuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractProjectRequestUuid"])(initJson);
    if (!projectUuid) throw new Error('init_bad_response');
    const projectServiceUuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractProjectServiceUuid"])(initJson);
    if (!projectServiceUuid) throw new Error('init_bad_response');
    const proposalMatchUuid = specifiedInsighterUuid ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalMatchUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractProjectProposalMatchUuid"])(initJson) : '';
    if (specifiedInsighterUuid && !proposalMatchUuid) throw new Error('init_bad_response');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeStoredProjectRequestUuid"])(locale, projectUuid);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeStoredProjectServiceUuid"])(locale, projectServiceUuid);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceSessions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writePrimaryProjectServiceUuid"])(locale, projectServiceUuid);
    if (specifiedInsighterUuid) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalMatchUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeStoredProposalMatchUuid"])(locale, proposalMatchUuid);
    } else {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalMatchUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearStoredProposalMatchUuid"])(locale);
    }
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetServiceComponentsPayload"])(locale, false);
        window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceScopeDeferredKey(locale));
        window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].componentCatalogKey(locale));
    } catch (e) {
    // ignore
    }
    try {
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceComponentSlugsKey(locale), JSON.stringify([]));
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectComponentSlugsKey(locale), JSON.stringify([]));
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceScopeHasChildrenKey(locale), '0');
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceScopeParentIdsKey(locale), JSON.stringify([]));
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceScopeChildIdsByParentKey(locale), JSON.stringify({}));
        window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceManualScopesKey(locale));
        window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceAiSuggestedScopesKey(locale));
        window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceManualSubscopesByScopeKey(locale));
    } catch (e) {
    // ignore
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/projectAiIntake.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AI_POLL_INTERVAL_MS",
    ()=>AI_POLL_INTERVAL_MS,
    "waitForProjectAiIntake",
    ()=>waitForProjectAiIntake
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-client] (ecmascript)");
;
;
const AI_POLL_INTERVAL_MS = 5000;
const MAX_CONSECUTIVE_ERRORS = 6;
function extractAiIntakeStatus(payload) {
    const root = payload;
    var _root_data;
    const data = (_root_data = root === null || root === void 0 ? void 0 : root.data) !== null && _root_data !== void 0 ? _root_data : payload;
    var _data_status;
    const status = String((_data_status = data === null || data === void 0 ? void 0 : data.status) !== null && _data_status !== void 0 ? _data_status : '').trim().toLowerCase();
    const questions = Array.isArray(data === null || data === void 0 ? void 0 : data.questions) ? data.questions.map((question)=>{
        var _question_key, _ref, _question_question, _ref1, _ref2;
        return {
            key: String((_ref = (_question_key = question === null || question === void 0 ? void 0 : question.key) !== null && _question_key !== void 0 ? _question_key : question === null || question === void 0 ? void 0 : question.id) !== null && _ref !== void 0 ? _ref : '').trim(),
            question: String((_ref2 = (_ref1 = (_question_question = question === null || question === void 0 ? void 0 : question.question) !== null && _question_question !== void 0 ? _question_question : question === null || question === void 0 ? void 0 : question.text) !== null && _ref1 !== void 0 ? _ref1 : question === null || question === void 0 ? void 0 : question.label) !== null && _ref2 !== void 0 ? _ref2 : '').trim()
        };
    }).filter((question)=>question.key && question.question) : [];
    return {
        status,
        needsClarification: Boolean(data === null || data === void 0 ? void 0 : data.needs_clarification) || status === 'needs_clarification',
        questions
    };
}
function waitForNextCheck(signal) {
    return new Promise((resolve, reject)=>{
        signal.throwIfAborted();
        const onAbort = ()=>{
            clearTimeout(timer);
            reject(signal.reason);
        };
        const timer = setTimeout(()=>{
            signal.removeEventListener('abort', onAbort);
            resolve();
        }, AI_POLL_INTERVAL_MS);
        signal.addEventListener('abort', onAbort, {
            once: true
        });
    });
}
async function waitForProjectAiIntake(params) {
    const { locale, token, projectUuid, projectServiceUuid, signal } = params;
    let consecutiveErrors = 0;
    if (params.delayFirstCheck) await waitForNextCheck(signal);
    while(!signal.aborted){
        try {
            const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/account/project/definition/ai-intake/check-clarification/".concat(projectUuid, "/").concat(projectServiceUuid)), {
                headers: {
                    Authorization: "Bearer ".concat(token),
                    Accept: 'application/json',
                    'Accept-Language': locale,
                    'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
                },
                cache: 'no-store',
                signal
            });
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(response, locale === 'ar' ? 'تعذر التحقق من حالة الطلب.' : 'Failed to check the prompt status.');
            const payload = await response.json();
            const intake = extractAiIntakeStatus(payload);
            consecutiveErrors = 0;
            if (intake.needsClarification || intake.status === 'ready' || intake.status === 'failed') {
                return {
                    ...intake,
                    payload
                };
            }
        } catch (error) {
            signal.throwIfAborted();
            consecutiveErrors += 1;
            if (consecutiveErrors >= MAX_CONSECUTIVE_ERRORS || error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProjectApiError"] && error.status >= 400 && error.status < 500) throw error;
        }
        await waitForNextCheck(signal);
    }
    signal.throwIfAborted();
    throw new Error('AI intake check cancelled.');
}
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
    let { locale, entered, projectTypeId, status, serviceLabelOverride } = param;
    _s();
    const isRTL = locale === 'ar';
    const typeLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectLabels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectTypeLabel"])(locale, projectTypeId);
    const [serviceLabel, setServiceLabel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const outsideWizard = serviceLabelOverride !== undefined;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProjectSelectedTypeHeader.useEffect": ()=>{
            if (outsideWizard) {
                setServiceLabel((serviceLabelOverride === null || serviceLabelOverride === void 0 ? void 0 : serviceLabelOverride.trim()) || null);
                return;
            }
            try {
                const storedServiceLabel = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceLabelKey(locale));
                setServiceLabel((storedServiceLabel === null || storedServiceLabel === void 0 ? void 0 : storedServiceLabel.trim()) || null);
            } catch (e) {
                setServiceLabel(null);
            }
        }
    }["ProjectSelectedTypeHeader.useEffect"], [
        locale,
        outsideWizard,
        serviceLabelOverride
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
                            lineNumber: 61,
                            columnNumber: 11
                        }, this),
                        status ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs font-semibold text-slate-600 rounded-full px-3 py-1 border border-slate-400",
                            children: status
                        }, void 0, false, {
                            fileName: "[project]/components/project/ProjectSelectedTypeHeader.tsx",
                            lineNumber: 64,
                            columnNumber: 21
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/project/ProjectSelectedTypeHeader.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, this),
                outsideWizard ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$SpecifiedInsighterBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    locale: locale,
                    className: "max-w-full sm:max-w-[45%]"
                }, void 0, false, {
                    fileName: "[project]/components/project/ProjectSelectedTypeHeader.tsx",
                    lineNumber: 66,
                    columnNumber: 33
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/project/ProjectSelectedTypeHeader.tsx",
            lineNumber: 59,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/project/ProjectSelectedTypeHeader.tsx",
        lineNumber: 50,
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
"[project]/components/project/backendLimits.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// The backend sizes string() columns to VARCHAR(191) (Schema::defaultStringLength in
// AppServiceProvider) and does not length-check them, so longer text fails on insert.
__turbopack_context__.s([
    "BACKEND_STRING_MAX",
    ()=>BACKEND_STRING_MAX
]);
const BACKEND_STRING_MAX = 191;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/projectDeliverables.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectSchedule.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsPayload.ts [app-client] (ecmascript)");
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
        return "المخرج ".concat(index + 1);
    }
    if (index === 0) return 'First draft';
    if (index === 1) return 'Final version';
    return "Deliverable ".concat(index + 1);
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
    const today = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["todayIsoDate"])();
    return stages.map((stage, index)=>{
        var _legacyWay_physical_workshop, _legacyWay_session, _legacyWay_physical_workshop1;
        if (!stage || typeof stage !== 'object') return null;
        const legacyWay = stage.way || {};
        const selected = Number((_legacyWay_physical_workshop = legacyWay.physical_workshop) === null || _legacyWay_physical_workshop === void 0 ? void 0 : _legacyWay_physical_workshop.selected) > 0 ? 'physical_workshop' : Number((_legacyWay_session = legacyWay.session) === null || _legacyWay_session === void 0 ? void 0 : _legacyWay_session.selected) > 0 ? 'session' : 'on_platform';
        return {
            title: defaultDeliverableTitle(locale, index),
            period_days: stage.date ? Math.max(0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["diffIsoDays"])(today, String(stage.date))) : 0,
            report_type: toReportTypes(stage.report_type),
            way: {
                selected,
                address: selected === 'physical_workshop' ? String(((_legacyWay_physical_workshop1 = legacyWay.physical_workshop) === null || _legacyWay_physical_workshop1 === void 0 ? void 0 : _legacyWay_physical_workshop1.address) || '') : null
            }
        };
    }).filter((item)=>Boolean(item));
}
function readDeliverables(locale) {
    const raw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readServiceComponentPayloadValue"])(locale, DELIVERABLE_STAGE_SLUG);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateServiceComponentPayload"])(locale, DELIVERABLE_STAGE_SLUG, {
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
        return days <= 10 ? "بعد ".concat(days, " أيام") : "بعد ".concat(days, " يومًا");
    }
    if (days === 0) return 'Start day';
    return days === 1 ? '1 Day' : "".concat(days, " Days");
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
    return "".concat(unit, " after start");
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
        if (count === 1) return "بعد ".concat(one);
        if (count === 2) return "بعد ".concat(two);
        return count <= 10 ? "بعد ".concat(count, " ").concat(few) : "بعد ".concat(count, " ").concat(many);
    }
    if (unit === 'weeks') return count === 1 ? '1 Week' : "".concat(count, " Weeks");
    return count === 1 ? '1 Month' : "".concat(count, " Months");
}
function durationLabel(locale, days) {
    if (locale === 'ar') {
        if (days === 0) return 'نفس اليوم';
        if (days === 1) return 'يوم واحد';
        if (days === 2) return 'يومان';
        return days <= 10 ? "".concat(days, " أيام") : "".concat(days, " يومًا");
    }
    return days === 1 ? '1 Day' : "".concat(days, " Days");
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/projectServiceRows.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** A project service as the wizard lists it, parsed from `project/show`'s `project_services`. */ __turbopack_context__.s([
    "toProjectServiceRows",
    ()=>toProjectServiceRows
]);
function toProjectServiceRows(projectServices) {
    if (!Array.isArray(projectServices)) return [];
    return projectServices.map((item)=>{
        var _item_service;
        const service = (_item_service = item === null || item === void 0 ? void 0 : item.service) !== null && _item_service !== void 0 ? _item_service : {};
        const deliverables = (Array.isArray(item === null || item === void 0 ? void 0 : item.components) ? item.components : []).flatMap((block)=>{
            var _block_deliverablestage;
            var _block_deliverablestage_deliverables;
            return (_block_deliverablestage_deliverables = block === null || block === void 0 ? void 0 : (_block_deliverablestage = block['deliverable-stage']) === null || _block_deliverablestage === void 0 ? void 0 : _block_deliverablestage.deliverables) !== null && _block_deliverablestage_deliverables !== void 0 ? _block_deliverablestage_deliverables : [];
        }).map((d)=>({
                title: String((d === null || d === void 0 ? void 0 : d.title) || ''),
                period_days: Number(d === null || d === void 0 ? void 0 : d.period_days) || 0
            }));
        return {
            uuid: String((item === null || item === void 0 ? void 0 : item.uuid) || ''),
            position: Number(item === null || item === void 0 ? void 0 : item.position) || 0,
            name: String((item === null || item === void 0 ? void 0 : item.title) || (service === null || service === void 0 ? void 0 : service.name) || ''),
            serviceId: Number.isFinite(Number(service === null || service === void 0 ? void 0 : service.id)) ? Number(service.id) : null,
            isOther: String((service === null || service === void 0 ? void 0 : service.slug) || '') === 'other',
            slug: String((service === null || service === void 0 ? void 0 : service.slug) || ''),
            prompt: String((item === null || item === void 0 ? void 0 : item.prompt_ai) || ''),
            scopeNames: (Array.isArray(item === null || item === void 0 ? void 0 : item.scopes) ? item.scopes : []).map((scope)=>String((scope === null || scope === void 0 ? void 0 : scope.scope) || '')).filter(Boolean),
            subscopeCount: (Array.isArray(item === null || item === void 0 ? void 0 : item.scopes) ? item.scopes : []).reduce((sum, scope)=>sum + (Array.isArray(scope === null || scope === void 0 ? void 0 : scope.children) ? scope.children.length : 0), 0),
            deliverables
        };
    }).filter((row)=>row.uuid).sort((a, b)=>a.position - b.position);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/serviceMeta.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "serviceMetaForSlug",
    ()=>serviceMetaForSlug
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChartBar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChartBar$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconChartBar.mjs [app-client] (ecmascript) <export default as IconChartBar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChartArrowsVertical$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChartArrowsVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconChartArrowsVertical.mjs [app-client] (ecmascript) <export default as IconChartArrowsVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconClipboardText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconClipboardText$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconClipboardText.mjs [app-client] (ecmascript) <export default as IconClipboardText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDeviceDesktopAnalytics$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDeviceDesktopAnalytics$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconDeviceDesktopAnalytics.mjs [app-client] (ecmascript) <export default as IconDeviceDesktopAnalytics>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuildingBank$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuildingBank$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBuildingBank.mjs [app-client] (ecmascript) <export default as IconBuildingBank>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTargetArrow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTargetArrow$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconTargetArrow.mjs [app-client] (ecmascript) <export default as IconTargetArrow>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCoins$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCoins$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCoins.mjs [app-client] (ecmascript) <export default as IconCoins>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconShieldCheck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconShieldCheck.mjs [app-client] (ecmascript) <export default as IconShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconReportAnalytics$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconReportAnalytics$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconReportAnalytics.mjs [app-client] (ecmascript) <export default as IconReportAnalytics>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileSearch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileSearch$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconFileSearch.mjs [app-client] (ecmascript) <export default as IconFileSearch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBulb$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBulb$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBulb.mjs [app-client] (ecmascript) <export default as IconBulb>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileDollar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileDollar$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconFileDollar.mjs [app-client] (ecmascript) <export default as IconFileDollar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconSparkles.mjs [app-client] (ecmascript) <export default as IconSparkles>");
;
// Hardcoded presentation metadata per service slug. Icons are placeholders to be
// swapped for custom illustrations later.
const SERVICE_META = {
    'market-research': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChartBar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChartBar$3e$__["IconChartBar"],
        iconClass: 'bg-blue-50 text-blue-600',
        description: {
            en: 'Understand market size, demand, and competition.',
            ar: 'افهم حجم السوق والطلب والمنافسة.'
        }
    },
    'pre-feasibility-study': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileSearch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileSearch$3e$__["IconFileSearch"],
        iconClass: 'bg-lime-50 text-lime-600',
        description: {
            en: 'Quickly assess whether your idea is worth developing.',
            ar: 'قيّم بسرعة ما إذا كانت فكرتك جديرة بالتطوير.'
        }
    },
    'feasibility-study': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChartArrowsVertical$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChartArrowsVertical$3e$__["IconChartArrowsVertical"],
        iconClass: 'bg-amber-50 text-amber-600',
        description: {
            en: 'Assess viability, profitability, and next steps.',
            ar: 'قيّم الجدوى والربحية والخطوات التالية.'
        }
    },
    'business-plan': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconClipboardText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconClipboardText$3e$__["IconClipboardText"],
        iconClass: 'bg-emerald-50 text-emerald-600',
        description: {
            en: 'Build a roadmap for strategy and operations.',
            ar: 'ابنِ خارطة طريق للاستراتيجية والعمليات.'
        }
    },
    'digital-transformation': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDeviceDesktopAnalytics$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDeviceDesktopAnalytics$3e$__["IconDeviceDesktopAnalytics"],
        iconClass: 'bg-violet-50 text-violet-600',
        description: {
            en: 'Modernize processes and technology to scale.',
            ar: 'حدّث العمليات والتقنيات للتوسع.'
        }
    },
    'company-valuation': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuildingBank$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuildingBank$3e$__["IconBuildingBank"],
        iconClass: 'bg-cyan-50 text-cyan-600',
        description: {
            en: "Determine your company's fair value.",
            ar: 'حدّد القيمة العادلة لشركتك.'
        }
    },
    'go-to-market-strategy': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTargetArrow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTargetArrow$3e$__["IconTargetArrow"],
        iconClass: 'bg-rose-50 text-rose-600',
        description: {
            en: 'Plan launch, positioning, and customer growth.',
            ar: 'خطّط للإطلاق والتموضع ونمو العملاء.'
        }
    },
    'fundraising-strategy': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCoins$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCoins$3e$__["IconCoins"],
        iconClass: 'bg-teal-50 text-teal-600',
        description: {
            en: 'Prepare to raise capital and attract investors.',
            ar: 'استعد لجمع التمويل وجذب المستثمرين.'
        }
    },
    'policies-procedures-governance': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconShieldCheck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconShieldCheck$3e$__["IconShieldCheck"],
        iconClass: 'bg-indigo-50 text-indigo-600',
        description: {
            en: 'Set governance, policies, and compliance.',
            ar: 'ضع الحوكمة والسياسات والامتثال.'
        }
    },
    'brief-feasibility-study': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileSearch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileSearch$3e$__["IconFileSearch"],
        iconClass: 'bg-lime-50 text-lime-600',
        description: {
            en: 'Quick check on whether your idea holds up.',
            ar: 'فحص سريع لمدى جدوى فكرتك.'
        }
    },
    'opportunity-evaluation': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBulb$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBulb$3e$__["IconBulb"],
        iconClass: 'bg-orange-50 text-orange-600',
        description: {
            en: 'Weigh the potential of a business opportunity.',
            ar: 'قيّم إمكانات الفرصة التجارية.'
        }
    },
    'funding-application': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileDollar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileDollar$3e$__["IconFileDollar"],
        iconClass: 'bg-fuchsia-50 text-fuchsia-600',
        description: {
            en: 'Prepare and package your funding application.',
            ar: 'جهّز وأعدّ طلب التمويل الخاص بك.'
        }
    }
};
const OTHER_SERVICE_META = {
    Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSparkles$3e$__["IconSparkles"],
    iconClass: 'bg-sky-50 text-sky-600',
    description: {
        en: 'A custom service defined from your own description.',
        ar: 'خدمة مخصصة مبنية على وصفك.'
    }
};
const FALLBACK_SERVICE_META = {
    Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconReportAnalytics$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconReportAnalytics$3e$__["IconReportAnalytics"],
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/ProjectServicesRail.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectServicesRailLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCheck.mjs [app-client] (ecmascript) <export default as IconCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLayoutGridAdd$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLayoutGridAdd$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconLayoutGridAdd.mjs [app-client] (ecmascript) <export default as IconLayoutGridAdd>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectDefinitionMode.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectDeliverables.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectRequestUuid.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceRows$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectServiceRows.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectServiceUuid.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectWizardFlow.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceMeta$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceMeta.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/specifiedInsighterProject.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
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
// Specific-insighter projects can bundle several services. While the client
// works on a service, this rail shows each project service as a card: the
// one in progress, the finished ones, and placeholders hinting that more can
// be added. It is an indicator only; services are added and edited from the
// services step.
/** Progress through a service's steps; the services step has no service in progress. */ const SERVICE_STAGES = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].service]: 0,
    [__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectScope]: 1,
    [__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectSubscopes]: 2,
    'deliverables-plan': 3
};
const STAGE_COUNT = 4;
const MIN_CARDS = 3;
// Last fetched services per project, so the rail paints at once on the next step.
const rowsCache = new Map();
async function fetchProjectServiceRows(locale, projectUuid) {
    var _json_data;
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
    if (!token) return null;
    const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/account/project/show/".concat(projectUuid)), {
        headers: {
            Authorization: "Bearer ".concat(token),
            Accept: 'application/json',
            'Accept-Language': locale === 'ar' ? 'ar' : 'en',
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        cache: 'no-store'
    });
    if (!res.ok) return null;
    const json = await res.json();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceRows$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toProjectServiceRows"])(json === null || json === void 0 ? void 0 : (_json_data = json.data) === null || _json_data === void 0 ? void 0 : _json_data.project_services);
}
function readActiveServiceLabel(locale) {
    try {
        return window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceLabelKey(locale)) || '';
    } catch (e) {
        return '';
    }
}
function summaryFor(locale, row) {
    const isRTL = locale === 'ar';
    const scopes = row.scopeNames.length;
    const deliverables = row.deliverables.length;
    const firstDue = deliverables ? Math.min(...row.deliverables.map((d)=>d.period_days)) : null;
    const parts = [
        scopes ? isRTL ? "".concat(scopes, " نطاقات") : "".concat(scopes, " ").concat(scopes === 1 ? 'scope' : 'scopes') : '',
        deliverables ? isRTL ? "".concat(deliverables, " مخرجات") : "".concat(deliverables, " ").concat(deliverables === 1 ? 'deliverable' : 'deliverables') : '',
        firstDue !== null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dayLabel"])(locale, firstDue) : ''
    ].filter(Boolean);
    return parts.join(' · ');
}
function buildCards(locale, step, rows) {
    const isRTL = locale === 'ar';
    const stage = SERVICE_STAGES[step];
    const inService = stage !== undefined;
    // While another service is being picked, the stored service is still the main one.
    const pendingAdd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isServiceAddPending"])(locale);
    const activeUuid = inService && !pendingAdd ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredProjectServiceUuid"])(locale) : '';
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
            complete: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readDefinitionMode"])(locale) === 'simple' || row.deliverables.length > 0,
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
            hint: first && current ? isRTL ? "اختيارية · أضفها بعد الخدمة ".concat(current.number) : "Optional · add it after service ".concat(current.number) : isRTL ? 'اختيارية' : 'Optional'
        });
    }
    return cards;
}
function useServicesRail(locale, step) {
    _s();
    const [enabled, setEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [insighterName, setInsighterName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [cards, setCards] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useServicesRail.useEffect": ()=>{
            var _readStoredSpecifiedInsighterDisplay;
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSpecifiedInsighterProject"])(locale)) return;
            setEnabled(true);
            setInsighterName(((_readStoredSpecifiedInsighterDisplay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredSpecifiedInsighterDisplay"])(locale)) === null || _readStoredSpecifiedInsighterDisplay === void 0 ? void 0 : _readStoredSpecifiedInsighterDisplay.name) || '');
            const projectUuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredProjectRequestUuid"])(locale);
            var _rowsCache_get;
            setCards(buildCards(locale, step, projectUuid ? (_rowsCache_get = rowsCache.get(projectUuid)) !== null && _rowsCache_get !== void 0 ? _rowsCache_get : [] : []));
            if (!projectUuid) return;
            let cancelled = false;
            fetchProjectServiceRows(locale, projectUuid).then({
                "useServicesRail.useEffect": (rows)=>{
                    if (cancelled || !rows) return;
                    rowsCache.set(projectUuid, rows);
                    setCards(buildCards(locale, step, rows));
                }
            }["useServicesRail.useEffect"]).catch({
                "useServicesRail.useEffect": ()=>{
                // The rail is an indicator; keep what it shows.
                }
            }["useServicesRail.useEffect"]);
            return ({
                "useServicesRail.useEffect": ()=>{
                    cancelled = true;
                }
            })["useServicesRail.useEffect"];
        }
    }["useServicesRail.useEffect"], [
        locale,
        step
    ]);
    return {
        enabled,
        insighterName,
        cards
    };
}
_s(useServicesRail, "Yrp+aCgE40LhJUXxfKIIeQZ1EDo=");
function ServiceIconTile(param) {
    let { card, size } = param;
    const meta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceMeta$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serviceMetaForSlug"])(card.isOther ? 'other' : card.slug);
    const Icon = meta.Icon;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-flex shrink-0 items-center justify-center ".concat(size === 'md' ? 'h-10 w-10 rounded-xl' : 'h-8 w-8 rounded-[10px]', " ").concat(meta.iconClass),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
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
_c = ServiceIconTile;
function StageBar(param) {
    let { stage, compact = false } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-4 ".concat(compact ? 'gap-1' : 'gap-1.5'),
        "aria-hidden": "true",
        children: Array.from({
            length: STAGE_COUNT
        }, (_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "block rounded-full ".concat(compact ? 'h-[3px]' : 'h-1', " ").concat(index < stage ? 'bg-[#1C7CBB]' : index === stage ? "bg-[#1C7CBB] ".concat(compact ? 'ring-2' : 'ring-[3px]', " ring-sky-100") : 'bg-slate-200')
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
_c1 = StageBar;
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
    return locale === 'ar' ? "الخطوة ".concat(stage + 1, " من ").concat(STAGE_COUNT, " · ").concat(labels[stage]) : "Step ".concat(stage + 1, " of ").concat(STAGE_COUNT, " · ").concat(labels[stage]);
}
function RailCardView(param) {
    let { locale, card } = param;
    const isRTL = locale === 'ar';
    if (card.kind === 'current') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            "aria-current": "step",
            className: "flex flex-col gap-3.5 rounded-2xl border-[1.5px] border-[#1C7CBB] bg-white p-4 shadow-[0_10px_28px_-16px_rgba(28,124,187,0.55)]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        card.name ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ServiceIconTile, {
                            card: card,
                            size: "md"
                        }, void 0, false, {
                            fileName: "[project]/components/project/ProjectServicesRail.tsx",
                            lineNumber: 235,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-[1.5px] border-dashed border-[#1C7CBB] bg-sky-50 text-[#1C7CBB]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLayoutGridAdd$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLayoutGridAdd$3e$__["IconLayoutGridAdd"], {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex min-w-0 flex-col gap-0.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[11px] font-semibold uppercase tracking-wide text-[#1C7CBB]",
                                    children: isRTL ? "الخدمة ".concat(card.number, " · قيد الإعداد") : "Service ".concat(card.number, " · In progress")
                                }, void 0, false, {
                                    fileName: "[project]/components/project/ProjectServicesRail.tsx",
                                    lineNumber: 242,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StageBar, {
                    stage: card.stage
                }, void 0, false, {
                    fileName: "[project]/components/project/ProjectServicesRail.tsx",
                    lineNumber: 250,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            className: "flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3.5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] ".concat(card.complete ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'),
                    children: card.complete ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                        size: 16,
                        stroke: 2.5
                    }, void 0, false, {
                        fileName: "[project]/components/project/ProjectServicesRail.tsx",
                        lineNumber: 265,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex min-w-0 flex-col gap-0.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "truncate text-sm font-semibold text-slate-900",
                            children: card.name
                        }, void 0, false, {
                            fileName: "[project]/components/project/ProjectServicesRail.tsx",
                            lineNumber: 271,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs font-semibold ".concat(card.complete ? 'text-emerald-700' : 'text-amber-700'),
                            children: card.complete ? isRTL ? 'مكتملة' : 'Complete' : isRTL ? 'تحتاج إلى إكمال' : 'Needs completion'
                        }, void 0, false, {
                            fileName: "[project]/components/project/ProjectServicesRail.tsx",
                            lineNumber: 272,
                            columnNumber: 11
                        }, this),
                        card.summary ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        className: "flex items-center gap-3 rounded-2xl border-[1.5px] border-dashed border-slate-300 bg-white/50 p-3.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border-[1.5px] border-dashed border-slate-400 text-[13px] font-semibold text-slate-600",
                children: card.number
            }, void 0, false, {
                fileName: "[project]/components/project/ProjectServicesRail.tsx",
                lineNumber: 291,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex min-w-0 flex-col gap-0.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-semibold text-slate-700",
                        children: isRTL ? "الخدمة ".concat(card.number) : "Service ".concat(card.number)
                    }, void 0, false, {
                        fileName: "[project]/components/project/ProjectServicesRail.tsx",
                        lineNumber: 295,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_c2 = RailCardView;
function CompactCardView(param) {
    let { locale, card } = param;
    const isRTL = locale === 'ar';
    if (card.kind === 'current') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            "aria-current": "step",
            className: "flex min-w-0 flex-col gap-2 rounded-[14px] border-[1.5px] border-[#1C7CBB] bg-white px-3 py-2.5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[10px] font-semibold uppercase tracking-wide text-[#1C7CBB]",
                    children: isRTL ? "الخدمة ".concat(card.number) : "Service ".concat(card.number)
                }, void 0, false, {
                    fileName: "[project]/components/project/ProjectServicesRail.tsx",
                    lineNumber: 313,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "truncate text-[13px] font-semibold text-slate-900",
                    children: card.name || (isRTL ? 'اختر خدمة' : 'Choose a service')
                }, void 0, false, {
                    fileName: "[project]/components/project/ProjectServicesRail.tsx",
                    lineNumber: 316,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StageBar, {
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            className: "flex min-w-0 flex-col justify-center gap-1 rounded-[14px] border border-slate-200 bg-white px-2.5 py-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "inline-flex h-5 w-5 items-center justify-center rounded-md ".concat(card.complete ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'),
                    children: card.complete ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                        size: 12,
                        stroke: 2.5
                    }, void 0, false, {
                        fileName: "[project]/components/project/ProjectServicesRail.tsx",
                        lineNumber: 332,
                        columnNumber: 28
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        className: "flex min-w-0 flex-col justify-center gap-1 rounded-[14px] border-[1.5px] border-dashed border-slate-300 bg-white/50 px-2.5 py-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[13px] font-semibold text-slate-700",
                children: card.number
            }, void 0, false, {
                fileName: "[project]/components/project/ProjectServicesRail.tsx",
                lineNumber: 341,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_c3 = CompactCardView;
function ProjectServicesRailLayout(param) {
    let { locale, step, children } = param;
    _s1();
    const isRTL = locale === 'ar';
    const { enabled, insighterName, cards } = useServicesRail(locale, step);
    if (!enabled) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
    const label = isRTL ? 'خدمات المشروع' : 'Project services';
    const compactColumns = cards.map((card)=>card.kind === 'current' ? 'minmax(0,2fr)' : 'minmax(0,1fr)').join(' ');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mx-auto flex w-full max-w-[1440px] items-start gap-8 xl:gap-12",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                "aria-label": label,
                className: "sticky top-0 hidden w-[280px] shrink-0 pt-2 sm:pt-4 lg:block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-1 px-1 pb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-semibold uppercase tracking-[0.08em] text-slate-600",
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/components/project/ProjectServicesRail.tsx",
                                lineNumber: 375,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[13px] leading-snug text-slate-500",
                                children: insighterName ? isRTL ? "اجمع خدمات ".concat(insighterName, " في مشروع واحد.") : "Bundle services from ".concat(insighterName, " in one project.") : isRTL ? 'اجمع عدة خدمات في مشروع واحد.' : 'Bundle several services in one project.'
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                        className: "flex flex-col gap-3",
                        children: cards.map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RailCardView, {
                                locale: locale,
                                card: card
                            }, "".concat(card.kind, "-").concat(card.number), false, {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-w-0 flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                        "aria-label": label,
                        className: "mb-4 mt-2 grid gap-2 lg:hidden",
                        style: {
                            gridTemplateColumns: compactColumns
                        },
                        children: cards.map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CompactCardView, {
                                locale: locale,
                                card: card
                            }, "".concat(card.kind, "-").concat(card.number), false, {
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
_s1(ProjectServicesRailLayout, "V3hcUz79CeODC/3Gfg00rLLwcl4=", false, function() {
    return [
        useServicesRail
    ];
});
_c4 = ProjectServicesRailLayout;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "ServiceIconTile");
__turbopack_context__.k.register(_c1, "StageBar");
__turbopack_context__.k.register(_c2, "RailCardView");
__turbopack_context__.k.register(_c3, "CompactCardView");
__turbopack_context__.k.register(_c4, "ProjectServicesRailLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
]);

//# sourceMappingURL=components_project_19f19d49._.js.map