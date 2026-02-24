'use client';

import { KeyboardEvent, useEffect, useRef, useState } from 'react';

const INPUT_CLASS =
  'h-8 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400 focus:border-[1px]';
const PRIMARY_BUTTON_CLASS =
  'h-8 rounded-md border border-blue-600 bg-blue-600 px-4 text-xs font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-50';
const SECONDARY_BUTTON_CLASS =
  'h-8 rounded-md border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50';

export type ReceiptFormValues = {
  receiptNo: string;
  receiptDate: string;
  amount: string;
  receiptFile: File | null;
};

export default function RecordReceiptModal({
  isOpen,
  isSaving,
  error,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  isSaving: boolean;
  error: string;
  onClose: () => void;
  onSave: (values: ReceiptFormValues) => void;
}) {
  const [receiptNo, setReceiptNo] = useState('');
  const [receiptDate, setReceiptDate] = useState('');
  const [amount, setAmount] = useState('');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const receiptNoRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setReceiptNo('');
    setReceiptDate('');
    setAmount('');
    setReceiptFile(null);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => receiptNoRef.current?.focus(), 50);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') onClose();
  };

  const canSave =
    !!receiptNo.trim() && !!receiptDate.trim() && !!amount.trim() && !!receiptFile && !Number.isNaN(Number(amount));

  if (!isOpen) return null;

  return (
    <div onKeyDown={onKeyDown} className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 px-4 py-8">
      <div className="w-full max-w-lg overflow-hidden rounded-md border border-slate-300 bg-white shadow-xl">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
          <div className="text-sm font-semibold text-slate-900">Record Receipt</div>
          <button type="button" onClick={onClose} className={SECONDARY_BUTTON_CLASS} disabled={isSaving}>
            Close
          </button>
        </div>

        <div className="space-y-4 p-4">
          <div>
            <div className="text-[11px] font-semibold text-slate-500">Receipt No</div>
            <input
              ref={receiptNoRef}
              type="text"
              value={receiptNo}
              onChange={(e) => setReceiptNo(e.target.value)}
              placeholder="e.g. RCPT-00123"
              className={`${INPUT_CLASS} mt-1`}
              disabled={isSaving}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <div className="text-[11px] font-semibold text-slate-500">Receipt Date</div>
              <input
                type="date"
                value={receiptDate}
                onChange={(e) => setReceiptDate(e.target.value)}
                className={`${INPUT_CLASS} mt-1`}
                disabled={isSaving}
              />
            </div>

            <div>
              <div className="text-[11px] font-semibold text-slate-500">Amount</div>
              <input
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className={`${INPUT_CLASS} mt-1`}
                disabled={isSaving}
              />
            </div>
          </div>

          <div>
            <div className="text-[11px] font-semibold text-slate-500">Receipt File</div>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => setReceiptFile(e.target.files?.[0] ?? null)}
              className="mt-1 block w-full text-xs text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-slate-700 hover:file:bg-slate-200"
              disabled={isSaving}
            />
            {receiptFile ? <div className="mt-1 text-[11px] font-semibold text-slate-600">{receiptFile.name}</div> : null}
          </div>

          {error ? <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{error}</div> : null}

          <div className="flex items-center justify-end gap-2 pt-1">
            <button type="button" onClick={onClose} className={SECONDARY_BUTTON_CLASS} disabled={isSaving}>
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onSave({ receiptNo, receiptDate, amount, receiptFile })}
              className={PRIMARY_BUTTON_CLASS}
              disabled={!canSave || isSaving}
            >
              {isSaving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

