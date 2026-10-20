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
"[project]/components/project/questions/service-components/deliverableReportTypes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
        } catch (e) {
            return sanitize([
                trimmed
            ]);
        }
    }
    return [];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DeliverablesPlanQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$listbox$2f$listbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/listbox/listbox.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$popover$2f$popover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/popover/popover.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCalendarEvent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCalendarEvent$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCalendarEvent.mjs [app-client] (ecmascript) <export default as IconCalendarEvent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCheck.mjs [app-client] (ecmascript) <export default as IconCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronDown$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconChevronDown.mjs [app-client] (ecmascript) <export default as IconChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCloudUpload$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCloudUpload$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCloudUpload.mjs [app-client] (ecmascript) <export default as IconCloudUpload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDeviceDesktopUp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDeviceDesktopUp$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconDeviceDesktopUp.mjs [app-client] (ecmascript) <export default as IconDeviceDesktopUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconMapPin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconMapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconMapPin.mjs [app-client] (ecmascript) <export default as IconMapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconMinus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconMinus$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconMinus.mjs [app-client] (ecmascript) <export default as IconMinus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconPlus.mjs [app-client] (ecmascript) <export default as IconPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBooks$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBooks$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBooks.mjs [app-client] (ecmascript) <export default as IconBooks>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTrash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTrash$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconTrash.mjs [app-client] (ecmascript) <export default as IconTrash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/ProjectSelectedTypeHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectDeliverables.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectSchedule.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsSync.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectStepErrorToast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectWizardNavigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$service$2d$components$2f$deliverableReportTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/service-components/deliverableReportTypes.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
