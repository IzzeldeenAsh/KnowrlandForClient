'use client';

import { Tooltip } from '@mantine/core';
import { IconBrandWhatsapp, IconBriefcase, IconFileCheck, IconFileX, IconFilter, IconX } from '@tabler/icons-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getAuthToken } from '@/lib/authToken';
import { useToast } from '@/components/toast/ToastContext';
import { buildAuthHeaders, parseApiError } from '../../../_config/api';
import CompanyActionModal from './CompanyActionModal';

type CompanyAction = 'activate' | 'deactivate' | 'delete';

type BooleanFilter = '' | '1' | '0';
type ActivityPeriod = '' | 'week' | 'month' | '3month' | 'year' | 'more_than_year';

type CompanyFilters = {
  whatsappActivated: BooleanFilter;
  receiveServiceActivated: BooleanFilter;
  publishedInsightsPeriod: ActivityPeriod;
  publishedInsightsMoreThan: string;
};

type ProjectServicesStatus = 'active' | 'inactive' | null;

type CompanyRecord = {
  id: number;
  name: string;
  email: string;
  whatsappCountryCode: string | null;
  whatsappNumber: string | null;
  country: string | null;
  status: string;
  verified: boolean;
  logoUrl: string | null;
  companyName: string | null;
  receiveProjectServices: ProjectServicesStatus;
  publishedInsightAtLeastOne: boolean;
};

type ActionModalState = {
  isOpen: boolean;
  action: CompanyAction;
  company: CompanyRecord | null;
};

