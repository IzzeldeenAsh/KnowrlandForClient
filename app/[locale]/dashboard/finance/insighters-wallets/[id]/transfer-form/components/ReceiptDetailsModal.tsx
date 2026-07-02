'use client';

import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { IconExternalLink, IconFileText } from '@tabler/icons-react';
import { getAuthToken } from '@/lib/authToken';
import { useToast } from '@/components/toast/ToastContext';
import { buildAuthHeaders, parseApiError } from '../../../../../_config/api';
import type { WiredTransferReceiptDetailsResponse, WiredTransferReceiptDetails } from './types';

const SECONDARY_BUTTON_CLASS =
  'h-8 rounded-md border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50';

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function formatCurrency(amount: unknown): string {
  const num = typeof amount === 'number' ? amount : Number(String(amount ?? '').trim());
  const safe = Number.isFinite(num) ? num : 0;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(safe);
}

export default function ReceiptDetailsModal({
  isOpen,
  receiptId,
  locale,
  onClose,
}: {
  isOpen: boolean;
  receiptId: number | null;
  locale: string;
  onClose: () => void;
}) {
  const { handleServerErrors } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [details, setDetails] = useState<WiredTransferReceiptDetails | null>(null);

  const currentAbort = useRef<AbortController | null>(null);

  const fetchDetails = useCallback(async () => {
    if (!isOpen || !receiptId) return;

    currentAbort.current?.abort();
    const controller = new AbortController();
    currentAbort.current = controller;

    setIsLoading(true);
    setError('');
    setDetails(null);

    try {
      const token = getAuthToken();
      if (!token) {
        setError('Missing auth token. Please sign in again.');
        setIsLoading(false);
        return;
      }

      const response = await fetch(`https://api.foresighta.co/api/admin/fund/insighter/wired-transfer/show/${receiptId}`, {
        method: 'GET',
        cache: 'no-store',
        signal: controller.signal,
        headers: buildAuthHeaders(token, locale),
      });

      if (!response.ok) throw await parseApiError(response);

      const payload = (await response.json()) as WiredTransferReceiptDetailsResponse;
      setDetails(payload.data ?? null);
    } catch (requestError) {
      if (requestError instanceof DOMException && requestError.name === 'AbortError') return;
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to load receipt details right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to load receipt details right now.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [handleServerErrors, isOpen, locale, receiptId]);

  useEffect(() => {
    void fetchDetails();
    return () => currentAbort.current?.abort();
  }, [fetchDetails]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') onClose();
  };

  if (!isOpen) return null;

  const receiptFile = normalizeText(details?.receipt_file);
  const handledBy = normalizeText(details?.handel_by ?? details?.handled_by);

  return (
    <div onKeyDown={onKeyDown} className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 px-4 py-8">
      <div className="w-full max-w-2xl overflow-hidden rounded-md border border-slate-300 bg-white shadow-xl">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
          <div className="text-sm font-semibold text-slate-900">Receipt Details</div>
          <button type="button" onClick={onClose} className={SECONDARY_BUTTON_CLASS}>
            Close
          </button>
        </div>

        <div className="space-y-4 p-4">
          {isLoading ? (
            <div className="py-8 text-center text-xs text-slate-500">Loading receipt details...</div>
          ) : error ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{error}</div>
          ) : !details ? (
            <div className="py-8 text-center text-xs text-slate-500">No details found.</div>
          ) : (
            <div className="rounded-md border border-slate-200 bg-white">
              <div className="grid grid-cols-1 gap-0 divide-y divide-slate-100">
                <div className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-[200px,1fr] sm:gap-6">
                  <div className="text-xs font-semibold text-slate-500">Receipt No</div>
                  <div className="text-sm font-semibold text-slate-900">{normalizeText(details.receipt_no) || '-'}</div>
                </div>
                <div className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-[200px,1fr] sm:gap-6">
                  <div className="text-xs font-semibold text-slate-500">Receipt Date</div>
                  <div className="text-sm font-semibold text-slate-900">{normalizeText(details.receipt_date) || '-'}</div>
                </div>
                <div className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-[200px,1fr] sm:gap-6">
                  <div className="text-xs font-semibold text-slate-500">Handled By</div>
                  <div className="text-sm font-semibold text-slate-900">{handledBy || '-'}</div>
                </div>
                <div className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-[200px,1fr] sm:gap-6">
                  <div className="text-xs font-semibold text-slate-500">Amount</div>
                  <div className="text-sm font-semibold text-slate-900">{formatCurrency(details.amount)}</div>
                </div>
                <div className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-[200px,1fr] sm:gap-6">
                  <div className="text-xs font-semibold text-slate-500">Note</div>
                  <div className="text-sm font-semibold text-slate-900">{normalizeText(details.note) || '-'}</div>
                </div>
                <div className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-[200px,1fr] sm:gap-6">
                  <div className="text-xs font-semibold text-slate-500">Receipt File</div>
                  <div className="flex flex-wrap items-center gap-2">
                    {receiptFile ? (
                      <a
                        href={receiptFile}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-8 items-center gap-2 rounded-md border border-blue-600 bg-blue-600 px-3 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
                      >
                        <IconExternalLink size={14} />
                        Open file
                      </a>
                    ) : (
                      <span className="text-sm font-semibold text-slate-900">-</span>
                    )}
                    <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                      <IconFileText size={14} />
                      {receiptFile ? 'File available' : 'No file'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

