module.exports = [
"[project]/hooks/useRoleCheck.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRoleCheck",
    ()=>useRoleCheck
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$GlobalProfileProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/GlobalProfileProvider.tsx [app-ssr] (ecmascript)");
'use client';
;
function useRoleCheck() {
    const { user, roles, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$GlobalProfileProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGlobalProfile"])();
    const hasRole = (role)=>{
        return roles.includes(role);
    };
    const hasAnyRole = (checkRoles)=>{
        return checkRoles.some((role)=>roles.includes(role));
    };
    const hasAllRoles = (checkRoles)=>{
        return checkRoles.every((role)=>roles.includes(role));
    };
    const isAdmin = ()=>{
        return hasAnyRole([
            'admin',
            'staff'
        ]);
    };
    const isStaff = ()=>{
        return hasRole('staff');
    };
    const isInsighter = ()=>{
        return hasAnyRole([
            'insighter',
            'company-insighter'
        ]);
    };
    const isCompany = ()=>{
        return hasAnyRole([
            'company',
            'company-insighter'
        ]);
    };
    return {
        user,
        roles,
        isLoading,
        hasRole,
        hasAnyRole,
        hasAllRoles,
        isAdmin,
        isStaff,
        isInsighter,
        isCompany
    };
}
}),
"[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>KnowledgeTypeIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
function KnowledgeTypeIcon({ type, size = 15 }) {
    switch(type){
        case 'data':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: size,
                height: size,
                viewBox: "0 0 30 34",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M14.5464 0C10.5851 0 6.86364 0.704566 4.06815 1.98373C1.48292 3.16777 0 4.73376 0 6.28348C0 7.8332 1.48292 9.39967 4.06815 10.5831C6.86364 11.8623 10.585 12.5669 14.5464 12.5669C18.5078 12.5669 22.2297 11.8623 25.0243 10.5831C27.6099 9.39967 29.0933 7.8333 29.0933 6.28348C29.0933 4.73367 27.6099 3.16777 25.0243 1.98373C22.2293 0.704566 18.5077 0 14.5464 0Z",
                        fill: "#000000"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 12,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M0 9.45442C0.821516 10.3442 1.99713 11.1499 3.49489 11.8359C6.46628 13.1954 10.3914 13.9444 14.5469 13.9444C18.7023 13.9444 22.627 13.1949 25.5984 11.8359C27.0961 11.1499 28.2718 10.3445 29.0933 9.45442V13.4496C29.0933 15.004 27.6131 16.5723 25.0331 17.7531C22.2436 19.029 18.5194 19.7326 14.5464 19.7326C10.5734 19.7326 6.84871 19.029 4.05982 17.7531C1.47967 16.5723 0 15.004 0 13.4496V9.45442Z",
                        fill: "#000000"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 13,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M29.0933 16.6207C26.6302 19.2908 21.1116 21.1102 14.5464 21.1102C7.98116 21.1102 2.46273 19.2908 0 16.6207V20.1383C0 21.6918 1.47967 23.261 4.05982 24.4417C6.84871 25.7181 10.5734 26.4217 14.5464 26.4217C18.5194 26.4217 22.2436 25.7181 25.0336 24.4417C27.6136 23.261 29.0933 21.6918 29.0933 20.1383V16.6207Z",
                        fill: "#000000"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 14,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: size,
                height: size,
                viewBox: "0 0 42 42",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: size,
                height: size,
                viewBox: "0 0 50 50",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        opacity: "0.4",
                        d: "M45.125 21.75L43.0833 30.4583C41.3333 37.9792 37.875 41.0208 31.375 40.3958C30.3333 40.3125 29.2083 40.125 28 39.8333L24.5 39C15.8125 36.9375 13.125 32.6458 15.1667 23.9375L17.2083 15.2083C17.625 13.4375 18.125 11.8958 18.75 10.625C21.1875 5.58333 25.3333 4.22916 32.2917 5.875L35.7708 6.6875C44.5 8.72916 47.1667 13.0417 45.125 21.75Z",
                        fill: "#699DDE"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 28,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M31.375 40.3958C30.0833 41.2708 28.4583 42 26.4792 42.6458L23.1875 43.7292C14.9167 46.3958 10.5625 44.1667 7.87499 35.8958L5.20833 27.6667C2.54166 19.3958 4.74999 15.0208 13.0208 12.3542L16.3125 11.2708C17.1667 11 17.9792 10.7708 18.75 10.625C18.125 11.8958 17.625 13.4375 17.2083 15.2083L15.1667 23.9375C13.125 32.6458 15.8125 36.9375 24.5 39L28 39.8333C29.2083 40.125 30.3333 40.3125 31.375 40.3958Z",
                        fill: "#3699FF"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M36.4375 21.8959C36.3125 21.8959 36.1875 21.875 36.0417 21.8542L25.9375 19.2917C25.1042 19.0834 24.6042 18.2292 24.8125 17.3959C25.0208 16.5625 25.875 16.0625 26.7083 16.2709L36.8125 18.8334C37.6458 19.0417 38.1458 19.8959 37.9375 20.7292C37.7708 21.4167 37.125 21.8959 36.4375 21.8959Z",
                        fill: "white"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 30,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: size,
                height: size,
                viewBox: "0 0 50 50",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M42.7083 14.5834V31.25H13.2292C9.95834 31.25 7.29167 33.9167 7.29167 37.1875V14.5834C7.29167 6.25002 9.37501 4.16669 17.7083 4.16669H32.2917C40.625 4.16669 42.7083 6.25002 42.7083 14.5834Z",
                        fill: "#FF9F43"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 37,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M42.7083 31.25V38.5417C42.7083 42.5625 39.4375 45.8333 35.4167 45.8333H14.5833C10.5625 45.8333 7.29167 42.5625 7.29167 38.5417V37.1875C7.29167 33.9167 9.95834 31.25 13.2292 31.25H42.7083Z",
                        fill: "#f8cda3"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M33.3333 16.1458H16.6667C15.8125 16.1458 15.1042 15.4375 15.1042 14.5833C15.1042 13.7291 15.8125 13.0208 16.6667 13.0208H33.3333C34.1875 13.0208 34.8958 13.7291 34.8958 14.5833C34.8958 15.4375 34.1875 16.1458 33.3333 16.1458Z",
                        fill: "white"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 39,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: size,
                height: size,
                viewBox: "0 0 39 36",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M31.9898 26.8163C31.9898 24.1788 29.8518 22.0408 27.2143 22.0408C24.5767 22.0408 22.4388 24.1788 22.4388 26.8163C22.4388 28.1696 23.0037 29.3885 23.9081 30.2576V36L27.2143 33.7959L30.5204 36V30.2576C31.4248 29.3885 31.9898 28.1696 31.9898 26.8163Z",
                        fill: "#C3D8F2"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: size,
                height: size,
                viewBox: "0 0 50 50",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M25 0C11.215 0 0 11.215 0 25C0 38.785 11.215 50 25 50C38.785 50 50 38.785 50 25C50 11.215 38.785 0 25 0Z",
                        fill: "#F64E60"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: size,
                height: size,
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
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
}),
"[project]/services/insighter-dashboard.api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiError",
    ()=>ApiError,
    "apiRequest",
    ()=>apiRequest,
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
    "getInsighterMeetingStatistics",
    ()=>getInsighterMeetingStatistics,
    "getKnowledgeTypeStatistics",
    ()=>getKnowledgeTypeStatistics,
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
    "getWalletBalance",
    ()=>getWalletBalance,
    "setMyKnowledgeStatus",
    ()=>setMyKnowledgeStatus,
    "setPackageStatus",
    ()=>setPackageStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-ssr] (ecmascript)");
