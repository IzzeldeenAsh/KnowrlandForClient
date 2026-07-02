'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { getAuthToken } from '@/lib/authToken';
import { useToast } from '@/components/toast/ToastContext';
import { buildAuthHeaders, parseApiError } from '../../../_config/api';
import HsCodeUpsertModal, { HsCodeRecord, HsCodeUpsertPayload, IsicTreeNode, HsStatus } from './HsCodeUpsertModal';

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
const PRIMARY_BUTTON_CLASS =
  'h-8 rounded-md border border-blue-600 bg-blue-600 px-4 text-xs font-medium text-white shadow-sm shadow-gray-300 hover:bg-blue-700';
const SECONDARY_BUTTON_CLASS =
  'h-8 rounded-md border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50';
const ROW_ACTION_BUTTON_CLASS =
  'rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] font-medium text-slate-700 shadow-sm hover:bg-slate-50';

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function getStatusBadgeClass(status: string): string {
  const normalized = status.toLowerCase();
  if (normalized === 'active') return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
  if (normalized === 'inactive') return 'bg-red-50 text-red-700 ring-1 ring-red-200';
  return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200';
}

type HsCodeListResponse = { data?: HsCodeRecord[] };

function buildIsicOptions(nodes: IsicTreeNode[]): Array<{ value: number; label: string }> {
  const options: Array<{ value: number; label: string }> = [];

  const walk = (list: IsicTreeNode[], depth: number) => {
    for (const node of list) {
      const id = Number(node.data?.key ?? node.key);
      if (!Number.isFinite(id) || id <= 0) continue;

      const labelRaw = normalizeText(node.label) || normalizeText(node.data?.label) || `#${id}`;
      const prefix = depth > 0 ? `${'—'.repeat(Math.min(4, depth))} ` : '';
      options.push({ value: id, label: `${prefix}${labelRaw}` });

      if (Array.isArray(node.children) && node.children.length > 0) {
        walk(node.children, depth + 1);
      }
    }
  };

  walk(nodes, 0);
  return options;
}

