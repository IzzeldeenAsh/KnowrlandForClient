'use client';

import { KeyboardEvent, useEffect, useRef, useState } from 'react';

const INPUT_CLASS =
  'h-8 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400 focus:border-[1px]';
const PRIMARY_BUTTON_CLASS =
  'h-8 rounded-md border border-blue-600 bg-blue-600 px-4 text-xs font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-50';
const SECONDARY_BUTTON_CLASS =
  'h-8 rounded-md border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50';

export default function SendEmailModal({
  isOpen,
  defaultEmail,
  isSending,
  onClose,
  onSend,
}: {
  isOpen: boolean;
  defaultEmail: string;
  isSending: boolean;
  onClose: () => void;
  onSend: (email: string) => void;
}) {
  const [email, setEmail] = useState(defaultEmail);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) setEmail(defaultEmail);
  }, [defaultEmail, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') onClose();
  };

  if (!isOpen) return null;

  return (
    <div onKeyDown={onKeyDown} className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 px-4 py-8">
      <div className="w-full max-w-md overflow-hidden rounded-md border border-slate-300 bg-white shadow-xl">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
          <div className="text-sm font-semibold text-slate-900">Send Transfer Form</div>
          <button type="button" onClick={onClose} className={SECONDARY_BUTTON_CLASS}>
            Close
          </button>
        </div>

        <div className="p-4">
          <div className="text-[11px] font-semibold text-slate-500">Email</div>
          <input
            ref={inputRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className={`${INPUT_CLASS} mt-1`}
          />

          <div className="mt-4 flex items-center justify-end gap-2">
            <button type="button" onClick={onClose} className={SECONDARY_BUTTON_CLASS} disabled={isSending}>
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onSend(email)}
              className={PRIMARY_BUTTON_CLASS}
              disabled={isSending || !email.trim()}
            >
              {isSending ? 'Sending…' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

