(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/aos-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AOSProvider,
    "safeAOSInit",
    ()=>safeAOSInit,
    "safeAOSRefresh",
    ()=>safeAOSRefresh
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$aos$2f$dist$2f$aos$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/aos/dist/aos.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
// Globa dl flag to prevent multiple AOS initializations
let aosInitialized = false;
const safeAOSInit = function() {
    let config = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    try {
        if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$aos$2f$dist$2f$aos$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== 'undefined' && typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$aos$2f$dist$2f$aos$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].init === 'function' && !aosInitialized) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$aos$2f$dist$2f$aos$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].init({
                once: true,
                disable: 'phone',
                duration: 700,
                easing: 'ease-out-cubic',
                mirror: false,
                startEvent: 'DOMContentLoaded',
                useClassNames: false,
                disableMutationObserver: false,
                debounceDelay: 50,
                throttleDelay: 99,
                ...config
            });
            aosInitialized = true;
        }
    } catch (error) {
        console.warn('Safe AOS init warning:', error);
    }
};
const safeAOSRefresh = ()=>{
    try {
        if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$aos$2f$dist$2f$aos$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== 'undefined' && typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$aos$2f$dist$2f$aos$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].refresh === 'function' && aosInitialized) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$aos$2f$dist$2f$aos$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].refresh();
        }
    } catch (error) {
        console.warn('Safe AOS refresh warning:', error);
    }
};
function AOSProvider(param) {
    let { children } = param;
    _s();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AOSProvider.useEffect": ()=>{
            // Set mounted first to avoid DOM mismatch
            setMounted(true);
            // Only initialize AOS if it hasn't been initialized yet
            if (!aosInitialized) {
                // Use setTimeout with a slight delay to ensure DOM is fully rendered
                const timer = setTimeout({
                    "AOSProvider.useEffect.timer": ()=>{
                        try {
                            // Check if AOS is available before initializing
                            if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$aos$2f$dist$2f$aos$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== 'undefined' && typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$aos$2f$dist$2f$aos$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].init === 'function') {
                                // Initialize AOS only when the component is mounted
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$aos$2f$dist$2f$aos$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].init({
                                    once: true,
                                    disable: 'phone',
                                    duration: 700,
                                    easing: 'ease-out-cubic',
                                    // Disable mirror animations which can cause the 'mirror' error
                                    mirror: false,
                                    // Add a small delay to ensure elements are ready
                                    startEvent: 'DOMContentLoaded',
                                    // Disable animations that might cause issues
                                    useClassNames: false,
                                    disableMutationObserver: false,
                                    debounceDelay: 50,
                                    throttleDelay: 99
                                });
                                // Mark as initialized
                                aosInitialized = true;
                                // Additional refresh after a short delay to catch any late-rendered elements
                                const refreshTimer = setTimeout({
                                    "AOSProvider.useEffect.timer.refreshTimer": ()=>{
                                        try {
                                            if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$aos$2f$dist$2f$aos$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].refresh === 'function') {
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$aos$2f$dist$2f$aos$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].refresh();
                                            }
                                        } catch (refreshError) {
                                            console.warn('AOS refresh warning:', refreshError);
                                        }
                                    }
                                }["AOSProvider.useEffect.timer.refreshTimer"], 200);
                                return ({
                                    "AOSProvider.useEffect.timer": ()=>clearTimeout(refreshTimer)
                                })["AOSProvider.useEffect.timer"];
                            }
                        } catch (error) {
                            console.error('AOS initialization error:', error);
                            // Reset the flag if initialization failed
                            aosInitialized = false;
                        }
                    }
                }["AOSProvider.useEffect.timer"], 100); // Slightly longer delay to ensure hydration is complete
                return ({
                    "AOSProvider.useEffect": ()=>{
                        clearTimeout(timer);
                    }
                })["AOSProvider.useEffect"];
            }
        }
    }["AOSProvider.useEffect"], []);
    // Cleanup function when component unmounts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AOSProvider.useEffect": ()=>{
            return ({
                "AOSProvider.useEffect": ()=>{
                    try {
                        // Only cleanup if AOS was initialized by this provider
                        if (aosInitialized && typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$aos$2f$dist$2f$aos$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== 'undefined') {
                            if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$aos$2f$dist$2f$aos$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].refreshHard === 'function') {
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$aos$2f$dist$2f$aos$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].refreshHard();
                            }
                        }
                    } catch (error) {
                        console.warn('AOS cleanup warning:', error);
                    }
                }
            })["AOSProvider.useEffect"];
        }
    }["AOSProvider.useEffect"], []);
    // Only render children in a fully initialized state after first client-side render
    if (!mounted) {
        // Return only children without any AOS wrapper initially to prevent hydration mismatch
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-aos-initialized": "true",
        style: {
            position: 'relative'
        },
        suppressHydrationWarning: true,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/aos-provider.tsx",
        lineNumber: 132,
        columnNumber: 5
    }, this);
}
_s(AOSProvider, "BShlRgxf1Xjno/mi6QXyq9ZqIDE=");
_c = AOSProvider;
var _c;
__turbopack_context__.k.register(_c, "AOSProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/images/Business-white.png (static in ecmascript)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/Business-white.164bc54e.png");}),
"[project]/public/images/Business-white.png.mjs { IMAGE => \"[project]/public/images/Business-white.png (static in ecmascript)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$Business$2d$white$2e$png__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/public/images/Business-white.png (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$Business$2d$white$2e$png__$28$static__in__ecmascript$29$__["default"],
    width: 568,
    height: 182,
    blurWidth: 8,
    blurHeight: 3,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAADCAYAAACuyE5IAAAAZElEQVR42k3MMQ5AMBhA4Y7EZJLoBcQlRIRYegjXcwYSHMGMTehWDW2lon6JwfAtb3ioGiXpVp7RQ3ubul1jjP2Hyl4ULeXpsMuAnVcIMQbJJ0L1JEiz8HxWCjOt34MFHOAD/AD8OEhODE55TwAAAABJRU5ErkJggg=="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/images/ANSIGHTAAr-.png (static in ecmascript)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/ANSIGHTAAr-.323a651c.png");}),
"[project]/public/images/ANSIGHTAAr-.png.mjs { IMAGE => \"[project]/public/images/ANSIGHTAAr-.png (static in ecmascript)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$ANSIGHTAAr$2d2e$png__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/public/images/ANSIGHTAAr-.png (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$ANSIGHTAAr$2d2e$png__$28$static__in__ecmascript$29$__["default"],
    width: 520,
    height: 181,
    blurWidth: 8,
    blurHeight: 3,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAADCAYAAACuyE5IAAAAbklEQVR42gFjAJz/AP///xH///8L////Cvj7/hLp8/0V0+f6NLfh8lPd9fcmAP///03///9K////UPj8/ivk8/sevtv5TL3j80nJ8PE8AP///wv///8c////H/f9/RDn+fgY2Or7LrHe8Vnc9fYoIiZIL4loSiUAAAAASUVORK5CYII="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/images/Business-colored.png (static in ecmascript)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/Business-colored.1fa47ed8.png");}),
"[project]/public/images/Business-colored.png.mjs { IMAGE => \"[project]/public/images/Business-colored.png (static in ecmascript)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$Business$2d$colored$2e$png__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/public/images/Business-colored.png (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$Business$2d$colored$2e$png__$28$static__in__ecmascript$29$__["default"],
    width: 568,
    height: 182,
    blurWidth: 8,
    blurHeight: 3,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAADCAYAAACuyE5IAAAAbklEQVR42gFjAJz/ALzd903C6PJG6fX7F+30+xH19/oJ9ff5CfX3+gn19/kJAKrS9mHB6fJF3PT3KNTi7Sq2xNdBtsTXQ7TC1kO4xdg/AL3e9k3A5/JI5fj4G+35+RH2+PoI8vT4C93k7Rrb4uwbV4FEFDlIFFAAAAAASUVORK5CYII="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/images/ANSIGHTAAr-05.png (static in ecmascript)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/ANSIGHTAAr-05.81a99837.png");}),
"[project]/public/images/ANSIGHTAAr-05.png.mjs { IMAGE => \"[project]/public/images/ANSIGHTAAr-05.png (static in ecmascript)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$ANSIGHTAAr$2d$05$2e$png__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/public/images/ANSIGHTAAr-05.png (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$ANSIGHTAAr$2d$05$2e$png__$28$static__in__ecmascript$29$__["default"],
    width: 520,
    height: 181,
    blurWidth: 8,
    blurHeight: 3,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAADCAYAAACuyE5IAAAAbklEQVR42gFjAJz/AOvv9BHz9fgL9Pb5Cuvx9xLp8/0V0+f6NLfh8lPd9fcmAKy70k2tvdNKp7jPUNLd6Svk8/sevtv5TL3j80nJ8PE8APP1+Ave5O0c2uHrH+71+BDn+fgY2Or7LrHe8Vnc9fYoPzhEJnd/zwMAAAAASUVORK5CYII="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/images/smallLogo.png (static in ecmascript)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/smallLogo.004d6ade.png");}),
