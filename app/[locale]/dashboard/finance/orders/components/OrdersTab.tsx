'use client';

import { KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getAuthToken } from '@/lib/authToken';
import { useToast } from '@/components/toast/ToastContext';
import { buildAuthHeaders, parseApiError } from '../../../_config/api';
import OrderDetailsModal from './OrderDetailsModal';
import type { OrderRecord, OrdersResponse, OrderMeta } from './types';

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
  'h-8 rounded-md border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50';
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

function getStatusBadgeClass(status: string): string {
  const normalized = normalizeText(status).toLowerCase();
  if (normalized === 'paid') return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
  if (normalized === 'pending') return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
  if (normalized === 'failed') return 'bg-red-50 text-red-700 ring-1 ring-red-200';
  return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200';
}

function getFulfillmentBadgeClass(status: string): string {
  const normalized = normalizeText(status).toLowerCase();
  if (normalized === 'completed' || normalized === 'succeeded') return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
  if (normalized === 'pending') return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
  if (normalized === 'failed') return 'bg-red-50 text-red-700 ring-1 ring-red-200';
  return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200';
}

function getPaymentMethodLabel(method: string): string {
  const normalized = normalizeText(method).toLowerCase();
  if (normalized === 'free') return 'Free';
  if (normalized === 'provider') return 'Payment Provider';
  if (normalized === 'manual') return 'Wallet Payment';
  return normalizeText(method) || '-';
}

function formatCurrency(amount: number, currency: string): string {
  const safeCurrency = normalizeText(currency) || 'USD';
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: safeCurrency }).format(safeAmount);
  } catch {
    return `${safeAmount} ${safeCurrency}`;
  }
}

