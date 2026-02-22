'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { getAuthToken } from '@/lib/authToken';
import { useToast } from '@/components/toast/ToastContext';
import { buildAuthHeaders, parseApiError } from '../../../_config/api';
import { ClientAction, ClientRecord } from '../../../types';
import ClientActionModal from './ClientActionModal';

type ActionModalState = {
  isOpen: boolean;
  action: ClientAction;
  client: ClientRecord | null;
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

const INPUT_CLASS =
  'h-8 w-full rounded-md shadow-sm border border-slate-200 bg-white pl-9 pr-3 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400 focus:border-[1px]'
const PRIMARY_BUTTON_CLASS =
  'h-8 rounded-md border  border-blue-600 bg-blue-600 px-4 text-xs font-medium text-white shadow-sm shadow-gray-300 hover:bg-blue-700';
const SECONDARY_BUTTON_CLASS =
  'h-8 rounded-md border shadow-sm border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50';
const ROW_ACTION_BUTTON_CLASS =
  'rounded-md border shadow-sm bg-white px-2 py-1 text-[10px] font-medium shadow-sm';

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

function normalizeClients(payload: unknown): ClientRecord[] {
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
        country?: string | null;
        status?: string;
        verified?: boolean | number | string;
      };

      const numericId = Number(row.id);
      if (!Number.isFinite(numericId) || numericId <= 0) {
        return null;
      }

      return {
        id: numericId,
        name: typeof row.name === 'string' && row.name.trim() ? row.name : 'Unknown',
        email: typeof row.email === 'string' && row.email.trim() ? row.email : '-',
        country: typeof row.country === 'string' && row.country.trim() ? row.country : null,
        status: typeof row.status === 'string' && row.status.trim() ? row.status : 'unknown',
        verified: Boolean(row.verified),
      } satisfies ClientRecord;
    })
    .filter((client): client is ClientRecord => client !== null);
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

