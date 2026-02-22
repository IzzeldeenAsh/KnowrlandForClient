'use client';

import { KeyboardEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { getAuthToken } from '@/lib/authToken';
import { useToast } from '@/components/toast/ToastContext';
import { buildAuthHeaders, parseApiError } from '../../_config/api';
import ContactMessageModal, { ContactMessage } from './ContactMessageModal';

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

const INPUT_CLASS =
  'h-8 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400 focus:border-[1px]';
const ROW_ACTION_BUTTON_CLASS =
  'rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] font-medium text-slate-700 shadow-sm hover:bg-slate-50';

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function getStatusBadgeClass(status: string): string {
  const normalized = status.toLowerCase();
  if (normalized === 'unread') return 'bg-red-50 text-red-700 ring-1 ring-red-200';
  if (normalized === 'read') return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
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

export default function ContactMessagesTab() {
  const { handleServerErrors, success } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [meta, setMeta] = useState<Meta>({ current_page: 1, last_page: 1, per_page: 10, total: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [submitError, setSubmitError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchMessages = useCallback(
    async (page = 1, signal?: AbortSignal) => {
      setIsLoading(true);
      setError('');

      try {
        const token = getAuthToken();
        if (!token) {
          setMessages([]);
          setMeta({ current_page: 1, last_page: 1, per_page: 10, total: 0 });
          setError('Missing auth token. Please sign in again.');
          return;
        }

        const url = new URL('https://api.foresighta.co/api/admin/setting/contact-us');
        url.searchParams.set('page', String(page));

        const response = await fetch(url.toString(), {
          method: 'GET',
          cache: 'no-store',
          signal,
          headers: buildAuthHeaders(token),
        });

        if (!response.ok) {
          throw await parseApiError(response);
        }

        const payload = (await response.json()) as PaginatedResponse<ContactMessage>;
        setMessages(Array.isArray(payload.data) ? payload.data : []);
        setMeta(payload.meta ?? { current_page: page, last_page: 1, per_page: 10, total: 0 });
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') {
          return;
        }
        handleServerErrors(requestError);
        const message =
          requestError && typeof requestError === 'object' && 'message' in requestError
            ? String((requestError as { message?: unknown }).message ?? 'Unable to load messages right now.')
            : requestError instanceof Error
              ? requestError.message
              : 'Unable to load messages right now.';
        setError(message);
        setMessages([]);
      } finally {
        setIsLoading(false);
      }
    },
    [handleServerErrors],
  );

  useEffect(() => {
    const controller = new AbortController();
    void fetchMessages(1, controller.signal);
    return () => controller.abort();
  }, [fetchMessages]);

  const filteredMessages = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return messages;
    return messages.filter((message) => {
      const combined = `${message.first_name ?? ''} ${message.last_name ?? ''} ${message.email ?? ''} ${message.phone ?? ''} ${
        message.status ?? ''
      } ${message.created_at ?? ''}`.toLowerCase();
      return combined.includes(query);
    });
  }, [messages, searchQuery]);

  const pages = useMemo(() => getPaginationWindow(meta.current_page, meta.last_page, 5), [meta.current_page, meta.last_page]);

  const runSearch = () => setSearchQuery(searchInput.trim());

  const onSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      runSearch();
    }
  };

  const openMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setSubmitError('');
    setIsSubmitting(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedMessage(null);
    setSubmitError('');
    setIsSubmitting(false);
  };

  const markAsRead = async (id: number) => {
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const token = getAuthToken();
      if (!token) {
        setSubmitError('Missing auth token. Please sign in again.');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(`https://api.foresighta.co/api/admin/setting/contact-us/${id}`, {
        method: 'PUT',
        cache: 'no-store',
        headers: buildAuthHeaders(token),
        body: JSON.stringify({ status: 'read' }),
      });

      if (!response.ok) {
        throw await parseApiError(response);
      }

      setMessages((prev) => prev.map((msg) => (msg.id === id ? { ...msg, status: 'read' } : msg)));
      setSelectedMessage((prev) => (prev && prev.id === id ? { ...prev, status: 'read' } : prev));
      success('Message marked as read.', '', 4000);
      setIsSubmitting(false);
    } catch (requestError) {
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to update message right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to update message right now.';
      setSubmitError(message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col">
          <h2 className="text-md font-semibold text-slate-900">Contact messages</h2>
          <p className="text-xs font-light text-slate-500 ps-1">total messages: {meta.total}</p>
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
              onKeyDown={onSearchKeyDown}
              placeholder="Search messages..."
              className={INPUT_CLASS}
            />
          </div>
          <button
            type="button"
            onClick={runSearch}
            className="h-8 rounded-md border border-blue-600 bg-blue-600 px-4 text-xs font-medium text-white shadow-sm hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-md border border-slate-200 bg-white">
        {isLoading ? (
          <div className="p-4 text-xs text-slate-500">Loading messages...</div>
        ) : error ? (
          <div className="p-4 text-xs text-red-600">{error}</div>
        ) : filteredMessages.length === 0 ? (
          <div className="p-6 text-center">
            <div className="text-sm font-semibold text-slate-800">No messages found</div>
            <div className="mt-1 text-xs text-slate-500">Try adjusting your search query.</div>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="min-w-[950px] w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMessages.map((message) => {
                  const fullName =
                    `${normalizeText(message.first_name)} ${normalizeText(message.last_name)}`.trim() || 'Unknown';
                  const statusText = normalizeText(message.status) || '-';
                  const statusKey = statusText.toLowerCase() || 'unknown';

                  return (
                    <tr key={message.id} className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 text-slate-600">#{message.id}</td>
                      <td className="px-4 py-3">
                        <div className="text-xs font-semibold text-slate-900">{fullName}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-700">{normalizeText(message.email) || '-'}</td>
                      <td className="px-4 py-3 text-slate-700">{normalizeText(message.phone) || '-'}</td>
                      <td className="px-4 py-3 text-slate-700">{normalizeText(message.created_at) || '-'}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-[11px] font-semibold ${getStatusBadgeClass(statusKey)}`}>
                          {statusText}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button type="button" className={ROW_ACTION_BUTTON_CLASS} onClick={() => openMessage(message)}>
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!isLoading && !error && meta.last_page > 1 ? (
          <div className="flex flex-col gap-2 border-t border-slate-200 p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-[11px] text-slate-500">
              Page {meta.current_page} of {meta.last_page}
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2">
              <button
                type="button"
                disabled={meta.current_page <= 1}
                onClick={() => void fetchMessages(meta.current_page - 1)}
                className="h-7 rounded-md border border-slate-200 bg-white px-2 text-[11px] font-medium text-slate-700 shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
              >
                Previous
              </button>
              {pages.map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => void fetchMessages(page)}
                  className={`h-7 rounded-md border px-2 text-[11px] font-medium shadow-sm ${
                    page === meta.current_page
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                disabled={meta.current_page >= meta.last_page}
                onClick={() => void fetchMessages(meta.current_page + 1)}
                className="h-7 rounded-md border border-slate-200 bg-white px-2 text-[11px] font-medium text-slate-700 shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {modalOpen ? (
        <ContactMessageModal
          isOpen={modalOpen}
          message={selectedMessage}
          isSubmitting={isSubmitting}
          submitError={submitError}
          onClose={closeModal}
          onMarkAsRead={(id) => void markAsRead(id)}
        />
      ) : null}
    </div>
  );
}

