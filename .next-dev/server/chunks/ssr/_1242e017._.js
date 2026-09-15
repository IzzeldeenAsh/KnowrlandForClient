module.exports = [
"[project]/components/feed/PublishAsSelector.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PublishAsSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuilding$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuilding$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBuilding.mjs [app-ssr] (ecmascript) <export default as IconBuilding>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCheck.mjs [app-ssr] (ecmascript) <export default as IconCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconUserCircle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconUserCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconUserCircle.mjs [app-ssr] (ecmascript) <export default as IconUserCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function initials(name) {
    return name.split(' ').filter(Boolean).slice(0, 2).map((part)=>part[0]).join('').toUpperCase();
}
function Avatar({ src, name, size = 'large' }) {
    const sizing = size === 'large' ? 'h-16 w-16 text-[17px]' : 'h-7 w-7 text-[9px]';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E7F0FD] font-bold text-[#2378E8] ${sizing}`,
        children: src ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
function PublishAsSelector({ locale, companyName, companyLogo, insighterName, insighterPhoto, value, onChange }) {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                className: "sr-only",
                children: copy.legend
            }, void 0, false, {
                fileName: "[project]/components/feed/PublishAsSelector.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[13px] leading-5 text-[#66758B]",
                children: copy.legend
            }, void 0, false, {
                fileName: "[project]/components/feed/PublishAsSelector.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 grid gap-3 sm:grid-cols-2",
                role: "radiogroup",
                "aria-label": copy.legend,
                children: options.map((option)=>{
                    const selected = value === option.type;
                    const isCompany = option.type === 'company';
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        role: "radio",
                        "aria-checked": selected,
                        onClick: ()=>onChange(option.type),
                        className: `relative min-h-[210px] rounded-xl border p-5 text-start transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2 ${selected ? 'border-[#2378E8] bg-[#F5F9FF] shadow-[0_8px_24px_rgba(35,120,232,0.12)]' : 'border-[#D9E3EF] bg-white hover:-translate-y-0.5 hover:border-[#9DBFE8] hover:shadow-[0_8px_20px_rgba(29,48,75,0.08)]'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `absolute end-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border ${selected ? 'border-[#2378E8] bg-[#2378E8] text-white' : 'border-[#C6D2E1] bg-white text-transparent'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-1.5 rounded-full bg-[#EDF4FD] px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#2378E8]",
                                children: [
                                    isCompany ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuilding$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuilding$3e$__["IconBuilding"], {
                                        "aria-hidden": true,
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/PublishAsSelector.tsx",
                                        lineNumber: 96,
                                        columnNumber: 30
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconUserCircle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconUserCircle$3e$__["IconUserCircle"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mt-5 flex min-h-[72px] items-center gap-3",
                                children: [
                                    isCompany ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-16 w-16 shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-[#DCE5EF] bg-white p-2 text-[#2378E8]",
                                            children: companyLogo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuilding$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuilding$3e$__["IconBuilding"], {
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
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Avatar, {
                                        src: insighterPhoto,
                                        name: insighterName
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/PublishAsSelector.tsx",
                                        lineNumber: 108,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "min-w-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
}),
"[project]/services/feed.service.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-ssr] (ecmascript)");
'use client';
;
;
class CommunityFeedApiError extends Error {
    status;
    code;
    refreshRequired;
    constructor(message, status, code = null, refreshRequired = false){
        super(message), this.status = status, this.code = code, this.refreshRequired = refreshRequired;
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
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    return headers;
}
async function parseErrorMessage(response, fallback) {
    let message = fallback;
    try {
        const body = await response.json();
        if (typeof body?.message === 'string' && body.message.trim() !== '') {
            message = body.message;
        } else if (body?.errors && typeof body.errors === 'object') {
            const first = Object.values(body.errors).flat()[0];
            if (typeof first === 'string') message = first;
        }
    } catch  {
    // Non-JSON error body: keep fallback
    }
    throw new Error(message);
}
async function initVideoPost(locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/insighter/feed/post/video/init'), {
        method: 'POST',
        headers: authHeaders(locale)
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to initialize the video upload.');
    }
    return response.json();
}
async function refreshVideoUpload(uuid, locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/insighter/feed/post/video/refresh-upload/${uuid}`), {
        method: 'POST',
        headers: authHeaders(locale)
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to refresh the video upload.');
    }
    return response.json();
}
async function checkVideoUploadStatus(uuid, locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/insighter/feed/post/video/check-status/${uuid}`), {
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
                reject(new Error(`Video upload failed (${xhr.status}).`));
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
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/insighter/feed/${uuid}`), {
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
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/platform/community/feed/articles/${encodeURIComponent(slug)}`), {
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
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/platform/community/feed/posts/${encodeURIComponent(slug)}`), {
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
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/insighter/feed/draft'), {
        headers: authHeaders(locale),
        cache: 'no-store',
        signal
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to load your saved draft.');
    }
    const body = await response.json();
    return body.data ?? null;
}
async function getMyFeeds(page, locale, signal) {
    const params = new URLSearchParams({
        page: String(page),
        per_page: '10'
    });
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/insighter/feed?${params}`), {
        headers: authHeaders(locale),
        cache: 'no-store',
        signal
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to load your posts.');
    }
    const body = await response.json();
    return {
        data: body.data ?? [],
        meta: body.meta ?? {
            current_page: page,
            last_page: page,
            per_page: 10,
            total: body.data?.length ?? 0
        }
    };
}
async function requestCommunityFeed(path, locale, signal) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(path), {
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
            if (typeof body?.message === 'string' && body.message.trim() !== '') {
                message = body.message;
            }
            if (typeof body?.code === 'string') code = body.code;
            refreshRequired = body?.refresh_required === true;
        } catch  {
        // Keep the fallback for non-JSON error responses.
        }
        throw new CommunityFeedApiError(message, response.status, code, refreshRequired);
    }
    const body = await response.json();
    return {
        data: body.data ?? [],
        meta: {
            snapshot_at: body.meta?.snapshot_at ?? '',
            ranking_version: body.meta?.ranking_version ?? '',
            has_more: body.meta?.has_more === true,
            next_cursor: body.meta?.next_cursor ?? null,
            is_guest_preview: body.meta?.is_guest_preview,
            preview_limit: body.meta?.preview_limit,
            authentication_required_for_more: body.meta?.authentication_required_for_more,
            limit: body.meta?.limit,
            candidate_count: body.meta?.candidate_count,
            feed_session_id: body.meta?.feed_session_id
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
    return requestCommunityFeed(`/api/platform/community/feed?${params.toString()}`, locale, signal);
}
async function getInsighterProfileFeed(uuid, locale, cursor, signal) {
    const params = new URLSearchParams({
        limit: '10'
    });
    if (cursor) params.set('cursor', cursor);
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/platform/insighter/profile/${encodeURIComponent(uuid)}/feed?${params.toString()}`), {
        headers: authHeaders(locale),
        cache: 'no-store',
        signal
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to load this insighter’s posts.');
    }
    const body = await response.json();
    return {
        data: body.data ?? [],
        meta: {
            has_more: Boolean(body.meta?.next_cursor),
            next_cursor: body.meta?.next_cursor ?? null,
            limit: body.meta?.per_page ?? 10
        }
    };
}
async function getCompanyProfileFeed(uuid, locale, cursor, signal) {
    const params = new URLSearchParams({
        limit: '10'
    });
    if (cursor) params.set('cursor', cursor);
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/platform/company/profile/${encodeURIComponent(uuid)}/feed?${params.toString()}`), {
        headers: authHeaders(locale),
        cache: 'no-store',
        signal
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to load this company’s posts.');
    }
    const body = await response.json();
    return {
        data: body.data ?? [],
        meta: {
            has_more: Boolean(body.meta?.next_cursor),
            next_cursor: body.meta?.next_cursor ?? null,
            limit: body.meta?.per_page ?? 10
        }
    };
}
async function getSavedCommunityFeed(locale, cursor, signal) {
    const params = new URLSearchParams({
        limit: '10'
    });
    if (cursor) params.set('cursor', cursor);
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/platform/community/feed/saved?${params.toString()}`), {
        headers: authHeaders(locale),
        cache: 'no-store',
        signal
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to load your saved posts.');
    }
    const body = await response.json();
    const nextCursor = body.meta?.next_cursor ?? null;
    return {
        data: body.data ?? [],
        meta: {
            has_more: Boolean(nextCursor),
            next_cursor: nextCursor,
            per_page: body.meta?.per_page ?? 10
        }
    };
}
async function setCommunityFeedItemTracked(uuid, isTracked, locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/platform/community/feed/track/${encodeURIComponent(uuid)}`), {
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
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/platform/community/feed/save/${encodeURIComponent(uuid)}`), {
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
    const params = new URLSearchParams({
        keyword: search.keyword.trim(),
        accuracy: 'any',
        limit: String(search.limit ?? 10)
    });
    if (search.cursor) params.set('cursor', search.cursor);
    if (search.industry) params.set('industry', String(search.industry));
    if (search.contentType) params.set('content_type', search.contentType);
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/platform/community/feed/search?${params.toString()}`), {
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
            if (typeof body?.message === 'string' && body.message.trim() !== '') {
                message = body.message;
            }
            if (typeof body?.code === 'string') code = body.code;
            refreshRequired = body?.refresh_required === true;
        } catch  {
        // Keep the fallback for non-JSON error responses.
        }
        throw new CommunityFeedApiError(message, response.status, code, refreshRequired);
    }
    const body = await response.json();
    return {
        insights: body.data?.insights ?? [],
        feed: body.data?.feed ?? [],
        meta: {
            scope: 'all',
            language: body.meta?.language === 'arabic' ? 'arabic' : 'english',
            snapshot_at: body.meta?.snapshot_at ?? '',
            search_version: body.meta?.search_version ?? '',
            insights_limit: body.meta?.insights_limit ?? 0,
            feed_limit: body.meta?.feed_limit ?? search.limit ?? 10,
            has_more: body.meta?.has_more === true,
            next_cursor: body.meta?.next_cursor ?? null,
            feed_search_session_id: body.meta?.feed_search_session_id ?? null
        }
    };
}
async function deleteFeedItem(uuid, locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/insighter/feed/${uuid}`), {
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
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/insighter/feed/post/video/properties/${uuid}`), {
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
        // Send metadata as JSON first so empty tag/insight arrays are preserved.
        // When images are replaced, keep the item as a draft until that upload
        // succeeds, then apply the requested final status with the media request.
        const metadataResponse = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/insighter/feed/post/image-text/${uuid}`), {
            method: 'PUT',
            headers: {
                ...authHeaders(locale),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...jsonPayload,
                status: payload.media?.length ? 'draft' : status
            })
        });
        if (!metadataResponse.ok) {
            await parseErrorMessage(metadataResponse, 'Unable to update the post.');
        }
        if (!payload.media?.length) return uuid;
    }
    const formData = new FormData();
    formData.append('body', payload.body);
    formData.append('industry_id', String(payload.industryId));
    formData.append('status', status);
    if (status === 'published' && payload.authorType) {
        formData.append('author_type', payload.authorType);
    }
    if (!uuid) {
        payload.tags.forEach((tagId, index)=>formData.append(`tags[${index}]`, String(tagId)));
        payload.relatedInsights.forEach((knowledgeId, index)=>formData.append(`related_insights[${index}]`, String(knowledgeId)));
    }
    payload.media?.forEach((entry, index)=>{
        formData.append(`media[${index}][image]`, entry.file);
        formData.append(`media[${index}][sort_order]`, String(entry.sortOrder));
    });
    if (uuid) formData.append('_method', 'PUT');
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(uuid ? `/api/insighter/feed/post/image-text/${uuid}` : '/api/insighter/feed/post/image-text'), {
        method: 'POST',
        headers: authHeaders(locale),
        body: formData
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to publish the post.');
    }
    if (uuid) return uuid;
    const body = await response.json();
    return body.data?.uuid;
}
async function publishArticle(payload, locale, uuid) {
    return saveArticle(payload, 'published', locale, uuid);
}
async function saveArticleDraft(payload, locale, uuid) {
    return saveArticle(payload, 'draft', locale, uuid);
}
async function saveArticle(payload, status, locale, uuid) {
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
        const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/insighter/feed/article/${uuid}`), {
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
            const coverResponse = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/insighter/feed/article/${uuid}`), {
                method: 'POST',
                headers: authHeaders(locale),
                body: coverFormData
            });
            if (!coverResponse.ok) {
                await parseErrorMessage(coverResponse, 'Unable to upload the White Paper cover image.');
            }
        }
        if (uploadCoverBeforePublishing) {
            const publishResponse = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/insighter/feed/article/${uuid}`), {
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
    payload.tags.forEach((tagId, index)=>formData.append(`tags[${index}]`, String(tagId)));
    payload.relatedInsights.forEach((knowledgeId, index)=>formData.append(`related_insights[${index}]`, String(knowledgeId)));
    if (payload.coverImage) {
        formData.append('cover_image', payload.coverImage);
    }
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/insighter/feed/article'), {
        method: 'POST',
        headers: authHeaders(locale),
        body: formData
    });
    if (!response.ok) {
        await parseErrorMessage(response, status === 'draft' ? 'Unable to save the White Paper draft.' : 'Unable to publish the White Paper.');
    }
    const body = await response.json();
    return body.data?.uuid;
}
async function fetchIndustryTags(industryId, locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/common/setting/tag/industry/${industryId}`), {
        headers: authHeaders(locale)
    });
    if (!response.ok) return [];
    const body = await response.json();
    return (body.data ?? []).map((tag)=>({
            id: tag.id,
            name: tag.name
        }));
}
async function fetchCommonTags(locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/common/setting/tag/common/list'), {
        headers: authHeaders(locale)
    });
    if (!response.ok) return [];
    const body = await response.json();
    return (body.data ?? []).map((tag)=>({
            id: tag.id,
            name: tag.name
        }));
}
async function searchTags(keyword, locale) {
    const params = new URLSearchParams({
        keyword,
        limit: '20'
    });
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/common/setting/tag/search?${params}`), {
        headers: authHeaders(locale)
    });
    if (!response.ok) return [];
    const body = await response.json();
    return (body.data ?? []).map((tag)=>({
            id: tag.id,
            name: tag.name
        }));
}
async function createSuggestTag(industryId, name, locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/insighter/tag/suggest'), {
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
async function fetchPublishedLibraryKnowledge(page, locale, isCompany = false, keyword = '') {
    // Both list endpoints are already scoped to published items, paginated and
    // ordered newest-first, and accept an optional `keyword` title filter.
    const params = new URLSearchParams({
        page: String(page)
    });
    const trimmedKeyword = keyword.trim();
    if (trimmedKeyword) params.set('keyword', trimmedKeyword);
    const path = isCompany ? `/api/company/library/knowledge/list?${params}` : `/api/insighter/library/knowledge/list?${params}`;
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(path), {
        headers: authHeaders(locale)
    });
    if (!response.ok) {
        await parseErrorMessage(response, 'Unable to load your library.');
    }
    const body = await response.json();
    const data = (body.data ?? []).map((item)=>({
            id: item.id,
            type: item.type,
            title: item.title,
            slug: item.slug,
            status: item.status,
            published_at: item.published_at,
            description: item.description
        }));
    return {
        data,
        meta: body.meta ?? {
            current_page: page,
            last_page: page,
            per_page: data.length,
            total: data.length
        }
    };
}
async function fetchLibraryKnowledgeById(id, locale, maxPages = 5, isCompany = false) {
    for(let page = 1; page <= maxPages; page += 1){
        const result = await fetchPublishedLibraryKnowledge(page, locale, isCompany);
        const match = result.data.find((item)=>item.id === id);
        if (match) return match;
        if (page >= result.meta.last_page) break;
    }
    return null;
}
}),
"[project]/components/feed/TagSelector.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TagSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronDown$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconChevronDown.mjs [app-ssr] (ecmascript) <export default as IconChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconLoader2.mjs [app-ssr] (ecmascript) <export default as IconLoader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconX.mjs [app-ssr] (ecmascript) <export default as IconX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/toast/ToastContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/feed.service.ts [app-ssr] (ecmascript)");
'use client';
;
;
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
function TagSelector({ locale, industryId, selectedTags, onChange, disabled = false }) {
    const copy = copyByLocale[locale === 'ar' ? 'ar' : 'en'];
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const listboxId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    const rootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [commonTags, setCommonTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchResults, setSearchResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAdding, setIsAdding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dropdownPosition, setDropdownPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let active = true;
        setIsLoading(true);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchCommonTags"])(locale).then((tags)=>{
            if (active) setCommonTags(tags);
        }).catch(()=>{
            if (active) setCommonTags([]);
        }).finally(()=>{
            if (active) setIsLoading(false);
        });
        return ()=>{
            active = false;
        };
    }, [
        locale
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const keyword = query.trim();
        if (!keyword) {
            setSearchResults([]);
            return;
        }
        let active = true;
        const timeout = window.setTimeout(()=>{
            setIsLoading(true);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["searchTags"])(keyword, locale).then((tags)=>{
                if (active) setSearchResults(tags);
            }).catch(()=>{
                if (active) setSearchResults([]);
            }).finally(()=>{
                if (active) setIsLoading(false);
            });
        }, 250);
        return ()=>{
            active = false;
            window.clearTimeout(timeout);
        };
    }, [
        locale,
        query
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const closeOnOutsideClick = (event)=>{
            const target = event.target;
            if (!rootRef.current?.contains(target) && !dropdownRef.current?.contains(target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('pointerdown', closeOnOutsideClick);
        return ()=>document.removeEventListener('pointerdown', closeOnOutsideClick);
    }, []);
    // The composer sits inside a modal, whose ancestors may constrain overflow.
    // Render the listbox in a portal and pin it to the viewport so its options
    // remain visible regardless of the surrounding layout.
    const updateDropdownPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const rect = rootRef.current?.getBoundingClientRect();
        if (!rect) return;
        const viewportGutter = 8;
        const availableBelow = window.innerHeight - rect.bottom;
        const availableAbove = rect.top;
        const shouldOpenAbove = availableBelow < 260 && availableAbove > availableBelow;
        const width = Math.min(rect.width, window.innerWidth - viewportGutter * 2);
        const left = Math.max(viewportGutter, Math.min(rect.left, window.innerWidth - width - viewportGutter));
        setDropdownPosition(shouldOpenAbove ? {
            left,
            width,
            bottom: window.innerHeight - rect.top + 6
        } : {
            left,
            width,
            top: rect.bottom + 6
        });
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayoutEffect"])(()=>{
        if (!isOpen || disabled) return;
        updateDropdownPosition();
        window.addEventListener('resize', updateDropdownPosition);
        window.addEventListener('scroll', updateDropdownPosition, true);
        return ()=>{
            window.removeEventListener('resize', updateDropdownPosition);
            window.removeEventListener('scroll', updateDropdownPosition, true);
        };
    }, [
        disabled,
        isOpen,
        updateDropdownPosition
    ]);
    const selectedIds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>new Set(selectedTags.map((tag)=>tag.id)), [
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
        window.requestAnimationFrame(()=>inputRef.current?.focus());
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
            const created = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSuggestTag"])(industryId, name, locale);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: rootRef,
        className: "relative mt-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex min-h-11 w-full items-center gap-1.5 rounded-lg border bg-white px-2 py-1.5 transition-[border-color,box-shadow] ${isOpen ? 'border-[#7EADE8] shadow-[0_0_0_3px_rgba(35,120,232,0.10)]' : 'border-[#D6E0EC] hover:border-[#AFC4DE]'} ${disabled ? 'cursor-not-allowed bg-[#F5F7F9] opacity-70' : ''}`,
                onClick: ()=>{
                    if (!disabled) {
                        setIsOpen(true);
                        inputRef.current?.focus();
                    }
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5",
                        children: [
                            selectedTags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex h-7 max-w-full items-center gap-1 rounded-md bg-[#EEF2F6] px-2.5 text-xs font-medium text-[#26364C]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "truncate",
                                            children: tag.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/TagSelector.tsx",
                                            lineNumber: 223,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            "aria-label": `Remove ${tag.name}`,
                                            onClick: (event)=>{
                                                event.stopPropagation();
                                                removeTag(tag.id);
                                            },
                                            className: "rounded-sm text-[#6F7D90] transition-colors hover:text-[#26364C]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__["IconX"], {
                                                "aria-hidden": true,
                                                className: "h-3.5 w-3.5",
                                                stroke: 2
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/TagSelector.tsx",
                                                lineNumber: 233,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/TagSelector.tsx",
                                            lineNumber: 224,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, tag.id, true, {
                                    fileName: "[project]/components/feed/TagSelector.tsx",
                                    lineNumber: 222,
                                    columnNumber: 13
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                className: "h-7 min-w-[150px] flex-1 border-0 bg-transparent px-1 text-[13px] text-[#26364C] outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 placeholder:text-[#98A4B3]"
                            }, void 0, false, {
                                fileName: "[project]/components/feed/TagSelector.tsx",
                                lineNumber: 237,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/TagSelector.tsx",
                        lineNumber: 220,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: (event)=>{
                            event.stopPropagation();
                            void addTag();
                        },
                        disabled: !query.trim() || !industryId || isAdding,
                        className: "inline-flex h-7 shrink-0 items-center rounded-md px-2.5 text-xs font-semibold text-[#2378E8] transition-colors hover:bg-[#EDF4FD] disabled:cursor-default disabled:text-[#A7B1BF] disabled:hover:bg-transparent",
                        children: isAdding ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__["IconLoader2"], {
                            "aria-label": copy.add,
                            className: "h-3.5 w-3.5 animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/components/feed/TagSelector.tsx",
                            lineNumber: 275,
                            columnNumber: 23
                        }, this) : copy.add
                    }, void 0, false, {
                        fileName: "[project]/components/feed/TagSelector.tsx",
                        lineNumber: 266,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronDown$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronDown$3e$__["IconChevronDown"], {
                        "aria-hidden": true,
                        className: `h-4 w-4 shrink-0 text-[#7C899A] transition-transform ${isOpen ? 'rotate-180' : ''}`,
                        stroke: 1.8
                    }, void 0, false, {
                        fileName: "[project]/components/feed/TagSelector.tsx",
                        lineNumber: 277,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/TagSelector.tsx",
                lineNumber: 207,
                columnNumber: 7
            }, this),
            isOpen && !disabled && dropdownPosition && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: dropdownRef,
                id: listboxId,
                role: "listbox",
                className: "fixed z-[310] overflow-hidden rounded-lg border border-[#DCE3EB] bg-white shadow-[0_12px_28px_rgba(24,39,58,0.14)]",
                style: dropdownPosition,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-b border-[#EDF0F3] px-3 py-2 text-[11px] font-medium text-[#7C899A]",
                        children: query.trim() ? copy.results : copy.choose
                    }, void 0, false, {
                        fileName: "[project]/components/feed/TagSelector.tsx",
                        lineNumber: 288,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-h-52 overflow-y-auto p-2",
                        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex h-12 items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__["IconLoader2"], {
                                "aria-hidden": true,
                                className: "h-4 w-4 animate-spin text-[#7C899A]"
                            }, void 0, false, {
                                fileName: "[project]/components/feed/TagSelector.tsx",
                                lineNumber: 293,
                                columnNumber: 70
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/feed/TagSelector.tsx",
                            lineNumber: 293,
                            columnNumber: 15
                        }, this) : visibleTags.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "px-2 py-3 text-xs text-[#8A96A5]",
                            children: query.trim() ? copy.empty : copy.unavailable
                        }, void 0, false, {
                            fileName: "[project]/components/feed/TagSelector.tsx",
                            lineNumber: 295,
                            columnNumber: 15
                        }, this) : query.trim() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-0.5",
                            children: visibleTags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    role: "option",
                                    "aria-selected": "false",
                                    onClick: ()=>selectTag(tag),
                                    className: "flex w-full items-center rounded-md px-2.5 py-2 text-start text-[13px] text-[#26364C] transition-colors hover:bg-[#F1F4F7]",
                                    children: tag.name
                                }, tag.id, false, {
                                    fileName: "[project]/components/feed/TagSelector.tsx",
                                    lineNumber: 299,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/feed/TagSelector.tsx",
                            lineNumber: 297,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-1.5",
                            children: visibleTags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    role: "option",
                                    "aria-selected": "false",
                                    onClick: ()=>selectTag(tag),
                                    className: "rounded-md bg-[#EEF1F4] px-2.5 py-1.5 text-xs font-medium text-[#344154] transition-colors hover:bg-[#E1E6EB]",
                                    children: tag.name
                                }, tag.id, false, {
                                    fileName: "[project]/components/feed/TagSelector.tsx",
                                    lineNumber: 307,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/feed/TagSelector.tsx",
                            lineNumber: 305,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/feed/TagSelector.tsx",
                        lineNumber: 291,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/TagSelector.tsx",
                lineNumber: 281,
                columnNumber: 9
            }, this), document.body)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/TagSelector.tsx",
        lineNumber: 206,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/feed/post/IndustrySelectModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "collectLeafGroups",
    ()=>collectLeafGroups,
    "default",
    ()=>IndustrySelectModal,
    "fetchIndustryTree",
    ()=>fetchIndustryTree
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Modal/Modal.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
'use client';
;
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
    const request = fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/common/setting/industry/tree'), {
        signal: controller.signal,
        headers: {
            Accept: 'application/json',
            'Accept-Language': locale,
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
        }
    }).then(async (response)=>{
        if (!response.ok) throw new Error('Failed to fetch industries');
        const data = await response.json();
        industriesCache[locale] = data ?? [];
        return industriesCache[locale];
    }).finally(()=>{
        clearTimeout(timeoutId);
        delete pendingFetches[locale];
    });
    pendingFetches[locale] = request;
    return request;
}
// Single-select radio indicator shown at the start of every selectable row.
function RadioDot({ checked }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        "aria-hidden": true,
        className: `me-2.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-colors ${checked ? 'border-[#1D74E0]' : 'border-[#C2CEDE]'}`,
        children: checked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
function IndustrySelectModal({ locale, opened, selectedId, onClose, onSelect }) {
    const copy = copyByLocale[locale === 'ar' ? 'ar' : 'en'];
    const [groups, setGroups] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasError, setHasError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [retryToken, setRetryToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!opened) return;
        let cancelled = false;
        setSearchTerm('');
        setIsLoading(true);
        setHasError(false);
        fetchIndustryTree(locale).then((tree)=>{
            if (!cancelled) setGroups(collectLeafGroups(tree));
        }).catch(()=>{
            if (!cancelled) {
                setGroups([]);
                setHasError(true);
            }
        }).finally(()=>{
            if (!cancelled) setIsLoading(false);
        });
        return ()=>{
            cancelled = true;
        };
    }, [
        opened,
        locale,
        retryToken
    ]);
    const filteredGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const query = searchTerm.trim().toLowerCase();
        if (query === '') return groups;
        return groups.map((group)=>{
            // When the parent itself matches, keep all its children so the whole
            // group stays pickable; otherwise narrow to the matching children.
            if (group.parentLabel.toLowerCase().includes(query)) return group;
            return {
                ...group,
                children: group.children.filter((child)=>child.label.toLowerCase().includes(query))
            };
        }).filter((group)=>group.parentLabel.toLowerCase().includes(query) || group.children.length > 0);
    }, [
        groups,
        searchTerm
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Modal"], {
        opened: opened,
        onClose: onClose,
        title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "industry-search",
                        className: "sr-only",
                        children: copy.search
                    }, void 0, false, {
                        fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                        lineNumber: 200,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "industry-search",
                        name: "industry-search",
                        type: "text",
                        value: searchTerm,
                        onChange: (event)=>setSearchTerm(event.currentTarget.value),
                        placeholder: copy.search,
                        className: "h-10 w-full rounded-md border border-[#D6E0EC] bg-white px-3 text-[13.5px] text-[#1C2433] transition-colors placeholder:text-[#94A3B8] focus-visible:border-[#8FB9EA] focus-visible:outline-none"
                    }, void 0, false, {
                        fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                        lineNumber: 203,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-[420px] overscroll-contain overflow-y-auto pe-1",
                "aria-busy": isLoading,
                children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    role: "status",
                    className: "py-8 text-center text-[13px] text-[#64748B]",
                    children: copy.loading
                }, void 0, false, {
                    fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                    lineNumber: 216,
                    columnNumber: 11
                }, this) : hasError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center gap-3 py-8 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[13px] text-[#94A3B8]",
                            children: copy.error
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                            lineNumber: 221,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setRetryToken((previous)=>previous + 1),
                            className: "rounded-md border border-[#D6E0EC] px-4 py-1.5 text-[13px] font-medium text-[#1D74E0] transition-colors hover:bg-[#F3F6FB] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]",
                            children: copy.retry
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                            lineNumber: 222,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                    lineNumber: 220,
                    columnNumber: 11
                }, this) : filteredGroups.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "py-8 text-center text-[13px] text-[#94A3B8]",
                    children: copy.empty
                }, void 0, false, {
                    fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                    lineNumber: 231,
                    columnNumber: 11
                }, this) : filteredGroups.map((group)=>{
                    const isParentSelected = group.parentKey === selectedId;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        "aria-labelledby": `industry-group-${group.parentKey}`,
                        className: "mb-4 overflow-hidden rounded-md border border-[#E1E8F1] bg-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                id: `industry-group-${group.parentKey}`,
                                className: "m-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    "aria-pressed": isParentSelected,
                                    onClick: ()=>onSelect({
                                            id: group.parentKey,
                                            name: group.parentLabel
                                        }),
                                    className: `flex w-full items-center px-3 py-2.5 text-start text-[12px] font-bold transition-colors focus-visible:outline-[1px] focus-visible:outline-offset-[-1px] focus-visible:outline-[#B7D2F4] ${group.children.length > 0 ? 'border-b' : ''} ${isParentSelected ? 'border-[#CBE0F8] bg-[#EAF3FE] text-[#1D5FAD]' : 'border-[#DCE6F2] bg-[#F3F7FC] text-[#2168B5] hover:bg-[#EAF1FA]'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioDot, {
                                            checked: isParentSelected
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                                            lineNumber: 254,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "min-w-0 truncate",
                                            children: group.parentLabel
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                                            lineNumber: 255,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                                    lineNumber: 242,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                                lineNumber: 241,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                children: group.children.map((child)=>{
                                    const isSelected = child.key === selectedId;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "border-b border-[#E8EDF4] last:border-b-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            "aria-pressed": isSelected,
                                            onClick: ()=>onSelect({
                                                    id: child.key,
                                                    name: child.label,
                                                    parentName: group.parentLabel
                                                }),
                                            className: `flex min-h-12 w-full items-center px-3 py-2.5 text-start text-[13.5px] transition-colors focus-visible:outline-[1px] focus-visible:outline-offset-[-1px] focus-visible:outline-[#B7D2F4] ${isSelected ? 'bg-[#EAF3FE] font-semibold text-[#1D5FAD]' : 'text-[#1C2433] hover:bg-[#F8FAFD]'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioDot, {
                                                    checked: isSelected
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                                                    lineNumber: 275,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "min-w-0 truncate",
                                                    children: child.label
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                                                    lineNumber: 276,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                                            lineNumber: 263,
                                            columnNumber: 23
                                        }, this)
                                    }, child.key, false, {
                                        fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                                        lineNumber: 262,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                                lineNumber: 258,
                                columnNumber: 15
                            }, this)
                        ]
                    }, group.parentKey, true, {
                        fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                        lineNumber: 236,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
                lineNumber: 214,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/post/IndustrySelectModal.tsx",
        lineNumber: 182,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/feed/post/KnowledgeLibraryDrawer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>KnowledgeLibraryDrawer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Drawer$2f$Drawer$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Drawer/Drawer.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconSearch.mjs [app-ssr] (ecmascript) <export default as IconSearch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconX.mjs [app-ssr] (ecmascript) <export default as IconX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/feed.service.ts [app-ssr] (ecmascript)");
'use client';
;
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
        subtitle: `Attach up to ${MAX_LIBRARY_ATTACHMENTS} published knowledge items to your post.`,
        loading: 'Loading your library…',
        empty: 'No published knowledge in your library yet.',
        emptyTitle: 'Start building your library',
        emptyBody: 'Publish documents, reports, or data to your library, then attach them to your posts. Save a draft and continue to publishing whenever you are ready.',
        emptyCta: 'Save and start publish',
        searchLabel: 'Search your library',
        searchPlaceholder: 'Search by title…',
        clearSearch: 'Clear search',
        noResultsTitle: 'No matching knowledge',
        noResultsBody: (keyword)=>`Nothing in your library matches “${keyword}”.`,
        loadMore: 'Load more',
        done: 'Done',
        selectedCount: (count)=>`${count} of ${MAX_LIBRARY_ATTACHMENTS} selected`,
        limitReached: `You can attach up to ${MAX_LIBRARY_ATTACHMENTS} items. Unselect one to choose another.`,
        error: 'Unable to load your library.',
        close: 'Close library drawer'
    },
    ar: {
        title: 'شارك من مكتبتك',
        subtitle: `أرفق حتى ${MAX_LIBRARY_ATTACHMENTS} عناصر معرفة منشورة بمنشورك.`,
        loading: 'جارٍ تحميل مكتبتك…',
        empty: 'لا توجد معرفة منشورة في مكتبتك بعد.',
        emptyTitle: 'ابدأ ببناء مكتبتك',
        emptyBody: 'انشر المستندات أو التقارير أو البيانات في مكتبتك، ثم أرفقها بمنشوراتك. احفظ مسودة وتابع النشر متى كنت جاهزًا.',
        emptyCta: 'احفظ وابدأ النشر',
        searchLabel: 'ابحث في مكتبتك',
        searchPlaceholder: 'ابحث بالعنوان…',
        clearSearch: 'مسح البحث',
        noResultsTitle: 'لا توجد نتائج مطابقة',
        noResultsBody: (keyword)=>`لا يوجد في مكتبتك ما يطابق "${keyword}".`,
        loadMore: 'تحميل المزيد',
        done: 'تم',
        selectedCount: (count)=>`${count} من ${MAX_LIBRARY_ATTACHMENTS} محدد`,
        limitReached: `يمكنك إرفاق حتى ${MAX_LIBRARY_ATTACHMENTS} عناصر. ألغِ تحديد أحدها لاختيار غيره.`,
        error: 'تعذر تحميل مكتبتك.',
        close: 'إغلاق مكتبة المستندات'
    }
};
function KnowledgeLibraryDrawer({ locale, opened, isCompany, selected, onClose, onSelectionChange, onPublishNew }) {
    const isArabic = locale === 'ar';
    const copy = copyByLocale[isArabic ? 'ar' : 'en'];
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [lastPage, setLastPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [isRefreshing, setIsRefreshing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoadingMore, setIsLoadingMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loadError, setLoadError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasLoaded, setHasLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Tracks whether the *unfiltered* library is empty, so a search that returns
    // nothing shows "no matches" instead of the "start your library" CTA.
    const [isLibraryEmpty, setIsLibraryEmpty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [searchKeyword, setSearchKeyword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    // Only the newest request may write to state; typing fast can resolve pages
    // out of order otherwise.
    const requestIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const isLoading = isRefreshing || isLoadingMore;
    const loadPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (pageToLoad, append, keyword)=>{
        const requestId = requestIdRef.current + 1;
        requestIdRef.current = requestId;
        if (append) setIsLoadingMore(true);
        else setIsRefreshing(true);
        setLoadError(false);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchPublishedLibraryKnowledge"])(pageToLoad, locale, isCompany, keyword);
            if (requestIdRef.current !== requestId) return;
            setItems((previous)=>append ? [
                    ...previous,
                    ...result.data
                ] : result.data);
            setPage(result.meta.current_page);
            setLastPage(result.meta.last_page);
            if (!append && !keyword) setIsLibraryEmpty(result.data.length === 0);
            if (!append) setHasLoaded(true);
        } catch  {
            if (requestIdRef.current !== requestId) return;
            setLoadError(true);
        } finally{
            if (requestIdRef.current === requestId) {
                setIsRefreshing(false);
                setIsLoadingMore(false);
            }
        }
    }, [
        isCompany,
        locale
    ]);
    // Debounce typing into the keyword the API is actually asked for.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timeoutId = window.setTimeout(()=>setSearchKeyword(query.trim()), SEARCH_DEBOUNCE_MS);
        return ()=>window.clearTimeout(timeoutId);
    }, [
        query
    ]);
    // Refresh the appropriate library each time the drawer opens, and start over
    // from page one whenever the search keyword changes. Selection is controlled
    // by the parent so every checkbox change is attached immediately.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!opened) return;
        loadPage(1, false, searchKeyword);
    }, [
        opened,
        searchKeyword,
        loadPage
    ]);
    // Closing resets the search so the next open starts from the full library.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (opened) return;
        setQuery('');
        setSearchKeyword('');
        setHasLoaded(false);
    }, [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Drawer$2f$Drawer$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Drawer"], {
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
        title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "block text-[16px] font-bold text-[#0B1220]",
                    children: copy.title
                }, void 0, false, {
                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                    lineNumber: 201,
                    columnNumber: 11
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "mt-0.5 block text-[12.5px] font-normal text-[#5A6B84]",
                    children: copy.subtitle
                }, void 0, false, {
                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                    lineNumber: 202,
                    columnNumber: 11
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
            lineNumber: 200,
            columnNumber: 9
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-[calc(100vh-120px)] flex-col",
            children: [
                showSearch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pb-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "sr-only",
                            htmlFor: "knowledge-library-search",
                            children: copy.searchLabel
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                            lineNumber: 211,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "knowledge-library-search",
                                    type: "search",
                                    value: query,
                                    onChange: (event)=>setQuery(event.target.value),
                                    placeholder: copy.searchPlaceholder,
                                    dir: isArabic ? 'rtl' : 'ltr',
                                    className: `h-10 w-full rounded-lg border border-[#D7E1EE] bg-white px-3 text-[13.5px] text-[#1E293B] outline-none transition-colors placeholder:text-[#94A3B8] focus:border-[#2378E8] focus:ring-2 focus:ring-[#2378E8]/15 ${isArabic ? 'pl-16' : 'pr-16'}`
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                    lineNumber: 215,
                                    columnNumber: 15
                                }, this),
                                query.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setQuery(''),
                                    "aria-label": copy.clearSearch,
                                    className: `absolute top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-[#94A3B8] transition-colors hover:bg-[#F1F5F9] hover:text-[#475569] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] ${isArabic ? 'left-9' : 'right-9'}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__["IconX"], {
                                        "aria-hidden": true,
                                        className: "h-4 w-4",
                                        stroke: 2
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                        lineNumber: 235,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                    lineNumber: 227,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__["IconSearch"], {
                                    "aria-hidden": true,
                                    className: `pointer-events-none absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#64748B] ${isArabic ? 'left-3' : 'right-3'}`,
                                    stroke: 2
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                    lineNumber: 238,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                            lineNumber: 214,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                    lineNumber: 210,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overscroll-contain overflow-y-auto pe-1",
                    "aria-busy": isLoading,
                    children: [
                        loadError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "py-8 text-center text-[13px] text-[#94A3B8]",
                            children: copy.error
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                            lineNumber: 254,
                            columnNumber: 13
                        }, this) : showEmptyLibrary ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center px-6 py-12 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LibraryEmptyIllustration, {
                                    className: "h-28 w-28",
                                    "aria-hidden": true
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                    lineNumber: 257,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "mt-5 text-[15.5px] font-bold text-[#0B1220]",
                                    children: copy.emptyTitle
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                    lineNumber: 258,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 max-w-[19rem] text-[13px] leading-6 text-[#5A6B84]",
                                    children: copy.emptyBody
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                    lineNumber: 261,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onPublishNew,
                                    className: "mt-5 inline-flex min-h-10 items-center rounded-md bg-[#1D74E0] px-5 py-2 text-[13.5px] font-medium text-white transition-colors hover:bg-[#155CB8] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]",
                                    children: copy.emptyCta
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                    lineNumber: 264,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                            lineNumber: 256,
                            columnNumber: 13
                        }, this) : showNoResults ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center px-6 py-12 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__["IconSearch"], {
                                    "aria-hidden": true,
                                    className: "h-8 w-8 text-[#B7C6DA]",
                                    stroke: 1.6
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                    lineNumber: 274,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "mt-4 text-[14.5px] font-bold text-[#0B1220]",
                                    children: copy.noResultsTitle
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                    lineNumber: 275,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 max-w-[19rem] text-[13px] leading-6 text-[#5A6B84]",
                                    children: copy.noResultsBody(searchKeyword)
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                    lineNumber: 278,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                            lineNumber: 273,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: `space-y-3 ${isRefreshing ? 'opacity-50' : ''}`,
                            children: items.map((item)=>{
                                const isChecked = selected.some((selectedItem)=>selectedItem.id === item.id);
                                const isDisabled = !isChecked && selected.length >= MAX_LIBRARY_ATTACHMENTS;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: `relative flex min-h-[116px] items-end overflow-hidden rounded-md border bg-[#061326] p-4 transition-colors focus-within:border-[#8FB9EA] ${isChecked ? 'border-[#5EA5FF]' : 'border-[#18304F] hover:border-[#315C8E]'} ${isDisabled ? 'cursor-not-allowed opacity-45' : 'cursor-pointer'}`,
                                        style: {
                                            backgroundImage: 'url("/images/test2.png")',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: isChecked,
                                                disabled: isDisabled,
                                                onChange: ()=>toggleItem(item),
                                                className: "absolute end-3 top-3 h-5 w-5 shrink-0 accent-[#2378E8] disabled:cursor-not-allowed"
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                                lineNumber: 303,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "min-w-0 flex-1 pe-7",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "mb-2 inline-flex rounded bg-[#0B2545] px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#74C0FF]",
                                                        children: item.type
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                                        lineNumber: 311,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block line-clamp-2 text-[15px] font-semibold leading-6 text-white",
                                                        children: item.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                                        lineNumber: 314,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "mt-1 block text-[11.5px] text-[#AAC5E5]",
                                                        children: item.published_at ? item.published_at.slice(0, 10) : ''
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                                        lineNumber: 317,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                                lineNumber: 310,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                        lineNumber: 290,
                                        columnNumber: 21
                                    }, this)
                                }, item.id, false, {
                                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                    lineNumber: 289,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                            lineNumber: 283,
                            columnNumber: 13
                        }, this),
                        isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            role: "status",
                            className: "py-4 text-center text-[13px] text-[#64748B]",
                            children: copy.loading
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                            lineNumber: 329,
                            columnNumber: 13
                        }, this),
                        !isLoading && !loadError && items.length > 0 && page < lastPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>loadPage(page + 1, true, searchKeyword),
                            className: "mt-3 min-h-10 w-full rounded border border-[#C9DCF6] py-2 text-[13px] font-medium text-[#1D74E0] transition-colors hover:bg-[#F3F6FB] focus-visible:border-[#8FB9EA] focus-visible:outline-none",
                            children: copy.loadMore
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                            lineNumber: 335,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                    lineNumber: 249,
                    columnNumber: 9
                }, this),
                showSearch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between border-t border-[#DCE4EF] bg-white pt-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "min-w-0 pe-3 text-[12.5px] text-[#5A6B84]",
                            children: selected.length >= MAX_LIBRARY_ATTACHMENTS ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium text-[#B26A00]",
                                children: copy.limitReached
                            }, void 0, false, {
                                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                                lineNumber: 350,
                                columnNumber: 17
                            }, this) : copy.selectedCount(selected.length)
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                            lineNumber: 348,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onClose,
                            className: "min-h-10 rounded-md bg-[#1D74E0] px-5 py-2 text-[13.5px] font-medium text-white transition-colors hover:bg-[#155CB8] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]",
                            children: copy.done
                        }, void 0, false, {
                            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                            lineNumber: 355,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                    lineNumber: 347,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
            lineNumber: 208,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
        lineNumber: 179,
        columnNumber: 5
    }, this);
}
// Stacked-documents illustration for the empty library state. Self-contained
// SVG so it stays crisp at any size and follows the feed's blue palette.
function LibraryEmptyIllustration({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 96 96",
        fill: "none",
        className: className,
        role: "img",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "48",
                cy: "48",
                r: "48",
                fill: "#EAF2FD"
            }, void 0, false, {
                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                lineNumber: 383,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "28",
                y: "24",
                width: "34",
                height: "44",
                rx: "4",
                fill: "#C9DEF9",
                transform: "rotate(-8 45 46)"
            }, void 0, false, {
                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                lineNumber: 385,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "34",
                y: "26",
                width: "34",
                height: "44",
                rx: "4",
                fill: "#fff",
                stroke: "#B7D2F4"
            }, void 0, false, {
                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                lineNumber: 395,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "40",
                y: "34",
                width: "22",
                height: "3.5",
                rx: "1.75",
                fill: "#DCE7F6"
            }, void 0, false, {
                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                lineNumber: 396,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "40",
                y: "42",
                width: "22",
                height: "3.5",
                rx: "1.75",
                fill: "#DCE7F6"
            }, void 0, false, {
                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                lineNumber: 397,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "40",
                y: "50",
                width: "14",
                height: "3.5",
                rx: "1.75",
                fill: "#DCE7F6"
            }, void 0, false, {
                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                lineNumber: 398,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "66",
                cy: "64",
                r: "12",
                fill: "#1D74E0"
            }, void 0, false, {
                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                lineNumber: 400,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M66 59v10M61 64h10",
                stroke: "#fff",
                strokeWidth: "2.5",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
                lineNumber: 401,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/post/KnowledgeLibraryDrawer.tsx",
        lineNumber: 376,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/feed/article/ArticleEditor.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "editorShell": "ArticleEditor-module__zzoD3G__editorShell",
});
}),
"[project]/components/feed/article/ArticleEditor.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ArticleEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Modal/Modal.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/tiptap/esm/RichTextEditor.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$link$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/extension-link/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$placeholder$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/extension-placeholder/dist/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$underline$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/extension-underline/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$starter$2d$kit$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/starter-kit/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/react/dist/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArticle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArticle$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconArticle.mjs [app-ssr] (ecmascript) <export default as IconArticle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronDown$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconChevronDown.mjs [app-ssr] (ecmascript) <export default as IconChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileDescription$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileDescription$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconFileDescription.mjs [app-ssr] (ecmascript) <export default as IconFileDescription>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLink$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLink$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconLink.mjs [app-ssr] (ecmascript) <export default as IconLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconLoader2.mjs [app-ssr] (ecmascript) <export default as IconLoader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPhoto$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPhoto$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconPhoto.mjs [app-ssr] (ecmascript) <export default as IconPhoto>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconX.mjs [app-ssr] (ecmascript) <export default as IconX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/toast/ToastContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/header/hooks/useUserProfile.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$PublishAsSelector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/PublishAsSelector.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$TagSelector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/TagSelector.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/feed.service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$IndustrySelectModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/post/IndustrySelectModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$KnowledgeLibraryDrawer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/post/KnowledgeLibraryDrawer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleEditor$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/feed/article/ArticleEditor.module.css [app-ssr] (css module)");
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
const ARTICLE_BODY_LIMIT = 20000;
const COVER_MAX_BYTES = 5 * 1024 * 1024;
const copyByLocale = {
    en: {
        individualArticle: 'Individual White Paper',
        loading: 'Loading…',
        publish: 'Publish',
        publishing: 'Publishing…',
        saveChanges: 'Save changes',
        savingChanges: 'Saving…',
        cover: 'Add a cover image',
        coverHint: 'Recommended 1920 × 1080 · JPG, PNG or WebP · 5 MB max',
        replaceCover: 'Replace cover image',
        removeCover: 'Remove cover',
        coverLocked: 'The published cover image cannot be changed.',
        title: 'Title',
        titlePlaceholder: 'Title',
        bodyPlaceholder: 'Write here. Share the expertise only you can bring…',
        settings: 'White Paper settings',
        settingsHint: 'Help the right people discover this White Paper.',
        industry: 'Industry',
        selectIndustry: 'Select an industry',
        tags: 'Tags',
        addTagPlaceholder: 'Search or initiate a new tag',
        addTag: 'Add',
        addTagError: 'Unable to add the tag.',
        noTags: 'No tags are available.',
        addTagHint: 'Press Enter to create a new tag.',
        industryFirst: 'Select an industry first',
        related: 'Related insights',
        shareFromLibrary: 'Attach from Insighta library',
        titleRequired: 'Add a title before continuing.',
        bodyRequired: 'Write some White Paper content before continuing.',
        industryRequired: 'Select an industry before continuing.',
        coverRequired: 'Add a cover image before continuing.',
        bodyTooLong: `The formatted White Paper must be ${ARTICLE_BODY_LIMIT.toLocaleString()} characters or fewer.`,
        wrongCover: 'Choose a JPG, PNG, or WebP image.',
        largeCover: 'The cover image must be 5 MB or smaller.',
        smallCover: 'The cover image must be at least 552 × 276 pixels.',
        published: 'Your White Paper has been published.',
        updated: 'Your White Paper has been updated.',
        loadFailed: 'Unable to load your White Paper draft.',
        draftSavedRedirecting: 'Draft saved. Taking you to publishing…',
        changesSavedRedirecting: 'Changes saved. Taking you to publishing…',
        newKnowledgeAttached: 'Your new knowledge item has been attached.',
        newKnowledgeMissing: 'We could not find the item you just published. Try adding it from your library.',
        existingPost: 'You already have a post draft in progress.',
        continuePost: 'Continue editing it from the feed before starting a White Paper.',
        returnToFeed: 'Return to feed',
        accessTitle: 'White Paper publishing is available to Insighters.',
        accessBody: 'Sign in with an Insighter or company account to write a White Paper.',
        publishAsTitle: 'Post as',
        backToEditing: 'Back to editing'
    },
    ar: {
        individualArticle: 'ورقة بيضاء فردية',
        loading: 'جارٍ التحميل…',
        publish: 'نشر',
        publishing: 'جارٍ النشر…',
        saveChanges: 'حفظ التعديلات',
        savingChanges: 'جارٍ الحفظ…',
        cover: 'أضف صورة غلاف',
        coverHint: 'المقاس المقترح 1920 × 1080 · JPG أو PNG أو WebP · بحد أقصى 5 م.ب',
        replaceCover: 'استبدال صورة الغلاف',
        removeCover: 'إزالة الغلاف',
        coverLocked: 'لا يمكن تغيير صورة غلاف الورقة المنشورة.',
        title: 'العنوان',
        titlePlaceholder: 'العنوان',
        bodyPlaceholder: 'اكتب هنا وشارك الخبرة التي تميزك…',
        settings: 'إعدادات الورقة البيضاء',
        settingsHint: 'ساعد الأشخاص المناسبين في اكتشاف هذه الورقة البيضاء.',
        industry: 'المجال',
        selectIndustry: 'اختر مجالاً',
        tags: 'الوسوم',
        addTagPlaceholder: 'ابحث أو أضف وسمًا جديدًا',
        addTag: 'إضافة',
        addTagError: 'تعذر إضافة الوسم.',
        noTags: 'لا توجد وسوم متاحة.',
        addTagHint: 'اضغط Enter لإضافة وسم جديد.',
        industryFirst: 'اختر المجال أولاً',
        related: 'الرؤى المرتبطة',
        shareFromLibrary: 'مشاركة من المكتبة',
        titleRequired: 'أضف عنواناً قبل المتابعة.',
        bodyRequired: 'اكتب محتوى الورقة البيضاء قبل المتابعة.',
        industryRequired: 'اختر مجالاً قبل المتابعة.',
        coverRequired: 'أضف صورة غلاف قبل المتابعة.',
        bodyTooLong: `يجب ألا تتجاوز الورقة البيضاء المنسقة ${ARTICLE_BODY_LIMIT.toLocaleString()} حرفاً.`,
        wrongCover: 'اختر صورة بصيغة JPG أو PNG أو WebP.',
        largeCover: 'يجب ألا يزيد حجم صورة الغلاف على 5 ميجابايت.',
        smallCover: 'يجب ألا تقل أبعاد صورة الغلاف عن 552 × 276 بكسل.',
        published: 'تم نشر ورقتك البيضاء.',
        updated: 'تم تحديث ورقتك البيضاء.',
        loadFailed: 'تعذر تحميل مسودة الورقة البيضاء.',
        draftSavedRedirecting: 'تم حفظ المسودة. سيتم نقلك إلى النشر…',
        changesSavedRedirecting: 'تم حفظ التعديلات. سيتم نقلك إلى النشر…',
        newKnowledgeAttached: 'تم إرفاق عنصر المعرفة الجديد.',
        newKnowledgeMissing: 'تعذر العثور على العنصر الذي نشرته للتو. حاول إضافته من مكتبتك.',
        existingPost: 'لديك مسودة منشور قيد التحرير.',
        continuePost: 'أكمل تحريرها من صفحة الخلاصة قبل بدء ورقة بيضاء.',
        returnToFeed: 'العودة إلى الخلاصة',
        accessTitle: 'نشر الأوراق البيضاء متاح للمستشارين.',
        accessBody: 'سجّل الدخول بحساب مستشار أو شركة لكتابة ورقة بيضاء.',
        publishAsTitle: 'النشر باسم',
        backToEditing: 'العودة إلى التحرير'
    }
};
function richTextToPlainText(html) {
    if (!html) return '';
    if (typeof document === 'undefined') {
        return html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    }
    const container = document.createElement('div');
    container.innerHTML = html;
    return (container.textContent ?? '').replace(/\s+/g, ' ').trim();
}
function imageDimensions(file) {
    return new Promise((resolve, reject)=>{
        const image = new Image();
        const url = URL.createObjectURL(file);
        image.onload = ()=>{
            resolve({
                width: image.naturalWidth,
                height: image.naturalHeight
            });
            URL.revokeObjectURL(url);
        };
        image.onerror = ()=>{
            URL.revokeObjectURL(url);
            reject(new Error('Unable to read image dimensions'));
        };
        image.src = url;
    });
}
function ArticleEditor({ locale }) {
    const isArabic = locale === 'ar';
    const copy = copyByLocale[isArabic ? 'ar' : 'en'];
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const { user, roles, isAuthResolved } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserProfile"])();
    const usesCompanyLibrary = roles.includes('company');
    const coverInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const coverObjectUrlRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [draftUuid, setDraftUuid] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isEditingPublished, setIsEditingPublished] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [blockingDraft, setBlockingDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [body, setBody] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [industry, setIndustry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedTags, setSelectedTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [relatedInsights, setRelatedInsights] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [coverFile, setCoverFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [coverPreview, setCoverPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [removeCover, setRemoveCover] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isPublishing, setIsPublishing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [publishAsOpened, setPublishAsOpened] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [authorType, setAuthorType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [industryModalOpened, setIndustryModalOpened] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [libraryDrawerOpened, setLibraryDrawerOpened] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const canPublish = !!user && roles.some((role)=>[
            'insighter',
            'company',
            'company-insighter'
        ].includes(role));
    const companyName = user?.company?.legal_name?.trim() || '';
    const canChoosePublisher = !isEditingPublished && !!companyName && // Company-insighters always publish under their own name, so they skip the
    // publisher step; only the company account itself gets the choice.
    roles.some((role)=>role === 'company') && !roles.some((role)=>role === 'company-insighter');
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEditor"])({
        immediatelyRender: false,
        extensions: [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$starter$2d$kit$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].configure({
                heading: {
                    levels: [
                        1,
                        2,
                        3
                    ]
                }
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$underline$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$link$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].configure({
                autolink: true,
                openOnClick: false,
                defaultProtocol: 'https'
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$placeholder$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].configure({
                placeholder: copy.bodyPlaceholder
            })
        ],
        content: '',
        onUpdate: ({ editor: currentEditor })=>setBody(currentEditor.getHTML())
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!editor || editor.getHTML() === body) return;
        editor.commands.setContent(body, {
            emitUpdate: false
        });
    }, [
        body,
        editor
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isAuthResolved) return;
        if (!canPublish) {
            setIsLoading(false);
            return;
        }
        const controller = new AbortController();
        const editUuid = new URLSearchParams(window.location.search).get('edit');
        const loadItem = editUuid ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFeedItem"])(editUuid, locale) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFeedDraft"])(locale, controller.signal);
        loadItem.then((draft)=>{
            if (!draft) return;
            if (draft.content_type !== 'article') {
                setBlockingDraft(draft);
                return;
            }
            setDraftUuid(draft.uuid);
            setIsEditingPublished(draft.status === 'published');
            setTitle(draft.title ?? '');
            setBody(draft.body ?? '');
            setIndustry(draft.industry ? {
                id: draft.industry.id,
                name: draft.industry.name
            } : null);
            setSelectedTags(draft.tags);
            setRelatedInsights(draft.related_insights.flatMap((item)=>typeof item.id === 'number' ? [
                    {
                        id: item.id,
                        type: item.type,
                        title: item.title,
                        slug: item.slug,
                        status: 'published',
                        published_at: null
                    }
                ] : []));
            setCoverPreview(draft.media.find((media)=>media.media_type === 'image')?.url ?? null);
        }).catch((error)=>{
            if (!(error instanceof DOMException && error.name === 'AbortError')) {
                toast.error(error instanceof Error ? error.message : copy.loadFailed);
            }
        }).finally(()=>setIsLoading(false));
        return ()=>controller.abort();
    }, [
        canPublish,
        copy.loadFailed,
        isAuthResolved,
        locale,
        toast
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>()=>{
            if (coverObjectUrlRef.current) URL.revokeObjectURL(coverObjectUrlRef.current);
        }, []);
    const payload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            title: title.trim(),
            body,
            industryId: industry?.id ?? null,
            tags: selectedTags.map((tag)=>tag.id),
            relatedInsights: relatedInsights.map((item)=>item.id),
            coverImage: coverFile,
            removeCover
        }), [
        body,
        coverFile,
        industry?.id,
        relatedInsights,
        removeCover,
        selectedTags,
        title
    ]);
    const validateForPublish = ()=>{
        if (!title.trim()) {
            toast.error(copy.titleRequired);
            return false;
        }
        if (!richTextToPlainText(body)) {
            toast.error(copy.bodyRequired);
            return false;
        }
        if (body.length > ARTICLE_BODY_LIMIT) {
            toast.error(copy.bodyTooLong);
            return false;
        }
        if (!industry) {
            toast.error(copy.industryRequired);
            return false;
        }
        if (!coverPreview || removeCover) {
            toast.error(copy.coverRequired);
            return false;
        }
        return true;
    };
    const handlePublish = async (selectedAuthorType)=>{
        if (isPublishing) return;
        setIsPublishing(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publishArticle"])({
                ...payload,
                authorType: selectedAuthorType
            }, locale, draftUuid ?? undefined);
            toast.success(isEditingPublished ? copy.updated : copy.published);
            setPublishAsOpened(false);
            router.push(`/${locale}?view=my-feeds`);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : copy.loadFailed);
        } finally{
            setIsPublishing(false);
        }
    };
    const requestPublish = ()=>{
        if (isPublishing || !validateForPublish()) return;
        if (canChoosePublisher) {
            setPublishAsOpened(true);
            return;
        }
        void handlePublish(isEditingPublished ? undefined : 'insighter');
    };
    // Empty-library CTA: save the article as a draft, then head to the knowledge
    // stepper. It redirects back here with ?attach_knowledge=<id> so we can attach
    // the new item automatically (handled by the return effect below).
    const handlePublishNewKnowledge = async ()=>{
        if (isPublishing) return;
        if (!title.trim()) {
            toast.error(copy.titleRequired);
            return;
        }
        setLibraryDrawerOpened(false);
        try {
            const uuid = isEditingPublished ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publishArticle"])(payload, locale, draftUuid ?? undefined) : await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveArticleDraft"])(payload, locale, draftUuid ?? undefined);
            setDraftUuid(uuid);
            toast.success(isEditingPublished ? copy.changesSavedRedirecting : copy.draftSavedRedirecting);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : copy.loadFailed);
            return;
        }
        const returnUrl = `${window.location.origin}${window.location.pathname}${window.location.search}`;
        window.location.href = `${"TURBOPACK compile-time value", "http://localhost:4200"}/app/add-knowledge/stepper` + `?return_url=${encodeURIComponent(returnUrl)}`;
    };
    // On return from publishing, fetch the new item and attach it to the article.
    const autoAttachedIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isAuthResolved || !canPublish) return;
        const params = new URLSearchParams(window.location.search);
        const raw = params.get('attach_knowledge');
        if (!raw) return;
        params.delete('attach_knowledge');
        const query = params.toString();
        router.replace(`${window.location.pathname}${query ? `?${query}` : ''}`, {
            scroll: false
        });
        const id = Number(raw);
        if (!Number.isInteger(id) || id <= 0) return;
        if (autoAttachedIdRef.current === id) return;
        autoAttachedIdRef.current = id;
        let cancelled = false;
        void (async ()=>{
            try {
                const item = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchLibraryKnowledgeById"])(id, locale, 5, usesCompanyLibrary);
                if (cancelled) return;
                if (item) {
                    setRelatedInsights((previous)=>previous.some((entry)=>entry.id === item.id) || previous.length >= 3 ? previous : [
                            ...previous,
                            item
                        ]);
                    toast.success(copy.newKnowledgeAttached);
                } else {
                    toast.error(copy.newKnowledgeMissing);
                }
            } catch  {
                if (!cancelled) toast.error(copy.newKnowledgeMissing);
            }
        })();
        return ()=>{
            cancelled = true;
        };
    }, [
        isAuthResolved,
        canPublish,
        locale,
        usesCompanyLibrary,
        copy,
        toast,
        router
    ]);
    const handleCoverChange = async (file)=>{
        if (isEditingPublished) return;
        if (!file) return;
        if (![
            'image/jpeg',
            'image/png',
            'image/webp'
        ].includes(file.type)) {
            toast.error(copy.wrongCover);
            return;
        }
        if (file.size > COVER_MAX_BYTES) {
            toast.error(copy.largeCover);
            return;
        }
        try {
            const dimensions = await imageDimensions(file);
            if (dimensions.width < 552 || dimensions.height < 276) {
                toast.error(copy.smallCover);
                return;
            }
        } catch  {
            toast.error(copy.wrongCover);
            return;
        }
        if (coverObjectUrlRef.current) URL.revokeObjectURL(coverObjectUrlRef.current);
        const nextUrl = URL.createObjectURL(file);
        coverObjectUrlRef.current = nextUrl;
        setCoverFile(file);
        setCoverPreview(nextUrl);
        setRemoveCover(false);
    };
    if (isLoading || !isAuthResolved) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex min-h-[70vh] items-center justify-center bg-[#F3F5F8]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__["IconLoader2"], {
                "aria-label": copy.loading,
                className: "h-7 w-7 animate-spin text-[#2378E8]"
            }, void 0, false, {
                fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                lineNumber: 445,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/feed/article/ArticleEditor.tsx",
            lineNumber: 444,
            columnNumber: 7
        }, this);
    }
    if (!canPublish || blockingDraft) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            dir: isArabic ? 'rtl' : 'ltr',
            className: "min-h-[calc(100vh-var(--app-header-height,88px))] bg-[#F3F5F8] px-4 py-16",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-xl rounded-xl border border-[#DCE4EF] bg-white p-8 text-center shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArticle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArticle$3e$__["IconArticle"], {
                        className: "mx-auto h-10 w-10 text-[#C8780A]",
                        stroke: 1.5
                    }, void 0, false, {
                        fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                        lineNumber: 454,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "mt-5 text-2xl font-semibold text-[#101827]",
                        children: blockingDraft ? copy.existingPost : copy.accessTitle
                    }, void 0, false, {
                        fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                        lineNumber: 455,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 text-[15px] leading-7 text-[#66758B]",
                        children: blockingDraft ? copy.continuePost : copy.accessBody
                    }, void 0, false, {
                        fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                        lineNumber: 458,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>router.push(`/${locale}`),
                        className: "mt-7 rounded-full bg-[#2378E8] px-6 py-3 text-sm font-medium text-white hover:bg-[#1769C2]",
                        children: copy.returnToFeed
                    }, void 0, false, {
                        fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                        lineNumber: 461,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                lineNumber: 453,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/feed/article/ArticleEditor.tsx",
            lineNumber: 452,
            columnNumber: 7
        }, this);
    }
    const initials = `${user?.first_name?.[0] ?? ''}${user?.last_name?.[0] ?? ''}`.toUpperCase() || 'I';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        dir: isArabic ? 'rtl' : 'ltr',
        className: "min-h-[calc(100vh-var(--app-header-height,88px))] bg-[#F3F5F8] text-[#101827]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sticky top-[var(--app-header-height,88px)] z-40 border-b border-[#DCE3EC] bg-white/95 backdrop-blur-xl",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto flex min-h-[70px] max-w-[1180px] items-center gap-3 px-4 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex min-w-0 flex-1 items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#E7F0FD]",
                                    children: user?.profile_photo_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: user.profile_photo_url,
                                        alt: "",
                                        className: "h-full w-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                        lineNumber: 477,
                                        columnNumber: 42
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex h-full items-center justify-center text-xs font-medium text-[#2378E8]",
                                        children: initials
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                        lineNumber: 477,
                                        columnNumber: 127
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                    lineNumber: 476,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "truncate text-[13px] font-medium text-[#1B2638]",
                                            children: user?.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                            lineNumber: 480,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "flex items-center gap-1 text-[11.5px] text-[#718198]",
                                            children: copy.individualArticle
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                            lineNumber: 481,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                    lineNumber: 479,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                            lineNumber: 475,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: requestPublish,
                            disabled: isPublishing,
                            className: "inline-flex min-h-10 items-center rounded-full bg-[#2378E8] px-5 text-[13px] font-medium text-white hover:bg-[#1769C2] disabled:opacity-55",
                            children: [
                                isPublishing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__["IconLoader2"], {
                                    className: "me-2 h-4 w-4 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                    lineNumber: 488,
                                    columnNumber: 30
                                }, this),
                                isPublishing ? isEditingPublished ? copy.savingChanges : copy.publishing : isEditingPublished ? copy.saveChanges : copy.publish
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                            lineNumber: 487,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                    lineNumber: 474,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                lineNumber: 473,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "mx-auto grid max-w-[1180px] gap-7 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8 lg:py-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "overflow-hidden rounded-xl border border-[#DCE4EF] bg-white shadow-[0_14px_38px_rgba(29,48,75,0.06)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: coverInputRef,
                                type: "file",
                                accept: "image/jpeg,image/png,image/webp",
                                disabled: isEditingPublished,
                                className: "hidden",
                                onChange: (event)=>void handleCoverChange(event.currentTarget.files?.[0])
                            }, void 0, false, {
                                fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                lineNumber: 498,
                                columnNumber: 13
                            }, this),
                            coverPreview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "group relative h-[clamp(150px,20vw,240px)] overflow-hidden bg-[#E9EEF5]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: coverPreview,
                                        alt: "",
                                        className: "h-full w-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                        lineNumber: 501,
                                        columnNumber: 17
                                    }, this),
                                    isEditingPublished ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-14 text-end text-xs font-medium text-white",
                                        children: copy.coverLocked
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                        lineNumber: 503,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-x-0 bottom-0 flex justify-end gap-2 bg-gradient-to-t from-black/65 to-transparent p-4 pt-16 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>coverInputRef.current?.click(),
                                                className: "rounded-full bg-white px-4 py-2 text-xs font-medium text-[#1E2A3D]",
                                                children: copy.replaceCover
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                lineNumber: 508,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>{
                                                    setCoverFile(null);
                                                    setCoverPreview(null);
                                                    setRemoveCover(true);
                                                },
                                                className: "rounded-full bg-white/90 px-4 py-2 text-xs font-medium text-[#A9322B]",
                                                children: copy.removeCover
                                            }, void 0, false, {
                                                fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                lineNumber: 509,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                        lineNumber: 507,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                lineNumber: 500,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                disabled: isEditingPublished,
                                onClick: ()=>coverInputRef.current?.click(),
                                className: "flex min-h-[174px] w-full flex-col items-center justify-center border-b border-dashed border-[#CBD7E5] bg-[#F8FAFC] px-6 text-center transition-colors hover:bg-[#F2F6FA] disabled:cursor-not-allowed disabled:hover:bg-[#F8FAFC]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#2378E8] shadow-sm",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPhoto$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPhoto$3e$__["IconPhoto"], {
                                            className: "h-5 w-5"
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                            lineNumber: 515,
                                            columnNumber: 125
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                        lineNumber: 515,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mt-3 text-sm font-medium text-[#26364C]",
                                        children: isEditingPublished ? copy.coverLocked : copy.cover
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                        lineNumber: 516,
                                        columnNumber: 17
                                    }, this),
                                    !isEditingPublished && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mt-1 text-xs text-[#8291A5]",
                                        children: copy.coverHint
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                        lineNumber: 517,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                lineNumber: 514,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-6 sm:px-10 lg:px-14",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "article-title",
                                        className: "sr-only",
                                        children: copy.title
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                        lineNumber: 522,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        id: "article-title",
                                        rows: 2,
                                        maxLength: 255,
                                        value: title,
                                        onChange: (event)=>setTitle(event.currentTarget.value),
                                        placeholder: copy.titlePlaceholder,
                                        className: "mt-10 w-full resize-none overflow-hidden border-0 bg-transparent text-2xl font-medium leading-tight tracking-[-0.015em] text-[#101827] outline-none placeholder:font-normal placeholder:text-[#A5B0BF] sm:text-[32px]"
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                        lineNumber: 523,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$article$2f$ArticleEditor$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].editorShell} mt-4 border-t border-[#E5EAF1]`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTextEditor"], {
                                            editor: editor,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTextEditor"].Toolbar, {
                                                    sticky: false,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTextEditor"].ControlsGroup, {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTextEditor"].Bold, {}, void 0, false, {
                                                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                                    lineNumber: 527,
                                                                    columnNumber: 51
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTextEditor"].Italic, {}, void 0, false, {
                                                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                                    lineNumber: 527,
                                                                    columnNumber: 74
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTextEditor"].Underline, {}, void 0, false, {
                                                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                                    lineNumber: 527,
                                                                    columnNumber: 99
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTextEditor"].Strikethrough, {}, void 0, false, {
                                                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                                    lineNumber: 527,
                                                                    columnNumber: 127
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                            lineNumber: 527,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTextEditor"].ControlsGroup, {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTextEditor"].H1, {}, void 0, false, {
                                                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                                    lineNumber: 528,
                                                                    columnNumber: 51
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTextEditor"].H2, {}, void 0, false, {
                                                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                                    lineNumber: 528,
                                                                    columnNumber: 72
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTextEditor"].H3, {}, void 0, false, {
                                                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                                    lineNumber: 528,
                                                                    columnNumber: 93
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                            lineNumber: 528,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTextEditor"].ControlsGroup, {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTextEditor"].BulletList, {}, void 0, false, {
                                                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                                    lineNumber: 529,
                                                                    columnNumber: 51
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTextEditor"].OrderedList, {}, void 0, false, {
                                                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                                    lineNumber: 529,
                                                                    columnNumber: 80
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTextEditor"].Blockquote, {}, void 0, false, {
                                                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                                    lineNumber: 529,
                                                                    columnNumber: 110
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTextEditor"].Hr, {}, void 0, false, {
                                                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                                    lineNumber: 529,
                                                                    columnNumber: 139
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                            lineNumber: 529,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTextEditor"].ControlsGroup, {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTextEditor"].Link, {}, void 0, false, {
                                                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                                    lineNumber: 530,
                                                                    columnNumber: 51
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTextEditor"].Unlink, {}, void 0, false, {
                                                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                                    lineNumber: 530,
                                                                    columnNumber: 74
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTextEditor"].Code, {}, void 0, false, {
                                                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                                    lineNumber: 530,
                                                                    columnNumber: 99
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTextEditor"].CodeBlock, {}, void 0, false, {
                                                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                                    lineNumber: 530,
                                                                    columnNumber: 122
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                            lineNumber: 530,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTextEditor"].ControlsGroup, {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTextEditor"].Undo, {}, void 0, false, {
                                                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                                    lineNumber: 531,
                                                                    columnNumber: 51
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTextEditor"].Redo, {}, void 0, false, {
                                                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                                    lineNumber: 531,
                                                                    columnNumber: 74
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                            lineNumber: 531,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                    lineNumber: 526,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTextEditor"].Content, {}, void 0, false, {
                                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                    lineNumber: 533,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                            lineNumber: 525,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                        lineNumber: 524,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `border-t py-4 text-end text-xs ${body.length > ARTICLE_BODY_LIMIT ? 'border-[#E5B7B2] text-[#B53B32]' : 'border-[#E8EDF3] text-[#8A98AA]'}`,
                                        children: [
                                            body.length.toLocaleString(),
                                            " / ",
                                            ARTICLE_BODY_LIMIT.toLocaleString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                        lineNumber: 536,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                lineNumber: 521,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                        lineNumber: 497,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "space-y-4 lg:sticky lg:top-[calc(var(--app-header-height,88px)+94px)] lg:self-start",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "rounded-xl border border-[#DCE4EF] bg-white p-5 shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-[15px] font-semibold text-[#172236]",
                                    children: copy.settings
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                    lineNumber: 542,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-xs leading-5 text-[#7A899D]",
                                    children: copy.settingsHint
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                    lineNumber: 543,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[11px] font-medium uppercase tracking-[0.08em] text-[#64758C]",
                                            children: copy.industry
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                            lineNumber: 546,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setIndustryModalOpened(true),
                                            className: "mt-2 flex min-h-11 w-full items-center justify-between rounded-lg border border-[#D6E0EC] px-3 text-start text-sm text-[#26364C] hover:border-[#9EBBDE]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "truncate",
                                                    children: industry?.name ?? copy.selectIndustry
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                    lineNumber: 548,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronDown$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronDown$3e$__["IconChevronDown"], {
                                                    className: "h-4 w-4 text-[#8291A5]"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                    lineNumber: 548,
                                                    columnNumber: 92
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                            lineNumber: 547,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                    lineNumber: 545,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-5 border-t border-[#EDF1F5] pt-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[11px] font-medium uppercase tracking-[0.08em] text-[#64758C]",
                                            children: copy.tags
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                            lineNumber: 553,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$TagSelector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            locale: locale,
                                            industryId: industry?.id ?? null,
                                            selectedTags: selectedTags,
                                            onChange: setSelectedTags,
                                            disabled: !industry
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                            lineNumber: 554,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                    lineNumber: 552,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-5 border-t border-[#EDF1F5] pt-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[11px] font-medium uppercase tracking-[0.08em] text-[#64758C]",
                                            children: copy.related
                                        }, void 0, false, {
                                            fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                            lineNumber: 564,
                                            columnNumber: 17
                                        }, this),
                                        relatedInsights.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 flex items-center gap-2 rounded-lg bg-[#F6F9FC] px-3 py-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileDescription$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileDescription$3e$__["IconFileDescription"], {
                                                        className: "h-4 w-4 shrink-0 text-[#2378E8]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                        lineNumber: 565,
                                                        columnNumber: 142
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "min-w-0 flex-1 truncate text-xs font-medium text-[#35445A]",
                                                        children: item.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                        lineNumber: 565,
                                                        columnNumber: 209
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setRelatedInsights((current)=>current.filter((related)=>related.id !== item.id)),
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__["IconX"], {
                                                            className: "h-3.5 w-3.5 text-[#8997A9]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                            lineNumber: 565,
                                                            columnNumber: 428
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                        lineNumber: 565,
                                                        columnNumber: 305
                                                    }, this)
                                                ]
                                            }, item.id, true, {
                                                fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                lineNumber: 565,
                                                columnNumber: 48
                                            }, this)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setLibraryDrawerOpened(true),
                                            className: `mt-3 flex h-9 items-center gap-1.5 rounded-lg border px-2.5 text-[14px] font-medium transition-colors focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] ${relatedInsights.length > 0 ? 'border-[#8FB9EA] bg-[#EDF3FC] text-[#1D74E0]' : 'border-[#C9DCF6] text-[#5A6B84] hover:bg-[#F3F6FB]'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLink$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLink$3e$__["IconLink"], {
                                                    "aria-hidden": true,
                                                    stroke: 1.7,
                                                    className: "h-4.5 w-4.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                    lineNumber: 575,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: copy.shareFromLibrary
                                                }, void 0, false, {
                                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                                    lineNumber: 576,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                            lineNumber: 566,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                    lineNumber: 563,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                            lineNumber: 541,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                        lineNumber: 540,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                lineNumber: 496,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Modal"], {
                opened: publishAsOpened,
                onClose: ()=>!isPublishing && setPublishAsOpened(false),
                size: 680,
                radius: 12,
                centered: true,
                zIndex: 300,
                withCloseButton: false,
                "aria-labelledby": "article-publish-as-title",
                styles: {
                    content: {
                        border: '1px solid #DCE4EF',
                        boxShadow: '0 24px 70px rgba(20, 39, 68, 0.18)'
                    },
                    body: {
                        padding: 24
                    }
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    id: "article-publish-as-title",
                                    className: "text-[21px] font-bold tracking-[-0.015em] text-[#101827]",
                                    children: copy.publishAsTitle
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                    lineNumber: 600,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                lineNumber: 599,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-label": copy.backToEditing,
                                onClick: ()=>setPublishAsOpened(false),
                                disabled: isPublishing,
                                className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#6B7B91] transition-colors hover:bg-[#F1F5F9] hover:text-[#172236] disabled:opacity-50",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__["IconX"], {
                                    className: "h-5 w-5"
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                    lineNumber: 611,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                lineNumber: 604,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                        lineNumber: 598,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$PublishAsSelector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            locale: locale,
                            companyName: companyName,
                            companyLogo: user?.company?.logo,
                            insighterName: user?.name || initials,
                            insighterPhoto: user?.profile_photo_url,
                            value: authorType,
                            onChange: setAuthorType
                        }, void 0, false, {
                            fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                            lineNumber: 616,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                        lineNumber: 615,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 flex items-center justify-end gap-3 border-t border-[#E8EDF3] pt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setPublishAsOpened(false),
                                disabled: isPublishing,
                                className: "min-h-10 rounded-full px-4 text-[13px] font-medium text-[#64758C] hover:bg-[#F2F5F8] disabled:opacity-50",
                                children: copy.backToEditing
                            }, void 0, false, {
                                fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                lineNumber: 628,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>void handlePublish(authorType ?? undefined),
                                disabled: isPublishing || authorType === null,
                                className: "inline-flex min-h-10 items-center rounded-full bg-[#2378E8] px-6 text-[13px] font-medium text-white hover:bg-[#1769C2] disabled:cursor-not-allowed disabled:bg-[#9BBCE7]",
                                children: [
                                    isPublishing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLoader2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLoader2$3e$__["IconLoader2"], {
                                        className: "me-2 h-4 w-4 animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                        lineNumber: 642,
                                        columnNumber: 30
                                    }, this),
                                    isPublishing ? copy.publishing : copy.publish
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                                lineNumber: 636,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                        lineNumber: 627,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                lineNumber: 584,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$IndustrySelectModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                locale: locale,
                opened: industryModalOpened,
                selectedId: industry?.id ?? null,
                onClose: ()=>setIndustryModalOpened(false),
                onSelect: (option)=>{
                    setIndustry(option);
                    setIndustryModalOpened(false);
                }
            }, void 0, false, {
                fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                lineNumber: 648,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$KnowledgeLibraryDrawer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                locale: locale,
                opened: libraryDrawerOpened,
                isCompany: usesCompanyLibrary,
                selected: relatedInsights,
                onClose: ()=>setLibraryDrawerOpened(false),
                onSelectionChange: setRelatedInsights,
                onPublishNew: ()=>{
                    void handlePublishNewKnowledge();
                }
            }, void 0, false, {
                fileName: "[project]/components/feed/article/ArticleEditor.tsx",
                lineNumber: 649,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/feed/article/ArticleEditor.tsx",
        lineNumber: 472,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_1242e017._.js.map