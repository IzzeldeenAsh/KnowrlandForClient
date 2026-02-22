'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  IconArrowLeft,
  IconAt,
  IconBrandWhatsapp,
  IconBuildingBank,
  IconFileText,
  IconMail,
  IconPrinter,
  IconUser,
} from '@tabler/icons-react';
import { getAuthToken } from '@/lib/authToken';
import { useToast } from '@/components/toast/ToastContext';
import { buildAuthHeaders, parseApiError } from '../../../../../_config/api';
import ReceiptsListTab from './ReceiptsListTab';
import RecordReceiptModal, { type ReceiptFormValues } from './RecordReceiptModal';
import SendEmailModal from './SendEmailModal';
import type { TransferFormRecord, TransferFormResponse } from './types';

const SECONDARY_BUTTON_CLASS =
  'inline-flex h-8 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-xs font-medium leading-none text-slate-700 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white';
const PRIMARY_BUTTON_CLASS =
  'inline-flex h-8 items-center justify-center gap-2 rounded-md border border-blue-600 bg-blue-600 px-4 text-xs font-medium leading-none text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50';

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function formatCurrency(amount: number): string {
  const safe = Number.isFinite(amount) ? amount : 0;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(safe);
}

function formatPhone(code: string | null, phone: string | null): string {
  const c = normalizeText(code);
  const p = normalizeText(phone);
  if (!c && !p) return '-';
  if (c && p) return `+${c} ${p}`;
  return c ? `+${c}` : p;
}

function DetailsRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[200px,1fr] sm:gap-6">
      <div className="text-sm font-extrabold text-slate-900">{label}</div>
      <div className="break-words text-sm font-semibold text-slate-900">{value || '-'}</div>
    </div>
  );
}

function DetailsSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center gap-2 bg-blue-50 px-6 py-5 text-lg font-extrabold text-blue-600">
        <span className="text-slate-900/80">{icon}</span>
        <span>{title}</span>
      </div>
      <div className="divide-y divide-slate-100 px-6">{children}</div>
    </section>
  );
}

function generateWhatsappMessage(form: TransferFormRecord): string {
  return `Transfer Form - Insighta

Beneficiary Information:
Name: ${form.user_name}
Email: ${form.user_email}
Dues: ${formatCurrency(form.user_balance)}

Account Details:
Account Name: ${form.account_name || 'Not provided'}
Country of Residence: ${form.account_country?.name || 'Not provided'}
${form.account_address ? `Billing Address: ${form.account_address}` : ''}
${form.account_phone_code && form.account_phone ? `Phone Number: +${form.account_phone_code} ${form.account_phone}` : ''}

Bank Information:
Bank Name: ${form.bank_name || 'Not provided'}
Bank Country: ${form.bank_country?.name || 'Not provided'}
${form.bank_address ? `Bank Address: ${form.bank_address}` : ''}
IBAN Number: ${form.bank_iban || 'Not provided'}
SWIFT Code: ${form.bank_swift_code || 'Not provided'}
`;
}

