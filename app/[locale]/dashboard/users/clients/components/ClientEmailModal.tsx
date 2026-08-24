'use client';

import { IconMail, IconUser, IconX } from '@tabler/icons-react';
import { useEffect } from 'react';
import ContactMessageReplyEditor, {
  richTextToPlainText,
} from '../../../contact-messages/components/ContactMessageReplyEditor';

type ClientEmailModalProps = {
  isOpen: boolean;
  clientName: string;
  clientEmail: string;
  subject: string;
  message: string;
  submitError: string;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onSubjectChange: (value: string) => void;
  onMessageChange: (value: string) => void;
};

const FIELD_CLASS =
  'w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100';

export default function ClientEmailModal({
  isOpen,
  clientName,
  clientEmail,
  subject,
  message,
  submitError,
  isSubmitting,
  onClose,
  onSubmit,
  onSubjectChange,
  onMessageChange,
}: ClientEmailModalProps) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSubmitting) onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const messageText = richTextToPlainText(message);
  const canSubmit = subject.trim().length > 0 && messageText.length > 0 && !isSubmitting;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-[2px]"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="client-email-title"
        className="flex max-h-[calc(100vh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 bg-slate-50 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
              <IconMail size={20} aria-hidden="true" />
            </span>
            <div>
              <h2 id="client-email-title" className="text-base font-semibold text-slate-900">
                Email {clientName}
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Compose a direct message from the Insighta administration team.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-200 hover:text-slate-800 disabled:opacity-40"
            aria-label="Close email composer"
          >
            <IconX size={18} />
          </button>
        </header>

        <div className="space-y-4 overflow-y-auto p-5">
          <div className="flex items-center gap-3 rounded-lg border border-blue-100 bg-blue-50/70 px-4 py-3">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
              <IconUser size={18} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Recipient</div>
              <div className="mt-0.5 truncate text-sm font-semibold text-slate-900">{clientName}</div>
              <div className="truncate text-xs text-slate-600">{clientEmail}</div>
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <label htmlFor="client-email-subject" className="text-xs font-semibold text-slate-700">
                Subject
              </label>
              <span className="text-[10px] text-slate-400">{subject.length}/255</span>
            </div>
            <input
              id="client-email-subject"
              type="text"
              maxLength={255}
              value={subject}
              onChange={(event) => onSubjectChange(event.target.value)}
              placeholder="Enter a clear email subject"
              className={`${FIELD_CLASS} h-10`}
              disabled={isSubmitting}
              autoFocus
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-slate-700">Message</span>
              <span className="text-[10px] text-slate-400">{messageText.length} characters</span>
            </div>
            <ContactMessageReplyEditor
              value={message}
              onChange={onMessageChange}
              placeholder="Write the message this client will receive..."
              disabled={isSubmitting}
            />
            <p className="mt-1.5 text-[11px] text-slate-500">
              The client’s name and Insighta email branding are added automatically.
            </p>
          </div>

          {submitError ? (
            <div role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {submitError}
            </div>
          ) : null}
        </div>

        <footer className="flex shrink-0 flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="h-9 rounded-md border border-slate-300 bg-white px-4 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={!canSubmit}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <IconMail size={15} aria-hidden="true" />
            {isSubmitting ? 'Queuing email...' : 'Send email'}
          </button>
        </footer>
      </section>
    </div>
  );
}
