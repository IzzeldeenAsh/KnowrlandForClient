(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/hooks/useAuth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function useAuth() {
    _s();
    const [isLoggedIn, setIsLoggedIn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAuth.useEffect": ()=>{
            const checkAuthStatus = {
                "useAuth.useEffect.checkAuthStatus": ()=>{
                    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
                    setIsLoggedIn(!!token);
                    setIsLoading(false);
                }
            }["useAuth.useEffect.checkAuthStatus"];
            checkAuthStatus();
        }
    }["useAuth.useEffect"], []);
    const refreshAuthStatus = ()=>{
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
        setIsLoggedIn(!!token);
    };
    return {
        isLoggedIn,
        isLoading,
        token: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])(),
        refreshAuthStatus
    };
}
_s(useAuth, "SiOCXgNumxE/IMcj0wlupJIS2jg=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/animatedWizardBackground.module.css [app-client] (css module)", ((__turbopack_context__) => {

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
"[project]/components/project/AnimatedWizardBackground.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AnimatedWizardBackground
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$animatedWizardBackground$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/project/animatedWizardBackground.module.css [app-client] (css module)");
;
;
function AnimatedWizardBackground() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "aria-hidden": true,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$animatedWizardBackground$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].root,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$animatedWizardBackground$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].base
            }, void 0, false, {
                fileName: "[project]/components/project/AnimatedWizardBackground.tsx",
                lineNumber: 6,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$animatedWizardBackground$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].wash
            }, void 0, false, {
                fileName: "[project]/components/project/AnimatedWizardBackground.tsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$animatedWizardBackground$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].washTwo
            }, void 0, false, {
                fileName: "[project]/components/project/AnimatedWizardBackground.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$animatedWizardBackground$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].blob, " ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$animatedWizardBackground$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].blobOne)
            }, void 0, false, {
                fileName: "[project]/components/project/AnimatedWizardBackground.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$animatedWizardBackground$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].blob, " ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$animatedWizardBackground$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].blobTwo)
            }, void 0, false, {
                fileName: "[project]/components/project/AnimatedWizardBackground.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$animatedWizardBackground$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].blob, " ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$animatedWizardBackground$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].blobThree)
            }, void 0, false, {
                fileName: "[project]/components/project/AnimatedWizardBackground.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$animatedWizardBackground$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].blob, " ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$animatedWizardBackground$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].blobFour)
            }, void 0, false, {
                fileName: "[project]/components/project/AnimatedWizardBackground.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$animatedWizardBackground$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].centerFade
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
_c = AnimatedWizardBackground;
var _c;
__turbopack_context__.k.register(_c, "AnimatedWizardBackground");
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
"[project]/components/project/ProjectWizardShell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectWizardShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$AnimatedWizardBackground$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/AnimatedWizardBackground.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectViewportLock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/ProjectViewportLock.tsx [app-client] (ecmascript)");
;
;
;
function ProjectWizardShell(param) {
    let { children, align = 'center', bleed = false } = param;
    const containerClassName = align === 'top' ? 'w-full h-full box-border overflow-y-auto overscroll-contain pb-[calc(env(safe-area-inset-bottom)+7rem)]' : 'w-full h-full box-border overflow-y-auto overscroll-contain flex justify-center';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "fixed inset-0 overflow-hidden bg-white z-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectViewportLock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/components/project/ProjectWizardShell.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$AnimatedWizardBackground$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/components/project/ProjectWizardShell.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-0 right-0 bottom-0 z-10 flex box-border ".concat(bleed ? 'px-0' : 'px-4', " sm:px-6 lg:px-8 overflow-hidden ").concat(align === 'top' ? 'items-start justify-start pt-8' : 'items-center justify-center py-10'),
                style: {
                    top: 'var(--app-header-height, 0px)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: containerClassName,
                    children: children
                }, void 0, false, {
                    fileName: "[project]/components/project/ProjectWizardShell.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/ProjectWizardShell.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/ProjectWizardShell.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_c = ProjectWizardShell;
var _c;
__turbopack_context__.k.register(_c, "ProjectWizardShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/ProjectIntro.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectIntro
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useAuth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectWizardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/ProjectWizardShell.tsx [app-client] (ecmascript)");
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
function ProjectIntro(param) {
    let { locale } = param;
    _s();
    const isRTL = locale === 'ar';
    const { isLoggedIn, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProjectIntro.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearProjectWizardStorage"])(locale);
        }
    }["ProjectIntro.useEffect"], [
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
    const returnUrl = encodeURIComponent("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publicBaseUrl"], "/").concat(locale, "/project"));
    const loginUrl = "/".concat(locale, "/signin?returnUrl=").concat(returnUrl);
    const shouldShowLoginCta = !isLoading && !isLoggedIn;
    const ctaHref = shouldShowLoginCta ? loginUrl : "/".concat(locale, "/project/wizard/project-type?fresh=1");
    const ctaLabel = shouldShowLoginCta ? 'Login to Start' : copy.cta;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectWizardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        align: "center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-20 max-w-2xl pt-12 pb-[100px] text-center sm:pt-16 sm:pb-[300px] lg:pt-32 lg:pb-[360px]",
                dir: isRTL ? 'rtl' : 'ltr',
                lang: isRTL ? 'ar' : 'en',
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 text-lg sm:text-xl font-semibold mb-2 bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 bg-clip-text text-transparent",
                        children: copy.eyebrow
                    }, void 0, false, {
                        fileName: "[project]/components/project/ProjectIntro.tsx",
                        lineNumber: 99,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg sm:text-xl text-slate-700 leading-relaxed",
                        children: [
                            copy.line1,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-10 flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
_s(ProjectIntro, "WH71NVG8BbiHBV7ktaJin4iG2yQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = ProjectIntro;
var _c;
__turbopack_context__.k.register(_c, "ProjectIntro");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_26da3800._.js.map