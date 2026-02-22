'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { getAuthToken } from '@/lib/authToken';
import { useToast } from '@/components/toast/ToastContext';
import { buildAuthHeaders, parseApiError } from '../../../_config/api';
import type { CountryRecord, RegionRecord } from '../../types';
import CountryUpsertModal, { CountryUpsertPayload } from './CountryUpsertModal';

type CountryListResponse = { data?: CountryRecord[] };
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

const INPUT_WITH_ICON_CLASS =
  'h-8 w-full min-w-[300px] rounded-md border border-slate-200 bg-white pl-9 pr-3 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400 focus:border-[1px]';
const INPUT_CLASS =
  'h-8 w-full max-w-[100px] rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400 focus:border-[1px]';
const PRIMARY_BUTTON_CLASS =
  'h-8 rounded-md border border-blue-600 bg-blue-600 px-4 text-xs font-medium text-white shadow-sm shadow-gray-300 hover:bg-blue-700';
const SECONDARY_BUTTON_CLASS =
  'h-8 rounded-md border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50';
const ROW_ACTION_BUTTON_CLASS =
  'rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] font-medium text-slate-700 shadow-sm hover:bg-slate-50';

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function buildFlagSrc(flagValue: unknown): string | null {
  const raw = normalizeText(flagValue);
  if (!raw) return null;
  const cleaned = raw.toLowerCase().replace(/\.svg$/i, '');
  return `/images/flags/${encodeURIComponent(cleaned)}.svg`;
}

function getStatusBadgeClass(status: string): string {
  const normalized = status.toLowerCase();
  if (normalized === 'active') return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
  if (normalized === 'inactive') return 'bg-red-50 text-red-700 ring-1 ring-red-200';
  return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200';
}

function getPaginationWindow(currentPage: number, lastPage: number, maxVisiblePages = 5): number[] {
  const safeLast = Math.max(1, lastPage);
  const safeCurrent = Math.min(Math.max(1, currentPage), safeLast);
  const pages: number[] = [];

  const half = Math.floor(maxVisiblePages / 2);
  let start = Math.max(1, safeCurrent - half);
  let end = Math.min(safeLast, start + maxVisiblePages - 1);
  if (end - start + 1 < maxVisiblePages) {
    start = Math.max(1, end - maxVisiblePages + 1);
  }

  for (let p = start; p <= end; p++) pages.push(p);
  return pages;
}

