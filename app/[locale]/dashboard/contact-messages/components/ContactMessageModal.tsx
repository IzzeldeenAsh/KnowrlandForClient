'use client';

import { useEffect, useState } from 'react';
import ContactMessageReplyEditor from './ContactMessageReplyEditor';

export type ContactMessageReplyAuthor = {
  name?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  profile_photo_url?: string | null;
  country_id?: number | null;
  roles?: string[];
};

export type ContactMessage = {
  id: number;
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  message?: string;
  status?: string;
  created_at?: string;
  reply_at?: string | null;
  reply_message?: string | null;
  reply_by?: ContactMessageReplyAuthor | null;
};

type SubmitAction = 'read' | 'reply' | null;

type ContactMessageModalProps = {
  isOpen: boolean;
  message: ContactMessage | null;
  submitAction: SubmitAction;
  submitError: string;
  onClose: () => void;
  onMarkAsRead: (id: number) => void;
  onReply: (id: number, replyMessage: string) => void;
};

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function htmlToText(html: string): string {
  if (!html) return '';
  if (!/[<>]/.test(html)) return html.trim();

  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  try {
    const normalized = html.replace(/<br\s*\/?>/gi, '\n');
    const doc = new DOMParser().parseFromString(normalized, 'text/html');
    return (doc.body?.textContent ?? '').replace(/\s+/g, ' ').trim();
  } catch {
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttribute(value: string): string {
  return escapeHtml(value);
}

function sanitizeReplyHtml(html: string): string {
  if (!html) return '';

  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    return escapeHtml(htmlToText(html));
  }

  try {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const allowedTags = new Set([
      'A',
      'B',
      'BLOCKQUOTE',
      'BR',
      'CODE',
      'EM',
      'H1',
      'H2',
      'H3',
      'HR',
      'I',
      'LI',
      'OL',
      'P',
      'PRE',
      'STRONG',
      'U',
      'UL',
    ]);

    const sanitizeNode = (node: Node): string => {
      if (node.nodeType === Node.TEXT_NODE) return escapeHtml(node.textContent ?? '');
      if (node.nodeType !== Node.ELEMENT_NODE) return '';

      const element = node as HTMLElement;
      const tag = element.tagName.toUpperCase();

      if (!allowedTags.has(tag)) {
        return Array.from(element.childNodes).map(sanitizeNode).join('');
      }

      if (tag === 'BR') return '<br />';
      if (tag === 'HR') return '<hr />';

      if (tag === 'A') {
        const rawHref = (element.getAttribute('href') ?? '').trim();
        const href =
          rawHref.startsWith('http://') ||
          rawHref.startsWith('https://') ||
          rawHref.startsWith('mailto:') ||
          rawHref.startsWith('/') ||
          rawHref.startsWith('#')
            ? rawHref
            : '#';

        const inner = Array.from(element.childNodes).map(sanitizeNode).join('');
        return `<a href="${escapeAttribute(href)}" target="_blank" rel="noopener noreferrer">${inner}</a>`;
      }

      const lowerTag = tag.toLowerCase();
      const inner = Array.from(element.childNodes).map(sanitizeNode).join('');
      return `<${lowerTag}>${inner}</${lowerTag}>`;
    };

    return Array.from(doc.body.childNodes).map(sanitizeNode).join('');
  } catch {
    return escapeHtml(htmlToText(html));
  }
}

function getReplyAuthorLabel(author?: ContactMessageReplyAuthor | null): string {
  if (!author) return '';

  const explicitName = normalizeText(author.name);
  if (explicitName) return explicitName;

  const fullName = `${normalizeText(author.first_name)} ${normalizeText(author.last_name)}`.trim();
  if (fullName) return fullName;

  return normalizeText(author.email);
}

export default function ContactMessageModal({
  isOpen,
  message,
  submitAction,
  submitError,
  onClose,
  onMarkAsRead,
  onReply,
}: ContactMessageModalProps) {
  const [localError, setLocalError] = useState<string>('');
  const [replyDraft, setReplyDraft] = useState<string>('');

  useEffect(() => {
    if (!isOpen) {
      setLocalError('');
      return;
    }

    setLocalError('');
    setReplyDraft(message?.reply_message ?? '');
  }, [isOpen, message?.id, message?.reply_message]);

  if (!isOpen || !message) {
    return null;
  }

  const fullName = `${normalizeText(message.first_name)} ${normalizeText(message.last_name)}`.trim() || 'Unknown';
  const status = normalizeText(message.status).toLowerCase();
  const canMarkRead = status === 'unread';
  const hasReply = normalizeText(message.reply_message).length > 0;
  const replyAuthorLabel = getReplyAuthorLabel(message.reply_by);
  const replyMeta = [normalizeText(message.reply_at), replyAuthorLabel].filter(Boolean).join(' | ');
  const isReadSubmitting = submitAction === 'read';
  const isReplySubmitting = submitAction === 'reply';

  const close = () => {
    setLocalError('');
    onClose();
  };

  const markRead = () => {
    if (!Number.isFinite(message.id) || message.id <= 0) {
      setLocalError('Invalid message id.');
      return;
    }

    setLocalError('');
    onMarkAsRead(message.id);
  };

  const sendReply = () => {
    if (!Number.isFinite(message.id) || message.id <= 0) {
      setLocalError('Invalid message id.');
      return;
    }

    if (!htmlToText(replyDraft)) {
      setLocalError('Reply message cannot be empty.');
      return;
    }

    setLocalError('');
    onReply(message.id, replyDraft);
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-900/40 px-4 py-6">
      <div className="mx-auto max-h-[calc(100dvh-3rem)] w-full max-w-5xl overflow-y-auto rounded-md border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Contact message</h2>
            <p className="mt-1 text-xs text-slate-500">
              #{message.id} {message.created_at ? `| ${message.created_at}` : ''}
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            className="h-8 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)]">
          <div className="space-y-3">
            <div className="rounded-md border border-slate-200 bg-white p-3">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">From</div>
              <div className="mt-1 text-sm font-semibold text-slate-900">{fullName}</div>
              <div className="mt-2 space-y-1 text-xs text-slate-700">
                <div>
                  <span className="text-slate-500">Email:</span> {normalizeText(message.email) || '-'}
                </div>
                <div>
                  <span className="text-slate-500">Phone:</span> {normalizeText(message.phone) || '-'}
                </div>
                <div>
                  <span className="text-slate-500">Status:</span> {status || '-'}
                </div>
              </div>
            </div>

            <div className="rounded-md border border-slate-200 bg-white p-3">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Original message</div>
              <div className="mt-2 whitespace-pre-wrap text-sm text-slate-800">
                {normalizeText(message.message) || 'No message.'}
              </div>
            </div>

            {hasReply ? (
              <div className="rounded-md border border-emerald-200 bg-emerald-50/50 p-3">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">Last sent reply</div>
                  {replyMeta ? <div className="text-[11px] text-emerald-700/90">{replyMeta}</div> : null}
                </div>
                <div
                  className="prose prose-slate mt-3 max-w-none text-sm prose-headings:mb-2 prose-headings:mt-0 prose-p:my-2 prose-li:my-1 prose-a:text-blue-600"
                  dangerouslySetInnerHTML={{ __html: sanitizeReplyHtml(normalizeText(message.reply_message)) }}
                />
              </div>
            ) : (
              <div className="rounded-md border border-dashed border-slate-200 bg-slate-50 p-3 text-xs text-slate-500">
                No reply has been sent for this message yet.
              </div>
            )}
          </div>

          <div className="rounded-md border border-slate-200 bg-slate-50/60 p-3">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Reply editor</div>
                <p className="mt-1 text-xs text-slate-500">
                  The content is sent as HTML to the reply endpoint and emailed to {normalizeText(message.email) || 'this contact'}.
                </p>
              </div>
            </div>

            <div className="mt-3">
              <ContactMessageReplyEditor
                value={replyDraft}
                onChange={setReplyDraft}
                disabled={isReplySubmitting}
                placeholder="Write a clear, formatted reply..."
              />
            </div>

            {localError ? <p className="mt-3 text-xs text-red-600">{localError}</p> : null}
            {submitError ? <p className="mt-3 text-xs text-red-600">{submitError}</p> : null}

            <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
              {canMarkRead ? (
                <button
                  type="button"
                  onClick={markRead}
                  disabled={submitAction !== null}
                  className="h-9 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isReadSubmitting ? 'Updating...' : 'Mark as read'}
                </button>
              ) : null}

              <button
                type="button"
                onClick={sendReply}
                disabled={submitAction !== null}
                className="h-9 rounded-md border border-blue-600 bg-blue-600 px-4 text-xs font-medium text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isReplySubmitting ? 'Sending...' : hasReply ? 'Send updated reply' : 'Send reply'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
