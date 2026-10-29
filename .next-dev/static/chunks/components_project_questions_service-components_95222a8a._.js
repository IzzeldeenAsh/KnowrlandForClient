(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/project/questions/service-components/deliverableReportTypes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
        } catch (e) {
            return sanitize([
                trimmed
            ]);
        }
    }
    return [];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DeliverablesPlanQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$listbox$2f$listbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/listbox/listbox.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$popover$2f$popover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/popover/popover.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCalendarEvent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCalendarEvent$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCalendarEvent.mjs [app-client] (ecmascript) <export default as IconCalendarEvent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCheck.mjs [app-client] (ecmascript) <export default as IconCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronDown$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconChevronDown.mjs [app-client] (ecmascript) <export default as IconChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCloudUpload$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCloudUpload$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCloudUpload.mjs [app-client] (ecmascript) <export default as IconCloudUpload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDeviceDesktopUp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDeviceDesktopUp$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconDeviceDesktopUp.mjs [app-client] (ecmascript) <export default as IconDeviceDesktopUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconMapPin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconMapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconMapPin.mjs [app-client] (ecmascript) <export default as IconMapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconMinus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconMinus$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconMinus.mjs [app-client] (ecmascript) <export default as IconMinus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconPlus.mjs [app-client] (ecmascript) <export default as IconPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBooks$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBooks$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBooks.mjs [app-client] (ecmascript) <export default as IconBooks>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTrash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTrash$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconTrash.mjs [app-client] (ecmascript) <export default as IconTrash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/ProjectSelectedTypeHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectDeliverables.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectSchedule.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsSync.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectStepErrorToast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectWizardNavigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$service$2d$components$2f$deliverableReportTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/questions/service-components/deliverableReportTypes.ts [app-client] (ecmascript)");
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
const WAY_OPTIONS = [
    {
        value: "on_platform",
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCloudUpload$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCloudUpload$3e$__["IconCloudUpload"],
        iconClass: "text-sky-600",
        label: {
            en: "On platform",
            ar: "على المنصة"
        }
    },
    {
        value: "session",
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDeviceDesktopUp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDeviceDesktopUp$3e$__["IconDeviceDesktopUp"],
        iconClass: "text-violet-600",
        label: {
            en: "Online session",
            ar: "جلسة أونلاين"
        }
    },
    {
        value: "physical_workshop",
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconMapPin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconMapPin$3e$__["IconMapPin"],
        iconClass: "text-amber-600",
        label: {
            en: "In-person workshop",
            ar: "ورشة حضورية"
        }
    }
];
const PILL_CLASS = "inline-flex h-9 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-300 hover:bg-slate-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-blue-200 data-[open]:border-blue-300 data-[open]:bg-blue-50/60";
const PLACEHOLDER_CLASS = "font-medium text-slate-500";
const PANEL_CLASS = "z-50 rounded-[12px] border border-slate-200 bg-white p-2 shadow-lg [--anchor-gap:6px] focus:outline-none";
function isDeliverableComplete(item) {
    var _item_way_address;
    if (!item.title.trim()) return false;
    if (item.period_days === null) return false;
    if (item.report_type.length === 0) return false;
    if (item.way.selected === null) return false;
    if (item.way.selected === "physical_workshop") return Boolean((_item_way_address = item.way.address) === null || _item_way_address === void 0 ? void 0 : _item_way_address.trim());
    return true;
}
function FormatIcons(param) {
    let { types, options } = param;
    const icons = types.map((type)=>{
        var _options_find;
        return (_options_find = options.find((option)=>option.value === type)) === null || _options_find === void 0 ? void 0 : _options_find.iconSrc;
    }).filter((src)=>Boolean(src)).slice(0, 3);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "flex items-center -space-x-1.5 rtl:space-x-reverse",
        children: icons.map((src)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: src,
                alt: "",
                className: "h-5 w-5 rounded-[4px] bg-white object-contain ring-2 ring-white"
            }, src, false, {
                fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                lineNumber: 135,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
        lineNumber: 133,
        columnNumber: 5
    }, this);
}
_c = FormatIcons;
function DeliverablesPlanQuestion(param) {
    let { locale, edit } = param;
    _s();
    const isRTL = locale === "ar";
    const isEnglish = typeof locale === "string" && locale.toLowerCase().startsWith("en");
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const reportTypeOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DeliverablesPlanQuestion.useMemo[reportTypeOptions]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$questions$2f$service$2d$components$2f$deliverableReportTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getReportTypeOptions"])(locale)
    }["DeliverablesPlanQuestion.useMemo[reportTypeOptions]"], [
        locale
    ]);
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [projectType, setProjectType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deliverables, setDeliverables] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // The unit each row's due date is entered in, by row position; never saved.
    const [dueUnits, setDueUnits] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Only a freshly added deliverable grabs focus.
    const [focusIndex, setFocusIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // The schedule step comes first, so deliverables fit inside the planned duration.
    const [schedule, setSchedule] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [attempted, setAttempted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"])(error, locale);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DeliverablesPlanQuestion.useEffect": ()=>{
            const timer = window.setTimeout({
                "DeliverablesPlanQuestion.useEffect.timer": ()=>setEntered(true)
            }["DeliverablesPlanQuestion.useEffect.timer"], 30);
            return ({
                "DeliverablesPlanQuestion.useEffect": ()=>window.clearTimeout(timer)
            })["DeliverablesPlanQuestion.useEffect"];
        }
    }["DeliverablesPlanQuestion.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DeliverablesPlanQuestion.useEffect": ()=>{
            if (edit) {
                var _edit_schedule;
                var _edit_schedule_durationDays;
                const limit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUrgentProjectType"])(edit.projectType) ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["URGENT_MAX_DURATION_DAYS"] : (_edit_schedule_durationDays = (_edit_schedule = edit.schedule) === null || _edit_schedule === void 0 ? void 0 : _edit_schedule.durationDays) !== null && _edit_schedule_durationDays !== void 0 ? _edit_schedule_durationDays : null;
                setProjectType(edit.projectType);
                setSchedule((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUrgentProjectType"])(edit.projectType) ? null : edit.schedule);
                setDeliverables(edit.deliverables.length > 0 ? edit.deliverables.map({
                    "DeliverablesPlanQuestion.useEffect": (item)=>limit === null || item.period_days === null ? item : {
                            ...item,
                            period_days: Math.min(item.period_days, limit)
                        }
                }["DeliverablesPlanQuestion.useEffect"]) : [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDeliverable"])()
                ]);
                return;
            }
            let storedProjectType = null;
            try {
                storedProjectType = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale));
            } catch (e) {
            // ignore
            }
            const urgent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUrgentProjectType"])(storedProjectType);
            const storedSchedule = urgent ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readProjectSchedule"])(locale);
            const limit = urgent ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["URGENT_MAX_DURATION_DAYS"] : storedSchedule ? storedSchedule.durationDays : null;
            const stored = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readDeliverables"])(locale).map({
                "DeliverablesPlanQuestion.useEffect.stored": (item)=>limit === null ? item : {
                        ...item,
                        period_days: Math.min(item.period_days, limit)
                    }
            }["DeliverablesPlanQuestion.useEffect.stored"]);
            setProjectType(storedProjectType);
            setSchedule(storedSchedule);
            setDeliverables(stored.length > 0 ? stored : [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDeliverable"])()
            ]);
        // The edit adapter seeds the step once; later renders keep the local edits.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["DeliverablesPlanQuestion.useEffect"], [
        locale
    ]);
    const isUrgent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUrgentProjectType"])(projectType);
    const maxDay = isUrgent ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["URGENT_MAX_DURATION_DAYS"] : schedule ? schedule.durationDays : Number.MAX_SAFE_INTEGER;
    const plannedCloseDate = schedule ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDaysToIsoDate"])(schedule.plannedStartDate, schedule.durationDays) : "";
    const dateFor = (days)=>schedule ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIsoDate"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDaysToIsoDate"])(schedule.plannedStartDate, days), locale, {
            month: "short",
            day: "numeric"
        }) : "";
    // Urgent requests are due within a day, so they stay in days.
    const unitFor = (index)=>{
        var _deliverables_index;
        var _deliverables_index_period_days, _dueUnits_index;
        return isUrgent ? "days" : (_dueUnits_index = dueUnits[index]) !== null && _dueUnits_index !== void 0 ? _dueUnits_index : (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inferDueUnit"])((_deliverables_index_period_days = (_deliverables_index = deliverables[index]) === null || _deliverables_index === void 0 ? void 0 : _deliverables_index.period_days) !== null && _deliverables_index_period_days !== void 0 ? _deliverables_index_period_days : null);
    };
    const amountFor = (index)=>{
        var _deliverables_index;
        var _deliverables_index_period_days;
        const days = (_deliverables_index_period_days = (_deliverables_index = deliverables[index]) === null || _deliverables_index === void 0 ? void 0 : _deliverables_index.period_days) !== null && _deliverables_index_period_days !== void 0 ? _deliverables_index_period_days : null;
        return days === null ? null : Math.round(days / __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DUE_UNIT_DAYS"][unitFor(index)]);
    };
    const update = (index, patch)=>{
        setDeliverables((prev)=>prev.map((item, i)=>i === index ? {
                    ...item,
                    ...patch
                } : item));
    };
    const setDay = (index, value)=>{
        update(index, {
            period_days: value === null ? null : Math.min(maxDay, Math.max(0, Math.round(value) || 0))
        });
    };
    const setDueAmount = (index, amount)=>{
        setDay(index, amount === null ? null : Math.max(0, Math.round(amount) || 0) * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DUE_UNIT_DAYS"][unitFor(index)]);
    };
    /** Switching the unit keeps the due date as close as the new unit allows, never moving a later date to the start day. */ const setDueUnit = (index, unit)=>{
        var _deliverables_index;
        setDueUnits((prev)=>{
            const next = [
                ...prev
            ];
            next[index] = unit;
            return next;
        });
        var _deliverables_index_period_days;
        const days = (_deliverables_index_period_days = (_deliverables_index = deliverables[index]) === null || _deliverables_index === void 0 ? void 0 : _deliverables_index.period_days) !== null && _deliverables_index_period_days !== void 0 ? _deliverables_index_period_days : null;
        if (days === null) return;
        const amount = days > 0 ? Math.max(1, Math.round(days / __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DUE_UNIT_DAYS"][unit])) : 0;
        setDay(index, amount * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DUE_UNIT_DAYS"][unit]);
    };
    const setWay = (index, selected)=>{
        const item = deliverables[index];
        update(index, {
            way: {
                selected,
                address: selected === "physical_workshop" ? item.way.address || "" : null
            }
        });
    };
    const addDeliverable = ()=>{
        if (deliverables.length >= __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_DELIVERABLES"]) return;
        setDeliverables((prev)=>[
                ...prev,
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDeliverable"])()
            ]);
        setFocusIndex(deliverables.length);
        setAttempted(false);
    };
    const removeDeliverable = (index)=>{
        if (deliverables.length <= 1) return;
        setDeliverables((prev)=>prev.filter((_, i)=>i !== index));
        setDueUnits((prev)=>prev.filter((_, i)=>i !== index));
        setFocusIndex(null);
    };
    const completed = deliverables.filter(isDeliverableComplete);
    const allComplete = deliverables.length > 0 && completed.length === deliverables.length;
    const onContinue = async ()=>{
        if (submitting) return;
        if (!allComplete) {
            setAttempted(true);
            return;
        }
        setError(null);
        // Keep deliverables in timeline order so positions match their dates.
        const ordered = completed.map((item, index)=>({
                item,
                index
            })).sort((a, b)=>a.item.period_days - b.item.period_days || a.index - b.index).map((param)=>{
            let { item } = param;
            return {
                ...item,
                title: item.title.trim(),
                way: {
                    ...item.way,
                    address: item.way.address ? item.way.address.trim() : item.way.address
                }
            };
        });
        if (edit) {
            edit.onSave(ordered);
            return;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeDeliverables"])(locale, ordered);
        setSubmitting(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["syncServiceComponents"])(locale);
            nav.goNext();
        } catch (err) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? "تعذر حفظ المخرجات." : "Failed to save deliverables."));
        } finally{
            setSubmitting(false);
        }
    };
    const formatSummary = (types)=>{
        const first = reportTypeOptions.find((option)=>option.value === types[0]);
        if (!first) return isRTL ? "اختر صيغة الملف" : "Choose file format";
        return types.length > 1 ? "".concat(first.label, " +").concat(types.length - 1) : first.label;
    };
    const renderDeliverable = (item, index)=>{
        var _item_way_address;
        const linkedToPayment = !!item.id && !!(edit === null || edit === void 0 ? void 0 : edit.lockedIds.includes(item.id));
        const way = WAY_OPTIONS.find((option)=>option.value === item.way.selected);
        const missingTitle = attempted && !item.title.trim();
        const missingDay = attempted && item.period_days === null;
        const missingTypes = attempted && item.report_type.length === 0;
        const missingWay = attempted && item.way.selected === null;
        const missingAddress = attempted && item.way.selected === "physical_workshop" && !((_item_way_address = item.way.address) === null || _item_way_address === void 0 ? void 0 : _item_way_address.trim());
        var _amountFor, _amountFor1;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            className: "rounded-[12px] border border-slate-200 bg-white/90 p-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            htmlFor: "deliverable-title-".concat(index),
                            className: "text-xs font-bold text-slate-500",
                            children: deliverables.length > 1 ? isRTL ? "اسم المخرج ".concat(index + 1) : "Deliverable ".concat(index + 1, " name") : isRTL ? "اسم المخرج" : "Deliverable name"
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                            lineNumber: 389,
                            columnNumber: 11
                        }, this),
                        linkedToPayment ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[11px] font-semibold text-slate-400",
                            children: isRTL ? "مرتبط بدفعة" : "Linked to a payment"
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                            lineNumber: 402,
                            columnNumber: 13
                        }, this) : deliverables.length > 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>removeDeliverable(index),
                            "aria-label": isRTL ? "حذف المخرج" : "Remove deliverable",
                            className: "inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-600",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTrash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTrash$3e$__["IconTrash"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                lineNumber: 412,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                            lineNumber: 406,
                            columnNumber: 13
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                    lineNumber: 388,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    id: "deliverable-title-".concat(index),
                    value: item.title,
                    onChange: (event)=>update(index, {
                            title: event.target.value
                        }),
                    maxLength: 120,
                    autoFocus: index === focusIndex,
                    placeholder: isRTL ? "مثال: تقرير تحليل السوق" : "e.g. Market analysis report",
                    className: "mt-1.5 w-full rounded-[10px] border bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 placeholder:font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 ".concat(missingTitle ? "border-rose-300" : "border-slate-200")
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                    lineNumber: 416,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-3 flex flex-wrap items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$popover$2f$popover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$popover$2f$popover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverButton"], {
                                    className: "".concat(PILL_CLASS, " ").concat(missingDay ? "border-rose-300" : ""),
                                    "aria-label": isRTL ? "موعد التسليم" : "Due date",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCalendarEvent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCalendarEvent$3e$__["IconCalendarEvent"], {
                                            size: 16,
                                            className: "text-slate-500"
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 436,
                                            columnNumber: 15
                                        }, this),
                                        item.period_days === null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: PLACEHOLDER_CLASS,
                                            children: isRTL ? "اختر موعد التسليم" : "Choose due date"
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 438,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dueLabel"])(locale, item.period_days, unitFor(index))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                    lineNumber: 443,
                                                    columnNumber: 19
                                                }, this),
                                                schedule ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium text-slate-400",
                                                    children: [
                                                        "· ",
                                                        dateFor(item.period_days)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                    lineNumber: 445,
                                                    columnNumber: 21
                                                }, this) : null
                                            ]
                                        }, void 0, true),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronDown$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronDown$3e$__["IconChevronDown"], {
                                            size: 14,
                                            className: "text-slate-400"
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 451,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                    lineNumber: 432,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$popover$2f$popover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverPanel"], {
                                    anchor: "bottom start",
                                    className: "".concat(PANEL_CLASS, " w-72 p-3"),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-bold text-slate-500",
                                            children: isRTL ? "موعد التسليم" : "Due"
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 457,
                                            columnNumber: 15
                                        }, this),
                                        isUrgent ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            role: "radiogroup",
                                            "aria-label": isRTL ? "وحدة المدة" : "Duration unit",
                                            className: "mt-2 grid grid-cols-3 gap-0.5 rounded-[10px] border border-slate-200 bg-slate-50 p-[3px]",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DUE_UNITS"].map((unit)=>{
                                                const selected = unitFor(index) === unit;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    role: "radio",
                                                    "aria-checked": selected,
                                                    onClick: ()=>setDueUnit(index, unit),
                                                    className: "h-[30px] rounded-[7px] px-2 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 ".concat(selected ? "bg-white text-blue-700 ring-1 ring-blue-200" : "text-slate-500 hover:text-slate-900"),
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dueUnitLabel"])(locale, unit)
                                                }, unit, false, {
                                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                    lineNumber: 469,
                                                    columnNumber: 23
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 461,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center rounded-full border border-slate-200 bg-white",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>{
                                                                var _amountFor;
                                                                return setDueAmount(index, Math.max(0, ((_amountFor = amountFor(index)) !== null && _amountFor !== void 0 ? _amountFor : 0) - 1));
                                                            },
                                                            disabled: !amountFor(index),
                                                            "aria-label": isRTL ? "أبكر" : "Earlier",
                                                            className: "inline-flex h-8 w-8 items-center justify-center text-slate-600 hover:text-slate-900 disabled:text-slate-300",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconMinus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconMinus$3e$__["IconMinus"], {
                                                                size: 14
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                                lineNumber: 496,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                            lineNumber: 489,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            inputMode: "numeric",
                                                            min: 0,
                                                            max: maxDay === Number.MAX_SAFE_INTEGER ? undefined : Math.floor(maxDay / __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DUE_UNIT_DAYS"][unitFor(index)]),
                                                            value: (_amountFor = amountFor(index)) !== null && _amountFor !== void 0 ? _amountFor : "",
                                                            placeholder: "—",
                                                            onChange: (event)=>setDueAmount(index, event.target.value === "" ? null : Number(event.target.value)),
                                                            "aria-label": (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dueUnitHint"])(locale, unitFor(index)),
                                                            className: "w-12 appearance-none border-0 bg-transparent p-0 text-center text-sm font-bold tabular-nums text-slate-900 focus:outline-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                            lineNumber: 498,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>{
                                                                var _amountFor;
                                                                return setDueAmount(index, ((_amountFor = amountFor(index)) !== null && _amountFor !== void 0 ? _amountFor : 0) + 1);
                                                            },
                                                            disabled: (((_amountFor1 = amountFor(index)) !== null && _amountFor1 !== void 0 ? _amountFor1 : 0) + 1) * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DUE_UNIT_DAYS"][unitFor(index)] > maxDay,
                                                            "aria-label": isRTL ? "لاحقًا" : "Later",
                                                            className: "inline-flex h-8 w-8 items-center justify-center text-slate-600 hover:text-slate-900 disabled:text-slate-300",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlus$3e$__["IconPlus"], {
                                                                size: 14
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                                lineNumber: 529,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                            lineNumber: 520,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                    lineNumber: 488,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-semibold text-slate-500",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dueUnitHint"])(locale, unitFor(index))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                    lineNumber: 532,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 487,
                                            columnNumber: 15
                                        }, this),
                                        item.period_days !== null && (unitFor(index) !== "days" || schedule) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-[11px] font-medium text-slate-500",
                                            children: [
                                                unitFor(index) !== "days" ? isRTL ? "= ".concat(item.period_days, " يومًا") : "= ".concat(item.period_days, " days") : null,
                                                schedule ? isRTL ? "التسليم في ".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIsoDate"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDaysToIsoDate"])(schedule.plannedStartDate, item.period_days), locale)) : "Due ".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIsoDate"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDaysToIsoDate"])(schedule.plannedStartDate, item.period_days), locale)) : null
                                            ].filter(Boolean).join(" · ")
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 537,
                                            columnNumber: 17
                                        }, this) : null,
                                        schedule ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-[11px] font-semibold text-slate-400",
                                            children: isRTL ? "ينتهي المشروع في ".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIsoDate"])(plannedCloseDate, locale)) : "Project ends ".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIsoDate"])(plannedCloseDate, locale))
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 555,
                                            columnNumber: 17
                                        }, this) : null,
                                        isUrgent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-[11px] font-semibold text-amber-700",
                                            children: isRTL ? "الطلبات العاجلة تُسلَّم خلال 24 ساعة." : "Urgent requests are delivered within 24 hours."
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 562,
                                            columnNumber: 17
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                    lineNumber: 453,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                            lineNumber: 431,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$listbox$2f$listbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Listbox"], {
                            multiple: true,
                            value: item.report_type,
                            onChange: (next)=>update(index, {
                                    report_type: next
                                }),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$listbox$2f$listbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListboxButton"], {
                                    className: "".concat(PILL_CLASS, " ").concat(missingTypes ? "border-rose-300" : ""),
                                    "aria-label": isRTL ? "صيغة الملف" : "File format",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FormatIcons, {
                                            types: item.report_type,
                                            options: reportTypeOptions
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 580,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: item.report_type.length === 0 ? PLACEHOLDER_CLASS : "",
                                            children: formatSummary(item.report_type)
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 581,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronDown$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronDown$3e$__["IconChevronDown"], {
                                            size: 14,
                                            className: "text-slate-400"
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 586,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                    lineNumber: 576,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$listbox$2f$listbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListboxOptions"], {
                                    anchor: "bottom start",
                                    className: "".concat(PANEL_CLASS, " w-60"),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "px-2 pb-1 pt-1 text-xs font-bold text-slate-500",
                                            children: isRTL ? "صيغة الملف (يمكن اختيار أكثر من صيغة)" : "File format (pick any)"
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 589,
                                            columnNumber: 15
                                        }, this),
                                        reportTypeOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$listbox$2f$listbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListboxOption"], {
                                                value: option.value,
                                                className: "group flex cursor-pointer items-center gap-2.5 rounded-[8px] px-2 py-2 text-sm font-semibold text-slate-700 data-[focus]:bg-slate-50 data-[selected]:text-blue-800",
                                                children: [
                                                    option.iconSrc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: option.iconSrc,
                                                        alt: "",
                                                        className: "h-5 w-5 object-contain"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                        lineNumber: 599,
                                                        columnNumber: 21
                                                    }, this) : null,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex-1",
                                                        children: option.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                        lineNumber: 601,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                                                        size: 16,
                                                        className: "invisible text-blue-600 group-data-[selected]:visible"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                        lineNumber: 602,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, option.value, true, {
                                                fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                lineNumber: 593,
                                                columnNumber: 17
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                    lineNumber: 588,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                            lineNumber: 571,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$listbox$2f$listbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Listbox"], {
                            value: item.way.selected,
                            onChange: (next)=>{
                                if (next) setWay(index, next);
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$listbox$2f$listbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListboxButton"], {
                                    className: "".concat(PILL_CLASS, " ").concat(missingWay ? "border-rose-300" : ""),
                                    "aria-label": isRTL ? "طريقة التسليم" : "Delivery method",
                                    children: [
                                        way ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(way.Icon, {
                                                    size: 16,
                                                    className: way.iconClass
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                    lineNumber: 623,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: isRTL ? way.label.ar : way.label.en
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                    lineNumber: 624,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBooks$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBooks$3e$__["IconBooks"], {
                                                    size: 16,
                                                    className: "text-slate-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                    lineNumber: 628,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: PLACEHOLDER_CLASS,
                                                    children: isRTL ? "اختر طريقة التسليم" : "Choose delivery method"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                    lineNumber: 629,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronDown$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronDown$3e$__["IconChevronDown"], {
                                            size: 14,
                                            className: "text-slate-400"
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 634,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                    lineNumber: 617,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$listbox$2f$listbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListboxOptions"], {
                                    anchor: "bottom start",
                                    className: "".concat(PANEL_CLASS, " w-60"),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "px-2 pb-1 pt-1 text-xs font-bold text-slate-500",
                                            children: isRTL ? "طريقة التسليم" : "Delivered by"
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                            lineNumber: 637,
                                            columnNumber: 15
                                        }, this),
                                        WAY_OPTIONS.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$listbox$2f$listbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListboxOption"], {
                                                value: option.value,
                                                className: "group flex cursor-pointer items-center gap-2.5 rounded-[8px] px-2 py-2 text-sm font-semibold text-slate-700 data-[focus]:bg-slate-50 data-[selected]:text-blue-800",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(option.Icon, {
                                                        size: 18,
                                                        className: option.iconClass
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                        lineNumber: 646,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex-1",
                                                        children: isRTL ? option.label.ar : option.label.en
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                        lineNumber: 647,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                                                        size: 16,
                                                        className: "invisible text-blue-600 group-data-[selected]:visible"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                        lineNumber: 650,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, option.value, true, {
                                                fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                                lineNumber: 641,
                                                columnNumber: 17
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                    lineNumber: 636,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                            lineNumber: 611,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                    lineNumber: 430,
                    columnNumber: 9
                }, this),
                item.way.selected === "physical_workshop" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "mt-3 flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconMapPin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconMapPin$3e$__["IconMapPin"], {
                            size: 16,
                            className: "shrink-0 text-slate-400"
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                            lineNumber: 662,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "sr-only",
                            children: isRTL ? "عنوان الورشة" : "Workshop address"
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                            lineNumber: 663,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: item.way.address || "",
                            onChange: (event)=>update(index, {
                                    way: {
                                        selected: "physical_workshop",
                                        address: event.target.value
                                    }
                                }),
                            placeholder: isRTL ? "عنوان الورشة، مثال: عمّان" : "Workshop address, e.g. Amman",
                            className: "w-full rounded-[10px] border bg-white px-3 py-2 text-sm font-semibold text-slate-900 placeholder:font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 ".concat(missingAddress ? "border-rose-300" : "border-slate-200")
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                            lineNumber: 666,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                    lineNumber: 661,
                    columnNumber: 11
                }, this) : null,
                missingTitle || missingDay || missingTypes || missingWay || missingAddress ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-2 text-xs font-semibold text-rose-600",
                    children: missingTitle ? isRTL ? "أدخل اسم المخرج." : "Enter a name for this deliverable." : missingDay ? isRTL ? "اختر موعد التسليم." : "Choose when it's due." : missingTypes ? isRTL ? "اختر صيغة ملف واحدة على الأقل." : "Pick at least one file format." : missingWay ? isRTL ? "اختر طريقة التسليم." : "Choose how it's delivered." : isRTL ? "أدخل عنوان الورشة." : "Enter the workshop address."
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                    lineNumber: 687,
                    columnNumber: 11
                }, this) : null
            ]
        }, index, true, {
            fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
            lineNumber: 384,
            columnNumber: 7
        }, this);
    };
    var _edit_backHref, _edit_continueLabel;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-3xl mx-auto",
        dir: isRTL ? "rtl" : "ltr",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                locale: locale,
                entered: entered,
                projectTypeId: projectType,
                serviceLabelOverride: edit ? edit.serviceLabel : undefined
            }, void 0, false, {
                fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                lineNumber: 715,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 text-start transition-all duration-700 ".concat(entered ? "opacity-100 translate-x-0" : isRTL ? "opacity-0 translate-x-4" : "opacity-0 -translate-x-4"),
                children: [
                    isEnglish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                        children: '\n            #deliverables-plan-question-title {\n              font-family: "IBM Plex Serif", serif !important;\n            }\n          '
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                        lineNumber: 732,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "deliverables-plan-question-title",
                        className: "text-2xl sm:text-3xl font-medium tracking-tight text-slate-900",
                        children: isRTL ? "مخرجات المشروع" : "Project deliverables"
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                        lineNumber: 738,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm sm:text-base font-semibold text-slate-600",
                        children: isRTL ? "سمِّ المخرج وحدد موعده وصيغته وطريقة تسليمه." : "Name it, set when it's due, its format, and how it reaches you."
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                        lineNumber: 744,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                lineNumber: 722,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 pb-36 sm:pb-28",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "space-y-2.5",
                        children: deliverables.map((item, index)=>renderDeliverable(item, index))
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                        lineNumber: 752,
                        columnNumber: 9
                    }, this),
                    deliverables.length < __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectDeliverables$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_DELIVERABLES"] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: addDeliverable,
                        className: "mt-3 inline-flex items-center gap-1.5 rounded-full px-2 py-1.5 text-sm font-bold text-blue-600 hover:bg-blue-50/60",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlus$3e$__["IconPlus"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                lineNumber: 762,
                                columnNumber: 13
                            }, this),
                            isRTL ? "إضافة مخرج آخر" : "Add another deliverable"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                        lineNumber: 757,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                lineNumber: 751,
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
                                href: (_edit_backHref = edit === null || edit === void 0 ? void 0 : edit.backHref) !== null && _edit_backHref !== void 0 ? _edit_backHref : nav.backHref,
                                className: "btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200",
                                children: isRTL ? "رجوع" : "Back"
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                lineNumber: 771,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>void onContinue(),
                                disabled: submitting,
                                className: "btn-sm px-6 py-2 rounded-full ".concat(allComplete && !submitting ? "text-white bg-[#1C7CBB] hover:bg-opacity-90" : "text-slate-500 bg-slate-200"),
                                children: submitting ? isRTL ? "جاري الحفظ…" : "Saving…" : (_edit_continueLabel = edit === null || edit === void 0 ? void 0 : edit.continueLabel) !== null && _edit_continueLabel !== void 0 ? _edit_continueLabel : nav.continueLabel
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                                lineNumber: 777,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                        lineNumber: 770,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                    lineNumber: 769,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
                lineNumber: 768,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/service-components/DeliverablesPlanQuestion.tsx",
        lineNumber: 714,
        columnNumber: 5
    }, this);
}
_s(DeliverablesPlanQuestion, "mLR8ZkAgbQM0oOPeA93gZxz+OwU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"]
    ];
});
_c1 = DeliverablesPlanQuestion;
var _c, _c1;
__turbopack_context__.k.register(_c, "FormatIcons");
__turbopack_context__.k.register(_c1, "DeliverablesPlanQuestion");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DataSourcesExpectedQuestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/ProjectSelectedTypeHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/serviceComponentsPayload.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectPropertiesSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectPropertiesSync.ts [app-client] (ecmascript)");
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
const dataSourceIds = [
    'primary_data',
    'secondary_data',
    'both',
    'does_not_matter'
];
function getOptions(locale) {
    const isRTL = locale === 'ar';
    if (isRTL) {
        return [
            {
                id: 'primary_data',
                label: 'بيانات أولية'
            },
            {
                id: 'secondary_data',
                label: 'بيانات ثانوية'
            },
            {
                id: 'both',
                label: 'كلاهما'
            },
            {
                id: 'does_not_matter',
                label: 'لا يهم'
            }
        ];
    }
    return [
        {
            id: 'primary_data',
            label: 'Primary data'
        },
        {
            id: 'secondary_data',
            label: 'Secondary data'
        },
        {
            id: 'both',
            label: 'Both'
        },
        {
            id: 'does_not_matter',
            label: "Doesn't matter"
        }
    ];
}
function DataSourcesExpectedQuestion(param) {
    let { locale, edit } = param;
    _s();
    const isRTL = locale === 'ar';
    const isEnglish = typeof locale === 'string' && locale.toLowerCase().startsWith('en');
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const options = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DataSourcesExpectedQuestion.useMemo[options]": ()=>getOptions(locale)
    }["DataSourcesExpectedQuestion.useMemo[options]"], [
        locale
    ]);
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [projectType, setProjectType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"])(error, locale);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DataSourcesExpectedQuestion.useEffect": ()=>{
            const timer = window.setTimeout({
                "DataSourcesExpectedQuestion.useEffect.timer": ()=>setEntered(true)
            }["DataSourcesExpectedQuestion.useEffect.timer"], 30);
            return ({
                "DataSourcesExpectedQuestion.useEffect": ()=>window.clearTimeout(timer)
            })["DataSourcesExpectedQuestion.useEffect"];
        }
    }["DataSourcesExpectedQuestion.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DataSourcesExpectedQuestion.useEffect": ()=>{
            if (edit) {
                setProjectType(edit.projectType);
                if (dataSourceIds.includes(edit.value)) setSelected(edit.value);
                return;
            }
            try {
                setProjectType(window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].projectTypeKey(locale)));
            } catch (e) {
            // ignore
            }
            const saved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readServiceComponentPayloadValue"])(locale, 'data-sources-expected');
            if (saved && dataSourceIds.includes(saved)) {
                setSelected(saved);
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["DataSourcesExpectedQuestion.useEffect"], [
        locale
    ]);
    const title = isRTL ? 'مصادر البيانات المتوقعة' : 'Expected data sources';
    const canContinue = selected !== null;
    const persist = async (value)=>{
        if (edit) {
            if (value) edit.onSave(value);
            return;
        }
        setBusy(true);
        setError(null);
        try {
            if (value) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateServiceComponentPayload"])(locale, 'data-sources-expected', value);
            } else {
                const payload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readServiceComponentsPayload"])(locale);
                delete payload.components['data-sources-expected'];
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$serviceComponentsPayload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeServiceComponentsPayload"])(locale, payload);
            }
            // The description step sends project components together. Review edits save immediately.
            if (nav.isReviewEditMode) await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectPropertiesSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["syncProjectProperties"])(locale);
            nav.goNext();
        } catch (err) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(err, isRTL ? 'تعذر حفظ الاختيار.' : 'Unable to save your selection.'));
        } finally{
            setBusy(false);
        }
    };
    const onSelect = (id)=>{
        setSelected(id);
        void persist(id);
    };
    const onContinue = ()=>{
        if (!selected) return;
        void persist(selected);
    };
    // Data sources are optional: skipping clears any earlier answer.
    const onSkip = ()=>{
        if (busy) return;
        setSelected(null);
        void persist(null);
    };
    var _edit_backHref, _edit_continueLabel;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-4xl mx-auto min-h-full flex flex-col",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 pb-28",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$ProjectSelectedTypeHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        locale: locale,
                        entered: entered,
                        projectTypeId: projectType,
                        serviceLabelOverride: edit ? edit.serviceLabel : undefined
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 text-start transition-all duration-700 ".concat(entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'),
                        children: [
                            isEnglish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                children: '\n              #data-sources-expected-question-title {\n                font-family: "IBM Plex Serif", serif !important;\n              }\n            '
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                                lineNumber: 180,
                                columnNumber: 13
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "data-sources-expected-question-title",
                                className: "text-2xl sm:text-3xl font-medium tracking-tight text-slate-900",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                                lineNumber: 186,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 space-y-3 max-w-xl transition-all duration-700 ".concat(entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'),
                        style: {
                            transitionDelay: '160ms'
                        },
                        role: "radiogroup",
                        "aria-label": title,
                        children: options.map((opt)=>{
                            const isSelected = selected === opt.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                role: "radio",
                                "aria-checked": isSelected,
                                onClick: ()=>onSelect(opt.id),
                                className: "flex w-full items-center gap-3 rounded-2xl border p-5 text-start transition-colors ".concat(isSelected ? 'border-blue-400 bg-white/80 shadow-sm' : 'border-slate-200 bg-white/60 hover:border-slate-300 hover:bg-white/80'),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ".concat(isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'),
                                        "aria-hidden": "true",
                                        children: isSelected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "h-2 w-2 rounded-full bg-white"
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                                            lineNumber: 224,
                                            columnNumber: 33
                                        }, this) : null
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                                        lineNumber: 219,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-base font-medium text-slate-900",
                                        children: opt.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                                        lineNumber: 226,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, opt.id, true, {
                                fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                                lineNumber: 208,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                        lineNumber: 194,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed left-0 right-0 z-20 bottom-0 border-t border-slate-200/70 bg-white/80 backdrop-blur-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: (_edit_backHref = edit === null || edit === void 0 ? void 0 : edit.backHref) !== null && _edit_backHref !== void 0 ? _edit_backHref : nav.backHref,
                                "aria-disabled": busy,
                                onClick: (e)=>{
                                    if (busy) e.preventDefault();
                                },
                                className: "btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200",
                                children: isRTL ? 'رجوع' : 'Back'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                                lineNumber: 236,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    edit ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: onSkip,
                                        disabled: busy,
                                        className: "btn-sm px-5 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200 disabled:cursor-not-allowed disabled:opacity-60",
                                        children: isRTL ? 'تخطي' : 'Skip'
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                                        lineNumber: 248,
                                        columnNumber: 30
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: onContinue,
                                        disabled: !canContinue || busy,
                                        className: "btn-sm px-6 py-2 rounded-full ".concat(canContinue && !busy ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90' : 'text-slate-500 bg-slate-200 cursor-not-allowed'),
                                        children: busy ? isRTL ? 'جاري الحفظ...' : 'Saving...' : (_edit_continueLabel = edit === null || edit === void 0 ? void 0 : edit.continueLabel) !== null && _edit_continueLabel !== void 0 ? _edit_continueLabel : nav.continueLabel
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                                        lineNumber: 257,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                                lineNumber: 247,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                        lineNumber: 235,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                    lineNumber: 234,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
                lineNumber: 233,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/service-components/DataSourcesExpectedQuestion.tsx",
        lineNumber: 159,
        columnNumber: 5
    }, this);
}
_s(DataSourcesExpectedQuestion, "C+tuMmG2QGZXmMNslwbnuC+DRQM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"]
    ];
});
_c = DataSourcesExpectedQuestion;
var _c;
__turbopack_context__.k.register(_c, "DataSourcesExpectedQuestion");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_project_questions_service-components_95222a8a._.js.map