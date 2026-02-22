'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getAuthToken } from '@/lib/authToken';
import { useToast } from '@/components/toast/ToastContext';
import { buildAuthHeaders, parseApiError } from '../../../_config/api';
import TagUpsertModal, { IndustryRecord, TagRecord, TagStatus, TagUpsertPayload } from './TagUpsertModal';

type Meta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

type PaginatedResponse<T> = {
  data: T[];
  meta: Meta;
};

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
const INPUT_CLASS =
  'h-8 w-full rounded-md max-w-[100px] border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400 focus:border-[1px]';
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
  if (normalized === 'suggestion') return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
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

export default function TagsTab() {
  const { handleServerErrors, success } = useToast();

  const [tags, setTags] = useState<TagRecord[]>([]);
  const [industries, setIndustries] = useState<IndustryRecord[]>([]);

  const [meta, setMeta] = useState<Meta>({ current_page: 1, last_page: 1, per_page: 10, total: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [searchInput, setSearchInput] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedTag, setSelectedTag] = useState<TagRecord | null>(null);
  const [submitError, setSubmitError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const keywordTimer = useRef<number | null>(null);
  const currentRequestAbort = useRef<AbortController | null>(null);

  useEffect(() => {
    if (keywordTimer.current) {
      window.clearTimeout(keywordTimer.current);
    }
    keywordTimer.current = window.setTimeout(() => {
      setKeyword(searchInput.trim());
    }, 250);
    return () => {
      if (keywordTimer.current) window.clearTimeout(keywordTimer.current);
    };
  }, [searchInput]);

  const industriesById = useMemo(() => {
    const map = new Map<number, string>();
    for (const industry of industries) {
      map.set(industry.id, industry.name);
    }
    return map;
  }, [industries]);

  const fetchIndustries = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await fetch('https://api.foresighta.co/api/common/setting/industry/list', {
        method: 'GET',
        cache: 'no-store',
        signal,
        headers: {
          Accept: 'application/json',
          'Accept-Language': 'en',
        },
      });
      if (!response.ok) throw await parseApiError(response);
      const payload = (await response.json()) as { data?: IndustryRecord[] };
      setIndustries(Array.isArray(payload.data) ? payload.data : []);
    } catch {
      setIndustries([]);
    }
  }, []);

  const fetchTags = useCallback(
    async (page = 1, signal?: AbortSignal) => {
      setIsLoading(true);
      setError('');

      try {
        const token = getAuthToken();
        if (!token) {
          setTags([]);
          setMeta({ current_page: 1, last_page: 1, per_page: 10, total: 0 });
          setError('Missing auth token. Please sign in again.');
          return;
        }

        const url = new URL('https://api.foresighta.co/api/admin/setting/tag');
        url.searchParams.set('page', String(page));
        if (keyword.trim()) url.searchParams.set('keyword', keyword.trim());
        if (statusFilter.trim()) url.searchParams.set('status', statusFilter.trim());

        const response = await fetch(url.toString(), {
          method: 'GET',
          cache: 'no-store',
          signal,
          headers: buildAuthHeaders(token),
        });

        if (!response.ok) {
          throw await parseApiError(response);
        }

        const payload = (await response.json()) as PaginatedResponse<TagRecord>;
        setTags(Array.isArray(payload.data) ? payload.data : []);
        setMeta(payload.meta ?? { current_page: page, last_page: 1, per_page: 10, total: 0 });
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') {
          return;
        }
        handleServerErrors(requestError);
        const message =
          requestError && typeof requestError === 'object' && 'message' in requestError
            ? String((requestError as { message?: unknown }).message ?? 'Unable to load tags right now.')
            : requestError instanceof Error
              ? requestError.message
              : 'Unable to load tags right now.';
        setError(message);
        setTags([]);
        setMeta({ current_page: 1, last_page: 1, per_page: 10, total: 0 });
      } finally {
        setIsLoading(false);
      }
    },
    [handleServerErrors, keyword, statusFilter],
  );

  useEffect(() => {
    const controller = new AbortController();
    void fetchIndustries(controller.signal);
    return () => controller.abort();
  }, [fetchIndustries]);

  useEffect(() => {
    currentRequestAbort.current?.abort();
    const controller = new AbortController();
    currentRequestAbort.current = controller;
    void fetchTags(1, controller.signal);
    return () => controller.abort();
  }, [keyword, statusFilter, fetchTags]);

    const pages = useMemo(() => getPaginationWindow(meta.current_page, meta.last_page, 5), [meta.current_page, meta.last_page]);

  const onPageChange = (page: number) => {
    currentRequestAbort.current?.abort();
    const controller = new AbortController();
    currentRequestAbort.current = controller;
    void fetchTags(page, controller.signal);
  };

  const openCreate = () => {
    setModalMode('create');
    setSelectedTag(null);
    setSubmitError('');
    setIsSubmitting(false);
    setModalOpen(true);
  };

  const openEdit = (tag: TagRecord) => {
    setModalMode('edit');
    setSelectedTag(tag);
    setSubmitError('');
    setIsSubmitting(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTag(null);
    setSubmitError('');
    setIsSubmitting(false);
  };

  const submitUpsert = async (payload: TagUpsertPayload) => {
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
          ? 'https://api.foresighta.co/api/admin/setting/tag'
          : `https://api.foresighta.co/api/admin/setting/tag/${selectedTag?.id ?? ''}`;

      const response = await fetch(url, {
        method: modalMode === 'create' ? 'POST' : 'PUT',
        cache: 'no-store',
        headers: buildAuthHeaders(token),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw await parseApiError(response);
      }

      success(modalMode === 'create' ? 'Tag created.' : 'Tag updated.', '', 3500);
      closeModal();
      const controller = new AbortController();
      void fetchTags(1, controller.signal);
    } catch (requestError) {
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to save tag right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to save tag right now.';
      setSubmitError(message);
      setIsSubmitting(false);
    }
  };

  const deleteTag = async (tag: TagRecord) => {
    const label = normalizeText(tag.names?.en) || `#${tag.id}`;
    const ok = window.confirm(`Delete tag "${label}"? This action cannot be undone.`);
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

      const response = await fetch(`https://api.foresighta.co/api/admin/setting/tag/${tag.id}`, {
        method: 'DELETE',
        cache: 'no-store',
        headers: buildAuthHeaders(token),
      });

      if (!response.ok) {
        throw await parseApiError(response);
      }

      success('Tag deleted.', '', 3500);
      const controller = new AbortController();
      void fetchTags(meta.current_page, controller.signal);
    } catch (requestError) {
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to delete tag right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to delete tag right now.';
      setSubmitError(message);
      setIsSubmitting(false);
    }
  };

  const modalTitle = modalMode === 'create' ? 'Add Tag' : `Edit Tag #${selectedTag?.id ?? ''}`;
  const modalInitial = {
    en: normalizeText(selectedTag?.names?.en),
    ar: normalizeText(selectedTag?.names?.ar),
    status: (normalizeText(selectedTag?.status).toLowerCase() === 'inactive'
      ? 'inactive'
      : normalizeText(selectedTag?.status).toLowerCase() === 'suggestion'
        ? 'suggestion'
        : 'active') as TagStatus,
    industries: Array.isArray(selectedTag?.industries) ? selectedTag!.industries : [],
  };

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col">
          <h2 className="text-md font-semibold text-slate-900">Tags</h2>
          <p className="text-xs font-light text-slate-500 ps-1">total tags: {meta.total}</p>
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
              placeholder="Search tags..."
              className={INPUT_WITH_ICON_CLASS}
            />
          </div>

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={INPUT_CLASS}>
            <option value="">All Statuses</option>
            <option value="active">active</option>
            <option value="inactive">inactive</option>
            <option value="suggestion">suggestion</option>
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
              <th className="w-[220px] border-b border-slate-200 px-3 py-2 text-left">Name (English)</th>
              <th className="w-[220px] border-b border-slate-200 px-3 py-2 text-left">Name (Arabic)</th>
              <th className="w-[140px] border-b border-slate-200 px-3 py-2 text-left">Status</th>
              <th className="border-b border-slate-200 px-3 py-2 text-left">Associated Industries</th>
              <th className="w-[160px] border-b border-slate-200 px-3 py-2 text-right">Actions</th>
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
            ) : tags.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-xs text-slate-500">
                  No tags found.
                </td>
              </tr>
            ) : (
              tags.map((tag) => {
                const status = normalizeText(tag.status) || 'unknown';
                const industryNames = Array.isArray(tag.industries)
                  ? tag.industries.map((id) => industriesById.get(id) ?? `Unknown (ID: ${id})`)
                  : [];

                return (
                  <tr key={tag.id} className="odd:bg-white even:bg-slate-50/50">
                    <td className="border-b border-slate-100 px-3 py-2 font-medium text-slate-900">{normalizeText(tag.names?.en) || '-'}</td>
                    <td className="border-b border-slate-100 px-3 py-2">{normalizeText(tag.names?.ar) || '-'}</td>
                    <td className="whitespace-nowrap border-b border-slate-100 px-3 py-2">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${getStatusBadgeClass(status)}`}>
                        {status}
                      </span>
                    </td>
                    <td className="border-b border-slate-100 px-3 py-2">
                      {industryNames.length === 0 ? (
                        <span className="text-xs text-slate-500">No industries assigned</span>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {industryNames.slice(0, 3).map((name) => (
                            <span key={name} className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-200">
                              {name}
                            </span>
                          ))}
                          {industryNames.length > 3 ? (
                            <span
                              title={industryNames.slice(3).join(', ')}
                              className="rounded-full bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-700 ring-1 ring-slate-200"
                            >
                              +{industryNames.length - 3} more
                            </span>
                          ) : null}
                        </div>
                      )}
                    </td>
                    <td className="whitespace-nowrap border-b border-slate-100 px-3 py-2">
                      <div className="flex items-center justify-end gap-2">
                        <button type="button" onClick={() => openEdit(tag)} className={ROW_ACTION_BUTTON_CLASS}>
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteTag(tag)}
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
          Page {meta.current_page} of {meta.last_page}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, meta.current_page - 1))}
            disabled={meta.current_page <= 1}
            className={SECONDARY_BUTTON_CLASS}
          >
            Prev
          </button>

          <div className="flex items-center gap-1">
            {pages.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={[
                  'h-8 min-w-8 rounded-md border px-2 text-xs font-medium shadow-sm',
                  p === meta.current_page
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
                ].join(' ')}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onPageChange(Math.min(meta.last_page, meta.current_page + 1))}
            disabled={meta.current_page >= meta.last_page}
            className={SECONDARY_BUTTON_CLASS}
          >
            Next
          </button>
        </div>
      </div>

      <TagUpsertModal
        isOpen={modalOpen}
        mode={modalMode}
        title={modalTitle}
        initial={modalMode === 'create' ? { en: '', ar: '', status: 'active', industries: [] } : modalInitial}
        industries={industries}
        submitError={submitError}
        isSubmitting={isSubmitting}
        onClose={closeModal}
        onSubmit={submitUpsert}
      />
    </div>
  );
}
