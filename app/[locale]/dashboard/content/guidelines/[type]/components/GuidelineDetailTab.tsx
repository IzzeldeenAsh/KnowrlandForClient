'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { getAuthToken } from '@/lib/authToken';
import { useToast } from '@/components/toast/ToastContext';
import { buildAuthHeaders, parseApiError } from '../../../../_config/api';

type GuidelineType = { value: string; label: string };

type GuidelineDetail = {
  uuid: string;
  name: string;
  guideline: string;
  version: string;
  file: any;
  apply_at?: string;
};

const SECONDARY_BUTTON_CLASS =
  'h-8 rounded-md border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50';
const PRIMARY_BUTTON_CLASS =
  'h-8 rounded-md border border-blue-600 bg-blue-600 px-4 text-xs font-medium text-white shadow-sm shadow-gray-300 hover:bg-blue-700';
const INPUT_CLASS =
  'h-8 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400 focus:border-[1px]';

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function formatDateLocal(dateInput: string): string {
  const value = normalizeText(dateInput);
  if (!value) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function requiresIrreversibleConfirm(type: string): boolean {
  return ['insighter_agreement', 'company_agreement'].includes(type);
}

function extractFileLinks(fileValue: any): Array<{ label: string; href: string }> {
  if (!fileValue) return [];
  if (typeof fileValue === 'string') return [{ label: 'File', href: fileValue }];

  const links: Array<{ label: string; href: string }> = [];
  if (typeof fileValue === 'object') {
    const en = fileValue.en;
    const ar = fileValue.ar;
    if (typeof en === 'string' && en.trim()) links.push({ label: 'File (EN)', href: en });
    if (typeof ar === 'string' && ar.trim()) links.push({ label: 'File (AR)', href: ar });
  }
  return links;
}

function HtmlBlock({
  html,
  maxHeight = 420,
}: {
  html: string;
  maxHeight?: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    setExpanded(false);
  }, [html]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const check = () => {
      setHasOverflow(el.scrollHeight > maxHeight + 2);
    };
    check();
    const id = window.setTimeout(check, 0);
    return () => window.clearTimeout(id);
  }, [html, maxHeight]);

  return (
    <div>
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-4 text-sm text-slate-800"
        style={{ maxHeight: expanded ? 'none' : maxHeight }}
      >
        <div
          className="prose prose-slate max-w-none text-sm"
          dangerouslySetInnerHTML={{ __html: html || '' }}
        />
        {!expanded && hasOverflow ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        ) : null}
      </div>

      {hasOverflow ? (
        <div className="mt-2 flex justify-end">
          <button type="button" onClick={() => setExpanded((v) => !v)} className={SECONDARY_BUTTON_CLASS}>
            {expanded ? 'Show less' : 'Show more'}
          </button>
        </div>
      ) : null}
    </div>
  );
}

type AddVersionPayload = {
  nameEn: string;
  nameAr: string;
  guidelineEn: string;
  guidelineAr: string;
  version: string;
  applyAt: string;
};

