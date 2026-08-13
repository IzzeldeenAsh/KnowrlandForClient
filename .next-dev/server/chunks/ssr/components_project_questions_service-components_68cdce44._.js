module.exports = [
"[project]/components/project/questions/service-components/deliverableReportTypes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getReportTypeOptions",
    ()=>getReportTypeOptions,
    "normalizeReportTypes",
    ()=>normalizeReportTypes
]);
const ALLOWED_REPORT_TYPES = [
    'pdf',
    'docx',
    'xlsx',
    'pptx'
];
const REPORT_TYPE_ICONS = {
    pdf: 'https://res.cloudinary.com/dsiku9ipv/image/upload/v1781525110/pdf_136522_urotaw.png',
    docx: 'https://res.cloudinary.com/dsiku9ipv/image/upload/v1781104177/Microsoft_Office_Word__2025_present_1_sywxfd.png',
    xlsx: 'https://res.cloudinary.com/dsiku9ipv/image/upload/v1781104176/Microsoft_Office_Excel__2025_present_1_scjtip.png',
    pptx: 'https://res.cloudinary.com/dsiku9ipv/image/upload/v1781104175/Microsoft_Office_PowerPoint__2025_present_1_ofrkfx.png'
};
function getReportTypeOptions(_locale) {
    const isRTL = _locale === 'ar';
    return [
        {
            value: 'pdf',
            label: isRTL ? 'ملف PDF' : 'PDF Report',
            iconSrc: REPORT_TYPE_ICONS.pdf
        },
        {
            value: 'docx',
            label: isRTL ? 'مستند Word' : 'Word Document',
            iconSrc: REPORT_TYPE_ICONS.docx
        },
        {
            value: 'xlsx',
            label: isRTL ? 'جدول Excel' : 'Excel Sheet',
            iconSrc: REPORT_TYPE_ICONS.xlsx
        },
        {
            value: 'pptx',
            label: isRTL ? 'عرض Power Point' : 'Power Point',
            iconSrc: REPORT_TYPE_ICONS.pptx
        }
    ];
}
function normalizeReportTypes(value) {
    const allowed = new Set(ALLOWED_REPORT_TYPES);
    const sanitize = (items)=>items.map((item)=>String(item || '').trim().toLowerCase()).filter((item)=>Boolean(item) && allowed.has(item)).filter((item, index, arr)=>arr.indexOf(item) === index);
    if (Array.isArray(value)) return sanitize(value);
    if (typeof value === 'string') {
        const trimmed = value.trim();
        if (!trimmed) return [];
        try {
            const parsed = JSON.parse(trimmed);
            if (Array.isArray(parsed)) return sanitize(parsed);
            if (typeof parsed === 'string') return sanitize([
                parsed
            ]);
        } catch  {
            return sanitize([
                trimmed
            ]);
        }
    }
    return [];
}
}),
"[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DeliverableStageQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCloudUpload$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCloudUpload$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCloudUpload.mjs [app-ssr] (ecmascript) <export default as IconCloudUpload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDeviceDesktopUp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDeviceDesktopUp$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconDeviceDesktopUp.mjs [app-ssr] (ecmascript) <export default as IconDeviceDesktopUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileTextFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileTextFilled$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconFileTextFilled.mjs [app-ssr] (ecmascript) <export default as IconFileTextFilled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconMapPinFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconMapPinFilled$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconMapPinFilled.mjs [app-ssr] (ecmascript) <export default as IconMapPinFilled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$InlineDateCalendar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/InlineDateCalendar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/ProjectSelectedTypeHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsPayload.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsSync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsSync.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectStepErrorToast.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectWizardNavigation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$UrgentDateNotice$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/UrgentDateNotice.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$service$2d$components$2f$deliverableReportTypes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/service-components/deliverableReportTypes.ts [app-ssr] (ecmascript)");
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
function toLocalIsoDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
function todayIsoDate() {
    try {
        return toLocalIsoDate(new Date());
    } catch  {
        return '';
    }
}
function addDaysIsoDate(days) {
    try {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return toLocalIsoDate(date);
    } catch  {
        return '';
    }
}
function addDaysToIsoDate(value, days) {
    if (!value) return '';
    const [year, month, day] = value.split('-').map((part)=>Number(part));
    if (!year || !month || !day) return '';
    try {
        const date = new Date(year, month - 1, day);
        date.setDate(date.getDate() + days);
        return toLocalIsoDate(date);
    } catch  {
        return '';
    }
}
function formatIsoDateLabel(value, locale) {
    if (!value) return '';
    const [year, month, day] = value.split('-').map((part)=>Number(part));
    if (!year || !month || !day) return value;
    try {
        return new Intl.DateTimeFormat(locale === 'ar' ? 'ar' : 'en', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(year, month - 1, day));
    } catch  {
        return value;
    }
}
function normalizeProjectType(value) {
    if (!value) return null;
    if (value === 'urgent' || value === 'urgent_request') return 'urgent_request';
    return value;
}
function isUrgentProjectType(value) {
    return normalizeProjectType(value) === 'urgent_request';
}
function defaultDraft(date = addDaysIsoDate(1)) {
    return {
        date,
        reportTypes: [
            'pdf'
        ],
        deliverableWay: 'on_platform',
        physicalWorkshopAddress: ''
    };
}
function defaultDrafts(projectType = null) {
    const firstDraftDate = addDaysIsoDate(1);
    const finalVersionDate = isUrgentProjectType(projectType) ? firstDraftDate : addDaysToIsoDate(firstDraftDate, 7);
    return {
        first_draft: defaultDraft(firstDraftDate),
        final_version: defaultDraft(finalVersionDate)
    };
}
function draftToPayload(draft) {
    return {
        date: draft.date,
        report_type: draft.reportTypes,
        way: {
            on_platform: {
                selected: draft.deliverableWay === 'on_platform' ? 1 : 0
            },
            session: {
                selected: draft.deliverableWay === 'session' ? 1 : 0
            },
            physical_workshop: {
                selected: draft.deliverableWay === 'physical_workshop' ? 1 : 0,
                address: draft.deliverableWay === 'physical_workshop' ? draft.physicalWorkshopAddress : ''
            }
        }
    };
}
function getLegacyWay(value) {
    if (Number(value?.type?.physical_workshop?.selected ?? 0) > 0) {
        return 'physical_workshop';
    }
    if (Number(value?.type?.session?.selected ?? 0) > 0) {
        return 'session';
    }
    if (Number(value?.type?.online_workshop?.selected ?? 0) > 0) {
        return 'session';
    }
    return 'on_platform';
}
function payloadToDraft(value, fallback) {
    if (!value) return fallback;
    const isNewShape = Array.isArray(value.report_type);
    if (isNewShape) {
        const nextValue = value;
        const way = Number(nextValue.way?.physical_workshop?.selected ?? 0) > 0 ? 'physical_workshop' : Number(nextValue.way?.session?.selected ?? 0) > 0 ? 'session' : 'on_platform';
        return {
            ...fallback,
            date: nextValue.date || fallback.date,
            reportTypes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$service$2d$components$2f$deliverableReportTypes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeReportTypes"])(nextValue.report_type),
            deliverableWay: way,
            physicalWorkshopAddress: nextValue.way?.physical_workshop?.address || ''
        };
    }
    const legacyValue = value;
    return {
        ...fallback,
        date: legacyValue.date || fallback.date,
        reportTypes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$service$2d$components$2f$deliverableReportTypes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeReportTypes"])(legacyValue.type?.report?.type),
        deliverableWay: getLegacyWay(legacyValue),
        physicalWorkshopAddress: legacyValue.type?.physical_workshop?.address || ''
    };
}
function isFutureDate(date) {
    return Boolean(date) && date > todayIsoDate();
}
function isAfterDate(date, previousDate) {
    return Boolean(date) && Boolean(previousDate) && date > previousDate;
}
function isSameOrAfterDate(date, previousDate) {
    return Boolean(date) && Boolean(previousDate) && date >= previousDate;
}
function isStepValid(params) {
    const { stepKind, stage, drafts, isUrgentProject } = params;
    const draft = drafts[stage];
    if (stepKind === 'date') {
        if (isUrgentProject && draft.date > addDaysIsoDate(1)) return false;
        if (stage === 'first_draft') return isFutureDate(draft.date);
        return isFutureDate(draft.date) && (isUrgentProject ? isSameOrAfterDate(draft.date, drafts.first_draft.date) : isAfterDate(draft.date, drafts.first_draft.date));
    }
    if (stepKind === 'report_type') return draft.reportTypes.length > 0;
    if (draft.deliverableWay !== 'physical_workshop') return true;
    return Boolean(draft.physicalWorkshopAddress.trim());
}
function getDateValidationMessage(params) {
    const { isRTL, stage, drafts, isUrgentProject } = params;
    const draft = drafts[stage];
    if (isUrgentProject && draft.date > addDaysIsoDate(1)) {
        return isRTL ? 'يجب أن يكون تاريخ تسليم الطلب العاجل خلال 24 ساعة.' : 'Urgent request delivery date must be within 24 hours.';
    }
    if (stage === 'first_draft') {
        if (isFutureDate(draft.date)) return null;
        return isRTL ? 'اختر تاريخاً مستقبلياً للمسودة الأولى.' : 'Choose a future date for the first draft.';
    }
    if (!isFutureDate(draft.date)) {
        return isRTL ? 'اختر تاريخاً مستقبلياً للنسخة النهائية.' : 'Choose a future date for the final version.';
    }
    const hasValidSequence = isUrgentProject ? isSameOrAfterDate(draft.date, drafts.first_draft.date) : isAfterDate(draft.date, drafts.first_draft.date);
    if (!hasValidSequence) {
        return isRTL ? isUrgentProject ? 'يجب أن يكون تاريخ النسخة النهائية في نفس يوم المسودة الأولى أو بعده.' : 'يجب أن يكون تاريخ النسخة النهائية بعد تاريخ المسودة الأولى.' : isUrgentProject ? 'Final version date must be the same day as the first draft or after it.' : 'Final version date must be after the first draft date.';
    }
    return null;
}
const REPORT_TYPE_ICON_SRC = {
    pdf: 'https://res.cloudinary.com/dsiku9ipv/image/upload/v1781525110/pdf_136522_urotaw.png',
    docx: 'https://res.cloudinary.com/dsiku9ipv/image/upload/v1781104177/Microsoft_Office_Word__2025_present_1_sywxfd.png',
    xlsx: 'https://res.cloudinary.com/dsiku9ipv/image/upload/v1781104176/Microsoft_Office_Excel__2025_present_1_scjtip.png',
    pptx: 'https://res.cloudinary.com/dsiku9ipv/image/upload/v1781104175/Microsoft_Office_PowerPoint__2025_present_1_ofrkfx.png'
};
function ReportTypeIcon({ value }) {
    const src = REPORT_TYPE_ICON_SRC[value];
    if (src) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: src,
            alt: "",
            className: "h-11 w-11 shrink-0 object-contain"
        }, void 0, false, {
            fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
            lineNumber: 327,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileTextFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileTextFilled$3e$__["IconFileTextFilled"], {
        className: "h-10 w-10 shrink-0"
    }, void 0, false, {
        fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
        lineNumber: 330,
        columnNumber: 10
    }, this);
}
function getStepCopy(params) {
    const { isRTL, stage, stepKind } = params;
    const stageLabel = isRTL ? stage === 'first_draft' ? 'المسودة الأولى' : 'النسخة النهائية' : stage === 'first_draft' ? 'first draft' : 'final version';
    if (stepKind === 'date') {
        return {
            title: isRTL ? `تاريخ ${stageLabel}` : `${stage === 'first_draft' ? 'First draft' : 'Final version'} date`,
            subtitle: isRTL ? stage === 'first_draft' ? 'حدد الموعد الذي تريد فيه استلام المسودة الأولى للمراجعة.' : 'حدد الموعد النهائي لتسليم النسخة المعتمدة بعد الملاحظات.' : stage === 'first_draft' ? 'Choose when the first draft should be ready for review.' : 'Choose when the final version should be delivered after revisions.'
        };
    }
    if (stepKind === 'report_type') {
        return {
            title: isRTL ? `نوع التقرير المطلوب (${stageLabel})` : `Type of report wanted (${stageLabel})`,
            subtitle: isRTL ? stage === 'first_draft' ? 'اختر صيغ الملفات التي تريد استخدامها لمراجعة المسودة الأولى.' : 'اختر صيغ الملفات المطلوبة للتسليم النهائي.' : stage === 'first_draft' ? 'Select the file formats you want to use for reviewing the first draft.' : 'Select the file formats required for the final handoff.'
        };
    }
    return {
        title: isRTL ? `طريقة تسليم ${stageLabel}` : `Deliverable way (${stageLabel})`,
        subtitle: isRTL ? stage === 'first_draft' ? 'اختر كيف تريد مشاركة المسودة الأولى ومناقشتها.' : 'اختر طريقة تسليم النسخة النهائية.' : stage === 'first_draft' ? 'Choose how the first draft should be shared and discussed.' : 'Choose how the final version should be delivered.'
    };
}
function DeliverableStageQuestion({ locale, stage, stepKind }) {
    const isRTL = locale === 'ar';
    const isEnglish = typeof locale === 'string' && locale.toLowerCase().startsWith('en');
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const copy = getStepCopy({
        isRTL,
        stage,
        stepKind
    });
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [projectType, setProjectType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [drafts, setDrafts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>defaultDrafts());
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"])(error, locale);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = window.setTimeout(()=>setEntered(true), 30);
        return ()=>window.clearTimeout(timer);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            const storedProjectType = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale));
            setProjectType(storedProjectType);
            const isUrgentProject = isUrgentProjectType(storedProjectType);
            const saved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readServiceComponentPayloadValue"])(locale, 'deliverable-stage');
            setDrafts((prev)=>{
                const firstDraft = payloadToDraft(saved?.first_draft, prev.first_draft);
                const fallbackFinalDraft = defaultDraft(isUrgentProject ? firstDraft.date : addDaysToIsoDate(firstDraft.date, 7));
                return {
                    first_draft: firstDraft,
                    final_version: payloadToDraft(saved?.final_version, fallbackFinalDraft)
                };
            });
        } catch  {
        // ignore
        }
    }, [
        locale
    ]);
    const currentDraft = drafts[stage];
    const isUrgentProject = isUrgentProjectType(projectType);
    const canContinue = isStepValid({
        stepKind,
        stage,
        drafts,
        isUrgentProject
    }) && !submitting;
    const dateValidationMessage = stepKind === 'date' ? getDateValidationMessage({
        isRTL,
        stage,
        drafts,
        isUrgentProject
    }) : null;
    const reportTypeOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$service$2d$components$2f$deliverableReportTypes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getReportTypeOptions"])(locale), [
        locale
    ]);
    const finalVersionMinDate = isUrgentProject ? drafts.first_draft.date || addDaysIsoDate(1) : addDaysToIsoDate(drafts.first_draft.date, 1) || addDaysIsoDate(1);
    const showFinalVersionDateHelper = stepKind === 'date' && stage === 'final_version';
    const updateCurrentDraft = (next)=>{
        setDrafts((prev)=>{
            if (stage !== 'first_draft') return {
                ...prev,
                [stage]: next
            };
            const nextFinalDate = !prev.final_version.date || prev.final_version.date <= next.date ? isUrgentProject ? next.date : addDaysToIsoDate(next.date, 7) : prev.final_version.date;
            return {
                ...prev,
                first_draft: next,
                final_version: {
                    ...prev.final_version,
                    date: nextFinalDate
                }
            };
        });
    };
    const persistPayload = (nextDrafts)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateServiceComponentPayload"])(locale, 'deliverable-stage', {
            first_draft: draftToPayload(nextDrafts.first_draft),
            final_version: draftToPayload(nextDrafts.final_version)
        });
    };
    const onContinue = async ()=>{
        if (!canContinue) return;
        setError(null);
        persistPayload(drafts);
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
    const selectWay = (deliverableWay)=>{
        updateCurrentDraft({
            ...currentDraft,
            deliverableWay,
            physicalWorkshopAddress: deliverableWay === 'physical_workshop' ? currentDraft.physicalWorkshopAddress : ''
        });
    };
    const optionCardClass = (selected)=>`rounded-[10px] border px-4 py-3 transition-colors ${selected ? 'border-blue-300 bg-blue-50/80 shadow-sm' : 'border-white/35 bg-white/65 hover:bg-white/80'}`;
    const iconBadgeBase = 'inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full ring-1';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-5xl mx-auto",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                locale: locale,
                entered: entered,
                projectTypeId: projectType
            }, void 0, false, {
                fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                lineNumber: 538,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mt-2 text-start transition-all duration-700 ${entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'}`,
                children: [
                    isEnglish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                        children: `
            #deliverable-stage-question-title {
              font-family: "IBM Plex Serif", serif !important;
            }
          `
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                        lineNumber: 553,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "deliverable-stage-question-title",
                        className: "text-2xl sm:text-3xl font-medium tracking-tight text-slate-900",
                        children: copy.title
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                        lineNumber: 559,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm sm:text-base font-semibold text-slate-600",
                        children: copy.subtitle
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                        lineNumber: 565,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                lineNumber: 544,
                columnNumber: 7
            }, this),
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 text-sm font-semibold text-rose-700",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                lineNumber: 571,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mt-6 rounded-[10px] p-5  sm:p-6 ${stepKind === 'report_type' ? 'pb-32 sm:pb-6' : ''}`,
                children: [
                    stepKind === 'date' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-sm",
                        children: [
                            showFinalVersionDateHelper ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-3 rounded-[10px] border border-amber-200 bg-amber-50/90 px-3 py-2 text-start text-xs font-semibold leading-relaxed text-amber-900",
                                children: isRTL ? isUrgentProject ? `يمكن أن تكون النسخة النهائية في نفس يوم المسودة الأولى أو بعده: ${formatIsoDateLabel(drafts.first_draft.date, locale)}.` : `يجب أن تكون النسخة النهائية بعد تاريخ المسودة الأولى: ${formatIsoDateLabel(drafts.first_draft.date, locale)}.` : isUrgentProject ? `Final version can be the same day as the first draft or after it: ${formatIsoDateLabel(drafts.first_draft.date, locale)}.` : `Final version must be after the first draft date: ${formatIsoDateLabel(drafts.first_draft.date, locale)}.`
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                lineNumber: 582,
                                columnNumber: 15
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$InlineDateCalendar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                value: currentDraft.date,
                                min: stage === 'first_draft' ? addDaysIsoDate(1) : finalVersionMinDate,
                                max: isUrgentProject ? addDaysIsoDate(1) : undefined,
                                onChange: (date)=>updateCurrentDraft({
                                        ...currentDraft,
                                        date
                                    }),
                                locale: locale,
                                label: isRTL ? 'تاريخ التسليم' : 'Delivery date'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                lineNumber: 592,
                                columnNumber: 13
                            }, this),
                            isUrgentProject ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$UrgentDateNotice$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                locale: locale
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                lineNumber: 606,
                                columnNumber: 32
                            }, this) : null,
                            dateValidationMessage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs font-semibold text-rose-600",
                                children: dateValidationMessage
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                lineNumber: 608,
                                columnNumber: 15
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                        lineNumber: 580,
                        columnNumber: 11
                    }, this) : null,
                    stepKind === 'report_type' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                        children: reportTypeOptions.map((reportType)=>{
                            const checked = currentDraft.reportTypes.includes(reportType.value);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-pressed": checked,
                                onClick: ()=>updateCurrentDraft({
                                        ...currentDraft,
                                        reportTypes: checked ? currentDraft.reportTypes.filter((item)=>item !== reportType.value) : [
                                            ...currentDraft.reportTypes,
                                            reportType.value
                                        ]
                                    }),
                                className: `flex min-h-[88px] items-center gap-3 rounded-[10px] border px-4 py-3 text-start transition-colors ${checked ? 'border-blue-300 bg-blue-50/80 text-blue-800 shadow-sm' : 'border-slate-200 bg-white/80 text-slate-700 hover:bg-white'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: checked,
                                        readOnly: true,
                                        tabIndex: -1,
                                        className: "h-5 w-5 shrink-0 rounded border-slate-300 text-[#1C7CBB] accent-[#1C7CBB]",
                                        "aria-hidden": "true"
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                        lineNumber: 637,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ReportTypeIcon, {
                                        value: reportType.value
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                        lineNumber: 645,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-bold text-slate-900",
                                        children: reportType.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                        lineNumber: 646,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, reportType.value, true, {
                                fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                lineNumber: 620,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                        lineNumber: 616,
                        columnNumber: 11
                    }, this) : null,
                    stepKind === 'way' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: optionCardClass(currentDraft.deliverableWay === 'on_platform'),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>selectWay('on_platform'),
                                    className: "flex w-full items-center justify-start gap-3 text-start",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `${iconBadgeBase} bg-sky-50 ring-sky-200/60 text-sky-700`,
                                            "aria-hidden": "true",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCloudUpload$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCloudUpload$3e$__["IconCloudUpload"], {
                                                className: "h-6 w-6",
                                                stroke: 2.2
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                                lineNumber: 667,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                            lineNumber: 663,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${currentDraft.deliverableWay === 'on_platform' ? 'border-blue-600' : 'border-slate-300'} bg-white/80`,
                                            "aria-hidden": "true",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `h-2.5 w-2.5 rounded-full ${currentDraft.deliverableWay === 'on_platform' ? 'bg-blue-600' : 'bg-transparent'}`
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                                lineNumber: 676,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                            lineNumber: 669,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "block text-sm font-semibold text-slate-900",
                                                    children: isRTL ? 'على المنصة' : 'On Platform'
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                                    lineNumber: 684,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "block text-xs font-medium text-slate-500",
                                                    children: isRTL ? 'يتم رفع الملفات ومشاركتها داخل المنصة.' : 'Files are uploaded and shared inside the platform.'
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                                    lineNumber: 687,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                            lineNumber: 683,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                    lineNumber: 658,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                lineNumber: 657,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: optionCardClass(currentDraft.deliverableWay === 'session'),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>selectWay('session'),
                                    className: "flex w-full items-center justify-start gap-3 text-start",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `${iconBadgeBase} bg-violet-50 ring-violet-200/60 text-violet-700`,
                                            "aria-hidden": "true",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDeviceDesktopUp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDeviceDesktopUp$3e$__["IconDeviceDesktopUp"], {
                                                className: "h-6 w-6",
                                                stroke: 2.2
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                                lineNumber: 706,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                            lineNumber: 702,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${currentDraft.deliverableWay === 'session' ? 'border-blue-600' : 'border-slate-300'} bg-white/80`,
                                            "aria-hidden": "true",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `h-2.5 w-2.5 rounded-full ${currentDraft.deliverableWay === 'session' ? 'bg-blue-600' : 'bg-transparent'}`
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                                lineNumber: 715,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                            lineNumber: 708,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "block text-sm font-semibold text-slate-900",
                                                    children: isRTL ? 'جلسة' : 'Session'
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                                    lineNumber: 723,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "block text-xs font-medium text-slate-500",
                                                    children: isRTL ? 'تتم مراجعة المخرجات وتسليمها ضمن جلسة.' : 'Deliverables are reviewed and handed over in a session.'
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                                    lineNumber: 726,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                            lineNumber: 722,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                    lineNumber: 697,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                lineNumber: 696,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: optionCardClass(currentDraft.deliverableWay === 'physical_workshop'),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>selectWay('physical_workshop'),
                                            className: "flex w-full items-center justify-start gap-3 text-start",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `${iconBadgeBase} bg-amber-50 ring-amber-200/70 text-amber-800`,
                                                    "aria-hidden": "true",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconMapPinFilled$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconMapPinFilled$3e$__["IconMapPinFilled"], {
                                                        className: "h-6 w-6"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                                        lineNumber: 746,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                                    lineNumber: 742,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${currentDraft.deliverableWay === 'physical_workshop' ? 'border-blue-600' : 'border-slate-300'} bg-white/80`,
                                                    "aria-hidden": "true",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `h-2.5 w-2.5 rounded-full ${currentDraft.deliverableWay === 'physical_workshop' ? 'bg-blue-600' : 'bg-transparent'}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                                        lineNumber: 755,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                                    lineNumber: 748,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "block text-sm font-semibold text-slate-900",
                                                            children: isRTL ? 'ورشة عمل حضورية' : 'Physical workshop'
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                                            lineNumber: 763,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "block text-xs font-medium text-slate-500",
                                                            children: isRTL ? 'يتم التسليم والمناقشة في موقع محدد.' : 'Delivery and discussion happen at a specific location.'
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                                            lineNumber: 766,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                                    lineNumber: 762,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                            lineNumber: 737,
                                            columnNumber: 17
                                        }, this),
                                        currentDraft.deliverableWay === 'physical_workshop' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs font-bold uppercase tracking-wide text-slate-600 text-start",
                                                    children: isRTL ? 'العنوان' : 'Address'
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                                    lineNumber: 776,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    value: currentDraft.physicalWorkshopAddress,
                                                    onChange: (e)=>updateCurrentDraft({
                                                            ...currentDraft,
                                                            physicalWorkshopAddress: e.target.value
                                                        }),
                                                    placeholder: isRTL ? 'مثال: عمّان' : 'e.g. Amman',
                                                    className: "mt-2 w-full rounded-[10px] border border-slate-200 bg-white/85 px-4 py-3 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 text-start"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                                    lineNumber: 779,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                            lineNumber: 775,
                                            columnNumber: 19
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                    lineNumber: 736,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                lineNumber: 735,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                        lineNumber: 656,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                lineNumber: 574,
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
                                fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                lineNumber: 801,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onContinue,
                                disabled: !canContinue,
                                className: `btn-sm px-6 py-2 rounded-full ${canContinue ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90' : 'text-slate-500 bg-slate-200 cursor-not-allowed'}`,
                                children: submitting ? isRTL ? 'جاري الحفظ…' : 'Saving…' : nav.continueLabel
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                                lineNumber: 808,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                        lineNumber: 800,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                    lineNumber: 799,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
                lineNumber: 798,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx",
        lineNumber: 537,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/questions/service-components/DeliverableFirstDraftDateQuestion.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DeliverableFirstDraftDateQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$service$2d$components$2f$DeliverableStageQuestion$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx [app-ssr] (ecmascript)");
'use client';
;
;
function DeliverableFirstDraftDateQuestion({ locale }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$service$2d$components$2f$DeliverableStageQuestion$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        locale: locale,
        stage: "first_draft",
        stepKind: "date"
    }, void 0, false, {
        fileName: "[project]/components/project/questions/service-components/DeliverableFirstDraftDateQuestion.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/questions/service-components/DeliverableFirstDraftTypeQuestion.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DeliverableFirstDraftTypeQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$service$2d$components$2f$DeliverableStageQuestion$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx [app-ssr] (ecmascript)");
'use client';
;
;
function DeliverableFirstDraftTypeQuestion({ locale }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$service$2d$components$2f$DeliverableStageQuestion$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        locale: locale,
        stage: "first_draft",
        stepKind: "report_type"
    }, void 0, false, {
        fileName: "[project]/components/project/questions/service-components/DeliverableFirstDraftTypeQuestion.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/questions/service-components/DeliverableFirstDraftWayQuestion.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DeliverableFirstDraftWayQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$service$2d$components$2f$DeliverableStageQuestion$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx [app-ssr] (ecmascript)");
'use client';
;
;
function DeliverableFirstDraftWayQuestion({ locale }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$service$2d$components$2f$DeliverableStageQuestion$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        locale: locale,
        stage: "first_draft",
        stepKind: "way"
    }, void 0, false, {
        fileName: "[project]/components/project/questions/service-components/DeliverableFirstDraftWayQuestion.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/questions/service-components/DeliverableFinalVersionDateQuestion.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DeliverableFinalVersionDateQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$service$2d$components$2f$DeliverableStageQuestion$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx [app-ssr] (ecmascript)");
'use client';
;
;
function DeliverableFinalVersionDateQuestion({ locale }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$service$2d$components$2f$DeliverableStageQuestion$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        locale: locale,
        stage: "final_version",
        stepKind: "date"
    }, void 0, false, {
        fileName: "[project]/components/project/questions/service-components/DeliverableFinalVersionDateQuestion.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/questions/service-components/DeliverableFinalVersionTypeQuestion.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DeliverableFinalVersionTypeQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$service$2d$components$2f$DeliverableStageQuestion$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx [app-ssr] (ecmascript)");
'use client';
;
;
function DeliverableFinalVersionTypeQuestion({ locale }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$service$2d$components$2f$DeliverableStageQuestion$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        locale: locale,
        stage: "final_version",
        stepKind: "report_type"
    }, void 0, false, {
        fileName: "[project]/components/project/questions/service-components/DeliverableFinalVersionTypeQuestion.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/questions/service-components/DeliverableFinalVersionWayQuestion.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DeliverableFinalVersionWayQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$service$2d$components$2f$DeliverableStageQuestion$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/service-components/DeliverableStageQuestion.tsx [app-ssr] (ecmascript)");
'use client';
;
;
function DeliverableFinalVersionWayQuestion({ locale }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$service$2d$components$2f$DeliverableStageQuestion$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        locale: locale,
        stage: "final_version",
        stepKind: "way"
    }, void 0, false, {
        fileName: "[project]/components/project/questions/service-components/DeliverableFinalVersionWayQuestion.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DataSourcesExpectedQuestion
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
function DataSourcesExpectedQuestion({ locale }) {
    const isRTL = locale === 'ar';
    const isEnglish = typeof locale === 'string' && locale.toLowerCase().startsWith('en');
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [projectType, setProjectType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"])(error, locale);
    const [primary, setPrimary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [secondary, setSecondary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [both, setBoth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [doesntMatter, setDoesntMatter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = window.setTimeout(()=>setEntered(true), 30);
        return ()=>window.clearTimeout(timer);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            setProjectType(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale)));
            const saved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readServiceComponentPayloadValue"])(locale, 'data-sources-expected');
            if (saved) {
                const p = saved.primary_data?.required === 1;
                const s = saved.secondary_data?.required === 1;
                if (p && s) {
                    setBoth(true);
                    setDoesntMatter(false);
                    setPrimary(false);
                    setSecondary(false);
                } else if (!p && !s) {
                    setDoesntMatter(true);
                    setBoth(false);
                    setPrimary(false);
                    setSecondary(false);
                } else {
                    setPrimary(p);
                    setSecondary(s);
                    setBoth(false);
                    setDoesntMatter(false);
                }
            }
        } catch  {
        // ignore
        }
    }, [
        locale
    ]);
    const canContinue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const any = doesntMatter || both || primary || secondary;
        return any && !submitting;
    }, [
        both,
        doesntMatter,
        primary,
        secondary,
        submitting
    ]);
    const continueWithPayload = async (payload)=>{
        if (submitting) return;
        setError(null);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateServiceComponentPayload"])(locale, 'data-sources-expected', payload);
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
    const selectOption = (option)=>{
        const nextPrimary = option === 'primary';
        const nextSecondary = option === 'secondary';
        const nextBoth = option === 'both';
        const nextDoesntMatter = option === 'doesntMatter';
        setPrimary(nextPrimary);
        setSecondary(nextSecondary);
        setBoth(nextBoth);
        setDoesntMatter(nextDoesntMatter);
        void continueWithPayload({
            primary_data: {
                required: nextDoesntMatter ? 0 : nextBoth || nextPrimary ? 1 : 0
            },
            secondary_data: {
                required: nextDoesntMatter ? 0 : nextBoth || nextSecondary ? 1 : 0
            }
        });
    };
    const onContinue = async ()=>{
        if (!canContinue) return;
        await continueWithPayload({
            primary_data: {
                required: doesntMatter ? 0 : both || primary ? 1 : 0
            },
            secondary_data: {
                required: doesntMatter ? 0 : both || secondary ? 1 : 0
            }
        });
    };
    const title = isRTL ? 'مصادر البيانات المتوقعة' : 'Expected data sources';
    const subtitle = isRTL ? 'اختر الخيار الأنسب للمتابعة.' : 'Select the best option to continue.';
    const OptionRow = ({ checked, label, onClick })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: onClick,
            className: `w-full flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-start transition-colors ${checked ? 'border-blue-300 bg-white/70' : 'border-white/30 bg-white/40 hover:bg-white/55'}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-sm sm:text-base font-semibold text-slate-900",
                    children: label
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                    lineNumber: 165,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${checked ? 'border-blue-600' : 'border-slate-300'} bg-white/80`,
                    "aria-hidden": "true",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `h-2.5 w-2.5 rounded-sm ${checked ? 'bg-blue-600' : 'bg-transparent'}`
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                    lineNumber: 166,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
            lineNumber: 157,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-lg mx-auto",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                locale: locale,
                entered: entered,
                projectTypeId: projectType
            }, void 0, false, {
                fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                lineNumber: 178,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mt-2 text-start transition-all duration-700 ${entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'}`,
                children: [
                    isEnglish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                        children: `
            #data-sources-expected-title {
              font-family: "IBM Plex Serif", serif !important;
            }
          `
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                        lineNumber: 193,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "data-sources-expected-title",
                        className: "text-2xl sm:text-3xl font-medium tracking-tight text-slate-900",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                        lineNumber: 199,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm sm:text-base font-semibold text-slate-600",
                        children: subtitle
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                        lineNumber: 205,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this),
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 text-sm font-semibold text-rose-700",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                lineNumber: 211,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 space-y-2 pb-28",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(OptionRow, {
                        checked: primary,
                        label: isRTL ? 'بيانات أولية' : 'Primary Data',
                        onClick: ()=>selectOption('primary')
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                        lineNumber: 215,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(OptionRow, {
                        checked: secondary,
                        label: isRTL ? 'بيانات ثانوية' : 'Secondary Data',
                        onClick: ()=>selectOption('secondary')
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                        lineNumber: 220,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(OptionRow, {
                        checked: both,
                        label: isRTL ? 'كلاهما' : 'Both',
                        onClick: ()=>selectOption('both')
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                        lineNumber: 225,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(OptionRow, {
                        checked: doesntMatter,
                        label: isRTL ? 'لا يهم' : "Doesn't matter",
                        onClick: ()=>selectOption('doesntMatter')
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                        lineNumber: 230,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                lineNumber: 214,
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
                                fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                                lineNumber: 240,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onContinue,
                                disabled: !canContinue,
                                className: `btn-sm px-6 py-2 rounded-full ${canContinue ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90' : 'text-slate-500 bg-slate-200 cursor-not-allowed'}`,
                                children: submitting ? isRTL ? 'جاري الحفظ…' : 'Saving…' : nav.continueLabel
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                                lineNumber: 247,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                        lineNumber: 239,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                    lineNumber: 238,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                lineNumber: 237,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
        lineNumber: 177,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=components_project_questions_service-components_68cdce44._.js.map