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
"[project]/lib/knowledgeDownload.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "downloadAccountKnowledge",
    ()=>downloadAccountKnowledge
]);
const DOWNLOAD_KNOWLEDGE_URL = "https://api.foresighta.co/api/account/library/my-knowledge/download";
const withZipExtension = (filename)=>{
    const trimmed = filename.trim();
    if (!trimmed) return "knowledge.zip";
    return trimmed.toLowerCase().endsWith(".zip") ? trimmed : "".concat(trimmed, ".zip");
};
const getFilenameFromContentDisposition = (contentDisposition, fallback)=>{
    const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
    if (utf8Match === null || utf8Match === void 0 ? void 0 : utf8Match[1]) {
        return decodeURIComponent(utf8Match[1].replace(/"/g, ""));
    }
    const filenameMatch = contentDisposition.match(/filename="?([^";]+)"?/i);
    if (filenameMatch === null || filenameMatch === void 0 ? void 0 : filenameMatch[1]) {
        return decodeURIComponent(filenameMatch[1]);
    }
    return fallback;
};
const readDownloadError = async (response)=>{
    try {
        const text = await response.text();
        if (!text.trim()) return "Download failed: ".concat(response.status);
        const parsed = JSON.parse(text);
        return typeof parsed.message === "string" ? parsed.message : "Download failed: ".concat(response.status);
    } catch (e) {
        return "Download failed: ".concat(response.status);
    }
};
const downloadAccountKnowledge = async (knowledgeUUID, param)=>{
    let { token, locale, filename = "knowledge.zip" } = param;
    if (!knowledgeUUID) {
        throw new Error("Missing knowledge download id");
    }
    if ("object" === "undefined" || typeof document === "undefined") {
        throw new Error("Download can only be started in the browser");
    }
    const response = await fetch("".concat(DOWNLOAD_KNOWLEDGE_URL, "/").concat(knowledgeUUID), {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Accept-Language": locale,
            "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
            ...token ? {
                Authorization: "Bearer ".concat(token)
            } : {}
        },
        body: JSON.stringify({})
    });
    if (!response.ok) {
        throw new Error(await readDownloadError(response));
    }
    const blob = await response.blob();
    const fallbackFilename = withZipExtension(filename);
    const resolvedFilename = getFilenameFromContentDisposition(response.headers.get("content-disposition") || "", fallbackFilename);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = resolvedFilename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
};
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
    "getPackageKnowledge",
    ()=>getPackageKnowledge,
    "getPackagesList",
    ()=>getPackagesList,
    "getPendingRequestsCount",
    ()=>getPendingRequestsCount,
    "getProjectAccountCheck",
    ()=>getProjectAccountCheck,
    "getSentMeetings",
    ()=>getSentMeetings,
    "getUserRequests",
    ()=>getUserRequests,
    "getUserRequestsPage",
    ()=>getUserRequestsPage,
    "getWalletBalance",
    ()=>getWalletBalance,
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MyDownloadsClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/index.react-client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconSearch.mjs [app-client] (ecmascript) <export default as IconSearch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconX.mjs [app-client] (ecmascript) <export default as IconX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDownload$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDownload$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconDownload.mjs [app-client] (ecmascript) <export default as IconDownload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileText$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconFileText.mjs [app-client] (ecmascript) <export default as IconFileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconRosetteDiscountCheckFilled$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconRosetteDiscountCheckFilled$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconRosetteDiscountCheckFilled.mjs [app-client] (ecmascript) <export default as IconRosetteDiscountCheckFilled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$insighter$2d$dashboard$2f$PageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/insighter-dashboard/PageHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$insighter$2d$dashboard$2f$KnowledgeTypeIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/toast/ToastContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$knowledgeDownload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/knowledgeDownload.ts [app-client] (ecmascript)");
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
;
const FILE_ICONS = [
    'csv',
    'doc',
    'docx',
    'jpg',
    'mp3',
    'mp4',
    'pdf',
    'ppt',
    'pptx',
    'txt',
    'xls',
    'xlsx',
    'zip',
    'rar',
    'png'
];
function fileIcon(extension) {
    var _extension_toLowerCase;
    const ext = (_extension_toLowerCase = extension === null || extension === void 0 ? void 0 : extension.toLowerCase()) !== null && _extension_toLowerCase !== void 0 ? _extension_toLowerCase : '';
    return FILE_ICONS.includes(ext) ? "/file-icons/".concat(ext, ".svg") : '/file-icons/file.svg';
}
function formatFileSize(bytes) {
    if (!bytes) return '0 B';
    const units = [
        'B',
        'KB',
        'MB',
        'GB'
    ];
    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    return "".concat((bytes / 1024 ** i).toFixed(i === 0 ? 0 : 1), " ").concat(units[i]);
}
function MyDownloadsClient() {
    var _selected_company, _selected_company1, _selected_company2, _selected_company3, _selected_company4;
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('InsighterDashboard.myDownloads');
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [meta, setMeta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [downloading, setDownloading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const searchDebounce = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MyDownloadsClient.useCallback[load]": (page, title)=>{
            setLoading(true);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$insighter$2d$dashboard$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMyDownloads"])(locale, {
                page,
                title
            }).then({
                "MyDownloadsClient.useCallback[load]": (res)=>{
                    var _res_data;
                    setItems((_res_data = res.data) !== null && _res_data !== void 0 ? _res_data : []);
                    var _res_meta;
                    setMeta((_res_meta = res.meta) !== null && _res_meta !== void 0 ? _res_meta : null);
                    setSelected({
                        "MyDownloadsClient.useCallback[load]": (prev)=>{
                            var _res_data, _res_data1;
                            var _res_data2, _find, _ref, _res_data_;
                            return prev ? (_ref = (_find = ((_res_data2 = res.data) !== null && _res_data2 !== void 0 ? _res_data2 : []).find({
                                "MyDownloadsClient.useCallback[load]": (k)=>k.uuid === prev.uuid
                            }["MyDownloadsClient.useCallback[load]"])) !== null && _find !== void 0 ? _find : (_res_data = res.data) === null || _res_data === void 0 ? void 0 : _res_data[0]) !== null && _ref !== void 0 ? _ref : null : (_res_data_ = (_res_data1 = res.data) === null || _res_data1 === void 0 ? void 0 : _res_data1[0]) !== null && _res_data_ !== void 0 ? _res_data_ : null;
                        }
                    }["MyDownloadsClient.useCallback[load]"]);
                }
            }["MyDownloadsClient.useCallback[load]"]).catch({
                "MyDownloadsClient.useCallback[load]": (err)=>toast.handleServerErrors(err)
            }["MyDownloadsClient.useCallback[load]"]).finally({
                "MyDownloadsClient.useCallback[load]": ()=>setLoading(false)
            }["MyDownloadsClient.useCallback[load]"]);
        }
    }["MyDownloadsClient.useCallback[load]"], // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        locale
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MyDownloadsClient.useEffect": ()=>{
            load(1, '');
        }
    }["MyDownloadsClient.useEffect"], [
        load
    ]);
    const onSearchChange = (value)=>{
        setSearchTerm(value);
        if (searchDebounce.current) clearTimeout(searchDebounce.current);
        searchDebounce.current = setTimeout(()=>load(1, value), 500);
    };
    const markBusy = (uuid, busy)=>setDownloading((prev)=>{
            const next = new Set(prev);
            if (busy) next.add(uuid);
            else next.delete(uuid);
            return next;
        });
    const downloadDocument = async (doc)=>{
        markBusy(doc.uuid, true);
        try {
            const url = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$insighter$2d$dashboard$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocumentDownloadUrl"])(locale, doc.uuid);
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            const now = new Date().toISOString();
            setItems((prev)=>prev.map((k)=>({
                        ...k,
                        documents: k.documents.map((d)=>d.uuid === doc.uuid ? {
                                ...d,
                                download_at: now
                            } : d)
                    })));
            setSelected((prev)=>prev ? {
                    ...prev,
                    documents: prev.documents.map((d)=>d.uuid === doc.uuid ? {
                            ...d,
                            download_at: now
                        } : d)
                } : prev);
            toast.success(t('downloadStarted'));
        } catch (err) {
            toast.handleServerErrors(err);
        } finally{
            markBusy(doc.uuid, false);
        }
    };
    const downloadWholeKnowledge = async (knowledge)=>{
        markBusy(knowledge.uuid, true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$knowledgeDownload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["downloadAccountKnowledge"])(knowledge.uuid, {
                token: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])(),
                locale,
                filename: knowledge.title
            });
            toast.success(t('downloadStarted'));
        } catch (err) {
            toast.handleServerErrors(err);
        } finally{
            markBusy(knowledge.uuid, false);
        }
    };
    const isNew = (k)=>!k.download_at;
    const dateFormat = new Intl.DateTimeFormat(locale === 'ar' ? 'ar' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    const formatDate = (value)=>{
        if (!value) return '—';
        const parsed = Date.parse(value);
        return Number.isNaN(parsed) ? value : dateFormat.format(parsed);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$insighter$2d$dashboard$2f$PageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDownload$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDownload$3e$__["IconDownload"], {
                    size: 22
                }, void 0, false, {
                    fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                    lineNumber: 160,
                    columnNumber: 25
                }, void 0),
                title: t('title')
            }, void 0, false, {
                fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-full max-w-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__["IconSearch"], {
                                size: 16,
                                className: "absolute start-3 top-1/2 -translate-y-1/2 text-gray-400"
                            }, void 0, false, {
                                fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: searchTerm,
                                onChange: (e)=>onSearchChange(e.target.value),
                                placeholder: t('searchPlaceholder'),
                                className: "w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pe-9 ps-9 text-sm outline-none focus:border-sky-400"
                            }, void 0, false, {
                                fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                lineNumber: 166,
                                columnNumber: 11
                            }, this),
                            searchTerm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                title: t('clearSearch'),
                                onClick: ()=>onSearchChange(''),
                                className: "absolute end-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__["IconX"], {
                                    size: 14
                                }, void 0, false, {
                                    fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                    lineNumber: 180,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                lineNumber: 174,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this),
                    meta && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm text-gray-500",
                        children: [
                            t('total'),
                            ": ",
                            meta.total
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                        lineNumber: 185,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex min-h-[240px] items-center justify-center rounded-xl border border-gray-200 bg-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"
                }, void 0, false, {
                    fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                    lineNumber: 193,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                lineNumber: 192,
                columnNumber: 9
            }, this) : items.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white py-16 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDownload$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDownload$3e$__["IconDownload"], {
                        size: 40,
                        className: "text-gray-300"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                        lineNumber: 197,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-500",
                        children: searchTerm ? t('noSearchResults') : t('noDownloads')
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                        lineNumber: 198,
                        columnNumber: 11
                    }, this),
                    searchTerm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>onSearchChange(''),
                        className: "mt-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-600 hover:bg-gray-50",
                        children: t('viewAll')
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                        lineNumber: 202,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                lineNumber: 196,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 gap-4 lg:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-gray-200 bg-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "border-b border-gray-100 px-4 py-3 text-sm font-bold text-gray-900",
                                children: t('knowledgeItems')
                            }, void 0, false, {
                                fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                lineNumber: 215,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex max-h-[560px] flex-col gap-2 overflow-y-auto p-3",
                                children: items.map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setSelected(k),
                                        className: "relative rounded-lg border p-3 text-start transition-colors ".concat((selected === null || selected === void 0 ? void 0 : selected.uuid) === k.uuid ? 'border-sky-400 bg-sky-50/60' : 'border-gray-100 hover:border-gray-300'),
                                        children: [
                                            isNew(k) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "absolute end-2 top-2 rounded bg-green-500 px-1.5 py-0.5 text-[10px] font-bold text-white",
                                                children: t('isNew')
                                            }, void 0, false, {
                                                fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                lineNumber: 231,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 pe-10",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$insighter$2d$dashboard$2f$KnowledgeTypeIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        type: k.type,
                                                        size: 18
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                        lineNumber: 236,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "line-clamp-2 text-sm font-semibold text-gray-800",
                                                        children: k.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                        lineNumber: 237,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                lineNumber: 235,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 flex items-center justify-between text-xs text-gray-400",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            t('by'),
                                                            " ",
                                                            k.insighter
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                        lineNumber: 240,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: formatDate(k.purchase_date)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                        lineNumber: 243,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                lineNumber: 239,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, k.uuid, true, {
                                        fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                        lineNumber: 220,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                lineNumber: 218,
                                columnNumber: 13
                            }, this),
                            meta && meta.last_page > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between border-t border-gray-100 px-4 py-2 text-sm",
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
                                        fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                        lineNumber: 250,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-1",
                                        children: Array.from({
                                            length: meta.last_page
                                        }, (_, i)=>i + 1).map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>load(p, searchTerm),
                                                className: "min-w-[28px] rounded-md px-1.5 py-1 text-xs font-medium ".concat(p === meta.current_page ? 'bg-sky-500 text-white' : 'text-gray-600 hover:bg-gray-100'),
                                                children: p
                                            }, p, false, {
                                                fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                lineNumber: 255,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                        lineNumber: 253,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                lineNumber: 249,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                        lineNumber: 214,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-gray-200 bg-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between border-b border-gray-100 px-4 py-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-bold text-gray-900",
                                        children: t('documents')
                                    }, void 0, false, {
                                        fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                        lineNumber: 274,
                                        columnNumber: 15
                                    }, this),
                                    selected && selected.documents.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        disabled: downloading.has(selected.uuid),
                                        onClick: ()=>downloadWholeKnowledge(selected),
                                        className: "inline-flex items-center gap-1 rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-600 ".concat(downloading.has(selected.uuid) ? 'opacity-60' : ''),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDownload$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDownload$3e$__["IconDownload"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                lineNumber: 284,
                                                columnNumber: 19
                                            }, this),
                                            t('downloadAll')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                        lineNumber: 276,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                lineNumber: 273,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex max-h-[560px] flex-col gap-2 overflow-y-auto p-3",
                                children: !selected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "py-10 text-center text-sm text-gray-400",
                                    children: t('selectKnowledge')
                                }, void 0, false, {
                                    fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                    lineNumber: 291,
                                    columnNumber: 17
                                }, this) : selected.documents.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "py-10 text-center text-sm text-gray-400",
                                    children: t('noDocuments')
                                }, void 0, false, {
                                    fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                    lineNumber: 293,
                                    columnNumber: 17
                                }, this) : selected.documents.map((doc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between gap-3 rounded-lg border border-gray-100 p-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex min-w-0 items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: fileIcon(doc.file_extension),
                                                        alt: doc.file_extension,
                                                        className: "h-8 w-8 shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                        lineNumber: 302,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "truncate text-sm font-medium text-gray-800",
                                                                children: doc.file_name
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                                lineNumber: 304,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-gray-400",
                                                                children: [
                                                                    formatFileSize(doc.file_size),
                                                                    doc.price === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "ms-2 font-semibold text-green-600",
                                                                        children: t('free')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                                        lineNumber: 308,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    doc.download_at && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "ms-2",
                                                                        children: [
                                                                            t('downloadDate'),
                                                                            ": ",
                                                                            formatDate(doc.download_at)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                                        lineNumber: 311,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                                lineNumber: 305,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                        lineNumber: 303,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                lineNumber: 300,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                disabled: downloading.has(doc.uuid),
                                                onClick: ()=>downloadDocument(doc),
                                                title: t('download'),
                                                className: "shrink-0 rounded-lg border border-sky-500 p-2 text-sky-600 hover:bg-sky-50 ".concat(downloading.has(doc.uuid) ? 'opacity-60' : ''),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDownload$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDownload$3e$__["IconDownload"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                    lineNumber: 327,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                lineNumber: 318,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, doc.uuid, true, {
                                        fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                        lineNumber: 296,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                lineNumber: 289,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                        lineNumber: 272,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-gray-200 bg-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "border-b border-gray-100 px-4 py-3 text-sm font-bold text-gray-900",
                                children: t('knowledgeSource')
                            }, void 0, false, {
                                fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                lineNumber: 337,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4",
                                children: !selected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "py-10 text-center text-sm text-gray-400",
                                    children: t('selectItemDetails')
                                }, void 0, false, {
                                    fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                    lineNumber: 342,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                ((_selected_company = selected.company) === null || _selected_company === void 0 ? void 0 : _selected_company.logo) || selected.insighter_photo ? // eslint-disable-next-line @next/next/no-img-element
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: ((_selected_company1 = selected.company) === null || _selected_company1 === void 0 ? void 0 : _selected_company1.logo) || selected.insighter_photo || '',
                                                    alt: "",
                                                    className: "h-12 w-12 rounded-full object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                    lineNumber: 348,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 font-bold text-sky-600",
                                                    children: (((_selected_company2 = selected.company) === null || _selected_company2 === void 0 ? void 0 : _selected_company2.legal_name) || selected.insighter || '?').charAt(0)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                    lineNumber: 354,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-1 text-sm font-bold text-gray-800",
                                                            children: [
                                                                ((_selected_company3 = selected.company) === null || _selected_company3 === void 0 ? void 0 : _selected_company3.legal_name) || selected.insighter,
                                                                ((_selected_company4 = selected.company) === null || _selected_company4 === void 0 ? void 0 : _selected_company4.verified) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconRosetteDiscountCheckFilled$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconRosetteDiscountCheckFilled$3e$__["IconRosetteDiscountCheckFilled"], {
                                                                    size: 16,
                                                                    className: "text-sky-500"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                                    lineNumber: 362,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                            lineNumber: 359,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-gray-400",
                                                            children: [
                                                                t('by'),
                                                                " ",
                                                                selected.insighter
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                            lineNumber: 365,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                    lineNumber: 358,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                            lineNumber: 345,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                            className: "flex flex-col gap-2 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                            className: "text-gray-400",
                                                            children: t('type')
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                            lineNumber: 373,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                            className: "flex items-center gap-1.5 font-medium capitalize text-gray-700",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$insighter$2d$dashboard$2f$KnowledgeTypeIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    type: selected.type,
                                                                    size: 14
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                                    lineNumber: 375,
                                                                    columnNumber: 25
                                                                }, this),
                                                                selected.type
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                            lineNumber: 374,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                    lineNumber: 372,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                            className: "text-gray-400",
                                                            children: t('purchaseDate')
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                            lineNumber: 380,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                            className: "font-medium text-gray-700",
                                                            children: formatDate(selected.purchase_date)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                            lineNumber: 381,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                    lineNumber: 379,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                            lineNumber: 371,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/".concat(locale, "/knowledge/").concat(selected.type, "/").concat(selected.knowledge_slug),
                                            className: "inline-flex items-center justify-center gap-2 rounded-lg border border-sky-500 px-4 py-2 text-sm font-semibold text-sky-600 hover:bg-sky-50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileText$3e$__["IconFileText"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                                    lineNumber: 389,
                                                    columnNumber: 21
                                                }, this),
                                                t('view')
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                            lineNumber: 385,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                    lineNumber: 344,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                                lineNumber: 340,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                        lineNumber: 336,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
                lineNumber: 212,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/insighter-dashboard/my-downloads/MyDownloadsClient.tsx",
        lineNumber: 159,
        columnNumber: 5
    }, this);
}
_s(MyDownloadsClient, "knheSA1cyUHbpWGla8kKZUap8Ys=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = MyDownloadsClient;
var _c;
__turbopack_context__.k.register(_c, "MyDownloadsClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_940ccdd9._.js.map