'use client';
;
/**
 * API client for insighter dashboard features. Endpoints mirror the Angular
 * services in KNOLDG-APP/src/app/_fake/services.
 */ const API_BASE = 'https://api.foresighta.co/api';
class ApiError extends Error {
    status;
    errors;
    constructor(status, message, errors){
        super(message);
        this.status = status;
        this.errors = errors;
    }
}
async function apiRequest(path, options = {}) {
    const { method = 'GET', locale = 'en', body, params } = options;
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
    const url = new URL(`${API_BASE}${path}`);
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
                Authorization: `Bearer ${token}`
            } : {}
        },
        body: body !== undefined ? JSON.stringify(body) : undefined
    });
    if (!response.ok) {
        let message = `Request failed: ${response.status}`;
        let errors;
        try {
            const data = await response.json();
            message = data?.message ?? message;
            errors = data?.errors;
        } catch  {
        // non-JSON error body
        }
        throw new ApiError(response.status, message, errors);
    }
    if (response.status === 204) return undefined;
    return response.json();
}
async function getWalletBalance(locale) {
    const res = await apiRequest('/account/wallet', {
        locale
    });
    return Number(res?.data?.balance ?? 0);
}
async function getInsighterMeetingStatistics(locale) {
    const res = await apiRequest('/insighter/meeting/statistics', {
        locale
    });
    return res.data;
}
async function getSentMeetings(locale, page = 1, perPage = 30) {
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
    return res.data ?? [];
}
async function getCompanyInsighterRequests(locale) {
    const res = await apiRequest('/company/insighter/request', {
        locale
    });
    return res.data ?? [];
}
async function getPendingRequestsCount(locale, isCompany) {
    const lists = await Promise.all([
        getUserRequests(locale).catch(()=>[]),
        isCompany ? getCompanyInsighterRequests(locale).catch(()=>[]) : Promise.resolve([])
    ]);
    return lists.flat().filter((r)=>r.parent_id === 0 || r.parent_id === null || r.parent_id === undefined).filter((r)=>r.final_status?.toLowerCase() === 'pending').length;
}
async function checkLatestAgreement(locale) {
    const res = await apiRequest('/account/agreement/check', {
        locale
    });
    return !!res?.data?.accept;
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
    return res.data ?? [];
}
async function getCompanyDashboardStatistics(locale) {
    const res = await apiRequest('/company/insighter/statistics', {
        locale
    });
    return res.data;
}
async function getMyKnowledgeList(locale, options = {}) {
    return apiRequest('/insighter/library/knowledge', {
        locale,
        params: {
            page: options.page ?? 1,
            status: options.status || undefined,
            keyword: options.keyword || undefined,
            type: options.type || undefined
        }
    });
}
async function deleteMyKnowledge(locale, id) {
    await apiRequest(`/insighter/library/knowledge/${id}`, {
        locale,
        method: 'DELETE'
    });
}
async function setMyKnowledgeStatus(locale, id, status, publishedAt) {
    await apiRequest(`/insighter/library/knowledge/status/${id}`, {
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
    return res.data ?? [];
}
async function deletePackage(locale, packageId) {
    await apiRequest(`/insighter/library/package/${packageId}`, {
        locale,
        method: 'DELETE'
    });
}
async function getPackageKnowledge(locale, packageId) {
    return apiRequest(`/insighter/library/package/knowledge/list/${packageId}`, {
        locale
    });
}
async function setPackageStatus(locale, packageId, status, publishedAt) {
    await apiRequest(`/insighter/library/package/status/${packageId}`, {
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
}),
"[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>KnowledgeListView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/index.react-client.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Modal/Modal.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconSearch.mjs [app-ssr] (ecmascript) <export default as IconSearch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconPlus.mjs [app-ssr] (ecmascript) <export default as IconPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLayoutGrid$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLayoutGrid$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconLayoutGrid.mjs [app-ssr] (ecmascript) <export default as IconLayoutGrid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconList$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconList$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconList.mjs [app-ssr] (ecmascript) <export default as IconList>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconEye$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconEye$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconEye.mjs [app-ssr] (ecmascript) <export default as IconEye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTrash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTrash$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconTrash.mjs [app-ssr] (ecmascript) <export default as IconTrash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPackage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPackage$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconPackage.mjs [app-ssr] (ecmascript) <export default as IconPackage>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconUpload$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconUpload$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconUpload.mjs [app-ssr] (ecmascript) <export default as IconUpload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDownload$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDownload$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconDownload.mjs [app-ssr] (ecmascript) <export default as IconDownload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/toast/ToastContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useRoleCheck$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useRoleCheck.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$insighter$2d$dashboard$2f$KnowledgeTypeIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/insighter-dashboard/KnowledgeTypeIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$insighter$2d$dashboard$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/insighter-dashboard.api.ts [app-ssr] (ecmascript)");
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
const KNOWLEDGE_TYPES = [
    '',
    'data',
    'report',
    'manual',
    'course',
    'media',
    'statistic'
];
function statusBadgeClass(status) {
    switch(status.toLowerCase()){
        case 'published':
            return 'bg-[#DFFEE9] text-[#1BC653]';
        case 'unpublished':
            return 'bg-red-50 text-red-500';
        case 'scheduled':
            return 'bg-amber-50 text-amber-600';
        default:
            return 'bg-[#EFF8FF] text-[#299AF8]';
    }
}
function KnowledgeListView({ status = '' }) {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslations"])('InsighterDashboard.myKnowledge');
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLocale"])();
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const { hasRole } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useRoleCheck$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRoleCheck"])();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [lastPage, setLastPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [typeFilter, setTypeFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('list');
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [confirm, setConfirm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [confirmBusy, setConfirmBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const searchDebounce = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hadResults = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const isCompanyInsighter = hasRole('company-insighter');
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((targetPage, keyword, type)=>{
        setLoading(true);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$insighter$2d$dashboard$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMyKnowledgeList"])(locale, {
            page: targetPage,
            status: status || undefined,
            keyword,
            type
        }).then((res)=>{
            setItems(res.data ?? []);
            setLastPage(res.meta?.last_page ?? 1);
            setPage(res.meta?.current_page ?? targetPage);
            if ((res.data ?? []).length > 0) hadResults.current = true;
            setSelected(new Set());
        }).catch((err)=>toast.handleServerErrors(err)).finally(()=>setLoading(false));
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        locale,
        status
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        load(1, '', '');
    }, [
        load
    ]);
    const onSearchChange = (value)=>{
        setSearchTerm(value);
        if (searchDebounce.current) clearTimeout(searchDebounce.current);
        searchDebounce.current = setTimeout(()=>load(1, value, typeFilter), 500);
    };
    const onTypeFilter = (type)=>{
        setTypeFilter(type);
        load(1, searchTerm, type);
    };
    const canShowDelete = (k)=>{
        const requestStatus = k.account_manager_process?.request_status;
        if (requestStatus === 'declined') return false;
        if (isCompanyInsighter && requestStatus === 'pending') return false;
        return true;
    };
    const runConfirm = async ()=>{
        if (!confirm) return;
        setConfirmBusy(true);
        try {
            await confirm.action();
            setConfirm(null);
        } catch (err) {
            toast.handleServerErrors(err);
        } finally{
            setConfirmBusy(false);
        }
    };
    const askDelete = (ids)=>{
        setConfirm({
            title: t('confirmDelete.title'),
            confirmLabel: ids.length > 1 ? t('confirmDelete.confirmMany') : t('confirmDelete.confirm'),
            danger: true,
            action: async ()=>{
                await Promise.all(ids.map((id)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$insighter$2d$dashboard$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteMyKnowledge"])(locale, id)));
                toast.success(t('confirmDelete.deleted'));
                load(page, searchTerm, typeFilter);
            }
        });
    };
    const askUnpublish = (k)=>{
        setConfirm({
            title: t('confirmUnpublish.title'),
            confirmLabel: t('confirmUnpublish.confirm'),
            action: async ()=>{
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$insighter$2d$dashboard$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setMyKnowledgeStatus"])(locale, k.id, 'unpublished', new Date().toISOString());
                toast.success(t('confirmUnpublish.success'));
                load(page, searchTerm, typeFilter);
            }
        });
    };
    const askPublish = (k)=>{
        setConfirm({
            title: t('confirmPublish.title'),
            confirmLabel: t('confirmPublish.confirm'),
            action: async ()=>{
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$insighter$2d$dashboard$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setMyKnowledgeStatus"])(locale, k.id, 'published', new Date().toISOString());
                toast.success(t('confirmPublish.success'));
                load(page, searchTerm, typeFilter);
            }
        });
    };
    const toggleSelect = (id)=>{
        setSelected((prev)=>{
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };
    const toggleSelectAll = ()=>{
        setSelected((prev)=>prev.size === items.length ? new Set() : new Set(items.map((k)=>k.id)));
    };
    const statusLabel = (k)=>{
        if (k.status_label) return k.status_label;
        const key = k.status?.toLowerCase();
        return t.has(`status.${key}`) ? t(`status.${key}`) : k.status;
    };
    const viewHref = (k)=>`/${locale}/my-knowledge-base/view-my-knowledge/${k.id}`;
    const addHref = `/${locale}/add-knowledge/stepper`;
    const rowActions = (k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-end gap-1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: viewHref(k),
                    title: t('actions.view'),
                    className: "rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-sky-600",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconEye$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconEye$3e$__["IconEye"], {
                        size: 18
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                        lineNumber: 198,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                    lineNumber: 193,
                    columnNumber: 7
                }, this),
                status === 'published' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    title: t('actions.unpublish'),
                    onClick: ()=>askUnpublish(k),
                    className: "rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-amber-600",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDownload$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDownload$3e$__["IconDownload"], {
                        size: 18
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                        lineNumber: 207,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                    lineNumber: 201,
                    columnNumber: 9
                }, this),
                status === 'scheduled' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    title: t('actions.publish'),
                    onClick: ()=>askPublish(k),
                    className: "rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-green-600",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconUpload$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconUpload$3e$__["IconUpload"], {
                        size: 18
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                        lineNumber: 217,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                    lineNumber: 211,
                    columnNumber: 9
                }, this),
                status !== 'published' && canShowDelete(k) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    title: t('actions.delete'),
                    onClick: ()=>askDelete([
                            k.id
                        ]),
                    className: "rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-500",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTrash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTrash$3e$__["IconTrash"], {
                        size: 18
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                        lineNumber: 227,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                    lineNumber: 221,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
            lineNumber: 192,
            columnNumber: 5
        }, this);
    const currency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    const price = (k)=>{
        const value = parseFloat(k.total_price);
        return Number.isFinite(value) ? currency.format(value) : k.total_price;
    };
    const emptyWithFilters = searchTerm || typeFilter;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-gray-200 bg-white",
        children: [
            (items.length > 0 || emptyWithFilters || hadResults.current) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-full max-w-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__["IconSearch"], {
                                size: 16,
                                className: "absolute start-3 top-1/2 -translate-y-1/2 text-gray-400"
                            }, void 0, false, {
                                fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                lineNumber: 247,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: searchTerm,
                                onChange: (e)=>onSearchChange(e.target.value),
                                placeholder: t('search'),
                                className: "w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pe-3 ps-9 text-sm outline-none focus:border-sky-400"
                            }, void 0, false, {
                                fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                lineNumber: 248,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                        lineNumber: 246,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: addHref,
                                className: "inline-flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlus$3e$__["IconPlus"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                        lineNumber: 261,
                                        columnNumber: 15
                                    }, this),
                                    t('addKnowledge')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                lineNumber: 257,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex rounded-lg border border-gray-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setView('grid'),
                                        className: `rounded-s-lg p-2 ${view === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-400'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLayoutGrid$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLayoutGrid$3e$__["IconLayoutGrid"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                            lineNumber: 270,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                        lineNumber: 265,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setView('list'),
                                        className: `rounded-e-lg p-2 ${view === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconList$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconList$3e$__["IconList"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                            lineNumber: 277,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                        lineNumber: 272,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                lineNumber: 264,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                        lineNumber: 256,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                lineNumber: 245,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4",
                children: [
                    (items.length > 0 || emptyWithFilters) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 flex flex-wrap gap-2",
                        children: KNOWLEDGE_TYPES.map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>onTypeFilter(type),
                                className: `rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${typeFilter === type ? 'border-sky-500 bg-sky-50 text-sky-600' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`,
                                children: t(`types.${type || 'all'}`)
                            }, type || 'all', false, {
                                fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                lineNumber: 289,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                        lineNumber: 287,
                        columnNumber: 11
                    }, this),
                    selected.size > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 flex items-center justify-end gap-3 rounded-lg bg-gray-50 px-4 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-bold text-gray-700",
                                children: [
                                    selected.size,
                                    " ",
                                    t('selected')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                lineNumber: 308,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>askDelete([
                                        ...selected
                                    ]),
                                className: "rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600",
                                children: t('deleteSelected')
                            }, void 0, false, {
                                fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                lineNumber: 311,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                        lineNumber: 307,
                        columnNumber: 11
                    }, this),
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex min-h-[200px] items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"
                        }, void 0, false, {
                            fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                            lineNumber: 323,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                        lineNumber: 322,
                        columnNumber: 11
                    }, this),
                    !loading && items.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center justify-center gap-3 py-16 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-bold text-gray-800",
                                children: t('empty.title')
                            }, void 0, false, {
                                fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                lineNumber: 330,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "max-w-md text-sm text-gray-500",
                                children: emptyWithFilters ? t('empty.filteredMessage') : t('empty.startCreating')
                            }, void 0, false, {
                                fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                lineNumber: 331,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: addHref,
                                className: "mt-2 inline-flex items-center gap-2 rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-600",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlus$3e$__["IconPlus"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                        lineNumber: 338,
                                        columnNumber: 15
                                    }, this),
                                    t('addKnowledge')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                lineNumber: 334,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                        lineNumber: 329,
                        columnNumber: 11
                    }, this),
                    !loading && items.length > 0 && view === 'list' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-b border-gray-100 text-start text-xs font-semibold uppercase text-gray-400",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "w-8 py-3 pe-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: selected.size === items.length && items.length > 0,
                                                    onChange: toggleSelectAll,
                                                    className: "rounded border-gray-300"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                                    lineNumber: 351,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                                lineNumber: 350,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "min-w-[250px] py-3 text-start",
                                                children: t('table.name')
                                            }, void 0, false, {
                                                fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                                lineNumber: 358,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-3 text-start",
                                                children: t('table.type')
                                            }, void 0, false, {
                                                fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                                lineNumber: 359,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-3 text-start",
                                                children: t('table.price')
                                            }, void 0, false, {
                                                fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                                lineNumber: 360,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-3 text-start",
                                                children: t('table.status')
                                            }, void 0, false, {
                                                fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                                lineNumber: 361,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "w-28 py-3"
                                            }, void 0, false, {
                                                fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                                lineNumber: 362,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                        lineNumber: 349,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                    lineNumber: 348,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: items.map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "border-b border-gray-50 hover:bg-gray-50/50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-3 pe-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        checked: selected.has(k.id),
                                                        onChange: ()=>toggleSelect(k.id),
                                                        className: "rounded border-gray-300"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                                        lineNumber: 369,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                                    lineNumber: 368,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-3",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        href: viewHref(k),
                                                        className: "font-medium text-gray-800 hover:text-sky-600",
                                                        children: k.title?.trim() || t('untitled')
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                                        lineNumber: 377,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                                    lineNumber: 376,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-3",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-flex items-center gap-2 text-gray-600",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$insighter$2d$dashboard$2f$KnowledgeTypeIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                type: k.type
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                                                lineNumber: 383,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "capitalize",
                                                                children: t.has(`types.${k.type}`) ? t(`types.${k.type}`) : k.type
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                                                lineNumber: 384,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                                        lineNumber: 382,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                                    lineNumber: 381,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-3 font-semibold text-gray-900",
                                                    children: price(k)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                                    lineNumber: 389,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-3",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-flex items-center gap-2",
                                                        children: [
                                                            k.publish_as !== 'package' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `rounded-md px-2 py-1 text-xs font-semibold capitalize ${statusBadgeClass(k.status)}`,
                                                                children: statusLabel(k)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                                                lineNumber: 393,
                                                                columnNumber: 27
                                                            }, this),
                                                            (k.publish_as === 'both' || k.publish_as === 'package') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                title: k.publish_as === 'both' ? t('packageBadgeBoth') : t('packageBadgeOnly'),
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPackage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPackage$3e$__["IconPackage"], {
                                                                    size: 18,
                                                                    className: "text-[#0071FF]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                                                    lineNumber: 403,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                                                lineNumber: 400,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                                        lineNumber: 391,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                                    lineNumber: 390,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-3",
                                                    children: rowActions(k)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                                    lineNumber: 408,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, k.id, true, {
                                            fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                            lineNumber: 367,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                    lineNumber: 365,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                            lineNumber: 347,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                        lineNumber: 346,
                        columnNumber: 11
                    }, this),
                    !loading && items.length > 0 && view === 'grid' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: addHref,
                                className: "flex min-h-[220px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-sky-300 text-sky-500 hover:bg-sky-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlus$3e$__["IconPlus"], {
                                        size: 36
                                    }, void 0, false, {
                                        fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                        lineNumber: 423,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-base font-bold",
                                        children: t('addKnowledge')
                                    }, void 0, false, {
                                        fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                        lineNumber: 424,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                lineNumber: 419,
                                columnNumber: 13
                            }, this),
                            items.map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative flex min-h-[220px] flex-col justify-between rounded-xl border border-gray-200 p-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: viewHref(k),
                                                    className: "line-clamp-2 min-h-[45px] font-semibold text-gray-800 hover:text-sky-600",
                                                    children: k.title?.trim() || t('untitled')
                                                }, void 0, false, {
                                                    fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                                    lineNumber: 432,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-3 flex items-center gap-2 text-sm text-gray-600",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$insighter$2d$dashboard$2f$KnowledgeTypeIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            type: k.type
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                                            lineNumber: 439,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "capitalize",
                                                            children: t.has(`types.${k.type}`) ? t(`types.${k.type}`) : k.type
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                                            lineNumber: 440,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                                    lineNumber: 438,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-2 text-lg font-bold text-gray-900",
                                                    children: price(k)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                                    lineNumber: 444,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                            lineNumber: 431,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `rounded-md px-2 py-1 text-xs font-semibold capitalize ${statusBadgeClass(k.status)}`,
                                                    children: statusLabel(k)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                                    lineNumber: 447,
                                                    columnNumber: 19
                                                }, this),
                                                rowActions(k)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                            lineNumber: 446,
                                            columnNumber: 17
                                        }, this),
                                        k.publish_as === 'package' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "absolute end-3 top-3",
                                            title: t('packageBadgeOnly'),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPackage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPackage$3e$__["IconPackage"], {
                                                size: 18,
                                                className: "text-[#0071FF]"
                                            }, void 0, false, {
                                                fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                                lineNumber: 456,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                            lineNumber: 455,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, k.id, true, {
                                    fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                    lineNumber: 427,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                        lineNumber: 418,
                        columnNumber: 11
                    }, this),
                    !loading && items.length > 0 && lastPage > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex justify-end gap-1",
                        children: Array.from({
                            length: lastPage
                        }, (_, i)=>i + 1).map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>load(p, searchTerm, typeFilter),
                                className: `min-w-[32px] rounded-md px-2 py-1.5 text-sm font-medium ${p === page ? 'bg-sky-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`,
                                children: p
                            }, p, false, {
                                fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                lineNumber: 468,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                        lineNumber: 466,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                lineNumber: 284,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Modal"], {
                opened: !!confirm,
                onClose: ()=>!confirmBusy && setConfirm(null),
                title: confirm?.title,
                centered: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-5 text-sm text-gray-600",
                        children: t('confirmDelete.text')
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                        lineNumber: 490,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                disabled: confirmBusy,
                                onClick: ()=>setConfirm(null),
                                className: "rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50",
                                children: t('confirmDelete.cancel')
                            }, void 0, false, {
                                fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                lineNumber: 492,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                disabled: confirmBusy,
                                onClick: runConfirm,
                                className: `rounded-lg px-4 py-2 text-sm font-semibold text-white ${confirm?.danger ? 'bg-red-500 hover:bg-red-600' : 'bg-sky-500 hover:bg-sky-600'} ${confirmBusy ? 'opacity-60' : ''}`,
                                children: confirm?.confirmLabel
                            }, void 0, false, {
                                fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                                lineNumber: 500,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                        lineNumber: 491,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
                lineNumber: 484,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/insighter-dashboard/my-knowledge/KnowledgeListView.tsx",
        lineNumber: 242,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_b27dfe5c._.js.map