function formatDate(dateString: string): string {
  const value = normalizeText(dateString);
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
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

export default function OrdersTab() {
  const { handleServerErrors } = useToast();

  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [meta, setMeta] = useState<OrderMeta>({ current_page: 1, last_page: 1, per_page: 10, total: 0 });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [perPage, setPerPage] = useState<number>(10);
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);

  const searchTimer = useRef<number | null>(null);
  const currentRequestAbort = useRef<AbortController | null>(null);

  useEffect(() => {
    if (searchTimer.current) window.clearTimeout(searchTimer.current);
    searchTimer.current = window.setTimeout(() => setSearchQuery(searchInput.trim()), 250);
    return () => {
      if (searchTimer.current) window.clearTimeout(searchTimer.current);
    };
  }, [searchInput]);

  const fetchOrders = useCallback(
    async (page = 1, perPageValue = perPage, signal?: AbortSignal) => {
      setIsLoading(true);
      setError('');

      try {
        const token = getAuthToken();
        if (!token) {
          setOrders([]);
          setMeta({ current_page: 1, last_page: 1, per_page: perPageValue, total: 0 });
          setError('Missing auth token. Please sign in again.');
          return;
        }

        const url = new URL('https://api.foresighta.co/api/admin/order/knowledge');
        url.searchParams.set('page', String(page));
        url.searchParams.set('per_page', String(perPageValue));

        const response = await fetch(url.toString(), {
          method: 'GET',
          cache: 'no-store',
          signal,
          headers: buildAuthHeaders(token),
        });

        if (!response.ok) {
          throw await parseApiError(response);
        }

        const payload = (await response.json()) as OrdersResponse;
        setOrders(Array.isArray(payload.data) ? payload.data : []);
        setMeta(payload.meta ?? { current_page: page, last_page: 1, per_page: perPageValue, total: 0 });
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') {
          return;
        }
        handleServerErrors(requestError);
        const message =
          requestError && typeof requestError === 'object' && 'message' in requestError
            ? String((requestError as { message?: unknown }).message ?? 'Unable to load orders right now.')
            : requestError instanceof Error
              ? requestError.message
              : 'Unable to load orders right now.';
        setError(message);
        setOrders([]);
        setMeta({ current_page: 1, last_page: 1, per_page: perPageValue, total: 0 });
      } finally {
        setIsLoading(false);
      }
    },
    [handleServerErrors, perPage],
  );

  const refresh = (page: number, perPageValue: number) => {
    currentRequestAbort.current?.abort();
    const controller = new AbortController();
    currentRequestAbort.current = controller;
    void fetchOrders(page, perPageValue, controller.signal);
  };

  useEffect(() => {
    refresh(1, perPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perPage]);

  const filteredOrders = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return orders;

    return orders.filter((order) => {
      const combined = [
        order.order_no,
        order.invoice_no,
        order.uuid,
        order.service,
        order.status,
        order.payment?.status,
        order.payment?.method,
        order.fulfillment_staus,
        order.currency,
      ]
        .map((v) => String(v ?? ''))
        .join(' ')
        .toLowerCase();
      return combined.includes(q);
    });
  }, [orders, searchQuery]);

  const pages = useMemo(() => getPaginationWindow(meta.current_page, meta.last_page, 5), [meta.current_page, meta.last_page]);

  const onPageChange = (page: number) => {
    refresh(page, perPage);
  };

  const onSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setSearchInput('');
      setSearchQuery('');
    }
  };

  const openDetails = (order: OrderRecord) => {
    setSelectedOrder(order);
    setDetailsOpen(true);
  };

  const closeDetails = () => {
    setDetailsOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col">
          <h2 className="text-md font-semibold text-slate-900">Orders</h2>
          <p className="text-xs font-light text-slate-500 ps-1">total orders: {meta.total}</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:flex-1 sm:pl-4">
          <div className="relative flex-1 sm:max-w-[520px]">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon />
            </span>
            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              onKeyDown={onSearchKeyDown}
              placeholder="Search orders (current page)..."
              className={INPUT_WITH_ICON_CLASS}
            />
          </div>

         
        </div>
      </div>

      <div className="mt-4 overflow-x-auto rounded-md border border-slate-200 bg-white shadow-sm">
        <table className="min-w-[1200px] w-full border-collapse text-xs text-slate-700">
          <thead className="bg-slate-50 text-[11px] font-semibold uppercase text-slate-500">
            <tr>
              <th className="w-[140px] border-b border-slate-200 px-3 py-2 text-left">Order No</th>
              <th className="w-[170px] border-b border-slate-200 px-3 py-2 text-left">Date</th>
              <th className="w-[170px] border-b border-slate-200 px-3 py-2 text-left">Service</th>
              <th className="w-[140px] border-b border-slate-200 px-3 py-2 text-left">Amount</th>
              <th className="w-[150px] border-b border-slate-200 px-3 py-2 text-left">Payment Status</th>
              <th className="w-[170px] border-b border-slate-200 px-3 py-2 text-left">Payment Method</th>
              <th className="w-[170px] border-b border-slate-200 px-3 py-2 text-left">Fulfillment</th>
              <th className="w-[160px] border-b border-slate-200 px-3 py-2 text-left">Invoice No</th>
              <th className="w-[120px] border-b border-slate-200 px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={9} className="px-3 py-6 text-center text-xs text-slate-500">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={9} className="px-3 py-6 text-center text-xs text-red-600">
                  {error}
                </td>
              </tr>
            ) : filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-3 py-6 text-center text-xs text-slate-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => {
                const paymentStatus = normalizeText(order.status) || 'unknown';
                const fulfillment = normalizeText(order.fulfillment_staus) || 'unknown';
                return (
                  <tr key={order.uuid} className="odd:bg-white even:bg-slate-50/50">
                    <td className="border-b border-slate-100 px-3 py-2 font-semibold text-slate-900">
                      {normalizeText(order.order_no) || '-'}
                    </td>
                    <td className="border-b border-slate-100 px-3 py-2">{formatDate(order.date)}</td>
                    <td className="border-b border-slate-100 px-3 py-2">
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-200">
                        {toTitle(order.service)}
                      </span>
                    </td>
                    <td className="border-b border-slate-100 px-3 py-2">{formatCurrency(order.amount, order.currency)}</td>
                    <td className="border-b border-slate-100 px-3 py-2">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${getStatusBadgeClass(paymentStatus)}`}>
                        {toTitle(paymentStatus)}
                      </span>
                    </td>
                    <td className="border-b border-slate-100 px-3 py-2">
                      <span className="rounded-full bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-700 ring-1 ring-slate-200">
                        {getPaymentMethodLabel(order.payment?.method ?? '')}
                      </span>
                    </td>
                    <td className="border-b border-slate-100 px-3 py-2">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${getFulfillmentBadgeClass(fulfillment)}`}>
                        {toTitle(fulfillment)}
                      </span>
                    </td>
                    <td className="border-b border-slate-100 px-3 py-2">{normalizeText(order.invoice_no) || '-'}</td>
                    <td className="border-b border-slate-100 px-3 py-2">
                      <div className="flex items-center justify-end">
                        <button type="button" onClick={() => openDetails(order)} className={ROW_ACTION_BUTTON_CLASS}>
                          View
                        </button>
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
                  p === meta.current_page
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
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

      <OrderDetailsModal isOpen={detailsOpen} order={selectedOrder} onClose={closeDetails} />
    </div>
  );
}
