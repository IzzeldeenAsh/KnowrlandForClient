'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getAuthToken } from '@/lib/authToken';
import { useToast } from '@/components/toast/ToastContext';
import { buildAuthHeaders, parseApiError } from '../../../../../_config/api';
import ReceiptDetailsModal from './ReceiptDetailsModal';
import type { PaginationMeta, WiredTransferReceiptListItem, WiredTransferReceiptListResponse } from './types';

const ROW_ACTION_BUTTON_CLASS =
  'rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] font-medium text-slate-700 shadow-sm hover:bg-slate-50';

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function formatCurrency(amount: unknown): string {
  const num = typeof amount === 'number' ? amount : Number(String(amount ?? '').trim());
  const safe = Number.isFinite(num) ? num : 0;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(safe);
}

function getPaginationWindow(currentPage: number, lastPage: number, maxVisiblePages = 5): number[] {
  const safeLast = Math.max(1, lastPage);
  const safeCurrent = Math.min(Math.max(1, currentPage), safeLast);
  const pages: number[] = [];

  const half = Math.floor(maxVisiblePages / 2);
  let start = Math.max(1, safeCurrent - half);
  let end = Math.min(safeLast, start + maxVisiblePages - 1);
  if (end - start + 1 < maxVisiblePages) {
    start = Math.max(1, end - maxVisiblePages + 1);
  }

  for (let p = start; p <= end; p++) pages.push(p);
  return pages;
}

export default function ReceiptsListTab({
  insighterId,
  locale,
  refreshKey,
}: {
  insighterId: string;
  locale: string;
  refreshKey: number;
}) {
  const { handleServerErrors } = useToast();

  const [receipts, setReceipts] = useState<WiredTransferReceiptListItem[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({ current_page: 1, last_page: 1, per_page: 10, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedReceiptId, setSelectedReceiptId] = useState<number | null>(null);

  const currentAbort = useRef<AbortController | null>(null);

  const fetchReceipts = useCallback(
    async (page = 1, signal?: AbortSignal) => {
      setIsLoading(true);
      setError('');

      try {
        const token = getAuthToken();
        if (!token) {
          setReceipts([]);
          setMeta({ current_page: 1, last_page: 1, per_page: 10, total: 0 });
          setError('Missing auth token. Please sign in again.');
          return;
        }

        const url = new URL(`https://api.foresighta.co/api/admin/fund/insighter/wired-transfer/${insighterId}`);
        url.searchParams.set('page', String(page));

        const response = await fetch(url.toString(), {
          method: 'GET',
          cache: 'no-store',
          signal,
          headers: buildAuthHeaders(token, locale),
        });

        if (!response.ok) throw await parseApiError(response);

        const payload = (await response.json()) as WiredTransferReceiptListResponse;
        setReceipts(Array.isArray(payload.data) ? payload.data : []);
        setMeta(payload.meta ?? { current_page: page, last_page: 1, per_page: 10, total: 0 });
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') return;
        handleServerErrors(requestError);
        const message =
          requestError && typeof requestError === 'object' && 'message' in requestError
            ? String((requestError as { message?: unknown }).message ?? 'Unable to load receipts right now.')
            : requestError instanceof Error
              ? requestError.message
              : 'Unable to load receipts right now.';
        setError(message);
        setReceipts([]);
      } finally {
        setIsLoading(false);
      }
    },
    [handleServerErrors, insighterId, locale],
  );

  useEffect(() => {
    currentAbort.current?.abort();
    const controller = new AbortController();
    currentAbort.current = controller;
    void fetchReceipts(1, controller.signal);
    return () => controller.abort();
  }, [fetchReceipts, refreshKey]);

  const pages = useMemo(() => getPaginationWindow(meta.current_page, meta.last_page, 5), [meta.current_page, meta.last_page]);

  const openDetails = (id: number) => {
    setSelectedReceiptId(id);
    setDetailsOpen(true);
  };

  const closeDetails = () => {
    setDetailsOpen(false);
    setSelectedReceiptId(null);
  };

  return (
    <div className="mt-4 rounded-md border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-1 border-b border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col">
          <div className="text-md font-semibold text-slate-900">Receipts List</div>
          <div className="text-xs text-slate-500">
            Total receipts: <span className="font-semibold">{meta.total ?? receipts.length}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => void fetchReceipts(meta.current_page)}
          className="inline-flex h-8 items-center justify-center rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isLoading}
        >
          Refresh
        </button>
      </div>

      {isLoading ? (
        <div className="p-4 text-xs text-slate-500">Loading receipts...</div>
      ) : error ? (
        <div className="p-4 text-xs text-red-600">{error}</div>
      ) : receipts.length === 0 ? (
        <div className="p-6 text-center">
          <div className="text-sm font-semibold text-slate-800">No receipts found</div>
          <div className="mt-1 text-xs text-slate-500">Record a receipt to see it here.</div>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="min-w-[980px] w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Receipt No</th>
                <th className="px-4 py-3">Receipt Date</th>
                <th className="px-4 py-3">Handled By</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Note</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {receipts.map((receipt) => {
                const handledBy = normalizeText(receipt.handel_by ?? receipt.handled_by);
                return (
                  <tr key={receipt.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3 text-slate-600">#{receipt.id}</td>
                    <td className="px-4 py-3">
                      <div className="text-xs font-semibold text-slate-900">{normalizeText(receipt.receipt_no) || '-'}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{normalizeText(receipt.receipt_date) || '-'}</td>
                    <td className="px-4 py-3 text-slate-700">{handledBy || '-'}</td>
                    <td className="px-4 py-3 text-slate-700">{formatCurrency(receipt.amount)}</td>
                    <td className="px-4 py-3 text-slate-700">{normalizeText(receipt.note) || '-'}</td>
                    <td className="px-4 py-3 text-right">
                      <button type="button" className={ROW_ACTION_BUTTON_CLASS} onClick={() => openDetails(receipt.id)}>
                        View details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {!isLoading && !error && meta.last_page > 1 ? (
        <div className="flex flex-col gap-2 border-t border-slate-200 p-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-[11px] text-slate-500">
            Page {meta.current_page} of {meta.last_page}
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              disabled={meta.current_page <= 1}
              onClick={() => void fetchReceipts(meta.current_page - 1)}
              className="h-7 rounded-md border border-slate-200 bg-white px-2 text-[11px] font-medium text-slate-700 shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
            >
              Previous
            </button>
            {pages.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => void fetchReceipts(page)}
                className={`h-7 rounded-md border px-2 text-[11px] font-medium shadow-sm ${
                  page === meta.current_page
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              disabled={meta.current_page >= meta.last_page}
              onClick={() => void fetchReceipts(meta.current_page + 1)}
              className="h-7 rounded-md border border-slate-200 bg-white px-2 text-[11px] font-medium text-slate-700 shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
            >
              Next
            </button>
          </div>
        </div>
      ) : null}

      <ReceiptDetailsModal isOpen={detailsOpen} receiptId={selectedReceiptId} locale={locale} onClose={closeDetails} />
    </div>
  );
}

