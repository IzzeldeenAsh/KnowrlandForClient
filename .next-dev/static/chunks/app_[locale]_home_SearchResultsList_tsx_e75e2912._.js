(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/[locale]/home/SearchResultsList.tsx [app-client] (ecmascript, next/dynamic entry, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  {
    "path": "static/chunks/app_[locale]_topic_[id]_[slug]_knowledge-list_module_dc761d81.css",
    "included": [
      "[project]/app/[locale]/topic/[id]/[slug]/knowledge-list.module.css [app-client] (css)"
    ]
  },
  "static/chunks/app_[locale]_09005e0c._.js",
  "static/chunks/app_[locale]_home_SearchResultsList_tsx_89250bb2._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/app/[locale]/home/SearchResultsList.tsx [app-client] (ecmascript, next/dynamic entry)");
    });
});
}),
]);