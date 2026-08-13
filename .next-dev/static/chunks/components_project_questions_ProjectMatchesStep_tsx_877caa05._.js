(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/project/questions/ProjectMatchesStep.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectMatchesStep
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$CheckBadgeIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckBadgeIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/solid/esm/CheckBadgeIcon.js [app-client] (ecmascript) <export default as CheckBadgeIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$ChevronDownIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/solid/esm/ChevronDownIcon.js [app-client] (ecmascript) <export default as ChevronDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectApiError.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalSubmit$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectProposalSubmit.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalMatchUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectProposalMatchUuid.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/projectRequestUuid.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectStepErrorToast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/useProjectWizardNavigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/project/wizardStorage.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
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
const MATCH_LOADER_DURATION_MS = 10000;
const loaderMatchCards = [
    {
        insighter: {
            uuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
            name: 'Rami Hamam',
            profile_photo_url: 'https://knoldg-common.s3.us-east-1.amazonaws.com/user/116/profile/1764053205_Rami Hamam-2025.png',
            roles: [
                'client',
                'insighter'
            ],
            country: {
                id: 79,
                name: 'Jordan',
                flag: 'jordan'
            }
        }
    },
    {
        insighter: {
            uuid: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
            name: 'Dr. Mohammed Ruzayqat',
            profile_photo_url: null,
            roles: [
                'client',
                'insighter'
            ],
            country: {
                id: 127,
                name: 'Germany',
                flag: 'germany'
            }
        }
    },
    {
        insighter: {
            uuid: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
            name: 'Samara Qamar',
            profile_photo_url: null,
            roles: [
                'client',
                'insighter'
            ],
            country: {
                id: 79,
                name: 'Jordan',
                flag: 'jordan'
            }
        }
    },
    {
        insighter: {
            uuid: 'd4e5f6a7-b8c9-0123-defa-234567890123',
            name: 'Dr.NASIM ZOMOT',
            profile_photo_url: 'https://knoldg-common.s3.us-east-1.amazonaws.com/user/115/profile/1764018116_WhatsApp Image 2025-11-25 at 00.01.36.jpeg',
            roles: [
                'client',
                'insighter'
            ],
            country: {
                id: 97,
                name: 'Saudi Arabia',
                flag: 'saudi-arabia'
            }
        }
    },
    {
        insighter: {
            uuid: 'e1f2a3b4-c5d6-7890-efab-123456789012',
            name: 'Mohammad Tamalli',
            profile_photo_url: 'https://knoldg-common.s3.us-east-1.amazonaws.com/user/119/profile/1764175593_1758390021329.jpg',
            roles: [
                'client',
                'insighter'
            ],
            country: {
                id: 79,
                name: 'Jordan',
                flag: 'jordan'
            }
        }
    },
    {
        insighter: {
            uuid: 'a3b4c5d6-e7f8-9012-abcd-345678901234',
            name: 'maalikchina',
            profile_photo_url: null,
            roles: [
                'client',
                'insighter'
            ],
            country: {
                id: 97,
                name: 'Saudi Arabia',
                flag: 'saudi-arabia'
            }
        }
    },
    {
        insighter: {
            uuid: 'e5f6a7b8-c9d0-1234-efab-345678901234',
            name: 'Khaled Khraisat',
            profile_photo_url: 'https://knoldg-common.s3.us-east-1.amazonaws.com/user/268/profile/1774433730_20240914_233048.jpg',
            roles: [
                'client',
                'company'
            ],
            country: {
                id: 79,
                name: 'Jordan',
                flag: 'jordan'
            },
            company: {
                uuid: 'f6a7b8c9-d0e1-2345-fabc-456789012345',
                legal_name: 'ACADEMIA INDUSTRY PLATFORM',
                logo: 'https://knoldg-common.s3.us-east-1.amazonaws.com/insighter/company/6/logo/1774434781_high resolution .jpg',
                verified: true
            }
        }
    },
    {
        insighter: {
            uuid: 'a7b8c9d0-e1f2-3456-abcd-567890123456',
            name: 'Dr. Nasim Zomot',
            profile_photo_url: 'https://knoldg-common.s3.us-east-1.amazonaws.com/user/139/profile/1773524319_WhatsApp Image 2025-11-25 at 00.01.36.jpeg',
            roles: [
                'client',
                'company'
            ],
            country: {
                id: 108,
                name: 'United Arab Emirates',
                flag: 'united-arab-emirates'
            },
            company: {
                uuid: 'b8c9d0e1-f2a3-4567-bcde-678901234567',
                legal_name: 'FORESIGHTA CONSULTING',
                logo: 'https://knoldg-common.s3.us-east-1.amazonaws.com/insighter/company/5/logo/1773523880_foresighta_logo_icon_359X355_colored.jpg',
                verified: true
            }
        }
    },
    {
        insighter: {
            uuid: 'c9d0e1f2-a3b4-5678-cdef-789012345678',
            name: 'د. نسيم زعمط',
            profile_photo_url: 'https://knoldg-common.s3.us-east-1.amazonaws.com/user/140/profile/1767809948_WhatsApp Image 2024-05-27 at 09.31.04.jpeg',
            roles: [
                'client',
                'company'
            ],
            country: {
                id: 97,
                name: 'Saudi Arabia',
                flag: 'saudi-arabia'
            },
            company: {
                uuid: 'd0e1f2a3-b4c5-6789-defa-890123456789',
                legal_name: 'نظم المستقبل للاستشارات',
                logo: 'https://knoldg-common.s3.us-east-1.amazonaws.com/insighter/company/3/logo/1767808147_fs logo small.jpeg',
                verified: true
            }
        }
    }
];
function readStorageValue(locale, key) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return window.sessionStorage.getItem(key) || '';
    } catch (e) {
        return '';
    }
}
function normalizeValue(value) {
    return String(value || '').trim().toLowerCase();
}
function stringifyValue(value) {
    if (value === null || value === undefined) return '';
    return String(value).trim();
}
function coerceScore(value) {
    const score = typeof value === 'number' ? value : Number(value);
    return Number.isFinite(score) ? score : 0;
}
function clampScore(score) {
    return Math.min(Math.max(score, 0), 1);
}
function getFinalMatchScore(match) {
    var _match_matches_score;
    var _match_matches_score_final_score;
    return coerceScore((_match_matches_score_final_score = (_match_matches_score = match.matches_score) === null || _match_matches_score === void 0 ? void 0 : _match_matches_score.final_score) !== null && _match_matches_score_final_score !== void 0 ? _match_matches_score_final_score : match.match_score);
}
function formatScorePercent(score) {
    return "".concat(Math.round(clampScore(score) * 100), "%");
}
function getDisplayName(locale, value) {
    const localizedName = value.names || (value.name && typeof value.name === 'object' ? value.name : null);
    const plainName = typeof value.name === 'string' ? value.name : '';
    if (locale === 'ar') {
        return (localizedName === null || localizedName === void 0 ? void 0 : localizedName.ar) || plainName || (localizedName === null || localizedName === void 0 ? void 0 : localizedName.en) || '';
    }
    return (localizedName === null || localizedName === void 0 ? void 0 : localizedName.en) || plainName || (localizedName === null || localizedName === void 0 ? void 0 : localizedName.ar) || '';
}
async function fetchMatchedInsighters(locale, projectUuid, signal) {
    var _json_unsubmitted;
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
    if (!token) {
        throw new Error(locale === 'ar' ? 'يلزم تسجيل الدخول للبحث عن المطابقات.' : 'Login is required to search for matches.');
    }
    const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/account/project/proposal/match/list/".concat(projectUuid)), {
        method: 'GET',
        headers: {
            Authorization: "Bearer ".concat(token),
            Accept: 'application/json',
            'Accept-Language': locale === 'ar' ? 'ar' : 'en',
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        cache: 'no-store',
        signal
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertProjectApiResponse"])(res);
    const json = await res.json();
    const group = (_json_unsubmitted = json.unsubmitted) === null || _json_unsubmitted === void 0 ? void 0 : _json_unsubmitted[0];
    if (group) {
        var _group_matches;
        return {
            proposalMatchUuid: stringifyValue(group.proposal_uuid),
            matches: (_group_matches = group.matches) !== null && _group_matches !== void 0 ? _group_matches : []
        };
    }
    return {
        proposalMatchUuid: '',
        matches: []
    };
}
function normalizePreferredInsighterTypeSelection(value) {
    const normalized = normalizeValue(value);
    if (normalized === 'company' || normalized === 'شركة') return 'Company';
    if (normalized === 'either' || normalized === 'any' || normalized === 'كلاهما') {
        return 'Either';
    }
    return 'Individual';
}
function isCompanyLikeInsighter(roles) {
    return (roles || []).some((role)=>{
        const normalized = normalizeValue(role);
        return normalized === 'company' || normalized === 'company-insighter';
    });
}
function filterLoaderCardsByPreferredType(cards, preferredType) {
    if (preferredType === 'Either') return cards;
    if (preferredType === 'Company') {
        return cards.filter((card)=>isCompanyLikeInsighter(card.insighter.roles));
    }
    return cards.filter((card)=>!isCompanyLikeInsighter(card.insighter.roles));
}
function filterMatchedInsightersByPreferredType(matches, preferredType) {
    if (preferredType === 'Either') return matches;
    return matches.filter((match)=>preferredType === 'Company' ? isCompanyLikeInsighter(match.insighter.roles) : !isCompanyLikeInsighter(match.insighter.roles));
}
function getInitials(name) {
    let maxLetters = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
    const cleaned = String(name || '').trim();
    if (!cleaned) return '';
    const parts = cleaned.split(/\s+/).filter(Boolean);
    if (parts.length === 1) {
        return Array.from(parts[0]).slice(0, maxLetters).join('').toUpperCase();
    }
    return parts.slice(0, maxLetters).map((part)=>Array.from(part)[0] || '').join('').toUpperCase();
}
function formatMatchStatus(locale, value) {
    const normalized = stringifyValue(value);
    if (!normalized) return '';
    const text = normalized.split('_').map((part)=>part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(' ');
    if (locale !== 'ar') return text;
    const labels = {
        invited: 'تمت الدعوة',
        pending: 'قيد الانتظار',
        accepted: 'مقبول',
        rejected: 'مرفوض'
    };
    return labels[normalizeValue(value)] || text;
}
function getInsighterProfileHref(locale, insighterUuid) {
    return "/".concat(locale, "/profile/").concat(insighterUuid, "?entity=insighter");
}
function getCompanyProfileHref(locale, companyUuid) {
    return "/".concat(locale, "/profile/").concat(companyUuid);
}
function getLoaderCardPositionClass(index, activeIndex, total) {
    if (total <= 1) return 'translate-y-0 scale-100 opacity-100 z-30';
    const previousIndex = (activeIndex - 1 + total) % total;
    const nextIndex = (activeIndex + 1) % total;
    if (index === activeIndex) return 'translate-y-0 scale-100 opacity-100 z-30';
    if (index === previousIndex) return '-translate-y-[92px] scale-[0.9] opacity-25 z-10';
    if (index === nextIndex) return 'translate-y-[92px] scale-[0.9] opacity-25 z-10';
    return index < activeIndex ? '-translate-y-[156px] scale-[0.84] opacity-0 z-0' : 'translate-y-[156px] scale-[0.84] opacity-0 z-0';
}
function MatchAvatar(param) {
    let { name, profileImage, companyLogo, isCompany, size = 72 } = param;
    const overlaySize = Math.max(30, Math.round(size * 0.36));
    const mainImage = isCompany ? companyLogo : profileImage;
    const overlayImage = isCompany ? null : companyLogo;
    const shouldShowOverlay = Boolean(overlayImage) && overlayImage !== mainImage;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative shrink-0",
        style: {
            width: size,
            height: size
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-[#3B82F6]/80 bg-white/35 backdrop-blur-md",
                children: mainImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: mainImage,
                    alt: name,
                    width: size,
                    height: size,
                    className: "h-full w-full object-cover object-top"
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                    lineNumber: 473,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-base font-semibold text-slate-500",
                    children: getInitials(name)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                    lineNumber: 481,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                lineNumber: 471,
                columnNumber: 7
            }, this),
            shouldShowOverlay ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-[-16px] right-0 overflow-hidden rounded-full border-[3px] border-white/90 bg-white/80",
                style: {
                    width: overlaySize,
                    height: overlaySize
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: overlayImage,
                    alt: "".concat(name, " secondary"),
                    width: overlaySize,
                    height: overlaySize,
                    className: "h-full w-full object-cover"
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                    lineNumber: 490,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                lineNumber: 486,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
        lineNumber: 470,
        columnNumber: 5
    }, this);
}
_c = MatchAvatar;
function MatchLoader(param) {
    let { cards, activeIndex, isRTL } = param;
    if (cards.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative mt-1 h-[400px] overflow-hidden top-[-70px]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-x-0 top-1/2 -translate-y-1/2",
                children: cards.map((card, index)=>{
                    var _card_insighter_company, _card_insighter_country, _card_insighter_company1, _card_insighter_company2;
                    const isCompany = isCompanyLikeInsighter(card.insighter.roles);
                    const companyName = stringifyValue((_card_insighter_company = card.insighter.company) === null || _card_insighter_company === void 0 ? void 0 : _card_insighter_company.legal_name);
                    const displayName = isCompany ? companyName || (isRTL ? 'شركة' : 'Company') : card.insighter.name;
                    const countryName = card.insighter.country ? getDisplayName(isRTL ? 'ar' : 'en', card.insighter.country) : '';
                    const countryFlag = stringifyValue((_card_insighter_country = card.insighter.country) === null || _card_insighter_country === void 0 ? void 0 : _card_insighter_country.flag);
                    const showVerifiedBadge = Boolean((_card_insighter_company1 = card.insighter.company) === null || _card_insighter_company1 === void 0 ? void 0 : _card_insighter_company1.verified);
                    const isActiveCard = index === activeIndex;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none absolute inset-x-0 transition-all duration-700 ease-out ".concat(getLoaderCardPositionClass(index, activeIndex, cards.length)),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto flex items-center gap-3 rounded-[24px] border px-4 py-3.5 backdrop-blur-md transition-all duration-700 sm:px-5 ".concat(isActiveCard ? 'max-w-3xl border-[#E3EBF8] bg-[#EEF4FF]' : 'max-w-[640px] border-white/80 bg-white/92'),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MatchAvatar, {
                                    name: displayName,
                                    profileImage: card.insighter.profile_photo_url,
                                    companyLogo: (_card_insighter_company2 = card.insighter.company) === null || _card_insighter_company2 === void 0 ? void 0 : _card_insighter_company2.logo,
                                    isCompany: isCompany,
                                    size: 72
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                    lineNumber: 546,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0 flex-1 ".concat(isRTL ? 'text-right' : ''),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-center gap-2 ".concat(isRTL ? 'justify-end' : 'justify-start'),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "truncate text-base font-semibold tracking-tight text-slate-950 sm:text-lg",
                                                    children: displayName
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                    lineNumber: 558,
                                                    columnNumber: 23
                                                }, this),
                                                showVerifiedBadge ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$CheckBadgeIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckBadgeIcon$3e$__["CheckBadgeIcon"], {
                                                    className: "h-4 w-4 shrink-0 text-[#3B82F6]",
                                                    "aria-hidden": "true"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                    lineNumber: 562,
                                                    columnNumber: 25
                                                }, this) : null,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ".concat(isCompany ? 'bg-sky-100/90 text-sky-600' : 'bg-emerald-100/90 text-emerald-600'),
                                                    children: isCompany ? 'Company' : 'INSIGHTER'
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                    lineNumber: 564,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                            lineNumber: 555,
                                            columnNumber: 21
                                        }, this),
                                        countryName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2 flex items-center justify-start gap-2 text-[11px] text-slate-600 sm:text-xs",
                                            children: [
                                                countryFlag ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: "/images/flags/".concat(countryFlag, ".svg"),
                                                    alt: countryName,
                                                    width: 14,
                                                    height: 14,
                                                    className: "h-3.5 w-3.5 object-contain"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                    lineNumber: 576,
                                                    columnNumber: 27
                                                }, this) : null,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "truncate",
                                                    children: countryName
                                                }, void 0, false, {
                                                    fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                    lineNumber: 584,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                            lineNumber: 572,
                                            columnNumber: 23
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                    lineNumber: 554,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                            lineNumber: 540,
                            columnNumber: 17
                        }, this)
                    }, card.insighter.uuid, false, {
                        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                        lineNumber: 532,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                lineNumber: 517,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
            lineNumber: 516,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
        lineNumber: 515,
        columnNumber: 5
    }, this);
}
_c1 = MatchLoader;
function MatchScoreDonut(param) {
    let { score, isRTL } = param;
    const pct = Math.round(clampScore(score) * 100);
    const radius = 30;
    const stroke = 5;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - pct / 100);
    const size = (radius + stroke) * 2;
    const color = pct >= 80 ? '#22c55e' : pct >= 50 ? '#3b82f6' : '#f59e0b';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex shrink-0 flex-col items-center gap-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                style: {
                    width: size,
                    height: size
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        width: size,
                        height: size,
                        viewBox: "0 0 ".concat(size, " ").concat(size),
                        className: "-rotate-90",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: size / 2,
                                cy: size / 2,
                                r: radius,
                                fill: "none",
                                stroke: "#e2e8f0",
                                strokeWidth: stroke
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                lineNumber: 613,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: size / 2,
                                cy: size / 2,
                                r: radius,
                                fill: "none",
                                stroke: color,
                                strokeWidth: stroke,
                                strokeLinecap: "round",
                                strokeDasharray: circumference,
                                strokeDashoffset: offset,
                                style: {
                                    transition: 'stroke-dashoffset 0.6s ease'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                lineNumber: 621,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                        lineNumber: 612,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute inset-0 flex items-center justify-center text-sm font-bold",
                        style: {
                            color
                        },
                        children: [
                            pct,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                        lineNumber: 634,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                lineNumber: 611,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-center text-[10px] font-medium leading-tight text-slate-500",
                children: isRTL ? 'نسبة التطابق' : 'Matching Score'
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                lineNumber: 641,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
        lineNumber: 610,
        columnNumber: 5
    }, this);
}
_c2 = MatchScoreDonut;
const MATCH_CRITERIA_LABELS = {
    ORIGIN_MATCH: {
        en: 'Origin',
        ar: 'البلد'
    },
    INDUSTRY_MATCH: {
        en: 'Industry',
        ar: 'القطاع'
    },
    EXPERIENCE_MATCH: {
        en: 'Experience',
        ar: 'الخبرة'
    },
    TEAM_SIZE_MATCH: {
        en: 'Team size',
        ar: 'حجم الفريق'
    },
    INSIGHTER_TYPE_MATCH: {
        en: 'Insighter type',
        ar: 'نوع الخبير'
    },
    AI_EXPERTISE_MATCH: {
        en: 'Published expertise and knowledge match score',
        ar: 'نتيجة تطابق الخبرات والمعارف المنشورة'
    },
    MATCH_SERVICE: {
        en: 'Service',
        ar: 'الخدمة'
    }
};
function getMatchCriteriaLabel(key, isRTL) {
    const normalizedKey = key.toUpperCase();
    const label = MATCH_CRITERIA_LABELS[normalizedKey];
    if (label) return isRTL ? label.ar : label.en;
    return key.replace(/_MATCH$/, '').replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (c)=>c.toUpperCase());
}
function flattenMatchCriteria(matches) {
    return Object.entries(matches).flatMap((param)=>{
        let [key, value] = param;
        if (typeof value === 'boolean') return [
            [
                key,
                value
            ]
        ];
        if (value && typeof value === 'object') return flattenMatchCriteria(value);
        return [];
    });
}
function MatchCriteriaPanel(param) {
    let { matches, isRTL } = param;
    const entries = flattenMatchCriteria(matches);
    if (entries.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap gap-2 ".concat(isRTL ? 'flex-row-reverse' : ''),
        children: entries.map((param)=>{
            let [key, matched] = param;
            const label = getMatchCriteriaLabel(key, isRTL);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold ".concat(matched ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' : 'bg-slate-100 text-slate-500 ring-1 ring-slate-200'),
                children: [
                    matched ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "h-3 w-3 shrink-0",
                        viewBox: "0 0 12 12",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M6 0a6 6 0 100 12A6 6 0 006 0zm-.75 8.5L3 6.25l1-1L5.25 6.5 8 3.75l1 1L5.25 8.5z",
                            fill: "#16a34a"
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                            lineNumber: 703,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                        lineNumber: 702,
                        columnNumber: 15
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "h-3 w-3 shrink-0",
                        viewBox: "0 0 12 12",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M6 0a6 6 0 100 12A6 6 0 006 0zm2.5 8.25l-.75.75L6 7.25 4.25 9 3.5 8.25 5.25 6.5 3.5 4.75 4.25 4 6 5.75 7.75 4l.75.75L6.75 6.5z",
                            fill: "#94a3b8"
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                            lineNumber: 707,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                        lineNumber: 706,
                        columnNumber: 15
                    }, this),
                    label
                ]
            }, key, true, {
                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                lineNumber: 694,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
        lineNumber: 689,
        columnNumber: 5
    }, this);
}
_c3 = MatchCriteriaPanel;
const MATCH_SCORE_BREAKDOWN_LABELS = {
    ai_expertise_match_score: {
        en: 'Published expertise and insights match score',
        ar: 'نتيجة تطابق الخبرات والمعارف المنشورة',
        color: '#3b82f6',
        bg: 'bg-blue-500'
    },
    match_service_score: {
        en: 'Service match',
        ar: 'تطابق الخدمة',
        color: '#14b8a6',
        bg: 'bg-teal-500'
    },
    property_score: {
        en: 'Properties',
        ar: 'الخصائص',
        color: '#f59e0b',
        bg: 'bg-amber-500'
    }
};
function getScoreBreakdownItems(scores) {
    if (!scores) return [];
    return Object.keys(MATCH_SCORE_BREAKDOWN_LABELS).map((key)=>({
            key,
            ...MATCH_SCORE_BREAKDOWN_LABELS[key],
            score: coerceScore(scores[key])
        }));
}
function hasScoreBreakdown(scores) {
    if (!scores) return false;
    return Object.keys(MATCH_SCORE_BREAKDOWN_LABELS).some((key)=>scores[key] !== undefined && scores[key] !== null);
}
function MatchScoreBreakdownChart(param) {
    let { scores, isRTL } = param;
    const items = getScoreBreakdownItems(scores);
    const total = items.reduce((sum, item)=>sum + Math.max(item.score, 0), 0);
    var _scores_final_score;
    const finalScore = clampScore(coerceScore((_scores_final_score = scores.final_score) !== null && _scores_final_score !== void 0 ? _scores_final_score : total));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-[18px] border border-slate-100 bg-white/55 p-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 flex items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] font-semibold uppercase tracking-wide text-slate-400",
                        children: isRTL ? 'تفصيل النتيجة' : 'Score breakdown'
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                        lineNumber: 771,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-semibold text-slate-700",
                        children: formatScorePercent(finalScore)
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                        lineNumber: 774,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                lineNumber: 770,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-2 overflow-hidden rounded-full bg-slate-100",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex h-full overflow-hidden rounded-full",
                    style: {
                        width: "".concat(finalScore * 100, "%")
                    },
                    children: items.map((item)=>{
                        const width = total > 0 ? Math.max(item.score, 0) / total * 100 : 0;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: item.bg,
                            style: {
                                width: "".concat(width, "%")
                            },
                            "aria-hidden": "true"
                        }, item.key, false, {
                            fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                            lineNumber: 787,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                    lineNumber: 780,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                lineNumber: 779,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 space-y-2.5",
                children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-1 flex items-center justify-between gap-3 text-[11px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex min-w-0 items-center gap-1.5 font-medium text-slate-600",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "h-2 w-2 shrink-0 rounded-full",
                                                style: {
                                                    backgroundColor: item.color
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                lineNumber: 803,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "truncate",
                                                children: isRTL ? item.ar : item.en
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                lineNumber: 807,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                        lineNumber: 802,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "shrink-0 font-semibold text-slate-700",
                                        children: formatScorePercent(item.score)
                                    }, void 0, false, {
                                        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                        lineNumber: 809,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                lineNumber: 801,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-1.5 overflow-hidden rounded-full bg-slate-100",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full rounded-full ".concat(item.bg),
                                    style: {
                                        width: "".concat(clampScore(item.score) * 100, "%")
                                    },
                                    "aria-hidden": "true"
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                    lineNumber: 814,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                lineNumber: 813,
                                columnNumber: 13
                            }, this)
                        ]
                    }, item.key, true, {
                        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                        lineNumber: 800,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                lineNumber: 798,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
        lineNumber: 769,
        columnNumber: 5
    }, this);
}
_c4 = MatchScoreBreakdownChart;
function MatchedInsighterCard(param) {
    let { match, locale, isRTL, selected, onToggleSelected } = param;
    var _match_insighter_company, _match_insighter_company1, _match_insighter_country, _match_insighter_company2, _match_insighter_company3;
    _s();
    const [isExpanded, setIsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isCompany = isCompanyLikeInsighter(match.insighter.roles);
    const companyName = stringifyValue((_match_insighter_company = match.insighter.company) === null || _match_insighter_company === void 0 ? void 0 : _match_insighter_company.legal_name);
    const companyUuid = stringifyValue((_match_insighter_company1 = match.insighter.company) === null || _match_insighter_company1 === void 0 ? void 0 : _match_insighter_company1.uuid);
    const displayName = isCompany ? companyName || (isRTL ? 'شركة' : 'Company') : match.insighter.name;
    const countryName = match.insighter.country ? getDisplayName(locale, match.insighter.country) : '';
    const countryFlag = stringifyValue((_match_insighter_country = match.insighter.country) === null || _match_insighter_country === void 0 ? void 0 : _match_insighter_country.flag);
    const badgeLabel = isRTL ? isCompany ? 'شركة' : 'خبير' : isCompany ? 'Company' : 'INSIGHTER';
    const insighterHref = getInsighterProfileHref(locale, match.insighter.uuid);
    const companyHref = companyUuid ? getCompanyProfileHref(locale, companyUuid) : '';
    const profileHref = isCompany ? companyHref || getCompanyProfileHref(locale, match.insighter.uuid) : insighterHref;
    const showVerifiedBadge = Boolean((_match_insighter_company2 = match.insighter.company) === null || _match_insighter_company2 === void 0 ? void 0 : _match_insighter_company2.verified);
    const finalMatchScore = getFinalMatchScore(match);
    const hasMatches = Boolean(match.matches && flattenMatchCriteria(match.matches).length > 0);
    const hasBreakdown = hasScoreBreakdown(match.matches_score);
    const hasDetails = hasMatches || hasBreakdown;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "overflow-hidden rounded-[26px] border backdrop-blur-2xl transition-all duration-300 ".concat(selected ? 'border-sky-200/90 bg-white/55' : 'border-white/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.46),rgba(255,255,255,0.3))]'),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "cursor-pointer p-4 sm:p-5",
                onClick: onToggleSelected,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-3 text-start",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex self-start pt-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "checkbox",
                                    checked: selected,
                                    onChange: onToggleSelected,
                                    onClick: (event)=>event.stopPropagation(),
                                    className: "h-5 w-5 rounded border-slate-300 text-[#1C7CBB] focus:ring-2 focus:ring-blue-200",
                                    "aria-label": isRTL ? "تحديد ".concat(displayName) : "Select ".concat(displayName)
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                    lineNumber: 877,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                lineNumber: 876,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-1 items-start gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-1 items-start gap-4 rounded-[22px] text-start",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MatchAvatar, {
                                                name: displayName,
                                                profileImage: match.insighter.profile_photo_url,
                                                companyLogo: (_match_insighter_company3 = match.insighter.company) === null || _match_insighter_company3 === void 0 ? void 0 : _match_insighter_company3.logo,
                                                isCompany: isCompany,
                                                size: 72
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                lineNumber: 891,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "min-w-0 flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap items-center justify-start gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "truncate text-base font-semibold tracking-tight text-slate-950 sm:text-lg",
                                                                children: displayName
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                                lineNumber: 903,
                                                                columnNumber: 19
                                                            }, this),
                                                            showVerifiedBadge ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$CheckBadgeIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckBadgeIcon$3e$__["CheckBadgeIcon"], {
                                                                className: "h-4 w-4 shrink-0 text-[#3B82F6]",
                                                                "aria-hidden": "true"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                                lineNumber: 908,
                                                                columnNumber: 21
                                                            }, this) : null,
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ".concat(isCompany ? 'bg-sky-100/90 text-sky-600' : 'bg-emerald-100/90 text-emerald-600'),
                                                                children: badgeLabel
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                                lineNumber: 911,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                        lineNumber: 900,
                                                        columnNumber: 17
                                                    }, this),
                                                    isCompany && match.insighter.name ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-1.5 flex items-center justify-start gap-1.5 text-[11px] text-slate-500 sm:text-xs",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "shrink-0 text-slate-400",
                                                                children: isRTL ? 'بواسطة' : 'By'
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                                lineNumber: 925,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "relative inline-flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100",
                                                                children: match.insighter.profile_photo_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    src: match.insighter.profile_photo_url,
                                                                    alt: match.insighter.name,
                                                                    width: 20,
                                                                    height: 20,
                                                                    className: "h-full w-full object-cover object-top"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                                    lineNumber: 928,
                                                                    columnNumber: 25
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[8px] font-semibold text-slate-500",
                                                                    children: getInitials(match.insighter.name)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                                    lineNumber: 936,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                                lineNumber: 926,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "truncate font-medium text-slate-700",
                                                                children: match.insighter.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                                lineNumber: 941,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                        lineNumber: 922,
                                                        columnNumber: 19
                                                    }, this) : null,
                                                    countryName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-2 flex items-center justify-start gap-2 text-[11px] text-slate-600 sm:text-xs",
                                                        children: [
                                                            countryFlag ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                src: "/images/flags/".concat(countryFlag, ".svg"),
                                                                alt: countryName,
                                                                width: 14,
                                                                height: 14,
                                                                className: "h-3.5 w-3.5 object-contain"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                                lineNumber: 952,
                                                                columnNumber: 23
                                                            }, this) : null,
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "truncate",
                                                                children: countryName
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                                lineNumber: 960,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                        lineNumber: 948,
                                                        columnNumber: 19
                                                    }, this) : null,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: profileHref,
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        onClick: (event)=>event.stopPropagation(),
                                                        className: "mt-2.5 hidden items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-600 transition-colors hover:border-[#1C7CBB] hover:text-[#1C7CBB] sm:inline-flex",
                                                        children: [
                                                            isRTL ? 'عرض الملف الشخصي' : 'View profile',
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                viewBox: "0 0 16 16",
                                                                fill: "currentColor",
                                                                className: "h-3 w-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        fillRule: "evenodd",
                                                                        d: "M8.914 6.025a.75.75 0 0 1 1.06 0 3.5 3.5 0 0 1 0 4.95l-2 2a3.5 3.5 0 0 1-5.396-4.402.75.75 0 0 1 1.251.827 2 2 0 0 0 3.085 2.514l2-2a2 2 0 0 0 0-2.828.75.75 0 0 1 0-1.06Z",
                                                                        clipRule: "evenodd"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                                        lineNumber: 973,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        fillRule: "evenodd",
                                                                        d: "M7.086 9.975a.75.75 0 0 1-1.06 0 3.5 3.5 0 0 1 0-4.95l2-2a3.5 3.5 0 0 1 5.396 4.402.75.75 0 0 1-1.251-.827 2 2 0 0 0-3.085-2.514l-2 2a2 2 0 0 0 0 2.828.75.75 0 0 1 0 1.06Z",
                                                                        clipRule: "evenodd"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                                        lineNumber: 974,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                                lineNumber: 972,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                        lineNumber: 964,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                lineNumber: 899,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                        lineNumber: 888,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden shrink-0 flex-col items-center gap-2 sm:flex",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MatchScoreDonut, {
                                                score: finalMatchScore,
                                                isRTL: isRTL
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                lineNumber: 982,
                                                columnNumber: 15
                                            }, this),
                                            hasDetails ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    setIsExpanded((v)=>!v);
                                                },
                                                "aria-expanded": isExpanded,
                                                "aria-label": isRTL ? 'عرض تفاصيل التطابق' : 'Show match details',
                                                className: "inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/80 px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$ChevronDownIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                                                        className: "h-3 w-3 transition-transform duration-200 ".concat(isExpanded ? 'rotate-180' : '')
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                        lineNumber: 991,
                                                        columnNumber: 19
                                                    }, this),
                                                    isRTL ? 'التفاصيل' : 'Details'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                lineNumber: 984,
                                                columnNumber: 17
                                            }, this) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                        lineNumber: 981,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                lineNumber: 887,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                        lineNumber: 875,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex items-center justify-between gap-3 sm:hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex min-w-0 flex-1 flex-wrap justify-start gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: profileHref,
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        onClick: (event)=>event.stopPropagation(),
                                        className: "inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 transition-colors hover:border-[#1C7CBB] hover:text-[#1C7CBB]",
                                        children: [
                                            isRTL ? 'عرض الملف الشخصي' : 'View profile',
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                viewBox: "0 0 16 16",
                                                fill: "currentColor",
                                                className: "h-3.5 w-3.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        fillRule: "evenodd",
                                                        d: "M8.914 6.025a.75.75 0 0 1 1.06 0 3.5 3.5 0 0 1 0 4.95l-2 2a3.5 3.5 0 0 1-5.396-4.402.75.75 0 0 1 1.251.827 2 2 0 0 0 3.085 2.514l2-2a2 2 0 0 0 0-2.828.75.75 0 0 1 0-1.06Z",
                                                        clipRule: "evenodd"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                        lineNumber: 1014,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        fillRule: "evenodd",
                                                        d: "M7.086 9.975a.75.75 0 0 1-1.06 0 3.5 3.5 0 0 1 0-4.95l2-2a3.5 3.5 0 0 1 5.396 4.402.75.75 0 0 1-1.251-.827 2 2 0 0 0-3.085-2.514l-2 2a2 2 0 0 0 0 2.828.75.75 0 0 1 0 1.06Z",
                                                        clipRule: "evenodd"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                        lineNumber: 1015,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                lineNumber: 1013,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                        lineNumber: 1005,
                                        columnNumber: 13
                                    }, this),
                                    hasDetails ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: (e)=>{
                                            e.stopPropagation();
                                            setIsExpanded((v)=>!v);
                                        },
                                        "aria-expanded": isExpanded,
                                        "aria-label": isRTL ? 'عرض تفاصيل التطابق' : 'Show match details',
                                        className: "inline-flex min-h-9 items-center gap-1 rounded-full border border-slate-200 bg-white/80 px-3.5 py-2 text-xs font-semibold text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$ChevronDownIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                                                className: "h-3.5 w-3.5 transition-transform duration-200 ".concat(isExpanded ? 'rotate-180' : '')
                                            }, void 0, false, {
                                                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                                lineNumber: 1030,
                                                columnNumber: 17
                                            }, this),
                                            isRTL ? 'التفاصيل' : 'Details'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                        lineNumber: 1020,
                                        columnNumber: 15
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                lineNumber: 1004,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MatchScoreDonut, {
                                    score: finalMatchScore,
                                    isRTL: isRTL
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                    lineNumber: 1039,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                lineNumber: 1038,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                        lineNumber: 1001,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                lineNumber: 871,
                columnNumber: 7
            }, this),
            hasDetails && isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3 border-t border-slate-100/70 px-4 py-3 sm:px-5 ".concat(isRTL ? 'text-right' : ''),
                children: [
                    match.matches_score ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MatchScoreBreakdownChart, {
                        scores: match.matches_score,
                        isRTL: isRTL
                    }, void 0, false, {
                        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                        lineNumber: 1048,
                        columnNumber: 13
                    }, this) : null,
                    hasMatches && match.matches ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-2.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400",
                                children: isRTL ? 'معايير التطابق' : 'Match criteria'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                lineNumber: 1053,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MatchCriteriaPanel, {
                                matches: match.matches,
                                isRTL: isRTL
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                lineNumber: 1056,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                        lineNumber: 1052,
                        columnNumber: 13
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                lineNumber: 1046,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
        lineNumber: 865,
        columnNumber: 5
    }, this);
}
_s(MatchedInsighterCard, "FPNvbbHVlWWR4LKxxNntSxiIS38=");
_c5 = MatchedInsighterCard;
function ProjectMatchesStep(param) {
    let { locale } = param;
    _s1();
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"])(locale);
    const isRTL = locale === 'ar';
    const isEnglish = typeof locale === 'string' && locale.toLowerCase().startsWith('en');
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isInitialized, setIsInitialized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [matchPhase, setMatchPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('idle');
    const [projectUuid, setProjectUuid] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [preferredMatchType, setPreferredMatchType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Either');
    const [matchedInsighters, setMatchedInsighters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedMatchIds, setSelectedMatchIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loaderActiveIndex, setLoaderActiveIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"])(error, locale);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProjectMatchesStep.useEffect": ()=>{
            const timer = window.setTimeout({
                "ProjectMatchesStep.useEffect.timer": ()=>setEntered(true)
            }["ProjectMatchesStep.useEffect.timer"], 30);
            return ({
                "ProjectMatchesStep.useEffect": ()=>window.clearTimeout(timer)
            })["ProjectMatchesStep.useEffect"];
        }
    }["ProjectMatchesStep.useEffect"], []);
    const visibleLoaderCards = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ProjectMatchesStep.useMemo[visibleLoaderCards]": ()=>{
            const filteredCards = filterLoaderCardsByPreferredType(loaderMatchCards, preferredMatchType);
            return filteredCards.length > 0 ? filteredCards : loaderMatchCards;
        }
    }["ProjectMatchesStep.useMemo[visibleLoaderCards]"], [
        preferredMatchType
    ]);
    const selectedMatches = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ProjectMatchesStep.useMemo[selectedMatches]": ()=>matchedInsighters.filter({
                "ProjectMatchesStep.useMemo[selectedMatches]": (match)=>selectedMatchIds.includes(match.uuid)
            }["ProjectMatchesStep.useMemo[selectedMatches]"])
    }["ProjectMatchesStep.useMemo[selectedMatches]"], [
        matchedInsighters,
        selectedMatchIds
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProjectMatchesStep.useEffect": ()=>{
            const nextProjectUuid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectRequestUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredProjectRequestUuid"])(locale);
            const preferredType = normalizePreferredInsighterTypeSelection(readStorageValue(locale, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$wizardStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectWizardStorage"].preferredInsighterTypeKey(locale)));
            setProjectUuid(nextProjectUuid || null);
            setPreferredMatchType(preferredType);
            setSelectedMatchIds((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalSubmit$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredSelectedMatchIds"])(locale));
            setIsInitialized(true);
        }
    }["ProjectMatchesStep.useEffect"], [
        locale
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProjectMatchesStep.useEffect": ()=>{
            if (matchPhase !== 'loader' && matchPhase !== 'fetching') return;
            if (visibleLoaderCards.length <= 1) return;
            const interval = window.setInterval({
                "ProjectMatchesStep.useEffect.interval": ()=>{
                    setLoaderActiveIndex({
                        "ProjectMatchesStep.useEffect.interval": (currentIndex)=>(currentIndex + 1) % visibleLoaderCards.length
                    }["ProjectMatchesStep.useEffect.interval"]);
                }
            }["ProjectMatchesStep.useEffect.interval"], 1100);
            return ({
                "ProjectMatchesStep.useEffect": ()=>window.clearInterval(interval)
            })["ProjectMatchesStep.useEffect"];
        }
    }["ProjectMatchesStep.useEffect"], [
        matchPhase,
        visibleLoaderCards.length
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProjectMatchesStep.useEffect": ()=>{
            if (!isInitialized) return;
            if (!projectUuid) {
                setMatchPhase('empty');
                setMatchedInsighters([]);
                setSelectedMatchIds([]);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalMatchUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearStoredProposalMatchUuid"])(locale);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalSubmit$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeStoredSelectedMatchIds"])(locale, []);
                return;
            }
            let cancelled = false;
            const controller = new AbortController();
            setError(null);
            setMatchPhase('loader');
            setMatchedInsighters([]);
            setLoaderActiveIndex(0);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalMatchUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearStoredProposalMatchUuid"])(locale);
            const timeout = window.setTimeout({
                "ProjectMatchesStep.useEffect.timeout": ()=>{
                    const loadMatches = {
                        "ProjectMatchesStep.useEffect.timeout.loadMatches": async ()=>{
                            if (cancelled) return;
                            setMatchPhase('fetching');
                            try {
                                const { matches, proposalMatchUuid } = await fetchMatchedInsighters(locale, projectUuid, controller.signal);
                                if (cancelled) return;
                                if (proposalMatchUuid) {
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalMatchUuid$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeStoredProposalMatchUuid"])(locale, proposalMatchUuid);
                                }
                                const filteredMatches = filterMatchedInsightersByPreferredType(matches, preferredMatchType);
                                setMatchedInsighters(filteredMatches);
                                setSelectedMatchIds({
                                    "ProjectMatchesStep.useEffect.timeout.loadMatches": (currentIds)=>{
                                        const nextIds = Array.from(new Set(currentIds.flatMap({
                                            "ProjectMatchesStep.useEffect.timeout.loadMatches.nextIds": (id)=>{
                                                const matchedByUuid = filteredMatches.find({
                                                    "ProjectMatchesStep.useEffect.timeout.loadMatches.nextIds.matchedByUuid": (match)=>match.uuid === id
                                                }["ProjectMatchesStep.useEffect.timeout.loadMatches.nextIds.matchedByUuid"]);
                                                if (matchedByUuid) return matchedByUuid.uuid;
                                                // Preserve selections stored before the switch to match UUIDs.
                                                const matchedByInsighterUuid = filteredMatches.find({
                                                    "ProjectMatchesStep.useEffect.timeout.loadMatches.nextIds.matchedByInsighterUuid": (match)=>match.insighter.uuid === id
                                                }["ProjectMatchesStep.useEffect.timeout.loadMatches.nextIds.matchedByInsighterUuid"]);
                                                return matchedByInsighterUuid ? matchedByInsighterUuid.uuid : [];
                                            }
                                        }["ProjectMatchesStep.useEffect.timeout.loadMatches.nextIds"])));
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalSubmit$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeStoredSelectedMatchIds"])(locale, nextIds);
                                        return nextIds;
                                    }
                                }["ProjectMatchesStep.useEffect.timeout.loadMatches"]);
                                setMatchPhase(filteredMatches.length > 0 ? 'ready' : 'empty');
                            } catch (fetchError) {
                                if (cancelled) return;
                                if (fetchError instanceof DOMException && fetchError.name === 'AbortError') return;
                                setMatchPhase('error');
                                setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectApiErrorMessage"])(fetchError, isRTL ? 'تعذر تحميل المطابقات المقترحة.' : 'Failed to load suggested matches.'));
                            }
                        }
                    }["ProjectMatchesStep.useEffect.timeout.loadMatches"];
                    void loadMatches();
                }
            }["ProjectMatchesStep.useEffect.timeout"], MATCH_LOADER_DURATION_MS);
            return ({
                "ProjectMatchesStep.useEffect": ()=>{
                    cancelled = true;
                    window.clearTimeout(timeout);
                    controller.abort();
                }
            })["ProjectMatchesStep.useEffect"];
        }
    }["ProjectMatchesStep.useEffect"], [
        isInitialized,
        isRTL,
        locale,
        preferredMatchType,
        projectUuid
    ]);
    const toggleSelectedMatch = (matchUuid)=>{
        setSelectedMatchIds((currentIds)=>currentIds.includes(matchUuid) ? currentIds.filter((id)=>id !== matchUuid) : [
                ...currentIds,
                matchUuid
            ]);
    };
    const handleSubmitSelectedMatches = ()=>{
        if (!canSubmitMatches) return;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$projectProposalSubmit$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeStoredSelectedMatchIds"])(locale, selectedMatchIds);
        nav.goNext();
    };
    const canSubmitMatches = matchPhase === 'ready' && selectedMatches.length > 0;
    const matchSectionTitle = preferredMatchType === 'Company' ? isRTL ? 'الشركات المطابقة' : 'Matched companies' : preferredMatchType === 'Individual' ? isRTL ? 'الخبراء المطابقون' : 'Matched insighters' : isRTL ? 'المطابقات المقترحة' : 'Suggested matches';
    const isLoadingMatches = matchPhase === 'idle' || matchPhase === 'loader' || matchPhase === 'fetching';
    const stepTitle = isLoadingMatches ? preferredMatchType === 'Company' ? isRTL ? 'جارٍ البحث عن الشركات المطابقة' : 'Searching for matching companies' : preferredMatchType === 'Individual' ? isRTL ? 'جارٍ البحث عن الخبراء المطابقين' : 'Searching for matching insighters' : isRTL ? 'جارٍ البحث عن النتائج المطابقة' : 'Searching for matching results' : matchPhase === 'ready' ? isRTL ? 'اختر واحدًا أو أكثر من النتائج المقترحة' : 'Select one or more from suggested results' : matchSectionTitle;
    const stepDescription = isLoadingMatches ? isRTL ? 'نطابق متطلبات المشروع وتفضيلاتك مع الحسابات الأنسب.' : 'We are matching the project requirements and preferences with the most relevant profiles.' : matchPhase === 'ready' ? isRTL ? 'راجع النتائج المقترحة وحدد الحسابات التي تريد المتابعة معها.' : 'Review the suggested results and select the profiles you want to continue with.' : isRTL ? 'هذه الحسابات المطابقة لتفضيلات المشروع.' : 'These profiles match the project preferences.';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-6xl mx-auto min-h-full flex flex-col",
        dir: isRTL ? 'rtl' : 'ltr',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-auto px-4 pb-32 pt-8 sm:px-6 sm:pb-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-[980px]",
                    children: [
                        isEnglish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                            children: '\n              #project-matches-step-title {\n                font-family: "IBM Plex Serif", serif !important;\n              }\n            '
                        }, void 0, false, {
                            fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                            lineNumber: 1287,
                            columnNumber: 13
                        }, this) : null,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-start transition-all duration-700 ".concat(entered ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    id: "project-matches-step-title",
                                    className: "text-2xl sm:text-3xl font-medium tracking-tight text-slate-900 text-start",
                                    children: stepTitle
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                    lineNumber: 1302,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 max-w-2xl text-sm text-slate-500 pb-12",
                                    children: stepDescription
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                    lineNumber: 1308,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                            lineNumber: 1294,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "".concat(isLoadingMatches ? '' : 'mt-6'),
                            children: [
                                matchPhase === 'idle' || matchPhase === 'loader' || matchPhase === 'fetching' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MatchLoader, {
                                    cards: visibleLoaderCards,
                                    activeIndex: loaderActiveIndex,
                                    isRTL: isRTL
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                    lineNumber: 1317,
                                    columnNumber: 15
                                }, this) : null,
                                matchPhase === 'ready' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4 max-w-4xl m-auto",
                                    children: matchedInsighters.map((match)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MatchedInsighterCard, {
                                            match: match,
                                            locale: locale,
                                            isRTL: isRTL,
                                            selected: selectedMatchIds.includes(match.uuid),
                                            onToggleSelected: ()=>toggleSelectedMatch(match.uuid)
                                        }, match.uuid, false, {
                                            fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                            lineNumber: 1327,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                    lineNumber: 1325,
                                    columnNumber: 15
                                }, this) : null,
                                matchPhase === 'empty' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-[26px] border border-white/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.46),rgba(255,255,255,0.3))] px-6 py-10 text-center backdrop-blur-2xl",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-base font-semibold text-slate-900",
                                            children: isRTL ? 'لا توجد مطابقات متاحة حاليًا' : 'No matches are available right now'
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                            lineNumber: 1341,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2 text-xs text-slate-500 sm:text-sm",
                                            children: isRTL ? 'سنضيف النتائج هنا فور توفر مطابقات تناسب تفضيلات المشروع.' : 'Results will appear here as soon as there are matches that fit the project preferences.'
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                            lineNumber: 1346,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                    lineNumber: 1340,
                                    columnNumber: 15
                                }, this) : null,
                                matchPhase === 'error' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-[26px] border border-rose-100/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.46),rgba(255,245,245,0.36))] px-6 py-10 text-center backdrop-blur-2xl",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-base font-semibold text-rose-700",
                                            children: isRTL ? 'تعذر تحميل المطابقات' : 'Unable to load matches'
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                            lineNumber: 1356,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2 text-xs text-rose-600 sm:text-sm",
                                            children: error || (isRTL ? 'حاول مرة أخرى بعد قليل.' : 'Please try again in a moment.')
                                        }, void 0, false, {
                                            fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                            lineNumber: 1359,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                    lineNumber: 1355,
                                    columnNumber: 15
                                }, this) : null
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                            lineNumber: 1313,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                    lineNumber: 1285,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                lineNumber: 1284,
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
                                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                lineNumber: 1374,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleSubmitSelectedMatches,
                                disabled: !canSubmitMatches,
                                className: "btn-sm rounded-full px-6 py-2 ".concat(canSubmitMatches ? 'bg-[#1C7CBB] text-white hover:bg-opacity-90' : 'cursor-not-allowed bg-slate-200 text-slate-500'),
                                children: matchPhase === 'loader' || matchPhase === 'fetching' ? isRTL ? 'جاري البحث...' : 'Searching...' : isRTL ? 'متابعة' : 'Continue'
                            }, void 0, false, {
                                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                                lineNumber: 1381,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                        lineNumber: 1373,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                    lineNumber: 1372,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
                lineNumber: 1371,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/project/questions/ProjectMatchesStep.tsx",
        lineNumber: 1280,
        columnNumber: 5
    }, this);
}
_s1(ProjectMatchesStep, "AN5MbdKr6Gg+ArERbi7rWDcwgFY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectWizardNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectWizardNavigation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$project$2f$useProjectStepErrorToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectStepErrorToast"]
    ];
});
_c6 = ProjectMatchesStep;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "MatchAvatar");
__turbopack_context__.k.register(_c1, "MatchLoader");
__turbopack_context__.k.register(_c2, "MatchScoreDonut");
__turbopack_context__.k.register(_c3, "MatchCriteriaPanel");
__turbopack_context__.k.register(_c4, "MatchScoreBreakdownChart");
__turbopack_context__.k.register(_c5, "MatchedInsighterCard");
__turbopack_context__.k.register(_c6, "ProjectMatchesStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_project_questions_ProjectMatchesStep_tsx_877caa05._.js.map