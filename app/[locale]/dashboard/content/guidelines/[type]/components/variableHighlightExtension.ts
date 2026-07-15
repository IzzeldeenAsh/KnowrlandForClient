import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

const VARIABLE_RE = /{{\s*[A-Za-z0-9_]+\s*}}/g;

const CHIP_STYLE =
  'background:#eff6ff;border:1px solid #bfdbfe;border-radius:4px;color:#1d4ed8;' +
  'padding:0 4px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:0.9em;';

/**
 * Renders {{variable}} tokens as inline blue chips inside the editor using
 * ProseMirror decorations. This is view-only styling — the underlying text stays
 * exactly "{{variable}}", so editor.getHTML() remains backend-compatible.
 */
export const VariableHighlight = Extension.create({
  name: 'variableHighlight',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('variableHighlight'),
        props: {
          decorations(state) {
            const decorations: Decoration[] = [];

            state.doc.descendants((node, pos) => {
              if (!node.isText || !node.text) return;

              const text = node.text;
              VARIABLE_RE.lastIndex = 0;
              let match: RegExpExecArray | null;

              while ((match = VARIABLE_RE.exec(text)) !== null) {
                const start = pos + match.index;
                const end = start + match[0].length;
                decorations.push(Decoration.inline(start, end, { style: CHIP_STYLE }));
              }
            });

            return DecorationSet.create(state.doc, decorations);
          },
        },
      }),
    ];
  },
});
