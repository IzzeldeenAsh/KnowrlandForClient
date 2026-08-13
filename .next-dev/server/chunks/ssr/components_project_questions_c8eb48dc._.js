module.exports = [
"[project]/components/project/questions/ChoiceCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChoiceCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCheck.mjs [app-ssr] (ecmascript) <export default as IconCheck>");
'use client';
;
;
;
function ChoiceCard({ role = 'radio', checked, title, subtitle, icon, Icon, renderIcon, size = 'md', iconSize, iconStroke = 1.6, iconClassName = '', onSelect, entered = true, delayMs = 0, isRTL = false, align = 'center', className = '', contentClassName = '', titleClassName = '', subtitleClassName = '', childrenClassName = '', children }) {
    const contentAlign = align === 'center' ? 'items-center text-center' : 'items-start text-start';
    const radiusClassName = size === 'sm' ? 'rounded-2xl' : size === 'lg' ? 'rounded-[2rem]' : 'rounded-3xl';
    const contentPaddingClassName = size === 'sm' ? 'gap-3 px-4 py-5' : size === 'lg' ? 'gap-5 px-7 py-8' : 'gap-4 px-6 py-7';
    const indicatorPos = size === 'sm' ? `absolute top-3 ${isRTL ? 'left-3' : 'right-3'}` : size === 'lg' ? `absolute top-5 ${isRTL ? 'left-6' : 'right-6'}` : `absolute top-4 ${isRTL ? 'left-6' : 'right-6'}`;
    const indicatorSize = size === 'sm' ? 'h-5 w-5' : 'h-6 w-6';
    const checkIconSize = size === 'sm' ? 12 : 14;
    const resolvedIconSize = iconSize ?? (size === 'sm' ? 44 : size === 'lg' ? 64 : 56);
    const titleTextClassName = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-xl' : 'text-lg';
    const subtitleTextClassName = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm';
    let resolvedIcon = null;
    if (renderIcon) {
        resolvedIcon = renderIcon({
            size: resolvedIconSize,
            stroke: iconStroke,
            className: iconClassName
        });
    } else if (Icon) {
        resolvedIcon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
            size: resolvedIconSize,
            stroke: iconStroke,
            className: iconClassName
        }, void 0, false, {
            fileName: "[project]/components/project/questions/ChoiceCard.tsx",
            lineNumber: 107,
            columnNumber: 7
        }, this);
    } else if (icon) {
        if (/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidElement"])(icon) && typeof icon.type === 'string' && icon.type === 'svg') {
            const existingClassName = icon.props.className ?? '';
            resolvedIcon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cloneElement"])(icon, {
                width: resolvedIconSize,
                height: resolvedIconSize,
                className: `${existingClassName} ${iconClassName}`.trim()
            });
        } else {
            resolvedIcon = icon;
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        role: role,
        "aria-checked": checked,
        "aria-label": title,
        onClick: onSelect,
        className: `group relative h-full w-full transform-gpu border shadow-sm backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${radiusClassName} ${checked ? 'border-blue-400 bg-white/70 shadow-md' : 'border-white/30 bg-white/40 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/55 hover:shadow-md'} ${entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'} ${className}`,
        style: {
            transitionDelay: `${delayMs}ms`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `${indicatorPos} box-border inline-flex aspect-square shrink-0 items-center justify-center ${indicatorSize} border transition-colors ${role === 'checkbox' ? 'rounded-md' : 'rounded-full'} ${checked ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white/80'}`,
                "aria-hidden": "true",
                children: checked ? role === 'checkbox' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                    size: checkIconSize,
                    stroke: 3,
                    className: "text-white"
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ChoiceCard.tsx",
                    lineNumber: 152,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "h-2 w-2 rounded-full bg-white"
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ChoiceCard.tsx",
                    lineNumber: 154,
                    columnNumber: 13
                }, this) : null
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ChoiceCard.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex h-full flex-col ${contentPaddingClassName} ${contentAlign} ${contentClassName}`,
                children: [
                    resolvedIcon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `inline-flex shrink-0 items-center justify-center text-blue-600 opacity-95 transition-transform duration-300 ease-out [&>svg]:h-full [&>svg]:w-full ${checked ? 'scale-105 drop-shadow-[0_6px_18px_rgba(37,99,235,0.25)]' : 'group-hover:scale-105 group-hover:-rotate-1'}`,
                        style: {
                            width: resolvedIconSize,
                            height: resolvedIconSize
                        },
                        "aria-hidden": "true",
                        children: resolvedIcon
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ChoiceCard.tsx",
                        lineNumber: 163,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `${titleTextClassName} font-bold bg-gradient-to-r from-sky-600 via-cyan-500 to-cyan-500 bg-clip-text text-transparent ${titleClassName}`,
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ChoiceCard.tsx",
                                lineNumber: 177,
                                columnNumber: 11
                            }, this),
                            subtitle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `${subtitleTextClassName} font-semibold text-slate-600 ${subtitleClassName}`,
                                children: subtitle
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ChoiceCard.tsx",
                                lineNumber: 183,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ChoiceCard.tsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this),
                    children ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `w-full flex-1 flex flex-col ${childrenClassName}`,
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ChoiceCard.tsx",
                        lineNumber: 192,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/ChoiceCard.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/ChoiceCard.tsx",
        lineNumber: 123,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/questions/ProjectTypeQuestion.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectTypeQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectWizardNavigation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/specifiedInsighterProject.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$SpecifiedInsighterBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/SpecifiedInsighterBadge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ChoiceCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/ChoiceCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBriefcaseFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBriefcaseFilled$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBriefcaseFilled.mjs [app-ssr] (ecmascript) <export default as IconBriefcaseFilled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconAffiliateFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconAffiliateFilled$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconAffiliateFilled.mjs [app-ssr] (ecmascript) <export default as IconAffiliateFilled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBoltFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBoltFilled$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBoltFilled.mjs [app-ssr] (ecmascript) <export default as IconBoltFilled>");
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
function splitCommaList(value) {
    return value.split(/[,،]/g).map((s)=>s.trim()).filter(Boolean);
}
function normalizeProjectTypeId(value) {
    if (!value) return null;
    if (value === "ad_hoc") return "ad_hoc";
    if (value === "frame_work_agreement" || value === "framework") return "frame_work_agreement";
    if (value === "urgent_request" || value === "urgent") return "urgent_request";
    return null;
}
function getProfileDisplayName(role, data) {
    if (!data) return "";
    if (role === "company") return String(data.legal_name || data.name || "").trim();
    const fullName = String(data.name || "").trim();
    if (fullName) return fullName;
    return [
        data.first_name,
        data.last_name
    ].map((value)=>String(value || "").trim()).filter(Boolean).join(" ");
}
function shouldFetchSpecifiedDisplay(locale, role, profileUuid) {
    const storedDisplay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredSpecifiedInsighterDisplay"])(locale);
    if (!storedDisplay) return true;
    return storedDisplay.role !== role || storedDisplay.uuid !== profileUuid;
}
async function fetchSpecifiedInsighterDisplay(params) {
    const { locale, role, profileUuid } = params;
    if (!profileUuid) return;
    const endpoint = role === "company" ? `/api/platform/company/profile/${encodeURIComponent(profileUuid)}` : `/api/platform/insighter/profile/${encodeURIComponent(profileUuid)}`;
    try {
        const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(endpoint), {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Accept-Language": locale === "ar" ? "ar" : "en"
            },
            cache: "no-store"
        });
        if (!response.ok) return;
        const payload = await response.json();
        const data = payload.data;
        const name = getProfileDisplayName(role, data);
        if (!name) return;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeStoredSpecifiedInsighterDisplay"])(locale, {
            role,
            uuid: String(data?.uuid || profileUuid).trim(),
            name,
            imageUrl: role === "company" ? String(data?.logo || "").trim() || null : String(data?.profile_photo_url || "").trim() || null
        });
    } catch  {
    // Specified mode should still work if display metadata cannot be fetched.
    }
}
function getOptions(locale) {
    const isArabic = locale === "ar";
    if (isArabic) {
        return [
            {
                id: "ad_hoc",
                title: "Ad hoc (طلب واحد)",
                subtitle: "",
                description: [
                    "حدّد نطاق العمل والمخرجات والمدة ومجال الاستشارة.",
                    "استلم عروضًا من خبراء/شركات معتمدة وقارنها بسرعة.",
                    "أدر التنفيذ على المنصة (تذاكر، جلسات، واتساب) ثم استلم المخرجات وأكمل الدفع."
                ],
                consultingFields: "رواد الأعمال، المنشآت الصغيرة والمتوسطة، المستثمرون، الشركات"
            },
            {
                id: "frame_work_agreement",
                title: "Framework (طلبات متعددة)",
                subtitle: "",
                description: [
                    "اتفاقية شاملة لتعاون طويل المدى مع نفس الخبير أو الشركة.",
                    "أصدر أوامر عمل عند الحاجة، لكل منها نطاق وميزانية وجدول زمني.",
                    "حوكمة وإدارة عقود ومدفوعات مركزية (بما فيها التحويل البنكي)."
                ],
                consultingFields: "الحكومات، المنظمات، المنظمات غير الحكومية، القطاع غير الربحي، المؤسسات"
            },
            {
                id: "urgent_request",
                title: "خلال 24 ساعة",
                subtitle: "",
                description: [
                    "قائمة مختصرة سريعة لقرارات عاجلة ومخرجات حساسة للوقت.",
                    "تنسيق وتسليم متسارع مع تواصل لحظي."
                ],
                consultingFields: "للكل"
            }
        ];
    }
    return [
        {
            id: "ad_hoc",
            title: "Ad hoc (single request)",
            subtitle: "",
            description: [
                "Define scope, deliverables, timeline, and consulting domain.",
                "Get matched with vetted experts/firms and compare proposals.",
                "Collaborate in-platform (tickets, sessions, WhatsApp) and close with delivery & payment."
            ],
            consultingFields: "Entrepreneurs, SMEs, Investors, Companies"
        },
        {
            id: "frame_work_agreement",
            title: "Multi-request",
            subtitle: "",
            description: [
                "Set up ongoing advisory with the same expert or firm.",
                "Launch work orders as needed—each with its own scope, timeline, and budget.",
                "Centralize governance, compliance (NDA), and billing (incl. wire transfer)."
            ],
            consultingFields: "Governments, Organizations, NGOs, NPOs, Enterprises"
        },
        {
            id: "urgent_request",
            title: "Within 24 hours",
            subtitle: "",
            description: [
                "Fast shortlist for urgent decisions and time-sensitive deliverables.",
                "Real-time coordination and accelerated delivery.",
                "When you need an expert now, not next week."
            ],
            consultingFields: "All"
        }
    ];
}
function ProjectTypeQuestion({ locale }) {
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const isRTL = locale === "ar";
    const isEnglish = typeof locale === "string" && locale.toLowerCase().startsWith("en");
    const options = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>getOptions(locale), [
        locale
    ]);
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isAdvancing, setIsAdvancing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = window.setTimeout(()=>setEntered(true), 30);
        return ()=>window.clearTimeout(timer);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const specifiedInsighterUuid = searchParams?.get(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["specifiedInsighterQueryParam"])?.trim() || "";
        const specifiedInsighterRole = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeSpecifiedInsighterRole"])(searchParams?.get(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["specifiedInsighterRoleQueryParam"]));
        const specifiedInsighterProfileUuid = searchParams?.get(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["specifiedInsighterProfileUuidQueryParam"])?.trim() || specifiedInsighterUuid;
        if (searchParams?.get("fresh") === "1") {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearProjectWizardStorageLocalePair"])(locale);
            if (specifiedInsighterUuid) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeStoredSpecifiedInsighterUuid"])(locale, specifiedInsighterUuid);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeStoredSpecifiedInsighterRole"])(locale, specifiedInsighterRole);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeStoredSpecifiedInsighterProfileUuid"])(locale, specifiedInsighterProfileUuid);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearStoredSpecifiedInsighterDisplay"])(locale);
            } else {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearStoredSpecifiedInsighterUuid"])(locale);
            }
            setSelected(null);
            const nextParams = new URLSearchParams();
            if (specifiedInsighterUuid) {
                nextParams.set(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["specifiedInsighterQueryParam"], specifiedInsighterUuid);
                nextParams.set(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["specifiedInsighterRoleQueryParam"], specifiedInsighterRole);
                nextParams.set(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["specifiedInsighterProfileUuidQueryParam"], specifiedInsighterProfileUuid);
            }
            const nextQuery = nextParams.toString();
            router.replace(`/${locale}/project/wizard/project-type${nextQuery ? `?${nextQuery}` : ""}`, {
                scroll: false
            });
            return;
        }
        if (specifiedInsighterUuid) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeStoredSpecifiedInsighterUuid"])(locale, specifiedInsighterUuid);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeStoredSpecifiedInsighterRole"])(locale, specifiedInsighterRole);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeStoredSpecifiedInsighterProfileUuid"])(locale, specifiedInsighterProfileUuid);
            if (shouldFetchSpecifiedDisplay(locale, specifiedInsighterRole, specifiedInsighterProfileUuid)) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearStoredSpecifiedInsighterDisplay"])(locale);
                void fetchSpecifiedInsighterDisplay({
                    locale,
                    role: specifiedInsighterRole,
                    profileUuid: specifiedInsighterProfileUuid
                });
            }
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredSpecifiedInsighterProfileUuid"])(locale)) {
            const storedRole = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredSpecifiedInsighterRole"])(locale);
            const storedProfileUuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredSpecifiedInsighterProfileUuid"])(locale);
            if (shouldFetchSpecifiedDisplay(locale, storedRole, storedProfileUuid)) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearStoredSpecifiedInsighterDisplay"])(locale);
                void fetchSpecifiedInsighterDisplay({
                    locale,
                    role: storedRole,
                    profileUuid: storedProfileUuid
                });
            }
        }
    }, [
        locale,
        router,
        searchParams
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            const savedRaw = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale));
            const saved = normalizeProjectTypeId(savedRaw);
            if (saved && options.some((o)=>o.id === saved)) {
                setSelected(saved);
                if (savedRaw !== saved) {
                    window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale), saved);
                }
            }
        } catch  {
        // ignore
        }
    }, [
        locale,
        options
    ]);
    const onSelect = (id)=>{
        if (isAdvancing) return;
        setSelected(id);
        try {
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale), id);
        } catch  {
        // ignore
        }
        setIsAdvancing(true);
        nav.goNext();
    };
    const onContinue = ()=>{
        if (!selected || isAdvancing) return;
        setIsAdvancing(true);
        nav.goNext();
    };
    const title = isRTL ? "اختر نوع مشروعك" : "Select your project type";
    const fieldsLabel = isRTL ? "مناسب ل" : "Best for";
    const iconSize = 36;
    const iconStroke = 1.6;
    const optionIcons = {
        ad_hoc: ({ size })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-sky-100 to-cyan-200/60 ring-1 ring-sky-200/70 shadow-[inset_0_-2px_6px_rgba(2,132,199,0.12)]",
                style: {
                    width: size,
                    height: size
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBriefcaseFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBriefcaseFilled$3e$__["IconBriefcaseFilled"], {
                    size: size * 0.55,
                    className: "text-[#0064E1]"
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectTypeQuestion.tsx",
                    lineNumber: 366,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectTypeQuestion.tsx",
                lineNumber: 362,
                columnNumber: 7
            }, this),
        frame_work_agreement: ({ size })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-100 to-pink-200/60 ring-1 ring-fuchsia-200/70 shadow-[inset_0_-2px_6px_rgba(176,0,158,0.12)]",
                style: {
                    width: size,
                    height: size
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconAffiliateFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconAffiliateFilled$3e$__["IconAffiliateFilled"], {
                    size: size * 0.55,
                    className: "text-[#B0009E]"
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectTypeQuestion.tsx",
                    lineNumber: 374,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectTypeQuestion.tsx",
                lineNumber: 370,
                columnNumber: 7
            }, this),
        urgent_request: ({ size })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-orange-200/60 ring-1 ring-amber-200/70 shadow-[inset_0_-2px_6px_rgba(224,135,0,0.15)]",
                style: {
                    width: size,
                    height: size
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBoltFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBoltFilled$3e$__["IconBoltFilled"], {
                    size: size * 0.55,
                    className: "text-[#E08700] animate-pulse"
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectTypeQuestion.tsx",
                    lineNumber: 382,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectTypeQuestion.tsx",
                lineNumber: 378,
                columnNumber: 7
            }, this)
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-4xl mx-auto",
        dir: isRTL ? "rtl" : "ltr",
        children: [
            isEnglish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
          #project-type-question-title {
            font-family: "IBM Plex Serif", serif !important;
          }
        `
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectTypeQuestion.tsx",
                lineNumber: 390,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `transition-all duration-700 ${entered ? "opacity-100 translate-x-0" : isRTL ? "opacity-0 translate-x-4" : "opacity-0 -translate-x-4"}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "project-type-question-title",
                        className: "text-2xl sm:text-3xl font-medium tracking-tight text-slate-900 text-start",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ProjectTypeQuestion.tsx",
                        lineNumber: 404,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$SpecifiedInsighterBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            locale: locale
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/ProjectTypeQuestion.tsx",
                            lineNumber: 411,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ProjectTypeQuestion.tsx",
                        lineNumber: 410,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/ProjectTypeQuestion.tsx",
                lineNumber: 396,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pb-20 sm:pb-0",
                role: "radiogroup",
                "aria-label": title,
                children: options.map((option, index)=>{
                    const isSelected = selected === option.id;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ChoiceCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        checked: isSelected,
                        title: option.title,
                        subtitle: option.subtitle,
                        renderIcon: optionIcons[option.id],
                        onSelect: ()=>onSelect(option.id),
                        entered: entered,
                        isRTL: isRTL,
                        delayMs: 110 + index * 70,
                        align: "start",
                        className: "min-h-[350px]",
                        contentClassName: "!py-5",
                        iconSize: iconSize,
                        iconStroke: iconStroke,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-slate-700 leading-normal",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "list-disc ps-5 space-y-1",
                                    children: option.description.map((line, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: line
                                        }, i, false, {
                                            fileName: "[project]/components/project/questions/ProjectTypeQuestion.tsx",
                                            lineNumber: 443,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/ProjectTypeQuestion.tsx",
                                    lineNumber: 441,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectTypeQuestion.tsx",
                                lineNumber: 440,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-auto pt-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[10px] font-light tracking-wide text-blue-700 uppercase",
                                        children: fieldsLabel
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectTypeQuestion.tsx",
                                        lineNumber: 449,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 flex flex-wrap gap-2",
                                        children: splitCommaList(option.consultingFields).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-gray-700",
                                                children: item
                                            }, item, false, {
                                                fileName: "[project]/components/project/questions/ProjectTypeQuestion.tsx",
                                                lineNumber: 454,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectTypeQuestion.tsx",
                                        lineNumber: 452,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/ProjectTypeQuestion.tsx",
                                lineNumber: 448,
                                columnNumber: 15
                            }, this)
                        ]
                    }, option.id, true, {
                        fileName: "[project]/components/project/questions/ProjectTypeQuestion.tsx",
                        lineNumber: 424,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectTypeQuestion.tsx",
                lineNumber: 415,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto px-4 lg:px-0 w-full max-w-4xl pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: nav.backHref,
                                className: "btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200",
                                children: isRTL ? "رجوع" : "Back"
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectTypeQuestion.tsx",
                                lineNumber: 471,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onContinue,
                                disabled: !selected || isAdvancing,
                                className: `btn-sm px-6 py-2 rounded-full ${selected ? "text-white bg-[#1C7CBB] hover:bg-opacity-90" : "text-slate-500 bg-slate-200 cursor-not-allowed"}`,
                                children: nav.continueLabel
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectTypeQuestion.tsx",
                                lineNumber: 478,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectTypeQuestion.tsx",
                        lineNumber: 470,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectTypeQuestion.tsx",
                    lineNumber: 469,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectTypeQuestion.tsx",
                lineNumber: 468,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/ProjectTypeQuestion.tsx",
        lineNumber: 388,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/questions/ProjectStatusQuestion.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectStatusQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBulbFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBulbFilled$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBulbFilled.mjs [app-ssr] (ecmascript) <export default as IconBulbFilled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDotsFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDotsFilled$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconDotsFilled.mjs [app-ssr] (ecmascript) <export default as IconDotsFilled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTool$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconTool.mjs [app-ssr] (ecmascript) <export default as IconTool>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTrendingUp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconTrendingUp.mjs [app-ssr] (ecmascript) <export default as IconTrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/ProjectSelectedTypeHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ChoiceCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/ChoiceCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectWizardNavigation.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
function getStatusOptions(locale) {
    const isArabic = locale === 'ar';
    if (isArabic) {
        return [
            {
                id: 'idea_stage',
                label: 'مرحلة الفكرة'
            },
            {
                id: 'expansion',
                label: 'التوسع'
            },
            {
                id: 'implementation',
                label: 'التنفيذ'
            }
        ];
    }
    return [
        {
            id: 'idea_stage',
            label: 'Idea stage'
        },
        {
            id: 'expansion',
            label: 'Expansion'
        },
        {
            id: 'implementation',
            label: 'Implementation'
        }
    ];
}
function ProjectStatusQuestion({ locale }) {
    const isRTL = locale === 'ar';
    const isEnglish = typeof locale === 'string' && locale.toLowerCase().startsWith('en');
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const options = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>getStatusOptions(locale), [
        locale
    ]);
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [projectType, setProjectType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [otherValue, setOtherValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = window.setTimeout(()=>setEntered(true), 30);
        return ()=>window.clearTimeout(timer);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            const savedType = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale));
            setProjectType(savedType);
            const savedStatus = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectStatusKey(locale));
            if (savedStatus) {
                const match = options.find((o)=>o.label === savedStatus);
                if (match) {
                    setSelectedId(match.id);
                } else {
                    setSelectedId('other');
                    setOtherValue(savedStatus);
                }
            }
        } catch  {
        // ignore
        }
    }, [
        locale,
        options
    ]);
    const selectedValue = selectedId === 'other' ? otherValue.trim() : selectedId ? options.find((o)=>o.id === selectedId)?.label ?? '' : '';
    const canContinue = selectedId !== null && selectedValue.length > 0;
    const title = isRTL ? 'ما هي حالة مشروعك الحالية؟' : 'What is your current <br> project status ?';
    const persistAndContinue = (value)=>{
        try {
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectStatusKey(locale), value);
        } catch  {
        // ignore
        }
        nav.goNext();
    };
    const onSelect = (id)=>{
        setSelectedId(id);
        if (id !== 'other') setOtherValue('');
        if (id !== 'other') {
            const nextValue = options.find((o)=>o.id === id)?.label;
            if (nextValue) persistAndContinue(nextValue);
        }
    };
    const onContinue = ()=>{
        if (!canContinue) return;
        persistAndContinue(selectedValue);
    };
    const iconSize = 56;
    const iconStroke = 1.6;
    const iconBadgeBase = 'inline-flex h-full w-full items-center justify-center rounded-2xl border shadow-sm';
    const optionIcons = {
        idea_stage: ({ size })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `${iconBadgeBase} border-amber-200/80 bg-gradient-to-br from-amber-50 to-amber-100/80 text-amber-500`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBulbFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBulbFilled$3e$__["IconBulbFilled"], {
                    size: size * 0.55
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectStatusQuestion.tsx",
                    lineNumber: 141,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectStatusQuestion.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
        expansion: ({ size })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `${iconBadgeBase} border-emerald-200/80 bg-gradient-to-br from-emerald-50 to-emerald-100/80 text-emerald-600`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTrendingUp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTrendingUp$3e$__["IconTrendingUp"], {
                    size: size * 0.55,
                    stroke: 2.6
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectStatusQuestion.tsx",
                    lineNumber: 148,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectStatusQuestion.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, this),
        implementation: ({ size })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `${iconBadgeBase} border-sky-200/80 bg-gradient-to-br from-sky-50 to-sky-100/80 text-sky-600`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTool$3e$__["IconTool"], {
                    size: size * 0.55,
                    stroke: 2.4
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectStatusQuestion.tsx",
                    lineNumber: 155,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectStatusQuestion.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this),
        other: ({ size })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `${iconBadgeBase} border-slate-200/80 bg-gradient-to-br from-slate-100 to-slate-200/80 text-slate-600`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDotsFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDotsFilled$3e$__["IconDotsFilled"], {
                    size: size * 0.55
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectStatusQuestion.tsx",
                    lineNumber: 162,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectStatusQuestion.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, this)
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-4xl mx-auto min-h-full flex flex-col",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 pb-28",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        locale: locale,
                        entered: entered,
                        projectTypeId: projectType
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ProjectStatusQuestion.tsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mt-2 text-start transition-all duration-700 ${entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'}`,
                        children: [
                            isEnglish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                children: `
              #project-status-question-title {
                font-family: "IBM Plex Serif", serif !important;
              }
            `
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectStatusQuestion.tsx",
                                lineNumber: 189,
                                columnNumber: 13
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "project-status-question-title",
                                className: "text-2xl sm:text-3xl font-medium tracking-tight text-slate-900 text-start",
                                dangerouslySetInnerHTML: {
                                    __html: title
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectStatusQuestion.tsx",
                                lineNumber: 195,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectStatusQuestion.tsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 sm:mt-20",
                        role: "radiogroup",
                        "aria-label": title,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3",
                                children: [
                                    options.map((opt, index)=>{
                                        const isSelected = selectedId === opt.id;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ChoiceCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            checked: isSelected,
                                            title: opt.label,
                                            renderIcon: optionIcons[opt.id],
                                            onSelect: ()=>onSelect(opt.id),
                                            entered: entered,
                                            isRTL: isRTL,
                                            delayMs: 110 + index * 70,
                                            align: "center",
                                            className: "min-h-[170px]",
                                            iconSize: iconSize,
                                            iconStroke: iconStroke
                                        }, opt.id, false, {
                                            fileName: "[project]/components/project/questions/ProjectStatusQuestion.tsx",
                                            lineNumber: 207,
                                            columnNumber: 17
                                        }, this);
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ChoiceCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        checked: selectedId === 'other',
                                        title: isRTL ? 'أخرى' : 'Other',
                                        renderIcon: optionIcons.other,
                                        onSelect: ()=>onSelect('other'),
                                        entered: entered,
                                        isRTL: isRTL,
                                        delayMs: 110 + options.length * 70,
                                        align: "center",
                                        className: "min-h-[170px]",
                                        iconSize: iconSize,
                                        iconStroke: iconStroke
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectStatusQuestion.tsx",
                                        lineNumber: 224,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/ProjectStatusQuestion.tsx",
                                lineNumber: 203,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `mt-3 rounded-2xl border shadow-sm backdrop-blur-md transition-all duration-500 overflow-hidden ${selectedId === 'other' ? 'border-blue-300 bg-white/60 max-h-32 opacity-100' : 'border-white/30 bg-white/35 max-h-0 opacity-0'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-5 py-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: otherValue,
                                        onChange: (e)=>setOtherValue(e.target.value),
                                        placeholder: isRTL ? 'اكتب الحالة هنا…' : 'Type your status…',
                                        className: "w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectStatusQuestion.tsx",
                                        lineNumber: 247,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/ProjectStatusQuestion.tsx",
                                    lineNumber: 246,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectStatusQuestion.tsx",
                                lineNumber: 239,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectStatusQuestion.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/ProjectStatusQuestion.tsx",
                lineNumber: 172,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed left-0 right-0 z-20 bottom-0 border-t border-slate-200/70 bg-white/80 backdrop-blur-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: nav.backHref,
                                className: "btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200",
                                children: isRTL ? 'رجوع' : 'Back'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectStatusQuestion.tsx",
                                lineNumber: 261,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onContinue,
                                disabled: !canContinue,
                                className: `btn-sm px-6 py-2 rounded-full ${canContinue ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90' : 'text-slate-500 bg-slate-200 cursor-not-allowed'}`,
                                children: nav.continueLabel
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectStatusQuestion.tsx",
                                lineNumber: 268,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectStatusQuestion.tsx",
                        lineNumber: 260,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectStatusQuestion.tsx",
                    lineNumber: 259,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectStatusQuestion.tsx",
                lineNumber: 258,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/ProjectStatusQuestion.tsx",
        lineNumber: 168,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/questions/WhoAreYouQuestion.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WhoAreYouQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuildingBank$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuildingBank$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBuildingBank.mjs [app-ssr] (ecmascript) <export default as IconBuildingBank>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuildingCommunity$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuildingCommunity$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBuildingCommunity.mjs [app-ssr] (ecmascript) <export default as IconBuildingCommunity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuildingSkyscraper$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuildingSkyscraper$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBuildingSkyscraper.mjs [app-ssr] (ecmascript) <export default as IconBuildingSkyscraper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuildingStore$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuildingStore$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBuildingStore.mjs [app-ssr] (ecmascript) <export default as IconBuildingStore>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDotsFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDotsFilled$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconDotsFilled.mjs [app-ssr] (ecmascript) <export default as IconDotsFilled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconRocket$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconRocket$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconRocket.mjs [app-ssr] (ecmascript) <export default as IconRocket>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconUserFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconUserFilled$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconUserFilled.mjs [app-ssr] (ecmascript) <export default as IconUserFilled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/ProjectSelectedTypeHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectWizardNavigation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ChoiceCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/ChoiceCard.tsx [app-ssr] (ecmascript)");
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
function getOptions(locale) {
    const isRTL = locale === 'ar';
    if (isRTL) {
        return [
            {
                value: 'Entrepreneur',
                label: 'رائد أعمال'
            },
            {
                value: 'Startup',
                label: 'شركة ناشئة'
            },
            {
                value: 'SME',
                label: 'شركة صغيرة/متوسطة'
            },
            {
                value: 'Company',
                label: 'شركة'
            },
            {
                value: 'Organization',
                label: 'منظمة'
            },
            {
                value: 'Government',
                label: 'حكومة'
            }
        ];
    }
    return [
        {
            value: 'Entrepreneur',
            label: 'Entrepreneur'
        },
        {
            value: 'Startup',
            label: 'Startup'
        },
        {
            value: 'SME',
            label: 'SME'
        },
        {
            value: 'Company',
            label: 'Company'
        },
        {
            value: 'Organization',
            label: 'Organization'
        },
        {
            value: 'Government',
            label: 'Government'
        }
    ];
}
function WhoAreYouQuestion({ locale }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const isRTL = locale === 'ar';
    const isEnglish = typeof locale === 'string' && locale.toLowerCase().startsWith('en');
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const options = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>getOptions(locale), [
        locale
    ]);
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [projectType, setProjectType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedValue, setSelectedValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [otherValue, setOtherValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = window.setTimeout(()=>setEntered(true), 30);
        return ()=>window.clearTimeout(timer);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            setProjectType(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale)));
            const saved = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].whoAreYouKey(locale));
            if (!saved) return;
            const match = options.find((o)=>o.value === saved);
            if (match) {
                setSelectedValue(match.value);
            } else {
                setSelectedValue('Other');
                setOtherValue(saved);
            }
        } catch  {
        // ignore
        }
    }, [
        locale,
        options
    ]);
    const title = isRTL ? 'من أنت؟' : 'Who are you ?';
    const otherLabel = isRTL ? 'أخرى' : 'Other';
    const finalValue = selectedValue === 'Other' ? otherValue.trim() : selectedValue ?? '';
    const canContinue = finalValue.length > 0;
    const persistAndContinue = (value)=>{
        try {
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].whoAreYouKey(locale), value);
        } catch  {
        // ignore
        }
        if (nav.nextHref) {
            router.push(nav.nextHref);
        } else {
            router.push(`/${locale}/project`);
        }
    };
    const onContinue = ()=>{
        if (!canContinue) return;
        persistAndContinue(finalValue);
    };
    const onSelect = (value)=>{
        setSelectedValue(value);
        if (value !== 'Other') setOtherValue('');
        if (value !== 'Other') {
            persistAndContinue(value);
        }
    };
    const iconSize = 44;
    const iconStroke = 1.6;
    const iconBadgeBase = 'inline-flex h-full w-full items-center justify-center rounded-2xl border shadow-sm';
    const optionIcons = {
        Entrepreneur: ({ size })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `${iconBadgeBase} border-amber-200/80 bg-gradient-to-br from-amber-50 to-amber-100/80 text-amber-600`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconUserFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconUserFilled$3e$__["IconUserFilled"], {
                    size: size * 0.58
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                    lineNumber: 145,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, this),
        Startup: ({ size })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `${iconBadgeBase} border-sky-200/80 bg-gradient-to-br from-sky-50 to-sky-100/80 text-sky-600`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconRocket$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconRocket$3e$__["IconRocket"], {
                    size: size * 0.58,
                    stroke: 2.4
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                    lineNumber: 152,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this),
        SME: ({ size })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `${iconBadgeBase} border-emerald-200/80 bg-gradient-to-br from-emerald-50 to-emerald-100/80 text-emerald-600`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuildingStore$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuildingStore$3e$__["IconBuildingStore"], {
                    size: size * 0.58,
                    stroke: 2.4
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                    lineNumber: 159,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, this),
        Company: ({ size })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `${iconBadgeBase} border-violet-200/80 bg-gradient-to-br from-violet-50 to-violet-100/80 text-violet-600`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuildingSkyscraper$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuildingSkyscraper$3e$__["IconBuildingSkyscraper"], {
                    size: size * 0.58,
                    stroke: 2.4
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                    lineNumber: 166,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, this),
        Organization: ({ size })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `${iconBadgeBase} border-cyan-200/80 bg-gradient-to-br from-cyan-50 to-cyan-100/80 text-cyan-600`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuildingCommunity$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuildingCommunity$3e$__["IconBuildingCommunity"], {
                    size: size * 0.58,
                    stroke: 2.4
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                    lineNumber: 173,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                lineNumber: 170,
                columnNumber: 7
            }, this),
        Government: ({ size })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `${iconBadgeBase} border-slate-200/80 bg-gradient-to-br from-slate-100 to-slate-200/80 text-slate-700`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuildingBank$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuildingBank$3e$__["IconBuildingBank"], {
                    size: size * 0.58,
                    stroke: 2.4
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                    lineNumber: 180,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this),
        Other: ({ size })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `${iconBadgeBase} border-slate-200/80 bg-gradient-to-br from-slate-100 to-slate-200/80 text-slate-600`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDotsFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDotsFilled$3e$__["IconDotsFilled"], {
                    size: size * 0.58
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                    lineNumber: 187,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this)
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-4xl mx-auto min-h-full flex flex-col",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 pb-28",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        locale: locale,
                        entered: entered,
                        projectTypeId: projectType
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                        lineNumber: 198,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mt-2 text-start transition-all duration-700 ${entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'}`,
                        children: [
                            isEnglish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                children: `
              #who-are-you-question-title {
                font-family: "IBM Plex Serif", serif !important;
              }
            `
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                                lineNumber: 214,
                                columnNumber: 13
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "who-are-you-question-title",
                                className: "text-2xl sm:text-3xl font-medium tracking-tight text-slate-900",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                                lineNumber: 220,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 sm:mt-20",
                        role: "radiogroup",
                        "aria-label": title,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3",
                                children: [
                                    options.map((opt, index)=>{
                                        const isSelected = selectedValue === opt.value;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ChoiceCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            size: "sm",
                                            checked: isSelected,
                                            title: opt.label,
                                            renderIcon: optionIcons[opt.value],
                                            onSelect: ()=>onSelect(opt.value),
                                            entered: entered,
                                            isRTL: isRTL,
                                            delayMs: 110 + index * 55,
                                            align: "center",
                                            className: "min-h-[140px]",
                                            iconSize: iconSize,
                                            iconStroke: iconStroke
                                        }, opt.value, false, {
                                            fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                                            lineNumber: 233,
                                            columnNumber: 17
                                        }, this);
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ChoiceCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        checked: selectedValue === 'Other',
                                        title: otherLabel,
                                        renderIcon: optionIcons.Other,
                                        onSelect: ()=>onSelect('Other'),
                                        entered: entered,
                                        isRTL: isRTL,
                                        delayMs: 110 + options.length * 55,
                                        align: "center",
                                        size: "sm",
                                        className: "min-h-[140px]",
                                        iconSize: iconSize,
                                        iconStroke: iconStroke
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                                        lineNumber: 251,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                                lineNumber: 229,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `mt-3 rounded-2xl border shadow-sm backdrop-blur-md transition-all duration-500 overflow-hidden ${selectedValue === 'Other' ? 'border-blue-300 bg-white/60 max-h-32 opacity-100' : 'border-white/30 bg-white/35 max-h-0 opacity-0'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-5 py-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: otherValue,
                                        onChange: (e)=>setOtherValue(e.target.value),
                                        placeholder: isRTL ? 'اكتب هنا…' : 'Type here…',
                                        className: "w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                                        lineNumber: 275,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                                    lineNumber: 274,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                                lineNumber: 267,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                        lineNumber: 228,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                lineNumber: 197,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed left-0 right-0 z-20 bottom-0 border-t border-slate-200/70 bg-white/80 backdrop-blur-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: nav.backHref,
                                className: "btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200",
                                children: isRTL ? 'رجوع' : 'Back'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                                lineNumber: 289,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onContinue,
                                disabled: !canContinue,
                                className: `btn-sm px-6 py-2 rounded-full ${canContinue ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90' : 'text-slate-500 bg-slate-200 cursor-not-allowed'}`,
                                children: nav.continueLabel
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                                lineNumber: 296,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                        lineNumber: 288,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                    lineNumber: 287,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
                lineNumber: 286,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/WhoAreYouQuestion.tsx",
        lineNumber: 193,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/questions/PreferredInsighterTypeQuestion.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PreferredInsighterTypeQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuilding$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuilding$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBuilding.mjs [app-ssr] (ecmascript) <export default as IconBuilding>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconUserFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconUserFilled$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconUserFilled.mjs [app-ssr] (ecmascript) <export default as IconUserFilled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconUsersGroup$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconUsersGroup$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconUsersGroup.mjs [app-ssr] (ecmascript) <export default as IconUsersGroup>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/ProjectSelectedTypeHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectWizardNavigation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ChoiceCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/ChoiceCard.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
function getOptions(locale) {
    const isRTL = locale === 'ar';
    if (isRTL) {
        return [
            {
                value: 'Individual',
                label: 'فرد'
            },
            {
                value: 'Company',
                label: 'شركة'
            },
            {
                value: 'Either',
                label: 'كلاهما'
            }
        ];
    }
    return [
        {
            value: 'Individual',
            label: 'Individual'
        },
        {
            value: 'Company',
            label: 'Company'
        },
        {
            value: 'Either',
            label: 'Any'
        }
    ];
}
function PreferredInsighterTypeQuestion({ locale }) {
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const isRTL = locale === 'ar';
    const isEnglish = typeof locale === 'string' && locale.toLowerCase().startsWith('en');
    const options = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>getOptions(locale), [
        locale
    ]);
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [projectType, setProjectType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = window.setTimeout(()=>setEntered(true), 30);
        return ()=>window.clearTimeout(timer);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            setProjectType(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale)));
            const saved = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].preferredInsighterTypeKey(locale));
            if (saved === 'Individual' || saved === 'Company' || saved === 'Either') {
                setSelected(saved);
            }
        } catch  {
        // ignore
        }
    }, [
        locale
    ]);
    const title = isRTL ? 'ما نوع الخبير الذي تفضله لتنفيذ هذا المشروع؟' : 'What type of expert (insighter) do you prefer to conduct this project?';
    const canContinue = selected !== null;
    const persistAndContinue = (value)=>{
        try {
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].preferredInsighterTypeKey(locale), value);
        } catch  {
        // ignore
        }
        nav.goNext();
    };
    const onContinue = ()=>{
        if (!selected) return;
        persistAndContinue(selected);
    };
    const onSelect = (value)=>{
        setSelected(value);
        persistAndContinue(value);
    };
    const iconBadgeBase = 'inline-flex h-full w-full items-center justify-center rounded-2xl border shadow-sm';
    const optionIcons = {
        Individual: ({ size })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `${iconBadgeBase} border-amber-200/80 bg-gradient-to-br from-amber-50 to-amber-100/80 text-amber-600`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconUserFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconUserFilled$3e$__["IconUserFilled"], {
                    size: size * 0.58
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/PreferredInsighterTypeQuestion.tsx",
                    lineNumber: 121,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/PreferredInsighterTypeQuestion.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
        Company: ({ size })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `${iconBadgeBase} border-sky-200/80 bg-gradient-to-br from-sky-50 to-sky-100/80 text-sky-600`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuilding$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuilding$3e$__["IconBuilding"], {
                    size: size * 0.58,
                    stroke: 2.4
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/PreferredInsighterTypeQuestion.tsx",
                    lineNumber: 128,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/PreferredInsighterTypeQuestion.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this),
        Either: ({ size })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `${iconBadgeBase} border-emerald-200/80 bg-gradient-to-br from-emerald-50 to-emerald-100/80 text-emerald-600`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconUsersGroup$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconUsersGroup$3e$__["IconUsersGroup"], {
                    size: size * 0.58,
                    stroke: 2.4
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/PreferredInsighterTypeQuestion.tsx",
                    lineNumber: 135,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/PreferredInsighterTypeQuestion.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this)
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-4xl mx-auto min-h-full flex flex-col",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 pb-28",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        locale: locale,
                        entered: entered,
                        projectTypeId: projectType
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/PreferredInsighterTypeQuestion.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mt-2 text-start transition-all duration-700 ${entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'}`,
                        children: [
                            isEnglish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                children: `
              #preferred-insighter-type-question-title {
                font-family: "IBM Plex Serif", serif !important;
              }
            `
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/PreferredInsighterTypeQuestion.tsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "preferred-insighter-type-question-title",
                                className: "text-2xl sm:text-3xl font-medium tracking-tight text-slate-900",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/PreferredInsighterTypeQuestion.tsx",
                                lineNumber: 168,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/PreferredInsighterTypeQuestion.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 sm:mt-20",
                        role: "radiogroup",
                        "aria-label": title,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
                            children: options.map((opt, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ChoiceCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    checked: selected === opt.value,
                                    title: opt.label,
                                    renderIcon: optionIcons[opt.value],
                                    iconSize: 56,
                                    iconStroke: 1.6,
                                    onSelect: ()=>onSelect(opt.value),
                                    entered: entered,
                                    isRTL: isRTL,
                                    delayMs: 110 + index * 70,
                                    align: "center",
                                    size: "sm",
                                    className: "min-h-[170px]"
                                }, opt.value, false, {
                                    fileName: "[project]/components/project/questions/PreferredInsighterTypeQuestion.tsx",
                                    lineNumber: 179,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/PreferredInsighterTypeQuestion.tsx",
                            lineNumber: 177,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/PreferredInsighterTypeQuestion.tsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/PreferredInsighterTypeQuestion.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed left-0 right-0 z-20 bottom-0 border-t border-slate-200/70 bg-white/80 backdrop-blur-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: nav.backHref,
                                className: "btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200",
                                children: isRTL ? 'رجوع' : 'Back'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/PreferredInsighterTypeQuestion.tsx",
                                lineNumber: 202,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onContinue,
                                disabled: !canContinue,
                                className: `btn-sm px-6 py-2 rounded-full ${canContinue ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90' : 'text-slate-500 bg-slate-200 cursor-not-allowed'}`,
                                children: nav.continueLabel
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/PreferredInsighterTypeQuestion.tsx",
                                lineNumber: 209,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/PreferredInsighterTypeQuestion.tsx",
                        lineNumber: 201,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/PreferredInsighterTypeQuestion.tsx",
                    lineNumber: 200,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/PreferredInsighterTypeQuestion.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/PreferredInsighterTypeQuestion.tsx",
        lineNumber: 141,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/questions/InsighterOriginQuestion.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InsighterOriginQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconMapPinFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconMapPinFilled$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconMapPinFilled.mjs [app-ssr] (ecmascript) <export default as IconMapPinFilled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconWorldFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconWorldFilled$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconWorldFilled.mjs [app-ssr] (ecmascript) <export default as IconWorldFilled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectPropertiesSync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectPropertiesSync.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectStepErrorToast.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/ProjectSelectedTypeHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectWizardFlow.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectWizardNavigation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ChoiceCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/ChoiceCard.tsx [app-ssr] (ecmascript)");
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
function getDisplayName(locale, value) {
    if (locale === 'ar') return value.names?.ar || value.name || '';
    return value.names?.en || value.name || '';
}
async function fetchList(path, locale) {
    const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(path), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Accept-Language': locale === 'ar' ? 'ar' : 'en'
        },
        cache: 'no-store'
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res);
    const json = await res.json();
    return json.data || [];
}
function getOriginOptions(locale) {
    if (locale === 'ar') {
        return [
            {
                value: 'country',
                label: 'دولة'
            },
            {
                value: 'region',
                label: 'منطقة'
            }
        ];
    }
    return [
        {
            value: 'country',
            label: 'Country'
        },
        {
            value: 'region',
            label: 'Region'
        }
    ];
}
function InsighterOriginQuestion({ locale }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const isRTL = locale === 'ar';
    const isEnglish = typeof locale === 'string' && locale.toLowerCase().startsWith('en');
    const originOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>getOriginOptions(locale), [
        locale
    ]);
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [projectType, setProjectType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [preferredInsighterType, setPreferredInsighterType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [originType, setOriginType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [originId, setOriginId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [countries, setCountries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [regions, setRegions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"])(error, locale);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = window.setTimeout(()=>setEntered(true), 30);
        return ()=>window.clearTimeout(timer);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            setProjectType(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale)));
            const savedPreferred = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].preferredInsighterTypeKey(locale));
            if (savedPreferred === 'Individual' || savedPreferred === 'Company' || savedPreferred === 'Either') {
                setPreferredInsighterType(savedPreferred);
            }
            const savedOriginType = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterOriginTypeKey(locale));
            if (savedOriginType === 'country' || savedOriginType === 'region') {
                setOriginType(savedOriginType);
            }
            setOriginId(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterOriginIdKey(locale)) || '');
        } catch  {
        // ignore
        }
    }, [
        locale
    ]);
    const title = isRTL ? 'ما هو الأصل المفضل لهذا الخبير؟' : 'What should be the origin of this insighter?';
    const subtitle = isRTL ? 'اختر دولة واحدة أو منطقة واحدة، أو اجعلها لكل العالم.' : 'Select one country, one region, or make it worldwide.';
    const shouldDeferPropertiesSync = nav.nextStepId === __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].insighterExperience || nav.nextStepId === __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].companyTeamSize;
    const finishSync = async ()=>{
        setSubmitting(true);
        setError(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectPropertiesSync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syncProjectProperties"])(locale);
            if (nav.nextHref) {
                nav.goNext();
                return;
            }
            router.push(`/${locale}/project`);
        } catch (err) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر حفظ خصائص المشروع.' : 'Failed to save project properties.'));
        } finally{
            setSubmitting(false);
        }
    };
    const ensureCountries = async ()=>{
        if (countries) return;
        setLoading('country');
        setError(null);
        try {
            const list = await fetchList('/api/common/setting/country/list', locale);
            setCountries(list.filter((country)=>country.status !== 'inactive'));
        } catch (err) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر تحميل الدول.' : 'Failed to load countries.'));
            setCountries([]);
        } finally{
            setLoading(null);
        }
    };
    const ensureRegions = async ()=>{
        if (regions) return;
        setLoading('region');
        setError(null);
        try {
            const list = await fetchList('/api/common/setting/region/list', locale);
            setRegions(list);
        } catch (err) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر تحميل المناطق.' : 'Failed to load regions.'));
            setRegions([]);
        } finally{
            setLoading(null);
        }
    };
    const onSelectOriginType = async (value)=>{
        setOriginType(value);
        setOriginId('');
        setQuery('');
        setError(null);
        if (value === 'country') {
            await ensureCountries();
            return;
        }
        await ensureRegions();
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (originType === 'country') void ensureCountries();
        if (originType === 'region') void ensureRegions();
    }, [
        originType
    ]);
    const entries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const normalizedQuery = query.trim().toLowerCase();
        if (originType === 'country') {
            const list = countries || [];
            if (!normalizedQuery) return list;
            return list.filter((country)=>{
                const localized = getDisplayName(locale, country).toLowerCase();
                const en = (country.names?.en || '').toLowerCase();
                const ar = (country.names?.ar || '').toLowerCase();
                return localized.includes(normalizedQuery) || en.includes(normalizedQuery) || ar.includes(normalizedQuery);
            });
        }
        const list = regions || [];
        if (!normalizedQuery) return list;
        return list.filter((region)=>region.name.toLowerCase().includes(normalizedQuery));
    }, [
        countries,
        locale,
        originType,
        query,
        regions
    ]);
    const selectedOrigin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!originType || !originId) return null;
        if (originType === 'country') {
            const country = (countries || []).find((item)=>String(item.id) === originId);
            if (!country) return null;
            return {
                label: getDisplayName(locale, country) || `#${originId}`,
                flagSrc: country.flag ? `/images/flags/${country.flag}.svg` : null
            };
        }
        const region = (regions || []).find((item)=>String(item.id) === originId);
        if (!region) return null;
        return {
            label: region.name,
            flagSrc: null
        };
    }, [
        countries,
        locale,
        originId,
        originType,
        regions
    ]);
    const canContinue = Boolean(originType && originId);
    const iconBadgeBase = 'inline-flex h-full w-full items-center justify-center rounded-2xl border shadow-sm';
    const optionIcons = {
        country: ({ size })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `${iconBadgeBase} border-sky-200/80 bg-gradient-to-br from-sky-50 to-sky-100/80 text-sky-600`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconWorldFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconWorldFilled$3e$__["IconWorldFilled"], {
                    size: size * 0.58
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                    lineNumber: 315,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                lineNumber: 312,
                columnNumber: 7
            }, this),
        region: ({ size })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `${iconBadgeBase} border-emerald-200/80 bg-gradient-to-br from-emerald-50 to-emerald-100/80 text-emerald-600`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconMapPinFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconMapPinFilled$3e$__["IconMapPinFilled"], {
                    size: size * 0.58
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                    lineNumber: 322,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                lineNumber: 319,
                columnNumber: 7
            }, this)
    };
    const renderWorldwideIcon = ({ size })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: `${iconBadgeBase} border-amber-200/80 bg-gradient-to-br from-amber-50 to-yellow-100/80 text-amber-600`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconWorldFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconWorldFilled$3e$__["IconWorldFilled"], {
                size: size * 0.58
            }, void 0, false, {
                fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                lineNumber: 330,
                columnNumber: 7
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
            lineNumber: 327,
            columnNumber: 5
        }, this);
    const onContinue = async ()=>{
        if (!originType || !originId || submitting) return;
        try {
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterOriginTypeKey(locale), originType);
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterOriginIdKey(locale), originId);
        } catch  {
        // ignore
        }
        if (shouldDeferPropertiesSync && nav.nextHref) {
            nav.goNext();
            return;
        }
        await finishSync();
    };
    const onSkip = async ()=>{
        if (submitting) return;
        try {
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterOriginTypeKey(locale), '');
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterOriginIdKey(locale), '');
        } catch  {
        // ignore
        }
        if (shouldDeferPropertiesSync && nav.nextHref) {
            nav.goNext();
            return;
        }
        await finishSync();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-5xl mx-auto min-h-full flex flex-col",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 pb-32",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        locale: locale,
                        entered: entered,
                        projectTypeId: projectType
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                        lineNumber: 385,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mt-2 text-start transition-all duration-700 ${entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'}`,
                        children: [
                            isEnglish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                children: `
              #insighter-origin-question-title {
                font-family: "IBM Plex Serif", serif !important;
              }
            `
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                                lineNumber: 400,
                                columnNumber: 13
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "insighter-origin-question-title",
                                className: "text-2xl sm:text-3xl font-medium tracking-tight text-slate-900",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                                lineNumber: 406,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm font-semibold text-slate-600",
                                children: subtitle
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                                lineNumber: 412,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                        lineNumber: 391,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 sm:mt-20",
                        role: "radiogroup",
                        "aria-label": title,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ChoiceCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    checked: false,
                                    title: isRTL ? 'كل العالم' : 'Worldwide',
                                    renderIcon: renderWorldwideIcon,
                                    onSelect: ()=>void onSkip(),
                                    entered: entered,
                                    isRTL: isRTL,
                                    delayMs: 110,
                                    align: "center",
                                    size: "sm",
                                    className: "min-h-[150px]",
                                    iconSize: 56,
                                    iconStroke: 1.6
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                                    lineNumber: 418,
                                    columnNumber: 13
                                }, this),
                                originOptions.map((option, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ChoiceCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        checked: originType === option.value,
                                        title: option.label,
                                        renderIcon: optionIcons[option.value],
                                        onSelect: ()=>void onSelectOriginType(option.value),
                                        entered: entered,
                                        isRTL: isRTL,
                                        delayMs: 180 + index * 70,
                                        align: "center",
                                        size: "sm",
                                        className: "min-h-[150px]",
                                        iconSize: 56,
                                        iconStroke: 1.6
                                    }, option.value, false, {
                                        fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                                        lineNumber: 433,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                            lineNumber: 417,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                        lineNumber: 416,
                        columnNumber: 9
                    }, this),
                    originType ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mt-4 transition-all duration-700 ${entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'}`,
                        style: {
                            transitionDelay: '320ms'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-3xl border border-white/30 bg-white/45 p-4 shadow-sm backdrop-blur-md",
                            children: [
                                selectedOrigin ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-4 rounded-2xl border border-blue-100 bg-white/70 px-4 py-3 shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-2 text-xs font-bold uppercase tracking-wide text-slate-500",
                                            children: isRTL ? 'اختيارك' : 'Selected'
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                                            lineNumber: 465,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1.5 text-sm font-semibold text-slate-800 shadow-sm ${isRTL ? 'flex-row-reverse' : ''}`,
                                                children: [
                                                    selectedOrigin.flagSrc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: selectedOrigin.flagSrc,
                                                        alt: "",
                                                        className: "h-4 w-4 object-contain"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                                                        lineNumber: 473,
                                                        columnNumber: 25
                                                    }, this) : null,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: selectedOrigin.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                                                        lineNumber: 475,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setOriginId(''),
                                                        "aria-label": isRTL ? 'إزالة الاختيار' : 'Remove selection',
                                                        className: "inline-flex h-5 w-5 items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-500",
                                                        children: "×"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                                                        lineNumber: 476,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                                                lineNumber: 469,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                                            lineNumber: 468,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                                    lineNumber: 464,
                                    columnNumber: 17
                                }, this) : null,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: query,
                                    onChange: (event)=>setQuery(event.target.value),
                                    placeholder: originType === 'country' ? isRTL ? 'ابحث عن دولة...' : 'Search country...' : isRTL ? 'ابحث عن منطقة...' : 'Search region...',
                                    className: "w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                                    lineNumber: 489,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 max-h-[340px] overflow-auto pr-1",
                                    children: loading === originType ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm font-semibold text-slate-600",
                                        children: isRTL ? 'جاري التحميل…' : 'Loading…'
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                                        lineNumber: 506,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2",
                                        children: entries.map((entry)=>{
                                            const entryId = String(entry.id);
                                            const isSelected = originId === entryId;
                                            const countryEntry = originType === 'country' ? entry : null;
                                            const label = originType === 'country' ? getDisplayName(locale, countryEntry) || `#${entryId}` : entry.name;
                                            const flagSrc = countryEntry?.flag ? `/images/flags/${countryEntry.flag}.svg` : null;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                "aria-pressed": isSelected,
                                                onClick: ()=>setOriginId(entryId),
                                                className: `flex items-center gap-3 rounded-2xl border px-3 py-3 text-start transition-colors ${isSelected ? 'border-blue-300 bg-white/75' : 'border-white/30 bg-white/40 hover:bg-white/55'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${isSelected ? 'border-blue-600' : 'border-slate-300'} bg-white/80`,
                                                        "aria-hidden": "true",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `h-2.5 w-2.5 rounded-full ${isSelected ? 'bg-blue-600' : 'bg-transparent'}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                                                            lineNumber: 540,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                                                        lineNumber: 535,
                                                        columnNumber: 27
                                                    }, this),
                                                    flagSrc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: flagSrc,
                                                        alt: "",
                                                        className: "h-4 w-4 object-contain opacity-90",
                                                        onError: (e)=>{
                                                            ;
                                                            e.currentTarget.style.display = 'none';
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                                                        lineNumber: 547,
                                                        columnNumber: 29
                                                    }, this) : null,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-semibold text-slate-900",
                                                        children: label
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                                                        lineNumber: 558,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, entryId, true, {
                                                fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                                                lineNumber: 525,
                                                columnNumber: 25
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                                        lineNumber: 510,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                                    lineNumber: 504,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                            lineNumber: 462,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                        lineNumber: 453,
                        columnNumber: 11
                    }, this) : null,
                    error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 text-sm font-semibold text-rose-700",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                        lineNumber: 572,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                lineNumber: 384,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: nav.backHref,
                                className: "btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200",
                                children: isRTL ? 'رجوع' : 'Back'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                                lineNumber: 579,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>void onSkip(),
                                        disabled: submitting,
                                        className: "btn-sm px-5 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200 disabled:cursor-not-allowed disabled:opacity-60",
                                        children: isRTL ? 'تخطي' : 'Skip'
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                                        lineNumber: 587,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>void onContinue(),
                                        disabled: !canContinue || submitting,
                                        className: `btn-sm px-6 py-2 rounded-full ${canContinue && !submitting ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90' : 'text-slate-500 bg-slate-200 cursor-not-allowed'}`,
                                        children: submitting ? isRTL ? 'جاري الحفظ...' : 'Saving...' : nav.continueLabel
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                                        lineNumber: 596,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                                lineNumber: 586,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                        lineNumber: 578,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                    lineNumber: 577,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
                lineNumber: 576,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/InsighterOriginQuestion.tsx",
        lineNumber: 380,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/questions/ProjectPropertiesNumericRangeQuestion.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectPropertiesNumericRangeQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Slider$2f$Slider$2f$Slider$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Slider/Slider/Slider.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectPropertiesSync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectPropertiesSync.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectStepErrorToast.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/ProjectSelectedTypeHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectWizardNavigation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
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
function sanitizeNumericInput(value) {
    return value.replace(/[^\d]/g, '');
}
function clampNumber(value, min, max) {
    return Math.min(max, Math.max(min, value));
}
function parseStoredNumber(value) {
    if (!value) return null;
    const digits = sanitizeNumericInput(value);
    if (!digits) return null;
    const parsed = Number(digits);
    return Number.isFinite(parsed) ? parsed : null;
}
function ProjectPropertiesNumericRangeQuestion({ locale, title, titleId, minLabel, maxLabel, minStorageKey, maxStorageKey, invalidRangeText, saveErrorText, sliderMin, sliderMax, sliderStep = 1, sliderMarks }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const isRTL = locale === 'ar';
    const isEnglish = typeof locale === 'string' && locale.toLowerCase().startsWith('en');
    const numberFormatter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>new Intl.NumberFormat(isRTL ? 'ar' : 'en'), [
        isRTL
    ]);
    const marks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const values = sliderMarks && sliderMarks.length > 0 ? sliderMarks : [
            sliderMin,
            Math.round((sliderMin + sliderMax) / 2),
            sliderMax
        ];
        return values.map((value)=>({
                value,
                label: numberFormatter.format(value)
            }));
    }, [
        numberFormatter,
        sliderMarks,
        sliderMax,
        sliderMin
    ]);
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [projectType, setProjectType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [minValue, setMinValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(sliderMin);
    const [maxValue, setMaxValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(sliderMax);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"])(error, locale);
    const minSliderMarks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>marks.filter((mark)=>mark.value >= sliderMin && mark.value <= maxValue), [
        marks,
        maxValue,
        sliderMin
    ]);
    const maxSliderMarks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>marks.filter((mark)=>mark.value >= minValue && mark.value <= sliderMax), [
        marks,
        minValue,
        sliderMax
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = window.setTimeout(()=>setEntered(true), 30);
        return ()=>window.clearTimeout(timer);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            const storedMin = parseStoredNumber(window.sessionStorage.getItem(minStorageKey));
            const storedMax = parseStoredNumber(window.sessionStorage.getItem(maxStorageKey));
            const resolvedMin = clampNumber(storedMin ?? sliderMin, sliderMin, sliderMax);
            const resolvedMax = clampNumber(storedMax ?? sliderMax, sliderMin, sliderMax);
            setProjectType(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale)));
            setMinValue(Math.min(resolvedMin, resolvedMax));
            setMaxValue(Math.max(resolvedMin, resolvedMax));
        } catch  {
        // ignore
        }
    }, [
        locale,
        maxStorageKey,
        minStorageKey,
        sliderMax,
        sliderMin
    ]);
    const invalidRange = minValue > maxValue;
    const visibleError = invalidRange ? invalidRangeText : error;
    const finishSync = async ()=>{
        setSubmitting(true);
        setError(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectPropertiesSync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syncProjectProperties"])(locale);
            if (nav.nextHref) {
                nav.goNext();
                return;
            }
            router.push(`/${locale}/project`);
        } catch (err) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, saveErrorText));
        } finally{
            setSubmitting(false);
        }
    };
    const onContinue = async ()=>{
        if (submitting || invalidRange) return;
        try {
            window.sessionStorage.setItem(minStorageKey, String(minValue));
            window.sessionStorage.setItem(maxStorageKey, String(maxValue));
        } catch  {
        // ignore
        }
        await finishSync();
    };
    const onSkip = async ()=>{
        if (submitting) return;
        try {
            window.sessionStorage.setItem(minStorageKey, '');
            window.sessionStorage.setItem(maxStorageKey, '');
        } catch  {
        // ignore
        }
        await finishSync();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-4xl mx-auto min-h-full flex flex-col",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 pb-32",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        locale: locale,
                        entered: entered,
                        projectTypeId: projectType
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ProjectPropertiesNumericRangeQuestion.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mt-2 text-start transition-all duration-700 ${entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'}`,
                        children: [
                            isEnglish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                children: `
              #${titleId} {
                font-family: "IBM Plex Serif", serif !important;
              }
            `
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectPropertiesNumericRangeQuestion.tsx",
                                lineNumber: 200,
                                columnNumber: 13
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: titleId,
                                className: "text-2xl sm:text-3xl font-medium tracking-tight text-slate-900",
                                dangerouslySetInnerHTML: {
                                    __html: title
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectPropertiesNumericRangeQuestion.tsx",
                                lineNumber: 206,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectPropertiesNumericRangeQuestion.tsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mt-8  transition-all duration-700 ${entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'}`,
                        style: {
                            transitionDelay: '160ms'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-8 grid grid-cols-1 gap-12 md:grid-cols-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-slate-700",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-slate-800",
                                                    children: minLabel
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectPropertiesNumericRangeQuestion.tsx",
                                                    lineNumber: 229,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectPropertiesNumericRangeQuestion.tsx",
                                                lineNumber: 228,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 text-start text-3xl font-bold tracking-tight text-slate-900 sm:text-3xl",
                                                children: numberFormatter.format(minValue)
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectPropertiesNumericRangeQuestion.tsx",
                                                lineNumber: 233,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Slider$2f$Slider$2f$Slider$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slider"], {
                                                className: "mt-5",
                                                min: sliderMin,
                                                max: maxValue,
                                                step: sliderStep,
                                                value: minValue,
                                                onChange: (value)=>{
                                                    setMinValue(value);
                                                    setError(null);
                                                },
                                                marks: minSliderMarks,
                                                color: "#2563eb",
                                                size: "md",
                                                thumbSize: 18,
                                                label: (value)=>numberFormatter.format(value),
                                                styles: {
                                                    root: {
                                                        '--slider-track-bg': '#ffffff'
                                                    },
                                                    bar: {
                                                        backgroundColor: '#2563eb'
                                                    },
                                                    thumb: {
                                                        backgroundColor: '#ffffff',
                                                        border: '2px solid #2563eb',
                                                        boxShadow: 'none'
                                                    },
                                                    mark: {
                                                        borderColor: '#cbd5e1'
                                                    },
                                                    markLabel: {
                                                        fontSize: '0.75rem',
                                                        color: '#64748b'
                                                    }
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectPropertiesNumericRangeQuestion.tsx",
                                                lineNumber: 236,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/project/questions/ProjectPropertiesNumericRangeQuestion.tsx",
                                        lineNumber: 227,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-slate-700",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-slate-800",
                                                    children: maxLabel
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectPropertiesNumericRangeQuestion.tsx",
                                                    lineNumber: 270,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectPropertiesNumericRangeQuestion.tsx",
                                                lineNumber: 269,
                                                columnNumber: 16
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 text-start text-3xl font-bold tracking-tight text-slate-900 sm:text-3xl",
                                                children: numberFormatter.format(maxValue)
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectPropertiesNumericRangeQuestion.tsx",
                                                lineNumber: 274,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Slider$2f$Slider$2f$Slider$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slider"], {
                                                className: "mt-5",
                                                min: minValue,
                                                max: sliderMax,
                                                step: sliderStep,
                                                value: maxValue,
                                                onChange: (value)=>{
                                                    setMaxValue(value);
                                                    setError(null);
                                                },
                                                marks: maxSliderMarks,
                                                color: "#2563eb",
                                                size: "md",
                                                thumbSize: 18,
                                                label: (value)=>numberFormatter.format(value),
                                                styles: {
                                                    root: {
                                                        '--slider-track-bg': '#ffffff'
                                                    },
                                                    bar: {
                                                        backgroundColor: '#2563eb'
                                                    },
                                                    thumb: {
                                                        backgroundColor: '#ffffff',
                                                        border: '2px solid #2563eb',
                                                        boxShadow: 'none'
                                                    },
                                                    mark: {
                                                        borderColor: '#cbd5e1'
                                                    },
                                                    markLabel: {
                                                        fontSize: '0.75rem',
                                                        color: '#64748b'
                                                    }
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectPropertiesNumericRangeQuestion.tsx",
                                                lineNumber: 277,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/project/questions/ProjectPropertiesNumericRangeQuestion.tsx",
                                        lineNumber: 268,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/ProjectPropertiesNumericRangeQuestion.tsx",
                                lineNumber: 226,
                                columnNumber: 11
                            }, this),
                            visibleError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 text-sm text-rose-700",
                                children: visibleError
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectPropertiesNumericRangeQuestion.tsx",
                                lineNumber: 311,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectPropertiesNumericRangeQuestion.tsx",
                        lineNumber: 214,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/ProjectPropertiesNumericRangeQuestion.tsx",
                lineNumber: 183,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: nav.backHref,
                                className: "btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200",
                                children: isRTL ? 'رجوع' : 'Back'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectPropertiesNumericRangeQuestion.tsx",
                                lineNumber: 319,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>void onSkip(),
                                        disabled: submitting,
                                        className: "btn-sm px-5 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200 disabled:cursor-not-allowed disabled:opacity-60",
                                        children: isRTL ? 'تخطي' : 'Skip'
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectPropertiesNumericRangeQuestion.tsx",
                                        lineNumber: 327,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>void onContinue(),
                                        disabled: submitting || invalidRange,
                                        className: `btn-sm px-6 py-2 rounded-full ${!submitting && !invalidRange ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90' : 'text-slate-500 bg-slate-200 cursor-not-allowed'}`,
                                        children: submitting ? isRTL ? 'جاري الحفظ...' : 'Saving...' : nav.continueLabel
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectPropertiesNumericRangeQuestion.tsx",
                                        lineNumber: 336,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/ProjectPropertiesNumericRangeQuestion.tsx",
                                lineNumber: 326,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectPropertiesNumericRangeQuestion.tsx",
                        lineNumber: 318,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectPropertiesNumericRangeQuestion.tsx",
                    lineNumber: 317,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectPropertiesNumericRangeQuestion.tsx",
                lineNumber: 316,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/ProjectPropertiesNumericRangeQuestion.tsx",
        lineNumber: 179,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/questions/InsighterExperienceQuestion.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InsighterExperienceQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ProjectPropertiesNumericRangeQuestion$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/ProjectPropertiesNumericRangeQuestion.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function InsighterExperienceQuestion({ locale }) {
    const isRTL = locale === 'ar';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ProjectPropertiesNumericRangeQuestion$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        locale: locale,
        title: isRTL ? 'كم سنة خبرة تفضل أن يمتلكها الخبير الفرد؟' : 'How many years of experience should the individual insighter have?',
        titleId: "insighter-experience-question-title",
        subtitle: isRTL ? 'يمكنك إدخال حد أدنى أو حد أقصى أو كليهما.' : 'You can enter a minimum, a maximum, or both.',
        minLabel: isRTL ? 'الحد الأدنى لسنوات الخبرة' : 'Minimum years of experience',
        maxLabel: isRTL ? 'الحد الأقصى لسنوات الخبرة' : 'Maximum years of experience',
        minPlaceholder: isRTL ? 'مثال: 3' : 'Example: 3',
        maxPlaceholder: isRTL ? 'مثال: 8' : 'Example: 8',
        minStorageKey: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterMinYearsExperienceKey(locale),
        maxStorageKey: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterMaxYearsExperienceKey(locale),
        sliderMin: 0,
        sliderMax: 40,
        sliderMarks: [
            0,
            5,
            10,
            15,
            20,
            25,
            30,
            35,
            40
        ],
        emptyErrorText: isRTL ? 'أدخل قيمة واحدة على الأقل أو استخدم التخطي.' : 'Enter at least one value or use skip.',
        invalidRangeText: isRTL ? 'يجب أن تكون القيمة الدنيا أقل من أو تساوي القيمة العليا.' : 'Minimum years must be less than or equal to maximum years.',
        saveErrorText: isRTL ? 'تعذر حفظ خصائص المشروع.' : 'Failed to save project properties.'
    }, void 0, false, {
        fileName: "[project]/components/project/questions/InsighterExperienceQuestion.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/questions/CompanyTeamSizeQuestion.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CompanyTeamSizeQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ProjectPropertiesNumericRangeQuestion$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/ProjectPropertiesNumericRangeQuestion.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function CompanyTeamSizeQuestion({ locale }) {
    const isRTL = locale === 'ar';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ProjectPropertiesNumericRangeQuestion$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        locale: locale,
        title: isRTL ? 'ما حجم فريق الشركة الذي تفضله لهذا المشروع؟' : 'What team size should the company insighter have for this project?',
        titleId: "company-team-size-question-title",
        subtitle: isRTL ? 'يمكنك تحديد الحد الأدنى أو الحد الأقصى أو كليهما.' : 'You can set a minimum, a maximum, or both.',
        minLabel: isRTL ? 'الحد الأدنى لحجم الفريق' : 'Minimum team size',
        maxLabel: isRTL ? 'الحد الأقصى لحجم الفريق' : 'Maximum team size',
        minPlaceholder: isRTL ? 'مثال: 3' : 'Example: 3',
        maxPlaceholder: isRTL ? 'مثال: 7' : 'Example: 7',
        minStorageKey: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].companyMinTeamSizeKey(locale),
        maxStorageKey: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].companyMaxTeamSizeKey(locale),
        sliderMin: 1,
        sliderMax: 200,
        sliderMarks: [
            1,
            10,
            25,
            50,
            100,
            200
        ],
        emptyErrorText: isRTL ? 'أدخل قيمة واحدة على الأقل أو استخدم التخطي.' : 'Enter at least one value or use skip.',
        invalidRangeText: isRTL ? 'يجب أن تكون القيمة الدنيا أقل من أو تساوي القيمة العليا.' : 'Minimum team size must be less than or equal to maximum team size.',
        saveErrorText: isRTL ? 'تعذر حفظ خصائص المشروع.' : 'Failed to save project properties.'
    }, void 0, false, {
        fileName: "[project]/components/project/questions/CompanyTeamSizeQuestion.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/questions/ProjectDescriptionQuestion.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectDescriptionQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCheck.mjs [app-ssr] (ecmascript) <export default as IconCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPaperclip$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPaperclip$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconPaperclip.mjs [app-ssr] (ecmascript) <export default as IconPaperclip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTrashFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTrashFilled$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconTrashFilled.mjs [app-ssr] (ecmascript) <export default as IconTrashFilled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/ProjectSelectedTypeHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDescriptionState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectDescriptionState.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDescriptionSync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectDescriptionSync.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectStepErrorToast.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectWizardNavigation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
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
const PROJECT_DESCRIPTION_ALLOWED_EXTENSIONS = [
    'pdf',
    'jpg',
    'jpeg',
    'png',
    'doc',
    'docx',
    'xls',
    'xlsx',
    'csv',
    'txt',
    'ppt',
    'pptx',
    'odt'
];
const PROJECT_DESCRIPTION_FILE_ACCEPT = PROJECT_DESCRIPTION_ALLOWED_EXTENSIONS.map((extension)=>`.${extension}`).join(',');
const PROJECT_DESCRIPTION_MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024;
const PROJECT_DESCRIPTION_ALLOWED_EXTENSION_SET = new Set(PROJECT_DESCRIPTION_ALLOWED_EXTENSIONS);
function getFileExtension(name) {
    const parts = name.toLowerCase().split('.');
    return parts.length > 1 ? parts.at(-1) || '' : '';
}
const FILE_ICON_EXTENSIONS = new Set([
    'csv',
    'doc',
    'docx',
    'jpg',
    'jpeg',
    'mp3',
    'mp4',
    'pdf',
    'ppt',
    'pptx',
    'pub',
    'txt',
    'xls',
    'xlsx',
    'zip'
]);
function FileExtIcon({ name }) {
    const ext = getFileExtension(name);
    const iconExt = ext === 'jpeg' ? 'jpg' : ext;
    if (FILE_ICON_EXTENSIONS.has(iconExt)) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            src: `/file-icons/${iconExt}.svg`,
            alt: iconExt,
            width: 36,
            height: 36,
            className: "h-9 w-9 shrink-0 object-contain"
        }, void 0, false, {
            fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
            lineNumber: 64,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-[10px] font-bold uppercase text-slate-500",
        children: ext.slice(0, 4) || 'FILE'
    }, void 0, false, {
        fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
function getProjectDescriptionFileValidationMessage(locale, file) {
    const isRTL = locale === 'ar';
    const extension = getFileExtension(file.name);
    const allowedExtensionsLabel = PROJECT_DESCRIPTION_ALLOWED_EXTENSIONS.join(', ').toUpperCase();
    const errors = [];
    if (!PROJECT_DESCRIPTION_ALLOWED_EXTENSION_SET.has(extension)) {
        errors.push(isRTL ? `الملف "${file.name}" بصيغة غير مدعومة. الصيغ المسموحة: ${allowedExtensionsLabel}.` : `"${file.name}" has an unsupported file type. Allowed formats: ${allowedExtensionsLabel}.`);
    }
    if (file.size > PROJECT_DESCRIPTION_MAX_FILE_SIZE_BYTES) {
        errors.push(isRTL ? `الملف "${file.name}" يتجاوز الحد الأقصى 2 MB.` : `"${file.name}" exceeds the 2 MB limit.`);
    }
    return errors;
}
function validateProjectDescriptionFiles(locale, files) {
    const validFiles = [];
    const errors = [];
    files.forEach((file)=>{
        const fileErrors = getProjectDescriptionFileValidationMessage(locale, file);
        if (fileErrors.length > 0) {
            errors.push(...fileErrors);
            return;
        }
        validFiles.push(file);
    });
    return {
        validFiles,
        errorMessage: errors.length > 0 ? errors.join('\n') : null
    };
}
function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
    const units = [
        'B',
        'KB',
        'MB',
        'GB'
    ];
    let value = bytes;
    let unitIndex = 0;
    while(value >= 1024 && unitIndex < units.length - 1){
        value /= 1024;
        unitIndex += 1;
    }
    return `${value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}
function ProjectDescriptionQuestion({ locale }) {
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const isRTL = locale === 'ar';
    const isEnglish = typeof locale === 'string' && locale.toLowerCase().startsWith('en');
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [projectType, setProjectType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [description, setDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [savedFiles, setSavedFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [newFiles, setNewFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"])(error, locale);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = window.setTimeout(()=>setEntered(true), 30);
        return ()=>window.clearTimeout(timer);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            setProjectType(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale)));
            const stored = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDescriptionState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readProjectDescriptionState"])(locale);
            setDescription(stored.description);
            setSavedFiles(stored.files);
        } catch  {
        // ignore
        }
    }, [
        locale
    ]);
    const title = isRTL ? 'هل لديك أي تفاصيل إضافية نحتاج معرفتها؟' : 'Anything else we should know before we shape this request?';
    const subtitle = isRTL ? 'أضف ملاحظاتك بحرية، وارفِق أي ملفات تساعدنا على فهم السياق بشكل أدق.' : 'Add any context, preferences, constraints, links, or notes, and attach supporting files if they help.';
    const canContinue = !submitting;
    const mergedFiles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>[
            ...savedFiles,
            ...newFiles.map((file)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDescriptionState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fileMetaFromFile"])(file))
        ], [
        newFiles,
        savedFiles
    ]);
    const onContinue = async ()=>{
        if (submitting) return;
        const nextDescription = description.trim();
        const validation = validateProjectDescriptionFiles(locale, newFiles);
        if (validation.errorMessage) {
            setError(validation.errorMessage);
            return;
        }
        setSubmitting(true);
        setError(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDescriptionSync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syncProjectDescription"])({
                locale,
                description: nextDescription,
                files: validation.validFiles
            });
            const nextFiles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDescriptionState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProjectDescriptionFiles"])(savedFiles, validation.validFiles.map((file)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDescriptionState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fileMetaFromFile"])(file)));
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDescriptionState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeProjectDescriptionState"])(locale, {
                description: nextDescription,
                files: nextFiles
            });
            setSavedFiles(nextFiles);
            setNewFiles([]);
            nav.goNext();
        } catch (err) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر حفظ الوصف والملفات.' : 'Failed to save your description and attachments.'));
        } finally{
            setSubmitting(false);
        }
    };
    const onSkip = ()=>{
        if (submitting) return;
        setError(null);
        nav.goNext();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-5xl mx-auto min-h-full flex flex-col",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 pb-32",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        locale: locale,
                        entered: entered,
                        projectTypeId: projectType
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                        lineNumber: 257,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mt-2 text-start transition-all duration-700 ${entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'}`,
                        children: [
                            isEnglish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                children: `
              #project-description-question-title {
                font-family: "IBM Plex Serif", serif !important;
              }
            `
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                lineNumber: 272,
                                columnNumber: 13
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "project-description-question-title",
                                className: "mt-4 text-2xl sm:text-3xl font-medium  text-slate-900",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                lineNumber: 279,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 max-w-3xl text-sm sm:text-base font-semibold leading-7 text-slate-600",
                                children: subtitle
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                lineNumber: 286,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                        lineNumber: 263,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 grid gap-5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: description,
                                        onChange: (event)=>setDescription(event.target.value),
                                        placeholder: isRTL ? 'اكتب أي تفاصيل إضافية: ما الذي يهمك؟ ما الذي يجب تجنبه؟ هل هناك أهداف أو مراجع أو مواعيد حساسة؟' : 'Share any extra details: what matters most, what to avoid, important references, constraints, internal context, or timing notes.',
                                        className: "min-h-[280px] w-full rounded-[28px] border border-slate-200 bg-white/90 px-5 py-4 text-sm leading-7 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                        lineNumber: 294,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                    lineNumber: 293,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "mt-3 inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-white",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "file",
                                            multiple: true,
                                            accept: PROJECT_DESCRIPTION_FILE_ACCEPT,
                                            className: "hidden",
                                            onChange: (event)=>{
                                                const nextFiles = Array.from(event.target.files || []);
                                                if (nextFiles.length === 0) return;
                                                const validation = validateProjectDescriptionFiles(locale, nextFiles);
                                                if (validation.validFiles.length > 0) {
                                                    setNewFiles((current)=>[
                                                            ...current,
                                                            ...validation.validFiles
                                                        ]);
                                                }
                                                setError(validation.errorMessage);
                                                event.target.value = '';
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                            lineNumber: 309,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPaperclip$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPaperclip$3e$__["IconPaperclip"], {
                                            size: 17,
                                            stroke: 1.9,
                                            className: "text-[#1C7CBB]"
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                            lineNumber: 325,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: isRTL ? 'إرفاق ملف' : 'Attach file'
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                            lineNumber: 326,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-medium text-slate-400",
                                            children: isRTL ? 'حتى 2 MB' : 'up to 2 MB'
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                            lineNumber: 327,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                    lineNumber: 306,
                                    columnNumber: 13
                                }, this),
                                mergedFiles.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "mt-4 space-y-2",
                                    children: [
                                        savedFiles.map((file, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FileExtIcon, {
                                                                name: file.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                                                lineNumber: 340,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "truncate text-sm font-medium text-slate-900",
                                                                        children: file.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                                                        lineNumber: 342,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-xs text-slate-500",
                                                                        children: formatBytes(file.size)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                                                        lineNumber: 343,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                                                lineNumber: 341,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                                        lineNumber: 339,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "inline-flex shrink-0 items-center gap-1 text-[11px] font-bold text-emerald-600",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                                                                size: 13,
                                                                stroke: 2.5
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                                                lineNumber: 347,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: isRTL ? 'مرفق' : 'Attached'
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                                                lineNumber: 348,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                                        lineNumber: 346,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, `saved-${file.name}-${index}`, true, {
                                                fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                                lineNumber: 335,
                                                columnNumber: 19
                                            }, this)),
                                        newFiles.map((file, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FileExtIcon, {
                                                                name: file.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                                                lineNumber: 359,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "truncate text-sm font-medium text-slate-900",
                                                                        children: file.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                                                        lineNumber: 361,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-xs text-slate-500",
                                                                        children: formatBytes(file.size)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                                                        lineNumber: 362,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                                                lineNumber: 360,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                                        lineNumber: 358,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setNewFiles((current)=>current.filter((_, fileIndex)=>fileIndex !== index)),
                                                        className: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-rose-100 bg-white text-rose-500 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600",
                                                        "aria-label": isRTL ? 'إزالة الملف' : 'Remove file',
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTrashFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTrashFilled$3e$__["IconTrashFilled"], {
                                                            size: 15
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                                            lineNumber: 375,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                                        lineNumber: 365,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, `new-${file.name}-${index}`, true, {
                                                fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                                lineNumber: 354,
                                                columnNumber: 19
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                    lineNumber: 333,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                            lineNumber: 292,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                        lineNumber: 291,
                        columnNumber: 9
                    }, this),
                    error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 whitespace-pre-line text-sm font-semibold text-rose-700",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                        lineNumber: 385,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                lineNumber: 256,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: nav.backHref,
                                className: "btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200",
                                children: isRTL ? 'رجوع' : 'Back'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                lineNumber: 394,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: onSkip,
                                        disabled: submitting,
                                        className: "btn-sm px-5 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200 disabled:cursor-not-allowed disabled:opacity-60",
                                        children: isRTL ? 'تخطي' : 'Skip'
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                        lineNumber: 402,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>void onContinue(),
                                        disabled: !canContinue,
                                        className: `btn-sm px-6 py-2 rounded-full ${canContinue ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90' : 'text-slate-500 bg-slate-200 cursor-not-allowed'}`,
                                        children: submitting ? isRTL ? 'جاري الحفظ...' : 'Saving...' : nav.continueLabel
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                        lineNumber: 411,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                                lineNumber: 401,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                        lineNumber: 393,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                    lineNumber: 392,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
                lineNumber: 391,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/ProjectDescriptionQuestion.tsx",
        lineNumber: 252,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/questions/InlineDateCalendar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InlineDateCalendar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$dates$2f$esm$2f$components$2f$Calendar$2f$Calendar$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/dates/esm/components/Calendar/Calendar.mjs [app-ssr] (ecmascript)");
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
    return `${year}-${month}-${day}`;
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
function InlineDateCalendar({ value, min, max, onChange, locale, label, className = '' }) {
    const isRTL = locale === 'ar';
    const selectedDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>parseIsoDate(value), [
        value
    ]);
    const minDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>parseIsoDate(min) || undefined, [
        min
    ]);
    const maxDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>parseIsoDate(max) || undefined, [
        max
    ]);
    const [visibleMonth, setVisibleMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>getInitialMonth(value, min));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (selectedDate) {
            const nextMonth = startOfMonth(selectedDate);
            setVisibleMonth((currentMonth)=>sameMonth(currentMonth, nextMonth) ? currentMonth : nextMonth);
            return;
        }
        if (minDate) {
            const nextMonth = startOfMonth(minDate);
            setVisibleMonth((currentMonth)=>currentMonth < nextMonth ? nextMonth : currentMonth);
        }
    }, [
        minDate,
        selectedDate
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "aria-label": label,
        className: `w-fit rounded-[10px] bg-white/95 p-3 shadow-sm ${className}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$dates$2f$esm$2f$components$2f$Calendar$2f$Calendar$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Calendar"], {
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
            getDayProps: (date)=>({
                    selected: sameDate(selectedDate, date),
                    onClick: ()=>onChange(toLocalIsoDate(date))
                }),
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
                    borderRadius: 999,
                    fontSize: 14,
                    fontWeight: 400
                },
                monthCell: {
                    padding: 1
                }
            }
        }, void 0, false, {
            fileName: "[project]/components/project/questions/InlineDateCalendar.tsx",
            lineNumber: 100,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/project/questions/InlineDateCalendar.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/questions/DeadlineOfferQuestion.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DeadlineOfferQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalSubmit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectProposalSubmit.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/specifiedInsighterProject.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectStepErrorToast.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectWizardFlow.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$InlineDateCalendar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/InlineDateCalendar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/ProjectSelectedTypeHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectWizardNavigation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
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
    return `${yyyy}-${mm}-${dd}`;
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
    return `${yyyy}-${mm}-${dd}`;
}
function defaultOfferExpiryDate(projectType) {
    return normalizeProjectType(projectType) === 'urgent_request' ? futureDateString(1) : futureDateString(7);
}
function DeadlineOfferQuestion({ locale }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const isRTL = locale === 'ar';
    const isEnglish = typeof locale === 'string' && locale.toLowerCase().startsWith('en');
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [projectType, setProjectType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dateValue, setDateValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedMatchesCount, setSelectedMatchesCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"])(error, locale);
    const storageKey = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].deadlineOfferKey(locale);
    const today = todayString();
    const tomorrow = futureDateString(1);
    const isUrgentProject = normalizeProjectType(projectType) === 'urgent_request';
    const isPastDate = dateValue !== '' && dateValue < today;
    const isAfterUrgentMaxDate = isUrgentProject && dateValue !== '' && dateValue > tomorrow;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = window.setTimeout(()=>setEntered(true), 30);
        return ()=>window.clearTimeout(timer);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            const storedProjectType = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale));
            setProjectType(storedProjectType);
            const stored = window.sessionStorage.getItem(storageKey);
            setDateValue(stored || defaultOfferExpiryDate(storedProjectType));
            setSelectedMatchesCount((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSpecifiedInsighterProject"])(locale) ? 1 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalSubmit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredSelectedMatchIds"])(locale).length);
        } catch  {
        // ignore
        }
    }, [
        locale,
        storageKey
    ]);
    const submitProposal = async ()=>{
        setSubmitting(true);
        setError(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalSubmit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["submitProjectProposal"])(locale);
            router.push(nav.hrefFor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectSubmissionSuccess));
        } catch (err) {
            const message = err instanceof Error && err.message === 'no_matches' ? isRTL ? 'يرجى اختيار خبير واحد على الأقل قبل إرسال الطلب.' : 'Please select at least one matched insighter before submitting.' : err instanceof Error && err.message === 'no_match_request_uuid' ? isRTL ? 'تعذر العثور على بيانات المطابقة الخاصة بالإرسال. أعد تحميل نتائج المطابقة ثم حاول مرة أخرى.' : 'The proposal match identifier is missing. Reload the match results and try again.' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر إرسال الطلب.' : 'Failed to submit project proposal.');
            setSelectedMatchesCount((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSpecifiedInsighterProject"])(locale) ? 1 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalSubmit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredSelectedMatchIds"])(locale).length);
            setError(message);
        } finally{
            setSubmitting(false);
        }
    };
    const onContinue = async ()=>{
        if (submitting || isPastDate || isAfterUrgentMaxDate) return;
        if (!dateValue) {
            setError(isRTL ? 'يرجى اختيار تاريخ.' : 'Please select a date.');
            return;
        }
        try {
            window.sessionStorage.setItem(storageKey, dateValue);
        } catch  {
        // ignore
        }
        await submitProposal();
    };
    const validationError = isPastDate ? isRTL ? 'لا يمكن أن يكون التاريخ في الماضي.' : 'Date cannot be in the past.' : isAfterUrgentMaxDate ? isRTL ? 'يجب أن تنتهي صلاحية عرض الطلب العاجل خلال 24 ساعة.' : 'Urgent request offer must expire within 24 hours.' : null;
    const visibleError = validationError || error;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-4xl mx-auto min-h-full flex flex-col",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 pb-32",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        locale: locale,
                        entered: entered,
                        projectTypeId: projectType
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                        lineNumber: 169,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mt-2 text-start transition-all duration-700 ${entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'}`,
                        children: [
                            isEnglish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                children: `
              #deadline-offer-question-title {
                font-family: "IBM Plex Serif", serif !important;
              }
            `
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                                lineNumber: 184,
                                columnNumber: 13
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "deadline-offer-question-title",
                                className: "text-2xl sm:text-3xl font-medium tracking-tight text-slate-900",
                                children: isRTL ? 'متى تنتهي صلاحية هذا العرض؟' : 'When should this offer expire?'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                                lineNumber: 190,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-sm text-slate-500 max-w-2xl",
                                children: isRTL ? 'إذا لم يتم التعاقد قبل هذا التاريخ، سيتم إزالة العرض تلقائيًا.' : 'If no contract is made by this date, the offer will be automatically removed.'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                                lineNumber: 198,
                                columnNumber: 11
                            }, this),
                            selectedMatchesCount > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 inline-flex max-w-full items-center gap-2 rounded-full border border-sky-100 bg-sky-50/80 px-3 py-2 text-sm font-semibold text-sky-800 shadow-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full bg-[#1C7CBB] px-2 text-xs font-bold text-white",
                                        children: selectedMatchesCount
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                                        lineNumber: 205,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "min-w-0",
                                        children: isRTL ? 'من الخبراء/الجهات المختارة سيتم إرسالهم مع هذا العرض' : `selected match${selectedMatchesCount === 1 ? '' : 'es'} will be submitted with this offer`
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                                        lineNumber: 208,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                                lineNumber: 204,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mt-8 transition-all duration-700 ${entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'}`,
                        style: {
                            transitionDelay: '160ms'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$InlineDateCalendar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    value: dateValue,
                                    min: today,
                                    max: isUrgentProject ? tomorrow : undefined,
                                    onChange: (date)=>{
                                        setDateValue(date);
                                        setError(null);
                                    },
                                    locale: locale,
                                    label: isRTL ? 'تاريخ انتهاء العرض' : 'Offer expiry date'
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                                    lineNumber: 227,
                                    columnNumber: 13
                                }, this),
                                visibleError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 text-sm text-rose-700",
                                    children: visibleError
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                                    lineNumber: 239,
                                    columnNumber: 15
                                }, this) : null
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                            lineNumber: 226,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                        lineNumber: 217,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto px-4 lg:px-0 w-full max-w-4xl pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: nav.backHref,
                                className: "btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200",
                                children: isRTL ? 'رجوع' : 'Back'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                                lineNumber: 248,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>void onContinue(),
                                    disabled: submitting || isPastDate || isAfterUrgentMaxDate,
                                    className: `btn-sm px-6 py-2 rounded-full ${!submitting && !isPastDate && !isAfterUrgentMaxDate ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90' : 'text-slate-500 bg-slate-200 cursor-not-allowed'}`,
                                    children: submitting ? isRTL ? 'جاري الإرسال...' : 'Submitting...' : isRTL ? 'إرسال الطلب' : 'Submit proposal'
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                                    lineNumber: 256,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                                lineNumber: 255,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                        lineNumber: 247,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                    lineNumber: 246,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
                lineNumber: 245,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/DeadlineOfferQuestion.tsx",
        lineNumber: 164,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/questions/UrgentDateNotice.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UrgentDateNotice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
function UrgentDateNotice({ locale }) {
    const isRTL = locale === 'ar';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-4 flex max-w-sm items-start gap-3 rounded-[10px] border border-amber-200 bg-amber-50/90 px-4 py-3 text-start text-amber-900 shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-black leading-none text-white",
                "aria-hidden": "true",
                children: "!"
            }, void 0, false, {
                fileName: "[project]/components/project/questions/UrgentDateNotice.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
}),
"[project]/components/project/questions/ProjectDeadlineQuestion.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectDeadlineQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsPayload.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectPropertiesSync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectPropertiesSync.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectStepErrorToast.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$InlineDateCalendar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/InlineDateCalendar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/ProjectSelectedTypeHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectWizardNavigation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$UrgentDateNotice$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/UrgentDateNotice.tsx [app-ssr] (ecmascript)");
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
function toLocalIsoDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
function todayString() {
    return toLocalIsoDate(new Date());
}
function addDaysString(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return toLocalIsoDate(date);
}
function normalizeProjectType(value) {
    if (!value) return null;
    if (value === 'urgent' || value === 'urgent_request') return 'urgent_request';
    return value;
}
function ProjectDeadlineQuestion({ locale }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const isRTL = locale === 'ar';
    const isEnglish = typeof locale === 'string' && locale.toLowerCase().startsWith('en');
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [projectType, setProjectType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dateValue, setDateValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [finalDraftDate, setFinalDraftDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [showUrgentWarning, setShowUrgentWarning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [urgentAcknowledged, setUrgentAcknowledged] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"])(error, locale);
    const storageKey = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].deadlineKey(locale);
    const today = todayString();
    const tomorrow = addDaysString(1);
    const isUrgentProject = normalizeProjectType(projectType) === 'urgent_request';
    const minimumDeadline = isUrgentProject ? tomorrow : finalDraftDate || today;
    const isBeforeMinimumDate = dateValue !== '' && dateValue < minimumDeadline;
    const isAfterUrgentMaxDate = isUrgentProject && dateValue !== '' && dateValue > tomorrow;
    const isUrgentDeadline = !isUrgentProject && dateValue === tomorrow && dateValue >= minimumDeadline;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = window.setTimeout(()=>setEntered(true), 30);
        return ()=>window.clearTimeout(timer);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            setProjectType(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale)));
            const stored = window.sessionStorage.getItem(storageKey);
            if (stored) setDateValue(stored);
            const deliverableStage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readServiceComponentPayloadValue"])(locale, 'deliverable-stage');
            setFinalDraftDate(String(deliverableStage?.final_version?.date || ''));
        } catch  {
        // ignore
        }
    }, [
        locale,
        storageKey
    ]);
    const finishSync = async ()=>{
        setSubmitting(true);
        setError(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectPropertiesSync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syncProjectProperties"])(locale);
            if (nav.nextHref) {
                nav.goNext();
                return;
            }
            router.push(`/${locale}/project`);
        } catch (err) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر حفظ خصائص المشروع.' : 'Failed to save project properties.'));
        } finally{
            setSubmitting(false);
        }
    };
    const submitDeadline = async ()=>{
        try {
            window.sessionStorage.setItem(storageKey, dateValue);
        } catch  {
        // ignore
        }
        await finishSync();
    };
    const onContinue = async ()=>{
        if (submitting || isBeforeMinimumDate || isAfterUrgentMaxDate) return;
        if (!dateValue) {
            setError(isRTL ? 'يرجى اختيار الموعد النهائي لتسليم المشروع.' : 'Please select the project delivery deadline.');
            return;
        }
        if (isUrgentDeadline && !urgentAcknowledged) {
            setShowUrgentWarning(true);
            return;
        }
        await submitDeadline();
    };
    const validationError = !dateValue ? null : isBeforeMinimumDate ? isUrgentProject ? isRTL ? 'هذا اليوم فقط متاح لأن الطلبات العاجلة يجب أن تكون خلال 24 ساعة.' : 'Only this date is available because urgent requests are 24-hour requests.' : finalDraftDate ? isRTL ? 'يجب أن يكون موعد تسليم المشروع في نفس يوم النسخة النهائية أو بعدها.' : 'Project deadline must be the same day as the final draft or after it.' : isRTL ? 'لا يمكن أن يكون التاريخ في الماضي.' : 'Date cannot be in the past.' : isAfterUrgentMaxDate ? isRTL ? 'يجب أن يكون موعد الطلب العاجل خلال 24 ساعة.' : 'Urgent request deadline must be within 24 hours.' : null;
    const visibleError = validationError || error;
    const canContinue = Boolean(dateValue) && !isBeforeMinimumDate && !isAfterUrgentMaxDate && !submitting;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-4xl mx-auto min-h-full flex flex-col",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 pb-32",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        locale: locale,
                        entered: entered,
                        projectTypeId: projectType
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ProjectDeadlineQuestion.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mt-2 text-start transition-all duration-700 ${entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'}`,
                        children: [
                            isEnglish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                children: `
              #project-deadline-question-title {
                font-family: "IBM Plex Serif", serif !important;
              }
            `
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectDeadlineQuestion.tsx",
                                lineNumber: 202,
                                columnNumber: 13
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "project-deadline-question-title",
                                className: "text-2xl sm:text-3xl font-medium tracking-tight text-slate-900",
                                children: isRTL ? 'ما هو الموعد النهائي لتسليم المشروع؟' : 'What is the project delivery deadline?'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectDeadlineQuestion.tsx",
                                lineNumber: 208,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-sm text-slate-500 max-w-2xl",
                                children: isRTL ? 'هذا هو الموعد النهائي الذي يجب على الخبير تسليم كامل العمل فيه.' : 'This is the deadline by which the insighter must submit all project work.'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectDeadlineQuestion.tsx",
                                lineNumber: 216,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectDeadlineQuestion.tsx",
                        lineNumber: 193,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mt-8 transition-all duration-700 ${entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'}`,
                        style: {
                            transitionDelay: '160ms'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$InlineDateCalendar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    value: dateValue,
                                    min: minimumDeadline,
                                    max: isUrgentProject ? tomorrow : undefined,
                                    onChange: (date)=>{
                                        setDateValue(date);
                                        setError(null);
                                        setUrgentAcknowledged(false);
                                    },
                                    locale: locale,
                                    label: isRTL ? 'الموعد النهائي للتسليم' : 'Delivery deadline'
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/ProjectDeadlineQuestion.tsx",
                                    lineNumber: 233,
                                    columnNumber: 13
                                }, this),
                                isUrgentProject ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$UrgentDateNotice$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    locale: locale
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/ProjectDeadlineQuestion.tsx",
                                    lineNumber: 245,
                                    columnNumber: 32
                                }, this) : null,
                                finalDraftDate ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-3 text-xs font-semibold text-slate-500",
                                    children: isRTL ? `يجب أن يكون في ${finalDraftDate} أو بعده.` : `Must be on or after ${finalDraftDate}.`
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/ProjectDeadlineQuestion.tsx",
                                    lineNumber: 247,
                                    columnNumber: 15
                                }, this) : null,
                                visibleError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 text-sm text-rose-700",
                                    children: visibleError
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/ProjectDeadlineQuestion.tsx",
                                    lineNumber: 254,
                                    columnNumber: 15
                                }, this) : null
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/project/questions/ProjectDeadlineQuestion.tsx",
                            lineNumber: 232,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ProjectDeadlineQuestion.tsx",
                        lineNumber: 223,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/ProjectDeadlineQuestion.tsx",
                lineNumber: 186,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto px-4 lg:px-0 w-full max-w-4xl pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: nav.backHref,
                                className: "btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200",
                                children: isRTL ? 'رجوع' : 'Back'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectDeadlineQuestion.tsx",
                                lineNumber: 263,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>void onContinue(),
                                disabled: !canContinue,
                                className: `btn-sm px-6 py-2 rounded-full ${canContinue ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90' : 'text-slate-500 bg-slate-200 cursor-not-allowed'}`,
                                children: submitting ? isRTL ? 'جاري الحفظ...' : 'Saving...' : nav.continueLabel
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectDeadlineQuestion.tsx",
                                lineNumber: 270,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectDeadlineQuestion.tsx",
                        lineNumber: 262,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectDeadlineQuestion.tsx",
                    lineNumber: 261,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectDeadlineQuestion.tsx",
                lineNumber: 260,
                columnNumber: 7
            }, this),
            showUrgentWarning ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-40 flex items-center justify-center bg-slate-950/35 px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-md rounded-2xl border border-white/60 bg-white p-5 text-start shadow-xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-bold text-slate-900",
                            children: isRTL ? 'طلب عاجل' : 'Urgent project request'
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/ProjectDeadlineQuestion.tsx",
                            lineNumber: 292,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 text-sm font-semibold leading-6 text-slate-600",
                            children: isRTL ? 'اختيار موعد قريب جدًا سيجعل طلبك عاجلًا، وقد يؤثر على عدد الخبراء المقترحين المتاحين. هل تريد المتابعة؟' : 'Choosing such a close deadline will make this an urgent project request, which may affect the number of suggested available insighters. Do you want to continue?'
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/ProjectDeadlineQuestion.tsx",
                            lineNumber: 295,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-5 flex items-center justify-end gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setShowUrgentWarning(false),
                                    className: "btn-sm rounded-full border border-slate-200 bg-white px-5 py-2 text-slate-700 hover:bg-slate-50",
                                    children: isRTL ? 'إلغاء' : 'Cancel'
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/ProjectDeadlineQuestion.tsx",
                                    lineNumber: 301,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        setUrgentAcknowledged(true);
                                        setShowUrgentWarning(false);
                                        void submitDeadline();
                                    },
                                    className: "btn-sm rounded-full bg-[#1C7CBB] px-5 py-2 text-white hover:bg-opacity-90",
                                    children: isRTL ? 'نعم، متابعة' : 'Yes, continue'
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/ProjectDeadlineQuestion.tsx",
                                    lineNumber: 308,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/project/questions/ProjectDeadlineQuestion.tsx",
                            lineNumber: 300,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/project/questions/ProjectDeadlineQuestion.tsx",
                    lineNumber: 291,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectDeadlineQuestion.tsx",
                lineNumber: 290,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/ProjectDeadlineQuestion.tsx",
        lineNumber: 182,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/questions/ProjectAddonsIntroStep.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectAddonsIntroStep
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSparklesFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSparklesFilled$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconSparklesFilled.mjs [app-ssr] (ecmascript) <export default as IconSparklesFilled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectWizardNavigation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsSync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectAddonsSync.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectAddonsState.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectWizardFlow.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectStepErrorToast.ts [app-ssr] (ecmascript)");
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
function ProjectAddonsIntroStep({ locale }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const isRTL = locale === 'ar';
    const isEnglish = typeof locale === 'string' && locale.toLowerCase().startsWith('en');
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [skipping, setSkipping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"])(error, locale);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = window.setTimeout(()=>setEntered(true), 40);
        return ()=>window.clearTimeout(timer);
    }, []);
    const stacked = isRTL ? [
        'تبقى القليل'
    ] : [
        'We Are Almost',
        'There'
    ];
    const body = isRTL ? 'تبقّى خيار إضافي واحد فقط قبل عرض ملخص المشروع النهائي: هل تريد اجتماع انطلاقة يضبط التوقعات، النطاق، وآلية التنفيذ منذ البداية؟' : 'There is one optional finishing touch before your final project brief: a kickoff meeting to align expectations, scope, and momentum from day one.';
    const illustrationUrl = 'https://res.cloudinary.com/dsiku9ipv/image/upload/v1774335409/Artboard_4_2x_ek6pka.png';
    const goToKickoffQuestion = ()=>{
        setError(null);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateProjectAddonsState"])(locale, (current)=>({
                ...current,
                kickoffMeeting: {
                    ...current.kickoffMeeting,
                    skipped: false
                }
            }));
        router.push(nav.hrefFor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].kickoffMeeting));
    };
    const skipKickoffQuestion = async ()=>{
        if (skipping) return;
        setSkipping(true);
        setError(null);
        const previousKickoffMeeting = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readProjectAddonsState"])(locale).kickoffMeeting;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateProjectAddonsState"])(locale, (current)=>({
                ...current,
                kickoffMeeting: {
                    enabled: null,
                    skipped: true
                }
            }));
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsSync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syncProjectAddons"])({
                locale
            });
            router.push(nav.hrefFor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectReview));
        } catch (err) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر حفظ إعدادات الإضافات.' : 'Failed to save addon settings.'));
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateProjectAddonsState"])(locale, (current)=>({
                    ...current,
                    kickoffMeeting: previousKickoffMeeting
                }));
        } finally{
            setSkipping(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-6xl mx-auto min-h-full flex flex-col",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex items-center justify-center px-4 pb-32 sm:px-6 lg:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full min-w-0 overflow-hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto w-full max-w-4xl text-center",
                        children: [
                            isEnglish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                children: `
                #addons-intro-headline,
                #addons-intro-headline * {
                  font-family: "IBM Plex Serif", serif !important;
                }
              `
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectAddonsIntroStep.tsx",
                                lineNumber: 103,
                                columnNumber: 15
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                id: "addons-intro-headline",
                                className: " mt-8  space-y-1  text-[clamp(2.25rem,11vw,4.2rem)]  md:text-[clamp(3rem,9vw,4.2rem)]  font-black  text-start leading-[0.95]  tracking-[-0.03em]  sm:tracking-[-0.08em] text-slate-950",
                                children: stacked.map((line, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: line
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectAddonsIntroStep.tsx",
                                                lineNumber: 127,
                                                columnNumber: 19
                                            }, this),
                                            idx === stacked.length - 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSparklesFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSparklesFilled$3e$__["IconSparklesFilled"], {
                                                size: 36,
                                                className: "text-amber-400 animate-pulse drop-shadow-[0_4px_14px_rgba(251,191,36,0.5)]"
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectAddonsIntroStep.tsx",
                                                lineNumber: 129,
                                                columnNumber: 21
                                            }, this) : null
                                        ]
                                    }, line, true, {
                                        fileName: "[project]/components/project/questions/ProjectAddonsIntroStep.tsx",
                                        lineNumber: 126,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectAddonsIntroStep.tsx",
                                lineNumber: 111,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `mx-auto mt-10 w-full max-w-3xl transition-all duration-700 ease-out ${entered ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "overflow-hidden ",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: illustrationUrl,
                                        alt: isRTL ? 'رسم توضيحي لاجتماع انطلاقة المشروع' : 'Kickoff meeting illustration',
                                        loading: "lazy",
                                        decoding: "async",
                                        className: "mx-auto h-auto w-full max-w-[400px] object-contain"
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectAddonsIntroStep.tsx",
                                        lineNumber: 145,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/ProjectAddonsIntroStep.tsx",
                                    lineNumber: 144,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectAddonsIntroStep.tsx",
                                lineNumber: 138,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mx-auto mt-8 max-w-3xl text-start text-base font-semibold leading-8 text-slate-600 sm:text-center sm:text-lg",
                                children: body
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectAddonsIntroStep.tsx",
                                lineNumber: 159,
                                columnNumber: 13
                            }, this),
                            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mx-auto mt-6 max-w-3xl text-sm font-semibold text-rose-700",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectAddonsIntroStep.tsx",
                                lineNumber: 165,
                                columnNumber: 15
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectAddonsIntroStep.tsx",
                        lineNumber: 100,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectAddonsIntroStep.tsx",
                    lineNumber: 99,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectAddonsIntroStep.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-[0.9fr_0.9fr_1.35fr] items-center gap-2 sm:flex sm:justify-between sm:gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: nav.backHref,
                                className: "btn-sm justify-center rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-700 hover:bg-white sm:px-6 sm:text-base",
                                children: isRTL ? 'رجوع' : 'Back'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectAddonsIntroStep.tsx",
                                lineNumber: 176,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "contents sm:flex sm:items-center sm:gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>void skipKickoffQuestion(),
                                        disabled: skipping,
                                        className: `btn-sm justify-center rounded-full border px-3 py-2 text-sm sm:px-6 sm:text-base ${skipping ? 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-500' : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'}`,
                                        children: skipping ? isRTL ? 'جاري التخطي...' : 'Skipping...' : isRTL ? 'تخطي' : 'Skip'
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectAddonsIntroStep.tsx",
                                        lineNumber: 184,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: goToKickoffQuestion,
                                        disabled: skipping,
                                        className: `btn-sm justify-center rounded-full px-3 py-2 text-sm sm:px-6 sm:text-base ${skipping ? 'cursor-not-allowed bg-slate-200 text-slate-500' : 'bg-[#1C7CBB] text-white hover:bg-opacity-90'}`,
                                        children: isRTL ? 'عرض الإضافة' : 'Show the add-on'
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectAddonsIntroStep.tsx",
                                        lineNumber: 202,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/ProjectAddonsIntroStep.tsx",
                                lineNumber: 183,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectAddonsIntroStep.tsx",
                        lineNumber: 175,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectAddonsIntroStep.tsx",
                    lineNumber: 174,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectAddonsIntroStep.tsx",
                lineNumber: 173,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/ProjectAddonsIntroStep.tsx",
        lineNumber: 94,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/questions/KickoffMeetingQuestion.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>KickoffMeetingQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCalendarEventFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCalendarEventFilled$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCalendarEventFilled.mjs [app-ssr] (ecmascript) <export default as IconCalendarEventFilled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconXboxXFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconXboxXFilled$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconXboxXFilled.mjs [app-ssr] (ecmascript) <export default as IconXboxXFilled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/ProjectSelectedTypeHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectAddonsState.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsSync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectAddonsSync.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectStepErrorToast.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectWizardNavigation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ChoiceCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/ChoiceCard.tsx [app-ssr] (ecmascript)");
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
function renderBadgeIcon(Icon, colorClassName) {
    return ({ size })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: `inline-flex h-full w-full items-center justify-center rounded-2xl border shadow-sm ${colorClassName}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                size: size * 0.58
            }, void 0, false, {
                fileName: "[project]/components/project/questions/KickoffMeetingQuestion.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/project/questions/KickoffMeetingQuestion.tsx",
            lineNumber: 22,
            columnNumber: 5
        }, this);
}
function KickoffMeetingQuestion({ locale }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const isRTL = locale === 'ar';
    const isEnglish = typeof locale === 'string' && locale.toLowerCase().startsWith('en');
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [projectType, setProjectType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"])(error, locale);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = window.setTimeout(()=>setEntered(true), 30);
        return ()=>window.clearTimeout(timer);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            setProjectType(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale)));
            setSelected((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readProjectAddonsState"])(locale).kickoffMeeting.enabled);
        } catch  {
        // ignore
        }
    }, [
        locale
    ]);
    const title = isRTL ? 'هل تحتاج إلى اجتماع انطلاقة للمشروع؟' : 'Do you need a kickoff meeting (recommended)?';
    const persistSelection = (enabled)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateProjectAddonsState"])(locale, (current)=>({
                ...current,
                kickoffMeeting: {
                    enabled,
                    skipped: false
                }
            }));
    };
    const continueWithValue = async (enabled)=>{
        if (submitting) return;
        persistSelection(enabled);
        setSubmitting(true);
        setError(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsSync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syncProjectAddons"])({
                locale
            });
            if (nav.nextHref) {
                nav.goNext();
                return;
            }
            router.push(`/${locale}/project`);
        } catch (err) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر حفظ الإضافات.' : 'Failed to save project addons.'));
        } finally{
            setSubmitting(false);
        }
    };
    const canContinue = selected !== null;
    const onContinue = async ()=>{
        if (selected === null) return;
        void continueWithValue(selected);
    };
    const onSelect = (enabled)=>{
        setSelected(enabled);
        setError(null);
        void continueWithValue(enabled);
    };
    const yesIcon = renderBadgeIcon(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCalendarEventFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCalendarEventFilled$3e$__["IconCalendarEventFilled"], 'border-sky-200/80 bg-gradient-to-br from-sky-50 to-sky-100/80 text-sky-600');
    const noIcon = renderBadgeIcon(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconXboxXFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconXboxXFilled$3e$__["IconXboxXFilled"], 'border-slate-200/80 bg-gradient-to-br from-slate-100 to-slate-200/80 text-slate-500');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-4xl mx-auto min-h-full flex flex-col",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 pb-28",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        locale: locale,
                        entered: entered,
                        projectTypeId: projectType
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/KickoffMeetingQuestion.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mt-2 text-start transition-all duration-700 ${entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'}`,
                        children: [
                            isEnglish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                children: `
              #kickoff-meeting-question-title {
                font-family: "IBM Plex Serif", serif !important;
              }
            `
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/KickoffMeetingQuestion.tsx",
                                lineNumber: 145,
                                columnNumber: 13
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "kickoff-meeting-question-title",
                                className: "text-2xl sm:text-3xl font-medium tracking-tight text-slate-900",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/KickoffMeetingQuestion.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/KickoffMeetingQuestion.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 sm:mt-20",
                        role: "radiogroup",
                        "aria-label": title,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ChoiceCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        checked: selected === true,
                                        title: isRTL ? 'نعم' : 'Yes',
                                        renderIcon: yesIcon,
                                        onSelect: ()=>onSelect(true),
                                        entered: entered,
                                        isRTL: isRTL,
                                        delayMs: 110,
                                        align: "center",
                                        size: "sm",
                                        className: "min-h-[170px]",
                                        iconSize: 56,
                                        iconStroke: 1.6
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/KickoffMeetingQuestion.tsx",
                                        lineNumber: 161,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ChoiceCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        checked: selected === false,
                                        title: isRTL ? 'لا' : 'No',
                                        renderIcon: noIcon,
                                        onSelect: ()=>onSelect(false),
                                        entered: entered,
                                        isRTL: isRTL,
                                        delayMs: 180,
                                        align: "center",
                                        size: "sm",
                                        className: "min-h-[170px]",
                                        iconSize: 56,
                                        iconStroke: 1.6
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/KickoffMeetingQuestion.tsx",
                                        lineNumber: 176,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/KickoffMeetingQuestion.tsx",
                                lineNumber: 160,
                                columnNumber: 11
                            }, this),
                            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 text-sm font-semibold text-rose-700",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/KickoffMeetingQuestion.tsx",
                                lineNumber: 193,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/KickoffMeetingQuestion.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/KickoffMeetingQuestion.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed left-0 right-0 z-20 bottom-0 border-t border-slate-200/70 bg-white/80 backdrop-blur-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: nav.backHref,
                                className: "btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200",
                                children: isRTL ? 'رجوع' : 'Back'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/KickoffMeetingQuestion.tsx",
                                lineNumber: 201,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>void onContinue(),
                                disabled: !canContinue || submitting,
                                className: `btn-sm px-6 py-2 rounded-full ${canContinue && !submitting ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90' : 'text-slate-500 bg-slate-200 cursor-not-allowed'}`,
                                children: submitting ? isRTL ? 'جاري الحفظ...' : 'Saving...' : nav.nextHref ? nav.continueLabel : isRTL ? 'إنهاء' : 'Finish'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/KickoffMeetingQuestion.tsx",
                                lineNumber: 208,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/KickoffMeetingQuestion.tsx",
                        lineNumber: 200,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/KickoffMeetingQuestion.tsx",
                    lineNumber: 199,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/KickoffMeetingQuestion.tsx",
                lineNumber: 198,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/KickoffMeetingQuestion.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/questions/ProjectReviewStep.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectReviewStep
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$ClipboardDocumentListIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardDocumentListIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/solid/esm/ClipboardDocumentListIcon.js [app-ssr] (ecmascript) <export default as ClipboardDocumentListIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$DocumentTextIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentTextIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/solid/esm/DocumentTextIcon.js [app-ssr] (ecmascript) <export default as DocumentTextIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$GlobeAltIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GlobeAltIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/solid/esm/GlobeAltIcon.js [app-ssr] (ecmascript) <export default as GlobeAltIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$SparklesIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SparklesIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/solid/esm/SparklesIcon.js [app-ssr] (ecmascript) <export default as SparklesIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectPropertiesSync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectPropertiesSync.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectRequestUuid.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/specifiedInsighterProject.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectAddonsState.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectLabels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectLabels.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDescriptionState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectDescriptionState.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsPayload.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectWizardFlow.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectStepErrorToast.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectWizardNavigation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
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
const sectionIcons = [
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$ClipboardDocumentListIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardDocumentListIcon$3e$__["ClipboardDocumentListIcon"],
        className: 'bg-sky-50 text-sky-500'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$SparklesIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SparklesIcon$3e$__["SparklesIcon"],
        className: 'bg-amber-50 text-amber-500'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$DocumentTextIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentTextIcon$3e$__["DocumentTextIcon"],
        className: 'bg-emerald-50 text-emerald-500'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$GlobeAltIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GlobeAltIcon$3e$__["GlobeAltIcon"],
        className: 'bg-violet-50 text-violet-500'
    }
];
const fileTypeIconMap = {
    pdf: '/file-icons/pdf.svg',
    doc: '/file-icons/doc.svg',
    docx: '/file-icons/docx.svg',
    xls: '/file-icons/xls.svg',
    xlsx: '/file-icons/xlsx.svg',
    ppt: '/file-icons/ppt.svg',
    pptx: '/file-icons/pptx.svg',
    csv: '/file-icons/csv.svg',
    txt: '/file-icons/txt.svg',
    zip: '/file-icons/zip.svg',
    rar: '/file-icons/zip.svg',
    jpg: '/file-icons/jpg.svg',
    jpeg: '/file-icons/jpg.svg',
    mp3: '/file-icons/mp3.svg',
    mp4: '/file-icons/mp4.svg',
    pub: '/file-icons/pub.svg'
};
function readStorageValue(locale, key) {
    if ("TURBOPACK compile-time truthy", 1) return '';
    //TURBOPACK unreachable
    ;
}
function safeParseNumberArray(value) {
    if (!value) return [];
    try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) return [];
        return parsed.map((item)=>Number(item)).filter((item)=>Number.isFinite(item));
    } catch  {
        return [];
    }
}
function parseStringArray(value) {
    if (!value) return [];
    try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) return [];
        return parsed.map((item)=>String(item || '').trim()).filter(Boolean);
    } catch  {
        return [
            String(value || '').trim()
        ].filter(Boolean);
    }
}
function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
    const units = [
        'B',
        'KB',
        'MB',
        'GB'
    ];
    let value = bytes;
    let unitIndex = 0;
    while(value >= 1024 && unitIndex < units.length - 1){
        value /= 1024;
        unitIndex += 1;
    }
    return `${value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}
function formatRange(min, max, locale) {
    if (min && max) return locale === 'ar' ? `${min} إلى ${max}` : `${min} to ${max}`;
    if (min) return locale === 'ar' ? `من ${min}` : `From ${min}`;
    if (max) return locale === 'ar' ? `حتى ${max}` : `Up to ${max}`;
    return locale === 'ar' ? 'غير محدد' : 'Not specified';
}
function normalizeValue(value) {
    return String(value || '').trim().toLowerCase();
}
function stringifyValue(value) {
    if (value === null || value === undefined) return '';
    return String(value).trim();
}
function humanizeSlug(slug) {
    return slug.split('-').map((part)=>part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}
function getDisplayName(locale, value) {
    const localizedName = value.names || (value.name && typeof value.name === 'object' ? value.name : null);
    const plainName = typeof value.name === 'string' ? value.name : '';
    if (locale === 'ar') {
        return localizedName?.ar || plainName || localizedName?.en || '';
    }
    return localizedName?.en || plainName || localizedName?.ar || '';
}
function getFileIconByExtension(extension) {
    return fileTypeIconMap[normalizeValue(extension)] || fileTypeIconMap.txt;
}
function formatProjectPhase(locale, value) {
    const normalized = normalizeValue(value);
    if (normalized === 'idea stage' || normalized === 'idea' || normalized === 'idea_stage' || normalized === 'مرحلة الفكرة') {
        return locale === 'ar' ? 'مرحلة الفكرة' : 'Idea stage';
    }
    if (normalized === 'expansion' || normalized === 'التوسع') {
        return locale === 'ar' ? 'التوسع' : 'Expansion';
    }
    if (normalized === 'implementation' || normalized === 'التنفيذ') {
        return locale === 'ar' ? 'التنفيذ' : 'Implementation';
    }
    return stringifyValue(value);
}
function formatBusinessType(locale, value) {
    const normalized = normalizeValue(value);
    const labels = {
        entrepreneur: {
            en: 'Entrepreneur',
            ar: 'رائد أعمال'
        },
        'رائد أعمال': {
            en: 'Entrepreneur',
            ar: 'رائد أعمال'
        },
        startup: {
            en: 'Startup',
            ar: 'شركة ناشئة'
        },
        'شركة ناشئة': {
            en: 'Startup',
            ar: 'شركة ناشئة'
        },
        sme: {
            en: 'SME',
            ar: 'شركة صغيرة/متوسطة'
        },
        'شركة صغيرة/متوسطة': {
            en: 'SME',
            ar: 'شركة صغيرة/متوسطة'
        },
        company: {
            en: 'Company',
            ar: 'شركة'
        },
        'شركة': {
            en: 'Company',
            ar: 'شركة'
        },
        organization: {
            en: 'Organization',
            ar: 'منظمة'
        },
        'منظمة': {
            en: 'Organization',
            ar: 'منظمة'
        },
        government: {
            en: 'Government',
            ar: 'حكومة'
        },
        'حكومة': {
            en: 'Government',
            ar: 'حكومة'
        }
    };
    const match = labels[normalized];
    if (!match) return stringifyValue(value);
    return locale === 'ar' ? match.ar : match.en;
}
function formatPreferredInsighterType(locale, value) {
    const normalized = normalizeValue(value);
    if (normalized === 'individual' || normalized === 'فرد') {
        return locale === 'ar' ? 'فرد' : 'Individual';
    }
    if (normalized === 'company' || normalized === 'شركة') {
        return locale === 'ar' ? 'شركة' : 'Company';
    }
    if (normalized === 'either' || normalized === 'any' || normalized === 'كلاهما' || normalized === 'أيهما' || normalized === 'لا مانع') {
        return locale === 'ar' ? 'كلاهما' : 'Any';
    }
    return stringifyValue(value);
}
function normalizeProjectComponents(components) {
    if (!Array.isArray(components)) return {
        components: {}
    };
    return {
        components: components.reduce((acc, item)=>{
            if (!item || typeof item !== 'object') return acc;
            for (const [slug, value] of Object.entries(item)){
                acc[slug] = value;
            }
            return acc;
        }, {})
    };
}
function getTargetMarketLabels(locale, value) {
    if (!value || typeof value !== 'object') return [];
    const raw = value;
    const objects = Array.isArray(raw.objects) ? raw.objects : [];
    return objects.map((item)=>{
        if (!item || typeof item !== 'object') return stringifyValue(item);
        return getDisplayName(locale, item);
    }).filter(Boolean);
}
function getReportTypes(value) {
    if (Array.isArray(value)) {
        return value.map((item)=>stringifyValue(item).toLowerCase()).filter(Boolean);
    }
    const singleValue = stringifyValue(value).toLowerCase();
    return singleValue ? [
        singleValue
    ] : [];
}
function getDataSourceValues(locale, value) {
    const fallback = [
        locale === 'ar' ? 'لا يهم' : "Doesn't matter"
    ];
    const normalizedValue = normalizeValue(value);
    if (normalizedValue === 'primary_and_secondary_data' || normalizedValue === 'both' || normalizedValue === 'primary_secondary') {
        return [
            locale === 'ar' ? 'بيانات أولية وثانوية' : 'Primary and secondary data'
        ];
    }
    if (normalizedValue === 'primary_data') {
        return [
            locale === 'ar' ? 'بيانات أولية' : 'Primary data'
        ];
    }
    if (normalizedValue === 'secondary_data') {
        return [
            locale === 'ar' ? 'بيانات ثانوية' : 'Secondary data'
        ];
    }
    if (!value || typeof value !== 'object') return fallback;
    const raw = value;
    const primary = raw.primary_data && typeof raw.primary_data === 'object' ? Number(raw.primary_data.required) : 0;
    const secondary = raw.secondary_data && typeof raw.secondary_data === 'object' ? Number(raw.secondary_data.required) : 0;
    if (primary > 0 && secondary > 0) {
        return [
            locale === 'ar' ? 'بيانات أولية وثانوية' : 'Primary and secondary data'
        ];
    }
    if (primary > 0) {
        return [
            locale === 'ar' ? 'بيانات أولية' : 'Primary data'
        ];
    }
    if (secondary > 0) {
        return [
            locale === 'ar' ? 'بيانات ثانوية' : 'Secondary data'
        ];
    }
    return fallback;
}
async function fetchList(path, locale) {
    const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(path), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Accept-Language': locale === 'ar' ? 'ar' : 'en'
        },
        cache: 'no-store'
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res);
    const json = await res.json();
    return json.data || [];
}
async function fetchProjectRequest(locale, projectUuid) {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
    if (!token) return null;
    const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/account/project/show/${projectUuid}`), {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Accept-Language': locale === 'ar' ? 'ar' : 'en'
        },
        cache: 'no-store'
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res);
    const json = await res.json();
    return json.data || null;
}
function isOtherService(service) {
    if (!service) return false;
    const slug = String(service.slug || '').trim().toLowerCase();
    const name = String(service.name || '').trim().toLowerCase();
    const otherWord = /\bothers?\b/i;
    if (slug === 'other' || slug === 'others') return true;
    if (otherWord.test(slug)) return true;
    if (name === 'other' || name === 'others') return true;
    if (otherWord.test(name)) return true;
    if (name.includes('أخرى') || name.includes('اخرى')) return true;
    return false;
}
function getComponentTitle(locale, slug) {
    const map = {
        'deliverable-stage': {
            en: 'Deliverable stage',
            ar: 'مرحلة المخرجات'
        },
        'deliverable-type-first-draft': {
            en: 'Deliverable type (first draft)',
            ar: 'نوع المخرجات (المسودة الأولى)'
        },
        'deliverable-type-final-version': {
            en: 'Deliverable type (final version)',
            ar: 'نوع المخرجات (النسخة النهائية)'
        },
        'data-sources-expected': {
            en: 'Expected data sources',
            ar: 'مصادر البيانات المتوقعة'
        }
    };
    const label = map[slug];
    if (!label) return humanizeSlug(slug);
    return locale === 'ar' ? label.ar : label.en;
}
function getDeliverableWayLabel(locale, value) {
    const labels = {
        on_platform: {
            en: 'On platform',
            ar: 'على المنصة'
        },
        session: {
            en: 'Session',
            ar: 'جلسة'
        },
        physical_workshop: {
            en: 'Physical workshop',
            ar: 'ورشة حضورية'
        }
    };
    const match = labels[value];
    if (!match) return stringifyValue(value);
    return locale === 'ar' ? match.ar : match.en;
}
function resolveDeliverableWay(value) {
    const raw = value && typeof value === 'object' ? value : {};
    const way = raw.way && typeof raw.way === 'object' ? raw.way : {};
    const selected = stringifyValue(way.selected);
    if (selected) {
        return {
            key: selected,
            address: stringifyValue(way.address)
        };
    }
    const onPlatform = way.on_platform && typeof way.on_platform === 'object' ? Number(way.on_platform.selected) : 0;
    const session = way.session && typeof way.session === 'object' ? Number(way.session.selected) : 0;
    const workshop = way.physical_workshop && typeof way.physical_workshop === 'object' ? way.physical_workshop : {};
    if (Number(workshop.selected) > 0) {
        return {
            key: 'physical_workshop',
            address: String(workshop.address || '').trim()
        };
    }
    if (session > 0) return {
        key: 'session',
        address: ''
    };
    if (onPlatform > 0) return {
        key: 'on_platform',
        address: ''
    };
    return {
        key: 'on_platform',
        address: ''
    };
}
function buildServiceComponentSections(params) {
    const { locale, slugs, payload } = params;
    return slugs.filter((slug)=>slug !== 'target-market').map((slug)=>{
        const payloadValue = payload.components?.[slug];
        if (slug === 'deliverable-stage') {
            const raw = payloadValue && typeof payloadValue === 'object' ? payloadValue : {};
            const firstDraft = raw.first_draft && typeof raw.first_draft === 'object' ? raw.first_draft : {};
            const finalVersion = raw.final_version && typeof raw.final_version === 'object' ? raw.final_version : {};
            const firstDraftWay = resolveDeliverableWay(firstDraft);
            const finalVersionWay = resolveDeliverableWay(finalVersion);
            const firstDraftReportTypes = getReportTypes(firstDraft.report_type);
            const finalVersionReportTypes = getReportTypes(finalVersion.report_type);
            const notSpecified = locale === 'ar' ? 'غير محدد' : 'Not specified';
            return {
                title: getComponentTitle(locale, slug),
                rows: [
                    {
                        label: locale === 'ar' ? 'تاريخ المسودة الأولى' : 'First draft date',
                        value: [
                            String(firstDraft.date || '').trim() || notSpecified
                        ],
                        editStepId: 'deliverable-first-draft-date'
                    },
                    {
                        label: locale === 'ar' ? 'طريقة تسليم المسودة الأولى' : 'First draft delivery mode',
                        value: [
                            getDeliverableWayLabel(locale, firstDraftWay.key),
                            ...firstDraftWay.address ? [
                                `${locale === 'ar' ? 'العنوان' : 'Address'}: ${firstDraftWay.address}`
                            ] : []
                        ],
                        editStepId: 'deliverable-first-draft-way'
                    },
                    {
                        label: locale === 'ar' ? 'صيغ المسودة الأولى' : 'First draft formats',
                        value: firstDraftReportTypes.length === 0 ? [
                            notSpecified
                        ] : [],
                        fileTypes: firstDraftReportTypes,
                        editStepId: 'deliverable-first-draft-type'
                    },
                    {
                        label: locale === 'ar' ? 'تاريخ النسخة النهائية' : 'Final version date',
                        value: [
                            String(finalVersion.date || '').trim() || notSpecified
                        ],
                        editStepId: 'deliverable-final-version-date'
                    },
                    {
                        label: locale === 'ar' ? 'طريقة تسليم النسخة النهائية' : 'Final version delivery mode',
                        value: [
                            getDeliverableWayLabel(locale, finalVersionWay.key),
                            ...finalVersionWay.address ? [
                                `${locale === 'ar' ? 'العنوان' : 'Address'}: ${finalVersionWay.address}`
                            ] : []
                        ],
                        editStepId: 'deliverable-final-version-way'
                    },
                    {
                        label: locale === 'ar' ? 'صيغ النسخة النهائية' : 'Final version formats',
                        value: finalVersionReportTypes.length === 0 ? [
                            notSpecified
                        ] : [],
                        fileTypes: finalVersionReportTypes,
                        editStepId: 'deliverable-final-version-type'
                    }
                ]
            };
        }
        if (slug === 'data-sources-expected') {
            return {
                title: getComponentTitle(locale, slug),
                rows: [
                    {
                        label: locale === 'ar' ? 'الاختيار' : 'Selection',
                        value: getDataSourceValues(locale, payloadValue),
                        editStepId: 'data-sources-expected'
                    }
                ]
            };
        }
        const rawAnswer = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceComponentAnswerKey(locale, slug));
        const payloadValues = Array.isArray(payloadValue) ? payloadValue.map((item)=>stringifyValue(item)).filter(Boolean) : payloadValue !== null && payloadValue !== undefined && typeof payloadValue !== 'object' ? [
            stringifyValue(payloadValue)
        ].filter(Boolean) : [];
        const values = (payloadValues.length > 0 ? payloadValues : parseStringArray(rawAnswer)).map((item)=>slug.includes('deliverable-type') ? item.toUpperCase() : item);
        if (values.length === 0) return null;
        return {
            title: getComponentTitle(locale, slug),
            rows: [
                {
                    label: locale === 'ar' ? 'الإجابة' : 'Answer',
                    value: values,
                    editStepId: slug
                }
            ]
        };
    }).filter((section)=>Boolean(section));
}
function SectionBlock({ title, rows, emptyText, toneIndex, isRTL, editLabel, editHrefFor }) {
    const sectionIcon = sectionIcons[toneIndex % sectionIcons.length];
    const Icon = sectionIcon.icon;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "border-t border-slate-200 pt-6 first:border-t-0 first:pt-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex h-9 w-9 items-center justify-center rounded-full ${sectionIcon.className}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                className: "h-[18px] w-[18px]",
                                strokeWidth: 1.35
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                lineNumber: 702,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                            lineNumber: 699,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-base font-semibold text-slate-900 sm:text-lg",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                lineNumber: 705,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                            lineNumber: 704,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                    lineNumber: 698,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                lineNumber: 697,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2 xl:grid-cols-3",
                children: rows.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: `min-w-0 ${rows.length === 1 ? 'sm:col-span-2 xl:col-span-3' : row.wide ? 'sm:col-span-2 xl:col-span-2' : ''}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-2 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs font-semibold text-slate-500",
                                        children: row.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 723,
                                        columnNumber: 15
                                    }, this),
                                    row.editStepId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: editHrefFor(row.editStepId),
                                        title: `${editLabel}: ${row.label}`,
                                        "aria-label": `${editLabel}: ${row.label}`,
                                        className: "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "17",
                                            height: "17",
                                            viewBox: "0 0 17 17",
                                            fill: "none",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                "fill-rule": "evenodd",
                                                "clip-rule": "evenodd",
                                                d: "M9.83073 2.62588C10.6606 1.79601 12.0061 1.79601 12.8359 2.62588L14.3741 4.16408C15.204 4.99394 15.204 6.33941 14.3741 7.16928L6.87587 14.6675C6.74303 14.8004 6.56286 14.875 6.375 14.875H2.83333C2.44213 14.875 2.125 14.5579 2.125 14.1667V10.625C2.125 10.4371 2.19963 10.257 2.33247 10.1241L9.83073 2.62588ZM11.8342 3.62761C11.5576 3.35099 11.1091 3.35099 10.8325 3.62761L10.2101 4.25001L12.75 6.78994L13.3724 6.16754C13.649 5.89092 13.649 5.44243 13.3724 5.16581L11.8342 3.62761ZM11.7483 7.79168L9.20833 5.25174L3.54167 10.9184V13.4583H6.0816L11.7483 7.79168Z",
                                                fill: "#00A028"
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                lineNumber: 732,
                                                columnNumber: 1
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                            lineNumber: 731,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 725,
                                        columnNumber: 17
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                lineNumber: 722,
                                columnNumber: 13
                            }, this),
                            row.value.length > 0 || (row.fileTypes?.length ?? 0) > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    row.variant === 'scope-table' && row.scopeGroups ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overflow-hidden rounded-xl border border-slate-200",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                            className: "w-full border-collapse text-sm",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                children: row.scopeGroups.map((group, groupIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    scope: "colgroup",
                                                                    className: `bg-slate-50 px-4 py-3 font-semibold text-slate-900 ${isRTL ? 'text-right' : 'text-left'} ${groupIndex > 0 ? 'border-t border-slate-200' : ''}`,
                                                                    children: group.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                                    lineNumber: 748,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                                lineNumber: 747,
                                                                columnNumber: 29
                                                            }, this),
                                                            group.subscopes.length > 0 ? group.subscopes.map((sub, subIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                    className: "border-t border-slate-200",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: `px-4 py-2.5 align-top leading-6 text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`,
                                                                        children: sub
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                                        lineNumber: 765,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                }, `${row.label}-${groupIndex}-${subIndex}`, false, {
                                                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                                    lineNumber: 761,
                                                                    columnNumber: 33
                                                                }, this)) : null
                                                        ]
                                                    }, `${row.label}-${groupIndex}`, true, {
                                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                        lineNumber: 746,
                                                        columnNumber: 27
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                lineNumber: 744,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                            lineNumber: 743,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 742,
                                        columnNumber: 19
                                    }, this) : row.value.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-2",
                                        children: row.variant === 'chips' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-start gap-3 text-sm leading-6 text-slate-800",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                    lineNumber: 784,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-2",
                                                    children: row.value.map((item, itemIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700",
                                                            children: item
                                                        }, `${row.label}-${itemIndex}-${item}`, false, {
                                                            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                            lineNumber: 787,
                                                            columnNumber: 29
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                    lineNumber: 785,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                            lineNumber: 783,
                                            columnNumber: 23
                                        }, this) : row.value.map((item, itemIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex items-start gap-3 text-sm leading-6 text-slate-800",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                        lineNumber: 802,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: item
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                        lineNumber: 803,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, `${row.label}-${itemIndex}-${item}`, true, {
                                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                lineNumber: 798,
                                                columnNumber: 25
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 781,
                                        columnNumber: 19
                                    }, this) : null,
                                    row.fileTypes && row.fileTypes.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            row.value.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-2 text-xs font-semibold text-slate-500",
                                                children: isRTL ? 'الصيغ' : 'Formats'
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                lineNumber: 813,
                                                columnNumber: 23
                                            }, this) : null,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "space-y-2",
                                                children: row.fileTypes.map((fileType, itemIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: "flex items-center gap-3 text-sm leading-6 text-slate-800",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "h-1.5 w-1.5 shrink-0 rounded-full bg-sky-600"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                                lineNumber: 823,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                src: getFileIconByExtension(fileType),
                                                                alt: fileType.toUpperCase(),
                                                                width: 18,
                                                                height: 18,
                                                                className: "h-[23px] w-[18px]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                                lineNumber: 824,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: fileType.toUpperCase()
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                                lineNumber: 831,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, `${row.label}-file-${itemIndex}-${fileType}`, true, {
                                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                        lineNumber: 819,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                lineNumber: 817,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 811,
                                        columnNumber: 19
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                lineNumber: 740,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-slate-400",
                                children: emptyText
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                lineNumber: 839,
                                columnNumber: 15
                            }, this)
                        ]
                    }, row.label, true, {
                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                        lineNumber: 712,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                lineNumber: 710,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
        lineNumber: 696,
        columnNumber: 5
    }, this);
}
function ProjectReviewStep({ locale }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const isRTL = locale === 'ar';
    const [review, setReview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSpecifiedInsighter, setIsSpecifiedInsighter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [specifiedInsighterDisplayName, setSpecifiedInsighterDisplayName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"])(error, locale);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        const load = async ()=>{
            setError(null);
            const specificProject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSpecifiedInsighterProject"])(locale);
            setIsSpecifiedInsighter(specificProject);
            setSpecifiedInsighterDisplayName(specificProject ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredSpecifiedInsighterDisplay"])(locale)?.name || '' : '');
            const projectUuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredProjectRequestUuid"])(locale);
            const rawProjectType = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale));
            const deliverablesLanguage = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].deliverablesLanguageKey(locale));
            const insighterIndustryLabel = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterIndustryLabelKey(locale));
            const storedServiceLabel = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceLabelKey(locale));
            const servicePrompt = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].servicePromptKey(locale));
            const projectStatus = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectStatusKey(locale));
            const whoAreYou = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].whoAreYouKey(locale));
            const preferredInsighterType = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].preferredInsighterTypeKey(locale));
            const originType = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterOriginTypeKey(locale));
            const originId = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterOriginIdKey(locale));
            const targetMode = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketModeKey(locale));
            const projectDeadline = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].deadlineKey(locale));
            const countryIds = safeParseNumberArray(readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketCountryIdsKey(locale)));
            const regionIds = safeParseNumberArray(readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketRegionIdsKey(locale)));
            const blocIds = safeParseNumberArray(readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketEconomicBlocIdsKey(locale)));
            const needsCountries = originType === 'country' || targetMode === 'country';
            const needsRegions = originType === 'region' || targetMode === 'worldwide' || targetMode === 'regions';
            const needsBlocs = targetMode === 'economic';
            let requestData = null;
            let countries = [];
            let regions = [];
            let blocs = [];
            const [requestResult, countriesResult, regionsResult, blocsResult] = await Promise.allSettled([
                projectUuid ? fetchProjectRequest(locale, projectUuid) : Promise.resolve(null),
                needsCountries ? fetchList('/api/common/setting/country/list', locale) : Promise.resolve([]),
                needsRegions ? fetchList('/api/common/setting/region/list', locale) : Promise.resolve([]),
                needsBlocs ? fetchList('/api/common/setting/economic-bloc/list', locale) : Promise.resolve([])
            ]);
            if (requestResult.status === 'fulfilled') {
                requestData = requestResult.value;
            }
            if (countriesResult.status === 'fulfilled') {
                countries = countriesResult.value;
            }
            if (regionsResult.status === 'fulfilled') {
                regions = regionsResult.value;
            }
            if (blocsResult.status === 'fulfilled') {
                blocs = blocsResult.value;
            }
            const firstRejectedResult = [
                requestResult,
                countriesResult,
                regionsResult,
                blocsResult
            ].find((result)=>result.status === 'rejected');
            if (firstRejectedResult && !cancelled) {
                if (!cancelled) {
                    setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(firstRejectedResult.reason, isRTL ? 'تعذر تحميل تفاصيل المراجعة.' : 'Failed to load review details.'));
                }
            }
            const service = requestData?.service || null;
            const serviceName = storedServiceLabel || service?.name || (isRTL ? 'غير محدد' : 'Not specified');
            const projectTitle = String(requestData?.title || '').trim();
            const headerTitle = projectTitle || (isRTL ? 'ملخص المشروع' : 'Project Summary');
            const storedOriginLabel = originType === 'country' ? countries.find((item)=>String(item.id) === originId) ? getDisplayName(locale, countries.find((item)=>String(item.id) === originId)) : originId : originType === 'region' ? getDisplayName(locale, regions.find((item)=>String(item.id) === originId) || {}) || originId : '';
            const originLabel = storedOriginLabel || (requestData?.insighter_origin ? getDisplayName(locale, requestData.insighter_origin) : isRTL ? 'غير محدد' : 'Not specified');
            const targetMarket = targetMode === 'country' ? countryIds.map((id)=>{
                const match = countries.find((item)=>item.id === id);
                return match ? getDisplayName(locale, match) : `#${id}`;
            }) : targetMode === 'economic' ? blocIds.map((id)=>{
                const match = blocs.find((item)=>item.id === id);
                return match ? getDisplayName(locale, match) : `#${id}`;
            }) : targetMode === 'worldwide' ? [
                locale === 'ar' ? 'عالميًا' : 'Worldwide'
            ] : regionIds.map((id)=>getDisplayName(locale, regions.find((item)=>item.id === id) || {}) || `#${id}`);
            const descriptionState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDescriptionState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readProjectDescriptionState"])(locale);
            const addonsState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readProjectAddonsState"])(locale);
            const scopeSnapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readProjectScopeSnapshot"])(locale);
            const storedServiceComponentsPayload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readServiceComponentsPayload"])(locale);
            const apiServiceComponentsPayload = normalizeProjectComponents(requestData?.components);
            const serviceComponentsPayload = {
                components: {
                    ...apiServiceComponentsPayload.components || {},
                    ...storedServiceComponentsPayload.components || {}
                }
            };
            const serviceComponentSlugs = Array.from(new Set([
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readServiceComponentSlugs"])(locale),
                ...Object.keys(serviceComponentsPayload.components || {})
            ]));
            const apiTargetMarket = getTargetMarketLabels(locale, serviceComponentsPayload.components?.['target-market']);
            const serviceComponentSections = buildServiceComponentSections({
                locale,
                slugs: serviceComponentSlugs,
                payload: serviceComponentsPayload
            });
            const projectTypeValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectLabels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectTypeLabel"])(locale, rawProjectType || stringifyValue(requestData?.type) || null);
            const projectStatusValue = formatProjectPhase(locale, projectStatus || stringifyValue(requestData?.phase));
            const businessTypeValue = formatBusinessType(locale, whoAreYou || stringifyValue(requestData?.business_type));
            const preferredInsighterTypeValue = formatPreferredInsighterType(locale, preferredInsighterType || stringifyValue(requestData?.insighter_preferred_type));
            const insighterMinYearsExperience = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterMinYearsExperienceKey(locale)) || stringifyValue(requestData?.insighter_min_years_experience);
            const insighterMaxYearsExperience = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterMaxYearsExperienceKey(locale)) || stringifyValue(requestData?.insighter_max_years_experience);
            const companyMinTeamSize = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].companyMinTeamSizeKey(locale)) || stringifyValue(requestData?.company_min_team_size);
            const companyMaxTeamSize = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].companyMaxTeamSizeKey(locale)) || stringifyValue(requestData?.company_max_team_size);
            const nextReview = {
                title: headerTitle,
                projectType: projectTypeValue || (isRTL ? 'غير محدد' : 'Not specified'),
                deliverablesLanguage: deliverablesLanguage || (isRTL ? 'غير محدد' : 'Not specified'),
                insighterIndustry: insighterIndustryLabel || (isRTL ? 'غير محدد' : 'Not specified'),
                service: serviceName,
                projectStatus: projectStatusValue || (isRTL ? 'غير محدد' : 'Not specified'),
                whoAreYou: businessTypeValue || (isRTL ? 'غير محدد' : 'Not specified'),
                preferredInsighterType: preferredInsighterTypeValue || (isRTL ? 'غير محدد' : 'Not specified'),
                origin: originLabel,
                experienceRange: formatRange(insighterMinYearsExperience, insighterMaxYearsExperience, locale),
                teamSizeRange: formatRange(companyMinTeamSize, companyMaxTeamSize, locale),
                targetMarket: targetMarket.length > 0 ? targetMarket : apiTargetMarket.length > 0 ? apiTargetMarket : [
                    isRTL ? 'غير محدد' : 'Not specified'
                ],
                deadline: projectDeadline,
                servicePrompt: servicePrompt.trim() || stringifyValue(requestData?.service_prompt),
                description: descriptionState.description || stringifyValue(requestData?.description),
                descriptionFiles: descriptionState.files,
                scopeSnapshot,
                kickoffMeeting: addonsState.kickoffMeeting.enabled,
                serviceComponentSections
            };
            if (!cancelled) setReview(nextReview);
        };
        void load();
        return ()=>{
            cancelled = true;
        };
    }, [
        isRTL,
        locale
    ]);
    const emptyText = isRTL ? 'غير محدد' : 'Not specified';
    const editLabel = isRTL ? 'تعديل' : 'Edit';
    const overviewRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!review) return [];
        return [
            {
                label: isRTL ? 'نوع المشروع' : 'Project type',
                value: [
                    review.projectType
                ],
                editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectType
            },
            {
                label: isRTL ? 'لغة المخرجات' : 'Deliverables language',
                value: [
                    review.deliverablesLanguage
                ],
                editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].deliverablesLanguage
            },
            {
                label: isRTL ? 'الصناعة' : 'Industry',
                value: [
                    review.insighterIndustry
                ],
                editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].insighterIndustry
            },
            {
                label: isRTL ? 'الخدمة' : 'Service',
                value: [
                    review.service
                ],
                editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].service
            },
            ...isSpecifiedInsighter ? [
                {
                    label: isRTL ? 'نوع المطابقة' : 'Matching mode',
                    value: [
                        specifiedInsighterDisplayName ? `${isRTL ? 'الخدمة بواسطة' : 'Service by'} ${specifiedInsighterDisplayName}` : isRTL ? 'الخدمة بواسطة' : 'Service by'
                    ]
                }
            ] : [],
            {
                label: isRTL ? 'مرحلة المشروع' : 'Project status',
                value: [
                    review.projectStatus
                ],
                editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectStatus
            },
            {
                label: isRTL ? 'نوع العميل' : 'Business profile',
                value: [
                    review.whoAreYou
                ],
                editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].whoAreYou
            },
            {
                label: isRTL ? 'موعد التسليم' : 'Delivery deadline',
                value: review.deadline ? [
                    review.deadline
                ] : [],
                editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectDeadline
            }
        ];
    }, [
        isRTL,
        isSpecifiedInsighter,
        locale,
        review,
        specifiedInsighterDisplayName
    ]);
    const scopeRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!review) return [];
        return [
            {
                label: isRTL ? 'النطاق' : 'Scope',
                variant: 'scope-table',
                scopeGroups: review.scopeSnapshot.map((scope)=>({
                        name: scope.name,
                        subscopes: scope.subscopes
                    })),
                value: review.scopeSnapshot.flatMap((scope)=>scope.subscopes.length > 0 ? scope.subscopes.map((subscope)=>`${scope.name}: ${subscope}`) : [
                        scope.name
                    ]),
                editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectSubscopes,
                wide: true
            },
            ...review.servicePrompt ? [
                {
                    label: isRTL ? 'ملاحظة الخدمة' : 'Service note',
                    value: [
                        review.servicePrompt
                    ],
                    editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].service
                }
            ] : []
        ];
    }, [
        isRTL,
        review
    ]);
    const contextRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!review) return [];
        return [
            {
                label: isRTL ? 'الوصف الإضافي' : 'Additional description',
                value: review.description ? [
                    review.description
                ] : [],
                editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectDescription,
                wide: true
            },
            {
                label: isRTL ? 'الملفات المرفقة' : 'Attachments',
                value: review.descriptionFiles.map((file)=>`${file.name} (${formatBytes(file.size)})`),
                editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectDescription
            }
        ];
    }, [
        isRTL,
        review
    ]);
    const preferenceRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!review) return [];
        return [
            {
                label: isRTL ? 'السوق المستهدف' : 'Target market',
                value: review.targetMarket,
                variant: 'chips',
                editStepId: 'target-market'
            },
            ...isSpecifiedInsighter ? [] : [
                {
                    label: isRTL ? 'نوع الخبير المفضل' : 'Preferred insighter type',
                    value: [
                        review.preferredInsighterType
                    ],
                    editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].preferredInsighterType
                },
                {
                    label: isRTL ? 'الأصل المفضل' : 'Preferred origin',
                    value: [
                        review.origin
                    ],
                    editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].insighterOrigin
                },
                {
                    label: isRTL ? 'سنوات الخبرة' : 'Experience range',
                    value: review.experienceRange === emptyText ? [] : [
                        review.experienceRange
                    ],
                    editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].insighterExperience
                },
                {
                    label: isRTL ? 'حجم فريق الشركة' : 'Company team size',
                    value: review.teamSizeRange === emptyText ? [] : [
                        review.teamSizeRange
                    ],
                    editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].companyTeamSize
                }
            ],
            {
                label: isRTL ? 'اجتماع الانطلاقة' : 'Kickoff meeting',
                value: [
                    review.kickoffMeeting ? isRTL ? 'مطلوب' : 'Requested' : isRTL ? 'غير مطلوب' : 'Not requested'
                ],
                editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].kickoffMeeting
            }
        ];
    }, [
        emptyText,
        isRTL,
        isSpecifiedInsighter,
        review
    ]);
    const reviewContinueLabel = isSpecifiedInsighter ? nav.continueLabel : isRTL ? 'اعثر على الخبراء' : 'Find your Experts';
    const onContinue = async ()=>{
        if (submitting) return;
        setSubmitting(true);
        setError(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectPropertiesSync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syncProjectProperties"])(locale);
            router.push(nav.nextHref || `/${locale}/project`);
        } catch (err) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر حفظ التعديلات قبل المتابعة.' : 'Failed to save edits before continuing.'));
        } finally{
            setSubmitting(false);
        }
    };
    if (!review) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-6xl mx-auto min-h-full flex flex-col",
            dir: isRTL ? 'rtl' : 'ltr',
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-auto rounded-md px-4 py-8 sm:px-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-[980px] rounded-[32px] border border-slate-200 bg-white px-8 py-16",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center text-base text-slate-600",
                        children: isRTL ? 'جاري إعداد ملخص المشروع...' : 'Preparing project summary...'
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                        lineNumber: 1342,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                    lineNumber: 1341,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                lineNumber: 1340,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
            lineNumber: 1339,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-6xl mx-auto min-h-full flex flex-col",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-auto rounded-md px-4 pb-32 pt-8 sm:px-6 sm:pb-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-[980px] overflow-hidden rounded-[36px] border border-slate-200 bg-white",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-start justify-between gap-6 border-b border-slate-200 pb-8",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0 flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex h-20 w-20 items-center justify-center rounded-[20px]",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        src: "https://res.cloudinary.com/dsiku9ipv/image/upload/v1777619443/smallLogo_3_wnmkra.png",
                                                        alt: "Foresighta",
                                                        width: 34,
                                                        height: 34,
                                                        className: "h-auto w-auto"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                        lineNumber: 1363,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                    lineNumber: 1362,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "min-w-0",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                        className: "mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl",
                                                        children: review.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                        lineNumber: 1373,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                    lineNumber: 1372,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                            lineNumber: 1361,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-5 flex flex-wrap gap-2.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700",
                                                    children: review.projectType
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                    lineNumber: 1380,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700",
                                                    children: review.service
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                    lineNumber: 1383,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700",
                                                    children: review.deliverablesLanguage
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                    lineNumber: 1386,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                            lineNumber: 1379,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                    lineNumber: 1360,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                lineNumber: 1359,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-8 space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionBlock, {
                                        title: isRTL ? 'نظرة عامة' : 'Overview',
                                        rows: overviewRows,
                                        emptyText: emptyText,
                                        toneIndex: 0,
                                        isRTL: isRTL,
                                        editLabel: editLabel,
                                        editHrefFor: nav.editHrefFor
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 1394,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionBlock, {
                                        title: isRTL ? 'النطاق والمخرجات' : 'Scope and deliverables',
                                        rows: scopeRows,
                                        emptyText: emptyText,
                                        toneIndex: 1,
                                        isRTL: isRTL,
                                        editLabel: editLabel,
                                        editHrefFor: nav.editHrefFor
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 1404,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionBlock, {
                                        title: isSpecifiedInsighter ? isRTL ? 'تفضيلات المشروع' : 'Project preferences' : isRTL ? 'السوق وتفضيلات الخبير' : 'Market and expert preferences',
                                        rows: preferenceRows,
                                        emptyText: emptyText,
                                        toneIndex: 2,
                                        isRTL: isRTL,
                                        editLabel: editLabel,
                                        editHrefFor: nav.editHrefFor
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 1414,
                                        columnNumber: 15
                                    }, this),
                                    review.serviceComponentSections.map((section, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionBlock, {
                                            title: section.title,
                                            rows: section.rows,
                                            emptyText: emptyText,
                                            toneIndex: index + 3,
                                            isRTL: isRTL,
                                            editLabel: editLabel,
                                            editHrefFor: nav.editHrefFor
                                        }, section.title, false, {
                                            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                            lineNumber: 1433,
                                            columnNumber: 17
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionBlock, {
                                        title: isRTL ? 'تفاصيل إضافية' : 'Additional details',
                                        rows: contextRows,
                                        emptyText: emptyText,
                                        toneIndex: review.serviceComponentSections.length + 3,
                                        isRTL: isRTL,
                                        editLabel: editLabel,
                                        editHrefFor: nav.editHrefFor
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 1445,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                lineNumber: 1393,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                        lineNumber: 1358,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                    lineNumber: 1357,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                lineNumber: 1356,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: nav.backHref,
                                className: "btn-sm rounded-full border border-slate-200 bg-white px-6 py-2 text-slate-700 hover:bg-slate-50",
                                children: isRTL ? 'رجوع' : 'Back'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                lineNumber: 1462,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>void onContinue(),
                                disabled: submitting,
                                className: `btn-sm rounded-full px-6 py-2 ${submitting ? 'cursor-not-allowed bg-slate-200 text-slate-500' : 'bg-[#1C7CBB] text-white hover:bg-opacity-90'}`,
                                children: submitting ? isRTL ? 'جاري الحفظ...' : 'Saving...' : reviewContinueLabel
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                lineNumber: 1469,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                        lineNumber: 1461,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                    lineNumber: 1460,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                lineNumber: 1459,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
        lineNumber: 1352,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/questions/ProjectSubmissionSuccessStep.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectSubmissionSuccessStep
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function ProjectSubmissionSuccessStep({ locale }) {
    const isRTL = locale === 'ar';
    const isEnglish = typeof locale === 'string' && locale.toLowerCase().startsWith('en');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearProjectWizardStorage"])(locale);
    }, [
        locale
    ]);
    const title = isRTL ? 'تهانينا، تم إرسال الطلب' : 'Congratulations, your proposal is submitted';
    const body = isRTL ? 'أرسلنا العرض بنجاح إلى الجهات والخبراء الذين اخترتهم. يمكنك الآن متابعة حالة المشروع من صفحة المشاريع.' : 'Your offer has been submitted successfully to the selected matches. You can now track the project from your projects page.';
    const primaryAction = isRTL ? 'عرض مشاريعي' : 'View my projects';
    const secondaryAction = isRTL ? 'إنشاء طلب جديد' : 'Start another request';
    const statLabel = isRTL ? 'الخطوة التالية' : 'What happens next';
    const statText = isRTL ? 'سيتمكن الطرف المطابق من مراجعة العرض واتخاذ الإجراء المناسب.' : 'Your matched insighters or companies can now review the offer and respond.';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mx-auto flex min-h-full w-full max-w-6xl items-center justify-center px-1 py-6 sm:px-0",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            isEnglish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
          #project-submission-success-title {
            font-family: "IBM Plex Serif", serif !important;
          }
        `
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectSubmissionSuccessStep.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes projectSuccessFloat {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(0, -10px, 0) scale(1.03); }
        }

        @keyframes projectSuccessPulse {
          0% { transform: scale(0.9); opacity: 0.32; }
          70% { transform: scale(1.25); opacity: 0; }
          100% { transform: scale(1.25); opacity: 0; }
        }

        @keyframes projectSuccessOrbit {
          0% { transform: rotate(0deg) translateY(-150px) rotate(0deg); opacity: 0.28; }
          50% { opacity: 0.9; }
          100% { transform: rotate(360deg) translateY(-150px) rotate(-360deg); opacity: 0.28; }
        }

        @keyframes projectSuccessRise {
          0% { transform: translate3d(0, 18px, 0) scale(0.8); opacity: 0; }
          100% { transform: translate3d(0, 0, 0) scale(1); opacity: 1; }
        }

        @keyframes projectSuccessCheckCircle {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes projectSuccessCheckmark {
          0% { stroke-dashoffset: 100; opacity: 0; }
          20% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
      `
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectSubmissionSuccessStep.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full overflow-hidden px-3 py-4 sm:px-6 sm:py-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none absolute inset-0 overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute left-1/2 top-[18%] h-64 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(28,124,187,0.16),rgba(28,124,187,0)_68%)] blur-2xl sm:h-[22rem] sm:w-[22rem]"
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectSubmissionSuccessStep.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute right-[8%] top-[16%] h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.32),rgba(251,191,36,0)_70%)] blur-xl sm:h-24 sm:w-24"
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectSubmissionSuccessStep.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute left-[6%] bottom-[16%] h-20 w-20 rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.24),rgba(52,211,153,0)_70%)] blur-xl sm:h-28 sm:w-28"
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectSubmissionSuccessStep.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this),
                            [
                                {
                                    left: '16%',
                                    top: '22%',
                                    delay: '0s',
                                    duration: '9s'
                                },
                                {
                                    left: '50%',
                                    top: '14%',
                                    delay: '1.2s',
                                    duration: '11s'
                                },
                                {
                                    left: '82%',
                                    top: '28%',
                                    delay: '2.2s',
                                    duration: '10s'
                                },
                                {
                                    left: '24%',
                                    top: '74%',
                                    delay: '0.8s',
                                    duration: '12s'
                                },
                                {
                                    left: '72%',
                                    top: '76%',
                                    delay: '1.8s',
                                    duration: '8.5s'
                                }
                            ].map((particle)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "absolute hidden h-3 w-3 rounded-full bg-white/90 shadow-[0_0_0_6px_rgba(255,255,255,0.12)] sm:block",
                                    style: {
                                        left: particle.left,
                                        top: particle.top,
                                        animation: `projectSuccessRise 700ms ease-out ${particle.delay} both, projectSuccessFloat ${particle.duration} ease-in-out ${particle.delay} infinite`
                                    }
                                }, `${particle.left}-${particle.top}`, false, {
                                    fileName: "[project]/components/project/questions/ProjectSubmissionSuccessStep.tsx",
                                    lineNumber: 93,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectSubmissionSuccessStep.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 flex flex-col items-center text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex h-32 w-32 items-center justify-center sm:h-44 sm:w-44",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute inset-0 rounded-full border border-sky-200/80 bg-sky-100/50",
                                        style: {
                                            animation: 'projectSuccessPulse 2.8s ease-out infinite'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectSubmissionSuccessStep.tsx",
                                        lineNumber: 107,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute inset-[14%] rounded-full border border-amber-200/70 bg-white/80 shadow-[0_0_0_18px_rgba(255,255,255,0.35)]",
                                        style: {
                                            animation: 'projectSuccessFloat 6s ease-in-out infinite'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectSubmissionSuccessStep.tsx",
                                        lineNumber: 111,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative flex h-20 w-20 items-center justify-center rounded-full bg-[linear-gradient(145deg,#169b62,#49c98b)] text-white shadow-[0_18px_40px_rgba(22,155,98,0.35)] sm:h-28 sm:w-28",
                                        style: {
                                            animation: 'projectSuccessCheckCircle 600ms ease-out both'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-1 rounded-full border border-white/25"
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectSubmissionSuccessStep.tsx",
                                                lineNumber: 120,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "relative h-10 w-10 sm:h-14 sm:w-14",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                "aria-hidden": "true",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M5 13l4 4L19 7",
                                                    stroke: "currentColor",
                                                    strokeWidth: "3",
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    style: {
                                                        strokeDasharray: 100,
                                                        strokeDashoffset: 100,
                                                        animation: 'projectSuccessCheckmark 800ms ease-out 400ms forwards'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectSubmissionSuccessStep.tsx",
                                                    lineNumber: 128,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectSubmissionSuccessStep.tsx",
                                                lineNumber: 121,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/project/questions/ProjectSubmissionSuccessStep.tsx",
                                        lineNumber: 116,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/ProjectSubmissionSuccessStep.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                id: "project-submission-success-title",
                                className: "mt-4 max-w-3xl text-3xl font-medium leading-[1.2] text-slate-950 sm:mt-6 sm:text-[clamp(2rem,5vw,3rem)]",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectSubmissionSuccessStep.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:mt-5 sm:text-base",
                                children: body
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectSubmissionSuccessStep.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 w-full max-w-2xl text-center sm:mt-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-700",
                                        children: statLabel
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectSubmissionSuccessStep.tsx",
                                        lineNumber: 155,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mx-auto mt-2 h-px w-20 bg-gradient-to-r from-transparent via-sky-300 to-transparent",
                                        "aria-hidden": "true"
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectSubmissionSuccessStep.tsx",
                                        lineNumber: 158,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 text-base font-medium leading-7 text-slate-800 sm:text-[17px]",
                                        children: statText
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectSubmissionSuccessStep.tsx",
                                        lineNumber: 159,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/ProjectSubmissionSuccessStep.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-7 flex w-full max-w-xl flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: `${("TURBOPACK compile-time value", "http://localhost:4200")}/app/insighter-dashboard/projects-created`,
                                        className: "btn-sm rounded-full bg-[#1C7CBB] px-6 py-3 text-center text-white shadow-[0_18px_40px_rgba(28,124,187,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#17689e]",
                                        children: primaryAction
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectSubmissionSuccessStep.tsx",
                                        lineNumber: 165,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/${locale}/project/wizard/project-type?fresh=1`,
                                        className: "btn-sm rounded-full border border-slate-200 bg-white/90 px-6 py-3 text-center text-slate-700 transition-colors duration-200 hover:border-slate-300 hover:bg-white",
                                        children: secondaryAction
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectSubmissionSuccessStep.tsx",
                                        lineNumber: 171,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/ProjectSubmissionSuccessStep.tsx",
                                lineNumber: 164,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectSubmissionSuccessStep.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/ProjectSubmissionSuccessStep.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/ProjectSubmissionSuccessStep.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/questions/DeliverablesLanguageQuestion.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DeliverablesLanguageQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/ProjectSelectedTypeHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectWizardNavigation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ChoiceCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/ChoiceCard.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function getOptions(locale) {
    const isRTL = locale === 'ar';
    if (isRTL) {
        return [
            {
                value: 'Arabic',
                label: 'العربية'
            },
            {
                value: 'English',
                label: 'الإنجليزية'
            }
        ];
    }
    return [
        {
            value: 'Arabic',
            label: 'Arabic'
        },
        {
            value: 'English',
            label: 'English'
        }
    ];
}
function DeliverablesLanguageQuestion({ locale }) {
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const isRTL = locale === 'ar';
    const isEnglish = typeof locale === 'string' && locale.toLowerCase().startsWith('en');
    const options = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>getOptions(locale), [
        locale
    ]);
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [projectType, setProjectType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isAdvancing, setIsAdvancing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = window.setTimeout(()=>setEntered(true), 30);
        return ()=>window.clearTimeout(timer);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            setProjectType(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale)));
            const saved = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].deliverablesLanguageKey(locale));
            if (saved && (saved === 'Arabic' || saved === 'English')) {
                setSelected(saved);
            }
        } catch  {
        // ignore
        }
    }, [
        locale
    ]);
    const title = isRTL ? 'اختر اللغة التي<br> سيتم استخدامها للمخرجات؟' : 'Select the language <br> to be used for the deliverables ?';
    const canContinue = selected !== null;
    const onSelect = (value)=>{
        if (isAdvancing) return;
        setSelected(value);
        try {
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].deliverablesLanguageKey(locale), value);
        } catch  {
        // ignore
        }
        setIsAdvancing(true);
        nav.goNext();
    };
    const onContinue = ()=>{
        if (!selected || isAdvancing) return;
        try {
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].deliverablesLanguageKey(locale), selected);
        } catch  {
        // ignore
        }
        setIsAdvancing(true);
        nav.goNext();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-4xl mx-auto min-h-full flex flex-col",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 pb-28",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        locale: locale,
                        entered: entered,
                        projectTypeId: projectType
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/DeliverablesLanguageQuestion.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mt-2 text-start transition-all duration-700 ${entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'}`,
                        children: [
                            isEnglish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                children: `
              #deliverables-language-question-title {
                font-family: "IBM Plex Serif", serif !important;
              }
            `
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/DeliverablesLanguageQuestion.tsx",
                                lineNumber: 117,
                                columnNumber: 13
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "deliverables-language-question-title",
                                className: "text-2xl sm:text-3xl font-medium tracking-tight text-slate-900 text-start",
                                dangerouslySetInnerHTML: {
                                    __html: title
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/DeliverablesLanguageQuestion.tsx",
                                lineNumber: 123,
                                columnNumber: 10
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/DeliverablesLanguageQuestion.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 sm:mt-20",
                        role: "radiogroup",
                        "aria-label": title,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                            children: options.map((opt, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ChoiceCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    checked: selected === opt.value,
                                    title: opt.label,
                                    onSelect: ()=>onSelect(opt.value),
                                    entered: entered,
                                    isRTL: isRTL,
                                    delayMs: 110 + index * 70,
                                    align: "center",
                                    size: "sm",
                                    className: "min-h-[92px]",
                                    contentClassName: "px-5 py-4 gap-2"
                                }, opt.value, false, {
                                    fileName: "[project]/components/project/questions/DeliverablesLanguageQuestion.tsx",
                                    lineNumber: 133,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/DeliverablesLanguageQuestion.tsx",
                            lineNumber: 131,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/DeliverablesLanguageQuestion.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/DeliverablesLanguageQuestion.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed left-0 right-0 z-20 bottom-0 border-t border-slate-200/70 bg-white/80 backdrop-blur-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: nav.backHref,
                                className: "btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200",
                                children: isRTL ? 'رجوع' : 'Back'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/DeliverablesLanguageQuestion.tsx",
                                lineNumber: 154,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onContinue,
                                disabled: !canContinue || isAdvancing,
                                className: `btn-sm px-6 py-2 rounded-full ${canContinue ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90' : 'text-slate-500 bg-slate-200 cursor-not-allowed'}`,
                                children: nav.continueLabel
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/DeliverablesLanguageQuestion.tsx",
                                lineNumber: 161,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/DeliverablesLanguageQuestion.tsx",
                        lineNumber: 153,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/DeliverablesLanguageQuestion.tsx",
                    lineNumber: 152,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/DeliverablesLanguageQuestion.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/DeliverablesLanguageQuestion.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/questions/InsighterIndustryQuestion.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IndustryCard",
    ()=>IndustryCard,
    "default",
    ()=>InsighterIndustryQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBallFootball$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBallFootball$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBallFootball.mjs [app-ssr] (ecmascript) <export default as IconBallFootball>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBolt$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBolt$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBolt.mjs [app-ssr] (ecmascript) <export default as IconBolt>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBriefcase$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBriefcase$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBriefcase.mjs [app-ssr] (ecmascript) <export default as IconBriefcase>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuilding$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuilding$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBuilding.mjs [app-ssr] (ecmascript) <export default as IconBuilding>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuildingBank$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuildingBank$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBuildingBank.mjs [app-ssr] (ecmascript) <export default as IconBuildingBank>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuildingMonument$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuildingMonument$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBuildingMonument.mjs [app-ssr] (ecmascript) <export default as IconBuildingMonument>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCheck.mjs [app-ssr] (ecmascript) <export default as IconCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCpu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCpu$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCpu.mjs [app-ssr] (ecmascript) <export default as IconCpu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDeviceMobile$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDeviceMobile$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconDeviceMobile.mjs [app-ssr] (ecmascript) <export default as IconDeviceMobile>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDots$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDots$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconDots.mjs [app-ssr] (ecmascript) <export default as IconDots>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFlask2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFlask2$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconFlask2.mjs [app-ssr] (ecmascript) <export default as IconFlask2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconHeartbeat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconHeartbeat$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconHeartbeat.mjs [app-ssr] (ecmascript) <export default as IconHeartbeat>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconHome$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconHome$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconHome.mjs [app-ssr] (ecmascript) <export default as IconHome>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLeaf$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLeaf$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconLeaf.mjs [app-ssr] (ecmascript) <export default as IconLeaf>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPackage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPackage$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconPackage.mjs [app-ssr] (ecmascript) <export default as IconPackage>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlane$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlane$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconPlane.mjs [app-ssr] (ecmascript) <export default as IconPlane>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconSearch.mjs [app-ssr] (ecmascript) <export default as IconSearch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconShoppingCart$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconShoppingCart.mjs [app-ssr] (ecmascript) <export default as IconShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSpeakerphone$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSpeakerphone$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconSpeakerphone.mjs [app-ssr] (ecmascript) <export default as IconSpeakerphone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTools$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTools$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconTools.mjs [app-ssr] (ecmascript) <export default as IconTools>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTruck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTruck$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconTruck.mjs [app-ssr] (ecmascript) <export default as IconTruck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconUsers$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconUsers$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconUsers.mjs [app-ssr] (ecmascript) <export default as IconUsers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconWorld$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconWorld$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconWorld.mjs [app-ssr] (ecmascript) <export default as IconWorld>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconX.mjs [app-ssr] (ecmascript) <export default as IconX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/ProjectSelectedTypeHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectWizardFlow.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectStepErrorToast.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectWizardNavigation.ts [app-ssr] (ecmascript)");
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
const INDUSTRY_META = [
    {
        words: [
            'chemical',
            'resource'
        ],
        meta: {
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFlask2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFlask2$3e$__["IconFlask2"],
            iconClass: 'bg-blue-50 text-blue-600'
        }
    },
    {
        words: [
            'construction'
        ],
        meta: {
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuilding$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuilding$3e$__["IconBuilding"],
            iconClass: 'bg-amber-50 text-amber-600'
        }
    },
    {
        words: [
            'commerce',
            'retail',
            'trade'
        ],
        meta: {
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconShoppingCart$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconShoppingCart$3e$__["IconShoppingCart"],
            iconClass: 'bg-emerald-50 text-emerald-600'
        }
    },
    {
        words: [
            'economy',
            'politic'
        ],
        meta: {
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuildingMonument$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuildingMonument$3e$__["IconBuildingMonument"],
            iconClass: 'bg-violet-50 text-violet-600'
        }
    },
    {
        words: [
            'energy',
            'environment'
        ],
        meta: {
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBolt$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBolt$3e$__["IconBolt"],
            iconClass: 'bg-yellow-50 text-yellow-700'
        }
    },
    {
        words: [
            'health',
            'pharma',
            'medtech'
        ],
        meta: {
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconHeartbeat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconHeartbeat$3e$__["IconHeartbeat"],
            iconClass: 'bg-rose-50 text-rose-600'
        }
    },
    {
        words: [
            'internet'
        ],
        meta: {
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconWorld$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconWorld$3e$__["IconWorld"],
            iconClass: 'bg-cyan-50 text-cyan-600'
        }
    },
    {
        words: [
            'life',
            'society'
        ],
        meta: {
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconUsers$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconUsers$3e$__["IconUsers"],
            iconClass: 'bg-pink-50 text-pink-600'
        }
    },
    {
        words: [
            'real estate'
        ],
        meta: {
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconHome$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconHome$3e$__["IconHome"],
            iconClass: 'bg-teal-50 text-teal-600'
        }
    },
    {
        words: [
            'sport',
            'recreation'
        ],
        meta: {
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBallFootball$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBallFootball$3e$__["IconBallFootball"],
            iconClass: 'bg-orange-50 text-orange-600'
        }
    },
    {
        words: [
            'management',
            'professional',
            'service'
        ],
        meta: {
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBriefcase$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBriefcase$3e$__["IconBriefcase"],
            iconClass: 'bg-indigo-50 text-indigo-600'
        }
    },
    {
        words: [
            'travel',
            'tourism',
            'hospitality'
        ],
        meta: {
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlane$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlane$3e$__["IconPlane"],
            iconClass: 'bg-sky-50 text-sky-600'
        }
    },
    {
        words: [
            'agriculture'
        ],
        meta: {
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLeaf$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLeaf$3e$__["IconLeaf"],
            iconClass: 'bg-lime-50 text-lime-700'
        }
    },
    {
        words: [
            'finance',
            'insurance'
        ],
        meta: {
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuildingBank$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuildingBank$3e$__["IconBuildingBank"],
            iconClass: 'bg-cyan-50 text-cyan-700'
        }
    },
    {
        words: [
            'advertising',
            'marketing',
            'media'
        ],
        meta: {
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSpeakerphone$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSpeakerphone$3e$__["IconSpeakerphone"],
            iconClass: 'bg-fuchsia-50 text-fuchsia-600'
        }
    },
    {
        words: [
            'consumer',
            'fmcg'
        ],
        meta: {
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPackage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPackage$3e$__["IconPackage"],
            iconClass: 'bg-orange-50 text-orange-700'
        }
    },
    {
        words: [
            'technology',
            'telecommunication'
        ],
        meta: {
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDeviceMobile$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDeviceMobile$3e$__["IconDeviceMobile"],
            iconClass: 'bg-violet-50 text-violet-600'
        }
    },
    {
        words: [
            'metal',
            'electronic',
            'mining',
            'material'
        ],
        meta: {
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCpu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCpu$3e$__["IconCpu"],
            iconClass: 'bg-slate-200 text-slate-700'
        }
    },
    {
        words: [
            'transportation',
            'logistics'
        ],
        meta: {
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTruck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTruck$3e$__["IconTruck"],
            iconClass: 'bg-blue-50 text-blue-700'
        }
    }
];
const FALLBACK_META = {
    Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTools$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTools$3e$__["IconTools"],
    iconClass: 'bg-slate-100 text-slate-600'
};
function getIndustryMeta(industry) {
    const label = industry.label.trim().toLowerCase();
    return INDUSTRY_META.find(({ words })=>words.some((word)=>label.includes(word)))?.meta || FALLBACK_META;
}
function safeParseId(value) {
    if (!value) return null;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
}
function normalizeSearchText(value) {
    return value.trim().toLowerCase();
}
function findSelectedParent(parents, storedParentId, storedIndustryId) {
    if (storedParentId != null) {
        const storedParent = parents.find((parent)=>parent.key === storedParentId);
        if (storedParent) return storedParent;
    }
    if (storedIndustryId == null) return null;
    return parents.find((parent)=>parent.key === storedIndustryId || (parent.children || []).some((child)=>child.key === storedIndustryId)) || null;
}
function IndustryCard({ industry, checked, entered, index, disabled, onClick, isRTL, showIcon = true, compact = false }) {
    const meta = getIndustryMeta(industry);
    const IndustryIcon = meta.Icon;
    if (compact) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            role: "radio",
            "aria-checked": checked,
            disabled: disabled,
            onClick: onClick,
            className: `group flex min-h-14 items-center gap-3 px-4 py-3 text-start transition-colors disabled:cursor-not-allowed ${checked ? 'bg-sky-50 text-[#176a9f]' : 'bg-white text-slate-800 hover:bg-slate-50'}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${meta.iconClass}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IndustryIcon, {
                        size: 18,
                        stroke: 1.8
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                        lineNumber: 167,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                    lineNumber: 164,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "min-w-0 flex-1 text-sm font-semibold leading-snug",
                    children: industry.label
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${checked ? 'border-[#1C7CBB] bg-[#1C7CBB] text-white' : 'border-slate-300 bg-white text-transparent group-hover:border-slate-400'}`,
                    "aria-hidden": "true",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                        size: 12,
                        stroke: 3
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                        lineNumber: 180,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                    lineNumber: 172,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
            lineNumber: 152,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        role: "radio",
        "aria-checked": checked,
        disabled: disabled,
        onClick: onClick,
        style: {
            transitionDelay: `${110 + Math.min(index, 16) * 35}ms`
        },
        className: `group relative flex rounded-2xl border text-start transition-all duration-300 disabled:cursor-not-allowed ${showIcon ? 'min-h-[116px] items-center gap-3 p-3.5' : 'min-h-[72px] items-center p-4'} ${checked ? 'border-[#1C7CBB] bg-white shadow-sm ring-1 ring-[#1C7CBB]' : 'border-transparent bg-slate-100/80 hover:bg-slate-100'} ${entered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`,
        children: [
            showIcon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${meta.iconClass}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IndustryIcon, {
                    size: 26,
                    stroke: 1.7
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                    lineNumber: 208,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                lineNumber: 205,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `min-w-0 flex-1 text-base font-semibold leading-snug text-slate-900 ${!showIcon ? isRTL ? 'pl-8' : 'pr-8' : ''}`,
                children: industry.label
            }, void 0, false, {
                fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                lineNumber: 211,
                columnNumber: 7
            }, this),
            checked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `absolute inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1C7CBB] text-white ${showIcon ? 'top-2.5' : 'top-1/2 -translate-y-1/2'} ${isRTL ? 'left-2.5' : 'right-2.5'}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                    size: 12,
                    stroke: 3
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                    lineNumber: 226,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                lineNumber: 219,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
        lineNumber: 187,
        columnNumber: 5
    }, this);
}
function InsighterIndustryQuestion({ locale }) {
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const isRTL = locale === 'ar';
    const isEnglish = typeof locale === 'string' && locale.toLowerCase().startsWith('en');
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [projectType, setProjectType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [parents, setParents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedParentId, setSelectedParentId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isAdvancing, setIsAdvancing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showAllParents, setShowAllParents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"])(error, locale);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = window.setTimeout(()=>setEntered(true), 30);
        return ()=>window.clearTimeout(timer);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            setProjectType(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale)));
        } catch  {
        // ignore
        }
    }, [
        locale
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        const load = async ()=>{
            setError(null);
            setLoading(true);
            try {
                const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/common/setting/industry/tree'), {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Accept-Language': locale === 'ar' ? 'ar' : 'en'
                    },
                    cache: 'no-store'
                });
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res);
                const json = await res.json();
                const tree = Array.isArray(json) ? json : json.data || [];
                if (!cancelled) {
                    setParents(tree);
                    try {
                        const selectedParent = findSelectedParent(tree, safeParseId(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterIndustryParentIdKey(locale))), safeParseId(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterIndustryIdKey(locale))));
                        setSelectedParentId(selectedParent?.key ?? null);
                    } catch  {
                        setSelectedParentId(null);
                    }
                }
            } catch (err) {
                if (!cancelled) {
                    setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر تحميل الصناعات.' : 'Failed to load industries.'));
                    setParents([]);
                }
            } finally{
                if (!cancelled) setLoading(false);
            }
        };
        void load();
        return ()=>{
            cancelled = true;
        };
    }, [
        isRTL,
        locale
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!showAllParents) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKeyDown = (event)=>{
            if (event.key === 'Escape') setShowAllParents(false);
        };
        window.addEventListener('keydown', onKeyDown);
        return ()=>{
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [
        showAllParents
    ]);
    const featuredParents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(parents || []).slice(0, 11), [
        parents
    ]);
    const filteredParents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const query = normalizeSearchText(searchTerm);
        if (!query) return parents || [];
        return (parents || []).filter((parent)=>normalizeSearchText(parent.label).includes(query));
    }, [
        parents,
        searchTerm
    ]);
    const selectedParent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(parents || []).find((parent)=>parent.key === selectedParentId) || null, [
        parents,
        selectedParentId
    ]);
    const persistParent = (parent)=>{
        const hasChildren = (parent.children || []).length > 0;
        try {
            const previousParentId = safeParseId(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterIndustryParentIdKey(locale)));
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterIndustryParentIdKey(locale), String(parent.key));
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterIndustryParentLabelKey(locale), parent.label);
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterIndustryParentHasChildrenKey(locale), hasChildren ? '1' : '0');
            if (!hasChildren) {
                window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterIndustryIdKey(locale), String(parent.key));
                window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterIndustryLabelKey(locale), parent.label);
            } else if (previousParentId !== parent.key) {
                window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterIndustryIdKey(locale));
                window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterIndustryLabelKey(locale));
            }
        } catch  {
        // ignore
        }
        return hasChildren;
    };
    const advanceFromParent = (parent)=>{
        if (isAdvancing) return;
        setError(null);
        setSelectedParentId(parent.key);
        setShowAllParents(false);
        setIsAdvancing(true);
        const hasChildren = persistParent(parent);
        if (hasChildren) {
            router.push(nav.hrefFor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].insighterSubIndustry));
            return;
        }
        nav.goNext();
    };
    const onContinue = ()=>{
        if (!selectedParent || isAdvancing) return;
        advanceFromParent(selectedParent);
    };
    const title = isRTL ? 'ما هي الصناعة الرئيسية لمشروعك؟' : 'What is your project\'s main industry?';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-6xl mx-auto",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                locale: locale,
                entered: entered,
                projectTypeId: projectType
            }, void 0, false, {
                fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                lineNumber: 426,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mt-2 text-start transition-all duration-700 ${entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'}`,
                children: [
                    isEnglish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                        children: `
            #insighter-industry-question-title {
              font-family: "IBM Plex Serif", serif !important;
            }
          `
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                        lineNumber: 442,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "insighter-industry-question-title",
                        className: "text-2xl sm:text-3xl font-medium tracking-tight text-slate-900",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                        lineNumber: 448,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                lineNumber: 432,
                columnNumber: 7
            }, this),
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 text-sm font-semibold text-rose-700",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                lineNumber: 457,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 sm:mt-8 pb-[100px] lg:pb-0",
                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm font-semibold text-slate-600",
                    children: isRTL ? 'جاري التحميل…' : 'Loading…'
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                    lineNumber: 462,
                    columnNumber: 11
                }, this) : featuredParents.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4",
                    role: "radiogroup",
                    "aria-label": isRTL ? 'الصناعات الرئيسية' : 'Parent industries',
                    children: [
                        featuredParents.map((parent, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IndustryCard, {
                                industry: parent,
                                checked: selectedParentId === parent.key,
                                entered: entered,
                                index: index,
                                disabled: isAdvancing,
                                onClick: ()=>advanceFromParent(parent),
                                isRTL: isRTL
                            }, parent.key, false, {
                                fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                                lineNumber: 472,
                                columnNumber: 15
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            disabled: isAdvancing,
                            onClick: ()=>{
                                setSearchTerm('');
                                setShowAllParents(true);
                            },
                            style: {
                                transitionDelay: '495ms'
                            },
                            className: `group relative flex min-h-[116px] items-center gap-3 rounded-2xl border border-transparent bg-slate-100/80 p-3.5 text-start transition-all duration-300 hover:bg-slate-100 disabled:cursor-not-allowed ${entered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDots$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDots$3e$__["IconDots"], {
                                        size: 27,
                                        stroke: 1.8
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                                        lineNumber: 497,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                                    lineNumber: 496,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "min-w-0 flex-1 text-base font-semibold leading-snug text-slate-900",
                                    children: isRTL ? 'أخرى' : 'Other'
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                                    lineNumber: 499,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                            lineNumber: 484,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                    lineNumber: 466,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm font-semibold text-slate-500",
                    children: isRTL ? 'لا توجد صناعات متاحة.' : 'No industries available.'
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                    lineNumber: 505,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                lineNumber: 460,
                columnNumber: 7
            }, this),
            showAllParents ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/35 p-4 backdrop-blur-sm",
                role: "presentation",
                onMouseDown: (event)=>{
                    if (event.target === event.currentTarget) setShowAllParents(false);
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-labelledby": "all-industries-title",
                    className: "flex max-h-[min(720px,calc(100vh-2rem))] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/70 bg-white shadow-2xl shadow-slate-900/20",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start justify-between gap-4 border-b border-slate-200/80 px-5 py-4 sm:px-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-start",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            id: "all-industries-title",
                                            className: "text-xl font-bold text-slate-900",
                                            children: isRTL ? 'جميع الصناعات الرئيسية' : 'All parent industries'
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                                            lineNumber: 527,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-sm font-medium text-slate-500",
                                            children: isRTL ? 'اختر صناعة رئيسية واحدة للمتابعة.' : 'Choose one parent industry to continue.'
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                                            lineNumber: 530,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                                    lineNumber: 526,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setShowAllParents(false),
                                    "aria-label": isRTL ? 'إغلاق' : 'Close',
                                    className: "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__["IconX"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                                        lineNumber: 542,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                                    lineNumber: 536,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                            lineNumber: 525,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-b border-slate-100 px-5 py-3.5 sm:px-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-400 ${isRTL ? 'right-3' : 'left-3'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__["IconSearch"], {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                                            lineNumber: 553,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                                        lineNumber: 548,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        autoFocus: true,
                                        type: "search",
                                        value: searchTerm,
                                        onChange: (event)=>setSearchTerm(event.target.value),
                                        placeholder: isRTL ? 'ابحث عن صناعة رئيسية…' : 'Search parent industries…',
                                        className: `w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-sm font-medium text-slate-900 outline-none transition focus:border-[#1C7CBB] focus:bg-white focus:ring-1 focus:ring-[#1C7CBB] ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'}`
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                                        lineNumber: 555,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                                lineNumber: 547,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                            lineNumber: 546,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-y-auto bg-slate-50/70 px-5 py-4 sm:px-6 sm:py-5",
                            children: filteredParents.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2",
                                role: "radiogroup",
                                "aria-label": isRTL ? 'جميع الصناعات الرئيسية' : 'All parent industries',
                                children: filteredParents.map((parent, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IndustryCard, {
                                        industry: parent,
                                        checked: selectedParentId === parent.key,
                                        entered: true,
                                        index: index,
                                        disabled: isAdvancing,
                                        onClick: ()=>advanceFromParent(parent),
                                        isRTL: isRTL,
                                        compact: true
                                    }, parent.key, false, {
                                        fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                                        lineNumber: 576,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                                lineNumber: 570,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "py-10 text-center text-sm font-semibold text-slate-500",
                                children: isRTL ? 'لا توجد نتائج مطابقة.' : 'No matching industries.'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                                lineNumber: 590,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                            lineNumber: 568,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                    lineNumber: 519,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                lineNumber: 512,
                columnNumber: 9
            }, this), document.body) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto w-full max-w-6xl px-4 lg:px-0 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: nav.backHref,
                                className: "btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200",
                                children: isRTL ? 'رجوع' : 'Back'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                                lineNumber: 603,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onContinue,
                                disabled: !selectedParent || isAdvancing,
                                className: `btn-sm px-6 py-2 rounded-full ${selectedParent && !isAdvancing ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90' : 'text-slate-500 bg-slate-200 cursor-not-allowed'}`,
                                children: nav.continueLabel
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                                lineNumber: 610,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                        lineNumber: 602,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                    lineNumber: 601,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
                lineNumber: 600,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/InsighterIndustryQuestion.tsx",
        lineNumber: 425,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/questions/InsighterSubIndustryQuestion.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InsighterSubIndustryQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/ProjectSelectedTypeHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectWizardFlow.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectStepErrorToast.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectWizardNavigation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$InsighterIndustryQuestion$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/InsighterIndustryQuestion.tsx [app-ssr] (ecmascript)");
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
function safeParseId(value) {
    if (!value) return null;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
}
function InsighterSubIndustryQuestion({ locale }) {
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const isRTL = locale === 'ar';
    const isEnglish = typeof locale === 'string' && locale.toLowerCase().startsWith('en');
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [projectType, setProjectType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [parent, setParent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isAdvancing, setIsAdvancing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"])(error, locale);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = window.setTimeout(()=>setEntered(true), 30);
        return ()=>window.clearTimeout(timer);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            setProjectType(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale)));
            setSelectedId(safeParseId(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterIndustryIdKey(locale))));
        } catch  {
        // ignore
        }
    }, [
        locale
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        const load = async ()=>{
            setError(null);
            setLoading(true);
            try {
                const parentId = safeParseId(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterIndustryParentIdKey(locale)));
                if (parentId == null) throw new Error('missing_parent_industry');
                const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/common/setting/industry/tree'), {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Accept-Language': locale === 'ar' ? 'ar' : 'en'
                    },
                    cache: 'no-store'
                });
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res);
                const json = await res.json();
                const tree = Array.isArray(json) ? json : json.data || [];
                const selectedParent = tree.find((item)=>item.key === parentId) || null;
                if (!selectedParent || (selectedParent.children || []).length === 0) {
                    throw new Error('missing_parent_children');
                }
                if (!cancelled) {
                    setParent(selectedParent);
                    setSelectedId((current)=>(selectedParent.children || []).some((child)=>child.key === current) ? current : null);
                }
            } catch (err) {
                if (!cancelled) {
                    const isSelectionFlowError = err instanceof Error && (err.message === 'missing_parent_industry' || err.message === 'missing_parent_children');
                    setError(isSelectionFlowError ? isRTL ? 'اختر صناعة رئيسية أولًا.' : 'Choose a parent industry first.' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر تحميل الصناعات الفرعية.' : 'Failed to load sub-industries.'));
                    setParent(null);
                }
            } finally{
                if (!cancelled) setLoading(false);
            }
        };
        void load();
        return ()=>{
            cancelled = true;
        };
    }, [
        isRTL,
        locale
    ]);
    const children = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>parent?.children || [], [
        parent
    ]);
    const selectedChild = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>children.find((child)=>child.key === selectedId) || null, [
        children,
        selectedId
    ]);
    const persistSelection = (child)=>{
        try {
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterIndustryIdKey(locale), String(child.key));
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterIndustryLabelKey(locale), child.label);
        } catch  {
        // ignore
        }
    };
    const advanceWithChild = (child)=>{
        if (isAdvancing) return;
        setError(null);
        setSelectedId(child.key);
        persistSelection(child);
        setIsAdvancing(true);
        nav.goNext();
    };
    const onContinue = ()=>{
        if (!selectedChild || isAdvancing) return;
        advanceWithChild(selectedChild);
    };
    const title = isRTL ? 'ما هي الصناعة الفرعية لمشروعك؟' : 'Which sub-industry best fits your project?';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-6xl mx-auto",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                locale: locale,
                entered: entered,
                projectTypeId: projectType
            }, void 0, false, {
                fileName: "[project]/components/project/questions/InsighterSubIndustryQuestion.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mt-2 text-start transition-all duration-700 ${entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'}`,
                children: [
                    isEnglish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                        children: `
            #insighter-sub-industry-question-title {
              font-family: "IBM Plex Serif", serif !important;
            }
          `
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/InsighterSubIndustryQuestion.tsx",
                        lineNumber: 193,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "insighter-sub-industry-question-title",
                        className: "text-2xl sm:text-3xl font-medium tracking-tight text-slate-900",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/InsighterSubIndustryQuestion.tsx",
                        lineNumber: 199,
                        columnNumber: 9
                    }, this),
                    parent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm font-semibold text-[#1C7CBB]",
                        children: parent.label
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/InsighterSubIndustryQuestion.tsx",
                        lineNumber: 206,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/InsighterSubIndustryQuestion.tsx",
                lineNumber: 183,
                columnNumber: 7
            }, this),
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 text-sm font-semibold text-rose-700",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/project/questions/InsighterSubIndustryQuestion.tsx",
                lineNumber: 213,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 sm:mt-8 pb-[100px] lg:pb-0",
                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm font-semibold text-slate-600",
                    children: isRTL ? 'جاري التحميل…' : 'Loading…'
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/InsighterSubIndustryQuestion.tsx",
                    lineNumber: 218,
                    columnNumber: 11
                }, this) : children.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4",
                    role: "radiogroup",
                    "aria-label": isRTL ? 'الصناعات الفرعية' : 'Sub-industries',
                    children: children.map((child, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$InsighterIndustryQuestion$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IndustryCard"], {
                            industry: child,
                            checked: selectedId === child.key,
                            entered: entered,
                            index: index,
                            disabled: isAdvancing,
                            onClick: ()=>advanceWithChild(child),
                            isRTL: isRTL,
                            showIcon: false
                        }, child.key, false, {
                            fileName: "[project]/components/project/questions/InsighterSubIndustryQuestion.tsx",
                            lineNumber: 228,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/InsighterSubIndustryQuestion.tsx",
                    lineNumber: 222,
                    columnNumber: 11
                }, this) : null
            }, void 0, false, {
                fileName: "[project]/components/project/questions/InsighterSubIndustryQuestion.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto w-full max-w-6xl px-4 lg:px-0 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: parent ? nav.backHref : nav.hrefFor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStepIds"].insighterIndustry),
                                className: "btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200",
                                children: isRTL ? 'رجوع' : 'Back'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/InsighterSubIndustryQuestion.tsx",
                                lineNumber: 247,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onContinue,
                                disabled: !selectedChild || isAdvancing,
                                className: `btn-sm px-6 py-2 rounded-full ${selectedChild && !isAdvancing ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90' : 'text-slate-500 bg-slate-200 cursor-not-allowed'}`,
                                children: nav.continueLabel
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/InsighterSubIndustryQuestion.tsx",
                                lineNumber: 258,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/InsighterSubIndustryQuestion.tsx",
                        lineNumber: 246,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/InsighterSubIndustryQuestion.tsx",
                    lineNumber: 245,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/InsighterSubIndustryQuestion.tsx",
                lineNumber: 244,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/InsighterSubIndustryQuestion.tsx",
        lineNumber: 176,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/questions/TargetMarketQuestion.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TargetMarketQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/ProjectSelectedTypeHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectStepErrorToast.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectWizardNavigation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsPayload.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsSync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsSync.ts [app-ssr] (ecmascript)");
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
function safeParseNumberArray(value) {
    if (!value) return [];
    try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) return [];
        return parsed.map((n)=>Number(n)).filter((n)=>Number.isFinite(n));
    } catch  {
        return [];
    }
}
function getDisplayName(locale, value) {
    if (locale === 'ar') return value.names?.ar || value.name || '';
    return value.names?.en || value.name || '';
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
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res);
    const json = await res.json();
    return json.data || [];
}
function TargetMarketQuestion({ locale }) {
    const isRTL = locale === 'ar';
    const isEnglish = typeof locale === 'string' && locale.toLowerCase().startsWith('en');
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [projectType, setProjectType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [countries, setCountries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [regions, setRegions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [blocs, setBlocs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"])(error, locale);
    const [countryIds, setCountryIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [regionIds, setRegionIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [blocIds, setBlocIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [countryQuery, setCountryQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    // When the user actively picks "Worldwide", auto-advance to the next step
    // as soon as the (auto-selected) regions are loaded.
    const pendingWorldwideAdvanceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = window.setTimeout(()=>setEntered(true), 30);
        return ()=>window.clearTimeout(timer);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            setProjectType(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale)));
            const savedMode = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketModeKey(locale));
            if (savedMode) setMode(savedMode);
            setCountryIds(safeParseNumberArray(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketCountryIdsKey(locale))));
            setRegionIds(safeParseNumberArray(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketRegionIdsKey(locale))));
            setBlocIds(safeParseNumberArray(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketEconomicBlocIdsKey(locale))));
        } catch  {
        // ignore
        }
    }, [
        locale
    ]);
    const title = isRTL ? 'اختر السوق المستهدف' : 'Select the target market';
    const modeOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
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
    }, [
        isRTL
    ]);
    const ensureCountries = async ()=>{
        if (countries) return;
        setError(null);
        setLoading('countries');
        try {
            const list = await fetchList(`${("TURBOPACK compile-time value", "https://api.foresighta.co")}/api/common/setting/country/list`, locale);
            setCountries(list.filter((c)=>c.status !== 'inactive'));
        } catch (err) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر تحميل الدول.' : 'Failed to load countries.'));
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
            const list = await fetchList(`${("TURBOPACK compile-time value", "https://api.foresighta.co")}/api/common/setting/region/list`, locale);
            setRegions(list);
        } catch (err) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر تحميل المناطق.' : 'Failed to load regions.'));
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
            const list = await fetchList(`${("TURBOPACK compile-time value", "https://api.foresighta.co")}/api/common/setting/economic-bloc/list`, locale);
            setBlocs(list);
        } catch (err) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر تحميل التكتلات.' : 'Failed to load economic blocks.'));
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (mode !== 'worldwide') return;
        if (!regions) return;
        setRegionIds(regions.map((r)=>r.id));
    }, [
        mode,
        regions
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!mode) return;
        if (mode === 'country') void ensureCountries();
        if (mode === 'regions' || mode === 'worldwide') void ensureRegions();
        if (mode === 'economic') void ensureBlocs();
    }, [
        mode
    ]);
    const filteredCountries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!countries) return [];
        const q = countryQuery.trim().toLowerCase();
        if (!q) return countries;
        return countries.filter((c)=>{
            const name = getDisplayName(locale, c).toLowerCase();
            const en = (c.names?.en || '').toLowerCase();
            const ar = (c.names?.ar || '').toLowerCase();
            return name.includes(q) || en.includes(q) || ar.includes(q);
        });
    }, [
        countries,
        countryQuery,
        locale
    ]);
    const selectedTargetMarketItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (mode === 'worldwide') {
            const worldwideLabel = modeOptions.find((option)=>option.id === 'worldwide')?.label || (isRTL ? 'كل العالم' : 'Worldwide');
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
            return (countries || []).filter((country)=>selected.has(country.id)).map((country)=>({
                    id: String(country.id),
                    label: getDisplayName(locale, country) || `#${country.id}`,
                    flagSrc: country.flag ? `/images/flags/${country.flag}.svg` : null
                }));
        }
        if (mode === 'regions') {
            const selected = new Set(regionIds);
            return (regions || []).filter((region)=>selected.has(region.id)).map((region)=>({
                    id: String(region.id),
                    label: region.name,
                    flagSrc: null
                }));
        }
        if (mode === 'economic') {
            const selected = new Set(blocIds);
            return (blocs || []).filter((bloc)=>selected.has(bloc.id)).map((bloc)=>({
                    id: String(bloc.id),
                    label: bloc.name,
                    flagSrc: null
                }));
        }
        return [];
    }, [
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
        try {
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketModeKey(locale), mode);
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketCountryIdsKey(locale), JSON.stringify(mode === 'country' ? countryIds : []));
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketRegionIdsKey(locale), JSON.stringify(mode === 'worldwide' || mode === 'regions' ? regionIds : []));
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketEconomicBlocIdsKey(locale), JSON.stringify(mode === 'economic' ? blocIds : []));
        } catch  {
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateServiceComponentPayload"])(locale, 'target-market', payload);
        const leavingComponents = nav.nextStepId === 'project-status' || nav.isReviewEditMode;
        if (!leavingComponents) {
            nav.goNext();
            return;
        }
        setSubmitting(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsSync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syncServiceComponents"])(locale);
            nav.goNext();
        } catch (err) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر حفظ مكوّنات الخدمة.' : 'Failed to save service components.'));
        } finally{
            setSubmitting(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!pendingWorldwideAdvanceRef.current) return;
        if (mode !== 'worldwide' || regionIds.length === 0 || submitting) return;
        pendingWorldwideAdvanceRef.current = false;
        void onContinue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        mode,
        regionIds,
        submitting
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-5xl mx-auto",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                locale: locale,
                entered: entered,
                projectTypeId: projectType
            }, void 0, false, {
                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                lineNumber: 415,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mt-2 text-start transition-all duration-700 ${entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'}`,
                children: [
                    isEnglish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                        children: `
            #target-market-question-title {
              font-family: "IBM Plex Serif", serif !important;
            }
          `
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                        lineNumber: 430,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "target-market-question-title",
                        className: "text-2xl sm:text-3xl font-medium tracking-tight text-slate-900",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                        lineNumber: 436,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                lineNumber: 421,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6",
                role: "radiogroup",
                "aria-label": title,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3",
                        children: modeOptions.map((opt, index)=>{
                            const isSelected = mode === opt.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                role: "radio",
                                "aria-checked": isSelected,
                                onClick: ()=>void onSelectMode(opt.id),
                                className: `h-full min-h-[88px] rounded-2xl border px-5 py-4 text-start shadow-sm backdrop-blur-md transition-all duration-700 ${isSelected ? 'border-blue-300 bg-white/60' : 'border-white/30 bg-white/35 hover:bg-white/45'} ${entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'}`,
                                style: {
                                    transitionDelay: `${110 + index * 60}ms`
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${isSelected ? 'border-blue-600' : 'border-slate-300'} bg-white/80`,
                                            "aria-hidden": "true",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `h-2.5 w-2.5 rounded-full ${isSelected ? 'bg-blue-600' : 'bg-transparent'}`
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                lineNumber: 472,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                            lineNumber: 467,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-base sm:text-lg font-bold text-slate-900",
                                            children: opt.label
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                            lineNumber: 477,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                    lineNumber: 466,
                                    columnNumber: 17
                                }, this)
                            }, opt.id, false, {
                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                lineNumber: 449,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                        lineNumber: 445,
                        columnNumber: 9
                    }, this),
                    error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 text-sm font-semibold text-rose-700",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                        lineNumber: 487,
                        columnNumber: 11
                    }, this) : null,
                    mode !== 'worldwide' && selectedTargetMarketItems.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 rounded-2xl border border-blue-100 bg-white/60 px-4 py-3 shadow-sm backdrop-blur-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-2 text-xs font-bold uppercase tracking-wide text-slate-500",
                                children: isRTL ? 'اختيارك' : 'Selected'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                lineNumber: 492,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: selectedTargetMarketItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1.5 text-sm font-semibold text-slate-800 shadow-sm ${isRTL ? 'flex-row-reverse' : ''}`,
                                        children: [
                                            item.flagSrc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: item.flagSrc,
                                                alt: "",
                                                className: "h-4 w-4 object-contain"
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                lineNumber: 502,
                                                columnNumber: 21
                                            }, this) : null,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: item.label
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                lineNumber: 504,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>removeSelectedTargetMarketItem(item.id),
                                                "aria-label": isRTL ? 'إزالة الاختيار' : 'Remove selection',
                                                className: "inline-flex h-5 w-5 items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-500",
                                                children: "×"
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                lineNumber: 505,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                        lineNumber: 497,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                lineNumber: 495,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                        lineNumber: 491,
                        columnNumber: 11
                    }, this) : null,
                    mode === 'country' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mt-4 transition-all duration-700 pb-[100px] lg:pb-0 ${entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'}`,
                        style: {
                            transitionDelay: '420ms'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-3xl border border-white/30 bg-white/45 p-4 shadow-sm backdrop-blur-md",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: countryQuery,
                                    onChange: (e)=>setCountryQuery(e.target.value),
                                    placeholder: isRTL ? 'ابحث عن دولة...' : 'Search country...',
                                    className: "w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                    lineNumber: 530,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 max-h-[340px] overflow-auto pr-1",
                                    children: loading === 'countries' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm font-semibold text-slate-600",
                                        children: isRTL ? 'جاري التحميل…' : 'Loading…'
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                        lineNumber: 539,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2",
                                        children: filteredCountries.map((c)=>{
                                            const isSelected = countryIds.includes(c.id);
                                            const label = getDisplayName(locale, c) || '';
                                            const flagSrc = c.flag ? `/images/flags/${c.flag}.svg` : null;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                "aria-pressed": isSelected,
                                                onClick: ()=>setCountryIds((prev)=>prev.includes(c.id) ? prev.filter((x)=>x !== c.id) : [
                                                            ...prev,
                                                            c.id
                                                        ]),
                                                className: `flex items-center gap-3 rounded-2xl border px-3 py-3 text-start transition-colors ${isSelected ? 'border-blue-300 bg-white/75' : 'border-white/30 bg-white/40 hover:bg-white/55'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${isSelected ? 'border-blue-600' : 'border-slate-300'} bg-white/80`,
                                                        "aria-hidden": "true",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `h-2.5 w-2.5 rounded-full ${isSelected ? 'bg-blue-600' : 'bg-transparent'}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                            lineNumber: 573,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                        lineNumber: 568,
                                                        columnNumber: 27
                                                    }, this),
                                                    flagSrc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: flagSrc,
                                                        alt: "",
                                                        className: "h-4 w-4 object-contain opacity-90",
                                                        onError: (e)=>{
                                                            ;
                                                            e.currentTarget.style.display = 'none';
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                        lineNumber: 580,
                                                        columnNumber: 29
                                                    }, this) : null,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-semibold text-slate-900",
                                                        children: label || `#${c.id}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                        lineNumber: 591,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, c.id, true, {
                                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                lineNumber: 552,
                                                columnNumber: 25
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                        lineNumber: 543,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                    lineNumber: 537,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                            lineNumber: 529,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                        lineNumber: 520,
                        columnNumber: 11
                    }, this) : null,
                    mode === 'regions' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mt-4 transition-all duration-700  ${entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'}`,
                        style: {
                            transitionDelay: '420ms'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-2xl border border-white/30 bg-white/35 backdrop-blur-md shadow-sm p-4 pb-[150px] sm:pb-4",
                            children: loading === 'regions' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm font-semibold text-slate-600",
                                children: isRTL ? 'جاري التحميل…' : 'Loading…'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                lineNumber: 616,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2  ",
                                children: (regions || []).map((r)=>{
                                    const isSelected = regionIds.includes(r.id);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        "aria-pressed": isSelected,
                                        onClick: ()=>setRegionIds((prev)=>prev.includes(r.id) ? prev.filter((x)=>x !== r.id) : [
                                                    ...prev,
                                                    r.id
                                                ]),
                                        className: `flex items-center gap-3 rounded-xl border px-3 py-2 text-start transition-colors ${isSelected ? 'border-blue-300 bg-white/70' : 'border-white/30 bg-white/35 hover:bg-white/45'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${isSelected ? 'border-blue-600' : 'border-slate-300'} bg-white/80`,
                                                "aria-hidden": "true",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `h-2.5 w-2.5 rounded-sm ${isSelected ? 'bg-blue-600' : 'bg-transparent'}`
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                    lineNumber: 645,
                                                    columnNumber: 27
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                lineNumber: 640,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-semibold text-slate-900",
                                                children: r.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                lineNumber: 651,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, r.id, true, {
                                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                        lineNumber: 624,
                                        columnNumber: 23
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                lineNumber: 620,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                            lineNumber: 614,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                        lineNumber: 605,
                        columnNumber: 11
                    }, this) : null,
                    mode === 'economic' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mt-4 transition-all pb-[100px] sm:pb-0 duration-700 ${entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'}`,
                        style: {
                            transitionDelay: '420ms'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-2xl border border-white/30 bg-white/35 backdrop-blur-md shadow-sm p-4 pb-[100px] sm:pb-4",
                            children: loading === 'blocs' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm font-semibold text-slate-600",
                                children: isRTL ? 'جاري التحميل…' : 'Loading…'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                lineNumber: 675,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2",
                                children: (blocs || []).map((b)=>{
                                    const isSelected = blocIds.includes(b.id);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        "aria-pressed": isSelected,
                                        onClick: ()=>setBlocIds((prev)=>prev.includes(b.id) ? prev.filter((x)=>x !== b.id) : [
                                                    ...prev,
                                                    b.id
                                                ]),
                                        className: `flex items-center gap-3 rounded-xl border px-3 py-2 text-start transition-colors ${isSelected ? 'border-blue-300 bg-white/70' : 'border-white/30 bg-white/35 hover:bg-white/45'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${isSelected ? 'border-blue-600' : 'border-slate-300'} bg-white/80`,
                                                "aria-hidden": "true",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `h-2.5 w-2.5 rounded-sm ${isSelected ? 'bg-blue-600' : 'bg-transparent'}`
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                    lineNumber: 704,
                                                    columnNumber: 27
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                lineNumber: 699,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-semibold text-slate-900",
                                                children: b.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                                lineNumber: 710,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, b.id, true, {
                                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                        lineNumber: 683,
                                        columnNumber: 23
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                lineNumber: 679,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                            lineNumber: 673,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                        lineNumber: 664,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                lineNumber: 444,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: nav.backHref,
                                className: "btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200",
                                children: isRTL ? 'رجوع' : 'Back'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                lineNumber: 725,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onContinue,
                                disabled: !canContinue || submitting,
                                className: `btn-sm px-6 py-2 rounded-full ${canContinue && !submitting ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90' : 'text-slate-500 bg-slate-200 cursor-not-allowed'}`,
                                children: submitting ? isRTL ? 'جاري الحفظ…' : 'Saving…' : nav.continueLabel
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                                lineNumber: 732,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                        lineNumber: 724,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                    lineNumber: 723,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
                lineNumber: 722,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/TargetMarketQuestion.tsx",
        lineNumber: 414,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/questions/ServiceQuestion.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ServiceQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowUp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowUp$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconArrowUp.mjs [app-ssr] (ecmascript) <export default as IconArrowUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCheck.mjs [app-ssr] (ecmascript) <export default as IconCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSparklesFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSparklesFilled$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconSparklesFilled.mjs [app-ssr] (ecmascript) <export default as IconSparklesFilled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChartBar$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChartBar$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconChartBar.mjs [app-ssr] (ecmascript) <export default as IconChartBar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChartArrowsVertical$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChartArrowsVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconChartArrowsVertical.mjs [app-ssr] (ecmascript) <export default as IconChartArrowsVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconClipboardText$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconClipboardText$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconClipboardText.mjs [app-ssr] (ecmascript) <export default as IconClipboardText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDeviceDesktopAnalytics$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDeviceDesktopAnalytics$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconDeviceDesktopAnalytics.mjs [app-ssr] (ecmascript) <export default as IconDeviceDesktopAnalytics>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuildingBank$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuildingBank$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBuildingBank.mjs [app-ssr] (ecmascript) <export default as IconBuildingBank>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTargetArrow$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTargetArrow$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconTargetArrow.mjs [app-ssr] (ecmascript) <export default as IconTargetArrow>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCoins$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCoins$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCoins.mjs [app-ssr] (ecmascript) <export default as IconCoins>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconShieldCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconShieldCheck.mjs [app-ssr] (ecmascript) <export default as IconShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconReportAnalytics$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconReportAnalytics$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconReportAnalytics.mjs [app-ssr] (ecmascript) <export default as IconReportAnalytics>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileSearch$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileSearch$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconFileSearch.mjs [app-ssr] (ecmascript) <export default as IconFileSearch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBulb$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBulb$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBulb.mjs [app-ssr] (ecmascript) <export default as IconBulb>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileDollar$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileDollar$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconFileDollar.mjs [app-ssr] (ecmascript) <export default as IconFileDollar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/ProjectSelectedTypeHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectRequestUuid.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalMatchUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectProposalMatchUuid.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/specifiedInsighterProject.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectStepErrorToast.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectWizardNavigation.ts [app-ssr] (ecmascript)");
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
// Hardcoded presentation metadata per service slug. Icons are placeholders to be
// swapped for custom illustrations later.
const SERVICE_META = {
    'market-research': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChartBar$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChartBar$3e$__["IconChartBar"],
        iconClass: 'bg-blue-50 text-blue-600',
        description: {
            en: 'Understand market size, demand, and competition.',
            ar: 'افهم حجم السوق والطلب والمنافسة.'
        }
    },
    'pre-feasibility-study': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileSearch$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileSearch$3e$__["IconFileSearch"],
        iconClass: 'bg-lime-50 text-lime-600',
        description: {
            en: 'Quickly assess whether your idea is worth developing.',
            ar: 'قيّم بسرعة ما إذا كانت فكرتك جديرة بالتطوير.'
        }
    },
    'feasibility-study': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChartArrowsVertical$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChartArrowsVertical$3e$__["IconChartArrowsVertical"],
        iconClass: 'bg-amber-50 text-amber-600',
        description: {
            en: 'Assess viability, profitability, and next steps.',
            ar: 'قيّم الجدوى والربحية والخطوات التالية.'
        }
    },
    'business-plan': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconClipboardText$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconClipboardText$3e$__["IconClipboardText"],
        iconClass: 'bg-emerald-50 text-emerald-600',
        description: {
            en: 'Build a roadmap for strategy and operations.',
            ar: 'ابنِ خارطة طريق للاستراتيجية والعمليات.'
        }
    },
    'digital-transformation': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDeviceDesktopAnalytics$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDeviceDesktopAnalytics$3e$__["IconDeviceDesktopAnalytics"],
        iconClass: 'bg-violet-50 text-violet-600',
        description: {
            en: 'Modernize processes and technology to scale.',
            ar: 'حدّث العمليات والتقنيات للتوسع.'
        }
    },
    'company-valuation': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuildingBank$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuildingBank$3e$__["IconBuildingBank"],
        iconClass: 'bg-cyan-50 text-cyan-600',
        description: {
            en: "Determine your company's fair value.",
            ar: 'حدّد القيمة العادلة لشركتك.'
        }
    },
    'go-to-market-strategy': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTargetArrow$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTargetArrow$3e$__["IconTargetArrow"],
        iconClass: 'bg-rose-50 text-rose-600',
        description: {
            en: 'Plan launch, positioning, and customer growth.',
            ar: 'خطّط للإطلاق والتموضع ونمو العملاء.'
        }
    },
    'fundraising-strategy': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCoins$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCoins$3e$__["IconCoins"],
        iconClass: 'bg-teal-50 text-teal-600',
        description: {
            en: 'Prepare to raise capital and attract investors.',
            ar: 'استعد لجمع التمويل وجذب المستثمرين.'
        }
    },
    'policies-procedures-governance': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconShieldCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconShieldCheck$3e$__["IconShieldCheck"],
        iconClass: 'bg-indigo-50 text-indigo-600',
        description: {
            en: 'Set governance, policies, and compliance.',
            ar: 'ضع الحوكمة والسياسات والامتثال.'
        }
    },
    'brief-feasibility-study': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileSearch$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileSearch$3e$__["IconFileSearch"],
        iconClass: 'bg-lime-50 text-lime-600',
        description: {
            en: 'Quick check on whether your idea holds up.',
            ar: 'فحص سريع لمدى جدوى فكرتك.'
        }
    },
    'opportunity-evaluation': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBulb$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBulb$3e$__["IconBulb"],
        iconClass: 'bg-orange-50 text-orange-600',
        description: {
            en: 'Weigh the potential of a business opportunity.',
            ar: 'قيّم إمكانات الفرصة التجارية.'
        }
    },
    'funding-application': {
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileDollar$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileDollar$3e$__["IconFileDollar"],
        iconClass: 'bg-fuchsia-50 text-fuchsia-600',
        description: {
            en: 'Prepare and package your funding application.',
            ar: 'جهّز وأعدّ طلب التمويل الخاص بك.'
        }
    }
};
const FALLBACK_SERVICE_META = {
    Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconReportAnalytics$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconReportAnalytics$3e$__["IconReportAnalytics"],
    iconClass: 'bg-slate-100 text-slate-600',
    description: {
        en: 'Advisory tailored to your business needs.',
        ar: 'استشارة مصممة لاحتياجات عملك.'
    }
};
function getServiceMeta(service) {
    return SERVICE_META[(service.slug || '').trim().toLowerCase()] || FALLBACK_SERVICE_META;
}
function isOtherService(service) {
    if (!service) return false;
    const slug = (service.slug || '').trim().toLowerCase();
    const name = (service.name || '').trim().toLowerCase();
    const otherWord = /\bothers?\b/i;
    if (slug === 'other' || slug === 'others') return true;
    if (otherWord.test(slug)) return true;
    if (name === 'other' || name === 'others') return true;
    if (otherWord.test(name)) return true;
    // Arabic fallback (in case slug isn't stable)
    if (service.name?.includes('أخرى') || service.name?.includes('اخرى')) return true;
    return false;
}
function safeParseSelectedServiceId(value) {
    if (!value) return null;
    const coerceFiniteNumber = (input)=>{
        const n = typeof input === 'string' ? Number(input) : input;
        return Number.isFinite(n) ? n : null;
    };
    try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) return coerceFiniteNumber(parsed[0]);
        return coerceFiniteNumber(parsed);
    } catch  {
        return coerceFiniteNumber(value);
    }
}
function AiScopePromptComposer({ isRTL, value, loading, onChange, onSend }) {
    const canSend = value.trim().length > 0 && !loading;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        .ai-service-input {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .ai-service-input::-webkit-scrollbar {
          display: none;
        }
        .ai-service-input:focus {
          outline: none !important;
          box-shadow: none !important;
          border-color: transparent !important;
        }
      `
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                lineNumber: 227,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2.5 text-start",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-sky-200/80 bg-gradient-to-br from-sky-50 to-cyan-100/80 text-sky-600 shadow-sm",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSparklesFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSparklesFilled$3e$__["IconSparklesFilled"], {
                            size: 18,
                            className: "animate-pulse"
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                            lineNumber: 243,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                        lineNumber: 242,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-base font-semibold text-slate-900",
                            children: isRTL ? 'أو صف خدمتك للذكاء الاصطناعي لنقترح عليك نطاقًا مناسبًا' : 'Or describe your service to our AI so we can suggest a related scope for you'
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                            lineNumber: 246,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                        lineNumber: 245,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                lineNumber: 241,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mt-3 flex items-end gap-2 rounded-xl border border-slate-200/80 bg-white/85 px-3 py-3 shadow-sm ${isRTL ? 'flex-row-reverse' : ''}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        value: value,
                        onChange: (e)=>onChange(e.target.value),
                        onKeyDown: (e)=>{
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                if (canSend) onSend();
                            }
                        },
                        rows: 2,
                        dir: isRTL ? 'rtl' : 'ltr',
                        className: `ai-service-input min-h-[60px] w-full resize-none border-0 bg-transparent px-1 py-1 text-sm font-medium text-slate-900 outline-none focus:ring-0 placeholder:text-xs placeholder:text-slate-400 ${isRTL ? 'text-right' : 'text-left'}`,
                        placeholder: isRTL ? 'صف خدمتك...' : 'Describe your service...'
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                        lineNumber: 256,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onSend,
                        disabled: !canSend,
                        "aria-label": isRTL ? 'توليد النطاقات' : 'Generate scopes',
                        title: isRTL ? 'توليد النطاقات' : 'Generate scopes',
                        className: `inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${canSend ? 'bg-[#1C7CBB] text-white shadow-md shadow-sky-500/20 hover:bg-[#176799]' : 'bg-slate-200 text-slate-500'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowUp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowUp$3e$__["IconArrowUp"], {
                            size: 18,
                            stroke: 2.2
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                            lineNumber: 282,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                        lineNumber: 271,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                lineNumber: 252,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
        lineNumber: 226,
        columnNumber: 5
    }, this);
}
function ServiceQuestion({ locale }) {
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const isRTL = locale === 'ar';
    const isEnglish = typeof locale === 'string' && locale.toLowerCase().startsWith('en');
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [projectType, setProjectType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deliverablesLanguage, setDeliverablesLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [services, setServices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"])(error, locale);
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [servicePrompt, setServicePrompt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = window.setTimeout(()=>setEntered(true), 30);
        return ()=>window.clearTimeout(timer);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            setProjectType(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale)));
            setDeliverablesLanguage(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].deliverablesLanguageKey(locale)));
            setSelectedId(safeParseSelectedServiceId(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceIdsKey(locale))));
            setServicePrompt(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].servicePromptKey(locale)) || '');
        } catch  {
        // ignore
        }
    }, [
        locale
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        const load = async ()=>{
            setError(null);
            setLoading(true);
            try {
                const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/common/setting/service'), {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Accept-Language': locale === 'ar' ? 'ar' : 'en'
                    },
                    cache: 'no-store'
                });
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res);
                const json = await res.json();
                if (!cancelled) setServices(json.data || []);
            } catch (err) {
                if (!cancelled) {
                    setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر تحميل الخدمات.' : 'Failed to load services.'));
                    setServices([]);
                }
            } finally{
                if (!cancelled) setLoading(false);
            }
        };
        void load();
        return ()=>{
            cancelled = true;
        };
    }, [
        isRTL,
        locale
    ]);
    const title = isRTL ? 'ما نوع الخدمات التي تبحث عنها؟' : 'What type of services are you looking for?';
    const selectedService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(services || []).find((service)=>service.id === selectedId) || null, [
        services,
        selectedId
    ]);
    const otherService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(services || []).find((service)=>isOtherService(service)) || null, [
        services
    ]);
    const predefinedServices = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(services || []).filter((service)=>!isOtherService(service)), [
        services
    ]);
    const isOtherSelected = isOtherService(selectedService);
    const canContinue = selectedId != null && services != null;
    const toApiLanguage = (value)=>{
        const v = (value || '').toLowerCase();
        if (v.includes('arab')) return 'arabic';
        if (v.includes('english')) return 'english';
        return locale === 'ar' ? 'arabic' : 'english';
    };
    const toApiProjectType = (value)=>{
        if (value === 'ad_hoc') return 'ad_hoc';
        if (value === 'frame_work_agreement' || value === 'framework') return 'frame_work_agreement';
        if (value === 'urgent_request' || value === 'urgent') return 'urgent_request';
        return 'ad_hoc';
    };
    const persistSelection = (nextSelectedId, nextIsOtherSelected, nextPrompt, nextServiceLabel)=>{
        try {
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceIdsKey(locale), JSON.stringify(nextSelectedId));
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].servicePromptKey(locale), nextPrompt);
            if (nextIsOtherSelected || !nextServiceLabel?.trim()) {
                window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceLabelKey(locale));
            } else {
                window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceLabelKey(locale), nextServiceLabel.trim());
            }
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceIsOtherKey(locale), nextIsOtherSelected ? '1' : '0');
        } catch  {
        // ignore
        }
    };
    const resetDownstreamWizardState = (preservePrompt)=>{
        try {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearStoredProjectRequestUuid"])(locale);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalMatchUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearStoredProposalMatchUuid"])(locale);
            window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectScopeSnapshotKey(locale));
            window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].selectedMatchIdsKey(locale));
            if (!preservePrompt) {
                window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].servicePromptKey(locale));
            }
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceComponentsPayloadKey(locale), JSON.stringify({
                components: {}
            }));
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceComponentSlugsKey(locale), JSON.stringify([]));
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceScopeHasChildrenKey(locale), '0');
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceScopeParentIdsKey(locale), JSON.stringify([]));
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceScopeChildIdsByParentKey(locale), JSON.stringify({}));
            window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceManualScopesKey(locale));
            window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceAiSuggestedScopesKey(locale));
            window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceManualSubscopesByScopeKey(locale));
        } catch  {
        // ignore
        }
    };
    const submitSelection = async (payload)=>{
        setError(null);
        persistSelection(payload.serviceId, payload.isOtherSelected, payload.servicePrompt, payload.serviceLabel);
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
        if (!token) {
            setError(isRTL ? 'يرجى تسجيل الدخول للمتابعة.' : 'Please sign in to continue.');
            return;
        }
        setSubmitting(true);
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Accept-Language': locale === 'ar' ? 'ar' : 'en',
                'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
            };
            const prompt = payload.isOtherSelected ? payload.servicePrompt.trim() : '';
            const apiServiceId = payload.serviceId;
            const insighterIndustryId = safeParseSelectedServiceId(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterIndustryIdKey(locale)));
            const specifiedInsighterUuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredSpecifiedInsighterUuid"])(locale);
            const initiatePath = specifiedInsighterUuid ? `/api/account/project/definition/initiate-specific/${encodeURIComponent(specifiedInsighterUuid)}` : '/api/account/project/definition/initiate';
            const initRes = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(initiatePath), {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    language: toApiLanguage(deliverablesLanguage),
                    type: toApiProjectType(projectType),
                    service_id: apiServiceId,
                    ...insighterIndustryId != null ? {
                        insighter_industry_id: insighterIndustryId
                    } : {},
                    service_prompt: prompt,
                    prompt_ai: prompt
                })
            });
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(initRes, 'Failed to create the project.');
            const initJson = await initRes.json();
            const projectUuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractProjectRequestUuid"])(initJson);
            if (!projectUuid) throw new Error('init_bad_response');
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeStoredProjectRequestUuid"])(locale, projectUuid);
            if (specifiedInsighterUuid) {
                const proposalMatchUuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalMatchUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractProjectProposalMatchUuid"])(initJson);
                if (!proposalMatchUuid) throw new Error('init_bad_response');
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalMatchUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeStoredProposalMatchUuid"])(locale, proposalMatchUuid);
            } else {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalMatchUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearStoredProposalMatchUuid"])(locale);
            }
            try {
                window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceComponentsPayloadKey(locale), JSON.stringify({
                    components: {}
                }));
            } catch  {
            // ignore
            }
            try {
                window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceComponentSlugsKey(locale), JSON.stringify([]));
                window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceScopeHasChildrenKey(locale), '0');
                window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceScopeParentIdsKey(locale), JSON.stringify([]));
                window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceScopeChildIdsByParentKey(locale), JSON.stringify({}));
                window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceManualScopesKey(locale));
                window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceAiSuggestedScopesKey(locale));
                window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceManualSubscopesByScopeKey(locale));
            } catch  {
            // ignore
            }
            nav.goNext();
        } catch (err) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر إنشاء المشروع.' : 'Failed to create the project.'));
        } finally{
            setSubmitting(false);
        }
    };
    const onContinue = async ()=>{
        if (!canContinue || selectedId == null || submitting) return;
        if (isOtherSelected) {
            nav.goNext();
            return;
        }
        await submitSelection({
            serviceId: selectedId,
            isOtherSelected,
            servicePrompt,
            serviceLabel: selectedService?.name || null
        });
    };
    const onSelect = (service)=>{
        if (submitting) return;
        if (service.id === selectedId) return;
        setError(null);
        setSelectedId(service.id);
        const nextIsOtherSelected = isOtherService(service);
        const nextPrompt = nextIsOtherSelected ? servicePrompt : '';
        if (!nextIsOtherSelected) setServicePrompt('');
        persistSelection(service.id, nextIsOtherSelected, nextPrompt, nextIsOtherSelected ? null : service.name);
        if (nextIsOtherSelected) {
            resetDownstreamWizardState(true);
            nav.goNext();
            return;
        }
        void submitSelection({
            serviceId: service.id,
            isOtherSelected: false,
            servicePrompt: '',
            serviceLabel: service.name
        });
    };
    const onSendAiPrompt = async ()=>{
        if (submitting) return;
        const prompt = servicePrompt.trim();
        if (!prompt) {
            setError(isRTL ? 'اكتب وصفًا للخدمة أولًا لتوليد النطاقات.' : 'Write a service description first to generate scopes.');
            return;
        }
        if (!otherService) {
            setError(isRTL ? 'تعذر العثور على خدمة «أخرى».' : 'The Other service is currently unavailable.');
            return;
        }
        const otherServiceId = otherService.id;
        setSelectedId(otherServiceId);
        setError(null);
        resetDownstreamWizardState(true);
        await submitSelection({
            serviceId: otherServiceId,
            isOtherSelected: true,
            servicePrompt: prompt,
            serviceLabel: null
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-6xl mx-auto",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                locale: locale,
                entered: entered,
                projectTypeId: projectType
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                lineNumber: 699,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mt-2 text-start transition-all duration-700 ${entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'}`,
                children: [
                    isEnglish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                        children: `
            #service-question-title {
              font-family: "IBM Plex Serif", serif !important;
            }
          `
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                        lineNumber: 714,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "service-question-title",
                        className: "text-2xl sm:text-3xl font-medium tracking-tight text-slate-900",
                        dangerouslySetInnerHTML: {
                            __html: title
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                        lineNumber: 720,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                lineNumber: 705,
                columnNumber: 7
            }, this),
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 text-sm font-semibold text-rose-700",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                lineNumber: 727,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 sm:mt-8 pb-[100px] lg:pb-0",
                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm font-semibold text-slate-600",
                    children: isRTL ? 'جاري التحميل…' : 'Loading…'
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                    lineNumber: 732,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        predefinedServices.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4",
                                role: "radiogroup",
                                "aria-label": isRTL ? 'الخدمات المعرّفة مسبقًا' : 'Predefined services',
                                children: predefinedServices.map((service, index)=>{
                                    const checked = selectedId === service.id;
                                    const meta = getServiceMeta(service);
                                    const ServiceIcon = meta.Icon;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        role: "radio",
                                        "aria-checked": checked,
                                        disabled: submitting,
                                        onClick: ()=>onSelect(service),
                                        style: {
                                            transitionDelay: `${110 + index * 35}ms`
                                        },
                                        className: `group relative flex min-h-[116px] items-start gap-3 rounded-2xl border p-3.5 text-start transition-all duration-300 disabled:cursor-not-allowed ${checked ? 'border-[#1C7CBB] bg-white shadow-sm ring-1 ring-[#1C7CBB]' : 'border-transparent bg-slate-100/80 hover:bg-slate-100'} ${entered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${meta.iconClass}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ServiceIcon, {
                                                    size: 26,
                                                    stroke: 1.7
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                                                    lineNumber: 770,
                                                    columnNumber: 27
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                                                lineNumber: 767,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "min-w-0 flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block text-sm font-semibold leading-snug text-slate-900",
                                                        children: service.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                                                        lineNumber: 773,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "mt-0.5 block text-xs font-medium leading-relaxed text-slate-500",
                                                        children: isRTL ? meta.description.ar : meta.description.en
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                                                        lineNumber: 776,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                                                lineNumber: 772,
                                                columnNumber: 25
                                            }, this),
                                            checked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `absolute top-2.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1C7CBB] text-white ${isRTL ? 'left-2.5' : 'right-2.5'}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                                                    size: 12,
                                                    stroke: 3
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                                                    lineNumber: 784,
                                                    columnNumber: 29
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                                                lineNumber: 781,
                                                columnNumber: 27
                                            }, this) : null
                                        ]
                                    }, service.id, true, {
                                        fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                                        lineNumber: 751,
                                        columnNumber: 23
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                                lineNumber: 739,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                            lineNumber: 738,
                            columnNumber: 15
                        }, this) : null,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AiScopePromptComposer, {
                                isRTL: isRTL,
                                value: servicePrompt,
                                loading: submitting,
                                onChange: (next)=>{
                                    if (error) setError(null);
                                    setServicePrompt(next);
                                },
                                onSend: onSendAiPrompt
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                                lineNumber: 795,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                            lineNumber: 794,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                lineNumber: 730,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto w-full max-w-6xl px-4 lg:px-0 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: nav.backHref,
                                className: "btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200",
                                children: isRTL ? 'رجوع' : 'Back'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                                lineNumber: 813,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onContinue,
                                disabled: !canContinue || submitting,
                                className: `btn-sm px-6 py-2 rounded-full ${canContinue && !submitting ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90' : 'text-slate-500 bg-slate-200 cursor-not-allowed'}`,
                                children: submitting ? isRTL ? 'جاري المتابعة…' : 'Continuing…' : nav.continueLabel
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                                lineNumber: 820,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                        lineNumber: 812,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                    lineNumber: 811,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
                lineNumber: 810,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/ServiceQuestion.tsx",
        lineNumber: 698,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/questions/ProjectScopeQuestion.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectScopeQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowUp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowUp$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconArrowUp.mjs [app-ssr] (ecmascript) <export default as IconArrowUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCheck.mjs [app-ssr] (ecmascript) <export default as IconCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlusFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlusFilled$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconPlusFilled.mjs [app-ssr] (ecmascript) <export default as IconPlusFilled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSparklesFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSparklesFilled$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconSparklesFilled.mjs [app-ssr] (ecmascript) <export default as IconSparklesFilled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconXboxXFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconXboxXFilled$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconXboxXFilled.mjs [app-ssr] (ecmascript) <export default as IconXboxXFilled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/ProjectSelectedTypeHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectRequestUuid.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalMatchUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectProposalMatchUuid.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectStepErrorToast.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectWizardNavigation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
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
const AI_POLL_ATTEMPTS = 6;
const AI_POLL_INTERVAL_MS = 5000;
function sleep(ms) {
    return new Promise((resolve)=>window.setTimeout(resolve, ms));
}
function createClientId(prefix) {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return `${prefix}${crypto.randomUUID()}`;
    }
    return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
}
function safeParseManualScopes(value) {
    if (!value) return [];
    try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) return [];
        return parsed.map((item)=>({
                id: typeof item?.id === 'string' ? String(item.id) : '',
                name: typeof item?.name === 'string' ? String(item.name) : ''
            })).filter((x)=>Boolean(x.id) && Boolean(x.name?.trim()));
    } catch  {
        return [];
    }
}
function stableHash(value) {
    let hash = 0;
    for(let i = 0; i < value.length; i += 1){
        hash = hash * 31 + value.charCodeAt(i) | 0;
    }
    return hash;
}
function coerceNumericIdOrHash(rawId, name) {
    const n = typeof rawId === 'string' ? Number(rawId) : Number(rawId);
    if (Number.isFinite(n)) return n;
    const h = stableHash(name || '');
    if (h === 0) return -1;
    return h < 0 ? h : -h;
}
function AiGeneratingScopesLoader({ isRTL, requestUnderstood }) {
    const title = requestUnderstood ? isRTL ? 'تم فهم طلبك' : 'Request understood' : isRTL ? 'جار البحث...' : 'Thinking...';
    const subtitle = requestUnderstood ? isRTL ? 'جاري تحديد النطاقات المناسبة لطلبك.' : 'Preparing the right scopes for your request.' : '';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes ai-scope-shimmer {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
      `
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 text-start",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-w-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xl font-semibold tracking-[0.02em] sm:text-2xl",
                            style: {
                                color: 'rgba(15, 23, 42, 0.18)',
                                backgroundImage: 'linear-gradient(90deg, rgba(30,64,175,0.55) 0%, rgba(30,64,175,0.55) 35%, rgba(37,99,235,1) 50%, rgba(30,64,175,0.55) 65%, rgba(30,64,175,0.55) 100%)',
                                backgroundSize: '200% auto',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                animation: 'ai-scope-shimmer 2s linear infinite'
                            },
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                            lineNumber: 110,
                            columnNumber: 11
                        }, this),
                        subtitle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-1 text-sm font-semibold text-slate-500",
                            children: subtitle
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                            lineNumber: 125,
                            columnNumber: 13
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                    lineNumber: 109,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
function safeParseNumberArray(value) {
    if (!value) return [];
    try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) return [];
        return parsed.map((n)=>Number(n)).filter((n)=>Number.isFinite(n));
    } catch  {
        return [];
    }
}
function normalizeAiIntakeQuestions(input) {
    if (!Array.isArray(input)) return [];
    return input.map((item)=>{
        const raw = item;
        const key = String(raw?.key ?? raw?.id ?? '').trim();
        const question = String(raw?.question ?? raw?.text ?? raw?.label ?? '').trim();
        return {
            key,
            question
        };
    }).filter((item)=>Boolean(item.key) && Boolean(item.question));
}
function extractAiIntakeStatus(payload) {
    const data = payload?.data ?? payload;
    const status = String(data?.status ?? '').trim().toLowerCase();
    const questions = normalizeAiIntakeQuestions(data?.questions);
    return {
        status,
        needsClarification: Boolean(data?.needs_clarification) || status === 'needs_clarification',
        questions
    };
}
function AiClarificationQuestions({ isRTL, questions, answers, submitting, onAnswer, onSubmit }) {
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const currentQuestion = questions[currentIndex] || null;
    const currentAnswer = currentQuestion ? String(answers[currentQuestion.key] || '').trim() : '';
    const isFirstQuestion = currentIndex === 0;
    const isLastQuestion = currentIndex >= questions.length - 1;
    const allAnswered = questions.length > 0 && questions.every((question)=>String(answers[question.key] || '').trim());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setCurrentIndex(0);
    }, [
        questions
    ]);
    const goPrevious = ()=>{
        setCurrentIndex((index)=>Math.max(0, index - 1));
    };
    const goNext = ()=>{
        if (!currentAnswer) return;
        setCurrentIndex((index)=>Math.min(questions.length - 1, index + 1));
    };
    if (!currentQuestion) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-3xl rounded-2xl border border-sky-100 bg-white/80 p-4 shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-sky-200/80 bg-sky-50 text-sky-600",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSparklesFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSparklesFilled$3e$__["IconSparklesFilled"], {
                            size: 17
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                            lineNumber: 223,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0 flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm font-semibold text-slate-900",
                                children: isRTL ? 'نحتاج بعض التفاصيل قبل المتابعة' : 'A few details are needed before continuing'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                lineNumber: 226,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 text-xs font-semibold leading-relaxed text-slate-500",
                                children: isRTL ? 'أجب على الأسئلة القصيرة وسنراجع الطلب مرة أخرى.' : 'Answer the short questions and we will review the request again.'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                lineNumber: 229,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                        lineNumber: 225,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                lineNumber: 221,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mb-3 flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`,
                        children: questions.map((question, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `h-1.5 rounded-full transition-all ${index === currentIndex ? 'w-8 bg-[#1C7CBB]' : answers[question.key]?.trim() ? 'w-3 bg-sky-300' : 'w-3 bg-slate-200'}`,
                                "aria-hidden": "true"
                            }, question.key, false, {
                                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                lineNumber: 240,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                        lineNumber: 238,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block rounded-2xl rounded-bl-md bg-slate-100 px-3 py-2 text-sm font-semibold leading-relaxed text-slate-800",
                                children: currentQuestion.question
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                lineNumber: 255,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: answers[currentQuestion.key] || '',
                                onChange: (event)=>onAnswer(currentQuestion.key, event.target.value),
                                rows: 2,
                                dir: "auto",
                                placeholder: isRTL ? 'اكتب إجابتك...' : 'Type your answer...',
                                className: "mt-2 min-h-[54px] w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                lineNumber: 258,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                        lineNumber: 254,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                lineNumber: 237,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mt-4 flex items-center justify-between gap-3 ${isRTL ? 'flex-row-reverse' : ''}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: goPrevious,
                        disabled: isFirstQuestion || submitting,
                        className: `inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold transition ${!isFirstQuestion && !submitting ? 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50' : 'cursor-not-allowed border border-slate-100 bg-slate-100 text-slate-400'}`,
                        children: isRTL ? 'السابق' : 'Back'
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                        lineNumber: 270,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: isLastQuestion ? onSubmit : goNext,
                        disabled: submitting || !currentAnswer || isLastQuestion && !allAnswered,
                        className: `inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold transition ${!submitting && currentAnswer && (!isLastQuestion || allAnswered) ? 'bg-[#1C7CBB] text-white hover:bg-[#176799]' : 'cursor-not-allowed bg-slate-200 text-slate-500'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: submitting ? isRTL ? 'جاري الإرسال...' : 'Sending...' : isLastQuestion ? isRTL ? 'إرسال الإجابات' : 'Send answers' : isRTL ? 'التالي' : 'Next'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                lineNumber: 293,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArrowUp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArrowUp$3e$__["IconArrowUp"], {
                                size: 16,
                                stroke: 2.2
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                lineNumber: 306,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                        lineNumber: 283,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                lineNumber: 269,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
        lineNumber: 220,
        columnNumber: 5
    }, this);
}
function AiIntakeFallback({ isRTL, mode, onBackToServices }) {
    const title = mode === 'timeout' ? isRTL ? 'استغرق تحليل الطلب وقتًا أطول من المتوقع' : 'The prompt analysis took longer than expected' : isRTL ? 'تعذر تحليل الطلب' : 'The prompt could not be analyzed';
    const message = isRTL ? 'يرجى الرجوع واختيار خدمة من الخدمات المعرّفة مسبقًا للمتابعة.' : 'Please go back and choose one of the predefined services to continue.';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-2xl rounded-2xl border border-rose-100 bg-white/85 p-4 shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-base font-semibold text-slate-900",
                children: title
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                lineNumber: 337,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1.5 text-sm font-semibold leading-relaxed text-slate-600",
                children: message
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                lineNumber: 338,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onBackToServices,
                className: "mt-4 rounded-full bg-[#1C7CBB] px-5 py-2 text-sm font-semibold text-white hover:bg-[#176799]",
                children: isRTL ? 'اختيار خدمة معرّفة مسبقًا' : 'Choose a predefined service'
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                lineNumber: 341,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
        lineNumber: 336,
        columnNumber: 5
    }, this);
}
function safeParseSelectedServiceId(value) {
    if (!value) return null;
    try {
        const parsed = JSON.parse(value);
        const n = Array.isArray(parsed) ? Number(parsed[0]) : Number(parsed);
        return Number.isFinite(n) ? n : null;
    } catch  {
        const n = Number(value);
        return Number.isFinite(n) ? n : null;
    }
}
function readServiceIsOther(locale) {
    if ("TURBOPACK compile-time truthy", 1) return false;
    //TURBOPACK unreachable
    ;
}
function coerceScopeParents(input) {
    if (!Array.isArray(input)) return [];
    return input.map((item, parentIndex)=>{
        const raw = item;
        const name = typeof raw === 'string' || typeof raw === 'number' ? String(raw).trim() : String(raw?.name ?? raw?.title ?? raw?.label ?? raw?.scope ?? '').trim();
        const id = coerceNumericIdOrHash(raw?.id, name || String(parentIndex));
        const childrenRaw = raw?.children ?? raw?.subscopes ?? raw?.sub_scopes ?? raw?.suggest_sub_scopes ?? raw?.suggested_sub_scopes;
        const children = Array.isArray(childrenRaw) ? childrenRaw.map((c, childIndex)=>{
            const childName = typeof c === 'string' || typeof c === 'number' ? String(c).trim() : String(c?.name ?? c?.title ?? c?.label ?? c?.scope ?? c?.sub_scope ?? '').trim();
            return {
                id: coerceNumericIdOrHash(c?.id, `${name}:${childName || String(childIndex)}`),
                name: childName
            };
        }).filter((c)=>Number.isFinite(c.id) && Boolean(c.name?.trim())) : [];
        if (!Number.isFinite(id) || !name) return null;
        return {
            id,
            name,
            children
        };
    }).filter((x)=>Boolean(x));
}
function extractSuggestedScopesFromProjectRequest(json) {
    const root = json?.data ?? json;
    const candidates = [
        root?.suggest_scopes,
        root?.suggested_scopes,
        root?.suggest_scope,
        root?.suggest_scopes_expected,
        root?.suggest_scopes_with_children,
        root?.scopes
    ];
    for (const candidate of candidates){
        if (Array.isArray(candidate)) return coerceScopeParents(candidate);
        if (candidate && typeof candidate === 'object' && Array.isArray(candidate.data)) {
            return coerceScopeParents(candidate.data);
        }
    }
    if (root && typeof root === 'object') {
        const values = Object.values(root);
        for (const value of values){
            if (Array.isArray(value)) {
                const coerced = coerceScopeParents(value);
                if (coerced.length > 0) return coerced;
            }
            if (value && typeof value === 'object' && Array.isArray(value.data)) {
                const coerced = coerceScopeParents(value.data);
                if (coerced.length > 0) return coerced;
            }
        }
    }
    return [];
}
function persistAiSuggestedScopes(locale, scopes) {
    try {
        if (scopes.length > 0) {
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceAiSuggestedScopesKey(locale), JSON.stringify(scopes));
        } else {
            window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceAiSuggestedScopesKey(locale));
        }
    } catch  {
    // ignore
    }
}
function ProjectScopeQuestion({ locale }) {
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const isRTL = locale === 'ar';
    const isEnglish = typeof locale === 'string' && locale.toLowerCase().startsWith('en');
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [projectType, setProjectType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [serviceId, setServiceId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [projectUuid, setProjectUuid] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [scopes, setScopes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [aiMode, setAiMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('idle');
    const [aiQuestions, setAiQuestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [aiAnswers, setAiAnswers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [submittingClarification, setSubmittingClarification] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [aiPollVersion, setAiPollVersion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [aiRequestUnderstood, setAiRequestUnderstood] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const delayNextAiClarificationCheckRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"])(error, locale);
    const [selectedParentIds, setSelectedParentIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [manualScopes, setManualScopes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedManualScopeIds, setSelectedManualScopeIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [otherOpen, setOtherOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pendingScopeName, setPendingScopeName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = window.setTimeout(()=>setEntered(true), 30);
        return ()=>window.clearTimeout(timer);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            setProjectType(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale)));
            setServiceId(safeParseSelectedServiceId(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceIdsKey(locale))));
            setProjectUuid((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readStoredProjectRequestUuid"])(locale));
            setSelectedParentIds(safeParseNumberArray(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceScopeParentIdsKey(locale))));
            const storedManualScopes = safeParseManualScopes(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceManualScopesKey(locale)));
            setManualScopes(storedManualScopes);
            setSelectedManualScopeIds(storedManualScopes.map((scope)=>scope.id));
        } catch  {
        // ignore
        }
    }, [
        locale
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        let activeController = null;
        const load = async ()=>{
            if (!serviceId) {
                setScopes([]);
                return;
            }
            const isOther = readServiceIsOther(locale);
            setError(null);
            if (isOther) {
                setAiQuestions([]);
                setAiAnswers({});
                if (!projectUuid) {
                    setAiMode('idle');
                    setLoading(false);
                    setScopes(null);
                    return;
                }
                const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
                if (!token) {
                    setError(isRTL ? 'يرجى تسجيل الدخول للمتابعة.' : 'Please sign in to continue.');
                    setAiMode('idle');
                    setScopes(null);
                    return;
                }
                setLoading(true);
                setAiMode('polling');
                try {
                    if (delayNextAiClarificationCheckRef.current) {
                        delayNextAiClarificationCheckRef.current = false;
                        await sleep(AI_POLL_INTERVAL_MS);
                        if (cancelled) return;
                    }
                    for(let attempt = 1; attempt <= AI_POLL_ATTEMPTS; attempt += 1){
                        if (cancelled) return;
                        activeController?.abort();
                        activeController = new AbortController();
                        try {
                            const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/account/project/definition/ai-intake/check-clarification/${projectUuid}`);
                            const res = await fetch(url, {
                                method: 'GET',
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    Accept: 'application/json',
                                    'Accept-Language': locale === 'ar' ? 'ar' : 'en',
                                    'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
                                },
                                cache: 'no-store',
                                signal: activeController.signal
                            });
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res, isRTL ? 'تعذر التحقق من حالة الطلب.' : 'Failed to check the prompt status.');
                            const json = await res.json();
                            const intake = extractAiIntakeStatus(json);
                            if (intake.needsClarification) {
                                if (!cancelled) {
                                    setAiQuestions(intake.questions);
                                    setAiAnswers({});
                                    setScopes(null);
                                    setAiMode('clarification');
                                }
                                return;
                            }
                            if (intake.status === 'ready') {
                                let showList = extractSuggestedScopesFromProjectRequest(json);
                                if (showList.length === 0) {
                                    activeController?.abort();
                                    activeController = new AbortController();
                                    const showRes = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/account/project/show/${projectUuid}`), {
                                        method: 'GET',
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                            Accept: 'application/json',
                                            'Accept-Language': locale === 'ar' ? 'ar' : 'en',
                                            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
                                        },
                                        cache: 'no-store',
                                        signal: activeController.signal
                                    });
                                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(showRes, isRTL ? 'تعذر تحميل النطاقات المقترحة.' : 'Failed to load suggested scopes.');
                                    const showJson = await showRes.json();
                                    showList = extractSuggestedScopesFromProjectRequest(showJson);
                                }
                                if (!cancelled) {
                                    setScopes(showList);
                                    persistAiSuggestedScopes(locale, showList);
                                    setAiMode('idle');
                                }
                                return;
                            }
                            if (intake.status === 'failed') {
                                if (!cancelled) {
                                    setScopes(null);
                                    setAiMode('failed');
                                }
                                return;
                            }
                        } catch (err) {
                            if (cancelled) return;
                            if (attempt >= AI_POLL_ATTEMPTS) {
                                setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر التحقق من حالة الطلب.' : 'Failed to check the prompt status.'));
                                setScopes(null);
                                setAiMode('failed');
                                return;
                            }
                        }
                        if (attempt < AI_POLL_ATTEMPTS) await sleep(AI_POLL_INTERVAL_MS);
                    }
                    if (!cancelled) {
                        setScopes(null);
                        setAiMode('timeout');
                        setAiRequestUnderstood(false);
                    }
                } catch  {
                    if (!cancelled) {
                        setError(isRTL ? 'تعذر تحميل النطاقات المقترحة.' : 'Failed to load suggested scopes.');
                        setScopes(null);
                        setAiMode('idle');
                        setAiRequestUnderstood(false);
                    }
                } finally{
                    if (!cancelled) setLoading(false);
                }
                return;
            }
            const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
            if (!token) {
                setError(isRTL ? 'يرجى تسجيل الدخول للمتابعة.' : 'Please sign in to continue.');
                setScopes([]);
                return;
            }
            setLoading(true);
            setAiMode('idle');
            try {
                const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/common/setting/service/scope/${serviceId}`);
                const res = await fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                        'Accept-Language': locale === 'ar' ? 'ar' : 'en',
                        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
                    },
                    cache: 'no-store'
                });
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res, isRTL ? 'تعذر تحميل نطاقات الخدمة.' : 'Failed to load service scopes.');
                const json = await res.json();
                const list = coerceScopeParents(json?.data);
                if (!cancelled) setScopes(list || []);
            } catch (err) {
                if (!cancelled) {
                    setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر تحميل نطاقات الخدمة.' : 'Failed to load service scopes.'));
                    setScopes([]);
                }
            } finally{
                if (!cancelled) setLoading(false);
            }
        };
        void load();
        return ()=>{
            cancelled = true;
            activeController?.abort();
        };
    }, [
        aiPollVersion,
        isRTL,
        locale,
        projectUuid,
        serviceId
    ]);
    const isOtherFlow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>Boolean(serviceId) && readServiceIsOther(locale), [
        locale,
        serviceId
    ]);
    const namedManualScopes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>manualScopes.filter((s)=>Boolean(String(s.name || '').trim())), [
        manualScopes
    ]);
    const selectedManualScopes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const selected = new Set(selectedManualScopeIds);
        return namedManualScopes.filter((scope)=>selected.has(scope.id));
    }, [
        namedManualScopes,
        selectedManualScopeIds
    ]);
    const hasServiceSelection = serviceId != null;
    const availableScopes = scopes || [];
    const scopesReady = scopes !== null && !loading;
    const noScopesAvailable = scopesReady && availableScopes.length === 0;
    const showScopePicker = hasServiceSelection && (!isOtherFlow || scopesReady || namedManualScopes.length > 0 || otherOpen);
    const showOtherEditor = showScopePicker && (noScopesAvailable || otherOpen || namedManualScopes.length > 0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!showOtherEditor) return;
        if (!otherOpen && !noScopesAvailable) return;
        setManualScopes((prev)=>prev.length > 0 ? prev : [
                {
                    id: createClientId('scope:'),
                    name: ''
                }
            ]);
    }, [
        showOtherEditor,
        otherOpen,
        noScopesAvailable
    ]);
    const title = isOtherFlow ? availableScopes.length > 0 ? isRTL ? 'اختر نطاقات المشروع التي أنشأها الذكاء الاصطناعي' : 'Select AI-suggested project scopes' : noScopesAvailable ? isRTL ? 'أضف نطاقات المشروع' : 'Add project scopes' : isRTL ? 'جار مراجعة طلب الخدمة' : 'Reviewing your service request' : noScopesAvailable ? isRTL ? 'أضف نطاقات المشروع' : 'Add project scopes' : isRTL ? 'اختر نطاق المشروع' : 'Select project scope';
    const subtitle = isOtherFlow ? availableScopes.length > 0 ? isRTL ? 'اختر نطاقًا واحدًا أو أكثر للمتابعة.' : 'Select one or more scopes to continue.' : noScopesAvailable ? isRTL ? 'لم تظهر نطاقات بعد. أضف النطاقات يدويًا للمتابعة.' : 'No scopes appeared yet. Add scopes manually to continue.' : isRTL ? 'جار معالجة وصف الخدمة قبل عرض خيارات النطاقات.' : 'We are reviewing your service description before showing scope options.' : noScopesAvailable ? isRTL ? 'أضف نطاقات المشروع يدويًا (يمكنك إضافة أكثر من نطاق).' : 'Add your scopes manually (you can add multiple scopes).' : isRTL ? 'يمكنك اختيار أكثر من نطاق.' : 'You can select multiple scopes.';
    const selectedParents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!scopes) return [];
        const set = new Set(selectedParentIds);
        return scopes.filter((s)=>set.has(s.id));
    }, [
        scopes,
        selectedParentIds
    ]);
    const hasAnyChildren = selectedParents.some((s)=>(s.children || []).length > 0);
    const aiIntakeBlocking = isOtherFlow && (loading || aiMode === 'polling' || aiMode === 'clarification' || aiMode === 'failed' || aiMode === 'timeout' || submittingClarification);
    const canContinue = (selectedParents.length > 0 || selectedManualScopes.length > 0) && !aiIntakeBlocking;
    const toggleParent = (id)=>{
        setSelectedParentIds((prev)=>prev.includes(id) ? prev.filter((x)=>x !== id) : [
                ...prev,
                id
            ]);
    };
    const selectableCount = availableScopes.length + namedManualScopes.length;
    const allSelected = selectableCount > 0 && availableScopes.every((s)=>selectedParentIds.includes(s.id)) && namedManualScopes.every((s)=>selectedManualScopeIds.includes(s.id));
    const toggleSelectAll = ()=>{
        if (allSelected) {
            setSelectedParentIds([]);
            setSelectedManualScopeIds([]);
        } else {
            setSelectedParentIds(availableScopes.map((s)=>s.id));
            setSelectedManualScopeIds(namedManualScopes.map((s)=>s.id));
        }
    };
    const toggleManualScope = (id)=>{
        setSelectedManualScopeIds((prev)=>prev.includes(id) ? prev.filter((x)=>x !== id) : [
                ...prev,
                id
            ]);
    };
    const persistManualScopes = (nextScopes)=>{
        try {
            const cleaned = nextScopes.map((s)=>({
                    id: s.id,
                    name: String(s.name || '').trim()
                })).filter((s)=>Boolean(s.id) && Boolean(s.name));
            if (cleaned.length > 0) {
                window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceManualScopesKey(locale), JSON.stringify(cleaned));
            } else {
                window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceManualScopesKey(locale));
            }
        } catch  {
        // ignore
        }
    };
    const startAddScope = ()=>{
        if (pendingScopeName !== null) {
            const trimmed = pendingScopeName.trim();
            if (trimmed) {
                const id = createClientId('scope:');
                const next = [
                    ...manualScopes,
                    {
                        id,
                        name: trimmed
                    }
                ];
                setManualScopes(next);
                setSelectedManualScopeIds((prev)=>[
                        ...prev,
                        id
                    ]);
                persistManualScopes(next);
            }
        }
        setPendingScopeName('');
    };
    const commitPendingScope = ()=>{
        const trimmed = (pendingScopeName ?? '').trim();
        if (trimmed) {
            const id = createClientId('scope:');
            const next = [
                ...manualScopes,
                {
                    id,
                    name: trimmed
                }
            ];
            setManualScopes(next);
            setSelectedManualScopeIds((prev)=>[
                    ...prev,
                    id
                ]);
            persistManualScopes(next);
        }
        setPendingScopeName(null);
    };
    const cancelPendingScope = ()=>{
        setPendingScopeName(null);
    };
    const updateManualScopeName = (id, name)=>{
        setManualScopes((prev)=>{
            const next = prev.map((s)=>s.id === id ? {
                    ...s,
                    name
                } : s);
            persistManualScopes(next);
            return next;
        });
    };
    const removeManualScope = (id)=>{
        setSelectedManualScopeIds((prev)=>prev.filter((scopeId)=>scopeId !== id));
        setManualScopes((prev)=>{
            const next = prev.filter((s)=>s.id !== id);
            persistManualScopes(next);
            return next;
        });
    };
    const returnToDefinedServices = ()=>{
        try {
            window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceIdsKey(locale));
            window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceIsOtherKey(locale));
            window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceLabelKey(locale));
            window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].servicePromptKey(locale));
            window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectScopeSnapshotKey(locale));
            window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceManualScopesKey(locale));
            window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceAiSuggestedScopesKey(locale));
            window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceManualSubscopesByScopeKey(locale));
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceScopeParentIdsKey(locale), JSON.stringify([]));
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceComponentSlugsKey(locale), JSON.stringify([]));
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceComponentsPayloadKey(locale), JSON.stringify({
                components: {}
            }));
        } catch  {
        // ignore
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearStoredProjectRequestUuid"])(locale);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalMatchUuid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearStoredProposalMatchUuid"])(locale);
        nav.goBack();
    };
    const submitAiClarificationAnswers = async ()=>{
        if (!projectUuid || aiQuestions.length === 0 || submittingClarification) return;
        const payload = aiQuestions.map((question)=>({
                key: question.key,
                answer: String(aiAnswers[question.key] || '').trim()
            }));
        if (payload.some((answer)=>!answer.answer)) {
            setError(isRTL ? 'يرجى الإجابة على جميع الأسئلة.' : 'Please answer all questions.');
            return;
        }
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
        if (!token) {
            setError(isRTL ? 'يرجى تسجيل الدخول للمتابعة.' : 'Please sign in to continue.');
            return;
        }
        setSubmittingClarification(true);
        setError(null);
        try {
            const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(`/api/account/project/definition/ai-intake/answers/${projectUuid}`), {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Accept-Language': locale === 'ar' ? 'ar' : 'en',
                    'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
                },
                body: JSON.stringify({
                    answers: payload
                })
            });
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res, isRTL ? 'تعذر إرسال الإجابات.' : 'Failed to submit answers.');
            setAiQuestions([]);
            setAiAnswers({});
            setScopes(null);
            setAiRequestUnderstood(true);
            delayNextAiClarificationCheckRef.current = true;
            setAiMode('polling');
            setAiPollVersion((version)=>version + 1);
        } catch (err) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر إرسال الإجابات.' : 'Failed to submit answers.'));
        } finally{
            setSubmittingClarification(false);
        }
    };
    const onContinue = async ()=>{
        if (!canContinue || !serviceId || !projectUuid) return;
        setError(null);
        try {
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceScopeParentIdsKey(locale), JSON.stringify(selectedParents.map((s)=>s.id)));
            persistManualScopes(selectedManualScopes);
            window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceScopeHasChildrenKey(locale), hasAnyChildren || selectedManualScopes.length > 0 ? '1' : '0');
        } catch  {
        // ignore
        }
        nav.goNext();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mx-auto w-full max-w-5xl",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                locale: locale,
                entered: entered,
                projectTypeId: projectType,
                status: isOtherFlow && aiMode === 'polling' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "inline-flex items-center gap-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "relative inline-flex h-2 w-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-40 animate-ping"
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                lineNumber: 1083,
                                columnNumber: 17
                            }, void 0),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "relative inline-flex h-2 w-2 rounded-full bg-blue-600"
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                lineNumber: 1084,
                                columnNumber: 17
                            }, void 0)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                        lineNumber: 1082,
                        columnNumber: 15
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                    lineNumber: 1081,
                    columnNumber: 13
                }, void 0) : null
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                lineNumber: 1075,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mt-2 text-start transition-all duration-700 ${entered ? 'translate-x-0 opacity-100' : isRTL ? 'translate-x-4 opacity-0' : '-translate-x-4 opacity-0'}`,
                children: [
                    isEnglish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                        children: `
            #project-scope-question-title {
              font-family: "IBM Plex Serif", serif !important;
            }
          `
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                        lineNumber: 1101,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "project-scope-question-title",
                        className: "text-xl font-medium tracking-tight text-slate-900 sm:text-2xl",
                        dangerouslySetInnerHTML: {
                            __html: title
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                        lineNumber: 1107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1.5 max-w-3xl text-sm font-semibold leading-relaxed text-slate-600",
                        children: subtitle
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                        lineNumber: 1112,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                lineNumber: 1092,
                columnNumber: 7
            }, this),
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 text-sm font-semibold text-rose-700",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                lineNumber: 1117,
                columnNumber: 16
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 pb-[100px] lg:pb-0 sm:mt-7",
                children: loading ? isOtherFlow && aiMode === 'polling' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AiGeneratingScopesLoader, {
                    isRTL: isRTL,
                    requestUnderstood: aiRequestUnderstood
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                    lineNumber: 1124,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm font-semibold text-slate-600",
                    children: isRTL ? 'جاري التحميل…' : 'Loading…'
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                    lineNumber: 1129,
                    columnNumber: 13
                }, this) : isOtherFlow && aiMode === 'clarification' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AiClarificationQuestions, {
                    isRTL: isRTL,
                    questions: aiQuestions,
                    answers: aiAnswers,
                    submitting: submittingClarification,
                    onAnswer: (key, value)=>{
                        if (error) setError(null);
                        setAiAnswers((prev)=>({
                                ...prev,
                                [key]: value
                            }));
                    },
                    onSubmit: submitAiClarificationAnswers
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                    lineNumber: 1134,
                    columnNumber: 11
                }, this) : isOtherFlow && (aiMode === 'failed' || aiMode === 'timeout') ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AiIntakeFallback, {
                    isRTL: isRTL,
                    mode: aiMode,
                    onBackToServices: returnToDefinedServices
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                    lineNumber: 1146,
                    columnNumber: 11
                }, this) : showScopePicker ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        selectableCount > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `mb-3 flex items-center ${isRTL ? 'justify-start flex-row-reverse' : 'justify-end'}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: toggleSelectAll,
                                className: `inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${allSelected ? 'border-blue-300 bg-blue-50 text-[#1C7CBB]' : 'border-slate-200 bg-white/70 text-slate-600 hover:bg-white'} ${isRTL ? 'flex-row-reverse' : ''}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `inline-flex h-4 w-4 items-center justify-center rounded border ${allSelected ? 'border-[#1C7CBB] bg-[#1C7CBB] text-white' : 'border-slate-300 bg-white'}`,
                                        children: allSelected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                                            size: 12,
                                            stroke: 3
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                            lineNumber: 1173,
                                            columnNumber: 34
                                        }, this) : null
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                        lineNumber: 1166,
                                        columnNumber: 17
                                    }, this),
                                    allSelected ? isRTL ? 'إلغاء تحديد الكل' : 'Deselect all' : isRTL ? 'تحديد الكل' : 'Select all'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                lineNumber: 1157,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                            lineNumber: 1154,
                            columnNumber: 13
                        }, this) : null,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3",
                            role: "group",
                            "aria-label": title,
                            children: [
                                availableScopes.map((scope, index)=>{
                                    const checked = selectedParentIds.includes(scope.id);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: `flex min-h-[56px] cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-3 text-start shadow-sm backdrop-blur-md transition-all duration-300 sm:px-4 ${checked ? 'border-blue-300 bg-white/70' : 'border-white/30 bg-white/40 hover:bg-white/55'} ${entered ? 'translate-x-0 opacity-100' : isRTL ? 'translate-x-4 opacity-0' : '-translate-x-4 opacity-0'}`,
                                        style: {
                                            transitionDelay: `${110 + index * 45}ms`
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: checked,
                                                onChange: ()=>toggleParent(scope.id),
                                                className: "h-4 w-4 shrink-0 rounded border-slate-300 text-[#1C7CBB] focus:ring-2 focus:ring-blue-200"
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                                lineNumber: 1208,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-semibold leading-snug text-slate-900",
                                                children: scope.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                                lineNumber: 1214,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, scope.id, true, {
                                        fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                        lineNumber: 1193,
                                        columnNumber: 17
                                    }, this);
                                }),
                                namedManualScopes.map((scope)=>{
                                    const checked = selectedManualScopeIds.includes(scope.id);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `flex min-h-[56px] items-center gap-2.5 rounded-xl border px-3.5 py-3 shadow-sm backdrop-blur-md sm:px-4 ${checked ? 'border-blue-300 bg-white/70' : 'border-white/30 bg-white/40'} ${isRTL ? 'flex-row-reverse' : ''}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: checked,
                                                onChange: ()=>toggleManualScope(scope.id),
                                                className: "h-4 w-4 shrink-0 rounded border-slate-300 text-[#1C7CBB] focus:ring-2 focus:ring-blue-200"
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                                lineNumber: 1232,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `flex-1 text-sm font-semibold leading-snug text-slate-900 ${isRTL ? 'text-right' : 'text-left'}`,
                                                children: scope.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                                lineNumber: 1238,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>removeManualScope(scope.id),
                                                "aria-label": isRTL ? 'إزالة النطاق' : 'Remove scope',
                                                className: "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-500 hover:bg-white hover:text-slate-700",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconXboxXFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconXboxXFilled$3e$__["IconXboxXFilled"], {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                                    lineNumber: 1247,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                                lineNumber: 1241,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, scope.id, true, {
                                        fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                        lineNumber: 1224,
                                        columnNumber: 15
                                    }, this);
                                }),
                                pendingScopeName !== null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `flex min-h-[56px] items-center gap-2.5 rounded-xl border border-white/30 bg-white/55 px-3.5 py-3 shadow-sm backdrop-blur-md sm:px-4 ${isRTL ? 'flex-row-reverse' : ''}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border border-slate-300 bg-white/80",
                                            "aria-hidden": "true"
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                            lineNumber: 1257,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: pendingScopeName,
                                            onChange: (e)=>setPendingScopeName(e.target.value),
                                            onBlur: commitPendingScope,
                                            onKeyDown: (e)=>{
                                                if (e.key === 'Enter') commitPendingScope();
                                                if (e.key === 'Escape') cancelPendingScope();
                                            },
                                            placeholder: isRTL ? 'اسم النطاق…' : 'Scope name…',
                                            className: `flex-1 border-0 bg-transparent p-0 text-sm font-semibold text-slate-900 shadow-none outline-none ring-0 placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-0 ${isRTL ? 'text-right' : 'text-left'}`,
                                            autoFocus: true
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                            lineNumber: 1261,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onMouseDown: (event)=>event.preventDefault(),
                                            onClick: commitPendingScope,
                                            "aria-label": isRTL ? 'إضافة النطاق' : 'Add scope',
                                            className: "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm hover:bg-emerald-600 active:bg-emerald-700",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                                                size: 13,
                                                stroke: 2.5
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                                lineNumber: 1280,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                            lineNumber: 1273,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onMouseDown: (event)=>event.preventDefault(),
                                            onClick: cancelPendingScope,
                                            "aria-label": isRTL ? 'إلغاء' : 'Cancel',
                                            className: "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white shadow-sm hover:bg-rose-600 active:bg-rose-700",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconXboxXFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconXboxXFilled$3e$__["IconXboxXFilled"], {
                                                size: 13
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                                lineNumber: 1289,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                            lineNumber: 1282,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                    lineNumber: 1254,
                                    columnNumber: 15
                                }, this) : null,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onMouseDown: (event)=>{
                                        if (pendingScopeName !== null) event.preventDefault();
                                    },
                                    onClick: startAddScope,
                                    className: `flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl border border-dashed border-blue-300 bg-white/35 px-3.5 py-3 shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-blue-50/30 sm:px-4 ${entered ? 'translate-x-0 opacity-100' : isRTL ? 'translate-x-4 opacity-0' : '-translate-x-4 opacity-0'}`,
                                    style: {
                                        transitionDelay: `${110 + availableScopes.length * 45}ms`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlusFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlusFilled$3e$__["IconPlusFilled"], {
                                            size: 15,
                                            className: "shrink-0 text-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                            lineNumber: 1309,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-semibold text-blue-500",
                                            children: isRTL ? 'إضافة نطاق' : 'Add Scope'
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                            lineNumber: 1310,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                    lineNumber: 1294,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                            lineNumber: 1185,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true) : isOtherFlow ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                    lineNumber: 1317,
                    columnNumber: 11
                }, this) : null
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                lineNumber: 1121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto w-full max-w-6xl px-4 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] lg:px-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: nav.backHref,
                                className: "btn-sm rounded-full px-6 py-2 border border-slate-200 bg-white/80 text-slate-700 hover:bg-white",
                                children: isRTL ? 'رجوع' : 'Back'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                lineNumber: 1323,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onContinue,
                                disabled: !canContinue,
                                className: `btn-sm rounded-full px-6 py-2 ${canContinue ? 'bg-[#1C7CBB] text-white hover:bg-opacity-90' : 'cursor-not-allowed bg-slate-200 text-slate-500'}`,
                                children: nav.continueLabel
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                                lineNumber: 1330,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                        lineNumber: 1322,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                    lineNumber: 1321,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
                lineNumber: 1320,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/ProjectScopeQuestion.tsx",
        lineNumber: 1074,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=components_project_questions_c8eb48dc._.js.map