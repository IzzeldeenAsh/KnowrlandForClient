module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/components/dev/developer-bar.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "badge": "developer-bar-module__WSq66G__badge",
  "bar": "developer-bar-module__WSq66G__bar",
  "files": "developer-bar-module__WSq66G__files",
  "name": "developer-bar-module__WSq66G__name",
});
}),
"[project]/app/components/dev/DeveloperBar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DeveloperBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$dev$2f$developer$2d$bar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/components/dev/developer-bar.module.css [app-ssr] (css module)");
'use client';
;
;
;
;
function routeScore(route, pathname) {
    const pattern = route.split('/').filter(Boolean);
    const actual = pathname.split('/').filter(Boolean);
    let index = 0;
    let score = 0;
    for (const segment of pattern){
        if (segment.startsWith('[[...')) return score;
        if (segment.startsWith('[...')) return index < actual.length ? score : -1;
        if (index >= actual.length) return -1;
        if (segment.startsWith('[')) score += 1;
        else if (segment === actual[index]) score += 10;
        else return -1;
        index++;
    }
    return index === actual.length ? score : -1;
}
function DeveloperBar({ entries }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const [inspecting, setInspecting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [collapsed, setCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const page = entries.filter((entry)=>entry.route !== undefined && routeScore(entry.route, pathname) >= 0).sort((a, b)=>routeScore(b.route, pathname) - routeScore(a.route, pathname))[0];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setSelected(null);
        setCopied(false);
    }, [
        pathname
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!inspecting) return;
        const inspect = (event)=>{
            let element = event.target instanceof Element ? event.target : null;
            if (element?.closest('[data-developer-bar]')) return;
            while(element){
                const key = Object.keys(element).find((key)=>key.startsWith('__reactFiber$'));
                let fiber = key ? element[key] : undefined;
                while(fiber){
                    const name = fiber.type?.displayName || fiber.type?.name || fiber.type?.render?.name;
                    // Prefer source metadata when React provides it; otherwise show ambiguous matches explicitly.
                    const matches = name ? entries.filter((entry)=>entry.name === name) : [];
                    if (matches.length) {
                        const source = fiber._debugSource?.fileName || fiber._debugStack?.stack || '';
                        const exact = matches.filter((entry)=>source.includes(entry.files[0]));
                        setSelected(exact.length === 1 ? exact[0] : matches.length === 1 ? matches[0] : {
                            name: `${name} (${matches.length} matching sources)`,
                            files: matches.flatMap((entry)=>entry.files)
                        });
                        return;
                    }
                    fiber = fiber.return;
                }
                element = element.parentElement;
            }
            setSelected(null);
        };
        const escape = (event)=>{
            if (event.key === 'Escape') {
                setInspecting(false);
                setSelected(null);
            }
        };
        document.addEventListener('pointerover', inspect, {
            passive: true
        });
        document.addEventListener('focusin', inspect);
        document.addEventListener('keydown', escape);
        return ()=>{
            document.removeEventListener('pointerover', inspect);
            document.removeEventListener('focusin', inspect);
            document.removeEventListener('keydown', escape);
        };
    }, [
        inspecting,
        entries
    ]);
    const current = inspecting && selected ? selected : page;
    const files = current?.files || [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        "data-developer-bar": true,
        "data-collapsed": collapsed,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$dev$2f$developer$2d$bar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bar,
        "aria-label": "Developer component bar",
        dir: "ltr",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$dev$2f$developer$2d$bar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].badge,
                onClick: ()=>setCollapsed(!collapsed),
                "aria-expanded": !collapsed,
                title: "Toggle developer bar",
                children: "DEV · Next.js"
            }, void 0, false, {
                fileName: "[project]/app/components/dev/DeveloperBar.tsx",
                lineNumber: 76,
                columnNumber: 5
            }, this),
            !collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$dev$2f$developer$2d$bar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].name,
                        children: current?.name || 'Page'
                    }, void 0, false, {
                        fileName: "[project]/app/components/dev/DeveloperBar.tsx",
                        lineNumber: 78,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$dev$2f$developer$2d$bar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].files,
                        title: files.join('\n'),
                        children: files.length ? files.join('  ·  ') : `No page source found for ${pathname}`
                    }, void 0, false, {
                        fileName: "[project]/app/components/dev/DeveloperBar.tsx",
                        lineNumber: 79,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        "aria-pressed": inspecting,
                        onClick: ()=>{
                            setInspecting(!inspecting);
                            setSelected(null);
                        },
                        children: inspecting ? 'Inspecting · Esc' : 'Inspect'
                    }, void 0, false, {
                        fileName: "[project]/app/components/dev/DeveloperBar.tsx",
                        lineNumber: 80,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        disabled: !files.length,
                        onClick: async ()=>{
                            try {
                                await navigator.clipboard.writeText(files.join('\n'));
                                setCopied(true);
                                window.setTimeout(()=>setCopied(false), 1500);
                            } catch  {
                                setCopied(false);
                            }
                        },
                        children: copied ? 'Copied' : 'Copy paths'
                    }, void 0, false, {
                        fileName: "[project]/app/components/dev/DeveloperBar.tsx",
                        lineNumber: 81,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/dev/DeveloperBar.tsx",
        lineNumber: 75,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__290ef025._.js.map