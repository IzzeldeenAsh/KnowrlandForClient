(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/[locale]/dashboard/_config/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildAuthHeaders",
    ()=>buildAuthHeaders,
    "parseApiError",
    ()=>parseApiError
]);
function buildAuthHeaders(token) {
    let locale = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'en';
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': locale || 'en',
        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
        Authorization: "Bearer ".concat(token)
    };
}
async function parseApiError(response) {
    const status = response.status;
    var _response_headers_get;
    const contentType = (_response_headers_get = response.headers.get('content-type')) !== null && _response_headers_get !== void 0 ? _response_headers_get : '';
    let body = null;
    if (contentType.toLowerCase().includes('application/json')) {
        try {
            body = await response.json();
        } catch (e) {
            body = null;
        }
    } else {
        try {
            const text = await response.text();
            body = text && text.trim() ? text : null;
        } catch (e) {
            body = null;
        }
    }
    if (body && typeof body === 'object') {
        return {
            status,
            ...body
        };
    }
    if (typeof body === 'string' && body.trim()) {
        return {
            status,
            message: body.trim()
        };
    }
    return {
        status,
        message: "Request failed (".concat(status, ")")
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ContactMessageReplyEditor,
    "richTextToPlainText",
    ()=>richTextToPlainText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$link$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/extension-link/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$image$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/extension-image/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$placeholder$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/extension-placeholder/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$underline$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/extension-underline/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$starter$2d$kit$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/starter-kit/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/react/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/tiptap/esm/RichTextEditor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Popover$2f$Popover$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Popover/Popover.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$TextInput$2f$TextInput$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/TextInput/TextInput.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Button/Button.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Stack/Stack.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPhoto$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPhoto$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconPhoto.mjs [app-client] (ecmascript) <export default as IconPhoto>");
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
function richTextToPlainText(html) {
    if (!html) return '';
    if (typeof document === 'undefined') {
        return html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    }
    const container = document.createElement('div');
    container.innerHTML = html;
    var _container_textContent;
    return ((_container_textContent = container.textContent) !== null && _container_textContent !== void 0 ? _container_textContent : '').replace(/\s+/g, ' ').trim();
}
function ContactMessageReplyEditor(param) {
    let { value, onChange, placeholder = 'Write your reply...', disabled = false } = param;
    _s();
    const [imageUrlOpen, setImageUrlOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [imageUrl, setImageUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEditor"])({
        immediatelyRender: false,
        extensions: [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$starter$2d$kit$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].configure({
                heading: {
                    levels: [
                        1,
                        2,
                        3
                    ]
                }
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$underline$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$link$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].configure({
                autolink: true,
                openOnClick: false,
                defaultProtocol: 'https'
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$placeholder$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].configure({
                placeholder
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$image$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
        ],
        content: value || '',
        onUpdate: {
            "ContactMessageReplyEditor.useEditor[editor]": (param)=>{
                let { editor: currentEditor } = param;
                onChange(currentEditor.getHTML());
            }
        }["ContactMessageReplyEditor.useEditor[editor]"]
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContactMessageReplyEditor.useEffect": ()=>{
            if (!editor) return;
            const nextValue = value || '';
            if (editor.getHTML() !== nextValue) {
                editor.commands.setContent(nextValue, {
                    emitUpdate: false
                });
            }
        }
    }["ContactMessageReplyEditor.useEffect"], [
        editor,
        value
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContactMessageReplyEditor.useEffect": ()=>{
            if (!editor) return;
            editor.setEditable(!disabled);
        }
    }["ContactMessageReplyEditor.useEffect"], [
        disabled,
        editor
    ]);
    const insertImage = ()=>{
        const url = imageUrl.trim();
        if (url && editor) {
            editor.chain().focus().setImage({
                src: url
            }).run();
        }
        setImageUrl('');
        setImageUrlOpen(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"], {
        editor: editor,
        className: "overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].Toolbar, {
                sticky: false,
                className: "border-b border-slate-200 bg-slate-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].ControlsGroup, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].Bold, {}, void 0, false, {
                                fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].Italic, {}, void 0, false, {
                                fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].Underline, {}, void 0, false, {
                                fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].Strikethrough, {}, void 0, false, {
                                fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].ClearFormatting, {}, void 0, false, {
                                fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].ControlsGroup, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].H1, {}, void 0, false, {
                                fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].H2, {}, void 0, false, {
                                fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].H3, {}, void 0, false, {
                                fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].ControlsGroup, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].BulletList, {}, void 0, false, {
                                fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].OrderedList, {}, void 0, false, {
                                fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].Blockquote, {}, void 0, false, {
                                fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].Hr, {}, void 0, false, {
                                fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].ControlsGroup, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].Link, {}, void 0, false, {
                                fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].Unlink, {}, void 0, false, {
                                fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].ControlsGroup, {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Popover$2f$Popover$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
                            opened: imageUrlOpen,
                            onChange: setImageUrlOpen,
                            position: "bottom-start",
                            withArrow: true,
                            shadow: "md",
                            zIndex: 10010,
                            withinPortal: true,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Popover$2f$Popover$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"].Target, {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].Control, {
                                        onClick: ()=>setImageUrlOpen((prev)=>!prev),
                                        "aria-label": "Insert image by URL",
                                        title: "Insert image by URL",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPhoto$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPhoto$3e$__["IconPhoto"], {
                                            size: 16,
                                            stroke: 1.5
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                                            lineNumber: 138,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                                        lineNumber: 133,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                                    lineNumber: 132,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Popover$2f$Popover$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"].Dropdown, {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Stack"], {
                                        gap: "xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$TextInput$2f$TextInput$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextInput"], {
                                                placeholder: "https://example.com/image.png",
                                                value: imageUrl,
                                                onChange: (event)=>setImageUrl(event.currentTarget.value),
                                                onKeyDown: (event)=>{
                                                    if (event.key === 'Enter') {
                                                        event.preventDefault();
                                                        insertImage();
                                                    }
                                                },
                                                autoFocus: true,
                                                size: "xs",
                                                w: 240
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                                                lineNumber: 143,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                size: "xs",
                                                onClick: insertImage,
                                                disabled: !imageUrl.trim(),
                                                children: "Insert image"
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                                                lineNumber: 157,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                                        lineNumber: 142,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                                    lineNumber: 141,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                            lineNumber: 123,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].ControlsGroup, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].Undo, {}, void 0, false, {
                                fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                                lineNumber: 166,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].Redo, {}, void 0, false, {
                                fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                                lineNumber: 167,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].Content, {
                className: "min-h-[220px] bg-white text-sm text-slate-800"
            }, void 0, false, {
                fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, this);
}
_s(ContactMessageReplyEditor, "YKezkpPPcaUDbQIApY7U1kEad5U=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEditor"]
    ];
});
_c = ContactMessageReplyEditor;
var _c;
__turbopack_context__.k.register(_c, "ContactMessageReplyEditor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/[locale]/dashboard/users/clients/components/ClientActionModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ClientActionModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function ClientActionModal(param) {
    let { isOpen, action, client, staffNotes, submitError, isSubmitting, onClose, onSubmit, onStaffNotesChange } = param;
    if (!isOpen || !client) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 px-4 py-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-md rounded-md border border-slate-300 bg-white p-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-sm font-semibold text-slate-900",
                    children: [
                        action === 'deactivate' ? 'Deactivate' : 'Delete',
                        " ",
                        client.name
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientActionModal.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-1 text-xs text-slate-500",
                    children: "Add staff notes before submitting this action."
                }, void 0, false, {
                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientActionModal.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-3 space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "staff-notes",
                                    className: "mb-1 block text-xs font-semibold text-slate-700",
                                    children: "Staff notes"
                                }, void 0, false, {
                                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientActionModal.tsx",
                                    lineNumber: 42,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    id: "staff-notes",
                                    value: staffNotes,
                                    onChange: (event)=>onStaffNotesChange(event.target.value),
                                    rows: 4,
                                    placeholder: "Type your notes...",
                                    className: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400"
                                }, void 0, false, {
                                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientActionModal.tsx",
                                    lineNumber: 45,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientActionModal.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this),
                        submitError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-red-600",
                            children: submitError
                        }, void 0, false, {
                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientActionModal.tsx",
                            lineNumber: 55,
                            columnNumber: 26
                        }, this) : null,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-end gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onClose,
                                    className: "h-8 rounded-md border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientActionModal.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onSubmit,
                                    disabled: isSubmitting,
                                    className: "h-8 rounded-md border border-blue-600 bg-blue-600 px-3 text-xs font-medium text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60",
                                    children: isSubmitting ? 'Submitting...' : 'Submit'
                                }, void 0, false, {
                                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientActionModal.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientActionModal.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientActionModal.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientActionModal.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientActionModal.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c = ClientActionModal;
var _c;
__turbopack_context__.k.register(_c, "ClientActionModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ClientEmailModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconMail$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconMail$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconMail.mjs [app-client] (ecmascript) <export default as IconMail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconUser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconUser$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconUser.mjs [app-client] (ecmascript) <export default as IconUser>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconX.mjs [app-client] (ecmascript) <export default as IconX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$dashboard$2f$contact$2d$messages$2f$components$2f$ContactMessageReplyEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const FIELD_CLASS = 'w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100';
function ClientEmailModal(param) {
    let { isOpen, clientName, clientEmail, subject, message, submitError, isSubmitting, onClose, onSubmit, onSubjectChange, onMessageChange } = param;
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClientEmailModal.useEffect": ()=>{
            if (!isOpen) return undefined;
            const handleKeyDown = {
                "ClientEmailModal.useEffect.handleKeyDown": (event)=>{
                    if (event.key === 'Escape' && !isSubmitting) onClose();
                }
            }["ClientEmailModal.useEffect.handleKeyDown"];
            document.addEventListener('keydown', handleKeyDown);
            return ({
                "ClientEmailModal.useEffect": ()=>document.removeEventListener('keydown', handleKeyDown)
            })["ClientEmailModal.useEffect"];
        }
    }["ClientEmailModal.useEffect"], [
        isOpen,
        isSubmitting,
        onClose
    ]);
    if (!isOpen) return null;
    const messageText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$dashboard$2f$contact$2d$messages$2f$components$2f$ContactMessageReplyEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["richTextToPlainText"])(message);
    const canSubmit = subject.trim().length > 0 && messageText.length > 0 && !isSubmitting;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-[2px]",
        role: "presentation",
        onMouseDown: (event)=>{
            if (event.target === event.currentTarget && !isSubmitting) onClose();
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "client-email-title",
            className: "flex max-h-[calc(100vh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 bg-slate-50 px-5 py-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconMail$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconMail$3e$__["IconMail"], {
                                        size: 20,
                                        "aria-hidden": "true"
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                                        lineNumber: 72,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                                    lineNumber: 71,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            id: "client-email-title",
                                            className: "text-base font-semibold text-slate-900",
                                            children: [
                                                "Email ",
                                                clientName
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                                            lineNumber: 75,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-0.5 text-xs text-slate-500",
                                            children: "Compose a direct message from the Insighta administration team."
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                                            lineNumber: 78,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onClose,
                            disabled: isSubmitting,
                            className: "inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-200 hover:text-slate-800 disabled:opacity-40",
                            "aria-label": "Close email composer",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconX$3e$__["IconX"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4 overflow-y-auto p-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 rounded-lg border border-blue-100 bg-blue-50/70 px-4 py-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconUser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconUser$3e$__["IconUser"], {
                                        size: 18,
                                        "aria-hidden": "true"
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                                        lineNumber: 97,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs font-semibold uppercase tracking-wide text-slate-500",
                                            children: "Recipient"
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                                            lineNumber: 100,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-0.5 truncate text-sm font-semibold text-slate-900",
                                            children: clientName
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                                            lineNumber: 101,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "truncate text-xs text-slate-600",
                                            children: clientEmail
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                                            lineNumber: 102,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                                    lineNumber: 99,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-1.5 flex items-center justify-between gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "client-email-subject",
                                            className: "text-xs font-semibold text-slate-700",
                                            children: "Subject"
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                                            lineNumber: 108,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-slate-400",
                                            children: [
                                                subject.length,
                                                "/255"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                                            lineNumber: 111,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "client-email-subject",
                                    type: "text",
                                    maxLength: 255,
                                    value: subject,
                                    onChange: (event)=>onSubjectChange(event.target.value),
                                    placeholder: "Enter a clear email subject",
                                    className: "".concat(FIELD_CLASS, " h-10"),
                                    disabled: isSubmitting,
                                    autoFocus: true
                                }, void 0, false, {
                                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                                    lineNumber: 113,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                            lineNumber: 106,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-1.5 flex items-center justify-between gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-semibold text-slate-700",
                                            children: "Message"
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                                            lineNumber: 128,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-slate-400",
                                            children: [
                                                messageText.length,
                                                " characters"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                                            lineNumber: 129,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                                    lineNumber: 127,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$dashboard$2f$contact$2d$messages$2f$components$2f$ContactMessageReplyEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    value: message,
                                    onChange: onMessageChange,
                                    placeholder: "Write the message this client will receive...",
                                    disabled: isSubmitting
                                }, void 0, false, {
                                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                                    lineNumber: 131,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1.5 text-[11px] text-slate-500",
                                    children: "The client’s name and Insighta email branding are added automatically."
                                }, void 0, false, {
                                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                                    lineNumber: 137,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                            lineNumber: 126,
                            columnNumber: 11
                        }, this),
                        submitError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            role: "alert",
                            className: "rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700",
                            children: submitError
                        }, void 0, false, {
                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                            lineNumber: 143,
                            columnNumber: 13
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                    lineNumber: 94,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                    className: "flex shrink-0 flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-end",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onClose,
                            disabled: isSubmitting,
                            className: "h-9 rounded-md border border-slate-300 bg-white px-4 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:opacity-50",
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                            lineNumber: 150,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onSubmit,
                            disabled: !canSubmit,
                            className: "inline-flex h-9 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconMail$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconMail$3e$__["IconMail"], {
                                    size: 15,
                                    "aria-hidden": "true"
                                }, void 0, false, {
                                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                                    lineNumber: 164,
                                    columnNumber: 13
                                }, this),
                                isSubmitting ? 'Queuing email...' : 'Send email'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
                    lineNumber: 149,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
            lineNumber: 63,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_s(ClientEmailModal, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = ClientEmailModal;
var _c;
__turbopack_context__.k.register(_c, "ClientEmailModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UsersTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Tooltip$2f$Tooltip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/core/esm/components/Tooltip/Tooltip.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBrandWhatsapp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBrandWhatsapp$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconBrandWhatsapp.mjs [app-client] (ecmascript) <export default as IconBrandWhatsapp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconMail$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconMail$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconMail.mjs [app-client] (ecmascript) <export default as IconMail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authToken.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/toast/ToastContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$dashboard$2f$_config$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/[locale]/dashboard/_config/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$dashboard$2f$contact$2d$messages$2f$components$2f$ContactMessageReplyEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/[locale]/dashboard/contact-messages/components/ContactMessageReplyEditor.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$dashboard$2f$users$2f$clients$2f$components$2f$ClientActionModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/[locale]/dashboard/users/clients/components/ClientActionModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$dashboard$2f$users$2f$clients$2f$components$2f$ClientEmailModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/[locale]/dashboard/users/clients/components/ClientEmailModal.tsx [app-client] (ecmascript)");
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
function SearchIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: "h-4 w-4",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "11",
                cy: "11",
                r: "7"
            }, void 0, false, {
                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "21",
                y1: "21",
                x2: "16.65",
                y2: "16.65"
            }, void 0, false, {
                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c = SearchIcon;
function normalizePhonePart(value) {
    return typeof value === 'string' ? value.replace(/[^\d]/g, '') : '';
}
function buildWhatsappUrl(countryCode, phoneNumber) {
    const normalizedCountryCode = normalizePhonePart(countryCode);
    const normalizedPhoneNumber = normalizePhonePart(phoneNumber);
    const combinedNumber = "".concat(normalizedCountryCode).concat(normalizedPhoneNumber);
    return combinedNumber ? "https://web.whatsapp.com/send?phone=".concat(combinedNumber) : null;
}
function formatWhatsappNumber(countryCode, phoneNumber) {
    const normalizedCountryCode = normalizePhonePart(countryCode);
    const normalizedPhoneNumber = normalizePhonePart(phoneNumber);
    if (!normalizedCountryCode && !normalizedPhoneNumber) {
        return null;
    }
    if (normalizedCountryCode && normalizedPhoneNumber) {
        return "+".concat(normalizedCountryCode, " ").concat(normalizedPhoneNumber);
    }
    if (normalizedCountryCode) {
        return "+".concat(normalizedCountryCode);
    }
    return normalizedPhoneNumber;
}
const INPUT_CLASS = 'h-8 w-full rounded-md shadow-sm border border-slate-200 bg-white pl-9 pr-3 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400 focus:border-[1px]';
const PRIMARY_BUTTON_CLASS = 'h-8 rounded-md border  border-blue-600 bg-blue-600 px-4 text-xs font-medium text-white shadow-sm shadow-gray-300 hover:bg-blue-700';
const SECONDARY_BUTTON_CLASS = 'h-8 rounded-md border shadow-sm border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50';
const ROW_ACTION_BUTTON_CLASS = 'rounded-md border shadow-sm bg-white px-2 py-1 text-[10px] font-medium shadow-sm';
function clampNumber(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
function DonutChart(param) {
    let { size = 44, strokeWidth = 7, slices, centerLabel } = param;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const total = slices.reduce((sum, slice)=>sum + slice.value, 0);
    let offset = 0;
    const normalizedSlices = total > 0 ? slices.filter((slice)=>slice.value > 0) : [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 ".concat(size, " ").concat(size),
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: size / 2,
                cy: size / 2,
                r: radius,
                fill: "none",
                stroke: "#e2e8f0",
                strokeWidth: strokeWidth
            }, void 0, false, {
                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            normalizedSlices.map((slice)=>{
                const fraction = slice.value / total;
                const dash = circumference * fraction;
                const dashArray = "".concat(dash, " ").concat(circumference - dash);
                const dashOffset = circumference * offset;
                offset += fraction;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: size / 2,
                    cy: size / 2,
                    r: radius,
                    fill: "none",
                    stroke: slice.color,
                    strokeWidth: strokeWidth,
                    strokeDasharray: dashArray,
                    strokeDashoffset: -dashOffset,
                    strokeLinecap: "butt",
                    transform: "rotate(-90 ".concat(size / 2, " ").concat(size / 2, ")")
                }, slice.label, false, {
                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                    lineNumber: 129,
                    columnNumber: 11
                }, this);
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: "50%",
                y: "50%",
                dominantBaseline: "middle",
                textAnchor: "middle",
                fill: "#0f172a",
                fontSize: 12,
                fontWeight: 700,
                children: centerLabel
            }, void 0, false, {
                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
        lineNumber: 112,
        columnNumber: 5
    }, this);
}
_c1 = DonutChart;
function CountryBars(param) {
    let { entries } = param;
    const maxCount = entries.reduce((max, entry)=>Math.max(max, entry.count), 0);
    if (!entries.length) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs text-slate-500",
            children: "No country data yet."
        }, void 0, false, {
            fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
            lineNumber: 162,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-2",
        children: entries.map((entry)=>{
            const pct = maxCount > 0 ? clampNumber(entry.count / maxCount * 100, 0, 100) : 0;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "truncate text-xs font-semibold text-slate-800",
                                children: entry.country
                            }, void 0, false, {
                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                lineNumber: 172,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[11px] font-semibold text-slate-600",
                                children: entry.count
                            }, void 0, false, {
                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                lineNumber: 173,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                        lineNumber: 171,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-2 w-full overflow-hidden rounded-full bg-slate-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full rounded-full bg-blue-600",
                            style: {
                                width: "".concat(pct, "%")
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                            lineNumber: 176,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                        lineNumber: 175,
                        columnNumber: 13
                    }, this)
                ]
            }, entry.country, true, {
                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                lineNumber: 170,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
        lineNumber: 166,
        columnNumber: 5
    }, this);
}
_c2 = CountryBars;
function normalizeClients(payload) {
    if (!payload || typeof payload !== 'object') {
        return [];
    }
    const data = payload.data;
    if (!Array.isArray(data)) {
        return [];
    }
    return data.map((entry)=>{
        const row = entry;
        const numericId = Number(row.id);
        if (!Number.isFinite(numericId) || numericId <= 0) {
            return null;
        }
        return {
            id: numericId,
            name: typeof row.name === 'string' && row.name.trim() ? row.name : 'Unknown',
            email: typeof row.email === 'string' && row.email.trim() ? row.email : '-',
            whatsappCountryCode: typeof row.whatsapp_country_code === 'string' && row.whatsapp_country_code.trim() ? row.whatsapp_country_code : null,
            whatsappNumber: typeof row.whatsapp_number === 'string' && row.whatsapp_number.trim() ? row.whatsapp_number : null,
            country: typeof row.country === 'string' && row.country.trim() ? row.country : null,
            status: typeof row.status === 'string' && row.status.trim() ? row.status : 'unknown',
            verified: Boolean(row.verified)
        };
    }).filter((client)=>client !== null);
}
function getStatusBadgeClass(status) {
    const normalized = status.toLowerCase();
    if (normalized === 'active') {
        return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-300';
    }
    if (normalized === 'inactive') {
        return 'bg-red-50 text-red-700 ring-1 ring-red-300';
    }
    return 'bg-slate-100 text-slate-700 ring-1 ring-slate-300';
}
function UsersTab() {
    var _emailModalState_client, _emailModalState_client1;
    _s();
    const { handleServerErrors, success } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [clients, setClients] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [searchInput, setSearchInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [modalState, setModalState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        isOpen: false,
        action: 'deactivate',
        client: null
    });
    const [staffNotes, setStaffNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [submitError, setSubmitError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [emailModalState, setEmailModalState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        isOpen: false,
        client: null
    });
    const [emailSubject, setEmailSubject] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [emailMessage, setEmailMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [emailSubmitError, setEmailSubmitError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isEmailSubmitting, setIsEmailSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fetchClients = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "UsersTab.useCallback[fetchClients]": async (signal)=>{
            setIsLoading(true);
            setError('');
            try {
                const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
                if (!token) {
                    setClients([]);
                    setError('Missing auth token. Please sign in again.');
                    return;
                }
                const response = await fetch("".concat(("TURBOPACK compile-time value", "https://api.foresighta.co"), "/api/admin/account/client/list"), {
                    method: 'GET',
                    cache: 'no-store',
                    signal,
                    headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$dashboard$2f$_config$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildAuthHeaders"])(token)
                });
                if (!response.ok) {
                    throw await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$dashboard$2f$_config$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseApiError"])(response);
                }
                const payload = await response.json();
                setClients(normalizeClients(payload));
            } catch (requestError) {
                if (requestError instanceof DOMException && requestError.name === 'AbortError') {
                    return;
                }
                handleServerErrors(requestError);
                var _message;
                const message = requestError && typeof requestError === 'object' && 'message' in requestError ? String((_message = requestError.message) !== null && _message !== void 0 ? _message : 'Unable to load clients right now.') : requestError instanceof Error ? requestError.message : 'Unable to load clients right now.';
                setError(message);
                setClients([]);
            } finally{
                setIsLoading(false);
            }
        }
    }["UsersTab.useCallback[fetchClients]"], [
        handleServerErrors
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UsersTab.useEffect": ()=>{
            const controller = new AbortController();
            void fetchClients(controller.signal);
            return ({
                "UsersTab.useEffect": ()=>controller.abort()
            })["UsersTab.useEffect"];
        }
    }["UsersTab.useEffect"], [
        fetchClients
    ]);
    const filteredClients = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "UsersTab.useMemo[filteredClients]": ()=>{
            const normalizedQuery = searchInput.trim().toLowerCase();
            if (!normalizedQuery) {
                return clients;
            }
            return clients.filter({
                "UsersTab.useMemo[filteredClients]": (client)=>{
                    var _client_whatsappCountryCode, _client_whatsappNumber, _client_country;
                    const combined = "".concat(client.name, " ").concat(client.email, " ").concat((_client_whatsappCountryCode = client.whatsappCountryCode) !== null && _client_whatsappCountryCode !== void 0 ? _client_whatsappCountryCode : '', " ").concat((_client_whatsappNumber = client.whatsappNumber) !== null && _client_whatsappNumber !== void 0 ? _client_whatsappNumber : '', " ").concat((_client_country = client.country) !== null && _client_country !== void 0 ? _client_country : '').toLowerCase();
                    return combined.includes(normalizedQuery);
                }
            }["UsersTab.useMemo[filteredClients]"]);
        }
    }["UsersTab.useMemo[filteredClients]"], [
        clients,
        searchInput
    ]);
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "UsersTab.useMemo[stats]": ()=>{
            const total = clients.length;
            let activeCount = 0;
            let inactiveCount = 0;
            let otherStatusCount = 0;
            let verifiedCount = 0;
            let notVerifiedCount = 0;
            const countryCounts = new Map();
            for (const client of clients){
                const status = client.status.toLowerCase();
                if (status === 'active') activeCount += 1;
                else if (status === 'inactive') inactiveCount += 1;
                else otherStatusCount += 1;
                if (client.verified) verifiedCount += 1;
                else notVerifiedCount += 1;
                var _client_country;
                const country = ((_client_country = client.country) !== null && _client_country !== void 0 ? _client_country : '').trim();
                if (country) {
                    var _countryCounts_get;
                    countryCounts.set(country, ((_countryCounts_get = countryCounts.get(country)) !== null && _countryCounts_get !== void 0 ? _countryCounts_get : 0) + 1);
                }
            }
            const topCountries = Array.from(countryCounts.entries()).sort({
                "UsersTab.useMemo[stats].topCountries": (a, b)=>b[1] - a[1]
            }["UsersTab.useMemo[stats].topCountries"]).slice(0, 4).map({
                "UsersTab.useMemo[stats].topCountries": (param)=>{
                    let [country, count] = param;
                    return {
                        country,
                        count
                    };
                }
            }["UsersTab.useMemo[stats].topCountries"]);
            const activePct = total > 0 ? Math.round(activeCount / total * 100) : 0;
            const verifiedPct = total > 0 ? Math.round(verifiedCount / total * 100) : 0;
            return {
                total,
                activeCount,
                inactiveCount,
                otherStatusCount,
                verifiedCount,
                notVerifiedCount,
                activePct,
                verifiedPct,
                topCountries
            };
        }
    }["UsersTab.useMemo[stats]"], [
        clients
    ]);
    const openActionModal = (client, action)=>{
        setModalState({
            isOpen: true,
            action,
            client
        });
        setStaffNotes('');
        setSubmitError('');
    };
    const openEmailModal = (client)=>{
        setEmailModalState({
            isOpen: true,
            client
        });
        setEmailSubject('');
        setEmailMessage('');
        setEmailSubmitError('');
        setIsEmailSubmitting(false);
    };
    const resetEmailComposer = ()=>{
        setEmailModalState({
            isOpen: false,
            client: null
        });
        setEmailSubject('');
        setEmailMessage('');
        setEmailSubmitError('');
        setIsEmailSubmitting(false);
    };
    const closeEmailModal = ()=>{
        if (isEmailSubmitting) return;
        resetEmailComposer();
    };
    const submitEmail = async ()=>{
        const client = emailModalState.client;
        const trimmedSubject = emailSubject.trim();
        const trimmedMessage = emailMessage.trim();
        if (!client) {
            setEmailSubmitError('Select a client before sending.');
            return;
        }
        if (!trimmedSubject || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$dashboard$2f$contact$2d$messages$2f$components$2f$ContactMessageReplyEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["richTextToPlainText"])(trimmedMessage)) {
            setEmailSubmitError('Subject and message are required.');
            return;
        }
        setEmailSubmitError('');
        setIsEmailSubmitting(true);
        try {
            const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
            if (!token) {
                setEmailSubmitError('Missing auth token. Please sign in again.');
                setIsEmailSubmitting(false);
                return;
            }
            const response = await fetch("".concat(("TURBOPACK compile-time value", "https://api.foresighta.co"), "/api/admin/account/client/send-email"), {
                method: 'POST',
                headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$dashboard$2f$_config$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildAuthHeaders"])(token),
                body: JSON.stringify({
                    user_id: client.id,
                    subject: trimmedSubject,
                    message: trimmedMessage
                })
            });
            if (!response.ok) {
                throw await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$dashboard$2f$_config$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseApiError"])(response);
            }
            resetEmailComposer();
            success("Email queued for ".concat(client.name, "."), '', 6000);
        } catch (requestError) {
            handleServerErrors(requestError);
            var _message;
            const message = requestError && typeof requestError === 'object' && 'message' in requestError ? String((_message = requestError.message) !== null && _message !== void 0 ? _message : 'Unable to queue the email right now.') : requestError instanceof Error ? requestError.message : 'Unable to queue the email right now.';
            setEmailSubmitError(message);
            setIsEmailSubmitting(false);
        }
    };
    const closeActionModal = ()=>{
        setModalState({
            isOpen: false,
            action: 'deactivate',
            client: null
        });
        setStaffNotes('');
        setSubmitError('');
        setIsSubmitting(false);
    };
    const submitAction = async ()=>{
        if (!modalState.client) {
            return;
        }
        const trimmedNotes = staffNotes.trim();
        if (!trimmedNotes) {
            setSubmitError('Staff notes are required.');
            return;
        }
        setSubmitError('');
        setIsSubmitting(true);
        try {
            const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
            if (!token) {
                setSubmitError('Missing auth token. Please sign in again.');
                setIsSubmitting(false);
                return;
            }
            const response = await fetch("".concat(("TURBOPACK compile-time value", "https://api.foresighta.co"), "/api/admin/account/client/deactivate-delete/").concat(modalState.client.id), {
                method: 'POST',
                headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$dashboard$2f$_config$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildAuthHeaders"])(token),
                body: JSON.stringify({
                    staff_notes: trimmedNotes
                })
            });
            if (!response.ok) {
                throw await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$dashboard$2f$_config$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseApiError"])(response);
            }
            const actionLabel = modalState.action === 'deactivate' ? 'Deactivate' : 'Delete';
            const currentClientName = modalState.client.name;
            closeActionModal();
            success("".concat(currentClientName, " Was ").concat(actionLabel, " successfully."), '', 6000);
            await fetchClients();
        } catch (requestError) {
            handleServerErrors(requestError);
            var _message;
            const message = requestError && typeof requestError === 'object' && 'message' in requestError ? String((_message = requestError.message) !== null && _message !== void 0 ? _message : 'Unable to submit action right now.') : requestError instanceof Error ? requestError.message : 'Unable to submit action right now.';
            setSubmitError(message);
            setIsSubmitting(false);
        }
    };
    var _emailModalState_client_name, _emailModalState_client_email;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col ",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-lg font-semibold text-slate-900",
                    children: "Clients list"
                }, void 0, false, {
                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                    lineNumber: 531,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                lineNumber: 530,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 grid grid-cols-1 gap-3 lg:grid-cols-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-md border border-slate-200 bg-white p-4 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[11px] font-semibold uppercase tracking-wide text-slate-500",
                                children: "Total"
                            }, void 0, false, {
                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                lineNumber: 535,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex items-end gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-3xl font-semibold text-slate-900",
                                        children: stats.total
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                        lineNumber: 537,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pb-1 text-xs text-slate-500",
                                        children: "Clients"
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                        lineNumber: 538,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                lineNumber: 536,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 text-xs text-slate-600",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-slate-800",
                                        children: filteredClients.length
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                        lineNumber: 541,
                                        columnNumber: 13
                                    }, this),
                                    " shown (search)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                lineNumber: 540,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 flex h-2 w-full overflow-hidden rounded-full bg-slate-100",
                                children: (()=>{
                                    const base = stats.total || 1;
                                    const activePct = Math.round(stats.activeCount / base * 100);
                                    const inactivePct = Math.round(stats.inactiveCount / base * 100);
                                    const otherPct = clampNumber(100 - activePct - inactivePct, 0, 100);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-full bg-emerald-500",
                                                style: {
                                                    width: "".concat(clampNumber(activePct, 0, 100), "%")
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                lineNumber: 551,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-full bg-red-500",
                                                style: {
                                                    width: "".concat(clampNumber(inactivePct, 0, 100), "%")
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                lineNumber: 552,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-full bg-slate-400",
                                                style: {
                                                    width: "".concat(otherPct, "%")
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                lineNumber: 553,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true);
                                })()
                            }, void 0, false, {
                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                lineNumber: 543,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                        lineNumber: 534,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-md border border-slate-200 bg-white p-4 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[11px] font-semibold uppercase tracking-wide text-slate-500",
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                lineNumber: 563,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-1 text-xs text-slate-600",
                                                children: "Active vs inactive"
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                lineNumber: 564,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                        lineNumber: 562,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DonutChart, {
                                        slices: [
                                            {
                                                label: 'Active',
                                                value: stats.activeCount,
                                                color: '#16a34a'
                                            },
                                            {
                                                label: 'Inactive',
                                                value: stats.inactiveCount,
                                                color: '#ef4444'
                                            },
                                            {
                                                label: 'Other',
                                                value: stats.otherStatusCount,
                                                color: '#94a3b8'
                                            }
                                        ],
                                        centerLabel: "".concat(stats.activePct, "%")
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                        lineNumber: 566,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                lineNumber: 561,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 grid grid-row-3 gap-2 text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-md bg-emerald-50 px-2 py-1 text-emerald-700 ring-1 ring-emerald-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[10px] uppercase tracking-wide",
                                                children: "Active"
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                lineNumber: 577,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold",
                                                children: stats.activeCount
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                lineNumber: 578,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                        lineNumber: 576,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-md bg-red-50 px-2 py-1 text-red-700 ring-1 ring-red-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[10px] uppercase tracking-wide",
                                                children: "Inactive"
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                lineNumber: 581,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold",
                                                children: stats.inactiveCount
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                lineNumber: 582,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                        lineNumber: 580,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-md bg-slate-100 px-2 py-1 text-slate-700 ring-1 ring-slate-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[10px] uppercase tracking-wide",
                                                children: "Other"
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                lineNumber: 585,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold",
                                                children: stats.otherStatusCount
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                lineNumber: 586,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                        lineNumber: 584,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                lineNumber: 575,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                        lineNumber: 560,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-md border border-slate-200 bg-white p-4 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[11px] font-semibold uppercase tracking-wide text-slate-500",
                                                children: "Verification"
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                lineNumber: 594,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-1 text-xs text-slate-600",
                                                children: "Verified vs not verified"
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                lineNumber: 595,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                        lineNumber: 593,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DonutChart, {
                                        slices: [
                                            {
                                                label: 'Verified',
                                                value: stats.verifiedCount,
                                                color: '#2563eb'
                                            },
                                            {
                                                label: 'Not verified',
                                                value: stats.notVerifiedCount,
                                                color: '#94a3b8'
                                            }
                                        ],
                                        centerLabel: "".concat(stats.verifiedPct, "%")
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                        lineNumber: 597,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                lineNumber: 592,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 grid grid-row-2 gap-2 text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-md bg-blue-50 px-2 py-1 text-blue-700 ring-1 ring-blue-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[10px] uppercase tracking-wide",
                                                children: "Verified"
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                lineNumber: 607,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold",
                                                children: stats.verifiedCount
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                lineNumber: 608,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                        lineNumber: 606,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-md bg-slate-100 px-2 py-1 text-slate-700 ring-1 ring-slate-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[10px] uppercase tracking-wide",
                                                children: "Not verified"
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                lineNumber: 611,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold",
                                                children: stats.notVerifiedCount
                                            }, void 0, false, {
                                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                lineNumber: 612,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                        lineNumber: 610,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                lineNumber: 605,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                        lineNumber: 591,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-md border border-slate-200 bg-white p-4 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[11px] font-semibold uppercase tracking-wide text-slate-500",
                                children: "Top countries"
                            }, void 0, false, {
                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                lineNumber: 618,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 text-xs text-slate-600",
                                children: "Most common client locations"
                            }, void 0, false, {
                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                lineNumber: 619,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CountryBars, {
                                    entries: stats.topCountries
                                }, void 0, false, {
                                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                    lineNumber: 621,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                lineNumber: 620,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                        lineNumber: 617,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                lineNumber: 533,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-2 mt-8 sm:flex-row sm:items-center sm:justify-end sm:flex-1 sm:pl-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex-1 sm:max-w-[520px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SearchIcon, {}, void 0, false, {
                                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                    lineNumber: 631,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                lineNumber: 630,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: searchInput,
                                onChange: (event)=>setSearchInput(event.target.value),
                                placeholder: "Search clients...",
                                className: INPUT_CLASS
                            }, void 0, false, {
                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                lineNumber: 633,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                        lineNumber: 629,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                    lineNumber: 628,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                lineNumber: 625,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 overflow-hidden rounded-md border border-slate-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-x-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "min-w-full text-left text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                className: "bg-slate-50 text-slate-500",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-2 font-semibold",
                                            children: "Name"
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                            lineNumber: 650,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-2 font-semibold",
                                            children: "Contact"
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                            lineNumber: 651,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-2 font-semibold",
                                            children: "Country"
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                            lineNumber: 652,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-2 font-semibold",
                                            children: "Status"
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                            lineNumber: 653,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-2 font-semibold",
                                            children: "Verified"
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                            lineNumber: 654,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-2 font-semibold",
                                            children: "Actions"
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                            lineNumber: 655,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                    lineNumber: 649,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                lineNumber: 648,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                className: "divide-y divide-slate-100 bg-white",
                                children: [
                                    isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            colSpan: 6,
                                            className: "px-3 py-6 text-center text-xs text-slate-500",
                                            children: "Loading clients..."
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                            lineNumber: 661,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                        lineNumber: 660,
                                        columnNumber: 17
                                    }, this) : null,
                                    !isLoading && error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            colSpan: 6,
                                            className: "px-3 py-6 text-center text-xs text-red-600",
                                            children: error
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                            lineNumber: 669,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                        lineNumber: 668,
                                        columnNumber: 17
                                    }, this) : null,
                                    !isLoading && !error && filteredClients.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            colSpan: 6,
                                            className: "px-3 py-6 text-center text-xs text-slate-500",
                                            children: "No clients found."
                                        }, void 0, false, {
                                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                            lineNumber: 677,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                        lineNumber: 676,
                                        columnNumber: 17
                                    }, this) : null,
                                    !isLoading && !error && filteredClients.map((client)=>{
                                        const whatsappUrl = buildWhatsappUrl(client.whatsappCountryCode, client.whatsappNumber);
                                        const whatsappTooltip = formatWhatsappNumber(client.whatsappCountryCode, client.whatsappNumber);
                                        var _client_country;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "text-slate-700",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-3 py-2 font-semibold",
                                                    children: client.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                    lineNumber: 697,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-3 py-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap items-center gap-2",
                                                        children: [
                                                            client.email !== '-' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: "mailto:".concat(client.email),
                                                                className: "break-all text-blue-600 underline-offset-2 hover:underline",
                                                                children: client.email
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                                lineNumber: 701,
                                                                columnNumber: 29
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-slate-400",
                                                                children: "-"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                                lineNumber: 708,
                                                                columnNumber: 29
                                                            }, this),
                                                            whatsappUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$core$2f$esm$2f$components$2f$Tooltip$2f$Tooltip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                label: whatsappTooltip ? "WhatsApp: ".concat(whatsappTooltip) : 'Open WhatsApp',
                                                                withArrow: true,
                                                                position: "top",
                                                                openDelay: 100,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                    href: whatsappUrl,
                                                                    target: "_blank",
                                                                    rel: "noreferrer",
                                                                    className: "inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200 transition hover:bg-emerald-100",
                                                                    "aria-label": "Open WhatsApp chat with ".concat(client.name),
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBrandWhatsapp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBrandWhatsapp$3e$__["IconBrandWhatsapp"], {
                                                                        size: 15
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                                        lineNumber: 724,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                                    lineNumber: 717,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                                lineNumber: 711,
                                                                columnNumber: 29
                                                            }, this) : null
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                        lineNumber: 699,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                    lineNumber: 698,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-3 py-2",
                                                    children: (_client_country = client.country) !== null && _client_country !== void 0 ? _client_country : '-'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                    lineNumber: 730,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-3 py-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold capitalize ".concat(getStatusBadgeClass(client.status)),
                                                        children: client.status
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                        lineNumber: 732,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                    lineNumber: 731,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-3 py-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold ".concat(client.verified ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-300' : 'bg-slate-100 text-slate-700 ring-1 ring-slate-300'),
                                                        children: client.verified ? 'Yes' : 'No'
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                        lineNumber: 741,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                    lineNumber: 740,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-3 py-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>openEmailModal(client),
                                                                disabled: client.email === '-',
                                                                className: "".concat(ROW_ACTION_BUTTON_CLASS, " inline-flex items-center gap-1 border-blue-300 text-blue-700 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"),
                                                                title: client.email === '-' ? 'This client has no email address' : undefined,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconMail$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconMail$3e$__["IconMail"], {
                                                                        size: 12,
                                                                        "aria-hidden": "true"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                                        lineNumber: 759,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    "Email"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                                lineNumber: 752,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>openActionModal(client, 'delete'),
                                                                className: "".concat(ROW_ACTION_BUTTON_CLASS, " border-red-300 text-red-700 hover:bg-red-50"),
                                                                children: "Delete"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                                lineNumber: 762,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                        lineNumber: 751,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                                    lineNumber: 750,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, client.id, true, {
                                            fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                            lineNumber: 696,
                                            columnNumber: 21
                                        }, this);
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                                lineNumber: 658,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                        lineNumber: 647,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                    lineNumber: 646,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                lineNumber: 645,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$dashboard$2f$users$2f$clients$2f$components$2f$ClientActionModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: modalState.isOpen,
                action: modalState.action,
                client: modalState.client,
                staffNotes: staffNotes,
                submitError: submitError,
                isSubmitting: isSubmitting,
                onClose: closeActionModal,
                onSubmit: submitAction,
                onStaffNotesChange: setStaffNotes
            }, void 0, false, {
                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                lineNumber: 779,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f5b$locale$5d2f$dashboard$2f$users$2f$clients$2f$components$2f$ClientEmailModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: emailModalState.isOpen,
                clientName: (_emailModalState_client_name = (_emailModalState_client = emailModalState.client) === null || _emailModalState_client === void 0 ? void 0 : _emailModalState_client.name) !== null && _emailModalState_client_name !== void 0 ? _emailModalState_client_name : '',
                clientEmail: (_emailModalState_client_email = (_emailModalState_client1 = emailModalState.client) === null || _emailModalState_client1 === void 0 ? void 0 : _emailModalState_client1.email) !== null && _emailModalState_client_email !== void 0 ? _emailModalState_client_email : '',
                subject: emailSubject,
                message: emailMessage,
                submitError: emailSubmitError,
                isSubmitting: isEmailSubmitting,
                onClose: closeEmailModal,
                onSubmit: submitEmail,
                onSubjectChange: setEmailSubject,
                onMessageChange: setEmailMessage
            }, void 0, false, {
                fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
                lineNumber: 790,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/[locale]/dashboard/users/clients/components/UsersTab.tsx",
        lineNumber: 529,
        columnNumber: 5
    }, this);
}
_s(UsersTab, "IelXe9SX2TWNq6x9y3iKf+Iaidc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$toast$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c3 = UsersTab;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "SearchIcon");
__turbopack_context__.k.register(_c1, "DonutChart");
__turbopack_context__.k.register(_c2, "CountryBars");
__turbopack_context__.k.register(_c3, "UsersTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_%5Blocale%5D_dashboard_c6b3cc03._.js.map