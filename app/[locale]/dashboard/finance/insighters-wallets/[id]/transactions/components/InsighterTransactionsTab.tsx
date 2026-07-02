'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getAuthToken } from '@/lib/authToken';
import { useToast } from '@/components/toast/ToastContext';
import { buildAuthHeaders, parseApiError } from '../../../../../_config/api';
import TransactionDetailsModal from './TransactionDetailsModal';
import type { PaginatedResponse, PaginationMeta, WalletTransactionRecord } from './types';

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

const INPUT_WITH_ICON_CLASS =
  'h-8 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400 focus:border-[1px]';
const SECONDARY_BUTTON_CLASS =
  'h-8 rounded-md border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white';
const ROW_ACTION_BUTTON_CLASS =
  'rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] font-medium text-slate-700 shadow-sm hover:bg-slate-50';

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function toTitle(value: string): string {
  return normalizeText(value)
    .replace(/_/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function formatDate(dateString: string): string {
  const value = normalizeText(dateString);
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

function formatCurrency(amount: number): string {
  const safe = Number.isFinite(amount) ? amount : 0;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.abs(safe));
}

function getTxBadgeClass(tx: string): string {
  const normalized = normalizeText(tx).toLowerCase();
  if (normalized === 'deposit') return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
  if (normalized === 'withdraw') return 'bg-red-50 text-red-700 ring-1 ring-red-200';
  return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200';
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

type Period = 'weekly' | 'monthly' | 'yearly';

export default function InsighterTransactionsTab({ insighterId }: { insighterId: string }) {
  const { handleServerErrors } = useToast();
  const params = useParams<{ locale?: string }>();
  const locale = typeof params?.locale === 'string' ? params.locale : 'en';
  const backHref = `/${locale}/dashboard/finance/insighters-wallets`;

  const [period, setPeriod] = useState<Period>('yearly');

  const [transactions, setTransactions] = useState<WalletTransactionRecord[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({ current_page: 1, last_page: 1, per_page: 10, total: 0 });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [searchInput, setSearchInput] = useState<string>('');

  const [selectedTransaction, setSelectedTransaction] = useState<WalletTransactionRecord | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const currentRequestAbort = useRef<AbortController | null>(null);

  const fetchTransactions = useCallback(
    async (page = 1, selectedPeriod: Period = period, signal?: AbortSignal) => {
      setIsLoading(true);
      setError('');

      try {
        const token = getAuthToken();
        if (!token) {
          setTransactions([]);
          setMeta({ current_page: 1, last_page: 1, per_page: 10, total: 0 });
          setError('Missing auth token. Please sign in again.');
          return;
        }

        const url = new URL(`https://api.foresighta.co/api/admin/fund/insighter/transaction/${insighterId}`);
        url.searchParams.set('page', String(page));
        url.searchParams.set('per_time', selectedPeriod);

        const response = await fetch(url.toString(), {
          method: 'GET',
          cache: 'no-store',
          signal,
          headers: buildAuthHeaders(token),
        });
        if (!response.ok) throw await parseApiError(response);

        const payload = (await response.json()) as PaginatedResponse<WalletTransactionRecord>;
        setTransactions(Array.isArray(payload.data) ? payload.data : []);
        setMeta(payload.meta ?? { current_page: page, last_page: 1, per_page: 10, total: 0 });
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') return;
        handleServerErrors(requestError);
        const message =
          requestError && typeof requestError === 'object' && 'message' in requestError
            ? String((requestError as { message?: unknown }).message ?? 'Unable to load transactions right now.')
            : requestError instanceof Error
              ? requestError.message
              : 'Unable to load transactions right now.';
        setError(message);
        setTransactions([]);
        setMeta({ current_page: 1, last_page: 1, per_page: 10, total: 0 });
      } finally {
        setIsLoading(false);
      }
    },
    [handleServerErrors, insighterId, period],
  );

  const refresh = (page: number) => {
    currentRequestAbort.current?.abort();
    const controller = new AbortController();
    currentRequestAbort.current = controller;
    void fetchTransactions(page, period, controller.signal);
  };

  useEffect(() => {
    refresh(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  const filteredTransactions = useMemo(() => {
    const q = searchInput.trim().toLowerCase();
    if (!q) return transactions;
    return transactions.filter((tx) => {
      const combined = [
        tx.type,
        tx.type_key,
        tx.transaction,
        tx.amount,
        tx.order?.order_no,
        tx.order?.invoice_no,
        tx.order?.service,
        tx.order?.user?.name,
        tx.order?.user?.email,
      ]
        .map((v) => String(v ?? ''))
        .join(' ')
        .toLowerCase();
      return combined.includes(q);
    });
  }, [searchInput, transactions]);

  const pages = useMemo(() => getPaginationWindow(meta.current_page, meta.last_page, 5), [meta.current_page, meta.last_page]);

  const onSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') setSearchInput('');
  };

  const onPageChange = (page: number) => refresh(page);

  const openDetails = (tx: WalletTransactionRecord) => {
    setSelectedTransaction(tx);
    setDetailsOpen(true);
  };

  const closeDetails = () => {
    setDetailsOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="mt-4">
      <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="text-md font-semibold text-slate-900">Insighter Transactions</div>
            <div className="mt-0.5 text-xs text-slate-500">
              Insighter ID: <span className="font-mono text-[11px] text-slate-600">{insighterId}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <Link href={backHref} className={SECONDARY_BUTTON_CLASS}>
              Back
            </Link>
            <div className="inline-flex overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
              {(['weekly', 'monthly', 'yearly'] as Period[]).map((p, index) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPeriod(p)}
                  className={[
                    'h-8 px-4 text-xs font-medium transition-colors',
                    index !== 0 ? 'border-l border-slate-200' : '',
                    period === p ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-50',
                  ].join(' ')}
                  aria-pressed={period === p}
                >
                  {toTitle(p)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-slate-100 pt-4">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <label htmlFor="insighter-transactions-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <SearchIcon />
                </span>
                <input
                  id="insighter-transactions-search"
                  type="search"
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  onKeyDown={onSearchKeyDown}
                  placeholder="Search by order, user, invoice, type..."
                  className={INPUT_WITH_ICON_CLASS}
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 lg:col-span-4 lg:justify-end">
              <div className="text-xs text-slate-500">total: {meta.total}</div>
              <button type="button" onClick={() => refresh(meta.current_page)} className={SECONDARY_BUTTON_CLASS}>
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-md border border-slate-200 bg-white p-4 shadow-sm">
        <div className="overflow-x-auto rounded-md border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[1150px] border-collapse text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-semibold uppercase text-slate-500">
              <tr>
                <th className="w-[220px] border-b border-slate-200 px-3 py-2 text-left">Service</th>
                <th className="w-[170px] border-b border-slate-200 px-3 py-2 text-left">Order</th>
                <th className="w-[190px] border-b border-slate-200 px-3 py-2 text-left">Date</th>
                <th className="w-[150px] border-b border-slate-200 px-3 py-2 text-left">Transaction</th>
                <th className="w-[150px] border-b border-slate-200 px-3 py-2 text-left">Amount</th>
                <th className="w-[170px] border-b border-slate-200 px-3 py-2 text-left">Order Amount</th>
                <th className="w-[120px] border-b border-slate-200 px-3 py-2 text-right">Details</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-3 py-6 text-center text-xs text-slate-500">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="px-3 py-6 text-center text-xs text-red-600">
                    {error}
                  </td>
                </tr>
              ) : filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-3 py-6 text-center text-xs text-slate-500">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx, idx) => (
                  <tr key={`${tx.date}-${idx}`} className="odd:bg-white even:bg-slate-50/50">
                    <td className="border-b border-slate-100 px-3 py-2">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900">{normalizeText(tx.type) || '-'}</span>
                        <span className="mt-0.5 truncate font-mono text-[10px] text-slate-500">{normalizeText(tx.type_key) || '-'}</span>
                      </div>
                    </td>
                    <td className="border-b border-slate-100 px-3 py-2">
                      {tx.order?.order_no ? <span className="font-semibold text-blue-700">#{tx.order.order_no}</span> : <span className="text-slate-500">N/A</span>}
                    </td>
                    <td className="border-b border-slate-100 px-3 py-2">{formatDate(tx.date)}</td>
                    <td className="border-b border-slate-100 px-3 py-2">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${getTxBadgeClass(tx.transaction)}`}>
                        {toTitle(tx.transaction)}
                      </span>
                    </td>
                    <td className="border-b border-slate-100 px-3 py-2">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${getTxBadgeClass(tx.transaction)}`}>
                        {tx.amount > 0 ? '+' : ''}
                        {formatCurrency(tx.amount)}
                      </span>
                    </td>
                    <td className="border-b border-slate-100 px-3 py-2">
                      {Number.isFinite(tx.order?.amount as number) ? (
                        <span className="font-semibold text-slate-900">{formatCurrency(tx.order.amount as number)}</span>
                      ) : (
                        <span className="text-slate-500">-</span>
                      )}
                      {normalizeText(tx.order?.insighter_profit_rate) ? (
                        <span className="ms-2 rounded-full bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-700 ring-1 ring-slate-200">
                          {normalizeText(tx.order.insighter_profit_rate)}
                        </span>
                      ) : null}
                    </td>
                    <td className="border-b border-slate-100 px-3 py-2">
                      <div className="flex items-center justify-end">
                        <button type="button" onClick={() => openDetails(tx)} className={ROW_ACTION_BUTTON_CLASS}>
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-slate-500">
            Page {meta.current_page} of {meta.last_page}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onPageChange(Math.max(1, meta.current_page - 1))}
              disabled={meta.current_page <= 1}
              className={SECONDARY_BUTTON_CLASS}
            >
              Prev
            </button>

            <div className="flex items-center gap-1">
              {pages.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => onPageChange(p)}
                  className={[
                    'h-8 min-w-8 rounded-md border px-2 text-xs font-medium shadow-sm',
                    p === meta.current_page ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
                  ].join(' ')}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onPageChange(Math.min(meta.last_page, meta.current_page + 1))}
              disabled={meta.current_page >= meta.last_page}
              className={SECONDARY_BUTTON_CLASS}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <TransactionDetailsModal isOpen={detailsOpen} transaction={selectedTransaction} onClose={closeDetails} />
    </div>
  );
}
