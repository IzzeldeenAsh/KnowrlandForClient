module.exports = [
"[project]/app/[locale]/profile/[uuid]/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProfileLayout,
    "generateMetadata",
    ()=>generateMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/seo.ts [app-rsc] (ecmascript)");
;
;
;
// Cache the profile data fetch to avoid duplicate API calls
const getProfileData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(async (uuid, locale)=>{
    try {
        // Try insighter API first
        let response = await fetch(`${("TURBOPACK compile-time value", "https://api.foresighta.co")}/api/platform/insighter/profile/${uuid}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Accept-Language': locale
            },
            cache: 'no-store'
        });
        if (response.ok) {
            const data = await response.json();
            return data.data;
        }
        // Fall back to company API
        response = await fetch(`${("TURBOPACK compile-time value", "https://api.foresighta.co")}/api/platform/company/profile/${uuid}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Accept-Language': locale
            },
            cache: 'no-store'
        });
        if (response.ok) {
            const data = await response.json();
            // Transform company data to ProfileData format
            const companyProfileData = {
                uuid: data.data.uuid,
                name: data.data.legal_name,
                first_name: '',
                last_name: '',
                bio: data.data.about_us,
                profile_photo_url: data.data.logo,
                roles: [
                    'company'
                ],
                company: {
                    legal_name: data.data.legal_name,
                    logo: data.data.logo,
                    uuid: data.data.uuid
                }
            };
            return companyProfileData;
        }
        return null;
    } catch (error) {
        console.error('Error fetching profile data for metadata:', error);
        return null;
    }
});
async function generateMetadata({ params }) {
    const { uuid, locale } = await params;
    const profileData = await getProfileData(uuid, locale);
    if (!profileData) {
        return {
            title: 'Profile Not Found - Insighta',
            description: 'The requested profile could not be found.'
        };
    }
    const isCompany = profileData.roles.includes('company');
    const isInsighter = profileData.roles.includes('insighter');
    // Determine the profile name and image
    const profileName = isCompany ? profileData.company?.legal_name || profileData.name : `${profileData.first_name} ${profileData.last_name}`.trim() || profileData.name;
    const profileImage = isCompany ? profileData.company?.logo : profileData.profile_photo_url;
    // Generate description
    const roleText = locale === 'ar' ? isCompany ? 'شركة' : 'خبير' : isCompany ? 'Company' : 'Insighter';
    const platformText = locale === 'ar' ? 'انسايتا' : 'Insighta';
    const description = profileData.bio ? `${profileData.bio.slice(0, 155)}...` : locale === 'ar' ? `تحقق من ملف ${profileName} الشخصي على ${platformText} - ${roleText} متخصص في تقديم المعرفة والخدمات الاستشارية` : `Check out ${profileName}'s profile on ${platformText} - ${roleText} specialized in providing knowledge and consulting services`;
    const title = locale === 'ar' ? `${profileName} - ملف شخصي | ${platformText}` : `${profileName} - Profile | ${platformText}`;
    // Construct the profile URL
    const baseUrl = ("TURBOPACK compile-time value", "http://localhost:3000") || `${"TURBOPACK compile-time value", "http://localhost:3000"}`;
    const profileUrl = `${baseUrl}/${locale}/profile/${uuid}`;
    const absoluteProfileImage = profileImage ? profileImage.startsWith('http') ? profileImage : `${baseUrl}${profileImage.startsWith('/') ? '' : '/'}${profileImage}` : null;
    // WhatsApp limitations:
    // - Doesn't reliably preview SVG/WEBP
    // - Prefers absolute HTTPS URLs with sensible dimensions
    // Use a PNG OG-image fallback in those cases and provide dimensions.
    const lowerImage = absoluteProfileImage?.toLowerCase() || '';
    const isUnsupportedForWhatsApp = lowerImage.endsWith('.svg') || lowerImage.endsWith('.webp');
    const ogImageFallback = `${baseUrl}/api/og-image?name=${encodeURIComponent(profileName)}&type=${roleText}`;
    const ogImageUrl = absoluteProfileImage && !isUnsupportedForWhatsApp ? absoluteProfileImage : ogImageFallback;
    const isHttps = ogImageUrl.startsWith('https://');
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: profileUrl,
            siteName: platformText,
            locale: locale === 'ar' ? 'ar_AE' : 'en_US',
            type: 'profile',
            images: [
                {
                    url: ogImageUrl,
                    // Provide secureUrl for crawlers like WhatsApp/Facebook when available
                    ...isHttps ? {
                        secureUrl: ogImageUrl
                    } : {},
                    width: 1200,
                    height: 630,
                    alt: `${profileName}'s profile picture`
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [
                ogImageUrl
            ],
            creator: '@insightabusiness_com',
            site: '@insightabusiness_com'
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1
            }
        },
        verification: {
            google: 'your-google-verification-code'
        },
        alternates: {
            canonical: profileUrl,
            languages: {
                'ar-AE': `${baseUrl}/ar/profile/${uuid}`,
                'en-US': `${baseUrl}/en/profile/${uuid}`
            }
        },
        other: {
            'profile:first_name': isInsighter ? profileData.first_name : '',
            'profile:last_name': isInsighter ? profileData.last_name : '',
            'profile:username': profileName,
            'og:image:alt': `${profileName}'s profile picture`,
            ...isHttps ? {
                'og:image:secure_url': ogImageUrl
            } : {}
        }
    };
}
async function ProfileLayout({ children, params }) {
    const { uuid, locale } = await params;
    // Fetch profile data for structured data
    let structuredDataScript = null;
    try {
        const profileData = await getProfileData(uuid, locale);
        if (profileData) {
            const structuredData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateProfileStructuredData"])({
                uuid: profileData.uuid,
                name: profileData.company?.legal_name || profileData.name,
                first_name: profileData.first_name,
                last_name: profileData.last_name,
                profile_photo_url: profileData.profile_photo_url,
                bio: profileData.bio,
                company: profileData.company,
                roles: profileData.roles
            }, locale);
            structuredDataScript = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                type: "application/ld+json",
                dangerouslySetInnerHTML: {
                    __html: JSON.stringify(Object.values(structuredData).filter(Boolean))
                }
            }, void 0, false, {
                fileName: "[project]/app/[locale]/profile/[uuid]/layout.tsx",
                lineNumber: 235,
                columnNumber: 9
            }, this);
        }
    } catch (error) {
        console.error('Error generating profile structured data:', error);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            structuredDataScript,
            children
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=app_%5Blocale%5D_profile_%5Buuid%5D_layout_tsx_bc4f27ec._.js.map