"[project]/public/images/smallLogo.png.mjs { IMAGE => \"[project]/public/images/smallLogo.png (static in ecmascript)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$smallLogo$2e$png__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/public/images/smallLogo.png (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$smallLogo$2e$png__$28$static__in__ecmascript$29$__["default"],
    width: 638,
    height: 607,
    blurWidth: 8,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABE0lEQVR42gEIAff+AP///wDi7/wk5/P8Hdfv+DFqxeK45vb6Hvb9/Qv+//8BAPP4/g6IvvOWp9L0brDc8mG35PFXxOvxR5bi43/0/PwNAN7r/Sm42PhYp9L0bLTe81zF6fRG0fD1NtHy8zf8/v4DAH+x96SQwPWLs9n1Xdzv+ivn9vodwevxSsrw8UDf+PYmAM/i/Dy11vhcqNP0atjt+S7h9PkkxuzyQ7/u7kyP5d6HAPb6/gu72fhWqdT0arPd81uv4O9gxOzxR8bv8ET1/fwMAO71/hWEu/Obp9P0bZjR7n2t3+9kuejvVYre4Y73/f0KAP///wDt9f0X3u/7KGq+5rnA5fRN9/39Cuz6+hb///8AGUS588SPxNoAAAAASUVORK5CYII="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/logo.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Logo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$Business$2d$white$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$images$2f$Business$2d$white$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/public/images/Business-white.png.mjs { IMAGE => "[project]/public/images/Business-white.png (static in ecmascript)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$ANSIGHTAAr$2d2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$images$2f$ANSIGHTAAr$2d2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/public/images/ANSIGHTAAr-.png.mjs { IMAGE => "[project]/public/images/ANSIGHTAAr-.png (static in ecmascript)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$Business$2d$colored$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$images$2f$Business$2d$colored$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/public/images/Business-colored.png.mjs { IMAGE => "[project]/public/images/Business-colored.png (static in ecmascript)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$ANSIGHTAAr$2d$05$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$images$2f$ANSIGHTAAr$2d$05$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/public/images/ANSIGHTAAr-05.png.mjs { IMAGE => "[project]/public/images/ANSIGHTAAr-05.png (static in ecmascript)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$smallLogo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$images$2f$smallLogo$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/public/images/smallLogo.png.mjs { IMAGE => "[project]/public/images/smallLogo.png (static in ecmascript)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
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
function Logo(param) {
    let { isHomePage = true } = param;
    _s();
    const [logoImg, setLogoImg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$ANSIGHTAAr$2d2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$images$2f$ANSIGHTAAr$2d2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"]) // Default to Arabic home logo
    ;
    const [smallLogoImg, setSmallLogoImg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$smallLogo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$images$2f$smallLogo$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"]) // Small logo for mobile
    ;
    const [locale, setLocale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('ar') // Default to Arabic locale
    ;
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Logo.useEffect": ()=>{
            // Detect locale from pathname
            const currentLocale = pathname.split('/')[1] === 'en' ? 'en' : 'ar';
            setLocale(currentLocale);
            if (isHomePage) {
                // Use home page logos
                setLogoImg(currentLocale === 'en' ? __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$Business$2d$white$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$images$2f$Business$2d$white$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"] : __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$ANSIGHTAAr$2d2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$images$2f$ANSIGHTAAr$2d2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"]);
            } else {
                // Use inner page logos
                setLogoImg(currentLocale === 'en' ? __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$Business$2d$colored$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$images$2f$Business$2d$colored$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"] : __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$ANSIGHTAAr$2d$05$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$images$2f$ANSIGHTAAr$2d$05$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"]);
            }
        }
    }["Logo.useEffect"], [
        pathname,
        isHomePage
    ]);
    const handleLogoClick = (e)=>{
        e.preventDefault();
        // Use the same navigation approach as in header.tsx for consistency
        window.location.href = "/".concat(locale);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        className: "inline-flex",
        href: "/".concat(locale),
        "aria-label": "Insighta",
        onClick: handleLogoClick,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                className: "hidden md:block max-w-none",
                src: logoImg,
                width: 120,
                height: 60,
                priority: true,
                alt: "Insighta",
                style: {
                    height: "auto"
                }
            }, void 0, false, {
                fileName: "[project]/components/ui/logo.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                className: "block md:hidden max-w-none",
                src: smallLogoImg,
                width: 40,
                height: 40,
                priority: true,
                alt: "Insighta",
                style: {
                    height: "auto"
                }
            }, void 0, false, {
                fileName: "[project]/components/ui/logo.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/logo.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_s(Logo, "3GnbgYAAnXtx9s6QAZtArK0GDEQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Logo;
var _c;
__turbopack_context__.k.register(_c, "Logo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/FullScreenLoader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FullScreenLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
'use client';
;
;
function FullScreenLoader(param) {
    let { message = 'Signing you in...' } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[9999] bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex items-center justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center gap-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: "/images/logo.svg",
                    alt: "KNOLDG",
                    width: 72,
                    height: 72,
                    priority: true,
                    className: "opacity-90"
                }, void 0, false, {
                    fileName: "[project]/components/ui/FullScreenLoader.tsx",
                    lineNumber: 13,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-12 h-12 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"
                }, void 0, false, {
                    fileName: "[project]/components/ui/FullScreenLoader.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-slate-700 dark:text-slate-200 text-base font-medium text-center",
                    children: message
                }, void 0, false, {
                    fileName: "[project]/components/ui/FullScreenLoader.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/FullScreenLoader.tsx",
            lineNumber: 12,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/FullScreenLoader.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = FullScreenLoader;
var _c;
__turbopack_context__.k.register(_c, "FullScreenLoader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/context/LoadingContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LoadingProvider",
    ()=>LoadingProvider,
    "useLoading",
    ()=>useLoading,
    "usePageLoading",
    ()=>usePageLoading
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$FullScreenLoader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/FullScreenLoader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/index.react-client.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const LoadingContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function LoadingProvider(param) {
    let { children } = param;
    _s();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isNavigating, setIsNavigating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isManualLoading, setIsManualLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const currentLocale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const isAboutInsightaSection = pathname.includes('/resources/first-steps/about-insighta');
    // Check for preferred language cookie and determine if loading should be shown
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LoadingProvider.useEffect": ()=>{
            const getCookie = {
                "LoadingProvider.useEffect.getCookie": (name)=>{
                    var _parts_pop;
                    const value = "; ".concat(document.cookie);
                    const parts = value.split("; ".concat(name, "="));
                    if (parts.length === 2) return (_parts_pop = parts.pop()) === null || _parts_pop === void 0 ? void 0 : _parts_pop.split(';').shift();
                    return null;
                }
            }["LoadingProvider.useEffect.getCookie"];
            const preferredLanguage = getCookie('preferred_language');
            const currentLanguage = pathname.split('/')[1];
            // If the current language matches the preferred one or no preference exists,
            // we can stop showing the loader
            if (!preferredLanguage || preferredLanguage === currentLanguage) {
                setIsLoading(false);
            }
            // This timeout ensures we don't show the loader indefinitely if something goes wrong
            const timeout = setTimeout({
                "LoadingProvider.useEffect.timeout": ()=>{
                    setIsLoading(false);
                }
            }["LoadingProvider.useEffect.timeout"], 3000);
            return ({
                "LoadingProvider.useEffect": ()=>clearTimeout(timeout)
            })["LoadingProvider.useEffect"];
        }
    }["LoadingProvider.useEffect"], [
        pathname
    ]);
    // Handle navigation state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LoadingProvider.useEffect": ()=>{
            // When pathname changes, mark navigation as complete
            setIsNavigating(false);
            // Listen for navigation start events
            const handleNavigationStart = {
                "LoadingProvider.useEffect.handleNavigationStart": ()=>{
                    setIsNavigating(true);
                }
            }["LoadingProvider.useEffect.handleNavigationStart"];
            // For client-side navigation, we need to listen for click events on links
            const handleLinkClick = {
                "LoadingProvider.useEffect.handleLinkClick": (e)=>{
                    var _link_rel;
                    // If some component intentionally prevented navigation (e.g. query-only UI state),
                    // don't start the global fullscreen loader.
                    if (e.defaultPrevented) return;
                    const target = e.target;
                    const link = target.closest('a');
                    if (link && link.href && !link.target && !link.download && !((_link_rel = link.rel) === null || _link_rel === void 0 ? void 0 : _link_rel.includes('external')) && link.origin === window.location.origin) {
                        // If the click only changes query/hash on the same pathname, avoid global loader.
                        // (Example: switching tabs with ?tab=... should not block the entire page.)
                        const destinationUrl = new URL(link.href);
                        if (destinationUrl.pathname === window.location.pathname) return;
                        // Avoid showing the GLOBAL fullscreen loader for in-section navigation
                        // (these routes have their own local content loader so the sidebar stays visible)
                        const destinationPathname = destinationUrl.pathname;
                        const isDestinationAboutInsighta = destinationPathname.includes('/resources/first-steps/about-insighta');
                        if (isAboutInsightaSection && isDestinationAboutInsighta) return;
                        setIsNavigating(true);
                    }
                }
            }["LoadingProvider.useEffect.handleLinkClick"];
            document.addEventListener('click', handleLinkClick);
            return ({
                "LoadingProvider.useEffect": ()=>{
                    document.removeEventListener('click', handleLinkClick);
                }
            })["LoadingProvider.useEffect"];
        }
    }["LoadingProvider.useEffect"], [
        pathname,
        isAboutInsightaSection
    ]);
    // Functions to manually control loading state
    const startPageLoading = ()=>setIsManualLoading(true);
    const stopPageLoading = ()=>setIsManualLoading(false);
    // Show loader either during initial load, during navigation, or when manually triggered
    const isCallbackRoute = pathname.includes('/callback');
    const isProjectRoute = pathname.includes('/project');
    const showLoader = !isCallbackRoute && !isProjectRoute && (isLoading || isNavigating || isManualLoading);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LoadingContext.Provider, {
        value: {
            isLoading: showLoader,
            setIsLoading,
            startPageLoading,
            stopPageLoading
        },
        children: [
            children,
            showLoader ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$FullScreenLoader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                message: currentLocale === 'ar' ? 'جاري تحميل الصفحة...' : 'Loading...'
            }, void 0, false, {
                fileName: "[project]/components/context/LoadingContext.tsx",
                lineNumber: 122,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/context/LoadingContext.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
_s(LoadingProvider, "r0iq6syUsZreO7tKbqeA6Xg4qok=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"]
    ];
});
_c = LoadingProvider;
function useLoading() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
}
_s1(useLoading, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
function usePageLoading() {
    _s2();
    const { startPageLoading, stopPageLoading } = useLoading();
    return {
        startPageLoading,
        stopPageLoading
    };
}
_s2(usePageLoading, "+Ox0KFSiI3/C2jV4StZdQFAEsSo=", false, function() {
    return [
        useLoading
    ];
});
var _c;
__turbopack_context__.k.register(_c, "LoadingProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/mobile-menu.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MobileMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/index.react-client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$context$2f$LoadingContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/context/LoadingContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function MobileMenu(param) {
    let { isHomePage = true } = param;
    var _mobileNav_current;
    _s();
    const [mobileNavOpen, setMobileNavOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { setIsLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$context$2f$LoadingContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLoading"])();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('Header');
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const isRtl = pathname.startsWith('/ar');
    const currentLocale = pathname.split('/')[1];
    // Always use dark style with white text (matching the updated header)
    const menuTextColorClass = 'text-slate-300 hover:text-white';
    // Always use dark style background (matching the updated header)
    const menuBgStyle = "border border-transparent [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box]";
    // Dark border color for dividers
    const borderColorClass = "border-slate-700/50";
    // Helper function to get the base domain for cookies
    const getCookieDomain = ()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const hostname = window.location.hostname;
        if (hostname.includes('insightabusiness.com') || hostname.includes('foresighta.co')) {
            return '.insightabusiness.com';
        }
        return null; // localhost
    };
    const isProduction = ()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const hostname = window.location.hostname;
        return hostname.includes('insightabusiness.com') || hostname.includes('foresighta.co');
    };
    // Helper function to clear duplicate cookies (handles both Angular SameSite=None and Next.js SameSite=Lax)
    const clearDuplicateCookies = (cookieName)=>{
        const cookieDomain = getCookieDomain();
        const prod = isProduction();
        const clearVariations = [
            "".concat(cookieName, "=; Path=/; Max-Age=-1")
        ];
        if (cookieDomain) {
            clearVariations.push("".concat(cookieName, "=; Domain=").concat(cookieDomain, "; Path=/; Max-Age=-1; Secure; SameSite=None"), "".concat(cookieName, "=; Domain=").concat(cookieDomain, "; Path=/; Max-Age=-1; Secure; SameSite=Lax"));
        }
        clearVariations.push("".concat(cookieName, "=; Path=/; Max-Age=-1; ").concat(prod ? 'Secure; SameSite=None' : 'SameSite=Lax'));
        clearVariations.forEach((v)=>{
            document.cookie = v;
        });
    };
    // Function to switch locale
    const switchLocale = (locale)=>{
        // Set loading state before switching locale
        setIsLoading(true);
        // Clear any existing duplicate cookies first
        clearDuplicateCookies('preferred_language');
        clearDuplicateCookies('NEXT_LOCALE');
        const cookieDomain = getCookieDomain();
        const prod = isProduction();
        const expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);
        // Set preferred_language cookie (shared with Angular app)
        const cookieParts = [
            "preferred_language=".concat(locale),
            "Path=/",
            "Expires=".concat(expirationDate.toUTCString()),
            "Max-Age=".concat(60 * 60 * 24 * 365),
            "SameSite=Lax"
        ];
        if (cookieDomain) cookieParts.push("Domain=".concat(cookieDomain));
        if (prod) cookieParts.push("Secure");
        document.cookie = cookieParts.join('; ');
        // Also set NEXT_LOCALE for next-intl middleware consistency
        const nextLocaleParts = [
            "NEXT_LOCALE=".concat(locale),
            "Path=/",
            "Expires=".concat(expirationDate.toUTCString()),
            "Max-Age=".concat(60 * 60 * 24 * 365),
            "SameSite=Lax"
        ];
        if (prod) nextLocaleParts.push("Secure");
        document.cookie = nextLocaleParts.join('; ');
        // Get the current path without locale prefix
        const currentPath = pathname.split('/').slice(2).join('/');
        const currentSearch = ("TURBOPACK compile-time truthy", 1) ? window.location.search : "TURBOPACK unreachable";
        const newPath = currentPath ? "/".concat(currentPath) : '/';
        const fullUrl = "/".concat(locale).concat(newPath).concat(currentSearch);
        // Force full page reload to ensure proper re-render with new locale
        window.location.href = fullUrl;
    };
    const trigger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mobileNav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // close the mobile menu on click outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MobileMenu.useEffect": ()=>{
            const clickHandler = {
                "MobileMenu.useEffect.clickHandler": (param)=>{
                    let { target } = param;
                    if (!mobileNav.current || !trigger.current) return;
                    if (!mobileNavOpen || mobileNav.current.contains(target) || trigger.current.contains(target)) return;
                    setMobileNavOpen(false);
                }
            }["MobileMenu.useEffect.clickHandler"];
            document.addEventListener('click', clickHandler);
            return ({
                "MobileMenu.useEffect": ()=>document.removeEventListener('click', clickHandler)
            })["MobileMenu.useEffect"];
        }
    }["MobileMenu.useEffect"]);
    // close the mobile menu if the esc key is pressed
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MobileMenu.useEffect": ()=>{
            const keyHandler = {
                "MobileMenu.useEffect.keyHandler": (param)=>{
                    let { keyCode } = param;
                    if (!mobileNavOpen || keyCode !== 27) return;
                    setMobileNavOpen(false);
                }
            }["MobileMenu.useEffect.keyHandler"];
            document.addEventListener('keydown', keyHandler);
            return ({
                "MobileMenu.useEffect": ()=>document.removeEventListener('keydown', keyHandler)
            })["MobileMenu.useEffect"];
        }
    }["MobileMenu.useEffect"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "lg:hidden flex items-center ml-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                ref: trigger,
                className: "group inline-flex w-8 h-8 ".concat(menuTextColorClass, " text-center items-center justify-center transition"),
                "aria-controls": "mobile-nav",
                "aria-expanded": mobileNavOpen,
                onClick: ()=>setMobileNavOpen(!mobileNavOpen),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "sr-only",
                        children: "Menu"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/mobile-menu.tsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-4 h-4 fill-current pointer-events-none",
                        viewBox: "0 0 16 16",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                className: "origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] -translate-y-[5px] group-[[aria-expanded=true]]:rotate-[315deg] group-[[aria-expanded=true]]:translate-y-0",
                                y: "7",
                                width: "16",
                                height: "2",
                                rx: "1"
                            }, void 0, false, {
                                fileName: "[project]/components/ui/mobile-menu.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                className: "origin-center group-[[aria-expanded=true]]:rotate-45 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)]",
                                y: "7",
                                width: "16",
                                height: "2",
                                rx: "1"
                            }, void 0, false, {
                                fileName: "[project]/components/ui/mobile-menu.tsx",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                className: "origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] translate-y-[5px] group-[[aria-expanded=true]]:rotate-[135deg] group-[[aria-expanded=true]]:translate-y-0",
                                y: "7",
                                width: "16",
                                height: "2",
                                rx: "1"
                            }, void 0, false, {
                                fileName: "[project]/components/ui/mobile-menu.tsx",
                                lineNumber: 163,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/mobile-menu.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/mobile-menu.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                id: "mobile-nav",
                ref: mobileNav,
                className: "fixed top-16 z-50 ".concat(isRtl ? 'right-0' : 'left-0', " w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out"),
                style: mobileNavOpen ? {
                    maxHeight: (_mobileNav_current = mobileNav.current) === null || _mobileNav_current === void 0 ? void 0 : _mobileNav_current.scrollHeight,
                    opacity: 1
                } : {
                    maxHeight: 0,
                    opacity: 0.8
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "rounded-lg px-4 py-1.5 max-w-full ".concat(menuBgStyle, " bg-opacity-95 backdrop-blur-sm"),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                className: "flex font-medium text-sm ".concat(menuTextColorClass, " py-1.5"),
                                href: "/".concat(currentLocale, "/all-industries"),
                                children: t('navigation.industries')
                            }, void 0, false, {
                                fileName: "[project]/components/ui/mobile-menu.tsx",
                                lineNumber: 182,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/ui/mobile-menu.tsx",
                            lineNumber: 181,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                className: "flex font-medium text-sm ".concat(menuTextColorClass, " py-1.5"),
                                href: "/".concat(currentLocale, "/industries/report"),
                                children: t('navigation.reports')
                            }, void 0, false, {
                                fileName: "[project]/components/ui/mobile-menu.tsx",
                                lineNumber: 185,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/ui/mobile-menu.tsx",
                            lineNumber: 184,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                className: "flex font-medium text-sm ".concat(menuTextColorClass, " py-1.5"),
                                href: "/".concat(currentLocale, "/industries/data"),
                                children: t('navigation.data')
                            }, void 0, false, {
                                fileName: "[project]/components/ui/mobile-menu.tsx",
                                lineNumber: 188,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/ui/mobile-menu.tsx",
                            lineNumber: 187,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                className: "flex font-medium text-sm ".concat(menuTextColorClass, " py-1.5"),
                                href: "/".concat(currentLocale, "/industries/statistic"),
                                children: t('navigation.statistics')
                            }, void 0, false, {
                                fileName: "[project]/components/ui/mobile-menu.tsx",
                                lineNumber: 191,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/ui/mobile-menu.tsx",
                            lineNumber: 190,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                className: "flex font-medium text-sm ".concat(menuTextColorClass, " py-1.5"),
                                href: "/".concat(currentLocale, "/industries/manual"),
                                children: t('navigation.manuals')
                            }, void 0, false, {
                                fileName: "[project]/components/ui/mobile-menu.tsx",
                                lineNumber: 194,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/ui/mobile-menu.tsx",
                            lineNumber: 193,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                className: "flex font-medium text-sm ".concat(menuTextColorClass, " py-1.5"),
                                href: "/".concat(currentLocale, "/industries/course"),
                                children: t('navigation.courses')
                            }, void 0, false, {
                                fileName: "[project]/components/ui/mobile-menu.tsx",
                                lineNumber: 197,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/ui/mobile-menu.tsx",
                            lineNumber: 196,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/mobile-menu.tsx",
                    lineNumber: 180,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/mobile-menu.tsx",
                lineNumber: 174,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/mobile-menu.tsx",
        lineNumber: 138,
        columnNumber: 5
    }, this);
}
_s(MobileMenu, "Cut5K3wN3TEKmVFtUJ2Hak0mwPQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$context$2f$LoadingContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLoading"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = MobileMenu;
var _c;
__turbopack_context__.k.register(_c, "MobileMenu");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/authToken.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Shared auth token helpers.
 *
 * Cookie is the primary storage; localStorage is a backward-compatible fallback.
 * This file is intentionally NOT a "use client" module so it can be imported
 * from either client or server code safely (guards prevent accessing browser APIs).
 */ __turbopack_context__.s([
    "getAuthToken",
    ()=>getAuthToken,
    "getTokenFromCookie",
    ()=>getTokenFromCookie
]);
function getTokenFromCookie() {
    let cookieName = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 'token';
    if (typeof document === 'undefined') return null;
    // document.cookie is a single string: "a=1; b=2; token=...".
    const cookies = document.cookie ? document.cookie.split(';') : [];
    for (const rawCookie of cookies){
        const cookie = rawCookie.trim();
        if (!cookie) continue;
        const eqIndex = cookie.indexOf('=');
        if (eqIndex === -1) continue;
        const name = cookie.slice(0, eqIndex).trim();
        if (name !== cookieName) continue;
        const value = cookie.slice(eqIndex + 1);
        try {
            return decodeURIComponent(value);
        } catch (e) {
            return value;
        }
    }
    return null;
}
function getAuthToken() {
    const cookieToken = getTokenFromCookie('token');
    if (cookieToken) return cookieToken;
    // Backward compatibility: some flows may still have the token in localStorage.
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return localStorage.getItem('token');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/auth/GlobalProfileProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GlobalProfileProvider",
    ()=>GlobalProfileProvider,
    "useGlobalProfile",
    ()=>useGlobalProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/index.react-client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const ProfileContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    user: null,
    roles: [],
    isLoading: false,
    isAuthResolved: false,
    refreshProfile: async ()=>{},
    signOut: ()=>{}
});
const useGlobalProfile = ()=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ProfileContext);
};
_s(useGlobalProfile, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
// Global cache for user profile to prevent duplicate API calls across all components
let globalProfileCache = {
    user: null,
    roles: [],
    lastFetchTime: 0,
    isLoading: false,
    pendingPromise: null,
    authFailedToken: null
};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache
const ANGULAR_APP_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_ANGULAR_APP_URL || 'http://localhost:4200';
function GlobalProfileProvider(param) {
    let { children } = param;
    _s1();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(globalProfileCache.user);
    const [roles, setRoles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(globalProfileCache.roles);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    /**
   * IMPORTANT (SSR hydration):
   * `getAuthToken()` depends on browser APIs (cookie/localStorage), so it must NOT
   * influence the initial render output. Keep `isAuthResolved` deterministic on
   * server + first client render, then resolve it after mount in `refreshProfile()`.
   */ const [isAuthResolved, setIsAuthResolved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const clearAuthDataEverywhere = ()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('foresighta-creds');
            localStorage.removeItem('currentUser');
            localStorage.removeItem('authToken');
        } catch (e) {
        // ignore storage failures (private mode, etc.)
        }
        // Clear cookie variants (different Path/Domain combinations).
        // Note: Domain must match original cookie to be removed; we attempt common variants.
        const pathsToClear = [
            '/',
            '/en',
            '/ar'
        ];
        const domainsToClear = [
            undefined,
            '.insightabusiness.com'
        ];
        const cookieNames = [
            'token',
            'auth_token',
            'auth_user',
            'auth_return_url'
        ];
        for (const path of pathsToClear){
            for (const cookieName of cookieNames){
                // No domain (localhost / default)
                document.cookie = "".concat(cookieName, "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=").concat(path, ";");
                // Common production domain cookie
                for (const domain of domainsToClear){
                    if (!domain) continue;
                    document.cookie = "".concat(cookieName, "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=").concat(path, "; Domain=").concat(domain, ";");
                }
            }
        }
    };
    const resetProfileState = ()=>{
        globalProfileCache.user = null;
        globalProfileCache.roles = [];
        globalProfileCache.lastFetchTime = 0;
        globalProfileCache.pendingPromise = null;
        globalProfileCache.isLoading = false;
        setUser(null);
        setRoles([]);
    };
    // Fetch profile with retry logic
    const fetchProfileWithRetry = async function(token) {
        let maxRetries = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 3;
        for(let attempt = 1; attempt <= maxRetries; attempt++){
            try {
                const response = await fetch('https://api.foresighta.co/api/account/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': "Bearer ".concat(token),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Accept-Language': locale,
                        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
                    }
                });
                if (!response.ok) {
                    if (response.status === 401 || response.status === 403) {
                        // Mark as an auth failure; callers will clear token + stop refetch loops.
                        throw new Error("Auth failed: ".concat(response.status));
                    }
                    if (response.status === 429) {
                        // Rate limited — do NOT retry, it will only make things worse.
                        throw new Error("Rate limited: ".concat(response.status));
                    }
                    if (attempt < maxRetries) {
                        const delay = Math.pow(2, attempt - 1) * 1000;
                        await new Promise((resolve)=>setTimeout(resolve, delay));
                        continue;
                    }
                    throw new Error("Failed to fetch profile: ".concat(response.status));
                }
                const data = await response.json();
                var _data_data;
                const profile = (_data_data = data === null || data === void 0 ? void 0 : data.data) !== null && _data_data !== void 0 ? _data_data : {};
                var _profile_name, _profile_email, _profile_profile_photo_url, _profile_first_name, _profile_last_name, _profile_whatsapp_country_code, _profile_whatsapp_number;
                const userData = {
                    ...profile,
                    id: Number(profile.id),
                    uuid: profile.uuid,
                    name: (_profile_name = profile.name) !== null && _profile_name !== void 0 ? _profile_name : '',
                    email: (_profile_email = profile.email) !== null && _profile_email !== void 0 ? _profile_email : '',
                    profile_photo_url: (_profile_profile_photo_url = profile.profile_photo_url) !== null && _profile_profile_photo_url !== void 0 ? _profile_profile_photo_url : null,
                    first_name: (_profile_first_name = profile.first_name) !== null && _profile_first_name !== void 0 ? _profile_first_name : '',
                    last_name: (_profile_last_name = profile.last_name) !== null && _profile_last_name !== void 0 ? _profile_last_name : '',
                    company: profile.company,
                    country: profile.country,
                    country_id: profile.country_id,
                    whatsapp_country_code: (_profile_whatsapp_country_code = profile.whatsapp_country_code) !== null && _profile_whatsapp_country_code !== void 0 ? _profile_whatsapp_country_code : null,
                    whatsapp_number: (_profile_whatsapp_number = profile.whatsapp_number) !== null && _profile_whatsapp_number !== void 0 ? _profile_whatsapp_number : null
                };
                const rolesFromApi = Array.isArray(profile.roles) ? profile.roles : [];
                // Cache the profile for ALL roles (including admin) to avoid refetch loops.
                // Role-based redirects should be handled by RoleGuard; caching here is about
                // preventing repeated `/api/account/profile` calls (e.g., every 5s).
                globalProfileCache.user = userData;
                globalProfileCache.roles = rolesFromApi;
                globalProfileCache.lastFetchTime = Date.now();
                // Persist only for non-admin users (admin users are typically redirected to Angular).
                if (!rolesFromApi.includes('admin') && !rolesFromApi.includes('staff')) {
                    localStorage.setItem('user', JSON.stringify(userData));
                }
                return {
                    user: userData,
                    roles: rolesFromApi
                };
            } catch (error) {
                if (error instanceof Error && (error.message.includes('Auth failed') || error.message.includes('Rate limited')) || attempt === maxRetries) {
                    throw error;
                }
                const delay = Math.pow(2, attempt - 1) * 1000;
                await new Promise((resolve)=>setTimeout(resolve, delay));
            }
        }
        return {
            user: null,
            roles: []
        };
    };
    const refreshProfile = async function() {
        let forceRefresh = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
        try {
            const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
            const now = Date.now();
            // If we already got an auth failure for this exact token, do not re-call
            // the profile endpoint again (the interval would otherwise spam 401s).
            if (!forceRefresh && token && globalProfileCache.authFailedToken === token) {
                globalProfileCache.user = null;
                globalProfileCache.roles = [];
                globalProfileCache.lastFetchTime = 0;
                setUser(null);
                setRoles([]);
                return;
            }
            // Return cached data if still valid and not forced refresh
            if (!forceRefresh && globalProfileCache.user && now - globalProfileCache.lastFetchTime < CACHE_DURATION) {
                setUser(globalProfileCache.user);
                setRoles(globalProfileCache.roles);
                return;
            }
            if (!token) {
                // No token => logged out. Also reset any previous auth-failure block.
                globalProfileCache.authFailedToken = null;
                globalProfileCache.user = null;
                globalProfileCache.roles = [];
                globalProfileCache.lastFetchTime = 0;
                setUser(null);
                setRoles([]);
                return;
            }
            // If already fetching, return the pending promise
            if (globalProfileCache.pendingPromise) {
                try {
                    const result = await globalProfileCache.pendingPromise;
                    setUser(result.user);
                    setRoles(result.roles);
                } catch (error) {}
                return;
            }
            // Start new fetch
            setIsLoading(true);
            globalProfileCache.isLoading = true;
            globalProfileCache.pendingPromise = fetchProfileWithRetry(token);
            try {
                const result = await globalProfileCache.pendingPromise;
                setUser(result.user);
                setRoles(result.roles);
            } catch (error) {
                // Check if we have cached user data to fall back to
                const existingUser = localStorage.getItem('user');
                if (existingUser && !(error instanceof Error && error.message.includes('Auth failed'))) {
                    const cachedUserData = JSON.parse(existingUser);
                    globalProfileCache.user = cachedUserData;
                    setUser(cachedUserData);
                    setRoles(globalProfileCache.roles);
                } else {
                    // Only clear auth data on actual auth failures
                    if (error instanceof Error && error.message.includes('Auth failed')) {
                        // Block further attempts for this same token until it changes.
                        globalProfileCache.authFailedToken = token;
                        clearAuthDataEverywhere();
                        resetProfileState();
                    }
                }
            } finally{
                globalProfileCache.isLoading = false;
                globalProfileCache.pendingPromise = null;
                setIsLoading(false);
            }
        } finally{
            // Mark auth state as resolved after the first check (token/no-token/cached/fetch)
            setIsAuthResolved(true);
        }
    };
    const signOut = ()=>{
        clearAuthDataEverywhere();
        globalProfileCache.authFailedToken = null;
        resetProfileState();
        setIsAuthResolved(true);
        const timestamp = Date.now();
        const redirectUri = "".concat(window.location.origin, "/").concat(locale, "?t=").concat(timestamp);
        window.location.href = "".concat(ANGULAR_APP_URL, "/auth/logout?redirect_uri=").concat(encodeURIComponent(redirectUri));
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlobalProfileProvider.useEffect": ()=>{
            // Skip profile fetch for callback pages as they handle their own auth flow
            if (pathname.includes('/callback')) {
                return;
            }
            // Initial fetch when component mounts
            refreshProfile();
            // Set up auth state monitoring
            const checkAuthState = {
                "GlobalProfileProvider.useEffect.checkAuthState": ()=>{
                    const currentToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
                    // If we had a user but token is gone, clear state
                    if (globalProfileCache.user && !currentToken) {
                        globalProfileCache.authFailedToken = null;
                        globalProfileCache.user = null;
                        globalProfileCache.roles = [];
                        globalProfileCache.lastFetchTime = 0;
                        setUser(null);
                        setRoles([]);
                    } else if (currentToken && !globalProfileCache.user) {
                        // If the current token previously failed auth, do not keep retrying.
                        if (globalProfileCache.authFailedToken === currentToken) {
                            return;
                        }
                        refreshProfile();
                    } else if (!currentToken) {
                        // No token => ensure we don't keep a stale auth-failure block around.
                        globalProfileCache.authFailedToken = null;
                    }
                }
            }["GlobalProfileProvider.useEffect.checkAuthState"];
            // Check auth state every 5 seconds
            const interval = setInterval(checkAuthState, 5000);
            return ({
                "GlobalProfileProvider.useEffect": ()=>clearInterval(interval)
            })["GlobalProfileProvider.useEffect"];
        }
    }["GlobalProfileProvider.useEffect"], [
        pathname
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProfileContext.Provider, {
        value: {
            user,
            roles,
            isLoading,
            isAuthResolved,
            refreshProfile: ()=>refreshProfile(true),
            signOut
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/auth/GlobalProfileProvider.tsx",
        lineNumber: 335,
        columnNumber: 5
    }, this);
}
_s1(GlobalProfileProvider, "rqZzm0tBa2hxKKHlrX8b7lpP4sg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"]
    ];
});
_c = GlobalProfileProvider;
var _c;
__turbopack_context__.k.register(_c, "GlobalProfileProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/header/hooks/useUserProfile.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUserProfile",
    ()=>useUserProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$GlobalProfileProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/GlobalProfileProvider.tsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
function useUserProfile() {
    _s();
    const { user, roles, isLoading, isAuthResolved, refreshProfile, signOut } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$GlobalProfileProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobalProfile"])();
    const handleSignOut = ()=>{
        signOut();
    };
    return {
        user,
        roles,
        isLoading,
        isAuthResolved,
        refreshProfile,
        handleSignOut
    };
}
_s(useUserProfile, "P1XxWKm40WGfCKxpeAjIBF9oerE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$GlobalProfileProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobalProfile"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/header/components/UserProfile.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserProfile",
    ()=>UserProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/header/hooks/useUserProfile.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/index.react-client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
const getInitials = (firstName, lastName)=>{
    return "".concat(firstName[0]).concat(lastName[0]).toUpperCase();
};
const API_BASE_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || "https://api.foresighta.co";
// IMPORTANT: must be deterministic on BOTH SSR + first client render (hydration).
const ANGULAR_APP_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_ANGULAR_APP_URL || "http://localhost:4200";
function UserProfile(param) {
    let { isHome } = param;
    var _user_company, _user_company1;
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])("UserProfile");
    const { user, roles, isLoading, isAuthResolved, handleSignOut } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserProfile"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const isRtl = pathname.startsWith("/ar");
    const localeFromPath = isRtl ? "ar" : "en";
    var _user_whatsapp_number;
    const isWhatsAppMissing = String((_user_whatsapp_number = user === null || user === void 0 ? void 0 : user.whatsapp_number) !== null && _user_whatsapp_number !== void 0 ? _user_whatsapp_number : "").trim().length === 0;
    const promoCardSrc = isRtl ? "https://res.cloudinary.com/dsiku9ipv/image/upload/v1771682845/promo-ar-card_nwfawc.png" : "https://res.cloudinary.com/dsiku9ipv/image/upload/v1771682838/promo-en-card_cgilcv.png";
    const promoCardAlt = isRtl ? "أضف رقم واتساب" : "Add WhatsApp number";
    const canHaveDrafts = roles.includes("insighter") || roles.includes("company") || roles.includes("company-insighter");
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [menuMounted, setMenuMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dashboardOpen, setDashboardOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [settingsOpen, setSettingsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const profileRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const openRafIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [menuPosition, setMenuPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        top: 0,
        left: null,
        right: null
    });
    // Client-only values must be read after mount to avoid hydration mismatch.
    const [hasToken, setHasToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [returnUrl, setReturnUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [unpublishedDraftCount, setUnpublishedDraftCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const openMenu = ()=>{
        setMenuMounted(true);
        if (openRafIdRef.current !== null) {
            window.cancelAnimationFrame(openRafIdRef.current);
        }
        openRafIdRef.current = window.requestAnimationFrame(()=>{
            setMenuOpen(true);
        });
    };
    const closeMenu = ()=>{
        if (openRafIdRef.current !== null) {
            window.cancelAnimationFrame(openRafIdRef.current);
            openRafIdRef.current = null;
        }
        setMenuOpen(false);
        setDashboardOpen(false);
        setSettingsOpen(false);
    };
    // Keep the menu mounted briefly to allow a fade-out animation on close.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserProfile.useEffect": ()=>{
            if (menuOpen) {
                setMenuMounted(true);
                return;
            }
            const timeout = window.setTimeout({
                "UserProfile.useEffect.timeout": ()=>{
                    setMenuMounted(false);
                }
            }["UserProfile.useEffect.timeout"], 160);
            return ({
                "UserProfile.useEffect": ()=>{
                    window.clearTimeout(timeout);
                }
            })["UserProfile.useEffect"];
        }
    }["UserProfile.useEffect"], [
        menuOpen
    ]);
    // Calculate and update menu position whenever it opens
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserProfile.useEffect": ()=>{
            if (menuOpen && profileRef.current) {
                const rect = profileRef.current.getBoundingClientRect();
                const viewportWidth = window.innerWidth;
                // For smaller screens, center the menu
                if (viewportWidth < 640) {
                    setMenuPosition({
                        // Menu is `position: fixed`, so use viewport coordinates (no scrollY offset)
                        top: rect.bottom,
                        left: Math.max(10, viewportWidth / 2 - 150),
                        right: null
                    });
                } else {
                    // For larger screens, align with profile button
                    if (isRtl) {
                        setMenuPosition({
                            // Menu is `position: fixed`, so use viewport coordinates (no scrollY offset)
                            top: rect.bottom,
                            left: Math.max(10, rect.left),
                            right: null
                        });
                    } else {
                        setMenuPosition({
                            // Menu is `position: fixed`, so use viewport coordinates (no scrollY offset)
                            top: rect.bottom,
                            left: null,
                            right: Math.max(10, viewportWidth - rect.right)
                        });
                    }
                }
            }
        }
    }["UserProfile.useEffect"], [
        menuOpen,
        isRtl
    ]);
    // Close menu when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserProfile.useEffect": ()=>{
            function handleClickOutside(event) {
                if (menuRef.current && !menuRef.current.contains(event.target) && profileRef.current && !profileRef.current.contains(event.target)) {
                    closeMenu();
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return ({
                "UserProfile.useEffect": ()=>{
                    document.removeEventListener("mousedown", handleClickOutside);
                }
            })["UserProfile.useEffect"];
        }
    }["UserProfile.useEffect"], []);
    // Handle escape key to close menu
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserProfile.useEffect": ()=>{
            function handleEscKey(event) {
                if (event.key === "Escape") {
                    closeMenu();
                }
            }
            if (menuOpen) {
                document.addEventListener("keydown", handleEscKey);
            }
            return ({
                "UserProfile.useEffect": ()=>{
                    document.removeEventListener("keydown", handleEscKey);
                }
            })["UserProfile.useEffect"];
        }
    }["UserProfile.useEffect"], [
        menuOpen
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserProfile.useEffect": ()=>{
            setHasToken(!!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])());
            setReturnUrl(window.location.href);
        }
    }["UserProfile.useEffect"], [
        pathname
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserProfile.useEffect": ()=>{
            let ignore = false;
            async function loadDraftCount() {
                if (!menuOpen) return;
                if (!canHaveDrafts) {
                    setUnpublishedDraftCount(0);
                    return;
                }
                const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
                if (!token) {
                    setUnpublishedDraftCount(0);
                    return;
                }
                try {
                    var _data_data_find, _data_data;
                    const res = await fetch("https://api.foresighta.co/api/insighter/library/knowledge/status/statistics", {
                        headers: {
                            Authorization: "Bearer ".concat(token),
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            "Accept-Language": isRtl ? "ar" : "en",
                            "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone
                        },
                        cache: "no-store"
                    });
                    if (!res.ok) {
                        if (!ignore) setUnpublishedDraftCount(0);
                        return;
                    }
                    const data = await res.json();
                    var _data_data_find_count;
                    const count = (_data_data_find_count = data === null || data === void 0 ? void 0 : (_data_data = data.data) === null || _data_data === void 0 ? void 0 : (_data_data_find = _data_data.find({
                        "UserProfile.useEffect.loadDraftCount": (s)=>s.status === "unpublished"
                    }["UserProfile.useEffect.loadDraftCount"])) === null || _data_data_find === void 0 ? void 0 : _data_data_find.count) !== null && _data_data_find_count !== void 0 ? _data_data_find_count : 0;
                    if (!ignore) setUnpublishedDraftCount(count);
                } catch (e) {
                    if (!ignore) setUnpublishedDraftCount(0);
                }
            }
            loadDraftCount();
            return ({
                "UserProfile.useEffect": ()=>{
                    ignore = true;
                }
            })["UserProfile.useEffect"];
        }
    }["UserProfile.useEffect"], [
        menuOpen,
        canHaveDrafts,
        isRtl
    ]);
    const isClient$ = ()=>{
        return roles.includes("client") && !roles.includes("insighter") && !roles.includes("company") && !roles.includes("company-insighter");
    };
    if (!isAuthResolved) {
        return hasToken ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-10 h-10 bg-white animate-pulse rounded-full overflow-hidden border border-gray-200"
        }, void 0, false, {
            fileName: "[project]/components/ui/header/components/UserProfile.tsx",
            lineNumber: 236,
            columnNumber: 7
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-9 w-24 bg-gray-200 animate-pulse rounded-full overflow-hidden border border-gray-200"
        }, void 0, false, {
            fileName: "[project]/components/ui/header/components/UserProfile.tsx",
            lineNumber: 238,
            columnNumber: 7
        }, this);
    }
    if (isLoading && hasToken) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-10 h-10 bg-white animate-pulse rounded-full overflow-hidden border border-gray-200"
        }, void 0, false, {
            fileName: "[project]/components/ui/header/components/UserProfile.tsx",
            lineNumber: 243,
            columnNumber: 12
        }, this);
    }
    if (!user) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "http://localhost:4200/auth/login?returnUrl=".concat(encodeURIComponent(returnUrl)),
                className: "btn-sm bg-gray-800 text-gray-200 shadow hover:bg-gray-900",
                children: t("login")
            }, void 0, false, {
                fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                lineNumber: 249,
                columnNumber: 9
            }, this)
        }, void 0, false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                ref: profileRef,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center cursor-pointer",
                    onClick: ()=>menuOpen ? closeMenu() : openMenu(),
                    children: user.profile_photo_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: user.profile_photo_url,
                            alt: user.name,
                            width: 100,
                            height: 100,
                            quality: 100,
                            className: "w-full h-full object-cover object-top"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                            lineNumber: 296,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                        lineNumber: 295,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center text-blue-600 text-sm font-medium border border-gray-200",
                        children: getInitials(user.first_name, user.last_name)
                    }, void 0, false, {
                        fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                        lineNumber: 306,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                    lineNumber: 262,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                lineNumber: 261,
                columnNumber: 7
            }, this),
            menuMounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: menuRef,
                className: [
                    "fixed bg-white rounded-lg shadow-xl py-3 z-[9999] w-[300px] max-h-[80vh] overflow-y-auto",
                    "transition-all duration-150 ease-out motion-reduce:transition-none",
                    menuOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-[0.98] pointer-events-none"
                ].join(" "),
                style: {
                    top: "".concat(menuPosition.top, "px"),
                    left: menuPosition.left !== null ? "".concat(menuPosition.left, "px") : "auto",
                    right: menuPosition.right !== null ? "".concat(menuPosition.right, "px") : "auto"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-3 border-b border-gray-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                user.profile_photo_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-10 rounded-lg overflow-hidden flex-shrink-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: user.profile_photo_url,
                                        alt: user.name,
                                        width: 100,
                                        height: 100,
                                        quality: 100,
                                        className: "w-full h-full object-cover object-top"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                        lineNumber: 363,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                    lineNumber: 362,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 text-sm font-medium flex-shrink-0 border border-gray-200",
                                    children: getInitials(user.first_name, user.last_name)
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                    lineNumber: 373,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0 flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-1 items-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-bold text-gray-900 truncate",
                                                children: [
                                                    user.first_name,
                                                    " ",
                                                    user.last_name
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                lineNumber: 380,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                            lineNumber: 379,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-1",
                                            children: [
                                                roles.includes("insighter") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "bg-[#DFFEE9] text-[#1BC653] text-xs font-bold px-1.5 rounded-sm dark:bg-blue-900 dark:text-blue-300 whitespace-nowrap",
                                                    children: t("insighter")
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                    lineNumber: 387,
                                                    columnNumber: 21
                                                }, this),
                                                roles.includes("company-insighter") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "bg-[#EFF8FF] text-[#299AF8]  text-xs font-semibold px-1.5 rounded-sm dark:bg-yellow-900 dark:text-yellow-300 whitespace-nowrap",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "bg-[#EFF8FF] text-[#299AF8]  text-xs font-semibold px-1.5 rounded-sm dark:bg-yellow-900 dark:text-yellow-300 whitespace-nowrap",
                                                            children: [
                                                                t("insighter"),
                                                                " ",
                                                                isRtl ? "في" : "at",
                                                                " ",
                                                                " " + ((_user_company = user.company) === null || _user_company === void 0 ? void 0 : _user_company.legal_name)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                            lineNumber: 395,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                        lineNumber: 394,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false),
                                                roles.includes("company") && !roles.includes("company-insighter") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-1 pt-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "bg-[#EFF8FF] text-[#299AF8]  text-xs font-semibold px-1.5 rounded-sm dark:bg-yellow-900 dark:text-yellow-300 whitespace-nowrap",
                                                            children: (_user_company1 = user.company) === null || _user_company1 === void 0 ? void 0 : _user_company1.legal_name
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                            lineNumber: 406,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "bg-[#EFF8FF] text-[#299AF8]  text-xs font-semibold px-1.5 rounded-sm dark:bg-yellow-900 dark:text-yellow-300 whitespace-nowrap",
                                                            children: t("manager")
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                            lineNumber: 409,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                    lineNumber: 404,
                                                    columnNumber: 23
                                                }, this),
                                                roles.includes("client") && !roles.some((role)=>[
                                                        "insighter",
                                                        "company",
                                                        "company-insighter"
                                                    ].includes(role)) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "bg-[#dafdff] text-[#06a2b2] text-xs font-bold px-1.5 rounded-md whitespace-nowrap",
                                                    children: t("client")
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                    lineNumber: 420,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                            lineNumber: 385,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                    lineNumber: 378,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                            lineNumber: 332,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                        lineNumber: 331,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-3 pt-3 pb-3 border-b border-slate-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "http://localhost:4200/app/insighter-dashboard/my-dashboard",
                            className: "flex items-center gap-2.5 px-1 py-1 rounded-lg border border-indigo-50 bg-gradient-to-r from-white to-indigo-50 text-indigo-700 font-semibold hover:to-indigo-100 transition-colors",
                            onClick: ()=>setMenuOpen(false),
                            style: {
                                fontSize: '13px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "33",
                                    height: "33",
                                    viewBox: "0 0 33 33",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                            filter: "url(#filter0_d_667_189)",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                    x: "3.75",
                                                    y: "2.43994",
                                                    width: "25",
                                                    height: "25",
                                                    rx: "6.25",
                                                    fill: "white",
                                                    "shape-rendering": "crispEdges"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                    lineNumber: 439,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M9.375 21.8149V19.9399H11.875V21.8149",
                                                    fill: "#FFC657"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                    lineNumber: 440,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M9.375 19.9399V18.0649H11.875V19.9399",
                                                    fill: "#FFE0A6"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                    lineNumber: 441,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M13.125 21.8149V18.3774H15.625V21.8149",
                                                    fill: "#1072FF"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                    lineNumber: 442,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M13.125 18.3774V14.9399H15.625V18.3774",
                                                    fill: "#CBE1FF"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                    lineNumber: 443,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M20.625 21.8149V15.5649H23.125V21.8149",
                                                    fill: "#1072FF"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                    lineNumber: 444,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M20.625 15.5649V9.31494H23.125V15.5649",
                                                    fill: "#CBE1FF"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                    lineNumber: 445,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M16.875 21.8149V17.1274H19.375V21.8149",
                                                    fill: "#FFC657"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                    lineNumber: 446,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M16.875 17.1274V12.4399H19.375V17.1274",
                                                    fill: "#FFE0A6"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                    lineNumber: 447,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                            lineNumber: 438,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                                id: "filter0_d_667_189",
                                                x: "0",
                                                y: "-5.8651e-05",
                                                width: "32.5",
                                                height: "32.5",
                                                filterUnits: "userSpaceOnUse",
                                                "color-interpolation-filters": "sRGB",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feFlood", {
                                                        "flood-opacity": "0",
                                                        result: "BackgroundImageFix"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                        lineNumber: 451,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feColorMatrix", {
                                                        in: "SourceAlpha",
                                                        type: "matrix",
                                                        values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                                                        result: "hardAlpha"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                        lineNumber: 452,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feOffset", {
                                                        dy: "1.31"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                        lineNumber: 453,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                                        stdDeviation: "1.875"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                        lineNumber: 454,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
                                                        in2: "hardAlpha",
                                                        operator: "out"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                        lineNumber: 455,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feColorMatrix", {
                                                        type: "matrix",
                                                        values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                        lineNumber: 456,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feBlend", {
                                                        mode: "normal",
                                                        in2: "BackgroundImageFix",
                                                        result: "effect1_dropShadow_667_189"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                        lineNumber: 457,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feBlend", {
                                                        mode: "normal",
                                                        in: "SourceGraphic",
                                                        in2: "effect1_dropShadow_667_189",
                                                        result: "shape"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                        lineNumber: 458,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                lineNumber: 450,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                            lineNumber: 449,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                    lineNumber: 437,
                                    columnNumber: 15
                                }, this),
                                t("dashboard")
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                            lineNumber: 431,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                        lineNumber: 430,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-2 px-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: roles.includes("insighter") || roles.includes("company") || roles.includes("company-insighter") ? "border-b border-slate-100" : "",
                                children: [
                                    (roles.includes("insighter") || roles.includes("company") || roles.includes("company-insighter")) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "http://localhost:4200/app/add-knowledge/stepper",
                                                className: "block px-4 py-2.5 text-sm font-medium text-sky-600 hover:bg-indigo-50 hover:text-sky-700",
                                                onClick: ()=>setMenuOpen(false),
                                                style: {
                                                    fontSize: '13px'
                                                },
                                                children: t("addInsight")
                                            }, void 0, false, {
                                                fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                lineNumber: 474,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "http://localhost:4200/app/insighter-dashboard/my-knowledge/general",
                                                className: "flex items-center gap-2 px-4 py-2.5 font-semibold text-slate-900 hover:bg-indigo-50 hover:text-sky-700",
                                                onClick: ()=>setMenuOpen(false),
                                                style: {
                                                    fontSize: '13px'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: t("insightBase")
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                        lineNumber: 488,
                                                        columnNumber: 23
                                                    }, this),
                                                    unpublishedDraftCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "bg-[#fff8dd] text-[#e8af13] text-[11px] font-bold px-2 py-0.5  rounded-[0.425rem]",
                                                        children: [
                                                            unpublishedDraftCount,
                                                            " ",
                                                            isRtl ? "محفوظ" : "Draft",
                                                            " - ",
                                                            isRtl ? "أكمل الان!" : "Complete Now!"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                        lineNumber: 490,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                                lineNumber: 482,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    roles.includes('company') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "http://localhost:4200/app/insighter-dashboard/my-company-settings",
                                        className: "block px-4 py-2.5  font-semibold text-slate-900 hover:bg-indigo-50 hover:text-sky-700",
                                        onClick: ()=>setMenuOpen(false),
                                        style: {
                                            fontSize: '13px'
                                        },
                                        children: t("myCompany")
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                        lineNumber: 499,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                lineNumber: 469,
                                columnNumber: 13
                            }, this),
                            !isClient$() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "http://localhost:3000/en/profile/".concat(user.uuid, "?entity=insighter"),
                                className: "block px-4 py-2.5  font-semibold text-slate-900 hover:bg-indigo-50 hover:text-sky-700",
                                style: {
                                    fontSize: '13px'
                                },
                                onClick: ()=>setMenuOpen(false),
                                children: t("myInsighterPage")
                            }, void 0, false, {
                                fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                lineNumber: 509,
                                columnNumber: 31
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "http://localhost:4200/app/insighter-dashboard/my-downloads",
                                className: "block px-4 py-2.5 font-semibold text-slate-900 hover:bg-indigo-50 hover:text-sky-700",
                                onClick: ()=>setMenuOpen(false),
                                style: {
                                    fontSize: '13px'
                                },
                                children: isRtl ? "التحميلات" : "My Downloads"
                            }, void 0, false, {
                                fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                lineNumber: 517,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/".concat(localeFromPath, "/profile/settings"),
                                className: "block px-4 py-3  font-semibold text-slate-900 hover:bg-indigo-50 hover:text-sky-700",
                                style: {
                                    fontSize: '13px'
                                },
                                onClick: ()=>setMenuOpen(false),
                                children: t("myProfile")
                            }, void 0, false, {
                                fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                lineNumber: 533,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "http://localhost:4200/app/insighter-dashboard/account-settings/general-settings",
                                className: "block px-4 py-2.5 font-semibold text-slate-900 hover:bg-indigo-50 hover:text-sky-700",
                                onClick: ()=>setMenuOpen(false),
                                style: {
                                    fontSize: '13px'
                                },
                                children: t("settings")
                            }, void 0, false, {
                                fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                lineNumber: 541,
                                columnNumber: 13
                            }, this),
                            roles.includes("client") && !roles.includes("insighter") && !roles.includes("company") && !roles.includes("company-insighter") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "http://localhost:4200/app/insighter-register/vertical",
                                        className: "block px-4 py-2.5  font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400",
                                        onClick: ()=>setMenuOpen(false),
                                        style: {
                                            fontSize: '13px'
                                        },
                                        children: t("becomeInsighter")
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                        lineNumber: 566,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "block px-4 pt-1 text-gray-500 pb-2",
                                        style: {
                                            fontSize: '12px',
                                            lineHeight: '1.4'
                                        },
                                        children: t("becomeInsighterDescription")
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                        lineNumber: 574,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-t border-slate-100",
                                children: [
                                    isWhatsAppMissing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "http://localhost:4200/app/insighter-dashboard/account-settings/notification-settings",
                                        className: "block px-4 pt-3 pb-2",
                                        onClick: ()=>setMenuOpen(false),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: promoCardSrc,
                                            alt: promoCardAlt,
                                            width: 800,
                                            height: 300,
                                            quality: 100,
                                            className: "w-full h-auto rounded-md"
                                        }, void 0, false, {
                                            fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                            lineNumber: 590,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                        lineNumber: 585,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setMenuOpen(false);
                                            handleSignOut();
                                        },
                                        className: "block w-full text-left px-4 py-2.5  font-semibold text-slate-900 hover:bg-indigo-50 hover:text-sky-700",
                                        style: {
                                            fontSize: '13px'
                                        },
                                        children: t("signOut")
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                        lineNumber: 601,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                                lineNumber: 583,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                        lineNumber: 468,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/header/components/UserProfile.tsx",
                lineNumber: 314,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(UserProfile, "bxS5NZpCe36pTIzAOznYtFd4sQQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserProfile"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = UserProfile;
var _c;
__turbopack_context__.k.register(_c, "UserProfile");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/utils/mouse-position.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>useMousePosition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useMousePosition() {
    _s();
    const [mousePosition, setMousePosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMousePosition.useEffect": ()=>{
            const handleMouseMove = {
                "useMousePosition.useEffect.handleMouseMove": (event)=>{
                    setMousePosition({
                        x: event.clientX,
                        y: event.clientY
                    });
                }
            }["useMousePosition.useEffect.handleMouseMove"];
            window.addEventListener('mousemove', handleMouseMove);
            return ({
                "useMousePosition.useEffect": ()=>{
                    window.removeEventListener('mousemove', handleMouseMove);
                }
            })["useMousePosition.useEffect"];
        }
    }["useMousePosition.useEffect"], []);
    return mousePosition;
}
_s(useMousePosition, "fMKQEA5Ch9a+sa/f9kYDpd8GZ50=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/particles.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Particles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$utils$2f$mouse$2d$position$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/utils/mouse-position.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function Particles(param) {
    let { className = '', quantity = 30, staticity = 50, ease = 50, refresh = false } = param;
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const circles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const mousePosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$utils$2f$mouse$2d$position$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    const mouse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const canvasSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        w: 0,
        h: 0
    });
    const dpr = ("TURBOPACK compile-time truthy", 1) ? window.devicePixelRatio : "TURBOPACK unreachable";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Particles.useEffect": ()=>{
            if (canvasRef.current) {
                context.current = canvasRef.current.getContext('2d');
            }
            initCanvas();
            animate();
            window.addEventListener('resize', initCanvas);
            return ({
                "Particles.useEffect": ()=>{
                    window.removeEventListener('resize', initCanvas);
                }
            })["Particles.useEffect"];
        }
    }["Particles.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Particles.useEffect": ()=>{
            onMouseMove();
        }
    }["Particles.useEffect"], [
        mousePosition.x,
        mousePosition.y
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Particles.useEffect": ()=>{
            initCanvas();
        }
    }["Particles.useEffect"], [
        refresh
    ]);
    const initCanvas = ()=>{
        resizeCanvas();
        drawParticles();
    };
    const onMouseMove = ()=>{
        if (canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect();
            const { w, h } = canvasSize.current;
            const x = mousePosition.x - rect.left - w / 2;
            const y = mousePosition.y - rect.top - h / 2;
            const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
            if (inside) {
                mouse.current.x = x;
                mouse.current.y = y;
            }
        }
    };
    const resizeCanvas = ()=>{
        if (canvasContainerRef.current && canvasRef.current && context.current) {
            circles.current.length = 0;
            canvasSize.current.w = canvasContainerRef.current.offsetWidth;
            canvasSize.current.h = canvasContainerRef.current.offsetHeight;
            canvasRef.current.width = canvasSize.current.w * dpr;
            canvasRef.current.height = canvasSize.current.h * dpr;
            canvasRef.current.style.width = canvasSize.current.w + 'px';
            canvasRef.current.style.height = canvasSize.current.h + 'px';
            context.current.scale(dpr, dpr);
        }
    };
    const circleParams = ()=>{
        const x = Math.floor(Math.random() * canvasSize.current.w);
        const y = Math.floor(Math.random() * canvasSize.current.h);
        const translateX = 0;
        const translateY = 0;
        const size = Math.floor(Math.random() * 2) + 1;
        const alpha = 0;
        const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
        const dx = (Math.random() - 0.5) * 0.2;
        const dy = (Math.random() - 0.5) * 0.2;
        const magnetism = 0.1 + Math.random() * 4;
        return {
            x,
            y,
            translateX,
            translateY,
            size,
            alpha,
            targetAlpha,
            dx,
            dy,
            magnetism
        };
    };
    const drawCircle = function(circle) {
        let update = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        if (context.current) {
            const { x, y, translateX, translateY, size, alpha } = circle;
            context.current.translate(translateX, translateY);
            context.current.beginPath();
            context.current.arc(x, y, size, 0, 2 * Math.PI);
            context.current.fillStyle = "rgba(255, 255, 255, ".concat(alpha, ")");
            context.current.fill();
            context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
            if (!update) {
                circles.current.push(circle);
            }
        }
    };
    const clearContext = ()=>{
        if (context.current) {
            context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
        }
    };
    const drawParticles = ()=>{
        clearContext();
        const particleCount = quantity;
        for(let i = 0; i < particleCount; i++){
            const circle = circleParams();
            drawCircle(circle);
        }
    };
    const remapValue = (value, start1, end1, start2, end2)=>{
        const remapped = (value - start1) * (end2 - start2) / (end1 - start1) + start2;
        return remapped > 0 ? remapped : 0;
    };
    const animate = ()=>{
        clearContext();
        // Create a new array for circles to be removed
        const circlesToRemove = [];
        circles.current.forEach((circle, i)=>{
            // Handle the alpha value
            const edge = [
                circle.x + circle.translateX - circle.size,
                canvasSize.current.w - circle.x - circle.translateX - circle.size,
                circle.y + circle.translateY - circle.size,
                canvasSize.current.h - circle.y - circle.translateY - circle.size
            ];
            const closestEdge = edge.reduce((a, b)=>Math.min(a, b));
            const remapClosestEdge = parseFloat(remapValue(closestEdge, 0, 20, 0, 1).toFixed(2));
            if (remapClosestEdge > 1) {
                circle.alpha += 0.02;
                if (circle.alpha > circle.targetAlpha) circle.alpha = circle.targetAlpha;
            } else {
                circle.alpha = circle.targetAlpha * remapClosestEdge;
            }
            circle.x += circle.dx;
            circle.y += circle.dy;
            circle.translateX += (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
            circle.translateY += (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;
            // circle gets out of the canvas
            if (circle.x < -circle.size || circle.x > canvasSize.current.w + circle.size || circle.y < -circle.size || circle.y > canvasSize.current.h + circle.size) {
                // Mark this circle for removal instead of removing it immediately
                circlesToRemove.push(i);
            } else {
                drawCircle({
                    ...circle,
                    x: circle.x,
                    y: circle.y,
                    translateX: circle.translateX,
                    translateY: circle.translateY,
                    alpha: circle.alpha
                }, true);
            }
        });
        // Remove circles in reverse order so indices stay valid
        for(let i = circlesToRemove.length - 1; i >= 0; i--){
            const index = circlesToRemove[i];
            circles.current.splice(index, 1);
            // Create a new circle to replace the removed one
            const newCircle = circleParams();
            drawCircle(newCircle);
        }
        window.requestAnimationFrame(animate);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        ref: canvasContainerRef,
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
            ref: canvasRef
        }, void 0, false, {
            fileName: "[project]/components/particles.tsx",
            lineNumber: 216,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/particles.tsx",
        lineNumber: 215,
        columnNumber: 5
    }, this);
}
_s(Particles, "bHz06oINEQAlNWXIS/XfnkNKI2k=");
_c = Particles;
var _c;
__turbopack_context__.k.register(_c, "Particles");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/SvgIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SvgIcon",
    ()=>SvgIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
