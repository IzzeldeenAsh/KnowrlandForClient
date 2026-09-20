(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/feed/FeedMobileSearch.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FeedMobileSearch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconSearch.mjs [app-client] (ecmascript) <export default as IconSearch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconX.mjs [app-client] (ecmascript) <export default as IconX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function FeedMobileSearch(param) {
    let { locale } = param;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    var _searchParams_get;
    const activeKeyword = (_searchParams_get = searchParams.get('keyword')) !== null && _searchParams_get !== void 0 ? _searchParams_get : '';
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(activeKeyword);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FeedMobileSearch.useEffect": ()=>{
            setQuery(activeKeyword);
        }
    }["FeedMobileSearch.useEffect"], [
        activeKeyword
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FeedMobileSearch.useEffect": ()=>{
            if (pathname !== "/".concat(locale)) return;
            const keyword = query.trim();
            if (keyword === activeKeyword.trim()) return;
            const timeoutId = window.setTimeout({
                "FeedMobileSearch.useEffect.timeoutId": ()=>{
                    router.replace(keyword ? "/".concat(locale, "?keyword=").concat(encodeURIComponent(keyword)) : "/".concat(locale), {
                        scroll: false
                    });
                }
            }["FeedMobileSearch.useEffect.timeoutId"], 1000);
            return ({
                "FeedMobileSearch.useEffect": ()=>window.clearTimeout(timeoutId)
            })["FeedMobileSearch.useEffect"];
        }
    }["FeedMobileSearch.useEffect"], [
        activeKeyword,
        locale,
        pathname,
        query,
        router
    ]);
    const submit = (event)=>{
        event.preventDefault();
        const keyword = query.trim();
        router.push(keyword ? "/".concat(locale, "?keyword=").concat(encodeURIComponent(keyword)) : "/".concat(locale));
    };
    const clearSearch = ()=>{
        setQuery('');
        if (activeKeyword.trim()) router.push("/".concat(locale));
    };
    const hasQuery = query.trim().length > 0;
    if (pathname !== "/".concat(locale)) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: submit,
        className: "xl:hidden",
        role: "search",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "sr-only",
                htmlFor: "feed-mobile-search-".concat(locale),
                children: locale === 'ar' ? 'البحث في الموجز' : 'Search the feed'
            }, void 0, false, {
                fileName: "[project]/components/feed/FeedMobileSearch.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "feed-mobile-search-".concat(locale),
                        type: "search",
                        value: query,
                        onChange: (event)=>setQuery(event.target.value),
                        placeholder: locale === 'ar' ? 'ابحث في الموجز...' : 'Search ..',
                        dir: locale === 'ar' ? 'rtl' : 'ltr',
                        className: "h-11 w-full rounded-lg border border-[#D7E1EE] bg-white px-4 text-[14px] text-[#1E293B] shadow-sm outline-none transition-colors placeholder:text-[#94A3B8] focus:border-[#2378E8] focus:ring-2 focus:ring-[#2378E8]/15 ".concat(locale === 'ar' ? 'pl-20' : 'pr-20')
                    }, void 0, false, {
                        fileName: "[project]/components/feed/FeedMobileSearch.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    hasQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: clearSearch,
                        "aria-label": locale === 'ar' ? 'مسح البحث' : 'Clear search',
                        className: "absolute top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-[#94A3B8] transition-colors hover:bg-[#F1F5F9] hover:text-[#475569] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] ".concat(locale === 'ar' ? 'left-10' : 'right-10'),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__["IconX"], {
                            "aria-hidden": true,
                            className: "h-[17px] w-[17px]",
                            stroke: 2
                        }, void 0, false, {
                            fileName: "[project]/components/feed/FeedMobileSearch.tsx",
                            lineNumber: 68,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/feed/FeedMobileSearch.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        "aria-label": locale === 'ar' ? 'بحث' : 'Search',
                        className: "absolute top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-[#64748B] transition-colors hover:bg-[#EEF5FF] hover:text-[#2378E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] ".concat(locale === 'ar' ? 'left-1.5' : 'right-1.5'),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__["IconSearch"], {
                            "aria-hidden": true,
                            className: "h-[18px] w-[18px]",
                            stroke: 2
                        }, void 0, false, {
                            fileName: "[project]/components/feed/FeedMobileSearch.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/feed/FeedMobileSearch.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/FeedMobileSearch.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/FeedMobileSearch.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
_s(FeedMobileSearch, "CiRvazi93Vbhch+/bPIPAdkh+6Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = FeedMobileSearch;
var _c;
__turbopack_context__.k.register(_c, "FeedMobileSearch");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/icons/CourseIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CourseIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function CourseIcon(param) {
    let { width = 50, height = 50 } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: width,
        height: height,
        viewBox: "0 0 39 36",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M31.9898 26.8163C31.9898 24.1788 29.8518 22.0408 27.2143 22.0408C24.5767 22.0408 22.4388 24.1788 22.4388 26.8163C22.4388 28.1696 23.0037 29.3885 23.9081 30.2576V36L27.2143 33.7959L30.5204 36V30.2576C31.4248 29.3885 31.9898 28.1696 31.9898 26.8163Z",
                fill: "#0abb87"
            }, void 0, false, {
                fileName: "[project]/components/icons/CourseIcon.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M37.1327 0H1.86734C1.05624 0 0.397949 0.657551 0.397949 1.46939V30.8572C0.397949 31.6683 1.05624 32.3265 1.86734 32.3265H20.9694V31.3443C20.0143 30.0372 19.5 28.4694 19.5 26.8163C19.5 22.5625 22.9604 19.102 27.2143 19.102C31.4682 19.102 34.9286 22.5625 34.9286 26.8163C34.9286 28.4701 34.4143 30.038 33.4592 31.345V32.3265H37.1327C37.9438 32.3265 38.6021 31.6683 38.6021 30.8572V1.46939C38.6021 0.657551 37.9438 0 37.1327 0ZM20.9694 13.2245H8.47959V10.2857H20.9694V13.2245ZM30.5204 7.34694H8.47959V4.40816H30.5204V7.34694Z",
                fill: "#0abb87"
            }, void 0, false, {
                fileName: "[project]/components/icons/CourseIcon.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/icons/CourseIcon.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = CourseIcon;
var _c;
__turbopack_context__.k.register(_c, "CourseIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/icons/DataIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DataIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
function DataIcon(param) {
    let { width = 27, height = 29 } = param;
    _s();
    const filterId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])().replace(/:/g, '');
    const gradientId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])().replace(/:/g, '');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: width,
        height: height,
        viewBox: "0 0 32 34",
        fill: "none",
        overflow: "visible",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M4.06815 1.98373C6.86364 0.704566 10.5851 0 14.5464 0C18.5077 0 22.2293 0.704566 25.0243 1.98373C27.6099 3.16777 29.0933 4.73367 29.0933 6.28348C29.0933 7.8333 27.6099 9.39967 25.0243 10.5831C22.2297 11.8623 18.5078 12.5669 14.5464 12.5669C10.585 12.5669 6.86364 11.8623 4.06815 10.5831C1.48292 9.39967 0 7.8332 0 6.28348C0 4.73376 1.48292 3.16777 4.06815 1.98373ZM3.49489 11.8359C1.99713 11.1499 0.821516 10.3442 0 9.45442V13.4496C0 15.004 1.47967 16.5723 4.05982 17.7531C6.84871 19.029 10.5734 19.7326 14.5464 19.7326C18.5194 19.7326 22.2436 19.029 25.0331 17.7531C27.6131 16.5723 29.0933 15.004 29.0933 13.4496V9.45442C28.2718 10.3445 27.0961 11.1499 25.5984 11.8359C22.627 13.1949 18.7023 13.9444 14.5469 13.9444C10.3914 13.9444 6.46628 13.1954 3.49489 11.8359ZM14.5464 21.1102C21.1116 21.1102 26.6302 19.2908 29.0933 16.6207V20.1383C29.0933 21.6918 27.6136 23.261 25.0336 24.4417C22.2436 25.7181 18.5194 26.4217 14.5464 26.4217C10.5734 26.4217 6.84871 25.7181 4.05982 24.4417C1.47967 23.261 0 21.6918 0 20.1383V16.6207C2.46273 19.2908 7.98116 21.1102 14.5464 21.1102ZM0 27.3041C0 28.858 1.47967 30.4272 4.05982 31.608C6.84871 32.8844 10.5734 33.5875 14.5464 33.5875C18.5194 33.5875 22.2436 32.8844 25.0331 31.608C27.6131 30.4272 29.0933 28.858 29.0933 27.3041V23.3093C26.6302 25.9799 21.1116 27.7994 14.5464 27.7994C7.98116 27.7994 2.46273 25.9799 0 23.3093V27.3041ZM13.8573 1.69825C13.8572 1.78877 13.875 1.87843 13.9096 1.96208C13.9441 2.04573 13.9949 2.12174 14.0589 2.18575C14.1229 2.24975 14.1989 2.3005 14.2826 2.33509C14.3662 2.36968 14.4559 2.38743 14.5464 2.38731C16.6531 2.38731 20.6874 2.617 24.0394 4.15055C24.2047 4.2217 24.3913 4.22534 24.5593 4.16067C24.7273 4.096 24.8633 3.96817 24.9383 3.80451C25.0132 3.64085 25.0211 3.45436 24.9604 3.28493C24.8996 3.11551 24.7749 2.97659 24.613 2.89789C21.0224 1.25486 16.7654 1.00976 14.5464 1.00976C14.4559 1.00961 14.3662 1.02733 14.2825 1.06191C14.1989 1.09648 14.1228 1.14723 14.0588 1.21125C13.9948 1.27526 13.9441 1.35129 13.9095 1.43495C13.8749 1.51862 13.8572 1.60772 13.8573 1.69825Z",
                fill: "url(#".concat(gradientId, ")")
            }, void 0, false, {
                fileName: "[project]/components/icons/DataIcon.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                filter: "url(#".concat(filterId, ")"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M16.8721 33.7442C14.1813 33.7442 12 31.5629 12 28.8721C12 26.1813 14.1813 24 16.8721 24L26.1734 24C28.8642 24 31.0455 26.1813 31.0455 28.8721C31.0455 31.5629 28.8642 33.7442 26.1734 33.7442L16.8721 33.7442Z",
                    fill: "#BCE4F1",
                    fillOpacity: "0.5"
                }, void 0, false, {
                    fileName: "[project]/components/icons/DataIcon.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/icons/DataIcon.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "16.9863",
                cy: "28.8721",
                r: "1.77167",
                transform: "rotate(-90 16.9863 28.8721)",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/DataIcon.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "21.8583",
                cy: "28.8721",
                r: "1.77167",
                transform: "rotate(-90 21.8583 28.8721)",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/DataIcon.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "26.7305",
                cy: "28.8721",
                r: "1.77167",
                transform: "rotate(-90 26.7305 28.8721)",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/DataIcon.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                        id: filterId,
                        x: "10.1861",
                        y: "22.1861",
                        width: "22.6732",
                        height: "13.3719",
                        filterUnits: "userSpaceOnUse",
                        colorInterpolationFilters: "sRGB",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feFlood", {
                                floodOpacity: "0",
                                result: "BackgroundImageFix"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                in: "BackgroundImageFix",
                                stdDeviation: "0.906928"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
                                in2: "SourceAlpha",
                                operator: "in",
                                result: "effect1_backgroundBlur_121_8"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feBlend", {
                                mode: "normal",
                                in: "SourceGraphic",
                                in2: "effect1_backgroundBlur_121_8",
                                result: "shape"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feColorMatrix", {
                                in: "SourceAlpha",
                                type: "matrix",
                                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                                result: "hardAlpha"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feOffset", {
                                dx: "0.0906928",
                                dy: "0.0453464"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                stdDeviation: "0.226732"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
                                in2: "hardAlpha",
                                operator: "arithmetic",
                                k2: "-1",
                                k3: "1"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feColorMatrix", {
                                type: "matrix",
                                values: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feBlend", {
                                mode: "normal",
                                in2: "shape",
                                result: "effect2_innerShadow_121_8"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/icons/DataIcon.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                        id: gradientId,
                        x1: "1.97243",
                        y1: "10.247",
                        x2: "27.9188",
                        y2: "8.1066",
                        gradientUnits: "userSpaceOnUse",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                stopColor: "#0B5CD6"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "1",
                                stopColor: "#0085FF"
                            }, void 0, false, {
                                fileName: "[project]/components/icons/DataIcon.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/icons/DataIcon.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/icons/DataIcon.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/icons/DataIcon.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_s(DataIcon, "kUXtcVnozRctYd6RLkZnOrTY/c4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"]
    ];
});
_c = DataIcon;
var _c;
__turbopack_context__.k.register(_c, "DataIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/icons/InsightIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InsightIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function InsightIcon(param) {
    let { width = 50, height = 50 } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: width,
        height: height,
        viewBox: "0 0 50 50",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M33.7292 4.16669H16.2708C8.68749 4.16669 4.16666 8.68752 4.16666 16.2709V33.7084C4.16666 41.3125 8.68749 45.8334 16.2708 45.8334H33.7083C41.2917 45.8334 45.8125 41.3125 45.8125 33.7292V16.2709C45.8333 8.68752 41.3125 4.16669 33.7292 4.16669Z",
                fill: "#8a1538"
            }, void 0, false, {
                fileName: "[project]/components/icons/InsightIcon.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M26.2283 18.4529V33.6341C26.2283 34.7935 25.2862 35.7355 24.1268 35.7355C22.9493 35.7355 22.0073 34.7935 22.0073 33.6341V18.4529C22.0073 17.2935 22.9493 16.3514 24.1268 16.3514C25.2862 16.3514 26.2283 17.2935 26.2283 18.4529Z",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/InsightIcon.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M34 15.451V33.1577C34 34.51 33.0297 35.6087 31.8354 35.6087C30.6225 35.6087 29.6522 34.51 29.6522 33.1577V15.451C29.6522 14.0987 30.6225 13 31.8354 13C33.0297 13 34 14.0987 34 15.451Z",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/InsightIcon.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M18.221 27.7283V33.6341C18.221 34.7935 17.279 35.7355 16.1014 35.7355C14.942 35.7355 14 34.7935 14 33.6341V27.7283C14 26.5689 14.942 25.6268 16.1014 25.6268C17.279 25.6268 18.221 26.5689 18.221 27.7283Z",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/InsightIcon.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/icons/InsightIcon.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = InsightIcon;
var _c;
__turbopack_context__.k.register(_c, "InsightIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/icons/ManualIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ManualIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function ManualIcon(param) {
    let { width = 50, height = 50 } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: width,
        height: height,
        viewBox: "0 0 50 50",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M42.7083 14.5834V31.25H13.2292C9.95832 31.25 7.29166 33.9167 7.29166 37.1875V14.5834C7.29166 6.25002 9.37499 4.16669 17.7083 4.16669H32.2917C40.625 4.16669 42.7083 6.25002 42.7083 14.5834Z",
                fill: "#ff9f43"
            }, void 0, false, {
                fileName: "[project]/components/icons/ManualIcon.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M42.7083 31.25V38.5417C42.7083 42.5625 39.4375 45.8333 35.4167 45.8333H14.5833C10.5625 45.8333 7.29166 42.5625 7.29166 38.5417V37.1875C7.29166 33.9167 9.95832 31.25 13.2292 31.25H42.7083Z",
                fill: "#d36a04"
            }, void 0, false, {
                fileName: "[project]/components/icons/ManualIcon.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M33.3333 16.1458H16.6667C15.8125 16.1458 15.1042 15.4375 15.1042 14.5833C15.1042 13.7291 15.8125 13.0208 16.6667 13.0208H33.3333C34.1875 13.0208 34.8958 13.7291 34.8958 14.5833C34.8958 15.4375 34.1875 16.1458 33.3333 16.1458Z",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/ManualIcon.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M27.0833 23.4375H16.6667C15.8125 23.4375 15.1042 22.7292 15.1042 21.875C15.1042 21.0208 15.8125 20.3125 16.6667 20.3125H27.0833C27.9375 20.3125 28.6458 21.0208 28.6458 21.875C28.6458 22.7292 27.9375 23.4375 27.0833 23.4375Z",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/ManualIcon.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/icons/ManualIcon.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = ManualIcon;
var _c;
__turbopack_context__.k.register(_c, "ManualIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/icons/ReportIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ReportIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
function ReportIcon(param) {
    let { width = 50, height = 50 } = param;
    _s();
    const gradientId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])().replace(/:/g, '');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: width,
        height: height,
        viewBox: "0 0 50 50",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                opacity: "0.4",
                d: "M45.125 21.75L43.0833 30.4583C41.3333 37.9792 37.875 41.0208 31.375 40.3958C30.3333 40.3125 29.2083 40.125 28 39.8333L24.5 39C15.8125 36.9375 13.125 32.6458 15.1667 23.9375L17.2083 15.2083C17.625 13.4375 18.125 11.8958 18.75 10.625C21.1875 5.58333 25.3333 4.22916 32.2917 5.875L35.7708 6.6875C44.5 8.72916 47.1667 13.0417 45.125 21.75Z",
                fill: "#699DDE"
            }, void 0, false, {
                fileName: "[project]/components/icons/ReportIcon.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M31.375 40.3958C30.0833 41.2708 28.4583 42 26.4792 42.6458L23.1875 43.7292C14.9167 46.3958 10.5625 44.1667 7.87501 35.8958L5.20834 27.6667C2.54168 19.3958 4.75001 15.0208 13.0208 12.3542L16.3125 11.2708C17.1667 11 17.9792 10.7708 18.75 10.625C18.125 11.8958 17.625 13.4375 17.2083 15.2083L15.1667 23.9375C13.125 32.6458 15.8125 36.9375 24.5 39L28 39.8333C29.2083 40.125 30.3333 40.3125 31.375 40.3958Z",
                fill: "url(#".concat(gradientId, ")")
            }, void 0, false, {
                fileName: "[project]/components/icons/ReportIcon.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M36.4375 21.8959C36.3125 21.8959 36.1875 21.875 36.0416 21.8542L25.9375 19.2917C25.1041 19.0834 24.6041 18.2292 24.8125 17.3959C25.0208 16.5625 25.875 16.0625 26.7083 16.2709L36.8125 18.8334C37.6458 19.0417 38.1458 19.8959 37.9375 20.7292C37.7708 21.4167 37.125 21.8959 36.4375 21.8959Z",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/ReportIcon.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M30.3333 28.9375C30.2083 28.9375 30.0833 28.9167 29.9375 28.8959L23.875 27.3542C23.0417 27.1459 22.5417 26.2917 22.75 25.4584C22.9583 24.625 23.8125 24.125 24.6458 24.3334L30.7083 25.875C31.5417 26.0834 32.0417 26.9375 31.8333 27.7709C31.6667 28.4792 31.0417 28.9375 30.3333 28.9375Z",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/components/icons/ReportIcon.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                    id: gradientId,
                    x1: "17.7562",
                    y1: "10.625",
                    x2: "17.7562",
                    y2: "44.7964",
                    gradientUnits: "userSpaceOnUse",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            stopColor: "#0B5CD6"
                        }, void 0, false, {
                            fileName: "[project]/components/icons/ReportIcon.tsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "1",
                            stopColor: "#3599FE"
                        }, void 0, false, {
                            fileName: "[project]/components/icons/ReportIcon.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/icons/ReportIcon.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/icons/ReportIcon.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/icons/ReportIcon.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_s(ReportIcon, "xfMyHNFebGjSN1/YPqrD8z5EdLc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"]
    ];
});
_c = ReportIcon;
var _c;
__turbopack_context__.k.register(_c, "ReportIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/icons/KnowledgeTypeIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>KnowledgeTypeIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$CourseIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/CourseIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$DataIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/DataIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$InsightIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/InsightIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$ManualIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/ManualIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$ReportIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/ReportIcon.tsx [app-client] (ecmascript)");
;
;
;
;
;
;
function normalizeKnowledgeType(type) {
    return type.trim().toLowerCase().replace(/[\s_]+/g, '-');
}
function KnowledgeTypeIcon(param) {
    let { type, size = 20, className } = param;
    const iconProps = {
        width: size,
        height: size
    };
    let icon;
    switch(normalizeKnowledgeType(type)){
        case 'report':
            icon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$ReportIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/components/icons/KnowledgeTypeIcon.tsx",
                lineNumber: 24,
                columnNumber: 14
            }, this);
            break;
        case 'manual':
            icon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$ManualIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/components/icons/KnowledgeTypeIcon.tsx",
                lineNumber: 27,
                columnNumber: 14
            }, this);
            break;
        case 'data':
            icon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$DataIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/components/icons/KnowledgeTypeIcon.tsx",
                lineNumber: 30,
                columnNumber: 14
            }, this);
            break;
        case 'course':
        case 'article':
        case 'white-paper':
            icon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$CourseIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/components/icons/KnowledgeTypeIcon.tsx",
                lineNumber: 35,
                columnNumber: 14
            }, this);
            break;
        case 'statistic':
        case 'statistics':
        case 'insight':
        default:
            icon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$InsightIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/components/icons/KnowledgeTypeIcon.tsx",
                lineNumber: 41,
                columnNumber: 14
            }, this);
            break;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        "aria-hidden": "true",
        className: "inline-flex shrink-0 items-center justify-center leading-none".concat(className ? " ".concat(className) : ''),
        style: {
            width: size,
            height: size
        },
        children: icon
    }, void 0, false, {
        fileName: "[project]/components/icons/KnowledgeTypeIcon.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_c = KnowledgeTypeIcon;
var _c;
__turbopack_context__.k.register(_c, "KnowledgeTypeIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/feed/FeedShare.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconShare3$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconShare3$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconShare3.mjs [app-client] (ecmascript) <export default as IconShare3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const FeedShare = (param)=>{
    let { shareUrl, shareTitle, authorName, authorPhotoUrl, locale, shareKind = 'post', triggerClassName, triggerIconClassName, hideTriggerLabel = false, triggerLabel, hideTrigger = false, modalOpened, onModalOpenedChange } = param;
    _s();
    const isRTL = locale === 'ar';
    const isWhitePaper = shareKind === 'white-paper';
    const [internalModalOpened, setInternalModalOpened] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const shareModalOpened = modalOpened !== null && modalOpened !== void 0 ? modalOpened : internalModalOpened;
    const setShareModalOpened = (opened)=>{
        if (modalOpened === undefined) setInternalModalOpened(opened);
        onModalOpenedChange === null || onModalOpenedChange === void 0 ? void 0 : onModalOpenedChange(opened);
    };
    const [customShareMessage, setCustomShareMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [linkCopied, setLinkCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [facebookNotice, setFacebookNotice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const shareTextareaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const t = {
        share: isRTL ? 'مشاركة' : 'Share',
        sharePost: isWhitePaper ? isRTL ? 'مشاركة الورقة البيضاء' : 'Share White Paper' : isRTL ? 'مشاركة المنشور' : 'Share Post',
        customShareMessage: isRTL ? 'أضف رسالة شخصية' : 'Add a Personal Message',
        shareMessageHint: isRTL ? 'أضف ملاحظة أو رسالة لتخصيص المشاركة...' : 'Add a note or message to personalize your share...',
        characterCount: isRTL ? 'عدد الأحرف' : 'Character Count',
        copyLink: isRTL ? 'نسخ الرابط' : 'Copy Link',
        linkCopied: isRTL ? 'تم نسخ الرابط!' : 'Link Copied!',
        checkOutPost: isWhitePaper ? isRTL ? 'اطّلع على هذه الورقة البيضاء على انسايتا: ' : 'Check out this white paper on Insighta: ' : isRTL ? 'اطّلع على هذا المنشور على انسايتا: ' : 'Check out this post on Insighta: ',
        sharedBy: isWhitePaper ? isRTL ? 'ورقة بيضاء بواسطة' : 'White Paper by' : isRTL ? 'منشور بواسطة' : 'Post by',
        close: isRTL ? 'إغلاق' : 'Close',
        facebookTextCopied: isRTL ? 'لا يسمح فيسبوك بتعبئة النص مسبقًا. نسخنا رسالتك — الصقها في مربع النشر على فيسبوك.' : 'Facebook does not allow pre-filled text. We copied your message — paste it into the Facebook composer.',
        facebookTextManual: isRTL ? 'لا يسمح فيسبوك بتعبئة النص مسبقًا. انسخ رسالتك من الأعلى والصقها في مربع النشر على فيسبوك.' : 'Facebook does not allow pre-filled text. Copy your message above and paste it into the Facebook composer.'
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FeedShare.useEffect": ()=>{
            if (shareModalOpened) {
                var _shareTextareaRef_current;
                setCustomShareMessage({
                    "FeedShare.useEffect": (current)=>current || "".concat(t.checkOutPost).concat(shareTitle || authorName)
                }["FeedShare.useEffect"]);
                setFacebookNotice(null);
                (_shareTextareaRef_current = shareTextareaRef.current) === null || _shareTextareaRef_current === void 0 ? void 0 : _shareTextareaRef_current.focus();
            }
        // The localized default is intentionally set only when the modal opens.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["FeedShare.useEffect"], [
        shareModalOpened
    ]);
    const authorInitials = authorName.split(' ').filter(Boolean).slice(0, 2).map((part)=>part[0]).join('').toUpperCase();
    const handleShare = ()=>{
        setCustomShareMessage("".concat(t.checkOutPost).concat(shareTitle || authorName));
        setFacebookNotice(null);
        setShareModalOpened(true);
    };
    const isMobileDevice = ()=>{
        if (typeof navigator === 'undefined') return false;
        // iPadOS reports a desktop UA, so fall back to the touch-point hint.
        return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    };
    const copyToClipboard = async (text)=>{
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (e) {
            return false;
        }
    };
    const openShareWindow = (url)=>{
        // The sized popup is a desktop affordance; on mobile it opens a cramped
        // window that several in-app browsers refuse outright.
        const features = isMobileDevice() ? 'noopener,noreferrer' : 'width=600,height=500,noopener,noreferrer';
        const opened = window.open(url, '_blank', features);
        if (!opened) window.location.href = url;
    };
    const shareToSocial = async (platform)=>{
        const url = encodeURIComponent(shareUrl);
        const message = encodeURIComponent(customShareMessage);
        let socialUrl = '';
        switch(platform){
            case 'facebook':
                socialUrl = "https://www.facebook.com/sharer/sharer.php?u=".concat(url, "&quote=").concat(message);
                break;
            case 'twitter':
                socialUrl = "https://twitter.com/intent/tweet?text=".concat(message, "&url=").concat(url);
                break;
            case 'linkedin':
                // LinkedIn's share-offsite endpoint ignores `title` and `summary`, so
                // the message entered in our modal never reaches its composer. The
                // feed composer accepts the post text and shared URL explicitly.
                socialUrl = "https://www.linkedin.com/feed/?shareActive=true&shareUrl=".concat(url, "&text=").concat(message);
                break;
            case 'whatsapp':
                socialUrl = "https://api.whatsapp.com/send?text=".concat(message, "%20").concat(url);
                break;
        }
        if (!socialUrl) return;
        if (platform === 'facebook') {
            // Two Facebook limitations are handled here:
            //   1. The mobile Facebook app captures facebook.com links as app links
            //      but has no handler for sharer.php, so the app opens on its home
            //      screen and the share is silently dropped. The native share sheet
            //      hands the URL to the app's own composer instead.
            //   2. Facebook removed pre-filled share text (the `quote` parameter) in
            //      2017, so the personal message can only be offered for pasting.
            const copied = await copyToClipboard(customShareMessage);
            if (isMobileDevice() && typeof navigator.share === 'function') {
                try {
                    await navigator.share({
                        title: shareTitle || authorName,
                        text: customShareMessage,
                        url: shareUrl
                    });
                    setShareModalOpened(false);
                    return;
                } catch (error) {
                    var _this;
                    // A cancelled sheet is not a failure; anything else falls through to
                    // the web sharer below.
                    if (((_this = error) === null || _this === void 0 ? void 0 : _this.name) === 'AbortError') return;
                }
            }
            setFacebookNotice(copied ? 'copied' : 'manual');
            openShareWindow(socialUrl);
            return;
        }
        openShareWindow(socialUrl);
        setShareModalOpened(false);
    };
    const handleCopyLink = async ()=>{
        try {
            await navigator.clipboard.writeText(shareUrl);
            setLinkCopied(true);
            setTimeout(()=>setLinkCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy link:', error);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            !hideTrigger && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: handleShare,
                "aria-label": t.share,
                className: triggerClassName !== null && triggerClassName !== void 0 ? triggerClassName : 'inline-flex min-w-0 flex-1 items-center justify-center gap-1 rounded-md px-1 py-2.5 text-[12px] font-medium text-[#5A6B85] transition-colors hover:bg-[#F5F8FC] hover:text-[#101724] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] sm:gap-2 sm:px-2 sm:text-[14px]',
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconShare3$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconShare3$3e$__["IconShare3"], {
                        "aria-hidden": true,
                        className: triggerIconClassName !== null && triggerIconClassName !== void 0 ? triggerIconClassName : 'h-4 w-4 shrink-0 text-[#E0398A] sm:h-[18px] sm:w-[18px]',
                        stroke: 1.8
                    }, void 0, false, {
                        fileName: "[project]/components/feed/FeedShare.tsx",
                        lineNumber: 217,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    !hideTriggerLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: triggerLabel !== null && triggerLabel !== void 0 ? triggerLabel : t.share
                    }, void 0, false, {
                        fileName: "[project]/components/feed/FeedShare.tsx",
                        lineNumber: 222,
                        columnNumber: 33
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/FeedShare.tsx",
                lineNumber: 211,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            shareModalOpened && typeof document !== 'undefined' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4",
                onClick: ()=>setShareModalOpened(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-md rounded-lg bg-white p-6 dark:bg-slate-800",
                    onClick: (event)=>event.stopPropagation(),
                    dir: isRTL ? 'rtl' : 'ltr',
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 flex items-center justify-between border-b border-gray-200 pb-4 dark:border-slate-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-bold text-gray-900 dark:text-white",
                                    children: t.sharePost
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/FeedShare.tsx",
                                    lineNumber: 238,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setShareModalOpened(false),
                                    "aria-label": t.close,
                                    className: "text-2xl leading-none text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/FeedShare.tsx",
                                    lineNumber: 239,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/FeedShare.tsx",
                            lineNumber: 237,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 rounded-lg bg-gray-50 p-4 dark:bg-slate-700",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-600",
                                        children: authorPhotoUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: authorPhotoUrl,
                                            alt: authorName,
                                            className: "h-full w-full object-cover object-top"
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/FeedShare.tsx",
                                            lineNumber: 254,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex h-full w-full items-center justify-center bg-blue-500 text-sm font-semibold text-white",
                                            children: authorInitials || 'I'
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/FeedShare.tsx",
                                            lineNumber: 260,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/FeedShare.tsx",
                                        lineNumber: 252,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "truncate font-semibold text-gray-900 dark:text-white",
                                                children: shareTitle || authorName
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/FeedShare.tsx",
                                                lineNumber: 266,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "truncate text-sm text-gray-500 dark:text-gray-400",
                                                children: [
                                                    t.sharedBy,
                                                    " ",
                                                    authorName
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/feed/FeedShare.tsx",
                                                lineNumber: 269,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/FeedShare.tsx",
                                        lineNumber: 265,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/FeedShare.tsx",
                                lineNumber: 251,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/feed/FeedShare.tsx",
                            lineNumber: 250,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300",
                                    children: t.customShareMessage
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/FeedShare.tsx",
                                    lineNumber: 278,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    ref: shareTextareaRef,
                                    className: "w-full resize-none rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white",
                                    rows: 3,
                                    value: customShareMessage,
                                    onChange: (event)=>setCustomShareMessage(event.target.value),
                                    placeholder: t.shareMessageHint
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/FeedShare.tsx",
                                    lineNumber: 281,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/FeedShare.tsx",
                            lineNumber: 277,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                className: "text-gray-500 dark:text-gray-400",
                                children: [
                                    t.characterCount,
                                    ": ",
                                    customShareMessage.length
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/FeedShare.tsx",
                                lineNumber: 292,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/feed/FeedShare.tsx",
                            lineNumber: 291,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6 flex justify-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "flex h-12 w-12 items-center justify-center rounded-full bg-[#2196F3] text-white transition-colors hover:bg-blue-700",
                                    onClick: ()=>{
                                        void shareToSocial('facebook');
                                    },
                                    title: "Share on Facebook",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "19",
                                        height: "19",
                                        viewBox: "0 0 19 19",
                                        fill: "none",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M19 9.5576C19 4.27831 14.7476 0 9.5 0C4.25244 0 0 4.27712 0 9.5576C0 14.3275 3.47344 18.2816 8.01562 18.9988V12.3195H5.60263V9.5564H8.01562V7.45109C8.01562 5.05605 9.4335 3.73328 11.6042 3.73328C12.6433 3.73328 13.7311 3.91968 13.7311 3.91968V6.2708H12.5329C11.3525 6.2708 10.9844 7.00818 10.9844 7.76338V9.5576H13.6194L13.1979 12.3207H10.9844V19C15.5266 18.2816 19 14.3275 19 9.5576Z",
                                            fill: "white"
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/FeedShare.tsx",
                                            lineNumber: 306,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/FeedShare.tsx",
                                        lineNumber: 305,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/FeedShare.tsx",
                                    lineNumber: 299,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-gray-800",
                                    onClick: ()=>{
                                        void shareToSocial('twitter');
                                    },
                                    title: "Share on X",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "19",
                                        height: "19",
                                        viewBox: "0 0 19 19",
                                        fill: "none",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M14.0248 3.65625H16.1725L11.4815 9.03014L17 16.3438H12.6801L9.29422 11.9092L5.4246 16.3438H3.27379L8.29031 10.5947L3 3.65625H7.42938L10.4867 7.70954L14.0248 3.65625ZM13.2703 15.0567H14.4598L6.7814 4.8762H5.50369L13.2703 15.0567Z",
                                            fill: "white"
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/FeedShare.tsx",
                                            lineNumber: 317,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/FeedShare.tsx",
                                        lineNumber: 316,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/FeedShare.tsx",
                                    lineNumber: 310,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "flex h-12 w-12 items-center justify-center rounded-full bg-[#0077b5] text-white transition-colors hover:bg-blue-800",
                                    onClick: ()=>{
                                        void shareToSocial('linkedin');
                                    },
                                    title: "Share on LinkedIn",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "19",
                                        height: "19",
                                        viewBox: "0 0 19 19",
                                        fill: "none",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                clipPath: "url(#feedshare_clip)",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M17.48 0H1.6233C0.756425 0 0 0.62344 0 1.47963V17.3719C0 18.2329 0.756425 19 1.6233 19H17.4752C18.3469 19 19 18.2281 19 17.3719V1.47963C19.0036 0.62344 18.3457 0 17.48 0ZM5.88881 15.8377H3.16705V7.37436H5.88881V15.8377ZM4.62175 6.08829H4.60274C3.73112 6.08829 3.16705 5.43994 3.16705 4.62769C3.16705 3.80119 3.74656 3.16825 4.63719 3.16825C5.52781 3.16825 6.07286 3.79644 6.09186 4.62769C6.09186 5.43994 5.52781 6.08829 4.62175 6.08829ZM15.8365 15.8377H13.1147V11.21C13.1147 10.1009 12.7181 9.34442 11.7337 9.34442C10.9808 9.34442 10.5355 9.85387 10.3384 10.3491C10.2647 10.5272 10.2446 10.7694 10.2446 11.0176V15.8377H7.5228V7.37436H10.2446V8.55237C10.6412 7.98831 11.2599 7.17606 12.6991 7.17606C14.4863 7.17606 15.8377 8.35407 15.8377 10.8929L15.8365 15.8377Z",
                                                    fill: "white"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/FeedShare.tsx",
                                                    lineNumber: 329,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/FeedShare.tsx",
                                                lineNumber: 328,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("clipPath", {
                                                    id: "feedshare_clip",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                        width: "19",
                                                        height: "19",
                                                        fill: "white"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/FeedShare.tsx",
                                                        lineNumber: 333,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/FeedShare.tsx",
                                                    lineNumber: 332,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/FeedShare.tsx",
                                                lineNumber: 331,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/FeedShare.tsx",
                                        lineNumber: 327,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/FeedShare.tsx",
                                    lineNumber: 321,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white transition-colors hover:bg-green-600",
                                    onClick: ()=>{
                                        void shareToSocial('whatsapp');
                                    },
                                    title: "Share on WhatsApp",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "19",
                                        height: "19",
                                        viewBox: "0 0 19 19",
                                        fill: "none",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M16.1537 2.76093C14.3773 0.979684 12.0108 0 9.49584 0C4.3056 0 0.0807459 4.22394 0.0807459 9.41569C0.0807459 11.0734 0.512968 12.6944 1.33585 14.1229L0 19L4.99193 17.689C6.36578 18.4395 7.91419 18.8338 9.49109 18.8338H9.49584C14.6825 18.8338 19 14.6098 19 9.41806C18.9988 6.90412 17.9301 4.54218 16.1537 2.76093ZM9.49584 17.2484C8.08755 17.2484 6.71014 16.8708 5.50966 16.1583L5.22586 15.9885L2.26561 16.7651L3.05406 13.8771L2.86763 13.5803C2.08275 12.3334 1.67189 10.8953 1.67189 9.41569C1.67189 5.10269 5.18311 1.59125 9.50059 1.59125C11.5917 1.59125 13.5545 2.40588 15.0304 3.8855C16.5064 5.36513 17.4136 7.32925 17.41 9.42044C17.4088 13.737 13.8086 17.2484 9.49584 17.2484ZM13.7872 11.3869C13.5545 11.2682 12.3967 10.6994 12.1794 10.6234C11.9633 10.5426 11.8066 10.5046 11.6498 10.7421C11.4931 10.9796 11.0431 11.5057 10.9029 11.6672C10.7676 11.8239 10.6275 11.8453 10.3935 11.7266C9.01137 11.0354 8.10299 10.4928 7.19224 8.92763C6.95 8.51201 7.43447 8.54169 7.88332 7.64276C7.95932 7.48601 7.92131 7.35062 7.86194 7.23187C7.80257 7.11312 7.33235 5.95532 7.13642 5.48507C6.94525 5.02669 6.75051 5.09081 6.60683 5.0825C6.47147 5.07419 6.31473 5.07418 6.1568 5.07418C5.99887 5.07418 5.74595 5.13356 5.52865 5.36631C5.31254 5.60381 4.70577 6.17263 4.70577 7.33044C4.70577 8.48825 5.55002 9.60807 5.66402 9.76482C5.78276 9.92157 7.32167 12.2966 9.68464 13.319C11.1772 13.9638 11.7626 14.0184 12.5095 13.908C12.9631 13.8403 13.9 13.3392 14.0959 12.7882C14.2907 12.2372 14.2907 11.7658 14.2313 11.6684C14.1779 11.5603 14.0199 11.5009 13.7872 11.3869Z",
                                            fill: "white"
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/FeedShare.tsx",
                                            lineNumber: 346,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/FeedShare.tsx",
                                        lineNumber: 345,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/FeedShare.tsx",
                                    lineNumber: 339,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/FeedShare.tsx",
                            lineNumber: 298,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        facebookNotice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "-mt-3 mb-4 rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-800 dark:bg-blue-900/30 dark:text-blue-200",
                            children: facebookNotice === 'copied' ? t.facebookTextCopied : t.facebookTextManual
                        }, void 0, false, {
                            fileName: "[project]/components/feed/FeedShare.tsx",
                            lineNumber: 352,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleCopyLink,
                            className: "w-full rounded-lg px-4 py-2 font-medium transition-colors ".concat(linkCopied ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600'),
                            children: linkCopied ? t.linkCopied : t.copyLink
                        }, void 0, false, {
                            fileName: "[project]/components/feed/FeedShare.tsx",
                            lineNumber: 358,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/feed/FeedShare.tsx",
                    lineNumber: 231,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/feed/FeedShare.tsx",
                lineNumber: 227,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)), document.body)
        ]
    }, void 0, true);
};
_s(FeedShare, "xNx4kGpSvgwZKQx04cKkp6pkj2A=");
_c = FeedShare;
const __TURBOPACK__default__export__ = FeedShare;
var _c;
__turbopack_context__.k.register(_c, "FeedShare");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/services/feed.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommunityFeedApiError",
    ()=>CommunityFeedApiError,
    "checkVideoUploadStatus",
    ()=>checkVideoUploadStatus,
    "createSuggestTag",
    ()=>createSuggestTag,
    "deleteFeedItem",
    ()=>deleteFeedItem,
    "fetchCommonTags",
    ()=>fetchCommonTags,
    "fetchIndustryTags",
    ()=>fetchIndustryTags,
    "fetchLibraryKnowledgeById",
    ()=>fetchLibraryKnowledgeById,
    "fetchPublishedLibraryKnowledge",
    ()=>fetchPublishedLibraryKnowledge,
    "getCommunityFeed",
    ()=>getCommunityFeed,
    "getCommunityFeedArticle",
    ()=>getCommunityFeedArticle,
    "getCommunityFeedPost",
    ()=>getCommunityFeedPost,
    "getCommunityFeedPreview",
    ()=>getCommunityFeedPreview,
    "getCompanyProfileFeed",
    ()=>getCompanyProfileFeed,
    "getFeedDraft",
    ()=>getFeedDraft,
    "getFeedItem",
    ()=>getFeedItem,
    "getInsighterProfileFeed",
    ()=>getInsighterProfileFeed,
    "getMyFeeds",
    ()=>getMyFeeds,
    "getSavedCommunityFeed",
    ()=>getSavedCommunityFeed,
    "initVideoPost",
    ()=>initVideoPost,
    "publishArticle",
    ()=>publishArticle,
    "publishImageTextPost",
    ()=>publishImageTextPost,
    "publishVideoPost",
    ()=>publishVideoPost,
    "refreshVideoUpload",
    ()=>refreshVideoUpload,
    "saveArticleDraft",
    ()=>saveArticleDraft,
    "saveImageTextPostDraft",
    ()=>saveImageTextPostDraft,
    "saveVideoPostDraft",
    ()=>saveVideoPostDraft,
    "searchCommunityFeed",
    ()=>searchCommunityFeed,
    "searchTags",
    ()=>searchTags,
    "setCommunityFeedItemSaved",
    ()=>setCommunityFeedItemSaved,
    "setCommunityFeedItemTracked",
    ()=>setCommunityFeedItemTracked,
    "uploadVideoToProvider",
    ()=>uploadVideoToProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
'use client';
;
;
;
class CommunityFeedApiError extends Error {
    constructor(message, status, code = null, refreshRequired = false){
        super(message), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "status", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "code", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "refreshRequired", void 0), this.status = status, this.code = code, this.refreshRequired = refreshRequired;
        this.name = 'CommunityFeedApiError';
    }
}
// ---------- Helpers ----------
function publicHeaders(locale) {
    return {
        Accept: 'application/json',
        'Accept-Language': locale,
        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
    };
}
function authHeaders(locale) {
    const headers = publicHeaders(locale);
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
    if (token) {
        headers.Authorization = "Bearer ".concat(token);
    }
    return headers;
}
async function parseErrorMessage(response, fallback) {
    let message = fallback;
    try {
        const body = await response.json();
        if (typeof (body === null || body === void 0 ? void 0 : body.message) === 'string' && body.message.trim() !== '') {
            message = body.message;
        } else if ((body === null || body === void 0 ? void 0 : body.errors) && typeof body.errors === 'object') {
            const first = Object.values(body.errors).flat()[0];
            if (typeof first === 'string') message = first;
        }
    } catch (e) {
    // Non-JSON error body: keep fallback
    }
    throw new Error(message);
}
async function initVideoPost(locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/insighter/feed/post/video/init'), {
        method: 'POST',
        headers: authHeaders(locale)
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to initialize the video upload.');
    }
    return response.json();
}
async function refreshVideoUpload(uuid, locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/insighter/feed/post/video/refresh-upload/".concat(uuid)), {
        method: 'POST',
        headers: authHeaders(locale)
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to refresh the video upload.');
    }
    return response.json();
}
async function checkVideoUploadStatus(uuid, locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/insighter/feed/post/video/check-status/".concat(uuid)), {
        headers: authHeaders(locale),
        cache: 'no-store'
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to check the video processing status.');
    }
    const body = await response.json();
    return body.is_ready === true;
}
function uploadVideoToProvider(uploadUrl, file, onProgress) {
    const xhr = new XMLHttpRequest();
    const promise = new Promise((resolve, reject)=>{
        xhr.upload.addEventListener('progress', (event)=>{
            if (event.lengthComputable) {
                onProgress(Math.round(event.loaded / event.total * 100));
            }
        });
        xhr.addEventListener('load', ()=>{
            if (xhr.status >= 200 && xhr.status < 300) {
                onProgress(100);
                resolve();
            } else {
                reject(new Error("Video upload failed (".concat(xhr.status, ").")));
            }
        });
        xhr.addEventListener('error', ()=>reject(new Error('Video upload failed.')));
        xhr.addEventListener('abort', ()=>reject(new DOMException('Upload cancelled', 'AbortError')));
        xhr.open('PUT', uploadUrl);
        xhr.send(file);
    });
    return {
        promise,
        abort: ()=>xhr.abort()
    };
}
async function getFeedItem(uuid, locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/insighter/feed/".concat(uuid)), {
        headers: authHeaders(locale),
        cache: 'no-store'
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to load the post.');
    }
    const body = await response.json();
    return body.data;
}
async function getCommunityFeedArticle(slug, locale, signal) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/platform/community/feed/articles/".concat(encodeURIComponent(slug))), {
        headers: authHeaders(locale),
        cache: 'no-store',
        signal
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to load the White Paper.');
    }
    const body = await response.json();
    return body.data;
}
async function getCommunityFeedPost(slug, locale, signal) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/platform/community/feed/posts/".concat(encodeURIComponent(slug))), {
        headers: authHeaders(locale),
        cache: 'no-store',
        signal
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to load the post.');
    }
    const body = await response.json();
    return body.data;
}
async function getFeedDraft(locale, signal) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/insighter/feed/draft'), {
        headers: authHeaders(locale),
        cache: 'no-store',
        signal
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to load your saved draft.');
    }
    const body = await response.json();
    var _body_data;
    return (_body_data = body.data) !== null && _body_data !== void 0 ? _body_data : null;
}
async function getMyFeeds(page, locale, signal) {
    var _body_data;
    const params = new URLSearchParams({
        page: String(page),
        per_page: '10'
    });
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/insighter/feed?".concat(params)), {
        headers: authHeaders(locale),
        cache: 'no-store',
        signal
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to load your posts.');
    }
    const body = await response.json();
    var _body_data1, _body_data_length, _body_meta;
    return {
        data: (_body_data1 = body.data) !== null && _body_data1 !== void 0 ? _body_data1 : [],
        meta: (_body_meta = body.meta) !== null && _body_meta !== void 0 ? _body_meta : {
            current_page: page,
            last_page: page,
            per_page: 10,
            total: (_body_data_length = (_body_data = body.data) === null || _body_data === void 0 ? void 0 : _body_data.length) !== null && _body_data_length !== void 0 ? _body_data_length : 0
        }
    };
}
async function requestCommunityFeed(path, locale, signal) {
    var _body_meta, _body_meta1, _body_meta2, _body_meta3, _body_meta4, _body_meta5, _body_meta6, _body_meta7, _body_meta8, _body_meta9;
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])(path), {
        headers: authHeaders(locale),
        cache: 'no-store',
        signal
    });
    if (!response.ok) {
        let message = 'Unable to load the community feed.';
        let code = null;
        let refreshRequired = false;
        try {
            const body = await response.json();
            if (typeof (body === null || body === void 0 ? void 0 : body.message) === 'string' && body.message.trim() !== '') {
                message = body.message;
            }
            if (typeof (body === null || body === void 0 ? void 0 : body.code) === 'string') code = body.code;
            refreshRequired = (body === null || body === void 0 ? void 0 : body.refresh_required) === true;
        } catch (e) {
        // Keep the fallback for non-JSON error responses.
        }
        throw new CommunityFeedApiError(message, response.status, code, refreshRequired);
    }
    const body = await response.json();
    var _body_data, _body_meta_snapshot_at, _body_meta_ranking_version, _body_meta_next_cursor;
    return {
        data: (_body_data = body.data) !== null && _body_data !== void 0 ? _body_data : [],
        meta: {
            snapshot_at: (_body_meta_snapshot_at = (_body_meta = body.meta) === null || _body_meta === void 0 ? void 0 : _body_meta.snapshot_at) !== null && _body_meta_snapshot_at !== void 0 ? _body_meta_snapshot_at : '',
            ranking_version: (_body_meta_ranking_version = (_body_meta1 = body.meta) === null || _body_meta1 === void 0 ? void 0 : _body_meta1.ranking_version) !== null && _body_meta_ranking_version !== void 0 ? _body_meta_ranking_version : '',
            has_more: ((_body_meta2 = body.meta) === null || _body_meta2 === void 0 ? void 0 : _body_meta2.has_more) === true,
            next_cursor: (_body_meta_next_cursor = (_body_meta3 = body.meta) === null || _body_meta3 === void 0 ? void 0 : _body_meta3.next_cursor) !== null && _body_meta_next_cursor !== void 0 ? _body_meta_next_cursor : null,
            is_guest_preview: (_body_meta4 = body.meta) === null || _body_meta4 === void 0 ? void 0 : _body_meta4.is_guest_preview,
            preview_limit: (_body_meta5 = body.meta) === null || _body_meta5 === void 0 ? void 0 : _body_meta5.preview_limit,
            authentication_required_for_more: (_body_meta6 = body.meta) === null || _body_meta6 === void 0 ? void 0 : _body_meta6.authentication_required_for_more,
            limit: (_body_meta7 = body.meta) === null || _body_meta7 === void 0 ? void 0 : _body_meta7.limit,
            candidate_count: (_body_meta8 = body.meta) === null || _body_meta8 === void 0 ? void 0 : _body_meta8.candidate_count,
            feed_session_id: (_body_meta9 = body.meta) === null || _body_meta9 === void 0 ? void 0 : _body_meta9.feed_session_id
        }
    };
}
async function getCommunityFeedPreview(locale, signal) {
    return requestCommunityFeed('/api/platform/community/feed/preview', locale, signal);
}
async function getCommunityFeed(locale, cursor, signal) {
    const params = new URLSearchParams({
        limit: '10'
    });
    if (cursor) params.set('cursor', cursor);
    return requestCommunityFeed("/api/platform/community/feed?".concat(params.toString()), locale, signal);
}
async function getInsighterProfileFeed(uuid, locale, cursor, signal) {
    var _body_meta, _body_meta1, _body_meta2;
    const params = new URLSearchParams({
        limit: '10'
    });
    if (cursor) params.set('cursor', cursor);
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/platform/insighter/profile/".concat(encodeURIComponent(uuid), "/feed?").concat(params.toString())), {
        headers: authHeaders(locale),
        cache: 'no-store',
        signal
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to load this insighter’s posts.');
    }
    const body = await response.json();
    var _body_data, _body_meta_next_cursor, _body_meta_per_page;
    return {
        data: (_body_data = body.data) !== null && _body_data !== void 0 ? _body_data : [],
        meta: {
            has_more: Boolean((_body_meta = body.meta) === null || _body_meta === void 0 ? void 0 : _body_meta.next_cursor),
            next_cursor: (_body_meta_next_cursor = (_body_meta1 = body.meta) === null || _body_meta1 === void 0 ? void 0 : _body_meta1.next_cursor) !== null && _body_meta_next_cursor !== void 0 ? _body_meta_next_cursor : null,
            limit: (_body_meta_per_page = (_body_meta2 = body.meta) === null || _body_meta2 === void 0 ? void 0 : _body_meta2.per_page) !== null && _body_meta_per_page !== void 0 ? _body_meta_per_page : 10
        }
    };
}
async function getCompanyProfileFeed(uuid, locale, cursor, signal) {
    var _body_meta, _body_meta1, _body_meta2;
    const params = new URLSearchParams({
        limit: '10'
    });
    if (cursor) params.set('cursor', cursor);
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/platform/company/profile/".concat(encodeURIComponent(uuid), "/feed?").concat(params.toString())), {
        headers: authHeaders(locale),
        cache: 'no-store',
        signal
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to load this company’s posts.');
    }
    const body = await response.json();
    var _body_data, _body_meta_next_cursor, _body_meta_per_page;
    return {
        data: (_body_data = body.data) !== null && _body_data !== void 0 ? _body_data : [],
        meta: {
            has_more: Boolean((_body_meta = body.meta) === null || _body_meta === void 0 ? void 0 : _body_meta.next_cursor),
            next_cursor: (_body_meta_next_cursor = (_body_meta1 = body.meta) === null || _body_meta1 === void 0 ? void 0 : _body_meta1.next_cursor) !== null && _body_meta_next_cursor !== void 0 ? _body_meta_next_cursor : null,
            limit: (_body_meta_per_page = (_body_meta2 = body.meta) === null || _body_meta2 === void 0 ? void 0 : _body_meta2.per_page) !== null && _body_meta_per_page !== void 0 ? _body_meta_per_page : 10
        }
    };
}
async function getSavedCommunityFeed(locale, cursor, signal) {
    var _body_meta, _body_meta1;
    const params = new URLSearchParams({
        limit: '10'
    });
    if (cursor) params.set('cursor', cursor);
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/platform/community/feed/saved?".concat(params.toString())), {
        headers: authHeaders(locale),
        cache: 'no-store',
        signal
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to load your saved posts.');
    }
    const body = await response.json();
    var _body_meta_next_cursor;
    const nextCursor = (_body_meta_next_cursor = (_body_meta = body.meta) === null || _body_meta === void 0 ? void 0 : _body_meta.next_cursor) !== null && _body_meta_next_cursor !== void 0 ? _body_meta_next_cursor : null;
    var _body_data, _body_meta_per_page;
    return {
        data: (_body_data = body.data) !== null && _body_data !== void 0 ? _body_data : [],
        meta: {
            has_more: Boolean(nextCursor),
            next_cursor: nextCursor,
            per_page: (_body_meta_per_page = (_body_meta1 = body.meta) === null || _body_meta1 === void 0 ? void 0 : _body_meta1.per_page) !== null && _body_meta_per_page !== void 0 ? _body_meta_per_page : 10
        }
    };
}
async function setCommunityFeedItemTracked(uuid, isTracked, locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/platform/community/feed/track/".concat(encodeURIComponent(uuid))), {
        method: isTracked ? 'PUT' : 'DELETE',
        headers: authHeaders(locale)
    });
    if (!response.ok) {
        await parseErrorMessage(response, isTracked ? 'Unable to track this post.' : 'Unable to untrack this post.');
    }
    const body = await response.json();
    return body.data;
}
async function setCommunityFeedItemSaved(uuid, isSaved, locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/platform/community/feed/save/".concat(encodeURIComponent(uuid))), {
        method: isSaved ? 'PUT' : 'DELETE',
        headers: authHeaders(locale)
    });
    if (!response.ok) {
        await parseErrorMessage(response, isSaved ? 'Unable to save this post.' : 'Unable to remove this post from saved posts.');
    }
    const body = await response.json();
    return body.data;
}
async function searchCommunityFeed(locale, search, signal) {
    var _body_data, _body_data1, _body_meta, _body_meta1, _body_meta2, _body_meta3, _body_meta4, _body_meta5, _body_meta6, _body_meta7;
    var _search_limit;
    const params = new URLSearchParams({
        keyword: search.keyword.trim(),
        accuracy: 'any',
        limit: String((_search_limit = search.limit) !== null && _search_limit !== void 0 ? _search_limit : 10)
    });
    if (search.cursor) params.set('cursor', search.cursor);
    if (search.industry) params.set('industry', String(search.industry));
    if (search.contentType) params.set('content_type', search.contentType);
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/platform/community/feed/search?".concat(params.toString())), {
        headers: authHeaders(locale),
        cache: 'no-store',
        signal
    });
    if (!response.ok) {
        let message = 'Unable to search the community feed.';
        let code = null;
        let refreshRequired = false;
        try {
            const body = await response.json();
            if (typeof (body === null || body === void 0 ? void 0 : body.message) === 'string' && body.message.trim() !== '') {
                message = body.message;
            }
            if (typeof (body === null || body === void 0 ? void 0 : body.code) === 'string') code = body.code;
            refreshRequired = (body === null || body === void 0 ? void 0 : body.refresh_required) === true;
        } catch (e) {
        // Keep the fallback for non-JSON error responses.
        }
        throw new CommunityFeedApiError(message, response.status, code, refreshRequired);
    }
    const body = await response.json();
    var _body_data_insights, _body_data_feed, _body_meta_snapshot_at, _body_meta_search_version, _body_meta_insights_limit, _body_meta_feed_limit, _ref, _body_meta_next_cursor, _body_meta_feed_search_session_id;
    return {
        insights: (_body_data_insights = (_body_data = body.data) === null || _body_data === void 0 ? void 0 : _body_data.insights) !== null && _body_data_insights !== void 0 ? _body_data_insights : [],
        feed: (_body_data_feed = (_body_data1 = body.data) === null || _body_data1 === void 0 ? void 0 : _body_data1.feed) !== null && _body_data_feed !== void 0 ? _body_data_feed : [],
        meta: {
            scope: 'all',
            language: ((_body_meta = body.meta) === null || _body_meta === void 0 ? void 0 : _body_meta.language) === 'arabic' ? 'arabic' : 'english',
            snapshot_at: (_body_meta_snapshot_at = (_body_meta1 = body.meta) === null || _body_meta1 === void 0 ? void 0 : _body_meta1.snapshot_at) !== null && _body_meta_snapshot_at !== void 0 ? _body_meta_snapshot_at : '',
            search_version: (_body_meta_search_version = (_body_meta2 = body.meta) === null || _body_meta2 === void 0 ? void 0 : _body_meta2.search_version) !== null && _body_meta_search_version !== void 0 ? _body_meta_search_version : '',
            insights_limit: (_body_meta_insights_limit = (_body_meta3 = body.meta) === null || _body_meta3 === void 0 ? void 0 : _body_meta3.insights_limit) !== null && _body_meta_insights_limit !== void 0 ? _body_meta_insights_limit : 0,
            feed_limit: (_ref = (_body_meta_feed_limit = (_body_meta4 = body.meta) === null || _body_meta4 === void 0 ? void 0 : _body_meta4.feed_limit) !== null && _body_meta_feed_limit !== void 0 ? _body_meta_feed_limit : search.limit) !== null && _ref !== void 0 ? _ref : 10,
            has_more: ((_body_meta5 = body.meta) === null || _body_meta5 === void 0 ? void 0 : _body_meta5.has_more) === true,
            next_cursor: (_body_meta_next_cursor = (_body_meta6 = body.meta) === null || _body_meta6 === void 0 ? void 0 : _body_meta6.next_cursor) !== null && _body_meta_next_cursor !== void 0 ? _body_meta_next_cursor : null,
            feed_search_session_id: (_body_meta_feed_search_session_id = (_body_meta7 = body.meta) === null || _body_meta7 === void 0 ? void 0 : _body_meta7.feed_search_session_id) !== null && _body_meta_feed_search_session_id !== void 0 ? _body_meta_feed_search_session_id : null
        }
    };
}
async function deleteFeedItem(uuid, locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/insighter/feed/".concat(uuid)), {
        method: 'DELETE',
        headers: authHeaders(locale)
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to delete the post.');
    }
}
async function publishVideoPost(uuid, payload, locale) {
    return saveVideoPost(uuid, payload, 'published', locale);
}
async function saveVideoPostDraft(uuid, payload, locale) {
    return saveVideoPost(uuid, payload, 'draft', locale);
}
async function saveVideoPost(uuid, payload, status, locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/insighter/feed/post/video/properties/".concat(uuid)), {
        method: 'PUT',
        headers: {
            ...authHeaders(locale),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            body: payload.body,
            status,
            industry_id: payload.industryId,
            tags: payload.tags,
            related_insights: payload.relatedInsights,
            ...status === 'published' && payload.authorType ? {
                author_type: payload.authorType
            } : {}
        })
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to publish the post.');
    }
}
async function publishImageTextPost(payload, locale, uuid) {
    return saveImageTextPost(payload, 'published', locale, uuid);
}
async function saveImageTextPostDraft(payload, locale, uuid) {
    return saveImageTextPost(payload, 'draft', locale, uuid);
}
async function saveImageTextPost(payload, status, locale, uuid) {
    var _payload_media, _body_data;
    const jsonPayload = {
        body: payload.body,
        industry_id: payload.industryId,
        status,
        tags: payload.tags,
        related_insights: payload.relatedInsights,
        ...status === 'published' && payload.authorType ? {
            author_type: payload.authorType
        } : {}
    };
    if (uuid) {
        var _payload_media1, _payload_media2;
        // Send metadata as JSON first so empty tag/insight arrays are preserved.
        // When images are replaced, keep the item as a draft until that upload
        // succeeds, then apply the requested final status with the media request.
        const metadataResponse = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/insighter/feed/post/image-text/".concat(uuid)), {
            method: 'PUT',
            headers: {
                ...authHeaders(locale),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...jsonPayload,
                status: ((_payload_media1 = payload.media) === null || _payload_media1 === void 0 ? void 0 : _payload_media1.length) ? 'draft' : status
            })
        });
        if (!metadataResponse.ok) {
            await parseErrorMessage(metadataResponse, 'Unable to update the post.');
        }
        if (!((_payload_media2 = payload.media) === null || _payload_media2 === void 0 ? void 0 : _payload_media2.length)) return uuid;
    }
    const formData = new FormData();
    formData.append('body', payload.body);
    if (payload.industryId !== null) formData.append('industry_id', String(payload.industryId));
    formData.append('status', status);
    if (status === 'published' && payload.authorType) {
        formData.append('author_type', payload.authorType);
    }
    if (!uuid) {
        payload.tags.forEach((tagId, index)=>formData.append("tags[".concat(index, "]"), String(tagId)));
        payload.relatedInsights.forEach((knowledgeId, index)=>formData.append("related_insights[".concat(index, "]"), String(knowledgeId)));
    }
    (_payload_media = payload.media) === null || _payload_media === void 0 ? void 0 : _payload_media.forEach((entry, index)=>{
        formData.append("media[".concat(index, "][image]"), entry.file);
        formData.append("media[".concat(index, "][sort_order]"), String(entry.sortOrder));
    });
    if (uuid) formData.append('_method', 'PUT');
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])(uuid ? "/api/insighter/feed/post/image-text/".concat(uuid) : '/api/insighter/feed/post/image-text'), {
        method: 'POST',
        headers: authHeaders(locale),
        body: formData
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to publish the post.');
    }
    if (uuid) return uuid;
    const body = await response.json();
    return (_body_data = body.data) === null || _body_data === void 0 ? void 0 : _body_data.uuid;
}
async function publishArticle(payload, locale, uuid) {
    return saveArticle(payload, 'published', locale, uuid);
}
async function saveArticleDraft(payload, locale, uuid) {
    return saveArticle(payload, 'draft', locale, uuid);
}
async function saveArticle(payload, status, locale, uuid) {
    var _body_data;
    const jsonPayload = {
        title: payload.title,
        body: payload.body,
        industry_id: payload.industryId,
        status,
        tags: payload.tags,
        related_insights: payload.relatedInsights,
        remove_cover: payload.removeCover === true,
        ...status === 'published' && payload.authorType ? {
            author_type: payload.authorType
        } : {}
    };
    if (uuid) {
        const uploadCoverBeforePublishing = status === 'published' && !!payload.coverImage;
        const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/insighter/feed/article/".concat(uuid)), {
            method: 'PUT',
            headers: {
                ...authHeaders(locale),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...jsonPayload,
                status: uploadCoverBeforePublishing ? 'draft' : status
            })
        });
        if (!response.ok) {
            await parseErrorMessage(response, status === 'draft' ? 'Unable to save the White Paper draft.' : 'Unable to publish the White Paper.');
        }
        if (payload.coverImage) {
            const coverFormData = new FormData();
            coverFormData.append('_method', 'PUT');
            coverFormData.append('cover_image', payload.coverImage);
            const coverResponse = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/insighter/feed/article/".concat(uuid)), {
                method: 'POST',
                headers: authHeaders(locale),
                body: coverFormData
            });
            if (!coverResponse.ok) {
                await parseErrorMessage(coverResponse, 'Unable to upload the White Paper cover image.');
            }
        }
        if (uploadCoverBeforePublishing) {
            const publishResponse = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/insighter/feed/article/".concat(uuid)), {
                method: 'PUT',
                headers: {
                    ...authHeaders(locale),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: 'published',
                    ...payload.authorType ? {
                        author_type: payload.authorType
                    } : {}
                })
            });
            if (!publishResponse.ok) {
                await parseErrorMessage(publishResponse, 'Unable to publish the White Paper.');
            }
        }
        return uuid;
    }
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('body', payload.body);
    formData.append('status', status);
    if (status === 'published' && payload.authorType) {
        formData.append('author_type', payload.authorType);
    }
    if (payload.industryId !== null) {
        formData.append('industry_id', String(payload.industryId));
    }
    payload.tags.forEach((tagId, index)=>formData.append("tags[".concat(index, "]"), String(tagId)));
    payload.relatedInsights.forEach((knowledgeId, index)=>formData.append("related_insights[".concat(index, "]"), String(knowledgeId)));
    if (payload.coverImage) {
        formData.append('cover_image', payload.coverImage);
    }
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/insighter/feed/article'), {
        method: 'POST',
        headers: authHeaders(locale),
        body: formData
    });
    if (!response.ok) {
        await parseErrorMessage(response, status === 'draft' ? 'Unable to save the White Paper draft.' : 'Unable to publish the White Paper.');
    }
    const body = await response.json();
    return (_body_data = body.data) === null || _body_data === void 0 ? void 0 : _body_data.uuid;
}
async function fetchIndustryTags(industryId, locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/common/setting/tag/industry/".concat(industryId)), {
        headers: authHeaders(locale)
    });
    if (!response.ok) return [];
    const body = await response.json();
    var _body_data;
    return ((_body_data = body.data) !== null && _body_data !== void 0 ? _body_data : []).map((tag)=>({
            id: tag.id,
            name: tag.name
        }));
}
async function fetchCommonTags(locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/common/setting/tag/common/list'), {
        headers: authHeaders(locale)
    });
    if (!response.ok) return [];
    const body = await response.json();
    var _body_data;
    return ((_body_data = body.data) !== null && _body_data !== void 0 ? _body_data : []).map((tag)=>({
            id: tag.id,
            name: tag.name
        }));
}
async function searchTags(keyword, locale) {
    const params = new URLSearchParams({
        keyword,
        limit: '20'
    });
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/common/setting/tag/search?".concat(params)), {
        headers: authHeaders(locale)
    });
    if (!response.ok) return [];
    const body = await response.json();
    var _body_data;
    return ((_body_data = body.data) !== null && _body_data !== void 0 ? _body_data : []).map((tag)=>({
            id: tag.id,
            name: tag.name
        }));
}
async function createSuggestTag(industryId, name, locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/insighter/tag/suggest'), {
        method: 'POST',
        headers: {
            ...authHeaders(locale),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            industry_id: industryId,
            name: {
                en: name,
                ar: name
            }
        })
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to add the tag.');
    }
    const body = await response.json();
    return {
        id: body.data.tag_id,
        name
    };
}
async function fetchPublishedLibraryKnowledge(page, locale) {
    let isCompany = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false, keyword = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : '';
    // Both list endpoints are already scoped to published items, paginated and
    // ordered newest-first, and accept an optional `keyword` title filter.
    const params = new URLSearchParams({
        page: String(page)
    });
    const trimmedKeyword = keyword.trim();
    if (trimmedKeyword) params.set('keyword', trimmedKeyword);
    const path = isCompany ? "/api/company/library/knowledge/list?".concat(params) : "/api/insighter/library/knowledge/list?".concat(params);
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])(path), {
        headers: authHeaders(locale)
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to load your library.');
    }
    const body = await response.json();
    var _body_data;
    const data = ((_body_data = body.data) !== null && _body_data !== void 0 ? _body_data : []).map((item)=>({
            id: item.id,
            type: item.type,
            title: item.title,
            slug: item.slug,
            status: item.status,
            published_at: item.published_at,
            description: item.description
        }));
    var _body_meta;
    return {
        data,
        meta: (_body_meta = body.meta) !== null && _body_meta !== void 0 ? _body_meta : {
            current_page: page,
            last_page: page,
            per_page: data.length,
            total: data.length
        }
    };
}
async function fetchLibraryKnowledgeById(id, locale) {
    let maxPages = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 5, isCompany = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
    for(let page = 1; page <= maxPages; page += 1){
        const result = await fetchPublishedLibraryKnowledge(page, locale, isCompany);
        const match = result.data.find((item)=>item.id === id);
        if (match) return match;
        if (page >= result.meta.last_page) break;
    }
    return null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/feed/FeedSaveButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FeedSaveButton,
    "feedSaveChangedEvent",
    ()=>feedSaveChangedEvent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Tooltip$2f$Tooltip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Tooltip/Tooltip.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBookmark$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBookmark$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBookmark.mjs [app-client] (ecmascript) <export default as IconBookmark>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconLoader2.mjs [app-client] (ecmascript) <export default as IconLoader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/toast/ToastContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/header/hooks/useUserProfile.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/feed.service.ts [app-client] (ecmascript)");
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
const feedSaveChangedEvent = 'feed:save-changed';
const copyByLocale = {
    en: {
        save: 'Save post',
        unsave: 'Remove from saved posts',
        saveAction: 'Save',
        savedAction: 'Saved',
        updating: 'Updating saved post…',
        saved: 'Post saved.',
        removed: 'Post removed from saved posts.',
        failed: 'Unable to update your saved posts.'
    },
    ar: {
        save: 'حفظ المنشور',
        unsave: 'إزالة من المنشورات المحفوظة',
        saveAction: 'حفظ',
        savedAction: 'محفوظ',
        updating: 'جارٍ تحديث المنشورات المحفوظة…',
        saved: 'تم حفظ المنشور.',
        removed: 'تمت إزالة المنشور من المحفوظات.',
        failed: 'تعذر تحديث المنشورات المحفوظة.'
    }
};
function FeedSaveButton(param) {
    let { uuid, identifier, contentType, initialIsSaved, locale, tone = 'card', layout = 'icon', className, onChange } = param;
    _s();
    const copy = copyByLocale[locale === 'ar' ? 'ar' : 'en'];
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user, isAuthResolved } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserProfile"])();
    const [isSaved, setIsSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialIsSaved === true);
    const [isUpdating, setIsUpdating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FeedSaveButton.useEffect": ()=>{
            if (typeof initialIsSaved === 'boolean') setIsSaved(initialIsSaved);
        }
    }["FeedSaveButton.useEffect"], [
        initialIsSaved,
        uuid
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FeedSaveButton.useEffect": ()=>{
            const syncSavedState = {
                "FeedSaveButton.useEffect.syncSavedState": (event)=>{
                    const detail = event.detail;
                    if ((detail === null || detail === void 0 ? void 0 : detail.uuid) === uuid) setIsSaved(detail.isSaved);
                }
            }["FeedSaveButton.useEffect.syncSavedState"];
            window.addEventListener(feedSaveChangedEvent, syncSavedState);
            return ({
                "FeedSaveButton.useEffect": ()=>window.removeEventListener(feedSaveChangedEvent, syncSavedState)
            })["FeedSaveButton.useEffect"];
        }
    }["FeedSaveButton.useEffect"], [
        uuid
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FeedSaveButton.useEffect": ()=>{
            if (!isAuthResolved || !user || typeof initialIsSaved === 'boolean' || !identifier) return;
            const controller = new AbortController();
            const request = contentType === 'article' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCommunityFeedArticle"])(identifier, locale, controller.signal) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCommunityFeedPost"])(identifier, locale, controller.signal);
            request.then({
                "FeedSaveButton.useEffect": (item)=>setIsSaved(item.is_saved === true)
            }["FeedSaveButton.useEffect"]).catch({
                "FeedSaveButton.useEffect": (error)=>{
                    if (!(error instanceof DOMException && error.name === 'AbortError')) {
                    // The button remains usable even if its initial state cannot be refreshed.
                    }
                }
            }["FeedSaveButton.useEffect"]);
            return ({
                "FeedSaveButton.useEffect": ()=>controller.abort()
            })["FeedSaveButton.useEffect"];
        }
    }["FeedSaveButton.useEffect"], [
        contentType,
        identifier,
        initialIsSaved,
        isAuthResolved,
        locale,
        user,
        uuid
    ]);
    const updateSavedState = async ()=>{
        if (isUpdating) return;
        if (!user) {
            const returnUrl = encodeURIComponent(window.location.href);
            router.push("/".concat(locale, "/signin?returnUrl=").concat(returnUrl));
            return;
        }
        const nextIsSaved = !isSaved;
        setIsUpdating(true);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setCommunityFeedItemSaved"])(uuid, nextIsSaved, locale);
            setIsSaved(result.is_saved);
            onChange === null || onChange === void 0 ? void 0 : onChange(result.is_saved);
            window.dispatchEvent(new CustomEvent(feedSaveChangedEvent, {
                detail: {
                    uuid,
                    isSaved: result.is_saved
                }
            }));
            toast.success(result.is_saved ? copy.saved : copy.removed);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : copy.failed);
        } finally{
            setIsUpdating(false);
        }
    };
    const label = isUpdating ? copy.updating : isSaved ? copy.unsave : copy.save;
    const toneClasses = tone === 'hero' ? isSaved ? 'border-white/50 bg-white text-[#155FBB] shadow-sm hover:bg-[#F3F8FF]' : 'border-white/35 bg-[#071426]/35 text-white backdrop-blur-sm hover:bg-[#071426]/55' : isSaved ? 'border-[#BBD5F5] bg-[#EAF3FF] text-[#2378E8] hover:bg-[#DDEBFD]' : 'border-transparent bg-[#F2F7FF] text-[#5B6F8A] hover:bg-[#E6F0FD] hover:text-[#2378E8]';
    const buttonClasses = layout === 'action' ? "inline-flex min-h-10 min-w-0 flex-1 items-center justify-center gap-1 rounded-md px-1 py-2.5 text-[12px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] disabled:cursor-wait disabled:opacity-65 sm:gap-2 sm:px-2 sm:text-[14px] ".concat(isSaved ? 'bg-[#EDF4FD] text-[#2378E8] hover:bg-[#E2EEFC]' : 'text-[#5A6B85] hover:bg-[#F5F8FC] hover:text-[#101724]') : "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-65 ".concat(toneClasses);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Tooltip$2f$Tooltip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
        label: label,
        position: "bottom",
        openDelay: 300,
        withArrow: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: ()=>void updateSavedState(),
            disabled: isUpdating,
            "aria-label": label,
            "aria-pressed": isSaved,
            className: "".concat(buttonClasses, " ").concat(className !== null && className !== void 0 ? className : ''),
            children: [
                isUpdating ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__["IconLoader2"], {
                    "aria-hidden": true,
                    className: "h-[18px] w-[18px] animate-spin",
                    stroke: 2
                }, void 0, false, {
                    fileName: "[project]/components/feed/FeedSaveButton.tsx",
                    lineNumber: 157,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBookmark$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBookmark$3e$__["IconBookmark"], {
                    "aria-hidden": true,
                    className: "h-4 w-4 shrink-0 text-[#C77D10] sm:h-[18px] sm:w-[18px]",
                    stroke: isSaved ? 2 : 1.8,
                    fill: isSaved ? 'currentColor' : 'none'
                }, void 0, false, {
                    fileName: "[project]/components/feed/FeedSaveButton.tsx",
                    lineNumber: 159,
                    columnNumber: 11
                }, this),
                layout === 'action' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: isSaved ? copy.savedAction : copy.saveAction
                }, void 0, false, {
                    fileName: "[project]/components/feed/FeedSaveButton.tsx",
                    lineNumber: 167,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/feed/FeedSaveButton.tsx",
            lineNumber: 148,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/feed/FeedSaveButton.tsx",
        lineNumber: 147,
        columnNumber: 5
    }, this);
}
_s(FeedSaveButton, "qBw5quPx/iN4tfI2bkNXcdc71Hk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserProfile"]
    ];
});
_c = FeedSaveButton;
var _c;
__turbopack_context__.k.register(_c, "FeedSaveButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/feed/RoleUpgradeCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RoleUpgradeCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowRight$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconArrowRight.mjs [app-client] (ecmascript) <export default as IconArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconGift$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconGift$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconGift.mjs [app-client] (ecmascript) <export default as IconGift>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/header/hooks/useUserProfile.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const copyByLocale = {
    en: {
        insighter: {
            eyebrow: 'Upgrade for free',
            title: 'Grow as a company',
            benefits: [
                'Create a trusted company profile',
                'Add and manage your team with centralized publishing control',
                'Strengthen your digital presence and promote your services'
            ],
            action: 'Upgrade to Company'
        },
        client: {
            eyebrow: 'Share your expertise',
            title: 'Become an Insighter',
            benefits: [
                'Create posts that showcase your expertise',
                'Publish insights and original knowledge',
                'Share your expertise and promote your services'
            ],
            action: 'Become an Insighter'
        }
    },
    ar: {
        insighter: {
            eyebrow: 'الترقية مجانًا',
            title: 'نمِّ حضورك كشركة',
            benefits: [
                'أنشئ ملفًا موثوقًا لشركتك',
                'أضف فريقك وأدره مع التحكم المركزي بالنشر',
                'عزّز حضورك الرقمي وروّج لخدماتك'
            ],
            action: 'الترقية إلى شركة'
        },
        client: {
            eyebrow: 'شارك خبرتك',
            title: 'كن خبيراً',
            benefits: [
                'إنشاء منشورات تُبرز خبرتك',
                'نشر الرؤى والمعرفة الأصيلة',
                'مشاركة خبرتك والترويج لخدماتك'
            ],
            action: 'كن خبيراً'
        }
    }
};
function RoleUpgradeCard(param) {
    let { locale, className } = param;
    var _copy_benefits;
    _s();
    const isArabic = locale === 'ar';
    const { user, roles, isAuthResolved } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserProfile"])();
    if (!isAuthResolved || !user) return null;
    const hasCompanyRole = roles.some((role)=>[
            'company',
            'company-insighter'
        ].includes(role));
    const isInsighterOnly = roles.includes('insighter') && !hasCompanyRole;
    const isClientOnly = roles.includes('client') && !roles.some((role)=>[
            'insighter',
            'company',
            'company-insighter'
        ].includes(role));
    if (!isInsighterOnly && !isClientOnly) return null;
    const variant = isInsighterOnly ? 'insighter' : 'client';
    const copy = copyByLocale[isArabic ? 'ar' : 'en'][variant];
    const insighterRegistrationUrl = "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dashboardUrl"], "/app/insighter-register/vertical");
    const companyUpgradeUrl = "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dashboardUrl"], "/app/insighter-dashboard/account-settings/company-account");
    const actionClassName = 'mt-5 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md bg-[#176FD1] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#105EBA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176FD1] focus-visible:ring-offset-2';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-labelledby": "role-upgrade-".concat(variant, "-title"),
        className: "relative isolate overflow-hidden rounded-lg border p-5 ".concat(isInsighterOnly ? 'border-[#B8DBE4] bg-[#E9F8F3] bg-cover bg-center' : 'border-[#BFD8F7] bg-gradient-to-br from-[#EAF3FF] via-white to-[#E7FAF8]').concat(className ? " ".concat(className) : ''),
        style: isInsighterOnly ? {
            backgroundImage: "url('https://res.cloudinary.com/dsiku9ipv/image/upload/v1785500121/3440_gzhz0h.jpg')"
        } : undefined,
        children: [
            !isInsighterOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "aria-hidden": true,
                        className: "absolute -end-9 -top-10 -z-10 h-28 w-28 rounded-full bg-[#56D3D8]/20 blur-sm"
                    }, void 0, false, {
                        fileName: "[project]/components/feed/RoleUpgradeCard.tsx",
                        lineNumber: 105,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "aria-hidden": true,
                        className: "absolute -bottom-12 -start-8 -z-10 h-28 w-28 rounded-full bg-[#2378E8]/10"
                    }, void 0, false, {
                        fileName: "[project]/components/feed/RoleUpgradeCard.tsx",
                        lineNumber: 109,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between gap-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] backdrop-blur-sm ".concat(isInsighterOnly ? 'border-white/70 bg-white/55 text-[#245578]' : 'border-[#BCD7F6] bg-white/75 text-[#1D67BC]'),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconGift$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconGift$3e$__["IconGift"], {
                            "aria-hidden": true,
                            className: "h-3.5 w-3.5",
                            stroke: 1.9
                        }, void 0, false, {
                            fileName: "[project]/components/feed/RoleUpgradeCard.tsx",
                            lineNumber: 122,
                            columnNumber: 13
                        }, this),
                        copy.eyebrow
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/feed/RoleUpgradeCard.tsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/feed/RoleUpgradeCard.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                id: "role-upgrade-".concat(variant, "-title"),
                className: "mt-5 text-[19px] font-semibold leading-6 tracking-[-0.02em] ".concat(isInsighterOnly ? 'text-[#123653]' : 'text-[#10233F]'),
                children: copy.title
            }, void 0, false, {
                fileName: "[project]/components/feed/RoleUpgradeCard.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "mt-3 list-disc space-y-1.5 ps-4 text-[13px] leading-5 ".concat(isInsighterOnly ? 'text-[#47677D]' : 'text-[#566A86]'),
                children: (_copy_benefits = copy.benefits) === null || _copy_benefits === void 0 ? void 0 : _copy_benefits.map((benefit)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: benefit
                    }, benefit, false, {
                        fileName: "[project]/components/feed/RoleUpgradeCard.tsx",
                        lineNumber: 141,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/feed/RoleUpgradeCard.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: isClientOnly ? insighterRegistrationUrl : companyUpgradeUrl,
                className: actionClassName,
                children: [
                    copy.action,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowRight$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowRight$3e$__["IconArrowRight"], {
                        "aria-hidden": true,
                        className: "h-4 w-4 ".concat(isArabic ? 'rotate-180' : ''),
                        stroke: 1.9
                    }, void 0, false, {
                        fileName: "[project]/components/feed/RoleUpgradeCard.tsx",
                        lineNumber: 150,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/RoleUpgradeCard.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/RoleUpgradeCard.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
_s(RoleUpgradeCard, "/4soHGZPfnUjh67Zq0METjvlEHw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserProfile"]
    ];
});
_c = RoleUpgradeCard;
var _c;
__turbopack_context__.k.register(_c, "RoleUpgradeCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/knowledgs/usePopularKnowledge.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePopularKnowledge",
    ()=>usePopularKnowledge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/index.react-client.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const POPULAR_URL = "".concat(("TURBOPACK compile-time value", "https://api.foresighta.co"), "/api/platform/industries/knowledge/popular");
// Dedupe + cache per locale (prevents double GET in production if mounted twice)
const popularCache = new Map();
const popularInFlight = new Map();
function normalizeLocale(locale) {
    return locale === 'ar' ? 'ar' : 'en';
}
async function fetchPopularKnowledge(locale) {
    const res = await fetch(POPULAR_URL, {
        headers: {
            Accept: 'application/json',
            'Accept-Language': locale,
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
        }
    });
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const json = await res.json();
    return json.data.slice(0, 5);
}
function usePopularKnowledge() {
    _s();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const locale = normalizeLocale((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePopularKnowledge.useEffect": ()=>{
            let cancelled = false;
            // Serve from cache immediately when possible
            const cached = popularCache.get(locale);
            if (cached) {
                setData(cached);
                setIsLoading(false);
                setError(null);
                return;
            }
            setIsLoading(true);
            setError(null);
            const existing = popularInFlight.get(locale);
            const p = existing !== null && existing !== void 0 ? existing : fetchPopularKnowledge(locale);
            if (!existing) popularInFlight.set(locale, p);
            p.then({
                "usePopularKnowledge.useEffect": (items)=>{
                    popularCache.set(locale, items);
                    popularInFlight.delete(locale);
                    if (!cancelled) {
                        setData(items);
                        setIsLoading(false);
                    }
                }
            }["usePopularKnowledge.useEffect"]).catch({
                "usePopularKnowledge.useEffect": (err)=>{
                    popularInFlight.delete(locale);
                    if (!cancelled) {
                        setError(err);
                        setIsLoading(false);
                    }
                }
            }["usePopularKnowledge.useEffect"]);
            return ({
                "usePopularKnowledge.useEffect": ()=>{
                    cancelled = true;
                }
            })["usePopularKnowledge.useEffect"];
        }
    }["usePopularKnowledge.useEffect"], [
        locale
    ]);
    return {
        data,
        isLoading,
        error
    };
}
_s(usePopularKnowledge, "9sitU7I7nXSfdW4OUJYLSKhLI0s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/feed/DocumentsListCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DocumentsListCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowRight$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconArrowRight.mjs [app-client] (ecmascript) <export default as IconArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$KnowledgeTypeIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/KnowledgeTypeIcon.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
function getTypeLabel(type, isRTL) {
    const labels = {
        report: {
            en: 'Report',
            ar: 'تقرير'
        },
        manual: {
            en: 'Manual',
            ar: 'دليل'
        },
        statistic: {
            en: 'Statistic',
            ar: 'إحصائية'
        },
        insight: {
            en: 'Insight',
            ar: 'رؤية'
        },
        data: {
            en: 'Data',
            ar: 'بيانات'
        },
        article: {
            en: 'White Paper',
            ar: 'ورقة بيضاء'
        },
        course: {
            en: 'Course',
            ar: 'دورة'
        }
    };
    const label = labels[type.toLowerCase()];
    return label ? isRTL ? label.ar : label.en : type;
}
function LoadingList() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
        className: "mt-2 space-y-1.5",
        "aria-hidden": "true",
        children: Array.from({
            length: 3
        }).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                className: "overflow-hidden rounded-[4px] border border-slate-200 bg-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "block h-[84px] animate-pulse bg-slate-900/95 p-3.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block h-4 w-16 rounded-full bg-white/10"
                            }, void 0, false, {
                                fileName: "[project]/components/feed/DocumentsListCard.tsx",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mt-3 block h-3 w-4/5 rounded bg-white/10"
                            }, void 0, false, {
                                fileName: "[project]/components/feed/DocumentsListCard.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mt-2 block h-3 w-3/5 rounded bg-white/10"
                            }, void 0, false, {
                                fileName: "[project]/components/feed/DocumentsListCard.tsx",
                                lineNumber: 64,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/DocumentsListCard.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex h-9 items-center gap-2 px-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "h-5 w-5 rounded-full bg-slate-100"
                            }, void 0, false, {
                                fileName: "[project]/components/feed/DocumentsListCard.tsx",
                                lineNumber: 67,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "h-2.5 w-24 rounded bg-slate-100"
                            }, void 0, false, {
                                fileName: "[project]/components/feed/DocumentsListCard.tsx",
                                lineNumber: 68,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/DocumentsListCard.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this)
                ]
            }, index, true, {
                fileName: "[project]/components/feed/DocumentsListCard.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/feed/DocumentsListCard.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c = LoadingList;
function getInitials(name) {
    return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part)=>part[0]).join('').toUpperCase();
}
function getPriceLabel(item, isRTL) {
    var _item_price;
    const normalizedPrice = String((_item_price = item.price) !== null && _item_price !== void 0 ? _item_price : '').trim();
    const numericPrice = normalizedPrice === '' ? null : Number(normalizedPrice);
    const isNumericPrice = numericPrice !== null && !Number.isNaN(numericPrice);
    const isFree = item.paidStatus === 'free' || !item.paidStatus && isNumericPrice && numericPrice === 0;
    if (isFree) return {
        label: isRTL ? 'مجاني' : 'Free',
        isFree: true
    };
    if (!normalizedPrice && item.paidStatus !== 'partial_paid') return null;
    const label = isNumericPrice ? "$".concat(numericPrice.toLocaleString('en-US', {
        maximumFractionDigits: 2
    })) : normalizedPrice;
    return {
        label: item.paidStatus === 'partial_paid' ? "".concat(label || (isRTL ? 'جزئي' : 'Partial'), " +") : label,
        isFree: false
    };
}
function DocumentsListCard(param) {
    let { locale, title, documents, isLoading, emptyText, unavailableText = emptyText, hasError = false, openInNewTabLabel, viewAllHref, viewAllLabel, viewAllDescription, emptySearchCta, className } = param;
    const isRTL = locale === 'ar';
    const showEmptySearchCta = !isLoading && !hasError && documents.length === 0 && Boolean(emptySearchCta);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: className,
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "px-0.5 text-sm font-bold text-slate-900",
                children: title
            }, void 0, false, {
                fileName: "[project]/components/feed/DocumentsListCard.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LoadingList, {}, void 0, false, {
                fileName: "[project]/components/feed/DocumentsListCard.tsx",
                lineNumber: 131,
                columnNumber: 9
            }, this) : hasError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3 rounded-[4px] border border-slate-200 bg-white px-4 py-5 text-xs leading-5 text-slate-500",
                role: "status",
                children: unavailableText
            }, void 0, false, {
                fileName: "[project]/components/feed/DocumentsListCard.tsx",
                lineNumber: 133,
                columnNumber: 9
            }, this) : documents.length === 0 ? emptySearchCta ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: viewAllHref,
                "aria-label": emptySearchCta.action,
                className: "group relative mt-3 block overflow-hidden rounded-md border border-[#C7DCFA] bg-[radial-gradient(circle_at_88%_12%,rgba(120,202,255,0.32),transparent_30%),radial-gradient(circle_at_8%_100%,rgba(113,160,255,0.2),transparent_33%),linear-gradient(135deg,#F9FCFF,#EAF3FF)] px-5 py-4 transition-colors duration-200 hover:border-[#91BCF4] hover:bg-[#E7F2FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "aria-hidden": true,
                        className: "absolute -end-5 -top-6 h-24 w-24 rounded-full border border-white/70 bg-white/35"
                    }, void 0, false, {
                        fileName: "[project]/components/feed/DocumentsListCard.tsx",
                        lineNumber: 143,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "aria-hidden": true,
                        className: "absolute -bottom-9 -start-7 h-20 w-20 rounded-full border border-[#A9CCFA]/45"
                    }, void 0, false, {
                        fileName: "[project]/components/feed/DocumentsListCard.tsx",
                        lineNumber: 144,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "relative block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block text-[19px] font-semibold leading-6 tracking-[-0.02em] text-[#101724]",
                                children: emptySearchCta.title
                            }, void 0, false, {
                                fileName: "[project]/components/feed/DocumentsListCard.tsx",
                                lineNumber: 146,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mt-1 block text-[13px] font-medium leading-5 text-[#527197]",
                                children: emptySearchCta.description
                            }, void 0, false, {
                                fileName: "[project]/components/feed/DocumentsListCard.tsx",
                                lineNumber: 147,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/DocumentsListCard.tsx",
                        lineNumber: 145,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "relative mt-4 block text-[12px] font-bold text-[#2378E8]",
                        children: emptySearchCta.action
                    }, void 0, false, {
                        fileName: "[project]/components/feed/DocumentsListCard.tsx",
                        lineNumber: 149,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/DocumentsListCard.tsx",
                lineNumber: 138,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3 rounded-[4px] border border-slate-200 bg-white px-4 py-5 text-xs leading-5 text-slate-500",
                role: "status",
                children: emptyText
            }, void 0, false, {
                fileName: "[project]/components/feed/DocumentsListCard.tsx",
                lineNumber: 152,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "mt-2 space-y-1.5",
                children: documents.map((item)=>{
                    const typeLabel = getTypeLabel(item.type, isRTL);
                    const isTitleRTL = item.language === 'arabic' || !item.language && /[\u0600-\u06FF]/.test(item.title);
                    const price = getPriceLabel(item, isRTL);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "min-w-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: item.href,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            "aria-label": "".concat(item.title, " — ").concat(openInNewTabLabel),
                            className: "group block min-w-0 overflow-hidden rounded-[4px] border border-slate-200 bg-white transition-colors duration-200 hover:border-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "relative block min-h-[84px] overflow-hidden bg-[#071426] bg-[url('/images/test2.png')] bg-[length:120%_auto] bg-[85%_100%] px-3.5 py-3 text-white",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "relative flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$KnowledgeTypeIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    type: item.type,
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/DocumentsListCard.tsx",
                                                    lineNumber: 174,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "rounded-full bg-blue-300/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-blue-100/75 ring-1 ring-inset ring-blue-200/15",
                                                    children: typeLabel
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/DocumentsListCard.tsx",
                                                    lineNumber: 175,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/feed/DocumentsListCard.tsx",
                                            lineNumber: 173,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "relative mt-2 line-clamp-2 block overflow-hidden break-words text-[13px] font-bold leading-[1.45] text-white transition-colors group-hover:text-blue-200 ".concat(isTitleRTL ? 'text-right' : 'text-left'),
                                            dir: isTitleRTL ? 'rtl' : 'ltr',
                                            children: item.title
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/DocumentsListCard.tsx",
                                            lineNumber: 179,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/feed/DocumentsListCard.tsx",
                                    lineNumber: 172,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex min-h-9 items-center justify-between gap-2 border-t border-slate-100 px-3 py-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex min-w-0 items-center gap-2",
                                            children: item.publisher ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full border border-blue-300 bg-blue-50 text-[7px] font-bold text-blue-700",
                                                        children: item.publisher.avatarUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: item.publisher.avatarUrl,
                                                            alt: "",
                                                            className: "h-full w-full object-cover object-top"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/feed/DocumentsListCard.tsx",
                                                            lineNumber: 193,
                                                            columnNumber: 31
                                                        }, this) : getInitials(item.publisher.name)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/DocumentsListCard.tsx",
                                                        lineNumber: 191,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "truncate text-[10px] font-semibold text-slate-700",
                                                        children: item.publisher.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/DocumentsListCard.tsx",
                                                        lineNumber: 198,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true) : null
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/DocumentsListCard.tsx",
                                            lineNumber: 188,
                                            columnNumber: 21
                                        }, this),
                                        price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold ".concat(price.isFree ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'),
                                            dir: "ltr",
                                            children: price.label
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/DocumentsListCard.tsx",
                                            lineNumber: 206,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/feed/DocumentsListCard.tsx",
                                    lineNumber: 187,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/DocumentsListCard.tsx",
                            lineNumber: 165,
                            columnNumber: 17
                        }, this)
                    }, item.id, false, {
                        fileName: "[project]/components/feed/DocumentsListCard.tsx",
                        lineNumber: 164,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/feed/DocumentsListCard.tsx",
                lineNumber: 157,
                columnNumber: 9
            }, this),
            !showEmptySearchCta && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: viewAllHref,
                    "aria-label": "".concat(viewAllLabel, " — ").concat(viewAllDescription),
                    className: "group flex min-h-[52px] w-full items-center justify-between gap-3 rounded-md border border-slate-200 bg-white px-3.5 py-2.5 text-start shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-all duration-200 hover:-translate-y-px hover:border-blue-200 hover:bg-blue-50/40 hover:shadow-[0_4px_12px_rgba(35,120,232,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "block text-[11px] font-bold leading-4 text-slate-800",
                                    children: viewAllLabel
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/DocumentsListCard.tsx",
                                    lineNumber: 228,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "block truncate text-[10px] font-medium leading-4 text-slate-500",
                                    children: viewAllDescription
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/DocumentsListCard.tsx",
                                    lineNumber: 231,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/DocumentsListCard.tsx",
                            lineNumber: 227,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EAF3FF] text-[#2378E8] transition-colors duration-200 group-hover:bg-[#2378E8] group-hover:text-white",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowRight$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowRight$3e$__["IconArrowRight"], {
                                "aria-hidden": true,
                                className: "h-3.5 w-3.5 ".concat(isRTL ? 'rotate-180' : ''),
                                stroke: 2.1
                            }, void 0, false, {
                                fileName: "[project]/components/feed/DocumentsListCard.tsx",
                                lineNumber: 234,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/feed/DocumentsListCard.tsx",
                            lineNumber: 233,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/feed/DocumentsListCard.tsx",
                    lineNumber: 222,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/feed/DocumentsListCard.tsx",
                lineNumber: 221,
                columnNumber: 31
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/DocumentsListCard.tsx",
        lineNumber: 127,
        columnNumber: 5
    }, this);
}
_c1 = DocumentsListCard;
var _c, _c1;
__turbopack_context__.k.register(_c, "LoadingList");
__turbopack_context__.k.register(_c1, "DocumentsListCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/feed/TopDocumentsCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TopDocumentsCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$knowledgs$2f$usePopularKnowledge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/knowledgs/usePopularKnowledge.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$DocumentsListCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/DocumentsListCard.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const VISIBLE_DOCUMENTS = 3;
function TopDocumentsCard(param) {
    let { locale, className } = param;
    _s();
    const isRTL = locale === 'ar';
    const { data, isLoading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$knowledgs$2f$usePopularKnowledge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePopularKnowledge"])();
    const copy = isRTL ? {
        title: 'أفضل الرؤى',
        unavailable: 'المستندات غير متاحة حالياً.',
        empty: 'لا توجد مستندات منشورة حالياً.',
        openInNewTab: 'فتح في علامة تبويب جديدة',
        viewAll: 'عرض الكل',
        viewAllDescription: 'البحث المتقدم عن المستندات'
    } : {
        title: 'Top Insights',
        unavailable: 'Documents are unavailable right now.',
        empty: 'No documents have been published yet.',
        openInNewTab: 'Open in a new tab',
        viewAll: 'View all',
        viewAllDescription: 'Advanced documents search'
    };
    const documents = data.slice(0, VISIBLE_DOCUMENTS).map((item)=>{
        var _item_insighter_company, _item_insighter_company1;
        return {
            id: "".concat(item.type, "-").concat(item.slug),
            href: "/".concat(locale, "/knowledge/").concat(item.type, "/").concat(item.slug),
            type: item.type,
            title: item.title,
            language: item.language,
            publisher: {
                name: ((_item_insighter_company = item.insighter.company) === null || _item_insighter_company === void 0 ? void 0 : _item_insighter_company.legal_name) || item.insighter.name,
                avatarUrl: ((_item_insighter_company1 = item.insighter.company) === null || _item_insighter_company1 === void 0 ? void 0 : _item_insighter_company1.logo) || item.insighter.profile_photo_url
            },
            price: item.total_price,
            paidStatus: item.paid_status
        };
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$DocumentsListCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        locale: locale,
        title: copy.title,
        documents: documents,
        isLoading: isLoading,
        hasError: Boolean(error),
        emptyText: copy.empty,
        unavailableText: copy.unavailable,
        openInNewTabLabel: copy.openInNewTab,
        viewAllHref: "/".concat(locale, "/home"),
        viewAllLabel: copy.viewAll,
        viewAllDescription: copy.viewAllDescription,
        className: className
    }, void 0, false, {
        fileName: "[project]/components/feed/TopDocumentsCard.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_s(TopDocumentsCard, "bk/15c53CBCM31tB6/us+KbjfPw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$knowledgs$2f$usePopularKnowledge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePopularKnowledge"]
    ];
});
_c = TopDocumentsCard;
var _c;
__turbopack_context__.k.register(_c, "TopDocumentsCard");
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
"[project]/app/utils/textUtils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Strong right-to-left Arabic letters. Arabic punctuation, numbers, emoji,
// hashtags and formatting marks are deliberately excluded because they do not
// establish the reading direction of a sentence.
__turbopack_context__.s([
    "isFirstWordArabic",
    ()=>isFirstWordArabic
]);
const arabicStrongCharacter = /[\u0620-\u063F\u0641-\u064A\u066E-\u066F\u0671-\u06D3\u06D5\u06EE-\u06EF\u06FA-\u06FC\u06FF]/;
const latinStrongCharacter = /[A-Za-z]/;
function isFirstWordArabic(text) {
    if (!text || typeof text !== 'string') {
        return false;
    }
    // Content can arrive as rich text. Remove markup/entities before looking for
    // direction so `<strong>🌟 مرحباً</strong>` behaves like its visible text.
    const visibleText = text.replace(/<[^>]*>/g, ' ').replace(/&(?:#\d+|#x[\da-f]+|[a-z]+);/gi, ' ');
    for(let index = 0; index < visibleText.length; index += 1){
        const character = visibleText.charAt(index);
        if (arabicStrongCharacter.test(character)) return true;
        if (latinStrongCharacter.test(character)) return false;
    }
    return false;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/feed/PublishAsSelector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PublishAsSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuilding$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuilding$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBuilding.mjs [app-client] (ecmascript) <export default as IconBuilding>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCheck.mjs [app-client] (ecmascript) <export default as IconCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconUserCircle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconUserCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconUserCircle.mjs [app-client] (ecmascript) <export default as IconUserCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
'use client';
;
;
;
function initials(name) {
    return name.split(' ').filter(Boolean).slice(0, 2).map((part)=>part[0]).join('').toUpperCase();
}
function Avatar(param) {
    let { src, name, size = 'large' } = param;
    const sizing = size === 'large' ? 'h-16 w-16 text-[17px]' : 'h-7 w-7 text-[9px]';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E7F0FD] font-bold text-[#2378E8] ".concat(sizing),
        children: src ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: src,
            alt: name,
            width: 64,
            height: 64,
            unoptimized: true,
            className: "h-full w-full object-cover object-top"
        }, void 0, false, {
            fileName: "[project]/components/feed/PublishAsSelector.tsx",
            lineNumber: 33,
            columnNumber: 14
        }, this) : initials(name) || 'I'
    }, void 0, false, {
        fileName: "[project]/components/feed/PublishAsSelector.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_c = Avatar;
function PublishAsSelector(param) {
    let { locale, companyName, companyLogo, insighterName, insighterPhoto, value, onChange } = param;
    const isArabic = locale === 'ar';
    const copy = isArabic ? {
        legend: 'اختر الهوية التي ستظهر على المنشور',
        company: 'النشر باسم الشركة',
        insighter: 'النشر باسم المستشار',
        companyHint: 'سيظهر شعار الشركة كهوية رئيسية.',
        insighterHint: 'سيظهر ملفك الشخصي كهوية رئيسية.'
    } : {
        legend: 'Choose the identity that will appear on this publication',
        company: 'Post as company',
        insighter: 'Post as Insighter',
        companyHint: 'The company logo will be the primary identity.',
        insighterHint: 'Your expert profile will be the primary identity.'
    };
    const options = [
        {
            type: 'company',
            label: copy.company,
            hint: copy.companyHint
        },
        {
            type: 'insighter',
            label: copy.insighter,
            hint: copy.insighterHint
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                className: "sr-only",
                children: copy.legend
            }, void 0, false, {
                fileName: "[project]/components/feed/PublishAsSelector.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[13px] leading-5 text-[#66758B]",
                children: copy.legend
            }, void 0, false, {
                fileName: "[project]/components/feed/PublishAsSelector.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 grid gap-3 sm:grid-cols-2",
                role: "radiogroup",
                "aria-label": copy.legend,
                children: options.map((option)=>{
                    const selected = value === option.type;
                    const isCompany = option.type === 'company';
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        role: "radio",
                        "aria-checked": selected,
                        onClick: ()=>onChange(option.type),
                        className: "relative min-h-[210px] rounded-xl border p-5 text-start transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2 ".concat(selected ? 'border-[#2378E8] bg-[#F5F9FF] shadow-[0_8px_24px_rgba(35,120,232,0.12)]' : 'border-[#D9E3EF] bg-white hover:-translate-y-0.5 hover:border-[#9DBFE8] hover:shadow-[0_8px_20px_rgba(29,48,75,0.08)]'),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute end-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border ".concat(selected ? 'border-[#2378E8] bg-[#2378E8] text-white' : 'border-[#C6D2E1] bg-white text-transparent'),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                                    "aria-hidden": true,
                                    className: "h-3.5 w-3.5",
                                    stroke: 2.5
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/PublishAsSelector.tsx",
                                    lineNumber: 92,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/feed/PublishAsSelector.tsx",
                                lineNumber: 91,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-1.5 rounded-full bg-[#EDF4FD] px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#2378E8]",
                                children: [
                                    isCompany ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuilding$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuilding$3e$__["IconBuilding"], {
                                        "aria-hidden": true,
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/PublishAsSelector.tsx",
                                        lineNumber: 96,
                                        columnNumber: 30
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconUserCircle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconUserCircle$3e$__["IconUserCircle"], {
                                        "aria-hidden": true,
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/PublishAsSelector.tsx",
                                        lineNumber: 96,
                                        columnNumber: 85
                                    }, this),
                                    isCompany ? isArabic ? 'شركة' : 'Company' : isArabic ? 'مستشار' : 'Insighter'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/PublishAsSelector.tsx",
                                lineNumber: 95,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mt-5 flex min-h-[72px] items-center gap-3",
                                children: [
                                    isCompany ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-16 w-16 shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-[#DCE5EF] bg-white p-2 text-[#2378E8]",
                                            children: companyLogo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                src: companyLogo,
                                                alt: companyName,
                                                width: 64,
                                                height: 64,
                                                unoptimized: true,
                                                className: "h-full w-full rounded-full object-cover"
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/PublishAsSelector.tsx",
                                                lineNumber: 104,
                                                columnNumber: 38
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuilding$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuilding$3e$__["IconBuilding"], {
                                                "aria-hidden": true,
                                                className: "h-7 w-7",
                                                stroke: 1.6
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/PublishAsSelector.tsx",
                                                lineNumber: 104,
                                                columnNumber: 173
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/PublishAsSelector.tsx",
                                            lineNumber: 103,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/PublishAsSelector.tsx",
                                        lineNumber: 102,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Avatar, {
                                        src: insighterPhoto,
                                        name: insighterName
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/PublishAsSelector.tsx",
                                        lineNumber: 108,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "min-w-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            className: "block line-clamp-2 text-[15px] leading-5 text-[#172236]",
                                            children: isCompany ? companyName : insighterName
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/PublishAsSelector.tsx",
                                            lineNumber: 111,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/PublishAsSelector.tsx",
                                        lineNumber: 110,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/PublishAsSelector.tsx",
                                lineNumber: 100,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mt-4 block text-[11.5px] leading-5 text-[#7A899D]",
                                children: option.hint
                            }, void 0, false, {
                                fileName: "[project]/components/feed/PublishAsSelector.tsx",
                                lineNumber: 117,
                                columnNumber: 15
                            }, this)
                        ]
                    }, option.type, true, {
                        fileName: "[project]/components/feed/PublishAsSelector.tsx",
                        lineNumber: 79,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/feed/PublishAsSelector.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/PublishAsSelector.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
_c1 = PublishAsSelector;
var _c, _c1;
__turbopack_context__.k.register(_c, "Avatar");
__turbopack_context__.k.register(_c1, "PublishAsSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/feed/post/IndustrySelectModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "collectLeafGroups",
    ()=>collectLeafGroups,
    "default",
    ()=>IndustrySelectModal,
    "fetchIndustryTree",
    ()=>fetchIndustryTree
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Modal/Modal.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const copyByLocale = {
    en: {
        title: 'Select industry',
        search: 'Search industries…',
        loading: 'Loading industries…',
        empty: 'No industries match your search.',
        error: 'Could not load industries.',
        retry: 'Try again',
        close: 'Close industry selection'
    },
    ar: {
        title: 'اختر المجال',
        search: 'ابحث في المجالات…',
        loading: 'جارٍ تحميل المجالات…',
        empty: 'لا توجد مجالات مطابقة لبحثك.',
        error: 'تعذر تحميل المجالات.',
        retry: 'حاول مرة أخرى',
        close: 'إغلاق اختيار المجال'
    }
};
// Module-level cache: the industry tree rarely changes within a session
const industriesCache = {};
// De-dupe concurrent callers (e.g. IndustryField + IndustrySelectModal open at once)
const pendingFetches = {};
// A stalled connection never rejects on its own, so without a timeout the
// caller's loading state can hang forever. Bound every attempt so it always
// settles and the UI can fall back to a retryable error state.
const FETCH_TIMEOUT_MS = 12000;
async function fetchIndustryTree(locale) {
    if (industriesCache[locale]) return industriesCache[locale];
    if (pendingFetches[locale]) return pendingFetches[locale];
    const controller = new AbortController();
    const timeoutId = setTimeout(()=>controller.abort(), FETCH_TIMEOUT_MS);
    const request = fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/common/setting/industry/tree'), {
        signal: controller.signal,
        headers: {
            Accept: 'application/json',
            'Accept-Language': locale,
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
        }
    }).then(async (response)=>{
        if (!response.ok) throw new Error('Failed to fetch industries');
        const data = await response.json();
        industriesCache[locale] = data !== null && data !== void 0 ? data : [];
        return industriesCache[locale];
    }).finally(()=>{
        clearTimeout(timeoutId);
        delete pendingFetches[locale];
    });
    pendingFetches[locale] = request;
    return request;
}
// Single-select radio indicator shown at the start of every selectable row.
function RadioDot(param) {
    let { checked } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        "aria-hidden": true,
        className: "me-2.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-colors ".concat(checked ? 'border-[#1D74E0]' : 'border-[#C2CEDE]'),
        children: checked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "h-2 w-2 rounded-full bg-[#1D74E0]"
        }, void 0, false, {
            fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
            lineNumber: 97,
            columnNumber: 18
        }, this) : null
    }, void 0, false, {
        fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, this);
}
_c = RadioDot;
function collectLeafGroups(nodes) {
    const groups = [];
    const collectLeaves = (node)=>node.children.length === 0 ? [
            node
        ] : node.children.flatMap(collectLeaves);
    // The parent (top-level node) is itself selectable, so it is not injected as a
    // child here. A parent with no descendants simply yields an empty child list
    // and is picked via its own header row.
    for (const parent of nodes){
        const children = parent.children.flatMap(collectLeaves);
        groups.push({
            parentKey: parent.key,
            parentLabel: parent.label,
            children
        });
    }
    return groups;
}
function IndustrySelectModal(param) {
    let { locale, opened, selectedId, onClose, onSelect } = param;
    _s();
    const copy = copyByLocale[locale === 'ar' ? 'ar' : 'en'];
    const [groups, setGroups] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasError, setHasError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [retryToken, setRetryToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "IndustrySelectModal.useEffect": ()=>{
            if (!opened) return;
            let cancelled = false;
            setSearchTerm('');
            setIsLoading(true);
            setHasError(false);
            fetchIndustryTree(locale).then({
                "IndustrySelectModal.useEffect": (tree)=>{
                    if (!cancelled) setGroups(collectLeafGroups(tree));
                }
            }["IndustrySelectModal.useEffect"]).catch({
                "IndustrySelectModal.useEffect": ()=>{
                    if (!cancelled) {
                        setGroups([]);
                        setHasError(true);
                    }
                }
            }["IndustrySelectModal.useEffect"]).finally({
                "IndustrySelectModal.useEffect": ()=>{
                    if (!cancelled) setIsLoading(false);
                }
            }["IndustrySelectModal.useEffect"]);
            return ({
                "IndustrySelectModal.useEffect": ()=>{
                    cancelled = true;
                }
            })["IndustrySelectModal.useEffect"];
        }
    }["IndustrySelectModal.useEffect"], [
        opened,
        locale,
        retryToken
    ]);
    const filteredGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "IndustrySelectModal.useMemo[filteredGroups]": ()=>{
            const query = searchTerm.trim().toLowerCase();
            if (query === '') return groups;
            return groups.map({
                "IndustrySelectModal.useMemo[filteredGroups]": (group)=>{
                    // When the parent itself matches, keep all its children so the whole
                    // group stays pickable; otherwise narrow to the matching children.
                    if (group.parentLabel.toLowerCase().includes(query)) return group;
                    return {
                        ...group,
                        children: group.children.filter({
                            "IndustrySelectModal.useMemo[filteredGroups]": (child)=>child.label.toLowerCase().includes(query)
                        }["IndustrySelectModal.useMemo[filteredGroups]"])
                    };
                }
            }["IndustrySelectModal.useMemo[filteredGroups]"]).filter({
                "IndustrySelectModal.useMemo[filteredGroups]": (group)=>group.parentLabel.toLowerCase().includes(query) || group.children.length > 0
            }["IndustrySelectModal.useMemo[filteredGroups]"]);
        }
    }["IndustrySelectModal.useMemo[filteredGroups]"], [
        groups,
        searchTerm
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
        opened: opened,
        onClose: onClose,
        title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[16px] font-bold text-[#0B1220]",
            children: copy.title
        }, void 0, false, {
            fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
            lineNumber: 185,
            columnNumber: 14
        }, void 0),
        size: "md",
        radius: 8,
        centered: true,
        zIndex: 310,
        closeButtonProps: {
            'aria-label': copy.close,
            className: 'focus-visible:!outline-[1px] focus-visible:!outline-offset-1 focus-visible:!outline-[#B7D2F4]'
        },
        styles: {
            content: {
                boxShadow: 'none',
                border: '1px solid #DCE4EF'
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "industry-search",
                        className: "sr-only",
                        children: copy.search
                    }, void 0, false, {
                        fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                        lineNumber: 200,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "industry-search",
                        name: "industry-search",
                        type: "text",
                        value: searchTerm,
                        onChange: (event)=>setSearchTerm(event.currentTarget.value),
                        placeholder: copy.search,
                        className: "h-10 w-full rounded-md border border-[#D6E0EC] bg-white px-3 text-[16px] sm:text-[13.5px] text-[#1C2433] transition-colors placeholder:text-[#94A3B8] focus-visible:border-[#8FB9EA] focus-visible:outline-none"
                    }, void 0, false, {
                        fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-[420px] overscroll-contain overflow-y-auto pe-1",
                "aria-busy": isLoading,
                children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    role: "status",
                    className: "py-8 text-center text-[13px] text-[#64748B]",
                    children: copy.loading
                }, void 0, false, {
                    fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                    lineNumber: 217,
                    columnNumber: 11
                }, this) : hasError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center gap-3 py-8 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[13px] text-[#94A3B8]",
                            children: copy.error
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                            lineNumber: 222,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setRetryToken((previous)=>previous + 1),
                            className: "rounded-md border border-[#D6E0EC] px-4 py-1.5 text-[13px] font-medium text-[#1D74E0] transition-colors hover:bg-[#F3F6FB] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]",
                            children: copy.retry
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                            lineNumber: 223,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                    lineNumber: 221,
                    columnNumber: 11
                }, this) : filteredGroups.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "py-8 text-center text-[13px] text-[#94A3B8]",
                    children: copy.empty
                }, void 0, false, {
                    fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                    lineNumber: 232,
                    columnNumber: 11
                }, this) : filteredGroups.map((group)=>{
                    const isParentSelected = group.parentKey === selectedId;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        "aria-labelledby": "industry-group-".concat(group.parentKey),
                        className: "mb-4 overflow-hidden rounded-md border border-[#E1E8F1] bg-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                id: "industry-group-".concat(group.parentKey),
                                className: "m-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    "aria-pressed": isParentSelected,
                                    onClick: ()=>onSelect({
                                            id: group.parentKey,
                                            name: group.parentLabel
                                        }),
                                    className: "flex w-full items-center px-3 py-2.5 text-start text-[12px] font-bold transition-colors focus-visible:outline-[1px] focus-visible:outline-offset-[-1px] focus-visible:outline-[#B7D2F4] ".concat(group.children.length > 0 ? 'border-b' : '', " ").concat(isParentSelected ? 'border-[#CBE0F8] bg-[#EAF3FE] text-[#1D5FAD]' : 'border-[#DCE6F2] bg-[#F3F7FC] text-[#2168B5] hover:bg-[#EAF1FA]'),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioDot, {
                                            checked: isParentSelected
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                                            lineNumber: 255,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "min-w-0 truncate",
                                            children: group.parentLabel
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                                            lineNumber: 256,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                                    lineNumber: 243,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                                lineNumber: 242,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                children: group.children.map((child)=>{
                                    const isSelected = child.key === selectedId;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "border-b border-[#E8EDF4] last:border-b-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            "aria-pressed": isSelected,
                                            onClick: ()=>onSelect({
                                                    id: child.key,
                                                    name: child.label,
                                                    parentName: group.parentLabel
                                                }),
                                            className: "flex min-h-12 w-full items-center px-3 py-2.5 text-start text-[13.5px] transition-colors focus-visible:outline-[1px] focus-visible:outline-offset-[-1px] focus-visible:outline-[#B7D2F4] ".concat(isSelected ? 'bg-[#EAF3FE] font-semibold text-[#1D5FAD]' : 'text-[#1C2433] hover:bg-[#F8FAFD]'),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioDot, {
                                                    checked: isSelected
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                                                    lineNumber: 276,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "min-w-0 truncate",
                                                    children: child.label
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                                                    lineNumber: 277,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                                            lineNumber: 264,
                                            columnNumber: 23
                                        }, this)
                                    }, child.key, false, {
                                        fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                                        lineNumber: 263,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                                lineNumber: 259,
                                columnNumber: 15
                            }, this)
                        ]
                    }, group.parentKey, true, {
                        fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                        lineNumber: 237,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                lineNumber: 215,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
        lineNumber: 182,
        columnNumber: 5
    }, this);
}
_s(IndustrySelectModal, "GrukGMDTbctAzqgsZy8uzxC6NN8=");
_c1 = IndustrySelectModal;
var _c, _c1;
__turbopack_context__.k.register(_c, "RadioDot");
__turbopack_context__.k.register(_c1, "IndustrySelectModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/feed/post/IndustryField.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>IndustryField
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronDown$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconChevronDown.mjs [app-client] (ecmascript) <export default as IconChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconHash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconHash$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconHash.mjs [app-client] (ecmascript) <export default as IconHash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$IndustrySelectModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/post/IndustrySelectModal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const copyByLocale = {
    en: {
        label: 'Industry',
        placeholder: 'Select an industry'
    },
    ar: {
        label: 'المجال',
        placeholder: 'اختر المجال'
    }
};
function IndustryField(param) {
    let { locale, value, invalid, errorId, buttonRef, onSelect, onBlur } = param;
    _s();
    const copy = copyByLocale[locale === 'ar' ? 'ar' : 'en'];
    const [modalOpened, setModalOpened] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    var _value_name, _value_id;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: "feed-post-industry-field",
                className: "mb-1.5 block text-[13px] font-semibold text-[#0B1220]",
                children: copy.label
            }, void 0, false, {
                fileName: "[project]/components/feed/post/IndustryField.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                id: "feed-post-industry-field",
                ref: buttonRef,
                type: "button",
                onClick: ()=>setModalOpened(true),
                onBlur: ()=>{
                    if (!modalOpened) onBlur === null || onBlur === void 0 ? void 0 : onBlur();
                },
                "aria-haspopup": "dialog",
                "aria-expanded": modalOpened,
                "aria-invalid": invalid || undefined,
                "aria-describedby": invalid ? errorId : undefined,
                className: "flex min-h-11 w-full items-center gap-2 rounded-md border bg-white px-3 py-2 text-[14px] transition-colors focus-visible:outline-none ".concat(invalid ? 'border-[#C23B32] bg-[#FFF8F7]' : 'border-[#D6E0EC] focus-visible:border-[#8FB9EA]'),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconHash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconHash$3e$__["IconHash"], {
                        "aria-hidden": true,
                        className: "h-4 w-4 shrink-0 text-[#1D74E0]",
                        stroke: 2
                    }, void 0, false, {
                        fileName: "[project]/components/feed/post/IndustryField.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "min-w-0 flex-1 truncate text-start ".concat(value ? 'font-medium text-[#1C2433]' : 'text-[#94A3B8]'),
                        children: (_value_name = value === null || value === void 0 ? void 0 : value.name) !== null && _value_name !== void 0 ? _value_name : copy.placeholder
                    }, void 0, false, {
                        fileName: "[project]/components/feed/post/IndustryField.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronDown$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronDown$3e$__["IconChevronDown"], {
                        "aria-hidden": true,
                        className: "h-4 w-4 shrink-0 text-[#5A6B84]",
                        stroke: 2
                    }, void 0, false, {
                        fileName: "[project]/components/feed/post/IndustryField.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/post/IndustryField.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$IndustrySelectModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                locale: locale,
                opened: modalOpened,
                selectedId: (_value_id = value === null || value === void 0 ? void 0 : value.id) !== null && _value_id !== void 0 ? _value_id : null,
                onClose: ()=>{
                    setModalOpened(false);
                    onBlur === null || onBlur === void 0 ? void 0 : onBlur();
                },
                onSelect: (option)=>{
                    onSelect(option);
                    setModalOpened(false);
                }
            }, void 0, false, {
                fileName: "[project]/components/feed/post/IndustryField.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/post/IndustryField.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_s(IndustryField, "iwZOD6wNkiFilUetpmRtQ7KRanQ=");
_c = IndustryField;
var _c;
__turbopack_context__.k.register(_c, "IndustryField");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/feed/post/imageExport.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MAX_IMAGE_BYTES",
    ()=>MAX_IMAGE_BYTES,
    "MAX_VIDEO_BYTES",
    ()=>MAX_VIDEO_BYTES,
    "encodeCroppedImage",
    ()=>encodeCroppedImage
]);
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_VIDEO_BYTES = 5 * 1024 * 1024 * 1024;
function toBlob(canvas, type, quality) {
    return new Promise((resolve, reject)=>{
        canvas.toBlob((blob)=>blob ? resolve(blob) : reject(new Error('Image encoding failed')), type, quality);
    });
}
async function encodeCroppedImage(canvas, file) {
    const type = [
        'image/jpeg',
        'image/png',
        'image/webp'
    ].includes(file.type) ? file.type : 'image/jpeg';
    const qualities = type === 'image/png' ? [
        undefined
    ] : [
        0.92,
        0.85,
        0.75
    ];
    let output = canvas;
    for(let attempt = 0; attempt < 8; attempt += 1){
        for (const quality of qualities){
            const blob = await toBlob(output, type, quality);
            if (blob.size <= MAX_IMAGE_BYTES) {
                const extension = type === 'image/png' ? 'png' : type === 'image/webp' ? 'webp' : 'jpg';
                const name = "".concat(file.name.replace(/\.[^.]+$/, ''), ".").concat(extension);
                return new File([
                    blob
                ], name, {
                    type: blob.type,
                    lastModified: Date.now()
                });
            }
        }
        const smaller = document.createElement('canvas');
        smaller.width = Math.max(1, Math.floor(output.width * 0.8));
        smaller.height = Math.max(1, Math.floor(output.height * 0.8));
        const context = smaller.getContext('2d');
        if (!context) throw new Error('Image resizing failed');
        context.drawImage(canvas, 0, 0, smaller.width, smaller.height);
        output = smaller;
    }
    throw new Error('Unable to fit the cropped image within 5 MB');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/feed/post/ImageCropEditor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ImageCropEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Modal/Modal.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFlipHorizontal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFlipHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconFlipHorizontal.mjs [app-client] (ecmascript) <export default as IconFlipHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFlipVertical$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFlipVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconFlipVertical.mjs [app-client] (ecmascript) <export default as IconFlipVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconRotate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconRotate$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconRotate.mjs [app-client] (ecmascript) <export default as IconRotate>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconRotateClockwise$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconRotateClockwise$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconRotateClockwise.mjs [app-client] (ecmascript) <export default as IconRotateClockwise>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconX.mjs [app-client] (ecmascript) <export default as IconX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$imageExport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/post/imageExport.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const aspectRatios = [
    {
        id: 'original',
        label: 'Original',
        value: null
    },
    {
        id: 'square',
        label: 'Square',
        value: 1
    },
    {
        id: '4:1',
        label: '4:1',
        value: 4
    },
    {
        id: '3:4',
        label: '3:4',
        value: 3 / 4
    },
    {
        id: '16:9',
        label: '16:9',
        value: 16 / 9
    }
];
const copyByLocale = {
    en: {
        title: 'Crop image',
        close: 'Close image editor',
        crop: 'Crop',
        imageCount: (position, total)=>"Image ".concat(position, " of ").concat(total),
        rotateLeft: 'Rotate left',
        rotateRight: 'Rotate right',
        flipHorizontal: 'Flip horizontally',
        flipVertical: 'Flip vertically',
        aspectRatio: 'Aspect ratio',
        zoom: 'Zoom',
        straighten: 'Straighten',
        apply: 'Apply',
        applying: 'Applying…',
        dragHint: 'Drag the image to reposition it',
        failed: 'We could not prepare this image. Your crop is still here. Try applying it again or choose another image.',
        loadFailed: 'This image could not be opened. Close the editor and choose a valid JPG, PNG, or GIF image.',
        optimizing: 'Cropped images are automatically optimized to stay within 5 MB.'
    },
    ar: {
        title: 'اقتصاص الصورة',
        close: 'إغلاق محرر الصورة',
        crop: 'اقتصاص',
        imageCount: (position, total)=>"الصورة ".concat(position, " من ").concat(total),
        rotateLeft: 'تدوير لليسار',
        rotateRight: 'تدوير لليمين',
        flipHorizontal: 'عكس أفقي',
        flipVertical: 'عكس عمودي',
        aspectRatio: 'نسبة العرض إلى الارتفاع',
        zoom: 'تكبير',
        straighten: 'استقامة',
        apply: 'تطبيق',
        applying: 'جارٍ التطبيق…',
        dragHint: 'اسحب الصورة لتغيير موضعها',
        failed: 'تعذر تجهيز الصورة. احتفظنا بإعدادات الاقتصاص. حاول تطبيقها مجدداً أو اختر صورة أخرى.',
        loadFailed: 'تعذر فتح الصورة. أغلق المحرر واختر صورة صالحة بصيغة JPG أو PNG أو GIF.',
        optimizing: 'نحسّن الصورة بعد الاقتصاص تلقائياً ليبقى حجمها ضمن 5 ميجابايت.'
    }
};
function toRadians(degrees) {
    return degrees * Math.PI / 180;
}
function getCoverScale(image, crop, angle) {
    const radians = toRadians(angle);
    const cosine = Math.abs(Math.cos(radians));
    const sine = Math.abs(Math.sin(radians));
    const projectedWidth = crop.width * cosine + crop.height * sine;
    const projectedHeight = crop.width * sine + crop.height * cosine;
    return Math.max(projectedWidth / image.naturalWidth, projectedHeight / image.naturalHeight);
}
function clampPan(pan, image, crop, angle, zoom) {
    const radians = toRadians(angle);
    const cosine = Math.cos(radians);
    const sine = Math.sin(radians);
    const absCosine = Math.abs(cosine);
    const absSine = Math.abs(sine);
    const scale = getCoverScale(image, crop, angle) * zoom;
    const cropWidthInImageAxes = crop.width * absCosine + crop.height * absSine;
    const cropHeightInImageAxes = crop.width * absSine + crop.height * absCosine;
    const maxX = Math.max(0, (image.naturalWidth * scale - cropWidthInImageAxes) / 2);
    const maxY = Math.max(0, (image.naturalHeight * scale - cropHeightInImageAxes) / 2);
    const localX = pan.x * cosine + pan.y * sine;
    const localY = -pan.x * sine + pan.y * cosine;
    const clampedX = Math.max(-maxX, Math.min(maxX, localX));
    const clampedY = Math.max(-maxY, Math.min(maxY, localY));
    return {
        x: clampedX * cosine - clampedY * sine,
        y: clampedX * sine + clampedY * cosine
    };
}
function drawImage(context, image, crop, pan, angle, zoom, flipX, flipY, outputScale) {
    const scale = getCoverScale(image, crop, angle) * zoom * outputScale;
    context.save();
    context.translate(crop.width * outputScale / 2 + pan.x * outputScale, crop.height * outputScale / 2 + pan.y * outputScale);
    context.rotate(toRadians(angle));
    context.scale(flipX ? -scale : scale, flipY ? -scale : scale);
    context.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2);
    context.restore();
}
function ImageCropEditor(param) {
    let { file, locale, opened, position, total, onCancel, onApply } = param;
    var _aspectRatios_find;
    _s();
    const isArabic = locale === 'ar';
    const copy = copyByLocale[isArabic ? 'ar' : 'en'];
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const stageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dragRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [image, setImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [aspect, setAspect] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('original');
    const [quarterTurns, setQuarterTurns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [straighten, setStraighten] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [zoom, setZoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [flipX, setFlipX] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [flipY, setFlipY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pan, setPan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [cropSize, setCropSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        width: 640,
        height: 480
    });
    const [isApplying, setIsApplying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const angle = quarterTurns * 90 + straighten;
    const originalRatio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ImageCropEditor.useMemo[originalRatio]": ()=>{
            if (!image) return 4 / 3;
            const ratio = image.naturalWidth / image.naturalHeight;
            return Math.abs(quarterTurns) % 2 === 1 ? 1 / ratio : ratio;
        }
    }["ImageCropEditor.useMemo[originalRatio]"], [
        image,
        quarterTurns
    ]);
    var _aspectRatios_find_value;
    const selectedRatio = (_aspectRatios_find_value = (_aspectRatios_find = aspectRatios.find((item)=>item.id === aspect)) === null || _aspectRatios_find === void 0 ? void 0 : _aspectRatios_find.value) !== null && _aspectRatios_find_value !== void 0 ? _aspectRatios_find_value : originalRatio;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ImageCropEditor.useEffect": ()=>{
            if (!opened || !file) return;
            const objectUrl = URL.createObjectURL(file);
            const nextImage = new window.Image();
            nextImage.onload = ({
                "ImageCropEditor.useEffect": ()=>setImage(nextImage)
            })["ImageCropEditor.useEffect"];
            nextImage.onerror = ({
                "ImageCropEditor.useEffect": ()=>setError(copy.loadFailed)
            })["ImageCropEditor.useEffect"];
            nextImage.src = objectUrl;
            setAspect('original');
            setQuarterTurns(0);
            setStraighten(0);
            setZoom(1);
            setFlipX(false);
            setFlipY(false);
            setPan({
                x: 0,
                y: 0
            });
            setIsApplying(false);
            setError(null);
            return ({
                "ImageCropEditor.useEffect": ()=>{
                    nextImage.onload = null;
                    nextImage.onerror = null;
                    URL.revokeObjectURL(objectUrl);
                    setImage(null);
                }
            })["ImageCropEditor.useEffect"];
        }
    }["ImageCropEditor.useEffect"], [
        file,
        opened,
        copy.loadFailed
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ImageCropEditor.useEffect": ()=>{
            const stage = stageRef.current;
            if (!stage || !opened) return;
            const updateSize = {
                "ImageCropEditor.useEffect.updateSize": ()=>{
                    const bounds = stage.getBoundingClientRect();
                    const maxWidth = Math.max(180, bounds.width - 32);
                    const maxHeight = Math.max(180, bounds.height - 32);
                    if (maxWidth / maxHeight > selectedRatio) {
                        setCropSize({
                            width: maxHeight * selectedRatio,
                            height: maxHeight
                        });
                    } else {
                        setCropSize({
                            width: maxWidth,
                            height: maxWidth / selectedRatio
                        });
                    }
                }
            }["ImageCropEditor.useEffect.updateSize"];
            const observer = new ResizeObserver(updateSize);
            observer.observe(stage);
            updateSize();
            return ({
                "ImageCropEditor.useEffect": ()=>observer.disconnect()
            })["ImageCropEditor.useEffect"];
        }
    }["ImageCropEditor.useEffect"], [
        opened,
        selectedRatio
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ImageCropEditor.useEffect": ()=>{
            if (!image) return;
            setPan({
                "ImageCropEditor.useEffect": (current)=>clampPan(current, image, cropSize, angle, zoom)
            }["ImageCropEditor.useEffect"]);
        }
    }["ImageCropEditor.useEffect"], [
        angle,
        cropSize,
        image,
        zoom
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ImageCropEditor.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas || !image) return;
            const density = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.max(1, Math.round(cropSize.width * density));
            canvas.height = Math.max(1, Math.round(cropSize.height * density));
            canvas.style.width = "".concat(cropSize.width, "px");
            canvas.style.height = "".concat(cropSize.height, "px");
            const context = canvas.getContext('2d');
            if (!context) return;
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawImage(context, image, cropSize, pan, angle, zoom, flipX, flipY, density);
        }
    }["ImageCropEditor.useEffect"], [
        angle,
        cropSize,
        flipX,
        flipY,
        image,
        pan,
        zoom
    ]);
    const rotate = (direction)=>{
        setQuarterTurns((current)=>current + direction);
        setPan({
            x: 0,
            y: 0
        });
    };
    const handlePointerDown = (event)=>{
        event.currentTarget.setPointerCapture(event.pointerId);
        dragRef.current = {
            pointerId: event.pointerId,
            origin: {
                x: event.clientX,
                y: event.clientY
            },
            pan
        };
    };
    const handlePointerMove = (event)=>{
        if (!dragRef.current || dragRef.current.pointerId !== event.pointerId || !image) return;
        const nextPan = {
            x: dragRef.current.pan.x + event.clientX - dragRef.current.origin.x,
            y: dragRef.current.pan.y + event.clientY - dragRef.current.origin.y
        };
        setPan(clampPan(nextPan, image, cropSize, angle, zoom));
    };
    const stopDragging = (event)=>{
        var _dragRef_current;
        if (((_dragRef_current = dragRef.current) === null || _dragRef_current === void 0 ? void 0 : _dragRef_current.pointerId) === event.pointerId) dragRef.current = null;
    };
    const applyCrop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ImageCropEditor.useCallback[applyCrop]": async ()=>{
            if (!file || !image || isApplying) return;
            setIsApplying(true);
            setError(null);
            try {
                if (aspect === 'original' && quarterTurns === 0 && straighten === 0 && zoom === 1 && !flipX && !flipY && pan.x === 0 && pan.y === 0 && file.size <= __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$imageExport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_IMAGE_BYTES"]) {
                    if (!onApply(file)) setError(copy.failed);
                    return;
                }
                const longestSourceEdge = Math.max(image.naturalWidth, image.naturalHeight);
                const longestOutputEdge = Math.min(2048, longestSourceEdge);
                const outputWidth = selectedRatio >= 1 ? Math.max(1, Math.round(longestOutputEdge)) : Math.max(1, Math.round(longestOutputEdge * selectedRatio));
                const outputHeight = selectedRatio >= 1 ? Math.max(1, Math.round(longestOutputEdge / selectedRatio)) : Math.max(1, Math.round(longestOutputEdge));
                const output = document.createElement('canvas');
                output.width = outputWidth;
                output.height = outputHeight;
                const context = output.getContext('2d');
                if (!context) throw new Error('Unable to prepare the cropped image');
                drawImage(context, image, cropSize, pan, angle, zoom, flipX, flipY, outputWidth / cropSize.width);
                const croppedFile = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$imageExport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeCroppedImage"])(output, file);
                if (!onApply(croppedFile)) setError(copy.failed);
            } catch (e) {
                setError(copy.failed);
            } finally{
                setIsApplying(false);
            }
        }
    }["ImageCropEditor.useCallback[applyCrop]"], [
        angle,
        aspect,
        quarterTurns,
        straighten,
        copy.failed,
        cropSize,
        file,
        flipX,
        flipY,
        image,
        isApplying,
        onApply,
        pan,
        selectedRatio,
        zoom
    ]);
    const toolButtonClass = 'flex h-10 w-10 items-center justify-center rounded-md border border-transparent text-[#344054] transition-colors hover:border-[#DCE4EF] hover:bg-[#F7F9FC] focus-visible:outline-[2px] focus-visible:outline-offset-2 focus-visible:outline-[#8FB9EA]';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
        opened: opened,
        onClose: ()=>{
            if (!isApplying) onCancel();
        },
        centered: true,
        size: "auto",
        withCloseButton: false,
        zIndex: 700,
        padding: 0,
        transitionProps: {
            transition: 'pop',
            duration: 160
        },
        overlayProps: {
            backgroundOpacity: 0.55,
            blur: 2
        },
        styles: {
            content: {
                background: '#F4F7FA',
                borderRadius: 16,
                overflow: 'hidden',
                width: 'min(1100px, 94vw)',
                maxWidth: '94vw'
            },
            body: {
                height: 'min(88dvh, 720px)',
                padding: 0,
                overflow: 'hidden'
            }
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            dir: isArabic ? 'rtl' : 'ltr',
            className: "flex h-full min-h-0 flex-col text-[#101828]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "flex h-[72px] shrink-0 items-center justify-between border-b border-[#DDE4EC] bg-white px-5 sm:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-bold sm:text-2xl",
                                    children: copy.title
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                    lineNumber: 341,
                                    columnNumber: 13
                                }, this),
                                total > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-0.5 text-xs text-[#667085]",
                                    children: copy.imageCount(position, total)
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                    lineNumber: 342,
                                    columnNumber: 27
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                            lineNumber: 340,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            "aria-label": copy.close,
                            onClick: onCancel,
                            disabled: isApplying,
                            className: toolButtonClass,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__["IconX"], {
                                "aria-hidden": true,
                                className: "h-6 w-6",
                                stroke: 1.8
                            }, void 0, false, {
                                fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                lineNumber: 345,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                            lineNumber: 344,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                    lineNumber: 339,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1fr)_390px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            ref: stageRef,
                            className: "relative flex min-h-[300px] items-center justify-center overflow-hidden bg-[#E9EEF4] lg:min-h-0",
                            children: [
                                image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative overflow-hidden rounded-sm bg-[#CBD4DF] shadow-[0_0_0_1px_rgba(16,24,40,0.08),0_16px_44px_rgba(16,24,40,0.16)]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                                            ref: canvasRef,
                                            "aria-label": copy.dragHint,
                                            role: "img",
                                            className: "block cursor-grab touch-none active:cursor-grabbing",
                                            onPointerDown: handlePointerDown,
                                            onPointerMove: handlePointerMove,
                                            onPointerUp: stopDragging,
                                            onPointerCancel: stopDragging
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                            lineNumber: 353,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            "aria-hidden": true,
                                            className: "pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-45",
                                            children: Array.from({
                                                length: 9
                                            }).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "border-[0.5px] border-white/70"
                                                }, index, false, {
                                                    fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                                    lineNumber: 365,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                            lineNumber: 363,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                    lineNumber: 352,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "absolute bottom-3 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm",
                                    children: copy.dragHint
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                    lineNumber: 370,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                            lineNumber: 350,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                            className: "flex min-h-0 flex-col border-t border-[#DDE4EC] bg-white lg:border-s lg:border-t-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-7 lg:py-7",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    "aria-label": copy.rotateLeft,
                                                    title: copy.rotateLeft,
                                                    onClick: ()=>rotate(-1),
                                                    className: toolButtonClass,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconRotate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconRotate$3e$__["IconRotate"], {
                                                        "aria-hidden": true,
                                                        className: "h-5 w-5",
                                                        stroke: 1.8
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                                        lineNumber: 379,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                                    lineNumber: 378,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    "aria-label": copy.rotateRight,
                                                    title: copy.rotateRight,
                                                    onClick: ()=>rotate(1),
                                                    className: toolButtonClass,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconRotateClockwise$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconRotateClockwise$3e$__["IconRotateClockwise"], {
                                                        "aria-hidden": true,
                                                        className: "h-5 w-5",
                                                        stroke: 1.8
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                                        lineNumber: 382,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                                    lineNumber: 381,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    "aria-label": copy.flipHorizontal,
                                                    title: copy.flipHorizontal,
                                                    onClick: ()=>setFlipX((current)=>!current),
                                                    className: "".concat(toolButtonClass, " ").concat(flipX ? 'border-[#9EC1EE] bg-[#EAF2FC] text-[#1D74E0]' : ''),
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFlipHorizontal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFlipHorizontal$3e$__["IconFlipHorizontal"], {
                                                        "aria-hidden": true,
                                                        className: "h-5 w-5",
                                                        stroke: 1.8
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                                        lineNumber: 385,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                                    lineNumber: 384,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    "aria-label": copy.flipVertical,
                                                    title: copy.flipVertical,
                                                    onClick: ()=>setFlipY((current)=>!current),
                                                    className: "".concat(toolButtonClass, " ").concat(flipY ? 'border-[#9EC1EE] bg-[#EAF2FC] text-[#1D74E0]' : ''),
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFlipVertical$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFlipVertical$3e$__["IconFlipVertical"], {
                                                        "aria-hidden": true,
                                                        className: "h-5 w-5",
                                                        stroke: 1.8
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                                        lineNumber: 388,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                                    lineNumber: 387,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                            lineNumber: 377,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                                            className: "mt-7",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                                                    className: "text-sm font-semibold text-[#475467]",
                                                    children: copy.aspectRatio
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                                    lineNumber: 393,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-3 flex flex-wrap gap-2",
                                                    children: aspectRatios.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            "aria-pressed": aspect === item.id,
                                                            onClick: ()=>{
                                                                setAspect(item.id);
                                                                setPan({
                                                                    x: 0,
                                                                    y: 0
                                                                });
                                                            },
                                                            className: "min-h-9 rounded-full border px-3.5 text-sm font-semibold transition-colors focus-visible:outline-[2px] focus-visible:outline-offset-2 focus-visible:outline-[#8FB9EA] ".concat(aspect === item.id ? 'border-[#1D74E0] bg-[#1D74E0] text-white' : 'border-[#C8D0DA] bg-white text-[#344054] hover:border-[#98A2B3]'),
                                                            children: item.id === 'original' && isArabic ? 'الأصلية' : item.id === 'square' && isArabic ? 'مربع' : item.label
                                                        }, item.id, false, {
                                                            fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                                            lineNumber: 396,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                                    lineNumber: 394,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                            lineNumber: 392,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "mt-8 block text-sm font-semibold text-[#475467]",
                                            htmlFor: "crop-zoom",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: copy.zoom
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                                            lineNumber: 414,
                                                            columnNumber: 69
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("output", {
                                                            children: [
                                                                Math.round(zoom * 100),
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                                            lineNumber: 414,
                                                            columnNumber: 93
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                                    lineNumber: 414,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "crop-zoom",
                                                    type: "range",
                                                    min: "1",
                                                    max: "3",
                                                    step: "0.01",
                                                    value: zoom,
                                                    onChange: (event)=>setZoom(Number(event.currentTarget.value)),
                                                    className: "mt-3 w-full accent-[#1D74E0]"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                                    lineNumber: 415,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                            lineNumber: 413,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "mt-8 block text-sm font-semibold text-[#475467]",
                                            htmlFor: "crop-straighten",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: copy.straighten
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                                            lineNumber: 419,
                                                            columnNumber: 69
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("output", {
                                                            children: [
                                                                straighten > 0 ? '+' : '',
                                                                straighten,
                                                                "°"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                                            lineNumber: 419,
                                                            columnNumber: 99
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                                    lineNumber: 419,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "crop-straighten",
                                                    type: "range",
                                                    min: "-45",
                                                    max: "45",
                                                    step: "1",
                                                    value: straighten,
                                                    onChange: (event)=>{
                                                        setStraighten(Number(event.currentTarget.value));
                                                        setPan({
                                                            x: 0,
                                                            y: 0
                                                        });
                                                    },
                                                    className: "mt-3 w-full accent-[#1D74E0]"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                                    lineNumber: 420,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                            lineNumber: 418,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                    lineNumber: 376,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "shrink-0 border-t border-[#E3E8EF] bg-white p-4 sm:px-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-3 text-xs leading-5 text-[#5A6B84]",
                                            children: copy.optimizing
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                            lineNumber: 425,
                                            columnNumber: 15
                                        }, this),
                                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            role: "alert",
                                            className: "mb-3 rounded-md bg-red-50 p-3 text-sm text-[#A9322B]",
                                            children: error
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                            lineNumber: 426,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            disabled: !image || isApplying,
                                            onClick: ()=>void applyCrop(),
                                            className: "min-h-11 w-full rounded-full bg-[#1D74E0] px-5 text-[15px] font-bold text-white transition-colors hover:bg-[#155CB8] focus-visible:outline-[2px] focus-visible:outline-offset-2 focus-visible:outline-[#8FB9EA] disabled:cursor-wait disabled:bg-[#93B9E8]",
                                            children: isApplying ? copy.applying : copy.apply
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                            lineNumber: 427,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                                    lineNumber: 424,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                            lineNumber: 375,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
                    lineNumber: 349,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
            lineNumber: 338,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/feed/post/ImageCropEditor.tsx",
        lineNumber: 317,
        columnNumber: 5
    }, this);
}
_s(ImageCropEditor, "vEwHbXpkNTeXTaTsoROuNxfdGuA=");
_c = ImageCropEditor;
var _c;
__turbopack_context__.k.register(_c, "ImageCropEditor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/feed/post/postContent.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "contentFingerprint",
    ()=>contentFingerprint,
    "richTextToPlainText",
    ()=>richTextToPlainText
]);
function richTextToPlainText(html) {
    if (!html) return '';
    if (typeof document === 'undefined') {
        return html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/[\s\u200B\uFEFF]+/g, ' ').trim();
    }
    const container = document.createElement('div');
    container.innerHTML = html;
    var _container_textContent;
    return ((_container_textContent = container.textContent) !== null && _container_textContent !== void 0 ? _container_textContent : '').replace(/[\s\u200B\uFEFF]+/g, ' ').trim();
}
function contentFingerprint(input) {
    return JSON.stringify([
        richTextToPlainText(input.body) ? input.body.trim() : '',
        input.industryId,
        [
            ...input.tagIds
        ].sort((a, b)=>a - b),
        [
            ...input.insightIds
        ].sort((a, b)=>a - b),
        input.imageKeys,
        input.videoFileName
    ]);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/feed/post/KnowledgeLibraryDrawer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>KnowledgeLibraryDrawer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Drawer$2f$Drawer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Drawer/Drawer.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconSearch.mjs [app-client] (ecmascript) <export default as IconSearch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconX.mjs [app-client] (ecmascript) <export default as IconX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/feed.service.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
// A post can attach at most this many knowledge items from the library.
const MAX_LIBRARY_ATTACHMENTS = 3;
// Wait this long after the last keystroke before asking the API for results.
const SEARCH_DEBOUNCE_MS = 300;
const copyByLocale = {
    en: {
        title: 'Share from your library',
        subtitle: "Attach up to ".concat(MAX_LIBRARY_ATTACHMENTS, " published knowledge items to your post."),
        loading: 'Loading your library…',
        empty: 'No published knowledge in your library yet.',
        emptyTitle: 'Start building your library',
        emptyBody: 'Publish documents, reports, or data to your library, then attach them to your posts. Any post you have started will be saved so you can return to it.',
        emptyCta: 'Save draft and add a library item',
        emptyStartCta: 'Add your first library item',
        searchLabel: 'Search your library',
        searchPlaceholder: 'Search by title…',
        clearSearch: 'Clear search',
        noResultsTitle: 'No matching knowledge',
        noResultsBody: (keyword)=>"Nothing in your library matches “".concat(keyword, "”."),
        loadMore: 'Load more',
        done: 'Done',
        selectedCount: (count)=>"".concat(count, " of ").concat(MAX_LIBRARY_ATTACHMENTS, " selected"),
        limitReached: "You can attach up to ".concat(MAX_LIBRARY_ATTACHMENTS, " items. Unselect one to choose another."),
        error: 'Unable to load your library.',
        close: 'Close library drawer'
    },
    ar: {
        title: 'شارك من مكتبتك',
        subtitle: "أرفق حتى ".concat(MAX_LIBRARY_ATTACHMENTS, " عناصر معرفة منشورة بمنشورك."),
        loading: 'جارٍ تحميل مكتبتك…',
        empty: 'لا توجد معرفة منشورة في مكتبتك بعد.',
        emptyTitle: 'ابدأ ببناء مكتبتك',
        emptyBody: 'انشر المستندات أو التقارير أو البيانات في مكتبتك، ثم أرفقها بمنشوراتك. سنحفظ المنشور الذي بدأت به لتعود إليه لاحقاً.',
        emptyCta: 'احفظ المسودة وأضف عنصراً للمكتبة',
        emptyStartCta: 'أضف أول عنصر إلى مكتبتك',
        searchLabel: 'ابحث في مكتبتك',
        searchPlaceholder: 'ابحث بالعنوان…',
        clearSearch: 'مسح البحث',
        noResultsTitle: 'لا توجد نتائج مطابقة',
        noResultsBody: (keyword)=>'لا يوجد في مكتبتك ما يطابق "'.concat(keyword, '".'),
        loadMore: 'تحميل المزيد',
        done: 'تم',
        selectedCount: (count)=>"".concat(count, " من ").concat(MAX_LIBRARY_ATTACHMENTS, " محدد"),
        limitReached: "يمكنك إرفاق حتى ".concat(MAX_LIBRARY_ATTACHMENTS, " عناصر. ألغِ تحديد أحدها لاختيار غيره."),
        error: 'تعذر تحميل مكتبتك.',
        close: 'إغلاق مكتبة المستندات'
    }
};
function KnowledgeLibraryDrawer(param) {
    let { locale, opened, isCompany, selected, onClose, onSelectionChange, onPublishNew, hasDraftContent = true } = param;
    _s();
    const isArabic = locale === 'ar';
    const copy = copyByLocale[isArabic ? 'ar' : 'en'];
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [lastPage, setLastPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [isRefreshing, setIsRefreshing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoadingMore, setIsLoadingMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loadError, setLoadError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasLoaded, setHasLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Tracks whether the *unfiltered* library is empty, so a search that returns
    // nothing shows "no matches" instead of the "start your library" CTA.
    const [isLibraryEmpty, setIsLibraryEmpty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [searchKeyword, setSearchKeyword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Only the newest request may write to state; typing fast can resolve pages
    // out of order otherwise.
    const requestIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const isLoading = isRefreshing || isLoadingMore;
    const loadPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "KnowledgeLibraryDrawer.useCallback[loadPage]": async (pageToLoad, append, keyword)=>{
            const requestId = requestIdRef.current + 1;
            requestIdRef.current = requestId;
            if (append) setIsLoadingMore(true);
            else setIsRefreshing(true);
            setLoadError(false);
            try {
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchPublishedLibraryKnowledge"])(pageToLoad, locale, isCompany, keyword);
                if (requestIdRef.current !== requestId) return;
                setItems({
                    "KnowledgeLibraryDrawer.useCallback[loadPage]": (previous)=>append ? [
                            ...previous,
                            ...result.data
                        ] : result.data
                }["KnowledgeLibraryDrawer.useCallback[loadPage]"]);
                setPage(result.meta.current_page);
                setLastPage(result.meta.last_page);
                if (!append && !keyword) setIsLibraryEmpty(result.data.length === 0);
                if (!append) setHasLoaded(true);
            } catch (e) {
                if (requestIdRef.current !== requestId) return;
                setLoadError(true);
            } finally{
                if (requestIdRef.current === requestId) {
                    setIsRefreshing(false);
                    setIsLoadingMore(false);
                }
            }
        }
    }["KnowledgeLibraryDrawer.useCallback[loadPage]"], [
        isCompany,
        locale
    ]);
    // Debounce typing into the keyword the API is actually asked for.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "KnowledgeLibraryDrawer.useEffect": ()=>{
            const timeoutId = window.setTimeout({
                "KnowledgeLibraryDrawer.useEffect.timeoutId": ()=>setSearchKeyword(query.trim())
            }["KnowledgeLibraryDrawer.useEffect.timeoutId"], SEARCH_DEBOUNCE_MS);
            return ({
                "KnowledgeLibraryDrawer.useEffect": ()=>window.clearTimeout(timeoutId)
            })["KnowledgeLibraryDrawer.useEffect"];
        }
    }["KnowledgeLibraryDrawer.useEffect"], [
        query
    ]);
    // Refresh the appropriate library each time the drawer opens, and start over
    // from page one whenever the search keyword changes. Selection is controlled
    // by the parent so every checkbox change is attached immediately.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "KnowledgeLibraryDrawer.useEffect": ()=>{
            if (!opened) return;
            loadPage(1, false, searchKeyword);
        }
    }["KnowledgeLibraryDrawer.useEffect"], [
        opened,
        searchKeyword,
        loadPage
    ]);
    // Closing resets the search so the next open starts from the full library.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "KnowledgeLibraryDrawer.useEffect": ()=>{
            if (opened) return;
            setQuery('');
            setSearchKeyword('');
            setHasLoaded(false);
        }
    }["KnowledgeLibraryDrawer.useEffect"], [
        opened
    ]);
    const toggleItem = (item)=>{
        const next = new Map(selected.map((selectedItem)=>[
                selectedItem.id,
                selectedItem
            ]));
        // Deselecting is always allowed; adding is capped at the max.
        if (!next.has(item.id) && next.size >= MAX_LIBRARY_ATTACHMENTS) return;
        if (next.has(item.id)) next.delete(item.id);
        else next.set(item.id, item);
        onSelectionChange(Array.from(next.values()));
    };
    const showEmptyLibrary = hasLoaded && !loadError && isLibraryEmpty && !searchKeyword;
    const showNoResults = hasLoaded && !loadError && !isRefreshing && items.length === 0 && searchKeyword !== '';
    // Hide the search field (and the footer) only when there is no library to
    // search through at all.
    const showSearch = hasLoaded && !loadError && !showEmptyLibrary;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Drawer$2f$Drawer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Drawer"], {
        opened: opened,
        onClose: onClose,
        position: isArabic ? 'left' : 'right',
        size: 420,
        zIndex: 310,
        closeButtonProps: {
            'aria-label': copy.close,
            className: 'focus-visible:!outline-[1px] focus-visible:!outline-offset-1 focus-visible:!outline-[#B7D2F4]'
        },
        styles: {
            content: {
                boxShadow: 'none',
                borderInlineStart: '1px solid #DCE4EF'
            },
            header: {
                borderBottom: '1px solid #E5EAF2'
            }
        },
        title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "block text-[16px] font-bold text-[#0B1220]",
                    children: copy.title
                }, void 0, false, {
                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                    lineNumber: 205,
                    columnNumber: 11
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "mt-0.5 block text-[12.5px] font-normal text-[#5A6B84]",
                    children: copy.subtitle
                }, void 0, false, {
                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                    lineNumber: 206,
                    columnNumber: 11
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
            lineNumber: 204,
            columnNumber: 9
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-[calc(100vh-120px)] flex-col",
            children: [
                showSearch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pb-3 pt-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "sr-only",
                            htmlFor: "knowledge-library-search",
                            children: copy.searchLabel
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                            lineNumber: 215,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "knowledge-library-search",
                                    type: "search",
                                    value: query,
                                    onChange: (event)=>setQuery(event.target.value),
                                    placeholder: copy.searchPlaceholder,
                                    dir: isArabic ? 'rtl' : 'ltr',
                                    className: "h-10 w-full rounded-lg border border-[#D7E1EE] bg-white px-3 text-[16px] sm:text-[13.5px] text-[#1E293B] outline-none transition-colors placeholder:text-[#94A3B8] focus:border-[#2378E8] focus:ring-2 focus:ring-[#2378E8]/15 ".concat(isArabic ? 'pl-16' : 'pr-16')
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                    lineNumber: 220,
                                    columnNumber: 15
                                }, this),
                                query.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setQuery(''),
                                    "aria-label": copy.clearSearch,
                                    className: "absolute top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-[#94A3B8] transition-colors hover:bg-[#F1F5F9] hover:text-[#475569] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] ".concat(isArabic ? 'left-9' : 'right-9'),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__["IconX"], {
                                        "aria-hidden": true,
                                        className: "h-4 w-4",
                                        stroke: 2
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                        lineNumber: 240,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                    lineNumber: 232,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__["IconSearch"], {
                                    "aria-hidden": true,
                                    className: "pointer-events-none absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#64748B] ".concat(isArabic ? 'left-3' : 'right-3'),
                                    stroke: 2
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                    lineNumber: 243,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                            lineNumber: 218,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                    lineNumber: 214,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overscroll-contain overflow-y-auto pe-1",
                    "aria-busy": isLoading,
                    children: [
                        loadError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "py-8 text-center text-[13px] text-[#94A3B8]",
                            children: copy.error
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                            lineNumber: 259,
                            columnNumber: 13
                        }, this) : showEmptyLibrary ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center px-6 py-12 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LibraryEmptyIllustration, {
                                    className: "h-28 w-28",
                                    "aria-hidden": true
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                    lineNumber: 262,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "mt-5 text-[15.5px] font-bold text-[#0B1220]",
                                    children: copy.emptyTitle
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                    lineNumber: 263,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 max-w-[19rem] text-[13px] leading-6 text-[#5A6B84]",
                                    children: copy.emptyBody
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                    lineNumber: 266,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onPublishNew,
                                    className: "mt-5 inline-flex min-h-10 items-center rounded-md bg-[#1D74E0] px-5 py-2 text-[13.5px] font-medium text-white transition-colors hover:bg-[#155CB8] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]",
                                    children: hasDraftContent ? copy.emptyCta : copy.emptyStartCta
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                    lineNumber: 269,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                            lineNumber: 261,
                            columnNumber: 13
                        }, this) : showNoResults ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center px-6 py-12 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__["IconSearch"], {
                                    "aria-hidden": true,
                                    className: "h-8 w-8 text-[#B7C6DA]",
                                    stroke: 1.6
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                    lineNumber: 279,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "mt-4 text-[14.5px] font-bold text-[#0B1220]",
                                    children: copy.noResultsTitle
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                    lineNumber: 280,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 max-w-[19rem] text-[13px] leading-6 text-[#5A6B84]",
                                    children: copy.noResultsBody(searchKeyword)
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                    lineNumber: 283,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                            lineNumber: 278,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "space-y-3 ".concat(isRefreshing ? 'opacity-50' : ''),
                            children: items.map((item)=>{
                                const isChecked = selected.some((selectedItem)=>selectedItem.id === item.id);
                                const isDisabled = !isChecked && selected.length >= MAX_LIBRARY_ATTACHMENTS;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "relative flex min-h-[116px] items-end overflow-hidden rounded-md border bg-[#061326] p-4 transition-colors focus-within:border-[#8FB9EA] ".concat(isChecked ? 'border-[#5EA5FF]' : 'border-[#18304F] hover:border-[#315C8E]', " ").concat(isDisabled ? 'cursor-not-allowed opacity-45' : 'cursor-pointer'),
                                        style: {
                                            backgroundImage: 'url("/images/test2.png")',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: isChecked,
                                                disabled: isDisabled,
                                                onChange: ()=>toggleItem(item),
                                                className: "absolute end-3 top-3 h-5 w-5 shrink-0 accent-[#2378E8] disabled:cursor-not-allowed"
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                                lineNumber: 308,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "min-w-0 flex-1 pe-7",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "mb-2 inline-flex rounded bg-[#0B2545] px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#74C0FF]",
                                                        children: item.type
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                                        lineNumber: 316,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block line-clamp-2 text-[15px] font-semibold leading-6 text-white",
                                                        children: item.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                                        lineNumber: 319,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "mt-1 block text-[11.5px] text-[#AAC5E5]",
                                                        children: item.published_at ? item.published_at.slice(0, 10) : ''
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                                        lineNumber: 322,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                                lineNumber: 315,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                        lineNumber: 295,
                                        columnNumber: 21
                                    }, this)
                                }, item.id, false, {
                                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                    lineNumber: 294,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                            lineNumber: 288,
                            columnNumber: 13
                        }, this),
                        isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            role: "status",
                            className: "py-4 text-center text-[13px] text-[#64748B]",
                            children: copy.loading
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                            lineNumber: 334,
                            columnNumber: 13
                        }, this),
                        !isLoading && !loadError && items.length > 0 && page < lastPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>loadPage(page + 1, true, searchKeyword),
                            className: "mt-3 min-h-10 w-full rounded border border-[#C9DCF6] py-2 text-[13px] font-medium text-[#1D74E0] transition-colors hover:bg-[#F3F6FB] focus-visible:border-[#8FB9EA] focus-visible:outline-none",
                            children: copy.loadMore
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                            lineNumber: 340,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                    lineNumber: 254,
                    columnNumber: 9
                }, this),
                showSearch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between border-t border-[#DCE4EF] bg-white pt-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "min-w-0 pe-3 text-[12.5px] text-[#5A6B84]",
                            children: selected.length >= MAX_LIBRARY_ATTACHMENTS ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium text-[#B26A00]",
                                children: copy.limitReached
                            }, void 0, false, {
                                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                lineNumber: 355,
                                columnNumber: 17
                            }, this) : copy.selectedCount(selected.length)
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                            lineNumber: 353,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onClose,
                            className: "min-h-10 rounded-md bg-[#1D74E0] px-5 py-2 text-[13.5px] font-medium text-white transition-colors hover:bg-[#155CB8] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]",
                            children: copy.done
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                            lineNumber: 360,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                    lineNumber: 352,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
            lineNumber: 212,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
        lineNumber: 183,
        columnNumber: 5
    }, this);
}
_s(KnowledgeLibraryDrawer, "+e6hnAiCSjxr4mhwdWoYV/87zpA=");
_c = KnowledgeLibraryDrawer;
// Stacked-documents illustration for the empty library state. Self-contained
// SVG so it stays crisp at any size and follows the feed's blue palette.
function LibraryEmptyIllustration(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 96 96",
        fill: "none",
        className: className,
        role: "img",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "48",
                cy: "48",
                r: "48",
                fill: "#EAF2FD"
            }, void 0, false, {
                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                lineNumber: 388,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "28",
                y: "24",
                width: "34",
                height: "44",
                rx: "4",
                fill: "#C9DEF9",
                transform: "rotate(-8 45 46)"
            }, void 0, false, {
                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                lineNumber: 390,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "34",
                y: "26",
                width: "34",
                height: "44",
                rx: "4",
                fill: "#fff",
                stroke: "#B7D2F4"
            }, void 0, false, {
                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                lineNumber: 400,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "40",
                y: "34",
                width: "22",
                height: "3.5",
                rx: "1.75",
                fill: "#DCE7F6"
            }, void 0, false, {
                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                lineNumber: 401,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "40",
                y: "42",
                width: "22",
                height: "3.5",
                rx: "1.75",
                fill: "#DCE7F6"
            }, void 0, false, {
                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                lineNumber: 402,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "40",
                y: "50",
                width: "14",
                height: "3.5",
                rx: "1.75",
                fill: "#DCE7F6"
            }, void 0, false, {
                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                lineNumber: 403,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "66",
                cy: "64",
                r: "12",
                fill: "#1D74E0"
            }, void 0, false, {
                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                lineNumber: 405,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M66 59v10M61 64h10",
                stroke: "#fff",
                strokeWidth: "2.5",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                lineNumber: 406,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
        lineNumber: 381,
        columnNumber: 5
    }, this);
}
_c1 = LibraryEmptyIllustration;
var _c, _c1;
__turbopack_context__.k.register(_c, "KnowledgeLibraryDrawer");
__turbopack_context__.k.register(_c1, "LibraryEmptyIllustration");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/feed/post/EmojiPicker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EmojiPicker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconMoodSmile$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconMoodSmile$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconMoodSmile.mjs [app-client] (ecmascript) <export default as IconMoodSmile>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const PANEL_WIDTH = 276;
const EMOJI_GROUPS = [
    {
        key: 'smileys',
        tab: '😀',
        emojis: [
            '😀',
            '😃',
            '😄',
            '😁',
            '😊',
            '🙂',
            '😉',
            '😍',
            '🥰',
            '😘',
            '😎',
            '🤩',
            '🥳',
            '🤗',
            '🤔',
            '🤨',
            '😐',
            '😑',
            '🙄',
            '😏',
            '😌',
            '😔',
            '😢',
            '😭',
            '😤',
            '😠',
            '😳',
            '🥺',
            '😬',
            '😴',
            '🤯',
            '🙃'
        ]
    },
    {
        key: 'gestures',
        tab: '👍',
        emojis: [
            '👍',
            '👎',
            '👌',
            '✌️',
            '🤞',
            '🙏',
            '👏',
            '🙌',
            '💪',
            '👊',
            '✊',
            '🤙',
            '👋',
            '🫡',
            '🫶',
            '☝️',
            '👉',
            '👈',
            '👆',
            '👇',
            '✍️',
            '🤲',
            '🖐️',
            '🤝'
        ]
    },
    {
        key: 'business',
        tab: '💼',
        emojis: [
            '💼',
            '📈',
            '📉',
            '📊',
            '💰',
            '💵',
            '💳',
            '🏦',
            '🏢',
            '📅',
            '📌',
            '📎',
            '🗂️',
            '📁',
            '📄',
            '📝',
            '✏️',
            '🖊️',
            '📚',
            '📖',
            '🔍',
            '🔎',
            '💡',
            '⚙️',
            '🛠️',
            '🧠',
            '🎯',
            '🚀',
            '⏰',
            '⌛',
            '🔔',
            '🏆'
        ]
    },
    {
        key: 'symbols',
        tab: '✅',
        emojis: [
            '✅',
            '☑️',
            '❌',
            '❗',
            '❓',
            '⚠️',
            '🔥',
            '⭐',
            '🌟',
            '✨',
            '💯',
            '♻️',
            '🔗',
            '➡️',
            '⬅️',
            '⬆️',
            '⬇️',
            '🔴',
            '🟢',
            '🔵',
            '🟡',
            '⚫',
            '⚪',
            '🟣'
        ]
    },
    {
        key: 'world',
        tab: '🌍',
        emojis: [
            '🌍',
            '🌎',
            '🌏',
            '🗺️',
            '🏭',
            '🏗️',
            '🚗',
            '✈️',
            '🚢',
            '🛰️',
            '📡',
            '💻',
            '🖥️',
            '📱',
            '⌨️',
            '🔋',
            '💾',
            '☁️',
            '🌐',
            '🎉',
            '🎊',
            '🎁',
            '☕',
            '🌱'
        ]
    }
];
function EmojiPicker(param) {
    let { onSelect, label } = param;
    _s();
    const [opened, setOpened] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [group, setGroup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(EMOJI_GROUPS[0].key);
    const [position, setPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const triggerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const panelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    var _EMOJI_GROUPS_find;
    const activeGroup = (_EMOJI_GROUPS_find = EMOJI_GROUPS.find((entry)=>entry.key === group)) !== null && _EMOJI_GROUPS_find !== void 0 ? _EMOJI_GROUPS_find : EMOJI_GROUPS[0];
    const place = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EmojiPicker.useCallback[place]": ()=>{
            const trigger = triggerRef.current;
            if (!trigger) return;
            const rect = trigger.getBoundingClientRect();
            const isRtl = getComputedStyle(document.documentElement).direction === 'rtl';
            // Anchor the panel's inline-start edge to the trigger, then keep it on screen.
            const preferred = isRtl ? rect.right - PANEL_WIDTH : rect.left;
            const left = Math.min(Math.max(8, preferred), window.innerWidth - PANEL_WIDTH - 8);
            setPosition({
                top: rect.bottom + 6,
                left
            });
        }
    }["EmojiPicker.useCallback[place]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "EmojiPicker.useLayoutEffect": ()=>{
            if (!opened) return;
            place();
            window.addEventListener('resize', place);
            window.addEventListener('scroll', place, true);
            return ({
                "EmojiPicker.useLayoutEffect": ()=>{
                    window.removeEventListener('resize', place);
                    window.removeEventListener('scroll', place, true);
                }
            })["EmojiPicker.useLayoutEffect"];
        }
    }["EmojiPicker.useLayoutEffect"], [
        opened,
        place
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EmojiPicker.useEffect": ()=>{
            if (!opened) return;
            const onPointerDown = {
                "EmojiPicker.useEffect.onPointerDown": (event)=>{
                    var _panelRef_current, _triggerRef_current;
                    const target = event.target;
                    if (((_panelRef_current = panelRef.current) === null || _panelRef_current === void 0 ? void 0 : _panelRef_current.contains(target)) || ((_triggerRef_current = triggerRef.current) === null || _triggerRef_current === void 0 ? void 0 : _triggerRef_current.contains(target))) return;
                    setOpened(false);
                }
            }["EmojiPicker.useEffect.onPointerDown"];
            const onKeyDown = {
                "EmojiPicker.useEffect.onKeyDown": (event)=>{
                    if (event.key === 'Escape') setOpened(false);
                }
            }["EmojiPicker.useEffect.onKeyDown"];
            document.addEventListener('mousedown', onPointerDown);
            document.addEventListener('keydown', onKeyDown);
            return ({
                "EmojiPicker.useEffect": ()=>{
                    document.removeEventListener('mousedown', onPointerDown);
                    document.removeEventListener('keydown', onKeyDown);
                }
            })["EmojiPicker.useEffect"];
        }
    }["EmojiPicker.useEffect"], [
        opened
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                ref: triggerRef,
                type: "button",
                onClick: ()=>setOpened((current)=>!current),
                "aria-label": label,
                "aria-expanded": opened,
                className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] ".concat(opened ? 'bg-[#FFF3D6] text-[#C97800]' : 'text-[#E59A17] hover:bg-[#FFF7E6] hover:text-[#C97800]'),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconMoodSmile$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconMoodSmile$3e$__["IconMoodSmile"], {
                    "aria-hidden": true,
                    stroke: 1.7,
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/components/feed/post/EmojiPicker.tsx",
                    lineNumber: 129,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/feed/post/EmojiPicker.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            opened && position && typeof document !== 'undefined' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: panelRef,
                role: "dialog",
                "aria-label": label,
                style: {
                    top: position.top,
                    left: position.left,
                    width: PANEL_WIDTH
                },
                className: "fixed z-[1000] rounded-lg border border-[#E5EAF2] bg-white p-2 shadow-[0_10px_30px_rgba(15,22,41,0.18)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2 flex items-center gap-1 border-b border-[#EDF1F5] pb-2",
                        children: EMOJI_GROUPS.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setGroup(entry.key),
                                "aria-pressed": entry.key === activeGroup.key,
                                className: "flex h-7 w-7 items-center justify-center rounded-md text-[15px] leading-none transition-colors ".concat(entry.key === activeGroup.key ? 'bg-[#EDF3FC]' : 'hover:bg-[#F3F6FB]'),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "aria-hidden": true,
                                    children: entry.tab
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/EmojiPicker.tsx",
                                    lineNumber: 152,
                                    columnNumber: 21
                                }, this)
                            }, entry.key, false, {
                                fileName: "[project]/components/feed/post/EmojiPicker.tsx",
                                lineNumber: 143,
                                columnNumber: 19
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/feed/post/EmojiPicker.tsx",
                        lineNumber: 141,
                        columnNumber: 15
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid max-h-[180px] grid-cols-8 gap-0.5 overflow-y-auto",
                        children: activeGroup.emojis.map((emoji)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>{
                                    onSelect(emoji);
                                    setOpened(false);
                                },
                                className: "flex h-8 w-8 items-center justify-center rounded-md text-[18px] leading-none transition-colors hover:bg-[#F3F6FB]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "aria-hidden": true,
                                    children: emoji
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/EmojiPicker.tsx",
                                    lineNumber: 168,
                                    columnNumber: 21
                                }, this)
                            }, emoji, false, {
                                fileName: "[project]/components/feed/post/EmojiPicker.tsx",
                                lineNumber: 159,
                                columnNumber: 19
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/feed/post/EmojiPicker.tsx",
                        lineNumber: 157,
                        columnNumber: 15
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/post/EmojiPicker.tsx",
                lineNumber: 134,
                columnNumber: 13
            }, this), document.body) : null
        ]
    }, void 0, true);
}
_s(EmojiPicker, "xC5u4UdoXGjEkF/8iAJHHmlG6Ws=");
_c = EmojiPicker;
var _c;
__turbopack_context__.k.register(_c, "EmojiPicker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/feed/post/autoDirection.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AutoDirection",
    ()=>AutoDirection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/core/dist/index.js [app-client] (ecmascript)");
;
const AutoDirection = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Extension"].create({
    name: 'autoDirection',
    addGlobalAttributes () {
        return [
            {
                types: [
                    'paragraph'
                ],
                attributes: {
                    dir: {
                        default: 'auto',
                        parseHTML: ()=>'auto',
                        renderHTML: ()=>({
                                dir: 'auto'
                            })
                    }
                }
            }
        ];
    }
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/icons/TextEditIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TextEditIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function TextEditIcon(param) {
    let { size = 24, className } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        className: className,
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M13.8787 3.70711C15.0503 2.53554 16.9497 2.53553 18.1213 3.70711L20.2929 5.87868C21.4645 7.05026 21.4645 8.94975 20.2929 10.1213L11.4142 19H21C21.5523 19 22 19.4477 22 20C22 20.5523 21.5523 21 21 21H4C3.44772 21 3 20.5523 3 20V15C3 14.7348 3.10536 14.4804 3.29289 14.2929L13.8787 3.70711ZM8.58579 19L16.5858 11L13 7.41421L5 15.4142V19H8.58579ZM14.4142 6L18 9.58579L18.8787 8.70711C19.2692 8.31658 19.2692 7.68342 18.8787 7.2929L16.7071 5.12132C16.3166 4.7308 15.6834 4.7308 15.2929 5.12132L14.4142 6Z",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/components/icons/TextEditIcon.tsx",
            lineNumber: 18,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/icons/TextEditIcon.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = TextEditIcon;
var _c;
__turbopack_context__.k.register(_c, "TextEditIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/feed/TagSelector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TagSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronDown$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconChevronDown.mjs [app-client] (ecmascript) <export default as IconChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconLoader2.mjs [app-client] (ecmascript) <export default as IconLoader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconX.mjs [app-client] (ecmascript) <export default as IconX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/toast/ToastContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/feed.service.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const copyByLocale = {
    en: {
        placeholder: 'Search or initiate a new tag',
        add: 'Add',
        choose: 'Choose a tag or create one',
        results: 'Search results',
        empty: 'No matching tags. Press Enter to create it.',
        unavailable: 'No tags available yet.',
        error: 'Unable to add the tag.'
    },
    ar: {
        placeholder: 'ابحث أو أضف وسمًا جديدًا',
        add: 'إضافة',
        choose: 'اختر وسمًا أو أنشئ وسمًا جديدًا',
        results: 'نتائج البحث',
        empty: 'لا توجد نتائج. اضغط Enter لإنشاء الوسم.',
        unavailable: 'لا توجد وسوم متاحة بعد.',
        error: 'تعذر إضافة الوسم.'
    }
};
const MAX_COMMON_TAG_SUGGESTIONS = 10;
function TagSelector(param) {
    let { locale, industryId, selectedTags, onChange, disabled = false } = param;
    _s();
    const copy = copyByLocale[locale === 'ar' ? 'ar' : 'en'];
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const listboxId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const rootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const panelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [commonTags, setCommonTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchResults, setSearchResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAdding, setIsAdding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TagSelector.useEffect": ()=>{
            let active = true;
            setIsLoading(true);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchCommonTags"])(locale).then({
                "TagSelector.useEffect": (tags)=>{
                    if (active) setCommonTags(tags);
                }
            }["TagSelector.useEffect"]).catch({
                "TagSelector.useEffect": ()=>{
                    if (active) setCommonTags([]);
                }
            }["TagSelector.useEffect"]).finally({
                "TagSelector.useEffect": ()=>{
                    if (active) setIsLoading(false);
                }
            }["TagSelector.useEffect"]);
            return ({
                "TagSelector.useEffect": ()=>{
                    active = false;
                }
            })["TagSelector.useEffect"];
        }
    }["TagSelector.useEffect"], [
        locale
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TagSelector.useEffect": ()=>{
            const keyword = query.trim();
            if (!keyword) {
                setSearchResults([]);
                return;
            }
            let active = true;
            const timeout = window.setTimeout({
                "TagSelector.useEffect.timeout": ()=>{
                    setIsLoading(true);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["searchTags"])(keyword, locale).then({
                        "TagSelector.useEffect.timeout": (tags)=>{
                            if (active) setSearchResults(tags);
                        }
                    }["TagSelector.useEffect.timeout"]).catch({
                        "TagSelector.useEffect.timeout": ()=>{
                            if (active) setSearchResults([]);
                        }
                    }["TagSelector.useEffect.timeout"]).finally({
                        "TagSelector.useEffect.timeout": ()=>{
                            if (active) setIsLoading(false);
                        }
                    }["TagSelector.useEffect.timeout"]);
                }
            }["TagSelector.useEffect.timeout"], 250);
            return ({
                "TagSelector.useEffect": ()=>{
                    active = false;
                    window.clearTimeout(timeout);
                }
            })["TagSelector.useEffect"];
        }
    }["TagSelector.useEffect"], [
        locale,
        query
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TagSelector.useEffect": ()=>{
            const closeOnOutsideClick = {
                "TagSelector.useEffect.closeOnOutsideClick": (event)=>{
                    var _rootRef_current;
                    const target = event.target;
                    if (!((_rootRef_current = rootRef.current) === null || _rootRef_current === void 0 ? void 0 : _rootRef_current.contains(target))) {
                        setIsOpen(false);
                    }
                }
            }["TagSelector.useEffect.closeOnOutsideClick"];
            document.addEventListener('pointerdown', closeOnOutsideClick);
            return ({
                "TagSelector.useEffect": ()=>document.removeEventListener('pointerdown', closeOnOutsideClick)
            })["TagSelector.useEffect"];
        }
    }["TagSelector.useEffect"], []);
    // The panel stays in the document flow so it can never cover the dialog's
    // action buttons; bring it into view instead when the field sits near the
    // bottom of a scrollable dialog.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TagSelector.useEffect": ()=>{
            if (!isOpen || disabled) return;
            const frame = window.requestAnimationFrame({
                "TagSelector.useEffect.frame": ()=>{
                    var _panelRef_current;
                    (_panelRef_current = panelRef.current) === null || _panelRef_current === void 0 ? void 0 : _panelRef_current.scrollIntoView({
                        block: 'nearest'
                    });
                }
            }["TagSelector.useEffect.frame"]);
            return ({
                "TagSelector.useEffect": ()=>window.cancelAnimationFrame(frame)
            })["TagSelector.useEffect"];
        }
    }["TagSelector.useEffect"], [
        disabled,
        isOpen
    ]);
    const selectedIds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TagSelector.useMemo[selectedIds]": ()=>new Set(selectedTags.map({
                "TagSelector.useMemo[selectedIds]": (tag)=>tag.id
            }["TagSelector.useMemo[selectedIds]"]))
    }["TagSelector.useMemo[selectedIds]"], [
        selectedTags
    ]);
    const visibleTags = (query.trim() ? searchResults : commonTags).filter((tag)=>!selectedIds.has(tag.id)).slice(0, query.trim() ? undefined : MAX_COMMON_TAG_SUGGESTIONS);
    const selectTag = (tag)=>{
        if (!selectedIds.has(tag.id)) onChange([
            ...selectedTags,
            tag
        ]);
        setQuery('');
        setIsOpen(true);
        window.requestAnimationFrame(()=>{
            var _inputRef_current;
            return (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.focus();
        });
    };
    const removeTag = (tagId)=>{
        onChange(selectedTags.filter((tag)=>tag.id !== tagId));
    };
    const addTag = async ()=>{
        const name = query.trim();
        if (!name || !industryId || isAdding) return;
        const normalized = name.toLocaleLowerCase();
        const existing = [
            ...commonTags,
            ...searchResults
        ].find((tag)=>tag.name.trim().toLocaleLowerCase() === normalized);
        if (existing) {
            selectTag(existing);
            return;
        }
        setIsAdding(true);
        try {
            const created = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSuggestTag"])(industryId, name, locale);
            onChange([
                ...selectedTags,
                created
            ]);
            setQuery('');
            setIsOpen(true);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : copy.error);
        } finally{
            setIsAdding(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: rootRef,
        className: "relative mt-2 min-w-0 max-w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex min-h-11 w-full min-w-0 max-w-full items-center gap-1.5 overflow-hidden rounded-lg border bg-white px-2 py-1.5 transition-[border-color,box-shadow] ".concat(isOpen ? 'border-[#7EADE8] shadow-[0_0_0_3px_rgba(35,120,232,0.10)]' : 'border-[#D6E0EC] hover:border-[#AFC4DE]', " ").concat(disabled ? 'cursor-not-allowed bg-[#F5F7F9] opacity-70' : ''),
                onClick: ()=>{
                    if (!disabled) {
                        var _inputRef_current;
                        setIsOpen(true);
                        (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.focus();
                    }
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5",
                        children: [
                            selectedTags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex h-7 max-w-full items-center gap-1 rounded-md bg-[#EEF2F6] px-2.5 text-xs font-medium text-[#26364C]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "truncate",
                                            children: tag.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/TagSelector.tsx",
                                            lineNumber: 192,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            "aria-label": "Remove ".concat(tag.name),
                                            onClick: (event)=>{
                                                event.stopPropagation();
                                                removeTag(tag.id);
                                            },
                                            className: "rounded-sm text-[#6F7D90] transition-colors hover:text-[#26364C]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__["IconX"], {
                                                "aria-hidden": true,
                                                className: "h-3.5 w-3.5",
                                                stroke: 2
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/TagSelector.tsx",
                                                lineNumber: 202,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/TagSelector.tsx",
                                            lineNumber: 193,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, tag.id, true, {
                                    fileName: "[project]/components/feed/TagSelector.tsx",
                                    lineNumber: 191,
                                    columnNumber: 13
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: inputRef,
                                type: "text",
                                role: "combobox",
                                "aria-autocomplete": "list",
                                "aria-controls": listboxId,
                                "aria-expanded": isOpen,
                                disabled: disabled,
                                value: query,
                                onFocus: ()=>setIsOpen(true),
                                onChange: (event)=>{
                                    setQuery(event.currentTarget.value);
                                    setIsOpen(true);
                                },
                                onKeyDown: (event)=>{
                                    if (event.key === 'Enter') {
                                        event.preventDefault();
                                        void addTag();
                                    } else if (event.key === 'Escape') {
                                        setIsOpen(false);
                                    } else if (event.key === 'Backspace' && !query && selectedTags.length > 0) {
                                        removeTag(selectedTags[selectedTags.length - 1].id);
                                    }
                                },
                                placeholder: copy.placeholder,
                                className: "h-7 min-w-[88px] flex-1 border-0 bg-transparent px-1 text-[16px] sm:text-[13px] text-[#26364C] outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 placeholder:text-[#98A4B3] sm:min-w-[150px]"
                            }, void 0, false, {
                                fileName: "[project]/components/feed/TagSelector.tsx",
                                lineNumber: 208,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/TagSelector.tsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: (event)=>{
                            event.stopPropagation();
                            void addTag();
                        },
                        disabled: !query.trim() || !industryId || isAdding,
                        className: "inline-flex h-7 shrink-0 items-center rounded-md px-2.5 text-xs font-semibold text-[#2378E8] transition-colors hover:bg-[#EDF4FD] disabled:cursor-default disabled:text-[#A7B1BF] disabled:hover:bg-transparent",
                        children: isAdding ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__["IconLoader2"], {
                            "aria-label": copy.add,
                            className: "h-3.5 w-3.5 animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/components/feed/TagSelector.tsx",
                            lineNumber: 246,
                            columnNumber: 23
                        }, this) : copy.add
                    }, void 0, false, {
                        fileName: "[project]/components/feed/TagSelector.tsx",
                        lineNumber: 237,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronDown$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronDown$3e$__["IconChevronDown"], {
                        "aria-hidden": true,
                        className: "h-4 w-4 shrink-0 text-[#7C899A] transition-transform ".concat(isOpen ? 'rotate-180' : ''),
                        stroke: 1.8
                    }, void 0, false, {
                        fileName: "[project]/components/feed/TagSelector.tsx",
                        lineNumber: 248,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/TagSelector.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, this),
            isOpen && !disabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: panelRef,
                id: listboxId,
                role: "listbox",
                className: "mt-1.5 w-full min-w-0 max-w-full overflow-hidden rounded-lg border border-[#DCE3EB] bg-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-b border-[#EDF0F3] px-3 py-2 text-[11px] font-medium text-[#7C899A]",
                        children: query.trim() ? copy.results : copy.choose
                    }, void 0, false, {
                        fileName: "[project]/components/feed/TagSelector.tsx",
                        lineNumber: 258,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-h-52 overflow-y-auto p-2",
                        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex h-12 items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__["IconLoader2"], {
                                "aria-hidden": true,
                                className: "h-4 w-4 animate-spin text-[#7C899A]"
                            }, void 0, false, {
                                fileName: "[project]/components/feed/TagSelector.tsx",
                                lineNumber: 263,
                                columnNumber: 70
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/feed/TagSelector.tsx",
                            lineNumber: 263,
                            columnNumber: 15
                        }, this) : visibleTags.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "px-2 py-3 text-xs text-[#8A96A5]",
                            children: query.trim() ? copy.empty : copy.unavailable
                        }, void 0, false, {
                            fileName: "[project]/components/feed/TagSelector.tsx",
                            lineNumber: 265,
                            columnNumber: 15
                        }, this) : query.trim() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-0.5",
                            children: visibleTags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    role: "option",
                                    "aria-selected": "false",
                                    onClick: ()=>selectTag(tag),
                                    className: "flex w-full items-center rounded-md px-2.5 py-2 text-start text-[13px] text-[#26364C] transition-colors hover:bg-[#F1F4F7]",
                                    children: tag.name
                                }, tag.id, false, {
                                    fileName: "[project]/components/feed/TagSelector.tsx",
                                    lineNumber: 269,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/feed/TagSelector.tsx",
                            lineNumber: 267,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-1.5",
                            children: visibleTags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    role: "option",
                                    "aria-selected": "false",
                                    onClick: ()=>selectTag(tag),
                                    className: "rounded-md bg-[#EEF1F4] px-2.5 py-1.5 text-xs font-medium text-[#344154] transition-colors hover:bg-[#E1E6EB]",
                                    children: tag.name
                                }, tag.id, false, {
                                    fileName: "[project]/components/feed/TagSelector.tsx",
                                    lineNumber: 277,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/feed/TagSelector.tsx",
                            lineNumber: 275,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/feed/TagSelector.tsx",
                        lineNumber: 261,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/TagSelector.tsx",
                lineNumber: 252,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/TagSelector.tsx",
        lineNumber: 175,
        columnNumber: 5
    }, this);
}
_s(TagSelector, "Th288aZz9bX0w+3jkxqC2P9BStE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"]
    ];
});
_c = TagSelector;
var _c;
__turbopack_context__.k.register(_c, "TagSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/feed/post/PostModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PostModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Modal/Modal.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Progress$2f$Progress$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Progress/Progress.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/tiptap/esm/RichTextEditor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$link$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/extension-link/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$placeholder$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/extension-placeholder/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$text$2d$align$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/extension-text-align/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$underline$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/extension-underline/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$starter$2d$kit$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/starter-kit/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronLeft$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconChevronLeft.mjs [app-client] (ecmascript) <export default as IconChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronRight$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconChevronRight.mjs [app-client] (ecmascript) <export default as IconChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCircleCheck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCircleCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCircleCheck.mjs [app-client] (ecmascript) <export default as IconCircleCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileDescription$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileDescription$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconFileDescription.mjs [app-client] (ecmascript) <export default as IconFileDescription>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLink$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLink$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconLink.mjs [app-client] (ecmascript) <export default as IconLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconLoader2.mjs [app-client] (ecmascript) <export default as IconLoader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPhoto$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPhoto$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconPhoto.mjs [app-client] (ecmascript) <export default as IconPhoto>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconPlus.mjs [app-client] (ecmascript) <export default as IconPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTrash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTrash$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconTrash.mjs [app-client] (ecmascript) <export default as IconTrash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconVideo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconVideo$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconVideo.mjs [app-client] (ecmascript) <export default as IconVideo>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconX.mjs [app-client] (ecmascript) <export default as IconX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/react/dist/index.js [app-client] (ecmascript) <locals>");
// Registers the <mux-player> custom element; self-hosted via npm (no CSP
// script-src change needed, unlike the CDN <script> embed Mux's docs default to).
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mux$2f$mux$2d$player$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@mux/mux-player/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/toast/ToastContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/header/hooks/useUserProfile.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$PublishAsSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/PublishAsSelector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/feed.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$IndustryField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/post/IndustryField.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$ImageCropEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/post/ImageCropEditor.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$imageExport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/post/imageExport.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$postContent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/post/postContent.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$KnowledgeLibraryDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/post/KnowledgeLibraryDrawer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$EmojiPicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/post/EmojiPicker.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$autoDirection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/post/autoDirection.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$TextEditIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/TextEditIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$TagSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/TagSelector.tsx [app-client] (ecmascript)");
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
;
;
;
;
;
;
;
;
;
const MAX_IMAGES = 20;
const MAX_VIDEO_SECONDS = 10 * 60;
const PROCESSING_POLL_MS = 3000;
const PROCESSING_TIMEOUT_MS = 2 * 60 * 1000;
const copyByLocale = {
    en: {
        titlePost: 'Create a post',
        titleVideo: 'Create a video post',
        titleImage: 'Create an image post',
        editPost: 'Edit post',
        close: 'Close post composer',
        selectIndustry: 'Select industry',
        step1Label: 'Step 1 · Write your post',
        step2Label: 'Step 2 · Categorize',
        step3Label: 'Final step · Choose publisher',
        publishAsTitle: 'Post as',
        choosePublisher: 'Choose a publisher before continuing.',
        next: 'Next',
        back: 'Back',
        description: 'Post description',
        bodyPlaceholder: 'Share your insights...',
        uploadTitle: 'Upload your video',
        uploadHint: 'MP4 or MOV · up to 10 minutes · up to 5 GB per video. Videos are processed for playback after upload.',
        selectVideo: 'Select video',
        imageUploadTitle: 'Upload your images',
        imageUploadHint: 'JPG, PNG, or GIF · up to 5 MB per image · up to 20 images. Cropped images are automatically optimized to fit the limit.',
        selectImages: 'Select images',
        addImages: 'Add more images',
        uploading: 'Uploading…',
        uploadedProcessing: 'Upload finished — preparing your video',
        processingHint: 'This usually takes under a minute. You can write your description now and publish once it finishes.',
        stalled: 'Still preparing your video',
        stalledHint: 'Your video reached us safely, but it is taking longer than expected to finish preparing. Check again, or come back to this draft later.',
        checkAgain: 'Check again',
        uploadComplete: 'Upload complete',
        cancel: 'Cancel',
        remove: 'Remove',
        addTags: 'Add Tags',
        tagsCount: (count)=>"Tags · ".concat(count),
        suggestedTags: 'Tags',
        optionalBadge: 'Optional',
        tagsHint: 'Tags are optional — they help the right experts find your insight.',
        noTags: 'No tags available yet.',
        addTagPlaceholder: 'Search or initiate a new tag',
        addTag: 'Add',
        addTagHint: 'Press Enter to create a new tag.',
        addTagError: 'Unable to add the tag.',
        shareFromLibrary: 'Attach from Insighta library',
        formatting: 'Formatting options',
        emoji: 'Insert emoji',
        publish: 'Post',
        publishing: 'Publishing…',
        saveChanges: 'Save changes',
        savingChanges: 'Saving…',
        saveDraft: 'Save draft',
        savingDraft: 'Saving…',
        draftSaved: 'Your draft has been saved.',
        draftSaveFailed: 'Unable to save your draft.',
        draftSavedRedirecting: 'Draft saved. Taking you to publishing…',
        newKnowledgeAttached: 'Your new knowledge item has been attached.',
        newKnowledgeMissing: 'We could not find the item you just published. Try adding it from your library.',
        discardDraft: 'Discard draft',
        discardTitle: 'Discard this draft?',
        discardDescription: 'This permanently removes the draft and its uploaded media.',
        keepEditing: 'Keep editing',
        exitTitle: 'Save this post as a draft?',
        exitDescription: 'The post you started will be here when you return.',
        exitDiscard: 'Discard',
        exitSaveDraft: 'Save as draft',
        exitSaveBlocked: 'Your draft could not be saved. Please try again.',
        editExitTitle: 'Discard your changes?',
        editExitDescription: 'The edits you made to this post will be lost.',
        discardChanges: 'Discard changes',
        exitUploadingTitle: 'Leave while your video uploads?',
        exitUploadingDescription: 'Your video has not finished uploading. Leaving now cancels it.',
        discarding: 'Discarding…',
        draftDiscarded: 'Your draft has been discarded.',
        draftDiscardFailed: 'Unable to discard your draft.',
        savedVideo: 'Saved video',
        publishedToast: 'Your post has been published.',
        updatedToast: 'Your post has been updated.',
        videoTooLarge: 'This video exceeds 5 GB. Choose a smaller file and try again.',
        imageWrongType: (name)=>"“".concat(name, "” is not a supported image. Choose a JPG, PNG, or GIF file."),
        emptyDraft: 'Add text, an image, a video, or a library item before saving a draft.',
        uploadBeforeLeaving: 'Wait for the video upload to finish, or remove it before opening publishing.',
        videoTooLong: 'The video must be 10 minutes or shorter.',
        videoWrongType: 'Only MP4 or MOV videos are supported.',
        imageTooLarge: (name)=>'"'.concat(name, '" is larger than 5MB and was skipped.'),
        tooManyImages: "You can attach up to ".concat(MAX_IMAGES, " images."),
        replacingSavedImages: 'New images will replace the images saved in this draft.',
        mediaLocked: 'Published media cannot be changed.',
        videoUploadFailed: 'Video upload failed. Please try again.',
        publishFailed: 'Your post could not be published. Please try again.',
        industryFirst: 'Select an industry first',
        industryRequired: 'Select an industry.',
        videoRequired: 'Select and finish uploading a video.',
        videoStillProcessing: 'Your video is still being prepared — you can publish as soon as it is ready.',
        bodyRequired: 'Write a description for your post.'
    },
    ar: {
        titlePost: 'إنشاء منشور',
        titleVideo: 'إنشاء منشور فيديو',
        titleImage: 'إنشاء منشور صور',
        editPost: 'تعديل المنشور',
        close: 'إغلاق محرر المنشور',
        selectIndustry: 'اختر المجال',
        step1Label: 'الخطوة 1 · اكتب منشورك',
        step2Label: 'الخطوة 2 · التصنيف',
        step3Label: 'الخطوة الأخيرة · اختر الناشر',
        publishAsTitle: 'النشر باسم',
        choosePublisher: 'اختر هوية الناشر قبل المتابعة.',
        next: 'التالي',
        back: 'رجوع',
        description: 'وصف المنشور',
        bodyPlaceholder: 'شارك معرفة أو رؤية أو فكرة مفيدة',
        uploadTitle: 'ارفع الفيديو',
        uploadHint: 'MP4 أو MOV · حتى 10 دقائق · حتى 5 جيجابايت للفيديو. نجهّز الفيديو للتشغيل بعد رفعه.',
        selectVideo: 'اختر فيديو',
        imageUploadTitle: 'ارفع الصور',
        imageUploadHint: 'JPG أو PNG أو GIF · حتى 5 ميجابايت للصورة · حتى 20 صورة. نحسّن الصور بعد الاقتصاص تلقائياً لتناسب الحد المسموح.',
        selectImages: 'اختر صوراً',
        addImages: 'إضافة المزيد من الصور',
        uploading: 'جارٍ الرفع…',
        uploadedProcessing: 'انتهى الرفع — جارٍ تجهيز الفيديو',
        processingHint: 'يستغرق ذلك عادةً أقل من دقيقة. يمكنك كتابة الوصف الآن والنشر بعد اكتمال التجهيز.',
        stalled: 'ما زال تجهيز الفيديو جارياً',
        stalledHint: 'وصل الفيديو إلينا بنجاح، لكن تجهيزه يستغرق وقتاً أطول من المتوقع. تحقق مرة أخرى، أو عد إلى هذه المسودة لاحقاً.',
        checkAgain: 'تحقق مرة أخرى',
        uploadComplete: 'اكتمل الرفع',
        cancel: 'إلغاء',
        remove: 'إزالة',
        addTags: 'إضافة وسوم',
        tagsCount: (count)=>"وسوم · ".concat(count),
        suggestedTags: 'الوسوم',
        optionalBadge: 'اختياري',
        tagsHint: 'الوسوم اختيارية — تساعد الخبراء المناسبين في العثور على رؤيتك.',
        noTags: 'لا توجد وسوم متاحة بعد.',
        addTagPlaceholder: 'ابحث أو أضف وسمًا جديدًا',
        addTag: 'إضافة',
        addTagHint: 'اضغط Enter لإضافة وسم جديد.',
        addTagError: 'تعذر إضافة الوسم.',
        shareFromLibrary: 'مشاركة من المكتبة',
        formatting: 'خيارات التنسيق',
        emoji: 'إدراج رمز تعبيري',
        publish: 'نشر',
        publishing: 'جارٍ النشر…',
        saveChanges: 'حفظ التعديلات',
        savingChanges: 'جارٍ الحفظ…',
        saveDraft: 'حفظ كمسودة',
        savingDraft: 'جارٍ الحفظ…',
        draftSaved: 'تم حفظ المسودة.',
        draftSaveFailed: 'تعذر حفظ المسودة.',
        draftSavedRedirecting: 'تم حفظ المسودة. سيتم نقلك إلى النشر…',
        newKnowledgeAttached: 'تم إرفاق عنصر المعرفة الجديد.',
        newKnowledgeMissing: 'تعذر العثور على العنصر الذي نشرته للتو. حاول إضافته من مكتبتك.',
        discardDraft: 'حذف المسودة',
        discardTitle: 'حذف هذه المسودة؟',
        discardDescription: 'سيؤدي هذا إلى حذف المسودة والوسائط المرفوعة نهائياً.',
        keepEditing: 'متابعة التعديل',
        exitTitle: 'حفظ المنشور كمسودة؟',
        exitDescription: 'سيكون المنشور الذي بدأته بانتظارك عند عودتك.',
        exitDiscard: 'تجاهل',
        exitSaveDraft: 'حفظ كمسودة',
        exitSaveBlocked: 'تعذر حفظ المسودة. حاول مجدداً.',
        editExitTitle: 'تجاهل التعديلات؟',
        editExitDescription: 'ستفقد التعديلات التي أجريتها على هذا المنشور.',
        discardChanges: 'تجاهل التعديلات',
        exitUploadingTitle: 'المغادرة أثناء رفع الفيديو؟',
        exitUploadingDescription: 'لم يكتمل رفع الفيديو بعد. المغادرة الآن ستُلغيه.',
        discarding: 'جارٍ الحذف…',
        draftDiscarded: 'تم حذف المسودة.',
        draftDiscardFailed: 'تعذر حذف المسودة.',
        savedVideo: 'فيديو محفوظ',
        publishedToast: 'تم نشر منشورك.',
        updatedToast: 'تم تحديث منشورك.',
        videoTooLarge: 'حجم الفيديو يتجاوز 5 جيجابايت. اختر ملفاً أصغر وحاول مجدداً.',
        imageWrongType: (name)=>"صيغة الصورة «".concat(name, "» غير مدعومة. اختر ملف JPG أو PNG أو GIF."),
        emptyDraft: 'أضف نصاً أو صورة أو فيديو أو عنصراً من المكتبة قبل حفظ المسودة.',
        uploadBeforeLeaving: 'انتظر اكتمال رفع الفيديو أو أزله قبل الانتقال إلى النشر.',
        videoTooLong: 'يجب ألا تتجاوز مدة الفيديو 10 دقائق.',
        videoWrongType: 'يدعم النظام فيديوهات MP4 أو MOV فقط.',
        imageTooLarge: (name)=>'تم تخطي "'.concat(name, '" لأن حجمه أكبر من 5 ميجابايت.'),
        tooManyImages: "يمكنك إرفاق حتى ".concat(MAX_IMAGES, " صورة."),
        replacingSavedImages: 'ستحل الصور الجديدة محل الصور المحفوظة في هذه المسودة.',
        mediaLocked: 'لا يمكن تغيير وسائط المنشور بعد نشره.',
        videoUploadFailed: 'فشل رفع الفيديو. حاول مرة أخرى.',
        publishFailed: 'تعذر نشر المنشور. حاول مجدداً.',
        industryFirst: 'اختر المجال أولاً',
        industryRequired: 'اختر مجالاً.',
        videoRequired: 'اختر فيديو وانتظر حتى يكتمل رفعه.',
        videoStillProcessing: 'ما زال الفيديو قيد التجهيز — يمكنك النشر بمجرد أن يصبح جاهزاً.',
        bodyRequired: 'اكتب وصفاً للمنشور.'
    }
};
function getVideoDurationSeconds(file) {
    return new Promise((resolve, reject)=>{
        const element = document.createElement('video');
        const objectUrl = URL.createObjectURL(file);
        element.preload = 'metadata';
        element.onloadedmetadata = ()=>{
            URL.revokeObjectURL(objectUrl);
            resolve(element.duration);
        };
        element.onerror = ()=>{
            URL.revokeObjectURL(objectUrl);
            reject(new Error('Unable to read video metadata'));
        };
        element.src = objectUrl;
    });
}
function isSupportedVideoFile(file) {
    if ([
        'video/mp4',
        'video/quicktime'
    ].includes(file.type)) return true;
    return /\.(mp4|mov)$/i.test(file.name);
}
const EMPTY_FINGERPRINT = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$postContent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contentFingerprint"])({
    body: '',
    industryId: null,
    tagIds: [],
    insightIds: [],
    imageKeys: [],
    videoFileName: ''
});
function PostModal(param) {
    let { locale, mode, opened, draft, onClose, onDraftSaved, onDraftDiscarded, onPublished, autoAttachKnowledgeId, onAutoAttachHandled } = param;
    var _user_first_name, _user_last_name, _user_company_legal_name, _user_company, _user_company1;
    _s();
    const isArabic = locale === 'ar';
    const copy = copyByLocale[isArabic ? 'ar' : 'en'];
    const isEditingPublished = (draft === null || draft === void 0 ? void 0 : draft.status) === 'published';
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const { user, roles } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserProfile"])();
    const usesCompanyLibrary = roles.includes('company');
    // --- Post content state ---
    // Two-step flow: 1 = write the post, 2 = categorize (industry + tags)
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [authorType, setAuthorType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [body, setBody] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [industry, setIndustry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedTags, setSelectedTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [relatedInsights, setRelatedInsights] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [images, setImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [imageCropQueue, setImageCropQueue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [imageCropBatchTotal, setImageCropBatchTotal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isPublishing, setIsPublishing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSavingDraft, setIsSavingDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDiscardingDraft, setIsDiscardingDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [discardConfirmOpened, setDiscardConfirmOpened] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [exitConfirmOpened, setExitConfirmOpened] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [touchedFields, setTouchedFields] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        industry: false,
        video: false,
        body: false
    });
    const [dirtyFields, setDirtyFields] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        industry: false,
        video: false,
        body: false
    });
    // --- Sub-panel state ---
    const [libraryDrawerOpened, setLibraryDrawerOpened] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [composerError, setComposerError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [imageErrors, setImageErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [videoUploadError, setVideoUploadError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [formattingOpen, setFormattingOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const formattingToggledRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // --- Video state ---
    const [videoPhase, setVideoPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('none');
    const [videoFileName, setVideoFileName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [uploadPercent, setUploadPercent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Only available once Mux's webhook has fired (video.asset.ready) and the
    // backend has persisted it — see MuxWebhookService::mergeMuxAssetData.
    const [videoPlaybackId, setVideoPlaybackId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const videoUuidRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // What the composer looked like when it opened — empty for a new post, the
    // saved draft/post for an edit. Anything else means unsaved work.
    const baselineFingerprintRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(EMPTY_FINGERPRINT);
    const abortUploadRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pollTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const replaceSavedImagesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const videoInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const imageInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const industryButtonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const videoSelectButtonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const videoFieldRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const bodyFieldRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const imageFieldRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // The toolbar mounts above the content, so a long body can push it out of
    // sight. Bring the editor's top into view whenever it is shown or hidden.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PostModal.useEffect": ()=>{
            var _bodyFieldRef_current;
            if (!formattingToggledRef.current) return;
            (_bodyFieldRef_current = bodyFieldRef.current) === null || _bodyFieldRef_current === void 0 ? void 0 : _bodyFieldRef_current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }["PostModal.useEffect"], [
        formattingOpen
    ]);
    const hasVideo = videoPhase !== 'none';
    const hasImages = images.length > 0;
    const isVideoFlow = mode === 'video' || hasVideo;
    const isImageFlow = !isVideoFlow && (mode === 'image' || hasImages);
    // The description stays editable while the provider finishes preparing the
    // video, so the wait is never dead time.
    const isAwaitingProcessing = videoPhase === 'processing' || videoPhase === 'stalled';
    const bodyLocked = isVideoFlow && !isAwaitingProcessing && videoPhase !== 'ready' || isImageFlow && !hasImages;
    const bodyEditor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEditor"])({
        immediatelyRender: false,
        extensions: [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$starter$2d$kit$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].configure({
                heading: false,
                blockquote: false,
                code: false,
                codeBlock: false,
                horizontalRule: false,
                strike: false
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$underline$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$text$2d$align$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].configure({
                types: [
                    'paragraph'
                ]
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$autoDirection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AutoDirection"],
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$link$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].configure({
                autolink: true,
                openOnClick: false,
                defaultProtocol: 'https'
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$placeholder$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].configure({
                placeholder: copy.bodyPlaceholder
            })
        ],
        content: '',
        onUpdate: {
            "PostModal.useEditor[bodyEditor]": (param)=>{
                let { editor } = param;
                setBody(editor.getHTML());
                setDirtyFields({
                    "PostModal.useEditor[bodyEditor]": (previous)=>({
                            ...previous,
                            body: true
                        })
                }["PostModal.useEditor[bodyEditor]"]);
            }
        }["PostModal.useEditor[bodyEditor]"]
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PostModal.useEffect": ()=>{
            if (!bodyEditor || bodyEditor.getHTML() === body) return;
            bodyEditor.commands.setContent(body, {
                emitUpdate: false
            });
        }
    }["PostModal.useEffect"], [
        body,
        bodyEditor
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PostModal.useEffect": ()=>{
            bodyEditor === null || bodyEditor === void 0 ? void 0 : bodyEditor.setEditable(!bodyLocked);
        }
    }["PostModal.useEffect"], [
        bodyEditor,
        bodyLocked
    ]);
    const industryInvalid = touchedFields.industry && industry === null;
    const videoInvalid = touchedFields.video && isVideoFlow && videoPhase !== 'ready';
    // Distinguish "no video yet" from "video uploaded, provider still working":
    // only the first is something the user can act on.
    const videoErrorMessage = isAwaitingProcessing ? copy.videoStillProcessing : copy.videoRequired;
    const bodyInvalid = touchedFields.body && (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$postContent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["richTextToPlainText"])(body) === '';
    const currentFingerprint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PostModal.useMemo[currentFingerprint]": ()=>{
            var _industry_id;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$postContent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contentFingerprint"])({
                body,
                industryId: (_industry_id = industry === null || industry === void 0 ? void 0 : industry.id) !== null && _industry_id !== void 0 ? _industry_id : null,
                tagIds: selectedTags.map({
                    "PostModal.useMemo[currentFingerprint]": (tag)=>tag.id
                }["PostModal.useMemo[currentFingerprint]"]),
                insightIds: relatedInsights.map({
                    "PostModal.useMemo[currentFingerprint]": (item)=>item.id
                }["PostModal.useMemo[currentFingerprint]"]),
                imageKeys: images.map({
                    "PostModal.useMemo[currentFingerprint]": (image)=>image.previewUrl
                }["PostModal.useMemo[currentFingerprint]"]),
                videoFileName: videoPhase === 'error' && !draft ? '' : videoFileName
            });
        }
    }["PostModal.useMemo[currentFingerprint]"], [
        body,
        industry,
        selectedTags,
        relatedInsights,
        images,
        videoFileName,
        videoPhase,
        draft
    ]);
    const hasDraftContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$postContent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["richTextToPlainText"])(body) !== '' || images.length > 0 || relatedInsights.length > 0 || videoPhase !== 'none' && videoPhase !== 'error';
    const hasUnsavedChanges = currentFingerprint !== baselineFingerprintRef.current && (!!draft || hasDraftContent);
    // Bytes are still in flight: a draft saved now would point at an incomplete
    // upload, so the exit prompt offers only "discard" or "keep editing".
    const isUploadInFlight = videoPhase === 'initializing' || videoPhase === 'uploading';
    const canSaveAsDraftOnExit = !isEditingPublished && !isUploadInFlight;
    var _user_first_name_, _user_last_name_;
    const initials = user ? "".concat((_user_first_name_ = (_user_first_name = user.first_name) === null || _user_first_name === void 0 ? void 0 : _user_first_name[0]) !== null && _user_first_name_ !== void 0 ? _user_first_name_ : '').concat((_user_last_name_ = (_user_last_name = user.last_name) === null || _user_last_name === void 0 ? void 0 : _user_last_name[0]) !== null && _user_last_name_ !== void 0 ? _user_last_name_ : '').toUpperCase() || 'I' : 'I';
    var _user_first_name1, _user_last_name1;
    const fullName = user ? "".concat((_user_first_name1 = user.first_name) !== null && _user_first_name1 !== void 0 ? _user_first_name1 : '', " ").concat((_user_last_name1 = user.last_name) !== null && _user_last_name1 !== void 0 ? _user_last_name1 : '').trim() || user.name : '';
    const companyName = (user === null || user === void 0 ? void 0 : (_user_company = user.company) === null || _user_company === void 0 ? void 0 : (_user_company_legal_name = _user_company.legal_name) === null || _user_company_legal_name === void 0 ? void 0 : _user_company_legal_name.trim()) || '';
    const canChoosePublisher = !isEditingPublished && !!companyName && // Company-insighters always publish under their own name, so they skip the
    // publisher step; only the company account itself gets the choice.
    roles.some((role)=>role === 'company') && !roles.some((role)=>role === 'company-insighter');
    const stopPolling = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PostModal.useCallback[stopPolling]": ()=>{
            if (pollTimerRef.current !== null) {
                clearTimeout(pollTimerRef.current);
                pollTimerRef.current = null;
            }
        }
    }["PostModal.useCallback[stopPolling]"], []);
    const resetAll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PostModal.useCallback[resetAll]": ()=>{
            var _abortUploadRef_current;
            (_abortUploadRef_current = abortUploadRef.current) === null || _abortUploadRef_current === void 0 ? void 0 : _abortUploadRef_current.call(abortUploadRef);
            abortUploadRef.current = null;
            stopPolling();
            setStep(1);
            setComposerError(null);
            setImageErrors([]);
            setVideoUploadError(null);
            setAuthorType(null);
            setBody('');
            setIndustry(null);
            setSelectedTags([]);
            setRelatedInsights([]);
            setImages({
                "PostModal.useCallback[resetAll]": (previous)=>{
                    previous.forEach({
                        "PostModal.useCallback[resetAll]": (image)=>{
                            if (image.previewUrl.startsWith('blob:')) URL.revokeObjectURL(image.previewUrl);
                        }
                    }["PostModal.useCallback[resetAll]"]);
                    return [];
                }
            }["PostModal.useCallback[resetAll]"]);
            setImageCropQueue([]);
            setImageCropBatchTotal(0);
            replaceSavedImagesRef.current = false;
            setVideoPhase('none');
            setVideoFileName('');
            setUploadPercent(0);
            setVideoPlaybackId(null);
            videoUuidRef.current = null;
            setIsPublishing(false);
            setIsSavingDraft(false);
            setIsDiscardingDraft(false);
            setDiscardConfirmOpened(false);
            setExitConfirmOpened(false);
            baselineFingerprintRef.current = EMPTY_FINGERPRINT;
            setTouchedFields({
                industry: false,
                video: false,
                body: false
            });
            setDirtyFields({
                industry: false,
                video: false,
                body: false
            });
        }
    }["PostModal.useCallback[resetAll]"], [
        stopPolling
    ]);
    // Full cleanup when the modal closes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PostModal.useEffect": ()=>{
            if (!opened) resetAll();
        }
    }["PostModal.useEffect"], [
        opened,
        resetAll
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PostModal.useEffect": ()=>({
                "PostModal.useEffect": ()=>stopPolling()
            })["PostModal.useEffect"]
    }["PostModal.useEffect"], [
        stopPolling
    ]);
    // React does not expose the native file-input `cancel` event. Listen for it
    // directly so validation is shown only when the chooser is dismissed.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PostModal.useEffect": ()=>{
            const input = videoInputRef.current;
            if (!input) return;
            const markVideoSelectionCancelled = {
                "PostModal.useEffect.markVideoSelectionCancelled": ()=>{
                    setTouchedFields({
                        "PostModal.useEffect.markVideoSelectionCancelled": (previous)=>({
                                ...previous,
                                video: true
                            })
                    }["PostModal.useEffect.markVideoSelectionCancelled"]);
                }
            }["PostModal.useEffect.markVideoSelectionCancelled"];
            input.addEventListener('cancel', markVideoSelectionCancelled);
            return ({
                "PostModal.useEffect": ()=>input.removeEventListener('cancel', markVideoSelectionCancelled)
            })["PostModal.useEffect"];
        }
    }["PostModal.useEffect"], [
        opened
    ]);
    // --- Video handling ---
    const pollProcessingStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PostModal.useCallback[pollProcessingStatus]": function() {
            let immediate = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
            const uuid = videoUuidRef.current;
            if (!uuid) return;
            stopPolling();
            const deadline = Date.now() + PROCESSING_TIMEOUT_MS;
            const check = {
                "PostModal.useCallback[pollProcessingStatus].check": async ()=>{
                    try {
                        const isReady = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkVideoUploadStatus"])(uuid, locale);
                        if (isReady) {
                            // Readiness comes from the dedicated status endpoint. The feed
                            // request is only needed to populate the optional Mux preview.
                            try {
                                var _feedItem_media_, _feedItem_media;
                                const feedItem = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFeedItem"])(uuid, locale);
                                var _feedItem_media__provider_playback_id;
                                setVideoPlaybackId((_feedItem_media__provider_playback_id = (_feedItem_media = feedItem.media) === null || _feedItem_media === void 0 ? void 0 : (_feedItem_media_ = _feedItem_media[0]) === null || _feedItem_media_ === void 0 ? void 0 : _feedItem_media_.provider_playback_id) !== null && _feedItem_media__provider_playback_id !== void 0 ? _feedItem_media__provider_playback_id : null);
                            } catch (e) {
                                setVideoPlaybackId(null);
                            }
                            setVideoPhase('ready');
                            return;
                        }
                    } catch (e) {
                    // Transient polling failure: fall through and retry until the deadline
                    }
                    if (Date.now() >= deadline) {
                        setVideoPhase('stalled');
                        return;
                    }
                    pollTimerRef.current = setTimeout(check, PROCESSING_POLL_MS);
                }
            }["PostModal.useCallback[pollProcessingStatus].check"];
            if (immediate) {
                void check();
                return;
            }
            pollTimerRef.current = setTimeout(check, PROCESSING_POLL_MS);
        }
    }["PostModal.useCallback[pollProcessingStatus]"], [
        locale,
        stopPolling
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PostModal.useEffect": ()=>{
            var _draft_industry;
            if (!opened || !draft) return;
            resetAll();
            var _draft_body;
            setBody((_draft_body = draft.body) !== null && _draft_body !== void 0 ? _draft_body : '');
            setIndustry(draft.industry ? {
                id: draft.industry.id,
                name: draft.industry.name
            } : null);
            setSelectedTags(draft.tags);
            const savedInsights = draft.related_insights.flatMap({
                "PostModal.useEffect.savedInsights": (item)=>typeof item.id === 'number' ? [
                        {
                            id: item.id,
                            type: item.type,
                            title: item.title,
                            slug: item.slug,
                            status: 'published',
                            published_at: null
                        }
                    ] : []
            }["PostModal.useEffect.savedInsights"]);
            setRelatedInsights(savedInsights);
            const savedImages = draft.media.filter({
                "PostModal.useEffect.savedImages": (item)=>item.media_type === 'image' && item.url
            }["PostModal.useEffect.savedImages"]).map({
                "PostModal.useEffect.savedImages": (item)=>{
                    var _item_name;
                    return {
                        file: null,
                        name: (_item_name = item.name) !== null && _item_name !== void 0 ? _item_name : copy.description,
                        previewUrl: item.url
                    };
                }
            }["PostModal.useEffect.savedImages"]);
            setImages(savedImages);
            let savedVideoFileName = '';
            if (draft.media_type === 'video') {
                const media = draft.media.find({
                    "PostModal.useEffect.media": (item)=>item.media_type === 'video'
                }["PostModal.useEffect.media"]);
                videoUuidRef.current = draft.uuid;
                var _media_name;
                savedVideoFileName = (_media_name = media === null || media === void 0 ? void 0 : media.name) !== null && _media_name !== void 0 ? _media_name : copy.savedVideo;
                setVideoFileName(savedVideoFileName);
                var _media_provider_playback_id;
                setVideoPlaybackId((_media_provider_playback_id = media === null || media === void 0 ? void 0 : media.provider_playback_id) !== null && _media_provider_playback_id !== void 0 ? _media_provider_playback_id : null);
                if ((media === null || media === void 0 ? void 0 : media.provider_processing_status) === 'ready') {
                    setVideoPhase('ready');
                } else if (media) {
                    setVideoPhase('processing');
                    pollProcessingStatus(true);
                } else {
                    setVideoPhase('error');
                }
            }
            var _draft_body1, _draft_industry_id;
            baselineFingerprintRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$postContent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contentFingerprint"])({
                body: (_draft_body1 = draft.body) !== null && _draft_body1 !== void 0 ? _draft_body1 : '',
                industryId: (_draft_industry_id = (_draft_industry = draft.industry) === null || _draft_industry === void 0 ? void 0 : _draft_industry.id) !== null && _draft_industry_id !== void 0 ? _draft_industry_id : null,
                tagIds: draft.tags.map({
                    "PostModal.useEffect": (tag)=>tag.id
                }["PostModal.useEffect"]),
                insightIds: savedInsights.map({
                    "PostModal.useEffect": (item)=>item.id
                }["PostModal.useEffect"]),
                imageKeys: savedImages.map({
                    "PostModal.useEffect": (image)=>image.previewUrl
                }["PostModal.useEffect"]),
                videoFileName: savedVideoFileName
            });
        }
    }["PostModal.useEffect"], [
        copy.description,
        copy.savedVideo,
        draft,
        opened,
        pollProcessingStatus,
        resetAll
    ]);
    const recheckProcessingStatus = ()=>{
        setVideoPhase('processing');
        pollProcessingStatus(true);
    };
    const startVideoUpload = async (file)=>{
        if (isEditingPublished) return;
        setDirtyFields((previous)=>({
                ...previous,
                video: true
            }));
        setTouchedFields((previous)=>({
                ...previous,
                video: false
            }));
        setVideoUploadError(null);
        if (file.size > __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$imageExport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_VIDEO_BYTES"]) {
            setVideoUploadError(copy.videoTooLarge);
            return;
        }
        if (!isSupportedVideoFile(file)) {
            setVideoUploadError(copy.videoWrongType);
            return;
        }
        try {
            const duration = await getVideoDurationSeconds(file);
            if (duration > MAX_VIDEO_SECONDS) {
                setVideoUploadError(copy.videoTooLong);
                return;
            }
        } catch (e) {
        // If metadata can't be read locally, let the provider validate it
        }
        setVideoPhase('initializing');
        setVideoFileName(file.name);
        setUploadPercent(0);
        try {
            // First upload initializes the draft; replacements refresh the upload session
            const session = videoUuidRef.current ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["refreshVideoUpload"])(videoUuidRef.current, locale) : await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initVideoPost"])(locale);
            videoUuidRef.current = session.uuid;
            setVideoPhase('uploading');
            const { promise, abort } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uploadVideoToProvider"])(session.video_upload.upload_url, file, setUploadPercent);
            abortUploadRef.current = abort;
            await promise;
            abortUploadRef.current = null;
            setVideoPhase('processing');
            pollProcessingStatus();
        } catch (error) {
            abortUploadRef.current = null;
            if (error instanceof DOMException && error.name === 'AbortError') {
                setVideoPhase('none');
                return;
            }
            setVideoPhase('error');
            setTouchedFields((previous)=>({
                    ...previous,
                    video: true
                }));
            setVideoUploadError(error instanceof Error ? error.message : copy.videoUploadFailed);
        }
    };
    const cancelOrRemoveVideo = ()=>{
        var _abortUploadRef_current;
        if (isEditingPublished) return;
        (_abortUploadRef_current = abortUploadRef.current) === null || _abortUploadRef_current === void 0 ? void 0 : _abortUploadRef_current.call(abortUploadRef);
        abortUploadRef.current = null;
        stopPolling();
        // Keep the uuid: the next selected file goes through refresh-upload
        setVideoPhase('none');
        setVideoFileName('');
        setUploadPercent(0);
        setVideoPlaybackId(null);
        setTouchedFields((previous)=>({
                ...previous,
                video: true
            }));
    };
    // --- Image handling ---
    const beginImageCrop = (files)=>{
        if (isEditingPublished) return;
        if (!files || files.length === 0) return;
        const hasSavedImages = images.some((image)=>image.file === null);
        const accepted = [];
        const errors = [];
        setImageErrors([]);
        let remaining = MAX_IMAGES - (hasSavedImages ? 0 : images.length);
        for (const file of Array.from(files)){
            if (remaining <= 0) {
                errors.push(copy.tooManyImages);
                break;
            }
            if (![
                'image/jpeg',
                'image/png',
                'image/gif',
                'image/webp'
            ].includes(file.type)) {
                errors.push(copy.imageWrongType(file.name));
                continue;
            }
            if (file.size > __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$imageExport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_IMAGE_BYTES"]) {
                errors.push(copy.imageTooLarge(file.name));
                continue;
            }
            accepted.push(file);
            remaining -= 1;
        }
        setImageErrors(errors);
        if (accepted.length > 0) {
            replaceSavedImagesRef.current = hasSavedImages;
            setImageCropBatchTotal(accepted.length);
            setImageCropQueue(accepted);
        }
    };
    const applyCroppedImage = (file)=>{
        if (file.size > __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$imageExport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_IMAGE_BYTES"]) {
            setImageErrors([
                copy.imageTooLarge(file.name)
            ]);
            return false;
        } else {
            const selectedImage = {
                file,
                name: file.name,
                previewUrl: URL.createObjectURL(file)
            };
            setImages((previous)=>{
                if (replaceSavedImagesRef.current) {
                    previous.forEach((image)=>{
                        if (image.previewUrl.startsWith('blob:')) URL.revokeObjectURL(image.previewUrl);
                    });
                    replaceSavedImagesRef.current = false;
                    toast.warning(copy.replacingSavedImages);
                    return [
                        selectedImage
                    ];
                }
                return [
                    ...previous,
                    selectedImage
                ];
            });
        }
        setImageCropQueue((previous)=>previous.slice(1));
        return true;
    };
    const cancelImageCrop = ()=>{
        setImageCropQueue([]);
        setImageCropBatchTotal(0);
        replaceSavedImagesRef.current = false;
    };
    const removeImage = (index)=>{
        if (isEditingPublished) return;
        setImages((previous)=>{
            if (previous[index].previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previous[index].previewUrl);
            }
            return previous.filter((_, i)=>i !== index);
        });
    };
    const moveImage = (index, direction)=>{
        setImages((previous)=>{
            const target = index + direction;
            if (target < 0 || target >= previous.length) return previous;
            const next = [
                ...previous
            ];
            [next[index], next[target]] = [
                next[target],
                next[index]
            ];
            return next;
        });
    };
    const handleIndustrySelect = (option)=>{
        setIndustry(option);
        setTouchedFields((previous)=>({
                ...previous,
                industry: true
            }));
        setDirtyFields((previous)=>({
                ...previous,
                industry: true
            }));
    };
    // --- Step navigation ---
    // The compose step (step 1) owns the body and media; it must be valid before
    // the author can move on to categorizing the post.
    const focusStep1Field = (missingVideo)=>{
        window.requestAnimationFrame(()=>{
            if (missingVideo) {
                var _this;
                ;
                var _videoSelectButtonRef_current;
                (_this = (_videoSelectButtonRef_current = videoSelectButtonRef.current) !== null && _videoSelectButtonRef_current !== void 0 ? _videoSelectButtonRef_current : videoFieldRef.current) === null || _this === void 0 ? void 0 : _this.focus();
            } else {
                bodyEditor === null || bodyEditor === void 0 ? void 0 : bodyEditor.commands.focus();
            }
        });
    };
    const handleNext = ()=>{
        if (isPublishing || isSavingDraft || isDiscardingDraft) return;
        const missingVideo = isVideoFlow && videoPhase !== 'ready';
        const missingBody = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$postContent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["richTextToPlainText"])(body) === '';
        setTouchedFields((previous)=>({
                ...previous,
                video: isVideoFlow,
                body: true
            }));
        setDirtyFields((previous)=>({
                ...previous,
                video: isVideoFlow,
                body: true
            }));
        if (missingVideo || missingBody) {
            focusStep1Field(missingVideo);
            return;
        }
        setStep(2);
    };
    const continueToPublisher = ()=>{
        if (isPublishing || isSavingDraft || isDiscardingDraft) return;
        const missingIndustry = industry === null;
        setTouchedFields((previous)=>({
                ...previous,
                industry: true
            }));
        setDirtyFields((previous)=>({
                ...previous,
                industry: true
            }));
        if (missingIndustry) {
            window.requestAnimationFrame(()=>{
                var _industryButtonRef_current;
                return (_industryButtonRef_current = industryButtonRef.current) === null || _industryButtonRef_current === void 0 ? void 0 : _industryButtonRef_current.focus();
            });
            return;
        }
        if (canChoosePublisher) {
            setStep(3);
            return;
        }
        void handlePublish(isEditingPublished ? undefined : 'insighter');
    };
    // --- Publish ---
    const handlePublish = async (selectedAuthorType)=>{
        if (isPublishing || isSavingDraft || isDiscardingDraft) return;
        if (canChoosePublisher && !selectedAuthorType) {
            setComposerError(copy.choosePublisher);
            setStep(3);
            return;
        }
        const missingIndustry = industry === null;
        const missingVideo = isVideoFlow && videoPhase !== 'ready';
        const missingBody = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$postContent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["richTextToPlainText"])(body) === '';
        setTouchedFields({
            industry: true,
            video: isVideoFlow,
            body: true
        });
        setDirtyFields({
            industry: true,
            video: isVideoFlow,
            body: true
        });
        if (missingIndustry || missingVideo || missingBody || !industry) {
            // Body/media live on step 1; industry lives on step 2. Send the author to
            // the step that holds the first missing field.
            if (missingBody || missingVideo) {
                setStep(1);
                focusStep1Field(missingVideo);
            } else {
                setStep(2);
                window.requestAnimationFrame(()=>{
                    var _industryButtonRef_current;
                    return (_industryButtonRef_current = industryButtonRef.current) === null || _industryButtonRef_current === void 0 ? void 0 : _industryButtonRef_current.focus();
                });
            }
            return;
        }
        setComposerError(null);
        setIsPublishing(true);
        try {
            var _user_company;
            const payload = {
                body: body.trim(),
                industryId: industry.id,
                tags: selectedTags.map((tag)=>tag.id),
                relatedInsights: relatedInsights.map((item)=>item.id),
                authorType: selectedAuthorType
            };
            let publishedUuid;
            if (isVideoFlow && videoUuidRef.current) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publishVideoPost"])(videoUuidRef.current, payload, locale);
                publishedUuid = videoUuidRef.current;
            } else {
                publishedUuid = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publishImageTextPost"])({
                    ...payload,
                    media: images.flatMap((image, index)=>image.file ? [
                            {
                                file: image.file,
                                sortOrder: index
                            }
                        ] : [])
                }, locale, (draft === null || draft === void 0 ? void 0 : draft.media_type) === 'video' ? undefined : draft === null || draft === void 0 ? void 0 : draft.uuid);
            }
            if (isEditingPublished) toast.success(copy.updatedToast);
            const publishAsCompany = selectedAuthorType === 'company';
            var _user_first_name, _user_last_name;
            onPublished({
                uuid: publishedUuid,
                title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$postContent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["richTextToPlainText"])(body).slice(0, 120),
                authorName: publishAsCompany ? companyName : "".concat((_user_first_name = user === null || user === void 0 ? void 0 : user.first_name) !== null && _user_first_name !== void 0 ? _user_first_name : '', " ").concat((_user_last_name = user === null || user === void 0 ? void 0 : user.last_name) !== null && _user_last_name !== void 0 ? _user_last_name : '').trim() || (user === null || user === void 0 ? void 0 : user.name) || '',
                authorPhotoUrl: publishAsCompany ? user === null || user === void 0 ? void 0 : (_user_company = user.company) === null || _user_company === void 0 ? void 0 : _user_company.logo : user === null || user === void 0 ? void 0 : user.profile_photo_url,
                kind: 'post'
            });
            onClose();
        } catch (error) {
            setComposerError(error instanceof Error ? error.message : copy.publishFailed);
        } finally{
            setIsPublishing(false);
        }
    };
    // Save unfinished content without imposing publication requirements. The
    // caller either closes the composer or continues to library publishing.
    const persistDraft = async ()=>{
        if (isPublishing || isSavingDraft || isDiscardingDraft) return null;
        setComposerError(null);
        if (isUploadInFlight) {
            setComposerError(copy.uploadBeforeLeaving);
            return null;
        }
        if (!hasDraftContent && !draft) {
            setComposerError(copy.emptyDraft);
            return null;
        }
        setIsSavingDraft(true);
        try {
            var _industry_id;
            const payload = {
                body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$postContent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["richTextToPlainText"])(body) ? body.trim() : '',
                industryId: (_industry_id = industry === null || industry === void 0 ? void 0 : industry.id) !== null && _industry_id !== void 0 ? _industry_id : null,
                tags: selectedTags.map((tag)=>tag.id),
                relatedInsights: relatedInsights.map((item)=>item.id)
            };
            if (isVideoFlow && videoUuidRef.current) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveVideoPostDraft"])(videoUuidRef.current, payload, locale);
            } else {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveImageTextPostDraft"])({
                    ...payload,
                    media: images.flatMap((image, index)=>image.file ? [
                            {
                                file: image.file,
                                sortOrder: index
                            }
                        ] : [])
                }, locale, (draft === null || draft === void 0 ? void 0 : draft.media_type) === 'video' ? undefined : draft === null || draft === void 0 ? void 0 : draft.uuid);
            }
            const savedDraft = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFeedDraft"])(locale);
            if (!savedDraft) throw new Error(copy.draftSaveFailed);
            return savedDraft;
        } catch (error) {
            setComposerError(error instanceof Error ? error.message : copy.draftSaveFailed);
            return null;
        } finally{
            setIsSavingDraft(false);
        }
    };
    const handleSaveDraft = async ()=>{
        const savedDraft = await persistDraft();
        if (!savedDraft) return;
        toast.success(copy.draftSaved);
        onDraftSaved(savedDraft);
    };
    // Empty-library CTA: preserve any started post, then send the user to the
    // knowledge stepper. The stepper redirects back to this feed with
    // ?attach_knowledge=<id> so we can reopen the composer and attach the new
    // item automatically (handled in FeedComposer + the auto-attach effect below).
    const handlePublishNewKnowledge = async ()=>{
        if (isUploadInFlight) {
            setComposerError(copy.uploadBeforeLeaving);
            return;
        }
        if (hasDraftContent || draft) {
            const savedDraft = await persistDraft();
            if (!savedDraft) return;
            onDraftSaved(savedDraft);
            toast.success(copy.draftSavedRedirecting);
        } else if (videoUuidRef.current) {
            // A cancelled/failed new upload must not leave an empty server draft.
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteFeedItem"])(videoUuidRef.current, locale);
                videoUuidRef.current = null;
            } catch (error) {
                setComposerError(error instanceof Error ? error.message : copy.draftDiscardFailed);
                return;
            }
        }
        // Come back to exactly the page the composer lives on; the stepper appends
        // the published knowledge id to this URL.
        const returnUrl = "".concat(window.location.origin).concat(window.location.pathname);
        const stepperUrl = "".concat(("TURBOPACK compile-time value", "http://localhost:4200"), "/app/add-knowledge/stepper") + "?return_url=".concat(encodeURIComponent(returnUrl));
        window.location.href = stepperUrl;
    };
    // On return from publishing a new knowledge item, fetch it and attach it to the
    // post automatically. Guarded by a ref so it runs once per id even before the
    // parent clears it.
    const autoAttachedIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PostModal.useEffect": ()=>{
            if (!opened || !autoAttachKnowledgeId) return;
            if (autoAttachedIdRef.current === autoAttachKnowledgeId) return;
            autoAttachedIdRef.current = autoAttachKnowledgeId;
            let cancelled = false;
            void ({
                "PostModal.useEffect": async ()=>{
                    try {
                        const item = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchLibraryKnowledgeById"])(autoAttachKnowledgeId, locale, 5, usesCompanyLibrary);
                        if (cancelled) return;
                        if (item) {
                            setRelatedInsights({
                                "PostModal.useEffect": (previous)=>previous.some({
                                        "PostModal.useEffect": (entry)=>entry.id === item.id
                                    }["PostModal.useEffect"]) || previous.length >= 3 ? previous : [
                                        ...previous,
                                        item
                                    ]
                            }["PostModal.useEffect"]);
                            toast.success(copy.newKnowledgeAttached);
                        } else {
                            toast.error(copy.newKnowledgeMissing);
                        }
                    } catch (e) {
                        if (!cancelled) toast.error(copy.newKnowledgeMissing);
                    } finally{
                        if (!cancelled) onAutoAttachHandled === null || onAutoAttachHandled === void 0 ? void 0 : onAutoAttachHandled();
                    }
                }
            })["PostModal.useEffect"]();
            return ({
                "PostModal.useEffect": ()=>{
                    cancelled = true;
                }
            })["PostModal.useEffect"];
        }
    }["PostModal.useEffect"], [
        opened,
        autoAttachKnowledgeId,
        locale,
        usesCompanyLibrary,
        copy,
        toast,
        onAutoAttachHandled
    ]);
    const handleDiscardDraft = async ()=>{
        if (isEditingPublished || isPublishing || isSavingDraft || isDiscardingDraft) return;
        var _draft_uuid;
        // A video upload creates the draft server-side before the parent has re-read
        // it, so fall back to the uuid this composer initialized.
        const discardUuid = (_draft_uuid = draft === null || draft === void 0 ? void 0 : draft.uuid) !== null && _draft_uuid !== void 0 ? _draft_uuid : videoUuidRef.current;
        if (!discardUuid) return;
        setIsDiscardingDraft(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteFeedItem"])(discardUuid, locale);
            toast.success(copy.draftDiscarded);
            setDiscardConfirmOpened(false);
            onDraftDiscarded();
        } catch (error) {
            setComposerError(error instanceof Error ? error.message : copy.draftDiscardFailed);
        } finally{
            setIsDiscardingDraft(false);
        }
    };
    // Closing the composer (X, overlay click, Escape) must not silently throw away
    // what the author typed: offer to keep it as a draft first.
    const requestClose = ()=>{
        if (isPublishing || isSavingDraft || isDiscardingDraft) return;
        if (exitConfirmOpened || discardConfirmOpened) return;
        if (!hasUnsavedChanges) {
            if (!draft && videoUuidRef.current && !hasDraftContent) {
                void handleDiscardDraft();
                return;
            }
            onClose();
            return;
        }
        setExitConfirmOpened(true);
    };
    const handleExitSaveDraft = async ()=>{
        const savedDraft = await persistDraft();
        if (!savedDraft) {
            // Close the exit prompt so the persistent save error is visible.
            setExitConfirmOpened(false);
            setComposerError((error)=>error || copy.exitSaveBlocked);
            return;
        }
        setExitConfirmOpened(false);
        toast.success(copy.draftSaved);
        onDraftSaved(savedDraft);
    };
    // A saved draft lives on the server, so discarding has to delete it; an
    // unsaved composer just closes.
    const handleExitDiscard = async ()=>{
        // Keep the prompt on screen while the delete runs so the button can show its
        // pending state; handleDiscardDraft closes the composer once it succeeds.
        if (!isEditingPublished && (draft || videoUuidRef.current)) {
            await handleDiscardDraft();
            setExitConfirmOpened(false);
            return;
        }
        setExitConfirmOpened(false);
        onClose();
    };
    const footerIconClass = 'flex h-9 w-9 items-center justify-center rounded-md text-[#5A6B84] transition-colors hover:bg-[#F3F6FB] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]';
    const title = isEditingPublished ? copy.editPost : isVideoFlow ? copy.titleVideo : isImageFlow ? copy.titleImage : copy.titlePost;
    var _imageCropQueue_;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
                opened: opened,
                onClose: requestClose,
                size: "min(640px, calc(100vw - 24px))",
                radius: 8,
                centered: true,
                zIndex: 300,
                withCloseButton: false,
                "aria-labelledby": "feed-post-dialog-title",
                styles: {
                    inner: {
                        padding: 12
                    },
                    content: {
                        width: 'min(640px, calc(100vw - 24px))',
                        maxWidth: 'calc(100vw - 24px)',
                        maxHeight: 'calc(100dvh - 24px)',
                        overflowX: 'hidden',
                        boxShadow: 'none',
                        border: '1px solid #DCE4EF'
                    },
                    body: {
                        position: 'relative',
                        minWidth: 0,
                        padding: 'clamp(16px, 4vw, 24px)',
                        overflowX: 'hidden'
                    }
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "feed-post-dialog-title",
                        className: "sr-only",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/feed/post/PostModal.tsx",
                        lineNumber: 1227,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-label": copy.close,
                        onClick: requestClose,
                        className: "absolute end-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-md text-[#5A6472] transition-colors hover:bg-[#F3F6FB] hover:text-[#0B1220] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__["IconX"], {
                            "aria-hidden": true,
                            className: "h-5 w-5",
                            stroke: 1.8
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/PostModal.tsx",
                            lineNumber: 1236,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/feed/post/PostModal.tsx",
                        lineNumber: 1230,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        className: "min-w-0",
                        noValidate: true,
                        onSubmit: (event)=>{
                            event.preventDefault();
                            if (step === 1) {
                                handleNext();
                            } else if (step === 2) {
                                continueToPublisher();
                            } else {
                                void handlePublish(authorType !== null && authorType !== void 0 ? authorType : undefined);
                            }
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 pe-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E0ECFB] text-[13px] font-bold text-[#1D74E0]",
                                        children: (user === null || user === void 0 ? void 0 : user.profile_photo_url) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: user.profile_photo_url,
                                            alt: fullName,
                                            width: 44,
                                            height: 44,
                                            unoptimized: true,
                                            className: "h-full w-full object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/post/PostModal.tsx",
                                            lineNumber: 1257,
                                            columnNumber: 17
                                        }, this) : initials
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 1255,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0 flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "truncate text-[15px] font-bold text-[#0B1220]",
                                                children: fullName
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 1270,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-0.5 truncate text-[12.5px] font-medium text-[#5A6B84]",
                                                children: step === 1 ? copy.step1Label : step === 2 ? copy.step2Label : copy.step3Label
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 1271,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 1269,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                lineNumber: 1254,
                                columnNumber: 11
                            }, this),
                            composerError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                role: "alert",
                                className: "mt-4 rounded-md bg-red-50 p-3 text-sm text-[#A9322B]",
                                children: composerError
                            }, void 0, false, {
                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                lineNumber: 1278,
                                columnNumber: 11
                            }, this),
                            imageErrors.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                role: "alert",
                                className: "mt-4 rounded-md bg-red-50 p-3 text-sm text-[#A9322B]",
                                children: imageErrors.map((message, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: message
                                    }, index, false, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 1284,
                                        columnNumber: 50
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                lineNumber: 1283,
                                columnNumber: 11
                            }, this),
                            videoUploadError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                role: "alert",
                                className: "mt-4 rounded-md bg-red-50 p-3 text-sm text-[#A9322B]",
                                children: videoUploadError
                            }, void 0, false, {
                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                lineNumber: 1288,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: step === 1 ? undefined : 'hidden',
                                children: [
                                    !bodyLocked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: bodyFieldRef,
                                        className: "mt-4 scroll-mt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "feed-post-body",
                                                className: "sr-only",
                                                children: copy.description
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 1294,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"], {
                                                editor: bodyEditor,
                                                "aria-invalid": bodyInvalid || undefined,
                                                "aria-describedby": bodyInvalid ? 'feed-post-body-error' : undefined,
                                                "data-dirty": dirtyFields.body || undefined,
                                                onBlurCapture: ()=>setTouchedFields((previous)=>({
                                                            ...previous,
                                                            body: true
                                                        })),
                                                onKeyDown: (event)=>{
                                                    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
                                                        var _event_currentTarget_closest;
                                                        event.preventDefault();
                                                        (_event_currentTarget_closest = event.currentTarget.closest('form')) === null || _event_currentTarget_closest === void 0 ? void 0 : _event_currentTarget_closest.requestSubmit();
                                                    }
                                                },
                                                className: "overflow-hidden rounded-md border bg-white shadow-none ".concat(bodyInvalid ? 'border-[#C23B32]' : 'border-[#E5EAF2] focus-within:border-[#8FB9EA]'),
                                                children: [
                                                    formattingOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].Toolbar, {
                                                        sticky: false,
                                                        className: "border-b border-[#E5EAF2] bg-[#F8FAFD] px-1 py-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].ControlsGroup, {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].Bold, {}, void 0, false, {
                                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                        lineNumber: 1318,
                                                                        columnNumber: 19
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].Italic, {}, void 0, false, {
                                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                        lineNumber: 1319,
                                                                        columnNumber: 19
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].Underline, {}, void 0, false, {
                                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                        lineNumber: 1320,
                                                                        columnNumber: 19
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1317,
                                                                columnNumber: 17
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].ControlsGroup, {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].BulletList, {}, void 0, false, {
                                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                        lineNumber: 1323,
                                                                        columnNumber: 19
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].OrderedList, {}, void 0, false, {
                                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                        lineNumber: 1324,
                                                                        columnNumber: 19
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1322,
                                                                columnNumber: 17
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].ControlsGroup, {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].AlignLeft, {}, void 0, false, {
                                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                        lineNumber: 1327,
                                                                        columnNumber: 19
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].AlignCenter, {}, void 0, false, {
                                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                        lineNumber: 1328,
                                                                        columnNumber: 19
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].AlignRight, {}, void 0, false, {
                                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                        lineNumber: 1329,
                                                                        columnNumber: 19
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1326,
                                                                columnNumber: 17
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].ControlsGroup, {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].Link, {}, void 0, false, {
                                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                        lineNumber: 1332,
                                                                        columnNumber: 19
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].Unlink, {}, void 0, false, {
                                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                        lineNumber: 1333,
                                                                        columnNumber: 19
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1331,
                                                                columnNumber: 17
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].ControlsGroup, {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].Undo, {}, void 0, false, {
                                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                        lineNumber: 1336,
                                                                        columnNumber: 19
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].Redo, {}, void 0, false, {
                                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                        lineNumber: 1337,
                                                                        columnNumber: 19
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1335,
                                                                columnNumber: 17
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$EmojiPicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                label: copy.emoji,
                                                                onSelect: (emoji)=>bodyEditor === null || bodyEditor === void 0 ? void 0 : bodyEditor.chain().focus().insertContent(emoji).run()
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1339,
                                                                columnNumber: 17
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1316,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].Content, {
                                                        id: "feed-post-body",
                                                        className: "bg-white px-3 py-2.5 text-[16px] sm:text-[15px] leading-relaxed text-[#1C2433] [&_.ProseMirror]:min-h-[120px] [&_.ProseMirror]:outline-none [&_.ProseMirror_p]:m-0 [&_.ProseMirror_p+p]:mt-2 [&_.ProseMirror_ul]:my-2 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:ps-5 [&_.ProseMirror_ol]:my-2 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:ps-5 [&_.ProseMirror_a]:text-[#2378E8] [&_.ProseMirror_a]:underline [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-[#94A3B8] ".concat(isVideoFlow || isImageFlow ? '[&_.ProseMirror]:min-h-[88px]' : '')
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1345,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center bg-white px-1.5 pb-1.5",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>{
                                                                formattingToggledRef.current = true;
                                                                setFormattingOpen((current)=>!current);
                                                            },
                                                            "aria-label": copy.formatting,
                                                            "aria-expanded": formattingOpen,
                                                            className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] ".concat(formattingOpen ? 'bg-[#EDF3FC] text-[#1D74E0]' : 'text-[#5A6B84] hover:bg-[#F3F6FB]'),
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$TextEditIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1366,
                                                                columnNumber: 19
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/feed/post/PostModal.tsx",
                                                            lineNumber: 1352,
                                                            columnNumber: 17
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1351,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 1297,
                                                columnNumber: 13
                                            }, this),
                                            bodyInvalid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                id: "feed-post-body-error",
                                                className: "mt-1.5 text-[12px] font-medium text-[#A9322B]",
                                                children: copy.bodyRequired
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 1371,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 1293,
                                        columnNumber: 11
                                    }, this),
                                    isVideoFlow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: videoFieldRef,
                                        tabIndex: -1,
                                        "aria-invalid": videoInvalid || undefined,
                                        "aria-describedby": videoInvalid ? 'feed-post-video-error' : undefined,
                                        "data-dirty": dirtyFields.video || undefined,
                                        className: "mt-4 focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]",
                                        children: [
                                            videoPhase === 'none' || videoPhase === 'error' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col items-center rounded-md border border-dashed border-[#C9DCF6] bg-[#F8FAFD] px-6 py-10 text-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex h-14 w-14 items-center justify-center rounded-md bg-[#EDF3FC]",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconVideo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconVideo$3e$__["IconVideo"], {
                                                            "aria-hidden": true,
                                                            stroke: 1.6,
                                                            className: "h-6 w-6 text-[#1D74E0]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/feed/post/PostModal.tsx",
                                                            lineNumber: 1391,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1390,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "mt-4 text-[17px] font-bold text-[#0B1220]",
                                                        children: copy.uploadTitle
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1393,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mx-auto mt-2 max-w-sm text-[13.5px] leading-6 text-[#64748B]",
                                                        children: copy.uploadHint
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1394,
                                                        columnNumber: 17
                                                    }, this),
                                                    isEditingPublished ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-4 text-[12.5px] font-medium text-[#64748B]",
                                                        children: copy.mediaLocked
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1398,
                                                        columnNumber: 19
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        ref: videoSelectButtonRef,
                                                        type: "button",
                                                        onClick: ()=>{
                                                            var _videoInputRef_current;
                                                            return (_videoInputRef_current = videoInputRef.current) === null || _videoInputRef_current === void 0 ? void 0 : _videoInputRef_current.click();
                                                        },
                                                        "aria-invalid": videoInvalid || undefined,
                                                        "aria-describedby": videoInvalid ? 'feed-post-video-error' : undefined,
                                                        "data-dirty": dirtyFields.video || undefined,
                                                        className: "mt-5 min-h-10 rounded-md bg-[#1D74E0] px-6 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#155CB8] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]",
                                                        children: copy.selectVideo
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1400,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 1389,
                                                columnNumber: 15
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-md border border-[#E5EAF2] p-4",
                                                children: [
                                                    videoPhase === 'ready' && videoPlaybackId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mb-3 flex max-h-[480px] justify-center overflow-hidden rounded-md bg-black",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mux-player", {
                                                            "playback-id": videoPlaybackId,
                                                            "stream-type": "on-demand",
                                                            "metadata-video-title": videoFileName,
                                                            "accent-color": "#1D74E0",
                                                            "disable-tracking": "",
                                                            preload: "metadata",
                                                            playsinline: true,
                                                            style: {
                                                                width: '100%',
                                                                maxHeight: '480px',
                                                                display: 'block'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/feed/post/PostModal.tsx",
                                                            lineNumber: 1417,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1416,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-4",
                                                        children: [
                                                            !(videoPhase === 'ready' && videoPlaybackId) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex h-12 w-16 shrink-0 items-center justify-center rounded-md bg-[#0B1220]",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconVideo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconVideo$3e$__["IconVideo"], {
                                                                    "aria-hidden": true,
                                                                    stroke: 1.6,
                                                                    className: "h-5 w-5 text-white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                    lineNumber: 1432,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1431,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "min-w-0 flex-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "truncate text-[14.5px] font-semibold text-[#0B1220]",
                                                                        children: videoFileName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                        lineNumber: 1436,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        role: "status",
                                                                        "aria-live": "polite",
                                                                        className: "mt-0.5 flex items-center gap-1.5 text-[13px] text-[#5A6B84]",
                                                                        children: videoPhase === 'ready' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCircleCheck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCircleCheck$3e$__["IconCircleCheck"], {
                                                                                    "aria-hidden": true,
                                                                                    stroke: 1.8,
                                                                                    className: "h-4 w-4 text-[#1BC653]"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                                    lineNumber: 1446,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                copy.uploadComplete
                                                                            ]
                                                                        }, void 0, true) : videoPhase === 'processing' ? copy.uploadedProcessing : videoPhase === 'stalled' ? copy.stalled : "".concat(copy.uploading, " ").concat(uploadPercent, "%")
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                        lineNumber: 1439,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1435,
                                                                columnNumber: 19
                                                            }, this),
                                                            !isEditingPublished && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: cancelOrRemoveVideo,
                                                                className: "min-h-10 shrink-0 px-1 text-[14px] font-medium text-[#5A6B84] transition-colors hover:text-[#0B1220] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]",
                                                                children: videoPhase === 'uploading' || videoPhase === 'initializing' ? copy.cancel : copy.remove
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1459,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1429,
                                                        columnNumber: 17
                                                    }, this),
                                                    (videoPhase === 'uploading' || videoPhase === 'initializing') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Progress$2f$Progress$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Progress"], {
                                                        value: uploadPercent,
                                                        size: 6,
                                                        radius: "xl",
                                                        color: "#1D74E0",
                                                        className: "mt-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1471,
                                                        columnNumber: 19
                                                    }, this),
                                                    videoPhase === 'processing' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Progress$2f$Progress$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Progress"], {
                                                                value: 100,
                                                                size: 6,
                                                                radius: "xl",
                                                                color: "#1D74E0",
                                                                striped: true,
                                                                animated: true,
                                                                className: "mt-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1475,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-2.5 text-[12.5px] leading-5 text-[#64748B]",
                                                                children: copy.processingHint
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1476,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true),
                                                    videoPhase === 'stalled' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-3 rounded-md border border-[#F0DCA8] bg-[#FEFAF0] p-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[12.5px] leading-5 text-[#7A5B14]",
                                                                children: copy.stalledHint
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1483,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: recheckProcessingStatus,
                                                                className: "mt-2.5 min-h-10 rounded-md border border-[#C9DCF6] px-4 text-[13px] font-medium text-[#1D74E0] transition-colors hover:bg-[#F3F6FB] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]",
                                                                children: copy.checkAgain
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1484,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1482,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 1414,
                                                columnNumber: 15
                                            }, this),
                                            videoInvalid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                id: "feed-post-video-error",
                                                className: "mt-2 text-[12px] font-medium text-[#A9322B]",
                                                children: videoErrorMessage
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 1496,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 1380,
                                        columnNumber: 11
                                    }, this),
                                    isImageFlow && !hasImages && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: imageFieldRef,
                                        tabIndex: -1,
                                        className: "mt-4 focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col items-center rounded-md border border-dashed border-[#C9DCF6] bg-[#F8FAFD] px-6 py-10 text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex h-14 w-14 items-center justify-center rounded-md bg-[#EDF3FC]",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPhoto$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPhoto$3e$__["IconPhoto"], {
                                                        "aria-hidden": true,
                                                        stroke: 1.6,
                                                        className: "h-6 w-6 text-[#1EAB5A]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1512,
                                                        columnNumber: 17
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/post/PostModal.tsx",
                                                    lineNumber: 1511,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "mt-4 text-[17px] font-bold text-[#0B1220]",
                                                    children: copy.imageUploadTitle
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/post/PostModal.tsx",
                                                    lineNumber: 1514,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mx-auto mt-2 max-w-sm text-[13.5px] leading-6 text-[#64748B]",
                                                    children: copy.imageUploadHint
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/post/PostModal.tsx",
                                                    lineNumber: 1515,
                                                    columnNumber: 15
                                                }, this),
                                                isEditingPublished ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-4 text-[12.5px] font-medium text-[#64748B]",
                                                    children: copy.mediaLocked
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/post/PostModal.tsx",
                                                    lineNumber: 1519,
                                                    columnNumber: 17
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>{
                                                        var _imageInputRef_current;
                                                        return (_imageInputRef_current = imageInputRef.current) === null || _imageInputRef_current === void 0 ? void 0 : _imageInputRef_current.click();
                                                    },
                                                    className: "mt-5 min-h-10 rounded-md bg-[#1EAB5A] px-6 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#178A48] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]",
                                                    children: copy.selectImages
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/post/PostModal.tsx",
                                                    lineNumber: 1521,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/feed/post/PostModal.tsx",
                                            lineNumber: 1510,
                                            columnNumber: 13
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 1505,
                                        columnNumber: 11
                                    }, this),
                                    hasImages && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4",
                                        children: [
                                            images.map((image, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "group relative aspect-square overflow-hidden rounded-md border border-[#E5EAF2]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            src: image.previewUrl,
                                                            alt: image.name,
                                                            fill: true,
                                                            unoptimized: true,
                                                            className: "object-cover"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/feed/post/PostModal.tsx",
                                                            lineNumber: 1541,
                                                            columnNumber: 17
                                                        }, this),
                                                        image.file && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute inset-0 hidden items-center justify-center gap-1 bg-black/45 group-hover:flex",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    "aria-label": "Move earlier",
                                                                    onClick: ()=>moveImage(index, -1),
                                                                    disabled: index === 0,
                                                                    className: "flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-[#0B1220] disabled:opacity-40",
                                                                    children: isArabic ? '→' : '←'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                    lineNumber: 1550,
                                                                    columnNumber: 19
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    "aria-label": "Remove image",
                                                                    onClick: ()=>removeImage(index),
                                                                    className: "flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-[#E8513E]",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__["IconX"], {
                                                                        "aria-hidden": true,
                                                                        className: "h-4 w-4",
                                                                        stroke: 2
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                        lineNumber: 1565,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                    lineNumber: 1559,
                                                                    columnNumber: 19
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    "aria-label": "Move later",
                                                                    onClick: ()=>moveImage(index, 1),
                                                                    disabled: index === images.length - 1,
                                                                    className: "flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-[#0B1220] disabled:opacity-40",
                                                                    children: isArabic ? '←' : '→'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                    lineNumber: 1567,
                                                                    columnNumber: 19
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/feed/post/PostModal.tsx",
                                                            lineNumber: 1549,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "absolute bottom-1 start-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white",
                                                            children: index + 1
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/feed/post/PostModal.tsx",
                                                            lineNumber: 1578,
                                                            columnNumber: 17
                                                        }, this)
                                                    ]
                                                }, image.previewUrl, true, {
                                                    fileName: "[project]/components/feed/post/PostModal.tsx",
                                                    lineNumber: 1537,
                                                    columnNumber: 15
                                                }, this)),
                                            !isEditingPublished && images.length < MAX_IMAGES && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                "aria-label": copy.addImages,
                                                onClick: ()=>{
                                                    var _imageInputRef_current;
                                                    return (_imageInputRef_current = imageInputRef.current) === null || _imageInputRef_current === void 0 ? void 0 : _imageInputRef_current.click();
                                                },
                                                className: "group flex aspect-square items-center justify-center rounded-md border border-dashed border-[#1EAB5A] bg-[#F2FBF6] text-[#1EAB5A] transition-colors hover:border-[#178A48] hover:bg-[#E6F7ED] hover:text-[#178A48] focus-visible:outline-[2px] focus-visible:outline-offset-2 focus-visible:outline-[#8FB9EA]",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlus$3e$__["IconPlus"], {
                                                    "aria-hidden": true,
                                                    stroke: 2.5,
                                                    className: "h-10 w-10 sm:h-12 sm:w-12"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/post/PostModal.tsx",
                                                    lineNumber: 1590,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 1584,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 1535,
                                        columnNumber: 11
                                    }, this),
                                    relatedInsights.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 space-y-2",
                                        children: relatedInsights.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 rounded-md border border-[#E5EAF2] bg-[#FAFCFE] px-3.5 py-2.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#EDF3FC]",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileDescription$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileDescription$3e$__["IconFileDescription"], {
                                                            "aria-hidden": true,
                                                            stroke: 1.6,
                                                            className: "h-4 w-4 text-[#1D74E0]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/feed/post/PostModal.tsx",
                                                            lineNumber: 1605,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1604,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "min-w-0 flex-1 truncate text-[13px] font-medium text-[#0B1220]",
                                                        children: item.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1607,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        "aria-label": copy.remove,
                                                        onClick: ()=>setRelatedInsights((previous)=>previous.filter((i)=>i.id !== item.id)),
                                                        className: "shrink-0 text-[#94A3B8] transition-colors hover:text-[#0B1220]",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__["IconX"], {
                                                            "aria-hidden": true,
                                                            className: "h-4 w-4",
                                                            stroke: 1.8
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/feed/post/PostModal.tsx",
                                                            lineNumber: 1618,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1610,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, item.id, true, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 1600,
                                                columnNumber: 15
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 1598,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                lineNumber: 1290,
                                columnNumber: 9
                            }, this),
                            step === 3 && canChoosePublisher && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-[20px] font-bold tracking-[-0.015em] text-[#101827]",
                                        children: copy.publishAsTitle
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 1630,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$PublishAsSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            locale: locale,
                                            companyName: companyName,
                                            companyLogo: user === null || user === void 0 ? void 0 : (_user_company1 = user.company) === null || _user_company1 === void 0 ? void 0 : _user_company1.logo,
                                            insighterName: fullName,
                                            insighterPhoto: user === null || user === void 0 ? void 0 : user.profile_photo_url,
                                            value: authorType,
                                            onChange: setAuthorType
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/post/PostModal.tsx",
                                            lineNumber: 1634,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 1633,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                lineNumber: 1629,
                                columnNumber: 11
                            }, this),
                            step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$IndustryField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        locale: locale,
                                        value: industry,
                                        invalid: industryInvalid,
                                        errorId: "feed-post-industry-error",
                                        buttonRef: industryButtonRef,
                                        onSelect: handleIndustrySelect,
                                        onBlur: ()=>setTouchedFields((previous)=>({
                                                    ...previous,
                                                    industry: true
                                                }))
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 1650,
                                        columnNumber: 13
                                    }, this),
                                    industryInvalid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        id: "feed-post-industry-error",
                                        className: "mt-1.5 text-[12px] font-medium text-[#A9322B]",
                                        children: copy.industryRequired
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 1662,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                lineNumber: 1649,
                                columnNumber: 11
                            }, this),
                            step === 2 && industry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11.5px] font-semibold uppercase tracking-wide text-[#5A6B84]",
                                                children: copy.suggestedTags
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 1673,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] font-medium text-[#9099A6]",
                                                children: copy.optionalBadge
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 1674,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 1672,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$TagSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        locale: locale,
                                        industryId: industry.id,
                                        selectedTags: selectedTags,
                                        onChange: setSelectedTags
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 1676,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                lineNumber: 1671,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 flex min-w-0 flex-col items-stretch gap-3 border-t border-[#EDF1F7] pt-3.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex min-w-0 items-center gap-1 sm:w-auto",
                                        children: [
                                            draft && !isEditingPublished && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setDiscardConfirmOpened(true),
                                                disabled: isPublishing || isSavingDraft || isDiscardingDraft,
                                                className: "me-1 inline-flex min-h-9 items-center gap-1.5 rounded-md px-2 text-[13px] font-medium text-[#B53B32] transition-colors hover:bg-[#FFF3F1] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#E9A39C] disabled:opacity-50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTrash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTrash$3e$__["IconTrash"], {
                                                        "aria-hidden": true,
                                                        className: "h-4 w-4",
                                                        stroke: 1.8
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1695,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "hidden sm:inline",
                                                        children: copy.discardDraft
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1696,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 1689,
                                                columnNumber: 15
                                            }, this),
                                            step === 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    !isEditingPublished && !isVideoFlow && !hasVideo && (hasImages || !isImageFlow) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        "aria-label": "Add images",
                                                        onClick: ()=>{
                                                            var _imageInputRef_current;
                                                            return (_imageInputRef_current = imageInputRef.current) === null || _imageInputRef_current === void 0 ? void 0 : _imageInputRef_current.click();
                                                        },
                                                        className: footerIconClass,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPhoto$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPhoto$3e$__["IconPhoto"], {
                                                            "aria-hidden": true,
                                                            stroke: 1.7,
                                                            className: "h-5 w-5 text-[#1EAB5A]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/feed/post/PostModal.tsx",
                                                            lineNumber: 1708,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1702,
                                                        columnNumber: 19
                                                    }, this),
                                                    !isEditingPublished && mode === 'post' && !hasImages && !hasVideo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        "aria-label": "Add video",
                                                        onClick: ()=>{
                                                            var _videoInputRef_current;
                                                            return (_videoInputRef_current = videoInputRef.current) === null || _videoInputRef_current === void 0 ? void 0 : _videoInputRef_current.click();
                                                        },
                                                        className: footerIconClass,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconVideo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconVideo$3e$__["IconVideo"], {
                                                            "aria-hidden": true,
                                                            stroke: 1.7,
                                                            className: "h-5 w-5 text-[#E8513E]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/feed/post/PostModal.tsx",
                                                            lineNumber: 1718,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1712,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        "aria-label": copy.shareFromLibrary,
                                                        onClick: ()=>setLibraryDrawerOpened(true),
                                                        className: "flex h-9 items-center gap-1.5 rounded-lg border px-2.5 text-[14px] font-medium transition-colors focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] ".concat(relatedInsights.length > 0 ? 'border-[#8FB9EA] bg-[#EDF3FC] text-[#1D74E0]' : 'border-[#C9DCF6] text-[#5A6B84] hover:bg-[#F3F6FB]'),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLink$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLink$3e$__["IconLink"], {
                                                                "aria-hidden": true,
                                                                stroke: 1.7,
                                                                className: "h-4.5 w-4.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1731,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "hidden sm:inline",
                                                                children: copy.shareFromLibrary
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                                lineNumber: 1732,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1721,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setStep(step === 3 ? 2 : 1),
                                                disabled: isPublishing || isSavingDraft || isDiscardingDraft,
                                                className: "inline-flex min-h-10 items-center gap-1.5 rounded-md px-3 text-[14px] font-medium text-[#5A6B84] transition-colors hover:bg-[#F3F6FB] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] disabled:opacity-50",
                                                children: [
                                                    isArabic ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronRight$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronRight$3e$__["IconChevronRight"], {
                                                        "aria-hidden": true,
                                                        className: "h-4 w-4",
                                                        stroke: 2
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1743,
                                                        columnNumber: 19
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronLeft$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronLeft$3e$__["IconChevronLeft"], {
                                                        "aria-hidden": true,
                                                        className: "h-4 w-4",
                                                        stroke: 2
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                                        lineNumber: 1745,
                                                        columnNumber: 19
                                                    }, this),
                                                    copy.back
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                                lineNumber: 1736,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 1687,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex min-w-0 w-full items-center justify-end gap-2 sm:w-auto",
                                        children: step === 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: handleNext,
                                            disabled: isPublishing || isSavingDraft || isDiscardingDraft,
                                            className: "min-h-10 rounded-md bg-[#1D74E0] px-6 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#155CB8] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] disabled:cursor-not-allowed disabled:bg-[#93B9E8]",
                                            children: copy.next
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/post/PostModal.tsx",
                                            lineNumber: 1754,
                                            columnNumber: 15
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                !isEditingPublished && step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>void handleSaveDraft(),
                                                    disabled: isPublishing || isSavingDraft || isDiscardingDraft,
                                                    "aria-busy": isSavingDraft,
                                                    className: "inline-flex min-h-10 min-w-0 flex-1 items-center justify-center rounded-md border border-[#C9DCF6] bg-white px-3 py-2.5 text-[14px] font-medium text-[#1D74E0] transition-colors hover:bg-[#F2F7FF] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] disabled:cursor-wait disabled:opacity-55 sm:flex-none sm:px-4",
                                                    children: [
                                                        isSavingDraft && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__["IconLoader2"], {
                                                            "aria-hidden": true,
                                                            className: "me-1.5 h-4 w-4 animate-spin",
                                                            stroke: 2
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/feed/post/PostModal.tsx",
                                                            lineNumber: 1773,
                                                            columnNumber: 23
                                                        }, this),
                                                        isSavingDraft ? copy.savingDraft : copy.saveDraft
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/feed/post/PostModal.tsx",
                                                    lineNumber: 1765,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "submit",
                                                    disabled: isPublishing || isSavingDraft || isDiscardingDraft || step === 3 && authorType === null,
                                                    "aria-busy": isPublishing,
                                                    className: "min-h-10 min-w-0 flex-1 rounded-md bg-[#1D74E0] px-4 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#155CB8] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] disabled:cursor-wait disabled:bg-[#93B9E8] sm:flex-none sm:px-6",
                                                    children: step === 2 && canChoosePublisher ? copy.next : isPublishing ? isEditingPublished ? copy.savingChanges : copy.publishing : isEditingPublished ? copy.saveChanges : copy.publish
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/post/PostModal.tsx",
                                                    lineNumber: 1778,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 1752,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                lineNumber: 1686,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: videoInputRef,
                                type: "file",
                                "aria-label": copy.selectVideo,
                                accept: "video/mp4,video/quicktime,.mp4,.mov",
                                disabled: isEditingPublished,
                                className: "hidden",
                                onChange: (event)=>{
                                    var _event_currentTarget_files;
                                    const file = (_event_currentTarget_files = event.currentTarget.files) === null || _event_currentTarget_files === void 0 ? void 0 : _event_currentTarget_files[0];
                                    event.currentTarget.value = '';
                                    if (file) startVideoUpload(file);
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                lineNumber: 1796,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: imageInputRef,
                                type: "file",
                                "aria-label": isArabic ? 'إضافة صور' : 'Add images',
                                accept: "image/*",
                                multiple: true,
                                disabled: isEditingPublished,
                                className: "hidden",
                                onChange: (event)=>{
                                    beginImageCrop(event.currentTarget.files);
                                    event.currentTarget.value = '';
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                lineNumber: 1809,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/post/PostModal.tsx",
                        lineNumber: 1239,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/post/PostModal.tsx",
                lineNumber: 1200,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$ImageCropEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                file: (_imageCropQueue_ = imageCropQueue[0]) !== null && _imageCropQueue_ !== void 0 ? _imageCropQueue_ : null,
                locale: locale,
                opened: imageCropQueue.length > 0,
                position: imageCropBatchTotal - imageCropQueue.length + 1,
                total: imageCropBatchTotal,
                onCancel: cancelImageCrop,
                onApply: applyCroppedImage
            }, imageCropQueue[0] ? "".concat(imageCropQueue[0].name, "-").concat(imageCropQueue[0].lastModified, "-").concat(imageCropQueue.length) : 'closed', false, {
                fileName: "[project]/components/feed/post/PostModal.tsx",
                lineNumber: 1825,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
                opened: exitConfirmOpened,
                onClose: ()=>{
                    if (!isSavingDraft && !isDiscardingDraft) setExitConfirmOpened(false);
                },
                title: isUploadInFlight ? copy.exitUploadingTitle : isEditingPublished ? copy.editExitTitle : copy.exitTitle,
                centered: true,
                size: "sm",
                radius: 8,
                zIndex: 500,
                closeButtonProps: {
                    'aria-label': copy.keepEditing
                },
                styles: {
                    title: {
                        fontSize: 17,
                        fontWeight: 700,
                        color: '#0B1220'
                    }
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[14px] leading-6 text-[#5D6D89]",
                        children: isUploadInFlight ? copy.exitUploadingDescription : isEditingPublished ? copy.editExitDescription : copy.exitDescription
                    }, void 0, false, {
                        fileName: "[project]/components/feed/post/PostModal.tsx",
                        lineNumber: 1855,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 flex justify-end gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>void handleExitDiscard(),
                                disabled: isSavingDraft || isDiscardingDraft,
                                className: "inline-flex min-h-10 items-center rounded-md border border-[#DCE4EF] px-4 text-[14px] font-medium text-[#5D6D89] transition-colors hover:bg-[#F7F9FC] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] disabled:opacity-50",
                                children: [
                                    isDiscardingDraft && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__["IconLoader2"], {
                                        "aria-hidden": true,
                                        className: "me-1.5 h-4 w-4 animate-spin",
                                        stroke: 2
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 1870,
                                        columnNumber: 15
                                    }, this),
                                    isEditingPublished ? copy.discardChanges : copy.exitDiscard
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                lineNumber: 1863,
                                columnNumber: 11
                            }, this),
                            canSaveAsDraftOnExit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>void handleExitSaveDraft(),
                                disabled: isSavingDraft || isDiscardingDraft,
                                "aria-busy": isSavingDraft,
                                className: "inline-flex min-h-10 items-center rounded-md bg-[#1D74E0] px-4 text-[14px] font-medium text-white transition-colors hover:bg-[#155CB8] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] disabled:cursor-wait disabled:bg-[#93B9E8]",
                                children: [
                                    isSavingDraft && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__["IconLoader2"], {
                                        "aria-hidden": true,
                                        className: "me-1.5 h-4 w-4 animate-spin",
                                        stroke: 2
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 1883,
                                        columnNumber: 17
                                    }, this),
                                    isSavingDraft ? copy.savingDraft : copy.exitSaveDraft
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                lineNumber: 1875,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setExitConfirmOpened(false),
                                disabled: isDiscardingDraft,
                                className: "min-h-10 rounded-md bg-[#1D74E0] px-4 text-[14px] font-medium text-white transition-colors hover:bg-[#155CB8] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] disabled:opacity-50",
                                children: copy.keepEditing
                            }, void 0, false, {
                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                lineNumber: 1888,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/post/PostModal.tsx",
                        lineNumber: 1862,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/post/PostModal.tsx",
                lineNumber: 1836,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
                opened: discardConfirmOpened,
                onClose: ()=>{
                    if (!isDiscardingDraft) setDiscardConfirmOpened(false);
                },
                title: copy.discardTitle,
                centered: true,
                size: "sm",
                radius: 8,
                zIndex: 500,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[14px] leading-6 text-[#5D6D89]",
                        children: copy.discardDescription
                    }, void 0, false, {
                        fileName: "[project]/components/feed/post/PostModal.tsx",
                        lineNumber: 1911,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 flex justify-end gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setDiscardConfirmOpened(false),
                                disabled: isDiscardingDraft,
                                className: "min-h-10 rounded-md border border-[#DCE4EF] px-4 text-[14px] font-medium text-[#5D6D89] transition-colors hover:bg-[#F7F9FC] disabled:opacity-50",
                                children: copy.keepEditing
                            }, void 0, false, {
                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                lineNumber: 1913,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>void handleDiscardDraft(),
                                disabled: isDiscardingDraft,
                                className: "inline-flex min-h-10 items-center rounded-md bg-[#C23B32] px-4 text-[14px] font-medium text-white transition-colors hover:bg-[#A9322B] disabled:cursor-wait disabled:opacity-60",
                                children: [
                                    isDiscardingDraft && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__["IconLoader2"], {
                                        "aria-hidden": true,
                                        className: "me-1.5 h-4 w-4 animate-spin",
                                        stroke: 2
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/post/PostModal.tsx",
                                        lineNumber: 1928,
                                        columnNumber: 15
                                    }, this),
                                    isDiscardingDraft ? copy.discarding : copy.discardDraft
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/post/PostModal.tsx",
                                lineNumber: 1921,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/post/PostModal.tsx",
                        lineNumber: 1912,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/post/PostModal.tsx",
                lineNumber: 1900,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$KnowledgeLibraryDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                locale: locale,
                opened: libraryDrawerOpened,
                isCompany: usesCompanyLibrary,
                selected: relatedInsights,
                hasDraftContent: hasDraftContent || !!draft,
                onClose: ()=>setLibraryDrawerOpened(false),
                onSelectionChange: setRelatedInsights,
                onPublishNew: ()=>{
                    setLibraryDrawerOpened(false);
                    void handlePublishNewKnowledge();
                }
            }, void 0, false, {
                fileName: "[project]/components/feed/post/PostModal.tsx",
                lineNumber: 1935,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(PostModal, "ydic/El2EU00BSeWS99+vIZI+AA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserProfile"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEditor"]
    ];
});
_c = PostModal;
var _c;
__turbopack_context__.k.register(_c, "PostModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/feed/MyFeedsTimeline.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FeedCard",
    ()=>FeedCard,
    "FeedSkeleton",
    ()=>FeedSkeleton,
    "default",
    ()=>MyFeedsTimeline
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Badge$2f$Badge$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Badge/Badge.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Menu$2f$Menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Menu/Menu.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Modal/Modal.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Tooltip$2f$Tooltip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Tooltip/Tooltip.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArticle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArticle$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconArticle.mjs [app-client] (ecmascript) <export default as IconArticle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBriefcase$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBriefcase$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBriefcase.mjs [app-client] (ecmascript) <export default as IconBriefcase>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCalendarUser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCalendarUser$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCalendarUser.mjs [app-client] (ecmascript) <export default as IconCalendarUser>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronLeft$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconChevronLeft.mjs [app-client] (ecmascript) <export default as IconChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronRight$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconChevronRight.mjs [app-client] (ecmascript) <export default as IconChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDots$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDots$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconDots.mjs [app-client] (ecmascript) <export default as IconDots>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconEdit$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconEdit$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconEdit.mjs [app-client] (ecmascript) <export default as IconEdit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileDescription$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileDescription$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconFileDescription.mjs [app-client] (ecmascript) <export default as IconFileDescription>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconLoader2.mjs [app-client] (ecmascript) <export default as IconLoader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPhoto$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPhoto$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconPhoto.mjs [app-client] (ecmascript) <export default as IconPhoto>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlayerPlayFilled$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlayerPlayFilled$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconPlayerPlayFilled.mjs [app-client] (ecmascript) <export default as IconPlayerPlayFilled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTrash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTrash$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconTrash.mjs [app-client] (ecmascript) <export default as IconTrash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconVideo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconVideo$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconVideo.mjs [app-client] (ecmascript) <export default as IconVideo>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconX.mjs [app-client] (ecmascript) <export default as IconX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/formatDistanceToNow.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isValid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/isValid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$ar$2d$SA$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/locale/ar-SA.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$en$2d$US$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/locale/en-US.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mux$2f$mux$2d$player$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@mux/mux-player/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$KnowledgeTypeIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/KnowledgeTypeIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$FeedShare$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/FeedShare.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$FeedSaveButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/FeedSaveButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$RoleUpgradeCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/RoleUpgradeCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$TopDocumentsCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/TopDocumentsCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/toast/ToastContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/header/hooks/useUserProfile.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/specifiedInsighterProject.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$textUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/textUtils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/feed.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$PostModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/post/PostModal.tsx [app-client] (ecmascript)");
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
// useLayoutEffect warns when a client component is pre-rendered on the server.
const useBrowserLayoutEffect = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"];
const FEED_BODY_COLLAPSED_LINES = 10;
const FEED_BODY_MIN_WORDS_TO_COLLAPSE = 80;
const FEED_BODY_MIN_HIDDEN_LINES = 3;
const copyByLocale = {
    en: {
        title: 'My Posts',
        count: (count)=>"".concat(count, " ").concat(count === 1 ? 'post' : 'posts'),
        loading: 'Loading your posts…',
        emptyTitle: 'No posts yet',
        emptyDescription: 'Your published posts and drafts will appear here.',
        loadError: 'We couldn’t load your posts.',
        tryAgain: 'Try again',
        loadMore: 'Load more',
        loadingMore: 'Loading…',
        views: 'views',
        shares: 'shares',
        viewInsight: 'View',
        openingInsight: 'Opening…',
        delete: 'Delete post',
        edit: 'Edit post',
        editArticle: 'Edit White Paper',
        editFailed: 'Unable to open this post for editing.',
        deleteTitle: 'Delete this post?',
        deleteDescription: 'This permanently removes the post and its uploaded media.',
        cancel: 'Cancel',
        deleting: 'Deleting…',
        deleted: 'Your post has been deleted.',
        deleteFailed: 'Unable to delete the post.',
        postActions: 'Post actions',
        imageAlt: 'Post image',
        articleCoverAlt: 'White Paper cover',
        article: 'White Paper',
        attachment: 'Open attachment',
        openImage: 'Open image',
        imageCount: (current, total)=>"Image ".concat(current, " of ").concat(total),
        previousImage: 'Previous image',
        nextImage: 'Next image',
        closeImagePreview: 'Close image preview',
        playVideo: 'Tap to play',
        meet: 'Meet',
        requestService: 'Service',
        track: 'Track',
        untrack: 'Tracked',
        tracking: 'Updating…',
        trackFailed: 'Unable to update tracking for this post.',
        trackTooltip: 'Track this post to see more content like it in your feed.',
        untrackTooltip: 'Untrack this post to stop seeing more content like it in your feed.',
        ownPostTracking: 'You cannot track your own post.',
        readMore: 'Read more',
        readLess: 'Read less'
    },
    ar: {
        title: 'منشوراتي',
        count: (count)=>"".concat(count, " منشور"),
        loading: 'جارٍ تحميل منشوراتك…',
        emptyTitle: 'لا توجد منشورات بعد',
        emptyDescription: 'ستظهر منشوراتك المنشورة ومسوداتك هنا.',
        loadError: 'تعذر تحميل منشوراتك.',
        tryAgain: 'حاول مرة أخرى',
        loadMore: 'تحميل المزيد',
        loadingMore: 'جارٍ التحميل…',
        views: 'مشاهدة',
        shares: 'مشاركة',
        viewInsight: 'عرض',
        openingInsight: 'جارٍ الفتح…',
        delete: 'حذف المنشور',
        edit: 'تعديل المنشور',
        editArticle: 'تعديل الورقة البيضاء',
        editFailed: 'تعذر فتح المنشور للتعديل.',
        deleteTitle: 'حذف هذا المنشور؟',
        deleteDescription: 'سيؤدي هذا إلى حذف المنشور والوسائط المرفوعة نهائياً.',
        cancel: 'إلغاء',
        deleting: 'جارٍ الحذف…',
        deleted: 'تم حذف منشورك.',
        deleteFailed: 'تعذر حذف المنشور.',
        postActions: 'إجراءات المنشور',
        imageAlt: 'صورة المنشور',
        articleCoverAlt: 'غلاف الورقة البيضاء',
        article: 'ورقة بيضاء',
        attachment: 'فتح المرفق',
        openImage: 'فتح الصورة',
        imageCount: (current, total)=>"الصورة ".concat(current, " من ").concat(total),
        previousImage: 'الصورة السابقة',
        nextImage: 'الصورة التالية',
        closeImagePreview: 'إغلاق معاينة الصورة',
        playVideo: 'اضغط للتشغيل',
        meet: 'اجتماع',
        requestService: 'خدمة',
        track: 'تتبّع',
        untrack: 'إلغاء التتبّع',
        tracking: 'جارٍ التحديث…',
        trackFailed: 'تعذر تحديث تتبّع هذا المنشور.',
        trackTooltip: 'تتبّع هذا المنشور لرؤية المزيد من المحتوى المشابه له في موجزك.',
        untrackTooltip: 'ألغِ تتبّع هذا المنشور للتوقف عن رؤية المزيد من المحتوى المشابه له في موجزك.',
        ownPostTracking: 'لا يمكنك تتبّع منشورك الخاص.',
        readMore: 'قراءة المزيد',
        readLess: 'قراءة أقل'
    }
};
function stripHtml(html) {
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}
// Keep the pattern compatible with the project's ES5 TypeScript target while
// supporting Latin, Arabic, and other non-ASCII hashtag characters.
const feedTextTokenPattern = /(https?:\/\/[^\s<>()]+|www\.[^\s<>()]+|(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}(?:\/[^\s<>()]*)?)|(^|[^A-Za-z0-9_])#([A-Za-z0-9_\-\u00C0-\uFFFF]+)/g;
function renderInteractiveFeedText(value, onHashtagClick) {
    const nodes = [];
    let lastIndex = 0;
    let tokenIndex = 0;
    let match;
    while((match = feedTextTokenPattern.exec(value)) !== null){
        var _match_index;
        const start = (_match_index = match.index) !== null && _match_index !== void 0 ? _match_index : 0;
        if (start > lastIndex) nodes.push(value.slice(lastIndex, start));
        const rawUrl = match[1];
        if (rawUrl) {
            // A sentence-ending punctuation mark is not part of a URL, but should
            // remain visible after the clickable link.
            const url = rawUrl.replace(/[.,!?;:]+$/, '');
            const trailingText = rawUrl.slice(url.length);
            const href = /^https?:\/\//i.test(url) ? url : "https://".concat(url);
            nodes.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: href,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "font-medium text-[#2378E8] underline decoration-[#2378E8]/40 underline-offset-2 transition-colors hover:text-[#155DB8] hover:decoration-current focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8]",
                children: url
            }, "link-".concat(tokenIndex), false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 201,
                columnNumber: 9
            }, this));
            if (trailingText) nodes.push(trailingText);
        } else {
            var _match_;
            const prefix = (_match_ = match[2]) !== null && _match_ !== void 0 ? _match_ : '';
            const hashtag = match[3];
            if (prefix) nodes.push(prefix);
            if (hashtag) {
                nodes.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>onHashtagClick(hashtag),
                    className: "inline rounded-sm border-0 bg-transparent p-0 font-medium text-[#2378E8] underline decoration-[#2378E8]/40 underline-offset-2 transition-colors hover:text-[#155DB8] hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8]",
                    "aria-label": "Search the feed for #".concat(hashtag),
                    children: [
                        "#",
                        hashtag
                    ]
                }, "hashtag-".concat(tokenIndex), true, {
                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                    lineNumber: 218,
                    columnNumber: 11
                }, this));
            }
        }
        lastIndex = start + match[0].length;
        tokenIndex += 1;
    }
    if (lastIndex < value.length) nodes.push(value.slice(lastIndex));
    return nodes;
}
function toHashtagToken(name) {
    return name.trim()// Replace spaces and punctuation (including &) with one separator so a
    // tag from the API is always rendered as a single clickable hashtag.
    .replace(/[^A-Za-z0-9_\-\u00C0-\uFFFF]+/g, '_').replace(/_+/g, '_').replace(/^_+|_+$/g, '');
}
const richPostAllowedTags = new Set([
    'p',
    'br',
    'strong',
    'b',
    'em',
    'i',
    'u',
    'ul',
    'ol',
    'li',
    'a'
]);
const richPostAllowedAlignments = new Set([
    'left',
    'center',
    'right',
    'justify'
]);
const richPostAllowedDirections = new Set([
    'auto',
    'ltr',
    'rtl'
]);
function sanitizeAndLinkifyRichPostHtml(html, locale) {
    if (typeof document === 'undefined') return '';
    const parsed = new DOMParser().parseFromString(html, 'text/html');
    parsed.body.querySelectorAll('script, style, iframe, object, embed, form, input, button, svg, math').forEach((node)=>node.remove());
    Array.from(parsed.body.querySelectorAll('*')).forEach((element)=>{
        var _element_getAttribute, _style_textAlign, _style, _element_getAttribute1;
        const tagName = element.tagName.toLowerCase();
        if (!richPostAllowedTags.has(tagName)) {
            element.replaceWith(...Array.from(element.childNodes));
            return;
        }
        var _element_getAttribute_trim;
        const href = tagName === 'a' ? (_element_getAttribute_trim = (_element_getAttribute = element.getAttribute('href')) === null || _element_getAttribute === void 0 ? void 0 : _element_getAttribute.trim()) !== null && _element_getAttribute_trim !== void 0 ? _element_getAttribute_trim : '' : '';
        var _style_textAlign_toLowerCase;
        const textAlign = (_style_textAlign_toLowerCase = (_style = element.style) === null || _style === void 0 ? void 0 : (_style_textAlign = _style.textAlign) === null || _style_textAlign === void 0 ? void 0 : _style_textAlign.toLowerCase()) !== null && _style_textAlign_toLowerCase !== void 0 ? _style_textAlign_toLowerCase : '';
        var _element_getAttribute_toLowerCase;
        const dir = (_element_getAttribute_toLowerCase = (_element_getAttribute1 = element.getAttribute('dir')) === null || _element_getAttribute1 === void 0 ? void 0 : _element_getAttribute1.toLowerCase()) !== null && _element_getAttribute_toLowerCase !== void 0 ? _element_getAttribute_toLowerCase : '';
        Array.from(element.attributes).forEach((attribute)=>element.removeAttribute(attribute.name));
        // Re-apply only the editor's alignment, never the original style attribute.
        if (richPostAllowedAlignments.has(textAlign)) {
            ;
            element.style.textAlign = textAlign;
        }
        // Keep per-paragraph direction so pasted Arabic reads the same as it did in the editor.
        if (richPostAllowedDirections.has(dir)) {
            element.setAttribute('dir', dir);
        }
        if (tagName === 'a' && /^(https?:|mailto:)/i.test(href)) {
            element.setAttribute('href', href);
            element.setAttribute('target', '_blank');
            element.setAttribute('rel', 'noopener noreferrer');
        } else if (tagName === 'a') {
            element.replaceWith(...Array.from(element.childNodes));
        }
    });
    const textNodes = [];
    const walker = document.createTreeWalker(parsed.body, NodeFilter.SHOW_TEXT);
    let textNode = walker.nextNode();
    while(textNode){
        var _textNode_parentElement;
        if (!((_textNode_parentElement = textNode.parentElement) === null || _textNode_parentElement === void 0 ? void 0 : _textNode_parentElement.closest('a'))) textNodes.push(textNode);
        textNode = walker.nextNode();
    }
    textNodes.forEach((node)=>{
        var _node_nodeValue;
        const value = (_node_nodeValue = node.nodeValue) !== null && _node_nodeValue !== void 0 ? _node_nodeValue : '';
        feedTextTokenPattern.lastIndex = 0;
        let match;
        let lastIndex = 0;
        let hasToken = false;
        const fragment = document.createDocumentFragment();
        while((match = feedTextTokenPattern.exec(value)) !== null){
            hasToken = true;
            var _match_index;
            const start = (_match_index = match.index) !== null && _match_index !== void 0 ? _match_index : 0;
            if (start > lastIndex) fragment.append(value.slice(lastIndex, start));
            const rawUrl = match[1];
            if (rawUrl) {
                const url = rawUrl.replace(/[.,!?;:]+$/, '');
                const anchor = document.createElement('a');
                anchor.href = /^https?:\/\//i.test(url) ? url : "https://".concat(url);
                anchor.target = '_blank';
                anchor.rel = 'noopener noreferrer';
                anchor.textContent = url;
                fragment.append(anchor, rawUrl.slice(url.length));
            } else {
                var _match_;
                const prefix = (_match_ = match[2]) !== null && _match_ !== void 0 ? _match_ : '';
                const hashtag = match[3];
                if (prefix) fragment.append(prefix);
                if (hashtag) {
                    const anchor = document.createElement('a');
                    anchor.href = "/".concat(locale, "?keyword=").concat(encodeURIComponent(hashtag.replace(/_/g, ' ')));
                    anchor.textContent = "#".concat(hashtag);
                    fragment.append(anchor);
                }
            }
            lastIndex = start + match[0].length;
        }
        if (!hasToken) return;
        if (lastIndex < value.length) fragment.append(value.slice(lastIndex));
        node.replaceWith(fragment);
    });
    return parsed.body.innerHTML;
}
function getInsightPrice(price, freeLabel) {
    const normalizedPrice = String(price !== null && price !== void 0 ? price : '').trim();
    if (!normalizedPrice) return null;
    const numericPrice = Number(normalizedPrice);
    if (!Number.isNaN(numericPrice)) {
        return {
            label: numericPrice === 0 ? freeLabel : "$".concat(numericPrice.toLocaleString('en-US', {
                maximumFractionDigits: 2
            })),
            isFree: numericPrice === 0
        };
    }
    return {
        label: normalizedPrice,
        isFree: false
    };
}
function formatPostDate(value, locale) {
    if (!value) return null;
    const date = new Date(value.includes('T') ? value : value.replace(' ', 'T'));
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isValid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValid"])(date)) return value;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDistanceToNow"])(date, {
        addSuffix: true,
        locale: locale === 'ar' ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$ar$2d$SA$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arSA"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$en$2d$US$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enUS"]
    });
}
function FeedSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        "aria-hidden": true,
        children: [
            0,
            1
        ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-pulse rounded-lg border border-[#DCE4EF] bg-white p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-4 w-40 rounded bg-slate-100"
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 378,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-8 w-8 rounded bg-slate-100"
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 379,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 377,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 h-4 w-full rounded bg-slate-100"
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 381,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 h-4 w-3/4 rounded bg-slate-100"
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 382,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 aspect-[16/6] rounded-md bg-slate-100"
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 383,
                        columnNumber: 11
                    }, this)
                ]
            }, item, true, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 376,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
        lineNumber: 374,
        columnNumber: 5
    }, this);
}
_c = FeedSkeleton;
function ImageGallery(param) {
    let { media, imageAlt, locale, flushBottom = false } = param;
    _s();
    const isSingleImage = media.length === 1;
    const isTwoImageLayout = media.length === 2;
    const hasInlineCarousel = media.length > 2;
    const isArabic = locale === 'ar';
    const copy = copyByLocale[isArabic ? 'ar' : 'en'];
    const [activeImageIndex, setActiveImageIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [carouselIndex, setCarouselIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const carouselRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const carouselFrameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const activeMedia = activeImageIndex === null ? null : media[activeImageIndex];
    const isCarousel = media.length > 1;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ImageGallery.useEffect": ()=>{
            setCarouselIndex(0);
            return ({
                "ImageGallery.useEffect": ()=>{
                    if (carouselFrameRef.current !== null) {
                        window.cancelAnimationFrame(carouselFrameRef.current);
                    }
                }
            })["ImageGallery.useEffect"];
        }
    }["ImageGallery.useEffect"], [
        media.length
    ]);
    const goToCarouselImage = (nextIndex)=>{
        var _carouselRef_current;
        const boundedIndex = Math.max(0, Math.min(nextIndex, media.length - 1));
        const slide = (_carouselRef_current = carouselRef.current) === null || _carouselRef_current === void 0 ? void 0 : _carouselRef_current.querySelector('[data-feed-image-index="'.concat(boundedIndex, '"]'));
        slide === null || slide === void 0 ? void 0 : slide.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
        setCarouselIndex(boundedIndex);
    };
    const updateCarouselIndex = ()=>{
        if (carouselFrameRef.current !== null) return;
        carouselFrameRef.current = window.requestAnimationFrame(()=>{
            carouselFrameRef.current = null;
            const carousel = carouselRef.current;
            if (!carousel) return;
            const carouselCenter = carousel.getBoundingClientRect().left + carousel.clientWidth / 2;
            let closestIndex = 0;
            let closestDistance = Number.POSITIVE_INFINITY;
            carousel.querySelectorAll('[data-feed-image-index]').forEach((slide)=>{
                const bounds = slide.getBoundingClientRect();
                const distance = Math.abs(bounds.left + bounds.width / 2 - carouselCenter);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    var _slide_dataset_feedImageIndex;
                    closestIndex = Number((_slide_dataset_feedImageIndex = slide.dataset.feedImageIndex) !== null && _slide_dataset_feedImageIndex !== void 0 ? _slide_dataset_feedImageIndex : 0);
                }
            });
            setCarouselIndex(closestIndex);
        });
    };
    const showPreviousImage = ()=>{
        setActiveImageIndex((current)=>current === null ? 0 : (current - 1 + media.length) % media.length);
    };
    const showNextImage = ()=>{
        setActiveImageIndex((current)=>current === null ? 0 : (current + 1) % media.length);
    };
    var _media__url, _activeMedia_url;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            isSingleImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "-mx-5 mt-5 overflow-hidden bg-[#F6F9FD] sm:-mx-6 ".concat(flushBottom ? '-mb-5 rounded-b-lg sm:-mb-6' : ''),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>setActiveImageIndex(0),
                    "aria-label": copy.openImage,
                    className: "relative flex w-full cursor-zoom-in items-center justify-center overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2378E8]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: (_media__url = media[0].url) !== null && _media__url !== void 0 ? _media__url : '',
                        alt: media[0].name || imageAlt,
                        loading: "lazy",
                        className: "feed-media-contain block h-auto max-w-full object-contain",
                        style: {
                            maxHeight: 'min(650px, 70dvh)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 485,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                    lineNumber: 479,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 474,
                columnNumber: 9
            }, this),
            isTwoImageLayout && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "-mx-5 mt-5 grid grid-cols-2 items-stretch gap-1.5 overflow-hidden bg-white sm:-mx-6 ".concat(flushBottom ? '-mb-5 rounded-b-lg sm:-mb-6' : ''),
                dir: isArabic ? 'rtl' : 'ltr',
                children: media.map((item, index)=>{
                    var _item_url;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setActiveImageIndex(index),
                        "aria-label": "".concat(copy.openImage, ": ").concat(copy.imageCount(index + 1, media.length)),
                        className: "relative flex h-[240px] cursor-zoom-in items-center justify-center overflow-hidden rounded-md bg-[#101724] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2378E8] sm:h-[300px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: (_item_url = item.url) !== null && _item_url !== void 0 ? _item_url : '',
                            alt: item.name || imageAlt,
                            loading: "lazy",
                            className: "feed-media-contain block h-full w-full object-contain"
                        }, void 0, false, {
                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                            lineNumber: 511,
                            columnNumber: 15
                        }, this)
                    }, item.id, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 504,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 497,
                columnNumber: 9
            }, this),
            hasInlineCarousel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative -mx-5 mt-5 overflow-hidden bg-[#E9EEF5] pt-1.5 sm:-mx-6 ".concat(flushBottom ? '-mb-5 rounded-b-lg sm:-mb-6' : ''),
                dir: isArabic ? 'rtl' : 'ltr',
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: carouselRef,
                        role: "region",
                        "aria-label": copy.imageCount(carouselIndex + 1, media.length),
                        tabIndex: 0,
                        onScroll: updateCarouselIndex,
                        onKeyDown: (event)=>{
                            if (event.key === 'ArrowLeft') {
                                event.preventDefault();
                                goToCarouselImage(carouselIndex + (isArabic ? 1 : -1));
                            }
                            if (event.key === 'ArrowRight') {
                                event.preventDefault();
                                goToCarouselImage(carouselIndex + (isArabic ? -1 : 1));
                            }
                        },
                        className: "flex snap-x snap-mandatory items-start gap-1.5 overflow-x-auto pe-[8%] ps-0 [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2378E8] [&::-webkit-scrollbar]:hidden sm:pe-[12%]",
                        children: media.map((item, index)=>{
                            var _item_url;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "data-feed-image-index": index,
                                onClick: ()=>setActiveImageIndex(index),
                                "aria-label": "".concat(copy.openImage, ": ").concat(copy.imageCount(index + 1, media.length)),
                                className: "relative flex h-[280px] w-[84%] shrink-0 snap-center items-center justify-center cursor-zoom-in overflow-hidden rounded-md bg-[#101724] shadow-sm focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white sm:h-[340px] sm:w-[76%]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: (_item_url = item.url) !== null && _item_url !== void 0 ? _item_url : '',
                                    alt: item.name || imageAlt,
                                    loading: "lazy",
                                    className: "feed-media-contain block h-full w-full object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                    lineNumber: 556,
                                    columnNumber: 17
                                }, this)
                            }, item.id, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 548,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 529,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "pointer-events-none absolute end-3 top-3 rounded-md bg-[#101724]/80 px-2 py-1 text-xs font-semibold tabular-nums text-white shadow-sm backdrop-blur-sm",
                        "aria-live": "polite",
                        children: [
                            carouselIndex + 1,
                            "/",
                            media.length
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 566,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>goToCarouselImage(carouselIndex - 1),
                        disabled: carouselIndex === 0,
                        "aria-label": copy.previousImage,
                        className: "absolute start-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#253247] shadow-md transition hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] disabled:pointer-events-none disabled:opacity-0 sm:flex",
                        children: isArabic ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronRight$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronRight$3e$__["IconChevronRight"], {
                            "aria-hidden": true,
                            className: "h-5 w-5"
                        }, void 0, false, {
                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                            lineNumber: 580,
                            columnNumber: 25
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronLeft$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronLeft$3e$__["IconChevronLeft"], {
                            "aria-hidden": true,
                            className: "h-5 w-5"
                        }, void 0, false, {
                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                            lineNumber: 580,
                            columnNumber: 80
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 573,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>goToCarouselImage(carouselIndex + 1),
                        disabled: carouselIndex === media.length - 1,
                        "aria-label": copy.nextImage,
                        className: "absolute end-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#253247] shadow-md transition hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] disabled:pointer-events-none disabled:opacity-0 sm:flex",
                        children: isArabic ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronLeft$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronLeft$3e$__["IconChevronLeft"], {
                            "aria-hidden": true,
                            className: "h-5 w-5"
                        }, void 0, false, {
                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                            lineNumber: 589,
                            columnNumber: 25
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronRight$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronRight$3e$__["IconChevronRight"], {
                            "aria-hidden": true,
                            className: "h-5 w-5"
                        }, void 0, false, {
                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                            lineNumber: 589,
                            columnNumber: 79
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 582,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 523,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
                opened: activeMedia !== null,
                onClose: ()=>setActiveImageIndex(null),
                centered: true,
                size: "92vw",
                padding: 0,
                yOffset: 24,
                withCloseButton: false,
                overlayProps: {
                    backgroundOpacity: 0.72,
                    blur: 3
                },
                classNames: {
                    content: 'overflow-hidden bg-[#101724]',
                    body: 'h-full p-0'
                },
                styles: {
                    content: {
                        height: 'calc(100dvh - 48px)',
                        maxWidth: '1400px',
                        maxHeight: 'calc(100dvh - 48px)',
                        overflow: 'hidden',
                        backgroundColor: '#101724'
                    },
                    body: {
                        height: '100%'
                    }
                },
                children: activeMedia && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative flex h-full w-full min-h-[220px] items-center justify-center bg-[#101724]",
                    dir: isArabic ? 'rtl' : 'ltr',
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setActiveImageIndex(null),
                            "aria-label": copy.closeImagePreview,
                            className: "absolute end-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#101724] shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#101724]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__["IconX"], {
                                "aria-hidden": true,
                                className: "h-5 w-5",
                                stroke: 2.2
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 626,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                            lineNumber: 620,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: (_activeMedia_url = activeMedia.url) !== null && _activeMedia_url !== void 0 ? _activeMedia_url : '',
                            alt: activeMedia.name || imageAlt,
                            className: "feed-media-contain block h-full w-full"
                        }, void 0, false, {
                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                            lineNumber: 628,
                            columnNumber: 13
                        }, this),
                        isCarousel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: showPreviousImage,
                                    "aria-label": copy.previousImage,
                                    className: "absolute start-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white shadow-lg transition-colors hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:start-5",
                                    children: isArabic ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronRight$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronRight$3e$__["IconChevronRight"], {
                                        "aria-hidden": true,
                                        className: "h-6 w-6"
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                        lineNumber: 642,
                                        columnNumber: 31
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronLeft$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronLeft$3e$__["IconChevronLeft"], {
                                        "aria-hidden": true,
                                        className: "h-6 w-6"
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                        lineNumber: 642,
                                        columnNumber: 86
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                    lineNumber: 636,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: showNextImage,
                                    "aria-label": copy.nextImage,
                                    className: "absolute end-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white shadow-lg transition-colors hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:end-5",
                                    children: isArabic ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronLeft$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronLeft$3e$__["IconChevronLeft"], {
                                        "aria-hidden": true,
                                        className: "h-6 w-6"
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                        lineNumber: 650,
                                        columnNumber: 31
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronRight$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronRight$3e$__["IconChevronRight"], {
                                        "aria-hidden": true,
                                        className: "h-6 w-6"
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                        lineNumber: 650,
                                        columnNumber: 85
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                    lineNumber: 644,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white",
                                    dir: "auto",
                                    children: copy.imageCount((activeImageIndex !== null && activeImageIndex !== void 0 ? activeImageIndex : 0) + 1, media.length)
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                    lineNumber: 652,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                    lineNumber: 619,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 594,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(ImageGallery, "tUMko85fuNBibhc43PZHhs4lYDM=");
_c1 = ImageGallery;
// iPads and iPhones have a small fixed pool of hardware video decoders, and
// WebKit fails streams with MEDIA_ERR_DECODE when a feed keeps several of them
// busy. Allow only one feed video to play at a time: claiming playback pauses
// whichever video currently holds it.
// Pick the HLS engine per browser engine, not per platform. Apple WebKit
// (Safari, plus every WebKit-based iOS browser — navigator.vendor is "Apple
// Computer, Inc." there) plays HLS natively and reliably, while its MSE path
// (ManagedMediaSource) throws decode errors. Chromium (vendor "Google Inc."),
// including Blink-based Chrome on iPadOS and Android, claims native HLS
// support but its demuxer fails on Mux streams with
// DEMUXER_ERROR_COULD_NOT_PARSE — it needs hls.js/MSE, as does Firefox.
function preferredHlsPlayback() {
    var _navigator_vendor;
    if (typeof navigator === 'undefined') return 'mse';
    return ((_navigator_vendor = navigator.vendor) === null || _navigator_vendor === void 0 ? void 0 : _navigator_vendor.includes('Apple')) ? 'native' : 'mse';
}
let pauseActiveFeedVideo = null;
// Sound is a feed-level preference, as it is on other social feeds. When a
// viewer unmutes (or mutes) one post, mounted players and videos mounted later
// in the same feed session inherit that choice.
let areFeedVideosMuted = true;
const feedVideoMuteListeners = new Set();
function setFeedVideosMuted(muted) {
    if (areFeedVideosMuted === muted) return;
    areFeedVideosMuted = muted;
    feedVideoMuteListeners.forEach((listener)=>listener(muted));
}
function claimFeedPlayback(pause) {
    if (pauseActiveFeedVideo && pauseActiveFeedVideo !== pause) pauseActiveFeedVideo();
    pauseActiveFeedVideo = pause;
}
function releaseFeedPlayback(pause) {
    if (pauseActiveFeedVideo === pause) pauseActiveFeedVideo = null;
}
function VideoPlayer(param) {
    let { media, title, playLabel, flushBottom = false } = param;
    _s1();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Hold the media element itself rather than querying for it when a pause is
    // needed: the element is unmounted as soon as the card leaves the preload
    // window, and a fast scroll can drop it in the same commit that flips
    // `isInViewport`, leaving a DOM query with nothing to pause.
    const playerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [shouldPreload, setShouldPreload] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isInViewport, setIsInViewport] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Mirrors `isInViewport` for listeners that must read it without being
    // re-subscribed on every change.
    const isInViewportRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [autoplayBlocked, setAutoplayBlocked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMuted, setIsMuted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(areFeedVideosMuted);
    // Bumped to remount the player after a decode failure (see the error effect).
    const [playerEpoch, setPlayerEpoch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const decodeRetriesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const fatalErrorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // When HLS playback is impossible in this browser (e.g. Blink-based Chrome
    // on iPadOS fails both natively and via MSE), fall back to the progressive
    // MP4 static rendition that Mux generates alongside the stream.
    const [useMp4Fallback, setUseMp4Fallback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const pauseSelf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VideoPlayer.useCallback[pauseSelf]": ()=>{
            var _playerRef_current;
            (_playerRef_current = playerRef.current) === null || _playerRef_current === void 0 ? void 0 : _playerRef_current.pause();
        }
    }["VideoPlayer.useCallback[pauseSelf]"], []);
    // React detaches a callback ref while the element is still alive, so this is
    // the last moment a player that is about to be unmounted can be stopped —
    // otherwise a card scrolled past quickly enough to leave the preload window
    // in the same commit keeps its audio going.
    const attachPlayer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VideoPlayer.useCallback[attachPlayer]": (node)=>{
            const previous = playerRef.current;
            if (!node && previous) {
                previous.pause();
                releaseFeedPlayback(pauseSelf);
            }
            playerRef.current = node;
        }
    }["VideoPlayer.useCallback[attachPlayer]"], [
        pauseSelf
    ]);
    const playVideo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VideoPlayer.useCallback[playVideo]": async ()=>{
            const player = playerRef.current;
            if (!player) return;
            // Read the module-level value here so an intersection callback can never
            // start with a stale sound preference from an earlier render.
            player.muted = areFeedVideosMuted;
            claimFeedPlayback(pauseSelf);
            try {
                await player.play();
                setAutoplayBlocked(false);
            } catch (error) {
                // Scrolling away pauses the video, which rejects a play() that is still
                // pending. That is not a blocked autoplay, so don't offer the overlay.
                if (!isInViewportRef.current) return;
                setAutoplayBlocked(true);
                console.warn('Mux autoplay was blocked by the browser.', error);
            }
        }
    }["VideoPlayer.useCallback[playVideo]"], [
        pauseSelf
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VideoPlayer.useEffect": ()=>{
            feedVideoMuteListeners.add(setIsMuted);
            return ({
                "VideoPlayer.useEffect": ()=>{
                    feedVideoMuteListeners.delete(setIsMuted);
                }
            })["VideoPlayer.useEffect"];
        }
    }["VideoPlayer.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VideoPlayer.useEffect": ()=>{
            const container = containerRef.current;
            if (!container || !media.provider_playback_id) return;
            setAutoplayBlocked(false);
            // Mount roughly half a screen before the card becomes visible. Keeping
            // this window tight bounds how many media elements exist at once, which
            // matters on iOS/iPadOS where decoder resources are scarce.
            const preloadObserver = new IntersectionObserver({
                "VideoPlayer.useEffect": (param)=>{
                    let [entry] = param;
                    return setShouldPreload(entry.isIntersecting);
                }
            }["VideoPlayer.useEffect"], {
                rootMargin: '50% 0px'
            });
            // Require the card to be mostly visible before it counts as "in viewport"
            // so barely-visible videos at the screen edges don't compete for playback.
            const playbackObserver = new IntersectionObserver({
                "VideoPlayer.useEffect": (param)=>{
                    let [entry] = param;
                    // Kept in a ref as well so the play guard below sees the change
                    // immediately, before React has committed the state update.
                    isInViewportRef.current = entry.isIntersecting;
                    setIsInViewport(entry.isIntersecting);
                }
            }["VideoPlayer.useEffect"], {
                threshold: 0.5
            });
            preloadObserver.observe(container);
            playbackObserver.observe(container);
            return ({
                "VideoPlayer.useEffect": ()=>{
                    preloadObserver.disconnect();
                    playbackObserver.disconnect();
                }
            })["VideoPlayer.useEffect"];
        }
    }["VideoPlayer.useEffect"], [
        media.provider_playback_id
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VideoPlayer.useEffect": ()=>{
            const player = playerRef.current;
            if (!player) return;
            if (isInViewport) {
                void playVideo();
            } else {
                player.pause();
                releaseFeedPlayback(pauseSelf);
                setAutoplayBlocked(false);
            }
        }
    }["VideoPlayer.useEffect"], [
        isInViewport,
        playVideo,
        pauseSelf,
        shouldPreload,
        playerEpoch,
        useMp4Fallback
    ]);
    // Mux keeps its own autoplay handler running for the life of the player: it
    // calls play() on every `loadstart` the media element fires, which for HLS
    // happens once the stream is attached — long after mount, and possibly long
    // after the card was scrolled past and paused. The browser's own autoplay
    // flag would stay cleared after a pause, but Mux's handler does not, so a
    // video that was still loading when it left the screen would start playing
    // (with sound) off-screen. Pause anything that starts while off-screen.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VideoPlayer.useEffect": ()=>{
            const player = playerRef.current;
            if (!player) return;
            const pauseIfOffscreen = {
                "VideoPlayer.useEffect.pauseIfOffscreen": ()=>{
                    if (!isInViewportRef.current) player.pause();
                }
            }["VideoPlayer.useEffect.pauseIfOffscreen"];
            player.addEventListener('play', pauseIfOffscreen);
            player.addEventListener('playing', pauseIfOffscreen);
            return ({
                "VideoPlayer.useEffect": ()=>{
                    player.removeEventListener('play', pauseIfOffscreen);
                    player.removeEventListener('playing', pauseIfOffscreen);
                }
            })["VideoPlayer.useEffect"];
        }
    }["VideoPlayer.useEffect"], [
        shouldPreload,
        playerEpoch,
        useMp4Fallback
    ]);
    // Keep every mounted player synchronized, including paused videos further
    // up or down the feed. `volumechange` captures changes made through either
    // the Mux controls or the browser's native MP4 controls.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VideoPlayer.useEffect": ()=>{
            const player = playerRef.current;
            if (!player) return;
            player.muted = isMuted;
            const handleVolumeChange = {
                "VideoPlayer.useEffect.handleVolumeChange": ()=>setFeedVideosMuted(player.muted)
            }["VideoPlayer.useEffect.handleVolumeChange"];
            player.addEventListener('volumechange', handleVolumeChange);
            return ({
                "VideoPlayer.useEffect": ()=>player.removeEventListener('volumechange', handleVolumeChange)
            })["VideoPlayer.useEffect"];
        }
    }["VideoPlayer.useEffect"], [
        isMuted,
        playerEpoch,
        shouldPreload,
        useMp4Fallback
    ]);
    // Stop playback and release the shared slot when the card unmounts entirely
    // — a route change or the feed dropping the item off the list.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VideoPlayer.useEffect": ()=>({
                "VideoPlayer.useEffect": ()=>{
                    var _playerRef_current;
                    (_playerRef_current = playerRef.current) === null || _playerRef_current === void 0 ? void 0 : _playerRef_current.pause();
                    releaseFeedPlayback(pauseSelf);
                }
            })["VideoPlayer.useEffect"]
    }["VideoPlayer.useEffect"], [
        pauseSelf
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VideoPlayer.useEffect": ()=>{
            if (!shouldPreload || useMp4Fallback) return;
            const player = playerRef.current;
            if (!player) return;
            fatalErrorRef.current = false;
            const handleError = {
                "VideoPlayer.useEffect.handleError": (event)=>{
                    var _detail;
                    fatalErrorRef.current = true;
                    const code = (_detail = event.detail) === null || _detail === void 0 ? void 0 : _detail.code;
                    // MEDIA_ERR_DECODE (3): decoder pools on tablets are small and a stream
                    // can fail transiently while several players exist. Remounting recovers.
                    if (code === MediaError.MEDIA_ERR_DECODE && decodeRetriesRef.current < 2) {
                        decodeRetriesRef.current += 1;
                        setPlayerEpoch({
                            "VideoPlayer.useEffect.handleError": (epoch)=>epoch + 1
                        }["VideoPlayer.useEffect.handleError"]);
                    } else {
                        // Retries exhausted or a non-decode fatal error: HLS won't play in
                        // this browser. Switch to the progressive MP4 rendition.
                        setUseMp4Fallback(true);
                        fatalErrorRef.current = false;
                    }
                }
            }["VideoPlayer.useEffect.handleError"];
            player.addEventListener('error', handleError);
            return ({
                "VideoPlayer.useEffect": ()=>player.removeEventListener('error', handleError)
            })["VideoPlayer.useEffect"];
        }
    }["VideoPlayer.useEffect"], [
        shouldPreload,
        playerEpoch,
        useMp4Fallback
    ]);
    if (media.provider_playback_id) {
        // Reserve the box at the video's real aspect ratio so it doesn't collapse
        // to a tiny height before Mux loads metadata (avoids the layout shift where
        // the player snaps to full size on scroll/playback). Falls back to 16/9.
        const aspectRatio = media.width && media.height ? "".concat(media.width, " / ").concat(media.height) : '16 / 9';
        // Portrait videos are bound by height (the maxHeight cap) so the width is
        // derived and the box stays narrow; landscape videos fill the card width.
        const isPortrait = !!(media.width && media.height && media.height > media.width);
        // Fills the letterbox bars with a blurred still from the video itself
        // (the LinkedIn treatment) instead of flat black. A second <video> would
        // double the decoder usage the rest of this component works to keep down,
        // so this is a still frame: a tiny Mux thumbnail, which the blur hides the
        // low resolution of.
        const blurBackdrop = "https://image.mux.com/".concat(media.provider_playback_id, "/thumbnail.jpg?width=320");
        return(// Full-width black band that letterboxes and centers the video box.
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative -mx-5 mt-5 flex justify-center overflow-hidden bg-black sm:-mx-6 ".concat(flushBottom ? '-mb-5 rounded-b-lg sm:-mb-6' : ''),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    "aria-hidden": true,
                    // Scaled up so the blur's soft, semi-transparent edges stay outside
                    // the band rather than showing as a lighter frame around it.
                    className: "pointer-events-none absolute inset-0 scale-125 bg-cover bg-center opacity-60 blur-2xl",
                    style: {
                        backgroundImage: 'url("'.concat(blurBackdrop, '")')
                    }
                }, void 0, false, {
                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                    lineNumber: 936,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: containerRef,
                    className: "relative z-[1]",
                    style: {
                        aspectRatio,
                        maxHeight: 'min(650px, 70dvh)',
                        ...isPortrait ? {
                            height: 'min(650px, 70dvh)',
                            width: 'auto',
                            maxWidth: '100%'
                        } : {
                            width: '100%'
                        }
                    },
                    children: [
                        shouldPreload && useMp4Fallback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                            ref: attachPlayer,
                            src: "https://stream.mux.com/".concat(media.provider_playback_id, "/highest.mp4"),
                            // Keep the autoplay attribute present from the initial mount.
                            // WebKit decides whether a video may autoplay at that point; adding
                            // it later after the card enters view can leave an iPhone/iPad
                            // showing its native "Tap to play" prompt.
                            autoPlay: true,
                            muted: isMuted,
                            loop: true,
                            playsInline: true,
                            controls: true,
                            preload: isInViewport ? 'auto' : 'metadata',
                            onError: ()=>{
                                // MP4 rendition missing or also unplayable — surface the
                                // overlay; tapping it restarts the HLS player from scratch.
                                fatalErrorRef.current = true;
                                setAutoplayBlocked(true);
                            },
                            style: {
                                width: '100%',
                                height: '100%',
                                display: 'block',
                                objectFit: 'contain'
                            }
                        }, "mp4-".concat(playerEpoch), false, {
                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                            lineNumber: 955,
                            columnNumber: 13
                        }, this),
                        shouldPreload && !useMp4Fallback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mux-player", {
                            ref: attachPlayer,
                            "playback-id": media.provider_playback_id,
                            "stream-type": "on-demand",
                            "metadata-video-title": title,
                            "accent-color": "#2378E8",
                            "disable-tracking": "",
                            // Mux passes this through to the underlying media element. It must
                            // be present on first render (together with muted + playsinline)
                            // for iOS/iPadOS to permit initial autoplay. Keep autoplay stable:
                            // changing it when sound is toggled can restart nearby players.
                            autoplay: true,
                            "prefer-playback": preferredHlsPlayback(),
                            preload: isInViewport ? 'auto' : 'metadata',
                            // Cap the ABR ladder so a feed full of players does not pull 4K.
                            // 1080p rather than 720p: the card renders up to 650px tall, and
                            // portrait video is bound by height, so 720p was visibly soft.
                            "max-resolution": "1080p",
                            muted: isMuted,
                            loop: true,
                            playsinline: true,
                            style: {
                                width: '100%',
                                height: '100%',
                                display: 'block'
                            }
                        }, playerEpoch, false, {
                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                            lineNumber: 979,
                            columnNumber: 13
                        }, this),
                        autoplayBlocked && isInViewport && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>{
                                if (fatalErrorRef.current) {
                                    // play() on failed media just rejects again; remount the
                                    // player from scratch and let the playback effect restart it.
                                    fatalErrorRef.current = false;
                                    decodeRetriesRef.current = 0;
                                    setUseMp4Fallback(false);
                                    setAutoplayBlocked(false);
                                    setPlayerEpoch((epoch)=>epoch + 1);
                                } else {
                                    void playVideo();
                                }
                            },
                            "aria-label": playLabel,
                            className: "absolute inset-0 z-10 flex items-center justify-center bg-black/25 text-white transition-colors hover:bg-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-2 rounded-full bg-black/75 px-5 py-3 text-sm font-semibold shadow-xl backdrop-blur-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlayerPlayFilled$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlayerPlayFilled$3e$__["IconPlayerPlayFilled"], {
                                        "aria-hidden": true,
                                        className: "h-5 w-5"
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                        lineNumber: 1024,
                                        columnNumber: 17
                                    }, this),
                                    playLabel
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 1023,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                            lineNumber: 1005,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                    lineNumber: 943,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
            lineNumber: 933,
            columnNumber: 7
        }, this));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-5 flex aspect-video items-center justify-center rounded-md bg-[#101724] text-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconVideo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconVideo$3e$__["IconVideo"], {
            "aria-hidden": true,
            className: "h-9 w-9",
            stroke: 1.5
        }, void 0, false, {
            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
            lineNumber: 1036,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
        lineNumber: 1035,
        columnNumber: 5
    }, this);
}
_s1(VideoPlayer, "fd/mJKPuKg7Pu3H1C99WFDP8+I4=");
_c2 = VideoPlayer;
function ArticlePreview(param) {
    let { item, cover, locale, isPublic, flushBottom = false } = param;
    const isArabic = locale === 'ar';
    const copy = copyByLocale[isArabic ? 'ar' : 'en'];
    const articleText = stripHtml(item.excerpt || item.body || '');
    var _item_title;
    const isArticleTitleArabic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$textUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFirstWordArabic"])((_item_title = item.title) !== null && _item_title !== void 0 ? _item_title : '');
    const isArticleTextArabic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$textUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFirstWordArabic"])(articleText);
    var _item_title1;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: isPublic && item.slug ? "/".concat(locale, "/article/").concat(item.slug) : "/".concat(locale, "/article/").concat(item.uuid, "?source=my-feeds"),
        "aria-label": "".concat(copy.article, ": ").concat((_item_title1 = item.title) !== null && _item_title1 !== void 0 ? _item_title1 : articleText),
        className: "group -mx-5 mt-5 block overflow-hidden border-y border-[#DCE4ED] bg-[#F3F6F8] transition-colors hover:bg-[#EDF2F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2378E8] sm:-mx-6 ".concat(flushBottom ? '-mb-5 rounded-b-lg sm:-mb-6' : ''),
        children: [
            (cover === null || cover === void 0 ? void 0 : cover.url) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative aspect-[1.91/1] w-full overflow-hidden bg-[#E8EDF2]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: cover.url,
                    alt: cover.name || item.title || copy.articleCoverAlt,
                    loading: "lazy",
                    className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
                }, void 0, false, {
                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                    lineNumber: 1074,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 1073,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex aspect-[1.91/1] w-full items-center justify-center bg-[linear-gradient(135deg,#EAF1F8_0%,#DCE8F4_100%)] text-[#6C829E]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArticle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArticle$3e$__["IconArticle"], {
                    "aria-hidden": true,
                    className: "h-12 w-12",
                    stroke: 1.3
                }, void 0, false, {
                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                    lineNumber: 1083,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 1082,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-5 py-4 sm:px-6 sm:py-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#5D7089]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArticle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArticle$3e$__["IconArticle"], {
                                "aria-hidden": true,
                                className: "h-4 w-4 text-[#2378E8]",
                                stroke: 1.8
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 1089,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: copy.article
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 1090,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1088,
                        columnNumber: 9
                    }, this),
                    item.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        dir: isArticleTitleArabic ? 'rtl' : 'ltr',
                        className: "mt-2.5 text-[20px] font-bold leading-7 tracking-[-0.025em] text-[#101724] sm:text-[22px] sm:leading-8 ".concat(isArticleTitleArabic ? 'text-right' : 'text-left'),
                        children: item.title
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1094,
                        columnNumber: 11
                    }, this),
                    articleText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        dir: isArticleTextArabic ? 'rtl' : 'ltr',
                        className: "mt-1.5 line-clamp-2 text-[14px] leading-6 text-[#56677E] sm:text-[15px] ".concat(isArticleTextArabic ? 'text-right' : 'text-left'),
                        children: articleText
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1103,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 1087,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
        lineNumber: 1061,
        columnNumber: 5
    }, this);
}
_c3 = ArticlePreview;
function TrackSignalIcon(param) {
    let { animated } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: animated ? '#1D4ED8' : 'currentColor',
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: "h-4 w-4 sm:h-[18px] sm:w-[18px]",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "12",
                r: "1.5"
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 1127,
                columnNumber: 7
            }, this),
            animated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "12",
                        cy: "12",
                        r: "4.5",
                        vectorEffect: "non-scaling-stroke",
                        className: "track-signal-wave track-signal-wave--near",
                        style: {
                            stroke: '#1D4ED8'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1130,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "12",
                        cy: "12",
                        r: "4.5",
                        vectorEffect: "non-scaling-stroke",
                        className: "track-signal-wave track-signal-wave--far",
                        style: {
                            stroke: '#1D4ED8'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1138,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "12",
                        cy: "12",
                        r: "4.5"
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1149,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "12",
                        cy: "12",
                        r: "8.5"
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1150,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
        lineNumber: 1117,
        columnNumber: 5
    }, this);
}
_c4 = TrackSignalIcon;
function FeedCard(param) {
    let { item, locale, onDelete, onEdit, onSaveChange, articleAccess = 'owner' } = param;
    var _insighter_company, _insighter_company1, _insighter_company2, _insighter_company3, _item_title;
    _s2();
    const isArabic = locale === 'ar';
    const copy = copyByLocale[isArabic ? 'ar' : 'en'];
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserProfile"])();
    const [openingInsight, setOpeningInsight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isTracked, setIsTracked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(item.is_tracked === true);
    const [isUpdatingTrack, setIsUpdatingTrack] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isBodyExpanded, setIsBodyExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isBodyOverflowing, setIsBodyOverflowing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const bodyContentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isCollapsingBodyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    var _item_published_at;
    const date = formatPostDate((_item_published_at = item.published_at) !== null && _item_published_at !== void 0 ? _item_published_at : item.created_at, locale);
    const isArticle = item.content_type === 'article';
    var _item_title1;
    const isPostTitleArabic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$textUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFirstWordArabic"])((_item_title1 = item.title) !== null && _item_title1 !== void 0 ? _item_title1 : '');
    var _item_body;
    const postBodyText = stripHtml((_item_body = item.body) !== null && _item_body !== void 0 ? _item_body : '');
    const postBodyWordCount = postBodyText ? postBodyText.split(/\s+/).length : 0;
    const isBodyCollapseCandidate = postBodyWordCount >= FEED_BODY_MIN_WORDS_TO_COLLAPSE;
    const isPostBodyArabic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$textUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFirstWordArabic"])(postBodyText);
    var _item_body1;
    const isRichPostBody = /<\/?[a-z][^>]*>/i.test((_item_body1 = item.body) !== null && _item_body1 !== void 0 ? _item_body1 : '');
    const imageMedia = item.media.filter((media)=>media.media_type === 'image' && media.url);
    const articleCover = isArticle ? imageMedia[0] : undefined;
    const videoMedia = item.media.find((media)=>media.media_type === 'video');
    const attachments = item.media.filter((media)=>media.media_type === 'attachment' && media.url);
    const hasPostMedia = Boolean(videoMedia) || imageMedia.length > 0;
    const hasRichContent = isArticle || hasPostMedia || attachments.length > 0 || item.related_insights.length > 0;
    const showEngagementActions = articleAccess === 'community' && Boolean(item.insighter);
    const showShareAction = Boolean(item.insighter);
    const isMediaLast = attachments.length === 0 && item.related_insights.length === 0 && !showShareAction;
    const statusTone = item.status === 'published' ? 'bg-[#EAF8F1] text-[#168A55]' : item.status === 'failed' ? 'bg-[#FFF0EE] text-[#B53B32]' : 'bg-[#FFF5E5] text-[#A96710]';
    const insighter = item.insighter;
    const isPublishedAsCompany = item.author_profile_type === 'company' && Boolean(insighter === null || insighter === void 0 ? void 0 : insighter.company);
    const publisherName = isPublishedAsCompany ? (insighter === null || insighter === void 0 ? void 0 : (_insighter_company = insighter.company) === null || _insighter_company === void 0 ? void 0 : _insighter_company.legal_name) || (insighter === null || insighter === void 0 ? void 0 : (_insighter_company1 = insighter.company) === null || _insighter_company1 === void 0 ? void 0 : _insighter_company1.name) || (insighter === null || insighter === void 0 ? void 0 : insighter.name) || '' : (insighter === null || insighter === void 0 ? void 0 : insighter.name) || '';
    const publisherAvatar = isPublishedAsCompany ? insighter === null || insighter === void 0 ? void 0 : (_insighter_company2 = insighter.company) === null || _insighter_company2 === void 0 ? void 0 : _insighter_company2.logo : insighter === null || insighter === void 0 ? void 0 : insighter.profile_photo_url;
    const publisherInitials = publisherName.split(' ').filter(Boolean).slice(0, 2).map((part)=>part[0]).join('').toUpperCase();
    const publisherHref = isPublishedAsCompany ? "/".concat(locale, "/profile/").concat(insighter === null || insighter === void 0 ? void 0 : (_insighter_company3 = insighter.company) === null || _insighter_company3 === void 0 ? void 0 : _insighter_company3.uuid) : "/".concat(locale, "/profile/").concat(insighter === null || insighter === void 0 ? void 0 : insighter.uuid, "?entity=insighter");
    // Community-feed engagement actions (Meet / Request Service / Share) are only
    // meaningful when viewing someone else's published post in the public feed.
    // `showEngagementActions` is derived above (near the media flags).
    const isOwnPost = Boolean((user === null || user === void 0 ? void 0 : user.uuid) && insighter && user.uuid === insighter.uuid);
    const canMeet = (insighter === null || insighter === void 0 ? void 0 : insighter.has_meet_service) === true;
    const canRequestService = (insighter === null || insighter === void 0 ? void 0 : insighter.has_request_service) === true;
    const meetHref = insighter ? "/".concat(locale, "/profile/").concat(insighter.uuid, "?entity=insighter&tab=meet") : '';
    const requestServiceHref = insighter ? "/".concat(locale, "/project/wizard/project-type?").concat(new URLSearchParams({
        fresh: '1',
        [__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["specifiedInsighterQueryParam"]]: insighter.uuid,
        [__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["specifiedInsighterRoleQueryParam"]]: 'insighter',
        [__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["specifiedInsighterProfileUuidQueryParam"]]: insighter.uuid
    }).toString()) : '';
    var _item_slug, _item_slug1;
    const shareUrl = isArticle ? "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publicBaseUrl"], "/").concat(locale, "/article/").concat((_item_slug = item.slug) !== null && _item_slug !== void 0 ? _item_slug : item.uuid) : "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publicBaseUrl"], "/").concat(locale, "/post/").concat((_item_slug1 = item.slug) !== null && _item_slug1 !== void 0 ? _item_slug1 : item.uuid);
    var _item_body2;
    const shareTitle = ((_item_title = item.title) === null || _item_title === void 0 ? void 0 : _item_title.trim()) || stripHtml((_item_body2 = item.body) !== null && _item_body2 !== void 0 ? _item_body2 : '').slice(0, 120) || (insighter === null || insighter === void 0 ? void 0 : insighter.name) || '';
    const tagHashtags = item.tags.map((tag)=>toHashtagToken(tag.name)).filter(Boolean).map((tagName)=>"#".concat(tagName));
    const tagHashtagsKey = tagHashtags.join(' ');
    const handleHashtagClick = (hashtag)=>{
        router.push("/".concat(locale, "?keyword=").concat(encodeURIComponent(hashtag.replace(/_/g, ' '))));
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FeedCard.useEffect": ()=>{
            setIsTracked(item.is_tracked === true);
        }
    }["FeedCard.useEffect"], [
        item.is_tracked,
        item.uuid
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FeedCard.useEffect": ()=>{
            setIsBodyExpanded(false);
        }
    }["FeedCard.useEffect"], [
        item.body,
        item.uuid,
        tagHashtagsKey
    ]);
    useBrowserLayoutEffect({
        "FeedCard.useBrowserLayoutEffect": ()=>{
            const bodyContent = bodyContentRef.current;
            if (!bodyContent) {
                setIsBodyOverflowing(false);
                return;
            }
            const measureMeaningfulOverflow = {
                "FeedCard.useBrowserLayoutEffect.measureMeaningfulOverflow": ()=>{
                    if (!isBodyCollapseCandidate) {
                        setIsBodyOverflowing(false);
                        return;
                    }
                    const computedLineHeight = Number.parseFloat(window.getComputedStyle(bodyContent).lineHeight);
                    const lineHeight = Number.isFinite(computedLineHeight) ? computedLineHeight : 20;
                    const collapsedHeight = lineHeight * FEED_BODY_COLLAPSED_LINES;
                    const minimumExpandedHeight = collapsedHeight + lineHeight * FEED_BODY_MIN_HIDDEN_LINES;
                    // Some browsers report a line-clamped element's scrollHeight as its
                    // clamped height. Measuring that same visible element made the card
                    // alternate between clamped and expanded states. Use a hidden,
                    // unclamped clone so the visible post height never affects the result.
                    const measurement = bodyContent.cloneNode(true);
                    measurement.removeAttribute('id');
                    measurement.querySelectorAll('[id]').forEach({
                        "FeedCard.useBrowserLayoutEffect.measureMeaningfulOverflow": (element)=>element.removeAttribute('id')
                    }["FeedCard.useBrowserLayoutEffect.measureMeaningfulOverflow"]);
                    measurement.style.position = 'fixed';
                    measurement.style.inset = '0 auto auto -10000px';
                    measurement.style.width = "".concat(bodyContent.getBoundingClientRect().width, "px");
                    measurement.style.height = 'auto';
                    measurement.style.maxHeight = 'none';
                    measurement.style.overflow = 'visible';
                    measurement.style.visibility = 'hidden';
                    measurement.style.pointerEvents = 'none';
                    measurement.style.display = 'block';
                    measurement.style.setProperty('-webkit-line-clamp', 'unset');
                    measurement.style.setProperty('-webkit-box-orient', 'initial');
                    document.body.appendChild(measurement);
                    const expandedHeight = measurement.scrollHeight;
                    measurement.remove();
                    // Requiring several hidden lines prevents a "Read more" click from
                    // revealing only a sentence fragment or a single extra line.
                    setIsBodyOverflowing(expandedHeight >= minimumExpandedHeight);
                }
            }["FeedCard.useBrowserLayoutEffect.measureMeaningfulOverflow"];
            measureMeaningfulOverflow();
            const resizeObserver = new ResizeObserver(measureMeaningfulOverflow);
            resizeObserver.observe(bodyContent);
            return ({
                "FeedCard.useBrowserLayoutEffect": ()=>resizeObserver.disconnect()
            })["FeedCard.useBrowserLayoutEffect"];
        }
    }["FeedCard.useBrowserLayoutEffect"], [
        isBodyCollapseCandidate,
        item.body,
        tagHashtagsKey
    ]);
    const toggleBodyExpanded = ()=>{
        isCollapsingBodyRef.current = isBodyExpanded;
        setIsBodyExpanded((expanded)=>!expanded);
    };
    // Collapsing a long post removes content above the viewport, which would
    // otherwise leave the reader parked on the next post.
    useBrowserLayoutEffect({
        "FeedCard.useBrowserLayoutEffect": ()=>{
            var _cardRef_current;
            if (isBodyExpanded || !isCollapsingBodyRef.current) return;
            isCollapsingBodyRef.current = false;
            (_cardRef_current = cardRef.current) === null || _cardRef_current === void 0 ? void 0 : _cardRef_current.scrollIntoView({
                block: 'nearest',
                behavior: 'instant'
            });
        }
    }["FeedCard.useBrowserLayoutEffect"], [
        isBodyExpanded
    ]);
    const updateTracking = async ()=>{
        if (isUpdatingTrack || isOwnPost) return;
        if (!user) {
            const returnUrl = encodeURIComponent(window.location.href);
            router.push("/".concat(locale, "/signin?returnUrl=").concat(returnUrl));
            return;
        }
        setIsUpdatingTrack(true);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setCommunityFeedItemTracked"])(item.uuid, !isTracked, locale);
            setIsTracked(result.is_tracked);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : copy.trackFailed);
        } finally{
            setIsUpdatingTrack(false);
        }
    };
    var _item_published_at1, _ref, _item_title2, _ref1, _item_slug2;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        ref: cardRef,
        className: "relative min-w-0 max-w-full scroll-mt-20 overflow-hidden rounded-lg border border-[#D9E3EF] bg-white px-5 py-5 sm:px-6 md:scroll-mt-24",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex min-h-9 items-start justify-between gap-3 sm:gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0 flex-1 ".concat(articleAccess === 'community' ? 'pe-[76px] sm:pe-0' : ''),
                        children: insighter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex min-w-0 items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-10 w-10 shrink-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-10 w-10 overflow-hidden rounded-full bg-[#E7F0FE]",
                                        children: publisherAvatar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: publisherAvatar,
                                            alt: publisherName,
                                            className: "h-full w-full object-cover ".concat(isPublishedAsCompany ? '' : 'object-top')
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                            lineNumber: 1366,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex h-full w-full items-center justify-center text-[13px] font-bold text-[#2378E8]",
                                            children: publisherInitials || 'I'
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                            lineNumber: 1372,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                        lineNumber: 1364,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                    lineNumber: 1363,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: publisherHref,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "block truncate text-[14px] font-semibold text-[#101724] transition-colors hover:text-[#2378E8] hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-1",
                                            children: publisherName
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                            lineNumber: 1379,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex min-w-0 flex-col items-start gap-y-0.5 text-[12px] text-[#7A8BA4] sm:flex-row sm:items-center sm:gap-x-1.5 sm:text-[12.5px]",
                                            children: [
                                                item.industry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/".concat(locale, "/sub-industry/").concat(item.industry.id, "/").concat(item.industry.slug),
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    className: "min-w-0 truncate font-medium text-[#2378E8] hover:underline",
                                                    children: item.industry.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                    lineNumber: 1389,
                                                    columnNumber: 21
                                                }, this),
                                                date && item.industry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    "aria-hidden": true,
                                                    className: "hidden shrink-0 sm:inline",
                                                    children: "·"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                    lineNumber: 1398,
                                                    columnNumber: 45
                                                }, this),
                                                date && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                                                    dateTime: (_ref = (_item_published_at1 = item.published_at) !== null && _item_published_at1 !== void 0 ? _item_published_at1 : item.created_at) !== null && _ref !== void 0 ? _ref : undefined,
                                                    className: "shrink-0 whitespace-nowrap",
                                                    children: date
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                    lineNumber: 1400,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                            lineNumber: 1387,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                    lineNumber: 1378,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                            lineNumber: 1362,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1360,
                        columnNumber: 9
                    }, this),
                    (onDelete || onEdit || articleAccess === 'community') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex shrink-0 items-center gap-2 ".concat(articleAccess === 'community' ? 'absolute end-4 top-4 sm:static' : ''),
                        children: [
                            articleAccess === 'community' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Tooltip$2f$Tooltip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                label: isOwnPost ? copy.ownPostTracking : isTracked ? copy.untrackTooltip : copy.trackTooltip,
                                position: "bottom",
                                openDelay: 300,
                                withArrow: true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>void updateTracking(),
                                        disabled: isUpdatingTrack || isOwnPost,
                                        "aria-pressed": isTracked,
                                        "aria-label": isUpdatingTrack ? copy.tracking : isTracked ? copy.untrack : copy.track,
                                        className: "inline-flex min-h-[28px] items-center justify-center gap-1 rounded-full border border-black bg-white px-2 py-0.5 text-[11px] font-semibold text-black transition-[background-color,border-color,color,box-shadow] hover:border-black hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64748B] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-55 sm:min-h-[34px] sm:gap-1.5 sm:px-3 sm:py-0 sm:text-[12px]",
                                        children: [
                                            isUpdatingTrack ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__["IconLoader2"], {
                                                "aria-hidden": true,
                                                className: "h-4 w-4 animate-spin",
                                                stroke: 2
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                lineNumber: 1432,
                                                columnNumber: 23
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex h-4 w-4 shrink-0 items-center justify-center ".concat(isTracked ? 'text-[#1D4ED8]' : 'text-[#A5B0BF]', " sm:h-5 sm:w-5"),
                                                "aria-hidden": true,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TrackSignalIcon, {
                                                    animated: isTracked
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                    lineNumber: 1435,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                lineNumber: 1434,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: isTracked ? copy.untrack : copy.track
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                lineNumber: 1438,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                        lineNumber: 1423,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                    lineNumber: 1422,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 1416,
                                columnNumber: 15
                            }, this),
                            (onDelete || onEdit) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold ".concat(statusTone),
                                children: item.status_label
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 1445,
                                columnNumber: 15
                            }, this),
                            (onDelete || onEdit) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Menu$2f$Menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Menu"], {
                                shadow: "md",
                                width: 170,
                                position: isArabic ? 'bottom-start' : 'bottom-end',
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Menu$2f$Menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Menu"].Target, {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            "aria-label": copy.postActions,
                                            className: "flex h-9 w-9 items-center justify-center rounded-full text-[#8FA0B7] transition-colors hover:bg-[#F1F5FA] hover:text-[#253247] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDots$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDots$3e$__["IconDots"], {
                                                "aria-hidden": true,
                                                className: "h-5 w-5",
                                                stroke: 2.2
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                lineNumber: 1458,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                            lineNumber: 1453,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                        lineNumber: 1452,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Menu$2f$Menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Menu"].Dropdown, {
                                        children: [
                                            onEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Menu$2f$Menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Menu"].Item, {
                                                leftSection: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconEdit$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconEdit$3e$__["IconEdit"], {
                                                    "aria-hidden": true,
                                                    className: "h-4 w-4",
                                                    stroke: 1.8
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                    lineNumber: 1464,
                                                    columnNumber: 36
                                                }, void 0),
                                                onClick: ()=>onEdit(item),
                                                children: isArticle ? copy.editArticle : copy.edit
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                lineNumber: 1463,
                                                columnNumber: 21
                                            }, this),
                                            onDelete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Menu$2f$Menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Menu"].Item, {
                                                color: "red",
                                                leftSection: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTrash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTrash$3e$__["IconTrash"], {
                                                    "aria-hidden": true,
                                                    className: "h-4 w-4",
                                                    stroke: 1.8
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                    lineNumber: 1473,
                                                    columnNumber: 36
                                                }, void 0),
                                                onClick: ()=>onDelete(item),
                                                children: copy.delete
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                lineNumber: 1471,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                        lineNumber: 1461,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 1451,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1414,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 1359,
                columnNumber: 7
            }, this),
            !isArticle && item.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                dir: isPostTitleArabic ? 'rtl' : 'ltr',
                className: "mt-4 text-[17px] font-bold leading-6 tracking-[-0.02em] text-[#101724] ".concat(isPostTitleArabic ? 'text-right' : 'text-left'),
                children: renderInteractiveFeedText(item.title, handleHashtagClick)
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 1487,
                columnNumber: 9
            }, this),
            !isArticle && (item.body || tagHashtags.length > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: item.title ? 'mt-1.5' : 'mt-4',
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: bodyContentRef,
                        dir: isPostBodyArabic ? 'rtl' : 'ltr',
                        className: "text-start text-[14px] leading-5 text-[#1C2433] [&_a]:font-medium [&_a]:text-[#2378E8] [&_a]:underline [&_a]:decoration-[#2378E8]/40 [&_a]:underline-offset-2 [&_a:hover]:text-[#155DB8] [&_p]:m-0 [&_p+p]:mt-2 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:ps-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:ps-5 ".concat(isRichPostBody ? '' : 'whitespace-pre-wrap', " ").concat(isBodyExpanded || !isBodyOverflowing ? 'line-clamp-none' : 'line-clamp-[10]'),
                        children: [
                            item.body && (isRichPostBody ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                dangerouslySetInnerHTML: {
                                    __html: sanitizeAndLinkifyRichPostHtml(item.body, locale)
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 1508,
                                columnNumber: 17
                            }, this) : renderInteractiveFeedText(item.body, handleHashtagClick)),
                            tagHashtags.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: item.body ? 'mt-2' : '',
                                children: renderInteractiveFeedText(tagHashtagsKey, handleHashtagClick)
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 1515,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1497,
                        columnNumber: 11
                    }, this),
                    isBodyOverflowing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        dir: isPostBodyArabic ? 'rtl' : 'ltr',
                        className: "mt-1.5 flex",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            "aria-expanded": isBodyExpanded,
                            onClick: toggleBodyExpanded,
                            className: "text-[12px] font-semibold text-[#2378E8] transition-colors hover:text-[#155DB8] hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2",
                            children: isBodyExpanded ? copy.readLess : copy.readMore
                        }, void 0, false, {
                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                            lineNumber: 1523,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1522,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 1496,
                columnNumber: 9
            }, this),
            isArticle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ArticlePreview, {
                item: item,
                cover: articleCover,
                locale: locale,
                isPublic: articleAccess === 'community',
                flushBottom: isMediaLast
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 1537,
                columnNumber: 9
            }, this),
            !isArticle && videoMedia && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(VideoPlayer, {
                media: videoMedia,
                title: (_ref1 = (_item_title2 = item.title) !== null && _item_title2 !== void 0 ? _item_title2 : item.body) !== null && _ref1 !== void 0 ? _ref1 : 'Video',
                playLabel: copy.playVideo,
                flushBottom: isMediaLast
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 1547,
                columnNumber: 9
            }, this),
            !isArticle && imageMedia.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageGallery, {
                media: imageMedia,
                imageAlt: copy.imageAlt,
                locale: locale,
                flushBottom: isMediaLast
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 1554,
                columnNumber: 47
            }, this),
            attachments.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 space-y-2",
                children: attachments.map((attachment)=>{
                    var _attachment_url, _attachment_name;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: (_attachment_url = attachment.url) !== null && _attachment_url !== void 0 ? _attachment_url : '#',
                        target: "_blank",
                        rel: "noreferrer",
                        className: "flex items-center gap-3 rounded-md border border-[#DDE6F1] bg-[#F8FAFD] px-4 py-3 text-[13px] font-medium text-[#2378E8] transition-colors hover:bg-[#F1F6FD]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileDescription$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileDescription$3e$__["IconFileDescription"], {
                                "aria-hidden": true,
                                className: "h-5 w-5",
                                stroke: 1.7
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 1566,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "min-w-0 flex-1 truncate",
                                children: (_attachment_name = attachment.name) !== null && _attachment_name !== void 0 ? _attachment_name : copy.attachment
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 1567,
                                columnNumber: 15
                            }, this)
                        ]
                    }, attachment.id, true, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1559,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 1557,
                columnNumber: 9
            }, this),
            item.related_insights.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "-mx-5 ".concat(hasPostMedia ? 'mt-0' : 'mt-5', " divide-y divide-[#E7EDF5] overflow-hidden border-t border-[#E7EDF5] sm:-mx-6 ").concat(showShareAction ? 'border-b' : '-mb-5 rounded-b-lg sm:-mb-6'),
                children: item.related_insights.map((insight)=>{
                    const insightKey = "".concat(insight.type, "-").concat(insight.slug);
                    const insightPrice = getInsightPrice(insight.price, locale === 'ar' ? 'مجاني' : 'Free');
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "group flex flex-col overflow-hidden bg-white transition-colors duration-300 hover:bg-[#F8FAFD] sm:flex-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/".concat(locale, "/knowledge/").concat(insight.type, "/").concat(insight.slug),
                                target: "_blank",
                                rel: "noreferrer",
                                "aria-label": "".concat(copy.viewInsight, ": ").concat(insight.title),
                                className: "flex min-h-[118px] w-full min-w-0 flex-col bg-[#071426] bg-[url('/images/test2.png')] bg-cover bg-center px-4 py-2.5 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#67B5F6] sm:min-h-[155px] sm:w-[36%] sm:max-w-[280px] sm:flex-none sm:py-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$KnowledgeTypeIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    type: insight.type,
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                    lineNumber: 1595,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "rounded-full bg-[#0B315D]/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.05em] text-[#67B5F6] backdrop-blur-sm",
                                                    children: insight.type
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                    lineNumber: 1596,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                            lineNumber: 1594,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            dir: "auto",
                                            className: "mt-2.5 line-clamp-2 text-start text-[15px] font-semibold leading-6 text-white transition-colors group-hover:text-[#A8D5FF] sm:mt-4 sm:line-clamp-3 sm:text-[16px]",
                                            children: insight.title
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                            lineNumber: 1600,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                    lineNumber: 1593,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 1586,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex min-w-0 flex-1 flex-col bg-white px-4 py-4 sm:min-h-[155px] sm:px-5 sm:py-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex min-w-0 flex-1 flex-col sm:min-h-[123px]",
                                    children: [
                                        insight.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            dir: "auto",
                                            className: "line-clamp-3 text-[13px] leading-[1.2rem] text-[#667894] max-sm:hidden sm:text-[14px]",
                                            children: stripHtml(insight.description)
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                            lineNumber: 1612,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-auto flex items-center justify-between gap-4 pt-0 sm:pt-4",
                                            dir: locale === 'ar' ? 'rtl' : 'ltr',
                                            children: [
                                                insightPrice ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Badge$2f$Badge$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                    color: insightPrice.isFree ? 'green' : 'yellow',
                                                    variant: "light",
                                                    className: "shrink-0 font-semibold",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        dir: insightPrice.isFree ? 'auto' : 'ltr',
                                                        lang: insightPrice.isFree ? undefined : 'en',
                                                        children: insightPrice.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                        lineNumber: 1622,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                    lineNumber: 1621,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                    lineNumber: 1624,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/".concat(locale, "/knowledge/").concat(insight.type, "/").concat(insight.slug),
                                                    target: "_blank",
                                                    rel: "noreferrer",
                                                    "aria-busy": openingInsight === insightKey,
                                                    onClick: ()=>{
                                                        setOpeningInsight(insightKey);
                                                        window.setTimeout(()=>{
                                                            setOpeningInsight((current)=>current === insightKey ? null : current);
                                                        }, 1800);
                                                    },
                                                    className: "inline-flex min-h-7 min-w-16 items-center justify-center rounded-full border border-[#2378E8] px-2 py-0 text-center text-[13px] font-medium text-[#2378E8] transition-colors hover:bg-[#F2F7FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2",
                                                    children: openingInsight === insightKey ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__["IconLoader2"], {
                                                                "aria-hidden": true,
                                                                className: "me-1.5 h-4 w-4 animate-spin",
                                                                stroke: 2
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                                lineNumber: 1640,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                "aria-live": "polite",
                                                                children: copy.openingInsight
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                                lineNumber: 1641,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true) : copy.viewInsight
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                                    lineNumber: 1625,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                            lineNumber: 1619,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                    lineNumber: 1610,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 1609,
                                columnNumber: 15
                            }, this)
                        ]
                    }, "".concat(insight.type, "-").concat(insight.slug), true, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1582,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 1574,
                columnNumber: 9
            }, this),
            showShareAction && insighter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "-mx-5 flex min-w-0 items-center justify-around border-t border-[#E7EDF5] px-5 pt-2 sm:-mx-6 sm:px-6 ".concat(hasRichContent ? 'mt-0' : 'mt-4'),
                dir: isArabic ? 'rtl' : 'ltr',
                children: [
                    showEngagementActions && !isOwnPost && canMeet && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: meetHref,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "inline-flex min-w-0 flex-1 items-center justify-center gap-1 rounded-md px-1 py-2.5 text-[12px] font-medium text-[#5A6B85] transition-colors hover:bg-[#F5F8FC] hover:text-[#101724] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] sm:gap-2 sm:px-2 sm:text-[14px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCalendarUser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCalendarUser$3e$__["IconCalendarUser"], {
                                "aria-hidden": true,
                                className: "h-4 w-4 shrink-0 text-[#2378E8] sm:h-[18px] sm:w-[18px]",
                                stroke: 1.8
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 1668,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: copy.meet
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 1669,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1662,
                        columnNumber: 13
                    }, this),
                    showEngagementActions && !isOwnPost && canRequestService && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: requestServiceHref,
                        className: "inline-flex min-w-0 flex-1 items-center justify-center gap-1 rounded-md px-1 py-2.5 text-[12px] font-medium text-[#5A6B85] transition-colors hover:bg-[#F5F8FC] hover:text-[#101724] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] sm:gap-2 sm:px-2 sm:text-[14px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBriefcase$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBriefcase$3e$__["IconBriefcase"], {
                                "aria-hidden": true,
                                className: "h-4 w-4 shrink-0 text-[#16A34A] sm:h-[18px] sm:w-[18px]",
                                stroke: 1.8
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 1678,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: copy.requestService
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 1679,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1674,
                        columnNumber: 13
                    }, this),
                    showEngagementActions && !isOwnPost && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$FeedSaveButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        uuid: item.uuid,
                        identifier: (_item_slug2 = item.slug) !== null && _item_slug2 !== void 0 ? _item_slug2 : item.uuid,
                        contentType: item.content_type,
                        initialIsSaved: item.is_saved,
                        locale: locale,
                        layout: "action",
                        onChange: (isSaved)=>onSaveChange === null || onSaveChange === void 0 ? void 0 : onSaveChange(item, isSaved)
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1684,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$FeedShare$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        shareUrl: shareUrl,
                        shareTitle: shareTitle,
                        authorName: insighter.name,
                        authorPhotoUrl: insighter.profile_photo_url,
                        locale: locale,
                        shareKind: isArticle ? 'white-paper' : 'post'
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1695,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 1657,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
        lineNumber: 1355,
        columnNumber: 5
    }, this);
}
_s2(FeedCard, "/f0YzBqv5LGg2XMHczZ/un4YRVU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserProfile"],
        useBrowserLayoutEffect,
        useBrowserLayoutEffect
    ];
});
_c5 = FeedCard;
function MyFeedsTimeline(param) {
    let { locale } = param;
    _s3();
    const isArabic = locale === 'ar';
    const copy = copyByLocale[isArabic ? 'ar' : 'en'];
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user, roles, isAuthResolved } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserProfile"])();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [lastPage, setLastPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [total, setTotal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isLoadingMore, setIsLoadingMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loadError, setLoadError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deleteCandidate, setDeleteCandidate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editCandidate, setEditCandidate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isDeleting, setIsDeleting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const canViewOwnFeeds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MyFeedsTimeline.useMemo[canViewOwnFeeds]": ()=>roles.some({
                "MyFeedsTimeline.useMemo[canViewOwnFeeds]": (role)=>[
                        'insighter',
                        'company',
                        'company-insighter'
                    ].includes(role)
            }["MyFeedsTimeline.useMemo[canViewOwnFeeds]"])
    }["MyFeedsTimeline.useMemo[canViewOwnFeeds]"], [
        roles
    ]);
    const loadFirstPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MyFeedsTimeline.useCallback[loadFirstPage]": async (signal)=>{
            setIsLoading(true);
            setLoadError(false);
            try {
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMyFeeds"])(1, locale, signal);
                setItems(result.data);
                setPage(result.meta.current_page);
                setLastPage(result.meta.last_page);
                setTotal(result.meta.total);
            } catch (error) {
                if (error instanceof DOMException && error.name === 'AbortError') return;
                setLoadError(true);
            } finally{
                if (!(signal === null || signal === void 0 ? void 0 : signal.aborted)) setIsLoading(false);
            }
        }
    }["MyFeedsTimeline.useCallback[loadFirstPage]"], [
        locale
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MyFeedsTimeline.useEffect": ()=>{
            if (!isAuthResolved || !user || !canViewOwnFeeds) {
                if (isAuthResolved) setIsLoading(false);
                return;
            }
            const controller = new AbortController();
            void loadFirstPage(controller.signal);
            return ({
                "MyFeedsTimeline.useEffect": ()=>controller.abort()
            })["MyFeedsTimeline.useEffect"];
        }
    }["MyFeedsTimeline.useEffect"], [
        canViewOwnFeeds,
        isAuthResolved,
        loadFirstPage,
        user
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MyFeedsTimeline.useEffect": ()=>{
            const refresh = {
                "MyFeedsTimeline.useEffect.refresh": ()=>void loadFirstPage()
            }["MyFeedsTimeline.useEffect.refresh"];
            window.addEventListener('feed:published', refresh);
            return ({
                "MyFeedsTimeline.useEffect": ()=>window.removeEventListener('feed:published', refresh)
            })["MyFeedsTimeline.useEffect"];
        }
    }["MyFeedsTimeline.useEffect"], [
        loadFirstPage
    ]);
    const loadMore = async ()=>{
        if (isLoadingMore || page >= lastPage) return;
        setIsLoadingMore(true);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMyFeeds"])(page + 1, locale);
            setItems((previous)=>{
                const existing = new Set(previous.map((item)=>item.uuid));
                return [
                    ...previous,
                    ...result.data.filter((item)=>!existing.has(item.uuid))
                ];
            });
            setPage(result.meta.current_page);
            setLastPage(result.meta.last_page);
            setTotal(result.meta.total);
        } catch (e) {
            toast.error(copy.loadError);
        } finally{
            setIsLoadingMore(false);
        }
    };
    const editItem = async (item)=>{
        if (item.content_type === 'article') {
            router.push("/".concat(locale, "/article/write?edit=").concat(encodeURIComponent(item.uuid)));
            return;
        }
        try {
            setEditCandidate(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFeedItem"])(item.uuid, locale));
        } catch (error) {
            toast.error(error instanceof Error ? error.message : copy.editFailed);
        }
    };
    const editMode = (editCandidate === null || editCandidate === void 0 ? void 0 : editCandidate.media_type) === 'video' ? 'video' : (editCandidate === null || editCandidate === void 0 ? void 0 : editCandidate.media_type) === 'image' ? 'image' : 'post';
    const confirmDelete = async ()=>{
        if (!deleteCandidate || isDeleting) return;
        setIsDeleting(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteFeedItem"])(deleteCandidate.uuid, locale);
            setItems((previous)=>previous.filter((item)=>item.uuid !== deleteCandidate.uuid));
            setTotal((previous)=>Math.max(0, previous - 1));
            setDeleteCandidate(null);
            toast.success(copy.deleted);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : copy.deleteFailed);
        } finally{
            setIsDeleting(false);
        }
    };
    if (!isAuthResolved || isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            "aria-label": copy.loading,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FeedSkeleton, {}, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 1828,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
            lineNumber: 1827,
            columnNumber: 7
        }, this);
    }
    if (loadError) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "rounded-lg border border-[#DCE4EF] bg-white px-6 py-12 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-[18px] font-bold text-[#101724]",
                    children: copy.loadError
                }, void 0, false, {
                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                    lineNumber: 1836,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>void loadFirstPage(),
                    className: "mt-4 min-h-10 rounded-md bg-[#2378E8] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#1B64C5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2",
                    children: copy.tryAgain
                }, void 0, false, {
                    fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                    lineNumber: 1837,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
            lineNumber: 1835,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-labelledby": "my-feeds-title",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 flex items-end justify-between gap-4 px-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        id: "my-feeds-title",
                        className: "text-[20px] font-semibold tracking-[-0.02em] text-[#101724]",
                        children: copy.title
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1851,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[12px] text-[#7A8BA4]",
                        children: copy.count(total)
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1854,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 1850,
                columnNumber: 7
            }, this),
            items.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-lg border border-[#DCE4EF] bg-white px-6 py-14 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EDF4FD] text-[#2378E8]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPhoto$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPhoto$3e$__["IconPhoto"], {
                            "aria-hidden": true,
                            className: "h-5 w-5",
                            stroke: 1.7
                        }, void 0, false, {
                            fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                            lineNumber: 1860,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1859,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mt-4 text-[18px] font-bold text-[#101724]",
                        children: copy.emptyTitle
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1862,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mx-auto mt-2 max-w-sm text-[13px] leading-6 text-[#64748B]",
                        children: copy.emptyDescription
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1863,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 1858,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: items.map((item, index)=>{
                    // Right-column widgets are hidden below xl, so weave them between
                    // posts (LinkedIn-style) on mobile/tablet. Positions clamp to the
                    // last post so short feeds still surface them.
                    const upgradeIndex = Math.min(1, items.length - 1);
                    const documentsIndex = Math.min(3, items.length - 1);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FeedCard, {
                                item: item,
                                locale: locale,
                                onEdit: (feedItem)=>void editItem(feedItem),
                                onDelete: setDeleteCandidate
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 1878,
                                columnNumber: 17
                            }, this),
                            index === upgradeIndex && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$RoleUpgradeCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                locale: locale,
                                className: "xl:hidden"
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 1880,
                                columnNumber: 19
                            }, this),
                            index === documentsIndex && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$TopDocumentsCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                locale: locale,
                                className: "xl:hidden"
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 1883,
                                columnNumber: 19
                            }, this)
                        ]
                    }, item.uuid, true, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1877,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 1868,
                columnNumber: 9
            }, this),
            page < lastPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>void loadMore(),
                disabled: isLoadingMore,
                className: "mt-4 flex min-h-11 w-full items-center justify-center rounded-lg border border-[#C8D8EB] bg-white px-4 text-[13px] font-semibold text-[#2378E8] transition-colors hover:bg-[#F5F9FE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] disabled:cursor-wait disabled:opacity-60",
                children: isLoadingMore ? copy.loadingMore : copy.loadMore
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 1892,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
                opened: deleteCandidate !== null,
                onClose: ()=>{
                    if (!isDeleting) setDeleteCandidate(null);
                },
                centered: true,
                size: "sm",
                radius: 8,
                title: copy.deleteTitle,
                closeOnClickOutside: !isDeleting,
                closeOnEscape: !isDeleting,
                styles: {
                    title: {
                        color: '#101724',
                        fontWeight: 700,
                        fontSize: 18
                    },
                    content: {
                        border: '1px solid #DCE4EF',
                        boxShadow: 'none'
                    }
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[13px] leading-6 text-[#64748B]",
                        children: copy.deleteDescription
                    }, void 0, false, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1918,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 flex justify-end gap-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setDeleteCandidate(null),
                                disabled: isDeleting,
                                className: "min-h-10 rounded-md border border-[#CAD6E5] px-4 text-[13px] font-semibold text-[#536680] transition-colors hover:bg-[#F5F8FC] disabled:opacity-50",
                                children: copy.cancel
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 1920,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>void confirmDelete(),
                                disabled: isDeleting,
                                className: "min-h-10 rounded-md bg-[#D6453D] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#B93831] disabled:cursor-wait disabled:opacity-60",
                                children: isDeleting ? copy.deleting : copy.delete
                            }, void 0, false, {
                                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                                lineNumber: 1928,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                        lineNumber: 1919,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 1902,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$PostModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                locale: locale,
                mode: editMode,
                opened: editCandidate !== null,
                draft: editCandidate,
                onClose: ()=>setEditCandidate(null),
                onDraftSaved: ()=>{
                    setEditCandidate(null);
                    void loadFirstPage();
                },
                onDraftDiscarded: ()=>{
                    setEditCandidate(null);
                    void loadFirstPage();
                },
                onPublished: ()=>{
                    setEditCandidate(null);
                    void loadFirstPage();
                    window.dispatchEvent(new Event('feed:published'));
                }
            }, void 0, false, {
                fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
                lineNumber: 1939,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/MyFeedsTimeline.tsx",
        lineNumber: 1849,
        columnNumber: 5
    }, this);
}
_s3(MyFeedsTimeline, "q+kZx9wayPBN7GCDXSjMUvOMoKo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserProfile"]
    ];
});
_c6 = MyFeedsTimeline;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "FeedSkeleton");
__turbopack_context__.k.register(_c1, "ImageGallery");
__turbopack_context__.k.register(_c2, "VideoPlayer");
__turbopack_context__.k.register(_c3, "ArticlePreview");
__turbopack_context__.k.register(_c4, "TrackSignalIcon");
__turbopack_context__.k.register(_c5, "FeedCard");
__turbopack_context__.k.register(_c6, "MyFeedsTimeline");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/feed/MatchedRelatedDocumentsCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MatchedRelatedDocumentsCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$DocumentsListCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/DocumentsListCard.tsx [app-client] (ecmascript)");
'use client';
;
;
const VISIBLE_DOCUMENTS = 3;
function MatchedRelatedDocumentsCard(param) {
    let { locale, insights = [], className } = param;
    const isRTL = locale === 'ar';
    const copy = isRTL ? {
        title: 'مستندات ذات صلة',
        empty: 'لم نجد مستندات ذات صلة بهذا المحتوى.',
        openInNewTab: 'فتح في علامة تبويب جديدة',
        viewAll: 'عرض الكل',
        viewAllDescription: 'البحث المتقدم عن المستندات'
    } : {
        title: 'Related documents',
        empty: 'No related documents were found for this content.',
        openInNewTab: 'Open in a new tab',
        viewAll: 'View all',
        viewAllDescription: 'Advanced documents search'
    };
    const documents = insights.slice(0, VISIBLE_DOCUMENTS).map((insight)=>({
            id: "".concat(insight.type, "-").concat(insight.slug),
            href: "/".concat(locale, "/knowledge/").concat(insight.type, "/").concat(insight.slug),
            type: insight.type,
            title: insight.title,
            price: insight.price
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$DocumentsListCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        locale: locale,
        title: copy.title,
        documents: documents,
        isLoading: false,
        emptyText: copy.empty,
        openInNewTabLabel: copy.openInNewTab,
        viewAllHref: "/".concat(locale, "/home"),
        viewAllLabel: copy.viewAll,
        viewAllDescription: copy.viewAllDescription,
        className: className
    }, void 0, false, {
        fileName: "[project]/components/feed/MatchedRelatedDocumentsCard.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_c = MatchedRelatedDocumentsCard;
var _c;
__turbopack_context__.k.register(_c, "MatchedRelatedDocumentsCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_1a78a2df._.js.map