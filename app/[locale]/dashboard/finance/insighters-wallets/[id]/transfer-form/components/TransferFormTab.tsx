'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { getAuthToken } from '@/lib/authToken';
import { useToast } from '@/components/toast/ToastContext';
import { buildAuthHeaders, parseApiError } from '../../../../../_config/api';
import SendEmailModal from './SendEmailModal';
import type { TransferFormRecord, TransferFormResponse } from './types';

const SECONDARY_BUTTON_CLASS =
  'h-8 rounded-md border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white';
const PRIMARY_BUTTON_CLASS =
  'h-8 rounded-md border border-blue-600 bg-blue-600 px-4 text-xs font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-50';

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

function InfoRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-md border border-slate-200 bg-white px-3 py-2">
      <div className="mt-0.5 text-slate-400">{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-semibold text-slate-500">{label}</div>
        <div className="mt-0.5 truncate text-xs font-semibold text-slate-900">{value || '-'}</div>
      </div>
    </div>
  );
}

function getFlagSrc(flag: string | null | undefined): string | null {
  const f = normalizeText(flag);
  if (!f) return null;
  return `/images/flags/${f}.svg`;
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

  const line = (label: string, value: string) =>
    `<div style="display:flex; gap:12px; padding:6px 0; border-bottom:1px solid #eef2f7;"><div style="width:190px; color:#64748b; font-weight:600; font-size:12px;">${escape(
      label,
    )}</div><div style="flex:1; color:#0f172a; font-weight:600; font-size:12px;">${escape(value || '-')}</div></div>`;

  const card = (title: string, body: string) =>
    `<div style="border:1px solid #e2e8f0; border-radius:10px; padding:14px; margin-top:12px;"><div style="font-size:14px; font-weight:800; color:#0f172a; margin-bottom:10px;">${escape(
      title,
    )}</div>${body}</div>`;

  const beneficiary =
    line('Name', form.user_name) +
    line('Email', form.user_email) +
    line('Dues', formatCurrency(form.user_balance)) +
    line('Account Name', form.account_name || '-') +
    line('Country of Residence', form.account_country?.name || '-') +
    line('Billing Address', form.account_address || '-') +
    line('Phone Number', formatPhone(form.account_phone_code, form.account_phone));

  const bank =
    line('Bank Name', form.bank_name || '-') +
    line('Bank Country', form.bank_country?.name || '-') +
    line('Bank Address', form.bank_address || '-') +
    line('IBAN Number', form.bank_iban || '-') +
    line('SWIFT Code', form.bank_swift_code || '-') +
    line('Status', form.status || '-');

  const now = new Date().toLocaleString();

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Transfer Form</title>
    <style>
      * { box-sizing: border-box; }
      body { font-family: Inter, -apple-system, system-ui, Arial; margin: 0; padding: 22px; color: #0f172a; }
      .header { display:flex; justify-content:space-between; align-items:flex-start; gap: 16px; }
      .title { font-size: 18px; font-weight: 900; }
      .muted { color: #64748b; font-size: 12px; font-weight: 600; margin-top: 6px; }
      @media print { body { padding: 0; } }
    </style>
  </head>
  <body>
    <div class="header">
      <div>
        <div class="title">Transfer Form</div>
        <div class="muted">Generated: ${escape(now)}</div>
      </div>
      <div class="muted">Insighta Admin</div>
    </div>
    ${card('Beneficiary Information', beneficiary)}
    ${card('Bank Information', bank)}
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

  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

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

  const accountFlag = getFlagSrc(form?.account_country?.flag);
  const bankFlag = getFlagSrc(form?.bank_country?.flag);

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
              Back
            </Link>
            <button type="button" onClick={fetchForm} className={SECONDARY_BUTTON_CLASS}>
              Refresh
            </button>
            <button type="button" onClick={onPrint} className={SECONDARY_BUTTON_CLASS} disabled={!form}>
              Print
            </button>
            <button type="button" onClick={onShareWhatsapp} className={SECONDARY_BUTTON_CLASS} disabled={!form}>
              Share WhatsApp
            </button>
            <button type="button" onClick={() => setEmailModalOpen(true)} className={PRIMARY_BUTTON_CLASS} disabled={!form}>
              Send to Email
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-md border border-slate-200 bg-white p-4 shadow-sm">
        {isLoading ? (
          <div className="py-10 text-center text-xs text-slate-500">Loading...</div>
        ) : error ? (
          <div className="py-10 text-center text-xs text-red-600">{error}</div>
        ) : !form ? (
          <div className="py-10 text-center text-xs text-slate-500">No transfer form found.</div>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-md border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-slate-500" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Beneficiary Information
                </div>
                <span className="rounded-full bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-700 ring-1 ring-slate-200">
                  {normalizeText(form.status) ? normalizeText(form.status) : 'unknown'}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2">
                <InfoRow
                  label="Name"
                  value={form.user_name}
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  }
                />
                <InfoRow
                  label="Email"
                  value={form.user_email}
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                      <path d="M4 4h16v16H4z" opacity="0" />
                      <path d="M4 6h16v12H4z" />
                      <path d="M4 7l8 6 8-6" />
                    </svg>
                  }
                />
                <InfoRow
                  label="Dues"
                  value={formatCurrency(form.user_balance)}
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                      <path d="M12 1v22" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  }
                />
                <InfoRow
                  label="Account Name"
                  value={form.account_name || '-'}
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6" />
                      <circle cx="8" cy="7" r="4" />
                      <path d="M20 8v6" />
                      <path d="M23 11h-6" />
                    </svg>
                  }
                />
                <InfoRow
                  label="Country of Residence"
                  value={form.account_country?.name || '-'}
                  icon={
                    accountFlag ? (
                      <img src={accountFlag} alt={form.account_country?.name ?? 'flag'} className="h-4 w-4 rounded-sm" />
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                        <path d="M4 22V4" />
                        <path d="M4 4h12l-1 4 1 4H4" />
                      </svg>
                    )
                  }
                />
                <InfoRow
                  label="Phone"
                  value={formatPhone(form.account_phone_code, form.account_phone)}
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.11 4.18 2 2 0 0 1 4.09 2h3a2 2 0 0 1 2 1.72c.12.81.3 1.6.54 2.36a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.72-1.72a2 2 0 0 1 2.11-.45c.76.24 1.55.42 2.36.54A2 2 0 0 1 22 16.92z" />
                    </svg>
                  }
                />
              </div>
            </div>

            <div className="rounded-md border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-slate-500" aria-hidden="true">
                  <path d="M3 10h18" />
                  <path d="M4 10V7l8-4 8 4v3" />
                  <path d="M6 10v10" />
                  <path d="M10 10v10" />
                  <path d="M14 10v10" />
                  <path d="M18 10v10" />
                  <path d="M4 20h16" />
                </svg>
                Bank Information
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2">
                <InfoRow
                  label="Bank Name"
                  value={form.bank_name || '-'}
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                      <path d="M3 10h18" />
                      <path d="M4 10V7l8-4 8 4v3" />
                      <path d="M6 10v10" />
                      <path d="M10 10v10" />
                      <path d="M14 10v10" />
                      <path d="M18 10v10" />
                      <path d="M4 20h16" />
                    </svg>
                  }
                />
                <InfoRow
                  label="Bank Country"
                  value={form.bank_country?.name || '-'}
                  icon={
                    bankFlag ? (
                      <img src={bankFlag} alt={form.bank_country?.name ?? 'flag'} className="h-4 w-4 rounded-sm" />
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                        <path d="M4 22V4" />
                        <path d="M4 4h12l-1 4 1 4H4" />
                      </svg>
                    )
                  }
                />
                <InfoRow
                  label="Bank Address"
                  value={form.bank_address || '-'}
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  }
                />
                <InfoRow
                  label="IBAN"
                  value={form.bank_iban || '-'}
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <path d="M14 2v6h6" />
                      <path d="M8 13h8" />
                      <path d="M8 17h8" />
                    </svg>
                  }
                />
                <InfoRow
                  label="SWIFT"
                  value={form.bank_swift_code || '-'}
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                    </svg>
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <SendEmailModal
        isOpen={emailModalOpen}
        defaultEmail={defaultEmail}
        isSending={sendingEmail}
        onClose={() => setEmailModalOpen(false)}
        onSend={onSendEmail}
      />
    </div>
  );
}
