'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getAuthToken } from '@/lib/authToken';
import { useToast } from '@/components/toast/ToastContext';
import { buildAuthHeaders, parseApiError } from '../../../_config/api';
import type { InsighterWalletRecord, PaginatedResponse, PaginationMeta } from './types';

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
const INPUT_CLASS =
  'h-8 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400 focus:border-[1px]';
const SECONDARY_BUTTON_CLASS =
  'h-8 rounded-md border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white';
const ROW_ACTION_BUTTON_CLASS =
  'rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white';

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

function formatDate(dateString: string | null | undefined): string {
  const value = normalizeText(dateString);
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

function formatCurrency(value: number | string): string {
  const num = typeof value === 'number' ? value : Number(value);
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

type Period = 'weekly' | 'monthly' | 'yearly';
type BalanceStatus = 'positive' | 'negative' | 'zero';

function getInitials(name: string): string {
  const trimmed = normalizeText(name);
  if (!trimmed) return 'I';
  const parts = trimmed.split(' ').filter(Boolean);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return parts[0].slice(0, 2).toUpperCase();
}

function getPaymentTypeBadgeClass(paymentType: string): string {
  const normalized = normalizeText(paymentType).toLowerCase();
  if (normalized === 'manual') return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
  if (normalized === 'provider') return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
  return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200';
}

function getBalanceStatusBadgeClass(balanceStatus: BalanceStatus): string {
  if (balanceStatus === 'positive') return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
  if (balanceStatus === 'negative') return 'bg-red-50 text-red-700 ring-1 ring-red-200';
  return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200';
}

export default function InsightersWalletsTab() {
  const { handleServerErrors } = useToast();
  const params = useParams<{ locale?: string }>();
  const locale = typeof params?.locale === 'string' ? params.locale : 'en';
  const baseHref = `/${locale}/dashboard/finance/insighters-wallets`;

  const [wallets, setWallets] = useState<InsighterWalletRecord[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({ current_page: 1, last_page: 1, per_page: 10, total: 0 });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [period, setPeriod] = useState<Period>('yearly');
  const [balanceStatus, setBalanceStatus] = useState<BalanceStatus>('positive');
  const [overdue, setOverdue] = useState<boolean>(false);

  const [searchInput, setSearchInput] = useState<string>('');

  const currentRequestAbort = useRef<AbortController | null>(null);

  const fetchWallets = useCallback(
    async (page = 1, selectedPeriod: Period = period, selectedBalanceStatus: BalanceStatus = balanceStatus, selectedOverdue = overdue, signal?: AbortSignal) => {
      setIsLoading(true);
      setError('');

      try {
        const token = getAuthToken();
        if (!token) {
          setWallets([]);
          setMeta({ current_page: 1, last_page: 1, per_page: 10, total: 0 });
          setError('Missing auth token. Please sign in again.');
          return;
        }

        const url = new URL('https://api.foresighta.co/api/admin/fund/insighter');
        url.searchParams.set('page', String(page));
        url.searchParams.set('per_time', selectedPeriod);
        url.searchParams.set('balance_status', selectedBalanceStatus);
        if (selectedOverdue) {
          url.searchParams.set('overdue_wired_transaction', '1');
        }

        const response = await fetch(url.toString(), {
          method: 'GET',
          cache: 'no-store',
          signal,
          headers: buildAuthHeaders(token),
        });

        if (!response.ok) throw await parseApiError(response);
        const payload = (await response.json()) as PaginatedResponse<InsighterWalletRecord>;
        setWallets(Array.isArray(payload.data) ? payload.data : []);
        setMeta(payload.meta ?? { current_page: page, last_page: 1, per_page: 10, total: 0 });
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') return;
        handleServerErrors(requestError);
        const message =
          requestError && typeof requestError === 'object' && 'message' in requestError
            ? String((requestError as { message?: unknown }).message ?? 'Unable to load wallets right now.')
            : requestError instanceof Error
              ? requestError.message
              : 'Unable to load wallets right now.';
        setError(message);
        setWallets([]);
        setMeta({ current_page: 1, last_page: 1, per_page: 10, total: 0 });
      } finally {
        setIsLoading(false);
      }
    },
    [balanceStatus, handleServerErrors, overdue, period],
  );

  const refresh = (page: number) => {
    currentRequestAbort.current?.abort();
    const controller = new AbortController();
    currentRequestAbort.current = controller;
    void fetchWallets(page, period, balanceStatus, overdue, controller.signal);
  };

  useEffect(() => {
    refresh(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period, balanceStatus, overdue]);

  const filteredWallets = useMemo(() => {
    const q = searchInput.trim().toLowerCase();
    if (!q) return wallets;
    return wallets.filter((w) => {
      const combined = [
        w.name,
        w.email,
        w.country,
        w.payment_type,
        w.company?.legal_name,
        w.last_wired_transfer,
      ]
        .map((v) => String(v ?? ''))
        .join(' ')
        .toLowerCase();
      return combined.includes(q);
    });
  }, [searchInput, wallets]);

  const pages = useMemo(() => getPaginationWindow(meta.current_page, meta.last_page, 5), [meta.current_page, meta.last_page]);

  const onSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setSearchInput('');
    }
  };

  const onPageChange = (page: number) => refresh(page);

  return (
    <div className="mt-4">
      <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col">
            <h2 className="text-md font-semibold text-slate-900">Insighters Wallets</h2>
            <p className="text-xs font-light text-slate-500 ps-1">Monitor insighter balances and payouts.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(['weekly', 'monthly', 'yearly'] as Period[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                className={[
                  'h-8 rounded-md border px-3 text-xs font-medium shadow-sm',
                  period === p ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
                ].join(' ')}
              >
                {toTitle(p)}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon />
            </span>
            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              onKeyDown={onSearchKeyDown}
              placeholder="Search (current page)..."
              className={INPUT_WITH_ICON_CLASS}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={balanceStatus}
              onChange={(event) => setBalanceStatus(event.target.value as BalanceStatus)}
              className={INPUT_CLASS}
              aria-label="Balance status"
            >
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
              <option value="zero">Zero</option>
            </select>

            <label className="flex h-8 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 shadow-sm">
              <input type="checkbox" checked={overdue} onChange={(e) => setOverdue(e.target.checked)} className="h-3.5 w-3.5" />
              Overdue Wired (+60 days)
            </label>

            <span className={`inline-flex h-8 items-center rounded-full px-3 text-[11px] font-semibold ${getBalanceStatusBadgeClass(balanceStatus)}`}>
              {toTitle(balanceStatus)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-md border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <div className="text-xs text-slate-500">total: {meta.total}</div>
          <button type="button" onClick={() => refresh(meta.current_page)} className={SECONDARY_BUTTON_CLASS}>
            Refresh
          </button>
        </div>

        <div className="mt-3 overflow-x-auto rounded-md border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[1100px] border-collapse text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-semibold uppercase text-slate-500">
              <tr>
                <th className="w-[340px] border-b border-slate-200 px-3 py-2 text-left">Insighter</th>
                <th className="w-[180px] border-b border-slate-200 px-3 py-2 text-left">Location</th>
                <th className="w-[170px] border-b border-slate-200 px-3 py-2 text-left">Balance</th>
                <th className="w-[160px] border-b border-slate-200 px-3 py-2 text-left">Payment Type</th>
                <th className="w-[200px] border-b border-slate-200 px-3 py-2 text-left">Last Wired Transfer</th>
                <th className="w-[130px] border-b border-slate-200 px-3 py-2 text-right">Transfer Form</th>
                <th className="w-[130px] border-b border-slate-200 px-3 py-2 text-right">Transactions</th>
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
              ) : filteredWallets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-3 py-6 text-center text-xs text-slate-500">
                    No wallets found.
                  </td>
                </tr>
              ) : (
                filteredWallets.map((wallet) => {
                  const initials = getInitials(wallet.name);
                  const isManual = normalizeText(wallet.payment_type).toLowerCase() === 'manual';
                  return (
                    <tr key={wallet.id} className="odd:bg-white even:bg-slate-50/50">
                      <td className="border-b border-slate-100 px-3 py-2">
                        <div className="flex items-center gap-3">
                          {wallet.profile_photo_url ? (
                            <img
                              src={wallet.profile_photo_url}
                              alt={wallet.name}
                              className="h-9 w-9 rounded-full object-cover"
                              style={{ objectPosition: 'top' }}
                            />
                          ) : (
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                              {initials}
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="truncate text-xs font-semibold text-slate-900">{wallet.name}</div>
                            <div className="truncate text-[11px] text-slate-500">{wallet.email}</div>
                            {wallet.company?.legal_name ? (
                              <div className="mt-0.5 truncate text-[11px] text-slate-500">{wallet.company.legal_name}</div>
                            ) : null}
                          </div>
                        </div>
                      </td>
                      <td className="border-b border-slate-100 px-3 py-2">
                        <span className="text-slate-700">{normalizeText(wallet.country) || '-'}</span>
                      </td>
                      <td className="border-b border-slate-100 px-3 py-2">
                        <span className="font-semibold text-slate-900">{formatCurrency(wallet.balance)}</span>
                      </td>
                      <td className="border-b border-slate-100 px-3 py-2">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${getPaymentTypeBadgeClass(wallet.payment_type)}`}>
                          {toTitle(wallet.payment_type)}
                        </span>
                      </td>
                      <td className="border-b border-slate-100 px-3 py-2">{formatDate(wallet.last_wired_transfer)}</td>
                      <td className="border-b border-slate-100 px-3 py-2">
                        <div className="flex items-center justify-end">
                          {isManual ? (
                            <Link href={`${baseHref}/${wallet.id}/transfer-form`} className={ROW_ACTION_BUTTON_CLASS}>
                              View
                            </Link>
                          ) : (
                            <button type="button" className={ROW_ACTION_BUTTON_CLASS} disabled title="Transfer form is available for manual payment type only.">
                              View
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="border-b border-slate-100 px-3 py-2">
                        <div className="flex items-center justify-end">
                          <Link href={`${baseHref}/${wallet.id}/transactions`} className={ROW_ACTION_BUTTON_CLASS}>
                            View
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
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
    </div>
  );
}
