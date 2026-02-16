'use client';

import type { TransactionRecord } from './types';

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

function formatCurrency(amount: number): string {
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.abs(safeAmount));
}

function formatDate(dateString: string): string {
  const value = normalizeText(dateString);
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

function getTransactionTypeLabel(type: string): string {
  const map: Record<string, string> = {
    income_knowledge: 'Knowledge Income',
    withdraw_payout_insighter_knowledge: 'Insighter Knowledge Payout',
    book_meeting: 'Meeting Booking',
    withdraw_payout_insighter_meeting: 'Insighter Meeting Payout',
    income_case: 'Case Income',
    withdraw_payout_insighter_case: 'Insighter Case Payout',
    income_prize: 'Prize Income',
    withdraw_payout_insighter_prize: 'Insighter Prize Payout',
  };
  return map[type] || toTitle(type);
}

function shouldShowInsighterInfo(type: string): boolean {
  return type === 'withdraw_payout_insighter_knowledge' || type === 'withdraw_payout_insighter_meeting';
}

function getTxBadgeClass(tx: string): string {
  const normalized = normalizeText(tx).toLowerCase();
  if (normalized === 'deposit') return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
  if (normalized === 'withdraw') return 'bg-red-50 text-red-700 ring-1 ring-red-200';
  return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200';
}

function getMeetingStatusBadgeClass(status: string): string {
  const normalized = normalizeText(status).toLowerCase();
  if (normalized === 'pending') return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
  if (normalized === 'completed') return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
  if (normalized === 'cancelled') return 'bg-red-50 text-red-700 ring-1 ring-red-200';
  if (normalized === 'postponed') return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200';
  return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200';
}

function formatAmountBadge(amount: number): string {
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  const absAmount = Math.abs(safeAmount);
  const open = safeAmount < 0 ? '(' : '';
  const close = safeAmount < 0 ? ')' : '';
  return `${open}$${absAmount.toFixed(2)}${close}`;
}

export default function TransactionDetailsModal({
  isOpen,
  transaction,
  onClose,
}: {
  isOpen: boolean;
  transaction: TransactionRecord | null;
  onClose: () => void;
}) {
  if (!isOpen || !transaction) return null;

  const txKind = normalizeText(transaction.transaction) || 'unknown';
  const typeLabel = getTransactionTypeLabel(normalizeText(transaction.type));
  const fee = Number.parseFloat(normalizeText(transaction.provider_fee) || '0');
  const net = Number.parseFloat(normalizeText(transaction.net_amount) || '0');

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 px-4 py-8">
      <div className="w-full max-w-5xl overflow-hidden rounded-md border border-slate-300 bg-white shadow-xl">
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-4 py-3">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-slate-900">Transaction Details</div>
            <div className="mt-0.5 text-xs text-slate-500">{typeLabel}</div>
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
              <div className={LABEL_CLASS}>Category</div>
              <div className={`${VALUE_CLASS} mt-1`}>{typeLabel}</div>
            </div>
          </div>

          {transaction.insighter && shouldShowInsighterInfo(normalizeText(transaction.type)) ? (
            <div className="mt-4 rounded-md border border-slate-200 bg-white p-4 shadow-sm">
              <div className={SECTION_TITLE_CLASS}>Insighter Information</div>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  {transaction.insighter.profile_photo_url ? (
                    <img
                      src={transaction.insighter.profile_photo_url}
                      alt={transaction.insighter.name}
                      className="h-10 w-10 rounded-full object-cover"
                      style={{ objectPosition: 'top' }}
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
                      {transaction.insighter.name?.charAt(0) ?? 'I'}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-slate-900">{transaction.insighter.name}</div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {transaction.insighter.roles?.map((role) => (
                        <span
                          key={role}
                          className="rounded-full bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-700 ring-1 ring-slate-200"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {transaction.insighter.company ? (
                  <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
                    <div className="text-xs font-semibold text-slate-800">{transaction.insighter.company.legal_name}</div>
                    <div className="mt-1 text-[11px] text-slate-500">
                      {transaction.insighter.company.verified ? 'Verified' : 'Unverified'}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}

          {transaction.order?.user ? (
            <div className="mt-4 rounded-md border border-slate-200 bg-white p-4 shadow-sm">
              <div className={SECTION_TITLE_CLASS}>Customer Information</div>
              <div className="mt-3 flex items-center gap-3">
                {transaction.order.user.profile_photo_url ? (
                  <img
                    src={transaction.order.user.profile_photo_url}
                    alt={transaction.order.user.name}
                    className="h-10 w-10 rounded-full object-cover"
                    style={{ objectPosition: 'top' }}
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
                    {transaction.order.user.name?.charAt(0) ?? 'U'}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-slate-900">{transaction.order.user.name}</div>
                  <div className="truncate text-xs text-slate-500">{transaction.order.user.email}</div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {transaction.order.user.roles?.map((role) => (
                      <span
                        key={role}
                        className="rounded-full bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-700 ring-1 ring-slate-200"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {transaction.order ? (
            <div className="mt-4 rounded-md border border-slate-200 bg-white p-4 shadow-sm">
              <div className={SECTION_TITLE_CLASS}>Order Details</div>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <div className={LABEL_CLASS}>Order Number</div>
                  <div className={`${VALUE_CLASS} mt-1`}>{normalizeText(transaction.order.order_no) || '-'}</div>
                </div>
                <div>
                  <div className={LABEL_CLASS}>Invoice Number</div>
                  <div className={`${VALUE_CLASS} mt-1`}>{normalizeText(transaction.order.invoice_no) || '-'}</div>
                </div>
                <div>
                  <div className={LABEL_CLASS}>Service Type</div>
                  <div className={`${VALUE_CLASS} mt-1`}>{toTitle(transaction.order.service)}</div>
                </div>
                <div>
                  <div className={LABEL_CLASS}>Order Status</div>
                  <div className={`${VALUE_CLASS} mt-1`}>{toTitle(transaction.order.status)}</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
                <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
                  <div className="text-xs font-semibold text-slate-700">Amount breakdown</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${getTxBadgeClass(txKind)}`}>
                      {formatAmountBadge(transaction.amount)}
                    </span>
                    {fee && !Number.isNaN(fee) ? (
                      <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 ring-1 ring-amber-200">
                        Fee: ${fee.toFixed(2)}
                      </span>
                    ) : null}
                    {net && !Number.isNaN(net) ? (
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-200">
                        Net: ${Math.abs(net).toFixed(2)}
                      </span>
                    ) : null}
                  </div>
                </div>

                {transaction.order.orderable?.meeting_booking ? (
                  <div className="rounded-md border border-slate-200 bg-white p-3">
                    <div className="text-xs font-semibold text-slate-700">Meeting Details</div>
                    <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <div>
                        <div className={LABEL_CLASS}>Date</div>
                        <div className={`${VALUE_CLASS} mt-1`}>{normalizeText(transaction.order.orderable.meeting_booking.date) || '-'}</div>
                      </div>
                      <div>
                        <div className={LABEL_CLASS}>Time</div>
                        <div className={`${VALUE_CLASS} mt-1`}>
                          {normalizeText(transaction.order.orderable.meeting_booking.start_time) || '-'} -{' '}
                          {normalizeText(transaction.order.orderable.meeting_booking.end_time) || '-'}
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <div className={LABEL_CLASS}>Status</div>
                        <div className="mt-1">
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${getMeetingStatusBadgeClass(
                              transaction.order.orderable.meeting_booking.status,
                            )}`}
                          >
                            {toTitle(transaction.order.orderable.meeting_booking.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs font-semibold text-slate-800">{normalizeText(transaction.order.orderable.meeting_booking.title) || ''}</div>
                    <div className="mt-1 text-xs text-slate-600">{normalizeText(transaction.order.orderable.meeting_booking.description) || ''}</div>
                  </div>
                ) : null}
              </div>

              {Array.isArray(transaction.order.orderable?.knowledge) && transaction.order.orderable.knowledge.length > 0 ? (
                <div className="mt-4">
                  <div className="text-xs font-semibold text-slate-700">Knowledge Products</div>
                  <div className="mt-2 space-y-2">
                    {transaction.order.orderable.knowledge.map((item, idx) => (
                      <div key={`${item.type}-${idx}`} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-200">
                            {normalizeText(item.type) || 'type'}
                          </span>
                          <span className="text-xs font-medium text-slate-900">{normalizeText(item.title) || '-'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {Array.isArray(transaction.order.orderable?.knowledge_documents) && transaction.order.orderable.knowledge_documents.length > 0 ? (
                <div className="mt-4">
                  <div className="text-xs font-semibold text-slate-700">Documents</div>
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {transaction.order.orderable.knowledge_documents.flat().map((doc, idx) => (
                      <div key={`${doc.file_name}-${idx}`} className="flex items-start justify-between gap-3 rounded-md border border-slate-200 bg-white px-3 py-2">
                        <div className="min-w-0">
                          <div className="truncate text-xs font-medium text-slate-900">
                            {normalizeText(doc.file_name) || 'file'}.{normalizeText(doc.file_extension) || ''}
                          </div>
                          <div className="mt-0.5 text-[11px] text-slate-500">{normalizeText(doc.file_extension).toUpperCase() || '-'}</div>
                        </div>
                        <div className="text-xs font-semibold text-slate-700">${Number.isFinite(doc.price) ? doc.price.toFixed(2) : '0.00'}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