type DonutSlice = {
  value: number;
  color: string;
  label: string;
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

function normalizePhonePart(value: string | null | undefined): string {
  return typeof value === 'string' ? value.replace(/[^\d]/g, '') : '';
}

function buildWhatsappUrl(countryCode: string | null, phoneNumber: string | null): string | null {
  const normalizedCountryCode = normalizePhonePart(countryCode);
  const normalizedPhoneNumber = normalizePhonePart(phoneNumber);
  const combinedNumber = `${normalizedCountryCode}${normalizedPhoneNumber}`;

  return combinedNumber ? `https://web.whatsapp.com/send?phone=${combinedNumber}` : null;
}

function formatWhatsappNumber(countryCode: string | null, phoneNumber: string | null): string | null {
  const normalizedCountryCode = normalizePhonePart(countryCode);
  const normalizedPhoneNumber = normalizePhonePart(phoneNumber);

  if (!normalizedCountryCode && !normalizedPhoneNumber) {
    return null;
  }

  if (normalizedCountryCode && normalizedPhoneNumber) {
    return `+${normalizedCountryCode} ${normalizedPhoneNumber}`;
  }

  if (normalizedCountryCode) {
    return `+${normalizedCountryCode}`;
  }

  return normalizedPhoneNumber;
}

const INPUT_CLASS =
  'h-8 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400';
const PRIMARY_BUTTON_CLASS =
  'h-8 rounded-md border border-blue-600 bg-blue-600 px-4 text-xs font-medium text-white shadow-sm hover:bg-blue-700';
const ROW_ACTION_BUTTON_CLASS =
  'rounded-md border bg-white px-2 py-1 text-[10px] font-medium shadow-sm';
const FILTER_INPUT_CLASS =
  'mt-1.5 h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100';

const EMPTY_FILTERS: CompanyFilters = {
  whatsappActivated: '',
  receiveServiceActivated: '',
  publishedInsightsPeriod: '',
  publishedInsightsMoreThan: '',
};

const PERIOD_OPTIONS: Array<{ value: ActivityPeriod; label: string }> = [
  { value: '', label: 'Any time' },
  { value: 'week', label: 'Last week' },
  { value: 'month', label: 'Last month' },
  { value: '3month', label: 'Last 3 months' },
  { value: 'year', label: 'Last year' },
  { value: 'more_than_year', label: 'More than a year ago' },
];

function countActiveFilters(filters: CompanyFilters): number {
  return Object.values(filters).filter(Boolean).length;
}

function buildCompanyListUrl(filters: CompanyFilters): string {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/account/company/list`,
    window.location.origin
  );

  if (filters.whatsappActivated) {
    url.searchParams.set('whatsapp_activated', filters.whatsappActivated);
  }
  if (filters.receiveServiceActivated) {
    url.searchParams.set('receive_service_activated', filters.receiveServiceActivated);
  }
  if (filters.publishedInsightsPeriod) {
    url.searchParams.set('published_insights_period', filters.publishedInsightsPeriod);
  }
  if (filters.publishedInsightsMoreThan) {
    url.searchParams.set('published_insights_more_than', filters.publishedInsightsMoreThan);
  }

  return url.toString();
}

function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function DonutChart({
  size = 44,
  strokeWidth = 7,
  slices,
  centerLabel,
}: {
  size?: number;
  strokeWidth?: number;
  slices: DonutSlice[];
  centerLabel: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = slices.reduce((sum, slice) => sum + slice.value, 0);

  let offset = 0;
  const normalizedSlices = total > 0 ? slices.filter((slice) => slice.value > 0) : [];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#e2e8f0"
        strokeWidth={strokeWidth}
      />
      {normalizedSlices.map((slice) => {
        const fraction = slice.value / total;
        const dash = circumference * fraction;
        const dashArray = `${dash} ${circumference - dash}`;
        const dashOffset = circumference * offset;
        offset += fraction;

        return (
          <circle
            key={slice.label}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={slice.color}
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={-dashOffset}
            strokeLinecap="butt"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        );
      })}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="#0f172a"
        fontSize={12}
        fontWeight={700}
      >
        {centerLabel}
      </text>
    </svg>
  );
}

function CountryBars({ entries }: { entries: Array<{ country: string; count: number }> }) {
  const maxCount = entries.reduce((max, entry) => Math.max(max, entry.count), 0);
  if (!entries.length) {
    return <div className="text-xs text-slate-500">No country data yet.</div>;
  }

  return (
    <div className="space-y-2">
      {entries.map((entry) => {
        const pct = maxCount > 0 ? clampNumber((entry.count / maxCount) * 100, 0, 100) : 0;
        return (
          <div key={entry.country} className="space-y-1">
            <div className="flex items-center justify-between gap-2">
              <div className="truncate text-xs font-semibold text-slate-800">{entry.country}</div>
              <div className="text-[11px] font-semibold text-slate-600">{entry.count}</div>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-blue-600" style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
  }
  return (parts[0] ?? 'U').slice(0, 2).toUpperCase();
}

function getActionLabel(action: CompanyAction): string {
  if (action === 'activate') return 'Activate';
  if (action === 'deactivate') return 'Deactivate';
  return 'Delete';
}

function getEndpoint(action: CompanyAction, id: number): string {
  if (action === 'activate') {
    return `${process.env.NEXT_PUBLIC_API_URL}/api/admin/account/company/activate/${id}`;
  }
  if (action === 'deactivate') {
    return `${process.env.NEXT_PUBLIC_API_URL}/api/admin/account/company/deactivate/${id}`;
  }
  return `${process.env.NEXT_PUBLIC_API_URL}/api/admin/account/company/deactivate-delete/${id}`;
}

function normalizeProjectServices(value: unknown): ProjectServicesStatus {
  const normalized = typeof value === 'string' ? value.trim().toLowerCase() : '';
  if (normalized === 'active') return 'active';
  if (normalized === 'inactive') return 'inactive';
  return null;
}

function normalizeCompanies(payload: unknown): CompanyRecord[] {
  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const data = (payload as { data?: unknown }).data;
  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .map((entry) => {
      const row = entry as {
        id?: number | string;
        name?: string;
        email?: string;
        whatsapp_country_code?: string | null;
        whatsapp_number?: string | null;
        country?: string | null;
        profile_photo_url?: string | null;
        verified?: boolean | number | string;
        receive_project_services?: string | null;
        published_insight_at_least_one?: boolean | number | string | null;
        company?: {
          legal_name?: string;
          status?: string;
          logo?: string | null;
          logo_url?: string | null;
        } | Array<unknown>;
        insighter_status?: string;
        client_status?: string;
      };

      const numericId = Number(row.id);
      if (!Number.isFinite(numericId) || numericId <= 0) {
        return null;
      }

      const companyObject =
        row.company && typeof row.company === 'object' && !Array.isArray(row.company)
          ? row.company
          : null;

      const resolvedStatus =
        (typeof companyObject?.status === 'string' && companyObject.status.trim() && companyObject.status) ||
        (typeof row.insighter_status === 'string' && row.insighter_status.trim() && row.insighter_status) ||
        (typeof row.client_status === 'string' && row.client_status.trim() && row.client_status) ||
        'unknown';

      const resolvedCompanyName =
        typeof companyObject?.legal_name === 'string' && companyObject.legal_name.trim()
          ? companyObject.legal_name
          : null;

      const resolvedLogoUrl =
        typeof companyObject?.logo === 'string' && companyObject.logo.trim()
          ? companyObject.logo
          : typeof companyObject?.logo_url === 'string' && companyObject.logo_url.trim()
            ? companyObject.logo_url
            : null;

      return {
        id: numericId,
        name: typeof row.name === 'string' && row.name.trim() ? row.name : 'Unknown',
        email: typeof row.email === 'string' && row.email.trim() ? row.email : '-',
        whatsappCountryCode:
          typeof row.whatsapp_country_code === 'string' && row.whatsapp_country_code.trim()
            ? row.whatsapp_country_code
            : null,
        whatsappNumber:
          typeof row.whatsapp_number === 'string' && row.whatsapp_number.trim()
            ? row.whatsapp_number
            : null,
        country: typeof row.country === 'string' && row.country.trim() ? row.country : null,
        status: resolvedStatus,
        verified: Boolean(row.verified),
        logoUrl: resolvedLogoUrl,
        companyName: resolvedCompanyName,
        receiveProjectServices: normalizeProjectServices(row.receive_project_services),
        publishedInsightAtLeastOne:
          row.published_insight_at_least_one === true ||
          row.published_insight_at_least_one === 1 ||
          row.published_insight_at_least_one === '1' ||
          row.published_insight_at_least_one === 'true',
      } satisfies CompanyRecord;
    })
    .filter((company): company is CompanyRecord => company !== null);
}

function getStatusBadgeClass(status: string): string {
  const normalized = status.toLowerCase();
  if (normalized === 'active') {
    return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-300';
  }

  if (normalized === 'inactive') {
    return 'bg-red-50 text-red-700 ring-1 ring-red-300';
  }

  return 'bg-slate-100 text-slate-700 ring-1 ring-slate-300';
}

export default function CompaniesTab() {
  const { handleServerErrors, success } = useToast();
  const [companies, setCompanies] = useState<CompanyRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [filters, setFilters] = useState<CompanyFilters>(EMPTY_FILTERS);
  const [modalState, setModalState] = useState<ActionModalState>({
    isOpen: false,
    action: 'deactivate',
    company: null,
  });
  const [staffNotes, setStaffNotes] = useState<string>('');
  const [submitError, setSubmitError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchCompanies = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    setError('');

    try {
      const token = getAuthToken();
      if (!token) {
        setCompanies([]);
        setError('Missing auth token. Please sign in again.');
        return;
      }

      const response = await fetch(buildCompanyListUrl(filters), {
        method: 'GET',
        cache: 'no-store',
        signal,
        headers: buildAuthHeaders(token),
      });

      if (!response.ok) {
        throw await parseApiError(response);
      }

      const payload = await response.json();
      setCompanies(normalizeCompanies(payload));
    } catch (requestError) {
      if (requestError instanceof DOMException && requestError.name === 'AbortError') {
        return;
      }
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to load companies right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to load companies right now.';
      setError(message);
      setCompanies([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters, handleServerErrors]);

  useEffect(() => {
    const controller = new AbortController();
    void fetchCompanies(controller.signal);
    return () => controller.abort();
  }, [fetchCompanies]);

  const filteredCompanies = useMemo(() => {
    const normalizedQuery = searchInput.trim().toLowerCase();
    if (!normalizedQuery) {
      return companies;
    }

    return companies.filter((company) => {
      const combined = `${company.name} ${company.email} ${company.whatsappCountryCode ?? ''} ${company.whatsappNumber ?? ''} ${company.country ?? ''} ${company.companyName ?? ''}`.toLowerCase();
      return combined.includes(normalizedQuery);
    });
  }, [companies, searchInput]);

  const stats = useMemo(() => {
    const total = companies.length;

    let activeCount = 0;
    let inactiveCount = 0;
    let otherStatusCount = 0;
    let verifiedCount = 0;
    let notVerifiedCount = 0;

    const countryCounts = new Map<string, number>();
    for (const company of companies) {
      const status = company.status.toLowerCase();
      if (status === 'active') activeCount += 1;
      else if (status === 'inactive') inactiveCount += 1;
      else otherStatusCount += 1;

      if (company.verified) verifiedCount += 1;
      else notVerifiedCount += 1;

      const country = (company.country ?? '').trim();
      if (country) {
        countryCounts.set(country, (countryCounts.get(country) ?? 0) + 1);
      }
    }

    const topCountries = Array.from(countryCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([country, count]) => ({ country, count }));

    const activePct = total > 0 ? Math.round((activeCount / total) * 100) : 0;
    const verifiedPct = total > 0 ? Math.round((verifiedCount / total) * 100) : 0;

    return {
      total,
      activeCount,
      inactiveCount,
      otherStatusCount,
      verifiedCount,
      notVerifiedCount,
      activePct,
      verifiedPct,
      topCountries,
    };
  }, [companies]);

  const activeFilterCount = countActiveFilters(filters);

  const updateFilter = <Key extends keyof CompanyFilters>(
    key: Key,
    value: CompanyFilters[Key]
  ) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ ...EMPTY_FILTERS });
  };

  const openActionModal = (company: CompanyRecord, action: CompanyAction) => {
    setModalState({
      isOpen: true,
      action,
      company,
    });
    setStaffNotes('');
    setSubmitError('');
  };

  const closeActionModal = () => {
    setModalState({
      isOpen: false,
      action: 'deactivate',
      company: null,
    });
    setStaffNotes('');
    setSubmitError('');
    setIsSubmitting(false);
  };

  const submitAction = async () => {
    if (!modalState.company) {
      return;
    }

    const trimmedNotes = staffNotes.trim();
    if (!trimmedNotes) {
      setSubmitError('Staff notes are required.');
      return;
    }

    setSubmitError('');
    setIsSubmitting(true);

    try {
      const token = getAuthToken();
      if (!token) {
        setSubmitError('Missing auth token. Please sign in again.');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(getEndpoint(modalState.action, modalState.company.id), {
        method: 'POST',
        headers: buildAuthHeaders(token),
        body: JSON.stringify({
          staff_notes: trimmedNotes,
        }),
      });

      if (!response.ok) {
        throw await parseApiError(response);
      }

      const actionLabel = getActionLabel(modalState.action);
      const currentCompanyName = modalState.company.companyName ?? modalState.company.name;
      closeActionModal();
      success(`${currentCompanyName} Was ${actionLabel} successfully.`, '', 6000);
      await fetchCompanies();
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
          <h2 className="text-lg font-semibold text-slate-900">Companies list</h2>
        </div>


      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-4">
        <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Total</div>
          <div className="mt-2 flex items-end gap-2">
            <div className="text-3xl font-semibold text-slate-900">{stats.total}</div>
            <div className="pb-1 text-xs text-slate-500">companies</div>
          </div>
          <div className="mt-3 text-xs text-slate-600">
            <span className="font-semibold text-slate-800">{filteredCompanies.length}</span> shown (search)
          </div>
          <div className="mt-3 flex h-2 w-full overflow-hidden rounded-full bg-slate-100">
            {(() => {
              const base = stats.total || 1;
              const activePct = Math.round((stats.activeCount / base) * 100);
              const inactivePct = Math.round((stats.inactiveCount / base) * 100);
              const otherPct = clampNumber(100 - activePct - inactivePct, 0, 100);
              return (
                <>
                  <div className="h-full bg-emerald-500" style={{ width: `${clampNumber(activePct, 0, 100)}%` }} />
                  <div className="h-full bg-red-500" style={{ width: `${clampNumber(inactivePct, 0, 100)}%` }} />
                  <div className="h-full bg-slate-400" style={{ width: `${otherPct}%` }} />
                </>
              );
            })()}
          </div>
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Status</div>
              <div className="mt-1 text-xs text-slate-600">Active vs inactive</div>
            </div>
            <DonutChart
              slices={[
                { label: 'Active', value: stats.activeCount, color: '#16a34a' },
                { label: 'Inactive', value: stats.inactiveCount, color: '#ef4444' },
                { label: 'Other', value: stats.otherStatusCount, color: '#94a3b8' },
              ]}
              centerLabel={`${stats.activePct}%`}
            />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
            <div className="rounded-md bg-emerald-50 px-2 py-1 text-emerald-700 ring-1 ring-emerald-200">
              <div className="text-[10px] uppercase tracking-wide">Active</div>
              <div className="font-semibold">{stats.activeCount}</div>
            </div>
            <div className="rounded-md bg-red-50 px-2 py-1 text-red-700 ring-1 ring-red-200">
              <div className="text-[10px] uppercase tracking-wide">Inactive</div>
              <div className="font-semibold">{stats.inactiveCount}</div>
            </div>
            <div className="rounded-md bg-slate-100 px-2 py-1 text-slate-700 ring-1 ring-slate-200">
              <div className="text-[10px] uppercase tracking-wide">Other</div>
              <div className="font-semibold">{stats.otherStatusCount}</div>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Verification</div>
              <div className="mt-1 text-xs text-slate-600">Verified vs not verified</div>
            </div>
            <DonutChart
              slices={[
                { label: 'Verified', value: stats.verifiedCount, color: '#2563eb' },
                { label: 'Not verified', value: stats.notVerifiedCount, color: '#94a3b8' },
              ]}
              centerLabel={`${stats.verifiedPct}%`}
            />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-md bg-blue-50 px-2 py-1 text-blue-700 ring-1 ring-blue-200">
              <div className="text-[10px] uppercase tracking-wide">Verified</div>
              <div className="font-semibold">{stats.verifiedCount}</div>
            </div>
            <div className="rounded-md bg-slate-100 px-2 py-1 text-slate-700 ring-1 ring-slate-200">
              <div className="text-[10px] uppercase tracking-wide">Not verified</div>
              <div className="font-semibold">{stats.notVerifiedCount}</div>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Top countries</div>
          <div className="mt-1 text-xs text-slate-600">Most common company locations</div>
          <div className="mt-3">
            <CountryBars entries={stats.topCountries} />
          </div>
        </div>
      </div>
      <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50/70 p-3 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white shadow-sm">
              <IconFilter size={16} aria-hidden="true" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-slate-900">Filter companies</h3>
                {activeFilterCount > 0 ? (
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                    {activeFilterCount} active
                  </span>
                ) : null}
              </div>
              <p className="text-[11px] text-slate-500">Narrow the list using service and publishing signals.</p>
            </div>
          </div>
          <div className="relative w-full lg:max-w-[420px]">
            <label htmlFor="company-search" className="sr-only">Search companies</label>
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon />
            </span>
            <input
              id="company-search"
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search by name, email, phone, or country..."
              className={INPUT_CLASS}
            />
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 border-t border-slate-200 pt-3 sm:grid-cols-2 xl:grid-cols-4">
          <label className="text-[11px] font-semibold text-slate-600">
            WhatsApp
            <select
              value={filters.whatsappActivated}
              onChange={(event) => updateFilter('whatsappActivated', event.target.value as BooleanFilter)}
              className={FILTER_INPUT_CLASS}
            >
              <option value="">Any status</option>
              <option value="1">Activated</option>
              <option value="0">Not activated</option>
            </select>
          </label>

          <label className="text-[11px] font-semibold text-slate-600">
            Project services
            <select
              value={filters.receiveServiceActivated}
              onChange={(event) => updateFilter('receiveServiceActivated', event.target.value as BooleanFilter)}
              className={FILTER_INPUT_CLASS}
            >
              <option value="">Any status</option>
              <option value="1">Receiving services</option>
              <option value="0">Not receiving services</option>
            </select>
          </label>

          <label className="text-[11px] font-semibold text-slate-600">
            Published insights
            <select
              value={filters.publishedInsightsPeriod}
              onChange={(event) => updateFilter('publishedInsightsPeriod', event.target.value as ActivityPeriod)}
              className={FILTER_INPUT_CLASS}
            >
              {PERIOD_OPTIONS.map((option) => (
                <option key={option.value || 'any'} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>

          <label className="text-[11px] font-semibold text-slate-600">
            More than this many insights
            <input
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              value={filters.publishedInsightsMoreThan}
              onChange={(event) => {
                const { value } = event.target;
                if (value === '' || /^[1-9]\d*$/.test(value)) {
                  updateFilter('publishedInsightsMoreThan', value);
                }
              }}
              placeholder="e.g. 3"
              className={FILTER_INPUT_CLASS}
            />
          </label>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500" aria-live="polite">
            <span className={`h-1.5 w-1.5 rounded-full ${isLoading ? 'animate-pulse bg-blue-500' : 'bg-emerald-500'}`} />
            {isLoading ? 'Updating results...' : 'Results update automatically'}
          </span>
          <button
            type="button"
            onClick={clearFilters}
            disabled={activeFilterCount === 0}
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <IconX size={14} aria-hidden="true" />
            Clear
          </button>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 text-[11px] text-slate-500">
        <span>
          Showing <strong className="font-semibold text-slate-700">{filteredCompanies.length}</strong> compan{filteredCompanies.length === 1 ? 'y' : 'ies'}
        </span>
        {activeFilterCount > 0 ? <span>Server filters applied</span> : null}
      </div>
      <div className="mt-3 overflow-hidden rounded-md border border-slate-200">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-3 py-2 font-semibold">Logo</th>
                <th className="px-3 py-2 font-semibold">Name</th>
                <th className="px-3 py-2 font-semibold">Contact</th>
                <th className="px-3 py-2 font-semibold">Country</th>
                <th className="px-3 py-2 font-semibold">Status</th>
                <th className="px-3 py-2 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-xs text-slate-500">
                    Loading companies...
                  </td>
                </tr>
              ) : null}

              {!isLoading && error ? (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-xs text-red-600">
                    {error}
                  </td>
                </tr>
              ) : null}

              {!isLoading && !error && filteredCompanies.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-xs text-slate-500">
                    No companies found.
                  </td>
                </tr>
              ) : null}

              {!isLoading &&
                !error &&
                filteredCompanies.map((company) => {
                  const normalizedStatus = company.status.toLowerCase();
                  const isActive = normalizedStatus === 'active';
                  const isInactive = normalizedStatus === 'inactive';
                  const displayName = company.companyName ?? company.name;
                  const whatsappUrl = buildWhatsappUrl(
                    company.whatsappCountryCode,
                    company.whatsappNumber
                  );
                  const whatsappTooltip = formatWhatsappNumber(
                    company.whatsappCountryCode,
                    company.whatsappNumber
                  );

                  return (
                    <tr key={company.id} className="text-slate-700">
                      <td className="px-3 py-2">
                        {company.logoUrl ? (
                          <img
                            src={company.logoUrl}
                            alt={`${displayName} logo`}
                            className="h-7 w-7 rounded-md bg-white object-contain ring-1 ring-slate-200"
                            loading="lazy"
                          />
                        ) : (
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-200">
                            {getInitials(displayName)}
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2 font-semibold">{displayName}</td>
                      <td className="px-3 py-2">
                        <div className="flex flex-wrap items-center gap-2">
                          {company.email !== '-' ? (
                            <a
                              href={`mailto:${company.email}`}
                              className="break-all text-blue-600 underline-offset-2 hover:underline"
                            >
                              {company.email}
                            </a>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                          {whatsappUrl ? (
                            <Tooltip
                              label={whatsappTooltip ? `WhatsApp: ${whatsappTooltip}` : 'Open WhatsApp'}
                              withArrow
                              position="top"
                              openDelay={100}
                            >
                              <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200 transition hover:bg-emerald-100"
                                aria-label={`Open WhatsApp chat with ${displayName}`}
                              >
                                <IconBrandWhatsapp size={15} />
                              </a>
                            </Tooltip>
                          ) : null}
                          {company.receiveProjectServices === 'active' ? (
                            <Tooltip
                              label="Available for project services"
                              withArrow
                              position="top"
                              openDelay={100}
                            >
                              <span
                                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-blue-600 ring-1 ring-blue-200"
                                aria-label={`${displayName} is available for project services`}
                              >
                                <IconBriefcase size={15} />
                              </span>
                            </Tooltip>
                          ) : null}
                          <Tooltip
                            label={company.publishedInsightAtLeastOne ? 'Has published insights' : 'No published insights'}
                            withArrow
                            position="top"
                            openDelay={100}
                          >
                            <span
                              className={`inline-flex h-7 w-7 items-center justify-center rounded-full ring-1 ${
                                company.publishedInsightAtLeastOne
                                  ? 'bg-violet-50 text-violet-600 ring-violet-200'
                                  : 'bg-slate-100 text-slate-400 ring-slate-200'
                              }`}
                              aria-label={
                                company.publishedInsightAtLeastOne
                                  ? `${displayName} has published at least one insight`
                                  : `${displayName} has no published insights`
                              }
                              aria-disabled={!company.publishedInsightAtLeastOne}
                            >
                              {company.publishedInsightAtLeastOne ? (
                                <IconFileCheck size={15} />
                              ) : (
                                <IconFileX size={15} />
                              )}
                            </span>
                          </Tooltip>
                        </div>
                      </td>
                      <td className="px-3 py-2">{company.country ?? '-'}</td>
                      <td className="px-3 py-2">
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold capitalize ${getStatusBadgeClass(
                            company.status
                          )}`}
                        >
                          {company.status}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex flex-wrap items-center gap-2">
                          {isInactive ? (
                            <button
                              type="button"
                              onClick={() => openActionModal(company, 'activate')}
                              className={`${ROW_ACTION_BUTTON_CLASS} border-emerald-300 text-emerald-700 hover:bg-emerald-50`}
                            >
                              Activate
                            </button>
                          ) : null}

                          {isActive ? (
                            <button
                              type="button"
                              onClick={() => openActionModal(company, 'deactivate')}
                              className={`${ROW_ACTION_BUTTON_CLASS} border-amber-300 text-amber-700 hover:bg-amber-50`}
                            >
                              Deactivate
                            </button>
                          ) : null}

                          <button
                            type="button"
                            onClick={() => openActionModal(company, 'delete')}
                            className={`${ROW_ACTION_BUTTON_CLASS} border-red-300 text-red-700 hover:bg-red-50`}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      <CompanyActionModal
        isOpen={modalState.isOpen}
        action={modalState.action}
        companyName={modalState.company?.companyName ?? modalState.company?.name ?? ''}
        staffNotes={staffNotes}
        submitError={submitError}
        isSubmitting={isSubmitting}
        onClose={closeActionModal}
        onSubmit={submitAction}
        onStaffNotesChange={setStaffNotes}
      />
    </div>
  );
}
