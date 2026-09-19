(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/auth/pages/Agreement.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Agreement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth-client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
// Render only a small allowlist of document markup; no scripts, event handlers,
// external resources, embedded frames, or styles from API-provided HTML.
function documentMarkup(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const allowed = new Set([
        'P',
        'BR',
        'STRONG',
        'B',
        'EM',
        'I',
        'U',
        'UL',
        'OL',
        'LI',
        'H1',
        'H2',
        'H3',
        'H4',
        'H5',
        'H6',
        'BLOCKQUOTE',
        'TABLE',
        'THEAD',
        'TBODY',
        'TR',
        'TD',
        'TH',
        'HR',
        'DIV',
        'SPAN'
    ]);
    function clean(parent) {
        for (const el of Array.from(parent.children)){
            if ([
                'SCRIPT',
                'STYLE',
                'IFRAME',
                'OBJECT',
                'SVG',
                'MATH',
                'FORM',
                'INPUT',
                'BUTTON',
                'LINK',
                'META',
                'IMG'
            ].includes(el.tagName)) {
                el.remove();
                continue;
            }
            clean(el);
            if (!allowed.has(el.tagName)) el.replaceWith(...Array.from(el.childNodes));
            else for (const attr of Array.from(el.attributes))el.removeAttribute(attr.name);
        }
    }
    clean(doc.body);
    return doc.body.innerHTML;
}
function Agreement(param) {
    let { locale, type = 'client_agreement', professional = false, onAccept, onCancel } = param;
    _s();
    const dialog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const content = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [read, setRead] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [attempt, setAttempt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const ar = locale === 'ar';
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Agreement.useEffect": ()=>{
            var _dialog_current;
            (_dialog_current = dialog.current) === null || _dialog_current === void 0 ? void 0 : _dialog_current.showModal();
            return ({
                "Agreement.useEffect": ()=>{
                    var _dialog_current;
                    return (_dialog_current = dialog.current) === null || _dialog_current === void 0 ? void 0 : _dialog_current.close();
                }
            })["Agreement.useEffect"];
        }
    }["Agreement.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Agreement.useEffect": ()=>{
            const controller = new AbortController();
            setError('');
            setData(null);
            setRead(false);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authRequest"])("common/setting/guideline/type/".concat(professional ? 'last' : 'current', "/").concat(type), locale, undefined, {
                signal: controller.signal,
                authenticated: false
            }).then({
                "Agreement.useEffect": (res)=>setData({
                        ...res.data,
                        guideline: documentMarkup(res.data.guideline || '')
                    })
            }["Agreement.useEffect"]).catch({
                "Agreement.useEffect": (e)=>{
                    if (!controller.signal.aborted) setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authErrorMessage"])(e, locale));
                }
            }["Agreement.useEffect"]);
            return ({
                "Agreement.useEffect": ()=>controller.abort()
            })["Agreement.useEffect"];
        }
    }["Agreement.useEffect"], [
        type,
        professional,
        locale,
        attempt
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Agreement.useEffect": ()=>{
            const el = content.current;
            if (data && el) setRead(el.scrollHeight <= el.clientHeight + 24);
        }
    }["Agreement.useEffect"], [
        data
    ]);
    async function accept() {
        if (!data || !read || busy) return;
        setBusy(true);
        setError('');
        try {
            if (professional) {
                if (!data.uuid) throw new Error('Missing agreement');
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authRequest"])("account/agreement/accept/".concat(encodeURIComponent(data.uuid)), locale, undefined, {
                    method: 'PUT'
                });
            }
            onAccept();
        } catch (e) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authErrorMessage"])(e, locale));
            setBusy(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dialog", {
        className: "auth-dialog auth-screen-dialog",
        ref: dialog,
        "aria-labelledby": "agreement-title",
        dir: ar ? 'rtl' : 'ltr',
        onCancel: (e)=>{
            e.preventDefault();
            if (!busy) onCancel();
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                id: "agreement-title",
                children: (data === null || data === void 0 ? void 0 : data.name) || (ar ? 'اتفاقية الاستخدام' : 'Terms of service')
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/Agreement.tsx",
                lineNumber: 48,
                columnNumber: 5
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "auth-error",
                role: "alert",
                children: [
                    error,
                    " ",
                    !data && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "auth-link",
                        onClick: ()=>setAttempt((x)=>x + 1),
                        children: ar ? 'إعادة المحاولة' : 'Retry'
                    }, void 0, false, {
                        fileName: "[project]/components/auth/pages/Agreement.tsx",
                        lineNumber: 49,
                        columnNumber: 72
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/auth/pages/Agreement.tsx",
                lineNumber: 49,
                columnNumber: 15
            }, this),
            !data && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                role: "status",
                children: ar ? 'جارٍ التحميل…' : 'Loading…'
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/Agreement.tsx",
                lineNumber: 50,
                columnNumber: 25
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: content,
                className: "auth-agreement-content",
                tabIndex: 0,
                onScroll: (e)=>{
                    const el = e.currentTarget;
                    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 24) setRead(true);
                },
                dangerouslySetInnerHTML: {
                    __html: (data === null || data === void 0 ? void 0 : data.guideline) || ''
                }
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/Agreement.tsx",
                lineNumber: 51,
                columnNumber: 5
            }, this),
            data && !read && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "auth-hint",
                children: ar ? 'يرجى قراءة الاتفاقية حتى النهاية للمتابعة.' : 'Please read to the end to continue.'
            }, void 0, false, {
                fileName: "[project]/components/auth/pages/Agreement.tsx",
                lineNumber: 52,
                columnNumber: 23
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "auth-dialog-actions",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "auth-link",
                        disabled: busy,
                        onClick: onCancel,
                        children: professional ? ar ? 'التجاوز حالياً' : 'Skip for now' : ar ? 'إلغاء' : 'Cancel'
                    }, void 0, false, {
                        fileName: "[project]/components/auth/pages/Agreement.tsx",
                        lineNumber: 53,
                        columnNumber: 42
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "auth-primary",
                        disabled: !data || !read || busy,
                        onClick: ()=>void accept(),
                        children: ar ? 'أوافق' : 'I agree'
                    }, void 0, false, {
                        fileName: "[project]/components/auth/pages/Agreement.tsx",
                        lineNumber: 54,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/auth/pages/Agreement.tsx",
                lineNumber: 53,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/auth/pages/Agreement.tsx",
        lineNumber: 47,
        columnNumber: 10
    }, this);
}
_s(Agreement, "y7EWAxiBmg7f18NrOY3qj8CC2CU=");
_c = Agreement;
var _c;
__turbopack_context__.k.register(_c, "Agreement");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/auth/pages/Agreement.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/components/auth/pages/Agreement.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=components_auth_pages_Agreement_tsx_b9b884e6._.js.map