export default function CountriesTab() {
  const { handleServerErrors, success } = useToast();

  const [countries, setCountries] = useState<CountryRecord[]>([]);
  const [regions, setRegions] = useState<RegionRecord[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [searchInput, setSearchInput] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedCountry, setSelectedCountry] = useState<CountryRecord | null>(null);
  const [submitError, setSubmitError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const regionNameById = useMemo(() => {
    const map = new Map<number, string>();
    for (const region of regions) {
      const label = normalizeText(region.names?.en) || normalizeText(region.name);
      map.set(region.id, label || `Region #${region.id}`);
    }
    return map;
  }, [regions]);

  const fetchCountries = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://api.foresighta.co/api/common/setting/country/list', {
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

      const payload = (await response.json()) as CountryListResponse;
      setCountries(Array.isArray(payload.data) ? payload.data : []);
    } catch (requestError) {
      if (requestError instanceof DOMException && requestError.name === 'AbortError') {
        return;
      }
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to load countries right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to load countries right now.';
      setError(message);
      setCountries([]);
    } finally {
      setIsLoading(false);
    }
  }, [handleServerErrors]);

  const fetchRegions = useCallback(async (signal?: AbortSignal) => {
    try {
      const token = getAuthToken();
      if (!token) {
        setRegions([]);
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
    } catch {
      // keep usable even if regions fail
      setRegions([]);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void fetchRegions(controller.signal);
    return () => controller.abort();
  }, [fetchRegions]);

  useEffect(() => {
    const controller = new AbortController();
    void fetchCountries(controller.signal);
    return () => controller.abort();
  }, [fetchCountries]);

  const filteredCountries = useMemo(() => {
    const query = searchInput.trim().toLowerCase();
    const status = statusFilter;

    return countries.filter((country) => {
      const countryStatus = normalizeText(country.status).toLowerCase();
      if (status !== 'all' && countryStatus !== status) {
        return false;
      }

      if (!query) return true;

      const combined = [
        country.id,
        country.iso2,
        country.iso3,
        country.international_code,
        country.flag,
        country.names?.en,
        country.names?.ar,
        country.name,
        country.nationalities?.en,
        country.nationalities?.ar,
        country.nationality,
        country.status,
      ]
        .map((v) => String(v ?? ''))
        .join(' ')
        .toLowerCase();

      return combined.includes(query);
    });
  }, [countries, searchInput, statusFilter]);

  useEffect(() => {
    setPage(1);
  }, [searchInput, statusFilter, perPage]);

  const total = filteredCountries.length;
  const lastPage = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), lastPage);
  const pages = useMemo(() => getPaginationWindow(safePage, lastPage, 5), [lastPage, safePage]);

  const pagedCountries = useMemo(() => {
    const start = (safePage - 1) * perPage;
    return filteredCountries.slice(start, start + perPage);
  }, [filteredCountries, perPage, safePage]);

  const openCreate = () => {
    setModalMode('create');
    setSelectedCountry(null);
    setSubmitError('');
    setIsSubmitting(false);
    setModalOpen(true);
  };

  const openEdit = (country: CountryRecord) => {
    setModalMode('edit');
    setSelectedCountry(country);
    setSubmitError('');
    setIsSubmitting(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCountry(null);
    setSubmitError('');
    setIsSubmitting(false);
  };

  const submitUpsert = async (payload: CountryUpsertPayload) => {
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
          ? 'https://api.foresighta.co/api/admin/setting/country'
          : `https://api.foresighta.co/api/admin/setting/country/${selectedCountry?.id ?? ''}`;

      const response = await fetch(url, {
        method: modalMode === 'create' ? 'POST' : 'PUT',
        cache: 'no-store',
        headers: buildAuthHeaders(token),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw await parseApiError(response);
      }

      success(modalMode === 'create' ? 'Country created.' : 'Country updated.', '', 3500);
      closeModal();
      const controller = new AbortController();
      void fetchCountries(controller.signal);
    } catch (requestError) {
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to save country right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to save country right now.';
      setSubmitError(message);
      setIsSubmitting(false);
    }
  };

  const deleteCountry = async (country: CountryRecord) => {
    const ok = window.confirm(`Delete country "${country.names?.en || country.name || country.iso2 || `#${country.id}`}"?`);
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

      const response = await fetch(`https://api.foresighta.co/api/admin/setting/country/${country.id}`, {
        method: 'DELETE',
        cache: 'no-store',
        headers: buildAuthHeaders(token),
      });

      if (!response.ok) {
        throw await parseApiError(response);
      }

      success('Country deleted.', '', 3500);
      setCountries((prev) => prev.filter((item) => item.id !== country.id));
      setIsSubmitting(false);
    } catch (requestError) {
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to delete country right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to delete country right now.';
      setSubmitError(message);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-slate-900">Countries</h3>
          <p className="text-xs font-light text-slate-500 ps-1">total countries: {total}</p>
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
              placeholder="Search countries..."
              className={INPUT_WITH_ICON_CLASS}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
            className={INPUT_CLASS}
          >
            <option value="all">All statuses</option>
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>

          <button type="button" onClick={openCreate} className={PRIMARY_BUTTON_CLASS}>
            Create
          </button>
        </div>
      </div>

      {submitError ? <p className="mt-2 text-xs text-red-600">{submitError}</p> : null}

      <div className="mt-4 overflow-x-auto rounded-md border border-slate-200 bg-white shadow-sm">
        <table className="min-w-[980px] w-full border-collapse text-xs text-slate-700">
          <thead className="bg-slate-50 text-[11px] font-semibold uppercase text-slate-500">
            <tr>
              <th className="w-[70px] border-b border-slate-200 px-3 py-2 text-left">ID</th>
              <th className="w-[260px] border-b border-slate-200 px-3 py-2 text-left">Flag / Name</th>
              <th className="w-[190px] border-b border-slate-200 px-3 py-2 text-left">Region</th>
              <th className="w-[90px] border-b border-slate-200 px-3 py-2 text-left">ISO2</th>
              <th className="w-[90px] border-b border-slate-200 px-3 py-2 text-left">ISO3</th>
              <th className="w-[110px] border-b border-slate-200 px-3 py-2 text-left">Intl. Code</th>
              <th className="w-[190px] border-b border-slate-200 px-3 py-2 text-left">Nationality</th>
              <th className="w-[110px] border-b border-slate-200 px-3 py-2 text-left">Status</th>
              <th className="w-[140px] border-b border-slate-200 px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={9} className="px-3 py-6 text-center text-xs text-slate-500">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={9} className="px-3 py-6 text-center text-xs text-red-600">
                  {error}
                </td>
              </tr>
            ) : pagedCountries.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-3 py-6 text-center text-xs text-slate-500">
                  No countries found.
                </td>
              </tr>
            ) : (
              pagedCountries.map((country) => {
                const name = normalizeText(country.names?.en) || normalizeText(country.name) || `#${country.id}`;
                const regionLabel =
                  country.region_id && regionNameById.has(country.region_id)
                    ? regionNameById.get(country.region_id)
                    : country.region_id
                      ? `Region #${country.region_id}`
                      : '-';
                const nationality = normalizeText(country.nationalities?.en) || normalizeText(country.nationality) || '-';
                const status = normalizeText(country.status) || 'unknown';
                const flagSrc = buildFlagSrc(country.flag);

                return (
                  <tr key={country.id} className="odd:bg-white even:bg-slate-50/50">
                    <td className="whitespace-nowrap border-b border-slate-100 px-3 py-2">{country.id}</td>
                    <td className="border-b border-slate-100 px-3 py-2">
                      <div className="flex items-center gap-2 min-w-0">
                        {flagSrc ? (
                          <img
                            src={flagSrc}
                            alt={name}
                            className="h-6 w-6 shrink-0 rounded-sm border border-slate-200 bg-white object-cover"
                            onError={(event) => {
                              (event.currentTarget as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <span className="h-6 w-6 shrink-0 rounded-sm border border-slate-200 bg-slate-50" aria-hidden="true" />
                        )}
                        <div className="min-w-0">
                          <div className="truncate font-medium text-slate-900">{name}</div>
                          <div className="truncate text-[11px] text-slate-500">
                            {normalizeText(country.iso2) || '-'} • {normalizeText(country.iso3) || '-'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="truncate border-b border-slate-100 px-3 py-2">{regionLabel}</td>
                    <td className="whitespace-nowrap border-b border-slate-100 px-3 py-2">{normalizeText(country.iso2) || '-'}</td>
                    <td className="whitespace-nowrap border-b border-slate-100 px-3 py-2">{normalizeText(country.iso3) || '-'}</td>
                    <td className="whitespace-nowrap border-b border-slate-100 px-3 py-2">{normalizeText(country.international_code) || '-'}</td>
                    <td className="truncate border-b border-slate-100 px-3 py-2">{nationality}</td>
                    <td className="whitespace-nowrap border-b border-slate-100 px-3 py-2">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${getStatusBadgeClass(status)}`}>
                        {status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap border-b border-slate-100 px-3 py-2">
                      <div className="flex items-center justify-end gap-2">
                        <button type="button" onClick={() => openEdit(country)} className={ROW_ACTION_BUTTON_CLASS}>
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteCountry(country)}
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

      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-slate-500">
          Page {safePage} of {lastPage}
        </div>

        <div className="flex items-center gap-2">
      
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage <= 1}
            className={SECONDARY_BUTTON_CLASS}
          >
            Prev
          </button>

          <div className="flex items-center gap-1">
            {pages.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={[
                  'h-8 min-w-8 rounded-md border px-2 text-xs font-medium shadow-sm',
                  p === safePage ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
                ].join(' ')}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
            disabled={safePage >= lastPage}
            className={SECONDARY_BUTTON_CLASS}
          >
            Next
          </button>
        </div>
      </div>

      <CountryUpsertModal
        isOpen={modalOpen}
        mode={modalMode}
        country={selectedCountry}
        regions={regions}
        submitError={submitError}
        isSubmitting={isSubmitting}
        onClose={closeModal}
        onSubmit={submitUpsert}
      />
    </div>
  );
}
