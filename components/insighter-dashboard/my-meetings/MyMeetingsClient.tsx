'use client';

import { useCallback, useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Modal } from '@mantine/core';
import {
  IconCalendar,
  IconVideo,
  IconArchive,
  IconClock,
} from '@tabler/icons-react';
import PageHeader, { PageHeaderTab } from '@/components/insighter-dashboard/PageHeader';
import { useToast } from '@/components/toast/ToastContext';
import { useGlobalProfile } from '@/components/auth/GlobalProfileProvider';
import { isClientOnly } from '@/components/insighter-dashboard/nav-config';
import {
  getReceivedMeetings,
  getSentMeetingsList,
  updateMeetingAction,
  archiveReceivedMeeting,
  archiveSentMeeting,
  type ReceivedMeeting,
  type SentMeetingFull,
  type PaginationMeta,
} from '@/services/insighter-dashboard.api';

type MainTab = 'received' | 'sent';
type DateFilter = 'coming' | 'past' | 'archived';

function statusBadge(status: string): string {
  switch (status) {
    case 'approved':
      return 'bg-[#DFFEE9] text-[#1BC653]';
    case 'pending':
      return 'bg-amber-50 text-amber-600';
    case 'postponed':
      return 'bg-[#EFF8FF] text-[#299AF8]';
    default:
      return 'bg-gray-100 text-gray-500';
  }
}

type AnyMeeting = (ReceivedMeeting | SentMeetingFull) & { [key: string]: unknown };

