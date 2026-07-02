'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { IconBuilding, IconUser, IconEye, IconFileText } from '@tabler/icons-react';
import PageHeader from '@/components/insighter-dashboard/PageHeader';
import DashboardGuard from '@/components/insighter-dashboard/DashboardGuard';
import { useRoleCheck } from '@/hooks/useRoleCheck';
import RequestDialog from './RequestDialog';
import {
  getUserRequestsPage,
  getInsighterRequestsPage,
  type DetailedUserRequest,
  type PaginationMeta,
} from '@/services/insighter-dashboard.api';

const PER_PAGE = 10;

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

/** Pick the most recent request in a parent/children tree (Angular getLatestChild). */
function getLatestChild(request: DetailedUserRequest): DetailedUserRequest {
  let latest = request;
  let latestValue = sortValue(request);
  for (const child of request.children ?? []) {
    const candidate = getLatestChild(child);
    const value = sortValue(candidate);
    if (value > latestValue) {
      latest = candidate;
      latestValue = value;
    }
  }
  return latest;
}

function sortValue(request: DetailedUserRequest): number {
  for (const value of [request.updated_at, request.created_at, request.handel_at]) {
    if (!value) continue;
    const parsed = Date.parse(String(value).replace(' ', 'T'));
    if (!Number.isNaN(parsed)) return parsed;
  }
  return request.id ?? 0;
}

function RequestCard({
  request,
  onOpen,
  viewLabel,
}: {
  request: DetailedUserRequest;
  onOpen: () => void;
  viewLabel: string;
}) {
  const isCompany = request.requestable_type === 'company';
  const name = isCompany
    ? (request.requestable?.legal_name as string)
    : `${request.requestable?.first_name ?? ''} ${request.requestable?.last_name ?? ''}`.trim();

  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-full items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 text-start transition-shadow hover:border-sky-300"
    >
      <div className="flex min-w-0 items-center gap-3">
        {request.requestable?.profile_photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={request.requestable.profile_photo_url}
            alt=""
            className="h-10 w-10 shrink-0 rounded-full object-cover object-top"
          />
        ) : (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600">
            {isCompany ? <IconBuilding size={18} /> : <IconUser size={18} />}
          </span>
        )}
        <span className="truncate text-sm font-bold text-gray-800">{name || '—'}</span>
      </div>
      <span className="hidden rounded-md bg-[#EFF8FF] px-2.5 py-1 text-xs font-bold text-[#299AF8] md:inline">
        {request.type?.label}
      </span>
      <span
        className={`hidden rounded-full px-2.5 py-1 text-xs font-bold md:inline ${statusBadge(request.final_status)}`}
      >
        {request.final_status_label || request.final_status}
      </span>
      <span className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-semibold text-white">
        <IconEye size={14} />
        {viewLabel}
      </span>
    </button>
  );
}