export default function HsCodesTab() {
  const { handleServerErrors, success } = useToast();

  const [hsCodes, setHsCodes] = useState<HsCodeRecord[]>([]);
  const [isicTree, setIsicTree] = useState<IsicTreeNode[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [searchInput, setSearchInput] = useState<string>('');

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedHsCode, setSelectedHsCode] = useState<HsCodeRecord | null>(null);
  const [submitError, setSubmitError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isicOptions = useMemo(() => buildIsicOptions(isicTree), [isicTree]);

  const fetchIsicParents = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await fetch('https://api.foresighta.co/api/common/setting/isic-code/tree/parent', {
        method: 'GET',
        cache: 'no-store',
        signal,
        headers: {
          Accept: 'application/json',
          'Accept-Language': 'en',
        },
      });

      if (!response.ok) {
        throw await parseApiError(response);
      }

      const payload = (await response.json()) as unknown;
      setIsicTree(Array.isArray(payload) ? (payload as IsicTreeNode[]) : []);
    } catch {
      setIsicTree([]);
    }
  }, []);

  const fetchHsCodes = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://api.foresighta.co/api/common/setting/hs-code/list', {
        method: 'GET',
        cache: 'no-store',
        signal,
        headers: {
          Accept: 'application/json',
          'Accept-Language': 'en',
        },
      });

      if (!response.ok) {
        throw await parseApiError(response);
      }

      const payload = (await response.json()) as HsCodeListResponse;
      setHsCodes(Array.isArray(payload.data) ? payload.data : []);
    } catch (requestError) {
      if (requestError instanceof DOMException && requestError.name === 'AbortError') return;
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to load HS codes right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to load HS codes right now.';
      setError(message);
      setHsCodes([]);
    } finally {
      setIsLoading(false);
    }
  }, [handleServerErrors]);

  useEffect(() => {
    const controller = new AbortController();
    void fetchIsicParents(controller.signal);
    return () => controller.abort();
  }, [fetchIsicParents]);

  useEffect(() => {
    const controller = new AbortController();
    void fetchHsCodes(controller.signal);
    return () => controller.abort();
  }, [fetchHsCodes]);

  const filtered = useMemo(() => {
    const q = searchInput.trim().toLowerCase();
    if (!q) return hsCodes;
    return hsCodes.filter((row) => {
      const combined = [row.id, row.code, row.names?.en, row.names?.ar, row.status]
        .map((v) => String(v ?? ''))
        .join(' ')
        .toLowerCase();
      return combined.includes(q);
    });
  }, [hsCodes, searchInput]);

  const openCreate = () => {
    setModalMode('create');
    setSelectedHsCode(null);
    setSubmitError('');
    setIsSubmitting(false);
    setModalOpen(true);
  };

  const openEdit = (record: HsCodeRecord) => {
    setModalMode('edit');
    setSelectedHsCode(record);
    setSubmitError('');
    setIsSubmitting(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedHsCode(null);
    setSubmitError('');
    setIsSubmitting(false);
  };

  const submitUpsert = async (payload: HsCodeUpsertPayload) => {
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const token = getAuthToken();
      if (!token) {
        setSubmitError('Missing auth token. Please sign in again.');
        setIsSubmitting(false);
        return;
      }

      const url =
        modalMode === 'create'
          ? 'https://api.foresighta.co/api/admin/setting/hs-code'
          : `https://api.foresighta.co/api/admin/setting/hs-code/${selectedHsCode?.id ?? ''}`;

      const response = await fetch(url, {
        method: modalMode === 'create' ? 'POST' : 'PUT',
        cache: 'no-store',
        headers: buildAuthHeaders(token),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw await parseApiError(response);
      }

      success(modalMode === 'create' ? 'HSCode created.' : 'HSCode updated.', '', 3500);
      closeModal();
      const controller = new AbortController();
      void fetchHsCodes(controller.signal);
    } catch (requestError) {
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to save HSCode right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to save HSCode right now.';
      setSubmitError(message);
      setIsSubmitting(false);
    }
  };

  const deleteHsCode = async (id: number, label: string) => {
    const ok = window.confirm(`Delete HSCode "${label}"? This action cannot be undone.`);
    if (!ok) return;

    setSubmitError('');
    setIsSubmitting(true);

    try {
      const token = getAuthToken();
      if (!token) {
        setSubmitError('Missing auth token. Please sign in again.');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(`https://api.foresighta.co/api/admin/setting/hs-code/${id}`, {
        method: 'DELETE',
        cache: 'no-store',
        headers: buildAuthHeaders(token),
      });

      if (!response.ok) {
        throw await parseApiError(response);
      }

      success('HSCode deleted.', '', 3500);
      setHsCodes((prev) => prev.filter((row) => row.id !== id));
      setIsSubmitting(false);
    } catch (requestError) {
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to delete HSCode right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to delete HSCode right now.';
      setSubmitError(message);
      setIsSubmitting(false);
    }
  };

  const modalTitle = modalMode === 'create' ? 'Add HSCode' : `Edit HSCode #${selectedHsCode?.id ?? ''}`;
  const modalInitial = {
    en: normalizeText(selectedHsCode?.names?.en),
    ar: normalizeText(selectedHsCode?.names?.ar),
    code: normalizeText(selectedHsCode?.code),
    status: (normalizeText(selectedHsCode?.status).toLowerCase() === 'inactive' ? 'inactive' : 'active') as HsStatus,
    isicCodeId: selectedHsCode?.isic_code_id ?? 0,
  };

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col">
          <h2 className="text-md font-semibold text-slate-900">Products (HS Codes)</h2>
          <p className="text-xs font-light text-slate-500 ps-1">total products: {filtered.length}</p>
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
              placeholder="Search products..."
              className={INPUT_WITH_ICON_CLASS}
            />
          </div>

          <button type="button" onClick={openCreate} className={PRIMARY_BUTTON_CLASS}>
            Create
          </button>
        </div>
      </div>

      {submitError ? <p className="mt-2 text-xs text-red-600">{submitError}</p> : null}

      <div className="mt-4 overflow-x-auto rounded-md border border-slate-200 bg-white shadow-sm">
        <table className="min-w-[860px] w-full border-collapse text-xs text-slate-700">
          <thead className="bg-slate-50 text-[11px] font-semibold uppercase text-slate-500">
            <tr>
              <th className="w-[180px] border-b border-slate-200 px-3 py-2 text-left">Code</th>
              <th className="border-b border-slate-200 px-3 py-2 text-left">Name (English)</th>
              <th className="border-b border-slate-200 px-3 py-2 text-left">Name (Arabic)</th>
              <th className="w-[140px] border-b border-slate-200 px-3 py-2 text-left">Status</th>
              <th className="w-[160px] border-b border-slate-200 px-3 py-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-xs text-slate-500">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-xs text-red-600">
                  {error}
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-xs text-slate-500">
                  No Available Data
                </td>
              </tr>
            ) : (
              filtered.map((row) => {
                const status = normalizeText(row.status) || 'unknown';
                return (
                  <tr key={row.id} className="odd:bg-white even:bg-slate-50/50">
                    <td className="border-b border-slate-100 px-3 py-2 font-medium text-slate-900">{normalizeText(row.code) || '-'}</td>
                    <td className="border-b border-slate-100 px-3 py-2">{normalizeText(row.names?.en) || '-'}</td>
                    <td className="border-b border-slate-100 px-3 py-2">{normalizeText(row.names?.ar) || '-'}</td>
                    <td className="whitespace-nowrap border-b border-slate-100 px-3 py-2">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${getStatusBadgeClass(status)}`}>
                        {status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap border-b border-slate-100 px-3 py-2">
                      <div className="flex items-center justify-end gap-2">
                        <button type="button" onClick={() => openEdit(row)} className={ROW_ACTION_BUTTON_CLASS}>
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteHsCode(row.id, normalizeText(row.code) || `#${row.id}`)}
                          disabled={isSubmitting}
                          className={ROW_ACTION_BUTTON_CLASS}
                        >
                          Delete
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

      <HsCodeUpsertModal
        isOpen={modalOpen}
        mode={modalMode}
        title={modalTitle}
        initial={modalMode === 'create' ? { en: '', ar: '', code: '', status: 'active', isicCodeId: 0 } : modalInitial}
        isicOptions={isicOptions}
        submitError={submitError}
        isSubmitting={isSubmitting}
        onClose={closeModal}
        onSubmit={submitUpsert}
      />
    </div>
  );
}

