'use client';

import type { WalletTransactionRecord } from './types';

const SECTION_TITLE_CLASS = 'text-sm font-semibold text-slate-900';
const LABEL_CLASS = 'text-[11px] font-semibold text-slate-500';
const VALUE_CLASS = 'text-xs font-medium text-slate-900';

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
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.abs(safeAmount));
}

function getTxBadgeClass(tx: string): string {
  const normalized = normalizeText(tx).toLowerCase();
  if (normalized === 'deposit') return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
  if (normalized === 'withdraw') return 'bg-red-50 text-red-700 ring-1 ring-red-200';
  return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200';
}

export default function TransactionDetailsModal({
  isOpen,
  transaction,
  onClose,
}: {
  isOpen: boolean;
  transaction: WalletTransactionRecord | null;
  onClose: () => void;
}) {
  if (!isOpen || !transaction) return null;

  const txKind = normalizeText(transaction.transaction) || 'unknown';
  const order = transaction.order;
  const user = order?.user;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 px-4 py-8">
      <div className="w-full max-w-5xl overflow-hidden rounded-md border border-slate-300 bg-white shadow-xl">
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-4 py-3">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-slate-900">Transaction Details</div>
            <div className="mt-0.5 text-xs text-slate-500">{normalizeText(transaction.type) || '-'}</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        <div className="max-h-[75vh] overflow-auto p-4">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
            <div className="rounded-md border border-slate-200 bg-white p-3 shadow-sm">
              <div className={LABEL_CLASS}>Transaction</div>
              <div className="mt-1">
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${getTxBadgeClass(txKind)}`}>
                  {toTitle(txKind)}
                </span>
              </div>
            </div>
            <div className="rounded-md border border-slate-200 bg-white p-3 shadow-sm">
              <div className={LABEL_CLASS}>Amount</div>
              <div className={`${VALUE_CLASS} mt-1`} style={{ color: transaction.amount >= 0 ? '#16a34a' : '#dc2626' }}>
                {transaction.amount > 0 ? '+' : ''}
                {formatCurrency(transaction.amount)}
              </div>
            </div>
            <div className="rounded-md border border-slate-200 bg-white p-3 shadow-sm">
              <div className={LABEL_CLASS}>Date</div>
              <div className={`${VALUE_CLASS} mt-1`}>{formatDate(transaction.date)}</div>
            </div>
            <div className="rounded-md border border-slate-200 bg-white p-3 shadow-sm">
              <div className={LABEL_CLASS}>Type Key</div>
              <div className={`${VALUE_CLASS} mt-1 font-mono text-[11px]`}>{normalizeText(transaction.type_key) || '-'}</div>
            </div>
          </div>

          {user ? (
            <div className="mt-4 rounded-md border border-slate-200 bg-white p-4 shadow-sm">
              <div className={SECTION_TITLE_CLASS}>Customer</div>
              <div className="mt-3 flex items-center gap-3">
                {user.profile_photo_url ? (
                  <img
                    src={user.profile_photo_url}
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover"
                    style={{ objectPosition: 'top' }}
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
                    {(normalizeText(user.name).charAt(0) || 'U').toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-slate-900">{user.name}</div>
                  <div className="truncate text-xs text-slate-500">{user.email}</div>
                </div>
              </div>
            </div>
          ) : null}

          {order ? (
            <div className="mt-4 rounded-md border border-slate-200 bg-white p-4 shadow-sm">
              <div className={SECTION_TITLE_CLASS}>Order</div>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <div className={LABEL_CLASS}>Order Number</div>
                  <div className={`${VALUE_CLASS} mt-1`}>{normalizeText(order.order_no) || '-'}</div>
                </div>
                <div>
                  <div className={LABEL_CLASS}>Invoice Number</div>
                  <div className={`${VALUE_CLASS} mt-1`}>{normalizeText(order.invoice_no) || '-'}</div>
                </div>
                <div>
                  <div className={LABEL_CLASS}>Service</div>
                  <div className={`${VALUE_CLASS} mt-1`}>{toTitle(order.service)}</div>
                </div>
                <div>
                  <div className={LABEL_CLASS}>Status</div>
                  <div className={`${VALUE_CLASS} mt-1`}>{toTitle(order.status)}</div>
                </div>
                <div>
                  <div className={LABEL_CLASS}>Order Amount</div>
                  <div className={`${VALUE_CLASS} mt-1`}>{Number.isFinite(order.amount as number) ? formatCurrency(order.amount as number) : '-'}</div>
                </div>
                <div>
                  <div className={LABEL_CLASS}>Profit Rate</div>
                  <div className={`${VALUE_CLASS} mt-1`}>{normalizeText(order.insighter_profit_rate) || '-'}</div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

