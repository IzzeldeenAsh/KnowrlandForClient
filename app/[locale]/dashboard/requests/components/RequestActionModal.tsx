'use client';

import { useMemo, useState } from 'react';

export type VerificationQuestion = {
  id: number;
  question: string;
  type: string;
  status?: string;
};

export type VerificationAnswerPayload = {
  verification_question_id: number;
  answer: string;
};

export type AnsweredQuestion = {
  id: number;
  verification_question_id: number;
  answer: string;
};

export type RequestItem = {
  id: number;
  type?: { key?: string; label?: string };
  requestable_type?: string;
  comments?: string | null;
  staff_notes?: string | null;
  handel_by?: string | null;
  handel_at?: string | null;
  status?: string;
  status_label?: string;
  final_status?: string;
  final_status_label?: string;
  children?: RequestItem[];
  requestable?: {
    id?: number;
    legal_name?: string;
    name?: string;
    logo?: string;
    website?: string;
    verified_email?: string;
    company_phone?: string;
    address?: string;
    email?: string;
    phone?: string;
    status?: string;
    about_us?: string;
  };
};

export type RequestModalKind =
  | 'activate_company'
  | 'deactivate_company'
  | 'verified_company_questions'
  | 'verified_company_review'
  | 'deactivate_delete'
  | 'view';

type RequestActionModalProps = {
  isOpen: boolean;
  kind: RequestModalKind;
  rootRequest: RequestItem;
  selectedRequest: RequestItem;
  verificationQuestions: VerificationQuestion[];
  answeredQuestions: AnsweredQuestion[];
  isSubmitting: boolean;
  submitError: string;
  onClose: () => void;
  onApprove: (payload: { requestId: number; staffNotes: string; status: 'approved' | 'declined' }) => void;
  onSubmitVerificationAnswers: (payload: { requestId: number; answers: VerificationAnswerPayload[] }) => void;
};

function getRequestableTitle(request: RequestItem): string {
  if (request.requestable_type === 'company') {
    return request.requestable?.legal_name?.trim() || 'Company';
  }
  return request.requestable?.name?.trim() || request.requestable?.legal_name?.trim() || 'Requestable';
}

