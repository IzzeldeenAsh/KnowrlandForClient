'use client';

import { useState } from 'react';

export type ContactMessage = {
  id: number;
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  message?: string;
  status?: string;
  created_at?: string;
};

type ContactMessageModalProps = {
  isOpen: boolean;
  message: ContactMessage | null;
  isSubmitting: boolean;
  submitError: string;
  onClose: () => void;
  onMarkAsRead: (id: number) => void;
};

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export default function ContactMessageModal({
  isOpen,
  message,
  isSubmitting,
  submitError,
  onClose,
  onMarkAsRead,
}: ContactMessageModalProps) {
  const [localError, setLocalError] = useState<string>('');

  if (!isOpen || !message) {
    return null;
  }

  const fullName = `${normalizeText(message.first_name)} ${normalizeText(message.last_name)}`.trim() || 'Unknown';
  const status = normalizeText(message.status).toLowerCase();
  const canMarkRead = status === 'unread';

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

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-900/40 px-4 py-6">
      <div className="mx-auto w-full max-w-2xl rounded-md border border-slate-200 bg-white p-4 shadow-sm max-h-[calc(100dvh-3rem)] overflow-y-auto">
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

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
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
            <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Message</div>
            <div className="mt-2 whitespace-pre-wrap text-xs text-slate-800">
              {normalizeText(message.message) || 'No message.'}
            </div>
          </div>
        </div>

        {localError ? <p className="mt-3 text-xs text-red-600">{localError}</p> : null}
        {submitError ? <p className="mt-3 text-xs text-red-600">{submitError}</p> : null}

        <div className="mt-4 flex items-center justify-end gap-2">
          {canMarkRead ? (
            <button
              type="button"
              onClick={markRead}
              disabled={isSubmitting}
              className="h-8 rounded-md border border-blue-600 bg-blue-600 px-3 text-xs font-medium text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Updating...' : 'Mark as read'}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