const WAY_OPTIONS = [
    {
        value: "on_platform",
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCloudUpload$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCloudUpload$3e$__["IconCloudUpload"],
        iconClass: "text-sky-600",
        label: {
            en: "On platform",
            ar: "على المنصة"
        }
    },
    {
        value: "session",
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDeviceDesktopUp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDeviceDesktopUp$3e$__["IconDeviceDesktopUp"],
        iconClass: "text-violet-600",
        label: {
            en: "Online session",
            ar: "جلسة أونلاين"
        }
    },
    {
        value: "physical_workshop",
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconMapPin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconMapPin$3e$__["IconMapPin"],
        iconClass: "text-amber-600",
        label: {
            en: "In-person workshop",
            ar: "ورشة حضورية"
        }
    }
];
const PILL_CLASS = "inline-flex h-9 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-300 hover:bg-slate-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-blue-200 data-[open]:border-blue-300 data-[open]:bg-blue-50/60";
const PLACEHOLDER_CLASS = "font-medium text-slate-500";
const PANEL_CLASS = "z-50 rounded-[12px] border border-slate-200 bg-white p-2 shadow-lg [--anchor-gap:6px] focus:outline-none";
function isDeliverableComplete(item) {
    var _item_way_address;
    if (!item.title.trim()) return false;
    if (item.period_days === null) return false;
    if (item.report_type.length === 0) return false;
    if (item.way.selected === null) return false;
    if (item.way.selected === "physical_workshop") return Boolean((_item_way_address = item.way.address) === null || _item_way_address === void 0 ? void 0 : _item_way_address.trim());
    return true;
}
function FormatIcons(param) {
    let { types, options } = param;
    const icons = types.map((type)=>{
        var _options_find;
        return (_options_find = options.find((option)=>option.value === type)) === null || _options_find === void 0 ? void 0 : _options_find.iconSrc;
    }).filter((src)=>Boolean(src)).slice(0, 3);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "flex items-center -space-x-1.5 rtl:space-x-reverse",
        children: icons.map((src)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: src,
                alt: "",
                className: "h-5 w-5 rounded-[4px] bg-white object-contain ring-2 ring-white"
            }, src, false, {
                fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                lineNumber: 135,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
        lineNumber: 133,
        columnNumber: 5
    }, this);
}
_c = FormatIcons;
function DeliverablesPlanQuestion(param) {
    let { locale, edit } = param;
    _s();
    const isRTL = locale === "ar";
    const isEnglish = typeof locale === "string" && locale.toLowerCase().startsWith("en");
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const reportTypeOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DeliverablesPlanQuestion.useMemo[reportTypeOptions]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$service$2d$components$2f$deliverableReportTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getReportTypeOptions"])(locale)
    }["DeliverablesPlanQuestion.useMemo[reportTypeOptions]"], [
        locale
    ]);
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [projectType, setProjectType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deliverables, setDeliverables] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // The unit each row's due date is entered in, by row position; never saved.
    const [dueUnits, setDueUnits] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Only a freshly added deliverable grabs focus.
    const [focusIndex, setFocusIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // The schedule step comes first, so deliverables fit inside the planned duration.
    const [schedule, setSchedule] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [attempted, setAttempted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"])(error, locale);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DeliverablesPlanQuestion.useEffect": ()=>{
            const timer = window.setTimeout({
                "DeliverablesPlanQuestion.useEffect.timer": ()=>setEntered(true)
            }["DeliverablesPlanQuestion.useEffect.timer"], 30);
            return ({
                "DeliverablesPlanQuestion.useEffect": ()=>window.clearTimeout(timer)
            })["DeliverablesPlanQuestion.useEffect"];
        }
    }["DeliverablesPlanQuestion.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DeliverablesPlanQuestion.useEffect": ()=>{
            if (edit) {
                var _edit_schedule;
                var _edit_schedule_durationDays;
                const limit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUrgentProjectType"])(edit.projectType) ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["URGENT_MAX_DURATION_DAYS"] : (_edit_schedule_durationDays = (_edit_schedule = edit.schedule) === null || _edit_schedule === void 0 ? void 0 : _edit_schedule.durationDays) !== null && _edit_schedule_durationDays !== void 0 ? _edit_schedule_durationDays : null;
                setProjectType(edit.projectType);
                setSchedule((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUrgentProjectType"])(edit.projectType) ? null : edit.schedule);
                setDeliverables(edit.deliverables.length > 0 ? edit.deliverables.map({
                    "DeliverablesPlanQuestion.useEffect": (item)=>limit === null || item.period_days === null ? item : {
                            ...item,
                            period_days: Math.min(item.period_days, limit)
                        }
                }["DeliverablesPlanQuestion.useEffect"]) : [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDeliverable"])()
                ]);
                return;
            }
            let storedProjectType = null;
            try {
                storedProjectType = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale));
            } catch (e) {
            // ignore
            }
            const urgent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUrgentProjectType"])(storedProjectType);
            const storedSchedule = urgent ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readProjectSchedule"])(locale);
            const limit = urgent ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["URGENT_MAX_DURATION_DAYS"] : storedSchedule ? storedSchedule.durationDays : null;
            const stored = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readDeliverables"])(locale).map({
                "DeliverablesPlanQuestion.useEffect.stored": (item)=>limit === null ? item : {
                        ...item,
                        period_days: Math.min(item.period_days, limit)
                    }
            }["DeliverablesPlanQuestion.useEffect.stored"]);
            setProjectType(storedProjectType);
            setSchedule(storedSchedule);
            setDeliverables(stored.length > 0 ? stored : [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDeliverable"])()
            ]);
        // The edit adapter seeds the step once; later renders keep the local edits.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["DeliverablesPlanQuestion.useEffect"], [
        locale
    ]);
    const isUrgent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUrgentProjectType"])(projectType);
    const maxDay = isUrgent ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["URGENT_MAX_DURATION_DAYS"] : schedule ? schedule.durationDays : Number.MAX_SAFE_INTEGER;
    const plannedCloseDate = schedule ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDaysToIsoDate"])(schedule.plannedStartDate, schedule.durationDays) : "";
    const dateFor = (days)=>schedule ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIsoDate"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDaysToIsoDate"])(schedule.plannedStartDate, days), locale, {
            month: "short",
            day: "numeric"
        }) : "";
    // Urgent requests are due within a day, so they stay in days.
    const unitFor = (index)=>{
        var _deliverables_index;
        var _deliverables_index_period_days, _dueUnits_index;
        return isUrgent ? "days" : (_dueUnits_index = dueUnits[index]) !== null && _dueUnits_index !== void 0 ? _dueUnits_index : (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inferDueUnit"])((_deliverables_index_period_days = (_deliverables_index = deliverables[index]) === null || _deliverables_index === void 0 ? void 0 : _deliverables_index.period_days) !== null && _deliverables_index_period_days !== void 0 ? _deliverables_index_period_days : null);
    };
    const amountFor = (index)=>{
        var _deliverables_index;
        var _deliverables_index_period_days;
        const days = (_deliverables_index_period_days = (_deliverables_index = deliverables[index]) === null || _deliverables_index === void 0 ? void 0 : _deliverables_index.period_days) !== null && _deliverables_index_period_days !== void 0 ? _deliverables_index_period_days : null;
        return days === null ? null : Math.round(days / __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DUE_UNIT_DAYS"][unitFor(index)]);
    };
    const update = (index, patch)=>{
        setDeliverables((prev)=>prev.map((item, i)=>i === index ? {
                    ...item,
                    ...patch
                } : item));
    };
    const setDay = (index, value)=>{
        update(index, {
            period_days: value === null ? null : Math.min(maxDay, Math.max(0, Math.round(value) || 0))
        });
    };
    const setDueAmount = (index, amount)=>{
        setDay(index, amount === null ? null : Math.max(0, Math.round(amount) || 0) * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DUE_UNIT_DAYS"][unitFor(index)]);
    };
    /** Switching the unit keeps the due date as close as the new unit allows, never moving a later date to the start day. */ const setDueUnit = (index, unit)=>{
        var _deliverables_index;
        setDueUnits((prev)=>{
            const next = [
                ...prev
            ];
            next[index] = unit;
            return next;
        });
        var _deliverables_index_period_days;
        const days = (_deliverables_index_period_days = (_deliverables_index = deliverables[index]) === null || _deliverables_index === void 0 ? void 0 : _deliverables_index.period_days) !== null && _deliverables_index_period_days !== void 0 ? _deliverables_index_period_days : null;
        if (days === null) return;
        const amount = days > 0 ? Math.max(1, Math.round(days / __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DUE_UNIT_DAYS"][unit])) : 0;
        setDay(index, amount * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DUE_UNIT_DAYS"][unit]);
    };
    const setWay = (index, selected)=>{
        const item = deliverables[index];
        update(index, {
            way: {
                selected,
                address: selected === "physical_workshop" ? item.way.address || "" : null
            }
        });
    };
    const addDeliverable = ()=>{
        if (deliverables.length >= __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_DELIVERABLES"]) return;
        setDeliverables((prev)=>[
                ...prev,
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDeliverable"])()
            ]);
        setFocusIndex(deliverables.length);
        setAttempted(false);
    };
    const removeDeliverable = (index)=>{
        if (deliverables.length <= 1) return;
        setDeliverables((prev)=>prev.filter((_, i)=>i !== index));
        setDueUnits((prev)=>prev.filter((_, i)=>i !== index));
        setFocusIndex(null);
    };
    const completed = deliverables.filter(isDeliverableComplete);
    const allComplete = deliverables.length > 0 && completed.length === deliverables.length;
    const onContinue = async ()=>{
        if (submitting) return;
        if (!allComplete) {
            setAttempted(true);
            return;
        }
        setError(null);
        // Keep deliverables in timeline order so positions match their dates.
        const ordered = completed.map((item, index)=>({
                item,
                index
            })).sort((a, b)=>a.item.period_days - b.item.period_days || a.index - b.index).map((param)=>{
            let { item } = param;
            return {
                ...item,
                title: item.title.trim(),
                way: {
                    ...item.way,
                    address: item.way.address ? item.way.address.trim() : item.way.address
                }
            };
        });
        if (edit) {
            edit.onSave(ordered);
            return;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeDeliverables"])(locale, ordered);
        setSubmitting(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["syncServiceComponents"])(locale);
            nav.goNext();
        } catch (err) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? "تعذر حفظ المخرجات." : "Failed to save deliverables."));
        } finally{
            setSubmitting(false);
        }
    };
    const formatSummary = (types)=>{
        const first = reportTypeOptions.find((option)=>option.value === types[0]);
        if (!first) return isRTL ? "اختر صيغة الملف" : "Choose file format";
        return types.length > 1 ? "".concat(first.label, " +").concat(types.length - 1) : first.label;
    };
    const renderDeliverable = (item, index)=>{
        var _item_way_address;
        const linkedToPayment = !!item.id && !!(edit === null || edit === void 0 ? void 0 : edit.lockedIds.includes(item.id));
        const way = WAY_OPTIONS.find((option)=>option.value === item.way.selected);
        const missingTitle = attempted && !item.title.trim();
        const missingDay = attempted && item.period_days === null;
        const missingTypes = attempted && item.report_type.length === 0;
        const missingWay = attempted && item.way.selected === null;
        const missingAddress = attempted && item.way.selected === "physical_workshop" && !((_item_way_address = item.way.address) === null || _item_way_address === void 0 ? void 0 : _item_way_address.trim());
        var _amountFor, _amountFor1;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            className: "rounded-[12px] border border-slate-200 bg-white/90 p-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            htmlFor: "deliverable-title-".concat(index),
                            className: "text-xs font-bold text-slate-500",
                            children: deliverables.length > 1 ? isRTL ? "اسم المخرج ".concat(index + 1) : "Deliverable ".concat(index + 1, " name") : isRTL ? "اسم المخرج" : "Deliverable name"
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                            lineNumber: 389,
                            columnNumber: 11
                        }, this),
                        linkedToPayment ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[11px] font-semibold text-slate-400",
                            children: isRTL ? "مرتبط بدفعة" : "Linked to a payment"
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                            lineNumber: 402,
                            columnNumber: 13
                        }, this) : deliverables.length > 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>removeDeliverable(index),
                            "aria-label": isRTL ? "حذف المخرج" : "Remove deliverable",
                            className: "inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-600",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTrash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTrash$3e$__["IconTrash"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                lineNumber: 412,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                            lineNumber: 406,
                            columnNumber: 13
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                    lineNumber: 388,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    id: "deliverable-title-".concat(index),
                    value: item.title,
                    onChange: (event)=>update(index, {
                            title: event.target.value
                        }),
                    maxLength: 120,
                    autoFocus: index === focusIndex,
                    placeholder: isRTL ? "مثال: تقرير تحليل السوق" : "e.g. Market analysis report",
                    className: "mt-1.5 w-full rounded-[10px] border bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 placeholder:font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 ".concat(missingTitle ? "border-rose-300" : "border-slate-200")
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                    lineNumber: 416,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-3 flex flex-wrap items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$popover$2f$popover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$popover$2f$popover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverButton"], {
                                    className: "".concat(PILL_CLASS, " ").concat(missingDay ? "border-rose-300" : ""),
                                    "aria-label": isRTL ? "موعد التسليم" : "Due date",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCalendarEvent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCalendarEvent$3e$__["IconCalendarEvent"], {
                                            size: 16,
                                            className: "text-slate-500"
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 436,
                                            columnNumber: 15
                                        }, this),
                                        item.period_days === null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: PLACEHOLDER_CLASS,
                                            children: isRTL ? "اختر موعد التسليم" : "Choose due date"
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 438,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dueLabel"])(locale, item.period_days, unitFor(index))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                    lineNumber: 443,
                                                    columnNumber: 19
                                                }, this),
                                                schedule ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium text-slate-400",
                                                    children: [
                                                        "· ",
                                                        dateFor(item.period_days)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                    lineNumber: 445,
                                                    columnNumber: 21
                                                }, this) : null
                                            ]
                                        }, void 0, true),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronDown$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronDown$3e$__["IconChevronDown"], {
                                            size: 14,
                                            className: "text-slate-400"
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 451,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                    lineNumber: 432,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$popover$2f$popover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverPanel"], {
                                    anchor: "bottom start",
                                    className: "".concat(PANEL_CLASS, " w-72 p-3"),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-bold text-slate-500",
                                            children: isRTL ? "موعد التسليم" : "Due"
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 457,
                                            columnNumber: 15
                                        }, this),
                                        isUrgent ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            role: "radiogroup",
                                            "aria-label": isRTL ? "وحدة المدة" : "Duration unit",
                                            className: "mt-2 grid grid-cols-3 gap-0.5 rounded-[10px] border border-slate-200 bg-slate-50 p-[3px]",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DUE_UNITS"].map((unit)=>{
                                                const selected = unitFor(index) === unit;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    role: "radio",
                                                    "aria-checked": selected,
                                                    onClick: ()=>setDueUnit(index, unit),
                                                    className: "h-[30px] rounded-[7px] px-2 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 ".concat(selected ? "bg-white text-blue-700 ring-1 ring-blue-200" : "text-slate-500 hover:text-slate-900"),
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dueUnitLabel"])(locale, unit)
                                                }, unit, false, {
                                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                    lineNumber: 469,
                                                    columnNumber: 23
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 461,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center rounded-full border border-slate-200 bg-white",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>{
                                                                var _amountFor;
                                                                return setDueAmount(index, Math.max(0, ((_amountFor = amountFor(index)) !== null && _amountFor !== void 0 ? _amountFor : 0) - 1));
                                                            },
                                                            disabled: !amountFor(index),
                                                            "aria-label": isRTL ? "أبكر" : "Earlier",
                                                            className: "inline-flex h-8 w-8 items-center justify-center text-slate-600 hover:text-slate-900 disabled:text-slate-300",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconMinus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconMinus$3e$__["IconMinus"], {
                                                                size: 14
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                                lineNumber: 496,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                            lineNumber: 489,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            inputMode: "numeric",
                                                            min: 0,
                                                            max: maxDay === Number.MAX_SAFE_INTEGER ? undefined : Math.floor(maxDay / __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DUE_UNIT_DAYS"][unitFor(index)]),
                                                            value: (_amountFor = amountFor(index)) !== null && _amountFor !== void 0 ? _amountFor : "",
                                                            placeholder: "—",
                                                            onChange: (event)=>setDueAmount(index, event.target.value === "" ? null : Number(event.target.value)),
                                                            "aria-label": (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dueUnitHint"])(locale, unitFor(index)),
                                                            className: "w-12 appearance-none border-0 bg-transparent p-0 text-center text-sm font-bold tabular-nums text-slate-900 focus:outline-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                            lineNumber: 498,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>{
                                                                var _amountFor;
                                                                return setDueAmount(index, ((_amountFor = amountFor(index)) !== null && _amountFor !== void 0 ? _amountFor : 0) + 1);
                                                            },
                                                            disabled: (((_amountFor1 = amountFor(index)) !== null && _amountFor1 !== void 0 ? _amountFor1 : 0) + 1) * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DUE_UNIT_DAYS"][unitFor(index)] > maxDay,
                                                            "aria-label": isRTL ? "لاحقًا" : "Later",
                                                            className: "inline-flex h-8 w-8 items-center justify-center text-slate-600 hover:text-slate-900 disabled:text-slate-300",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlus$3e$__["IconPlus"], {
                                                                size: 14
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                                lineNumber: 529,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                            lineNumber: 520,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                    lineNumber: 488,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-semibold text-slate-500",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dueUnitHint"])(locale, unitFor(index))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                    lineNumber: 532,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 487,
                                            columnNumber: 15
                                        }, this),
                                        item.period_days !== null && (unitFor(index) !== "days" || schedule) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-[11px] font-medium text-slate-500",
                                            children: [
                                                unitFor(index) !== "days" ? isRTL ? "= ".concat(item.period_days, " يومًا") : "= ".concat(item.period_days, " days") : null,
                                                schedule ? isRTL ? "التسليم في ".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIsoDate"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDaysToIsoDate"])(schedule.plannedStartDate, item.period_days), locale)) : "Due ".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIsoDate"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDaysToIsoDate"])(schedule.plannedStartDate, item.period_days), locale)) : null
                                            ].filter(Boolean).join(" · ")
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 537,
                                            columnNumber: 17
                                        }, this) : null,
                                        schedule ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-[11px] font-semibold text-slate-400",
                                            children: isRTL ? "ينتهي المشروع في ".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIsoDate"])(plannedCloseDate, locale)) : "Project ends ".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIsoDate"])(plannedCloseDate, locale))
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 555,
                                            columnNumber: 17
                                        }, this) : null,
                                        isUrgent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-[11px] font-semibold text-amber-700",
                                            children: isRTL ? "الطلبات العاجلة تُسلَّم خلال 24 ساعة." : "Urgent requests are delivered within 24 hours."
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 562,
                                            columnNumber: 17
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                    lineNumber: 453,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                            lineNumber: 431,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$listbox$2f$listbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Listbox"], {
                            multiple: true,
                            value: item.report_type,
                            onChange: (next)=>update(index, {
                                    report_type: next
                                }),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$listbox$2f$listbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListboxButton"], {
                                    className: "".concat(PILL_CLASS, " ").concat(missingTypes ? "border-rose-300" : ""),
                                    "aria-label": isRTL ? "صيغة الملف" : "File format",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FormatIcons, {
                                            types: item.report_type,
                                            options: reportTypeOptions
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 580,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: item.report_type.length === 0 ? PLACEHOLDER_CLASS : "",
                                            children: formatSummary(item.report_type)
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 581,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronDown$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronDown$3e$__["IconChevronDown"], {
                                            size: 14,
                                            className: "text-slate-400"
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 586,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                    lineNumber: 576,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$listbox$2f$listbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListboxOptions"], {
                                    anchor: "bottom start",
                                    className: "".concat(PANEL_CLASS, " w-60"),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "px-2 pb-1 pt-1 text-xs font-bold text-slate-500",
                                            children: isRTL ? "صيغة الملف (يمكن اختيار أكثر من صيغة)" : "File format (pick any)"
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 589,
                                            columnNumber: 15
                                        }, this),
                                        reportTypeOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$listbox$2f$listbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListboxOption"], {
                                                value: option.value,
                                                className: "group flex cursor-pointer items-center gap-2.5 rounded-[8px] px-2 py-2 text-sm font-semibold text-slate-700 data-[focus]:bg-slate-50 data-[selected]:text-blue-800",
                                                children: [
                                                    option.iconSrc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: option.iconSrc,
                                                        alt: "",
                                                        className: "h-5 w-5 object-contain"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                        lineNumber: 599,
                                                        columnNumber: 21
                                                    }, this) : null,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex-1",
                                                        children: option.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                        lineNumber: 601,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                                                        size: 16,
                                                        className: "invisible text-blue-600 group-data-[selected]:visible"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                        lineNumber: 602,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, option.value, true, {
                                                fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                lineNumber: 593,
                                                columnNumber: 17
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                    lineNumber: 588,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                            lineNumber: 571,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$listbox$2f$listbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Listbox"], {
                            value: item.way.selected,
                            onChange: (next)=>{
                                if (next) setWay(index, next);
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$listbox$2f$listbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListboxButton"], {
                                    className: "".concat(PILL_CLASS, " ").concat(missingWay ? "border-rose-300" : ""),
                                    "aria-label": isRTL ? "طريقة التسليم" : "Delivery method",
                                    children: [
                                        way ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(way.Icon, {
                                                    size: 16,
                                                    className: way.iconClass
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                    lineNumber: 623,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: isRTL ? way.label.ar : way.label.en
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                    lineNumber: 624,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBooks$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBooks$3e$__["IconBooks"], {
                                                    size: 16,
                                                    className: "text-slate-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                    lineNumber: 628,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: PLACEHOLDER_CLASS,
                                                    children: isRTL ? "اختر طريقة التسليم" : "Choose delivery method"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                    lineNumber: 629,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronDown$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronDown$3e$__["IconChevronDown"], {
                                            size: 14,
                                            className: "text-slate-400"
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 634,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                    lineNumber: 617,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$listbox$2f$listbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListboxOptions"], {
                                    anchor: "bottom start",
                                    className: "".concat(PANEL_CLASS, " w-60"),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "px-2 pb-1 pt-1 text-xs font-bold text-slate-500",
                                            children: isRTL ? "طريقة التسليم" : "Delivered by"
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 637,
                                            columnNumber: 15
                                        }, this),
                                        WAY_OPTIONS.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$listbox$2f$listbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListboxOption"], {
                                                value: option.value,
                                                className: "group flex cursor-pointer items-center gap-2.5 rounded-[8px] px-2 py-2 text-sm font-semibold text-slate-700 data-[focus]:bg-slate-50 data-[selected]:text-blue-800",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(option.Icon, {
                                                        size: 18,
                                                        className: option.iconClass
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                        lineNumber: 646,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex-1",
                                                        children: isRTL ? option.label.ar : option.label.en
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                        lineNumber: 647,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                                                        size: 16,
                                                        className: "invisible text-blue-600 group-data-[selected]:visible"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                        lineNumber: 650,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, option.value, true, {
                                                fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                lineNumber: 641,
                                                columnNumber: 17
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                    lineNumber: 636,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                            lineNumber: 611,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                    lineNumber: 430,
                    columnNumber: 9
                }, this),
                item.way.selected === "physical_workshop" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "mt-3 flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconMapPin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconMapPin$3e$__["IconMapPin"], {
                            size: 16,
                            className: "shrink-0 text-slate-400"
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                            lineNumber: 662,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "sr-only",
                            children: isRTL ? "عنوان الورشة" : "Workshop address"
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                            lineNumber: 663,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: item.way.address || "",
                            onChange: (event)=>update(index, {
                                    way: {
                                        selected: "physical_workshop",
                                        address: event.target.value
                                    }
                                }),
                            placeholder: isRTL ? "عنوان الورشة، مثال: عمّان" : "Workshop address, e.g. Amman",
                            className: "w-full rounded-[10px] border bg-white px-3 py-2 text-sm font-semibold text-slate-900 placeholder:font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 ".concat(missingAddress ? "border-rose-300" : "border-slate-200")
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                            lineNumber: 666,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                    lineNumber: 661,
                    columnNumber: 11
                }, this) : null,
                missingTitle || missingDay || missingTypes || missingWay || missingAddress ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-2 text-xs font-semibold text-rose-600",
                    children: missingTitle ? isRTL ? "أدخل اسم المخرج." : "Enter a name for this deliverable." : missingDay ? isRTL ? "اختر موعد التسليم." : "Choose when it's due." : missingTypes ? isRTL ? "اختر صيغة ملف واحدة على الأقل." : "Pick at least one file format." : missingWay ? isRTL ? "اختر طريقة التسليم." : "Choose how it's delivered." : isRTL ? "أدخل عنوان الورشة." : "Enter the workshop address."
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                    lineNumber: 687,
                    columnNumber: 11
                }, this) : null
            ]
        }, index, true, {
            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
            lineNumber: 384,
            columnNumber: 7
        }, this);
    };
    var _edit_backHref, _edit_continueLabel;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-3xl mx-auto",
        dir: isRTL ? "rtl" : "ltr",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                locale: locale,
                entered: entered,
                projectTypeId: projectType,
                serviceLabelOverride: edit ? edit.serviceLabel : undefined
            }, void 0, false, {
                fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                lineNumber: 715,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 text-start transition-all duration-700 ".concat(entered ? "opacity-100 translate-x-0" : isRTL ? "opacity-0 translate-x-4" : "opacity-0 -translate-x-4"),
                children: [
                    isEnglish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                        children: '\n            #deliverables-plan-question-title {\n              font-family: "IBM Plex Serif", serif !important;\n            }\n          '
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                        lineNumber: 732,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "deliverables-plan-question-title",
                        className: "text-2xl sm:text-3xl font-medium tracking-tight text-slate-900",
                        children: isRTL ? "ما المخرجات التي ستستلمها؟" : "What will you receive?"
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                        lineNumber: 738,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm sm:text-base font-semibold text-slate-600",
                        children: isRTL ? "سمِّ المخرج وحدد موعده وصيغته وطريقة تسليمه." : "Name it, set when it's due, its format, and how it reaches you."
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                        lineNumber: 744,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                lineNumber: 722,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 pb-36 sm:pb-28",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "space-y-2.5",
                        children: deliverables.map((item, index)=>renderDeliverable(item, index))
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                        lineNumber: 752,
                        columnNumber: 9
                    }, this),
                    deliverables.length < __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_DELIVERABLES"] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: addDeliverable,
                        className: "mt-3 inline-flex items-center gap-1.5 rounded-full px-2 py-1.5 text-sm font-bold text-blue-600 hover:bg-blue-50/60",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlus$3e$__["IconPlus"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                lineNumber: 762,
                                columnNumber: 13
                            }, this),
                            isRTL ? "إضافة مخرج آخر" : "Add another deliverable"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                        lineNumber: 757,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                lineNumber: 751,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: (_edit_backHref = edit === null || edit === void 0 ? void 0 : edit.backHref) !== null && _edit_backHref !== void 0 ? _edit_backHref : nav.backHref,
                                className: "btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200",
                                children: isRTL ? "رجوع" : "Back"
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                lineNumber: 771,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>void onContinue(),
                                disabled: submitting,
                                className: "btn-sm px-6 py-2 rounded-full ".concat(allComplete && !submitting ? "text-white bg-[#1C7CBB] hover:bg-opacity-90" : "text-slate-500 bg-slate-200"),
                                children: submitting ? isRTL ? "جاري الحفظ…" : "Saving…" : (_edit_continueLabel = edit === null || edit === void 0 ? void 0 : edit.continueLabel) !== null && _edit_continueLabel !== void 0 ? _edit_continueLabel : nav.continueLabel
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                lineNumber: 777,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                        lineNumber: 770,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                    lineNumber: 769,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                lineNumber: 768,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
        lineNumber: 714,
        columnNumber: 5
    }, this);
}
_s(DeliverablesPlanQuestion, "mLR8ZkAgbQM0oOPeA93gZxz+OwU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"]
    ];
});
_c1 = DeliverablesPlanQuestion;
var _c, _c1;
__turbopack_context__.k.register(_c, "FormatIcons");
__turbopack_context__.k.register(_c1, "DeliverablesPlanQuestion");
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
"[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DataSourcesExpectedQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/ProjectSelectedTypeHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsPayload.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectPropertiesSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectPropertiesSync.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectStepErrorToast.ts [app-client] (ecmascript)");
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
const dataSourceIds = [
    'primary_data',
    'secondary_data',
    'both',
    'does_not_matter'
];
function getOptions(locale) {
    const isRTL = locale === 'ar';
    if (isRTL) {
        return [
            {
                id: 'primary_data',
                label: 'بيانات أولية'
            },
            {
                id: 'secondary_data',
                label: 'بيانات ثانوية'
            },
            {
                id: 'both',
                label: 'كلاهما'
            },
            {
                id: 'does_not_matter',
                label: 'لا يهم'
            }
        ];
    }
    return [
        {
            id: 'primary_data',
            label: 'Primary data'
        },
        {
            id: 'secondary_data',
            label: 'Secondary data'
        },
        {
            id: 'both',
            label: 'Both'
        },
        {
            id: 'does_not_matter',
            label: "Doesn't matter"
        }
    ];
}
function DataSourcesExpectedQuestion(param) {
    let { locale, edit } = param;
    _s();
    const isRTL = locale === 'ar';
    const isEnglish = typeof locale === 'string' && locale.toLowerCase().startsWith('en');
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const options = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DataSourcesExpectedQuestion.useMemo[options]": ()=>getOptions(locale)
    }["DataSourcesExpectedQuestion.useMemo[options]"], [
        locale
    ]);
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [projectType, setProjectType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"])(error, locale);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DataSourcesExpectedQuestion.useEffect": ()=>{
            const timer = window.setTimeout({
                "DataSourcesExpectedQuestion.useEffect.timer": ()=>setEntered(true)
            }["DataSourcesExpectedQuestion.useEffect.timer"], 30);
            return ({
                "DataSourcesExpectedQuestion.useEffect": ()=>window.clearTimeout(timer)
            })["DataSourcesExpectedQuestion.useEffect"];
        }
    }["DataSourcesExpectedQuestion.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DataSourcesExpectedQuestion.useEffect": ()=>{
            if (edit) {
                setProjectType(edit.projectType);
                if (dataSourceIds.includes(edit.value)) setSelected(edit.value);
                return;
            }
            try {
                setProjectType(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale)));
            } catch (e) {
            // ignore
            }
            const saved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readServiceComponentPayloadValue"])(locale, 'data-sources-expected');
            if (saved && dataSourceIds.includes(saved)) {
                setSelected(saved);
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["DataSourcesExpectedQuestion.useEffect"], [
        locale
    ]);
    const title = isRTL ? 'مصادر البيانات المتوقعة' : 'Expected data sources';
    const canContinue = selected !== null;
    const persist = async (value)=>{
        if (edit) {
            if (value) edit.onSave(value);
            return;
        }
        setBusy(true);
        setError(null);
        try {
            if (value) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateServiceComponentPayload"])(locale, 'data-sources-expected', value);
            } else {
                const payload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readServiceComponentsPayload"])(locale);
                delete payload.components['data-sources-expected'];
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeServiceComponentsPayload"])(locale, payload);
            }
            // The description step sends project components together. Review edits save immediately.
            if (nav.isReviewEditMode) await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectPropertiesSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["syncProjectProperties"])(locale);
            nav.goNext();
        } catch (err) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر حفظ الاختيار.' : 'Unable to save your selection.'));
        } finally{
            setBusy(false);
        }
    };
    const onSelect = (id)=>{
        setSelected(id);
        void persist(id);
    };
    const onContinue = ()=>{
        if (!selected) return;
        void persist(selected);
    };
    // Data sources are optional: skipping clears any earlier answer.
    const onSkip = ()=>{
        if (busy) return;
        setSelected(null);
        void persist(null);
    };
    var _edit_backHref, _edit_continueLabel;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-4xl mx-auto min-h-full flex flex-col",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 pb-28",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        locale: locale,
                        entered: entered,
                        projectTypeId: projectType,
                        serviceLabelOverride: edit ? edit.serviceLabel : undefined
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 text-start transition-all duration-700 ".concat(entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'),
                        children: [
                            isEnglish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                children: '\n              #data-sources-expected-question-title {\n                font-family: "IBM Plex Serif", serif !important;\n              }\n            '
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                                lineNumber: 180,
                                columnNumber: 13
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "data-sources-expected-question-title",
                                className: "text-2xl sm:text-3xl font-medium tracking-tight text-slate-900",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                                lineNumber: 186,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 space-y-3 max-w-xl transition-all duration-700 ".concat(entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'),
                        style: {
                            transitionDelay: '160ms'
                        },
                        role: "radiogroup",
                        "aria-label": title,
                        children: options.map((opt)=>{
                            const isSelected = selected === opt.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                role: "radio",
                                "aria-checked": isSelected,
                                onClick: ()=>onSelect(opt.id),
                                className: "flex w-full items-center gap-3 rounded-2xl border p-5 text-start transition-colors ".concat(isSelected ? 'border-blue-400 bg-white/80 shadow-sm' : 'border-slate-200 bg-white/60 hover:border-slate-300 hover:bg-white/80'),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ".concat(isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'),
                                        "aria-hidden": "true",
                                        children: isSelected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "h-2 w-2 rounded-full bg-white"
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                                            lineNumber: 224,
                                            columnNumber: 33
                                        }, this) : null
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                                        lineNumber: 219,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-base font-medium text-slate-900",
                                        children: opt.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                                        lineNumber: 226,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, opt.id, true, {
                                fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                                lineNumber: 208,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                        lineNumber: 194,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed left-0 right-0 z-20 bottom-0 border-t border-slate-200/70 bg-white/80 backdrop-blur-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: (_edit_backHref = edit === null || edit === void 0 ? void 0 : edit.backHref) !== null && _edit_backHref !== void 0 ? _edit_backHref : nav.backHref,
                                "aria-disabled": busy,
                                onClick: (e)=>{
                                    if (busy) e.preventDefault();
                                },
                                className: "btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200",
                                children: isRTL ? 'رجوع' : 'Back'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                                lineNumber: 236,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    edit ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: onSkip,
                                        disabled: busy,
                                        className: "btn-sm px-5 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200 disabled:cursor-not-allowed disabled:opacity-60",
                                        children: isRTL ? 'تخطي' : 'Skip'
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                                        lineNumber: 248,
                                        columnNumber: 30
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: onContinue,
                                        disabled: !canContinue || busy,
                                        className: "btn-sm px-6 py-2 rounded-full ".concat(canContinue && !busy ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90' : 'text-slate-500 bg-slate-200 cursor-not-allowed'),
                                        children: busy ? isRTL ? 'جاري الحفظ...' : 'Saving...' : (_edit_continueLabel = edit === null || edit === void 0 ? void 0 : edit.continueLabel) !== null && _edit_continueLabel !== void 0 ? _edit_continueLabel : nav.continueLabel
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                                        lineNumber: 257,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                                lineNumber: 247,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                        lineNumber: 235,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                    lineNumber: 234,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                lineNumber: 233,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
        lineNumber: 159,
        columnNumber: 5
    }, this);
}
_s(DataSourcesExpectedQuestion, "C+tuMmG2QGZXmMNslwbnuC+DRQM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"]
    ];
});
_c = DataSourcesExpectedQuestion;
var _c;
__turbopack_context__.k.register(_c, "DataSourcesExpectedQuestion");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/questions/TargetMarketQuestion.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TargetMarketQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectPropertiesSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectPropertiesSync.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/ProjectSelectedTypeHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectStepErrorToast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectWizardNavigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsPayload.ts [app-client] (ecmascript)");
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
function safeParseNumberArray(value) {
    if (!value) return [];
    try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) return [];
        return parsed.map((n)=>Number(n)).filter((n)=>Number.isFinite(n));
    } catch (e) {
        return [];
    }
}
function getDisplayName(locale, value) {
    var _value_names, _value_names1;
    if (locale === 'ar') return ((_value_names = value.names) === null || _value_names === void 0 ? void 0 : _value_names.ar) || value.name || '';
    return ((_value_names1 = value.names) === null || _value_names1 === void 0 ? void 0 : _value_names1.en) || value.name || '';
}
async function fetchList(url, locale) {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Accept-Language': locale === 'ar' ? 'ar' : 'en'
        },
        cache: 'no-store'
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res);
    const json = await res.json();
    return json.data || [];
}
function TargetMarketQuestion(param) {
    let { locale, edit } = param;
    _s();
    const isRTL = locale === 'ar';
    const isEnglish = typeof locale === 'string' && locale.toLowerCase().startsWith('en');
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [projectType, setProjectType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [countries, setCountries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [regions, setRegions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [blocs, setBlocs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"])(error, locale);
    const [countryIds, setCountryIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [regionIds, setRegionIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [blocIds, setBlocIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [countryQuery, setCountryQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // When the user actively picks "Worldwide", auto-advance to the next step
    // as soon as the (auto-selected) regions are loaded.
    const pendingWorldwideAdvanceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Edit mode: a saved "all regions" answer reopens as Worldwide.
    const detectWorldwideRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])((edit === null || edit === void 0 ? void 0 : edit.value.type) === 'region');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TargetMarketQuestion.useEffect": ()=>{
            const timer = window.setTimeout({
                "TargetMarketQuestion.useEffect.timer": ()=>setEntered(true)
            }["TargetMarketQuestion.useEffect.timer"], 30);
            return ({
                "TargetMarketQuestion.useEffect": ()=>window.clearTimeout(timer)
            })["TargetMarketQuestion.useEffect"];
        }
    }["TargetMarketQuestion.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TargetMarketQuestion.useEffect": ()=>{
            if (edit) {
                const { type, ids } = edit.value;
                setProjectType(edit.projectType);
                setMode(type === 'region' ? 'regions' : type);
                if (type === 'country') setCountryIds(ids);
                if (type === 'region') setRegionIds(ids);
                if (type === 'economic') setBlocIds(ids);
                return;
            }
            try {
                setProjectType(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale)));
                const savedMode = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketModeKey(locale));
                if (savedMode) setMode(savedMode);
                setCountryIds(safeParseNumberArray(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketCountryIdsKey(locale))));
                setRegionIds(safeParseNumberArray(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketRegionIdsKey(locale))));
                setBlocIds(safeParseNumberArray(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketEconomicBlocIdsKey(locale))));
            } catch (e) {
            // ignore
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["TargetMarketQuestion.useEffect"], [
        locale
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TargetMarketQuestion.useEffect": ()=>{
            if (!detectWorldwideRef.current || mode !== 'regions' || !(regions === null || regions === void 0 ? void 0 : regions.length)) return;
            detectWorldwideRef.current = false;
            const selected = new Set(regionIds);
            if (regions.every({
                "TargetMarketQuestion.useEffect": (region)=>selected.has(region.id)
            }["TargetMarketQuestion.useEffect"])) setMode('worldwide');
        }
    }["TargetMarketQuestion.useEffect"], [
        mode,
        regionIds,
        regions
    ]);
    const title = isRTL ? 'اختر السوق المستهدف' : 'Select the target market';
    const modeOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TargetMarketQuestion.useMemo[modeOptions]": ()=>{
            if (isRTL) {
                return [
                    {
                        id: 'worldwide',
                        label: ' كل العالم'
                    },
                    {
                        id: 'country',
                        label: 'اختيار دولة'
                    },
                    {
                        id: 'regions',
                        label: 'اختيار منطقة'
                    },
                    {
                        id: 'economic',
                        label: 'اختيار تكتل اقتصادي'
                    }
                ];
            }
            return [
                {
                    id: 'worldwide',
                    label: 'Worldwide'
                },
                {
                    id: 'country',
                    label: 'Select Country'
                },
                {
                    id: 'regions',
                    label: 'Select Region'
                },
                {
                    id: 'economic',
                    label: 'Select Economic Block'
                }
            ];
        }
    }["TargetMarketQuestion.useMemo[modeOptions]"], [
        isRTL
    ]);
    const ensureCountries = async ()=>{
        if (countries) return;
        setError(null);
        setLoading('countries');
        try {
            const list = await fetchList("".concat(("TURBOPACK compile-time value", "https://api.foresighta.co"), "/api/common/setting/country/list"), locale);
            setCountries(list.filter((c)=>c.status !== 'inactive'));
        } catch (err) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر تحميل الدول.' : 'Failed to load countries.'));
            setCountries([]);
        } finally{
            setLoading(null);
        }
    };
    const ensureRegions = async ()=>{
        if (regions) return;
        setError(null);
        setLoading('regions');
        try {
            const list = await fetchList("".concat(("TURBOPACK compile-time value", "https://api.foresighta.co"), "/api/common/setting/region/list"), locale);
            setRegions(list);
        } catch (err) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر تحميل المناطق.' : 'Failed to load regions.'));
            setRegions([]);
        } finally{
            setLoading(null);
        }
    };
    const ensureBlocs = async ()=>{
        if (blocs) return;
        setError(null);
        setLoading('blocs');
        try {
            const list = await fetchList("".concat(("TURBOPACK compile-time value", "https://api.foresighta.co"), "/api/common/setting/economic-bloc/list"), locale);
            setBlocs(list);
        } catch (err) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر تحميل التكتلات.' : 'Failed to load economic blocks.'));
            setBlocs([]);
        } finally{
            setLoading(null);
        }
    };
    const onSelectMode = async (next)=>{
        setMode(next);
        setError(null);
        setCountryQuery('');
        setCountryIds([]);
        setRegionIds([]);
        setBlocIds([]);
        if (next === 'country') {
            await ensureCountries();
            return;
        }
        if (next === 'regions') {
            await ensureRegions();
            return;
        }
        if (next === 'economic') {
            await ensureBlocs();
            return;
        }
        if (next === 'worldwide') {
            pendingWorldwideAdvanceRef.current = true;
            await ensureRegions();
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TargetMarketQuestion.useEffect": ()=>{
            if (mode !== 'worldwide') return;
            if (!regions) return;
            setRegionIds(regions.map({
                "TargetMarketQuestion.useEffect": (r)=>r.id
            }["TargetMarketQuestion.useEffect"]));
        }
    }["TargetMarketQuestion.useEffect"], [
        mode,
        regions
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TargetMarketQuestion.useEffect": ()=>{
            if (!mode) return;
            if (mode === 'country') void ensureCountries();
            if (mode === 'regions' || mode === 'worldwide') void ensureRegions();
            if (mode === 'economic') void ensureBlocs();
        }
    }["TargetMarketQuestion.useEffect"], [
        mode
    ]);
    const filteredCountries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TargetMarketQuestion.useMemo[filteredCountries]": ()=>{
            if (!countries) return [];
            const q = countryQuery.trim().toLowerCase();
            if (!q) return countries;
            return countries.filter({
                "TargetMarketQuestion.useMemo[filteredCountries]": (c)=>{
                    var _c_names, _c_names1;
                    const name = getDisplayName(locale, c).toLowerCase();
                    const en = (((_c_names = c.names) === null || _c_names === void 0 ? void 0 : _c_names.en) || '').toLowerCase();
                    const ar = (((_c_names1 = c.names) === null || _c_names1 === void 0 ? void 0 : _c_names1.ar) || '').toLowerCase();
                    return name.includes(q) || en.includes(q) || ar.includes(q);
                }
            }["TargetMarketQuestion.useMemo[filteredCountries]"]);
        }
    }["TargetMarketQuestion.useMemo[filteredCountries]"], [
        countries,
        countryQuery,
        locale
    ]);
    const selectedTargetMarketItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TargetMarketQuestion.useMemo[selectedTargetMarketItems]": ()=>{
            if (mode === 'worldwide') {
                var _modeOptions_find;
                const worldwideLabel = ((_modeOptions_find = modeOptions.find({
                    "TargetMarketQuestion.useMemo[selectedTargetMarketItems]": (option)=>option.id === 'worldwide'
                }["TargetMarketQuestion.useMemo[selectedTargetMarketItems]"])) === null || _modeOptions_find === void 0 ? void 0 : _modeOptions_find.label) || (isRTL ? 'كل العالم' : 'Worldwide');
                return [
                    {
                        id: 'worldwide',
                        label: worldwideLabel,
                        flagSrc: null
                    }
                ];
            }
            if (mode === 'country') {
                const selected = new Set(countryIds);
                return (countries || []).filter({
                    "TargetMarketQuestion.useMemo[selectedTargetMarketItems]": (country)=>selected.has(country.id)
                }["TargetMarketQuestion.useMemo[selectedTargetMarketItems]"]).map({
                    "TargetMarketQuestion.useMemo[selectedTargetMarketItems]": (country)=>({
                            id: String(country.id),
                            label: getDisplayName(locale, country) || "#".concat(country.id),
                            flagSrc: country.flag ? "/images/flags/".concat(country.flag, ".svg") : null
                        })
                }["TargetMarketQuestion.useMemo[selectedTargetMarketItems]"]);
            }
            if (mode === 'regions') {
                const selected = new Set(regionIds);
                return (regions || []).filter({
                    "TargetMarketQuestion.useMemo[selectedTargetMarketItems]": (region)=>selected.has(region.id)
                }["TargetMarketQuestion.useMemo[selectedTargetMarketItems]"]).map({
                    "TargetMarketQuestion.useMemo[selectedTargetMarketItems]": (region)=>({
                            id: String(region.id),
                            label: region.name,
                            flagSrc: null
                        })
                }["TargetMarketQuestion.useMemo[selectedTargetMarketItems]"]);
            }
            if (mode === 'economic') {
                const selected = new Set(blocIds);
                return (blocs || []).filter({
                    "TargetMarketQuestion.useMemo[selectedTargetMarketItems]": (bloc)=>selected.has(bloc.id)
                }["TargetMarketQuestion.useMemo[selectedTargetMarketItems]"]).map({
                    "TargetMarketQuestion.useMemo[selectedTargetMarketItems]": (bloc)=>({
                            id: String(bloc.id),
                            label: bloc.name,
                            flagSrc: null
                        })
                }["TargetMarketQuestion.useMemo[selectedTargetMarketItems]"]);
            }
            return [];
        }
    }["TargetMarketQuestion.useMemo[selectedTargetMarketItems]"], [
        blocIds,
        blocs,
        countries,
        countryIds,
        isRTL,
        locale,
        mode,
        modeOptions,
        regionIds,
        regions
    ]);
    const removeSelectedTargetMarketItem = (id)=>{
        if (mode === 'country') setCountryIds((prev)=>prev.filter((item)=>String(item) !== id));
        if (mode === 'regions') setRegionIds((prev)=>prev.filter((item)=>String(item) !== id));
        if (mode === 'economic') setBlocIds((prev)=>prev.filter((item)=>String(item) !== id));
    };
    const canContinue = mode === 'worldwide' ? regionIds.length > 0 : mode === 'country' ? countryIds.length > 0 : mode === 'regions' ? regionIds.length > 0 : mode === 'economic' ? blocIds.length > 0 : false;
    const onContinue = async ()=>{
        if (!mode || !canContinue || submitting) return;
        if (edit) {
            edit.onSave(mode === 'country' ? {
                type: 'country',
                ids: countryIds
            } : mode === 'economic' ? {
                type: 'economic',
                ids: blocIds
            } : {
                type: 'region',
                ids: regionIds
            }, selectedTargetMarketItems.map((item)=>item.label.trim()));
            return;
        }
        try {
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketModeKey(locale), mode);
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketCountryIdsKey(locale), JSON.stringify(mode === 'country' ? countryIds : []));
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketRegionIdsKey(locale), JSON.stringify(mode === 'worldwide' || mode === 'regions' ? regionIds : []));
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketEconomicBlocIdsKey(locale), JSON.stringify(mode === 'economic' ? blocIds : []));
        } catch (e) {
        // ignore
        }
        const payload = mode === 'country' ? {
            type: 'country',
            ids: countryIds
        } : mode === 'economic' ? {
            type: 'economic',
            ids: blocIds
        } : {
            type: 'region',
            ids: regionIds
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateServiceComponentPayload"])(locale, 'target-market', payload);
        // The description step sends project components together. Review edits save immediately.
        if (!nav.isReviewEditMode) {
            nav.goNext();
            return;
        }
        setSubmitting(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectPropertiesSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["syncProjectProperties"])(locale);
            nav.goNext();
        } catch (err) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر حفظ مكوّنات الخدمة.' : 'Failed to save service components.'));
        } finally{
            setSubmitting(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TargetMarketQuestion.useEffect": ()=>{
            if (!pendingWorldwideAdvanceRef.current) return;
            if (mode !== 'worldwide' || regionIds.length === 0 || submitting) return;
            pendingWorldwideAdvanceRef.current = false;
            void onContinue();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["TargetMarketQuestion.useEffect"], [
        mode,
        regionIds,
        submitting
    ]);
    var _edit_backHref, _edit_continueLabel;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-5xl mx-auto",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                locale: locale,
                entered: entered,
                projectTypeId: projectType,
                serviceLabelOverride: edit ? edit.serviceLabel : undefined
            }, void 0, false, {
                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                lineNumber: 454,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 text-start transition-all duration-700 ".concat(entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'),
                children: [
                    isEnglish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                        children: '\n            #target-market-question-title {\n              font-family: "IBM Plex Serif", serif !important;\n            }\n          '
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                        lineNumber: 470,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "target-market-question-title",
                        className: "text-2xl sm:text-3xl font-medium tracking-tight text-slate-900",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                        lineNumber: 476,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                lineNumber: 461,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6",
                role: "radiogroup",
                "aria-label": title,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3",
                        children: modeOptions.map((opt, index)=>{
                            const isSelected = mode === opt.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                role: "radio",
                                "aria-checked": isSelected,
                                onClick: ()=>void onSelectMode(opt.id),
                                className: "h-full min-h-[88px] rounded-2xl border px-5 py-4 text-start shadow-sm backdrop-blur-md transition-all duration-700 ".concat(isSelected ? 'border-blue-300 bg-white/60' : 'border-white/30 bg-white/35 hover:bg-white/45', " ").concat(entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'),
                                style: {
                                    transitionDelay: "".concat(110 + index * 60, "ms")
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ".concat(isSelected ? 'border-blue-600' : 'border-slate-300', " bg-white/80"),
                                            "aria-hidden": "true",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "h-2.5 w-2.5 rounded-full ".concat(isSelected ? 'bg-blue-600' : 'bg-transparent')
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                lineNumber: 512,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                            lineNumber: 507,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-base sm:text-lg font-bold text-slate-900",
                                            children: opt.label
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                            lineNumber: 517,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                    lineNumber: 506,
                                    columnNumber: 17
                                }, this)
                            }, opt.id, false, {
                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                lineNumber: 489,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                        lineNumber: 485,
                        columnNumber: 9
                    }, this),
                    error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 text-sm font-semibold text-rose-700",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                        lineNumber: 527,
                        columnNumber: 11
                    }, this) : null,
                    mode !== 'worldwide' && selectedTargetMarketItems.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 rounded-2xl border border-blue-100 bg-white/60 px-4 py-3 shadow-sm backdrop-blur-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-2 text-xs font-bold uppercase tracking-wide text-slate-500",
                                children: isRTL ? 'اختيارك' : 'Selected'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                lineNumber: 532,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: selectedTargetMarketItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1.5 text-sm font-semibold text-slate-800 shadow-sm ".concat(isRTL ? 'flex-row-reverse' : ''),
                                        children: [
                                            item.flagSrc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: item.flagSrc,
                                                alt: "",
                                                className: "h-4 w-4 object-contain"
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                lineNumber: 542,
                                                columnNumber: 21
                                            }, this) : null,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: item.label
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                lineNumber: 544,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>removeSelectedTargetMarketItem(item.id),
                                                "aria-label": isRTL ? 'إزالة الاختيار' : 'Remove selection',
                                                className: "inline-flex h-5 w-5 items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-500",
                                                children: "×"
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                lineNumber: 545,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                        lineNumber: 537,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                lineNumber: 535,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                        lineNumber: 531,
                        columnNumber: 11
                    }, this) : null,
                    mode === 'country' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 transition-all duration-700 pb-[100px] lg:pb-0 ".concat(entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'),
                        style: {
                            transitionDelay: '420ms'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-3xl border border-white/30 bg-white/45 p-4 shadow-sm backdrop-blur-md",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: countryQuery,
                                    onChange: (e)=>setCountryQuery(e.target.value),
                                    placeholder: isRTL ? 'ابحث عن دولة...' : 'Search country...',
                                    className: "w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                    lineNumber: 570,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 max-h-[340px] overflow-auto pr-1",
                                    children: loading === 'countries' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm font-semibold text-slate-600",
                                        children: isRTL ? 'جاري التحميل…' : 'Loading…'
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                        lineNumber: 579,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2",
                                        children: filteredCountries.map((c)=>{
                                            const isSelected = countryIds.includes(c.id);
                                            const label = getDisplayName(locale, c) || '';
                                            const flagSrc = c.flag ? "/images/flags/".concat(c.flag, ".svg") : null;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                "aria-pressed": isSelected,
                                                onClick: ()=>setCountryIds((prev)=>prev.includes(c.id) ? prev.filter((x)=>x !== c.id) : [
                                                            ...prev,
                                                            c.id
                                                        ]),
                                                className: "flex items-center gap-3 rounded-2xl border px-3 py-3 text-start transition-colors ".concat(isSelected ? 'border-blue-300 bg-white/75' : 'border-white/30 bg-white/40 hover:bg-white/55'),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ".concat(isSelected ? 'border-blue-600' : 'border-slate-300', " bg-white/80"),
                                                        "aria-hidden": "true",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "h-2.5 w-2.5 rounded-full ".concat(isSelected ? 'bg-blue-600' : 'bg-transparent')
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                            lineNumber: 613,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                        lineNumber: 608,
                                                        columnNumber: 27
                                                    }, this),
                                                    flagSrc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: flagSrc,
                                                        alt: "",
                                                        className: "h-4 w-4 object-contain opacity-90",
                                                        onError: (e)=>{
                                                            ;
                                                            e.currentTarget.style.display = 'none';
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                        lineNumber: 620,
                                                        columnNumber: 29
                                                    }, this) : null,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-semibold text-slate-900",
                                                        children: label || "#".concat(c.id)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                        lineNumber: 631,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, c.id, true, {
                                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                lineNumber: 592,
                                                columnNumber: 25
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                        lineNumber: 583,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                    lineNumber: 577,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                            lineNumber: 569,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                        lineNumber: 560,
                        columnNumber: 11
                    }, this) : null,
                    mode === 'regions' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 transition-all duration-700  ".concat(entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'),
                        style: {
                            transitionDelay: '420ms'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-2xl border border-white/30 bg-white/35 backdrop-blur-md shadow-sm p-4 pb-[150px] sm:pb-4",
                            children: loading === 'regions' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm font-semibold text-slate-600",
                                children: isRTL ? 'جاري التحميل…' : 'Loading…'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                lineNumber: 656,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2  ",
                                children: (regions || []).map((r)=>{
                                    const isSelected = regionIds.includes(r.id);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        "aria-pressed": isSelected,
                                        onClick: ()=>setRegionIds((prev)=>prev.includes(r.id) ? prev.filter((x)=>x !== r.id) : [
                                                    ...prev,
                                                    r.id
                                                ]),
                                        className: "flex items-center gap-3 rounded-xl border px-3 py-2 text-start transition-colors ".concat(isSelected ? 'border-blue-300 bg-white/70' : 'border-white/30 bg-white/35 hover:bg-white/45'),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ".concat(isSelected ? 'border-blue-600' : 'border-slate-300', " bg-white/80"),
                                                "aria-hidden": "true",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "h-2.5 w-2.5 rounded-sm ".concat(isSelected ? 'bg-blue-600' : 'bg-transparent')
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                    lineNumber: 685,
                                                    columnNumber: 27
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                lineNumber: 680,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-semibold text-slate-900",
                                                children: r.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                lineNumber: 691,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, r.id, true, {
                                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                        lineNumber: 664,
                                        columnNumber: 23
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                lineNumber: 660,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                            lineNumber: 654,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                        lineNumber: 645,
                        columnNumber: 11
                    }, this) : null,
                    mode === 'economic' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 transition-all pb-[100px] sm:pb-0 duration-700 ".concat(entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'),
                        style: {
                            transitionDelay: '420ms'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-2xl border border-white/30 bg-white/35 backdrop-blur-md shadow-sm p-4 pb-[100px] sm:pb-4",
                            children: loading === 'blocs' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm font-semibold text-slate-600",
                                children: isRTL ? 'جاري التحميل…' : 'Loading…'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                lineNumber: 715,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2",
                                children: (blocs || []).map((b)=>{
                                    const isSelected = blocIds.includes(b.id);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        "aria-pressed": isSelected,
                                        onClick: ()=>setBlocIds((prev)=>prev.includes(b.id) ? prev.filter((x)=>x !== b.id) : [
                                                    ...prev,
                                                    b.id
                                                ]),
                                        className: "flex items-center gap-3 rounded-xl border px-3 py-2 text-start transition-colors ".concat(isSelected ? 'border-blue-300 bg-white/70' : 'border-white/30 bg-white/35 hover:bg-white/45'),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ".concat(isSelected ? 'border-blue-600' : 'border-slate-300', " bg-white/80"),
                                                "aria-hidden": "true",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "h-2.5 w-2.5 rounded-sm ".concat(isSelected ? 'bg-blue-600' : 'bg-transparent')
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                    lineNumber: 744,
                                                    columnNumber: 27
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                lineNumber: 739,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-semibold text-slate-900",
                                                children: b.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                lineNumber: 750,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, b.id, true, {
                                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                        lineNumber: 723,
                                        columnNumber: 23
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                lineNumber: 719,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                            lineNumber: 713,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                        lineNumber: 704,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                lineNumber: 484,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: (_edit_backHref = edit === null || edit === void 0 ? void 0 : edit.backHref) !== null && _edit_backHref !== void 0 ? _edit_backHref : nav.backHref,
                                className: "btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200",
                                children: isRTL ? 'رجوع' : 'Back'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                lineNumber: 765,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onContinue,
                                disabled: !canContinue || submitting,
                                className: "btn-sm px-6 py-2 rounded-full ".concat(canContinue && !submitting ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90' : 'text-slate-500 bg-slate-200 cursor-not-allowed'),
                                children: submitting ? isRTL ? 'جاري الحفظ…' : 'Saving…' : (_edit_continueLabel = edit === null || edit === void 0 ? void 0 : edit.continueLabel) !== null && _edit_continueLabel !== void 0 ? _edit_continueLabel : nav.continueLabel
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                lineNumber: 772,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                        lineNumber: 764,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                    lineNumber: 763,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                lineNumber: 762,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
        lineNumber: 453,
        columnNumber: 5
    }, this);
}
_s(TargetMarketQuestion, "chE0fOSJp2YTJDVaDz4oFa6Vs7M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"]
    ];
});
_c = TargetMarketQuestion;
var _c;
__turbopack_context__.k.register(_c, "TargetMarketQuestion");
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
"[project]/components/project/questions/InlineDateCalendar.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "calendar": "InlineDateCalendar-module__8I3sfq__calendar",
  "day": "InlineDateCalendar-module__8I3sfq__day",
});
}),
"[project]/components/project/questions/InlineDateCalendar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InlineDateCalendar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$dates$2f$esm$2f$components$2f$Calendar$2f$Calendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/dates/esm/components/Calendar/Calendar.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$InlineDateCalendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/project/questions/InlineDateCalendar.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function parseIsoDate(value) {
    if (!value) return null;
    const [year, month, day] = value.split('-').map((part)=>Number(part));
    if (!year || !month || !day) return null;
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
        return null;
    }
    return date;
}
function toLocalIsoDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return "".concat(year, "-").concat(month, "-").concat(day);
}
function startOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}
function sameMonth(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}
function sameDate(a, b) {
    return Boolean(a && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate());
}
function getInitialMonth(value, min) {
    return startOfMonth(parseIsoDate(value) || parseIsoDate(min) || new Date());
}
function InlineDateCalendar(param) {
    let { value, min, max, onChange, locale, label, className = '', rangeStart, rangeEnd } = param;
    _s();
    const isRTL = locale === 'ar';
    const selectedDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "InlineDateCalendar.useMemo[selectedDate]": ()=>parseIsoDate(value)
    }["InlineDateCalendar.useMemo[selectedDate]"], [
        value
    ]);
    const minDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "InlineDateCalendar.useMemo[minDate]": ()=>parseIsoDate(min) || undefined
    }["InlineDateCalendar.useMemo[minDate]"], [
        min
    ]);
    const maxDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "InlineDateCalendar.useMemo[maxDate]": ()=>parseIsoDate(max) || undefined
    }["InlineDateCalendar.useMemo[maxDate]"], [
        max
    ]);
    const rangeStartDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "InlineDateCalendar.useMemo[rangeStartDate]": ()=>parseIsoDate(rangeStart)
    }["InlineDateCalendar.useMemo[rangeStartDate]"], [
        rangeStart
    ]);
    const rangeEndDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "InlineDateCalendar.useMemo[rangeEndDate]": ()=>parseIsoDate(rangeEnd)
    }["InlineDateCalendar.useMemo[rangeEndDate]"], [
        rangeEnd
    ]);
    const [visibleMonth, setVisibleMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "InlineDateCalendar.useState": ()=>getInitialMonth(value, min)
    }["InlineDateCalendar.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InlineDateCalendar.useEffect": ()=>{
            if (selectedDate) {
                const nextMonth = startOfMonth(selectedDate);
                setVisibleMonth({
                    "InlineDateCalendar.useEffect": (currentMonth)=>sameMonth(currentMonth, nextMonth) ? currentMonth : nextMonth
                }["InlineDateCalendar.useEffect"]);
                return;
            }
            if (minDate) {
                const nextMonth = startOfMonth(minDate);
                setVisibleMonth({
                    "InlineDateCalendar.useEffect": (currentMonth)=>currentMonth < nextMonth ? nextMonth : currentMonth
                }["InlineDateCalendar.useEffect"]);
            }
        }
    }["InlineDateCalendar.useEffect"], [
        minDate,
        selectedDate
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "aria-label": label,
        className: "w-fit rounded-[10px] bg-white/95 p-3 shadow-sm ".concat(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$InlineDateCalendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].calendar, " ").concat(className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$dates$2f$esm$2f$components$2f$Calendar$2f$Calendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Calendar"], {
            classNames: {
                day: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$InlineDateCalendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].day
            },
            date: visibleMonth,
            onDateChange: (date)=>setVisibleMonth(startOfMonth(date)),
            minDate: minDate,
            maxDate: maxDate,
            locale: isRTL ? 'ar' : 'en',
            firstDayOfWeek: 1,
            weekendDays: [
                0,
                6
            ],
            monthLabelFormat: "MMMM YYYY",
            maxLevel: "month",
            size: "sm",
            withCellSpacing: false,
            highlightToday: false,
            getDayProps: (date)=>{
                const isRangeStart = sameDate(rangeStartDate, date);
                const isRangeEnd = sameDate(rangeEndDate, date);
                // Days spilling in from other months stay plain.
                const inRange = Boolean(rangeStartDate && rangeEndDate) && sameMonth(date, visibleMonth) && date >= rangeStartDate && date <= rangeEndDate;
                // Mantine strips the range band from disabled days, so in-range days
                // outside min/max stay enabled but locked: drawn in the band, not clickable.
                const outOfBounds = Boolean(minDate && date < minDate) || Boolean(maxDate && date > maxDate);
                const locked = inRange && outOfBounds;
                return {
                    ...locked && {
                        disabled: false,
                        'aria-disabled': true,
                        'data-locked': true
                    },
                    selected: sameDate(selectedDate, date) || inRange && (isRangeStart || isRangeEnd),
                    inRange,
                    firstInRange: inRange && isRangeStart,
                    lastInRange: inRange && isRangeEnd,
                    onClick: ()=>{
                        if (!locked) onChange(toLocalIsoDate(date));
                    }
                };
            },
            ariaLabels: {
                nextMonth: isRTL ? 'الشهر التالي' : 'Next month',
                previousMonth: isRTL ? 'الشهر السابق' : 'Previous month',
                monthLevelControl: label
            },
            styles: {
                calendarHeader: {
                    marginBottom: 14,
                    padding: 0
                },
                calendarHeaderControl: {
                    width: 30,
                    height: 30,
                    color: '#020617',
                    borderRadius: 6
                },
                calendarHeaderLevel: {
                    color: '#020617',
                    fontSize: 18,
                    fontWeight: 700,
                    lineHeight: '30px',
                    pointerEvents: 'none'
                },
                weekday: {
                    color: '#8b949e',
                    fontSize: 14,
                    fontWeight: 400,
                    paddingBottom: 8,
                    textTransform: 'none'
                },
                day: {
                    fontSize: 14,
                    fontWeight: 400
                },
                monthCell: {
                    padding: 1
                }
            }
        }, void 0, false, {
            fileName: "[project]/components/project/questions/InlineDateCalendar.tsx",
            lineNumber: 108,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/project/questions/InlineDateCalendar.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
_s(InlineDateCalendar, "ykG4S178UDixzrV2uaFKxsomA1Q=");
_c = InlineDateCalendar;
var _c;
__turbopack_context__.k.register(_c, "InlineDateCalendar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/questions/UrgentDateNotice.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UrgentDateNotice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function UrgentDateNotice(param) {
    let { locale } = param;
    const isRTL = locale === 'ar';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-4 flex max-w-sm items-start gap-3 rounded-[10px] border border-amber-200 bg-amber-50/90 px-4 py-3 text-start text-amber-900 shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-black leading-none text-white",
                "aria-hidden": "true",
                children: "!"
            }, void 0, false, {
                fileName: "[project]/components/project/questions/UrgentDateNotice.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs font-semibold leading-5 sm:text-sm",
                children: isRTL ? 'هذا اليوم فقط متاح لأن الطلبات العاجلة يجب أن تكون خلال 24 ساعة.' : 'Only this date is available because urgent requests are 24-hour requests.'
            }, void 0, false, {
                fileName: "[project]/components/project/questions/UrgentDateNotice.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/UrgentDateNotice.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = UrgentDateNotice;
var _c;
__turbopack_context__.k.register(_c, "UrgentDateNotice");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/questions/ProjectScheduleQuestion.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectScheduleQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconInfoCircle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconInfoCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconInfoCircle.mjs [app-client] (ecmascript) <export default as IconInfoCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectDeliverables.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectPropertiesSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectPropertiesSync.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectSchedule.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceSessions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectServiceSessions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectWizardFlow.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectStepErrorToast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$InlineDateCalendar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/InlineDateCalendar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$UrgentDateNotice$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/UrgentDateNotice.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/ProjectSelectedTypeHeader.tsx [app-client] (ecmascript)");
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
;
;
;
;
;
const DEFAULT_LEAD_DAYS = 7;
const UNIT_DAYS = {
    days: 1,
    weeks: 7,
    months: 30
};
const UNITS = [
    'days',
    'weeks',
    'months'
];
function unitButtonLabel(locale, unit) {
    if (locale === 'ar') return ({
        days: 'أيام',
        weeks: 'أسابيع',
        months: 'أشهر'
    })[unit];
    return ({
        days: 'Days',
        weeks: 'Weeks',
        months: 'Months'
    })[unit];
}
function durationUnit(locale, unit, value) {
    if (locale === 'ar') {
        const forms = {
            days: [
                'يوم',
                'أيام',
                'يومًا'
            ],
            weeks: [
                'أسبوع',
                'أسابيع',
                'أسبوعًا'
            ],
            months: [
                'شهر',
                'أشهر',
                'شهرًا'
            ]
        }[unit];
        if (value === 1) return forms[0];
        return Number.isInteger(value) && value > 10 ? forms[2] : forms[1];
    }
    const singular = {
        days: 'Day',
        weeks: 'Week',
        months: 'Month'
    }[unit];
    return value === 1 ? singular : "".concat(singular, "s");
}
/** Days shown in the chosen unit, to one decimal place. */ function durationInUnit(days, unit) {
    return Math.round(days / UNIT_DAYS[unit] * 10) / 10;
}
function ProjectScheduleQuestion(param) {
    let { locale, edit } = param;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const isRTL = locale === 'ar';
    const isEnglish = typeof locale === 'string' && locale.toLowerCase().startsWith('en');
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [projectType, setProjectType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deliverables, setDeliverables] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [startDate, setStartDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [durationDays, setDurationDays] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(30);
    const [durationDraft, setDurationDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [unit, setUnit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('days');
    const [showUrgentWarning, setShowUrgentWarning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [urgentAcknowledged, setUrgentAcknowledged] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"])(error, locale);
    const today = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["todayIsoDate"])();
    const isUrgent = !edit && (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUrgentProjectType"])(projectType);
    const hasDeliverables = !edit && (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readServiceComponentSlugs"])(locale).includes('deliverables-plan') && deliverables.length > 0;
    // Other services' deliverables (specific-insighter projects) must fit in the duration too.
    const [otherServicesLatestDay, setOtherServicesLatestDay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const minDuration = edit ? Math.max(edit.original.durationDays, edit.latestDeliverableDay) : Math.max(hasDeliverables ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["latestDeliverableDay"])(deliverables) : 0, otherServicesLatestDay);
    const maxDuration = isUrgent ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["URGENT_MAX_DURATION_DAYS"] : Number.MAX_SAFE_INTEGER;
    // A project lasts at least a day, so the close date is never the start date.
    const minCloseDays = Math.min(maxDuration, Math.max(minDuration, 1));
    const plannedCloseDate = startDate ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDaysToIsoDate"])(startDate, durationDays) : '';
    const durationValue = durationInUnit(durationDays, unit);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProjectScheduleQuestion.useEffect": ()=>{
            const timer = window.setTimeout({
                "ProjectScheduleQuestion.useEffect.timer": ()=>setEntered(true)
            }["ProjectScheduleQuestion.useEffect.timer"], 30);
            return ({
                "ProjectScheduleQuestion.useEffect": ()=>window.clearTimeout(timer)
            })["ProjectScheduleQuestion.useEffect"];
        }
    }["ProjectScheduleQuestion.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProjectScheduleQuestion.useEffect": ()=>{
            if (edit) {
                setProjectType(edit.projectType);
                setStartDate(edit.value.plannedStartDate);
                setDurationDays(edit.value.durationDays);
                setReady(true);
                return;
            }
            let storedProjectType = null;
            try {
                storedProjectType = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale));
            } catch (e) {
            // ignore
            }
            const urgent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUrgentProjectType"])(storedProjectType);
            const storedDeliverables = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readDeliverables"])(locale);
            const otherLatest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceSessions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["latestSavedSessionDeliverableDay"])(locale);
            const latest = Math.max((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["latestDeliverableDay"])(storedDeliverables), otherLatest);
            const stored = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readProjectSchedule"])(locale);
            const todayValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["todayIsoDate"])();
            const initialStart = urgent ? todayValue : stored && stored.plannedStartDate >= todayValue ? stored.plannedStartDate : (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDaysToIsoDate"])(todayValue, DEFAULT_LEAD_DAYS);
            var _stored_durationDays, _stored_durationDays1;
            // At least one day: older drafts could save a same-day close.
            const initialDuration = urgent ? Math.min(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["URGENT_MAX_DURATION_DAYS"], Math.max((_stored_durationDays = stored === null || stored === void 0 ? void 0 : stored.durationDays) !== null && _stored_durationDays !== void 0 ? _stored_durationDays : 1, latest, 1)) : Math.max((_stored_durationDays1 = stored === null || stored === void 0 ? void 0 : stored.durationDays) !== null && _stored_durationDays1 !== void 0 ? _stored_durationDays1 : Math.max(latest, 30), latest, 1);
            setProjectType(storedProjectType);
            setOtherServicesLatestDay(otherLatest);
            setDeliverables(storedDeliverables);
            setStartDate(initialStart);
            setDurationDays(initialDuration);
            setReady(true);
        // The edit adapter seeds the step once; later renders keep the local edits.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["ProjectScheduleQuestion.useEffect"], [
        locale
    ]);
    const updateDuration = (value)=>{
        const next = Math.min(maxDuration, Math.max(minCloseDays, Math.round(value) || 0));
        setDurationDays(next);
        setUrgentAcknowledged(false);
        setError(null);
    };
    // Typed values below the minimum stay a draft until blur, so "45" can be typed past a minimum of 10.
    const commitDurationDraft = ()=>{
        if (durationDraft === null) return;
        if (durationDraft) updateDuration(Number(durationDraft) * UNIT_DAYS[unit]);
        setDurationDraft(null);
    };
    // Finishing by tomorrow turns a normal request into an urgent one.
    const becomesUrgent = !edit && !isUrgent && Boolean(plannedCloseDate) && plannedCloseDate <= (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDaysToIsoDate"])(today, 1);
    const minStartDate = edit ? edit.minStartDate : today;
    // Keeping the agreed start is always allowed, even once it has passed.
    const startInPast = Boolean(startDate) && startDate < minStartDate && startDate !== (edit === null || edit === void 0 ? void 0 : edit.original.plannedStartDate);
    const canContinue = ready && Boolean(startDate) && !startInPast && !submitting;
    const submit = async ()=>{
        if (edit) {
            edit.onSave({
                plannedStartDate: startDate,
                durationDays
            });
            return;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeProjectSchedule"])(locale, {
            plannedStartDate: startDate,
            durationDays
        });
        setSubmitting(true);
        setError(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectPropertiesSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["syncProjectPropertiesIfReady"])(locale);
            if (nav.nextHref) {
                nav.goNext();
                return;
            }
            router.push("/".concat(locale, "/project"));
        } catch (err) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر حفظ جدول المشروع.' : 'Failed to save the project schedule.'));
        } finally{
            setSubmitting(false);
        }
    };
    const onContinue = async ()=>{
        if (!canContinue) return;
        if (becomesUrgent && !urgentAcknowledged) {
            setShowUrgentWarning(true);
            return;
        }
        await submit();
    };
    // Fixed to a six-week month so both calendars match and never jump when paging months.
    const calendarClassName = 'mt-3 h-[334px]';
    const fullDateFormat = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    const shortDateFormat = {
        month: 'short',
        day: 'numeric'
    };
    const fadeIn = entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4';
    var _edit_backHref, _edit_continueLabel;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-5xl mx-auto min-h-full flex flex-col",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 pb-32",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        locale: locale,
                        entered: entered,
                        projectTypeId: projectType,
                        serviceLabelOverride: edit ? edit.serviceLabel : undefined
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                        lineNumber: 237,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 text-start transition-all duration-700 ".concat(fadeIn),
                        children: [
                            isEnglish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                children: '\n              #project-schedule-question-title {\n                font-family: "IBM Plex Serif", serif !important;\n              }\n            '
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                                lineNumber: 246,
                                columnNumber: 13
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "project-schedule-question-title",
                                className: "text-2xl sm:text-3xl font-medium tracking-tight text-slate-900",
                                children: isRTL ? 'متى يبدأ المشروع وكم يستغرق؟' : 'When should the project start, and how long will it take?'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                                lineNumber: 252,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                        lineNumber: 244,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 flex flex-col items-center gap-8 transition-all duration-700 lg:flex-row lg:items-start lg:justify-between lg:gap-6 ".concat(fadeIn),
                        style: {
                            transitionDelay: '160ms'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-fit",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-bold text-slate-800",
                                        children: isRTL ? 'تاريخ البدء المتوقع' : 'Expected start date'
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                                        lineNumber: 265,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-0.5 text-base font-bold text-slate-900",
                                        children: startDate ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIsoDate"])(startDate, locale, fullDateFormat) : '—'
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                                        lineNumber: 268,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$InlineDateCalendar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        className: calendarClassName,
                                        value: startDate,
                                        min: minStartDate,
                                        max: isUrgent ? today : undefined,
                                        rangeStart: startDate,
                                        rangeEnd: plannedCloseDate,
                                        onChange: (date)=>{
                                            setStartDate(date);
                                            setUrgentAcknowledged(false);
                                            setError(null);
                                        },
                                        locale: locale,
                                        label: isRTL ? 'تاريخ البدء المتوقع' : 'Expected start date'
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                                        lineNumber: 271,
                                        columnNumber: 13
                                    }, this),
                                    isUrgent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$UrgentDateNotice$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        locale: locale
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                                        lineNumber: 286,
                                        columnNumber: 25
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                                lineNumber: 264,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex min-w-0 flex-1 flex-col items-center gap-4 lg:self-stretch lg:justify-center lg:pt-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative flex w-full justify-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                "aria-hidden": "true",
                                                className: "absolute inset-x-0 top-1/2 hidden border-t-2 border-dashed border-slate-300 lg:block"
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                                                lineNumber: 291,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "relative flex h-44 w-44 flex-col items-center justify-center rounded-full border-2 border-[#1C7CBB] bg-white text-center shadow-[0_0_0_10px_rgba(28,124,187,0.08),0_8px_24px_rgba(15,23,42,0.08)]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "sr-only",
                                                        children: [
                                                            isRTL ? 'مدة المشروع' : 'Project duration',
                                                            " (",
                                                            unitButtonLabel(locale, unit),
                                                            ")"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                                                        lineNumber: 296,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        inputMode: "numeric",
                                                        value: durationDraft !== null && durationDraft !== void 0 ? durationDraft : String(durationValue),
                                                        onChange: (event)=>{
                                                            const digits = event.target.value.replace(/\D/g, '').slice(0, 4);
                                                            setDurationDraft(digits);
                                                            const typedDays = Number(digits) * UNIT_DAYS[unit];
                                                            if (digits && typedDays >= minCloseDays && typedDays <= maxDuration) updateDuration(typedDays);
                                                        },
                                                        onFocus: (event)=>event.target.select(),
                                                        onBlur: commitDurationDraft,
                                                        onKeyDown: (event)=>{
                                                            if (event.key === 'Enter') event.currentTarget.blur();
                                                        },
                                                        disabled: isUrgent,
                                                        style: {
                                                            width: "".concat(Math.max(2, (durationDraft !== null && durationDraft !== void 0 ? durationDraft : String(durationValue)).length) + 0.25, "ch")
                                                        },
                                                        className: "border-0 border-b-2 border-transparent bg-transparent p-0 text-center text-5xl font-semibold leading-none tracking-tight tabular-nums text-slate-900 transition-colors hover:border-slate-200 focus:border-[#1C7CBB] focus:outline-none focus:ring-0 disabled:hover:border-transparent"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                                                        lineNumber: 299,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "mt-1.5 text-[15px] font-medium text-slate-500",
                                                        children: durationUnit(locale, unit, durationValue)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                                                        lineNumber: 318,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "mt-1.5 text-xs font-semibold text-[#1C7CBB]",
                                                        children: unit === 'days' ? startDate ? "".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIsoDate"])(startDate, locale, shortDateFormat), " ").concat(isRTL ? '←' : '→', " ").concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIsoDate"])(plannedCloseDate, locale, shortDateFormat)) : '' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["durationLabel"])(locale, durationDays)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                                                        lineNumber: 321,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                                                lineNumber: 295,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                                        lineNumber: 290,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        role: "group",
                                        "aria-label": isRTL ? 'عرض المدة بـ' : 'Show duration in',
                                        className: "inline-flex gap-0.5 rounded-full bg-slate-200/70 p-[3px]",
                                        children: UNITS.map((option)=>{
                                            const active = option === unit;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                "aria-pressed": active,
                                                onClick: ()=>{
                                                    setDurationDraft(null);
                                                    setUnit(option);
                                                },
                                                className: "min-h-10 rounded-full px-[18px] text-sm transition-colors ".concat(active ? 'bg-white font-bold text-[#1C7CBB] shadow-sm' : 'font-medium text-slate-600 hover:text-slate-900'),
                                                children: unitButtonLabel(locale, option)
                                            }, option, false, {
                                                fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                                                lineNumber: 339,
                                                columnNumber: 19
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                                        lineNumber: 331,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                                lineNumber: 289,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-fit",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-bold text-slate-800",
                                        children: isRTL ? 'تاريخ الإغلاق المتوقع' : 'Expected close date'
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                                        lineNumber: 361,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-0.5 text-base font-bold text-slate-900",
                                        children: plannedCloseDate ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIsoDate"])(plannedCloseDate, locale, fullDateFormat) : '—'
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                                        lineNumber: 364,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$InlineDateCalendar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        className: calendarClassName,
                                        value: plannedCloseDate,
                                        min: startDate ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDaysToIsoDate"])(startDate, minCloseDays) : undefined,
                                        max: startDate && isUrgent ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDaysToIsoDate"])(startDate, maxDuration) : undefined,
                                        rangeStart: startDate,
                                        rangeEnd: plannedCloseDate,
                                        onChange: (date)=>{
                                            setDurationDraft(null);
                                            updateDuration((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["diffIsoDays"])(startDate, date));
                                        },
                                        locale: locale,
                                        label: isRTL ? 'تاريخ الإغلاق المتوقع' : 'Expected close date'
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                                        lineNumber: 367,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                                lineNumber: 360,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                        lineNumber: 260,
                        columnNumber: 9
                    }, this),
                    hasDeliverables && minDuration > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-4 text-center text-xs font-semibold text-slate-500",
                        children: isRTL ? "يجب أن تشمل المدة آخر مخرج (".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dayLabel"])(locale, minDuration), ").") : "The duration has to cover your last deliverable (".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dayLabel"])(locale, minDuration), ").")
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                        lineNumber: 385,
                        columnNumber: 11
                    }, this) : null,
                    edit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-4 text-center text-xs font-semibold text-slate-500",
                        children: isRTL ? "يمكن تأجيل تاريخ البدء وتمديد المدة فقط، ولا يمكن أن تقل عن ".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["durationLabel"])(locale, minDuration), ".") : "The start can only move later and the duration can only be extended; it cannot go below ".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["durationLabel"])(locale, minDuration), ".")
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                        lineNumber: 392,
                        columnNumber: 11
                    }, this) : null,
                    startInPast ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 text-center text-sm text-rose-700",
                        children: edit ? isRTL ? 'لا يمكن أن يكون تاريخ البدء قبل التاريخ المتفق عليه أو في الماضي.' : 'The start date cannot be earlier than the agreed start or in the past.' : isRTL ? 'لا يمكن أن يكون تاريخ البدء في الماضي.' : 'The start date cannot be in the past.'
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                        lineNumber: 399,
                        columnNumber: 11
                    }, this) : null,
                    error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 text-center text-sm text-rose-700",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                        lineNumber: 409,
                        columnNumber: 18
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 flex items-start gap-3 rounded-[10px] border border-[#1C7CBB]/25 bg-[#1C7CBB]/[0.07] px-4 py-3 text-start transition-all duration-700 ".concat(fadeIn),
                        style: {
                            transitionDelay: '200ms'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconInfoCircle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconInfoCircle$3e$__["IconInfoCircle"], {
                                size: 20,
                                className: "mt-0.5 shrink-0 text-[#1C7CBB]",
                                "aria-hidden": "true"
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                                lineNumber: 415,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium leading-6 text-[#155E8E] sm:text-[15px]",
                                children: isRTL ? 'يُرجى العلم أن تاريخي البدء والإغلاق المتوقعين تقديريان. يبدأ المشروع رسميًا في تاريخ توقيع العقد، سواء كان قبل التاريخ المحدد أو بعده، ويُعدَّل تاريخ الإغلاق ومواعيد جميع المخرجات تبعًا لذلك مع الحفاظ على المدة المتفق عليها.' : 'Please note that the expected start and close dates are indicative. The project officially commences on the date the contract is signed, whether earlier or later than the date selected, and the close date and all deliverable dates will be adjusted accordingly, keeping the agreed duration.'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                                lineNumber: 416,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                        lineNumber: 411,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                lineNumber: 236,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto px-4 lg:px-0 w-full max-w-5xl pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: (_edit_backHref = edit === null || edit === void 0 ? void 0 : edit.backHref) !== null && _edit_backHref !== void 0 ? _edit_backHref : nav.backHref,
                                className: "btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200",
                                children: isRTL ? 'رجوع' : 'Back'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                                lineNumber: 427,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>void onContinue(),
                                disabled: !canContinue,
                                className: "btn-sm px-6 py-2 rounded-full ".concat(canContinue ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90' : 'text-slate-500 bg-slate-200 cursor-not-allowed'),
                                children: submitting ? isRTL ? 'جاري الحفظ...' : 'Saving...' : (_edit_continueLabel = edit === null || edit === void 0 ? void 0 : edit.continueLabel) !== null && _edit_continueLabel !== void 0 ? _edit_continueLabel : nav.continueLabel
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                                lineNumber: 433,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                        lineNumber: 426,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                    lineNumber: 425,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                lineNumber: 424,
                columnNumber: 7
            }, this),
            showUrgentWarning ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-40 flex items-center justify-center bg-slate-950/35 px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-labelledby": "schedule-urgent-title",
                    className: "w-full max-w-md rounded-2xl border border-white/60 bg-white p-5 text-start shadow-xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            id: "schedule-urgent-title",
                            className: "text-lg font-bold text-slate-900",
                            children: isRTL ? 'طلب عاجل' : 'Urgent project request'
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                            lineNumber: 456,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 text-sm font-semibold leading-6 text-slate-600",
                            children: isRTL ? 'إنهاء المشروع بهذه السرعة سيجعل طلبك عاجلًا، وقد يؤثر على عدد الخبراء المقترحين المتاحين. هل تريد المتابعة؟' : 'Finishing this soon will make this an urgent project request, which may affect the number of suggested available insighters. Do you want to continue?'
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                            lineNumber: 459,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-5 flex items-center justify-end gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setShowUrgentWarning(false),
                                    className: "btn-sm rounded-full border border-slate-200 bg-white px-5 py-2 text-slate-700 hover:bg-slate-50",
                                    children: isRTL ? 'إلغاء' : 'Cancel'
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                                    lineNumber: 465,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        setUrgentAcknowledged(true);
                                        setShowUrgentWarning(false);
                                        void submit();
                                    },
                                    className: "btn-sm rounded-full bg-[#1C7CBB] px-5 py-2 text-white hover:bg-opacity-90",
                                    children: isRTL ? 'نعم، متابعة' : 'Yes, continue'
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                                    lineNumber: 472,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                            lineNumber: 464,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                    lineNumber: 450,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
                lineNumber: 449,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/ProjectScheduleQuestion.tsx",
        lineNumber: 235,
        columnNumber: 5
    }, this);
}
_s(ProjectScheduleQuestion, "4+3wyQYlCVkfi4Z7WelfGclu37M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"]
    ];
});
_c = ProjectScheduleQuestion;
var _c;
__turbopack_context__.k.register(_c, "ProjectScheduleQuestion");
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
"[project]/components/project/questions/DeadlineOfferQuestion.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DeadlineOfferQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalSubmit$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectProposalSubmit.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/specifiedInsighterProject.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectStepErrorToast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectWizardFlow.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$InlineDateCalendar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/InlineDateCalendar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/ProjectSelectedTypeHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectWizardNavigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectSchedule.ts [app-client] (ecmascript)");
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
function todayString() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return "".concat(yyyy, "-").concat(mm, "-").concat(dd);
}
function normalizeProjectType(value) {
    if (!value) return null;
    if (value === 'urgent' || value === 'urgent_request') return 'urgent_request';
    return value;
}
function futureDateString(daysFromNow) {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return "".concat(yyyy, "-").concat(mm, "-").concat(dd);
}
function defaultOfferExpiryDate(projectType) {
    return normalizeProjectType(projectType) === 'urgent_request' ? futureDateString(1) : futureDateString(7);
}
// ISO dates (YYYY-MM-DD) compare correctly as strings.
function clampIsoDate(value, min, max) {
    if (min && value < min) return min;
    if (max && value > max) return max;
    return value;
}
function formatIsoDate(value, locale) {
    const [year, month, day] = value.split('-').map(Number);
    if (!year || !month || !day) return value;
    return new Date(year, month - 1, day).toLocaleDateString(locale === 'ar' ? 'ar-u-nu-latn' : 'en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}
function DeadlineOfferQuestion(param) {
    let { locale, edit } = param;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const isRTL = locale === 'ar';
    const isEnglish = typeof locale === 'string' && locale.toLowerCase().startsWith('en');
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [projectType, setProjectType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dateValue, setDateValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [projectStart, setProjectStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [projectEnd, setProjectEnd] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedMatchesCount, setSelectedMatchesCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"])(error, locale);
    const storageKey = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].deadlineOfferKey(locale);
    const today = todayString();
    const tomorrow = futureDateString(1);
    const isUrgentProject = !edit && normalizeProjectType(projectType) === 'urgent_request';
    // The offer must expire within the project window, and never in the past.
    const minDate = edit ? edit.minDate : projectStart > today ? projectStart : today;
    const maxDate = [
        projectEnd,
        isUrgentProject ? tomorrow : ''
    ].filter(Boolean).sort()[0] || '';
    const hasSelectableDates = !maxDate || minDate <= maxDate;
    const keepsCurrentDeadline = !!edit && dateValue === edit.original;
    const isPastDate = dateValue !== '' && dateValue < (edit ? edit.minDate : today);
    const isAfterUrgentMaxDate = isUrgentProject && dateValue !== '' && dateValue > tomorrow;
    const isOutsideProjectDates = dateValue !== '' && (!edit && projectStart !== '' && dateValue < projectStart || projectEnd !== '' && dateValue > projectEnd);
    const isInvalidDate = !keepsCurrentDeadline && (!hasSelectableDates || isPastDate || isAfterUrgentMaxDate || isOutsideProjectDates);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DeadlineOfferQuestion.useEffect": ()=>{
            const timer = window.setTimeout({
                "DeadlineOfferQuestion.useEffect.timer": ()=>setEntered(true)
            }["DeadlineOfferQuestion.useEffect.timer"], 30);
            return ({
                "DeadlineOfferQuestion.useEffect": ()=>window.clearTimeout(timer)
            })["DeadlineOfferQuestion.useEffect"];
        }
    }["DeadlineOfferQuestion.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DeadlineOfferQuestion.useEffect": ()=>{
            if (edit) {
                setProjectType(edit.projectType);
                setProjectEnd(edit.projectEnd);
                setDateValue(edit.value);
                return;
            }
            try {
                const storedProjectType = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale));
                setProjectType(storedProjectType);
                const schedule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readProjectSchedule"])(locale);
                const start = (schedule === null || schedule === void 0 ? void 0 : schedule.plannedStartDate) || '';
                const end = schedule ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDaysToIsoDate"])(schedule.plannedStartDate, schedule.durationDays) : '';
                setProjectStart(start);
                setProjectEnd(end);
                const now = todayString();
                const urgent = normalizeProjectType(storedProjectType) === 'urgent_request';
                const min = start > now ? start : now;
                const max = [
                    end,
                    urgent ? futureDateString(1) : ''
                ].filter(Boolean).sort()[0] || '';
                // A stored or default date outside the project window is moved into it.
                const stored = window.sessionStorage.getItem(storageKey);
                setDateValue(!max || min <= max ? clampIsoDate(stored || defaultOfferExpiryDate(storedProjectType), min, max) : stored || '');
                setSelectedMatchesCount((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSpecifiedInsighterProject"])(locale) ? 1 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalSubmit$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredSelectedMatchIds"])(locale).length);
            } catch (e) {
            // ignore
            }
        // The edit adapter seeds the step once; later renders keep the local edits.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["DeadlineOfferQuestion.useEffect"], [
        locale,
        storageKey
    ]);
    const submitProposal = async ()=>{
        setSubmitting(true);
        setError(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalSubmit$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["submitProjectProposal"])(locale);
            router.push(nav.hrefFor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectSubmissionSuccess));
        } catch (err) {
            const message = err instanceof Error && err.message === 'no_matches' ? isRTL ? 'يرجى اختيار خبير واحد على الأقل قبل إرسال الطلب.' : 'Please select at least one matched insighter before submitting.' : err instanceof Error && err.message === 'no_match_request_uuid' ? isRTL ? 'تعذر العثور على بيانات المطابقة الخاصة بالإرسال. أعد تحميل نتائج المطابقة ثم حاول مرة أخرى.' : 'The proposal match identifier is missing. Reload the match results and try again.' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر إرسال الطلب.' : 'Failed to submit project proposal.');
            setSelectedMatchesCount((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSpecifiedInsighterProject"])(locale) ? 1 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalSubmit$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredSelectedMatchIds"])(locale).length);
            setError(message);
        } finally{
            setSubmitting(false);
        }
    };
    const onContinue = async ()=>{
        if (submitting || isInvalidDate) return;
        if (!dateValue) {
            setError(isRTL ? 'يرجى اختيار تاريخ.' : 'Please select a date.');
            return;
        }
        if (edit) {
            edit.onSave(dateValue);
            return;
        }
        try {
            window.sessionStorage.setItem(storageKey, dateValue);
        } catch (e) {
        // ignore
        }
        await submitProposal();
    };
    const validationError = !hasSelectableDates ? isRTL ? 'لا توجد تواريخ متاحة ضمن مدة المشروع. عدّل تاريخ البدء أو الموعد النهائي.' : 'No dates are available within the project dates. Update the start date or delivery deadline.' : isPastDate ? edit ? isRTL ? 'لا يمكن أن يكون الموعد قبل الموعد الحالي أو في الماضي.' : 'The deadline cannot be earlier than the current one or in the past.' : isRTL ? 'لا يمكن أن يكون التاريخ في الماضي.' : 'Date cannot be in the past.' : isAfterUrgentMaxDate ? isRTL ? 'يجب أن تنتهي صلاحية عرض الطلب العاجل خلال 24 ساعة.' : 'Urgent request offer must expire within 24 hours.' : isOutsideProjectDates ? isRTL ? 'اختر تاريخًا ضمن مدة المشروع.' : 'Choose a date within the project dates.' : null;
    const visibleError = (keepsCurrentDeadline ? null : validationError) || error;
    var _edit_backHref;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-4xl mx-auto min-h-full flex flex-col",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 pb-32",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        locale: locale,
                        entered: entered,
                        projectTypeId: projectType,
                        serviceLabelOverride: edit ? edit.serviceLabel : undefined
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                        lineNumber: 258,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 text-start transition-all duration-700 ".concat(entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'),
                        children: [
                            isEnglish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                children: '\n              #deadline-offer-question-title {\n                font-family: "IBM Plex Serif", serif !important;\n              }\n            '
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                                lineNumber: 274,
                                columnNumber: 13
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "deadline-offer-question-title",
                                className: "text-2xl sm:text-3xl font-medium tracking-tight text-slate-900",
                                children: isRTL ? 'متى تنتهي صلاحية هذا العرض؟' : 'When should this offer expire?'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                                lineNumber: 280,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-sm text-slate-500 max-w-2xl",
                                children: isRTL ? 'إذا لم يتم التعاقد قبل هذا التاريخ، سيتم إزالة العرض تلقائيًا.' : 'If no contract is made by this date, the offer will be automatically removed.'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                                lineNumber: 288,
                                columnNumber: 11
                            }, this),
                            edit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm font-semibold text-slate-600 max-w-2xl",
                                children: isRTL ? 'يمكن تمديد الموعد فقط، وينطبق على جميع الخبراء المدعوين لهذا الطلب.' : 'The deadline can only be extended, and it applies to every Insighter invited to this request.'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                                lineNumber: 294,
                                columnNumber: 13
                            }, this) : selectedMatchesCount > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 inline-flex max-w-full items-center gap-2 rounded-full border border-sky-100 bg-sky-50/80 px-3 py-2 text-sm font-semibold text-sky-800 shadow-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full bg-[#1C7CBB] px-2 text-xs font-bold text-white",
                                        children: selectedMatchesCount
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                                        lineNumber: 301,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "min-w-0",
                                        children: isRTL ? 'من الخبراء/الجهات المختارة سيتم إرسالهم مع هذا العرض' : "selected match".concat(selectedMatchesCount === 1 ? '' : 'es', " will be submitted with this offer")
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                                        lineNumber: 304,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                                lineNumber: 300,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                        lineNumber: 265,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 transition-all duration-700 ".concat(entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'),
                        style: {
                            transitionDelay: '160ms'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$InlineDateCalendar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    value: dateValue,
                                    min: minDate,
                                    max: maxDate || undefined,
                                    onChange: (date)=>{
                                        setDateValue(date);
                                        setError(null);
                                    },
                                    locale: locale,
                                    label: isRTL ? 'تاريخ انتهاء العرض' : 'Offer expiry date'
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                                    lineNumber: 323,
                                    columnNumber: 13
                                }, this),
                                projectStart || projectEnd ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-3 text-xs font-medium text-slate-500",
                                    children: projectStart && projectEnd ? isRTL ? "مدة المشروع: ".concat(formatIsoDate(projectStart, locale), " – ").concat(formatIsoDate(projectEnd, locale)) : "Project dates: ".concat(formatIsoDate(projectStart, locale), " – ").concat(formatIsoDate(projectEnd, locale)) : projectEnd ? isRTL ? "الموعد النهائي للمشروع: ".concat(formatIsoDate(projectEnd, locale)) : "Project deadline: ".concat(formatIsoDate(projectEnd, locale)) : isRTL ? "بداية المشروع: ".concat(formatIsoDate(projectStart, locale)) : "Project start: ".concat(formatIsoDate(projectStart, locale))
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                                    lineNumber: 335,
                                    columnNumber: 15
                                }, this) : null,
                                visibleError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 text-sm text-rose-700",
                                    children: visibleError
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                                    lineNumber: 350,
                                    columnNumber: 15
                                }, this) : null
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                            lineNumber: 322,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                        lineNumber: 313,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                lineNumber: 257,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto px-4 lg:px-0 w-full max-w-4xl pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: (_edit_backHref = edit === null || edit === void 0 ? void 0 : edit.backHref) !== null && _edit_backHref !== void 0 ? _edit_backHref : nav.backHref,
                                className: "btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200",
                                children: isRTL ? 'رجوع' : 'Back'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                                lineNumber: 359,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>void onContinue(),
                                    disabled: submitting || isInvalidDate,
                                    className: "btn-sm px-6 py-2 rounded-full ".concat(!submitting && !isInvalidDate ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90' : 'text-slate-500 bg-slate-200 cursor-not-allowed'),
                                    children: submitting ? isRTL ? 'جاري الإرسال...' : 'Submitting...' : edit ? edit.continueLabel : isRTL ? 'إرسال الطلب' : 'Submit proposal'
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                                    lineNumber: 367,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                                lineNumber: 366,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                        lineNumber: 358,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                    lineNumber: 357,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                lineNumber: 356,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
        lineNumber: 253,
        columnNumber: 5
    }, this);
}
_s(DeadlineOfferQuestion, "rbzPOfmsc6oGbIAM5jJjEbmrYgg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"]
    ];
});
_c = DeadlineOfferQuestion;
var _c;
__turbopack_context__.k.register(_c, "DeadlineOfferQuestion");
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
"[project]/components/project/edit/EditScopeSteps.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EditScopesStep",
    ()=>EditScopesStep,
    "EditSubscopesStep",
    ()=>EditSubscopesStep
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCheck.mjs [app-client] (ecmascript) <export default as IconCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconPlus.mjs [app-client] (ecmascript) <export default as IconPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlusFilled$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlusFilled$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconPlusFilled.mjs [app-client] (ecmascript) <export default as IconPlusFilled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconX.mjs [app-client] (ecmascript) <export default as IconX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconXboxXFilled$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconXboxXFilled$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconXboxXFilled.mjs [app-client] (ecmascript) <export default as IconXboxXFilled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/ProjectSelectedTypeHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$backendLimits$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/backendLimits.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectStepErrorToast.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
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
const key = (name)=>name.trim().toLowerCase();
function useScopeCatalog(locale, serviceId) {
    _s();
    const [catalog, setCatalog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const isRTL = locale === 'ar';
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useScopeCatalog.useEffect": ()=>{
            let cancelled = false;
            if (!serviceId) {
                setCatalog([]);
                return;
            }
            const load = {
                "useScopeCatalog.useEffect.load": async ()=>{
                    try {
                        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
                        const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/common/setting/service/scope/".concat(serviceId, "?definition_mode=advanced")), {
                            headers: {
                                ...token ? {
                                    Authorization: "Bearer ".concat(token)
                                } : {},
                                Accept: 'application/json',
                                'Accept-Language': isRTL ? 'ar' : 'en',
                                'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
                            },
                            cache: 'no-store'
                        });
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res, isRTL ? 'تعذر تحميل نطاقات الخدمة.' : 'Failed to load service scopes.');
                        const json = await res.json();
                        const list = (Array.isArray(json === null || json === void 0 ? void 0 : json.data) ? json.data : []).map({
                            "useScopeCatalog.useEffect.load.list": (raw)=>{
                                var _raw_name, _ref, _ref1, _raw_children, _ref2, _ref3;
                                return {
                                    name: String((_ref1 = (_ref = (_raw_name = raw === null || raw === void 0 ? void 0 : raw.name) !== null && _raw_name !== void 0 ? _raw_name : raw === null || raw === void 0 ? void 0 : raw.title) !== null && _ref !== void 0 ? _ref : raw === null || raw === void 0 ? void 0 : raw.scope) !== null && _ref1 !== void 0 ? _ref1 : '').trim(),
                                    children: ((_ref3 = (_ref2 = (_raw_children = raw === null || raw === void 0 ? void 0 : raw.children) !== null && _raw_children !== void 0 ? _raw_children : raw === null || raw === void 0 ? void 0 : raw.subscopes) !== null && _ref2 !== void 0 ? _ref2 : raw === null || raw === void 0 ? void 0 : raw.sub_scopes) !== null && _ref3 !== void 0 ? _ref3 : []).map({
                                        "useScopeCatalog.useEffect.load.list": (c)=>{
                                            var _c_name, _ref, _ref1;
                                            return String(typeof c === 'string' ? c : (_ref1 = (_ref = (_c_name = c === null || c === void 0 ? void 0 : c.name) !== null && _c_name !== void 0 ? _c_name : c === null || c === void 0 ? void 0 : c.title) !== null && _ref !== void 0 ? _ref : c === null || c === void 0 ? void 0 : c.scope) !== null && _ref1 !== void 0 ? _ref1 : '').trim();
                                        }
                                    }["useScopeCatalog.useEffect.load.list"]).filter(Boolean)
                                };
                            }
                        }["useScopeCatalog.useEffect.load.list"]).filter({
                            "useScopeCatalog.useEffect.load.list": (item)=>item.name
                        }["useScopeCatalog.useEffect.load.list"]);
                        if (!cancelled) setCatalog(list);
                    } catch (err) {
                        if (cancelled) return;
                        setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر تحميل نطاقات الخدمة.' : 'Failed to load service scopes.'));
                        setCatalog([]);
                    }
                }
            }["useScopeCatalog.useEffect.load"];
            void load();
            return ({
                "useScopeCatalog.useEffect": ()=>{
                    cancelled = true;
                }
            })["useScopeCatalog.useEffect"];
        }
    }["useScopeCatalog.useEffect"], [
        isRTL,
        serviceId
    ]);
    return {
        catalog,
        error
    };
}
_s(useScopeCatalog, "ak9FOm1vqzYb92egDlXFVwFb+uM=");
function useEntered() {
    _s1();
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useEntered.useEffect": ()=>{
            const timer = window.setTimeout({
                "useEntered.useEffect.timer": ()=>setEntered(true)
            }["useEntered.useEffect.timer"], 30);
            return ({
                "useEntered.useEffect": ()=>window.clearTimeout(timer)
            })["useEntered.useEffect"];
        }
    }["useEntered.useEffect"], []);
    return entered;
}
_s1(useEntered, "fksSHZBpcfu1vedVcw5tH+psUUE=");
function StepFooter(param) {
    let { isRTL, backHref, continueLabel, canContinue, onContinue } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: backHref,
                        className: "btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200",
                        children: isRTL ? 'رجوع' : 'Back'
                    }, void 0, false, {
                        fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                        lineNumber: 100,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onContinue,
                        disabled: !canContinue,
                        className: "btn-sm px-6 py-2 rounded-full ".concat(canContinue ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90' : 'text-slate-500 bg-slate-200 cursor-not-allowed'),
                        children: continueLabel
                    }, void 0, false, {
                        fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                        lineNumber: 103,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                lineNumber: 99,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
            lineNumber: 98,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
_c = StepFooter;
function StepTitle(param) {
    let { id, entered, isRTL, locale, title, subtitle, children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-2 text-start transition-all duration-700 ".concat(entered ? 'translate-x-0 opacity-100' : isRTL ? 'translate-x-4 opacity-0' : '-translate-x-4 opacity-0'),
        children: [
            locale === 'en' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: "#".concat(id, ", #").concat(id, ' * { font-family: "IBM Plex Serif", serif !important; }')
            }, void 0, false, {
                fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                lineNumber: 128,
                columnNumber: 26
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-start gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: id,
                        className: "text-xl font-medium tracking-tight text-slate-900 sm:text-2xl",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this),
                    children
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1.5 max-w-3xl text-sm font-semibold leading-relaxed text-slate-600",
                children: subtitle
            }, void 0, false, {
                fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
        lineNumber: 127,
        columnNumber: 5
    }, this);
}
_c1 = StepTitle;
function EditScopesStep(param) {
    let { locale, serviceId, scopes, onSave, projectType, serviceLabel, backHref, continueLabel } = param;
    _s2();
    const isRTL = locale === 'ar';
    const entered = useEntered();
    const { catalog, error } = useScopeCatalog(locale, serviceId);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"])(error, locale);
    // Names picked from the catalog, plus the client's own scopes (checked or not).
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "EditScopesStep.useState": ()=>new Set(scopes.map({
                "EditScopesStep.useState": (s)=>key(s.scope)
            }["EditScopesStep.useState"]))
    }["EditScopesStep.useState"]);
    const [custom, setCustom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [pending, setPending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditScopesStep.useEffect": ()=>{
            if (!catalog) return;
            const known = new Set(catalog.map({
                "EditScopesStep.useEffect": (item)=>key(item.name)
            }["EditScopesStep.useEffect"]));
            setCustom(scopes.map({
                "EditScopesStep.useEffect": (s)=>s.scope
            }["EditScopesStep.useEffect"]).filter({
                "EditScopesStep.useEffect": (name)=>!known.has(key(name))
            }["EditScopesStep.useEffect"]));
        // Seed once when the catalog arrives.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["EditScopesStep.useEffect"], [
        catalog
    ]);
    const toggle = (name)=>setSelected((prev)=>{
            const next = new Set(prev);
            if (next.has(key(name))) next.delete(key(name));
            else next.add(key(name));
            return next;
        });
    const commitPending = ()=>{
        const name = (pending || '').trim();
        setPending(null);
        if (!name) return;
        const exists = [
            ...(catalog || []).map((item)=>item.name),
            ...custom
        ].some((other)=>key(other) === key(name));
        if (!exists) setCustom((prev)=>[
                ...prev,
                name
            ]);
        setSelected((prev)=>new Set(prev).add(key(name)));
    };
    const removeCustom = (name)=>{
        setCustom((prev)=>prev.filter((other)=>other !== name));
        setSelected((prev)=>{
            const next = new Set(prev);
            next.delete(key(name));
            return next;
        });
    };
    const catalogNames = (catalog || []).map((item)=>item.name);
    const allNames = [
        ...catalogNames,
        ...custom
    ];
    const selectable = catalogNames.length;
    const allSelected = selectable > 0 && catalogNames.every((name)=>selected.has(key(name)));
    const canContinue = catalog !== null && allNames.some((name)=>selected.has(key(name)));
    const onContinue = ()=>{
        if (!canContinue) return;
        // Keep saved scopes (with their ids, descriptions and subscopes) in place; append new picks.
        const kept = scopes.filter((s)=>selected.has(key(s.scope)));
        const keptKeys = new Set(kept.map((s)=>key(s.scope)));
        const added = allNames.filter((name)=>selected.has(key(name)) && !keptKeys.has(key(name))).map((name)=>({
                scope: name,
                description: null,
                subscopes: []
            }));
        onSave([
            ...kept,
            ...added
        ]);
    };
    const cardClass = (checked)=>"flex min-h-[56px] cursor-pointer select-none items-center gap-3 rounded-xl border px-3.5 py-3 text-start shadow-sm backdrop-blur-md transition-all duration-500 [-webkit-tap-highlight-color:transparent] sm:px-4 ".concat(checked ? 'border-blue-300 bg-white/70' : 'border-white/30 bg-white/40 hover:bg-white/55 active:bg-white/60', " ").concat(entered ? 'translate-x-0 opacity-100' : isRTL ? 'translate-x-4 opacity-0' : '-translate-x-4 opacity-0');
    const gradient = 'bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 bg-clip-text text-transparent';
    const title = serviceLabel ? isRTL ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            "اختر نطاق ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: gradient,
                children: serviceLabel
            }, void 0, false, {
                fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                lineNumber: 207,
                columnNumber: 21
            }, this)
        ]
    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            "Select ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: gradient,
                children: serviceLabel
            }, void 0, false, {
                fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                lineNumber: 208,
                columnNumber: 18
            }, this),
            " scope"
        ]
    }, void 0, true) : isRTL ? 'اختر نطاق المشروع' : 'Select project scope';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mx-auto w-full max-w-5xl touch-manipulation",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                locale: locale,
                entered: entered,
                projectTypeId: projectType,
                serviceLabelOverride: serviceLabel
            }, void 0, false, {
                fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                lineNumber: 213,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StepTitle, {
                id: "edit-scope-title",
                entered: entered,
                isRTL: isRTL,
                locale: locale,
                title: title,
                subtitle: catalogNames.length ? isRTL ? 'يمكنك اختيار أكثر من نطاق.' : 'You can select multiple scopes.' : isRTL ? 'أضف نطاقات المشروع يدويًا (يمكنك إضافة أكثر من نطاق).' : 'Add your scopes manually (you can add multiple scopes).'
            }, void 0, false, {
                fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                lineNumber: 214,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 pb-[100px] sm:mt-7",
                children: catalog === null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm font-semibold text-slate-600",
                    children: isRTL ? 'جاري التحميل…' : 'Loading…'
                }, void 0, false, {
                    fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                    lineNumber: 219,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        selectable > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-3 flex items-center justify-end",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-pressed": allSelected,
                                onClick: ()=>setSelected((prev)=>{
                                        const next = new Set(prev);
                                        catalogNames.forEach((name)=>allSelected ? next.delete(key(name)) : next.add(key(name)));
                                        return next;
                                    }),
                                className: "inline-flex min-h-[36px] select-none items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ".concat(allSelected ? 'border-blue-300 bg-blue-50 text-[#1C7CBB]' : 'border-slate-200 bg-white/70 text-slate-600 hover:bg-white'),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex h-4 w-4 items-center justify-center rounded border ".concat(allSelected ? 'border-[#1C7CBB] bg-[#1C7CBB] text-white' : 'border-slate-300 bg-white'),
                                        children: allSelected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                                            size: 12,
                                            stroke: 3
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                            lineNumber: 237,
                                            columnNumber: 36
                                        }, this) : null
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                        lineNumber: 236,
                                        columnNumber: 19
                                    }, this),
                                    allSelected ? isRTL ? 'إلغاء تحديد الكل' : 'Deselect all' : isRTL ? 'تحديد الكل' : 'Select all'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                lineNumber: 224,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                            lineNumber: 223,
                            columnNumber: 15
                        }, this) : null,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3",
                            role: "group",
                            children: [
                                catalogNames.map((name, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: cardClass(selected.has(key(name))),
                                        style: {
                                            transitionDelay: "".concat(110 + index * 45, "ms")
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: selected.has(key(name)),
                                                onChange: ()=>toggle(name),
                                                className: "h-5 w-5 shrink-0 cursor-pointer rounded border-slate-300 text-[#1C7CBB] focus:ring-2 focus:ring-blue-200"
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                                lineNumber: 247,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-semibold leading-snug text-slate-900",
                                                children: name
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                                lineNumber: 253,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, name, true, {
                                        fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                        lineNumber: 246,
                                        columnNumber: 17
                                    }, this)),
                                custom.map((name)=>{
                                    const checked = selected.has(key(name));
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex min-h-[56px] items-stretch rounded-xl border shadow-sm backdrop-blur-md transition-colors duration-300 ".concat(checked ? 'border-blue-300 bg-white/70' : 'border-white/30 bg-white/40 hover:bg-white/55'),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "flex min-w-0 flex-1 cursor-pointer select-none items-center gap-3 py-3 ps-3.5 text-start sm:ps-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        checked: checked,
                                                        onChange: ()=>toggle(name),
                                                        className: "h-5 w-5 shrink-0 cursor-pointer rounded border-slate-300 text-[#1C7CBB] focus:ring-2 focus:ring-blue-200"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                                        lineNumber: 262,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "min-w-0 flex-1 break-words text-sm font-semibold leading-snug text-slate-900",
                                                        children: name
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                                        lineNumber: 268,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                                lineNumber: 261,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>removeCustom(name),
                                                "aria-label": isRTL ? 'إزالة النطاق' : 'Remove scope',
                                                className: "group inline-flex w-11 shrink-0 items-center justify-center sm:w-12",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-500 group-hover:bg-white group-hover:text-slate-700",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconXboxXFilled$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconXboxXFilled$3e$__["IconXboxXFilled"], {
                                                        size: 14
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                                        lineNumber: 277,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                                    lineNumber: 276,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                                lineNumber: 270,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, name, true, {
                                        fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                        lineNumber: 260,
                                        columnNumber: 19
                                    }, this);
                                }),
                                pending !== null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex min-h-[56px] items-center gap-3 rounded-xl border border-white/30 bg-white/55 px-3.5 py-3 shadow-sm backdrop-blur-md sm:px-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex h-5 w-5 shrink-0 rounded border border-slate-300 bg-white/80",
                                            "aria-hidden": "true"
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                            lineNumber: 286,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: pending,
                                            maxLength: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$backendLimits$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BACKEND_STRING_MAX"],
                                            onChange: (e)=>setPending(e.target.value),
                                            onBlur: commitPending,
                                            onKeyDown: (e)=>{
                                                if (e.key === 'Enter') commitPending();
                                                if (e.key === 'Escape') setPending(null);
                                            },
                                            placeholder: isRTL ? 'اسم النطاق…' : 'Scope name…',
                                            className: "min-w-0 flex-1 border-0 bg-transparent p-0 text-start text-base font-semibold text-slate-900 shadow-none outline-none ring-0 placeholder:text-slate-400 focus:ring-0 sm:text-sm",
                                            autoFocus: true
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                            lineNumber: 287,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onMouseDown: (e)=>e.preventDefault(),
                                            onClick: commitPending,
                                            "aria-label": isRTL ? 'إضافة النطاق' : 'Add scope',
                                            className: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm hover:bg-emerald-600 sm:h-6 sm:w-6",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                                                size: 13,
                                                stroke: 2.5
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                                lineNumber: 307,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                            lineNumber: 300,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onMouseDown: (e)=>e.preventDefault(),
                                            onClick: ()=>setPending(null),
                                            "aria-label": isRTL ? 'إلغاء' : 'Cancel',
                                            className: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white shadow-sm hover:bg-rose-600 sm:h-6 sm:w-6",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconXboxXFilled$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconXboxXFilled$3e$__["IconXboxXFilled"], {
                                                size: 13
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                                lineNumber: 316,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                            lineNumber: 309,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                    lineNumber: 285,
                                    columnNumber: 17
                                }, this) : null,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onMouseDown: (e)=>{
                                        if (pending !== null) e.preventDefault();
                                    },
                                    onClick: ()=>setPending(''),
                                    className: "flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl border border-dashed border-blue-300 bg-white/35 px-3.5 py-3 shadow-sm backdrop-blur-md hover:bg-blue-50/30 sm:px-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlusFilled$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlusFilled$3e$__["IconPlusFilled"], {
                                            size: 15,
                                            className: "shrink-0 text-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                            lineNumber: 327,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-semibold text-blue-500",
                                            children: isRTL ? 'إضافة نطاق' : 'Add Scope'
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                            lineNumber: 328,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                    lineNumber: 321,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                            lineNumber: 244,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                lineNumber: 217,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StepFooter, {
                isRTL: isRTL,
                backHref: backHref,
                continueLabel: continueLabel,
                canContinue: canContinue,
                onContinue: onContinue
            }, void 0, false, {
                fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                lineNumber: 335,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
        lineNumber: 212,
        columnNumber: 5
    }, this);
}
_s2(EditScopesStep, "vOa4cGpmKj3CkzngWkq9FkNuMoE=", false, function() {
    return [
        useEntered,
        useScopeCatalog,
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"]
    ];
});
_c2 = EditScopesStep;
function EditSubscopesStep(param) {
    let { locale, serviceId, scopes, onSave, projectType, serviceLabel, backHref, continueLabel } = param;
    _s3();
    const isRTL = locale === 'ar';
    const entered = useEntered();
    const { catalog, error } = useScopeCatalog(locale, serviceId);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"])(error, locale);
    // Selected subscope names per scope (by scope key), and the client's own subscopes.
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "EditSubscopesStep.useState": ()=>Object.fromEntries(scopes.map({
                "EditSubscopesStep.useState": (s)=>[
                        key(s.scope),
                        s.subscopes.map({
                            "EditSubscopesStep.useState": (child)=>key(child.scope)
                        }["EditSubscopesStep.useState"])
                    ]
            }["EditSubscopesStep.useState"]))
    }["EditSubscopesStep.useState"]);
    const [custom, setCustom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [adding, setAdding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [draftName, setDraftName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const childrenOf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EditSubscopesStep.useMemo[childrenOf]": ()=>{
            const map = new Map();
            (catalog || []).forEach({
                "EditSubscopesStep.useMemo[childrenOf]": (item)=>map.set(key(item.name), item.children)
            }["EditSubscopesStep.useMemo[childrenOf]"]);
            return map;
        }
    }["EditSubscopesStep.useMemo[childrenOf]"], [
        catalog
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditSubscopesStep.useEffect": ()=>{
            if (!catalog) return;
            setCustom(Object.fromEntries(scopes.map({
                "EditSubscopesStep.useEffect": (s)=>{
                    const known = new Set((childrenOf.get(key(s.scope)) || []).map(key));
                    return [
                        key(s.scope),
                        s.subscopes.map({
                            "EditSubscopesStep.useEffect": (child)=>child.scope
                        }["EditSubscopesStep.useEffect"]).filter({
                            "EditSubscopesStep.useEffect": (name)=>!known.has(key(name))
                        }["EditSubscopesStep.useEffect"])
                    ];
                }
            }["EditSubscopesStep.useEffect"])));
        // Seed once when the catalog arrives.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["EditSubscopesStep.useEffect"], [
        catalog
    ]);
    const isSelected = (scopeKey, name)=>(selected[scopeKey] || []).includes(key(name));
    const toggle = (scopeKey, name)=>setSelected((prev)=>{
            const list = prev[scopeKey] || [];
            return {
                ...prev,
                [scopeKey]: list.includes(key(name)) ? list.filter((k)=>k !== key(name)) : [
                    ...list,
                    key(name)
                ]
            };
        });
    const finishAdding = (scopeKey)=>{
        const name = draftName.trim();
        setAdding(null);
        setDraftName('');
        if (!name) return;
        const existing = [
            ...childrenOf.get(scopeKey) || [],
            ...custom[scopeKey] || []
        ];
        if (!existing.some((other)=>key(other) === key(name))) setCustom((prev)=>({
                ...prev,
                [scopeKey]: [
                    ...prev[scopeKey] || [],
                    name
                ]
            }));
        if (!isSelected(scopeKey, name)) toggle(scopeKey, name);
    };
    const removeCustom = (scopeKey, name)=>{
        setCustom((prev)=>({
                ...prev,
                [scopeKey]: (prev[scopeKey] || []).filter((other)=>other !== name)
            }));
        setSelected((prev)=>({
                ...prev,
                [scopeKey]: (prev[scopeKey] || []).filter((k)=>k !== key(name))
            }));
    };
    const total = Object.values(selected).reduce((sum, list)=>sum + list.length, 0);
    const onContinue = ()=>{
        onSave(scopes.map((scope)=>{
            const scopeKey = key(scope.scope);
            const picked = new Set(selected[scopeKey] || []);
            // Keep saved subscopes in place (with ids and descriptions); append new picks.
            const kept = scope.subscopes.filter((child)=>picked.has(key(child.scope)));
            const keptKeys = new Set(kept.map((child)=>key(child.scope)));
            const added = [
                ...childrenOf.get(scopeKey) || [],
                ...custom[scopeKey] || []
            ].filter((name)=>picked.has(key(name)) && !keptKeys.has(key(name))).filter((name, index, list)=>list.findIndex((other)=>key(other) === key(name)) === index).map((name)=>({
                    scope: name,
                    description: null,
                    subscopes: []
                }));
            return {
                ...scope,
                subscopes: [
                    ...kept,
                    ...added
                ]
            };
        }));
    };
    const chip = (param)=>{
        let { chipKey, label, active, onToggle, onRemove } = param;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "inline-flex items-center rounded-full border text-[12.5px] font-medium transition-colors ".concat(active ? 'border-[#1C7CBB] bg-[#1C7CBB] text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-[#1C7CBB]/50'),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: onToggle,
                    "aria-pressed": active,
                    className: "inline-flex items-center gap-1.5 py-1.5 ".concat(onRemove ? 'ps-3.5 pe-1.5' : 'px-3.5'),
                    children: [
                        active ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                            size: 14,
                            stroke: 2.5
                        }, void 0, false, {
                            fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                            lineNumber: 415,
                            columnNumber: 19
                        }, this) : null,
                        label
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                    lineNumber: 414,
                    columnNumber: 7
                }, this),
                onRemove ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: onRemove,
                    "aria-label": isRTL ? 'إزالة النطاق الفرعي' : 'Remove subscope',
                    className: "me-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full ".concat(active ? 'hover:bg-white/20' : 'text-slate-400 hover:bg-rose-50 hover:text-rose-500'),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__["IconX"], {
                        size: 12,
                        stroke: 2.5
                    }, void 0, false, {
                        fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                        lineNumber: 425,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                    lineNumber: 419,
                    columnNumber: 9
                }, this) : null
            ]
        }, chipKey, true, {
            fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
            lineNumber: 408,
            columnNumber: 5
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mx-auto w-full max-w-7xl",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                locale: locale,
                entered: entered,
                projectTypeId: projectType,
                serviceLabelOverride: serviceLabel
            }, void 0, false, {
                fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                lineNumber: 433,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StepTitle, {
                id: "edit-subscopes-title",
                entered: entered,
                isRTL: isRTL,
                locale: locale,
                title: isRTL ? 'اختر النطاقات الفرعية وأضف أخرى' : 'Select and add subscopes',
                subtitle: isRTL ? 'اختر النطاقات الفرعية المطلوبة، ويمكنك إضافة نطاقات فرعية أخرى.' : 'Select the required subscopes, and add other subscopes if you need them.',
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-600",
                    children: isRTL ? "".concat(total, " محدد") : "".concat(total, " selected")
                }, void 0, false, {
                    fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                    lineNumber: 437,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                lineNumber: 434,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 space-y-4 pb-[130px] lg:pb-24",
                children: catalog === null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm font-semibold text-slate-600",
                    children: isRTL ? 'جاري التحميل…' : 'Loading…'
                }, void 0, false, {
                    fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                    lineNumber: 442,
                    columnNumber: 11
                }, this) : scopes.map((scope)=>{
                    const scopeKey = key(scope.scope);
                    const children = childrenOf.get(scopeKey) || [];
                    const own = custom[scopeKey] || [];
                    const allSelected = children.length > 0 && children.every((name)=>isSelected(scopeKey, name));
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "space-y-3 rounded-xl border border-slate-200 bg-white p-4 sm:p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center justify-between gap-x-4 gap-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-[15px] font-bold text-slate-900",
                                        children: scope.scope
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                        lineNumber: 451,
                                        columnNumber: 17
                                    }, this),
                                    children.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setSelected((prev)=>{
                                                const rest = (prev[scopeKey] || []).filter((k)=>!children.some((name)=>key(name) === k));
                                                return {
                                                    ...prev,
                                                    [scopeKey]: allSelected ? rest : [
                                                        ...rest,
                                                        ...children.map(key)
                                                    ]
                                                };
                                            }),
                                        className: "text-[13px] font-semibold text-[#1C7CBB] hover:underline",
                                        children: allSelected ? isRTL ? 'إلغاء تحديد الكل' : 'Clear' : isRTL ? 'تحديد الكل' : 'Select all'
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                        lineNumber: 453,
                                        columnNumber: 19
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                lineNumber: 450,
                                columnNumber: 15
                            }, this),
                            children.length === 0 && own.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[13px] font-medium text-slate-500",
                                children: isRTL ? 'سيتم تضمين هذا النطاق بالكامل. أضف نطاقات فرعية إذا أردت تفاصيل أكثر.' : 'This whole scope will be included. Add subscopes if you want to be more specific.'
                            }, void 0, false, {
                                fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                lineNumber: 466,
                                columnNumber: 17
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: [
                                    children.map((name)=>chip({
                                            chipKey: name,
                                            label: name,
                                            active: isSelected(scopeKey, name),
                                            onToggle: ()=>toggle(scopeKey, name)
                                        })),
                                    own.map((name)=>chip({
                                            chipKey: "own-".concat(name),
                                            label: name,
                                            active: isSelected(scopeKey, name),
                                            onToggle: ()=>toggle(scopeKey, name),
                                            onRemove: ()=>removeCustom(scopeKey, name)
                                        })),
                                    adding === scopeKey ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        autoFocus: true,
                                        value: draftName,
                                        maxLength: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$backendLimits$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BACKEND_STRING_MAX"],
                                        onChange: (e)=>setDraftName(e.target.value),
                                        onKeyDown: (e)=>{
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                finishAdding(scopeKey);
                                            }
                                            if (e.key === 'Escape') setAdding(null);
                                        },
                                        onBlur: ()=>finishAdding(scopeKey),
                                        placeholder: isRTL ? 'اكتب الاسم ثم اضغط Enter' : 'Type a name, then press Enter',
                                        className: "min-w-[220px] rounded-full border border-[#1C7CBB] bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-slate-900 placeholder:font-normal placeholder:text-slate-400 focus:outline-none"
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                        lineNumber: 474,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>{
                                            setDraftName('');
                                            setAdding(scopeKey);
                                        },
                                        className: "inline-flex items-center gap-1 rounded-full border border-dashed border-slate-300 px-3.5 py-1.5 text-[12.5px] font-medium text-slate-500 transition-colors hover:border-[#1C7CBB] hover:text-[#1C7CBB]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlus$3e$__["IconPlus"], {
                                                size: 14,
                                                stroke: 2.2
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                                lineNumber: 496,
                                                columnNumber: 21
                                            }, this),
                                            isRTL ? 'أضف نطاقًا خاصًا' : 'Add your own'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                        lineNumber: 491,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                                lineNumber: 470,
                                columnNumber: 15
                            }, this)
                        ]
                    }, scopeKey, true, {
                        fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                        lineNumber: 449,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                lineNumber: 440,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StepFooter, {
                isRTL: isRTL,
                backHref: backHref,
                continueLabel: continueLabel,
                canContinue: catalog !== null,
                onContinue: onContinue
            }, void 0, false, {
                fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
                lineNumber: 506,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/edit/EditScopeSteps.tsx",
        lineNumber: 432,
        columnNumber: 5
    }, this);
}
_s3(EditSubscopesStep, "F4AUw5QLtRx7k7Zyo6xHq8ckaNM=", false, function() {
    return [
        useEntered,
        useScopeCatalog,
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"]
    ];
});
_c3 = EditSubscopesStep;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "StepFooter");
__turbopack_context__.k.register(_c1, "StepTitle");
__turbopack_context__.k.register(_c2, "EditScopesStep");
__turbopack_context__.k.register(_c3, "EditSubscopesStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/edit/agreementEdit.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectSchedule.ts [app-client] (ecmascript)");
;
;
;
;
const EDITABLE_SLUGS = [
    'target-market',
    'data-sources-expected'
];
function headers(locale) {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
    return {
        ...token ? {
            Authorization: "Bearer ".concat(token)
        } : {},
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': locale === 'ar' ? 'ar' : 'en',
        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
    };
}
async function fetchClientProject(locale, projectUuid) {
    const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/account/project/show/".concat(encodeURIComponent(projectUuid))), {
        headers: headers(locale),
        cache: 'no-store'
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res, locale === 'ar' ? 'تعذر تحميل المشروع.' : 'Could not load the project.');
    const json = await res.json();
    var _json_data;
    return (_json_data = json === null || json === void 0 ? void 0 : json.data) !== null && _json_data !== void 0 ? _json_data : json;
}
async function saveClientAgreement(locale, projectUuid, patch) {
    const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/account/project/agreement/client-requirements/".concat(encodeURIComponent(projectUuid))), {
        // POST with Laravel's method override: a real PATCH fails the CORS preflight.
        method: 'POST',
        headers: headers(locale),
        body: JSON.stringify({
            ...patch,
            _method: 'PATCH'
        })
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res, locale === 'ar' ? 'تعذر حفظ التعديلات.' : 'Could not save your changes.');
    const json = await res.json();
    var _json_data;
    return (_json_data = json === null || json === void 0 ? void 0 : json.data) !== null && _json_data !== void 0 ? _json_data : json;
}
const signed = (v)=>!!v && v !== '0' && v !== 'false';
function agreementLocked(project) {
    const contract = project === null || project === void 0 ? void 0 : project.contract;
    return signed(contract === null || contract === void 0 ? void 0 : contract.user_sign_at) || signed(contract === null || contract === void 0 ? void 0 : contract.insighter_sign_at) || [
        'payment',
        'in_progress',
        'in_review',
        'closed',
        'cancelled',
        'completed'
    ].includes((project === null || project === void 0 ? void 0 : project.status) || '') || !!(project === null || project === void 0 ? void 0 : project.contract_uuid) && !contract;
}
function deadlineOfferLocked(project) {
    var _project_offer;
    const invited = Array.isArray(project === null || project === void 0 ? void 0 : project.invited) ? project.invited : [];
    return agreementLocked(project) || !!(project === null || project === void 0 ? void 0 : (_project_offer = project.offer) === null || _project_offer === void 0 ? void 0 : _project_offer.uuid) || (project === null || project === void 0 ? void 0 : project.status) === 'contracting' || invited.some((match)=>{
        var _match_offer;
        return (match === null || match === void 0 ? void 0 : (_match_offer = match.offer) === null || _match_offer === void 0 ? void 0 : _match_offer.status) === 'awarded';
    });
}
function localDeadlineDate(value) {
    const raw = String(value !== null && value !== void 0 ? value : '').trim();
    return /^\d{4}-\d{2}-\d{2}/.test(raw) ? raw.slice(0, 10) : null;
}
function scheduleOf(project) {
    var _project_planned_start_date;
    const start = String((_project_planned_start_date = project === null || project === void 0 ? void 0 : project.planned_start_date) !== null && _project_planned_start_date !== void 0 ? _project_planned_start_date : '').slice(0, 10);
    const duration = Number(project === null || project === void 0 ? void 0 : project.duration_days);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(start) || (project === null || project === void 0 ? void 0 : project.duration_days) === null || (project === null || project === void 0 ? void 0 : project.duration_days) === '' || !Number.isInteger(duration) || duration < 0) return null;
    return {
        plannedStartDate: start,
        durationDays: duration
    };
}
const ownedByClient = (row)=>(row === null || row === void 0 ? void 0 : row.filled_by_role) === 'client';
/** Unknown or mixed ownership stays read-only, including an empty group. */ function ownsGroup(rows) {
    return rows.length > 0 && rows.every(ownedByClient);
}
function scopeRows(service) {
    const scopes = Array.isArray(service === null || service === void 0 ? void 0 : service.scopes) ? service.scopes : [];
    return scopes.reduce((all, row)=>{
        var _row_children, _ref;
        return all.concat(row, (_ref = (_row_children = row === null || row === void 0 ? void 0 : row.children) !== null && _row_children !== void 0 ? _row_children : row === null || row === void 0 ? void 0 : row.subscopes) !== null && _ref !== void 0 ? _ref : []);
    }, []);
}
function rawDeliverables(service) {
    const blocks = Array.isArray(service === null || service === void 0 ? void 0 : service.components) ? service.components : [];
    return blocks.reduce((all, block)=>{
        var _block_deliverablestage;
        var _block_deliverablestage_deliverables;
        return all.concat((_block_deliverablestage_deliverables = block === null || block === void 0 ? void 0 : (_block_deliverablestage = block['deliverable-stage']) === null || _block_deliverablestage === void 0 ? void 0 : _block_deliverablestage.deliverables) !== null && _block_deliverablestage_deliverables !== void 0 ? _block_deliverablestage_deliverables : []);
    }, []);
}
function toScope(row) {
    var _row_scope, _row_description, _row_children, _ref;
    return {
        ...(row === null || row === void 0 ? void 0 : row.id) ? {
            id: Number(row.id)
        } : {},
        scope: String((_row_scope = row === null || row === void 0 ? void 0 : row.scope) !== null && _row_scope !== void 0 ? _row_scope : ''),
        description: (_row_description = row === null || row === void 0 ? void 0 : row.description) !== null && _row_description !== void 0 ? _row_description : null,
        subscopes: ((_ref = (_row_children = row === null || row === void 0 ? void 0 : row.children) !== null && _row_children !== void 0 ? _row_children : row === null || row === void 0 ? void 0 : row.subscopes) !== null && _ref !== void 0 ? _ref : []).map(toScope)
    };
}
const WAYS = [
    'on_platform',
    'session',
    'physical_workshop'
];
function toDeliverable(row) {
    var _row_way, _row_way1;
    const selected = row === null || row === void 0 ? void 0 : (_row_way = row.way) === null || _row_way === void 0 ? void 0 : _row_way.selected;
    var _row_title, _row_way_address;
    return {
        ...(row === null || row === void 0 ? void 0 : row.id) ? {
            id: Number(row.id)
        } : {},
        title: String((_row_title = row === null || row === void 0 ? void 0 : row.title) !== null && _row_title !== void 0 ? _row_title : ''),
        period_days: Math.max(0, Number(row === null || row === void 0 ? void 0 : row.period_days) || 0),
        report_type: Array.isArray(row === null || row === void 0 ? void 0 : row.report_type) ? row.report_type.map((t)=>String(t).toLowerCase()) : [],
        way: {
            selected: WAYS.includes(selected) ? selected : null,
            address: (_row_way_address = row === null || row === void 0 ? void 0 : (_row_way1 = row.way) === null || _row_way1 === void 0 ? void 0 : _row_way1.address) !== null && _row_way_address !== void 0 ? _row_way_address : null
        }
    };
}
function orderDeliverables(items) {
    return items.map((item, index)=>({
            item,
            index
        })).sort((a, b)=>a.item.period_days - b.item.period_days || a.index - b.index).map((param)=>{
        let { item } = param;
        return item;
    });
}
function nameOf(value) {
    var _value_name, _value_names;
    if (!value) return '';
    if (typeof value.name === 'string') return value.name;
    var _value_name_en, _ref, _ref1;
    return String((_ref1 = (_ref = (_value_name_en = (_value_name = value.name) === null || _value_name === void 0 ? void 0 : _value_name.en) !== null && _value_name_en !== void 0 ? _value_name_en : (_value_names = value.names) === null || _value_names === void 0 ? void 0 : _value_names.en) !== null && _ref !== void 0 ? _ref : value.title) !== null && _ref1 !== void 0 ? _ref1 : '');
}
function toComponent(block, level, projectServiceId) {
    const slug = block === null || block === void 0 ? void 0 : block.component_slug;
    const id = Number(block === null || block === void 0 ? void 0 : block.id);
    if (!EDITABLE_SLUGS.includes(slug) || !(id > 0)) return null;
    const raw = block[slug];
    if (slug === 'target-market') {
        const objects = Array.isArray(raw === null || raw === void 0 ? void 0 : raw.objects) ? raw.objects : [];
        const type = [
            'country',
            'region',
            'economic'
        ].includes(raw === null || raw === void 0 ? void 0 : raw.type) ? raw.type : 'country';
        return {
            id,
            level,
            projectServiceId,
            slug,
            name: block.component_name || slug,
            value: {
                type,
                ids: objects.map((row)=>Number(row === null || row === void 0 ? void 0 : row.id)).filter((rowId)=>rowId > 0).sort((x, y)=>x - y)
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
    const services = Array.isArray(project === null || project === void 0 ? void 0 : project.project_services) ? [
        ...project.project_services
    ] : [];
    services.sort((a, b)=>(Number(a === null || a === void 0 ? void 0 : a.position) || 0) - (Number(b === null || b === void 0 ? void 0 : b.position) || 0));
    const serviceBlockIds = new Set(services.reduce((all, s)=>{
        var _s_components;
        return all.concat(((_s_components = s === null || s === void 0 ? void 0 : s.components) !== null && _s_components !== void 0 ? _s_components : []).map((b)=>Number(b === null || b === void 0 ? void 0 : b.id)).filter(Boolean));
    }, []));
    const projectComponents = (Array.isArray(project === null || project === void 0 ? void 0 : project.components) ? project.components : []).filter((block)=>!serviceBlockIds.has(Number(block === null || block === void 0 ? void 0 : block.id)) && ownedByClient(block)).map((block)=>toComponent(block, 'project', null));
    const serviceComponents = services.reduce((all, s)=>{
        var _s_components;
        return all.concat(((_s_components = s === null || s === void 0 ? void 0 : s.components) !== null && _s_components !== void 0 ? _s_components : []).filter(ownedByClient).map((block)=>toComponent(block, 'service', Number(s.id) || null)));
    }, []);
    var _project_type;
    return {
        // Urgent requests are fixed to start today and finish within a day.
        schedule: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUrgentProjectType"])((_project_type = project === null || project === void 0 ? void 0 : project.type) !== null && _project_type !== void 0 ? _project_type : null) ? null : scheduleOf(project),
        deadlineOffer: deadlineOfferLocked(project) ? null : localDeadlineDate(project === null || project === void 0 ? void 0 : project.last_proposal_deadline),
        components: [
            ...projectComponents,
            ...serviceComponents
        ].filter((c)=>!!c),
        services: services.filter((s)=>Number(s === null || s === void 0 ? void 0 : s.id) > 0).map((s)=>{
            var _s_service, _s_service1;
            var _s_uuid, _s_scopes;
            return {
                id: Number(s.id),
                uuid: String((_s_uuid = s.uuid) !== null && _s_uuid !== void 0 ? _s_uuid : ''),
                serviceId: (s === null || s === void 0 ? void 0 : (_s_service = s.service) === null || _s_service === void 0 ? void 0 : _s_service.id) ? Number(s.service.id) : null,
                title: String(s.title || ((_s_service1 = s.service) === null || _s_service1 === void 0 ? void 0 : _s_service1.name) || ''),
                editScopes: ownsGroup(scopeRows(s)),
                editDeliverables: ownsGroup(rawDeliverables(s)),
                scopes: ((_s_scopes = s.scopes) !== null && _s_scopes !== void 0 ? _s_scopes : []).map(toScope),
                deliverables: orderDeliverables(rawDeliverables(s).map(toDeliverable))
            };
        })
    };
}
function hasEditableContent(state) {
    return !!state.schedule || !!state.deadlineOffer || state.components.length > 0 || state.services.some((s)=>s.editScopes || s.editDeliverables);
}
function latestEditDeliverableDay(state) {
    return state.services.reduce((max, s)=>s.deliverables.reduce((m, d)=>Math.max(m, d.period_days), max), 0);
}
function minEditStartDate(original) {
    const today = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["todayIsoDate"])();
    return original.plannedStartDate > today ? original.plannedStartDate : today;
}
function minEditDeadline(original) {
    const today = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["todayIsoDate"])();
    return original > today ? original : today;
}
function buildEditContext(project) {
    var _project_offer, _project_order;
    var _project_offer_installments, _project_order_installments, _project_invited;
    const installments = [
        ...(_project_offer_installments = project === null || project === void 0 ? void 0 : (_project_offer = project.offer) === null || _project_offer === void 0 ? void 0 : _project_offer.installments) !== null && _project_offer_installments !== void 0 ? _project_offer_installments : [],
        ...(_project_order_installments = project === null || project === void 0 ? void 0 : (_project_order = project.order) === null || _project_order === void 0 ? void 0 : _project_order.installments) !== null && _project_order_installments !== void 0 ? _project_order_installments : [],
        ...((_project_invited = project === null || project === void 0 ? void 0 : project.invited) !== null && _project_invited !== void 0 ? _project_invited : []).reduce((all, m)=>{
            var _m_offer;
            var _m_offer_installments;
            return all.concat((_m_offer_installments = m === null || m === void 0 ? void 0 : (_m_offer = m.offer) === null || _m_offer === void 0 ? void 0 : _m_offer.installments) !== null && _m_offer_installments !== void 0 ? _m_offer_installments : []);
        }, [])
    ];
    const linked = installments.map((row)=>{
        var _row_deliverable;
        var _row_project_service_deliverable_id;
        return Number((_row_project_service_deliverable_id = row === null || row === void 0 ? void 0 : row.project_service_deliverable_id) !== null && _row_project_service_deliverable_id !== void 0 ? _row_project_service_deliverable_id : (row === null || row === void 0 ? void 0 : row.project_proposal_offer_deliverable_id) ? null : row === null || row === void 0 ? void 0 : (_row_deliverable = row.deliverable) === null || _row_deliverable === void 0 ? void 0 : _row_deliverable.id);
    }).filter((id)=>id > 0);
    const duration = project === null || project === void 0 ? void 0 : project.duration_days;
    var _project_title;
    return {
        title: String((_project_title = project === null || project === void 0 ? void 0 : project.title) !== null && _project_title !== void 0 ? _project_title : ''),
        type: (project === null || project === void 0 ? void 0 : project.type) ? String(project.type) : null,
        plannedStartDate: (project === null || project === void 0 ? void 0 : project.planned_start_date) ? String(project.planned_start_date).slice(0, 10) : null,
        durationDays: duration === null || duration === undefined || duration === '' ? null : Number(duration),
        linkedDeliverableIds: Array.from(new Set(linked))
    };
}
function projectFingerprint(project) {
    var _project_offer;
    return JSON.stringify([
        project === null || project === void 0 ? void 0 : project.project_services,
        project === null || project === void 0 ? void 0 : project.components,
        project === null || project === void 0 ? void 0 : project.contract,
        project === null || project === void 0 ? void 0 : project.order,
        project === null || project === void 0 ? void 0 : project.status,
        project === null || project === void 0 ? void 0 : project.planned_start_date,
        project === null || project === void 0 ? void 0 : project.duration_days,
        project === null || project === void 0 ? void 0 : project.last_proposal_deadline,
        project === null || project === void 0 ? void 0 : (_project_offer = project.offer) === null || _project_offer === void 0 ? void 0 : _project_offer.uuid
    ]);
}
const same = (a, b)=>JSON.stringify(a) === JSON.stringify(b);
function buildPatch(draft) {
    const patch = {};
    draft.current.services.forEach((service)=>{
        var _patch, _patch1;
        const before = draft.original.services.find((s)=>s.id === service.id);
        if (!before) return;
        var _scopes;
        if (service.editScopes && !same(service.scopes, before.scopes)) ((_scopes = (_patch = patch).scopes) !== null && _scopes !== void 0 ? _scopes : _patch.scopes = []).push({
            project_service_id: service.id,
            items: service.scopes
        });
        var _deliverables;
        if (service.editDeliverables && !same(service.deliverables, before.deliverables)) ((_deliverables = (_patch1 = patch).deliverables) !== null && _deliverables !== void 0 ? _deliverables : _patch1.deliverables = []).push({
            project_service_id: service.id,
            items: service.deliverables
        });
    });
    draft.current.components.forEach((component)=>{
        var _patch, _patch1;
        const before = draft.original.components.find((c)=>c.id === component.id);
        if (!before || same(component.value, before.value)) return;
        var _project_components, _service_components;
        const list = component.level === 'project' ? (_project_components = (_patch = patch).project_components) !== null && _project_components !== void 0 ? _project_components : _patch.project_components = [] : (_service_components = (_patch1 = patch).service_components) !== null && _service_components !== void 0 ? _service_components : _patch1.service_components = [];
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
    if (deadlineOffer && before.deadlineOffer && deadlineOffer !== before.deadlineOffer) patch.deadline_offer = "".concat(deadlineOffer, " 23:59:59");
    return patch;
}
function changedKeys(draft) {
    const keys = new Set();
    draft.current.services.forEach((service)=>{
        const before = draft.original.services.find((s)=>s.id === service.id);
        if (!before) return;
        if (!same(service.scopes, before.scopes)) keys.add("scopes:".concat(service.id));
        if (!same(service.deliverables, before.deliverables)) keys.add("deliverables:".concat(service.id));
    });
    draft.current.components.forEach((component)=>{
        const before = draft.original.components.find((c)=>c.id === component.id);
        if (before && !same(component.value, before.value)) keys.add("component:".concat(component.id));
    });
    if (!same(draft.current.schedule, draft.original.schedule)) keys.add('schedule');
    if (draft.current.deadlineOffer !== draft.original.deadlineOffer) keys.add('deadline');
    return keys;
}
// The draft lives in sessionStorage so it survives moving between the review and
// the section pages, and is dropped after saving or when the agreement changes.
const draftKey = (projectUuid)=>"projectAgreementEdit:".concat(projectUuid);
function readDraft(projectUuid) {
    try {
        const raw = window.sessionStorage.getItem(draftKey(projectUuid));
        const draft = raw ? JSON.parse(raw) : null;
        return (draft === null || draft === void 0 ? void 0 : draft.projectUuid) === projectUuid ? draft : null;
    } catch (e) {
        return null;
    }
}
function writeDraft(draft) {
    try {
        window.sessionStorage.setItem(draftKey(draft.projectUuid), JSON.stringify(draft));
    } catch (e) {
    // ignore
    }
}
function clearDraft(projectUuid) {
    try {
        window.sessionStorage.removeItem(draftKey(projectUuid));
    } catch (e) {
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
    return "/".concat(locale, "/project/edit/").concat(projectUuid);
}
function editStepHref(locale, projectUuid, step, params) {
    const query = new URLSearchParams(Object.entries(params).map((param)=>{
        let [k, v] = param;
        return [
            k,
            String(v)
        ];
    })).toString();
    return "/".concat(locale, "/project/edit/").concat(projectUuid, "/").concat(step).concat(query ? "?".concat(query) : '');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/edit/ProjectEditStep.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectEditStep
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$service$2d$components$2f$DeliverablesPlanQuestion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$service$2d$components$2f$DataSourcesExpectedQuestion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$TargetMarketQuestion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/TargetMarketQuestion.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ProjectScheduleQuestion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/ProjectScheduleQuestion.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$DeadlineOfferQuestion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/DeadlineOfferQuestion.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectSchedule.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$EditScopeSteps$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/edit/EditScopeSteps.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/edit/agreementEdit.ts [app-client] (ecmascript)");
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
function ProjectEditStep(param) {
    let { locale, projectUuid, step } = param;
    _s();
    const isRTL = locale === 'ar';
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const serviceId = Number(searchParams === null || searchParams === void 0 ? void 0 : searchParams.get('service')) || 0;
    const componentId = Number(searchParams === null || searchParams === void 0 ? void 0 : searchParams.get('component')) || 0;
    const reviewHref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["editReviewHref"])(locale, projectUuid);
    const [draft, setDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const service = draft === null || draft === void 0 ? void 0 : draft.current.services.find((s)=>s.id === serviceId);
    const component = draft === null || draft === void 0 ? void 0 : draft.current.components.find((c)=>c.id === componentId);
    const allowed = step === 'schedule' && !!(draft === null || draft === void 0 ? void 0 : draft.original.schedule) || step === 'offer-deadline' && !!(draft === null || draft === void 0 ? void 0 : draft.original.deadlineOffer) || (step === 'scopes' || step === 'subscopes') && !!(service === null || service === void 0 ? void 0 : service.editScopes) || step === 'deliverables' && !!(service === null || service === void 0 ? void 0 : service.editDeliverables) || step === 'target-market' && (component === null || component === void 0 ? void 0 : component.slug) === 'target-market' || step === 'data-sources' && (component === null || component === void 0 ? void 0 : component.slug) === 'data-sources-expected';
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProjectEditStep.useEffect": ()=>{
            const stored = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readDraft"])(projectUuid);
            if (!stored) router.replace(reviewHref);
            else setDraft(stored);
        }
    }["ProjectEditStep.useEffect"], [
        projectUuid,
        reviewHref,
        router
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProjectEditStep.useEffect": ()=>{
            if (draft && !allowed) router.replace(reviewHref);
        }
    }["ProjectEditStep.useEffect"], [
        allowed,
        draft,
        reviewHref,
        router
    ]);
    if (!draft || !allowed) return null;
    const save = function(change) {
        let next = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : reviewHref;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDraft"])(projectUuid, change);
        router.push(next);
    };
    const base = {
        projectType: draft.context.type,
        serviceLabel: (service === null || service === void 0 ? void 0 : service.title) || null,
        backHref: reviewHref,
        continueLabel: isRTL ? 'العودة إلى الملخص' : 'Return to summary'
    };
    if (step === 'schedule' && draft.current.schedule && draft.original.schedule) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ProjectScheduleQuestion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            locale: locale,
            edit: {
                ...base,
                serviceLabel: null,
                value: draft.current.schedule,
                original: draft.original.schedule,
                minStartDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["minEditStartDate"])(draft.original.schedule),
                latestDeliverableDay: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["latestEditDeliverableDay"])(draft.current),
                onSave: (schedule)=>save((state)=>({
                            ...state,
                            schedule
                        }))
            }
        }, void 0, false, {
            fileName: "[project]/components/project/edit/ProjectEditStep.tsx",
            lineNumber: 74,
            columnNumber: 7
        }, this);
    }
    if (step === 'offer-deadline' && draft.current.deadlineOffer && draft.original.deadlineOffer) {
        const schedule = draft.current.schedule;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$DeadlineOfferQuestion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            locale: locale,
            edit: {
                ...base,
                serviceLabel: null,
                value: draft.current.deadlineOffer,
                original: draft.original.deadlineOffer,
                minDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["minEditDeadline"])(draft.original.deadlineOffer),
                projectEnd: schedule ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDaysToIsoDate"])(schedule.plannedStartDate, schedule.durationDays) : '',
                onSave: (deadlineOffer)=>save((state)=>({
                            ...state,
                            deadlineOffer
                        }))
            }
        }, void 0, false, {
            fileName: "[project]/components/project/edit/ProjectEditStep.tsx",
            lineNumber: 92,
            columnNumber: 7
        }, this);
    }
    if (step === 'scopes' && service) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$EditScopeSteps$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditScopesStep"], {
            ...base,
            continueLabel: isRTL ? 'متابعة' : 'Continue',
            locale: locale,
            serviceId: service.serviceId,
            scopes: service.scopes,
            onSave: (scopes)=>save((state)=>({
                        ...state,
                        services: state.services.map((s)=>s.id === service.id ? {
                                ...s,
                                scopes
                            } : s)
                    }), (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["editStepHref"])(locale, projectUuid, 'subscopes', {
                    service: service.id
                }))
        }, void 0, false, {
            fileName: "[project]/components/project/edit/ProjectEditStep.tsx",
            lineNumber: 109,
            columnNumber: 7
        }, this);
    }
    if (step === 'subscopes' && service) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$EditScopeSteps$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditSubscopesStep"], {
            ...base,
            backHref: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["editStepHref"])(locale, projectUuid, 'scopes', {
                service: service.id
            }),
            locale: locale,
            serviceId: service.serviceId,
            scopes: service.scopes,
            onSave: (scopes)=>save((state)=>({
                        ...state,
                        services: state.services.map((s)=>s.id === service.id ? {
                                ...s,
                                scopes
                            } : s)
                    }))
        }, void 0, false, {
            fileName: "[project]/components/project/edit/ProjectEditStep.tsx",
            lineNumber: 125,
            columnNumber: 7
        }, this);
    }
    if (step === 'deliverables' && service) {
        var _draft_current_schedule;
        // The edited schedule bounds the deliverables, so an extended duration allows later days.
        const schedule = (_draft_current_schedule = draft.current.schedule) !== null && _draft_current_schedule !== void 0 ? _draft_current_schedule : draft.context.plannedStartDate && draft.context.durationDays !== null ? {
            plannedStartDate: draft.context.plannedStartDate,
            durationDays: draft.context.durationDays
        } : null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$service$2d$components$2f$DeliverablesPlanQuestion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            locale: locale,
            edit: {
                ...base,
                deliverables: service.deliverables,
                schedule,
                lockedIds: draft.context.linkedDeliverableIds,
                onSave: (items)=>save((state)=>({
                            ...state,
                            services: state.services.map((s)=>s.id === service.id ? {
                                    ...s,
                                    deliverables: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$edit$2f$agreementEdit$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderDeliverables"])(items)
                                } : s)
                        }))
            }
        }, void 0, false, {
            fileName: "[project]/components/project/edit/ProjectEditStep.tsx",
            lineNumber: 142,
            columnNumber: 7
        }, this);
    }
    if (step === 'target-market' && component) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$TargetMarketQuestion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            locale: locale,
            edit: {
                ...base,
                value: component.value,
                onSave: (value, labels)=>save((state)=>({
                            ...state,
                            // Sorted ids so re-picking the same markets is not a change.
                            components: state.components.map((c)=>c.id === component.id ? {
                                    ...c,
                                    value: {
                                        ...value,
                                        ids: [
                                            ...value.ids
                                        ].sort((x, y)=>x - y)
                                    },
                                    labels
                                } : c)
                        }))
            }
        }, void 0, false, {
            fileName: "[project]/components/project/edit/ProjectEditStep.tsx",
            lineNumber: 160,
            columnNumber: 7
        }, this);
    }
    if (step === 'data-sources' && component) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$service$2d$components$2f$DataSourcesExpectedQuestion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            locale: locale,
            edit: {
                ...base,
                value: String(component.value || ''),
                onSave: (value)=>save((state)=>({
                            ...state,
                            components: state.components.map((c)=>c.id === component.id ? {
                                    ...c,
                                    value
                                } : c)
                        }))
            }
        }, void 0, false, {
            fileName: "[project]/components/project/edit/ProjectEditStep.tsx",
            lineNumber: 177,
            columnNumber: 7
        }, this);
    }
    return null;
}
_s(ProjectEditStep, "C6W3iN0owdDt4CMgEaP6lbowthI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = ProjectEditStep;
var _c;
__turbopack_context__.k.register(_c, "ProjectEditStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_project_5bd83ab9._.js.map