const svgCache = new Map();
const pendingFetches = new Map();
const SvgIcon = (param)=>{
    let { src, className = '', color } = param;
    _s();
    const [svgContent, setSvgContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "SvgIcon.useState": ()=>{
            var _svgCache_get;
            return (_svgCache_get = svgCache.get(src)) !== null && _svgCache_get !== void 0 ? _svgCache_get : '';
        }
    }["SvgIcon.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SvgIcon.useEffect": ()=>{
            if (svgCache.has(src)) {
                setSvgContent(svgCache.get(src));
                return;
            }
            let cancelled = false;
            const fetchSvg = {
                "SvgIcon.useEffect.fetchSvg": async ()=>{
                    try {
                        if (!pendingFetches.has(src)) {
                            pendingFetches.set(src, fetch(src).then({
                                "SvgIcon.useEffect.fetchSvg": (r)=>r.text()
                            }["SvgIcon.useEffect.fetchSvg"]));
                        }
                        const svgText = await pendingFetches.get(src);
                        svgCache.set(src, svgText);
                        pendingFetches.delete(src);
                        if (!cancelled) setSvgContent(svgText);
                    } catch (error) {
                        pendingFetches.delete(src);
                        console.error('Error loading SVG:', error);
                    }
                }
            }["SvgIcon.useEffect.fetchSvg"];
            fetchSvg();
            return ({
                "SvgIcon.useEffect": ()=>{
                    cancelled = true;
                }
            })["SvgIcon.useEffect"];
        }
    }["SvgIcon.useEffect"], [
        src
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: className,
        dangerouslySetInnerHTML: {
            __html: svgContent
        }
    }, void 0, false, {
        fileName: "[project]/components/ui/SvgIcon.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(SvgIcon, "Z5E3PZNd6Zr3ElY5dl/9teqVJ8I=");
_c = SvgIcon;
var _c;
__turbopack_context__.k.register(_c, "SvgIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/utils/notificationRoute.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Routing for KNOLDG project notifications.
 *
 * These events are broadcast by the same Laravel backend that the Angular app
 * (KNOLDG-APP) listens to. On click we navigate to the Angular dashboard pages
 * (same tab), so the base URL is hardcoded to localhost:4200.
 *
 * Routing is keyed on `event_name` first (the most reliable signal — some events
 * share a `sub_type`). For REST history, which carries no `event_name`, we fall
 * back to `sub_type` + the user's role.
 *
 * `param` carries the routing id: a UUID for most events, an integer id for
 * `order.project` and `project.service.started`.
 */ __turbopack_context__.s([
    "DASHBOARD",
    ()=>DASHBOARD,
    "routeForNotification",
    ()=>routeForNotification
]);
const DASHBOARD = 'http://localhost:4200';
// `project.discussion.message` always lands on the production dashboard host,
// regardless of the host the backend baked into `param` (it may be localhost in
// dev). See `discussionUrlFromParam`.
const PROD_DASHBOARD = 'https://app.foresighta.co';
// Dashboard list pages (used as guards when `param` is missing).
const INSIGHTER_ON_WORK = "".concat(DASHBOARD, "/app/insighter-dashboard/on-work-projects");
const CLIENT_PROJECTS = "".concat(DASHBOARD, "/app/insighter-dashboard/projects-created");
const PROJECT_OFFERS = "".concat(DASHBOARD, "/app/insighter-dashboard/project-offers");
const SALES = "".concat(DASHBOARD, "/app/insighter-dashboard/sales?tab=2");
/**
 * Roles that view a project from the insighter (worker) side. Everyone else is
 * treated as the client side.
 */ const INSIGHTER_ROLES = new Set([
    'insighter',
    'company',
    'company-insighter'
]);
function isInsighterSide() {
    let roles = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return roles.some((role)=>INSIGHTER_ROLES.has(role));
}
function hasParam(param) {
    return param !== undefined && param !== null && param !== '';
}
/**
 * `project.discussion.message` is special: the backend resolves the exact
 * destination (proposal vs project stage, client vs insighter side) and ships
 * the full URL in `param`. We don't re-derive the route here — we just take its
 * path, pin it to the production dashboard host, and force the discussion tab.
 */ function discussionUrlFromParam(param) {
    const raw = hasParam(param) ? String(param).trim() : '';
    let path = '';
    try {
        // `param` is usually a full URL (localhost or prod) — keep only its path.
        path = new URL(raw).pathname;
    } catch (e) {
        // Not an absolute URL: treat as a path and drop any existing query/hash.
        path = raw.split(/[?#]/)[0];
        if (path && !path.startsWith('/')) path = "/".concat(path);
    }
    return "".concat(PROD_DASHBOARD).concat(path, "?tab=discussion");
}
/** insighter → on-work details, client → projects-created details (role-based events). */ function roleBasedProjectUrl(param, roles) {
    if (isInsighterSide(roles)) {
        return hasParam(param) ? "".concat(INSIGHTER_ON_WORK, "/details/").concat(param) : INSIGHTER_ON_WORK;
    }
    return hasParam(param) ? "".concat(CLIENT_PROJECTS, "/").concat(param) : CLIENT_PROJECTS;
}
/**
 * Returns the target dashboard URL for a project notification, or `null` if the
 * notification isn't one of the project events (caller should fall back to its
 * existing routing).
 */ function dashboardUrlFromBackendUrl(rawUrl) {
    if (!hasParam(rawUrl)) return null;
    const raw = String(rawUrl).trim();
    try {
        const parsed = new URL(raw);
        return "".concat(DASHBOARD).concat(parsed.pathname).concat(parsed.search);
    } catch (e) {
        const path = raw.startsWith('/') ? raw : "/".concat(raw);
        return "".concat(DASHBOARD).concat(path);
    }
}
function routeForNotification(notification) {
    let roles = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    const param = notification.param;
    // 1) Route by event_name (realtime broadcasts) — most reliable.
    switch(notification.event_name){
        case 'project.match.invited':
            return hasParam(param) ? "".concat(PROJECT_OFFERS, "/details/").concat(param) : PROJECT_OFFERS;
        case 'project.proposal.offer':
            return CLIENT_PROJECTS;
        case 'project.insighter.closed':
        case 'project.insighter.contract':
        case 'project.review.submission.reviewed':
            return hasParam(param) ? "".concat(INSIGHTER_ON_WORK, "/details/").concat(param) : INSIGHTER_ON_WORK;
        case 'project.client.closed':
        case 'project.client.contract':
        case 'project.client.started':
        case 'project.review.submission':
            return hasParam(param) ? "".concat(CLIENT_PROJECTS, "/").concat(param) : CLIENT_PROJECTS;
        case 'project.service.started':
            return INSIGHTER_ON_WORK;
        case 'order.project':
            return SALES;
        case 'project.file.uploaded':
            return roleBasedProjectUrl(param, roles);
        case 'project.discussion.message':
            return discussionUrlFromParam(param);
        case 'project.insighter.offer.technical-decision':
        case 'project.insighter.offer.not-selected':
            return PROJECT_OFFERS;
        case 'project.insighter.cancelled':
            var _dashboardUrlFromBackendUrl;
            return (_dashboardUrlFromBackendUrl = dashboardUrlFromBackendUrl(notification.url)) !== null && _dashboardUrlFromBackendUrl !== void 0 ? _dashboardUrlFromBackendUrl : INSIGHTER_ON_WORK;
    }
    // 2) REST-history fallback (no event_name): route by sub_type + role.
    switch(notification.sub_type){
        case 'project_proposal':
            return hasParam(param) ? "".concat(PROJECT_OFFERS, "/details/").concat(param) : PROJECT_OFFERS;
        case 'project_proposal_offer':
            return CLIENT_PROJECTS;
        case 'project_review_submission_reviewed':
            return hasParam(param) ? "".concat(INSIGHTER_ON_WORK, "/details/").concat(param) : INSIGHTER_ON_WORK;
        case 'project_review_submission':
            return hasParam(param) ? "".concat(CLIENT_PROJECTS, "/").concat(param) : CLIENT_PROJECTS;
        case 'project_offer_technical_decision':
        case 'project_offer_not_selected':
            return PROJECT_OFFERS;
        case 'project_cancelled':
            var _dashboardUrlFromBackendUrl1;
            return (_dashboardUrlFromBackendUrl1 = dashboardUrlFromBackendUrl(notification.url)) !== null && _dashboardUrlFromBackendUrl1 !== void 0 ? _dashboardUrlFromBackendUrl1 : INSIGHTER_ON_WORK;
        case 'project_service':
            return INSIGHTER_ON_WORK;
        case 'project_file_uploaded':
        // `project_closed` and `project` are ambiguous (client vs insighter) — role decides.
        case 'project_closed':
        case 'project':
            return roleBasedProjectUrl(param, roles);
        case 'project_discussion':
            return discussionUrlFromParam(param);
    }
    return null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/header/components/NotificationsInner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NotificationsInner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/index.react-client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$SvgIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/SvgIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$notificationRoute$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/notificationRoute.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
// ---- Message rendering helpers ----
// Backend sometimes sends HTML in `notification.message` (e.g. <strong>, <a>, inline styles).
// Rendering raw HTML can override parent font styles, making read/unread weights unreliable.
// We convert to plain text so the parent `font-*` class always applies consistently.
const htmlToText = (html)=>{
    if (!html) return '';
    // Fast path: no tags
    if (!/[<>]/.test(html)) return html;
    // If somehow executed outside the browser, fall back to best-effort stripping.
    if ("object" === 'undefined' || typeof DOMParser === 'undefined') {
        return html.replace(/<[^>]*>/g, '').trim();
    }
    try {
        var _doc_body;
        // Replace <br> with newlines before parsing so we preserve basic formatting.
        const normalized = html.replace(/<br\s*\/?>/gi, '\n');
        const doc = new DOMParser().parseFromString(normalized, 'text/html');
        var _doc_body_textContent;
        return ((_doc_body_textContent = (_doc_body = doc.body) === null || _doc_body === void 0 ? void 0 : _doc_body.textContent) !== null && _doc_body_textContent !== void 0 ? _doc_body_textContent : '').trim();
    } catch (e) {
        // Fallback: strip tags (best-effort)
        return html.replace(/<[^>]*>/g, '').trim();
    }
};
const escapeHtml = (value)=>value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const escapeAttribute = (value)=>escapeHtml(value);
// For **unread** notifications we still want emphasis (<b>/<strong>) and links,
// but we must strip ALL attributes/styles to prevent overriding font weights.
// This sanitizer produces safe, minimal HTML for rendering via dangerouslySetInnerHTML.
const sanitizeNotificationHtml = (html)=>{
    if (!html) return '';
    // If not in browser, don’t attempt to sanitize HTML tags; render plain text.
    if ("object" === 'undefined' || typeof DOMParser === 'undefined') {
        return escapeHtml(htmlToText(html));
    }
    try {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const allowedTags = new Set([
            'B',
            'STRONG',
            'I',
            'EM',
            'BR',
            'A',
            'SPAN'
        ]);
        const sanitizeNode = (node)=>{
            var _node_textContent;
            if (node.nodeType === Node.TEXT_NODE) return escapeHtml((_node_textContent = node.textContent) !== null && _node_textContent !== void 0 ? _node_textContent : '');
            if (node.nodeType !== Node.ELEMENT_NODE) return '';
            const el = node;
            const tag = el.tagName.toUpperCase();
            // Drop disallowed tags but keep their text/children.
            if (!allowedTags.has(tag)) {
                return Array.from(el.childNodes).map(sanitizeNode).join('');
            }
            if (tag === 'BR') return '<br />';
            if (tag === 'A') {
                var _el_getAttribute;
                const rawHref = ((_el_getAttribute = el.getAttribute('href')) !== null && _el_getAttribute !== void 0 ? _el_getAttribute : '').trim();
                const href = rawHref.startsWith('http://') || rawHref.startsWith('https://') || rawHref.startsWith('/') || rawHref.startsWith('#') ? rawHref : '#';
                const inner = Array.from(el.childNodes).map(sanitizeNode).join('');
                return '<a href="'.concat(escapeAttribute(href), '" target="_blank" rel="noopener noreferrer" class="underline">').concat(inner, "</a>");
            }
            // Allowed inline tags with NO attributes
            const lower = tag.toLowerCase();
            const inner = Array.from(el.childNodes).map(sanitizeNode).join('');
            return "<".concat(lower, ">").concat(inner, "</").concat(lower, ">");
        };
        return Array.from(doc.body.childNodes).map(sanitizeNode).join('');
    } catch (e) {
        // Fallback: render as escaped plain text (safe)
        return escapeHtml(htmlToText(html));
    }
};
const VARIANT_TO_TW_COLOR = {
    success: 'green',
    danger: 'red',
    info: 'blue',
    warning: 'yellow',
    primary: 'purple'
};
const COLOR_CLASSES_BY_TW = {
    blue: {
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        icon: 'text-blue-500'
    },
    yellow: {
        bg: 'bg-yellow-50',
        text: 'text-yellow-600',
        icon: 'text-yellow-500'
    },
    purple: {
        bg: 'bg-purple-50',
        text: 'text-purple-600',
        icon: 'text-purple-500'
    },
    red: {
        bg: 'bg-red-50',
        text: 'text-red-600',
        icon: 'text-red-500'
    },
    green: {
        bg: 'bg-green-50',
        text: 'text-green-600',
        icon: 'text-green-500'
    }
};
const getVariantForSubType = (subType)=>{
    switch(subType){
        case 'order':
        case 'knowledge':
        case 'activate_company':
        case 'save':
            return 'success';
        case 'deactivate_company':
        case 'deactivate_company_with_delete':
        case 'deactivate_delete_company':
        case 'declined':
        case 'knowledge_declined':
        case 'deactivate_insighter':
        case 'deactivate_insighter_with_delete':
        case 'deactivate_delete_insighter':
            return 'danger';
        case 'activate_insighter':
        case 'accept_knowledge':
        case 'knowledge_accept':
        case 'approved':
        case 'download':
        case 'view':
        case 'like':
        case 'project_proposal_offer':
            return 'info';
        case 'upload':
        case 'share':
            return 'warning';
        case 'comment':
        case 'reply':
            return 'primary';
        default:
            return 'info';
    }
};
const getColorClassesForSubType = (subType)=>{
    const variant = getVariantForSubType(subType);
    var _VARIANT_TO_TW_COLOR_variant;
    const color = (_VARIANT_TO_TW_COLOR_variant = VARIANT_TO_TW_COLOR[variant]) !== null && _VARIANT_TO_TW_COLOR_variant !== void 0 ? _VARIANT_TO_TW_COLOR_variant : 'blue';
    return COLOR_CLASSES_BY_TW[color];
};
// Helper function to determine background color based on notification sub_type
// This matches the Angular notificationsBg pipe
const getNotificationBg = (subType, subTypeValue, message)=>{
    // "Reviewed" shares one sub_type for Approved and Changes Requested.
    if (subType === 'project_review_submission_reviewed') {
        return isChangesRequestedLabel(subTypeValue) ? 'yellow' : 'green';
    }
    if (subType === 'project_offer_technical_decision') {
        return isRejectedTechnicalDecision(message) ? 'red' : 'green';
    }
    switch(subType){
        case 'order':
        case 'knowledge':
            return 'green';
        case 'activate_company':
            return 'green';
        case 'deactivate_company':
        case 'deactivate_company_with_delete':
        case 'deactivate_delete_company':
        case 'declined':
        case 'knowledge_declined':
        case 'deactivate_insighter':
        case 'deactivate_insighter_with_delete':
        case 'deactivate_delete_insighter':
            return 'red';
        case 'activate_insighter':
        case 'accept_knowledge':
        case 'knowledge_accept':
        case 'approved':
        case 'download':
        case 'view':
            return 'green';
        case 'upload':
            return 'yellow';
        case 'comment':
        case 'reply':
            return 'blue';
        case 'like':
            return 'blue';
        case 'project_proposal_offer':
            return 'blue';
        case 'save':
            return 'green';
        case 'share':
            return 'yellow';
        // Project notifications
        case 'project':
        case 'project_service':
            return 'green';
        case 'project_closed':
        case 'project_cancelled':
        case 'project_offer_not_selected':
            return 'red';
        default:
            return 'blue';
    }
};
// Map Angular's color system to Tailwind CSS colors
const colorMap = {
    'success': 'green',
    'danger': 'red',
    'info': 'blue',
    'warning': 'yellow',
    'primary': 'purple'
};
// Helper function to get Tailwind color from Bootstrap/Angular color
const getTailwindColor = (color)=>{
    // Allow passing already-normalized Tailwind colors (e.g. "red") directly.
    if (color in COLOR_CLASSES_BY_TW) return color;
    return colorMap[color] || 'blue';
};
// Detects the "Changes Requested" status from the localized status label (en/ar).
const isChangesRequestedLabel = (subTypeValue)=>{
    const label = (subTypeValue !== null && subTypeValue !== void 0 ? subTypeValue : '').toLowerCase();
    return label.includes('change') || label.includes('تعديل');
};
const isRejectedTechnicalDecision = (message)=>{
    const normalizedMessage = htmlToText(message !== null && message !== void 0 ? message : '').toLowerCase();
    return normalizedMessage.includes('reject') || normalizedMessage.includes('declin') || normalizedMessage.includes('رفض') || normalizedMessage.includes('مرفوض');
};
// Helper function to get icon name based on notification sub_type (like the Angular notificationsIcons pipe)
const getNotificationIconName = (subType, subTypeValue, message)=>{
    // "Reviewed" shares one sub_type for Approved and Changes Requested,
    // so disambiguate by the localized status label.
    if (subType === 'project_review_submission_reviewed') {
        return isChangesRequestedLabel(subTypeValue) ? 'keen:message-notif' // changes requested
         : 'keen:file-added' // approved
        ;
    }
    switch(subType){
        case 'order':
        case 'sale':
            return 'duotune/finance/Knlg010.svg';
        case 'activate_company':
            return 'duotune/arrows/arr086.svg';
        case 'deactivate_company':
        case 'deactivate_company_with_delete':
        case 'deactivate_delete_company':
            return 'duotune/general/gen047.svg';
        case 'activate_insighter':
            return 'duotune/arrows/arr086.svg';
        case 'deactivate_insighter':
        case 'deactivate_insighter_with_delete':
        case 'deactivate_delete_insighter':
            return 'duotune/general/gen047.svg';
        case 'accept_knowledge':
        case 'knowledge_accept':
        case 'approved':
            return 'duotune/files/fil025.svg';
        case 'declined':
        case 'knowledge_declined':
            return 'duotune/general/gen050.svg';
        case 'download':
            return 'duotune/files/fil025.svg';
        case 'upload':
            return 'duotune/files/fil022.svg';
        case 'comment':
            return 'duotune/communication/com003.svg';
        case 'reply':
            return 'duotune/communication/com012.svg';
        case 'like':
            return 'duotune/general/gen030.svg';
        case 'save':
            return 'duotune/general/gen019.svg';
        case 'share':
            return 'duotune/general/gen016.svg';
        case 'view':
            return 'duotune/general/gen007.svg';
        case 'Question':
            return 'duotune/communication/com007.svg';
        case 'Answer Question':
            return 'duotune/communication/com007.svg';
        case 'client_meeting_insighter_approved':
            return 'duotune/general/gen014.svg';
        case 'client_meeting_new':
            return 'duotune/general/gen014.svg';
        case 'insighter_meeting_client_new':
            return 'duotune/general/gen014.svg';
        case 'insighter_meeting_approved':
            return 'duotune/general/gen014.svg';
        case "client_meeting_insighter_postponed":
            return 'duotune/general/gen014.svg';
        case 'insighter_meeting_client_reschedule':
            return 'duotune/general/gen014.svg';
        case "insighter_meeting_reminder":
            return 'duotune/general/gen014.svg';
        case 'client_meeting_reschedule':
            return 'duotune/general/gen014.svg';
        case 'client_meeting_reminder':
            return 'duotune/general/gen014.svg';
        case 'ask_question':
            return 'duotune/communication/com007.svg';
        case 'stripe':
            return 'duotune/general/Capa_1.svg';
        case 'answer_question':
            return 'duotune/communication/com007.svg';
        case 'project_proposal_offer':
            return 'keen:briefcase';
        // Project notifications
        case 'project_proposal':
            return 'keen:briefcase';
        case 'project_offer_technical_decision':
            return isRejectedTechnicalDecision(message) ? 'keen:brifecase-cros' : 'keen:brifecase-tick';
        case 'project_offer_not_selected':
        case 'project_cancelled':
            return 'keen:brifecase-cros';
        case 'project':
            return 'keen:clipboard';
        case 'project_closed':
            return 'keen:archive';
        case 'project_service':
            return 'keen:chart-line-star';
        case 'project_review_submission':
            return 'keen:file-up';
        // 'project_review_submission_reviewed' handled above (status-dependent)
        case 'project_file_uploaded':
            return 'keen:folder-up';
        case 'project_discussion':
            return 'keen:messages';
        default:
            return 'duotune/general/gen007.svg';
    }
};
const renderKeenIcon = (iconName, className)=>{
    const pathCounts = {
        archive: 3,
        briefcase: 2,
        'brifecase-cros': 3,
        'brifecase-tick': 3,
        'chart-line-star': 3,
        clipboard: 3,
        'file-added': 2,
        'file-up': 2,
        'folder-up': 2,
        'message-notif': 5,
        messages: 5
    };
    var _pathCounts_iconName;
    const pathCount = (_pathCounts_iconName = pathCounts[iconName]) !== null && _pathCounts_iconName !== void 0 ? _pathCounts_iconName : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
        className: "ki-duotone ki-".concat(iconName, " ").concat(className),
        children: Array.from({
            length: pathCount
        }, (_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "path".concat(index + 1)
            }, index, false, {
                fileName: "[project]/components/ui/header/components/NotificationsInner.tsx",
                lineNumber: 389,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/components/ui/header/components/NotificationsInner.tsx",
        lineNumber: 387,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
// Helper function to determine icon based on notification sub_type
const getNotificationIcon = (subType, color, subTypeValue, message)=>{
    // Get the SVG icon path from the duotune directory
    const iconPath = getNotificationIconName(subType, subTypeValue, message);
    // Get the Tailwind color from the notification color (if provided)
    const tailwindColor = color ? getTailwindColor(color) : 'blue';
    // Create color-specific classes based on Tailwind colors
    const colorClasses = {
        'blue': 'text-blue-500',
        'yellow': 'text-yellow-500',
        'purple': 'text-purple-500',
        'red': 'text-red-500',
        'green': 'text-green-500'
    };
    const iconClassName = "h-6 w-6 text-2xl leading-none ".concat(colorClasses[tailwindColor]);
    if (iconPath.startsWith('keen:')) {
        return renderKeenIcon(iconPath.replace('keen:', ''), iconClassName);
    }
    // Return a properly styled SVG Icon that can be colored like in Angular
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$SvgIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SvgIcon"], {
        src: "/".concat(iconPath),
        className: iconClassName
    }, void 0, false, {
        fileName: "[project]/components/ui/header/components/NotificationsInner.tsx",
        lineNumber: 426,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
// *** CHANGE 1: UPDATED BILINGUAL FUNCTION ***
// Helper function to determine display name based on notification sub_type and language
const getNotificationName = (subType, language)=>{
    const nameMap = {
        'accept_knowledge': {
            en: 'Insights Accepted',
            ar: 'قبول المستندات'
        },
        'declined': {
            en: 'Insights Declined',
            ar: 'رفض المستندات'
        },
        'approved': {
            en: 'Insights Approved',
            ar: 'تمت الموافقة على المستندات'
        },
        'activate_insighter': {
            en: 'Insighter Activated',
            ar: 'تفعيل حساب الانسايتر'
        },
        'deactivate_insighter': {
            en: 'Insighter Deactivated',
            ar: 'إلغاء تفعيل حساب الانسايتر'
        },
        'deactivate_insighter_with_delete': {
            en: 'Insighter Deactivated',
            ar: 'إلغاء تفعيل حساب الانسايتر'
        },
        'deactivate_delete_insighter': {
            en: 'Insighter Deactivated',
            ar: 'إلغاء تفعيل حساب الانسايتر'
        },
        'download': {
            en: 'Download',
            ar: 'تنزيل'
        },
        'upload': {
            en: 'Upload',
            ar: 'رفع'
        },
        'comment': {
            en: 'Comment',
            ar: 'تعليق'
        },
        'sale': {
            en: 'Sales Order',
            ar: 'طلب شراء'
        },
        'reply': {
            en: 'Reply',
            ar: 'رد'
        },
        'like': {
            en: 'Like',
            ar: 'إعجاب'
        },
        'save': {
            en: 'Save',
            ar: 'حفظ'
        },
        'share': {
            en: 'Share',
            ar: 'مشاركة'
        },
        'view': {
            en: 'View',
            ar: 'عرض'
        },
        'knowledge_accept': {
            en: 'Insights Accepted',
            ar: 'قبول المستندات'
        },
        'knowledge_declined': {
            en: 'Insights Declined',
            ar: 'رفض المستندات'
        },
        'activate_company': {
            en: 'Active Company',
            ar: 'تفعيل الشركة'
        },
        'project_proposal_offer': {
            en: 'New Project Proposal Offer',
            ar: 'عرض مقترح مشروع جديد'
        },
        'client_meeting_new': {
            en: 'New Session Request',
            ar: 'طلب جلسة استشارية جديدة'
        },
        'insighter_meeting_client_new': {
            en: 'New Session Request',
            ar: 'طلب جلسة استشارية جديدة'
        },
        'insighter_meeting_approved': {
            en: 'Session Approved',
            ar: 'تمت الموافقة على الجلسة الاستشارية'
        },
        'client_meeting_insighter_approved': {
            en: 'Session Approved',
            ar: 'تمت الموافقة على الجلسة الاستشارية'
        },
        'client_meeting_insighter_postponed': {
            en: 'Session Postponed',
            ar: 'تم تأجيل الجلسة الاستشارية'
        },
        'client_meeting_reschedule': {
            en: 'Session Rescheduled',
            ar: 'تمت إعادة جدولة الجلسة الاستشارية'
        },
        'insighter_meeting_client_reschedule': {
            en: 'Session Rescheduled',
            ar: 'تمت إعادة جدولة الجلسة الاستشارية'
        },
        'client_meeting_reminder': {
            en: 'Session Reminder',
            ar: 'تذكير بالجلسة الاستشارية'
        },
        'insighter_meeting_reminder': {
            en: 'Session Reminder',
            ar: 'تذكير بالجلسة الاستشارية'
        },
        'deactivate_delete_company': {
            en: 'Company Deactivation',
            ar: 'إلغاء تفعيل الشركة'
        },
        'deactivate_company': {
            en: 'Company Deactivation',
            ar: 'إلغاء تفعيل الشركة'
        },
        'project_offer_technical_decision': {
            en: 'Project Offer Decision',
            ar: 'القرار الفني لعرض المشروع'
        },
        'project_offer_not_selected': {
            en: 'Project Offer Not Selected',
            ar: 'لم يتم اختيار عرض المشروع'
        },
        'project_cancelled': {
            en: 'Project Cancelled',
            ar: 'تم إلغاء المشروع'
        }
    };
    const names = nameMap[subType];
    if (!names) {
        return subType; // Fallback to the subtype key if no translation exists
    }
    return language === 'ar' ? names.ar : names.en; // Return Arabic if lang is 'ar', otherwise default to English
};
// We intentionally avoid using i18n keys for sub-type titles to prevent
// MISSING_MESSAGE errors; the bilingual map above is authoritative.
// Helper function to determine links based on notification type
const getNotificationLink = (type, parent)=>{
    const linkMap = {
        'client': {
            'knowledge': '/knowledge',
            'industry': '/industry',
            'comment': '/comments',
            'user': '/profile',
            'notification': '/notifications',
            'default': '/'
        },
        'app': {
            'knowledge': '/app/my-knowledge-base',
            'industry': '/app/industry',
            'comment': '/app/comments',
            'user': '/app/profile',
            'notification': '/app/notifications',
            'default': '/app'
        }
    };
    const parentLinks = linkMap[parent] || linkMap['client'];
    return parentLinks[type] || parentLinks['default'];
};
const getNotificationTitle = (notification, language)=>{
    if (notification.sub_type === 'project_offer_technical_decision') {
        const rejected = isRejectedTechnicalDecision(notification.message);
        if (language === 'ar') {
            return rejected ? 'تم رفض عرض المشروع فنياً' : 'تم قبول عرض المشروع فنياً';
        }
        return rejected ? 'Project Offer Technically Rejected' : 'Project Offer Technically Accepted';
    }
    const projectSubTypes = new Set([
        'project_offer_not_selected',
        'project_cancelled'
    ]);
    if (projectSubTypes.has(notification.sub_type)) {
        return getNotificationName(notification.sub_type, language);
    }
    return notification.sub_type_value || getNotificationName(notification.sub_type, language);
};
function NotificationsInner(param) {
    let { notifications, parent, roles = [], onNotificationClick, onClickOutside } = param;
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('Notifications');
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const currentLanguage = pathname.split('/')[1] || 'en';
    const isRTL = currentLanguage === 'ar' || currentLanguage === 'he';
    const componentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // ---- Subcomponents ----
    const NotificationsHeader = (param)=>{
        let { onClose } = param;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "sticky top-0 z-10 bg-cover bg-center",
            style: {
                // Use gradient to avoid external image blocked by CSP (img-src disallows http:)
                backgroundImage: 'linear-gradient(135deg,rgb(81, 175, 246) 0%, #01B5D5 100%)'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-black/30",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-5 py-4 flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-bold text-lg text-white",
                            children: t('TITLE')
                        }, void 0, false, {
                            fileName: "[project]/components/ui/header/components/NotificationsInner.tsx",
                            lineNumber: 559,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            "aria-label": "Close notifications",
                            onClick: onClose,
                            className: "inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                className: "h-5 w-5 text-white",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    d: "M6 18L18 6M6 6l12 12"
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/header/components/NotificationsInner.tsx",
                                    lineNumber: 569,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/ui/header/components/NotificationsInner.tsx",
                                lineNumber: 568,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/ui/header/components/NotificationsInner.tsx",
                            lineNumber: 562,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/header/components/NotificationsInner.tsx",
                    lineNumber: 558,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/header/components/NotificationsInner.tsx",
                lineNumber: 557,
                columnNumber: 7
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/ui/header/components/NotificationsInner.tsx",
            lineNumber: 550,
            columnNumber: 5
        }, this);
    };
    const NotificationItem = (param)=>{
        let { notification } = param;
        const title = getNotificationTitle(notification, currentLanguage);
        const messageText = htmlToText(notification.message);
        const unreadMessageHtml = sanitizeNotificationHtml(notification.message);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            onClick: ()=>handleNotificationClick(notification),
            role: "button",
            tabIndex: 0,
            onKeyDown: (e)=>{
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleNotificationClick(notification);
                }
            },
            className: "px-5 py-4 border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors duration-200 outline-none focus:ring-2 focus:ring-blue-200",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0 ".concat(isRTL ? 'ml-3' : 'mr-4'),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: " h-12 w-12 rounded-md flex items-center justify-center ",
                            children: getNotificationIcon(notification.sub_type, getNotificationBg(notification.sub_type, notification.sub_type_value, notification.message), notification.sub_type_value, notification.message)
                        }, void 0, false, {
                            fileName: "[project]/components/ui/header/components/NotificationsInner.tsx",
                            lineNumber: 603,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ui/header/components/NotificationsInner.tsx",
                        lineNumber: 602,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-blue-600 ".concat(!notification.read_at ? 'font-bold' : 'font-light'),
                                style: {
                                    wordBreak: 'break-word'
                                },
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/ui/header/components/NotificationsInner.tsx",
                                lineNumber: 614,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-0.5 ".concat(!notification.read_at ? 'text-gray-900 font-medium' : 'text-gray-700 font-light', " text-sm whitespace-pre-line"),
                                style: {
                                    wordBreak: 'break-word'
                                },
                                children: !notification.read_at ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    // Safe minimal HTML (only emphasis/links), used ONLY for unread messages.
                                    dangerouslySetInnerHTML: {
                                        __html: unreadMessageHtml
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/header/components/NotificationsInner.tsx",
                                    lineNumber: 622,
                                    columnNumber: 17
                                }, this) : messageText
                            }, void 0, false, {
                                fileName: "[project]/components/ui/header/components/NotificationsInner.tsx",
                                lineNumber: 617,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/header/components/NotificationsInner.tsx",
                        lineNumber: 613,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "".concat(isRTL ? 'mr-3' : 'ml-3', " mt-4"),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-[#EEF6FF] text-[#299AF8]",
                            children: t('VIEW')
                        }, void 0, false, {
                            fileName: "[project]/components/ui/header/components/NotificationsInner.tsx",
                            lineNumber: 633,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ui/header/components/NotificationsInner.tsx",
                        lineNumber: 632,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/header/components/NotificationsInner.tsx",
                lineNumber: 601,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/ui/header/components/NotificationsInner.tsx",
            lineNumber: 589,
            columnNumber: 7
        }, this);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NotificationsInner.useEffect": ()=>{
            const handleClickOutside = {
                "NotificationsInner.useEffect.handleClickOutside": (event)=>{
                    if (componentRef.current && !componentRef.current.contains(event.target)) {
                        onClickOutside();
                    }
                }
            }["NotificationsInner.useEffect.handleClickOutside"];
            document.addEventListener('mousedown', handleClickOutside);
            return ({
                "NotificationsInner.useEffect": ()=>{
                    document.removeEventListener('mousedown', handleClickOutside);
                }
            })["NotificationsInner.useEffect"];
        }
    }["NotificationsInner.useEffect"], [
        onClickOutside
    ]);
    const handleNotificationClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "NotificationsInner.useCallback[handleNotificationClick]": async (notification)=>{
            // Compute destination
            // Case 1: Knowledge page opens in new tab (must be synchronous to keep user gesture)
            if (notification.type === 'knowledge' && notification.category) {
                const knowledgeUrl = "http://localhost:3000/".concat(currentLanguage, "/knowledge/").concat(notification.category, "/").concat(notification.param || '', "?tab=ask");
                const win = window.open(knowledgeUrl, '_blank', 'noopener,noreferrer');
                if (win) win.opener = null;
                // Fire-and-forget mark-as-read
                void onNotificationClick(notification.id).catch({
                    "NotificationsInner.useCallback[handleNotificationClick]": ()=>{}
                }["NotificationsInner.useCallback[handleNotificationClick]"]);
                return;
            }
            // Case 1b: Project notifications → Angular dashboard (localhost:4200).
            // Keyed on event_name first, with sub_type + role fallback for REST history.
            const projectUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$notificationRoute$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routeForNotification"])(notification, roles);
            if (projectUrl) {
                try {
                    await onNotificationClick(notification.id);
                } catch (e) {
                // ignore errors and still navigate
                }
                window.location.href = projectUrl;
                return;
            }
            // Case 2: Compute single-page redirects
            let url = null;
            if (notification.type === 'order') {
                url = 'http://localhost:4200/app/insighter-dashboard/sales?tab=2';
            } else if (notification.sub_type.startsWith('client_meeting_reminder')) {
                url = 'http://localhost:4200/app/insighter-dashboard/my-meetings?tab=client';
            } else if (notification.sub_type === 'accept_knowledge') {
                url = 'http://localhost:4200/app/insighter-dashboard/my-requests';
            } else if (notification.sub_type === 'client_meeting_new') {
                url = 'http://localhost:4200/app/insighter-dashboard/my-meetings?tab=client';
            } else if (notification.sub_type === 'declined' && notification.type === 'knowledge') {
                url = "http://localhost:4200/app/my-knowledge-base/view-my-knowledge/".concat(notification.param, "/details");
            } else if (notification.sub_type.startsWith('client_')) {
                url = 'http://localhost:4200/app/insighter-dashboard/my-meetings?tab=client';
            } else if (notification.sub_type.startsWith('insighter_')) {
                url = 'http://localhost:4200/app/insighter-dashboard/my-meetings?tab=client';
            } else if (notification.type === 'knowledge' && notification.sub_type === 'approved') {
                url = "http://localhost:4200/app/my-knowledge-base/view-my-knowledge/".concat(notification.param, "/details");
            } else if (notification.sub_type.startsWith('client_meeting_insighter_postponed')) {
                url = 'http://localhost:4200/app/insighter-dashboard/my-meetings/sent';
            } else if (notification.sub_type.startsWith('client_meeting_reschedule')) {
                url = 'http://localhost:4200/app/insighter-dashboard/my-meetings/sent';
            } else if (notification.sub_type.startsWith('insighter_meeting_client_reschedule')) {
                url = 'http://localhost:4200/app/insighter-dashboard/my-meetings?tab=client';
            } else if (notification.sub_type.startsWith('insighter_meeting_reminder')) {
                url = 'http://localhost:4200/app/insighter-dashboard/my-meetings?tab=client';
            } else if (notification.sub_type === 'activate_insighter') {
                url = "/".concat(currentLanguage, "/profile/settings");
            } else if (notification.sub_type === 'deactivate_insighter') {
                url = "/".concat(currentLanguage, "/profile/settings");
            }
            // Mark-as-read BEFORE redirect to avoid request being cancelled by navigation
            try {
                await onNotificationClick(notification.id);
            } catch (e) {
            // ignore errors and still navigate
            }
            if (url) {
                window.location.href = url;
            }
        }
    }["NotificationsInner.useCallback[handleNotificationClick]"], [
        onNotificationClick,
        currentLanguage,
        roles
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: componentRef,
        dir: isRTL ? 'rtl' : 'ltr',
        style: {
            animation: 'fadeIn 0.2s ease-out'
        },
        className: "jsx-2e35cc4f2b8f6ef8" + " " + "font-almarai w-full h-full bg-white shadow-xl overflow-hidden flex flex-col animate-fadeIn",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "2e35cc4f2b8f6ef8",
                children: "@keyframes fadeIn{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}"
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NotificationsHeader, {
                onClose: onClickOutside,
                className: "jsx-2e35cc4f2b8f6ef8"
            }, void 0, false, {
                fileName: "[project]/components/ui/header/components/NotificationsInner.tsx",
                lineNumber: 743,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-2e35cc4f2b8f6ef8" + " " + "flex-1 overflow-y-auto",
                children: [
                    notifications.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-2e35cc4f2b8f6ef8" + " " + "text-center py-10 px-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-2e35cc4f2b8f6ef8" + " " + "text-gray-500 flex flex-col items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    className: "jsx-2e35cc4f2b8f6ef8" + " " + "h-12 w-12 text-gray-300 mb-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 1,
                                        d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
                                        className: "jsx-2e35cc4f2b8f6ef8"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/header/components/NotificationsInner.tsx",
                                        lineNumber: 752,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/header/components/NotificationsInner.tsx",
                                    lineNumber: 751,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-2e35cc4f2b8f6ef8",
                                    children: t('NO_NEW')
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/header/components/NotificationsInner.tsx",
                                    lineNumber: 754,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ui/header/components/NotificationsInner.tsx",
                            lineNumber: 750,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ui/header/components/NotificationsInner.tsx",
                        lineNumber: 749,
                        columnNumber: 11
                    }, this),
                    notifications.length > 0 && notifications.map((notification)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NotificationItem, {
                            notification: notification
                        }, notification.id, false, {
                            fileName: "[project]/components/ui/header/components/NotificationsInner.tsx",
                            lineNumber: 761,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/header/components/NotificationsInner.tsx",
                lineNumber: 746,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/header/components/NotificationsInner.tsx",
        lineNumber: 727,
        columnNumber: 5
    }, this);
}
_s(NotificationsInner, "mbKcwiY4IB5hvyi6nVgXyUdmMmU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = NotificationsInner;
var _c;
__turbopack_context__.k.register(_c, "NotificationsInner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/services/notifications.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearNotifications",
    ()=>clearNotifications,
    "getCurrentNotifications",
    ()=>getCurrentNotifications,
    "getNotifications",
    ()=>getNotifications,
    "markAllNotificationsAsRead",
    ()=>markAllNotificationsAsRead,
    "markNotificationAsRead",
    ()=>markNotificationAsRead,
    "startNotificationPolling",
    ()=>startNotificationPolling,
    "stopNotificationPolling",
    ()=>stopNotificationPolling,
    "subscribeToNotifications",
    ()=>subscribeToNotifications
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
'use client';
;
;
// Singleton pattern to prevent multiple instances
class NotificationService {
    static getInstance() {
        if (!NotificationService.instance) {
            NotificationService.instance = new NotificationService();
        }
        return NotificationService.instance;
    }
    // Fetch notifications from the API with caching and deduplication
    async getNotifications() {
        let locale = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 'en', forceRefresh = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        const now = Date.now();
        // Return cached data if still valid and not forced refresh
        if (!forceRefresh && now - this.lastFetchTime < this.CACHE_DURATION) {
            return [
                ...this.currentNotifications
            ];
        }
        // If already fetching, return the pending promise
        if (this.isFetching && this.pendingPromise) {
            return this.pendingPromise;
        }
        // Create new fetch promise
        this.pendingPromise = this.fetchNotificationsFromAPI(locale);
        try {
            const notifications = await this.pendingPromise;
            return notifications;
        } finally{
            this.pendingPromise = null;
        }
    }
    async fetchNotificationsFromAPI(locale) {
        this.isFetching = true;
        try {
            const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
            if (!token) {
                this.currentNotifications = [];
                this.notifyListeners();
                return [];
            }
            const response = await fetch('https://api.foresighta.co/api/account/notification', {
                headers: {
                    'Authorization': "Bearer ".concat(token),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Accept-Language': locale,
                    "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone
                }
            });
            if (!response.ok) {
                if (response.status === 401) {
                    // Token expired, clear notifications
                    this.currentNotifications = [];
                    this.notifyListeners();
                }
                return this.currentNotifications;
            }
            const data = await response.json();
            const notifications = data.data || [];
            // Update cache
            this.currentNotifications = notifications;
            this.lastFetchTime = Date.now();
            this.notifyListeners();
            return notifications;
        } catch (error) {
            console.error('Error fetching notifications:', error);
            return this.currentNotifications; // Return cached data on error
        } finally{
            this.isFetching = false;
        }
    }
    // Mark a notification as read
    async markNotificationAsRead(id) {
        let locale = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'en';
        try {
            const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
            if (!token) {
                return false;
            }
            const response = await fetch("https://api.foresighta.co/api/account/notification/read/".concat(id), {
                method: 'PUT',
                headers: {
                    'Authorization': "Bearer ".concat(token),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Accept-Language': locale,
                    "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone
                }
            });
            if (response.ok) {
                // Update local state immediately for better UX
                this.currentNotifications = this.currentNotifications.map((notification)=>notification.id === id ? {
                        ...notification,
                        read_at: new Date().toISOString()
                    } : notification);
                this.notifyListeners();
                // Force refresh after a short delay to get server state
                setTimeout(()=>{
                    this.getNotifications(locale, true);
                }, 500);
            }
            return response.ok;
        } catch (error) {
            console.error('Error marking notification as read:', error);
            return false;
        }
    }
    // Mark all notifications as read
    async markAllNotificationsAsRead() {
        let locale = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 'en';
        try {
            const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
            if (!token) {
                return false;
            }
            const response = await fetch('https://api.foresighta.co/api/account/notification/read', {
                method: 'PUT',
                headers: {
                    'Authorization': "Bearer ".concat(token),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Accept-Language': locale,
                    "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone
                }
            });
            if (response.ok) {
                // Update local state immediately
                this.currentNotifications = this.currentNotifications.map((notification)=>({
                        ...notification,
                        read_at: new Date().toISOString()
                    }));
                this.notifyListeners();
                // Force refresh after a short delay
                setTimeout(()=>{
                    this.getNotifications(locale, true);
                }, 500);
            }
            return response.ok;
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
            return false;
        }
    }
    // Start polling for notifications (singleton pattern)
    startNotificationPolling() {
        let locale = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 'en', interval = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 30000;
        if (this.isPolling) {
            console.log('Notification polling already active');
            return this.pollingInterval;
        }
        this.isPolling = true;
        // Initial fetch
        this.getNotifications(locale);
        // Set up interval
        // this.pollingInterval = setInterval(() => {
        //   this.getNotifications(locale, true);
        // }, interval);
        console.log('Notification polling started');
        return this.pollingInterval;
    }
    // Stop polling for notifications
    stopNotificationPolling() {
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
            this.pollingInterval = null;
            this.isPolling = false;
            console.log('Notification polling stopped');
        }
    }
    // Get the current notifications without fetching
    getCurrentNotifications() {
        return [
            ...this.currentNotifications
        ];
    }
    // Subscribe to notifications changes
    subscribeToNotifications(callback) {
        this.listeners.push(callback);
        // Immediately call with current notifications
        callback([
            ...this.currentNotifications
        ]);
        // Return unsubscribe function
        return ()=>{
            const index = this.listeners.indexOf(callback);
            if (index !== -1) {
                this.listeners.splice(index, 1);
            }
        };
    }
    // Notify all listeners about new notifications
    notifyListeners() {
        this.listeners.forEach((listener)=>{
            listener([
                ...this.currentNotifications
            ]);
        });
    }
    // Clear all data (for logout)
    clearNotifications() {
        this.currentNotifications = [];
        this.lastFetchTime = 0;
        this.notifyListeners();
    }
    constructor(){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "listeners", []);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "currentNotifications", []);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "pollingInterval", null);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "isPolling", false);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "lastFetchTime", 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "CACHE_DURATION", 5000); // 5 seconds cache
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "isFetching", false);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "pendingPromise", null);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(NotificationService, "instance", void 0);
// Export singleton instance and utility functions
const notificationService = NotificationService.getInstance();
async function getNotifications() {
    let locale = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 'en';
    return notificationService.getNotifications(locale);
}
async function markNotificationAsRead(id) {
    let locale = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'en';
    return notificationService.markNotificationAsRead(id, locale);
}
async function markAllNotificationsAsRead() {
    let locale = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 'en';
    return notificationService.markAllNotificationsAsRead(locale);
}
function startNotificationPolling() {
    let locale = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 'en', interval = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 30000;
    return notificationService.startNotificationPolling(locale, interval);
}
function stopNotificationPolling() {
    notificationService.stopNotificationPolling();
}
function getCurrentNotifications() {
    return notificationService.getCurrentNotifications();
}
function subscribeToNotifications(callback) {
    return notificationService.subscribeToNotifications(callback);
}
function clearNotifications() {
    notificationService.clearNotifications();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/pusher-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bindGlobal",
    ()=>bindGlobal,
    "disconnectPusher",
    ()=>disconnectPusher,
    "getPusher",
    ()=>getPusher,
    "subscribePrivateUser",
    ()=>subscribePrivateUser,
    "unbindGlobal",
    ()=>unbindGlobal,
    "unsubscribePrivateUser",
    ()=>unsubscribePrivateUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pusher$2d$js$2f$dist$2f$web$2f$pusher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pusher-js/dist/web/pusher.js [app-client] (ecmascript)");
'use client';
;
let pusher = null;
let lastChannelName = null;
let lastToken = null;
let lastLocale = null;
let didBindDebugHandlers = false;
const channelsWithEventLogging = new Set();
function getRuntimeEnv(name) {
    var ___env;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return (___env = window.__env) === null || ___env === void 0 ? void 0 : ___env[name];
}
function firstNonEmpty() {
    for(var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++){
        values[_key] = arguments[_key];
    }
    var _values_map_find;
    return (_values_map_find = values.map((value)=>value === null || value === void 0 ? void 0 : value.trim()).find(Boolean)) !== null && _values_map_find !== void 0 ? _values_map_find : '';
}
function isInternalEvent(eventName) {
    return eventName.startsWith('pusher:') || eventName.startsWith('pusher_internal:');
}
function logReceivedEvent(channelName, eventName, data) {
    if (isInternalEvent(eventName)) return;
    console.log('[Pusher] Event received', {
        channelName,
        eventName,
        payload: data
    });
}
function getConfig() {
    const key = firstNonEmpty(getRuntimeEnv('PUSHER_KEY'), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_PUSHER_KEY, '41745ad5e299f4af9e36');
    const cluster = firstNonEmpty(getRuntimeEnv('PUSHER_CLUSTER'), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_PUSHER_CLUSTER, 'eu');
    const authEndpoint = firstNonEmpty(getRuntimeEnv('PUSHER_AUTH_ENDPOINT'), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_PUSHER_AUTH_ENDPOINT, 'https://api.foresighta.co/broadcasting/auth');
    if (!key || !authEndpoint) {
        console.error('[Pusher] Missing env: NEXT_PUBLIC_PUSHER_KEY or NEXT_PUBLIC_PUSHER_AUTH_ENDPOINT');
    }
    return {
        key,
        cluster,
        authEndpoint
    };
}
function getPusher(token, currentLocale) {
    if (pusher) {
        // If auth context changed, we must recreate the client to avoid auth mismatch on private channels.
        if (lastToken !== token || lastLocale !== currentLocale) {
            console.warn('[Pusher] Auth context changed; reconnecting Pusher client', {
                locale: {
                    from: lastLocale,
                    to: currentLocale
                },
                tokenChanged: lastToken ? lastToken !== token : true
            });
            disconnectPusher();
        } else {
            return pusher;
        }
    }
    const cfg = getConfig();
    lastToken = token;
    lastLocale = currentLocale;
    pusher = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pusher$2d$js$2f$dist$2f$web$2f$pusher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](cfg.key, {
        cluster: cfg.cluster,
        forceTLS: true,
        enabledTransports: [
            'ws',
            'wss'
        ],
        // If your network blocks websockets, comment the line above to allow xhr fallbacks
        authEndpoint: cfg.authEndpoint,
        auth: {
            headers: {
                Authorization: "Bearer ".concat(token),
                Accept: 'application/json',
                'Accept-Language': currentLocale
            }
        }
    });
    if (!didBindDebugHandlers) {
        didBindDebugHandlers = true;
        // console.log('[Pusher] Initializing client', {
        //   cluster: cfg.cluster,
        //   authEndpoint: cfg.authEndpoint,
        //   keySuffix: cfg.key.slice(-6),
        //   locale: currentLocale,
        //   tokenPrefix: token ? `${token.slice(0, 10)}…` : '(empty)',
        // })
        pusher.connection.bind('state_change', (states)=>{
        //   console.log('[Pusher] Connection state_change', states)
        });
        pusher.connection.bind('connecting', ()=>{
        //   console.log('[Pusher] Connection connecting')
        });
        pusher.connection.bind('connected', ()=>{
        //   console.log('[Pusher] Connection connected', {
        //   socketId: (pusher as any)?.connection?.socket_id,
        // })
        });
        pusher.connection.bind('disconnected', ()=>{
        //  console.log('[Pusher] Connection disconnected')
        });
        pusher.connection.bind('unavailable', ()=>{
        //  console.warn('[Pusher] Connection unavailable')
        });
        pusher.connection.bind('failed', ()=>{
        // console.error('[Pusher] Connection failed')
        });
        pusher.connection.bind('error', (err)=>{
            var _err_error_data, _err_error;
            console.error('[Pusher] Connection error', err);
            if ((err === null || err === void 0 ? void 0 : (_err_error = err.error) === null || _err_error === void 0 ? void 0 : (_err_error_data = _err_error.data) === null || _err_error_data === void 0 ? void 0 : _err_error_data.code) === 4100) {
                console.warn('[Pusher] Connection limit reached (4100)');
            }
        });
    // Event payload logging is bound per channel in subscribePrivateUser.
    }
    return pusher;
}
function subscribePrivateUser(userId, token, currentLocale) {
    var _connection, _this;
    const client = getPusher(token, currentLocale);
    const channelName = "private-user.".concat(userId);
    if (lastChannelName && lastChannelName !== channelName) {
        // console.log('[Pusher] Unsubscribing previous channel', { from: lastChannelName, to: channelName })
        client.unsubscribe(lastChannelName);
    }
    lastChannelName = channelName;
    const state = (_this = client) === null || _this === void 0 ? void 0 : (_connection = _this.connection) === null || _connection === void 0 ? void 0 : _connection.state;
    if (state === 'disconnected' || state === 'failed') {
        console.warn('[Pusher] Client not connected; calling connect()', {
            state
        });
        client.connect();
    }
    //console.log('[Pusher] Subscribing', { channelName })
    const channel = client.subscribe(channelName);
    if (!channelsWithEventLogging.has(channelName) && typeof channel.bind_global === 'function') {
        channelsWithEventLogging.add(channelName);
        channel.bind_global((eventName, data)=>{
            logReceivedEvent(channelName, eventName, data);
        });
    }
    channel.bind('pusher:subscription_succeeded', ()=>{
    // console.log('[Pusher] Subscription succeeded', { channelName })
    });
    channel.bind('pusher:subscription_error', (status)=>{
    //  console.error('[Pusher] Subscription error', { channelName, status })
    });
    const events = [
        'account.activated',
        'account.deactivated',
        'account.stripe.restricted',
        'knowledge.accepted',
        'knowledge.declined',
        'order.insight',
        'knowledge.answer_question',
        'knowledge.ask_question',
        'meeting.client_meeting_insighter_approved',
        'meeting.client_meeting_insighter_postponed',
        'meeting.client_meeting_reminder',
        'meeting.client_meeting_new',
        'meeting.client_meeting_reschedule',
        'meeting.insighter_meeting_approved',
        'meeting.insighter_meeting_reminder',
        'meeting.insighter_meeting_client_new',
        'meeting.insighter_meeting_client_reschedule',
        'project.client.started',
        'project.insighter.offer.technical-decision',
        'project.insighter.offer.not-selected',
        'project.insighter.cancelled',
        'requests.action',
        'requests'
    ];
    events.forEach((evt)=>{
        channel.bind(evt, (data)=>{
        // eslint-disable-next-line no-console
        //   console.log('[Pusher] Channel event', { channelName, evt, data })
        });
    });
    return channel;
}
function unsubscribePrivateUser(userId) {
    const channelName = "private-user.".concat(userId);
    if (pusher) {
        try {
            pusher.unsubscribe(channelName);
            if (lastChannelName === channelName) lastChannelName = null;
            channelsWithEventLogging.delete(channelName);
        } catch (e) {
            console.warn('[Pusher] Unsubscribe warning', e);
        }
    }
}
function bindGlobal(handler) {
    if (pusher && typeof pusher.bind_global === 'function') {
        ;
        pusher.bind_global(handler);
    }
}
function unbindGlobal(handler) {
    if (pusher && typeof pusher.unbind_global === 'function') {
        ;
        pusher.unbind_global(handler);
    }
}
function disconnectPusher() {
    if (pusher) {
        //  console.log('[Pusher] Disconnecting client', { lastChannelName })
        pusher.disconnect();
        pusher = null;
        lastChannelName = null;
        lastToken = null;
        lastLocale = null;
        didBindDebugHandlers = false;
        channelsWithEventLogging.clear();
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/usePusherNotifications.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePusherNotificaitons",
    ()=>usePusherNotificaitons
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pusher$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pusher-client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function usePusherNotificaitons(param) {
    let { userId, token, currentLocale } = param;
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePusherNotificaitons.useEffect": ()=>{
            if (!userId || !token || !currentLocale) {
                return;
            }
            const channel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pusher$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribePrivateUser"])(userId, token, currentLocale);
            return ({
                "usePusherNotificaitons.useEffect": ()=>{
                    try {
                        var _channel_unsubscribe;
                        (_channel_unsubscribe = channel.unsubscribe) === null || _channel_unsubscribe === void 0 ? void 0 : _channel_unsubscribe.call(channel);
                    } catch (e) {}
                }
            })["usePusherNotificaitons.useEffect"];
        }
    }["usePusherNotificaitons.useEffect"], [
        userId,
        token,
        currentLocale
    ]);
}
_s(usePusherNotificaitons, "OD7bBpZva5O2jO+Puf00hKivP7c=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/header/components/NotificationBell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NotificationBell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$components$2f$NotificationsInner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/header/components/NotificationsInner.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$notifications$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/notifications.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/header/hooks/useUserProfile.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$usePusherNotifications$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/usePusherNotifications.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pusher$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pusher-client.ts [app-client] (ecmascript)");
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
// KeenThemes notification bell, matching the Angular application.
const NotificationIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
        className: "ki-outline ki-notification-on text-xl leading-none",
        "aria-hidden": "true"
    }, void 0, false, {
        fileName: "[project]/components/ui/header/components/NotificationBell.tsx",
        lineNumber: 22,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = NotificationIcon;
// Project-related events broadcast by the Laravel backend (Pusher cluster `eu`).
// These are routed to the Angular dashboard via routeForNotification(). See
// utils/notificationRoute.ts for the per-event target URLs.
const PROJECT_EVENTS = [
    'project.proposal.offer',
    'project.match.invited',
    'project.client.closed',
    'project.insighter.closed',
    'project.client.contract',
    'project.client.started',
    'project.insighter.contract',
    'project.review.submission',
    'project.review.submission.reviewed',
    'project.file.uploaded',
    'project.service.started',
    'project.discussion.message',
    'project.insighter.offer.technical-decision',
    'project.insighter.offer.not-selected',
    'project.insighter.cancelled',
    'order.project'
];
function NotificationBell(param) {
    let { parent = 'client' } = param;
    _s();
    const { user, roles } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserProfile"])();
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const currentLocale = params.locale;
    // Map realtime event payloads to our Notification shape.
    // `eventName` is the Pusher event name; capturing it makes routing reliable
    // (some events share the same sub_type).
    const mapEventToNotification = (data, eventName)=>{
        var _data_id, _data_message, _data_type, _data_notifiable_group_id, _data_notifiable_id, _data_request_id, _data_param, _data_sub_type, _data_event_name;
        return {
            id: (_data_id = data === null || data === void 0 ? void 0 : data.id) !== null && _data_id !== void 0 ? _data_id : "evt-".concat(Date.now()),
            message: (_data_message = data === null || data === void 0 ? void 0 : data.message) !== null && _data_message !== void 0 ? _data_message : '',
            type: (_data_type = data === null || data === void 0 ? void 0 : data.type) !== null && _data_type !== void 0 ? _data_type : 'notification',
            notifiable_group_id: (_data_notifiable_group_id = data === null || data === void 0 ? void 0 : data.notifiable_group_id) !== null && _data_notifiable_group_id !== void 0 ? _data_notifiable_group_id : '',
            notifiable_id: (_data_notifiable_id = data === null || data === void 0 ? void 0 : data.notifiable_id) !== null && _data_notifiable_id !== void 0 ? _data_notifiable_id : 0,
            request_id: (_data_request_id = data === null || data === void 0 ? void 0 : data.request_id) !== null && _data_request_id !== void 0 ? _data_request_id : 0,
            param: (_data_param = data === null || data === void 0 ? void 0 : data.param) !== null && _data_param !== void 0 ? _data_param : null,
            url: data === null || data === void 0 ? void 0 : data.url,
            sub_type: (_data_sub_type = data === null || data === void 0 ? void 0 : data.sub_type) !== null && _data_sub_type !== void 0 ? _data_sub_type : 'info',
            sub_type_value: data === null || data === void 0 ? void 0 : data.sub_type_value,
            redirect_page: !!(data === null || data === void 0 ? void 0 : data.redirect_page),
            read_at: undefined,
            sub_page: data === null || data === void 0 ? void 0 : data.sub_page,
            tap: data === null || data === void 0 ? void 0 : data.tap,
            category: data === null || data === void 0 ? void 0 : data.category,
            event_name: (_data_event_name = data === null || data === void 0 ? void 0 : data.event_name) !== null && _data_event_name !== void 0 ? _data_event_name : eventName
        };
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$usePusherNotifications$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePusherNotificaitons"])({
        userId: user === null || user === void 0 ? void 0 : user.id,
        token: token || undefined,
        currentLocale: currentLocale,
        eventNames: [
            'account.activated',
            'account.deactivated',
            'account.stripe.restricted',
            'knowledge.accepted',
            'knowledge.declined',
            'order.insight',
            'knowledge.answer_question',
            'knowledge.ask_question',
            'meeting.client_meeting_insighter_approved',
            'meeting.client_meeting_insighter_postponed',
            'meeting.client_meeting_reminder',
            'meeting.client_meeting_new',
            'meeting.client_meeting_reschedule',
            'meeting.insighter_meeting_approved',
            'meeting.insighter_meeting_reminder',
            'meeting.insighter_meeting_client_new',
            'meeting.insighter_meeting_client_reschedule',
            'requests.action',
            'requests'
        ]
    });
    // Bind handlers that push new events to the top of the list
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NotificationBell.useEffect": ()=>{
            if (!(user === null || user === void 0 ? void 0 : user.id) || !token || !currentLocale) return;
            const channel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pusher$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribePrivateUser"])(user.id, token, currentLocale);
            const events = [
                'account.activated',
                'account.deactivated',
                'knowledge.accepted',
                'knowledge.declined',
                'order.insight',
                'knowledge.answer_question',
                'knowledge.ask_question',
                'meeting.client_meeting_insighter_approved',
                'meeting.client_meeting_insighter_postponed',
                'meeting.client_meeting_reminder',
                'meeting.client_meeting_new',
                'meeting.client_meeting_reschedule',
                'meeting.insighter_meeting_approved',
                'meeting.insighter_meeting_reminder',
                'meeting.insighter_meeting_client_new',
                'requests.action',
                'requests',
                ...PROJECT_EVENTS
            ];
            // Bind each event with a per-event closure so we can capture the event name
            // onto the notification (needed for reliable project routing).
            const handlers = events.map({
                "NotificationBell.useEffect.handlers": (evt)=>{
                    const handler = {
                        "NotificationBell.useEffect.handlers.handler": (data)=>{
                            const next = mapEventToNotification(data, evt);
                            // Insert at top; keep unread (read_at undefined) so badge increases
                            setNotifications({
                                "NotificationBell.useEffect.handlers.handler": (prev)=>prev.some({
                                        "NotificationBell.useEffect.handlers.handler": (n)=>n.id === next.id
                                    }["NotificationBell.useEffect.handlers.handler"]) ? prev : [
                                        next,
                                        ...prev
                                    ]
                            }["NotificationBell.useEffect.handlers.handler"]);
                        }
                    }["NotificationBell.useEffect.handlers.handler"];
                    channel.bind(evt, handler);
                    return {
                        evt,
                        handler
                    };
                }
            }["NotificationBell.useEffect.handlers"]);
            // Fallback: also listen globally to catch any server-side event names
            const globalHandler = {
                "NotificationBell.useEffect.globalHandler": (eventName, data)=>{
                    if (eventName.startsWith('pusher:') || eventName.startsWith('pusher_internal:')) return;
                    const next = mapEventToNotification(data, eventName);
                    setNotifications({
                        "NotificationBell.useEffect.globalHandler": (prev)=>prev.some({
                                "NotificationBell.useEffect.globalHandler": (n)=>n.id === next.id
                            }["NotificationBell.useEffect.globalHandler"]) ? prev : [
                                next,
                                ...prev
                            ]
                    }["NotificationBell.useEffect.globalHandler"]);
                }
            }["NotificationBell.useEffect.globalHandler"];
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pusher$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bindGlobal"])(globalHandler);
            return ({
                "NotificationBell.useEffect": ()=>{
                    try {
                        handlers.forEach({
                            "NotificationBell.useEffect": (param)=>{
                                let { evt, handler } = param;
                                return channel.unbind(evt, handler);
                            }
                        }["NotificationBell.useEffect"]);
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pusher$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unbindGlobal"])(globalHandler);
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pusher$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unsubscribePrivateUser"])(user.id);
                    } catch (e) {}
                }
            })["NotificationBell.useEffect"];
        }
    }["NotificationBell.useEffect"], [
        user === null || user === void 0 ? void 0 : user.id,
        token,
        currentLocale
    ]);
    // Use mock data for testing or real notifications when they're available
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const locale = pathname.split('/')[1] || 'en';
    const isRTL = locale === 'ar' || locale === 'he';
    // Get count of unread notifications
    const notificationCount = notifications.filter((n)=>!n.read_at).length;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NotificationBell.useEffect": ()=>{
            setMounted(true);
            // Initialize notifications
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$notifications$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNotifications"])(locale).then({
                "NotificationBell.useEffect": (apiNotifications)=>{
                    // Always use API notifications, even if empty
                    if (apiNotifications) {
                        setNotifications(apiNotifications);
                    }
                }
            }["NotificationBell.useEffect"]);
            // Subscribe to notifications
            const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$notifications$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeToNotifications"])({
                "NotificationBell.useEffect.unsubscribe": (apiNotifications)=>{
                    // Always update with latest notifications
                    if (apiNotifications) {
                        setNotifications(apiNotifications);
                    }
                }
            }["NotificationBell.useEffect.unsubscribe"]);
            return ({
                "NotificationBell.useEffect": ()=>{
                    unsubscribe();
                }
            })["NotificationBell.useEffect"];
        }
    }["NotificationBell.useEffect"], [
        locale
    ]);
    // Close drawer with Escape
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NotificationBell.useEffect": ()=>{
            if (!isOpen) return;
            const onKeyDown = {
                "NotificationBell.useEffect.onKeyDown": (e)=>{
                    if (e.key === 'Escape') {
                        setIsOpen(false);
                    }
                }
            }["NotificationBell.useEffect.onKeyDown"];
            window.addEventListener('keydown', onKeyDown);
            return ({
                "NotificationBell.useEffect": ()=>window.removeEventListener('keydown', onKeyDown)
            })["NotificationBell.useEffect"];
        }
    }["NotificationBell.useEffect"], [
        isOpen
    ]);
    const toggleNotifications = (event)=>{
        event.stopPropagation();
        // Toggle notifications panel immediately
        setIsOpen((prev)=>!prev);
    };
    const closeNotifications = ()=>{
        setIsOpen(false);
    };
    const handleNotificationClick = async (id)=>{
        // Mark notification as read in our local state for mocks
        setNotifications((prev)=>prev.map((notification)=>notification.id === id ? {
                    ...notification,
                    read_at: new Date().toISOString()
                } : notification));
        // Also try to mark as read on the server if it's a real notification
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$notifications$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["markNotificationAsRead"])(id, locale);
        // Close the dropdown
        setIsOpen(false);
    };
    var _ref;
    const drawerPortal = mounted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[1000] ".concat(isOpen ? '' : 'pointer-events-none'),
        "aria-hidden": !isOpen,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/30 transition-opacity duration-300 ".concat(isOpen ? 'opacity-100' : 'opacity-0'),
                onClick: closeNotifications
            }, void 0, false, {
                fileName: "[project]/components/ui/header/components/NotificationBell.tsx",
                lineNumber: 239,
                columnNumber: 11
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "dialog",
                "aria-modal": "true",
                className: "absolute top-0 bottom-0 ".concat(isRTL ? 'left-0' : 'right-0', " w-full max-w-md sm:max-w-lg bg-white shadow-xl transition-transform duration-300 ease-out transform ").concat(isOpen ? 'translate-x-0' : isRTL ? '-translate-x-full' : 'translate-x-full'),
                onClick: (e)=>e.stopPropagation(),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$components$2f$NotificationsInner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    parent: parent,
                    roles: (_ref = roles !== null && roles !== void 0 ? roles : user === null || user === void 0 ? void 0 : user.roles) !== null && _ref !== void 0 ? _ref : [],
                    onNotificationClick: handleNotificationClick,
                    notifications: notifications,
                    onClickOutside: closeNotifications
                }, void 0, false, {
                    fileName: "[project]/components/ui/header/components/NotificationBell.tsx",
                    lineNumber: 250,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/header/components/NotificationBell.tsx",
                lineNumber: 244,
                columnNumber: 11
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/header/components/NotificationBell.tsx",
        lineNumber: 234,
        columnNumber: 9
    }, this), document.body) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative notification-item",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "flex items-center text-gray-400 justify-center w-8 h-8 rounded-full hover:bg-gray-100 focus:outline-none transition-all duration-200 notification-toggle hover:shadow ",
                onClick: toggleNotifications,
                "aria-label": "Notifications",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NotificationIcon, {}, void 0, false, {
                        fileName: "[project]/components/ui/header/components/NotificationBell.tsx",
                        lineNumber: 270,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute -top-1 ".concat(isRTL ? '-left-1' : '-right-1', " flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full shadow-sm ").concat(notificationCount > 0 ? 'bg-red-600' : 'bg-transparent'),
                        children: notificationCount > 0 ? notificationCount : ''
                    }, void 0, false, {
                        fileName: "[project]/components/ui/header/components/NotificationBell.tsx",
                        lineNumber: 271,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/header/components/NotificationBell.tsx",
                lineNumber: 265,
                columnNumber: 7
            }, this),
            drawerPortal
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/header/components/NotificationBell.tsx",
        lineNumber: 264,
        columnNumber: 5
    }, this);
}
_s(NotificationBell, "GNMQzuW4QgYUFPKQeREhhl4K5og=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserProfile"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$usePusherNotifications$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePusherNotificaitons"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c1 = NotificationBell;
var _c, _c1;
__turbopack_context__.k.register(_c, "NotificationIcon");
__turbopack_context__.k.register(_c1, "NotificationBell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/logo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$mobile$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/mobile-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronDown$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconChevronDown.mjs [app-client] (ecmascript) <export default as IconChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLanguage$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLanguage$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconLanguage.mjs [app-client] (ecmascript) <export default as IconLanguage>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconSearch.mjs [app-client] (ecmascript) <export default as IconSearch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$HoverCard$2f$HoverCard$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/HoverCard/HoverCard.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Group$2f$Group$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Group/Group.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Text$2f$Text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Text/Text.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Anchor$2f$Anchor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Anchor/Anchor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Divider$2f$Divider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Divider/Divider.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$SimpleGrid$2f$SimpleGrid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/SimpleGrid/SimpleGrid.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Button/Button.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$TextInput$2f$TextInput$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/TextInput/TextInput.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$components$2f$UserProfile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/header/components/UserProfile.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/index.react-client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$context$2f$LoadingContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/context/LoadingContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$particles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/particles.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$components$2f$NotificationBell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/header/components/NotificationBell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/header/hooks/useUserProfile.ts [app-client] (ecmascript)");
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
;
;
;
;
;
;
;
;
;
// Global cache for industries to prevent duplicate API calls
let industriesCache = {
    data: [],
    lastFetchTime: 0,
    isLoading: false,
    pendingPromise: null
};
const INDUSTRIES_CACHE_DURATION = 300000; // 5 minutes cache for industries
// IMPORTANT: This must be deterministic on BOTH server + client render to avoid hydration mismatches.
// Prefer env var override; otherwise choose a build-time default.
const ANGULAR_APP_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_ANGULAR_APP_URL || (("TURBOPACK compile-time truthy", 1) ? 'http://localhost:4200' : "TURBOPACK unreachable");
async function getIndustries() {
    let locale = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 'en', forceRefresh = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    const now = Date.now();
    // Return cached data if still valid and not forced refresh
    if (!forceRefresh && industriesCache.data.length > 0 && now - industriesCache.lastFetchTime < INDUSTRIES_CACHE_DURATION) {
        return industriesCache.data;
    }
    // If already fetching, return the pending promise
    if (industriesCache.isLoading && industriesCache.pendingPromise) {
        return industriesCache.pendingPromise;
    }
    // Start new fetch
    industriesCache.isLoading = true;
    industriesCache.pendingPromise = fetchIndustriesFromAPI(locale);
    try {
        const industries = await industriesCache.pendingPromise;
        return industries;
    } finally{
        industriesCache.pendingPromise = null;
    }
}
async function fetchIndustriesFromAPI(locale) {
    try {
        const res = await fetch("https://api.foresighta.co/api/platform/industries/menu", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Accept-Language": locale,
                "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            body: JSON.stringify({
                top_industry: 6,
                top_sub_industry: 6
            })
        });
        if (!res.ok) {
            return industriesCache.data; // Return cached data on error
        }
        const json = await res.json();
        const industries = json.data;
        // Update cache
        industriesCache.data = industries;
        industriesCache.lastFetchTime = Date.now();
        return industries;
    } catch (error) {
        console.error('Error fetching industries:', error);
        return industriesCache.data; // Return cached data on error
    } finally{
        industriesCache.isLoading = false;
    }
}
function Header() {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('Header');
    const headerShellRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [industries, setIndustries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(industriesCache.data);
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isScrolled, setIsScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { isLoading: isAppLoading, setIsLoading: setAppLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$context$2f$LoadingContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLoading"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const ctaCycleTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ctaSwapTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const currentLocale = pathname.split('/')[1] || 'en';
    const isArabicLocale = currentLocale === 'ar';
    const animatedCtaWords = isArabicLocale ? [
        'كإنسايتر',
        'كخبير'
    ] : [
        'Insighter',
        'Expert'
    ];
    const [animatedCtaWordIndex, setAnimatedCtaWordIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isCtaWordVisible, setIsCtaWordVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [returnUrl, setReturnUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const ctaPrefix = isArabicLocale ? 'سجّل' : 'Become an';
    const currentCtaWord = animatedCtaWords[animatedCtaWordIndex];
    const ctaAccessibleLabel = isArabicLocale ? "سجّل ".concat(currentCtaWord) : "Become an ".concat(currentCtaWord);
    // Use the centralized user profile hook
    const { user, roles, isLoading, isAuthResolved, handleSignOut } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserProfile"])();
    // Used only to decide which skeleton shape to show while auth is resolving.
    // Must be stable for SSR + first client render to avoid hydration mismatch.
    const [hasToken, setHasToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const shouldShowAuthSkeleton = !isAuthResolved;
    // Always use dark style with white text, as requested
    const textColorClass = ' hover:text-white transition-all duration-300 ease-in-out px-3 py-2 rounded-md hover:bg-slate-700/50';
    const menuTextColorClass = 'text-white hover:text-gray-100 transition-all duration-300 ease-in-out px-3 py-2 rounded-md hover:bg-[#3B8AEF]/20';
    const searchInputStyles = {
        input: {
            // Keep the search input dark even when scrolled to avoid a "white block" look.
            backgroundColor: isScrolled ? 'rgba(15, 22, 41, 0.55)' : 'rgba(255, 255, 255, 0.1)',
            border: isScrolled ? '1px solid rgba(255, 255, 255, 0.16)' : '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
            direction: currentLocale === 'ar' ? 'rtl' : 'ltr',
            '&::placeholder': {
                color: isScrolled ? 'rgba(255, 255, 255, 0.65)' : 'rgba(255, 255, 255, 0.6)'
            },
            '&:focus': {
                borderColor: '#3B8AEF',
                backgroundColor: isScrolled ? 'rgba(15, 22, 41, 0.7)' : 'rgba(255, 255, 255, 0.15)'
            },
            '&:hover': {
                backgroundColor: isScrolled ? 'rgba(15, 22, 41, 0.65)' : 'rgba(255, 255, 255, 0.12)'
            }
        },
        section: {
            color: isScrolled ? 'rgba(255, 255, 255, 0.75)' : 'rgba(255, 255, 255, 0.6)'
        }
    };
    // Handle search submission
    const handleSearch = function(query) {
        let searchType = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'knowledge';
        const searchParams = new URLSearchParams();
        if (query.trim()) {
            searchParams.set('keyword', query.trim());
        }
        searchParams.set('search_type', searchType);
        // Navigate to the search page with parameters - router already handles locale
        router.push("/".concat(currentLocale, "/home?").concat(searchParams.toString()));
        setSearchQuery('');
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            // Client-only values (token + current full URL) must be read after mount.
            setHasToken(!!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])());
            setReturnUrl(window.location.href);
        }
    }["Header.useEffect"], [
        pathname
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            setAnimatedCtaWordIndex(0);
            setIsCtaWordVisible(true);
            if ("object" === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                return;
            }
            const clearCtaTimers = {
                "Header.useEffect.clearCtaTimers": ()=>{
                    if (ctaCycleTimerRef.current !== null) {
                        window.clearTimeout(ctaCycleTimerRef.current);
                        ctaCycleTimerRef.current = null;
                    }
                    if (ctaSwapTimerRef.current !== null) {
                        window.clearTimeout(ctaSwapTimerRef.current);
                        ctaSwapTimerRef.current = null;
                    }
                }
            }["Header.useEffect.clearCtaTimers"];
            const runCycle = {
                "Header.useEffect.runCycle": ()=>{
                    setIsCtaWordVisible(false);
                    ctaSwapTimerRef.current = window.setTimeout({
                        "Header.useEffect.runCycle": ()=>{
                            setAnimatedCtaWordIndex({
                                "Header.useEffect.runCycle": (prev)=>(prev + 1) % animatedCtaWords.length
                            }["Header.useEffect.runCycle"]);
                            setIsCtaWordVisible(true);
                        }
                    }["Header.useEffect.runCycle"], 300);
                    ctaCycleTimerRef.current = window.setTimeout(runCycle, 3000);
                }
            }["Header.useEffect.runCycle"];
            clearCtaTimers();
            ctaCycleTimerRef.current = window.setTimeout(runCycle, 3000);
            return ({
                "Header.useEffect": ()=>{
                    clearCtaTimers();
                }
            })["Header.useEffect"];
        }
    }["Header.useEffect"], [
        currentLocale,
        animatedCtaWords.length
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Header.useLayoutEffect": ()=>{
            const update = {
                "Header.useLayoutEffect.update": ()=>{
                    var _headerShellRef_current;
                    const height = ((_headerShellRef_current = headerShellRef.current) === null || _headerShellRef_current === void 0 ? void 0 : _headerShellRef_current.getBoundingClientRect().height) || 0;
                    document.documentElement.style.setProperty('--app-header-height', "".concat(Math.ceil(height), "px"));
                }
            }["Header.useLayoutEffect.update"];
            update();
            let resizeObserver = null;
            if (typeof ResizeObserver !== 'undefined' && headerShellRef.current) {
                resizeObserver = new ResizeObserver(update);
                resizeObserver.observe(headerShellRef.current);
            }
            window.addEventListener('resize', update);
            return ({
                "Header.useLayoutEffect": ()=>{
                    window.removeEventListener('resize', update);
                    resizeObserver === null || resizeObserver === void 0 ? void 0 : resizeObserver.disconnect();
                }
            })["Header.useLayoutEffect"];
        }
    }["Header.useLayoutEffect"], []);
    // Handle search input submission
    const handleSearchSubmit = (e)=>{
        e.preventDefault();
        handleSearch(searchQuery);
    };
    const isProjectRoute = ()=>{
        const pathSegments = pathname.split('/').filter((segment)=>segment !== '');
        return pathSegments[1] === 'project';
    };
    // Check if current route should hide search bar
    const shouldHideSearchBar = ()=>{
        const pathSegments = pathname.split('/').filter((segment)=>segment !== '');
        // Hide on base URL (e.g., /en, /ar)
        if (pathSegments.length === 1) {
            return true;
        }
        // Hide on home page (e.g., /en/home, /ar/home)
        if (pathSegments.length === 2 && pathSegments[1] === 'home') {
            return true;
        }
        // Hide on project routes (e.g., /en/project, /ar/project/wizard/project-type)
        if (isProjectRoute()) {
            return true;
        }
        return false;
    };
    // Add active link styling function
    const isActiveLink = (path)=>{
        // Split the pathname into segments
        const pathSegments = pathname.split('/');
        // Get the last segment or check against specific routes
        const currentPath = pathSegments[pathSegments.length - 1] || pathSegments[pathSegments.length - 2];
        // Check for exact match in segment or specific path cases
        if (currentPath === path || path === 'statistic' && currentPath === 'statistic' || path === 'data' && currentPath === 'data' || path === 'report' && currentPath === 'report' || path === 'manual' && currentPath === 'manual' || path === 'course' && currentPath === 'course' || path === 'all-industries' && pathname.includes('/all-industries')) {
            return 'bg-[#3B8AEF] text-white';
        }
        return '';
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            // Fetch industries data with caching
            const loadIndustries = {
                "Header.useEffect.loadIndustries": async ()=>{
                    const data = await getIndustries(currentLocale);
                    setIndustries(data);
                }
            }["Header.useEffect.loadIndustries"];
            loadIndustries();
        }
    }["Header.useEffect"], [
        currentLocale
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            const onScroll = {
                "Header.useEffect.onScroll": ()=>setIsScrolled(window.scrollY > 0)
            }["Header.useEffect.onScroll"];
            onScroll();
            window.addEventListener('scroll', onScroll, {
                passive: true
            });
            return ({
                "Header.useEffect": ()=>window.removeEventListener('scroll', onScroll)
            })["Header.useEffect"];
        }
    }["Header.useEffect"], []);
    // Helper function to get the base domain for cookies
    const getCookieDomain = ()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const hostname = window.location.hostname;
        // Check for production domains
        if (hostname.includes('insightabusiness.com')) {
            return '.insightabusiness.com';
        }
        if (hostname.includes('foresighta.co')) {
            return '.insightabusiness.com';
        }
        // Local development - no domain needed
        return null;
    };
    // Helper function to check if we're in production
    const isProduction = ()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const hostname = window.location.hostname;
        return hostname.includes('insightabusiness.com') || hostname.includes('foresighta.co');
    };
    // Helper function to clear duplicate cookies
    const clearDuplicateCookies = (cookieName)=>{
        const cookieDomain = getCookieDomain();
        const prod = isProduction();
        // Clear all possible variations of the cookie to prevent duplicates
        const clearVariations = [
            // Local variation
            "".concat(cookieName, "=; Path=/; Max-Age=-1")
        ];
        // Add domain-specific clearing for production
        if (cookieDomain) {
            clearVariations.push("".concat(cookieName, "=; Domain=").concat(cookieDomain, "; Path=/; Max-Age=-1; Secure; SameSite=None"), "".concat(cookieName, "=; Domain=").concat(cookieDomain, "; Path=/; Max-Age=-1; Secure; SameSite=Lax"));
        }
        // Fallback without domain
        clearVariations.push("".concat(cookieName, "=; Path=/; Max-Age=-1; ").concat(prod ? 'Secure; SameSite=None' : 'SameSite=Lax'));
        clearVariations.forEach((variation)=>{
            document.cookie = variation;
        });
    };
    // Function to switch locale
    const switchLocale = (locale)=>{
        // Set loading state before switching locale
        setAppLoading(true);
        // Clear any existing duplicate cookies first (both preferred_language and NEXT_LOCALE)
        // This handles cookies set by Angular (SameSite=None) and Next.js (SameSite=Lax)
        clearDuplicateCookies('preferred_language');
        clearDuplicateCookies('NEXT_LOCALE');
        // Cookie operations via document.cookie are synchronous - no timeout needed
        const cookieDomain = getCookieDomain();
        const prod = isProduction();
        const expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 1); // 1 year from now
        const cookieParts = [
            "preferred_language=".concat(locale),
            "Path=/",
            "Expires=".concat(expirationDate.toUTCString()),
            "Max-Age=".concat(60 * 60 * 24 * 365),
            "SameSite=Lax"
        ];
        if (cookieDomain) {
            cookieParts.push("Domain=".concat(cookieDomain)); // leading dot = include subdomains
        }
        if (prod) {
            cookieParts.push("Secure"); // HTTPS only in production
        }
        // Set the preferred_language cookie (shared with Angular app)
        document.cookie = cookieParts.join('; ');
        // Also set NEXT_LOCALE for next-intl middleware consistency
        // This cookie is host-only (no domain) since it's only for the Next.js app
        const nextLocaleParts = [
            "NEXT_LOCALE=".concat(locale),
            "Path=/",
            "Expires=".concat(expirationDate.toUTCString()),
            "Max-Age=".concat(60 * 60 * 24 * 365),
            "SameSite=Lax"
        ];
        if (prod) {
            nextLocaleParts.push("Secure");
        }
        document.cookie = nextLocaleParts.join('; ');
        // Get the current path without locale prefix
        const currentPath = pathname.split('/').slice(2).join('/');
        // Get current query parameters
        const currentSearch = ("TURBOPACK compile-time truthy", 1) ? window.location.search : "TURBOPACK unreachable";
        // Navigate to the same route with the new locale
        // If we're on the home page (or empty path), just use '/'
        const newPath = currentPath ? "/".concat(currentPath) : '/';
        // Preserve query parameters when switching locale
        const fullUrl = "/".concat(locale).concat(newPath).concat(currentSearch);
        // Force a complete page reload to prevent client-side errors
        // This ensures all components are properly re-rendered with the new locale
        window.location.href = fullUrl;
    };
    // Hide header on callback routes to avoid visual flicker/loaders during auth.
    // Hide on dashboard routes because the dashboard renders its own AppShell header/sidebar.
    if (pathname.includes('/callback') || pathname.includes('/dashboard')) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: headerShellRef,
            className: "sticky top-0 z-50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: [
                    'relative w-full z-30 transition-all duration-300',
                    isScrolled ? 'bg-[#0F1629]/95 backdrop-blur-md border-b border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.15)]' : 'bg-[#0F1629]'
                ].join(' '),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            opacity: 0.2
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$particles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            className: "absolute inset-0 -z-1"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/header.tsx",
                            lineNumber: 466,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ui/header.tsx",
                        lineNumber: 465,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto px-2 sm:px-4 md:px-8 lg:px-12 max-w-full relative z-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between h-16 md:h-20 gap-1 md:gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-shrink-0 w-[40px] sm:w-[120px] md:w-[140px]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        isHomePage: true
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/header.tsx",
                                        lineNumber: 478,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/header.tsx",
                                    lineNumber: 477,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                    className: "hidden lg:flex flex-1 overflow-visible min-w-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "flex justify-start items-center w-full gap-0.5 md:gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$HoverCard$2f$HoverCard$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HoverCard"], {
                                                    id: "industries-hovercard-".concat(currentLocale),
                                                    position: "bottom",
                                                    radius: "sm",
                                                    shadow: "md",
                                                    withinPortal: true,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$HoverCard$2f$HoverCard$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HoverCard"].Target, {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                href: "/".concat(currentLocale, "/all-industries"),
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: " text-white ".concat(textColorClass, " font-medium text-xs md:text-sm xl:mx-1 flex items-center group ").concat(isActiveLink('all-industries')),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "mr-1",
                                                                            children: t('navigation.industries')
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/ui/header.tsx",
                                                                            lineNumber: 492,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronDown$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronDown$3e$__["IconChevronDown"], {
                                                                            size: 16,
                                                                            className: "group-hover:translate-y-0.5 transition-transform duration-200"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/ui/header.tsx",
                                                                            lineNumber: 493,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/ui/header.tsx",
                                                                    lineNumber: 491,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/ui/header.tsx",
                                                                lineNumber: 490,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/ui/header.tsx",
                                                            lineNumber: 489,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$HoverCard$2f$HoverCard$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HoverCard"].Dropdown, {
                                                            style: {
                                                                background: 'linear-gradient(to right, #1C2F67, #242B6A)',
                                                                borderColor: '#2F378A'
                                                            },
                                                            className: "font-almarai transition-all duration-300 ease-in-out transform hover:scale-[1.01] shadow-xl",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Group$2f$Group$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
                                                                    justify: "space-between",
                                                                    px: "md",
                                                                    className: "transition-colors duration-200 hover:bg-slate-800/20 rounded p-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Text$2f$Text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                                            fw: 500,
                                                                            c: "white",
                                                                            className: "text-glow",
                                                                            children: t('industriesDropdown.featuredTitle')
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/ui/header.tsx",
                                                                            lineNumber: 503,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Anchor$2f$Anchor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Anchor"], {
                                                                            href: "/".concat(currentLocale, "/all-industries"),
                                                                            fz: "xs",
                                                                            className: "text-blue-300 hover:text-blue-200 transition-all duration-200 hover:underline hover:translate-x-0.5",
                                                                            children: t('industriesDropdown.viewAll')
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/ui/header.tsx",
                                                                            lineNumber: 504,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/ui/header.tsx",
                                                                    lineNumber: 502,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Divider$2f$Divider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Divider"], {
                                                                    my: "sm",
                                                                    color: "dark.5",
                                                                    className: "opacity-50 hover:opacity-80 transition-opacity duration-200"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/ui/header.tsx",
                                                                    lineNumber: 513,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$SimpleGrid$2f$SimpleGrid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SimpleGrid"], {
                                                                    cols: 2,
                                                                    spacing: 0,
                                                                    children: industries.map((industry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                            href: "/".concat(currentLocale, "/industry/").concat(industry.id, "/").concat(industry.slug),
                                                                            className: "block",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "p-3 rounded transition-all duration-200 industry-nav  hover:shadow-inner hover:translate-y-[-2px] hover:bg-blue-400/50 group",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Group$2f$Group$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
                                                                                    wrap: "nowrap",
                                                                                    align: "flex-start",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Text$2f$Text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                                                                size: "sm",
                                                                                                fw: 500,
                                                                                                c: "white",
                                                                                                className: "group-hover:text-blue-200 transition-colors duration-200",
                                                                                                children: industry.name
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/ui/header.tsx",
                                                                                                lineNumber: 525,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Text$2f$Text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                                                                size: "xs",
                                                                                                c: "dimmed",
                                                                                                className: "group-hover:text-slate-300 transition-colors duration-200",
                                                                                                children: t('industriesDropdown.exploreText')
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/ui/header.tsx",
                                                                                                lineNumber: 528,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/ui/header.tsx",
                                                                                        lineNumber: 524,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/ui/header.tsx",
                                                                                    lineNumber: 523,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/ui/header.tsx",
                                                                                lineNumber: 522,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        }, industry.id, false, {
                                                                            fileName: "[project]/components/ui/header.tsx",
                                                                            lineNumber: 517,
                                                                            columnNumber: 29
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/ui/header.tsx",
                                                                    lineNumber: 515,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-4 p-4 rounded-lg bg-[#010a23] hover:bg-[#0a1432] transition-colors duration-300 transform hover:scale-[1.02] hover:shadow-md",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Group$2f$Group$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
                                                                        justify: "space-between",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Text$2f$Text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                                                        fw: 500,
                                                                                        fz: "sm",
                                                                                        c: "white",
                                                                                        className: "hover:text-blue-100 transition-colors duration-200",
                                                                                        children: t('industriesDropdown.exploreAllTitle')
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/ui/header.tsx",
                                                                                        lineNumber: 541,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Text$2f$Text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                                                        size: "xs",
                                                                                        c: "dimmed",
                                                                                        className: "hover:text-slate-300 transition-colors duration-200",
                                                                                        children: t('industriesDropdown.exploreAllDescription')
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/ui/header.tsx",
                                                                                        lineNumber: 544,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/ui/header.tsx",
                                                                                lineNumber: 540,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                variant: "light",
                                                                                component: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                                                                                href: "/".concat(currentLocale, "/all-industries"),
                                                                                className: "bg-blue-50 text-blue-600 hover:bg-blue-200 hover:text-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg",
                                                                                children: t('industriesDropdown.browseAll')
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/ui/header.tsx",
                                                                                lineNumber: 548,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/ui/header.tsx",
                                                                        lineNumber: 539,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/ui/header.tsx",
                                                                    lineNumber: 538,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/ui/header.tsx",
                                                            lineNumber: 498,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/ui/header.tsx",
                                                    lineNumber: 485,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/ui/header.tsx",
                                                lineNumber: 484,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    className: "font-medium text-xs md:text-sm ".concat(menuTextColorClass, " text-white xl:mx-1 ").concat(isActiveLink('data')),
                                                    href: "/".concat(currentLocale, "/industries/data"),
                                                    children: t('navigation.data')
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/header.tsx",
                                                    lineNumber: 562,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/ui/header.tsx",
                                                lineNumber: 561,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    className: "font-medium text-xs md:text-sm ".concat(menuTextColorClass, " text-white xl:mx-1 ").concat(isActiveLink('report')),
                                                    href: "/".concat(currentLocale, "/industries/report"),
                                                    children: t('navigation.reports')
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/header.tsx",
                                                    lineNumber: 565,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/ui/header.tsx",
                                                lineNumber: 564,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    className: "font-medium text-xs md:text-sm ".concat(menuTextColorClass, " text-white xl:mx-1 ").concat(isActiveLink('statistic')),
                                                    href: "/".concat(currentLocale, "/industries/statistic"),
                                                    children: t('navigation.statistics')
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/header.tsx",
                                                    lineNumber: 568,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/ui/header.tsx",
                                                lineNumber: 567,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "md:block hidden",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    className: "font-medium text-xs md:text-sm ".concat(menuTextColorClass, " text-white xl:mx-1 ").concat(isActiveLink('manual')),
                                                    href: "/".concat(currentLocale, "/industries/manual"),
                                                    children: t('navigation.manuals')
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/header.tsx",
                                                    lineNumber: 571,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/ui/header.tsx",
                                                lineNumber: 570,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "md:block hidden",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    className: "font-medium text-xs md:text-sm ".concat(menuTextColorClass, " text-white xl:mx-1 ").concat(isActiveLink('course')),
                                                    href: "/".concat(currentLocale, "/industries/course"),
                                                    children: t('navigation.courses')
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/header.tsx",
                                                    lineNumber: 574,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/ui/header.tsx",
                                                lineNumber: 573,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ui/header.tsx",
                                        lineNumber: 483,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/header.tsx",
                                    lineNumber: 482,
                                    columnNumber: 15
                                }, this),
                                !shouldHideSearchBar() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hidden xl:flex items-center mx-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                        onSubmit: handleSearchSubmit,
                                        className: "flex items-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$TextInput$2f$TextInput$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextInput"], {
                                            id: "header-search-".concat(currentLocale),
                                            placeholder: currentLocale === 'ar' ? 'البحث...' : 'Search...',
                                            value: searchQuery,
                                            onChange: (e)=>setSearchQuery(e.currentTarget.value),
                                            onKeyDown: (e)=>{
                                                if (e.key === 'Escape') {
                                                    setSearchQuery('');
                                                }
                                            },
                                            size: "sm",
                                            radius: "md",
                                            className: "w-64",
                                            ...currentLocale === 'ar' ? {
                                                leftSection: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "submit",
                                                    className: "p-1 text-slate-300 hover:text-white transition-all duration-200 cursor-pointer",
                                                    onClick: (e)=>{
                                                        e.stopPropagation();
                                                        handleSearchSubmit(e);
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__["IconSearch"], {
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ui/header.tsx",
                                                        lineNumber: 608,
                                                        columnNumber: 31
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/header.tsx",
                                                    lineNumber: 600,
                                                    columnNumber: 29
                                                }, void 0)
                                            } : {
                                                rightSection: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "submit",
                                                    className: "p-1 text-slate-300 hover:text-white transition-all duration-200 cursor-pointer",
                                                    onClick: (e)=>{
                                                        e.stopPropagation();
                                                        handleSearchSubmit(e);
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__["IconSearch"], {
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ui/header.tsx",
                                                        lineNumber: 622,
                                                        columnNumber: 31
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/header.tsx",
                                                    lineNumber: 614,
                                                    columnNumber: 29
                                                }, void 0)
                                            },
                                            styles: {
                                                ...searchInputStyles
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/ui/header.tsx",
                                            lineNumber: 583,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/header.tsx",
                                        lineNumber: 582,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/header.tsx",
                                    lineNumber: 581,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "flex justify-end items-center flex-shrink-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "mx-1 md:mx-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>switchLocale(currentLocale === 'en' ? 'ar' : 'en'),
                                                    className: "flex items-center px-2 md:px-3 py-2 rounded-md text-slate-300 hover:text-white hover:bg-[#3B8AEF]/20 transition-all duration-300 ease-in-out group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconLanguage$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconLanguage$3e$__["IconLanguage"], {
                                                            size: 18,
                                                            className: "".concat(isScrolled ? 'text-white' : 'text-gray-200')
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/ui/header.tsx",
                                                            lineNumber: 644,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "hidden lg:inline text-sm font-medium whitespace-nowrap ml-1 ".concat(isScrolled ? 'text-white' : 'text-gray-200'),
                                                            children: currentLocale === 'en' ? t('language.switchToArabic') : t('language.switchToEnglish')
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/ui/header.tsx",
                                                            lineNumber: 645,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/ui/header.tsx",
                                                    lineNumber: 640,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/ui/header.tsx",
                                                lineNumber: 639,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/ui/header.tsx",
                                            lineNumber: 638,
                                            columnNumber: 17
                                        }, this),
                                        !shouldShowAuthSkeleton && !isProjectRoute() && !roles.includes('insighter') && !roles.includes('company') && !roles.includes('company-insighter') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "mx-1 md:mx-2 hidden lg:block",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "http://localhost:4200/app/insighter-register/vertical",
                                                "aria-label": ctaAccessibleLabel,
                                                className: "font-medium text-sm text-white px-2 md:px-3 py-2 rounded-md bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 ease-in-out whitespace-nowrap",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        "aria-hidden": "true",
                                                        dir: isArabicLocale ? 'rtl' : 'ltr',
                                                        className: "inline-flex items-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    paddingInlineStart: '10px'
                                                                },
                                                                children: ctaPrefix
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/ui/header.tsx",
                                                                lineNumber: 665,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "insighter-word-slot ".concat(isArabicLocale ? 'min-w-[5.5ch]' : 'min-w-[9ch]'),
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "insighter-word ".concat(isCtaWordVisible ? 'is-visible' : 'is-hidden'),
                                                                    children: currentCtaWord
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/ui/header.tsx",
                                                                    lineNumber: 669,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/ui/header.tsx",
                                                                lineNumber: 666,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/ui/header.tsx",
                                                        lineNumber: 660,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "sr-only",
                                                        children: ctaAccessibleLabel
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ui/header.tsx",
                                                        lineNumber: 672,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/ui/header.tsx",
                                                lineNumber: 655,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/ui/header.tsx",
                                            lineNumber: 654,
                                            columnNumber: 19
                                        }, this),
                                        !shouldHideSearchBar() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "xl:hidden mr-1 md:mr-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    router.push("/".concat(currentLocale, "/home"));
                                                },
                                                className: "flex items-center p-2 text-slate-300 hover:text-white hover:bg-[#3B8AEF]/20 rounded-md transition-all duration-200",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__["IconSearch"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/header.tsx",
                                                    lineNumber: 686,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/ui/header.tsx",
                                                lineNumber: 680,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/ui/header.tsx",
                                            lineNumber: 679,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "me-2 md:me-4 flex items-center relative z-20",
                                            children: user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$components$2f$NotificationBell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                fileName: "[project]/components/ui/header.tsx",
                                                lineNumber: 693,
                                                columnNumber: 27
                                            }, this) : ''
                                        }, void 0, false, {
                                            fileName: "[project]/components/ui/header.tsx",
                                            lineNumber: 692,
                                            columnNumber: 17
                                        }, this),
                                        shouldShowAuthSkeleton ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-center",
                                            children: hasToken ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-10 h-10 bg-white/80 animate-pulse rounded-full overflow-hidden border border-white/20"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ui/header.tsx",
                                                lineNumber: 699,
                                                columnNumber: 23
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-9 w-24 bg-white/20 animate-pulse rounded-full overflow-hidden border border-white/10"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ui/header.tsx",
                                                lineNumber: 701,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/ui/header.tsx",
                                            lineNumber: 697,
                                            columnNumber: 19
                                        }, this) : user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$components$2f$UserProfile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserProfile"], {
                                                isHome: true
                                            }, void 0, false, {
                                                fileName: "[project]/components/ui/header.tsx",
                                                lineNumber: 706,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/ui/header.tsx",
                                            lineNumber: 705,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "btn-sm text-slate-300 hover:text-white [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] before:bg-slate-800/30 hover:scale-105 active:scale-95 transition-all duration-150 ease-in-out group relative before:absolute before:inset-0 before:rounded-full before:pointer-events-none",
                                                href: "http://localhost:4200/auth/login?returnUrl=".concat(encodeURIComponent(returnUrl)),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "relative inline-flex items-center",
                                                    children: [
                                                        t('auth.login'),
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "tracking-normal text-blue-500 group-hover:translate-x-1 transition-transform duration-150 ease-in-out ml-1",
                                                            children: ">"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/ui/header.tsx",
                                                            lineNumber: 713,
                                                            columnNumber: 43
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/ui/header.tsx",
                                                    lineNumber: 712,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/ui/header.tsx",
                                                lineNumber: 710,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/ui/header.tsx",
                                            lineNumber: 709,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/ui/header.tsx",
                                    lineNumber: 636,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$mobile$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    isHomePage: true
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/header.tsx",
                                    lineNumber: 720,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ui/header.tsx",
                            lineNumber: 474,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ui/header.tsx",
                        lineNumber: 473,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/header.tsx",
                lineNumber: 456,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/ui/header.tsx",
            lineNumber: 453,
            columnNumber: 7
        }, this)
    }, void 0, false);
}
_s(Header, "dKEz4PnNOxpw1646o+Dx2mAIeng=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$context$2f$LoadingContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLoading"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserProfile"]
    ];
});
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/toast/Toast.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCheck.mjs [app-client] (ecmascript) <export default as IconCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconX.mjs [app-client] (ecmascript) <export default as IconX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconInfoCircle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconInfoCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconInfoCircle.mjs [app-client] (ecmascript) <export default as IconInfoCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconAlertTriangle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconAlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconAlertTriangle.mjs [app-client] (ecmascript) <export default as IconAlertTriangle>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const Toast = (param)=>{
    let { message, title = 'Notification', type = 'info', delay = 5000, onClose } = param;
    _s();
    const [show, setShow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const timeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Toast.useEffect": ()=>{
            // Show the toast
            setShow(true);
            // Auto-hide after delay
            timeoutRef.current = setTimeout({
                "Toast.useEffect": ()=>{
                    setShow(false);
                    if (onClose) {
                        setTimeout({
                            "Toast.useEffect": ()=>onClose()
                        }["Toast.useEffect"], 150); // Call onClose after fade out
                    }
                }
            }["Toast.useEffect"], delay);
            // Cleanup function
            return ({
                "Toast.useEffect": ()=>{
                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                    }
                }
            })["Toast.useEffect"];
        }
    }["Toast.useEffect"], [
        delay,
        onClose
    ]);
    // Get icon and colors based on type - matching PrimeNG design
    const getStyles = ()=>{
        switch(type){
            case 'success':
                return {
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCheck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCheck$3e$__["IconCheck"], {
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/components/toast/Toast.tsx",
                        lineNumber: 49,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    iconColor: '#22c55e',
                    borderColor: '#22c55e',
                    backgroundColor: '#dcfce7',
                    textColor: '#15803d'
                };
            case 'error':
                return {
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__["IconX"], {
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/components/toast/Toast.tsx",
                        lineNumber: 57,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    iconColor: '#ef4444',
                    borderColor: '#ef4444',
                    backgroundColor: '#fee2e2',
                    textColor: '#dc2626'
                };
            case 'warning':
                return {
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconAlertTriangle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconAlertTriangle$3e$__["IconAlertTriangle"], {
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/components/toast/Toast.tsx",
                        lineNumber: 65,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    iconColor: '#f59e0b',
                    borderColor: '#f59e0b',
                    backgroundColor: '#fef3c7',
                    textColor: '#d97706'
                };
            case 'info':
                return {
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconInfoCircle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconInfoCircle$3e$__["IconInfoCircle"], {
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/components/toast/Toast.tsx",
                        lineNumber: 73,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    iconColor: '#3b82f6',
                    borderColor: '#3b82f6',
                    backgroundColor: '#dbeafe',
                    textColor: '#2563eb'
                };
            default:
                return {
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconInfoCircle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconInfoCircle$3e$__["IconInfoCircle"], {
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/components/toast/Toast.tsx",
                        lineNumber: 81,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    iconColor: '#3b82f6',
                    borderColor: '#3b82f6',
                    backgroundColor: '#dbeafe',
                    textColor: '#2563eb'
                };
        }
    };
    // Get title based on type if not provided
    const getDefaultTitle = ()=>{
        if (title && title !== '') return title;
        switch(type){
            case 'success':
                return 'test';
            case 'error':
                return 'test';
            case 'warning':
                return 'test';
            case 'info':
                return 'test';
            default:
                return 'test';
        }
    };
    // Get message based on type
    const getTypeMessage = ()=>{
        switch(type){
            case 'success':
                return 'success';
            case 'error':
                return 'danger';
            case 'warning':
                return 'warning';
            case 'info':
                return 'info';
            default:
                return message;
        }
    };
    const handleClose = ()=>{
        setShow(false);
        if (onClose) {
            setTimeout(()=>onClose(), 150); // Call onClose after fade out
        }
    };
    const styles = getStyles();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "alert",
        "aria-live": "assertive",
        "aria-atomic": "true",
        style: {
            opacity: show ? 1 : 0,
            transform: show ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'all 0.3s ease-in-out',
            minWidth: '300px',
            maxWidth: '400px',
            backgroundColor: styles.backgroundColor,
            border: 'none',
            borderRadius: '6px',
            borderLeft: "4px solid ".concat(styles.borderColor),
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            alignItems: 'flex-start',
            padding: '16px',
            gap: '12px',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    color: styles.iconColor,
                    flexShrink: 0,
                    marginTop: '2px'
                },
                children: styles.icon
            }, void 0, false, {
                fileName: "[project]/components/toast/Toast.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    minWidth: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: '14px',
                            fontWeight: '600',
                            color: styles.textColor,
                            marginBottom: '4px',
                            lineHeight: '1.2'
                        },
                        children: getDefaultTitle()
                    }, void 0, false, {
                        fileName: "[project]/components/toast/Toast.tsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: '14px',
                            color: styles.textColor,
                            lineHeight: '1.3',
                            opacity: 0.9,
                            whiteSpace: 'pre-line'
                        },
                        children: message || getTypeMessage()
                    }, void 0, false, {
                        fileName: "[project]/components/toast/Toast.tsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/toast/Toast.tsx",
                lineNumber: 166,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: handleClose,
                "aria-label": "Close",
                style: {
                    background: 'none',
                    border: 'none',
                    color: styles.textColor,
                    cursor: 'pointer',
                    fontSize: '18px',
                    lineHeight: '1',
                    opacity: 0.6,
                    padding: '0',
                    flexShrink: 0,
                    marginTop: '2px',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                onMouseEnter: (e)=>e.currentTarget.style.opacity = '1',
                onMouseLeave: (e)=>e.currentTarget.style.opacity = '0.6',
                children: "×"
            }, void 0, false, {
                fileName: "[project]/components/toast/Toast.tsx",
                lineNumber: 191,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/toast/Toast.tsx",
        lineNumber: 134,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Toast, "el4oI7d/injEbIGsUYQeN3U5nAI=");
_c = Toast;
const __TURBOPACK__default__export__ = Toast;
var _c;
__turbopack_context__.k.register(_c, "Toast");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/toast/ToastContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastProvider",
    ()=>ToastProvider,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/toast/Toast.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
const ToastContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const ToastProvider = (param)=>{
    let { children } = param;
    _s();
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [portalContainer, setPortalContainer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "ToastProvider.useEffect": ()=>{
            // Create toast container if it doesn't exist
            let container = document.querySelector('.toast-container');
            if (!container) {
                container = document.createElement('div');
                container.className = 'position-fixed top-0 end-0 p-3 z-index-20 toast-container';
                document.body.appendChild(container);
            }
            setPortalContainer(container);
            return ({
                "ToastProvider.useEffect": ()=>{
                // Cleanup logic if needed
                }
            })["ToastProvider.useEffect"];
        }
    }["ToastProvider.useEffect"], []);
    const removeToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[removeToast]": (id)=>{
            setToasts({
                "ToastProvider.useCallback[removeToast]": (prevToasts)=>prevToasts.filter({
                        "ToastProvider.useCallback[removeToast]": (toast)=>toast.id !== id
                    }["ToastProvider.useCallback[removeToast]"])
            }["ToastProvider.useCallback[removeToast]"]);
        }
    }["ToastProvider.useCallback[removeToast]"], []);
    const showToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[showToast]": function(message, type, title) {
            let delay = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 5000;
            // Generate a unique ID based on message content and type to prevent duplicates
            const contentHash = "".concat(type, "-").concat(message);
            const id = Date.now().toString();
            title = title || ({
                success: 'Success',
                error: 'Error',
                warning: 'Warning',
                info: 'Information'
            })[type];
            // If title is empty, set a default based on type
            if (title === '') {
                title = ({
                    success: 'Success',
                    error: 'Error',
                    warning: 'Warning',
                    info: 'Information'
                })[type];
            }
            // Check if we already have a toast with the same message and type
            setToasts({
                "ToastProvider.useCallback[showToast]": (prevToasts)=>{
                    // If we already have this exact toast message and type, don't add a duplicate
                    const duplicateToast = prevToasts.find({
                        "ToastProvider.useCallback[showToast].duplicateToast": (t)=>t.message === message && t.type === type
                    }["ToastProvider.useCallback[showToast].duplicateToast"]);
                    if (duplicateToast) {
                        // Just return the existing toasts without adding a duplicate
                        return prevToasts;
                    }
                    // Otherwise add the new toast
                    return [
                        ...prevToasts,
                        {
                            id,
                            message,
                            type,
                            title,
                            delay
                        }
                    ];
                }
            }["ToastProvider.useCallback[showToast]"]);
        }
    }["ToastProvider.useCallback[showToast]"], []);
    const success = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[success]": function() {
            let message = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 'Success', title = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'Success', delay = arguments.length > 2 ? arguments[2] : void 0;
            showToast(message, 'success', title, delay);
        }
    }["ToastProvider.useCallback[success]"], [
        showToast
    ]);
    const error = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[error]": function() {
            let message = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 'Error', title = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'Error', delay = arguments.length > 2 ? arguments[2] : void 0;
            showToast(message, 'error', title, delay);
        }
    }["ToastProvider.useCallback[error]"], [
        showToast
    ]);
    const warning = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[warning]": function() {
            let message = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 'Warning', title = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'Warning', delay = arguments.length > 2 ? arguments[2] : void 0;
            showToast(message, 'warning', title, delay);
        }
    }["ToastProvider.useCallback[warning]"], [
        showToast
    ]);
    const info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[info]": function() {
            let message = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 'Information', title = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'Information', delay = arguments.length > 2 ? arguments[2] : void 0;
            showToast(message, 'info', title, delay);
        }
    }["ToastProvider.useCallback[info]"], [
        showToast
    ]);
    const handleServerSuccess = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[handleServerSuccess]": function(payload) {
            let fallbackMessage = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'Success';
            const normalizedPayload = payload && typeof payload === 'object' ? payload : null;
            const type = (normalizedPayload === null || normalizedPayload === void 0 ? void 0 : normalizedPayload.type) === 'warning' ? 'warning' : 'success';
            const show = type === 'warning' ? warning : success;
            const messageCandidate = typeof (normalizedPayload === null || normalizedPayload === void 0 ? void 0 : normalizedPayload.message) === 'string' && normalizedPayload.message.trim() ? normalizedPayload.message.trim() : fallbackMessage;
            show(messageCandidate, '', 6000);
        }
    }["ToastProvider.useCallback[handleServerSuccess]"], [
        success,
        warning
    ]);
    // Function to handle server errors similar to Angular service
    const handleServerErrors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[handleServerErrors]": (err)=>{
            var _err_response;
            const payload = (err === null || err === void 0 ? void 0 : err.error) && typeof err.error === 'object' ? err.error : (err === null || err === void 0 ? void 0 : (_err_response = err.response) === null || _err_response === void 0 ? void 0 : _err_response.data) && typeof err.response.data === 'object' ? err.response.data : err && typeof err === 'object' ? err : null;
            const type = typeof (payload === null || payload === void 0 ? void 0 : payload.type) === 'string' ? payload.type : undefined;
            const show = type === 'warning' ? warning : error;
            const errorsBag = payload === null || payload === void 0 ? void 0 : payload.errors;
            if (errorsBag && typeof errorsBag === 'object') {
                for(const key in errorsBag){
                    if (!Object.prototype.hasOwnProperty.call(errorsBag, key)) continue;
                    const entry = errorsBag[key];
                    const messages = Array.isArray(entry) ? entry : entry ? [
                        entry
                    ] : [];
                    const normalized = messages.map({
                        "ToastProvider.useCallback[handleServerErrors].normalized": (message)=>typeof message === 'string' ? message.trim() : ''
                    }["ToastProvider.useCallback[handleServerErrors].normalized"]).filter(Boolean);
                    if (!normalized.length) continue;
                    show(normalized.join(', '), '', 10000);
                }
                return;
            }
            const messageCandidate = typeof (payload === null || payload === void 0 ? void 0 : payload.message) === 'string' && payload.message.trim() ? payload.message.trim() : typeof (err === null || err === void 0 ? void 0 : err.message) === 'string' && err.message.trim() ? err.message.trim() : '';
            if (type === 'warning') {
                show(messageCandidate || 'An unexpected warning occurred.', '', 10000);
                return;
            }
            show(messageCandidate || 'An unexpected error occurred.', '', 10000);
        }
    }["ToastProvider.useCallback[handleServerErrors]"], [
        error,
        warning
    ]);
    const contextValue = {
        success,
        error,
        warning,
        info,
        handleServerSuccess,
        handleServerErrors
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastContext.Provider, {
        value: contextValue,
        children: [
            children,
            portalContainer ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: toasts.map((toast)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        message: toast.message,
                        title: toast.title,
                        type: toast.type,
                        delay: toast.delay,
                        onClose: ()=>removeToast(toast.id)
                    }, toast.id, false, {
                        fileName: "[project]/components/toast/ToastContext.tsx",
                        lineNumber: 186,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false), portalContainer) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/toast/ToastContext.tsx",
        lineNumber: 180,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ToastProvider, "9NvqB/5hGvQldafMBf0GnYZ5SRA=");
_c = ToastProvider;
const useToast = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
_s1(useToast, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "ToastProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/[locale]/ClientLogoutHandler.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ClientLogoutHandler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
// Function to clean up all auth data
const cleanupAuthData = ()=>{
    // Clean localStorage
    try {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('foresighta-creds');
    } catch (e) {}
};
function ClientLogoutHandler() {
    _s();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const loggedOut = searchParams.get('logged_out');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClientLogoutHandler.useEffect": ()=>{
            // Handle logout parameter from Angular app redirect
            if (loggedOut === 'true') {
                cleanupAuthData();
                // Optionally remove the logged_out parameter from URL using history API
                if (window.history && window.history.replaceState) {
                    const newUrl = window.location.pathname;
                    window.history.replaceState({}, document.title, newUrl);
                }
            }
        }
    }["ClientLogoutHandler.useEffect"], [
        loggedOut
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClientLogoutHandler.useEffect": ()=>{
            // Skip auth check for public routes
            const isPublicRoute = pathname.includes('/home') || pathname === '/' || pathname.includes('/callback') || pathname.includes('/signout') || pathname.includes('/dashboard');
            if (isPublicRoute) {
                return;
            }
            // Check auth state and handle cleanup
            const checkAuth = {
                "ClientLogoutHandler.useEffect.checkAuth": ()=>{
                    const cookieToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTokenFromCookie"])('token');
                    const userData = localStorage.getItem('user');
                    // If we have localStorage data but no cookie token, we need to clean up and redirect
                    if (!cookieToken && userData) {
                        cleanupAuthData();
                        // Get the current locale for the redirect
                        const locale = pathname.split('/')[1] || 'en';
                        const timestamp = new Date().getTime();
                        // Redirect to Angular app's logout endpoint
                        window.location.href = "http://localhost:4200/auth/logout?redirect_uri=".concat(encodeURIComponent("http://localhost:3000/".concat(locale, "?t=").concat(timestamp)));
                    }
                }
            }["ClientLogoutHandler.useEffect.checkAuth"];
            // Run initial check
            if ("TURBOPACK compile-time truthy", 1) {
                checkAuth();
            }
            // Set up interval to periodically check auth state
            const interval = setInterval(checkAuth, 5000);
            // Cleanup interval on unmount
            return ({
                "ClientLogoutHandler.useEffect": ()=>clearInterval(interval)
            })["ClientLogoutHandler.useEffect"];
        }
    }["ClientLogoutHandler.useEffect"], [
        pathname
    ]);
    // This component doesn't render anything visible
    return null;
}
_s(ClientLogoutHandler, "zvric2/qPUsv2C6qggvn13vADRU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = ClientLogoutHandler;
var _c;
__turbopack_context__.k.register(_c, "ClientLogoutHandler");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/auth-banner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/index.react-client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function AuthBanner(param) {
    let { onSignUp, onLogin } = param;
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const locale = params.locale;
    const isRTL = locale === 'ar';
    const bannerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthBanner.useEffect": ()=>{
            const element = bannerRef.current;
            if (!element) return;
            const updateOffset = {
                "AuthBanner.useEffect.updateOffset": ()=>{
                    const height = element.offsetHeight || 0;
                    document.body.style.setProperty('--auth-banner-offset', "".concat(height, "px"));
                }
            }["AuthBanner.useEffect.updateOffset"];
            updateOffset();
            const resizeObserver = new ResizeObserver({
                "AuthBanner.useEffect": ()=>updateOffset()
            }["AuthBanner.useEffect"]);
            resizeObserver.observe(element);
            window.addEventListener('resize', updateOffset);
            return ({
                "AuthBanner.useEffect": ()=>{
                    resizeObserver.disconnect();
                    window.removeEventListener('resize', updateOffset);
                    document.body.style.removeProperty('--auth-banner-offset');
                }
            })["AuthBanner.useEffect"];
        }
    }["AuthBanner.useEffect"], []);
    const handleSignUp = ()=>{
        if (onSignUp) {
            onSignUp();
        } else {
            // Default redirect to Angular app signup
            window.location.href = "http://localhost:4200/auth/sign-up";
        }
    };
    const handleLogin = ()=>{
        if (onLogin) {
            onLogin();
        } else {
            // Default redirect to Angular app login
            window.location.href = "http://localhost:4200/auth/login?redirect_uri=".concat(encodeURIComponent(window.location.href));
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: bannerRef,
        className: "fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-4",
        dir: isRTL ? 'rtl' : 'ltr',
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl\n         mx-auto flex \n         sm:flex-row  items-center gap-1 sm:gap-4 justify-between ".concat(isRTL ? 'flex-row-reverse' : 'flex-row'),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-white max-w-[170px] sm:max-w-none",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: " text-sm sm:text-lg font-bold mb-1",
                            children: isRTL ? 'اكتشف المعرفة المهنية' : 'Unlock business insights'
                        }, void 0, false, {
                            fileName: "[project]/components/ui/auth-banner.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs sm:text-sm opacity-90",
                            children: isRTL ? 'انضم إلى Insighta واحصل على رؤى حصرية وتقارير متخصصة.' : 'Join Insighta and access exclusive insights.'
                        }, void 0, false, {
                            fileName: "[project]/components/ui/auth-banner.tsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/auth-banner.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex  gap-1 sm:gap-3 ".concat(isRTL ? 'flex-row-reverse' : 'flex-row'),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleLogin,
                            className: "px-6 py-2 text-xs sm:text-sm font-semibold text-white bg-transparent border border-white rounded-full hover:bg-white hover:text-blue-500 transition-colors",
                            children: isRTL ? 'تسجيل الدخول' : 'Log in'
                        }, void 0, false, {
                            fileName: "[project]/components/ui/auth-banner.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSignUp,
                            className: "px-6 py-2 text-xs sm:text-sm font-semibold text-blue-500 bg-white rounded-full hover:bg-gray-100 transition-colors",
                            children: isRTL ? 'إنشاء حساب' : 'Sign up'
                        }, void 0, false, {
                            fileName: "[project]/components/ui/auth-banner.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/auth-banner.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/auth-banner.tsx",
            lineNumber: 65,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/auth-banner.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_s(AuthBanner, "atltthaewxFqH6GF8U6JHyKmGu4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$index$2e$react$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = AuthBanner;
var _c;
__turbopack_context__.k.register(_c, "AuthBanner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/conditional-auth-banner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConditionalAuthBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/header/hooks/useUserProfile.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$auth$2d$banner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/auth-banner.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function ConditionalAuthBanner() {
    _s();
    const { user, isLoading, isAuthResolved } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserProfile"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    // Hide on Home page (it has its own UX and layout)
    const pathSegments = pathname.split('/').filter(Boolean);
    const isHomePage = pathSegments.length === 1 && pathSegments[0] === 'home' || pathSegments.length === 2 && pathSegments[1] === 'home';
    if (isHomePage) {
        return null;
    }
    // Hide on Project routes (full-screen focused flow)
    const isProjectRoute = pathSegments[0] === 'project' || pathSegments[1] === 'project';
    if (isProjectRoute) {
        return null;
    }
    // Hide on callback routes to keep a clean full-screen loader
    if (pathname.includes('/callback')) {
        return null;
    }
    // Avoid flashing the banner during initial auth resolution (e.g. right after login redirect)
    if (!isAuthResolved) {
        return null;
    }
    // Don't show the banner if user is authenticated or still loading
    if (user || isLoading) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$auth$2d$banner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/components/ui/conditional-auth-banner.tsx",
        lineNumber: 42,
        columnNumber: 10
    }, this);
}
_s(ConditionalAuthBanner, "Z0alM6BmsEzNR98aDSCnk+ZTAfk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserProfile"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = ConditionalAuthBanner;
var _c;
__turbopack_context__.k.register(_c, "ConditionalAuthBanner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/auth/GlobalAuthHandler.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GlobalAuthHandler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/header/hooks/useUserProfile.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function GlobalAuthHandler() {
    _s();
    const { handleSignOut } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserProfile"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlobalAuthHandler.useEffect": ()=>{
            // Function to clean up all auth data
            const cleanupAuthData = {
                "GlobalAuthHandler.useEffect.cleanupAuthData": ()=>{
                    // Clean localStorage
                    try {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        localStorage.removeItem('foresighta-creds');
                    } catch (e) {}
                }
            }["GlobalAuthHandler.useEffect.cleanupAuthData"];
            // Check auth state and handle cleanup
            const checkAuth = {
                "GlobalAuthHandler.useEffect.checkAuth": ()=>{
                    const cookieToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTokenFromCookie"])('token');
                    const userData = localStorage.getItem('user');
                    // Skip auth check for public routes
                    const isPublicRoute = pathname.includes('/home') || pathname === '/' || pathname.includes('/callback') || pathname.includes('/signout') || pathname.includes('/dashboard');
                    if (isPublicRoute) {
                        return;
                    }
                    // If we have localStorage user data but no cookie token, we need to clean up and redirect
                    if (!cookieToken && userData) {
                        cleanupAuthData();
                        // Get the current locale for the redirect
                        const locale = pathname.split('/')[1] || 'en';
                        const timestamp = new Date().getTime();
                        // Redirect to Angular app's logout endpoint
                        window.location.href = "http://localhost:4200/auth/logout?redirect_uri=".concat(encodeURIComponent("http://localhost:3000/".concat(locale, "?t=").concat(timestamp)));
                    }
                }
            }["GlobalAuthHandler.useEffect.checkAuth"];
            // Run initial check
            if ("TURBOPACK compile-time truthy", 1) {
                checkAuth();
            }
            // Set up interval to periodically check auth state
            const interval = setInterval(checkAuth, 5000);
            // Cleanup interval on unmount
            return ({
                "GlobalAuthHandler.useEffect": ()=>clearInterval(interval)
            })["GlobalAuthHandler.useEffect"];
        }
    }["GlobalAuthHandler.useEffect"], [
        handleSignOut,
        pathname
    ]);
    // This component doesn't render anything
    return null;
}
_s(GlobalAuthHandler, "KIvGES7bkuw9SmhnAjcZdBwI6BM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$header$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserProfile"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = GlobalAuthHandler;
var _c;
__turbopack_context__.k.register(_c, "GlobalAuthHandler");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/auth/RoleGuard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RoleGuard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$GlobalProfileProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/GlobalProfileProvider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const ADMIN_REDIRECT_URL = 'http://localhost:4200/admin-dashboard/admin/dashboard/main-dashboard/requests';
// List of paths that admins are allowed to access in Next.js app
const ADMIN_ALLOWED_PATHS = [
    '/callback',
    '/signout',
    '/dashboard'
];
function RoleGuard(param) {
    let { children } = param;
    _s();
    const { user, roles, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$GlobalProfileProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobalProfile"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RoleGuard.useEffect": ()=>{
            // Skip check if still loading or no user
            if (isLoading || !user) {
                return;
            }
            // Check if user has admin role
            const isAdmin = roles.includes('admin');
            const isStaff = roles.includes('staff');
            if (isAdmin || isStaff) {
                // Check if current path is allowed for admins
                const isAllowedPath = ADMIN_ALLOWED_PATHS.some({
                    "RoleGuard.useEffect.isAllowedPath": (path)=>pathname.includes(path)
                }["RoleGuard.useEffect.isAllowedPath"]);
                if (!isAllowedPath) {
                    console.log('[RoleGuard] Admin user detected, redirecting to admin dashboard');
                    console.log('[RoleGuard] User roles:', roles);
                    console.log('[RoleGuard] Current path:', pathname);
                    // Redirect to Angular admin dashboard
                    window.location.href = ADMIN_REDIRECT_URL;
                }
            }
        }
    }["RoleGuard.useEffect"], [
        user,
        roles,
        isLoading,
        pathname
    ]);
    // IMPORTANT:
    // Don't unmount the entire app tree while loading roles.
    // Unmounting/remounting router-hook consumers (usePathname/useSearchParams)
    // during the same navigation can trigger "Rendered more hooks than during the previous render"
    // in Next's internal Router.
    //
    // Instead, keep rendering children and show a lightweight overlay.
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                children,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 backdrop-blur-sm",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-pulse",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/components/auth/RoleGuard.tsx",
                            lineNumber: 60,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/auth/RoleGuard.tsx",
                        lineNumber: 59,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/auth/RoleGuard.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true);
    }
    // If user is admin and not on allowed path, show loading while redirecting
    if (user && (roles.includes('admin') || roles.includes('staff')) && !ADMIN_ALLOWED_PATHS.some((path)=>pathname.includes(path))) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-pulse mb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin mx-auto"
                        }, void 0, false, {
                            fileName: "[project]/components/auth/RoleGuard.tsx",
                            lineNumber: 73,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/auth/RoleGuard.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: "Redirecting to admin dashboard..."
                    }, void 0, false, {
                        fileName: "[project]/components/auth/RoleGuard.tsx",
                        lineNumber: 75,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/auth/RoleGuard.tsx",
                lineNumber: 71,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/auth/RoleGuard.tsx",
            lineNumber: 70,
            columnNumber: 7
        }, this);
    }
    // Render children for non-admin users or admins on allowed paths
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(RoleGuard, "bPW6+d3eunbpFlEJwgQxP3bLP88=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$GlobalProfileProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobalProfile"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = RoleGuard;
var _c;
__turbopack_context__.k.register(_c, "RoleGuard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/analytics-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AnalyticsProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
// Google Analytics ID
const GA_MEASUREMENT_ID = 'G-R1XT5PMHG0';
function AnalyticsProvider() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnalyticsProvider.useEffect": ()=>{
            // Wait for gtag to be available
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            // Wait a bit for gtag to be fully loaded
            const sendPageView = {
                "AnalyticsProvider.useEffect.sendPageView": ()=>{
                    if (!window.gtag) {
                        // Retry after a short delay if gtag is not ready
                        setTimeout(sendPageView, 100);
                        return;
                    }
                    // Get the full URL path including search params
                    const url = pathname + ((searchParams === null || searchParams === void 0 ? void 0 : searchParams.toString()) ? "?".concat(searchParams.toString()) : '');
                    // Send pageview event to Google Analytics
                    window.gtag('config', GA_MEASUREMENT_ID, {
                        page_path: url,
                        page_location: window.location.href,
                        page_title: document.title
                    });
                }
            }["AnalyticsProvider.useEffect.sendPageView"];
            // Initial call
            sendPageView();
        }
    }["AnalyticsProvider.useEffect"], [
        pathname,
        searchParams
    ]);
    // This component doesn't render anything
    return null;
}
_s(AnalyticsProvider, "h6p6PpCFmP4Mu5bIMduBzSZThBE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = AnalyticsProvider;
var _c;
__turbopack_context__.k.register(_c, "AnalyticsProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_6697e5e5._.js.map