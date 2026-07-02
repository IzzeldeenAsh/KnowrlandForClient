'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { getAuthToken } from '@/lib/authToken';
import { useToast } from '@/components/toast/ToastContext';
import { buildAuthHeaders, parseApiError } from '../../../_config/api';
import type { RegionRecord } from '../../types';
import NameUpsertModal, { LocalizedNamePayload } from '../../components/NameUpsertModal';

type RegionListResponse = { data?: RegionRecord[] };

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

export default function RegionsTab() {
  const { handleServerErrors, success } = useToast();

  const [regions, setRegions] = useState<RegionRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [searchInput, setSearchInput] = useState<string>('');

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedRegion, setSelectedRegion] = useState<RegionRecord | null>(null);
  const [submitError, setSubmitError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchRegions = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    setError('');

    try {
      const token = getAuthToken();
      if (!token) {
        setRegions([]);
        setError('Missing auth token. Please sign in again.');
        return;
      }

      const response = await fetch('https://api.foresighta.co/api/admin/setting/region', {
        method: 'GET',
        cache: 'no-store',
        signal,
        headers: buildAuthHeaders(token),
      });

      if (!response.ok) {
        throw await parseApiError(response);
      }

      const payload = (await response.json()) as RegionListResponse;
      setRegions(Array.isArray(payload.data) ? payload.data : []);
    } catch (requestError) {
      if (requestError instanceof DOMException && requestError.name === 'AbortError') {
        return;
      }
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to load regions right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to load regions right now.';
      setError(message);
      setRegions([]);
    } finally {
      setIsLoading(false);
    }
  }, [handleServerErrors]);

  useEffect(() => {
    const controller = new AbortController();
    void fetchRegions(controller.signal);
    return () => controller.abort();
  }, [fetchRegions]);

  const filteredRegions = useMemo(() => {
    const query = searchInput.trim().toLowerCase();
    if (!query) return regions;

    return regions.filter((region) => {
      const combined = [region.id, region.names?.en, region.names?.ar, region.name].map((v) => String(v ?? '')).join(' ').toLowerCase();
      return combined.includes(query);
    });
  }, [regions, searchInput]);

  const openCreate = () => {
    setModalMode('create');
    setSelectedRegion(null);
    setSubmitError('');
    setIsSubmitting(false);
    setModalOpen(true);
  };

  const openEdit = (region: RegionRecord) => {
    setModalMode('edit');
    setSelectedRegion(region);
    setSubmitError('');
    setIsSubmitting(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRegion(null);
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
          ? 'https://api.foresighta.co/api/admin/setting/region'
          : `https://api.foresighta.co/api/admin/setting/region/${selectedRegion?.id ?? ''}`;

      const response = await fetch(url, {
        method: modalMode === 'create' ? 'POST' : 'PUT',
        cache: 'no-store',
        headers: buildAuthHeaders(token),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw await parseApiError(response);
      }

      success(modalMode === 'create' ? 'Region created.' : 'Region updated.', '', 3500);
      closeModal();
      const controller = new AbortController();
      void fetchRegions(controller.signal);
    } catch (requestError) {
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to save region right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to save region right now.';
      setSubmitError(message);
      setIsSubmitting(false);
    }
  };

  const deleteRegion = async (region: RegionRecord) => {
    const label = normalizeText(region.names?.en) || normalizeText(region.name) || `#${region.id}`;
    const ok = window.confirm(`Delete region "${label}"?`);
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

      const response = await fetch(`https://api.foresighta.co/api/admin/setting/region/${region.id}`, {
        method: 'DELETE',
        cache: 'no-store',
        headers: buildAuthHeaders(token),
      });

      if (!response.ok) {
        throw await parseApiError(response);
      }

      success('Region deleted.', '', 3500);
      setRegions((prev) => prev.filter((item) => item.id !== region.id));
      setIsSubmitting(false);
    } catch (requestError) {
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to delete region right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to delete region right now.';
      setSubmitError(message);
      setIsSubmitting(false);
    }
  };

  const modalTitle = modalMode === 'create' ? 'Create region' : `Edit region #${selectedRegion?.id ?? ''}`;
  const modalInitial = {
    en: normalizeText(selectedRegion?.names?.en) || normalizeText(selectedRegion?.name),
    ar: normalizeText(selectedRegion?.names?.ar),
  };

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-slate-900">Regions</h3>
          <p className="text-xs font-light text-slate-500 ps-1">total regions: {filteredRegions.length}</p>
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
              placeholder="Search regions..."
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
      ) : filteredRegions.length === 0 ? (
        <div className="mt-4 rounded-md border border-slate-200 bg-white p-6 text-center text-xs text-slate-500 shadow-sm">
          No regions found.
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filteredRegions.map((region) => {
            const nameEn = normalizeText(region.names?.en) || normalizeText(region.name) || `Region #${region.id}`;
            const nameAr = normalizeText(region.names?.ar) || '-';

            return (
              <div key={region.id} className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-slate-900">{nameEn}</div>
                    <div className="mt-1 truncate text-xs text-slate-500">{nameAr}</div>
                    <div className="mt-2 text-[11px] text-slate-400">ID: {region.id}</div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button type="button" onClick={() => openEdit(region)} className={ROW_ACTION_BUTTON_CLASS}>
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteRegion(region)}
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
