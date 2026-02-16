'use client';

import type { OrderRecord } from './types';

const SECTION_TITLE_CLASS = 'text-sm font-semibold text-slate-900';
const LABEL_CLASS = 'text-[11px] font-semibold text-slate-500';
const VALUE_CLASS = 'text-xs font-medium text-slate-900';

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
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

export default function OrderDetailsModal({
  isOpen,
  order,
  onClose,
}: {
  isOpen: boolean;
  order: OrderRecord | null;
  onClose: () => void;
}) {
  if (!isOpen || !order) return null;

  const status = normalizeText(order.status) || 'unknown';
  const fulfillmentStatus = normalizeText(order.fulfillment_staus) || 'unknown';

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 px-4 py-8">
      <div className="w-full max-w-5xl overflow-hidden rounded-md border border-slate-300 bg-white shadow-xl">
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-4 py-3">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-slate-900">Order Details - {normalizeText(order.order_no) || '-'}</div>
            <div className="mt-0.5 text-xs text-slate-500">UUID: {normalizeText(order.uuid) || '-'}</div>
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
              <div className={LABEL_CLASS}>Order Number</div>
              <div className={`${VALUE_CLASS} mt-1`}>{normalizeText(order.order_no) || '-'}</div>
            </div>
            <div className="rounded-md border border-slate-200 bg-white p-3 shadow-sm">
              <div className={LABEL_CLASS}>Invoice Number</div>
              <div className={`${VALUE_CLASS} mt-1`}>{normalizeText(order.invoice_no) || '-'}</div>
            </div>
            <div className="rounded-md border border-slate-200 bg-white p-3 shadow-sm">
              <div className={LABEL_CLASS}>Order Date</div>
              <div className={`${VALUE_CLASS} mt-1`}>{formatDate(order.date)}</div>
            </div>
            <div className="rounded-md border border-slate-200 bg-white p-3 shadow-sm">
              <div className={LABEL_CLASS}>Total Amount</div>
              <div className={`${VALUE_CLASS} mt-1`}>{formatCurrency(order.amount, order.currency)}</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
            <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className={SECTION_TITLE_CLASS}>Payment Information</div>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${getStatusBadgeClass(order.payment?.status ?? '')}`}>
                  {toTitle(normalizeText(order.payment?.status) || 'unknown')}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div>
                  <div className={LABEL_CLASS}>Method</div>
                  <div className={`${VALUE_CLASS} mt-1`}>{getPaymentMethodLabel(order.payment?.method ?? '')}</div>
                </div>
                <div>
                  <div className={LABEL_CLASS}>Amount</div>
                  <div className={`${VALUE_CLASS} mt-1`}>{formatCurrency(order.payment?.amount ?? order.amount, order.payment?.currency ?? order.currency)}</div>
                </div>
                {order.payment?.provider ? (
                  <div>
                    <div className={LABEL_CLASS}>Provider</div>
                    <div className={`${VALUE_CLASS} mt-1`}>{normalizeText(order.payment.provider) || '-'}</div>
                  </div>
                ) : null}
                {order.payment?.confirmed_at ? (
                  <div>
                    <div className={LABEL_CLASS}>Confirmed</div>
                    <div className={`${VALUE_CLASS} mt-1`}>{formatDate(order.payment.confirmed_at)}</div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className={SECTION_TITLE_CLASS}>Fulfillment Status</div>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${getFulfillmentBadgeClass(fulfillmentStatus)}`}>
                  {toTitle(fulfillmentStatus)}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div>
                  <div className={LABEL_CLASS}>Service</div>
                  <div className={`${VALUE_CLASS} mt-1`}>{toTitle(order.service)}</div>
                </div>
                <div>
                  <div className={LABEL_CLASS}>Payment Status</div>
                  <div className={`${VALUE_CLASS} mt-1`}>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${getStatusBadgeClass(status)}`}>
                      {toTitle(status)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-md border border-slate-200 bg-white p-4 shadow-sm">
            <div className={SECTION_TITLE_CLASS}>Order Items</div>

            <div className="mt-3 space-y-4">
              {Array.isArray(order.order_data?.knowledge) && order.order_data.knowledge.length > 0 ? (
                <div>
                  <div className="text-xs font-semibold text-slate-700">Knowledge Products</div>
                  <div className="mt-2 space-y-2">
                    {order.order_data.knowledge.map((item, idx) => (
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
              ) : (
                <div className="text-xs text-slate-500">No knowledge products.</div>
              )}

              {Array.isArray(order.order_data?.knowledge_documents) && order.order_data.knowledge_documents.length > 0 ? (
                <div>
                  <div className="text-xs font-semibold text-slate-700">Documents</div>
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {order.order_data.knowledge_documents.flat().map((doc, idx) => (
                      <div key={`${doc.file_name}-${idx}`} className="flex items-start justify-between gap-3 rounded-md border border-slate-200 bg-white px-3 py-2">
                        <div className="min-w-0">
                          <div className="truncate text-xs font-medium text-slate-900">
                            {normalizeText(doc.file_name) || 'file'}.{normalizeText(doc.file_extension) || ''}
                          </div>
                          <div className="mt-0.5 text-[11px] text-slate-500">{normalizeText(doc.file_extension).toUpperCase() || '-'}</div>
                        </div>
                        <div className="text-xs font-semibold text-slate-700">{formatCurrency(doc.price, order.currency)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-500">No documents.</div>
              )}
            </div>
          </div>

          {Array.isArray(order.fulfillment_attempts) && order.fulfillment_attempts.length > 0 ? (
            <div className="mt-4 rounded-md border border-slate-200 bg-white p-4 shadow-sm">
              <div className={SECTION_TITLE_CLASS}>Fulfillment Timeline</div>

              <div className="mt-3 space-y-3">
                {order.fulfillment_attempts.map((attempt, idx) => {
                  const attemptStatus = normalizeText(attempt.status) || 'unknown';
                  const ok = attemptStatus.toLowerCase() === 'succeeded' || attemptStatus.toLowerCase() === 'completed';

                  return (
                    <div key={`${attempt.attempted_at}-${idx}`} className="rounded-md border border-slate-200 bg-white p-3">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 h-3 w-3 rounded-full ${ok ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-slate-900">{normalizeText(attempt.user?.name) || 'Unknown user'}</div>
                            <div className="text-[11px] text-slate-500">{normalizeText(attempt.user?.email) || ''}</div>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-200">
                                {toTitle(normalizeText(attempt.step) || '-')}
                              </span>
                              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${getFulfillmentBadgeClass(attemptStatus)}`}>
                                {toTitle(attemptStatus)}
                              </span>
                              {attempt.retry_count > 0 ? (
                                <span className="text-[11px] text-slate-500">Retries: {attempt.retry_count}</span>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        <div className="text-[11px] font-medium text-slate-500">{formatDate(attempt.attempted_at)}</div>
                      </div>

                      {attempt.error_message ? (
                        <div className="mt-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                          {normalizeText(attempt.error_message)}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

