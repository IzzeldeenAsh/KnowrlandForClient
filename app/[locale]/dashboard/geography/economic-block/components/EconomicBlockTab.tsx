'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { getAuthToken } from '@/lib/authToken';
import { useToast } from '@/components/toast/ToastContext';
import { buildAuthHeaders, parseApiError } from '../../../_config/api';
import type { EconomicBlocRecord } from '../../types';
import NameUpsertModal, { LocalizedNamePayload } from '../../components/NameUpsertModal';

type EconomicBlocListResponse = { data?: EconomicBlocRecord[] };

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

const INPUT_CLASS =
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

export default function EconomicBlockTab() {
  const { handleServerErrors, success } = useToast();

  const [blocs, setBlocs] = useState<EconomicBlocRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [searchInput, setSearchInput] = useState<string>('');

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedBloc, setSelectedBloc] = useState<EconomicBlocRecord | null>(null);
  const [submitError, setSubmitError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchBlocs = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    setError('');

    try {
      const token = getAuthToken();
      if (!token) {
        setBlocs([]);
        setError('Missing auth token. Please sign in again.');
        return;
      }

      const response = await fetch('https://api.foresighta.co/api/admin/setting/economic-bloc', {
        method: 'GET',
        cache: 'no-store',
        signal,
        headers: buildAuthHeaders(token),
      });

      if (!response.ok) {
        throw await parseApiError(response);
      }

      const payload = (await response.json()) as EconomicBlocListResponse;
      setBlocs(Array.isArray(payload.data) ? payload.data : []);
    } catch (requestError) {
      if (requestError instanceof DOMException && requestError.name === 'AbortError') {
        return;
      }
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to load economic blocks right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to load economic blocks right now.';
      setError(message);
      setBlocs([]);
    } finally {
      setIsLoading(false);
    }
  }, [handleServerErrors]);

  useEffect(() => {
    const controller = new AbortController();
    void fetchBlocs(controller.signal);
    return () => controller.abort();
  }, [fetchBlocs]);

  const filteredBlocs = useMemo(() => {
    const query = searchInput.trim().toLowerCase();
    if (!query) return blocs;

    return blocs.filter((bloc) => {
      const combined = [bloc.id, bloc.names?.en, bloc.names?.ar, bloc.name].map((v) => String(v ?? '')).join(' ').toLowerCase();
      return combined.includes(query);
    });
  }, [blocs, searchInput]);

  const openCreate = () => {
    setModalMode('create');
    setSelectedBloc(null);
    setSubmitError('');
    setIsSubmitting(false);
    setModalOpen(true);
  };

  const openEdit = (bloc: EconomicBlocRecord) => {
    setModalMode('edit');
    setSelectedBloc(bloc);
    setSubmitError('');
    setIsSubmitting(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedBloc(null);
    setSubmitError('');
    setIsSubmitting(false);
  };

  const submitUpsert = async (payload: LocalizedNamePayload) => {
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
          ? 'https://api.foresighta.co/api/admin/setting/economic-bloc'
          : `https://api.foresighta.co/api/admin/setting/economic-bloc/${selectedBloc?.id ?? ''}`;

      const response = await fetch(url, {
        method: modalMode === 'create' ? 'POST' : 'PUT',
        cache: 'no-store',
        headers: buildAuthHeaders(token),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw await parseApiError(response);
      }

      success(modalMode === 'create' ? 'Economic block created.' : 'Economic block updated.', '', 3500);
      closeModal();
      const controller = new AbortController();
      void fetchBlocs(controller.signal);
    } catch (requestError) {
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to save economic block right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to save economic block right now.';
      setSubmitError(message);
      setIsSubmitting(false);
    }
  };

  const deleteBloc = async (bloc: EconomicBlocRecord) => {
    const label = normalizeText(bloc.names?.en) || normalizeText(bloc.name) || `#${bloc.id}`;
    const ok = window.confirm(`Delete economic block "${label}"?`);
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

      const response = await fetch(`https://api.foresighta.co/api/admin/setting/economic-bloc/${bloc.id}`, {
        method: 'DELETE',
        cache: 'no-store',
        headers: buildAuthHeaders(token),
      });

      if (!response.ok) {
        throw await parseApiError(response);
      }

      success('Economic block deleted.', '', 3500);
      setBlocs((prev) => prev.filter((item) => item.id !== bloc.id));
      setIsSubmitting(false);
    } catch (requestError) {
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to delete economic block right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to delete economic block right now.';
      setSubmitError(message);
      setIsSubmitting(false);
    }
  };

  const modalTitle = modalMode === 'create' ? 'Create economic block' : `Edit economic block #${selectedBloc?.id ?? ''}`;
  const modalInitial = {
    en: normalizeText(selectedBloc?.names?.en) || normalizeText(selectedBloc?.name),
    ar: normalizeText(selectedBloc?.names?.ar),
  };

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-slate-900">Economic Block</h3>
          <p className="text-xs font-light text-slate-500 ps-1">total blocks: {filteredBlocs.length}</p>
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
              placeholder="Search economic blocks..."
              className={INPUT_CLASS}
            />
          </div>

          <button type="button" onClick={openCreate} className={PRIMARY_BUTTON_CLASS}>
            Create
          </button>
        </div>
      </div>

      {submitError ? <p className="mt-2 text-xs text-red-600">{submitError}</p> : null}

      {isLoading ? (
        <div className="mt-4 rounded-md border border-slate-200 bg-white p-6 text-center text-xs text-slate-500 shadow-sm">
          Loading...
        </div>
      ) : error ? (
        <div className="mt-4 rounded-md border border-slate-200 bg-white p-6 text-center text-xs text-red-600 shadow-sm">
          {error}
        </div>
      ) : filteredBlocs.length === 0 ? (
        <div className="mt-4 rounded-md border border-slate-200 bg-white p-6 text-center text-xs text-slate-500 shadow-sm">
          No economic blocks found.
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filteredBlocs.map((bloc) => {
            const nameEn = normalizeText(bloc.names?.en) || normalizeText(bloc.name) || `Bloc #${bloc.id}`;
            const nameAr = normalizeText(bloc.names?.ar) || '-';

            return (
              <div key={bloc.id} className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-slate-900">{nameEn}</div>
                    <div className="mt-1 truncate text-xs text-slate-500">{nameAr}</div>
                    <div className="mt-2 text-[11px] text-slate-400">ID: {bloc.id}</div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button type="button" onClick={() => openEdit(bloc)} className={ROW_ACTION_BUTTON_CLASS}>
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteBloc(bloc)}
                      disabled={isSubmitting}
                      className={ROW_ACTION_BUTTON_CLASS}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <NameUpsertModal
        isOpen={modalOpen}
        title={modalTitle}
        mode={modalMode}
        initial={modalInitial}
        submitError={submitError}
        isSubmitting={isSubmitting}
        onClose={closeModal}
        onSubmit={submitUpsert}
      />
    </div>
  );
}
