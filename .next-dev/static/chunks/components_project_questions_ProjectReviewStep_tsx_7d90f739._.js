(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/project/questions/ProjectReviewStep.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SectionBlock",
    ()=>SectionBlock,
    "default",
    ()=>ProjectReviewStep
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectDefinitionMode.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$BriefcaseIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BriefcaseIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/solid/esm/BriefcaseIcon.js [app-client] (ecmascript) <export default as BriefcaseIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$ClipboardDocumentListIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardDocumentListIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/solid/esm/ClipboardDocumentListIcon.js [app-client] (ecmascript) <export default as ClipboardDocumentListIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$DocumentTextIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentTextIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/solid/esm/DocumentTextIcon.js [app-client] (ecmascript) <export default as DocumentTextIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$GlobeAltIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GlobeAltIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/solid/esm/GlobeAltIcon.js [app-client] (ecmascript) <export default as GlobeAltIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectPropertiesSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectPropertiesSync.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectRequestUuid.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/specifiedInsighterProject.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceSessions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectServiceSessions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ProjectServicesReview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/ProjectServicesReview.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectAddonsState.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectDeliverables.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectSchedule.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectServiceUuid.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectLabels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectLabels.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDescriptionState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectDescriptionState.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsPayload.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectWizardFlow.ts [app-client] (ecmascript)");
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
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$ClipboardDocumentListIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardDocumentListIcon$3e$__["ClipboardDocumentListIcon"],
        className: 'bg-sky-50 text-sky-500'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$BriefcaseIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BriefcaseIcon$3e$__["BriefcaseIcon"],
        className: 'bg-amber-50 text-amber-500'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$DocumentTextIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentTextIcon$3e$__["DocumentTextIcon"],
        className: 'bg-emerald-50 text-emerald-500'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$GlobeAltIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GlobeAltIcon$3e$__["GlobeAltIcon"],
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
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return window.sessionStorage.getItem(key) || '';
    } catch (e) {
        return '';
    }
}
function safeParseNumberArray(value) {
    if (!value) return [];
    try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) return [];
        return parsed.map((item)=>Number(item)).filter((item)=>Number.isFinite(item));
    } catch (e) {
        return [];
    }
}
function parseStringArray(value) {
    if (!value) return [];
    try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) return [];
        return parsed.map((item)=>String(item || '').trim()).filter(Boolean);
    } catch (e) {
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
    return "".concat(value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1), " ").concat(units[unitIndex]);
}
function formatRange(min, max, locale) {
    if (min && max) return locale === 'ar' ? "".concat(min, " إلى ").concat(max) : "".concat(min, " to ").concat(max);
    if (min) return locale === 'ar' ? "من ".concat(min) : "From ".concat(min);
    if (max) return locale === 'ar' ? "حتى ".concat(max) : "Up to ".concat(max);
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
        return (localizedName === null || localizedName === void 0 ? void 0 : localizedName.ar) || plainName || (localizedName === null || localizedName === void 0 ? void 0 : localizedName.en) || '';
    }
    return (localizedName === null || localizedName === void 0 ? void 0 : localizedName.en) || plainName || (localizedName === null || localizedName === void 0 ? void 0 : localizedName.ar) || '';
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
    const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])(path), {
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
async function fetchProjectRequest(locale, projectUuid) {
    var _json_data, _json_data1;
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
    if (!token) return null;
    const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/account/project/show/".concat(projectUuid)), {
        method: 'GET',
        headers: {
            Authorization: "Bearer ".concat(token),
            Accept: 'application/json',
            'Accept-Language': locale === 'ar' ? 'ar' : 'en'
        },
        cache: 'no-store'
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res);
    const json = await res.json();
    if (((_json_data = json.data) === null || _json_data === void 0 ? void 0 : _json_data.definition_mode) === 'simple' || ((_json_data1 = json.data) === null || _json_data1 === void 0 ? void 0 : _json_data1.definition_mode) === 'advanced') (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storeDefinitionMode"])(locale, json.data.definition_mode);
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
    const { locale, slugs, payload, plannedStartDate } = params;
    return slugs.filter((slug)=>slug !== 'target-market').map((slug)=>{
        var _payload_components;
        const payloadValue = (_payload_components = payload.components) === null || _payload_components === void 0 ? void 0 : _payload_components[slug];
        if (slug === 'deliverable-stage') {
            const raw = payloadValue && typeof payloadValue === 'object' ? payloadValue : {};
            const deliverables = Array.isArray(raw.deliverables) ? raw.deliverables : [];
            const notSpecified = locale === 'ar' ? 'غير محدد' : 'Not specified';
            if (deliverables.length === 0) return null;
            return {
                title: getComponentTitle(locale, slug),
                rows: deliverables.map((deliverable)=>{
                    const way = resolveDeliverableWay(deliverable);
                    const reportTypes = getReportTypes(deliverable.report_type);
                    const periodDays = Math.max(0, Math.round(Number(deliverable.period_days) || 0));
                    const when = plannedStartDate ? "".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dayLabel"])(locale, periodDays), " · ").concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIsoDate"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDaysToIsoDate"])(plannedStartDate, periodDays), locale)) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dayLabel"])(locale, periodDays);
                    return {
                        label: "".concat(String(deliverable.title || '').trim() || notSpecified, " — ").concat(when),
                        value: [
                            getDeliverableWayLabel(locale, way.key),
                            ...way.address ? [
                                "".concat(locale === 'ar' ? 'العنوان' : 'Address', ": ").concat(way.address)
                            ] : []
                        ],
                        fileTypes: reportTypes,
                        editStepId: 'deliverables-plan'
                    };
                })
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
        const rawAnswer = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceComponentAnswerKey(locale, slug));
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
function SectionBlock(param) {
    let { locale, plannedStartDate, title, rows, emptyText, toneIndex, isRTL, editLabel, editHrefFor } = param;
    const sectionIcon = sectionIcons[toneIndex % sectionIcons.length];
    const Icon = sectionIcon.icon;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "border-t border-slate-200 pt-6 first:border-t-0 first:pt-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex h-9 w-9 items-center justify-center rounded-full ".concat(sectionIcon.className),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                className: "h-[18px] w-[18px]",
                                strokeWidth: 1.35
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                lineNumber: 700,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                            lineNumber: 697,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-base font-semibold text-slate-900 sm:text-lg",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                lineNumber: 703,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                            lineNumber: 702,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                    lineNumber: 696,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                lineNumber: 695,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2 xl:grid-cols-3",
                children: rows.map((row)=>{
                    var _row_fileTypes, _row_scopeGroups;
                    var _row_fileTypes_length;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: "min-w-0 ".concat(rows.length === 1 || row.full ? 'sm:col-span-2 xl:col-span-3' : row.wide ? 'sm:col-span-2 xl:col-span-2' : ''),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-2 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs font-semibold text-slate-500",
                                        children: row.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 721,
                                        columnNumber: 15
                                    }, this),
                                    row.badge ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700",
                                        children: row.badge
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 723,
                                        columnNumber: 17
                                    }, this) : null,
                                    row.editStepId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: editHrefFor(row.editStepId),
                                        onClick: row.onEdit,
                                        title: "".concat(editLabel, ": ").concat(row.label),
                                        "aria-label": "".concat(editLabel, ": ").concat(row.label),
                                        className: "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "17",
                                            height: "17",
                                            viewBox: "0 0 17 17",
                                            fill: "none",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                "fill-rule": "evenodd",
                                                "clip-rule": "evenodd",
                                                d: "M9.83073 2.62588C10.6606 1.79601 12.0061 1.79601 12.8359 2.62588L14.3741 4.16408C15.204 4.99394 15.204 6.33941 14.3741 7.16928L6.87587 14.6675C6.74303 14.8004 6.56286 14.875 6.375 14.875H2.83333C2.44213 14.875 2.125 14.5579 2.125 14.1667V10.625C2.125 10.4371 2.19963 10.257 2.33247 10.1241L9.83073 2.62588ZM11.8342 3.62761C11.5576 3.35099 11.1091 3.35099 10.8325 3.62761L10.2101 4.25001L12.75 6.78994L13.3724 6.16754C13.649 5.89092 13.649 5.44243 13.3724 5.16581L11.8342 3.62761ZM11.7483 7.79168L9.20833 5.25174L3.54167 10.9184V13.4583H6.0816L11.7483 7.79168Z",
                                                fill: "#00A028"
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                lineNumber: 736,
                                                columnNumber: 1
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                            lineNumber: 735,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 728,
                                        columnNumber: 17
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                lineNumber: 720,
                                columnNumber: 13
                            }, this),
                            row.value.length > 0 || ((_row_fileTypes_length = (_row_fileTypes = row.fileTypes) === null || _row_fileTypes === void 0 ? void 0 : _row_fileTypes.length) !== null && _row_fileTypes_length !== void 0 ? _row_fileTypes_length : 0) > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    row.variant === 'requirement-summary' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        dir: "auto",
                                        className: "whitespace-pre-line break-words text-sm leading-6 text-slate-800",
                                        children: row.value[0]
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 746,
                                        columnNumber: 19
                                    }, this) : row.variant === 'deliverables-table' && row.deliverables ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$ProjectServicesReview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DeliverablesReviewTable"], {
                                        locale: locale || 'en',
                                        deliverables: row.deliverables,
                                        plannedStartDate: plannedStartDate
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 748,
                                        columnNumber: 19
                                    }, this) : row.variant === 'scope-table' && ((_row_scopeGroups = row.scopeGroups) === null || _row_scopeGroups === void 0 ? void 0 : _row_scopeGroups.length) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overflow-hidden rounded-xl border border-slate-200",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                            className: "w-full border-collapse text-sm",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                children: row.scopeGroups.map((group, groupIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    scope: "colgroup",
                                                                    className: "bg-white px-4 py-3 font-semibold text-slate-900 ".concat(isRTL ? 'text-right' : 'text-left', " ").concat(groupIndex > 0 ? 'border-t border-slate-200' : ''),
                                                                    children: group.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                                    lineNumber: 756,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                                lineNumber: 755,
                                                                columnNumber: 29
                                                            }, this),
                                                            group.subscopes.length > 0 ? group.subscopes.map((sub, subIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                    className: "border-t border-slate-200",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-4 py-2.5 align-top leading-6 text-slate-700 ".concat(isRTL ? 'text-right' : 'text-left'),
                                                                        children: sub
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                                        lineNumber: 773,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                }, "".concat(row.label, "-").concat(groupIndex, "-").concat(subIndex), false, {
                                                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                                    lineNumber: 769,
                                                                    columnNumber: 33
                                                                }, this)) : null
                                                        ]
                                                    }, "".concat(row.label, "-").concat(groupIndex), true, {
                                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                        lineNumber: 754,
                                                        columnNumber: 27
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                lineNumber: 752,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                            lineNumber: 751,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 750,
                                        columnNumber: 19
                                    }, this) : row.value.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-2",
                                        children: row.variant === 'chips' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-start gap-3 text-sm leading-6 text-slate-800",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                    lineNumber: 792,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-2",
                                                    children: row.value.map((item, itemIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700",
                                                            children: item
                                                        }, "".concat(row.label, "-").concat(itemIndex, "-").concat(item), false, {
                                                            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                            lineNumber: 795,
                                                            columnNumber: 29
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                    lineNumber: 793,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                            lineNumber: 791,
                                            columnNumber: 23
                                        }, this) : row.value.map((item, itemIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex items-start gap-3 text-sm leading-6 text-slate-800",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                        lineNumber: 810,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: item
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                        lineNumber: 811,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, "".concat(row.label, "-").concat(itemIndex, "-").concat(item), true, {
                                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                lineNumber: 806,
                                                columnNumber: 25
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 789,
                                        columnNumber: 19
                                    }, this) : null,
                                    row.fileTypes && row.fileTypes.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            row.value.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-2 text-xs font-semibold text-slate-500",
                                                children: isRTL ? 'الصيغ' : 'Formats'
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                lineNumber: 821,
                                                columnNumber: 23
                                            }, this) : null,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "space-y-2",
                                                children: row.fileTypes.map((fileType, itemIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: "flex items-center gap-3 text-sm leading-6 text-slate-800",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "h-1.5 w-1.5 shrink-0 rounded-full bg-sky-600"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                                lineNumber: 831,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                src: getFileIconByExtension(fileType),
                                                                alt: fileType.toUpperCase(),
                                                                width: 18,
                                                                height: 18,
                                                                className: "h-[23px] w-[18px]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                                lineNumber: 832,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: fileType.toUpperCase()
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                                lineNumber: 839,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, "".concat(row.label, "-file-").concat(itemIndex, "-").concat(fileType), true, {
                                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                        lineNumber: 827,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                lineNumber: 825,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 819,
                                        columnNumber: 19
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                lineNumber: 744,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-slate-400",
                                children: emptyText
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                lineNumber: 847,
                                columnNumber: 15
                            }, this)
                        ]
                    }, row.label, true, {
                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                        lineNumber: 710,
                        columnNumber: 11
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                lineNumber: 708,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
        lineNumber: 694,
        columnNumber: 5
    }, this);
}
_c = SectionBlock;
function ProjectReviewStep(param) {
    let { locale } = param;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const isRTL = locale === 'ar';
    const [review, setReview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSpecifiedInsighter, setIsSpecifiedInsighter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [specifiedInsighterDisplayName, setSpecifiedInsighterDisplayName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"])(error, locale);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProjectReviewStep.useEffect": ()=>{
            let cancelled = false;
            const load = {
                "ProjectReviewStep.useEffect.load": async ()=>{
                    var _readStoredSpecifiedInsighterDisplay, _serviceComponentsPayload_components;
                    setError(null);
                    // Back from adding/editing an additional service: restore the main service's answers.
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isServiceFlowActive"])(locale)) (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceSessions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["finishServiceFlow"])(locale);
                    const specificProject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSpecifiedInsighterProject"])(locale);
                    setIsSpecifiedInsighter(specificProject);
                    setSpecifiedInsighterDisplayName(specificProject ? ((_readStoredSpecifiedInsighterDisplay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$specifiedInsighterProject$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredSpecifiedInsighterDisplay"])(locale)) === null || _readStoredSpecifiedInsighterDisplay === void 0 ? void 0 : _readStoredSpecifiedInsighterDisplay.name) || '' : '');
                    const projectUuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredProjectRequestUuid"])(locale);
                    const rawProjectType = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale));
                    const deliverablesLanguage = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].deliverablesLanguageKey(locale));
                    const insighterIndustryLabel = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterIndustryLabelKey(locale));
                    const storedServiceLabel = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].serviceLabelKey(locale));
                    const servicePrompt = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].servicePromptKey(locale));
                    const projectStatus = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectStatusKey(locale));
                    const whoAreYou = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].whoAreYouKey(locale));
                    const preferredInsighterType = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].preferredInsighterTypeKey(locale));
                    const originType = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterOriginTypeKey(locale));
                    const originId = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterOriginIdKey(locale));
                    const targetMode = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketModeKey(locale));
                    const storedSchedule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readProjectSchedule"])(locale);
                    const countryIds = safeParseNumberArray(readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketCountryIdsKey(locale)));
                    const regionIds = safeParseNumberArray(readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketRegionIdsKey(locale)));
                    const blocIds = safeParseNumberArray(readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].targetMarketEconomicBlocIdsKey(locale)));
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
                    ].find({
                        "ProjectReviewStep.useEffect.load.firstRejectedResult": (result)=>result.status === 'rejected'
                    }["ProjectReviewStep.useEffect.load.firstRejectedResult"]);
                    if (firstRejectedResult && !cancelled) {
                        if (!cancelled) {
                            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(firstRejectedResult.reason, isRTL ? 'تعذر تحميل تفاصيل المراجعة.' : 'Failed to load review details.'));
                        }
                    }
                    const service = (requestData === null || requestData === void 0 ? void 0 : requestData.service) || null;
                    const serviceName = storedServiceLabel || (service === null || service === void 0 ? void 0 : service.name) || (isRTL ? 'غير محدد' : 'Not specified');
                    const projectTitle = String((requestData === null || requestData === void 0 ? void 0 : requestData.title) || '').trim();
                    const headerTitle = projectTitle || (isRTL ? 'ملخص المشروع' : 'Project Summary');
                    const storedOriginLabel = originType === 'country' ? countries.find({
                        "ProjectReviewStep.useEffect.load": (item)=>String(item.id) === originId
                    }["ProjectReviewStep.useEffect.load"]) ? getDisplayName(locale, countries.find({
                        "ProjectReviewStep.useEffect.load": (item)=>String(item.id) === originId
                    }["ProjectReviewStep.useEffect.load"])) : originId : originType === 'region' ? getDisplayName(locale, regions.find({
                        "ProjectReviewStep.useEffect.load": (item)=>String(item.id) === originId
                    }["ProjectReviewStep.useEffect.load"]) || {}) || originId : '';
                    const originLabel = storedOriginLabel || ((requestData === null || requestData === void 0 ? void 0 : requestData.insighter_origin) ? getDisplayName(locale, requestData.insighter_origin) : isRTL ? 'كل العالم' : 'Worldwide');
                    const targetMarket = targetMode === 'country' ? countryIds.map({
                        "ProjectReviewStep.useEffect.load": (id)=>{
                            const match = countries.find({
                                "ProjectReviewStep.useEffect.load.match": (item)=>item.id === id
                            }["ProjectReviewStep.useEffect.load.match"]);
                            return match ? getDisplayName(locale, match) : "#".concat(id);
                        }
                    }["ProjectReviewStep.useEffect.load"]) : targetMode === 'economic' ? blocIds.map({
                        "ProjectReviewStep.useEffect.load": (id)=>{
                            const match = blocs.find({
                                "ProjectReviewStep.useEffect.load.match": (item)=>item.id === id
                            }["ProjectReviewStep.useEffect.load.match"]);
                            return match ? getDisplayName(locale, match) : "#".concat(id);
                        }
                    }["ProjectReviewStep.useEffect.load"]) : targetMode === 'worldwide' ? [
                        locale === 'ar' ? 'عالميًا' : 'Worldwide'
                    ] : regionIds.map({
                        "ProjectReviewStep.useEffect.load": (id)=>getDisplayName(locale, regions.find({
                                "ProjectReviewStep.useEffect.load": (item)=>item.id === id
                            }["ProjectReviewStep.useEffect.load"]) || {}) || "#".concat(id)
                    }["ProjectReviewStep.useEffect.load"]);
                    const descriptionState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDescriptionState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readProjectDescriptionState"])(locale);
                    const addonsState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readProjectAddonsState"])(locale);
                    const scopeSnapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectAddonsState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readProjectScopeSnapshot"])(locale);
                    const storedServiceComponentsPayload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readServiceComponentsPayload"])(locale);
                    const activeProjectService = requestData ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pickProjectServiceFromProject"])(requestData, (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredProjectServiceUuid"])(locale)) : null;
                    const apiServiceComponentsPayload = normalizeProjectComponents([
                        ...(requestData === null || requestData === void 0 ? void 0 : requestData.components) || [],
                        ...(activeProjectService === null || activeProjectService === void 0 ? void 0 : activeProjectService.components) || []
                    ]);
                    const plannedStartDate = (storedSchedule === null || storedSchedule === void 0 ? void 0 : storedSchedule.plannedStartDate) || stringifyValue(requestData === null || requestData === void 0 ? void 0 : requestData.planned_start_date).slice(0, 10);
                    var _storedSchedule_durationDays;
                    const durationDays = (_storedSchedule_durationDays = storedSchedule === null || storedSchedule === void 0 ? void 0 : storedSchedule.durationDays) !== null && _storedSchedule_durationDays !== void 0 ? _storedSchedule_durationDays : (requestData === null || requestData === void 0 ? void 0 : requestData.duration_days) === null || (requestData === null || requestData === void 0 ? void 0 : requestData.duration_days) === undefined ? null : Number(requestData.duration_days);
                    const serviceComponentsPayload = {
                        components: {
                            ...apiServiceComponentsPayload.components || {},
                            ...storedServiceComponentsPayload.components || {}
                        }
                    };
                    const applicableComponentSteps = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readServiceComponentSlugs"])(locale));
                    const serviceComponentSlugs = Array.from(new Set([
                        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readServiceComponentSlugs"])(locale),
                        ...Object.keys(serviceComponentsPayload.components || {})
                    ])).filter({
                        "ProjectReviewStep.useEffect.load.serviceComponentSlugs": (slug)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandServiceComponentSlugs"])([
                                slug
                            ]).some({
                                "ProjectReviewStep.useEffect.load.serviceComponentSlugs": (step)=>applicableComponentSteps.has(step)
                            }["ProjectReviewStep.useEffect.load.serviceComponentSlugs"])
                    }["ProjectReviewStep.useEffect.load.serviceComponentSlugs"]);
                    const apiTargetMarket = getTargetMarketLabels(locale, (_serviceComponentsPayload_components = serviceComponentsPayload.components) === null || _serviceComponentsPayload_components === void 0 ? void 0 : _serviceComponentsPayload_components['target-market']);
                    const serviceComponentSections = buildServiceComponentSections({
                        locale,
                        slugs: serviceComponentSlugs,
                        payload: serviceComponentsPayload,
                        plannedStartDate
                    });
                    const projectTypeValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectLabels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectTypeLabel"])(locale, rawProjectType || stringifyValue(requestData === null || requestData === void 0 ? void 0 : requestData.type) || null);
                    const projectStatusValue = formatProjectPhase(locale, projectStatus || stringifyValue(requestData === null || requestData === void 0 ? void 0 : requestData.phase));
                    const businessTypeValue = formatBusinessType(locale, whoAreYou || stringifyValue(requestData === null || requestData === void 0 ? void 0 : requestData.business_type));
                    const preferredInsighterTypeValue = formatPreferredInsighterType(locale, preferredInsighterType || stringifyValue(requestData === null || requestData === void 0 ? void 0 : requestData.insighter_preferred_type));
                    const insighterMinYearsExperience = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterMinYearsExperienceKey(locale)) || stringifyValue(requestData === null || requestData === void 0 ? void 0 : requestData.insighter_min_years_experience);
                    const insighterMaxYearsExperience = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].insighterMaxYearsExperienceKey(locale)) || stringifyValue(requestData === null || requestData === void 0 ? void 0 : requestData.insighter_max_years_experience);
                    const companyMinTeamSize = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].companyMinTeamSizeKey(locale)) || stringifyValue(requestData === null || requestData === void 0 ? void 0 : requestData.company_min_team_size);
                    const companyMaxTeamSize = readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].companyMaxTeamSizeKey(locale)) || stringifyValue(requestData === null || requestData === void 0 ? void 0 : requestData.company_max_team_size);
                    const nextReview = {
                        title: headerTitle,
                        projectType: projectTypeValue || (isRTL ? 'غير محدد' : 'Not specified'),
                        deliverablesLanguage: deliverablesLanguage || (isRTL ? 'غير محدد' : 'Not specified'),
                        insighterIndustry: insighterIndustryLabel || (isRTL ? 'غير محدد' : 'Not specified'),
                        service: serviceName,
                        projectStatus: projectStatusValue || (isRTL ? 'غير محدد' : 'Not specified'),
                        whoAreYou: businessTypeValue || (isRTL ? 'غير محدد' : 'Not specified'),
                        preferredInsighterType: preferredInsighterTypeValue || (isRTL ? 'غير محدد' : 'Not specified'),
                        anyInsighterType: (preferredInsighterType || stringifyValue(requestData === null || requestData === void 0 ? void 0 : requestData.insighter_preferred_type)) === 'Either',
                        origin: originLabel,
                        experienceRange: formatRange(insighterMinYearsExperience, insighterMaxYearsExperience, locale),
                        teamSizeRange: formatRange(companyMinTeamSize, companyMaxTeamSize, locale),
                        hasTargetMarket: applicableComponentSteps.has('target-market'),
                        targetMarket: targetMarket.length > 0 ? targetMarket : apiTargetMarket.length > 0 ? apiTargetMarket : [
                            isRTL ? 'غير محدد' : 'Not specified'
                        ],
                        plannedStartDate,
                        durationDays,
                        servicePrompt: servicePrompt.trim() || stringifyValue(requestData === null || requestData === void 0 ? void 0 : requestData.service_prompt),
                        description: descriptionState.description || stringifyValue(requestData === null || requestData === void 0 ? void 0 : requestData.description),
                        descriptionFiles: descriptionState.files,
                        scopeSnapshot,
                        kickoffMeeting: addonsState.kickoffMeeting.enabled,
                        serviceComponentSections,
                        projectServices: (requestData === null || requestData === void 0 ? void 0 : requestData.project_services) || []
                    };
                    if (!cancelled) setReview(nextReview);
                }
            }["ProjectReviewStep.useEffect.load"];
            void load();
            return ({
                "ProjectReviewStep.useEffect": ()=>{
                    cancelled = true;
                }
            })["ProjectReviewStep.useEffect"];
        }
    }["ProjectReviewStep.useEffect"], [
        isRTL,
        locale
    ]);
    const emptyText = isRTL ? 'غير محدد' : 'Not specified';
    const editLabel = isRTL ? 'تعديل' : 'Edit';
    const overviewRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ProjectReviewStep.useMemo[overviewRows]": ()=>{
            if (!review) return [];
            return [
                {
                    label: isRTL ? 'تحديد النطاق والمخرجات' : 'Scope and deliverables',
                    value: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readDefinitionMode"])(locale) === 'simple' ? isRTL ? 'يقترحها الخبير' : 'Expert to propose' : isRTL ? 'أحدد التفاصيل بنفسي' : 'Define details myself'
                    ]
                },
                {
                    label: isRTL ? 'نوع المشروع' : 'Project type',
                    value: [
                        review.projectType
                    ],
                    editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectType
                },
                {
                    label: isRTL ? 'لغة المخرجات' : 'Deliverables language',
                    value: [
                        review.deliverablesLanguage
                    ],
                    editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].deliverablesLanguage
                },
                {
                    label: isRTL ? 'الصناعة' : 'Industry',
                    value: [
                        review.insighterIndustry
                    ],
                    editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].insighterIndustry
                },
                {
                    label: isRTL ? 'الخدمة' : 'Service',
                    value: [
                        review.service
                    ],
                    editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].service
                },
                ...isSpecifiedInsighter ? [
                    {
                        label: isRTL ? 'نوع المطابقة' : 'Matching mode',
                        value: [
                            specifiedInsighterDisplayName ? "".concat(isRTL ? 'الخدمة بواسطة' : 'Service by', " ").concat(specifiedInsighterDisplayName) : isRTL ? 'الخدمة بواسطة' : 'Service by'
                        ]
                    }
                ] : [],
                {
                    label: isRTL ? 'مرحلة المشروع' : 'Project status',
                    value: [
                        review.projectStatus
                    ],
                    editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectStatus
                },
                {
                    label: isRTL ? 'نوع العميل' : 'Business profile',
                    value: [
                        review.whoAreYou
                    ],
                    editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].whoAreYou
                },
                {
                    label: isRTL ? 'البدء المخطط' : 'Planned start',
                    value: review.plannedStartDate ? [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIsoDate"])(review.plannedStartDate, locale)
                    ] : [],
                    editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectSchedule
                },
                {
                    label: isRTL ? 'المدة' : 'Duration',
                    value: review.durationDays === null ? [] : [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["durationLabel"])(locale, review.durationDays),
                        ...review.plannedStartDate ? [
                            "".concat(isRTL ? 'الإغلاق المخطط' : 'Planned close', ": ").concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIsoDate"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDaysToIsoDate"])(review.plannedStartDate, review.durationDays), locale))
                        ] : []
                    ],
                    editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectSchedule
                }
            ];
        }
    }["ProjectReviewStep.useMemo[overviewRows]"], [
        isRTL,
        isSpecifiedInsighter,
        locale,
        review,
        specifiedInsighterDisplayName
    ]);
    const serviceSections = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ProjectReviewStep.useMemo[serviceSections]": ()=>{
            if (!review) return [];
            return [
                ...review.projectServices
            ].sort({
                "ProjectReviewStep.useMemo[serviceSections]": (a, b)=>(a.position || 0) - (b.position || 0)
            }["ProjectReviewStep.useMemo[serviceSections]"]).map({
                "ProjectReviewStep.useMemo[serviceSections]": (service, index)=>{
                    var _service_service, _service_ai_intake_requirement_summary, _service_ai_intake;
                    const name = service.title || ((_service_service = service.service) === null || _service_service === void 0 ? void 0 : _service_service.name) || '';
                    const requirementSummary = (_service_ai_intake = service.ai_intake) === null || _service_ai_intake === void 0 ? void 0 : (_service_ai_intake_requirement_summary = _service_ai_intake.requirement_summary) === null || _service_ai_intake_requirement_summary === void 0 ? void 0 : _service_ai_intake_requirement_summary.trim();
                    const components = Object.assign({}, ...service.components || []);
                    const stage = components['deliverable-stage'];
                    const deliverables = (stage === null || stage === void 0 ? void 0 : stage.deliverables) || [];
                    const scopeGroups = (service.scopes || []).map({
                        "ProjectReviewStep.useMemo[serviceSections].scopeGroups": (scope)=>({
                                name: scope.scope,
                                subscopes: (scope.children || []).map({
                                    "ProjectReviewStep.useMemo[serviceSections].scopeGroups": (child)=>child.scope
                                }["ProjectReviewStep.useMemo[serviceSections].scopeGroups"])
                            })
                    }["ProjectReviewStep.useMemo[serviceSections].scopeGroups"]);
                    const select = {
                        "ProjectReviewStep.useMemo[serviceSections].select": ()=>{
                            var _service_service, _service_service1;
                            var _service_service_id;
                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceSessions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startServiceFlow"])(locale, {
                                mode: 'edit',
                                projectServiceUuid: service.uuid,
                                returnStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectReview
                            }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectServiceSessions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serviceSessionSeed"])(locale, {
                                serviceId: (_service_service_id = (_service_service = service.service) === null || _service_service === void 0 ? void 0 : _service_service.id) !== null && _service_service_id !== void 0 ? _service_service_id : null,
                                name,
                                isOther: ((_service_service1 = service.service) === null || _service_service1 === void 0 ? void 0 : _service_service1.slug) === 'other',
                                prompt: service.prompt_ai
                            }));
                        }
                    }["ProjectReviewStep.useMemo[serviceSections].select"];
                    const rows = [
                        ...requirementSummary ? [
                            {
                                label: isRTL ? 'ملخص المتطلبات' : 'Requirement Summary',
                                value: [
                                    requirementSummary
                                ],
                                variant: 'requirement-summary',
                                full: true
                            }
                        ] : service.prompt_ai ? [
                            {
                                label: isRTL ? 'وصف الخدمة' : 'Service description',
                                value: [
                                    service.prompt_ai
                                ],
                                full: true
                            }
                        ] : [],
                        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDefinitionMode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readDefinitionMode"])(locale) === 'advanced' ? [
                            {
                                label: isRTL ? 'النطاقات والنطاقات الفرعية' : 'Scopes and sub-scopes',
                                value: scopeGroups.length ? scopeGroups.map({
                                    "ProjectReviewStep.useMemo[serviceSections]": (group)=>group.name
                                }["ProjectReviewStep.useMemo[serviceSections]"]) : [
                                    isRTL ? 'سيحدده الخبير ضمن العرض' : 'To be proposed by the expert in their offer'
                                ],
                                variant: 'scope-table',
                                scopeGroups,
                                full: true,
                                editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectScope,
                                onEdit: select
                            }
                        ] : [
                            {
                                label: isRTL ? 'نطاق الخدمة' : 'Service scope',
                                value: [
                                    isRTL ? 'سيحدده الإنسايتر ضمن العرض' : 'To be proposed by the Insighter in their offer'
                                ],
                                full: true
                            }
                        ],
                        ...deliverables.length ? [
                            {
                                label: isRTL ? 'المخرجات' : 'Deliverables',
                                value: deliverables.map({
                                    "ProjectReviewStep.useMemo[serviceSections]": (item)=>item.title
                                }["ProjectReviewStep.useMemo[serviceSections]"]),
                                variant: 'deliverables-table',
                                deliverables,
                                full: true,
                                editStepId: 'deliverables-plan',
                                onEdit: select
                            }
                        ] : [],
                        ...(service.addons || []).length ? [
                            {
                                label: isRTL ? 'إضافات الخدمة' : 'Service add-ons',
                                value: (service.addons || []).flatMap({
                                    "ProjectReviewStep.useMemo[serviceSections]": (addon)=>Object.keys(addon)
                                }["ProjectReviewStep.useMemo[serviceSections]"]).map(humanizeSlug),
                                variant: 'chips'
                            }
                        ] : []
                    ];
                    return {
                        title: "".concat(isRTL ? 'الخدمة' : 'Service', " ").concat(index + 1, ": ").concat(name),
                        rows,
                        uuid: service.uuid
                    };
                }
            }["ProjectReviewStep.useMemo[serviceSections]"]);
        }
    }["ProjectReviewStep.useMemo[serviceSections]"], [
        isRTL,
        locale,
        review
    ]);
    const scopeRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ProjectReviewStep.useMemo[scopeRows]": ()=>{
            if (!review) return [];
            return [
                {
                    label: isRTL ? 'النطاق' : 'Scope',
                    variant: 'scope-table',
                    scopeGroups: review.scopeSnapshot.map({
                        "ProjectReviewStep.useMemo[scopeRows]": (scope)=>({
                                name: scope.name,
                                subscopes: scope.subscopes
                            })
                    }["ProjectReviewStep.useMemo[scopeRows]"]),
                    value: review.scopeSnapshot.flatMap({
                        "ProjectReviewStep.useMemo[scopeRows]": (scope)=>scope.subscopes.length > 0 ? scope.subscopes.map({
                                "ProjectReviewStep.useMemo[scopeRows]": (subscope)=>"".concat(scope.name, ": ").concat(subscope)
                            }["ProjectReviewStep.useMemo[scopeRows]"]) : [
                                scope.name
                            ]
                    }["ProjectReviewStep.useMemo[scopeRows]"]),
                    editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectSubscopes,
                    wide: true
                },
                ...review.servicePrompt ? [
                    {
                        label: isRTL ? 'ملاحظة الخدمة' : 'Service note',
                        value: [
                            review.servicePrompt
                        ],
                        editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].service
                    }
                ] : []
            ];
        }
    }["ProjectReviewStep.useMemo[scopeRows]"], [
        isRTL,
        review
    ]);
    const contextRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ProjectReviewStep.useMemo[contextRows]": ()=>{
            if (!review) return [];
            return [
                {
                    label: isRTL ? 'الوصف الإضافي' : 'Additional description',
                    value: review.description ? [
                        review.description
                    ] : [],
                    editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectDescription,
                    wide: true
                },
                {
                    label: isRTL ? 'الملفات المرفقة' : 'Attachments',
                    value: review.descriptionFiles.map({
                        "ProjectReviewStep.useMemo[contextRows]": (file)=>"".concat(file.name, " (").concat(formatBytes(file.size), ")")
                    }["ProjectReviewStep.useMemo[contextRows]"]),
                    editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].projectDescription
                }
            ];
        }
    }["ProjectReviewStep.useMemo[contextRows]"], [
        isRTL,
        review
    ]);
    const preferenceRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ProjectReviewStep.useMemo[preferenceRows]": ()=>{
            if (!review) return [];
            return [
                ...review.hasTargetMarket ? [
                    {
                        label: isRTL ? 'السوق المستهدف' : 'Target market',
                        value: review.targetMarket,
                        variant: 'chips',
                        editStepId: 'target-market'
                    }
                ] : [],
                ...isSpecifiedInsighter ? [] : [
                    {
                        label: isRTL ? 'نوع الخبير المفضل' : 'Preferred insighter type',
                        value: [
                            review.preferredInsighterType
                        ],
                        editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].preferredInsighterType
                    },
                    {
                        label: isRTL ? 'الأصل المفضل' : 'Preferred origin',
                        value: [
                            review.origin
                        ],
                        // "Any" insighter type is always worldwide.
                        editStepId: review.anyInsighterType ? undefined : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].insighterOrigin
                    },
                    {
                        label: isRTL ? 'سنوات الخبرة' : 'Experience range',
                        value: review.experienceRange === emptyText ? [] : [
                            review.experienceRange
                        ],
                        editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].insighterExperience
                    },
                    {
                        label: isRTL ? 'حجم فريق الشركة' : 'Company team size',
                        value: review.teamSizeRange === emptyText ? [] : [
                            review.teamSizeRange
                        ],
                        editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].companyTeamSize
                    }
                ],
                {
                    label: isRTL ? 'اجتماع الانطلاقة' : 'Kickoff meeting',
                    value: [
                        review.kickoffMeeting ? isRTL ? 'مطلوب' : 'Requested' : isRTL ? 'غير مطلوب' : 'Not requested'
                    ],
                    editStepId: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectWizardFlow$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStepIds"].kickoffMeeting
                }
            ];
        }
    }["ProjectReviewStep.useMemo[preferenceRows]"], [
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
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectPropertiesSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["syncProjectProperties"])(locale);
            router.push(nav.nextHref || "/".concat(locale, "/project"));
        } catch (err) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر حفظ التعديلات قبل المتابعة.' : 'Failed to save edits before continuing.'));
        } finally{
            setSubmitting(false);
        }
    };
    if (!review) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-6xl mx-auto min-h-full flex flex-col",
            dir: isRTL ? 'rtl' : 'ltr',
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-auto rounded-md px-4 py-8 sm:px-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-[980px] rounded-[32px] border border-slate-200 bg-white px-8 py-16",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center text-base text-slate-600",
                        children: isRTL ? 'جاري إعداد ملخص المشروع...' : 'Preparing project summary...'
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                        lineNumber: 1411,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                    lineNumber: 1410,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                lineNumber: 1409,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
            lineNumber: 1408,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-6xl mx-auto min-h-full flex flex-col",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-auto rounded-md px-4 pb-32 pt-8 sm:px-6 sm:pb-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-[980px] overflow-hidden rounded-[36px] border border-slate-200 bg-white",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-start justify-between gap-6 border-b border-slate-200 pb-8",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0 flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex h-20 w-20 items-center justify-center rounded-[20px]",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        src: "https://res.cloudinary.com/dsiku9ipv/image/upload/v1777619443/smallLogo_3_wnmkra.png",
                                                        alt: "Foresighta",
                                                        width: 34,
                                                        height: 34,
                                                        className: "h-auto w-auto"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                        lineNumber: 1432,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                    lineNumber: 1431,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "min-w-0",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                        className: "mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl",
                                                        children: review.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                        lineNumber: 1442,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                    lineNumber: 1441,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                            lineNumber: 1430,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-5 flex flex-wrap gap-2.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700",
                                                    children: review.projectType
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                    lineNumber: 1449,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700",
                                                    children: review.service
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                    lineNumber: 1452,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700",
                                                    children: review.deliverablesLanguage
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                                    lineNumber: 1455,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                            lineNumber: 1448,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                    lineNumber: 1429,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                lineNumber: 1428,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-8 space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionBlock, {
                                        title: isRTL ? 'نظرة عامة' : 'Overview',
                                        rows: overviewRows,
                                        emptyText: emptyText,
                                        toneIndex: 0,
                                        isRTL: isRTL,
                                        editLabel: editLabel,
                                        editHrefFor: nav.editHrefFor
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 1463,
                                        columnNumber: 15
                                    }, this),
                                    serviceSections.length ? serviceSections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionBlock, {
                                            locale: locale,
                                            plannedStartDate: review.plannedStartDate,
                                            title: section.title,
                                            rows: section.rows,
                                            emptyText: emptyText,
                                            toneIndex: 1,
                                            isRTL: isRTL,
                                            editLabel: editLabel,
                                            editHrefFor: nav.editHrefFor
                                        }, section.uuid, false, {
                                            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                            lineNumber: 1474,
                                            columnNumber: 17
                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionBlock, {
                                        title: isRTL ? 'النطاق والمخرجات' : 'Scope and deliverables',
                                        rows: scopeRows,
                                        emptyText: emptyText,
                                        toneIndex: 1,
                                        isRTL: isRTL,
                                        editLabel: editLabel,
                                        editHrefFor: nav.editHrefFor
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 1478,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionBlock, {
                                        title: isSpecifiedInsighter ? isRTL ? 'تفضيلات المشروع' : 'Project preferences' : isRTL ? 'السوق وتفضيلات الخبير' : 'Market and expert preferences',
                                        rows: preferenceRows,
                                        emptyText: emptyText,
                                        toneIndex: 2,
                                        isRTL: isRTL,
                                        editLabel: editLabel,
                                        editHrefFor: nav.editHrefFor
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 1483,
                                        columnNumber: 15
                                    }, this),
                                    review.serviceComponentSections.filter((section)=>!serviceSections.length || section.title !== getComponentTitle(locale, 'deliverable-stage')).map((section, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionBlock, {
                                            title: section.title,
                                            rows: section.rows,
                                            emptyText: emptyText,
                                            toneIndex: index + 3,
                                            isRTL: isRTL,
                                            editLabel: editLabel,
                                            editHrefFor: nav.editHrefFor
                                        }, section.title, false, {
                                            fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                            lineNumber: 1502,
                                            columnNumber: 17
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionBlock, {
                                        title: isRTL ? 'تفاصيل إضافية' : 'Additional details',
                                        rows: contextRows,
                                        emptyText: emptyText,
                                        toneIndex: review.serviceComponentSections.length + 3,
                                        isRTL: isRTL,
                                        editLabel: editLabel,
                                        editHrefFor: nav.editHrefFor
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                        lineNumber: 1514,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                lineNumber: 1462,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                        lineNumber: 1427,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                    lineNumber: 1426,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                lineNumber: 1425,
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
                                href: nav.backHref,
                                className: "btn-sm rounded-full border border-slate-200 bg-white px-6 py-2 text-slate-700 hover:bg-slate-50",
                                children: isRTL ? 'رجوع' : 'Back'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                lineNumber: 1531,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>void onContinue(),
                                disabled: submitting,
                                className: "btn-sm rounded-full px-6 py-2 ".concat(submitting ? 'cursor-not-allowed bg-slate-200 text-slate-500' : 'bg-[#1C7CBB] text-white hover:bg-opacity-90'),
                                children: submitting ? isRTL ? 'جاري الحفظ...' : 'Saving...' : reviewContinueLabel
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                                lineNumber: 1538,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                        lineNumber: 1530,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                    lineNumber: 1529,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
                lineNumber: 1528,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/ProjectReviewStep.tsx",
        lineNumber: 1421,
        columnNumber: 5
    }, this);
}
_s(ProjectReviewStep, "YFuOY98e+oKxPACAqLjctDm8GpQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"]
    ];
});
_c1 = ProjectReviewStep;
var _c, _c1;
__turbopack_context__.k.register(_c, "SectionBlock");
__turbopack_context__.k.register(_c1, "ProjectReviewStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_project_questions_ProjectReviewStep_tsx_7d90f739._.js.map