function renderPrintHtml(form: TransferFormRecord): string {
  const escape = (value: unknown) =>
    String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');

  const kv = (label: string, value: string) =>
    `<div class="kv-row"><div class="kv-label">${escape(label)}</div><div class="kv-value">${escape(value || '-')}</div></div>`;

  const section = (title: string, icon: string, body: string) =>
    `<section class="card"><div class="card-header"><span class="card-icon" aria-hidden="true">${icon}</span><div class="card-title">${escape(
      title,
    )}</div></div><div class="card-body">${body}</div></section>`;

  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const beneficiaryBody =
    kv('Account Name', form.account_name || '-') +
    kv('Country of Residence', form.account_country?.name || '-') +
    (normalizeText(form.account_address) ? kv('Billing Address', form.account_address || '-') : '') +
    kv('Phone Number', formatPhone(form.account_phone_code, form.account_phone));

  const bankBody =
    kv('Bank Name', form.bank_name || '-') +
    kv('Bank Country', form.bank_country?.name || '-') +
    (normalizeText(form.bank_address) ? kv('Bank Address', form.bank_address || '-') : '') +
    kv('IBAN Number', form.bank_iban || '-') +
    kv('SWIFT Code', form.bank_swift_code || '-');

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Payout Details</title>
    <style>
      @page { size: A4; margin: 0; }
      * { box-sizing: border-box; }
      html, body { height: 100%; }
      body {
        margin: 0;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, "Noto Sans", "Liberation Sans", sans-serif;
        color: #0f172a;
        background: #f8fafc;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      a, a:visited { color: inherit !important; text-decoration: none !important; }
      a[href]:after { content: "" !important; }

      .page {
        width: 210mm;
        min-height: 297mm;
        margin: 12mm auto;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 14px;
        padding: 18mm 16mm;
        box-shadow: 0 16px 48px rgba(15, 23, 42, 0.08);
      }

      .header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
      .brand { display: flex; align-items: center; gap: 14px; min-width: 0; }
      .logo { width: 44px; height: 44px; object-fit: contain; }
      .heading { min-width: 0; }
      .title { font-size: 28px; font-weight: 900; letter-spacing: -0.02em; margin: 0; }
      .subtitle { font-size: 14px; font-weight: 600; color: #475569; margin-top: 6px; }
      .date { font-size: 14px; font-weight: 700; color: #0f172a; white-space: nowrap; }
      .rule { height: 1px; background: #e2e8f0; margin: 16px 0 18px; }

      .top {
        display: grid;
        grid-template-columns: 1fr 220px;
        gap: 22px;
        align-items: start;
      }
      .identity { min-width: 0; }
      .name-line { display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px; }
      .name { font-size: 26px; font-weight: 900; letter-spacing: -0.02em; margin: 0; }
      .role { font-size: 14px; font-weight: 700; color: #16a34a; }
      .email { margin-top: 10px; display: flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 700; color: #0f172a; }
      .email-icon { width: 18px; height: 18px; color: #0f172a; opacity: 0.75; }

      .dues {
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 18px 16px;
        background: #ffffff;
      }
      .dues-amount { font-size: 32px; font-weight: 900; letter-spacing: -0.02em; margin: 0; }
      .dues-label { margin-top: 10px; font-size: 14px; font-weight: 700; color: #0f172a; opacity: 0.9; }

      .card {
        border: 1px solid #e2e8f0;
        border-radius: 14px;
        overflow: hidden;
        margin-top: 18px;
        break-inside: avoid;
      }
      .card-header {
        padding: 18px 18px;
        display: flex;
        align-items: center;
        gap: 10px;
        color: #2563eb;
        font-weight: 900;
        font-size: 18px;
        background: #eff6ff;
      }
      .card-icon { width: 22px; height: 22px; display: inline-flex; }
      .card-title { line-height: 1.1; }
      .card-body { border-top: 1px solid #e2e8f0; padding: 18px; }

      .kv-row {
        display: grid;
        grid-template-columns: 190px 1fr;
        gap: 18px;
        padding: 14px 0;
      }
      .kv-row + .kv-row { border-top: 1px solid #eef2f7; }
      .kv-label { font-size: 16px; font-weight: 800; color: #0f172a; }
      .kv-value {
        font-size: 16px;
        font-weight: 600;
        color: #0f172a;
        word-break: break-word;
      }

      @media print {
        body { background: #ffffff; }
        .page {
          width: auto;
          min-height: auto;
          margin: 0;
          padding: 18mm 16mm;
          border: 0;
          border-radius: 0;
          box-shadow: none;
        }
      }

      @media (max-width: 720px) {
        .page { width: auto; min-height: auto; margin: 0; border-radius: 0; padding: 18px 16px; }
        .top { grid-template-columns: 1fr; }
      }
    </style>
  </head>
  <body>
	    <div class="page">
	      <div class="header">
	        <div class="brand">
	          <img class="logo" alt="Insighta" src="https://app.insightabusiness.com/assets/media/logos/custom-2.svg" />
	          <div class="heading">
	            <h1 class="title">Payout Details</h1>
	            <div class="subtitle">Beneficiary &amp; Bank Information</div>
	          </div>
	        </div>
        <div class="date">Date: ${escape(date)}</div>
      </div>

      <div class="rule"></div>

      <div class="top">
        <div class="identity">
          <div class="name-line">
            <p class="name">${escape(form.user_name || '-')}</p>
            <span class="role">Insighter</span>
          </div>
          <div class="email">
            <svg class="email-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M4 6h16v12H4z" />
              <path d="M4 7l8 6 8-6" />
            </svg>
            <span>${escape(form.user_email || '-')}</span>
          </div>
        </div>

        <div class="dues">
          <p class="dues-amount">${escape(formatCurrency(form.user_balance))}</p>
          <div class="dues-label">Dues</div>
        </div>
      </div>

      ${section(
        'Beneficiary Information',
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
        beneficiaryBody,
      )}
      ${section(
        'Bank Information',
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 10h18"></path><path d="M4 10V7l8-4 8 4v3"></path><path d="M6 10v10"></path><path d="M10 10v10"></path><path d="M14 10v10"></path><path d="M18 10v10"></path><path d="M4 20h16"></path></svg>`,
        bankBody,
      )}
    </div>
    <script>
      window.onload = () => { window.print(); setTimeout(() => window.close(), 200); };
    </script>
  </body>
</html>`;
}

export default function TransferFormTab({ insighterId }: { insighterId: string }) {
  const { handleServerErrors, success } = useToast();
  const params = useParams<{ locale?: string }>();
  const locale = typeof params?.locale === 'string' ? params.locale : 'en';
  const backHref = `/${locale}/dashboard/finance/insighters-wallets`;

  const [form, setForm] = useState<TransferFormRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState<'form' | 'receipts'>('form');
  const [receiptsRefreshKey, setReceiptsRefreshKey] = useState(0);

  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [savingReceipt, setSavingReceipt] = useState(false);
  const [receiptError, setReceiptError] = useState('');

  const currentAbort = useRef<AbortController | null>(null);

  const fetchForm = useCallback(async () => {
    currentAbort.current?.abort();
    const controller = new AbortController();
    currentAbort.current = controller;

    setIsLoading(true);
    setError('');
    try {
      const token = getAuthToken();
      if (!token) {
        setForm(null);
        setError('Missing auth token. Please sign in again.');
        return;
      }

      const response = await fetch(`https://api.insightabusiness.com/api/admin/fund/insighter/payment/manual/${insighterId}`, {
        method: 'GET',
        cache: 'no-store',
        signal: controller.signal,
        headers: buildAuthHeaders(token),
      });
      if (!response.ok) throw await parseApiError(response);

      const payload = (await response.json()) as TransferFormResponse;
      const record = Array.isArray(payload.data) ? payload.data[0] : null;
      setForm(record ?? null);
    } catch (requestError) {
      if (requestError instanceof DOMException && requestError.name === 'AbortError') return;
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to load transfer form right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to load transfer form right now.';
      setError(message);
      setForm(null);
    } finally {
      setIsLoading(false);
    }
  }, [handleServerErrors, insighterId]);

  useEffect(() => {
    void fetchForm();
  }, [fetchForm]);

  const defaultEmail = useMemo(() => normalizeText(form?.user_email) || '', [form?.user_email]);
  const formattedDate = useMemo(
    () =>
      new Date().toLocaleDateString(locale === 'ar' ? 'ar' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    [locale],
  );

  const onPrint = () => {
    if (!form) return;
    const win = window.open('', '_blank', 'width=900,height=700');
    if (!win) return;
    win.document.open();
    win.document.write(renderPrintHtml(form));
    win.document.close();
  };

  const onShareWhatsapp = () => {
    if (!form) return;
    const message = generateWhatsappMessage(form);
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const onSendEmail = async (email: string) => {
    const trimmed = email.trim();
    if (!trimmed) return;

    setSendingEmail(true);
    try {
      const token = getAuthToken();
      if (!token) {
        setSendingEmail(false);
        return;
      }

      const response = await fetch(`https://api.insightabusiness.com/api/admin/fund/insighter/send/transfer-form-email/${insighterId}`, {
        method: 'POST',
        cache: 'no-store',
        headers: buildAuthHeaders(token),
        body: JSON.stringify({ email: trimmed }),
      });
      if (!response.ok) throw await parseApiError(response);
      success('Transfer form sent successfully', 'Success', 6000);
      setEmailModalOpen(false);
    } catch (requestError) {
      handleServerErrors(requestError);
    } finally {
      setSendingEmail(false);
    }
  };

  const onSaveReceipt = async (values: ReceiptFormValues) => {
    setReceiptError('');

    const receiptNo = values.receiptNo.trim();
    const receiptDate = values.receiptDate.trim();
    const amount = values.amount.trim();
    const file = values.receiptFile;

    if (!receiptNo || !receiptDate || !amount || !file) return;

    setSavingReceipt(true);
    try {
      const token = getAuthToken();
      if (!token) {
        setReceiptError('Missing auth token. Please sign in again.');
        setSavingReceipt(false);
        return;
      }

      const formData = new FormData();
      formData.append('receipt_no', receiptNo);
      formData.append('receipt_date', receiptDate);
      formData.append('amount', amount);
      formData.append('receipt', file);

      const headers = {
        Accept: 'application/json',
        'Accept-Language': locale || 'en',
        Authorization: buildAuthHeaders(token, locale).Authorization,
        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      } as Record<string, string>;

      const response = await fetch(`https://api.insightabusiness.com/api/admin/fund/insighter/wired-transfer/store/${insighterId}`, {
        method: 'POST',
        cache: 'no-store',
        headers,
        body: formData,
      });

      if (!response.ok) throw await parseApiError(response);

      success('Receipt recorded successfully', 'Success', 6000);
      setReceiptModalOpen(false);
      setReceiptsRefreshKey((prev) => prev + 1);
      void fetchForm();
    } catch (requestError) {
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to record receipt right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to record receipt right now.';
      setReceiptError(message);
    } finally {
      setSavingReceipt(false);
    }
  };

  return (
    <div className="mt-4">
      <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="text-md font-semibold text-slate-900">Transfer Form</div>
            <div className="mt-0.5 text-xs text-slate-500">Insighter ID: {insighterId}</div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link href={backHref} className={SECONDARY_BUTTON_CLASS}>
              <IconArrowLeft size={14} />
              Back
            </Link>
            <button type="button" onClick={onPrint} className={SECONDARY_BUTTON_CLASS} disabled={!form}>
              <IconPrinter size={14} />
              Print
            </button>
            <button type="button" onClick={onShareWhatsapp} className={SECONDARY_BUTTON_CLASS} disabled={!form}>
              <IconBrandWhatsapp size={14} />
              Share WhatsApp
            </button>
            <button
              type="button"
              onClick={() => {
                setReceiptError('');
                setReceiptModalOpen(true);
              }}
              className={SECONDARY_BUTTON_CLASS}
              disabled={!form}
            >
              <IconFileText size={14} />
              Record Receipt
            </button>
            <button type="button" onClick={() => setEmailModalOpen(true)} className={PRIMARY_BUTTON_CLASS} disabled={!form}>
              <IconMail size={14} />
              Send to Email
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('form')}
          className={[
            'inline-flex h-8 items-center rounded-md border px-3 text-xs font-medium shadow-sm',
            activeTab === 'form'
              ? 'border-blue-600 bg-blue-600 text-white'
              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
          ].join(' ')}
        >
          Transfer Form
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('receipts')}
          className={[
            'inline-flex h-8 items-center rounded-md border px-3 text-xs font-medium shadow-sm',
            activeTab === 'receipts'
              ? 'border-blue-600 bg-blue-600 text-white'
              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
          ].join(' ')}
        >
          Reciepts List
        </button>
      </div>

      {activeTab === 'form' ? (
        <div className="mt-4 rounded-md border border-slate-200 bg-white p-4 shadow-sm">
          {isLoading ? (
            <div className="py-10 text-center text-xs text-slate-500">Loading...</div>
          ) : error ? (
            <div className="py-10 text-center text-xs text-red-600">{error}</div>
          ) : !form ? (
            <div className="py-10 text-center text-xs text-slate-500">No transfer form found.</div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start justify-between gap-6">
                <div className="flex min-w-0 items-start gap-4">
                  <img
                    src="https://app.insightabusiness.com/assets/media/logos/custom-2.svg"
                    alt="Insighta"
                    className="h-11 w-11 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-3xl font-black tracking-tight text-slate-900">Payout Details</div>
                    <div className="mt-1 text-sm font-semibold text-slate-600">Beneficiary &amp; Bank Information</div>
                  </div>
                </div>
                <div className="shrink-0 text-sm font-semibold text-slate-900">Date: {formattedDate}</div>
              </div>

              <div className="mt-6 h-px bg-slate-200" />

              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr,240px] lg:items-start">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <div className="text-3xl font-black tracking-tight text-slate-900">{form.user_name || '-'}</div>
                    <div className="text-sm font-bold text-green-600">Insighter</div>
                    <span className="rounded-full bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200">
                      {normalizeText(form.status) ? normalizeText(form.status) : 'unknown'}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <IconAt size={18} className="text-slate-900/70" />
                    <span className="break-all">{form.user_email || '-'}</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="text-4xl font-black tracking-tight text-slate-900">
                    {formatCurrency(form.user_balance)}
                  </div>
                  <div className="mt-2 text-sm font-bold text-slate-900/90">Dues</div>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                <DetailsSection title="Beneficiary Information" icon={<IconUser size={20} />}>
                  <DetailsRow label="Account Name" value={form.account_name || '-'} />
                  <DetailsRow label="Country of Residence" value={form.account_country?.name || '-'} />
                  {normalizeText(form.account_address) ? (
                    <DetailsRow label="Billing Address" value={form.account_address || '-'} />
                  ) : null}
                  <DetailsRow label="Phone Number" value={formatPhone(form.account_phone_code, form.account_phone)} />
                </DetailsSection>

                <DetailsSection title="Bank Information" icon={<IconBuildingBank size={20} />}>
                  <DetailsRow label="Bank Name" value={form.bank_name || '-'} />
                  <DetailsRow label="Bank Country" value={form.bank_country?.name || '-'} />
                  {normalizeText(form.bank_address) ? <DetailsRow label="Bank Address" value={form.bank_address || '-'} /> : null}
                  <DetailsRow label="IBAN Number" value={form.bank_iban || '-'} />
                  <DetailsRow label="SWIFT Code" value={form.bank_swift_code || '-'} />
                </DetailsSection>
              </div>
            </div>
          )}
        </div>
      ) : (
        <ReceiptsListTab insighterId={insighterId} locale={locale} refreshKey={receiptsRefreshKey} />
      )}

      <SendEmailModal
        isOpen={emailModalOpen}
        defaultEmail={defaultEmail}
        isSending={sendingEmail}
        onClose={() => setEmailModalOpen(false)}
        onSend={onSendEmail}
      />

      <RecordReceiptModal
        isOpen={receiptModalOpen}
        isSaving={savingReceipt}
        error={receiptError}
        onClose={() => setReceiptModalOpen(false)}
        onSave={onSaveReceipt}
      />
    </div>
  );
}