function MyMeetingsInner() {
  const t = useTranslations('InsighterDashboard.myMeetings');
  const locale = useLocale();
  const toast = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { roles } = useGlobalProfile();

  const clientOnly = isClientOnly(roles);
  const tabParam = (searchParams.get('tab') || '').toLowerCase();
  const initialTab: MainTab =
    clientOnly || tabParam === 'my-meetings' || tabParam === 'sent' ? 'sent' : 'received';

  const [tab, setTab] = useState<MainTab>(initialTab);
  const [filter, setFilter] = useState<DateFilter>('coming');
  const [meetings, setMeetings] = useState<AnyMeeting[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState<{
    meeting: ReceivedMeeting;
    kind: 'approved' | 'postponed';
  } | null>(null);
  const [notes, setNotes] = useState('');
  const [busy, setBusy] = useState(false);

  // If roles resolve to client-only after mount, force sent tab
  useEffect(() => {
    if (clientOnly && tab === 'received') setTab('sent');
  }, [clientOnly, tab]);

  const load = useCallback(
    (mainTab: MainTab, dateFilter: DateFilter, page: number) => {
      setLoading(true);
      const options = {
        page,
        perPage: 10,
        dateStatus: dateFilter === 'archived' ? undefined : dateFilter,
        archived: dateFilter === 'archived',
      };
      const fetcher =
        mainTab === 'received' ? getReceivedMeetings(locale, options) : getSentMeetingsList(locale, options);
      fetcher
        .then((res) => {
          setMeetings((res.data ?? []) as AnyMeeting[]);
          setMeta(res.meta ?? null);
        })
        .catch((err) => toast.handleServerErrors(err))
        .finally(() => setLoading(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale]
  );

  useEffect(() => {
    load(tab, filter, 1);
  }, [tab, filter, load]);

  const switchTab = (next: MainTab) => {
    setTab(next);
    setFilter('coming');
    router.replace(`?tab=${next === 'received' ? 'client' : 'my-meetings'}`, { scroll: false });
  };

  const runAction = async () => {
    if (!action || !notes.trim()) return;
    setBusy(true);
    try {
      await updateMeetingAction(locale, action.meeting.uuid, action.kind, notes);
      toast.success(action.kind === 'approved' ? t('approveSuccess') : t('postponeSuccess'));
      setAction(null);
      setNotes('');
      load(tab, filter, meta?.current_page ?? 1);
    } catch (err) {
      toast.handleServerErrors(err);
    } finally {
      setBusy(false);
    }
  };

  const archive = async (meeting: AnyMeeting) => {
    try {
      if (tab === 'received') await archiveReceivedMeeting(locale, meeting.uuid as string);
      else await archiveSentMeeting(locale, meeting.uuid as string);
      toast.success(t('archiveSuccess'));
      load(tab, filter, meta?.current_page ?? 1);
    } catch (err) {
      toast.handleServerErrors(err);
    }
  };

  const person = (m: AnyMeeting) =>
    tab === 'received'
      ? (m as ReceivedMeeting).client
      : (m as SentMeetingFull).insighter;

  const dateFormat = new Intl.DateTimeFormat(locale === 'ar' ? 'ar' : 'en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const formatDay = (value: string) => {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? value : dateFormat.format(parsed);
  };

  return (
    <div>
      <PageHeader
        icon={<IconCalendar size={22} />}
        title={t('title')}
        tabs={
          <>
            {!clientOnly && (
              <PageHeaderTab active={tab === 'received'} onClick={() => switchTab('received')}>
                {t('tabs.received')}
              </PageHeaderTab>
            )}
            <PageHeaderTab active={tab === 'sent'} onClick={() => switchTab('sent')}>
              {t('tabs.sent')}
            </PageHeaderTab>
          </>
        }
      />

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        {/* Date filter chips */}
        <div className="mb-4 flex flex-wrap gap-2">
          {(['coming', 'past', 'archived'] as DateFilter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                filter === f
                  ? 'border-sky-500 bg-sky-50 text-sky-600'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              {t(`filters.${f}`)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
          </div>
        ) : meetings.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <IconCalendar size={40} className="text-gray-300" />
            <p className="text-sm text-gray-500">{t('empty')}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {meetings.map((m) => {
              const p = person(m);
              return (
                <div
                  key={m.uuid as string}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-100 p-4 hover:border-gray-300"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    {p?.profile_photo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.profile_photo_url as string}
                        alt=""
                        className="h-10 w-10 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sm font-bold text-sky-600">
                        {String(p?.name ?? '?').charAt(0)}
                      </span>
                    )}
                    <div className="min-w-0">
                      <div className="truncate text-sm font-bold text-gray-800">{m.title as string}</div>
                      <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
                        <span>
                          {t('with')} {p?.name as string}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <IconCalendar size={12} />
                          {formatDay(m.date as string)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <IconClock size={12} />
                          {m.start_time as string}–{m.end_time as string}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusBadge(m.status as string)}`}
                    >
                      {t.has(`status.${m.status}`) ? t(`status.${m.status}`) : (m.status as string)}
                    </span>

                    {m.status === 'approved' && !!m.meeting_url && (
                      <a
                        href={m.meeting_url as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-600"
                      >
                        <IconVideo size={14} />
                        {t('join')}
                      </a>
                    )}

                    {tab === 'received' && m.status === 'pending' && (
                      <>
                        <button
                          type="button"
                          onClick={() => setAction({ meeting: m as ReceivedMeeting, kind: 'approved' })}
                          className="rounded-lg border border-green-500 px-3 py-1.5 text-xs font-semibold text-green-600 hover:bg-green-50"
                        >
                          {t('approve')}
                        </button>
                        <button
                          type="button"
                          onClick={() => setAction({ meeting: m as ReceivedMeeting, kind: 'postponed' })}
                          className="rounded-lg border border-amber-500 px-3 py-1.5 text-xs font-semibold text-amber-600 hover:bg-amber-50"
                        >
                          {t('postpone')}
                        </button>
                      </>
                    )}

                    {filter !== 'archived' && (
                      <button
                        type="button"
                        title={t('archive')}
                        onClick={() => archive(m)}
                        className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                      >
                        <IconArchive size={16} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && meta && meta.last_page > 1 && (
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-500">
              {t('page')} {meta.current_page} {t('of')} {meta.last_page}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => load(tab, filter, p)}
                  className={`min-w-[28px] rounded-md px-1.5 py-1 text-xs font-medium ${
                    p === meta.current_page ? 'bg-sky-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Approve / postpone dialog */}
      <Modal
        opened={!!action}
        onClose={() => !busy && setAction(null)}
        title={action?.kind === 'approved' ? t('approve') : t('postpone')}
        centered
      >
        <label className="mb-1 block text-xs font-bold uppercase text-gray-400">{t('notes')}</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={t('notesPlaceholder')}
          rows={3}
          className="w-full rounded-lg border border-gray-200 p-3 text-sm outline-none focus:border-sky-400"
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={() => setAction(null)}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
          >
            {t('cancel')}
          </button>
          <button
            type="button"
            disabled={busy || !notes.trim()}
            onClick={runAction}
            className={`rounded-lg px-4 py-2 text-sm font-semibold text-white ${
              action?.kind === 'approved'
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-amber-500 hover:bg-amber-600'
            } ${busy || !notes.trim() ? 'opacity-60' : ''}`}
          >
            {t('confirm')}
          </button>
        </div>
      </Modal>
    </div>
  );
}

/** /insighter-dashboard/my-meetings — client & sent sessions. */
export default function MyMeetingsClient() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
        </div>
      }
    >
      <MyMeetingsInner />
    </Suspense>
  );
}
