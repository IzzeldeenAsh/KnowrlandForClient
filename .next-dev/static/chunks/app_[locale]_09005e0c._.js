(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/[locale]/topic/[id]/[slug]/knowledge-list.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actionButton": "knowledge-list-module__GtFLbq__actionButton",
  "avatar": "knowledge-list-module__GtFLbq__avatar",
  "contentColumn": "knowledge-list-module__GtFLbq__contentColumn",
  "description": "knowledge-list-module__GtFLbq__description",
  "detailsSection": "knowledge-list-module__GtFLbq__detailsSection",
  "iconWrapper": "knowledge-list-module__GtFLbq__iconWrapper",
  "insighterColumn": "knowledge-list-module__GtFLbq__insighterColumn",
  "listCard": "knowledge-list-module__GtFLbq__listCard",
  "priceBadge": "knowledge-list-module__GtFLbq__priceBadge",
  "richDescription": "knowledge-list-module__GtFLbq__richDescription",
  "richDescriptionCollapsed": "knowledge-list-module__GtFLbq__richDescriptionCollapsed",
  "richDescriptionExpanded": "knowledge-list-module__GtFLbq__richDescriptionExpanded",
  "title": "knowledge-list-module__GtFLbq__title",
  "titleSection": "knowledge-list-module__GtFLbq__titleSection",
  "toggleLink": "knowledge-list-module__GtFLbq__toggleLink",
  "typeColumn": "knowledge-list-module__GtFLbq__typeColumn",
});
}),
"[project]/app/[locale]/home/SearchResultsList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SearchResultsList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Card$2f$Card$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Card/Card.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Text$2f$Text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Text/Text.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Badge$2f$Badge$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Badge/Badge.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Avatar$2f$Avatar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Avatar/Avatar.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Rating$2f$Rating$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Rating/Rating.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/formatDistanceToNow.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$DataIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/DataIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$InsightIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/InsightIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$ManualIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/ManualIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$ReportIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/ReportIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$CourseIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/CourseIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowDownTrayIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownTrayIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/ArrowDownTrayIcon.js [app-client] (ecmascript) <export default as ArrowDownTrayIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$ar$2d$SA$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/locale/ar-SA.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$en$2d$US$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/locale/en-US.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$topic$2f5b$id$5d2f5b$slug$5d2f$knowledge$2d$list$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/[locale]/topic/[id]/[slug]/knowledge-list.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$topic$2f5b$id$5d2f5b$slug$5d2f$knowledge$2d$card$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/[locale]/topic/[id]/[slug]/knowledge-card.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$knowledge$2f5b$type$5d2f5b$slug$5d2f$AuthModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/[locale]/knowledge/[type]/[slug]/AuthModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$textUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/textUtils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
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
;
;
;
;
;
;
const BookmarkUnselectedIcon = (props)=>{
    const { width = 33, height = 33, ...rest } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: width,
        height: height,
        viewBox: "0 0 33 33",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...rest,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16.658 2.38159C15.1433 2.38159 13.6287 2.38159 12.1172 2.38159C11.3277 2.38159 10.5349 2.38159 9.74536 2.38159C8.63354 2.38159 7.5604 2.59751 6.59038 3.1647C5.21753 3.96714 4.17339 5.36577 3.85112 6.92876C3.74155 7.45405 3.71899 7.97935 3.71899 8.51431V12.1108V17.9406V24.0701V28.4722V29.3971C3.71899 29.8999 3.89302 30.3961 4.26362 30.7506C4.87593 31.3339 5.78149 31.4113 6.50015 30.9794C7.75054 30.2286 8.99771 29.4777 10.2481 28.7268C11.708 27.8502 13.1646 26.9705 14.6245 26.0939C14.7115 26.0423 14.7953 25.9908 14.8823 25.9392C14.5568 25.9392 14.2313 25.9392 13.9058 25.9392C14.3086 26.1809 14.7147 26.4258 15.1175 26.6675C16.0295 27.2154 16.9383 27.7632 17.8503 28.3111C18.7978 28.8815 19.7453 29.4519 20.6927 30.0223C21.2212 30.3381 21.7465 30.6572 22.275 30.973C23.0743 31.4532 24.1023 31.3082 24.6824 30.5605C24.966 30.1931 25.0659 29.7613 25.0659 29.3069C25.0659 28.7075 25.0659 28.1081 25.0659 27.5086C25.0659 26.4774 25.0659 25.4494 25.0659 24.4181C25.0659 23.2547 25.0659 22.0946 25.0659 20.9312C25.0659 19.9354 25.0659 18.9396 25.0659 17.9438C25.0659 17.4121 25.0659 16.8835 25.0659 16.3518C25.0659 16.326 25.0659 16.3035 25.0659 16.2777C25.0659 15.7717 24.6211 15.2883 24.0991 15.3109C23.5738 15.3334 23.1323 15.7363 23.1323 16.2777V17.6022V20.7765V24.5889V27.8825C23.1323 28.4013 23.1419 28.9234 23.1323 29.4455C23.1323 29.4938 23.1291 29.5421 23.1226 29.5937C23.1355 29.5067 23.1452 29.4229 23.1581 29.3359C23.1452 29.4068 23.1258 29.4745 23.0968 29.5389C23.1291 29.4616 23.1613 29.3842 23.1935 29.3069C23.1742 29.3456 23.1548 29.381 23.1355 29.4165C23.0614 29.5583 23.3095 29.2263 23.1709 29.3681C23.0388 29.5002 23.3224 29.2843 23.2386 29.323C23.1935 29.3423 23.1548 29.3713 23.1097 29.3939C23.1871 29.3617 23.2644 29.3294 23.3417 29.2972C23.2741 29.323 23.2096 29.3423 23.1387 29.3584C23.2257 29.3456 23.3095 29.3359 23.3965 29.323C23.316 29.3327 23.2386 29.3327 23.1581 29.3262C23.2451 29.3391 23.3289 29.3488 23.4159 29.3617C23.345 29.352 23.2805 29.3327 23.2161 29.3101L23.4481 29.4068C23.1323 29.2714 22.8358 29.0523 22.5425 28.875C21.8819 28.4754 21.218 28.0791 20.5574 27.6794C19.0234 26.7578 17.4894 25.8329 15.9554 24.9112C15.6009 24.6985 15.2432 24.4826 14.8887 24.2699C14.5955 24.0926 14.2055 24.0926 13.9123 24.2699C12.9455 24.8532 11.9754 25.4333 11.0086 26.0166C9.49077 26.9318 7.96968 27.8438 6.45181 28.759C6.21011 28.9041 5.96841 29.0491 5.72671 29.1973C5.60425 29.2714 5.48501 29.352 5.35288 29.41L5.58491 29.3133C5.51724 29.3359 5.45278 29.3552 5.38511 29.3649C5.47212 29.352 5.55591 29.3423 5.64292 29.3294C5.56235 29.3359 5.48501 29.3359 5.40444 29.3262C5.49145 29.3391 5.57524 29.3488 5.66226 29.3617C5.59136 29.3488 5.52368 29.3294 5.45923 29.3004L5.69126 29.3971C5.65259 29.3778 5.61714 29.3584 5.58169 29.3391C5.43989 29.265 5.77183 29.5131 5.63003 29.3746C5.4979 29.2424 5.71382 29.526 5.67515 29.4422C5.65581 29.3971 5.62681 29.3584 5.60425 29.3133C5.63647 29.3907 5.6687 29.468 5.70093 29.5454C5.67515 29.4777 5.65581 29.4132 5.6397 29.3423C5.65259 29.4293 5.66226 29.5131 5.67515 29.6001C5.64614 29.3746 5.66548 29.1361 5.66548 28.9073C5.66548 28.3852 5.66548 27.8631 5.66548 27.3411C5.66548 25.6105 5.66548 23.8799 5.66548 22.1461C5.66548 20.0579 5.66548 17.9728 5.66548 15.8845C5.66548 14.1088 5.66548 12.3332 5.66548 10.5575C5.66548 9.76147 5.66226 8.96548 5.66548 8.16948C5.66548 7.95679 5.67837 7.74731 5.70737 7.53784C5.69448 7.62485 5.68481 7.70864 5.67192 7.79565C5.72993 7.36382 5.84595 6.94487 6.01353 6.54204C5.9813 6.61938 5.94907 6.69673 5.91685 6.77407C6.03931 6.4937 6.18433 6.22622 6.35513 5.97163C6.39702 5.90718 6.44536 5.84595 6.49048 5.78149C6.57749 5.65903 6.35835 5.94585 6.42925 5.85884C6.45181 5.83306 6.47437 5.80405 6.49692 5.77827C6.59683 5.65903 6.69995 5.54624 6.80952 5.43667C6.91587 5.33354 7.02544 5.23364 7.13823 5.14019C7.16401 5.11763 7.19302 5.09507 7.2188 5.07251C6.98032 5.27554 7.09956 5.16597 7.15757 5.12085C7.21558 5.07895 7.27358 5.03706 7.33159 4.99839C7.59263 4.82437 7.86655 4.67612 8.15659 4.55688C8.07925 4.58911 8.0019 4.62134 7.92456 4.65356C8.3145 4.49243 8.72056 4.38286 9.13628 4.32808C9.04927 4.34097 8.96548 4.35063 8.87847 4.36353C9.2523 4.31519 9.62935 4.32163 10.0064 4.32163H11.6757H15.7202H16.6773C17.1833 4.32163 17.6667 3.8769 17.6441 3.35483C17.6022 2.8231 17.1994 2.38159 16.658 2.38159Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M23.1064 2.70376V5.58804V10.1449V11.1955C23.1064 11.7014 23.5512 12.1848 24.0732 12.1623C24.5985 12.1397 25.04 11.7369 25.04 11.1955C25.04 10.2351 25.04 9.27154 25.04 8.31118C25.04 6.79331 25.04 5.27222 25.04 3.75435C25.04 3.40308 25.04 3.05503 25.04 2.70376C25.04 2.19781 24.5953 1.71441 24.0732 1.73697C23.5479 1.75952 23.1064 2.16236 23.1064 2.70376Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M19.8258 7.91479H22.7101H27.2669H28.3175C28.8235 7.91479 29.3069 7.47007 29.2843 6.948C29.2618 6.42271 28.8589 5.9812 28.3175 5.9812C27.3572 5.9812 26.3936 5.9812 25.4333 5.9812C23.9154 5.9812 22.3943 5.9812 20.8764 5.9812C20.5251 5.9812 20.1771 5.9812 19.8258 5.9812C19.3199 5.9812 18.8365 6.42593 18.859 6.948C18.8848 7.47329 19.2844 7.91479 19.8258 7.91479Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = BookmarkUnselectedIcon;
const BookmarkSelectedIcon = (props)=>{
    const { width = 28, height = 28, ...rest } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: width,
        height: height,
        viewBox: "0 0 28 28",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...rest,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M21.9024 27.6937L14 22.0555L6.09771 27.6937C5.02583 28.4594 3.53833 27.6937 3.53833 26.3758V2.32969C3.53833 1.04453 4.58286 0 5.86802 0H22.1321C23.4172 0 24.4618 1.04453 24.4618 2.32969V26.3758C24.4618 27.6937 22.9743 28.4594 21.9024 27.6937Z",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c1 = BookmarkSelectedIcon;
// Helper function to get initials from a name
function getInitials(name) {
    if (!name) return '';
    return name.split(" ").map((word)=>word[0]).join("").toUpperCase();
}
// Helper function to safely format date, handling both string and string[] types
function safeFormatDate(dateInput) {
    let locale = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'en';
    if (!dateInput) return '';
    // Convert array to string if needed
    const dateString = Array.isArray(dateInput) ? dateInput[0] || '' : dateInput;
    if (!dateString) return '';
    try {
        return formatPublishedDate(dateString, locale);
    } catch (error) {
        console.error('Error formatting date:', error);
        return '';
    }
}
// Helper function to format date for display
function formatPublishedDate(dateString) {
    let locale = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'en';
    if (!dateString) return '';
    // Ensure we're working with UTC time to avoid server/client mismatches
    const date = new Date(dateString);
    // Create UTC version of the original date
    const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes()));
    // Select locale
    const selectedLocale = locale === 'ar' ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$ar$2d$SA$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arSA"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$en$2d$US$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enUS"];
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDistanceToNow"])(utcDate, {
        addSuffix: true,
        locale: selectedLocale
    });
}
// Sanitize and keep only a safe subset of HTML tags (for description preview)
function sanitizeLimitedHtml(html) {
    if (!html) return "";
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        // Avoid heavy DOM work for very large strings
        if (html.length > 20000) {
            return truncateDescription(html, 60);
        }
        const container = document.createElement("div");
        container.innerHTML = html;
        const allowedTags = new Set([
            "H1",
            "H2",
            "H3",
            "P",
            "UL",
            "OL",
            "LI",
            "STRONG",
            "EM",
            "A",
            "BR",
            "SPAN"
        ]);
        // Guard against runaway recursion
        const NODE_LIMIT = 4000;
        let visited = 0;
        const sanitizeNode = (node)=>{
            visited += 1;
            if (visited > NODE_LIMIT) {
                return document.createTextNode("");
            }
            if (node.nodeType === Node.TEXT_NODE) return node;
            if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node;
                const tag = element.tagName.toUpperCase();
                if (!allowedTags.has(tag)) {
                    const fragment = document.createDocumentFragment();
                    while(element.firstChild){
                        const child = element.firstChild;
                        const sanitizedChild = sanitizeNode(child);
                        if (sanitizedChild) {
                            fragment.appendChild(sanitizedChild);
                        } else {
                            element.removeChild(child);
                        }
                    }
                    return fragment;
                }
                // Strip all attributes except safe href on anchors
                Array.from(element.attributes).forEach((attr)=>{
                    const attrName = attr.name.toLowerCase();
                    if (!(tag === "A" && attrName === "href")) {
                        element.removeAttribute(attr.name);
                    }
                });
                if (tag === "A") {
                    const href = element.getAttribute("href") || "";
                    const isSafe = /^(https?:|mailto:|tel:)/i.test(href);
                    if (!isSafe) {
                        element.removeAttribute("href");
                    }
                }
                // Recurse children
                Array.from(element.childNodes).forEach((child)=>{
                    const sanitizedChild = sanitizeNode(child);
                    if (sanitizedChild !== child) {
                        if (sanitizedChild) {
                            element.replaceChild(sanitizedChild, child);
                        } else {
                            element.removeChild(child);
                        }
                    }
                });
                return element;
            }
            return null;
        };
        const sanitizedChildren = Array.from(container.childNodes).map((n)=>sanitizeNode(n)).filter(Boolean);
        const output = document.createElement("div");
        sanitizedChildren.forEach((n)=>output.appendChild(n));
        return output.innerHTML;
    } catch (e) {
        // As a final fallback, return truncated plain text
        try {
            return truncateDescription(html, 60);
        } catch (e) {
            return "";
        }
    }
}
// Convert HTML to plain text and preserve basic line breaks
function htmlToPlainTextWithBreaks(html) {
    if (!html) return "";
    let text = html.replace(/<\s*br\s*\/?>/gi, '\n').replace(/<\/\s*(p|div|h[1-6]|li|ul|ol)\s*>/gi, '\n');
    text = text.replace(/<[^>]+>/g, '');
    text = text.replace(/&nbsp;/gi, ' ');
    text = text.replace(/&amp;/gi, '&');
    text = text.replace(/&lt;/gi, '<');
    text = text.replace(/&gt;/gi, '>');
    text = text.replace(/&quot;/gi, '"');
    text = text.replace(/&#39;/gi, "'");
    text = text.replace(/\n{3,}/g, '\n\n').trim();
    return text;
}
function SearchResultsList(param) {
    let { results, locale } = param;
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const currentLocale = locale || params.locale || "en";
    const isRTL = currentLocale === "ar";
    const [authModalOpened, setAuthModalOpened] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // State for tracking read later status for each item
    const [readLaterStates, setReadLaterStates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [loadingStates, setLoadingStates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [needsToggleMap, setNeedsToggleMap] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const descRefs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useRef({});
    // Check if user is logged in
    const [isLoggedIn, setIsLoggedIn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "SearchResultsList.useEffect": ()=>{
            setIsLoggedIn(!!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])());
        }
    }["SearchResultsList.useEffect"], []);
    // Generate a unique prefix for this render to avoid key conflicts
    const uniquePrefix = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "SearchResultsList.useMemo[uniquePrefix]": ()=>Date.now().toString()
    }["SearchResultsList.useMemo[uniquePrefix]"], [
        results
    ]);
    // Measure description overflow to decide whether to show "Read more"
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "SearchResultsList.useEffect": ()=>{
            const nextNeeds = {};
            // Only measure knowledge items that have descriptions
            results.filter({
                "SearchResultsList.useEffect": (i)=>i.searchable_type === "knowledge" && i.description
            }["SearchResultsList.useEffect"]).forEach({
                "SearchResultsList.useEffect": (item)=>{
                    const el = descRefs.current[item.searchable_id];
                    if (el) {
                        nextNeeds[item.searchable_id] = el.scrollHeight > 96; // heuristic threshold
                    }
                }
            }["SearchResultsList.useEffect"]);
            setNeedsToggleMap(nextNeeds);
        }
    }["SearchResultsList.useEffect"], [
        results,
        isRTL
    ]);
    // Handle read later toggle
    const handleReadLaterToggle = async (item, e)=>{
        if (!isLoggedIn) {
            setAuthModalOpened(true);
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        if (item.searchable_type !== 'knowledge') return;
        const itemId = item.searchable_id;
        var _readLaterStates_itemId, _ref;
        const currentState = (_ref = (_readLaterStates_itemId = readLaterStates[itemId]) !== null && _readLaterStates_itemId !== void 0 ? _readLaterStates_itemId : item.is_read_later) !== null && _ref !== void 0 ? _ref : false;
        setLoadingStates((prev)=>({
                ...prev,
                [itemId]: true
            }));
        try {
            const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
            if (!token) {
                console.error('No auth token found');
                return;
            }
            const method = currentState ? 'DELETE' : 'POST';
            const slug = item.url.split('/').pop();
            const url = "".concat(("TURBOPACK compile-time value", "https://api.foresighta.co"), "/api/account/favorite/knowledge/").concat(slug);
            const axiosConfig = {
                method,
                url,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer ".concat(token),
                    'Accept': 'application/json',
                    'Accept-language': currentLocale
                }
            };
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(axiosConfig);
            // Check for successful responses (200, 201, 204)
            if (response.status >= 200 && response.status < 300) {
                setReadLaterStates((prev)=>({
                        ...prev,
                        [itemId]: !currentState
                    }));
            } else {
                console.error('Failed to toggle read later status. Status:', response.status, 'Response:', response.data);
            }
        } catch (error) {
            console.error('Error toggling read later:', error);
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isAxiosError(error)) {
                var _error_response, _error_response1, _error_response2, _error_config, _error_config1;
                console.error('Axios error details:', {
                    status: (_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.status,
                    statusText: (_error_response1 = error.response) === null || _error_response1 === void 0 ? void 0 : _error_response1.statusText,
                    data: (_error_response2 = error.response) === null || _error_response2 === void 0 ? void 0 : _error_response2.data,
                    url: (_error_config = error.config) === null || _error_config === void 0 ? void 0 : _error_config.url,
                    method: (_error_config1 = error.config) === null || _error_config1 === void 0 ? void 0 : _error_config1.method
                });
            }
        } finally{
            setLoadingStates((prev)=>({
                    ...prev,
                    [itemId]: false
                }));
        }
    };
    const typeTranslations = {
        report: isRTL ? "تقرير" : "Reports",
        manual: isRTL ? "دليل" : "Manuals",
        statistic: isRTL ? "إحصائيات" : "Statistics",
        data: isRTL ? "بيانات" : "Data",
        article: isRTL ? "مقالة" : "Articles",
        course: isRTL ? "دورة تدريبية" : "Course",
        topic: isRTL ? "موضوع" : "Topic"
    };
    // Localized strings
    const translations = {
        topic: isRTL ? "موضوع" : "Topic",
        knowledge: isRTL ? "المستندات" : "Insights",
        noItems: isRTL ? "لا توجد نتائج بحث متاحة" : "No search results available",
        posted: isRTL ? "نُشر" : "Posted",
        free: isRTL ? "مجاني" : "Free",
        partial: isRTL ? "مدفوع جزئي" : "Partial Paid",
        freeDocs: isRTL ? "مستندات مجانية" : "Free docs",
        insighter: isRTL ? "إنسايتر" : "Insighter",
        by: isRTL ? "من قبل" : "By",
        company: isRTL ? "الشركة" : "Company",
        downloads: isRTL ? "تحميل" : "Downloads",
        download: isRTL ? "تحميل" : "Download"
    };
    if (results.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-12 flex flex-col items-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: "/images/Search-Not-Found.svg",
                    alt: "No search results found",
                    width: 350,
                    height: 350,
                    className: "mb-4"
                }, void 0, false, {
                    fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                    lineNumber: 383,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Text$2f$Text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                    size: "lg",
                    fw: 500,
                    c: "dimmed",
                    children: translations.noItems
                }, void 0, false, {
                    fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                    lineNumber: 390,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
            lineNumber: 382,
            columnNumber: 7
        }, this);
    }
    // Split results by searchable_type
    const knowledgeItems = results.filter((item)=>item.searchable_type === "knowledge");
    const topicItems = results.filter((item)=>item.searchable_type === "topic");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-6xl mx-auto px-10",
        dir: isRTL ? "rtl" : "ltr",
        children: [
            knowledgeItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4 max-w-7xl mx-auto",
                    children: knowledgeItems.map((item)=>{
                        var _item_insighter, _item_insighter_company, _item_insighter_company1, _item_insighter_company2, _item_insighter_company3, _item_insighter_company4, _item_insighter1, _item_insighter2, _item_insighter3;
                        var _item_price;
                        const normalizedPrice = String((_item_price = item.price) !== null && _item_price !== void 0 ? _item_price : "").trim();
                        const hasPrice = normalizedPrice !== "";
                        const numericPrice = Number(normalizedPrice);
                        const isNumericPrice = normalizedPrice !== "" && !Number.isNaN(numericPrice);
                        const formattedPrice = isNumericPrice ? "$".concat(numericPrice.toLocaleString('en-US', {
                            maximumFractionDigits: 2
                        })) : normalizedPrice;
                        const paidStatus = typeof item.paid === 'string' ? item.paid : typeof item.paid === 'boolean' ? item.paid ? 'paid' : 'free' : undefined;
                        const shouldShowFree = paidStatus === 'free' || !paidStatus && isNumericPrice && numericPrice === 0;
                        const shouldShowPartial = paidStatus === 'partial_paid';
                        const shouldShowPaid = paidStatus === 'paid';
                        const shouldShowPricing = shouldShowFree || shouldShowPartial || shouldShowPaid && hasPrice || !paidStatus && hasPrice;
                        const coverageText = formatCoverageRange(item.cover_start, item.cover_end);
                        const roles = Array.isArray((_item_insighter = item.insighter) === null || _item_insighter === void 0 ? void 0 : _item_insighter.roles) ? item.insighter.roles : [];
                        const isCompany = roles.includes("company");
                        const isCompanyInsighter = roles.includes("company-insighter");
                        const isInsighter = roles.includes("insighter");
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Card$2f$Card$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            withBorder: false,
                            padding: 0,
                            radius: "md",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$topic$2f5b$id$5d2f5b$slug$5d2f$knowledge$2d$list$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].listCard,
                            component: "div",
                            style: {
                                height: '240px'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "block relative w-full h-full flex flex-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$topic$2f5b$id$5d2f5b$slug$5d2f$knowledge$2d$list$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].typeColumn, " ").concat(item.searchable_type === "topic" ? "bg-topic" : ""),
                                        style: {
                                            ...item.searchable_type === "topic" ? {
                                                backgroundImage: "url(/images/topics-bg.png)"
                                            } : {},
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/".concat(currentLocale, "/").concat(item.url),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 z-10",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$topic$2f5b$id$5d2f5b$slug$5d2f$knowledge$2d$list$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].iconWrapper,
                                                                children: item.searchable_type === "knowledge" && item.type && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        item.type === "report" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$ReportIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                            width: 24,
                                                                            height: 24
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                            lineNumber: 455,
                                                                            columnNumber: 60
                                                                        }, this),
                                                                        item.type === "manual" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$ManualIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                            width: 24,
                                                                            height: 24
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                            lineNumber: 456,
                                                                            columnNumber: 60
                                                                        }, this),
                                                                        item.type === "statistic" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$InsightIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                            width: 24,
                                                                            height: 24
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                            lineNumber: 457,
                                                                            columnNumber: 63
                                                                        }, this),
                                                                        item.type === "data" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$DataIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                            width: 24,
                                                                            height: 24
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                            lineNumber: 458,
                                                                            columnNumber: 58
                                                                        }, this),
                                                                        item.type === "course" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$CourseIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                            width: 24,
                                                                            height: 24
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                            lineNumber: 459,
                                                                            columnNumber: 60
                                                                        }, this),
                                                                        !item.type && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$InsightIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                            width: 24,
                                                                            height: 24
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                            lineNumber: 460,
                                                                            columnNumber: 48
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                lineNumber: 452,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Badge$2f$Badge$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                w: "fit-content",
                                                                className: "capitalize z-10",
                                                                variant: "light",
                                                                children: item.searchable_type === "knowledge" && item.type ? typeof item.type === 'string' ? typeTranslations[item.type.toLowerCase()] || item.type : typeTranslations['statistic'] : item.searchable_type === "topic" ? translations.topic : translations.knowledge
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                lineNumber: 467,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                        lineNumber: 450,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$topic$2f5b$id$5d2f5b$slug$5d2f$knowledge$2d$list$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].titleSection,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Text$2f$Text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                                component: "h3",
                                                                style: {
                                                                    wordBreak: 'break-word'
                                                                },
                                                                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$topic$2f5b$id$5d2f5b$slug$5d2f$knowledge$2d$list$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title, " ").concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$textUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFirstWordArabic"])(item.title) ? 'text-right' : 'text-left'),
                                                                dir: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$textUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFirstWordArabic"])(item.title) ? 'rtl' : 'ltr',
                                                                children: item.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                lineNumber: 476,
                                                                columnNumber: 27
                                                            }, this),
                                                            item.review && parseInt(item.review) >= 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1 mt-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Rating$2f$Rating$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rating"], {
                                                                        value: parseInt(item.review),
                                                                        fractions: 2,
                                                                        readOnly: true,
                                                                        size: "sm"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                        lineNumber: 486,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Text$2f$Text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                                        size: "xs",
                                                                        fw: 500,
                                                                        className: "mx-2 text-sky-500",
                                                                        children: parseInt(item.review).toFixed(1)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                        lineNumber: 487,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                lineNumber: 485,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                        lineNumber: 475,
                                                        columnNumber: 25
                                                    }, this),
                                                    coverageText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute bottom-4 ".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$textUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFirstWordArabic"])(item.title) ? 'right-4' : 'left-4'),
                                                        dir: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$textUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFirstWordArabic"])(item.title) ? 'rtl' : 'ltr',
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-lg font-bold leading-none text-blue-400 drop-shadow-lg",
                                                            children: coverageText
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                            lineNumber: 493,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                        lineNumber: 492,
                                                        columnNumber: 27
                                                    }, this),
                                                    item.total_downloads !== undefined && item.total_downloads > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute bottom-4 left-4 flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-center w-6 h-6 bg-white bg-opacity-20 rounded-full",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowDownTrayIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownTrayIcon$3e$__["ArrowDownTrayIcon"], {
                                                                    className: "w-3 h-3 text-white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                    lineNumber: 503,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                lineNumber: 502,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Text$2f$Text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                                size: "xs",
                                                                className: "text-white font-medium",
                                                                children: [
                                                                    item.total_downloads.toLocaleString(),
                                                                    " ",
                                                                    item.total_downloads === 1 ? translations.download : translations.downloads
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                lineNumber: 505,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                        lineNumber: 501,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                lineNumber: 449,
                                                columnNumber: 23
                                            }, this),
                                            item.searchable_type === "knowledge" && item.insighter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 z-10",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "object-cover object-top",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    href: isCompany || isCompanyInsighter ? "/".concat(currentLocale, "/profile/").concat((_item_insighter_company = item.insighter.company) === null || _item_insighter_company === void 0 ? void 0 : _item_insighter_company.uuid) : "/".concat(currentLocale, "/profile/").concat(item.insighter.uuid, "?entity=insighter"),
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Avatar$2f$Avatar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                                                        src: (isCompany || isCompanyInsighter) && ((_item_insighter_company1 = item.insighter.company) === null || _item_insighter_company1 === void 0 ? void 0 : _item_insighter_company1.logo) ? item.insighter.company.logo : item.insighter.profile_photo_url,
                                                                        radius: "xl",
                                                                        alt: item.insighter.name,
                                                                        size: "md",
                                                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$topic$2f5b$id$5d2f5b$slug$5d2f$knowledge$2d$card$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].avatar, " avatar-top-position"),
                                                                        children: !((isCompany || isCompanyInsighter) && ((_item_insighter_company2 = item.insighter.company) === null || _item_insighter_company2 === void 0 ? void 0 : _item_insighter_company2.logo)) && !item.insighter.profile_photo_url && getInitials(item.insighter.name)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                        lineNumber: 520,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                    lineNumber: 515,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                lineNumber: 514,
                                                                columnNumber: 29
                                                            }, this),
                                                            isCompanyInsighter && item.insighter.profile_photo_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                href: "/".concat(currentLocale, "/profile/").concat(item.insighter.uuid, "?entity=insighter"),
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Avatar$2f$Avatar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                                                    src: item.insighter.profile_photo_url,
                                                                    radius: "xl",
                                                                    size: "xs",
                                                                    className: "absolute bottom-0 ".concat(isRTL ? 'left-0 -translate-x-1/3' : 'right-0 translate-x-1/3', " rounded-full translate-y-1/3 z-10 avatar-top-position"),
                                                                    alt: item.insighter.name,
                                                                    style: {
                                                                        boxShadow: '0 0 0 2px white',
                                                                        position: 'absolute'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                    lineNumber: 538,
                                                                    columnNumber: 33
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                lineNumber: 537,
                                                                columnNumber: 31
                                                            }, this),
                                                            isCompany && item.insighter.profile_photo_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                href: "/".concat(currentLocale, "/profile/").concat(item.insighter.uuid, "?entity=insighter"),
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Avatar$2f$Avatar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                                                    src: item.insighter.profile_photo_url,
                                                                    radius: "xl",
                                                                    size: "xs",
                                                                    className: "absolute bottom-0 right-0 translate-x-1/3 rounded-full translate-y-1/3 z-10 avatar-top-position",
                                                                    alt: item.insighter.name,
                                                                    style: {
                                                                        boxShadow: '0 0 0 2px white',
                                                                        position: 'absolute'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                    lineNumber: 554,
                                                                    columnNumber: 33
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                lineNumber: 553,
                                                                columnNumber: 31
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                        lineNumber: 513,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Text$2f$Text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                                fw: 600,
                                                                size: "sm",
                                                                className: "capitalize",
                                                                c: "white",
                                                                ps: 4,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                        href: "/".concat(currentLocale, "/profile/").concat(item.insighter.uuid, "?entity=insighter"),
                                                                        children: isInsighter && item.insighter.name.toLowerCase()
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                        lineNumber: 571,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                        href: "/".concat(currentLocale, "/profile/").concat((_item_insighter_company3 = item.insighter.company) === null || _item_insighter_company3 === void 0 ? void 0 : _item_insighter_company3.uuid),
                                                                        children: isCompany && (item.insighter.company ? isRTL ? " ".concat(item.insighter.company.legal_name) : "".concat(item.insighter.company.legal_name, " ") : translations.company)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                        lineNumber: 575,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                        href: "/".concat(currentLocale, "/profile/").concat((_item_insighter_company4 = item.insighter.company) === null || _item_insighter_company4 === void 0 ? void 0 : _item_insighter_company4.uuid),
                                                                        children: isCompanyInsighter && (item.insighter.company ? isRTL ? " ".concat(item.insighter.company.legal_name) : "".concat(item.insighter.company.legal_name, " ") : translations.company)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                        lineNumber: 585,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                lineNumber: 570,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Text$2f$Text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                                c: "dimmed",
                                                                size: "xs",
                                                                className: "capitalize",
                                                                ps: 4,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                        href: "/".concat(currentLocale, "/profile/").concat(item.insighter.uuid, "?entity=insighter"),
                                                                        children: isInsighter && translations.insighter
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                        lineNumber: 597,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    isCompany && (item.insighter.company ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                        href: "/".concat(currentLocale, "/profile/").concat((_item_insighter1 = item.insighter) === null || _item_insighter1 === void 0 ? void 0 : _item_insighter1.uuid, "?entity=insighter"),
                                                                        children: [
                                                                            translations.by,
                                                                            " ",
                                                                            item.insighter.name.toLowerCase()
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                        lineNumber: 604,
                                                                        columnNumber: 38
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                        href: "/".concat(currentLocale, "/profile/").concat((_item_insighter2 = item.insighter) === null || _item_insighter2 === void 0 ? void 0 : _item_insighter2.uuid, "?entity=insighter"),
                                                                        children: "Company"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                        lineNumber: 607,
                                                                        columnNumber: 37
                                                                    }, this)),
                                                                    isCompanyInsighter && (item.insighter.company ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                        href: "/".concat(currentLocale, "/profile/").concat((_item_insighter3 = item.insighter) === null || _item_insighter3 === void 0 ? void 0 : _item_insighter3.uuid, "?entity=insighter"),
                                                                        children: [
                                                                            translations.by,
                                                                            " ",
                                                                            item.insighter.name.toLowerCase()
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                        lineNumber: 614,
                                                                        columnNumber: 35
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: translations.company
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                        lineNumber: 618,
                                                                        columnNumber: 35
                                                                    }, this))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                lineNumber: 596,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                        lineNumber: 569,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                lineNumber: 512,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                        lineNumber: 443,
                                        columnNumber: 21
                                    }, this),
                                    (item.description || item.searchable_type === "knowledge" && (shouldShowPricing || item.published_at)) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$topic$2f5b$id$5d2f5b$slug$5d2f$knowledge$2d$list$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].contentColumn,
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            height: '100%'
                                        },
                                        children: [
                                            item.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/".concat(currentLocale, "/").concat(item.url),
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$topic$2f5b$id$5d2f5b$slug$5d2f$knowledge$2d$list$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].richDescription, " ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$topic$2f5b$id$5d2f5b$slug$5d2f$knowledge$2d$list$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].richDescriptionCollapsed),
                                                            ref: (el)=>{
                                                                descRefs.current[item.searchable_id] = el;
                                                            },
                                                            dir: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$textUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFirstWordArabic"])(item.title) ? "rtl" : "ltr",
                                                            style: {
                                                                whiteSpace: 'pre-line'
                                                            },
                                                            children: htmlToPlainTextWithBreaks(item.description)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                            lineNumber: 633,
                                                            columnNumber: 31
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                        lineNumber: 632,
                                                        columnNumber: 29
                                                    }, this),
                                                    needsToggleMap[item.searchable_id] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/".concat(currentLocale, "/").concat(item.url),
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$topic$2f5b$id$5d2f5b$slug$5d2f$knowledge$2d$list$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].toggleLink,
                                                        children: isRTL ? "قراءة المزيد" : "Read more"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                        lineNumber: 643,
                                                        columnNumber: 31
                                                    }, this)
                                                ]
                                            }, void 0, true),
                                            item.searchable_type === "knowledge" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$topic$2f5b$id$5d2f5b$slug$5d2f$knowledge$2d$list$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].detailsSection,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            shouldShowPricing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    shouldShowPartial && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Text$2f$Text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                                        size: "xs",
                                                                        c: "dimmed",
                                                                        className: "whitespace-nowrap",
                                                                        children: [
                                                                            translations.freeDocs,
                                                                            " +"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                        lineNumber: 659,
                                                                        columnNumber: 37
                                                                    }, this),
                                                                    (shouldShowPaid || !paidStatus && hasPrice || shouldShowPartial && hasPrice) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Badge$2f$Badge$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        color: "yellow",
                                                                        variant: "light",
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$topic$2f5b$id$5d2f5b$slug$5d2f$knowledge$2d$list$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].priceBadge,
                                                                        children: shouldShowPartial && hasPrice ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            dir: "ltr",
                                                                            lang: "en",
                                                                            children: formattedPrice
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                            lineNumber: 670,
                                                                            columnNumber: 41
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            dir: "ltr",
                                                                            lang: "en",
                                                                            children: formattedPrice
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                            lineNumber: 673,
                                                                            columnNumber: 41
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                        lineNumber: 664,
                                                                        columnNumber: 37
                                                                    }, this),
                                                                    shouldShowPartial && !hasPrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Badge$2f$Badge$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        color: "yellow",
                                                                        variant: "light",
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$topic$2f5b$id$5d2f5b$slug$5d2f$knowledge$2d$list$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].priceBadge,
                                                                        style: {
                                                                            fontWeight: '500'
                                                                        },
                                                                        children: translations.partial
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                        lineNumber: 678,
                                                                        columnNumber: 37
                                                                    }, this),
                                                                    shouldShowFree && !shouldShowPartial && !(shouldShowPaid && hasPrice) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Badge$2f$Badge$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        color: "green",
                                                                        variant: "light",
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$topic$2f5b$id$5d2f5b$slug$5d2f$knowledge$2d$list$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].priceBadge,
                                                                        children: translations.free
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                        lineNumber: 688,
                                                                        columnNumber: 37
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                lineNumber: 657,
                                                                columnNumber: 33
                                                            }, this),
                                                            item.published_at && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Text$2f$Text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                                c: "dimmed",
                                                                size: "xs",
                                                                dir: currentLocale === 'ar' ? 'rtl' : 'ltr',
                                                                children: [
                                                                    translations.posted,
                                                                    " ",
                                                                    safeFormatDate(item.published_at, currentLocale)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                lineNumber: 700,
                                                                columnNumber: 33
                                                            }, this),
                                                            item.total_downloads !== undefined && item.total_downloads > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-300",
                                                                        children: "|"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                        lineNumber: 707,
                                                                        columnNumber: 35
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowDownTrayIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownTrayIcon$3e$__["ArrowDownTrayIcon"], {
                                                                        className: "w-4 h-4 text-gray-600"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                        lineNumber: 708,
                                                                        columnNumber: 35
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Text$2f$Text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                                        size: "xs",
                                                                        className: "text-gray-700 font-medium",
                                                                        children: [
                                                                            item.total_downloads.toLocaleString(),
                                                                            " ",
                                                                            item.total_downloads === 1 ? translations.download : translations.downloads
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                        lineNumber: 709,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                lineNumber: 706,
                                                                columnNumber: 33
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                        lineNumber: 655,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative",
                                                            children: loadingStates[item.searchable_id] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                lineNumber: 720,
                                                                columnNumber: 35
                                                            }, this) : (item.searchable_id in readLaterStates ? readLaterStates[item.searchable_id] : item.is_read_later) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BookmarkSelectedIcon, {
                                                                width: 17,
                                                                height: 17,
                                                                className: "text-[#861536] cursor-pointer hover:text-[#861536] transition-colors",
                                                                onClick: (e)=>{
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    if (!loadingStates[item.searchable_id]) {
                                                                        handleReadLaterToggle(item, e);
                                                                    }
                                                                },
                                                                "aria-label": "Remove from Read Later"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                lineNumber: 723,
                                                                columnNumber: 37
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BookmarkUnselectedIcon, {
                                                                width: 17,
                                                                height: 17,
                                                                className: "text-gray-600 cursor-pointer hover:text-gray-700 transition-colors",
                                                                onClick: (e)=>{
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    if (!loadingStates[item.searchable_id]) {
                                                                        handleReadLaterToggle(item, e);
                                                                    }
                                                                },
                                                                "aria-label": "Add to Read Later"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                                lineNumber: 737,
                                                                columnNumber: 37
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                            lineNumber: 718,
                                                            columnNumber: 31
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                        lineNumber: 716,
                                                        columnNumber: 29
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                                lineNumber: 654,
                                                columnNumber: 27
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                        lineNumber: 629,
                                        columnNumber: 23
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                lineNumber: 441,
                                columnNumber: 19
                            }, this)
                        }, "".concat(uniquePrefix, "-knowledge-").concat(item.searchable_id), false, {
                            fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                            lineNumber: 432,
                            columnNumber: 17
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                    lineNumber: 406,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                lineNumber: 405,
                columnNumber: 9
            }, this),
            topicItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-6 rounded-lg border border-gray-200 mt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-md font-semibold text-gray-800 mb-4",
                        children: isRTL ? "المواضيع المتعلقة بالبحث" : "Topics matching Your Search"
                    }, void 0, false, {
                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                        lineNumber: 771,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-3",
                        children: topicItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/".concat(currentLocale, "/").concat(item.url),
                                className: "truncate inline-block max-w-[140px] sm:max-w-[220px] md:max-w-[280px] px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 text-xs font-medium transition-colors duration-200",
                                children: item.title
                            }, "".concat(uniquePrefix, "-topic-").concat(item.searchable_id), false, {
                                fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                                lineNumber: 778,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                        lineNumber: 776,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                lineNumber: 770,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$knowledge$2f5b$type$5d2f5b$slug$5d2f$AuthModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                opened: authModalOpened,
                onClose: ()=>setAuthModalOpened(false),
                locale: currentLocale
            }, void 0, false, {
                fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
                lineNumber: 789,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/[locale]/home/SearchResultsList.tsx",
        lineNumber: 402,
        columnNumber: 5
    }, this);
}
_s(SearchResultsList, "U5tiFK4LKZeNN21cXMssiZMWSco=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c2 = SearchResultsList;
// Format coverage years nicely
function formatCoverageRange(start, end) {
    const hasStart = typeof start === 'number' && !Number.isNaN(start);
    const hasEnd = typeof end === 'number' && !Number.isNaN(end);
    if (hasStart && hasEnd) {
        return start === end ? String(start) : "".concat(start, "–").concat(end);
    }
    if (hasStart) return String(start);
    if (hasEnd) return String(end);
    return '';
}
// Truncate description to avoid very long text
function truncateDescription(description) {
    let wordLimit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 30;
    if (!description) return "";
    // Remove HTML tags to get plain text
    const plainText = description.replace(/<[^>]*>/g, "");
    const words = plainText.split(/\s+/);
    if (words.length <= wordLimit) return plainText;
    return words.slice(0, wordLimit).join(" ") + "...";
}
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "BookmarkUnselectedIcon");
__turbopack_context__.k.register(_c1, "BookmarkSelectedIcon");
__turbopack_context__.k.register(_c2, "SearchResultsList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/[locale]/home/SearchResultsList.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/[locale]/home/SearchResultsList.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=app_%5Blocale%5D_09005e0c._.js.map