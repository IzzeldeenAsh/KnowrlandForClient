'use client';

import { useEffect, useState } from 'react';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import { useEditor } from '@tiptap/react';
import { RichTextEditor } from '@mantine/tiptap';
import { Popover, TextInput, Button, Stack } from '@mantine/core';
import { IconPhoto } from '@tabler/icons-react';

// Extracts the visible text from rich-text HTML so callers can validate that an
// editor holds real content (an "empty" editor still emits markup like `<p></p>`).
export function richTextToPlainText(html: string): string {
  if (!html) return '';
  if (typeof document === 'undefined') {
    return html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  }
  const container = document.createElement('div');
  container.innerHTML = html;
  return (container.textContent ?? '').replace(/\s+/g, ' ').trim();
}

type ContactMessageReplyEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

export default function ContactMessageReplyEditor({
  value,
  onChange,
  placeholder = 'Write your reply...',
  disabled = false,
}: ContactMessageReplyEditorProps) {
  const [imageUrlOpen, setImageUrlOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

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
      Image,
    ],
    content: value || '',
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

  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!disabled);
  }, [disabled, editor]);

  const insertImage = () => {
    const url = imageUrl.trim();
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
    setImageUrl('');
    setImageUrlOpen(false);
  };

  return (
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
          <Popover
            opened={imageUrlOpen}
            onChange={setImageUrlOpen}
            position="bottom-start"
            withArrow
            shadow="md"
            zIndex={10010}
            withinPortal
          >
            <Popover.Target>
              <RichTextEditor.Control
                onClick={() => setImageUrlOpen((prev) => !prev)}
                aria-label="Insert image by URL"
                title="Insert image by URL"
              >
                <IconPhoto size={16} stroke={1.5} />
              </RichTextEditor.Control>
            </Popover.Target>
            <Popover.Dropdown>
              <Stack gap="xs">
                <TextInput
                  placeholder="https://example.com/image.png"
                  value={imageUrl}
                  onChange={(event) => setImageUrl(event.currentTarget.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      insertImage();
                    }
                  }}
                  autoFocus
                  size="xs"
                  w={240}
                />
                <Button size="xs" onClick={insertImage} disabled={!imageUrl.trim()}>
                  Insert image
                </Button>
              </Stack>
            </Popover.Dropdown>
          </Popover>
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content className="min-h-[220px] bg-white text-sm text-slate-800" />
    </RichTextEditor>
  );
}
