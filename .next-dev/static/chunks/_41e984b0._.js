(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/hooks/useRoleCheck.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRoleCheck",
    ()=>useRoleCheck
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$GlobalProfileProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/GlobalProfileProvider.tsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
function useRoleCheck() {
    _s();
    const { user, roles, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$GlobalProfileProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobalProfile"])();
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
_s(useRoleCheck, "sweFsEASJAQ8aXggiFcqusrE6BU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$GlobalProfileProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobalProfile"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/agreements/AgreementModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Modal/Modal.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Button/Button.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Text$2f$Text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Text/Text.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Group$2f$Group$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Group/Group.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Stack/Stack.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$ScrollArea$2f$ScrollArea$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/ScrollArea/ScrollArea.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Loader$2f$Loader$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Loader/Loader.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Alert$2f$Alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Alert/Alert.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$ActionIcon$2f$ActionIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/ActionIcon/ActionIcon.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPrinter$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPrinter$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconPrinter.mjs [app-client] (ecmascript) <export default as IconPrinter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useRoleCheck$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useRoleCheck.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const AgreementModal = (param)=>{
    let { opened, onClose, onAccepted, locale, agreementType, acceptUuid } = param;
    _s();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [html, setHtml] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Agreement');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [applyAt, setApplyAt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [serverUuid, setServerUuid] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [canAccept, setCanAccept] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isRTL = locale === 'ar';
    const { isCompany: isCompanyRole, isInsighter: isInsighterRole, roles: userRoles } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useRoleCheck$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRoleCheck"])();
    const viewportRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const computedAgreementType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AgreementModal.useMemo[computedAgreementType]": ()=>{
            if (agreementType) return agreementType;
            if (isCompanyRole()) return 'company_agreement';
            if (isInsighterRole()) return 'insighter_agreement';
            return 'insighter_agreement';
        }
    }["AgreementModal.useMemo[computedAgreementType]"], [
        agreementType,
        userRoles
    ]);
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AgreementModal.useMemo[t]": ()=>{
            return {
                header: isRTL ? 'اتفاقية الاستخدام' : 'Agreement',
                cancel: isRTL ? 'التجاوز حالياً' : 'Skip for now',
                accept: isRTL ? 'أوافق' : 'Accept',
                loadError: isRTL ? 'تعذر تحميل الاتفاقية' : 'Failed to load agreement',
                submitError: isRTL ? 'تعذر قبول الاتفاقية' : 'Failed to accept agreement'
            };
        }
    }["AgreementModal.useMemo[t]"], [
        isRTL
    ]);
    const formattedApplyAt = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "AgreementModal.useMemo[formattedApplyAt]": ()=>{
            if (!applyAt) return null;
            const d = new Date(applyAt);
            return d.toLocaleDateString(locale === 'ar' ? 'ar' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    }["AgreementModal.useMemo[formattedApplyAt]"], [
        applyAt,
        locale
    ]);
    const isScrolledToBottom = (el)=>{
        const threshold = 2; // px tolerance
        return el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;
    };
    const updateCanAccept = ()=>{
        const el = viewportRef.current;
        if (!el) {
            setCanAccept(false);
            return;
        }
        const fits = el.scrollHeight <= el.clientHeight + 1;
        setCanAccept(fits || isScrolledToBottom(el));
    };
    const handleScrollPositionChange = (_pos)=>{
        if (canAccept) return;
        const el = viewportRef.current;
        if (!el) return;
        if (isScrolledToBottom(el)) {
            setCanAccept(true);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AgreementModal.useEffect": ()=>{
            let active = true;
            const fetchAgreement = {
                "AgreementModal.useEffect.fetchAgreement": async ()=>{
                    if (!opened) return;
                    setLoading(true);
                    setError(null);
                    setCanAccept(false);
                    try {
                        var _data_data, _data_data1, _data_data2, _data_data3;
                        const res = await fetch("".concat(("TURBOPACK compile-time value", "https://api.foresighta.co"), "/api/common/setting/guideline/type/last/").concat(computedAgreementType), {
                            headers: {
                                Accept: 'application/json',
                                'Accept-Language': locale || 'en'
                            }
                        });
                        if (!res.ok) throw new Error("".concat(res.status, " ").concat(res.statusText));
                        const data = await res.json();
                        if (!active) return;
                        setHtml((data === null || data === void 0 ? void 0 : (_data_data = data.data) === null || _data_data === void 0 ? void 0 : _data_data.guideline) || '');
                        setTitle((data === null || data === void 0 ? void 0 : (_data_data1 = data.data) === null || _data_data1 === void 0 ? void 0 : _data_data1.name) || t.header);
                        setApplyAt((data === null || data === void 0 ? void 0 : (_data_data2 = data.data) === null || _data_data2 === void 0 ? void 0 : _data_data2.apply_at) || null);
                        setServerUuid((data === null || data === void 0 ? void 0 : (_data_data3 = data.data) === null || _data_data3 === void 0 ? void 0 : _data_data3.uuid) || null);
                    } catch (e) {
                        if (!active) return;
                        setError(t.loadError);
                    } finally{
                        if (active) setLoading(false);
                        // After content loads, reset scroll and evaluate if it fits
                        requestAnimationFrame({
                            "AgreementModal.useEffect.fetchAgreement": ()=>{
                                if (!viewportRef.current) return;
                                viewportRef.current.scrollTo({
                                    top: 0
                                });
                                updateCanAccept();
                            }
                        }["AgreementModal.useEffect.fetchAgreement"]);
                    }
                }
            }["AgreementModal.useEffect.fetchAgreement"];
            fetchAgreement();
            return ({
                "AgreementModal.useEffect": ()=>{
                    active = false;
                }
            })["AgreementModal.useEffect"];
        }
    }["AgreementModal.useEffect"], [
        opened,
        computedAgreementType,
        locale,
        t.loadError,
        t.header
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AgreementModal.useEffect": ()=>{
            if (!opened || loading) return;
            const onResize = {
                "AgreementModal.useEffect.onResize": ()=>updateCanAccept()
            }["AgreementModal.useEffect.onResize"];
            const id = window.setTimeout(updateCanAccept, 0);
            window.addEventListener('resize', onResize);
            return ({
                "AgreementModal.useEffect": ()=>{
                    window.clearTimeout(id);
                    window.removeEventListener('resize', onResize);
                }
            })["AgreementModal.useEffect"];
        }
    }["AgreementModal.useEffect"], [
        html,
        opened,
        loading
    ]);
    const printTerms = ()=>{
        const printContent = "\n      <html>\n        <head>\n          <title>".concat(title, "</title>\n          <style>\n            body {\n              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;\n              margin: 20px;\n              line-height: 1.6;\n              color: #333;\n            }\n            h1, h2, h3, h4, h5, h6 {\n              margin-top: 1.5rem;\n              margin-bottom: 0.75rem;\n              font-weight: 700;\n            }\n            h1 { font-size: 1.75rem; }\n            h2 { font-size: 1.5rem; }\n            h3 { font-size: 1.25rem; }\n            p {\n              margin: 12px 0;\n              line-height: 1.75;\n            }\n            hr { margin: 16px 0; }\n            ul, ol {\n              padding-left: 1.25rem;\n              margin: 12px 0;\n            }\n            li { margin: 6px 0; }\n            blockquote {\n              margin: 12px 0;\n              padding: 8px 12px;\n              border-left: 3px solid #e5e7eb;\n              background: #fafafa;\n              border-radius: 6px;\n            }\n          </style>\n        </head>\n        <body ").concat(isRTL ? 'dir="rtl"' : '', ">\n          <h1>").concat(title, "</h1>\n          ").concat(html, "\n        </body>\n      </html>\n    ");
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.open();
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        }
    };
    const onAccept = async ()=>{
        if (submitting) return;
        const finalUuid = acceptUuid !== null && acceptUuid !== void 0 ? acceptUuid : serverUuid;
        if (!finalUuid) {
            setError(t.submitError);
            return;
        }
        setSubmitting(true);
        setError(null);
        try {
            const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
            const res = await fetch("".concat(("TURBOPACK compile-time value", "https://api.foresighta.co"), "/api/account/agreement/accept/").concat(finalUuid), {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Accept-Language': locale || 'en',
                    ...token ? {
                        Authorization: "Bearer ".concat(token)
                    } : {}
                }
            });
            if (!res.ok) {
                throw new Error("".concat(res.status, " ").concat(res.statusText));
            }
            onAccepted === null || onAccepted === void 0 ? void 0 : onAccepted();
            onClose();
        } catch (e) {
            setError(t.submitError);
        } finally{
            setSubmitting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
        opened: opened,
        onClose: onClose,
        title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Group$2f$Group$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
            style: {
                width: '100%'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Text$2f$Text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                    size: "lg",
                    fw: 600,
                    children: title
                }, void 0, false, {
                    fileName: "[project]/components/agreements/AgreementModal.tsx",
                    lineNumber: 236,
                    columnNumber: 11
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginLeft: 'auto',
                        marginRight: '8px'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$ActionIcon$2f$ActionIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionIcon"], {
                        variant: "subtle",
                        color: "gray",
                        onClick: printTerms,
                        disabled: loading || !html,
                        size: "sm",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPrinter$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPrinter$3e$__["IconPrinter"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/components/agreements/AgreementModal.tsx",
                            lineNumber: 245,
                            columnNumber: 15
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/components/agreements/AgreementModal.tsx",
                        lineNumber: 238,
                        columnNumber: 13
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/components/agreements/AgreementModal.tsx",
                    lineNumber: 237,
                    columnNumber: 11
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "[project]/components/agreements/AgreementModal.tsx",
            lineNumber: 235,
            columnNumber: 9
        }, void 0),
        centered: true,
        size: "xl",
        dir: isRTL ? 'rtl' : 'ltr',
        withCloseButton: !submitting,
        closeOnClickOutside: !submitting,
        closeOnEscape: !submitting,
        radius: "md",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Stack"], {
            gap: "md",
            children: [
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Alert$2f$Alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Alert"], {
                    color: "red",
                    variant: "light",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/components/agreements/AgreementModal.tsx",
                    lineNumber: 260,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: 'relative',
                        minHeight: 240
                    },
                    children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Group$2f$Group$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
                        justify: "center",
                        p: "xl",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Loader$2f$Loader$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Loader"], {}, void 0, false, {
                            fileName: "[project]/components/agreements/AgreementModal.tsx",
                            lineNumber: 267,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/agreements/AgreementModal.tsx",
                        lineNumber: 266,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$ScrollArea$2f$ScrollArea$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                        h: 480,
                        p: "xs",
                        viewportRef: viewportRef,
                        onScrollPositionChange: handleScrollPositionChange,
                        children: [
                            formattedApplyAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Alert$2f$Alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Alert"], {
                                color: "blue",
                                variant: "light",
                                mb: "sm",
                                children: [
                                    isRTL ? 'سيتم تطبيق هذه الشروط الجديدة بتاريخ' : 'These new conditions will be applied on',
                                    " ",
                                    formattedApplyAt,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                        className: "jsx-6fdbbb3ff0c9aecd"
                                    }, void 0, false, {
                                        fileName: "[project]/components/agreements/AgreementModal.tsx",
                                        lineNumber: 274,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    isRTL ? 'تجنب ايقاف الحساب بالموافقة على هذه الشروط' : 'Avoid account suspension by accepting these conditions'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/agreements/AgreementModal.tsx",
                                lineNumber: 272,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    paddingInline: 16,
                                    direction: isRTL ? 'rtl' : 'ltr'
                                },
                                dangerouslySetInnerHTML: {
                                    __html: html
                                },
                                className: "jsx-6fdbbb3ff0c9aecd" + " " + "agreement-html"
                            }, void 0, false, {
                                fileName: "[project]/components/agreements/AgreementModal.tsx",
                                lineNumber: 278,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                id: "6fdbbb3ff0c9aecd",
                                children: ".agreement-html h1{margin-top:1.5rem!important;margin-bottom:.75rem!important;font-size:1.75rem!important;font-weight:800!important}.agreement-html h2{margin-top:1.25rem!important;margin-bottom:.5rem!important;font-size:1.5rem!important;font-weight:700!important}.agreement-html h3{margin-top:1rem!important;margin-bottom:.5rem!important;font-size:1.25rem!important;font-weight:700!important}.agreement-html h4{margin-top:.75rem!important;margin-bottom:.5rem!important;font-size:1.125rem!important;font-weight:600!important}.agreement-html h5{margin-top:.75rem!important;margin-bottom:.5rem!important;font-size:1rem!important;font-weight:600!important}.agreement-html h6{color:#374151!important;margin-top:.5rem!important;margin-bottom:.25rem!important;font-size:.875rem!important;font-weight:600!important}.agreement-html p{margin:12px 0!important;line-height:1.75!important}.agreement-html h1+p,.agreement-html h2+p,.agreement-html h3+p,.agreement-html h4+p,.agreement-html h5+p,.agreement-html h6+p{margin-top:8px!important}.agreement-html hr{margin:16px 0!important}.agreement-html{line-height:1.75!important}.agreement-html ul{margin:12px 0!important}.agreement-html ul:not(:-webkit-any(:lang(ae),:lang(ar),:lang(arc),:lang(bcc),:lang(bqi),:lang(ckb),:lang(dv),:lang(fa),:lang(glk),:lang(he),:lang(ku),:lang(mzn),:lang(nqo),:lang(pnb),:lang(ps),:lang(sd),:lang(ug),:lang(ur),:lang(yi))){padding-left:1.25rem}.agreement-html ul:not(:-moz-any(:lang(ae),:lang(ar),:lang(arc),:lang(bcc),:lang(bqi),:lang(ckb),:lang(dv),:lang(fa),:lang(glk),:lang(he),:lang(ku),:lang(mzn),:lang(nqo),:lang(pnb),:lang(ps),:lang(sd),:lang(ug),:lang(ur),:lang(yi))){padding-left:1.25rem}.agreement-html ul:not(:is(:lang(ae),:lang(ar),:lang(arc),:lang(bcc),:lang(bqi),:lang(ckb),:lang(dv),:lang(fa),:lang(glk),:lang(he),:lang(ku),:lang(mzn),:lang(nqo),:lang(pnb),:lang(ps),:lang(sd),:lang(ug),:lang(ur),:lang(yi))){padding-left:1.25rem}.agreement-html ul:-webkit-any(:lang(ae),:lang(ar),:lang(arc),:lang(bcc),:lang(bqi),:lang(ckb),:lang(dv),:lang(fa),:lang(glk),:lang(he),:lang(ku),:lang(mzn),:lang(nqo),:lang(pnb),:lang(ps),:lang(sd),:lang(ug),:lang(ur),:lang(yi)){padding-right:1.25rem}.agreement-html ul:-moz-any(:lang(ae),:lang(ar),:lang(arc),:lang(bcc),:lang(bqi),:lang(ckb),:lang(dv),:lang(fa),:lang(glk),:lang(he),:lang(ku),:lang(mzn),:lang(nqo),:lang(pnb),:lang(ps),:lang(sd),:lang(ug),:lang(ur),:lang(yi)){padding-right:1.25rem}.agreement-html ul:is(:lang(ae),:lang(ar),:lang(arc),:lang(bcc),:lang(bqi),:lang(ckb),:lang(dv),:lang(fa),:lang(glk),:lang(he),:lang(ku),:lang(mzn),:lang(nqo),:lang(pnb),:lang(ps),:lang(sd),:lang(ug),:lang(ur),:lang(yi)){padding-right:1.25rem}.agreement-html ol{margin:12px 0!important}.agreement-html ol:not(:-webkit-any(:lang(ae),:lang(ar),:lang(arc),:lang(bcc),:lang(bqi),:lang(ckb),:lang(dv),:lang(fa),:lang(glk),:lang(he),:lang(ku),:lang(mzn),:lang(nqo),:lang(pnb),:lang(ps),:lang(sd),:lang(ug),:lang(ur),:lang(yi))){padding-left:1.25rem}.agreement-html ol:not(:-moz-any(:lang(ae),:lang(ar),:lang(arc),:lang(bcc),:lang(bqi),:lang(ckb),:lang(dv),:lang(fa),:lang(glk),:lang(he),:lang(ku),:lang(mzn),:lang(nqo),:lang(pnb),:lang(ps),:lang(sd),:lang(ug),:lang(ur),:lang(yi))){padding-left:1.25rem}.agreement-html ol:not(:is(:lang(ae),:lang(ar),:lang(arc),:lang(bcc),:lang(bqi),:lang(ckb),:lang(dv),:lang(fa),:lang(glk),:lang(he),:lang(ku),:lang(mzn),:lang(nqo),:lang(pnb),:lang(ps),:lang(sd),:lang(ug),:lang(ur),:lang(yi))){padding-left:1.25rem}.agreement-html ol:-webkit-any(:lang(ae),:lang(ar),:lang(arc),:lang(bcc),:lang(bqi),:lang(ckb),:lang(dv),:lang(fa),:lang(glk),:lang(he),:lang(ku),:lang(mzn),:lang(nqo),:lang(pnb),:lang(ps),:lang(sd),:lang(ug),:lang(ur),:lang(yi)){padding-right:1.25rem}.agreement-html ol:-moz-any(:lang(ae),:lang(ar),:lang(arc),:lang(bcc),:lang(bqi),:lang(ckb),:lang(dv),:lang(fa),:lang(glk),:lang(he),:lang(ku),:lang(mzn),:lang(nqo),:lang(pnb),:lang(ps),:lang(sd),:lang(ug),:lang(ur),:lang(yi)){padding-right:1.25rem}.agreement-html ol:is(:lang(ae),:lang(ar),:lang(arc),:lang(bcc),:lang(bqi),:lang(ckb),:lang(dv),:lang(fa),:lang(glk),:lang(he),:lang(ku),:lang(mzn),:lang(nqo),:lang(pnb),:lang(ps),:lang(sd),:lang(ug),:lang(ur),:lang(yi)){padding-right:1.25rem}.agreement-html li{margin:6px 0!important;line-height:1.75!important}.agreement-html blockquote{background:#fafafa!important;border-radius:6px!important;margin:12px 0!important;padding:8px 12px!important}.agreement-html blockquote:not(:-webkit-any(:lang(ae),:lang(ar),:lang(arc),:lang(bcc),:lang(bqi),:lang(ckb),:lang(dv),:lang(fa),:lang(glk),:lang(he),:lang(ku),:lang(mzn),:lang(nqo),:lang(pnb),:lang(ps),:lang(sd),:lang(ug),:lang(ur),:lang(yi))){border-left:3px solid #e5e7eb}.agreement-html blockquote:not(:-moz-any(:lang(ae),:lang(ar),:lang(arc),:lang(bcc),:lang(bqi),:lang(ckb),:lang(dv),:lang(fa),:lang(glk),:lang(he),:lang(ku),:lang(mzn),:lang(nqo),:lang(pnb),:lang(ps),:lang(sd),:lang(ug),:lang(ur),:lang(yi))){border-left:3px solid #e5e7eb}.agreement-html blockquote:not(:is(:lang(ae),:lang(ar),:lang(arc),:lang(bcc),:lang(bqi),:lang(ckb),:lang(dv),:lang(fa),:lang(glk),:lang(he),:lang(ku),:lang(mzn),:lang(nqo),:lang(pnb),:lang(ps),:lang(sd),:lang(ug),:lang(ur),:lang(yi))){border-left:3px solid #e5e7eb}.agreement-html blockquote:-webkit-any(:lang(ae),:lang(ar),:lang(arc),:lang(bcc),:lang(bqi),:lang(ckb),:lang(dv),:lang(fa),:lang(glk),:lang(he),:lang(ku),:lang(mzn),:lang(nqo),:lang(pnb),:lang(ps),:lang(sd),:lang(ug),:lang(ur),:lang(yi)){border-right:3px solid #e5e7eb}.agreement-html blockquote:-moz-any(:lang(ae),:lang(ar),:lang(arc),:lang(bcc),:lang(bqi),:lang(ckb),:lang(dv),:lang(fa),:lang(glk),:lang(he),:lang(ku),:lang(mzn),:lang(nqo),:lang(pnb),:lang(ps),:lang(sd),:lang(ug),:lang(ur),:lang(yi)){border-right:3px solid #e5e7eb}.agreement-html blockquote:is(:lang(ae),:lang(ar),:lang(arc),:lang(bcc),:lang(bqi),:lang(ckb),:lang(dv),:lang(fa),:lang(glk),:lang(he),:lang(ku),:lang(mzn),:lang(nqo),:lang(pnb),:lang(ps),:lang(sd),:lang(ug),:lang(ur),:lang(yi)){border-right:3px solid #e5e7eb}"
                            }, void 0, false, void 0, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/agreements/AgreementModal.tsx",
                        lineNumber: 270,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/agreements/AgreementModal.tsx",
                    lineNumber: 264,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Group$2f$Group$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
                    justify: "flex-end",
                    mt: "sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "default",
                            onClick: onClose,
                            disabled: submitting,
                            children: t.cancel
                        }, void 0, false, {
                            fileName: "[project]/components/agreements/AgreementModal.tsx",
                            lineNumber: 361,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: onAccept,
                            loading: submitting,
                            disabled: loading || !(acceptUuid !== null && acceptUuid !== void 0 ? acceptUuid : serverUuid) || !canAccept,
                            children: t.accept
                        }, void 0, false, {
                            fileName: "[project]/components/agreements/AgreementModal.tsx",
                            lineNumber: 364,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/agreements/AgreementModal.tsx",
                    lineNumber: 360,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/agreements/AgreementModal.tsx",
            lineNumber: 258,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/agreements/AgreementModal.tsx",
        lineNumber: 231,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AgreementModal, "bY82FU6y0S4NQLpSbf4uciASrcs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useRoleCheck$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRoleCheck"]
    ];
});
_c = AgreementModal;
const __TURBOPACK__default__export__ = AgreementModal;
var _c;
__turbopack_context__.k.register(_c, "AgreementModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/authRedirect.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAngularAppOrigin",
    ()=>getAngularAppOrigin,
    "isAngularPath",
    ()=>isAngularPath,
    "isAngularRouteUrl",
    ()=>isAngularRouteUrl,
    "normalizeAngularPath",
    ()=>normalizeAngularPath,
    "toAngularAppUrl",
    ()=>toAngularAppUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const DEFAULT_LOCAL_ANGULAR_APP_URL = ("TURBOPACK compile-time value", "http://localhost:4200") || "".concat(("TURBOPACK compile-time value", "http://localhost:4200"));
const ANGULAR_ROUTE_PREFIXES = [
    "/app/",
    "/admin-dashboard/"
];
const LOCALHOST_HOSTNAMES = new Set([
    "localhost",
    "127.0.0.1"
]);
const isAbsoluteHttpUrl = (url)=>/^https?:\/\//i.test(url);
const isLocalhost = (hostname)=>LOCALHOST_HOSTNAMES.has(hostname);
const isKnownAngularOrigin = (url)=>url.hostname.startsWith("app.") || isLocalhost(url.hostname) && url.port !== "3000";
const extractKnownAngularOrigin = (url)=>{
    if (!url || !isAbsoluteHttpUrl(url)) {
        return null;
    }
    try {
        const parsed = new URL(url);
        return isKnownAngularOrigin(parsed) ? parsed.origin : null;
    } catch (e) {
        return null;
    }
};
const normalizeAngularPath = (path)=>{
    const withoutLocale = (path.replace(/^\/(en|ar)(?=\/|$)/, "") || "/").trim();
    return withoutLocale.startsWith("/") ? withoutLocale : "/".concat(withoutLocale);
};
const isAngularPath = (path)=>{
    const pathOnly = path.split("?")[0].split("#")[0];
    const normalized = normalizeAngularPath(pathOnly);
    return ANGULAR_ROUTE_PREFIXES.some((prefix)=>normalized.startsWith(prefix));
};
const isAngularRouteUrl = (url)=>{
    if (!url) {
        return false;
    }
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const parsed = new URL(url, window.location.origin);
        return isAngularPath(parsed.pathname);
    } catch (e) {
        return isAngularPath(url);
    }
};
const getAngularAppOrigin = (returnUrl)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const fromReturnUrl = extractKnownAngularOrigin(returnUrl);
    if (fromReturnUrl) {
        return fromReturnUrl;
    }
    const fromReferrer = extractKnownAngularOrigin(document.referrer);
    if (fromReferrer) {
        return fromReferrer;
    }
    const { protocol, hostname } = window.location;
    if (hostname.includes("foresighta.co")) {
        return "".concat(protocol, "//app.foresighta.co");
    }
    if (hostname.includes("insightabusiness.com")) {
        return "".concat(protocol, "//app.insightabusiness.com");
    }
    return DEFAULT_LOCAL_ANGULAR_APP_URL;
};
const toAngularAppUrl = (url)=>{
    if ("object" === "undefined" || !url) {
        return url;
    }
    const parsed = new URL(url, window.location.origin);
    parsed.pathname = normalizeAngularPath(parsed.pathname);
    if (isAbsoluteHttpUrl(url) && isKnownAngularOrigin(parsed)) {
        return parsed.toString();
    }
    return "".concat(getAngularAppOrigin(url)).concat(parsed.pathname).concat(parsed.search).concat(parsed.hash);
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Environment configuration
//
// All values come from NEXT_PUBLIC_* env vars, resolved at build time:
//   next dev              -> .env.development  (localhost + stage API + test keys)
//   npm run build:stage   -> .env.staging      (foresighta.co + test keys)
//   npm run build         -> .env.production   (insightabusiness.com + live keys)
//
// Fallbacks are production values so a build with missing env vars fails safe.
// Backend API (no trailing slash)
__turbopack_context__.s([
    "apiBaseUrl",
    ()=>apiBaseUrl,
    "appBaseUrl",
    ()=>appBaseUrl,
    "dashboardUrl",
    ()=>dashboardUrl,
    "getApiUrl",
    ()=>getApiUrl,
    "getAppUrl",
    ()=>getAppUrl,
    "getStripePublishableKey",
    ()=>getStripePublishableKey,
    "publicBaseUrl",
    ()=>publicBaseUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const apiBaseUrl = ("TURBOPACK compile-time value", "https://api.foresighta.co") || 'https://api.insightabusiness.com';
const publicBaseUrl = ("TURBOPACK compile-time value", "http://localhost:3000") || 'https://insightabusiness.com';
const dashboardUrl = ("TURBOPACK compile-time value", "http://localhost:4200") || 'https://app.insightabusiness.com';
const appBaseUrl = publicBaseUrl;
const getApiUrl = (path)=>{
    return "".concat(apiBaseUrl).concat(path);
};
const getAppUrl = (path)=>{
    return "".concat(publicBaseUrl).concat(path);
};
const getStripePublishableKey = ()=>{
    return ("TURBOPACK compile-time value", "pk_test_51RpQiFL3mrWP7a0P1OYWGeFJWtgMwcWJtiEDLvn29CpYn5x8Ou77YViA1yoimlixKU5aUAeOeN5VTfoC4sMpvFVF00qq9a6BNm") || 'pk_live_51RvbpYRIE7WtDi9SLKPBxKTPyTkULT1e36AZMOcmtUomKgW99akiph2PVg5mmUcPtyAjvlXwP1wy70OFvooJLpQc00CNQYKb96';
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/services/onboarding.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SUPPORTED_ONBOARDING_PROMPTS",
    ()=>SUPPORTED_ONBOARDING_PROMPTS,
    "fetchOnboardingIndustryTree",
    ()=>fetchOnboardingIndustryTree,
    "fetchOnboardingPromptStatuses",
    ()=>fetchOnboardingPromptStatuses,
    "getVisibleSupportedPrompts",
    ()=>getVisibleSupportedPrompts,
    "isSupportedOnboardingPrompt",
    ()=>isSupportedOnboardingPrompt,
    "skipOnboardingPrompt",
    ()=>skipOnboardingPrompt,
    "updateFeedIndustryPreferences",
    ()=>updateFeedIndustryPreferences,
    "updateOnboardingCountry",
    ()=>updateOnboardingCountry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
;
const SUPPORTED_ONBOARDING_PROMPTS = [
    'country',
    'community_feed_industries'
];
const onboardingHeaders = (param)=>{
    let { token, locale } = param;
    return {
        Authorization: "Bearer ".concat(token),
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': locale,
        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
    };
};
async function getErrorMessage(response, fallback) {
    const payload = await response.json().catch(()=>null);
    const validationMessages = (payload === null || payload === void 0 ? void 0 : payload.errors) ? Object.values(payload.errors).flat().filter((message)=>typeof message === 'string') : [];
    return validationMessages[0] || (payload === null || payload === void 0 ? void 0 : payload.message) || fallback;
}
function isSupportedOnboardingPrompt(promptKey) {
    return SUPPORTED_ONBOARDING_PROMPTS.includes(promptKey);
}
function getVisibleSupportedPrompts(prompts) {
    return prompts.filter((prompt)=>prompt.should_show && isSupportedOnboardingPrompt(prompt.prompt_key));
}
async function fetchOnboardingPromptStatuses(options) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/account/profile/onboarding/prompts/status'), {
        method: 'POST',
        headers: onboardingHeaders(options),
        cache: 'no-store'
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, 'Unable to check your onboarding status.'));
    }
    const payload = await response.json();
    return Array.isArray(payload === null || payload === void 0 ? void 0 : payload.data) ? payload.data : [];
}
async function updateOnboardingCountry(countryId, options) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/account/profile/country'), {
        method: 'POST',
        headers: onboardingHeaders(options),
        body: JSON.stringify({
            country_id: countryId
        })
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, 'Unable to save your country.'));
    }
}
async function updateFeedIndustryPreferences(industryIds, options) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/account/profile/feed/industry-preferences'), {
        method: 'POST',
        headers: onboardingHeaders(options),
        body: JSON.stringify({
            industry_ids: industryIds
        })
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, 'Unable to save your industries.'));
    }
}
async function skipOnboardingPrompt(promptKey, options) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/account/profile/onboarding/prompts/skip'), {
        method: 'POST',
        headers: onboardingHeaders(options),
        body: JSON.stringify({
            prompt_key: promptKey
        })
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, 'Unable to skip this step.'));
    }
}
async function fetchOnboardingIndustryTree(locale) {
    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/common/setting/industry/tree'), {
        headers: {
            Accept: 'application/json',
            'Accept-Language': locale,
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
        }
    });
    if (!response.ok) {
        throw new Error('Unable to load industries.');
    }
    const payload = await response.json();
    return Array.isArray(payload) ? payload : [];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/[locale]/callback/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QueryParamAuthCallback
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$GlobalProfileProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/GlobalProfileProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$FullScreenLoader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/FullScreenLoader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/index.react-client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$agreements$2f$AgreementModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/agreements/AgreementModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authRedirect.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cookieDomain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/cookieDomain.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/onboarding.service.ts [app-client] (ecmascript)");
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
function QueryParamAuthCallback() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const { refreshProfile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$GlobalProfileProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobalProfile"])();
    const currentLocale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const [showAgreement, setShowAgreement] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [postAcceptUser, setPostAcceptUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Get token from query parameters or cookies
    let token = searchParams.get('token');
    // If no token parameter, check if the entire query string is a token (JWT format)
    if (!token && "object" !== 'undefined') {
        const queryString = window.location.search.substring(1);
        if (queryString && queryString.startsWith('eyJ') && queryString.includes('.')) {
            token = queryString;
            console.log('[callback] Detected raw token in query string:', token.substring(0, 20) + '...');
        }
    }
    const returnUrl = searchParams.get('returnUrl');
    const locale = params.locale || 'en';
    const shouldPromptAddChannels = searchParams.get('promptAddChannels') === '1';
    const storePromptPendingFlag = ()=>{
        if (!shouldPromptAddChannels) return;
        try {
            localStorage.setItem('postSignupPrompt:addChannels:pending', '1');
        } catch (e) {
        // ignore
        }
    };
    // If still no token, try to get it from cookie
    if (!token) {
        token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTokenFromCookie"])('token');
        if (token) {
            console.log('[callback] Found token in cookie:', token.substring(0, 20) + '...');
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QueryParamAuthCallback.useEffect": ()=>{
            const fetchProfile = {
                "QueryParamAuthCallback.useEffect.fetchProfile": async ()=>{
                    try {
                        setLoading(true);
                        if (!token) {
                            throw new Error('No token provided');
                        }
                        // Store token in cookie (primary storage) with error handling
                        try {
                            setTokenCookie(token);
                            console.log('[callback] Token stored in cookie successfully');
                        } catch (cookieError) {
                            console.error('[callback] Failed to set token cookie:', cookieError);
                        // Continue anyway, as we can still use localStorage
                        }
                        // Store token in localStorage for backward compatibility
                        localStorage.setItem('token', token);
                        console.log('[callback] Token stored in localStorage');
                        // Set user's timezone (don't let this block the main flow)
                        setUserTimezone(token).catch({
                            "QueryParamAuthCallback.useEffect.fetchProfile": (error)=>{
                                console.error('[callback] Failed to set timezone, continuing anyway:', error);
                            }
                        }["QueryParamAuthCallback.useEffect.fetchProfile"]);
                        // Fetch profile with retry logic
                        console.log('[callback] Fetching user profile...');
                        const response = await fetchProfileWithRetry(token);
                        console.log('[callback] Profile fetched successfully:', response.data.email, 'Roles:', response.data.roles);
                        // Store user data in localStorage (including country_id for redirect logic)
                        console.log('[callback] Storing user data in localStorage');
                        const userData = {
                            id: response.data.id,
                            name: response.data.name,
                            email: response.data.email,
                            profile_photo_url: response.data.profile_photo_url,
                            first_name: response.data.first_name,
                            last_name: response.data.last_name,
                            country_id: response.data.country_id,
                            roles: response.data.roles
                        };
                        localStorage.setItem('user', JSON.stringify(userData));
                        // Verify authentication was successful
                        const storedToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
                        const storedUser = localStorage.getItem('user');
                        if (!storedToken || !storedUser) {
                            throw new Error('Failed to verify stored authentication data');
                        }
                        console.log('[callback] Authentication verification successful');
                        // Note: GlobalProfileProvider will pick up the token and fetch profile
                        // on the next page load, so we skip refreshProfile() here to avoid
                        // a duplicate /api/account/profile call.
                        // Agreement check for insighter/company roles only
                        if (response.data.roles && (response.data.roles.includes('insighter') || response.data.roles.includes('company') || response.data.roles.includes('company-insighter'))) {
                            const accepted = await checkLatestAgreement(token, locale);
                            if (!accepted) {
                                setPostAcceptUser(response.data);
                                setShowAgreement(true);
                                setLoading(false); // stop loader while user reads/accepts
                                return;
                            }
                        }
                        setTimeout({
                            "QueryParamAuthCallback.useEffect.fetchProfile": ()=>void handleRedirect(response.data)
                        }["QueryParamAuthCallback.useEffect.fetchProfile"], 200);
                    } catch (error) {
                        console.error('[callback] Error in authentication flow:', error);
                        // Clear any partially set auth data
                        clearAuthData();
                        // Show error for a moment before redirecting to login
                        setTimeout({
                            "QueryParamAuthCallback.useEffect.fetchProfile": ()=>{
                                console.log('[callback] Redirecting to login due to error');
                                window.location.href = "".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAngularAppOrigin"])(returnUrl), "/auth/login");
                            }
                        }["QueryParamAuthCallback.useEffect.fetchProfile"], 2000);
                    }
                }
            }["QueryParamAuthCallback.useEffect.fetchProfile"];
            if (token) {
                fetchProfile();
            } else {
                console.error('[callback] No token found in URL parameters or cookies');
                // Redirect to login if no token
                window.location.href = "".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAngularAppOrigin"])(returnUrl), "/auth/login");
            }
        }
    }["QueryParamAuthCallback.useEffect"], [
        token,
        locale,
        returnUrl
    ]);
    // Helper function to set token in cookie with improved localhost settings
    const setTokenCookie = (token)=>{
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.startsWith('localhost:') || window.location.hostname.startsWith('127.0.0.1:');
        let cookieSettings;
        if (isLocalhost) {
            // For localhost development - use permissive settings
            cookieSettings = [
                "token=".concat(token),
                "Path=/",
                "Max-Age=".concat(60 * 60 * 24 * 7),
                "SameSite=Lax"
            ];
        } else {
            // Use the environment's shared domain for cross-subdomain cookie sharing with the Angular app
            cookieSettings = [
                "token=".concat(token),
                "Path=/",
                "Max-Age=".concat(60 * 60 * 24 * 7),
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cookieDomain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sharedCookieAttributes"])()
            ];
        }
        const cookieString = cookieSettings.join('; ');
        console.log('[callback] Setting cookie:', cookieString);
        document.cookie = cookieString;
        // Verify the cookie was set
        setTimeout(()=>{
            const verification = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTokenFromCookie"])('token');
            console.log('[callback] Cookie set verification:', verification ? 'Success' : 'Failed');
        }, 100);
    };
    // Helper function to get cookie value
    const getCookie = (name)=>{
        if (typeof document === 'undefined') return null;
        const cookies = document.cookie.split(';');
        for(let i = 0; i < cookies.length; i++){
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                return decodeURIComponent(cookie.substring(name.length + 1));
            }
        }
        return null;
    };
    // Helper function to clear auth data
    const clearAuthData = ()=>{
        console.log('[callback] Clearing auth data');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('foresighta-creds');
        // Clear token cookie
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.startsWith('localhost:') || window.location.hostname.startsWith('127.0.0.1:');
        let cookieSettings;
        if (isLocalhost) {
            cookieSettings = [
                'token=',
                'Path=/',
                'Max-Age=-1'
            ];
        } else {
            // Use the environment's shared domain to match the cookie set by Angular app
            cookieSettings = [
                'token=',
                'Path=/',
                'Max-Age=-1',
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cookieDomain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sharedCookieAttributes"])()
            ];
        }
        document.cookie = cookieSettings.join('; ');
    };
    // Helper function to set user's timezone
    const setUserTimezone = async (authToken)=>{
        try {
            const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            console.log('[TIMEZONE] Setting timezone:', userTimezone);
            const timezoneResponse = await fetch("".concat(("TURBOPACK compile-time value", "https://api.foresighta.co"), "/api/account/timezone/set"), {
                method: 'POST',
                headers: {
                    'Authorization': "Bearer ".concat(authToken),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Accept-Language': locale
                },
                body: JSON.stringify({
                    timezone: userTimezone
                })
            });
            if (!timezoneResponse.ok) {
                console.error('[TIMEZONE] Failed to set timezone:', timezoneResponse.status);
            } else {
                console.log('[TIMEZONE] Successfully set timezone');
            }
        } catch (timezoneError) {
            console.error('[TIMEZONE] Error setting timezone:', timezoneError);
        // Continue with the flow even if timezone setting fails
        }
    };
    // Helper function to handle redirects
    const handleRedirect = async (userData)=>{
        storePromptPendingFlag();
        console.log('[callback] Handling redirect for user:', userData.email);
        console.log('[callback] User roles:', userData.roles);
        console.log('[callback] Return URL from params:', returnUrl);
        const preferredLanguage = getCookie('preferred_language') || locale;
        const normalizeNextUrlToLocale = (url, targetLocale)=>{
            if (!url) return url;
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAngularRouteUrl"])(url)) return url;
            try {
                const u = new URL(url, window.location.origin);
                // Consider localhost:3000 and production Next.js host as internal
                const isNextHost = u.hostname === 'localhost' && u.port === '3000' || !u.hostname.includes('localhost') && !u.hostname.startsWith('app.');
                if (isNextHost) {
                    const withoutLocale = u.pathname.replace(/^\/(en|ar)(\/|$)/, '/');
                    u.pathname = "/".concat(targetLocale).concat(withoutLocale === '/' ? '' : withoutLocale);
                    return u.toString();
                }
                return url;
            } catch (e) {
                if (url.startsWith('/')) {
                    const withoutLocale = url.replace(/^\/(en|ar)(\/|$)/, '/');
                    return "/".concat(targetLocale).concat(withoutLocale === '/' ? '' : withoutLocale);
                }
                return url;
            }
        };
        // Check if user has admin role
        if (userData.roles && (userData.roles.includes('admin') || userData.roles.includes('staff'))) {
            console.log('[callback] Admin user detected, redirecting to admin dashboard');
            window.location.href = "".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAngularAppOrigin"])(), "/admin-dashboard/admin/dashboard/main-dashboard/requests");
            return;
        }
        // Check for stored returnUrl in cookie as fallback (for social auth)
        const storedReturnUrl = getCookie('auth_return_url');
        console.log('[callback] Stored return URL from cookie:', storedReturnUrl);
        const finalReturnUrlRaw = returnUrl || storedReturnUrl;
        const finalReturnUrl = normalizeNextUrlToLocale(finalReturnUrlRaw, preferredLanguage || 'en');
        console.log('[callback] Final return URL:', finalReturnUrl);
        const isUsableReturnUrl = Boolean(finalReturnUrl && finalReturnUrl !== '/' && !finalReturnUrl.includes('/login') && !finalReturnUrl.includes('/auth/'));
        const isProfessionalRole = userData.roles && (userData.roles.includes('insighter') || userData.roles.includes('company') || userData.roles.includes('company-insighter'));
        const defaultDestination = isProfessionalRole ? '/app/insighter-dashboard/my-dashboard' : "/".concat(preferredLanguage, "/home").concat(shouldPromptAddChannels ? '?promptAddChannels=1' : '');
        const intendedDestination = isUsableReturnUrl && finalReturnUrl ? finalReturnUrl : defaultDestination;
        // Every successful login checks the server-owned onboarding state. If the
        // check is temporarily unavailable, fail open so authentication is never blocked.
        const authToken = token || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
        if (authToken) {
            try {
                const prompts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchOnboardingPromptStatuses"])({
                    token: authToken,
                    locale: preferredLanguage || 'en'
                });
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$onboarding$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVisibleSupportedPrompts"])(prompts).length > 0) {
                    if (storedReturnUrl) clearReturnUrlCookie();
                    window.location.replace("/".concat(preferredLanguage, "/onboarding?redirect=").concat(encodeURIComponent(intendedDestination)));
                    return;
                }
            } catch (error) {
                console.error('[callback] Onboarding status check failed; continuing login:', error);
            }
        }
        // Clean up the stored return URL cookie
        if (storedReturnUrl) {
            clearReturnUrlCookie();
        }
        if (finalReturnUrl && finalReturnUrl !== '/' && !finalReturnUrl.includes('/login') && !finalReturnUrl.includes('/auth/')) {
            console.log('[callback] Redirecting to returnUrl:', finalReturnUrl);
            // Check if this is an Angular route that should go to the Angular app
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAngularRouteUrl"])(finalReturnUrl)) {
                console.log('[callback] Detected Angular route, redirecting to Angular app');
                const redirectUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toAngularAppUrl"])(finalReturnUrl);
                console.log('[callback] Final Angular redirect URL:', redirectUrl);
                window.location.href = redirectUrl;
            } else {
                // Handle Next.js routes
                console.log('[callback] Detected Next.js route, redirecting within app');
                if (finalReturnUrl.startsWith('http')) {
                    console.log('[callback] External URL redirect:', finalReturnUrl);
                    window.location.href = finalReturnUrl;
                } else {
                    console.log('[callback] Internal route redirect:', finalReturnUrl);
                    // Use router.push for internal Next.js routes to maintain auth state
                    router.push(finalReturnUrl);
                }
            }
        } else if (userData.roles && (userData.roles.includes('insighter') || userData.roles.includes('company') || userData.roles.includes('company-insighter'))) {
            // Redirect to insighter dashboard
            console.log('[callback] Redirecting to Angular insighter dashboard');
            window.location.href = "".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authRedirect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAngularAppOrigin"])(), "/app/insighter-dashboard/my-dashboard");
        } else {
            // Redirect to home page using current locale (optionally open post-signup prompt)
            if (shouldPromptAddChannels) {
                router.push("/".concat(preferredLanguage, "/home?promptAddChannels=1"));
                return;
            }
            console.log('[callback] Redirecting to home page:', "/".concat(preferredLanguage, "/home"));
            router.push("/".concat(preferredLanguage, "/home"));
        }
    };
    // Helper function to clear return URL cookie
    const clearReturnUrlCookie = ()=>{
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.startsWith('localhost:') || window.location.hostname.startsWith('127.0.0.1:');
        let cookieSettings;
        if (isLocalhost) {
            cookieSettings = [
                'auth_return_url=',
                'Path=/',
                'Max-Age=-1'
            ];
        } else {
            // Use the environment's shared domain to match the cookie set by Angular app
            cookieSettings = [
                'auth_return_url=',
                'Path=/',
                'Max-Age=-1',
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cookieDomain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sharedCookieAttributes"])()
            ];
        }
        document.cookie = cookieSettings.join('; ');
    };
    // Helper function to fetch profile with retry logic
    const fetchProfileWithRetry = async function(authToken) {
        let maxRetries = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 3;
        for(let attempt = 1; attempt <= maxRetries; attempt++){
            try {
                console.log("[callback] Profile fetch attempt ".concat(attempt, "/").concat(maxRetries));
                const response = await fetch("".concat(("TURBOPACK compile-time value", "https://api.foresighta.co"), "/api/account/profile"), {
                    headers: {
                        'Authorization': "Bearer ".concat(authToken),
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Accept-Language": locale,
                        "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone
                    }
                });
                console.log("[callback] Profile fetch response (attempt ".concat(attempt, "):"), {
                    status: response.status,
                    ok: response.ok,
                    statusText: response.statusText
                });
                if (!response.ok) {
                    // For auth errors, don't retry
                    if (response.status === 401 || response.status === 403) {
                        throw new Error("Authentication failed: ".concat(response.status, " ").concat(response.statusText));
                    }
                    // For rate limiting, don't retry — it makes things worse
                    if (response.status === 429) {
                        throw new Error("Rate limited: ".concat(response.status, " ").concat(response.statusText));
                    }
                    // For other errors, retry if not the last attempt
                    if (attempt < maxRetries) {
                        const delay = Math.pow(2, attempt - 1) * 1000; // Exponential backoff
                        console.log("[callback] Request failed, retrying in ".concat(delay, "ms..."));
                        await new Promise((resolve)=>setTimeout(resolve, delay));
                        continue;
                    }
                    throw new Error("Failed to fetch profile: ".concat(response.status, " ").concat(response.statusText));
                }
                return await response.json();
            } catch (error) {
                console.error("[callback] Attempt ".concat(attempt, " failed:"), error);
                // If it's an auth/rate-limit error or the last attempt, re-throw
                if (error instanceof Error && (error.message.includes('Authentication failed') || error.message.includes('Rate limited')) || attempt === maxRetries) {
                    throw error;
                }
                // Otherwise, continue to next attempt
                const delay = Math.pow(2, attempt - 1) * 1000;
                await new Promise((resolve)=>setTimeout(resolve, delay));
            }
        }
        throw new Error('Failed to fetch profile after all retry attempts');
    };
    const checkLatestAgreement = async (authToken, lang)=>{
        try {
            var _data_data;
            const res = await fetch("".concat(("TURBOPACK compile-time value", "https://api.foresighta.co"), "/api/account/agreement/check"), {
                headers: {
                    'Authorization': "Bearer ".concat(authToken),
                    'Accept': 'application/json',
                    'Accept-Language': lang
                }
            });
            if (!res.ok) return true;
            const data = await res.json();
            return !!(data === null || data === void 0 ? void 0 : (_data_data = data.data) === null || _data_data === void 0 ? void 0 : _data_data.accept);
        } catch (e) {
            return true;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$FullScreenLoader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                message: currentLocale === 'ar' ? 'جاري تسجيل الدخول...' : 'Signing you in...'
            }, void 0, false, {
                fileName: "[project]/app/[locale]/callback/page.tsx",
                lineNumber: 520,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$agreements$2f$AgreementModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                opened: showAgreement,
                onClose: ()=>{
                    // proceed even if user cancels/closes
                    setLoading(true);
                    if (postAcceptUser) void handleRedirect(postAcceptUser);
                },
                onAccepted: ()=>{
                    setLoading(true);
                    if (postAcceptUser) void handleRedirect(postAcceptUser);
                },
                locale: locale
            }, void 0, false, {
                fileName: "[project]/app/[locale]/callback/page.tsx",
                lineNumber: 522,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(QueryParamAuthCallback, "5t/9wUNbuQqwopSVzNJuICCM+mA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$GlobalProfileProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobalProfile"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"]
    ];
});
_c = QueryParamAuthCallback;
var _c;
__turbopack_context__.k.register(_c, "QueryParamAuthCallback");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_41e984b0._.js.map