(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/icons/TextEditIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TextEditIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function TextEditIcon(param) {
    let { size = 24, className } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        className: className,
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M13.8787 3.70711C15.0503 2.53554 16.9497 2.53553 18.1213 3.70711L20.2929 5.87868C21.4645 7.05026 21.4645 8.94975 20.2929 10.1213L11.4142 19H21C21.5523 19 22 19.4477 22 20C22 20.5523 21.5523 21 21 21H4C3.44772 21 3 20.5523 3 20V15C3 14.7348 3.10536 14.4804 3.29289 14.2929L13.8787 3.70711ZM8.58579 19L16.5858 11L13 7.41421L5 15.4142V19H8.58579ZM14.4142 6L18 9.58579L18.8787 8.70711C19.2692 8.31658 19.2692 7.68342 18.8787 7.2929L16.7071 5.12132C16.3166 4.7308 15.6834 4.7308 15.2929 5.12132L14.4142 6Z",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/components/icons/TextEditIcon.tsx",
            lineNumber: 18,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/icons/TextEditIcon.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = TextEditIcon;
var _c;
__turbopack_context__.k.register(_c, "TextEditIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/feed/post/EmojiPicker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EmojiPicker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconMoodSmile$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconMoodSmile$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconMoodSmile.mjs [app-client] (ecmascript) <export default as IconMoodSmile>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const PANEL_WIDTH = 276;
const EMOJI_GROUPS = [
    {
        key: 'smileys',
        tab: '😀',
        emojis: [
            '😀',
            '😃',
            '😄',
            '😁',
            '😊',
            '🙂',
            '😉',
            '😍',
            '🥰',
            '😘',
            '😎',
            '🤩',
            '🥳',
            '🤗',
            '🤔',
            '🤨',
            '😐',
            '😑',
            '🙄',
            '😏',
            '😌',
            '😔',
            '😢',
            '😭',
            '😤',
            '😠',
            '😳',
            '🥺',
            '😬',
            '😴',
            '🤯',
            '🙃'
        ]
    },
    {
        key: 'gestures',
        tab: '👍',
        emojis: [
            '👍',
            '👎',
            '👌',
            '✌️',
            '🤞',
            '🙏',
            '👏',
            '🙌',
            '💪',
            '👊',
            '✊',
            '🤙',
            '👋',
            '🫡',
            '🫶',
            '☝️',
            '👉',
            '👈',
            '👆',
            '👇',
            '✍️',
            '🤲',
            '🖐️',
            '🤝'
        ]
    },
    {
        key: 'business',
        tab: '💼',
        emojis: [
            '💼',
            '📈',
            '📉',
            '📊',
            '💰',
            '💵',
            '💳',
            '🏦',
            '🏢',
            '📅',
            '📌',
            '📎',
            '🗂️',
            '📁',
            '📄',
            '📝',
            '✏️',
            '🖊️',
            '📚',
            '📖',
            '🔍',
            '🔎',
            '💡',
            '⚙️',
            '🛠️',
            '🧠',
            '🎯',
            '🚀',
            '⏰',
            '⌛',
            '🔔',
            '🏆'
        ]
    },
    {
        key: 'symbols',
        tab: '✅',
        emojis: [
            '✅',
            '☑️',
            '❌',
            '❗',
            '❓',
            '⚠️',
            '🔥',
            '⭐',
            '🌟',
            '✨',
            '💯',
            '♻️',
            '🔗',
            '➡️',
            '⬅️',
            '⬆️',
            '⬇️',
            '🔴',
            '🟢',
            '🔵',
            '🟡',
            '⚫',
            '⚪',
            '🟣'
        ]
    },
    {
        key: 'world',
        tab: '🌍',
        emojis: [
            '🌍',
            '🌎',
            '🌏',
            '🗺️',
            '🏭',
            '🏗️',
            '🚗',
            '✈️',
            '🚢',
            '🛰️',
            '📡',
            '💻',
            '🖥️',
            '📱',
            '⌨️',
            '🔋',
            '💾',
            '☁️',
            '🌐',
            '🎉',
            '🎊',
            '🎁',
            '☕',
            '🌱'
        ]
    }
];
function EmojiPicker(param) {
    let { onSelect, label } = param;
    _s();
    const [opened, setOpened] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [group, setGroup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(EMOJI_GROUPS[0].key);
    const [position, setPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const triggerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const panelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    var _EMOJI_GROUPS_find;
    const activeGroup = (_EMOJI_GROUPS_find = EMOJI_GROUPS.find((entry)=>entry.key === group)) !== null && _EMOJI_GROUPS_find !== void 0 ? _EMOJI_GROUPS_find : EMOJI_GROUPS[0];
    const place = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EmojiPicker.useCallback[place]": ()=>{
            const trigger = triggerRef.current;
            if (!trigger) return;
            const rect = trigger.getBoundingClientRect();
            const isRtl = getComputedStyle(document.documentElement).direction === 'rtl';
            // Anchor the panel's inline-start edge to the trigger, then keep it on screen.
            const preferred = isRtl ? rect.right - PANEL_WIDTH : rect.left;
            const left = Math.min(Math.max(8, preferred), window.innerWidth - PANEL_WIDTH - 8);
            setPosition({
                top: rect.bottom + 6,
                left
            });
        }
    }["EmojiPicker.useCallback[place]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "EmojiPicker.useLayoutEffect": ()=>{
            if (!opened) return;
            place();
            window.addEventListener('resize', place);
            window.addEventListener('scroll', place, true);
            return ({
                "EmojiPicker.useLayoutEffect": ()=>{
                    window.removeEventListener('resize', place);
                    window.removeEventListener('scroll', place, true);
                }
            })["EmojiPicker.useLayoutEffect"];
        }
    }["EmojiPicker.useLayoutEffect"], [
        opened,
        place
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EmojiPicker.useEffect": ()=>{
            if (!opened) return;
            const onPointerDown = {
                "EmojiPicker.useEffect.onPointerDown": (event)=>{
                    var _panelRef_current, _triggerRef_current;
                    const target = event.target;
                    if (((_panelRef_current = panelRef.current) === null || _panelRef_current === void 0 ? void 0 : _panelRef_current.contains(target)) || ((_triggerRef_current = triggerRef.current) === null || _triggerRef_current === void 0 ? void 0 : _triggerRef_current.contains(target))) return;
                    setOpened(false);
                }
            }["EmojiPicker.useEffect.onPointerDown"];
            const onKeyDown = {
                "EmojiPicker.useEffect.onKeyDown": (event)=>{
                    if (event.key === 'Escape') setOpened(false);
                }
            }["EmojiPicker.useEffect.onKeyDown"];
            document.addEventListener('mousedown', onPointerDown);
            document.addEventListener('keydown', onKeyDown);
            return ({
                "EmojiPicker.useEffect": ()=>{
                    document.removeEventListener('mousedown', onPointerDown);
                    document.removeEventListener('keydown', onKeyDown);
                }
            })["EmojiPicker.useEffect"];
        }
    }["EmojiPicker.useEffect"], [
        opened
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                ref: triggerRef,
                type: "button",
                onClick: ()=>setOpened((current)=>!current),
                "aria-label": label,
                "aria-expanded": opened,
                className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] ".concat(opened ? 'bg-[#EDF3FC] text-[#1D74E0]' : 'text-[#5A6B84] hover:bg-[#F3F6FB]'),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconMoodSmile$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconMoodSmile$3e$__["IconMoodSmile"], {
                    "aria-hidden": true,
                    stroke: 1.7,
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/components/feed/post/EmojiPicker.tsx",
                    lineNumber: 127,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/feed/post/EmojiPicker.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            opened && position && typeof document !== 'undefined' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: panelRef,
                role: "dialog",
                "aria-label": label,
                style: {
                    top: position.top,
                    left: position.left,
                    width: PANEL_WIDTH
                },
                className: "fixed z-[1000] rounded-lg border border-[#E5EAF2] bg-white p-2 shadow-[0_10px_30px_rgba(15,22,41,0.18)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2 flex items-center gap-1 border-b border-[#EDF1F5] pb-2",
                        children: EMOJI_GROUPS.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setGroup(entry.key),
                                "aria-pressed": entry.key === activeGroup.key,
                                className: "flex h-7 w-7 items-center justify-center rounded-md text-[15px] leading-none transition-colors ".concat(entry.key === activeGroup.key ? 'bg-[#EDF3FC]' : 'hover:bg-[#F3F6FB]'),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "aria-hidden": true,
                                    children: entry.tab
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/EmojiPicker.tsx",
                                    lineNumber: 150,
                                    columnNumber: 21
                                }, this)
                            }, entry.key, false, {
                                fileName: "[project]/components/feed/post/EmojiPicker.tsx",
                                lineNumber: 141,
                                columnNumber: 19
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/feed/post/EmojiPicker.tsx",
                        lineNumber: 139,
                        columnNumber: 15
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid max-h-[180px] grid-cols-8 gap-0.5 overflow-y-auto",
                        children: activeGroup.emojis.map((emoji)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>{
                                    onSelect(emoji);
                                    setOpened(false);
                                },
                                className: "flex h-8 w-8 items-center justify-center rounded-md text-[18px] leading-none transition-colors hover:bg-[#F3F6FB]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "aria-hidden": true,
                                    children: emoji
                                }, void 0, false, {
                                    fileName: "[project]/components/feed/post/EmojiPicker.tsx",
                                    lineNumber: 166,
                                    columnNumber: 21
                                }, this)
                            }, emoji, false, {
                                fileName: "[project]/components/feed/post/EmojiPicker.tsx",
                                lineNumber: 157,
                                columnNumber: 19
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/feed/post/EmojiPicker.tsx",
                        lineNumber: 155,
                        columnNumber: 15
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/feed/post/EmojiPicker.tsx",
                lineNumber: 132,
                columnNumber: 13
            }, this), document.body) : null
        ]
    }, void 0, true);
}
_s(EmojiPicker, "xC5u4UdoXGjEkF/8iAJHHmlG6Ws=");
_c = EmojiPicker;
var _c;
__turbopack_context__.k.register(_c, "EmojiPicker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/[locale]/align-test/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AlignTest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// TEMPORARY debug harness — delete after verifying.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mantine/tiptap/esm/RichTextEditor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$placeholder$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/extension-placeholder/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$text$2d$align$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/extension-text-align/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$starter$2d$kit$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/starter-kit/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/react/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$TextEditIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/icons/TextEditIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$EmojiPicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/feed/post/EmojiPicker.tsx [app-client] (ecmascript)");
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
function AlignTest() {
    _s();
    const [formattingOpen, setFormattingOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEditor"])({
        immediatelyRender: false,
        extensions: [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$starter$2d$kit$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].configure({
                heading: false,
                blockquote: false,
                code: false,
                codeBlock: false,
                horizontalRule: false,
                strike: false
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$text$2d$align$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].configure({
                types: [
                    'paragraph'
                ]
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$placeholder$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].configure({
                placeholder: 'test'
            })
        ],
        content: '<p>السلام عليكم ورحمة الله وبركاته</p>'
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: 24
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"], {
            editor: editor,
            id: "test-editor",
            className: "overflow-hidden rounded-md border bg-white shadow-none border-[#E5EAF2]",
            children: [
                formattingOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].Toolbar, {
                    sticky: false,
                    className: "border-b border-[#E5EAF2] bg-[#F8FAFD] px-1 py-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].ControlsGroup, {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].Bold, {}, void 0, false, {
                                    fileName: "[project]/app/[locale]/align-test/page.tsx",
                                    lineNumber: 31,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].Italic, {}, void 0, false, {
                                    fileName: "[project]/app/[locale]/align-test/page.tsx",
                                    lineNumber: 32,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/[locale]/align-test/page.tsx",
                            lineNumber: 30,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].ControlsGroup, {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].AlignLeft, {}, void 0, false, {
                                    fileName: "[project]/app/[locale]/align-test/page.tsx",
                                    lineNumber: 35,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].AlignCenter, {}, void 0, false, {
                                    fileName: "[project]/app/[locale]/align-test/page.tsx",
                                    lineNumber: 36,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].AlignRight, {}, void 0, false, {
                                    fileName: "[project]/app/[locale]/align-test/page.tsx",
                                    lineNumber: 37,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/[locale]/align-test/page.tsx",
                            lineNumber: 34,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$feed$2f$post$2f$EmojiPicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            label: "Insert emoji",
                            onSelect: (e)=>editor === null || editor === void 0 ? void 0 : editor.chain().focus().insertContent(e).run()
                        }, void 0, false, {
                            fileName: "[project]/app/[locale]/align-test/page.tsx",
                            lineNumber: 39,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/[locale]/align-test/page.tsx",
                    lineNumber: 29,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mantine$2f$tiptap$2f$esm$2f$RichTextEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextEditor"].Content, {
                    id: "test-content",
                    className: "bg-white px-3 py-2.5 text-[15px] [&_.ProseMirror]:min-h-[120px]"
                }, void 0, false, {
                    fileName: "[project]/app/[locale]/align-test/page.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center bg-white px-1.5 pb-1.5",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        id: "fmt-toggle",
                        type: "button",
                        onClick: ()=>setFormattingOpen((c)=>!c),
                        "aria-label": "Formatting options",
                        "aria-expanded": formattingOpen,
                        className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-md ".concat(formattingOpen ? 'bg-[#EDF3FC] text-[#1D74E0]' : 'text-[#5A6B84] hover:bg-[#F3F6FB]'),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$icons$2f$TextEditIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/app/[locale]/align-test/page.tsx",
                            lineNumber: 54,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/[locale]/align-test/page.tsx",
                        lineNumber: 44,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/[locale]/align-test/page.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/[locale]/align-test/page.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/[locale]/align-test/page.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(AlignTest, "ZvJzdi3e8Gdgc187LJWFIma1fJc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEditor"]
    ];
});
_c = AlignTest;
var _c;
__turbopack_context__.k.register(_c, "AlignTest");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_f672cd87._.js.map