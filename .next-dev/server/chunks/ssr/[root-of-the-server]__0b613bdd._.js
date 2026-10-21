module.exports = [
"[externals]/node:fs [external] (node:fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/typescript [external] (typescript, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("typescript", () => require("typescript"));

module.exports = mod;
}),
"[project]/app/components/dev/source-manifest.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSourceManifest",
    ()=>getSourceManifest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$server$2d$only$2f$empty$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/server-only/empty.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs [external] (node:fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/typescript [external] (typescript, cjs)");
;
;
;
;
function getSourceManifest() {
    const root = process.cwd();
    const entries = [];
    function walk(directory) {
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(directory)) return;
        for (const item of __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readdirSync(directory, {
            withFileTypes: true
        })){
            const absolute = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(directory, item.name);
            if (item.isDirectory()) {
                walk(absolute);
                continue;
            }
            if (!/\.(tsx|jsx)$/.test(item.name) || absolute.includes('/components/dev/')) continue;
            const file = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].relative(root, absolute).split(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].sep).join('/');
            const source = __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$29$__["default"].createSourceFile(file, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync(absolute, 'utf8'), __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$29$__["default"].ScriptTarget.Latest, true, __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$29$__["default"].ScriptKind.TSX);
            const names = new Set([
                __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].basename(file).replace(/\.[^.]+$/, '')
            ]);
            const files = [
                file
            ];
            for (const node of source.statements){
                if ((__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$29$__["default"].isFunctionDeclaration(node) || __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$29$__["default"].isClassDeclaration(node)) && node.name) names.add(node.name.text);
                if (__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$29$__["default"].isVariableStatement(node)) for (const declaration of node.declarationList.declarations){
                    if (__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$29$__["default"].isIdentifier(declaration.name)) names.add(declaration.name.text);
                }
                if (__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$29$__["default"].isImportDeclaration(node) && __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$29$__["default"].isStringLiteral(node.moduleSpecifier)) {
                    const specifier = node.moduleSpecifier.text;
                    if (!/\.(css|scss|sass)$/.test(specifier)) continue;
                    const css = specifier.startsWith('@/') ? __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(root, specifier.slice(2)) : __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(directory, specifier);
                    if (css.startsWith(root + __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].sep) && __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(css)) files.push(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].relative(root, css).split(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].sep).join('/'));
                }
            }
            const route = /^app\/.*\/page\.[jt]sx$/.test(file) || /^app\/page\.[jt]sx$/.test(file) ? '/' + file.split('/').slice(1, -1).filter((part)=>!part.startsWith('(') && !part.startsWith('@')).join('/') : undefined;
            for (const name of Array.from(names))entries.push({
                name,
                files,
                ...route === undefined ? {} : {
                    route
                }
            });
        }
    }
    walk(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(root, 'app'));
    walk(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(root, 'components'));
    return entries;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0b613bdd._.js.map