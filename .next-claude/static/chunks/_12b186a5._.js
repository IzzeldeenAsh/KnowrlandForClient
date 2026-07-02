(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/insighter-dashboard/PageHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageHeaderTab",
    ()=>PageHeaderTab,
    "default",
    ()=>PageHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function PageHeader(param) {
    let { icon, title, subtitle, tabs, actions } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-6 rounded-xl border border-gray-200 bg-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-4 px-6 pt-6 pb-4",
                children: [
                    icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-gray-300 text-sky-600",
                        children: icon
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/PageHeader.tsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex min-w-0 flex-1 flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-bold text-sky-600",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/insighter-dashboard/PageHeader.tsx",
                                lineNumber: 30,
                                columnNumber: 11
                            }, this),
                            subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm font-medium text-gray-500",
                                children: subtitle
                            }, void 0, false, {
                                fileName: "[project]/components/insighter-dashboard/PageHeader.tsx",
                                lineNumber: 31,
                                columnNumber: 24
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/insighter-dashboard/PageHeader.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    actions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: actions
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/PageHeader.tsx",
                        lineNumber: 33,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/insighter-dashboard/PageHeader.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            tabs && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-x-auto px-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-6 border-t border-gray-100 pt-1",
                    children: tabs
                }, void 0, false, {
                    fileName: "[project]/components/insighter-dashboard/PageHeader.tsx",
                    lineNumber: 37,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/insighter-dashboard/PageHeader.tsx",
                lineNumber: 36,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/insighter-dashboard/PageHeader.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_c = PageHeader;
function PageHeaderTab(param) {
    let { active, onClick, children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        className: "whitespace-nowrap border-b-2 px-1 py-3 text-sm font-semibold transition-colors ".concat(active ? 'border-sky-500 text-sky-600' : 'border-transparent text-gray-500 hover:text-gray-800'),
        children: children
    }, void 0, false, {
        fileName: "[project]/components/insighter-dashboard/PageHeader.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_c1 = PageHeaderTab;
var _c, _c1;
__turbopack_context__.k.register(_c, "PageHeader");
__turbopack_context__.k.register(_c1, "PageHeaderTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>KnowledgeTypeIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function KnowledgeTypeIcon(param) {
    let { type, size = 15 } = param;
    switch(type){
        case 'data':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: size,
                height: size,
                viewBox: "0 0 30 34",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M14.5464 0C10.5851 0 6.86364 0.704566 4.06815 1.98373C1.48292 3.16777 0 4.73376 0 6.28348C0 7.8332 1.48292 9.39967 4.06815 10.5831C6.86364 11.8623 10.585 12.5669 14.5464 12.5669C18.5078 12.5669 22.2297 11.8623 25.0243 10.5831C27.6099 9.39967 29.0933 7.8333 29.0933 6.28348C29.0933 4.73367 27.6099 3.16777 25.0243 1.98373C22.2293 0.704566 18.5077 0 14.5464 0Z",
                        fill: "#000000"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 12,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M0 9.45442C0.821516 10.3442 1.99713 11.1499 3.49489 11.8359C6.46628 13.1954 10.3914 13.9444 14.5469 13.9444C18.7023 13.9444 22.627 13.1949 25.5984 11.8359C27.0961 11.1499 28.2718 10.3445 29.0933 9.45442V13.4496C29.0933 15.004 27.6131 16.5723 25.0331 17.7531C22.2436 19.029 18.5194 19.7326 14.5464 19.7326C10.5734 19.7326 6.84871 19.029 4.05982 17.7531C1.47967 16.5723 0 15.004 0 13.4496V9.45442Z",
                        fill: "#000000"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 13,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M29.0933 16.6207C26.6302 19.2908 21.1116 21.1102 14.5464 21.1102C7.98116 21.1102 2.46273 19.2908 0 16.6207V20.1383C0 21.6918 1.47967 23.261 4.05982 24.4417C6.84871 25.7181 10.5734 26.4217 14.5464 26.4217C18.5194 26.4217 22.2436 25.7181 25.0336 24.4417C27.6136 23.261 29.0933 21.6918 29.0933 20.1383V16.6207Z",
                        fill: "#000000"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 14,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M4.05982 31.608C1.47967 30.4272 0 28.858 0 27.3041V23.3093C2.46273 25.9799 7.98116 27.7994 14.5464 27.7994C21.1116 27.7994 26.6302 25.9799 29.0933 23.3093V27.3041C29.0933 28.858 27.6131 30.4272 25.0331 31.608C22.2436 32.8844 18.5194 33.5875 14.5464 33.5875C10.5734 33.5875 6.84871 32.8844 4.05982 31.608Z",
                        fill: "#000000"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 15,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                lineNumber: 11,
                columnNumber: 9
            }, this);
        case 'statistic':
        case 'insight':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: size,
                height: size,
                viewBox: "0 0 42 42",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M29.5625 0C37.1458 0 41.6663 4.52116 41.6455 12.1045V29.5625C41.6455 37.1457 37.1251 41.6669 29.542 41.667H12.1045C4.52127 41.667 0.00012927 37.146 0 29.542V12.1045C0 4.52116 4.52116 0 12.1045 0H29.5625ZM11.9346 21.46C10.7753 21.4601 9.83305 22.4022 9.83301 23.5615V29.4678C9.83321 30.6269 10.7754 31.5682 11.9346 31.5684C13.112 31.5684 14.0545 30.627 14.0547 29.4678V23.5615C14.0546 22.4021 13.1121 21.46 11.9346 21.46ZM19.96 12.1846C18.7825 12.1847 17.8409 13.1268 17.8408 14.2861V29.4678C17.841 30.6269 18.7827 31.5682 19.96 31.5684C21.1192 31.5684 22.0613 30.627 22.0615 29.4678V14.2861C22.0615 13.1267 21.1194 12.1846 19.96 12.1846ZM27.6689 8.83301C26.4561 8.83301 25.4854 9.93196 25.4854 11.2842V28.9912C25.4855 30.3434 26.4561 31.4424 27.6689 31.4424C28.863 31.4423 29.8329 30.3433 29.833 28.9912V11.2842C29.8329 9.93204 28.8631 8.83313 27.6689 8.83301Z",
                    fill: "#8a1538"
                }, void 0, false, {
                    fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                    lineNumber: 22,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                lineNumber: 21,
                columnNumber: 9
            }, this);
        case 'report':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: size,
                height: size,
                viewBox: "0 0 50 50",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        opacity: "0.4",
                        d: "M45.125 21.75L43.0833 30.4583C41.3333 37.9792 37.875 41.0208 31.375 40.3958C30.3333 40.3125 29.2083 40.125 28 39.8333L24.5 39C15.8125 36.9375 13.125 32.6458 15.1667 23.9375L17.2083 15.2083C17.625 13.4375 18.125 11.8958 18.75 10.625C21.1875 5.58333 25.3333 4.22916 32.2917 5.875L35.7708 6.6875C44.5 8.72916 47.1667 13.0417 45.125 21.75Z",
                        fill: "#699DDE"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 28,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M31.375 40.3958C30.0833 41.2708 28.4583 42 26.4792 42.6458L23.1875 43.7292C14.9167 46.3958 10.5625 44.1667 7.87499 35.8958L5.20833 27.6667C2.54166 19.3958 4.74999 15.0208 13.0208 12.3542L16.3125 11.2708C17.1667 11 17.9792 10.7708 18.75 10.625C18.125 11.8958 17.625 13.4375 17.2083 15.2083L15.1667 23.9375C13.125 32.6458 15.8125 36.9375 24.5 39L28 39.8333C29.2083 40.125 30.3333 40.3125 31.375 40.3958Z",
                        fill: "#3699FF"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M36.4375 21.8959C36.3125 21.8959 36.1875 21.875 36.0417 21.8542L25.9375 19.2917C25.1042 19.0834 24.6042 18.2292 24.8125 17.3959C25.0208 16.5625 25.875 16.0625 26.7083 16.2709L36.8125 18.8334C37.6458 19.0417 38.1458 19.8959 37.9375 20.7292C37.7708 21.4167 37.125 21.8959 36.4375 21.8959Z",
                        fill: "white"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 30,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M30.3333 28.9375C30.2083 28.9375 30.0833 28.9167 29.9375 28.8959L23.875 27.3542C23.0417 27.1459 22.5417 26.2917 22.75 25.4584C22.9583 24.625 23.8125 24.125 24.6458 24.3334L30.7083 25.875C31.5417 26.0834 32.0417 26.9375 31.8333 27.7709C31.6667 28.4792 31.0417 28.9375 30.3333 28.9375Z",
                        fill: "white"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 31,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, this);
        case 'manual':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: size,
                height: size,
                viewBox: "0 0 50 50",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M42.7083 14.5834V31.25H13.2292C9.95834 31.25 7.29167 33.9167 7.29167 37.1875V14.5834C7.29167 6.25002 9.37501 4.16669 17.7083 4.16669H32.2917C40.625 4.16669 42.7083 6.25002 42.7083 14.5834Z",
                        fill: "#FF9F43"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 37,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M42.7083 31.25V38.5417C42.7083 42.5625 39.4375 45.8333 35.4167 45.8333H14.5833C10.5625 45.8333 7.29167 42.5625 7.29167 38.5417V37.1875C7.29167 33.9167 9.95834 31.25 13.2292 31.25H42.7083Z",
                        fill: "#f8cda3"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M33.3333 16.1458H16.6667C15.8125 16.1458 15.1042 15.4375 15.1042 14.5833C15.1042 13.7291 15.8125 13.0208 16.6667 13.0208H33.3333C34.1875 13.0208 34.8958 13.7291 34.8958 14.5833C34.8958 15.4375 34.1875 16.1458 33.3333 16.1458Z",
                        fill: "white"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 39,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M27.0833 23.4375H16.6667C15.8125 23.4375 15.1042 22.7292 15.1042 21.875C15.1042 21.0208 15.8125 20.3125 16.6667 20.3125H27.0833C27.9375 20.3125 28.6458 21.0208 28.6458 21.875C28.6458 22.7292 27.9375 23.4375 27.0833 23.4375Z",
                        fill: "white"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                lineNumber: 36,
                columnNumber: 9
            }, this);
        case 'course':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: size,
                height: size,
                viewBox: "0 0 39 36",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M31.9898 26.8163C31.9898 24.1788 29.8518 22.0408 27.2143 22.0408C24.5767 22.0408 22.4388 24.1788 22.4388 26.8163C22.4388 28.1696 23.0037 29.3885 23.9081 30.2576V36L27.2143 33.7959L30.5204 36V30.2576C31.4248 29.3885 31.9898 28.1696 31.9898 26.8163Z",
                        fill: "#C3D8F2"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M37.1327 0H1.86734C1.05624 0 0.397949 0.657551 0.397949 1.46939V30.8572C0.397949 31.6683 1.05624 32.3265 1.86734 32.3265H20.9694V31.3443C20.0143 30.0372 19.5 28.4694 19.5 26.8163C19.5 22.5625 22.9604 19.102 27.2143 19.102C31.4682 19.102 34.9286 22.5625 34.9286 26.8163C34.9286 28.4701 34.4143 30.038 33.4592 31.345V32.3265H37.1327C37.9438 32.3265 38.6021 31.6683 38.6021 30.8572V1.46939C38.6021 0.657551 37.9438 0 37.1327 0ZM20.9694 13.2245H8.47959V10.2857H20.9694V13.2245ZM30.5204 7.34694H8.47959V4.40816H30.5204V7.34694Z",
                        fill: "#0ABB87"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                lineNumber: 45,
                columnNumber: 9
            }, this);
        case 'media':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: size,
                height: size,
                viewBox: "0 0 50 50",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M25 0C11.215 0 0 11.215 0 25C0 38.785 11.215 50 25 50C38.785 50 50 38.785 50 25C50 11.215 38.785 0 25 0Z",
                        fill: "#F64E60"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M33 25L21 33V17L33 25Z",
                        fill: "white"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                lineNumber: 52,
                columnNumber: 9
            }, this);
        default:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: size,
                height: size,
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "4",
                        y: "2",
                        width: "16",
                        height: "20",
                        rx: "2",
                        fill: "#A1A5B7"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "7",
                        y: "6",
                        width: "10",
                        height: "2",
                        rx: "1",
                        fill: "white"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "7",
                        y: "10",
                        width: "10",
                        height: "2",
                        rx: "1",
                        fill: "white"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "7",
                        y: "14",
                        width: "6",
                        height: "2",
                        rx: "1",
                        fill: "white"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 63,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                lineNumber: 59,
                columnNumber: 9
            }, this);
    }
}
_c = KnowledgeTypeIcon;
var _c;
__turbopack_context__.k.register(_c, "KnowledgeTypeIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/services/insighter-dashboard.api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiError",
    ()=>ApiError,
    "apiFormRequest",
    ()=>apiFormRequest,
    "apiRequest",
    ()=>apiRequest,
    "archiveDownloadedKnowledge",
    ()=>archiveDownloadedKnowledge,
    "checkLatestAgreement",
    ()=>checkLatestAgreement,
    "deleteMyKnowledge",
    ()=>deleteMyKnowledge,
    "deletePackage",
    ()=>deletePackage,
    "getCompanyDashboardStatistics",
    ()=>getCompanyDashboardStatistics,
    "getCompanyInsighterRequests",
    ()=>getCompanyInsighterRequests,
    "getDocumentDownloadUrl",
    ()=>getDocumentDownloadUrl,
    "getInsighterMeetingStatistics",
    ()=>getInsighterMeetingStatistics,
    "getInsighterRequestsPage",
    ()=>getInsighterRequestsPage,
    "getKnowledgeTypeStatistics",
    ()=>getKnowledgeTypeStatistics,
    "getMyDownloads",
    ()=>getMyDownloads,
    "getMyKnowledgeList",
    ()=>getMyKnowledgeList,
    "getMyOrders",
    ()=>getMyOrders,
    "getPackageKnowledge",
    ()=>getPackageKnowledge,
    "getPackagesList",
    ()=>getPackagesList,
    "getPendingRequestsCount",
    ()=>getPendingRequestsCount,
    "getProjectAccountCheck",
    ()=>getProjectAccountCheck,
    "getReadLaterList",
    ()=>getReadLaterList,
    "getSentMeetings",
    ()=>getSentMeetings,
    "getUserRequests",
    ()=>getUserRequests,
    "getUserRequestsPage",
    ()=>getUserRequestsPage,
    "getWalletBalance",
    ()=>getWalletBalance,
    "removeReadLaterItem",
    ()=>removeReadLaterItem,
    "resendRequest",
    ()=>resendRequest,
    "setMyKnowledgeStatus",
    ()=>setMyKnowledgeStatus,
    "setPackageStatus",
    ()=>setPackageStatus,
    "updateInsighterRequestStatus",
    ()=>updateInsighterRequestStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
'use client';
;
;
/**
 * API client for insighter dashboard features. Endpoints mirror the Angular
 * services in KNOLDG-APP/src/app/_fake/services.
 */ const API_BASE = 'https://api.foresighta.co/api';
class ApiError extends Error {
    constructor(status, message, errors){
        super(message), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "status", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "errors", void 0);
        this.status = status;
        this.errors = errors;
    }
}
async function apiRequest(path) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const { method = 'GET', locale = 'en', body, params } = options;
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
    const url = new URL("".concat(API_BASE).concat(path));
    if (params) {
        for (const [key, value] of Object.entries(params)){
            if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
        }
    }
    const response = await fetch(url.toString(), {
        method,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Accept-Language': locale,
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            ...token ? {
                Authorization: "Bearer ".concat(token)
            } : {}
        },
        body: body !== undefined ? JSON.stringify(body) : undefined
    });
    if (!response.ok) {
        let message = "Request failed: ".concat(response.status);
        let errors;
        try {
            const data = await response.json();
            var _data_message;
            message = (_data_message = data === null || data === void 0 ? void 0 : data.message) !== null && _data_message !== void 0 ? _data_message : message;
            errors = data === null || data === void 0 ? void 0 : data.errors;
        } catch (e) {
        // non-JSON error body
        }
        throw new ApiError(response.status, message, errors);
    }
    if (response.status === 204) return undefined;
    return response.json();
}
async function getWalletBalance(locale) {
    var _res_data;
    const res = await apiRequest('/account/wallet', {
        locale
    });
    var _res_data_balance;
    return Number((_res_data_balance = res === null || res === void 0 ? void 0 : (_res_data = res.data) === null || _res_data === void 0 ? void 0 : _res_data.balance) !== null && _res_data_balance !== void 0 ? _res_data_balance : 0);
}
async function getInsighterMeetingStatistics(locale) {
    const res = await apiRequest('/insighter/meeting/statistics', {
        locale
    });
    return res.data;
}
async function getSentMeetings(locale) {
    let page = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1, perPage = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 30;
    return apiRequest('/account/meeting/client/list', {
        locale,
        params: {
            page,
            per_page: perPage
        }
    });
}
async function getUserRequests(locale) {
    const res = await apiRequest('/account/request', {
        locale
    });
    var _res_data;
    return (_res_data = res.data) !== null && _res_data !== void 0 ? _res_data : [];
}
async function getCompanyInsighterRequests(locale) {
    const res = await apiRequest('/company/insighter/request', {
        locale
    });
    var _res_data;
    return (_res_data = res.data) !== null && _res_data !== void 0 ? _res_data : [];
}
async function getPendingRequestsCount(locale, isCompany) {
    const lists = await Promise.all([
        getUserRequests(locale).catch(()=>[]),
        isCompany ? getCompanyInsighterRequests(locale).catch(()=>[]) : Promise.resolve([])
    ]);
    return lists.flat().filter((r)=>r.parent_id === 0 || r.parent_id === null || r.parent_id === undefined).filter((r)=>{
        var _r_final_status;
        return ((_r_final_status = r.final_status) === null || _r_final_status === void 0 ? void 0 : _r_final_status.toLowerCase()) === 'pending';
    }).length;
}
async function checkLatestAgreement(locale) {
    var _res_data;
    const res = await apiRequest('/account/agreement/check', {
        locale
    });
    return !!(res === null || res === void 0 ? void 0 : (_res_data = res.data) === null || _res_data === void 0 ? void 0 : _res_data.accept);
}
async function getProjectAccountCheck(locale) {
    const res = await apiRequest('/insighter/project/account/initiate/check', {
        locale
    });
    return res.data;
}
async function getKnowledgeTypeStatistics(locale) {
    const res = await apiRequest('/insighter/library/knowledge/statistics', {
        locale
    });
    var _res_data;
    return (_res_data = res.data) !== null && _res_data !== void 0 ? _res_data : [];
}
async function getCompanyDashboardStatistics(locale) {
    const res = await apiRequest('/company/insighter/statistics', {
        locale
    });
    return res.data;
}
async function getMyKnowledgeList(locale) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var _options_page;
    return apiRequest('/insighter/library/knowledge', {
        locale,
        params: {
            page: (_options_page = options.page) !== null && _options_page !== void 0 ? _options_page : 1,
            status: options.status || undefined,
            keyword: options.keyword || undefined,
            type: options.type || undefined
        }
    });
}
async function deleteMyKnowledge(locale, id) {
    await apiRequest("/insighter/library/knowledge/".concat(id), {
        locale,
        method: 'DELETE'
    });
}
async function setMyKnowledgeStatus(locale, id, status, publishedAt) {
    await apiRequest("/insighter/library/knowledge/status/".concat(id), {
        locale,
        method: 'PUT',
        body: {
            status,
            published_at: publishedAt
        }
    });
}
async function getPackagesList(locale) {
    const res = await apiRequest('/insighter/library/package/list', {
        locale
    });
    var _res_data;
    return (_res_data = res.data) !== null && _res_data !== void 0 ? _res_data : [];
}
async function deletePackage(locale, packageId) {
    await apiRequest("/insighter/library/package/".concat(packageId), {
        locale,
        method: 'DELETE'
    });
}
async function getPackageKnowledge(locale, packageId) {
    return apiRequest("/insighter/library/package/knowledge/list/".concat(packageId), {
        locale
    });
}
async function setPackageStatus(locale, packageId, status, publishedAt) {
    await apiRequest("/insighter/library/package/status/".concat(packageId), {
        locale,
        method: 'PUT',
        body: {
            status,
            ...publishedAt ? {
                published_at: publishedAt
            } : {}
        }
    });
}
function normalizeRequestsPage(res, page, perPage) {
    const data = Array.isArray(res === null || res === void 0 ? void 0 : res.data) ? res.data : [];
    var _res_meta;
    const meta = (_res_meta = res === null || res === void 0 ? void 0 : res.meta) !== null && _res_meta !== void 0 ? _res_meta : {
        current_page: page,
        last_page: 1,
        per_page: perPage,
        total: data.length
    };
    return {
        data,
        meta
    };
}
async function getUserRequestsPage(locale, page, perPage) {
    let filters = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    const res = await apiRequest('/account/request', {
        locale,
        params: {
            page,
            per_page: perPage,
            type: filters.type,
            final_status: filters.final_status
        }
    });
    return normalizeRequestsPage(res, page, perPage);
}
async function getInsighterRequestsPage(locale, page, perPage) {
    let filters = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    const res = await apiRequest('/company/insighter/request', {
        locale,
        params: {
            page,
            per_page: perPage,
            type: filters.type,
            final_status: filters.final_status
        }
    });
    return normalizeRequestsPage(res, page, perPage);
}
async function apiFormRequest(path, locale, fields) {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
    const formData = new FormData();
    for (const [key, value] of Object.entries(fields))formData.append(key, value);
    const response = await fetch("".concat(API_BASE).concat(path), {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-Language': locale,
            ...token ? {
                Authorization: "Bearer ".concat(token)
            } : {}
        },
        body: formData
    });
    if (!response.ok) {
        let message = "Request failed: ".concat(response.status);
        let errors;
        try {
            const data = await response.json();
            var _data_message;
            message = (_data_message = data === null || data === void 0 ? void 0 : data.message) !== null && _data_message !== void 0 ? _data_message : message;
            errors = data === null || data === void 0 ? void 0 : data.errors;
        } catch (e) {
        // non-JSON error body
        }
        throw new ApiError(response.status, message, errors);
    }
    try {
        return await response.json();
    } catch (e) {
        return undefined;
    }
}
async function updateInsighterRequestStatus(locale, requestId, status, staffNotes) {
    await apiFormRequest("/company/insighter/request/".concat(requestId, "/accept"), locale, {
        status,
        staff_notes: staffNotes
    });
}
async function resendRequest(locale, typeKey, comments, parentId, knowledgeId) {
    switch(typeKey){
        case 'activate_company':
            await apiFormRequest('/company/request/activate', locale, {
                comments,
                parent_id: parentId
            });
            return;
        case 'verified_company':
            await apiFormRequest('/company/request/verified', locale, {
                comments,
                parent_id: parentId
            });
            return;
        case 'deactivate_delete_company':
            await apiFormRequest('/company/request/deactivate-delete', locale, {
                comments,
                parent_id: parentId
            });
            return;
        case 'deactivate_delete_insighter':
            await apiFormRequest('/insighter/request/deactivate-delete', locale, {
                comments,
                parent_id: parentId
            });
            return;
        case 'accept_knowledge':
            if (!knowledgeId) throw new Error('knowledge_id required');
            await apiFormRequest('/insighter/request/knowledge/review', locale, {
                comments,
                parent_id: parentId,
                knowledge_id: knowledgeId
            });
            return;
        default:
            throw new Error("Unsupported request type: ".concat(typeKey));
    }
}
async function getMyDownloads(locale) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var _options_title;
    var _options_page;
    // Angular uses POST on the same URL (body optional); GET also works but we
    // mirror the POST call to keep behaviour identical.
    const params = new URLSearchParams({
        page: String((_options_page = options.page) !== null && _options_page !== void 0 ? _options_page : 1),
        per_page: '10'
    });
    if ((_options_title = options.title) === null || _options_title === void 0 ? void 0 : _options_title.trim()) params.set('title', options.title.trim());
    if (options.archived) params.set('archived', 'true');
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
    const response = await fetch("".concat(API_BASE, "/account/library/my-knowledge?").concat(params.toString()), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Accept-Language': locale,
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            ...token ? {
                Authorization: "Bearer ".concat(token)
            } : {}
        }
    });
    if (!response.ok) throw new ApiError(response.status, "Request failed: ".concat(response.status));
    return response.json();
}
async function getDocumentDownloadUrl(locale, documentUuid) {
    const res = await apiRequest("/account/library/my-knowledge/document/download/".concat(documentUuid), {
        locale,
        method: 'POST',
        body: {}
    });
    return res.data.url;
}
async function archiveDownloadedKnowledge(locale, knowledgeUuid) {
    await apiRequest("/account/library/my-knowledge/archive/".concat(knowledgeUuid), {
        locale,
        method: 'POST',
        body: {}
    });
}
async function getReadLaterList(locale) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var _options_title, _options_type;
    var _options_page;
    return apiRequest('/account/favorite/knowledge', {
        locale,
        params: {
            page: (_options_page = options.page) !== null && _options_page !== void 0 ? _options_page : 1,
            per_page: 10,
            title: ((_options_title = options.title) === null || _options_title === void 0 ? void 0 : _options_title.trim()) || undefined,
            type: ((_options_type = options.type) === null || _options_type === void 0 ? void 0 : _options_type.trim()) || undefined
        }
    });
}
async function removeReadLaterItem(locale, slug) {
    await apiRequest("/account/favorite/knowledge/".concat(slug), {
        locale,
        method: 'DELETE'
    });
}
async function getMyOrders(locale, kind) {
    let page = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
    return apiRequest("/account/order/".concat(kind), {
        locale,
        params: {
            page,
            per_page: 5
        }
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MyOrdersClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/index.react-client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Modal/Modal.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconShoppingBag$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconShoppingBag.mjs [app-client] (ecmascript) <export default as IconShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileInvoice$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileInvoice$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconFileInvoice.mjs [app-client] (ecmascript) <export default as IconFileInvoice>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCalendarEvent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCalendarEvent$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCalendarEvent.mjs [app-client] (ecmascript) <export default as IconCalendarEvent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBriefcase$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBriefcase$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBriefcase.mjs [app-client] (ecmascript) <export default as IconBriefcase>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconRosetteDiscountCheckFilled$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconRosetteDiscountCheckFilled$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconRosetteDiscountCheckFilled.mjs [app-client] (ecmascript) <export default as IconRosetteDiscountCheckFilled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$insighter$2d$dashboard$2f$PageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/insighter-dashboard/PageHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$insighter$2d$dashboard$2f$KnowledgeTypeIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/toast/ToastContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$insighter$2d$dashboard$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/insighter-dashboard.api.ts [app-client] (ecmascript)");
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
function statusBadge(status) {
    switch(status === null || status === void 0 ? void 0 : status.toLowerCase()){
        case 'paid':
        case 'confirmed':
        case 'completed':
            return 'bg-[#DFFEE9] text-[#1BC653]';
        case 'pending':
            return 'bg-amber-50 text-amber-600';
        case 'refunded':
            return 'bg-[#EFF8FF] text-[#299AF8]';
        default:
            return 'bg-red-50 text-red-500';
    }
}
function MyOrdersClient() {
    var _detail_orderable, _detail_orderable1, _detail_orderable2;
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('InsighterDashboard.myOrders');
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('knowledge');
    const [orders, setOrders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [meta, setMeta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [detail, setDetail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MyOrdersClient.useCallback[load]": (kind, page)=>{
            setLoading(true);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$insighter$2d$dashboard$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMyOrders"])(locale, kind, page).then({
                "MyOrdersClient.useCallback[load]": (res)=>{
                    var _res_data;
                    setOrders((_res_data = res.data) !== null && _res_data !== void 0 ? _res_data : []);
                    var _res_meta;
                    setMeta((_res_meta = res.meta) !== null && _res_meta !== void 0 ? _res_meta : null);
                }
            }["MyOrdersClient.useCallback[load]"]).catch({
                "MyOrdersClient.useCallback[load]": (err)=>toast.handleServerErrors(err)
            }["MyOrdersClient.useCallback[load]"]).finally({
                "MyOrdersClient.useCallback[load]": ()=>setLoading(false)
            }["MyOrdersClient.useCallback[load]"]);
        }
    }["MyOrdersClient.useCallback[load]"], // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        locale
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MyOrdersClient.useEffect": ()=>{
            load(tab, 1);
        }
    }["MyOrdersClient.useEffect"], [
        tab,
        load
    ]);
    const dateFormat = new Intl.DateTimeFormat(locale === 'ar' ? 'ar' : 'en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
    });
    const formatDate = (value)=>{
        if (!value) return '—';
        const parsed = Date.parse(value);
        return Number.isNaN(parsed) ? value : dateFormat.format(parsed);
    };
    const money = (amount, curr)=>new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: curr || 'USD'
        }).format(amount);
    const seller = (order)=>{
        var _order_orderable;
        return (_order_orderable = order.orderable) === null || _order_orderable === void 0 ? void 0 : _order_orderable.insighter;
    };
    const sellerIsCompany = (order)=>{
        var _seller;
        return !!((_seller = seller(order)) === null || _seller === void 0 ? void 0 : _seller.company);
    };
    const payment = (order)=>{
        var _order_payments;
        var _order_payment;
        return (_order_payment = order.payment) !== null && _order_payment !== void 0 ? _order_payment : (_order_payments = order.payments) === null || _order_payments === void 0 ? void 0 : _order_payments[0];
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$insighter$2d$dashboard$2f$PageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconShoppingBag$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconShoppingBag$3e$__["IconShoppingBag"], {
                    size: 22
                }, void 0, false, {
                    fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                    lineNumber: 90,
                    columnNumber: 15
                }, void 0),
                title: t('title'),
                subtitle: t('subtitle'),
                tabs: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        'knowledge',
                        'meeting',
                        'project'
                    ].map((kind)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$insighter$2d$dashboard$2f$PageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeaderTab"], {
                            active: tab === kind,
                            onClick: ()=>setTab(kind),
                            children: t("tabs.".concat(kind))
                        }, kind, false, {
                            fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                            lineNumber: 96,
                            columnNumber: 15
                        }, void 0))
                }, void 0, false)
            }, void 0, false, {
                fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border border-gray-200 bg-white p-4",
                children: [
                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex min-h-[200px] items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"
                        }, void 0, false, {
                            fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                            lineNumber: 107,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                        lineNumber: 106,
                        columnNumber: 11
                    }, this) : orders.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center gap-2 py-16 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconShoppingBag$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconShoppingBag$3e$__["IconShoppingBag"], {
                                size: 40,
                                className: "text-gray-300"
                            }, void 0, false, {
                                fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                lineNumber: 111,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500",
                                children: t('empty')
                            }, void 0, false, {
                                fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                lineNumber: 112,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                        lineNumber: 110,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-3",
                        children: orders.map((order)=>{
                            var _order_status, _order_orderable, _order_orderable1, _order_orderable2, _seller, _seller1, _seller_company, _seller2, _seller3, _seller_company1, _seller4;
                            var _order_orderable_knowledge, _seller_name;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-gray-100 p-4 hover:border-gray-300",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center justify-between gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-bold text-gray-800",
                                                        children: [
                                                            t('order'),
                                                            " ",
                                                            order.order_no
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                        lineNumber: 121,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ".concat(statusBadge(order.status)),
                                                        children: t.has("status.".concat((_order_status = order.status) === null || _order_status === void 0 ? void 0 : _order_status.toLowerCase())) ? t("status.".concat(order.status.toLowerCase())) : order.status
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                        lineNumber: 124,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                lineNumber: 120,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setDetail(order),
                                                        className: "rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50",
                                                        children: t('details')
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                        lineNumber: 133,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/".concat(locale, "/invoice/").concat(order.order_no),
                                                        className: "inline-flex items-center gap-1 rounded-lg border border-sky-500 px-3 py-1.5 text-xs font-semibold text-sky-600 hover:bg-sky-50",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileInvoice$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileInvoice$3e$__["IconFileInvoice"], {
                                                                size: 14
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                                lineNumber: 144,
                                                                columnNumber: 23
                                                            }, this),
                                                            t('invoice')
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                        lineNumber: 140,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                lineNumber: 132,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                        lineNumber: 119,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 flex flex-col gap-1",
                                        children: [
                                            tab === 'knowledge' && ((_order_orderable_knowledge = (_order_orderable = order.orderable) === null || _order_orderable === void 0 ? void 0 : _order_orderable.knowledge) !== null && _order_orderable_knowledge !== void 0 ? _order_orderable_knowledge : []).map((k, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 text-sm text-gray-700",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$insighter$2d$dashboard$2f$KnowledgeTypeIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            type: k.type,
                                                            size: 14
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                            lineNumber: 155,
                                                            columnNumber: 25
                                                        }, this),
                                                        k.slug ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: "/".concat(locale, "/knowledge/").concat(k.type, "/").concat(k.slug),
                                                            className: "hover:text-sky-600",
                                                            children: k.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                            lineNumber: 157,
                                                            columnNumber: 27
                                                        }, this) : k.title
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                    lineNumber: 154,
                                                    columnNumber: 23
                                                }, this)),
                                            tab === 'meeting' && ((_order_orderable1 = order.orderable) === null || _order_orderable1 === void 0 ? void 0 : _order_orderable1.meeting_booking) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 text-sm text-gray-700",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCalendarEvent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCalendarEvent$3e$__["IconCalendarEvent"], {
                                                        size: 16,
                                                        className: "text-sky-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                        lineNumber: 170,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium",
                                                        children: order.orderable.meeting_booking.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                        lineNumber: 171,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-400",
                                                        children: [
                                                            order.orderable.meeting_booking.date,
                                                            " • ",
                                                            order.orderable.meeting_booking.start_time,
                                                            "–",
                                                            order.orderable.meeting_booking.end_time
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                        lineNumber: 172,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                lineNumber: 169,
                                                columnNumber: 21
                                            }, this),
                                            tab === 'project' && ((_order_orderable2 = order.orderable) === null || _order_orderable2 === void 0 ? void 0 : _order_orderable2.project) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 text-sm text-gray-700",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBriefcase$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBriefcase$3e$__["IconBriefcase"], {
                                                        size: 16,
                                                        className: "text-sky-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                        lineNumber: 180,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium",
                                                        children: order.orderable.project.title || order.orderable.project.project_no
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                        lineNumber: 181,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                lineNumber: 179,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                        lineNumber: 151,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-gray-50 pt-3",
                                        children: [
                                            seller(order) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    ((_seller = seller(order)) === null || _seller === void 0 ? void 0 : _seller.profile_photo_url) ? // eslint-disable-next-line @next/next/no-img-element
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: seller(order).profile_photo_url,
                                                        alt: "",
                                                        className: "h-7 w-7 rounded-full object-cover"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                        lineNumber: 194,
                                                        columnNumber: 25
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex h-7 w-7 items-center justify-center rounded-full bg-sky-50 text-xs font-bold text-sky-600",
                                                        children: ((_seller_name = (_seller1 = seller(order)) === null || _seller1 === void 0 ? void 0 : _seller1.name) !== null && _seller_name !== void 0 ? _seller_name : '?').charAt(0)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                        lineNumber: 200,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-gray-500",
                                                        children: [
                                                            t('by'),
                                                            " ",
                                                            ((_seller2 = seller(order)) === null || _seller2 === void 0 ? void 0 : (_seller_company = _seller2.company) === null || _seller_company === void 0 ? void 0 : _seller_company.legal_name) || ((_seller3 = seller(order)) === null || _seller3 === void 0 ? void 0 : _seller3.name)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                        lineNumber: 204,
                                                        columnNumber: 23
                                                    }, this),
                                                    ((_seller4 = seller(order)) === null || _seller4 === void 0 ? void 0 : (_seller_company1 = _seller4.company) === null || _seller_company1 === void 0 ? void 0 : _seller_company1.verified) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconRosetteDiscountCheckFilled$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconRosetteDiscountCheckFilled$3e$__["IconRosetteDiscountCheckFilled"], {
                                                        size: 14,
                                                        className: "text-sky-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                        lineNumber: 208,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "rounded px-1.5 py-0.5 text-[10px] font-bold ".concat(sellerIsCompany(order) ? 'bg-[#EFF8FF] text-[#299AF8]' : 'bg-[#DFFEE9] text-[#1BC653]'),
                                                        children: sellerIsCompany(order) ? t('company') : t('insighter')
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                        lineNumber: 210,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                lineNumber: 191,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                                fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                lineNumber: 221,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-4 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-gray-400",
                                                        children: [
                                                            t('ordered'),
                                                            " ",
                                                            formatDate(order.date)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                        lineNumber: 224,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-gray-900",
                                                        children: money(order.amount, order.currency)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                        lineNumber: 227,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                lineNumber: 223,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                        lineNumber: 189,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, order.uuid, true, {
                                fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                lineNumber: 117,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                        lineNumber: 115,
                        columnNumber: 11
                    }, this),
                    !loading && meta && meta.last_page > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex items-center justify-between text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-500",
                                children: [
                                    t('page'),
                                    " ",
                                    meta.current_page,
                                    " ",
                                    t('of'),
                                    " ",
                                    meta.last_page
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                lineNumber: 237,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-1",
                                children: Array.from({
                                    length: meta.last_page
                                }, (_, i)=>i + 1).map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>load(tab, p),
                                        className: "min-w-[28px] rounded-md px-1.5 py-1 text-xs font-medium ".concat(p === meta.current_page ? 'bg-sky-500 text-white' : 'text-gray-600 hover:bg-gray-100'),
                                        children: p
                                    }, p, false, {
                                        fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                        lineNumber: 242,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                lineNumber: 240,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                        lineNumber: 236,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
                opened: !!detail,
                onClose: ()=>setDetail(null),
                title: t('dialog.header'),
                centered: true,
                size: "lg",
                children: detail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-4 text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                            className: "grid grid-cols-2 gap-x-4 gap-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                    className: "text-gray-400",
                                    children: t('dialog.orderNo')
                                }, void 0, false, {
                                    fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                    lineNumber: 263,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                    className: "font-medium text-gray-800",
                                    children: detail.order_no
                                }, void 0, false, {
                                    fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                    lineNumber: 264,
                                    columnNumber: 15
                                }, this),
                                detail.invoice_no && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                            className: "text-gray-400",
                                            children: t('dialog.invoiceNo')
                                        }, void 0, false, {
                                            fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                            lineNumber: 267,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                            className: "font-medium text-gray-800",
                                            children: detail.invoice_no
                                        }, void 0, false, {
                                            fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                            lineNumber: 268,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                    className: "text-gray-400",
                                    children: t('dialog.date')
                                }, void 0, false, {
                                    fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                    lineNumber: 271,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                    className: "font-medium text-gray-800",
                                    children: formatDate(detail.date)
                                }, void 0, false, {
                                    fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                    lineNumber: 272,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                    className: "text-gray-400",
                                    children: t('dialog.amount')
                                }, void 0, false, {
                                    fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                    lineNumber: 273,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                    className: "font-medium text-gray-800",
                                    children: money(detail.amount, detail.currency)
                                }, void 0, false, {
                                    fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                    lineNumber: 274,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                    className: "text-gray-400",
                                    children: t('dialog.status')
                                }, void 0, false, {
                                    fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                    lineNumber: 275,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full px-2 py-0.5 text-xs font-bold capitalize ".concat(statusBadge(detail.status)),
                                        children: detail.status
                                    }, void 0, false, {
                                        fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                        lineNumber: 277,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                    lineNumber: 276,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                            lineNumber: 262,
                            columnNumber: 13
                        }, this),
                        payment(detail) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "mb-2 text-xs font-bold uppercase text-gray-400",
                                    children: t('dialog.payment')
                                }, void 0, false, {
                                    fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                    lineNumber: 287,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                    className: "grid grid-cols-2 gap-x-4 gap-y-2 rounded-lg bg-gray-50 p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                            className: "text-gray-400",
                                            children: t('dialog.method')
                                        }, void 0, false, {
                                            fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                            lineNumber: 289,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                            className: "font-medium capitalize text-gray-800",
                                            children: payment(detail).provider_payment_method_type || payment(detail).method
                                        }, void 0, false, {
                                            fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                            lineNumber: 290,
                                            columnNumber: 19
                                        }, this),
                                        payment(detail).provider_card_last_number && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                    className: "text-gray-400",
                                                    children: t('dialog.card')
                                                }, void 0, false, {
                                                    fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                    lineNumber: 295,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                    className: "font-medium text-gray-800",
                                                    children: [
                                                        payment(detail).provider_card_brand,
                                                        " •••• ",
                                                        payment(detail).provider_card_last_number
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                    lineNumber: 296,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                    lineNumber: 288,
                                    columnNumber: 17
                                }, this),
                                payment(detail).provide_receipt_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: payment(detail).provide_receipt_url,
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "mt-2 inline-block text-xs font-semibold text-sky-600 hover:underline",
                                    children: t('dialog.receipt')
                                }, void 0, false, {
                                    fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                    lineNumber: 303,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                            lineNumber: 286,
                            columnNumber: 15
                        }, this),
                        ((_detail_orderable = detail.orderable) === null || _detail_orderable === void 0 ? void 0 : _detail_orderable.knowledge) && detail.orderable.knowledge.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "mb-2 text-xs font-bold uppercase text-gray-400",
                                    children: t('dialog.items')
                                }, void 0, false, {
                                    fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                    lineNumber: 317,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "flex flex-col gap-2",
                                    children: detail.orderable.knowledge.map((k, i)=>{
                                        var _detail_orderable_knowledge_documents;
                                        var _detail_orderable_knowledge_documents_i;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex flex-col gap-1 rounded-lg border border-gray-100 p-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center gap-2 font-medium text-gray-800",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$insighter$2d$dashboard$2f$KnowledgeTypeIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            type: k.type,
                                                            size: 14
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                            lineNumber: 322,
                                                            columnNumber: 25
                                                        }, this),
                                                        k.title
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                    lineNumber: 321,
                                                    columnNumber: 23
                                                }, this),
                                                ((_detail_orderable_knowledge_documents_i = (_detail_orderable_knowledge_documents = detail.orderable.knowledge_documents) === null || _detail_orderable_knowledge_documents === void 0 ? void 0 : _detail_orderable_knowledge_documents[i]) !== null && _detail_orderable_knowledge_documents_i !== void 0 ? _detail_orderable_knowledge_documents_i : []).map((doc, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ms-6 flex items-center justify-between text-xs text-gray-500",
                                                        children: [
                                                            doc.file_name,
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: doc.price === 0 ? t('dialog.free') : money(doc.price, detail.currency)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                                lineNumber: 328,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, j, true, {
                                                        fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                                        lineNumber: 326,
                                                        columnNumber: 25
                                                    }, this))
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                            lineNumber: 320,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                    lineNumber: 318,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                            lineNumber: 316,
                            columnNumber: 15
                        }, this),
                        ((_detail_orderable1 = detail.orderable) === null || _detail_orderable1 === void 0 ? void 0 : _detail_orderable1.meeting_booking) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "mb-2 text-xs font-bold uppercase text-gray-400",
                                    children: t('dialog.session')
                                }, void 0, false, {
                                    fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                    lineNumber: 339,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg border border-gray-100 p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-medium text-gray-800",
                                            children: detail.orderable.meeting_booking.title
                                        }, void 0, false, {
                                            fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                            lineNumber: 341,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-1 text-xs text-gray-500",
                                            children: [
                                                detail.orderable.meeting_booking.date,
                                                " • ",
                                                detail.orderable.meeting_booking.start_time,
                                                "–",
                                                detail.orderable.meeting_booking.end_time
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                            lineNumber: 342,
                                            columnNumber: 19
                                        }, this),
                                        detail.orderable.meeting_booking.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-xs text-gray-500",
                                            children: detail.orderable.meeting_booking.description
                                        }, void 0, false, {
                                            fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                            lineNumber: 347,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                    lineNumber: 340,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                            lineNumber: 338,
                            columnNumber: 15
                        }, this),
                        ((_detail_orderable2 = detail.orderable) === null || _detail_orderable2 === void 0 ? void 0 : _detail_orderable2.project) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "mb-2 text-xs font-bold uppercase text-gray-400",
                                    children: t('dialog.project')
                                }, void 0, false, {
                                    fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                    lineNumber: 355,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg border border-gray-100 p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-medium text-gray-800",
                                            children: detail.orderable.project.title || detail.orderable.project.project_no
                                        }, void 0, false, {
                                            fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                            lineNumber: 357,
                                            columnNumber: 19
                                        }, this),
                                        detail.orderable.project.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-xs text-gray-500",
                                            children: detail.orderable.project.description
                                        }, void 0, false, {
                                            fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                            lineNumber: 361,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                                    lineNumber: 356,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                            lineNumber: 354,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                    lineNumber: 261,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
                lineNumber: 259,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/insighter-dashboard/my-orders/MyOrdersClient.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
}
_s(MyOrdersClient, "p/z2KuYkNV7mK3VHwFR06GcLjCY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = MyOrdersClient;
var _c;
__turbopack_context__.k.register(_c, "MyOrdersClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_12b186a5._.js.map