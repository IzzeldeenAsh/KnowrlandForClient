'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Modal } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import { useToast } from '@/components/toast/ToastContext';
import {
  updateInsighterRequestStatus,
  resendRequest,
  type DetailedUserRequest,
} from '@/services/insighter-dashboard.api';

const RESENDABLE_TYPES = [
  'activate_company',
  'verified_company',
  'deactivate_delete_company',
  'deactivate_delete_insighter',
  'accept_knowledge',
];

function statusBadge(finalStatus: string): string {
  switch (finalStatus) {
    case 'pending':
      return 'bg-amber-50 text-amber-600';
    case 'approved':
      return 'bg-[#DFFEE9] text-[#1BC653]';
    default:
      return 'bg-red-50 text-red-500';
  }
}

/**
 * Request details dialog. For the user's own requests: shows details +
 * resend flow for rejected requests. For insighter requests (company view):
 * approve/decline with required staff notes.
 */
export default function RequestDialog({
  request,
  isInsighterRequest,
  hasPendingOfSameType,
  onClose,
  onChanged,
}: {
  request: DetailedUserRequest | null;
  isInsighterRequest: boolean;
  hasPendingOfSameType: boolean;
  onClose: () => void;
  onChanged: () => void;
}) {
  const t = useTranslations('InsighterDashboard.myRequests.dialog');
  const locale = useLocale();
  const router = useRouter();
  const toast = useToast();

  const [resendComments, setResendComments] = useState('');
  const [staffNotes, setStaffNotes] = useState('');
  const [decision, setDecision] = useState<'approved' | 'declined' | null>(null);
  const [busy, setBusy] = useState(false);
  const [notesTouched, setNotesTouched] = useState(false);

  if (!request) return null;

  const isRejected = request.final_status === 'rejected' || request.final_status === 'declined';
  const canResend =
    !isInsighterRequest && isRejected && RESENDABLE_TYPES.includes(request.type?.key ?? '');
  const isKnowledgeRequest = request.type?.key === 'accept_knowledge' && !!request.identity;

  const doResend = async () => {
    setNotesTouched(true);
    if (!resendComments.trim()) return;
    setBusy(true);
    try {
      await resendRequest(
        locale,
        request.type.key,
        resendComments,
        String(request.id),
        request.identity ? String(request.identity) : undefined
      );
      toast.success(t('resendSuccess'));
      onChanged();
      onClose();
    } catch (err) {
      toast.handleServerErrors(err);
    } finally {
      setBusy(false);
    }
  };

  const doDecision = async () => {
    setNotesTouched(true);
    if (!decision || !staffNotes.trim()) return;
    setBusy(true);
    try {
      await updateInsighterRequestStatus(locale, request.id, decision, staffNotes);
      toast.success(decision === 'approved' ? t('approveSuccess') : t('declineSuccess'));
      onChanged();
      onClose();
    } catch (err) {
      toast.handleServerErrors(err);
    } finally {
      setBusy(false);
    }
  };

  const goToKnowledge = () => {
    if (isRejected) {
      toast.warning(t('rejectedInfo'));
      return;
    }
    if (isInsighterRequest) {
      router.push(
        `/${locale}/review-insighter-knowledge/review/${request.identity}?requestId=${request.id}`
      );
    } else {
      router.push(`/${locale}/my-knowledge-base/view-my-knowledge/${parseInt(request.identity!)}/details`);
    }
    onClose();
  };

  return (
    <Modal opened onClose={() => !busy && onClose()} title={t('header')} centered size="lg">
      <div className="flex flex-col gap-4">
        {/* Summary */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-md bg-[#EFF8FF] px-2.5 py-1 text-xs font-bold text-[#299AF8]">
            {request.type?.label}
          </span>
          <span
            className={`rounded-md px-2.5 py-1 text-xs font-bold ${statusBadge(request.final_status)}`}
          >
            {request.final_status_label || request.final_status}
          </span>
        </div>

        {request.identity_object?.title && (
          <div className="text-sm font-semibold text-gray-800">{request.identity_object.title}</div>
        )}

        {request.comments && (
          <div>
            <div className="mb-1 text-xs font-bold uppercase text-gray-400">{t('comments')}</div>
            <p className="rounded-lg bg-gray-50 p-3 text-sm text-gray-700">{request.comments}</p>
          </div>
        )}

        <div>
          <div className="mb-1 text-xs font-bold uppercase text-gray-400">{t('staffNotes')}</div>
          <p className="rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
            {request.staff_notes || t('noStaffNotes')}
          </p>
        </div>

        {/* Knowledge navigation */}
        {isKnowledgeRequest && (
          <button
            type="button"
            onClick={goToKnowledge}
            className="self-start rounded-lg border border-sky-500 px-4 py-2 text-sm font-semibold text-sky-600 hover:bg-sky-50"
          >
            {isInsighterRequest ? t('review') : t('viewKnowledge')}
          </button>
        )}

        {/* Pending duplicate warning */}
        {hasPendingOfSameType && (
          <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <IconAlertTriangle size={18} className="shrink-0" />
            {t('pendingRequestExists')}
          </div>
        )}

        {/* Resend flow */}
        {canResend && !hasPendingOfSameType && (
          <div>
            <div className="mb-1 text-xs font-bold uppercase text-gray-400">{t('resendRequest')}</div>
            <textarea
              value={resendComments}
              onChange={(e) => setResendComments(e.target.value)}
              placeholder={t('resendPlaceholder')}
              rows={3}
              className={`w-full rounded-lg border p-3 text-sm outline-none focus:border-sky-400 ${
                notesTouched && !resendComments.trim() ? 'border-red-300' : 'border-gray-200'
              }`}
            />
            {notesTouched && !resendComments.trim() && (
              <p className="mt-1 text-xs text-red-500">{t('notesRequired')}</p>
            )}
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                disabled={busy}
                onClick={doResend}
                className={`rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600 ${busy ? 'opacity-60' : ''}`}
              >
                {t('resendRequest')}
              </button>
            </div>
          </div>
        )}

        {/* Approve / decline (company on insighter requests) */}
        {isInsighterRequest && request.final_status === 'pending' && !isKnowledgeRequest && (
          <div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setDecision('approved')}
                className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                  decision === 'approved'
                    ? 'bg-green-500 text-white'
                    : 'border border-green-500 text-green-600 hover:bg-green-50'
                }`}
              >
                {t('approve')}
              </button>
              <button
                type="button"
                onClick={() => setDecision('declined')}
                className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                  decision === 'declined'
                    ? 'bg-red-500 text-white'
                    : 'border border-red-500 text-red-600 hover:bg-red-50'
                }`}
              >
                {t('decline')}
              </button>
            </div>
            {decision && (
              <div className="mt-3">
                <textarea
                  value={staffNotes}
                  onChange={(e) => setStaffNotes(e.target.value)}
                  placeholder={t('notesPlaceholder')}
                  rows={3}
                  className={`w-full rounded-lg border p-3 text-sm outline-none focus:border-sky-400 ${
                    notesTouched && !staffNotes.trim() ? 'border-red-300' : 'border-gray-200'
                  }`}
                />
                {notesTouched && !staffNotes.trim() && (
                  <p className="mt-1 text-xs text-red-500">{t('notesRequired')}</p>
                )}
                <div className="mt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => {
                      setDecision(null);
                      setStaffNotes('');
                      setNotesTouched(false);
                    }}
                    className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={doDecision}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold text-white ${
                      decision === 'approved' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                    } ${busy ? 'opacity-60' : ''}`}
                  >
                    {t('confirm')}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
