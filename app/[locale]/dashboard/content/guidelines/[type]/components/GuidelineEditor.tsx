'use client';

import { useEffect } from 'react';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import { useEditor } from '@tiptap/react';
import { RichTextEditor } from '@mantine/tiptap';
import { VariableHighlight } from './variableHighlightExtension';

type GuidelineEditorProps = {
  value: string;
  onChange: (value: string) => void;
  variables?: string[];
  placeholder?: string;
  dir?: 'ltr' | 'rtl';
};

export default function GuidelineEditor({
  value,
  onChange,
  variables = [],
  placeholder = 'Write the guideline content…',
  dir = 'ltr',
}: GuidelineEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        autolink: true,
        openOnClick: false,
        defaultProtocol: 'https',
      }),
      Placeholder.configure({
        placeholder,
      }),
      VariableHighlight,
    ],
    content: value || '',
    editorProps: {
      attributes: {
        dir,
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    const nextValue = value || '';
    if (editor.getHTML() !== nextValue) {
      editor.commands.setContent(nextValue, { emitUpdate: false });
    }
  }, [editor, value]);

  const insertVariable = (variable: string) => {
    if (!editor) return;
    editor.chain().focus().insertContent(`{{${variable}}}`).run();
  };

  return (
    <div>
      <RichTextEditor
        editor={editor}
        className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm"
      >
        <RichTextEditor.Toolbar sticky={false} className="border-b border-slate-200 bg-slate-50">
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content className="min-h-[260px] bg-white text-sm text-slate-800" />
      </RichTextEditor>

      {variables.length ? (
        <div className="mt-2 rounded-md border border-blue-200 bg-blue-50 p-2">
          <div className="mb-1.5 text-[11px] font-semibold text-blue-700">
            Insert variable (click to place a {'{{tag}}'} at the cursor)
          </div>
          <div className="flex flex-wrap gap-1.5">
            {variables.map((variable) => (
              <button
                key={variable}
                type="button"
                onClick={() => insertVariable(variable)}
                title={`Insert {{${variable}}}`}
                className="inline-flex items-center rounded-md border border-blue-200 bg-white px-2 py-0.5 font-mono text-[11px] text-blue-700 shadow-sm hover:border-blue-400 hover:bg-blue-50"
              >
                {`{{${variable}}}`}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
