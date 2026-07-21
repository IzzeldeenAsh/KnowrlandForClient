'use client';

import { IconAlertTriangle, IconMail, IconUser, IconUsers, IconX } from '@tabler/icons-react';
import { useEffect } from 'react';
import ContactMessageReplyEditor, {
  richTextToPlainText,
} from '../../../contact-messages/components/ContactMessageReplyEditor';

export type EmailTarget = 'specific' | 'all';

type InsighterEmailModalProps = {
  isOpen: boolean;
  target: EmailTarget;
  recipientName: string;
  recipientEmail: string;
  subject: string;
  message: string;
  submitError: string;
  isSubmitting: boolean;
  broadcastConfirmed: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onSubjectChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onBroadcastConfirmedChange: (value: boolean) => void;
};

const FIELD_CLASS =
  'w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100';

export default function InsighterEmailModal({
  isOpen,
  target,
  recipientName,
  recipientEmail,
  subject,
  message,
  submitError,
  isSubmitting,
  broadcastConfirmed,
  onClose,
  onSubmit,
  onSubjectChange,
  onMessageChange,
  onBroadcastConfirmedChange,
}: InsighterEmailModalProps) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSubmitting) onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const isBroadcast = target === 'all';
  const messageText = richTextToPlainText(message);
  const canSubmit =
    subject.trim().length > 0 &&
    messageText.length > 0 &&
    (!isBroadcast || broadcastConfirmed) &&
    !isSubmitting;

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
        aria-labelledby="insighter-email-title"
        className="flex max-h-[calc(100vh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 bg-slate-50 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
              <IconMail size={20} aria-hidden="true" />
            </span>
            <div>
              <h2 id="insighter-email-title" className="text-base font-semibold text-slate-900">
                {isBroadcast ? 'Email all insighters' : `Email ${recipientName}`}
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
          <div
            className={`flex items-center gap-3 rounded-lg border px-4 py-3 ${
              isBroadcast ? 'border-amber-200 bg-amber-50' : 'border-blue-100 bg-blue-50/70'
            }`}
          >
            <span
              className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                isBroadcast ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
              }`}
            >
              {isBroadcast ? <IconUsers size={18} /> : <IconUser size={18} />}
            </span>
            <div className="min-w-0">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Recipients</div>
              <div className="mt-0.5 truncate text-sm font-semibold text-slate-900">
                {isBroadcast ? 'Every registered insighter' : recipientName}
              </div>
              {!isBroadcast ? <div className="truncate text-xs text-slate-600">{recipientEmail}</div> : null}
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <label htmlFor="insighter-email-subject" className="text-xs font-semibold text-slate-700">
                Subject
              </label>
              <span className="text-[10px] text-slate-400">{subject.length}/180</span>
            </div>
            <input
              id="insighter-email-subject"
              type="text"
              maxLength={180}
              value={subject}
              onChange={(event) => onSubjectChange(event.target.value)}
              placeholder="Enter a clear email subject"
              className={`${FIELD_CLASS} h-10`}
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
              placeholder="Write the message insighters will receive..."
              disabled={isSubmitting}
            />
            <p className="mt-1.5 text-[11px] text-slate-500">
              The recipient’s name and Insighta email branding are added automatically.
            </p>
          </div>

          {isBroadcast ? (
            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
              <input
                type="checkbox"
                checked={broadcastConfirmed}
                onChange={(event) => onBroadcastConfirmedChange(event.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-amber-300 text-blue-600 focus:ring-blue-500"
              />
              <span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-900">
                  <IconAlertTriangle size={15} aria-hidden="true" />
                  Confirm broadcast
                </span>
                <span className="mt-0.5 block text-xs leading-5 text-amber-800">
                  I understand this email will be queued for every registered insighter, not only the currently filtered list.
                </span>
              </span>
            </label>
          ) : null}

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
            className={`inline-flex h-9 items-center justify-center gap-2 rounded-md px-4 text-xs font-semibold text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50 ${
              isBroadcast ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <IconMail size={15} aria-hidden="true" />
            {isSubmitting ? 'Queuing email...' : isBroadcast ? 'Email all insighters' : 'Send email'}
          </button>
        </footer>
      </section>
    </div>
  );
}