function RequestsSection({
  title,
  requests,
  meta,
  loading,
  showTypeFilter,
  filters,
  onFiltersChange,
  onPage,
  onOpen,
}: {
  title: string;
  requests: DetailedUserRequest[];
  meta: PaginationMeta;
  loading: boolean;
  showTypeFilter?: boolean;
  filters: { type: string; status: string };
  onFiltersChange: (f: { type: string; status: string }) => void;
  onPage: (page: number) => void;
  onOpen: (request: DetailedUserRequest) => void;
}) {
  const t = useTranslations('InsighterDashboard.myRequests');
  const hasFilters = !!filters.type || !!filters.status;

  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-4">
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
        <div className="flex items-center gap-3">
          {showTypeFilter && (
            <label className="flex items-center gap-2 text-xs text-gray-500">
              {t('filter.requestType')}
              <select
                value={filters.type}
                onChange={(e) => onFiltersChange({ ...filters, type: e.target.value })}
                className="rounded-lg border border-gray-200 px-2 py-1.5 text-sm outline-none focus:border-sky-400"
              >
                <option value="">{t('filter.showAll')}</option>
                <option value="accept_knowledge">{t('filter.acceptKnowledge')}</option>
              </select>
            </label>
          )}
          <label className="flex items-center gap-2 text-xs text-gray-500">
            {t('filter.status')}
            <select
              value={filters.status}
              onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
              className="rounded-lg border border-gray-200 px-2 py-1.5 text-sm outline-none focus:border-sky-400"
            >
              <option value="">{t('filter.showAll')}</option>
              <option value="pending">{t('filter.pending')}</option>
              <option value="approved">{t('filter.approved')}</option>
              <option value="rejected">{t('filter.rejected')}</option>
            </select>
          </label>
        </div>
      </div>

      <div className="p-5">
        {loading ? (
          <div className="flex min-h-[120px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
          </div>
        ) : requests.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <IconFileText size={36} className="text-gray-300" />
            <h4 className="font-bold text-gray-800">{t('empty.title')}</h4>
            <p className="max-w-md text-sm text-gray-500">
              {hasFilters ? t('empty.filteredMessage') : t('empty.message')}
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={() => onFiltersChange({ type: '', status: '' })}
                className="mt-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                {t('empty.clearFilters')}
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {requests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                viewLabel={t('view')}
                onOpen={() => onOpen(request)}
              />
            ))}
          </div>
        )}

        {!loading && meta.total > meta.per_page && (
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {t('page')} {meta.current_page} {t('of')} {meta.last_page}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => onPage(p)}
                  className={`min-w-[32px] rounded-md px-2 py-1.5 text-sm font-medium ${
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
    </div>
  );
}

/** /insighter-dashboard/my-requests — mirrors Angular MyRequestsComponent. */
export default function MyRequestsClient() {
  const t = useTranslations('InsighterDashboard.myRequests');
  const locale = useLocale();
  const { roles } = useRoleCheck();
  const isCompany = roles.includes('company');

  const emptyMeta: PaginationMeta = { current_page: 1, last_page: 1, per_page: PER_PAGE, total: 0 };

  const [userRequests, setUserRequests] = useState<DetailedUserRequest[]>([]);
  const [userMeta, setUserMeta] = useState<PaginationMeta>(emptyMeta);
  const [userLoading, setUserLoading] = useState(true);
  const [userFilters, setUserFilters] = useState({ type: '', status: '' });

  const [insighterRequests, setInsighterRequests] = useState<DetailedUserRequest[]>([]);
  const [insighterMeta, setInsighterMeta] = useState<PaginationMeta>(emptyMeta);
  const [insighterLoading, setInsighterLoading] = useState(false);
  const [insighterFilters, setInsighterFilters] = useState({ type: '', status: '' });

  const [dialog, setDialog] = useState<{
    request: DetailedUserRequest;
    isInsighter: boolean;
    hasPending: boolean;
  } | null>(null);

  const loadUser = useCallback(
    (page: number, filters: { type: string; status: string }) => {
      setUserLoading(true);
      getUserRequestsPage(locale, page, PER_PAGE, {
        type: filters.type || undefined,
        final_status: filters.status || undefined,
      })
        .then((res) => {
          setUserRequests(res.data);
          setUserMeta(res.meta);
        })
        .catch(() => setUserRequests([]))
        .finally(() => setUserLoading(false));
    },
    [locale]
  );

  const loadInsighter = useCallback(
    (page: number, filters: { type: string; status: string }) => {
      setInsighterLoading(true);
      getInsighterRequestsPage(locale, page, PER_PAGE, {
        type: filters.type || undefined,
        final_status: filters.status || undefined,
      })
        .then((res) => {
          setInsighterRequests(res.data);
          setInsighterMeta(res.meta);
        })
        .catch(() => setInsighterRequests([]))
        .finally(() => setInsighterLoading(false));
    },
    [locale]
  );

  useEffect(() => {
    loadUser(1, userFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadUser]);

  useEffect(() => {
    if (isCompany) loadInsighter(1, insighterFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompany, loadInsighter]);

  const openDialog = (request: DetailedUserRequest, isInsighter: boolean) => {
    const source = isInsighter ? insighterRequests : userRequests;
    const latest = getLatestChild(request);
    latest.identity_object = latest.identity_object || request.identity_object;
    const hasPending = source.some(
      (r) =>
        r.type?.key === latest.type?.key && r.final_status === 'pending' && r.id !== latest.id
    );
    setDialog({ request: latest, isInsighter, hasPending });
  };

  const reload = useMemo(
    () => () => {
      loadUser(userMeta.current_page, userFilters);
      if (isCompany) loadInsighter(insighterMeta.current_page, insighterFilters);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loadUser, loadInsighter, isCompany, userMeta.current_page, insighterMeta.current_page, userFilters, insighterFilters]
  );

  return (
    <DashboardGuard roles={['insighter', 'company', 'company-insighter']}>
      <PageHeader
        icon={<IconFileText size={22} />}
        title={t('title')}
        subtitle={t('subtitle')}
      />

      <RequestsSection
        title={t('title')}
        requests={userRequests}
        meta={userMeta}
        loading={userLoading}
        filters={userFilters}
        onFiltersChange={(f) => {
          setUserFilters(f);
          loadUser(1, f);
        }}
        onPage={(p) => loadUser(p, userFilters)}
        onOpen={(r) => openDialog(r, false)}
      />

      {isCompany && (
        <RequestsSection
          title={t('insighterTitle')}
          requests={insighterRequests}
          meta={insighterMeta}
          loading={insighterLoading}
          showTypeFilter
          filters={insighterFilters}
          onFiltersChange={(f) => {
            setInsighterFilters(f);
            loadInsighter(1, f);
          }}
          onPage={(p) => loadInsighter(p, insighterFilters)}
          onOpen={(r) => openDialog(r, true)}
        />
      )}

      {dialog && (
        <RequestDialog
          request={dialog.request}
          isInsighterRequest={dialog.isInsighter}
          hasPendingOfSameType={dialog.hasPending}
          onClose={() => setDialog(null)}
          onChanged={reload}
        />
      )}
    </DashboardGuard>
  );
}