export default function UsersTab() {
  const { handleServerErrors, success } = useToast();
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [modalState, setModalState] = useState<ActionModalState>({
    isOpen: false,
    action: 'deactivate',
    client: null,
  });
  const [staffNotes, setStaffNotes] = useState<string>('');
  const [submitError, setSubmitError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchClients = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    setError('');

    try {
      const token = getAuthToken();
      if (!token) {
        setClients([]);
        setError('Missing auth token. Please sign in again.');
        return;
      }
      const response = await fetch('https://api.foresighta.co/api/admin/account/client/list', {
        method: 'GET',
        cache: 'no-store',
        signal,
        headers: buildAuthHeaders(token),
      });

      if (!response.ok) {
        throw await parseApiError(response);
      }

      const payload = await response.json();
      setClients(normalizeClients(payload));
    } catch (requestError) {
      if (requestError instanceof DOMException && requestError.name === 'AbortError') {
        return;
      }
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to load clients right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to load clients right now.';
      setError(message);
      setClients([]);
    } finally {
      setIsLoading(false);
    }
  }, [handleServerErrors]);

  useEffect(() => {
    const controller = new AbortController();
    void fetchClients(controller.signal);
    return () => controller.abort();
  }, [fetchClients]);

  const filteredClients = useMemo(() => {
    const normalizedQuery = searchInput.trim().toLowerCase();
    if (!normalizedQuery) {
      return clients;
    }

    return clients.filter((client) => {
      const combined = `${client.name} ${client.email} ${client.country ?? ''}`.toLowerCase();
      return combined.includes(normalizedQuery);
    });
  }, [clients, searchInput]);

  const stats = useMemo(() => {
    const total = clients.length;

    let activeCount = 0;
    let inactiveCount = 0;
    let otherStatusCount = 0;
    let verifiedCount = 0;
    let notVerifiedCount = 0;

    const countryCounts = new Map<string, number>();
    for (const client of clients) {
      const status = client.status.toLowerCase();
      if (status === 'active') activeCount += 1;
      else if (status === 'inactive') inactiveCount += 1;
      else otherStatusCount += 1;

      if (client.verified) verifiedCount += 1;
      else notVerifiedCount += 1;

      const country = (client.country ?? '').trim();
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
  }, [clients]);

  const openActionModal = (client: ClientRecord, action: ClientAction) => {
    setModalState({
      isOpen: true,
      action,
      client,
    });
    setStaffNotes('');
    setSubmitError('');
  };

  const closeActionModal = () => {
    setModalState({
      isOpen: false,
      action: 'deactivate',
      client: null,
    });
    setStaffNotes('');
    setSubmitError('');
    setIsSubmitting(false);
  };

  const submitAction = async () => {
    if (!modalState.client) {
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
      const response = await fetch(
        `https://api.foresighta.co/api/admin/account/client/deactivate-delete/${modalState.client.id}`,
        {
          method: 'POST',
          headers: buildAuthHeaders(token),
          body: JSON.stringify({
            staff_notes: trimmedNotes,
          }),
        }
      );

      if (!response.ok) {
        throw await parseApiError(response);
      }

      const actionLabel = modalState.action === 'deactivate' ? 'Deactivate' : 'Delete';
      const currentClientName = modalState.client.name;
      closeActionModal();
      success(`${currentClientName} Was ${actionLabel} successfully.`, '', 6000);
      await fetchClients();
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
      <div className="flex flex-col ">
	     <h2 className="text-lg font-semibold text-slate-900">Clients list</h2>
	     </div>
      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-4">
        <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Total</div>
          <div className="mt-2 flex items-end gap-2">
            <div className="text-3xl font-semibold text-slate-900">{stats.total}</div>
            <div className="pb-1 text-xs text-slate-500">Clients</div>
          </div>
          <div className="mt-3 text-xs text-slate-600">
            <span className="font-semibold text-slate-800">{filteredClients.length}</span> shown (search)
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
          <div className="mt-3 grid grid-row-3 gap-2 text-xs">
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
          <div className="mt-3 grid grid-row-2 gap-2 text-xs">
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
          <div className="mt-1 text-xs text-slate-600">Most common client locations</div>
          <div className="mt-3">
            <CountryBars entries={stats.topCountries} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
	  

        <div className="flex flex-col gap-2 mt-8 sm:flex-row sm:items-center sm:justify-end sm:flex-1 sm:pl-4">
          <div className="relative flex-1 sm:max-w-[520px]">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search clients..."
              className={INPUT_CLASS}
            />
          </div>
         
        </div>
      </div>

      <div className="mt-3 overflow-hidden rounded-md border border-slate-200">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-3 py-2 font-semibold">Name</th>
                <th className="px-3 py-2 font-semibold">Email</th>
                <th className="px-3 py-2 font-semibold">Country</th>
                <th className="px-3 py-2 font-semibold">Status</th>
                <th className="px-3 py-2 font-semibold">Verified</th>
                <th className="px-3 py-2 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-xs text-slate-500">
                    Loading clients...
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

              {!isLoading && !error && filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-xs text-slate-500">
                    No clients found.
                  </td>
                </tr>
              ) : null}

              {!isLoading &&
                !error &&
                filteredClients.map((client) => (
                  <tr key={client.id} className="text-slate-700">
                    <td className="px-3 py-2 font-semibold">{client.name}</td>
                    <td className="px-3 py-2">{client.email}</td>
                    <td className="px-3 py-2">{client.country ?? '-'}</td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold capitalize ${getStatusBadgeClass(
                          client.status
                        )}`}
                      >
                        {client.status}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                          client.verified
                            ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-300'
                            : 'bg-slate-100 text-slate-700 ring-1 ring-slate-300'
                        }`}
                      >
                        {client.verified ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex flex-wrap items-center gap-2">
                       
                        <button
                          type="button"
                          onClick={() => openActionModal(client, 'delete')}
                          className={`${ROW_ACTION_BUTTON_CLASS} border-red-300 text-red-700 hover:bg-red-50`}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <ClientActionModal
        isOpen={modalState.isOpen}
        action={modalState.action}
        client={modalState.client}
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
