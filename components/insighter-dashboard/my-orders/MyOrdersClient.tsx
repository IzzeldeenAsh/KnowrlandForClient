'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Modal } from '@mantine/core';
import {
  IconShoppingBag,
  IconFileInvoice,
  IconCalendarEvent,
  IconBriefcase,
  IconRosetteDiscountCheckFilled,
} from '@tabler/icons-react';
import PageHeader, { PageHeaderTab } from '@/components/insighter-dashboard/PageHeader';
import KnowledgeTypeIcon from '@/components/insighter-dashboard/KnowledgeTypeIcon';
import { useToast } from '@/components/toast/ToastContext';
import {
  getMyOrders,
  type Order,
  type OrderKind,
  type PaginationMeta,
} from '@/services/insighter-dashboard.api';

function statusBadge(status: string): string {
  switch (status?.toLowerCase()) {
    case 'paid':
    case 'confirmed':
    case 'completed':
      return 'bg-[#DFFEE9] text-[#1BC653]';
    case 'pending':
      return 'bg-amber-50 text-amber-600';
    case 'refunded':
      return 'bg-[#EFF8FF] text-[#299AF8]';
    default:
      return 'bg-red-50 text-red-500';
  }
}

/** /insighter-dashboard/my-orders — purchases across knowledge/sessions/projects. */
export default function MyOrdersClient() {
  const t = useTranslations('InsighterDashboard.myOrders');
  const locale = useLocale();
  const toast = useToast();

  const [tab, setTab] = useState<OrderKind>('knowledge');
  const [orders, setOrders] = useState<Order[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<Order | null>(null);

  const load = useCallback(
    (kind: OrderKind, page: number) => {
      setLoading(true);
      getMyOrders(locale, kind, page)
        .then((res) => {
          setOrders(res.data ?? []);
          setMeta(res.meta ?? null);
        })
        .catch((err) => toast.handleServerErrors(err))
        .finally(() => setLoading(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale]
  );

  useEffect(() => {
    load(tab, 1);
  }, [tab, load]);

  const dateFormat = new Intl.DateTimeFormat(locale === 'ar' ? 'ar' : 'en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const formatDate = (value?: string) => {
    if (!value) return '—';
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? value : dateFormat.format(parsed);
  };
  const money = (amount: number, curr: string) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: curr || 'USD' }).format(amount);

  const seller = (order: Order) => order.orderable?.insighter;
  const sellerIsCompany = (order: Order) => !!seller(order)?.company;

  const payment = (order: Order) => order.payment ?? order.payments?.[0];

  return (
    <div>
      <PageHeader
        icon={<IconShoppingBag size={22} />}
        title={t('title')}
        subtitle={t('subtitle')}
        tabs={
          <>
            {(['knowledge', 'meeting', 'project'] as OrderKind[]).map((kind) => (
              <PageHeaderTab key={kind} active={tab === kind} onClick={() => setTab(kind)}>
                {t(`tabs.${kind}`)}
              </PageHeaderTab>
            ))}
          </>
        }
      />

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        {loading ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <IconShoppingBag size={40} className="text-gray-300" />
            <p className="text-sm text-gray-500">{t('empty')}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {orders.map((order) => (
              <div key={order.uuid} className="rounded-xl border border-gray-100 p-4 hover:border-gray-300">
                {/* Top row */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-800">
                      {t('order')} {order.order_no}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${statusBadge(order.status)}`}
                    >
                      {t.has(`status.${order.status?.toLowerCase()}`)
                        ? t(`status.${order.status.toLowerCase()}`)
                        : order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setDetail(order)}
                      className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                    >
                      {t('details')}
                    </button>
                    <Link
                      href={`/${locale}/invoice/${order.order_no}`}
                      className="inline-flex items-center gap-1 rounded-lg border border-sky-500 px-3 py-1.5 text-xs font-semibold text-sky-600 hover:bg-sky-50"
                    >
                      <IconFileInvoice size={14} />
                      {t('invoice')}
                    </Link>
                  </div>
                </div>

                {/* Content per kind */}
                <div className="mt-3 flex flex-col gap-1">
                  {tab === 'knowledge' &&
                    (order.orderable?.knowledge ?? []).map((k, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <KnowledgeTypeIcon type={k.type} size={14} />
                        {k.slug ? (
                          <Link
                            href={`/${locale}/knowledge/${k.type}/${k.slug}`}
                            className="hover:text-sky-600"
                          >
                            {k.title}
                          </Link>
                        ) : (
                          k.title
                        )}
                      </div>
                    ))}
                  {tab === 'meeting' && order.orderable?.meeting_booking && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <IconCalendarEvent size={16} className="text-sky-500" />
                      <span className="font-medium">{order.orderable.meeting_booking.title}</span>
                      <span className="text-gray-400">
                        {order.orderable.meeting_booking.date} • {order.orderable.meeting_booking.start_time}–
                        {order.orderable.meeting_booking.end_time}
                      </span>
                    </div>
                  )}
                  {tab === 'project' && order.orderable?.project && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <IconBriefcase size={16} className="text-sky-500" />
                      <span className="font-medium">
                        {order.orderable.project.title || order.orderable.project.project_no}
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom row */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-gray-50 pt-3">
                  {seller(order) ? (
                    <div className="flex items-center gap-2">
                      {seller(order)?.profile_photo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={seller(order)!.profile_photo_url!}
                          alt=""
                          className="h-7 w-7 rounded-full object-cover"
                        />
                      ) : (
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-50 text-xs font-bold text-sky-600">
                          {(seller(order)?.name ?? '?').charAt(0)}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">
                        {t('by')} {seller(order)?.company?.legal_name || seller(order)?.name}
                      </span>
                      {seller(order)?.company?.verified && (
                        <IconRosetteDiscountCheckFilled size={14} className="text-sky-500" />
                      )}
                      <span
                        className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                          sellerIsCompany(order)
                            ? 'bg-[#EFF8FF] text-[#299AF8]'
                            : 'bg-[#DFFEE9] text-[#1BC653]'
                        }`}
                      >
                        {sellerIsCompany(order) ? t('company') : t('insighter')}
                      </span>
                    </div>
                  ) : (
                    <span />
                  )}
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-xs text-gray-400">
                      {t('ordered')} {formatDate(order.date)}
                    </span>
                    <span className="font-bold text-gray-900">{money(order.amount, order.currency)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && meta && meta.last_page > 1 && (
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-500">
              {t('page')} {meta.current_page} {t('of')} {meta.last_page}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => load(tab, p)}
                  className={`min-w-[28px] rounded-md px-1.5 py-1 text-xs font-medium ${
                    p === meta.current_page ? 'bg-sky-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Order details dialog */}
      <Modal opened={!!detail} onClose={() => setDetail(null)} title={t('dialog.header')} centered size="lg">
        {detail && (
          <div className="flex flex-col gap-4 text-sm">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
              <dt className="text-gray-400">{t('dialog.orderNo')}</dt>
              <dd className="font-medium text-gray-800">{detail.order_no}</dd>
              {detail.invoice_no && (
                <>
                  <dt className="text-gray-400">{t('dialog.invoiceNo')}</dt>
                  <dd className="font-medium text-gray-800">{detail.invoice_no}</dd>
                </>
              )}
              <dt className="text-gray-400">{t('dialog.date')}</dt>
              <dd className="font-medium text-gray-800">{formatDate(detail.date)}</dd>
              <dt className="text-gray-400">{t('dialog.amount')}</dt>
              <dd className="font-medium text-gray-800">{money(detail.amount, detail.currency)}</dd>
              <dt className="text-gray-400">{t('dialog.status')}</dt>
              <dd>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-bold capitalize ${statusBadge(detail.status)}`}
                >
                  {detail.status}
                </span>
              </dd>
            </dl>

            {payment(detail) && (
              <div>
                <h4 className="mb-2 text-xs font-bold uppercase text-gray-400">{t('dialog.payment')}</h4>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 rounded-lg bg-gray-50 p-3">
                  <dt className="text-gray-400">{t('dialog.method')}</dt>
                  <dd className="font-medium capitalize text-gray-800">
                    {payment(detail)!.provider_payment_method_type || payment(detail)!.method}
                  </dd>
                  {payment(detail)!.provider_card_last_number && (
                    <>
                      <dt className="text-gray-400">{t('dialog.card')}</dt>
                      <dd className="font-medium text-gray-800">
                        {payment(detail)!.provider_card_brand} •••• {payment(detail)!.provider_card_last_number}
                      </dd>
                    </>
                  )}
                </dl>
                {payment(detail)!.provide_receipt_url && (
                  <a
                    href={payment(detail)!.provide_receipt_url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs font-semibold text-sky-600 hover:underline"
                  >
                    {t('dialog.receipt')}
                  </a>
                )}
              </div>
            )}

            {detail.orderable?.knowledge && detail.orderable.knowledge.length > 0 && (
              <div>
                <h4 className="mb-2 text-xs font-bold uppercase text-gray-400">{t('dialog.items')}</h4>
                <ul className="flex flex-col gap-2">
                  {detail.orderable.knowledge.map((k, i) => (
                    <li key={i} className="flex flex-col gap-1 rounded-lg border border-gray-100 p-3">
                      <span className="flex items-center gap-2 font-medium text-gray-800">
                        <KnowledgeTypeIcon type={k.type} size={14} />
                        {k.title}
                      </span>
                      {(detail.orderable.knowledge_documents?.[i] ?? []).map((doc, j) => (
                        <span key={j} className="ms-6 flex items-center justify-between text-xs text-gray-500">
                          {doc.file_name}
                          <span>{doc.price === 0 ? t('dialog.free') : money(doc.price, detail.currency)}</span>
                        </span>
                      ))}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {detail.orderable?.meeting_booking && (
              <div>
                <h4 className="mb-2 text-xs font-bold uppercase text-gray-400">{t('dialog.session')}</h4>
                <div className="rounded-lg border border-gray-100 p-3">
                  <div className="font-medium text-gray-800">{detail.orderable.meeting_booking.title}</div>
                  <div className="mt-1 text-xs text-gray-500">
                    {detail.orderable.meeting_booking.date} • {detail.orderable.meeting_booking.start_time}–
                    {detail.orderable.meeting_booking.end_time}
                  </div>
                  {detail.orderable.meeting_booking.description && (
                    <p className="mt-2 text-xs text-gray-500">{detail.orderable.meeting_booking.description}</p>
                  )}
                </div>
              </div>
            )}

            {detail.orderable?.project && (
              <div>
                <h4 className="mb-2 text-xs font-bold uppercase text-gray-400">{t('dialog.project')}</h4>
                <div className="rounded-lg border border-gray-100 p-3">
                  <div className="font-medium text-gray-800">
                    {detail.orderable.project.title || detail.orderable.project.project_no}
                  </div>
                  {detail.orderable.project.description && (
                    <p className="mt-2 text-xs text-gray-500">{detail.orderable.project.description}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
