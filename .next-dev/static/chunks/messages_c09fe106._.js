(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/messages/ar.json (json, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "static/chunks/messages_ar_json_bcb030df._.js",
  "static/chunks/messages_ar_json_dd064d3a._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/messages/ar.json (json)");
    });
});
}),
"[project]/messages/en.json (json, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "static/chunks/messages_en_json_09b1e58f._.js",
  "static/chunks/messages_en_json_dd064d3a._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/messages/en.json (json)");
    });
});
}),
]);