function getRequestableSubtitle(request: RequestItem): string {
  if (request.requestable_type === 'company') {
    return request.requestable?.verified_email?.trim() || request.requestable?.website?.trim() || '';
  }
  return request.requestable?.email?.trim() || '';
}

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export default function RequestActionModal({
  isOpen,
  kind,
  rootRequest,
  selectedRequest,
  verificationQuestions,
  answeredQuestions,
  isSubmitting,
  submitError,
  onClose,
  onApprove,
  onSubmitVerificationAnswers,
}: RequestActionModalProps) {
  const [staffNotes, setStaffNotes] = useState<string>('');
  const [answersByQuestion, setAnswersByQuestion] = useState<Record<number, string>>({});
  const [localError, setLocalError] = useState<string>('');

  const requestTitle = getRequestableTitle(selectedRequest);
  const requestSubtitle = getRequestableSubtitle(selectedRequest);

  const answeredById = useMemo(() => {
    const map = new Map<number, AnsweredQuestion>();
    for (const entry of answeredQuestions) {
      if (typeof entry?.verification_question_id === 'number') {
        map.set(entry.verification_question_id, entry);
      }
    }
    return map;
  }, [answeredQuestions]);

  if (!isOpen) {
    return null;
  }

  const headerLabel = (() => {
    if (kind === 'activate_company') return 'Activate company request';
    if (kind === 'deactivate_company') return 'Deactivate company request';
    if (kind === 'verified_company_questions') return 'Verified company questions';
    if (kind === 'verified_company_review') return 'Verified company review';
    if (kind === 'deactivate_delete') return 'Deactivate/Delete request';
    return 'Request details';
  })();

  const showQuestionsForm = kind === 'verified_company_questions';
  const showAnsweredQuestions = kind === 'verified_company_review';
  const showApprovalActions =
    kind === 'activate_company' ||
    kind === 'deactivate_company' ||
    kind === 'verified_company_review' ||
    kind === 'deactivate_delete';

  const close = () => {
    setLocalError('');
    setStaffNotes('');
    setAnswersByQuestion({});
    onClose();
  };

  const requireStaffNotesForApproval = true;

  const approve = (status: 'approved' | 'declined') => {
    const trimmedNotes = staffNotes.trim();
    if (requireStaffNotesForApproval && !trimmedNotes) {
      setLocalError('Staff notes are required.');
      return;
    }
    setLocalError('');
    onApprove({ requestId: selectedRequest.id, staffNotes: trimmedNotes, status });
  };

  const submitAnswers = () => {
    if (!verificationQuestions.length) {
      setLocalError('Verification questions are not available.');
      return;
    }

    const payload: VerificationAnswerPayload[] = [];
    for (const question of verificationQuestions) {
      const answer = normalizeText(answersByQuestion[question.id]);
      if (!answer) {
        setLocalError('Please answer all verification questions.');
        return;
      }
      payload.push({ verification_question_id: question.id, answer });
    }

    setLocalError('');
    onSubmitVerificationAnswers({ requestId: selectedRequest.id, answers: payload });
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-900/40 px-4 py-6">
      <div className="mx-auto w-full max-w-4xl rounded-md border border-slate-200 bg-white p-4 shadow-sm max-h-[calc(100dvh-3rem)] overflow-y-auto">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">{headerLabel}</h2>
            <p className="mt-1 text-xs text-slate-500">
              #{selectedRequest.id} {selectedRequest.type?.label ? `| ${selectedRequest.type.label}` : ''}
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            className="h-8 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
          <div className="rounded-md border border-slate-200 bg-white p-3">
            <div className="flex items-center gap-3">
              {selectedRequest.requestable_type === 'company' && selectedRequest.requestable?.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selectedRequest.requestable.logo}
                  alt={requestTitle}
                  className="h-10 w-10 rounded-md border border-slate-200 object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-100 text-xs font-semibold text-slate-600">
                  {requestTitle.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-slate-900">{requestTitle}</div>
                {requestSubtitle ? (
                  <div className="truncate text-xs text-slate-500">{requestSubtitle}</div>
                ) : null}
              </div>
            </div>

            <dl className="mt-3 grid grid-cols-1 gap-2 text-xs text-slate-700">
              <div className="flex items-center justify-between gap-2">
                <dt className="text-slate-500">Request type</dt>
                <dd className="text-slate-800">{selectedRequest.type?.label ?? '-'}</dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="text-slate-500">Status</dt>
                <dd className="text-slate-800">{selectedRequest.final_status_label ?? selectedRequest.status_label ?? '-'}</dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="text-slate-500">Handled by</dt>
                <dd className="text-slate-800">{selectedRequest.handel_by ?? '-'}</dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="text-slate-500">Handled at</dt>
                <dd className="text-slate-800">{selectedRequest.handel_at ?? '-'}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-md border border-slate-200 bg-white p-3">
            <h3 className="text-xs font-semibold text-slate-800">Details</h3>
            <div className="mt-2 space-y-2 text-xs text-slate-700">
              {rootRequest.comments ? (
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Comments</div>
                  <div className="mt-1 whitespace-pre-wrap text-slate-800">{rootRequest.comments}</div>
                </div>
              ) : null}
              {selectedRequest.requestable?.about_us ? (
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">About</div>
                  <div className="mt-1 whitespace-pre-wrap text-slate-800">{selectedRequest.requestable.about_us}</div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {showQuestionsForm ? (
          <div className="mt-4 rounded-md border border-slate-200 bg-white p-3">
            <h3 className="text-xs font-semibold text-slate-800">Verification questions</h3>
            <p className="mt-1 text-xs text-slate-500">
              Fill out the answers first. After submission, you can re-open the request to approve or decline.
            </p>

            <div className="mt-3 space-y-3">
              {verificationQuestions.map((question) => {
                const value = answersByQuestion[question.id] ?? '';
                const label = question.question ?? `Question #${question.id}`;
                const type = (question.type ?? 'text').toLowerCase();

                return (
                  <div key={question.id}>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">{label}</label>
                    {type === 'boolean' ? (
                      <select
                        value={value}
                        onChange={(event) =>
                          setAnswersByQuestion((prev) => ({ ...prev, [question.id]: event.target.value }))
                        }
                        className="h-9 w-full rounded-md border border-slate-300 bg-white px-2 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400"
                      >
                        <option value="">Select...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    ) : (
                      <textarea
                        value={value}
                        onChange={(event) =>
                          setAnswersByQuestion((prev) => ({ ...prev, [question.id]: event.target.value }))
                        }
                        rows={3}
                        placeholder="Type your answer..."
                        className="w-full rounded-md border border-slate-300 px-2 py-2 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400"
                      />
                    )}
                  </div>
                );
              })}

              {localError ? <p className="text-xs text-red-600">{localError}</p> : null}
              {submitError ? <p className="text-xs text-red-600">{submitError}</p> : null}

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={close}
                  className="h-8 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submitAnswers}
                  disabled={isSubmitting}
                  className="h-8 rounded-md border border-blue-600 bg-blue-600 px-3 text-xs font-medium text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit answers'}
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {showAnsweredQuestions ? (
          <div className="mt-4 rounded-md border border-slate-200 bg-white p-3">
            <h3 className="text-xs font-semibold text-slate-800">Answered questions</h3>
            <div className="mt-3 space-y-3">
              {verificationQuestions.length ? (
                verificationQuestions.map((q) => {
                  const answered = answeredById.get(q.id);
                  return (
                    <div key={q.id} className="rounded-md border border-slate-100 bg-slate-50 p-2">
                      <div className="text-[11px] font-semibold text-slate-700">{q.question}</div>
                      <div className="mt-1 text-xs text-slate-800">{answered?.answer ?? '-'}</div>
                    </div>
                  );
                })
              ) : (
                <div className="text-xs text-slate-500">No questions available.</div>
              )}
            </div>
          </div>
        ) : null}

        {showApprovalActions ? (
          <div className="mt-4 rounded-md border border-slate-200 bg-white p-3">
            <h3 className="text-xs font-semibold text-slate-800">Staff notes</h3>
            <p className="mt-1 text-xs text-slate-500">Staff notes are required before approving or declining.</p>
            <textarea
              value={staffNotes}
              onChange={(event) => setStaffNotes(event.target.value)}
              rows={4}
              placeholder="Type your notes..."
              className="mt-2 w-full rounded-md border border-slate-300 px-2 py-2 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400"
            />

            {localError ? <p className="mt-2 text-xs text-red-600">{localError}</p> : null}
            {submitError ? <p className="mt-2 text-xs text-red-600">{submitError}</p> : null}

            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={() => approve('declined')}
                disabled={isSubmitting}
                className="h-8 rounded-md border border-red-600 bg-white px-3 text-xs font-medium text-red-700 shadow-sm hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => approve('approved')}
                disabled={isSubmitting}
                className="h-8 rounded-md border border-emerald-600 bg-emerald-600 px-3 text-xs font-medium text-white shadow-sm hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Approve
              </button>
            </div>
          </div>
        ) : null}

        {kind === 'view' ? (
          <div className="mt-4 rounded-md border border-slate-200 bg-white p-3">
            <div className="text-xs text-slate-500">
              No actions are configured for request type: <span className="font-semibold">{selectedRequest.type?.key ?? '-'}</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