function AddVersionModal({
  isOpen,
  type,
  submitError,
  isSubmitting,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  type: string;
  submitError: string;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (payload: AddVersionPayload) => void;
}) {
  const [form, setForm] = useState<AddVersionPayload>({
    nameEn: '',
    nameAr: '',
    guidelineEn: '',
    guidelineAr: '',
    version: '',
    applyAt: '',
  });
  const [localError, setLocalError] = useState('');
  const [previewEn, setPreviewEn] = useState(false);
  const [previewAr, setPreviewAr] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setForm({
      nameEn: '',
      nameAr: '',
      guidelineEn: '',
      guidelineAr: '',
      version: '',
      applyAt: '',
    });
    setLocalError('');
    setPreviewEn(false);
    setPreviewAr(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = (): string => {
    if (!normalizeText(form.nameEn)) return 'Name (English) is required.';
    if (!normalizeText(form.nameAr)) return 'Name (Arabic) is required.';
    if (!normalizeText(form.guidelineEn)) return 'Guideline (English) is required.';
    if (!normalizeText(form.guidelineAr)) return 'Guideline (Arabic) is required.';
    if (!normalizeText(form.version)) return 'Version is required.';
    if (!normalizeText(form.applyAt)) return 'Apply At is required.';
    return '';
  };

  const submit = () => {
    const error = validate();
    setLocalError(error);
    if (error) return;
    onSubmit({
      ...form,
      applyAt: formatDateLocal(form.applyAt),
      nameEn: normalizeText(form.nameEn),
      nameAr: normalizeText(form.nameAr),
      guidelineEn: String(form.guidelineEn ?? ''),
      guidelineAr: String(form.guidelineAr ?? ''),
      version: normalizeText(form.version),
    });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 px-4 py-8">
      <div className="w-full max-w-5xl rounded-md border border-slate-300 bg-white p-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-sm font-semibold text-slate-900">Add New Version</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        {requiresIrreversibleConfirm(type) ? (
          <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
            This action is irreversible. All insighters will receive an email with the new terms.
          </div>
        ) : null}

        <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
          <div className="rounded-md border border-slate-200 bg-white p-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold text-slate-700">English</div>
              <button type="button" onClick={() => setPreviewEn((v) => !v)} className={SECONDARY_BUTTON_CLASS}>
                {previewEn ? 'Edit' : 'Preview'}
              </button>
            </div>
            <div className="mt-2 space-y-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Name (English)</label>
                <input
                  value={form.nameEn}
                  onChange={(e) => setForm((p) => ({ ...p, nameEn: e.target.value }))}
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Guideline (English)</label>
                {previewEn ? (
                  <div className="rounded-md border border-slate-200 bg-white p-3">
                    <div className="prose prose-slate max-w-none text-sm" dangerouslySetInnerHTML={{ __html: form.guidelineEn || '' }} />
                  </div>
                ) : (
                  <textarea
                    value={form.guidelineEn}
                    onChange={(e) => setForm((p) => ({ ...p, guidelineEn: e.target.value }))}
                    rows={10}
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400"
                    placeholder="HTML content..."
                  />
                )}
              </div>
            </div>
          </div>

          <div className="rounded-md border border-slate-200 bg-white p-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold text-slate-700">العربية</div>
              <button type="button" onClick={() => setPreviewAr((v) => !v)} className={SECONDARY_BUTTON_CLASS}>
                {previewAr ? 'Edit' : 'Preview'}
              </button>
            </div>
            <div className="mt-2 space-y-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Name (Arabic)</label>
                <input
                  dir="rtl"
                  value={form.nameAr}
                  onChange={(e) => setForm((p) => ({ ...p, nameAr: e.target.value }))}
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Guideline (Arabic)</label>
                {previewAr ? (
                  <div className="rounded-md border border-slate-200 bg-white p-3" dir="rtl">
                    <div className="prose prose-slate max-w-none text-sm" dangerouslySetInnerHTML={{ __html: form.guidelineAr || '' }} />
                  </div>
                ) : (
                  <textarea
                    dir="rtl"
                    value={form.guidelineAr}
                    onChange={(e) => setForm((p) => ({ ...p, guidelineAr: e.target.value }))}
                    rows={10}
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400"
                    placeholder="HTML content..."
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Version</label>
            <input
              value={form.version}
              onChange={(e) => setForm((p) => ({ ...p, version: e.target.value }))}
              className={INPUT_CLASS}
              placeholder="e.g. 3.8"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Apply At</label>
            <input
              type="date"
              value={form.applyAt}
              onChange={(e) => setForm((p) => ({ ...p, applyAt: e.target.value }))}
              className={INPUT_CLASS}
            />
          </div>
        </div>

        {localError ? <p className="mt-3 text-xs text-red-600">{localError}</p> : null}
        {submitError ? <p className="mt-2 text-xs text-red-600">{submitError}</p> : null}

        <div className="mt-4 flex items-center justify-end gap-2">
          <button type="button" onClick={onClose} className={SECONDARY_BUTTON_CLASS}>
            Cancel
          </button>
          <button type="button" onClick={submit} disabled={isSubmitting} className={PRIMARY_BUTTON_CLASS}>
            {isSubmitting ? 'Creating...' : 'Create Version'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GuidelineDetailTab() {
  const locale = useLocale();
  const router = useRouter();
  const params = useParams<{ type: string }>();
  const type = useMemo(() => decodeURIComponent(String(params?.type ?? '')), [params]);

  const { handleServerErrors, success } = useToast();

  const [guidelineType, setGuidelineType] = useState<GuidelineType | null>(null);
  const [currentGuideline, setCurrentGuideline] = useState<GuidelineDetail | null>(null);
  const [lastGuideline, setLastGuideline] = useState<GuidelineDetail | null>(null);
  const [shouldShowLast, setShouldShowLast] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchDetail = useCallback(
    async (signal?: AbortSignal) => {
      if (!type) return;
      setIsLoading(true);
      setError('');

      try {
        const [typesRes, currentRes, lastRes] = await Promise.all([
          fetch('https://api.foresighta.co/api/common/setting/guideline/type', {
            method: 'GET',
            cache: 'no-store',
            signal,
            headers: { Accept: 'application/json', 'Accept-Language': 'en' },
          }),
          fetch(`https://api.foresighta.co/api/common/setting/guideline/type/current/${encodeURIComponent(type)}`, {
            method: 'GET',
            cache: 'no-store',
            signal,
            headers: { Accept: 'application/json', 'Accept-Language': 'en' },
          }),
          fetch(`https://api.foresighta.co/api/common/setting/guideline/type/last/${encodeURIComponent(type)}`, {
            method: 'GET',
            cache: 'no-store',
            signal,
            headers: { Accept: 'application/json', 'Accept-Language': 'en' },
          }),
        ]);

        if (!typesRes.ok) throw await parseApiError(typesRes);
        if (!currentRes.ok) throw await parseApiError(currentRes);
        if (!lastRes.ok) throw await parseApiError(lastRes);

        const typesPayload = (await typesRes.json()) as GuidelineType[];
        const currentPayload = (await currentRes.json()) as { data?: GuidelineDetail };
        const lastPayload = (await lastRes.json()) as { data?: GuidelineDetail };

        const current = currentPayload?.data ?? null;
        const last = lastPayload?.data ?? null;

        setGuidelineType(typesPayload.find((t) => t.value === type) ?? null);
        setCurrentGuideline(current);
        setLastGuideline(last);
        setShouldShowLast(Boolean(current && last && current.version !== last.version));
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') return;
        handleServerErrors(requestError);
        const message =
          requestError && typeof requestError === 'object' && 'message' in requestError
            ? String((requestError as { message?: unknown }).message ?? 'Unable to load guideline details right now.')
            : requestError instanceof Error
              ? requestError.message
              : 'Unable to load guideline details right now.';
        setError(message);
        setGuidelineType(null);
        setCurrentGuideline(null);
        setLastGuideline(null);
        setShouldShowLast(false);
      } finally {
        setIsLoading(false);
      }
    },
    [handleServerErrors, type],
  );

  useEffect(() => {
    const controller = new AbortController();
    void fetchDetail(controller.signal);
    return () => controller.abort();
  }, [fetchDetail]);

  const openModal = () => {
    setModalOpen(true);
    setSubmitError('');
    setIsSubmitting(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSubmitError('');
    setIsSubmitting(false);
  };

  const createVersion = async (payload: AddVersionPayload) => {
    setSubmitError('');

    if (requiresIrreversibleConfirm(type)) {
      const ok = window.confirm(
        'This action is irreversible. All insighters will receive an email with the new terms. Do you want to continue?',
      );
      if (!ok) return;
    }

    setIsSubmitting(true);

    try {
      const token = getAuthToken();
      if (!token) {
        setSubmitError('Missing auth token. Please sign in again.');
        setIsSubmitting(false);
        return;
      }

      const formData = new FormData();
      formData.append('name[en]', payload.nameEn);
      formData.append('name[ar]', payload.nameAr);
      formData.append('type', type);
      formData.append('guideline[en]', payload.guidelineEn);
      formData.append('guideline[ar]', payload.guidelineAr);
      formData.append('version', payload.version);
      formData.append('apply_at', payload.applyAt);

      const headers = {
        Accept: 'application/json',
        'Accept-Language': 'en',
        Authorization: buildAuthHeaders(token).Authorization,
        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      } as Record<string, string>;

      const response = await fetch('https://api.foresighta.co/api/admin/setting/guideline', {
        method: 'POST',
        cache: 'no-store',
        headers,
        body: formData,
      });

      if (!response.ok) throw await parseApiError(response);

      success('New version created successfully.', '', 3500);
      closeModal();
      const controller = new AbortController();
      void fetchDetail(controller.signal);
    } catch (requestError) {
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to create version right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to create version right now.';
      setSubmitError(message);
      setIsSubmitting(false);
    }
  };

  const title = guidelineType?.label || type || 'Guideline';
  const currentFiles = extractFileLinks(currentGuideline?.file);
  const lastFiles = extractFileLinks(lastGuideline?.file);

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col">
          <h2 className="text-md font-semibold text-slate-900">Guideline Detail</h2>
          <p className="text-xs font-light text-slate-500 ps-1">{title}</p>
        </div>

        <div className="flex gap-2">
          <button type="button" onClick={openModal} className={PRIMARY_BUTTON_CLASS}>
            Add New Version
          </button>
          <button
            type="button"
            onClick={() => router.push(`/${locale}/dashboard/content/guidelines`)}
            className={SECONDARY_BUTTON_CLASS}
          >
            Back
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="mt-4 rounded-md border border-slate-200 bg-white p-6 text-center text-xs text-slate-500 shadow-sm">
          Loading...
        </div>
      ) : error ? (
        <div className="mt-4 rounded-md border border-slate-200 bg-white p-6 text-center text-xs text-red-600 shadow-sm">
          {error}
        </div>
      ) : !currentGuideline ? (
        <div className="mt-4 rounded-md border border-slate-200 bg-white p-6 text-center text-xs text-slate-500 shadow-sm">
          No guideline found for this type.
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          <div className="rounded-md border border-emerald-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-sm font-semibold text-slate-900">{currentGuideline.name}</div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
                  Active v{currentGuideline.version}
                </span>
                {currentGuideline.apply_at ? (
                  <span className="text-[11px] text-slate-500">Apply at: {normalizeText(currentGuideline.apply_at)}</span>
                ) : null}
              </div>
            </div>

            {currentFiles.length ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {currentFiles.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-medium text-blue-700 hover:underline"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}

            <div className="mt-3">
              <HtmlBlock html={currentGuideline.guideline} />
            </div>
          </div>

          {shouldShowLast && lastGuideline ? (
            <div className="rounded-md border border-amber-200 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm font-semibold text-slate-900">{lastGuideline.name}</div>
                <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 ring-1 ring-amber-200">
                  Previous v{lastGuideline.version}
                </span>
              </div>

              {lastFiles.length ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {lastFiles.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-medium text-blue-700 hover:underline"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}

              <div className="mt-3">
                <HtmlBlock html={lastGuideline.guideline} />
              </div>
            </div>
          ) : null}
        </div>
      )}

      <AddVersionModal
        isOpen={modalOpen}
        type={type}
        submitError={submitError}
        isSubmitting={isSubmitting}
        onClose={closeModal}
        onSubmit={createVersion}
      />
    </div>
  );
}

