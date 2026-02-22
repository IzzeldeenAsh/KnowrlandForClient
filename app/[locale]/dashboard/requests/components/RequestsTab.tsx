'use client';

import { KeyboardEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { getAuthToken } from '@/lib/authToken';
import { useToast } from '@/components/toast/ToastContext';
import { buildAuthHeaders, parseApiError } from '../../_config/api';
import RequestActionModal, {
  AnsweredQuestion,
  RequestItem,
  RequestModalKind,
  VerificationAnswerPayload,
  VerificationQuestion,
} from './RequestActionModal';

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
  if (normalized === 'pending') return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
  if (normalized === 'approved') return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
  if (normalized === 'declined') return 'bg-red-50 text-red-700 ring-1 ring-red-200';
  return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200';
}

function getRequestChain(root: RequestItem): RequestItem[] {
  const chain: RequestItem[] = [root];
  let current = root;
  while (Array.isArray(current.children) && current.children.length > 0) {
    const lastChild = current.children[current.children.length - 1];
    chain.push(lastChild);
    current = lastChild;
  }
  return chain;
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

export default function RequestsTab() {
  const { handleServerErrors, success } = useToast();
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [meta, setMeta] = useState<Meta>({ current_page: 1, last_page: 1, per_page: 10, total: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [perPage, setPerPage] = useState<number>(10);

  const [verificationQuestions, setVerificationQuestions] = useState<VerificationQuestion[]>([]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalKind, setModalKind] = useState<RequestModalKind>('view');
  const [rootRequest, setRootRequest] = useState<RequestItem | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<RequestItem | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([]);
  const [submitError, setSubmitError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchRequests = useCallback(
    async (page = 1, perPageValue = perPage, signal?: AbortSignal) => {
      setIsLoading(true);
      setError('');

      try {
        const token = getAuthToken();
        if (!token) {
          setRequests([]);
          setMeta({ current_page: 1, last_page: 1, per_page: perPageValue, total: 0 });
          setError('Missing auth token. Please sign in again.');
          return;
        }

        const url = new URL('https://api.foresighta.co/api/admin/request');
        url.searchParams.set('page', String(page));
        url.searchParams.set('per_page', String(perPageValue));

        const response = await fetch(url.toString(), {
          method: 'GET',
          cache: 'no-store',
          signal,
          headers: buildAuthHeaders(token),
        });

        if (!response.ok) {
          throw await parseApiError(response);
        }

        const payload = (await response.json()) as PaginatedResponse<RequestItem>;
        setRequests(Array.isArray(payload.data) ? payload.data : []);
        setMeta(payload.meta ?? { current_page: page, last_page: 1, per_page: perPageValue, total: 0 });
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') {
          return;
        }
        handleServerErrors(requestError);
        const message =
          requestError && typeof requestError === 'object' && 'message' in requestError
            ? String((requestError as { message?: unknown }).message ?? 'Unable to load requests right now.')
            : requestError instanceof Error
              ? requestError.message
              : 'Unable to load requests right now.';
        setError(message);
        setRequests([]);
      } finally {
        setIsLoading(false);
      }
    },
    [handleServerErrors, perPage],
  );

  const fetchVerificationQuestions = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await fetch('https://api.foresighta.co/api/common/setting/verification-question/list', {
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

      const payload = (await response.json()) as { data?: VerificationQuestion[] };
      setVerificationQuestions(Array.isArray(payload.data) ? payload.data : []);
    } catch (requestError) {
      if (requestError instanceof DOMException && requestError.name === 'AbortError') {
        return;
      }
      // Keep the page usable even if questions fail to load.
      setVerificationQuestions([]);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void fetchVerificationQuestions(controller.signal);
    return () => controller.abort();
  }, [fetchVerificationQuestions]);

  useEffect(() => {
    const controller = new AbortController();
    void fetchRequests(1, perPage, controller.signal);
    return () => controller.abort();
  }, [fetchRequests, perPage]);

  const filteredRequests = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return requests;

    return requests.filter((request) => {
      const requestable = request.requestable ?? {};
      const combined = `${requestable.legal_name ?? ''} ${requestable.name ?? ''} ${requestable.verified_email ?? ''} ${
        requestable.email ?? ''
      } ${request.type?.label ?? ''} ${request.final_status ?? ''} ${request.final_status_label ?? ''}`.toLowerCase();
      return combined.includes(query);
    });
  }, [requests, searchQuery]);

  const pages = useMemo(() => getPaginationWindow(meta.current_page, meta.last_page, 5), [meta.current_page, meta.last_page]);

  const runSearch = () => setSearchQuery(searchInput.trim());

  const onSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      runSearch();
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setRootRequest(null);
    setSelectedRequest(null);
    setAnsweredQuestions([]);
    setSubmitError('');
    setIsSubmitting(false);
    setModalKind('view');
  };

  const openRequest = async (request: RequestItem) => {
    const chain = getRequestChain(request);
    const latest = chain[chain.length - 1];
    const typeKey = normalizeText(latest.type?.key);

    setRootRequest(request);
    setSelectedRequest(latest);
    setAnsweredQuestions([]);
    setSubmitError('');
    setIsSubmitting(false);

    if (typeKey === 'activate_company') {
      setModalKind('activate_company');
      setModalOpen(true);
      return;
    }

    if (typeKey === 'deactivate_company') {
      setModalKind('deactivate_company');
      setModalOpen(true);
      return;
    }

    if (typeKey === 'deactivate_delete_company' || typeKey === 'deactivate_delete_insighter') {
      setModalKind('deactivate_delete');
      setModalOpen(true);
      return;
    }

    if (typeKey === 'verified_company') {
      const token = getAuthToken();
      if (!token) {
        setModalKind('verified_company_questions');
        setModalOpen(true);
        return;
      }

      try {
        setIsSubmitting(true);
        const response = await fetch(
          `https://api.foresighta.co/api/admin/request/verification/question/${request.id}`,
          {
            method: 'GET',
            cache: 'no-store',
            headers: buildAuthHeaders(token),
          },
        );

        if (!response.ok) {
          throw await parseApiError(response);
        }

        const payload = (await response.json()) as { data?: AnsweredQuestion[] };
        const answered = Array.isArray(payload.data) ? payload.data : [];
        setAnsweredQuestions(answered);
        setModalKind(answered.length > 0 ? 'verified_company_review' : 'verified_company_questions');
        setModalOpen(true);
      } catch (requestError) {
        handleServerErrors(requestError);
        setModalKind('verified_company_questions');
        setModalOpen(true);
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    setModalKind('view');
    setModalOpen(true);
  };

  const submitVerificationAnswers = async (requestId: number, answers: VerificationAnswerPayload[]) => {
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const token = getAuthToken();
      if (!token) {
        setSubmitError('Missing auth token. Please sign in again.');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(
        `https://api.foresighta.co/api/admin/request/action/company/verified/question/${requestId}`,
        {
          method: 'POST',
          cache: 'no-store',
          headers: buildAuthHeaders(token),
          body: JSON.stringify({
            verification_answers: answers,
          }),
        },
      );

      if (!response.ok) {
        throw await parseApiError(response);
      }

      success('Answers submitted.', '', 5000);
      closeModal();
      await fetchRequests(meta.current_page, perPage);
    } catch (requestError) {
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to submit answers right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to submit answers right now.';
      setSubmitError(message);
      setIsSubmitting(false);
    }
  };

  const approveRequest = async (requestId: number, staffNotes: string, status: 'approved' | 'declined') => {
    if (!selectedRequest) return;
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const token = getAuthToken();
      if (!token) {
        setSubmitError('Missing auth token. Please sign in again.');
        setIsSubmitting(false);
        return;
      }

      const typeKey = normalizeText(selectedRequest.type?.key);

      let url = '';
      if (typeKey === 'activate_company') {
        url = `https://api.foresighta.co/api/admin/request/action/company/activate/${requestId}`;
      } else if (typeKey === 'deactivate_company') {
        url = `https://api.foresighta.co/api/admin/request/action/company/deactivate/${requestId}`;
      } else if (typeKey === 'verified_company') {
        url = `https://api.foresighta.co/api/admin/request/action/company/verified/${requestId}`;
      } else if (typeKey === 'deactivate_delete_company' || typeKey === 'deactivate_delete_insighter') {
        url = `https://api.foresighta.co/api/admin/request/action/company/deactivate-delete/${requestId}`;
      } else if (modalKind === 'deactivate_delete') {
        url = `https://api.foresighta.co/api/admin/request/action/company/deactivate-delete/${requestId}`;
      }

      if (!url) {
        setSubmitError('This request type has no configured action endpoint.');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(url, {
        method: 'POST',
        cache: 'no-store',
        headers: buildAuthHeaders(token),
        body: JSON.stringify({
          staff_notes: staffNotes,
          status,
        }),
      });

      if (!response.ok) {
        throw await parseApiError(response);
      }

      success(status === 'approved' ? 'Request approved.' : 'Request declined.', '', 5000);
      closeModal();
      await fetchRequests(meta.current_page, perPage);
    } catch (requestError) {
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to submit action right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to submit action right now.';
      setSubmitError(message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col">
          <h2 className="text-md font-semibold text-slate-900">Requests</h2>
          <p className="text-xs font-light text-slate-500 ps-1">total requests: {meta.total}</p>
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
              placeholder="Search requests..."
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
          <div className="p-4 text-xs text-slate-500">Loading requests...</div>
        ) : error ? (
          <div className="p-4 text-xs text-red-600">{error}</div>
        ) : filteredRequests.length === 0 ? (
          <div className="p-6 text-center">
            <div className="text-sm font-semibold text-slate-800">No requests found</div>
            <div className="mt-1 text-xs text-slate-500">Try adjusting your search or filters.</div>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="min-w-[900px] w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Requestable</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRequests.map((request) => {
                  const requestable = request.requestable ?? {};
                  const title =
                    request.requestable_type === 'company'
                      ? normalizeText(requestable.legal_name) || 'Company'
                      : normalizeText(requestable.name) || 'Requestable';
                  const subtitle =
                    request.requestable_type === 'company'
                      ? normalizeText(requestable.verified_email) || normalizeText(requestable.website)
                      : normalizeText(requestable.email);
                  const statusText = normalizeText(request.final_status_label) || normalizeText(request.status_label) || '-';
                  const statusKey = normalizeText(request.final_status) || normalizeText(request.status) || 'unknown';

                  return (
                    <tr key={request.id} className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 text-slate-600">#{request.id}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {request.requestable_type === 'company' && requestable.logo ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={requestable.logo}
                              alt={title}
                              className="h-8 w-8 rounded-md border border-slate-200 object-cover"
                            />
                          ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-[11px] font-semibold text-slate-600">
                              {title.slice(0, 2).toUpperCase()}
                            </div>
                          )}

                          <div className="min-w-0">
                            <div className="truncate text-xs font-semibold text-slate-900">{title}</div>
                            {subtitle ? <div className="truncate text-[11px] text-slate-500">{subtitle}</div> : null}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-700">{request.type?.label ?? '-'}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-[11px] font-semibold ${getStatusBadgeClass(statusKey)}`}>
                          {statusText}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button type="button" className={ROW_ACTION_BUTTON_CLASS} onClick={() => void openRequest(request)}>
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
                onClick={() => void fetchRequests(meta.current_page - 1, perPage)}
                className="h-7 rounded-md border border-slate-200 bg-white px-2 text-[11px] font-medium text-slate-700 shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
              >
                Previous
              </button>
              {pages.map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => void fetchRequests(page, perPage)}
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
                onClick={() => void fetchRequests(meta.current_page + 1, perPage)}
                className="h-7 rounded-md border border-slate-200 bg-white px-2 text-[11px] font-medium text-slate-700 shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {modalOpen && rootRequest && selectedRequest ? (
        <RequestActionModal
          isOpen={modalOpen}
          kind={modalKind}
          rootRequest={rootRequest}
          selectedRequest={selectedRequest}
          verificationQuestions={verificationQuestions}
          answeredQuestions={answeredQuestions}
          isSubmitting={isSubmitting}
          submitError={submitError}
          onClose={closeModal}
          onApprove={({ requestId, staffNotes, status }) => void approveRequest(requestId, staffNotes, status)}
          onSubmitVerificationAnswers={({ requestId, answers }) => void submitVerificationAnswers(requestId, answers)}
        />
      ) : null}
    </div>
  );
}

