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
    "archiveReceivedMeeting",
    ()=>archiveReceivedMeeting,
    "archiveSentMeeting",
    ()=>archiveSentMeeting,
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
    "getReceivedMeetings",
    ()=>getReceivedMeetings,
    "getSentMeetings",
    ()=>getSentMeetings,
    "getSentMeetingsList",
    ()=>getSentMeetingsList,
    "getUserRequests",
    ()=>getUserRequests,
    "getUserRequestsPage",
    ()=>getUserRequestsPage,
    "getWalletBalance",
    ()=>getWalletBalance,
    "getWalletStatistics",
    ()=>getWalletStatistics,
    "getWalletTransactions",
    ()=>getWalletTransactions,
    "removeReadLaterItem",
    ()=>removeReadLaterItem,
    "resendRequest",
    ()=>resendRequest,
    "setMyKnowledgeStatus",
    ()=>setMyKnowledgeStatus,
    "setPackageStatus",
    ()=>setPackageStatus,
    "updateInsighterRequestStatus",
    ()=>updateInsighterRequestStatus,
    "updateMeetingAction",
    ()=>updateMeetingAction
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
    const res = await apiRequest('/account/wallet/balance', {
        locale
    });
    var _res_data_balance;
    return Number((_res_data_balance = res === null || res === void 0 ? void 0 : (_res_data = res.data) === null || _res_data === void 0 ? void 0 : _res_data.balance) !== null && _res_data_balance !== void 0 ? _res_data_balance : 0);
}
async function getWalletTransactions(locale) {
    let page = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1, perPage = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 10, period = arguments.length > 3 ? arguments[3] : void 0;
    return apiRequest('/account/wallet/transaction', {
        locale,
        params: {
            page,
            per_page: perPage,
            per_time: period
        }
    });
}
async function getWalletStatistics(locale, period) {
    var _res_data;
    const res = await apiRequest('/account/wallet/statistics', {
        locale,
        params: {
            per_time: period
        }
    });
    var _res_data_period;
    return (_res_data_period = (_res_data = res.data) === null || _res_data === void 0 ? void 0 : _res_data[period]) !== null && _res_data_period !== void 0 ? _res_data_period : {};
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
async function getReceivedMeetings(locale) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var _options_page, _options_perPage;
    return apiRequest('/insighter/meeting/list', {
        locale,
        params: {
            page: (_options_page = options.page) !== null && _options_page !== void 0 ? _options_page : 1,
            per_page: (_options_perPage = options.perPage) !== null && _options_perPage !== void 0 ? _options_perPage : 10,
            date_status: options.archived ? undefined : options.dateStatus,
            archived: options.archived ? 'true' : undefined
        }
    });
}
async function getSentMeetingsList(locale) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var _options_page, _options_perPage;
    return apiRequest('/account/meeting/client/list', {
        locale,
        params: {
            page: (_options_page = options.page) !== null && _options_page !== void 0 ? _options_page : 1,
            per_page: (_options_perPage = options.perPage) !== null && _options_perPage !== void 0 ? _options_perPage : 10,
            date_status: options.archived ? undefined : options.dateStatus,
            archived: options.archived ? 'true' : undefined
        }
    });
}
async function updateMeetingAction(locale, meetingUuid, status, notes) {
    await apiRequest("/insighter/meeting/action/".concat(meetingUuid), {
        locale,
        method: 'POST',
        body: {
            status,
            notes
        }
    });
}
async function archiveReceivedMeeting(locale, meetingUuid) {
    await apiRequest("/insighter/meeting/archive/".concat(meetingUuid), {
        locale,
        method: 'POST',
        body: {}
    });
}
async function archiveSentMeeting(locale, meetingUuid) {
    await apiRequest("/account/meeting/archive/".concat(meetingUuid), {
        locale,
        method: 'POST',
        body: {}
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MyMeetingsClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/index.react-client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Modal/Modal.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCalendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCalendar$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCalendar.mjs [app-client] (ecmascript) <export default as IconCalendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconVideo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconVideo$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconVideo.mjs [app-client] (ecmascript) <export default as IconVideo>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArchive$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArchive$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconArchive.mjs [app-client] (ecmascript) <export default as IconArchive>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconClock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconClock$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconClock.mjs [app-client] (ecmascript) <export default as IconClock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$insighter$2d$dashboard$2f$PageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/insighter-dashboard/PageHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/toast/ToastContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$GlobalProfileProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/GlobalProfileProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$insighter$2d$dashboard$2f$nav$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/insighter-dashboard/nav-config.ts [app-client] (ecmascript)");
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
function statusBadge(status) {
    switch(status){
        case 'approved':
            return 'bg-[#DFFEE9] text-[#1BC653]';
        case 'pending':
            return 'bg-amber-50 text-amber-600';
        case 'postponed':
            return 'bg-[#EFF8FF] text-[#299AF8]';
        default:
            return 'bg-gray-100 text-gray-500';
    }
}
function MyMeetingsInner() {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('InsighterDashboard.myMeetings');
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const { roles } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$GlobalProfileProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobalProfile"])();
    const clientOnly = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$insighter$2d$dashboard$2f$nav$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isClientOnly"])(roles);
    const tabParam = (searchParams.get('tab') || '').toLowerCase();
    const initialTab = clientOnly || tabParam === 'my-meetings' || tabParam === 'sent' ? 'sent' : 'received';
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialTab);
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('coming');
    const [meetings, setMeetings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [meta, setMeta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [action, setAction] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [notes, setNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // If roles resolve to client-only after mount, force sent tab
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MyMeetingsInner.useEffect": ()=>{
            if (clientOnly && tab === 'received') setTab('sent');
        }
    }["MyMeetingsInner.useEffect"], [
        clientOnly,
        tab
    ]);
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MyMeetingsInner.useCallback[load]": (mainTab, dateFilter, page)=>{
            setLoading(true);
            const options = {
                page,
                perPage: 10,
                dateStatus: dateFilter === 'archived' ? undefined : dateFilter,
                archived: dateFilter === 'archived'
            };
            const fetcher = mainTab === 'received' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$insighter$2d$dashboard$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getReceivedMeetings"])(locale, options) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$insighter$2d$dashboard$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSentMeetingsList"])(locale, options);
            fetcher.then({
                "MyMeetingsInner.useCallback[load]": (res)=>{
                    var _res_data;
                    setMeetings((_res_data = res.data) !== null && _res_data !== void 0 ? _res_data : []);
                    var _res_meta;
                    setMeta((_res_meta = res.meta) !== null && _res_meta !== void 0 ? _res_meta : null);
                }
            }["MyMeetingsInner.useCallback[load]"]).catch({
                "MyMeetingsInner.useCallback[load]": (err)=>toast.handleServerErrors(err)
            }["MyMeetingsInner.useCallback[load]"]).finally({
                "MyMeetingsInner.useCallback[load]": ()=>setLoading(false)
            }["MyMeetingsInner.useCallback[load]"]);
        }
    }["MyMeetingsInner.useCallback[load]"], // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        locale
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MyMeetingsInner.useEffect": ()=>{
            load(tab, filter, 1);
        }
    }["MyMeetingsInner.useEffect"], [
        tab,
        filter,
        load
    ]);
    const switchTab = (next)=>{
        setTab(next);
        setFilter('coming');
        router.replace("?tab=".concat(next === 'received' ? 'client' : 'my-meetings'), {
            scroll: false
        });
    };
    const runAction = async ()=>{
        if (!action || !notes.trim()) return;
        setBusy(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$insighter$2d$dashboard$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateMeetingAction"])(locale, action.meeting.uuid, action.kind, notes);
            toast.success(action.kind === 'approved' ? t('approveSuccess') : t('postponeSuccess'));
            setAction(null);
            setNotes('');
            var _meta_current_page;
            load(tab, filter, (_meta_current_page = meta === null || meta === void 0 ? void 0 : meta.current_page) !== null && _meta_current_page !== void 0 ? _meta_current_page : 1);
        } catch (err) {
            toast.handleServerErrors(err);
        } finally{
            setBusy(false);
        }
    };
    const archive = async (meeting)=>{
        try {
            if (tab === 'received') await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$insighter$2d$dashboard$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["archiveReceivedMeeting"])(locale, meeting.uuid);
            else await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$insighter$2d$dashboard$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["archiveSentMeeting"])(locale, meeting.uuid);
            toast.success(t('archiveSuccess'));
            var _meta_current_page;
            load(tab, filter, (_meta_current_page = meta === null || meta === void 0 ? void 0 : meta.current_page) !== null && _meta_current_page !== void 0 ? _meta_current_page : 1);
        } catch (err) {
            toast.handleServerErrors(err);
        }
    };
    const person = (m)=>tab === 'received' ? m.client : m.insighter;
    const dateFormat = new Intl.DateTimeFormat(locale === 'ar' ? 'ar' : 'en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    const formatDay = (value)=>{
        const parsed = Date.parse(value);
        return Number.isNaN(parsed) ? value : dateFormat.format(parsed);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$insighter$2d$dashboard$2f$PageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCalendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCalendar$3e$__["IconCalendar"], {
                    size: 22
                }, void 0, false, {
                    fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                    lineNumber: 155,
                    columnNumber: 15
                }, void 0),
                title: t('title'),
                tabs: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        !clientOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$insighter$2d$dashboard$2f$PageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeaderTab"], {
                            active: tab === 'received',
                            onClick: ()=>switchTab('received'),
                            children: t('tabs.received')
                        }, void 0, false, {
                            fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                            lineNumber: 160,
                            columnNumber: 15
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$insighter$2d$dashboard$2f$PageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeaderTab"], {
                            active: tab === 'sent',
                            onClick: ()=>switchTab('sent'),
                            children: t('tabs.sent')
                        }, void 0, false, {
                            fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                            lineNumber: 164,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border border-gray-200 bg-white p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 flex flex-wrap gap-2",
                        children: [
                            'coming',
                            'past',
                            'archived'
                        ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setFilter(f),
                                className: "rounded-full border px-3 py-1 text-xs font-semibold transition-colors ".concat(filter === f ? 'border-sky-500 bg-sky-50 text-sky-600' : 'border-gray-200 text-gray-500 hover:border-gray-300'),
                                children: t("filters.".concat(f))
                            }, f, false, {
                                fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                                lineNumber: 175,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this),
                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex min-h-[200px] items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"
                        }, void 0, false, {
                            fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                            lineNumber: 192,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                        lineNumber: 191,
                        columnNumber: 11
                    }, this) : meetings.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center gap-2 py-16 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCalendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCalendar$3e$__["IconCalendar"], {
                                size: 40,
                                className: "text-gray-300"
                            }, void 0, false, {
                                fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                                lineNumber: 196,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500",
                                children: t('empty')
                            }, void 0, false, {
                                fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                                lineNumber: 197,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                        lineNumber: 195,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-3",
                        children: meetings.map((m)=>{
                            const p = person(m);
                            var _p_name;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-100 p-4 hover:border-gray-300",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex min-w-0 flex-1 items-center gap-3",
                                        children: [
                                            (p === null || p === void 0 ? void 0 : p.profile_photo_url) ? // eslint-disable-next-line @next/next/no-img-element
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: p.profile_photo_url,
                                                alt: "",
                                                className: "h-10 w-10 shrink-0 rounded-full object-cover"
                                            }, void 0, false, {
                                                fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                                                lineNumber: 211,
                                                columnNumber: 23
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sm font-bold text-sky-600",
                                                children: String((_p_name = p === null || p === void 0 ? void 0 : p.name) !== null && _p_name !== void 0 ? _p_name : '?').charAt(0)
                                            }, void 0, false, {
                                                fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                                                lineNumber: 217,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "truncate text-sm font-bold text-gray-800",
                                                        children: m.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                                                        lineNumber: 222,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    t('with'),
                                                                    " ",
                                                                    p === null || p === void 0 ? void 0 : p.name
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                                                                lineNumber: 224,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "inline-flex items-center gap-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCalendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCalendar$3e$__["IconCalendar"], {
                                                                        size: 12
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                                                                        lineNumber: 228,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    formatDay(m.date)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                                                                lineNumber: 227,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "inline-flex items-center gap-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconClock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconClock$3e$__["IconClock"], {
                                                                        size: 12
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                                                                        lineNumber: 232,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    m.start_time,
                                                                    "–",
                                                                    m.end_time
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                                                                lineNumber: 231,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                                                        lineNumber: 223,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                                                lineNumber: 221,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                                        lineNumber: 208,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "rounded-full px-2.5 py-1 text-xs font-bold ".concat(statusBadge(m.status)),
                                                children: t.has("status.".concat(m.status)) ? t("status.".concat(m.status)) : m.status
                                            }, void 0, false, {
                                                fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                                                lineNumber: 240,
                                                columnNumber: 21
                                            }, this),
                                            m.status === 'approved' && !!m.meeting_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: m.meeting_url,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "inline-flex items-center gap-1 rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-600",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconVideo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconVideo$3e$__["IconVideo"], {
                                                        size: 14
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                                                        lineNumber: 253,
                                                        columnNumber: 25
                                                    }, this),
                                                    t('join')
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                                                lineNumber: 247,
                                                columnNumber: 23
                                            }, this),
                                            tab === 'received' && m.status === 'pending' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setAction({
                                                                meeting: m,
                                                                kind: 'approved'
                                                            }),
                                                        className: "rounded-lg border border-green-500 px-3 py-1.5 text-xs font-semibold text-green-600 hover:bg-green-50",
                                                        children: t('approve')
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                                                        lineNumber: 260,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setAction({
                                                                meeting: m,
                                                                kind: 'postponed'
                                                            }),
                                                        className: "rounded-lg border border-amber-500 px-3 py-1.5 text-xs font-semibold text-amber-600 hover:bg-amber-50",
                                                        children: t('postpone')
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                                                        lineNumber: 267,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true),
                                            filter !== 'archived' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                title: t('archive'),
                                                onClick: ()=>archive(m),
                                                className: "rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconArchive$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconArchive$3e$__["IconArchive"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                                                    lineNumber: 284,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                                                lineNumber: 278,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                                        lineNumber: 239,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, m.uuid, true, {
                                fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                                lineNumber: 204,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                        lineNumber: 200,
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
                                fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                                lineNumber: 296,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-1",
                                children: Array.from({
                                    length: meta.last_page
                                }, (_, i)=>i + 1).map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>load(tab, filter, p),
                                        className: "min-w-[28px] rounded-md px-1.5 py-1 text-xs font-medium ".concat(p === meta.current_page ? 'bg-sky-500 text-white' : 'text-gray-600 hover:bg-gray-100'),
                                        children: p
                                    }, p, false, {
                                        fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                                        lineNumber: 301,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                                lineNumber: 299,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                        lineNumber: 295,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Modal$2f$Modal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
                opened: !!action,
                onClose: ()=>!busy && setAction(null),
                title: (action === null || action === void 0 ? void 0 : action.kind) === 'approved' ? t('approve') : t('postpone'),
                centered: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "mb-1 block text-xs font-bold uppercase text-gray-400",
                        children: t('notes')
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                        lineNumber: 324,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        value: notes,
                        onChange: (e)=>setNotes(e.target.value),
                        placeholder: t('notesPlaceholder'),
                        rows: 3,
                        className: "w-full rounded-lg border border-gray-200 p-3 text-sm outline-none focus:border-sky-400"
                    }, void 0, false, {
                        fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                        lineNumber: 325,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex justify-end gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                disabled: busy,
                                onClick: ()=>setAction(null),
                                className: "rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50",
                                children: t('cancel')
                            }, void 0, false, {
                                fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                                lineNumber: 333,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                disabled: busy || !notes.trim(),
                                onClick: runAction,
                                className: "rounded-lg px-4 py-2 text-sm font-semibold text-white ".concat((action === null || action === void 0 ? void 0 : action.kind) === 'approved' ? 'bg-green-500 hover:bg-green-600' : 'bg-amber-500 hover:bg-amber-600', " ").concat(busy || !notes.trim() ? 'opacity-60' : ''),
                                children: t('confirm')
                            }, void 0, false, {
                                fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                                lineNumber: 341,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                        lineNumber: 332,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                lineNumber: 318,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
        lineNumber: 153,
        columnNumber: 5
    }, this);
}
_s(MyMeetingsInner, "p1qH1KExD1/guujH/4PgI510C3s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$GlobalProfileProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobalProfile"]
    ];
});
_c = MyMeetingsInner;
function MyMeetingsClient() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex min-h-[40vh] items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-10 w-10 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"
            }, void 0, false, {
                fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
                lineNumber: 365,
                columnNumber: 11
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
            lineNumber: 364,
            columnNumber: 9
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MyMeetingsInner, {}, void 0, false, {
            fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
            lineNumber: 369,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/insighter-dashboard/my-meetings/MyMeetingsClient.tsx",
        lineNumber: 362,
        columnNumber: 5
    }, this);
}
_c1 = MyMeetingsClient;
var _c, _c1;
__turbopack_context__.k.register(_c, "MyMeetingsInner");
__turbopack_context__.k.register(_c1, "MyMeetingsClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_3417de1b._.js.map